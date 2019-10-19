import libappudo
import libappudo_run
import libappudo_env
import Foundation

enum KernelArch : UInt8, FastCodable {
    case unknown            = 0
    case alpha              = 1
    case arm                = 2
    case c6x                = 3
    case hexagon            = 4
    case microblaze         = 5
    case nds32              = 6
    case openrisc           = 7
    case powerpc            = 8
    case s390               = 9
    case sparc              = 10
    case unicore32          = 11
    case xtensa             = 12
    case arc                = 13
    case arm64              = 14
    case h8300              = 15
    case ia64               = 16
    case m68k               = 17
    case mips               = 18
    case nios2              = 19
    case parisc             = 20
    case riscv              = 21
    case sh                 = 22
    case um                 = 23
    case x86                = 24
    
    var rawString : String {
        switch(rawValue) {
            case KernelArch.x86.rawValue:
                return "x86_64"
            default:
                return "\(self)"
        }
    }
}

struct ProbeConnect {
    let id : Int32
    let settings_id : Int32
    let remoteAddr : InetAddr
    let kversion : UInt64
    let version : UInt32
    var machine : UInt64
    let identifier : String?
}

class ArchPart {
    var _keys : [String:UInt8] = [:]
    var _values : [String]  = []
    
    func get(_ idx : UInt64) -> String {
        return _values.count <= idx ? "" : _values[Int(idx)]
    }
    
    func insert(_ key : String) -> Int {
        if _values.count >= 254 {
            return -1
        }
        if let k = _keys[key] {
            return Int(k)
        } else {
            let idx = _values.count
            _keys[key] = UInt8(truncatingIfNeeded:idx)
            _values.append(key)
            return idx
        }
    }
}

/*
    Target triples are stored per probe in a 64 bit value.
    Each part of the triple is limited to 255 possible variations.
    The variations are predetermined by clang.
*/

struct CompilerInfo {
    let prefix : String
    let bpf_options : String
}

struct CompilerOptions {
    let options : String
    let board : String
}

var _machine_arch_sub = ArchPart()
var _machine_vendor = ArchPart()
var _machine_sys = ArchPart()
var _machine_abi = ArchPart()
var _compilers : [String:CompilerInfo] = [:] 
var _compiler_options : [UInt32:CompilerOptions] = [:] 

enum MachineInfoError : Error {
    case parseError
}

enum SimpeError : Error {
    case Default
}

func compilers_fetch() -> Bool {
    _compilers = [:]
    let qry = SQLQry("SELECT triple, compiler_prefix, bpf_options FROM compilers;")
    if <!qry.exec() != false {
        for i in 0..<qry.numRows {
            let triple = qry.getAsText(i, 0) ?? ""
            let compiler_prefix = qry.getAsText(i, 1) ?? ""
            let bpf_options = qry.getAsText(i, 2) ?? ""
            _compilers[triple] = CompilerInfo(prefix:compiler_prefix, bpf_options:bpf_options)
        }
        return true
    }
    
    
    return false
}

let _default_conf : String = "defconfig"

func compiler_options_fetch() -> Bool {
    _compiler_options = [:]
    let qry = SQLQry("SELECT id, args, board FROM compiler_options;")
    if <!qry.exec() != false {
        for i in 0..<qry.numRows {
            let id = qry.getAsInt32(i, 0) ?? 0
            let options = qry.getAsText(i, 1) ?? ""
            let board = qry.getAsText(i, 2) ?? _default_conf
            _compiler_options[UInt32(truncatingIfNeeded:id)] = CompilerOptions(options:options, board:board)
        }
        _compiler_options.removeValue(forKey:0)
        return true
    }
    
    
    return false
}

func machine_get_canonical(_ triple : String) -> String? {
    var err = AsyncError()
    if let errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let bin = err <! Dir.bin.open("clang", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["clang", "--target=\(triple)", "-print-canonical-triple"], 
                                       env:["PATH=/usr/lib"], .IO(stdout:outFile, stderr:errFile), flags:.SUID),
           let txt = <!outFile.readAsText(offset:0) {
            return String(txt.dropLast()) 
        }
    }

    return nil
}

struct MachineInfo : FastCodable {
    // 0xOOOOEEKKAASSVVSS
    // |options 16|endian 8|karch 8|abi 8|sys 8|vendor 8|arch+sub 8|
    let value : UInt64
    
    init() {
        self.value = 0
    }
    
    init(karch_be_options : UInt64, triple : String) throws  {
        if let _triple = machine_get_canonical(triple) {
            let t = _triple.components(separatedBy:"-")
            let u = "unknown"
            let arch_sub = _machine_arch_sub.insert(t[0] + "-")
            let vendor = _machine_vendor.insert(t[1] + "-")
            var abi = 0
            if(t.count > 3) {
                abi = _machine_abi.insert("-" + t[3])
            }
            let sys = _machine_sys.insert(t[2])
            
            if arch_sub < 0 || vendor < 0 || sys < 0 || abi < 0 ||
               t[0].starts(with:u) || t[1].starts(with:u) || t[2].starts(with:u) {
                throw MachineInfoError.parseError
            }
            
            self.value = UInt64(arch_sub) | (UInt64(vendor) << 8) | (UInt64(sys) << 16) | (UInt64(abi) << 24) | (karch_be_options << 32)
        } else {
            throw MachineInfoError.parseError
        }
    }
    
    init(machine : UInt64) {
        self.value = machine
    }
    
    var triple : String {
        let arch_sub = _machine_arch_sub.get(value & 0xFF)
        let vendor = _machine_vendor.get((value >> 8) & 0xFF)
        let sys = _machine_sys.get((value >> 16) & 0xFF)
        let abi = _machine_abi.get((value >> 24) & 0xFF)
    
        return "\(arch_sub)\(vendor)\(sys)\(abi)"
    }
    
    var triple_options : String {
        let arch_sub = _machine_arch_sub.get(value & 0xFF)
        let vendor = _machine_vendor.get((value >> 8) & 0xFF)
        let sys = _machine_sys.get((value >> 16) & 0xFF)
        let abi = _machine_abi.get((value >> 24) & 0xFF)
    
        return "\(arch_sub)\(vendor)\(sys)\(abi)-\(options)"
    }
    
    var triple_novendor : String {
        let arch_sub = _machine_arch_sub.get(value & 0xFF)
        let sys = _machine_sys.get((value >> 16) & 0xFF)
        let abi = _machine_abi.get((value >> 24) & 0xFF)
    
        return "\(arch_sub)\(sys)\(abi)"
    }
    
    var cross_compiler : CompilerInfo {
        return _compilers[triple_novendor] ?? CompilerInfo(prefix:"", bpf_options:"")
    }
    
    var compiler_options : CompilerOptions {
        let o = options
        return o != 0 ? (_compiler_options[o] ?? CompilerOptions(options:"", board:_default_conf)) : 
                                                 CompilerOptions(options:"", board:_default_conf)
    }
    
    var machine : UInt64 {
        return value
    }
    
    var big_endian : Bool {
        return (value & 0xFF0000000000) == 0
    }
    
    var bpf_target : String {
        return big_endian ? "bpf_be" : "bpf_le"
    }
    
    var karch : KernelArch {
        return KernelArch(rawValue:UInt8((value >> 32) & 0xFF)) ?? .unknown
    }
    
    var options : UInt32 {
        return UInt32(value >> 48)
    }
}

struct ProbeInfo : FastCodable {
    let id : Int32
    var activeRunId : UInt32
    let version : UInt32
    let kversion : UInt64
    let minfo : MachineInfo
    let idn : String?
    
    static var empty : ProbeInfo {
        return ProbeInfo(id:0, idn:nil, activeRunId:0, kversion:0, version:0, minfo:MachineInfo())
    }
    
    init(id : Int32, idn : String?) {
        self.id = id
        self.idn = idn
        self.activeRunId = 0
        self.kversion = 0
        self.version = 0
        self.minfo = MachineInfo()
    }
    
    init(id : Int32, idn : String?, activeRunId : UInt32, kversion : UInt64, version : UInt32, minfo : MachineInfo) {
        self.id = id
        self.idn = idn
        self.activeRunId = activeRunId
        self.kversion = kversion
        self.version = version
        self.minfo = minfo
    }
    
    init(id : Int32, idn : String?, kversion : UInt64, version : UInt32, minfo : MachineInfo) {     
        self.id = id
        self.idn = idn
        self.activeRunId = 0
        self.kversion = kversion
        self.version = version
        self.minfo = minfo
    }
}

struct ProbeTarget : FastCodable {
    let id : Int32
    let s : UInt32
    let idn : String?
}

enum MsgType : Int32, Codable {
    case USER_PROBE_PATH_GET = 1
    case USER_TASK_KILL      = 3
    case USER_PROBE_DISS_GET = 4
    
    case PROBE_USER_SEND     = 2
    
    case CHAT_OPEN           = 20
    case CHAT_INVITE         = 21
    case CHAT_JOIN           = 22
    case CHAT_LEAVE          = 23
    case CHAT_MESSAGE        = 24
    case CHAT_USER_UPDATE    = 25
    case CHAT_JOIN_REQUEST   = 26
    
    case RUN_COMPILE         = 40
    case RUN_EXEC            = 41
    case RUN_VERSION_GET     = 42
    case RUN_EXEC_STOP       = 43
    case RUN_EXEC_ATTACH     = 44
}

struct MsgParam : FastCodable {
    let t : MsgType
    let data : String
    let p : ProbeTarget?
    let r : Int64?
    let x : Int64?
    let y : Int64?
    
    
    enum CodingKeys: String, CodingKey {
        case t = "t"
        case data = "data"
        case p = "p"
        case r = "r"
        case x = "x"
        case y = "y"
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.t = try container.decode(MsgType.self, forKey: .t)
        self.data = try container.decode(String.self, forKey: .data)
        self.p = try? container.decode(ProbeTarget.self, forKey: .p)
        self.r = try? container.decode(Int64.self, forKey: .r)
        self.x = try? container.decode(Int64.self, forKey: .x)
        self.y = try? container.decode(Int64.self, forKey: .y)
    }
}

struct UserPermissions: OptionSet {
    let rawValue: Int32
    
    static let NONE               = UserPermissions(rawValue: 0)
    static let ADMIN_ALL          = UserPermissions(rawValue: 1 << 0)
    static let RUN_ADD            = UserPermissions(rawValue: 1 << 1)
    static let DISASSEMBLER_USE   = UserPermissions(rawValue: 1 << 2)
    static let PROBE_ADD          = UserPermissions(rawValue: 1 << 3)
    static let MODULE_ADD         = UserPermissions(rawValue: 1 << 4)
    static let MODULE_SHARE       = UserPermissions(rawValue: 1 << 5)
    static let USER_EDIT          = UserPermissions(rawValue: 1 << 6)
    static let SETTING_EDIT       = UserPermissions(rawValue: 1 << 7)
    static let ACCOUNT_EDIT       = UserPermissions(rawValue: 1 << 8)
    static let ACCOUNT_REMOVE     = UserPermissions(rawValue: 1 << 9)
    static let REPO_EDIT          = UserPermissions(rawValue: 1 << 10)
    static let CHAT_USE           = UserPermissions(rawValue: 1 << 11)
    
    func has(_ perm : UserPermissions) -> Bool {
        return contains(.ADMIN_ALL) || contains(perm)
    }
}

struct UserInfo {
    let socket : Socket
    let perm : UserPermissions 
    var activeRunId : UInt32
    var chatId : UInt32
    var hasPending : Bool
    
    init() {
        self.socket = Socket(v:0)
        self.perm = .NONE
        self.activeRunId = 0
        self.chatId = 0
        self.hasPending = false
    }
    
    init(socket : Socket, perm : UserPermissions) {
        self.socket = socket
        self.perm = perm
        self.activeRunId = 0
        self.chatId = 0
        self.hasPending = false
    }
    
    init(socket : Socket, perm : UserPermissions, activeRunId : UInt32, chatId : UInt32, hasPending : Bool) {
        self.socket = socket
        self.perm = perm
        self.activeRunId = activeRunId
        self.chatId = chatId
        self.hasPending = hasPending
    }
}

struct ChatUser {
    var socket : Socket
    var invite : Bool
    var admin : Bool
}

struct ChatInfo {
    var num_admins : UInt16 = 0
    var num_invites : UInt16 = 0
    var users : [UInt32:ChatUser] = [:]
}

extension ProbeInfo: Equatable {
    static func == (lhs: ProbeInfo, rhs: ProbeInfo) -> Bool {
        return lhs.id == rhs.id &&
               lhs.idn == rhs.idn
    }
}

var _nonce : Int32 = Int32(truncatingIfNeeded:<!Rand.int32() ?? -1)
var _pending_run = false
var _pending_request = false
var _pending_compile = false
var _probe_pending : [UInt32:ProbeConnect?] = [:]
var _probes : [UInt32:ProbeInfo?] = [:]     // socket to info
var _users : [UInt32:UserInfo] = [:]      // user id to socket  
var _users_pending : Set<UInt32> = []
var _users_chats : [UInt32:ChatInfo] = [:]
var _run_pending : Set<UInt32> = []
var _run_pending_who : UInt32 = 0
var _run_pending_when : Int = 0

struct LoginParam : FastCodable {
    let l : String      // login
    let k : String      // key
    let p : UInt        // probe or user
    let t : Int?        // time
    let n : Int?        // nonce
    let r : String?     // random data
    let i : String?     // child_id
    let v : String?     // version
}

/* ----------------------------------------------- */
/*                 chat handling                   */
/* ----------------------------------------------- */

func chat_open(userId : UInt32, socket : Socket) -> Bool {
    if var uinfo = _users[userId],
        uinfo.chatId == 0 {
        uinfo.chatId = userId
        _users[userId] = uinfo
        var chat = ChatInfo()
        chat.num_admins = 1
        chat.users[userId] = ChatUser(socket:socket, invite:false, admin:true)
        _users_chats[userId] = chat
        return true
    }
    return false
}

func chat_request_join(userId : UInt32, name : String) -> Bool {
    let qry = SQLQry("SELECT id, (SELECT login FROM users WHERE id = $2) FROM users WHERE login = $1;")
    qry.values = [name, userId]

    if <!qry.exec() != false,
       let chatId = qry.getAsInt32(0, 0),
       let source = qry.getAsText(0, 1),
       let chat = _users_chats[UInt32(bitPattern:chatId)],
       chat.users.count < 25,
       let uinfo = _users[userId],
       uinfo.chatId == 0 {
        var targets = ContiguousArray<Socket>()
        for (_ , u) in chat.users {
            if(u.invite == false && u.admin == true) {
                targets.append(u.socket)
            }
        }
        return ws.send(txt:#"{"t":6,"m":7,"s":"\#(source)","d":\#(userId)}"#, targets);
    }
    return false
}

func chat_join_user(chatId : UInt32, userId : UInt32, socket : Socket) -> Bool {
    if var uinfo = _users[userId],
       uinfo.chatId == 0,
       var chat = _users_chats[chatId],
       var user = chat.users[userId],
       user.invite != false {
        uinfo.chatId = chatId
        _users[userId] = uinfo
        user.invite = false
        user.socket = socket
        chat.num_invites -= 1
        chat.users[userId] = user
        _users_chats[chatId] = chat
        var targets = ContiguousArray<Socket>()
        var ids = [UInt32]()
        for (id, u) in chat.users {
            if(u.invite == false) {
                ids.append(id)
                targets.append(u.socket)
            }
        }
        
        var qry = SQLQry("SELECT login, (SELECT login FROM users WHERE id = $2) FROM users WHERE id = $1;")
        qry.values = [userId, chatId]
        var cname = ""

        if <!qry.exec() != false {
            let name = qry.getAsText(0, 0) ?? ""
            cname = qry.getAsText(0, 1) ?? ""
            _ = ws.send(txt:#"{"t":6,"m":5,"d":\#(userId),"n":"\#(name)"}"#, targets)
        }
        
        qry = SQLQry("SELECT id, login FROM users WHERE id = ANY($1) AND id != $2;")
        qry.values = [ids, userId]
        let ok = <!qry.exec() != false
        _ = ws.cont(txt:#"{"t":6,"m":6,"cn":"\#(cname)","d":["#, first:true, socket)
        if ok {
            for i in 0..<qry.numRows {
                let id = qry.getAsInt32(i, 0) ?? -1
                let name = qry.getAsText(i, 1) ?? ""
                let admin = chat.users[UInt32(bitPattern:id)]?.admin ?? false
                _ = ws.cont(txt:#"{"i":\#(id)\#(admin ? ",\"a\":1" : ""),"n":"\#(name)"}\#(i != qry.numRows - 1 ? "," : "")"#, socket)
            }
        }
        _ = ws.cont(txt:#"]}"#, last:true, socket)
        return true
    }
    return false
}

func _chat_leave_user(userId : UInt32, _chatId : UInt32) -> Bool {
    var chatId = _chatId
    if var chat = _users_chats[chatId],
       let user = chat.users.removeValue(forKey:userId) {
        if chat.users.count - Int(chat.num_invites) == 0 {
            _users_chats.removeValue(forKey:chatId)
        } else {
            if user.admin {
                chat.num_admins -= 1
            }
            var admin = UInt32(0)
            var has_admin = false
            var has_new_chat = false
            if chat.num_admins == 0 {
                admin = chat.users.first!.0
                var u = chat.users[admin]!
                u.admin = true
                chat.users[admin] = u
                has_admin = true
            }
            if userId == chatId {
                has_new_chat = true
                _users_chats.removeValue(forKey:chatId)
                if has_admin {
                    chatId = admin;
                } else {
                    for (id, u) in chat.users {
                        if(u.admin) {
                            chatId = id
                            break
                        }
                    }
                }
            }
            _users_chats[chatId] = chat
            var targets = ContiguousArray<Socket>()
            for (id, u) in chat.users {
                _users[id]!.chatId = chatId
                if(u.invite == false && id != userId) {
                    targets.append(u.socket)
                }
            }
            var new_chat = ""
            if(has_new_chat) {
                let qry = SQLQry("SELECT login FROM users WHERE id = $1;")
                qry.values = [chatId]
                if <!qry.exec() == false || qry.numRows != 1 {
                    has_new_chat = false
                } else {
                    new_chat = #""cn":"\#(qry.getAsText(0,0) ?? "")","#
                }
            }
            _ = ws.send(txt:#"{"t":6,"m":1,\#(has_admin ? "\"a\":\(admin)," : "")\#(new_chat)"c":\#(chatId),"d":\#(userId)}"#, targets);
        }
        return true
        
    }
    return false
}

func chat_leave_user(userId : UInt32) -> Bool {
    if var uinfo = _users[userId],
       uinfo.chatId != 0,
       _chat_leave_user(userId:userId, _chatId:uinfo.chatId) != false {
        uinfo.chatId = 0
        _users[userId] = uinfo
        return true
        
    }
    return false
}

func chat_invite_user(chatId : UInt32, userId : UInt32, name : String) -> UInt32? {
    let qry = SQLQry("SELECT id, (SELECT login FROM users WHERE id = $2) FROM users WHERE login = $1;")
    qry.values = [name, userId]

    if <!qry.exec() != false,
       var chat = _users_chats[chatId],
       chat.users.count < 25,
       let user = chat.users[userId],
       user.admin == true,
       let targetId = qry.getAsInt32(0, 0),
       let source = qry.getAsText(0, 1),
       let target = _users[UInt32(bitPattern:targetId)],
       chat.users[UInt32(bitPattern:targetId)] == nil,
       ws.send(txt:#"{"t":6,"m":3,"d":\#(chatId),"s":"\#(source)"}"#, target.socket) != false {
        chat.num_invites += 1
        chat.users[UInt32(bitPattern:targetId)] = ChatUser(socket:Socket(v:0), invite:true, admin:false)
        _users_chats[chatId] = chat
        return UInt32(bitPattern:targetId)
    }
    return nil
}

func chat_update_user(userId : UInt32, targetId:UInt32, v:Int64) -> Bool {
    var targets = ContiguousArray<Socket>()
    if var uinfo = _users[targetId],
       var chat = _users_chats[uinfo.chatId],
       let user = chat.users[userId],
       var tuser = chat.users[targetId],
       user.admin != false {
        let chatId = uinfo.chatId;
        if(v <= 1) {
            tuser.admin = v == 1
            chat.users[targetId] = tuser
            for (_ , u) in chat.users {
                if(u.invite == false) {
                    targets.append(u.socket)
                }
            }
            _ = ws.send(txt:#"{"t":6,"m":2,"a":\#(v),"d":\#(targetId)}"#, targets);
        } else {
            uinfo.chatId = 0
            _users[targetId] = uinfo
            for (_ , u) in chat.users {
                if(u.invite == false) {
                    targets.append(u.socket)
                }
            }
            chat.users.removeValue(forKey:targetId)
            _ = ws.send(txt:#"{"t":6,"m":1,"c":\#(chatId),"d":\#(targetId)}"#, targets);
        }
        _users_chats[chatId] = chat
        return true
    }
    return false
}

func chat_send_message(userId : UInt32, chatId:UInt32, data:String, target : UInt32? = nil) -> Bool {
    if let chat = _users_chats[chatId],
       let user = chat.users[userId],
       user.invite == false {
        if let targetId = target {
            if let t = chat.users[targetId],
               t.invite == false {
                return ws.send(txt:#"{"t":6,"m":4,"p":1,"s":\#(userId),"d":"\#(data)"}"#, t.socket)
            }
        } else {
            var targets = ContiguousArray<Socket>()
            for (id, u) in chat.users {
                if(u.invite == false && id != userId) {
                    targets.append(u.socket)
                }
            }
            return targets.count == 0 || ws.send(txt:#"{"t":6,"m":4,"s":\#(userId),"d":"\#(data)"}"#, targets)
        }
    }
    return false
}

/* ----------------------------------------------- */
/*                 run handling                    */
/* ----------------------------------------------- */

struct RunUses {
    var ownerId : UInt32
    var users : Set<UInt32>
    var probes : Set<UInt32>
}

var _run_uses : [UInt32:RunUses] = [:]   // runId to collection of userIds
var _run_kernel_pending = false

func run_check_perm(userId : UInt32, runId : UInt32) -> Bool {
    if let user = _users[userId] {
        if user.perm.has(.ADMIN_ALL) {
            return true
        }
        let qry = SQLQry("""
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm FROM users_groups g, runs r
                                        WHERE g.users_id = $1 
                                            AND r.id = $2
                                            AND r.groups_id = g.groups_id 
                            )
                            SELECT (r.users_id = $1 OR p.perm IS NOT NULL) AS perm 
                                FROM runs r, perm p WHERE r.id = $2
                         """)
        qry.values = [userId, runId]
        if <!qry.exec() != false, 
           qry.numRows == 1 {
            return true
        }
    }
    
    return false
}

enum RunExecResult : UInt32 {
    case OK             = 0
    case FAIL           = 1
    case NEED_COMPILE   = 2
}

func run_exec(key : inout String, flags: UInt32, ticket : Int64, time : Int64, userId : UInt32, runId : UInt32, target : ProbeTarget) -> RunExecResult {
    if run_check_perm(userId:userId, runId:runId),
       let pinfo = probe_get_info(probe:target) {
        let kversion = pinfo.kversion 
        let triple_options = pinfo.minfo.triple_options
        if <!Dir.run_binary.access("\(runId)/\(kversion)/\(triple_options)/user.bin", mode:.R_OK) == false ||
           <!Dir.run_binary.access("\(runId)/\(kversion)/\(triple_options)/ebpf.bin", mode:.R_OK) == false {
            return .NEED_COMPILE
        }
    
        if let user = _users[userId],
           let pinfo = probe_get_info(probe:target) {
            
            if user.activeRunId != 0 && user.activeRunId != runId && !user_remove_active_run(uid:userId) {
                return .FAIL
            }
            
            
            if pinfo.activeRunId != runId && !probe_set_active_run(socket:target.s, runId:runId, userId:userId, force:false) {
                return .FAIL
            }
            
            if !user_set_active_run(uid:userId, runId:runId) {
                return .FAIL
            }
               
            _nonce = _nonce &+ 1 
            if let sign = user_create_probe_ticket(key:&key, userId:userId, ticket:ticket, time:time, nonce:_nonce, data:UInt64(runId)),
               probe_send_to(probe:target, data:#"{"t":6,"r":\#(ticket),"f":\#(flags), "u":\#(userId),"x":\#(time), "y":\#(runId),"o":\#(_nonce),"s":\#(sign)}"#) != false {
                return .OK
            }
        }
    }
    
    return .FAIL
}

func process_send_error(ticket : Int64, userId : UInt32, errFile : inout FileItem, outFile : inout FileItem) {
    if let uinfo = _users[userId],
       let errInfo = <!errFile.stat_open, 
       let outInfo = <!outFile.stat_open {
        var d = CBOR(bufferSize:64)
        _ = d.put(mapSize:4)
        _ = d.put(sstring:"t")
        _ = d.put(int:5)
        _ = d.put(sstring:"n")
        _ = d.put(int:Int(ticket))
        _ = d.put(sstring:"e")
        _ = d.put(stringSize:errInfo.size)
        _ = ws.cont(bytes:d, first:true, uinfo.socket)
        _ = ws.cont(bytes:errFile.getView(0, errInfo.size), uinfo.socket)
        
        d.reset()
        _ = d.put(sstring:"o")
        _ = d.put(stringSize:outInfo.size)
        _ = ws.cont(bytes:d, uinfo.socket)
        _ = ws.cont(bytes:outFile.getView(0, outInfo.size), last:true, uinfo.socket)
    }
}

func kernel_make(ticket : Int64, userId : UInt32, kversion : UInt64, minfo : MachineInfo) -> Bool {
    var err = AsyncError()
    defer {
        _ = <!Dir.tmp.remove("\(kversion)", outer:true)
    }
    
    _ = <!Dir.kernel_source.mkpath("\(kversion)", [.U0700, .G0050, .O0001])
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open("\(kversion)", .O_DIRECTORY),
       var include = err <! Dir.tmp.open("\(kversion)/include", .O_DIRECTORY),
       var arch_include = err <! Dir.tmp.open("\(kversion)/arch/\(minfo.karch)/include", .O_DIRECTORY),
       var out = err <! Dir.tmp.open("\(kversion)/out", .O_DIRECTORY),
       let target = <!Dir.kernel_source.open("\(kversion)"),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
       let karch = minfo.karch
       let triple_options = minfo.triple_options
       let cross_info = minfo.cross_compiler
       let compiler_options = minfo.compiler_options
       let cross_compile = cross_info.prefix
        let env = ["PATH=../../probe_bin:../../probe_bin_gcc:/usr/bin:/usr/sbin:/sbin:/bin"]
        if let _ = err <! Process.exec(bin, args:["appudo_runner", "make", "CROSS_COMPILE=\(cross_compile)",
                                                  "KBUILD_CFLAGS=-includeprobe_kernel_fix.h -I${PWD}/../../probe_kernel_fix",
                                                  "ARCH=\(karch)", "INSTALL_HDR_PATH=out", compiler_options.board], 
                                            env:env, cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:[.SUID, .ADD_PWD]) {
            if let _ = err <! Process.exec(bin, args:["appudo_runner", "make", "CROSS_COMPILE=\(cross_compile)", 
                                                      "KBUILD_CFLAGS=-includeprobe_kernel_fix.h -I${PWD}/../../probe_kernel_fix",
                                                      "ARCH=\(karch)", "INSTALL_HDR_PATH=out", "prepare"], 
                                                env:env, cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:[.SUID, .ADD_PWD]) {
                do {             
                    if minfo.karch == .arm64 {
                        if var arm_include = err <! Dir.tmp.open("\(kversion)/arch/arm/include", .O_DIRECTORY), 
                           let arm = <!out.mkpath("arm", [.U0700, .G0050, .O0001]),
                           <!arm_include.rename("include", arm) != false {
                            
                        } else {
                            throw SimpeError.Default
                        }
                    }
                    if <!include.rename("include", out) != false,
                       <!arch_include.rename("arch_include", out) != false,
                       <!out.rename(triple_options, target) != false {
                        return true
                    } else {
                    }
                } catch {
                    
                }
            } else {
                process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
            }
            
        } else {
            process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
        }
        
    }
    _ = <!Dir.kernel_source.remove("\(kversion)\(minfo.triple_options)", outer:true)
    return false
}

func kernel_extract(ticket : Int64, userId : UInt32, file : FileItem, kversion : UInt64) -> Bool {
    var err = AsyncError()
    _ = <!Dir.tmp.mkpath("\(kversion)/out", [.U0700, .G0050, .O0001])
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open("\(kversion)", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_archiver", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_archiver", "-x", "-s", "1", file], env:["PATH=/usr/lib"], 
                                       cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            return true
        } else {
            process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
        }
    }
    
    _ = <!Dir.tmp.remove("\(kversion)", outer:true)

    return false
}

func kernel_get_archive(kversion : UInt64) -> String {
    let C = kversion & 0xFF
    let B = (kversion >> 8) & 0xFF
    let A = (kversion >> 16) & 0xFF
    var V = "\(A).\(B)"
    if(C != 0) {
        V += ".\(C)"
    }
    
    return "v\(A).x/linux-\(V).tar.xz"
}

func debug(_ msg : String) {
    if var f = <!Dir.tmp.open("debug.txt", [.O_CREAT, .O_RDWR]) {
        if let s = <!f.stat, 
           s.size > 32000 {
               _ = <!f.truncate(0)
           }
        _ = <!f.append("\(msg)\n")
    }
}

func _run_download_kernel(ticket : Int64, userId : UInt32, runId : UInt32, kversion : UInt64, minfo : MachineInfo) -> Bool {
    var err = AsyncError()
    if _run_kernel_pending == false,
       var target = err <! FileItem.create_tmp() {
        _run_kernel_pending = true
        let client = HTTPClient.get(.GET, Link.to(url:"\(Setting.kernel_url.value)\(kernel_get_archive(kversion:kversion))"))
        
        _ = client.send(result:target).then({ (_ res : Bool) -> Void in
            if let uinfo = _users[userId] {
            
                if res == true {
                    _ = <!Dir.kernel_source.mkpath("\(kversion)", [.U0700, .G0050, .O0001])
                    if let to = <!Dir.kernel_source.open("\(kversion)/source.tar.xz", [.O_CREAT, .O_TRUNC, .O_RDWR]) {
                        _ = <!target.send(to)
                    }
                }
            
                if res == false ||
                   kernel_extract(ticket:ticket, userId:userId, file:target, kversion:kversion) == false ||
                   kernel_make(ticket:ticket, userId:userId, kversion:kversion, minfo:minfo) == false {
                    _ = ws.send(txt:#"{"t":5,"r":\#(RunCompileResult.FAIL.rawValue),"n":\#(ticket)}"#, uinfo.socket)
                    _run_kernel_pending = false
                    return
                }
                
                _run_kernel_pending = false
                let r = _run_compile(ticket:ticket, userId:userId, runId:runId, kversion:kversion, minfo:minfo)
                if r != .OK {
                    _ = ws.send(txt:#"{"t":5,"r":\#(r.rawValue),"n":\#(ticket)}"#, uinfo.socket)
                }
                user_run_inform_pending()
            } else {
                _run_kernel_pending = false
            }
        })
    } else {
        return false
    }
    return true
}

enum RunCompileResult : UInt32 {
    case OK                 = 0
    case FAIL               = 1
    case MISSING_SOURCES    = 2
    case PENDING            = 3
    case TRY_LATER          = 4
}

func run_compile(ticket : Int64, userId : UInt32, runId : UInt32, kversion : UInt64, minfo : MachineInfo) -> RunCompileResult {
    let triple_options = minfo.triple_options
    if <!Dir.run_binary.access("\(runId)/\(kversion)/\(triple_options)/user.bin", mode:.R_OK) != false,
       <!Dir.run_binary.access("\(runId)/\(kversion)/\(triple_options)/ebpf.bin", mode:.R_OK) != false,
       let uinfo = _users[userId] {
        _ = ws.send(txt:#"{"t":5,"r":\#(0),"d":\#(0),"n":\#(ticket)}"#, uinfo.socket) 
       return .OK
    }
    
    if(user_run_has_pending(userId:userId)) {
        return .PENDING
    }
    
    _ = <!Dir.run_binary.mkpath("\(runId)/\(kversion)/\(triple_options)", [.U0700, .G0050, .O0001])
    let p = "\(runId)/\(kversion)/\(triple_options)/pending"
    var err = AsyncError()
    if let pending = err <! Dir.run_binary.mkpath(p, [.U0700, .G0050, .O0001], flags:.MKDIR) {
        _pending_compile = true
        if <!Dir.kernel_source.access("\(kversion)/\(triple_options)", mode:.R_OK) == false {
            if _run_kernel_pending == true {
                _ = <!pending.remove()
                _pending_compile = false
                return .PENDING
            }
            
            if let source = <!Dir.kernel_source.open("\(kversion)/source.tar.xz", .O_RDONLY) {
                if _run_kernel_pending == true {
                    _ = <!pending.remove()
                    _pending_compile = false
                    return .PENDING
                }
                _run_kernel_pending = true
                if let uinfo = _users[userId] {
                   if kernel_extract(ticket:ticket, userId:userId, file:source, kversion:kversion) == false ||
                      kernel_make(ticket:ticket, userId:userId, kversion:kversion, minfo:minfo) == false {
                        _ = ws.send(txt:#"{"t":5,"r":\#(RunCompileResult.FAIL.rawValue),"n":\#(ticket)}"#, uinfo.socket)
                        _run_kernel_pending = false
                        _ = <!pending.remove()
                        _pending_compile = false
                        return .OK
                    }
                    _run_kernel_pending = false
                    let r = _run_compile(ticket:ticket, userId:userId, runId:runId, kversion:kversion, minfo:minfo)
                    if r != .OK {
                        _ = ws.send(txt:#"{"t":5,"r":\#(r.rawValue),"n":\#(ticket)}"#, uinfo.socket)
                    }
                } else {
                    _run_kernel_pending = false
                }
            } else {
                if _run_download_kernel(ticket:ticket, userId:userId, runId:runId, kversion:kversion, minfo:minfo) == false {
                    _ = <!pending.remove()
                    _pending_compile = false
                    return .FAIL
                }
            }
            
            return .OK
        }
    
        return _run_compile(ticket:ticket, userId:userId, runId:runId, kversion:kversion, minfo:minfo)
    } else {
        if err.asRAW == .EXIST {
            if(_pending_compile == false) {
                _ = <!Dir.run_binary.remove("\(runId)/\(kversion)/\(triple_options)/pending", outer:true)
                return run_compile(ticket:ticket, userId:userId, runId:runId, kversion:kversion, minfo:minfo)
            }
        }
        if err.asRAW == .AGAIN {
            return .PENDING
        }
    } 
    return .FAIL
}

func _run_compile(ticket : Int64, userId : UInt32, runId : UInt32, kversion : UInt64, minfo : MachineInfo) -> RunCompileResult {
    var ok = false
    var err = AsyncError()
    let triple = minfo.triple
    let triple_novendor = minfo.triple_novendor
    let triple_options = minfo.triple_options
    let cross_info = minfo.cross_compiler
    let cross_compile = cross_info.prefix
    defer {
        _ = <!Dir.run_binary.remove("\(runId)/\(kversion)/\(triple_options)/pending", outer:true)
        _pending_compile = false
    }
    let compiler_options = minfo.compiler_options
    var ebpf_args : [String] = ["clang", compiler_options.options, "--target=\(minfo.bpf_target)", "-O2",
                                "-nostartfiles", "-static", "-fuse-ld=bpf", "-fno-builtin", "-Xclang", 
                                "-nostdsysteminc", "-Xclang", "-nobuiltininc",
                                "-o", "../probe_run_binary/\(runId)/\(kversion)/\(triple_options)/ebpf.bin",
                                "-isystem../lib/clang_include", 
                                cross_info.bpf_options,
                                "-D__KERNEL__", "-D__TARGET_ARCH_\(minfo.karch)", "-D__BPF_TRACING__",
                                "-Wno-unused-value", "-Wno-pointer-sign", "-Wno-compare-distinct-pointer-types", 
                                "-Wno-gnu-variable-sized-type-not-at-end", "-Wno-tautological-compare",
                                    "-include../probe_kernel_source/\(kversion)/\(triple_options)/include/linux/kconfig.h",
                                    "-I../probe_ebpf_source",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/include",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/include/uapi",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/include/generated/uapi",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/arch_include",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/arch_include/uapi",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/arch_include/generated",
                                    "-I../probe_kernel_source/\(kversion)/\(triple_options)/arch_include/generated/uapi"]
                                    
    // TODO create fast compilable dummies for libcxx, libcxxabi, libc + setup clang arguments to not use gnu
    var user_args : [String] = ["clang",
                                compiler_options.options,
                                "--target=\(triple)", "-O2", "-shared",
                                "-D_PNO=-1",
                                "-rtlib=compiler-rt",
                                "-stdlib=libc++",
                                "-nostdinc",
                                "-nostartfiles",
                                "-isystem../lib/libc/include",
                                "-isystem../lib/libcxx/include/c++/v1", 
                                "-L../lib/libc/lib/\(triple_novendor)",
                                "-L../lib/libcxx/lib/\(triple_novendor)",
                                "-B/usr/\(cross_compile.dropLast())/bin",
                                "-o../probe_run_binary/\(runId)/\(kversion)/\(triple_options)/user.bin",
                                "../probe_user_source/helpers_begin.cpp"]
    
    var single_user_args : [String] = ["clang", 
                                       "",  // in
                                       "-o",
                                       "",  // out
                                       "",  // inc
                                       "",  // macro
                                       "-c",
                                       compiler_options.options,
                                       "--target=\(triple)", 
                                       "-rtlib=compiler-rt",
                                       "-nostdinc",
                                       "-nostartfiles",
                                       "-stdlib=libc++",
                                       "-B/usr/\(cross_compile.dropLast())/bin",
                                       "-isystem../lib/libc/include",
                                       "-isystem../lib/libcxx/include/c++/v1", 
                                       "-L../lib/libc/lib/\(triple_novendor)",
                                       "-L../lib/libcxx/lib/\(triple_novendor)",
                                       "-I../probe_user_source",
                                       "-O2", 
                                       "-fPIC"]
                                       
    let qry = SQLQry("SELECT m.id, modules_id FROM run_instances r, module_instances m WHERE runs_id = $1 AND r.module_instances_id = m.id;")
    qry.values = [runId]
    var insts : Set<String> = []
    let env = ["PATH=../probe_bin:/usr/lib:/usr/bin:/bin"]
    if let dir = err <! Dir.module_gen_source.open(".", .O_DIRECTORY) {
        if <!qry.exec() != false,
           var errFile = err <! FileItem.create_tmp(),
           var outFile = err <! FileItem.create_tmp(),
           let bin = err <! Dir.bin.open("clang", .O_RDONLY) {
            ok = true
            for i in 0..<qry.numRows {
                let iid = qry.getAsInt32(i, 0) ?? -1
                let moduleId = qry.getAsInt32(i, 1) ?? -1
                if <!Dir.module_gen_source.access("\(moduleId)/\(iid)/ebpf.c", mode:.R_OK) == false || 
                   <!Dir.module_gen_source.access("\(moduleId)/\(iid)/user.cpp", mode:.R_OK) == false {
                    if let user = _users[userId] {
                        _ = ws.send(txt:#"{"t":5,"e":1,"m":\#(moduleId),"i":\#(iid),"n":\#(ticket)}"#, user.socket)  
                    }
                    return .MISSING_SOURCES
                }
                
                let inc = "-I../probe_module_gen_source/\(moduleId)/\(iid)"
                if(insts.contains(inc)) {
                    continue
                }
                
                insts.insert(inc)
                ebpf_args.append("../probe_module_gen_source/\(moduleId)/\(iid)/ebpf.c")
                ebpf_args.append(inc)
                
                let out = "../probe_run_binary/\(runId)/\(kversion)/\(triple_options)/pending/\(moduleId)_\(iid).o"
                single_user_args[1] = "../probe_module_gen_source/\(moduleId)/\(iid)/user.cpp"
                single_user_args[3] = out
                single_user_args[4] = inc 
                single_user_args[5] = "-D_PNO=\(iid)"
                if let _ = err <! Process.exec(bin, args:single_user_args, env:env, cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
                    user_args.append(out)
                } else {
                    process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
                    ok = false
                    break
                }
            }
        }
        
        if ok {
            user_args.append("../probe_user_source/helpers_end.cpp")
            if var errFile = err <! FileItem.create_tmp(),
               var outFile = err <! FileItem.create_tmp(),
               let bin = err <! Dir.bin.open("ld.bpf", .O_RDONLY) {
                if let _ = err <! Process.exec(bin, args:ebpf_args, env:env, cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
                    if var errFile = err <! FileItem.create_tmp(),
                       var outFile = err <! FileItem.create_tmp(),
                       let bin = err <! Dir.bin.open("clang", .O_RDONLY) {
                        if let _ = err <! Process.exec(bin, args:ebpf_args, env:["PATH=../probe_bin:../probe_bin_gcc:/usr/lib:/usr/bin:/bin"], 
                                                       cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
                            
                            if var errFile = err <! FileItem.create_tmp(),
                               var outFile = err <! FileItem.create_tmp() {
                                if let _ = err <! Process.exec(bin, args:user_args, env:env, cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
                                    if let user = _users[userId] {
                                        _ = ws.send(txt:#"{"t":5,"r":\#(0),"d":\#(0),"n":\#(ticket)}"#, user.socket)      
                                        return .OK
                                    }
                                } else {
                                    process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
                                }
                            }
                        } else {
                            process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
                        }
                    }
                } else {
                    process_send_error(ticket:ticket, userId:userId, errFile:&errFile, outFile:&outFile)
                }
            }
        }
    }
    _ = <!Dir.run_binary.remove("\(runId)/\(kversion)/\(triple_options)", outer:true)
    return .FAIL
}

/* ----------------------------------------------- */
/*                 ws handling                     */
/* ----------------------------------------------- */

func onStart() -> Void {
    _ = compilers_fetch()
    _ = compiler_options_fetch()
    _pending_run = true
    let qry = SQLQry("DELETE FROM probes_active;")
    _ = <!qry.exec()
    _ = ws.close(hard:true)
    _pending_run = false
    pending_try()
}

func onControl(ev : WebSocketEvent) -> ControlResult {
    return .OK
}

func getBase64len(_ buffer : inout ManagedCharBuffer, _ bufferLen : Int) -> Int {
    var len = bufferLen
    len -= 1
    len -= buffer.data[len] == 61 ? 1 : 0
    len -= buffer.data[len] == 61 ? 1 : 0
    return len + 1
}

func onConnect(ev : WebSocketEvent, remoteAddr : InetAddr) -> Void {
    if let param = LoginParam.from(json:ev.data as? String ?? "", customValueParser:LoginParam.sizedValueParser) {
    
        ev.dataModeOn
    
        if(param.p == 1) {
            let qry = SQLQry("""
                                    SELECT probes.id, probes_settings.id AS sid, groups_id, key, settings #>> '{}' FROM probes, probes_settings 
                                        WHERE login = $1
                                        AND probes.id = probes_settings.probes_id
                                        AND (($2::TEXT IS NULL AND identifier IS NULL) OR ($2::TEXT LIKE identifier || '%'))
                             """)
            qry.values = [param.l, param.i ?? Optional<String>.none as Any]
            if  <!qry.exec() != false {
                if qry.numRows == 1 {
                    let id = qry.getAsInt32(0, 0) ?? -1
                    let sid = qry.getAsInt32(0, 1) ?? -1
                    let group = qry.getAsInt32(0, 2) ?? -1
                    let key = qry.getAsText(0, 3) ?? ""
                    let settings = qry.getAsText(0, 4) ?? ""
                    var outBuffer = ManagedCharBuffer.create(64)
                    var resBuffer = ManagedCharBuffer.create(64)
                    if let hmac = HMAC.begin(key, flags:.SHA256),
                       <!hmac.update(param.r ?? "") != false,
                       <!hmac.update(param.t ?? -1) != false,
                       <!hmac.update(param.l) != false,
                       <!hmac.update(param.n ?? -1) != false,
                       param.i == nil || <!hmac.update(param.i ?? "") != false,
                       let m = <!hmac.finish(outBuffer),
                       let s = <!Base64.encode(outBuffer, resBuffer, inSizeLimit:m),
                       param.k == resBuffer.toString(getBase64len(&resBuffer, s)) {
                        if let rhmac = HMAC.begin(key, flags:.SHA256),
                           let r = <!Rand.bytes(resBuffer, sizeLimit:32),
                           let k = <!Base64.encode(resBuffer, outBuffer, inSizeLimit:r),
                           let n = outBuffer.toString(getBase64len(&outBuffer, k)),
                           <!rhmac.update(n),
                           let f = <!rhmac.finish(outBuffer),
                           let o = <!Base64.encode(outBuffer, resBuffer, inSizeLimit:f),
                           let t = resBuffer.toString(getBase64len(&resBuffer, o)) {
                           let socket = ev.target
                           
                            if let minfo = probe_set_active(socket:ev.target, id:id, settings_id:sid, 
                                                            remoteAddr:remoteAddr, version_str:param.v ?? "", identifier:param.i) {
                                let j = #"{"t":1,"id":\#(id),"g":\#(group),"r":"\#(n)","p":"\#(t)","c":\#(socket.value),"m":"\#(minfo.triple)","s":[\#(settings)]}"#
                                _ = ws.send(txt:j, socket)
                                ev.set(sdata:Int(bitPattern:(UInt(id) << 32) | 1))
                                return
                            }
                        }
                    }
                }
            }
        } else {
            if let id = param.t {
                let qry = SQLQry("SELECT id, perm FROM users WHERE id = $1 AND login_cookie = $2")
                qry.values = [id, param.k]
                if(<!qry.exec() != false && qry.numRows == 1) {
                    let id = qry.getAsInt32(0, 0) ?? -1
                    let perm = qry.getAsInt32(0, 1) ?? 0
                    _ = _users_pending.insert(UInt32(bitPattern:id))
                    _users[UInt32(bitPattern:id)] = UserInfo(socket:ev.target, perm:UserPermissions(rawValue:perm))
                    ev.set(sdata:Int(bitPattern:(UInt(id) << 32)))
                    let j = #"{"t":4,"s":\#(ev.target.value)}"#
                    _ = ws.send(txt:j, ev.target)
                    pending_try()
                    return
                }
            }
        }
    }
    ev.target.close()
}

func onDisconnect(ev : WebSocketEvent) -> Void {
    let p = UInt(bitPattern:ev.sockData)
    let type = UInt32(p & UInt(0xFFFFFFFF))
    let id = UInt32(p >> 32)
    if type == 1 {
        _ = probe_remove_active_run(socket:ev.target.value, userId:0, force:true)
        probe_unset_active(socket:ev.target)
    } else {
        _ = _users_pending.remove(id)
        _ = user_remove_active_run(uid:id)
        if let uinfo = _users.removeValue(forKey:id) {
            if uinfo.chatId != 0 {
                _ = _chat_leave_user(userId:id, _chatId:uinfo.chatId)
            }
            if(uinfo.hasPending) {
                _run_pending.remove(id)
            }
        }
    }
}

func probe_on_message(_ id : UInt32, _ msg : MsgParam, _ data : String, _ socket : Socket) -> Bool {
    var res = false
    switch(msg.t) {
        case .PROBE_USER_SEND:
            if let userId = msg.x {
                if(user_send_to(uid:UInt32(userId), data:String(data.dropFirst(Int(strtoul(msg.data, nil, 16))))) == false) {
                    
                }
                res = true
            }
        default:
            break
    }
    return res
}

struct DissassemblyInfo : FastCodable {
    let p : String
    let c : Int
    let k : String
}

func user_on_message(_ id : UInt32, _ msg : MsgParam, _ data : String, _ socket : Socket) -> Bool {
    var res = false
    let perm = user_get_perm(uid:id)
    switch(msg.t) {
        case .USER_PROBE_PATH_GET:
            if perm.has(.DISASSEMBLER_USE),
               let target = msg.p,
               let ticket = msg.r,
               let time = msg.x {
                res = true
                if(probe_send_to(probe:target, data:#"{"t":2,"d":"\#(msg.data)","r":\#(ticket),"u":\#(id),"x":\#(time)}"#) == false) {
                    _ = ws.send(txt:#"{"t":3,"r":1,"w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                }
            }
        case .USER_PROBE_DISS_GET:
            let diss = String(data.dropFirst(Int(strtoul(msg.data, nil, 16))))
            if perm.has(.DISASSEMBLER_USE),
               let target = msg.p,
               let ticket = msg.r,
               let time = msg.x,
               let d = DissassemblyInfo.from(json:diss) {
                res = true
                if(d.c == 0) {
                    let qry = SQLQry("""
                                        WITH sel AS (
                                            SELECT id::TEXT, RIGHT(path, 4) = 'data' AS data FROM disassembly
                                                WHERE (path = $1 || '_view' OR path = $1 || '_data') AND probes_id = $2
                                        ),
                                        agg AS (
                                            SELECT string_agg(id, ',' ORDER BY data) AS data FROM sel
                                        ) SELECT data FROM agg WHERE data != ''
                                     """)
                    qry.values = [d.p, target.id]
                    if <!qry.exec() != false && qry.numRows == 1 {
                        let d = qry.getAsText(0, 0) ?? ""
                        _ = ws.send(txt:#"{"t":3,"r":17,"d":"\#(d)","w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                        break
                    }
                }
                
                _nonce = _nonce &+ 1
                
                var key = d.k
                if let sign = user_create_probe_ticket(key:&key, userId:id, ticket:ticket, time:time, nonce:_nonce, data:UInt64(target.id) << 32 | UInt64(d.c)),
                   probe_send_to(probe:target, data:#"{"t":4,"c":\#(d.c),"p":"\#(d.p)","r":\#(ticket),"u":\#(id),"x":\#(time),"o":\#(_nonce),"s":\#(sign)}"#) == false {
                    _ = ws.send(txt:#"{"t":3,"r":1,"w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                }
            }
        case .USER_TASK_KILL:
            if let target = msg.p,
               let ticket = msg.r,
               let time = msg.x {
                res = true
                if(probe_send_to(probe:target, data:#"{"t":3,"r":\#(ticket),"u":\#(id)}"#) == false) {
                    _ = ws.send(txt:#"{"t":3,"r":1,"w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                }
            }
        case .CHAT_OPEN:
            if perm.has(.CHAT_USE),
               let ticket = msg.r {
                res = true
                let r = chat_open(userId:id, socket:socket)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_INVITE:
            if perm.has(.CHAT_USE),
               let ticket = msg.r,
               let chatId = msg.x {
                res = true
                let r = chat_invite_user(chatId:UInt32(truncatingIfNeeded:chatId), userId:id, name:msg.data)
                _ = ws.send(txt:#"{"t":5,"r":\#(r != nil ? 0 : 1),"d":\#(r ?? 0),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_JOIN:
            if perm.has(.CHAT_USE),
               let ticket = msg.r,
               let chatId = msg.x {
                res = true
                let r = chat_join_user(chatId:UInt32(truncatingIfNeeded:chatId), userId:id, socket:socket)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_LEAVE:
            if perm.has(.CHAT_USE),
               let ticket = msg.r {
                res = true
                let r = chat_leave_user(userId:id)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_MESSAGE:
            if perm.has(.CHAT_USE),
               let ticket = msg.r,
               let chatId = msg.x  {
                res = true
                let r = chat_send_message(userId:id, chatId:UInt32(truncatingIfNeeded:chatId), 
                                          data:String(data.dropFirst(Int(strtoul(msg.data, nil, 16)))), 
                                          target:msg.y != nil ? UInt32(truncatingIfNeeded:msg.y!) : nil)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_USER_UPDATE:
            if perm.has(.CHAT_USE),
               let ticket = msg.r,
               let targetId = msg.x,
               let type = msg.y {
                res = true
                let r = chat_update_user(userId:id, targetId:UInt32(truncatingIfNeeded:targetId), v:type)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .CHAT_JOIN_REQUEST:
            if perm.has(.CHAT_USE),
               let ticket = msg.r {
                res = true
                let r = chat_request_join(userId:id, name:msg.data)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .RUN_EXEC:
            if let target = msg.p, 
               let ticket = msg.r,
               let time = msg.x,
               let y = msg.y {
                let runId = UInt32(truncatingIfNeeded:y)
                let flags = UInt32(truncatingIfNeeded:y >> 32)
                var key = msg.data
                res = true
                let r = run_exec(key:&key, flags:flags, ticket:ticket, time:time, userId:id, runId:runId, target:target)
                if(r != .OK) {
                    _ = ws.send(txt:#"{"t":3,"r":\#(r.rawValue),"w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                }
            }
        case .RUN_COMPILE:
            if let ticket = msg.r,
               let x = msg.x,
               let y = msg.y {
                let runId = UInt32(truncatingIfNeeded:x)
                let flags = UInt32(truncatingIfNeeded:x >> 32)
                let minfo = MachineInfo(machine:UInt64(bitPattern:(y)))
                let tversion = msg.data
                let triple_options = minfo.triple_options
                let kversion = UInt64(strtoul(tversion, nil, 10))
                let clean = (flags & 1) != 0
                let clean_all = (flags & 2) != 0
                res = true
                var r = RunCompileResult.FAIL
                if run_check_perm(userId:id, runId:runId) {
                    if(clean_all) {
                        if let dir = <!Dir.run_binary.open("\(runId)", .O_DIRECTORY),
                           let list = <!dir.listDir() {
                           for item in list {
                               if item.name != "settings.json" {
                                   _ = <!item.remove(outer:true)
                               }
                           }
                        }
                    }
                    if(clean) {
                        _ = <!Dir.run_binary.remove("\(runId)/\(kversion)/\(triple_options)", outer:true)
                    }
                    
                    r = run_compile(ticket:ticket, userId:id, runId:runId, kversion:kversion, minfo:minfo)
                }
                if(r != .OK) {
                    if(r == .PENDING) {
                        if(!user_run_set_pending(userId:id)) {
                            r = .TRY_LATER
                        }
                    }
                    _ = ws.send(txt:#"{"t":5,"r":\#(r.rawValue),"n":\#(ticket)}"#, socket)
                }
                
                if(r != .PENDING && r != .TRY_LATER && !_run_kernel_pending) {
                    user_run_inform_pending()
                }
            }
        case .RUN_VERSION_GET:
            if let target = msg.p,
               let ticket = msg.r,
               let time = msg.x {
                res = true
                if(probe_send_to(probe:target, data:#"{"t":5,"r":\#(ticket),"u":\#(id),"x":\#(time)}"#) == false) {
                    _ = ws.send(txt:#"{"t":3,"r":1,"w":\#(time),"n":\#(ticket),"u":\#(id),"s":\#(probe_get_socket(probe:target))}"#, socket)
                }
            }
        case .RUN_EXEC_STOP:
            if let ticket = msg.r,
               let y = msg.y {
                res = true
                let flags = UInt32(truncatingIfNeeded:y)
                let r = user_stop_active_run(uid:id, flags:flags)
                _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
            }
        case .RUN_EXEC_ATTACH:
            if let ticket = msg.r,
               let _runId = msg.x,
               let ty = msg.y {
                res = true
                let runId = UInt32(truncatingIfNeeded:_runId)
                
                if(ty == 1) {
                    let r = user_attach_active_run(uid:id, runId:runId)
                    _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
                } else {
                    let r = user_remove_active_run(uid:id)
                    _ = ws.send(txt:#"{"t":5,"r":\#(r ? 0 : 1),"n":\#(ticket)}"#, socket)
                }
            }
            
        default:
            break
    }
    return res
}

func onMessage(ev : WebSocketEvent) -> Void {
    let p = UInt(bitPattern:ev.sockData)
    let type = UInt32(p & UInt(0xFFFFFFFF))
    let id = UInt32(p >> 32)
    let socket = ev.target
    if ev.isText {
        let data = ev.data as? String ?? ""
        if let msg = MsgParam.from(json:data, customValueParser:MsgParam.sizedValueParser) {
            let res = type == 1 ? probe_on_message(id, msg, data, socket) : user_on_message(id, msg, data, socket)
            if(res) {
                return
            }
        }
    } else {
        if let buffer = ev.data as? ManagedCharBuffer {
            var cbor = CBOR(buffer:buffer)
            if let _ = cbor.popMapSize(),
               cbor.pop(sstring:"t"),
               let k = cbor.popInt(),
               cbor.pop(sstring:"d"),
               let a = MsgType(rawValue:Int32(truncatingIfNeeded:k)) {
                switch(a) {
                    case .PROBE_USER_SEND:
                        if let _probe = _probes[socket.value],
                           let probe = _probe,
                           let users = _run_uses[probe.activeRunId]?.users {
                            for userId in users {
                                if(user_send_to(uid:userId, data:buffer.getView(size:buffer.data.size, offset:cbor.count), probeSocket:socket.value) == false) {
                                    
                                }
                            }
                        }
                    default:
                        break
                }
                
                return
            }
        }
    }
    socket.close(hard:true)
}

func extract_uint64(_ str : inout String, _ begin : Int, _ end : Int) -> UInt64 {
    let s = str[str.index(str.startIndex, offsetBy: begin)..<str.index(str.startIndex, offsetBy: end)]
    return UInt64(strtoul(String(s), nil, 16))
}

func probe_set_active(socket : Socket, id : Int32, settings_id : Int32, remoteAddr : InetAddr, version_str : String, identifier : String?) -> MachineInfo? {
    if version_str.count >= 32 {
        var s = version_str
        let kversion = extract_uint64(&s, 0, 16)
        let version = UInt32(truncatingIfNeeded:extract_uint64(&s, 16, 24))
        let karch_be_options = extract_uint64(&s, 24, 32)
        let triple = String(s.dropFirst(32))
        if let minfo = try? MachineInfo(karch_be_options:karch_be_options, triple:triple) {
            
            _probes[socket.value] = Optional<ProbeInfo>.none
            _probe_pending[socket.value] = ProbeConnect(id:id, 
                                                        settings_id:settings_id, 
                                                        remoteAddr:remoteAddr, 
                                                        kversion:kversion,
                                                        version:version, 
                                                        machine:minfo.machine,
                                                        identifier:identifier)
            pending_try()
            
            return minfo
        }
    }
    
    return nil
}

func probe_unset_active(socket : Socket) {
    let connected = _probes.removeValue(forKey:socket.value) != nil
    if _probe_pending.removeValue(forKey:socket.value) == nil && connected {
        _probe_pending[socket.value] = nil as ProbeConnect?
        pending_try()
    }
}

func pending_try() {
    if(!_pending_run) {
        _pending_run = true
        _ = AsyncTimer.wait(millis:5000).then {
            pending_handle()
        }
    } else {
        _pending_request = true
    }
}

func pending_handle() {
    let users_pending = _users_pending
    let probe_pending = _probe_pending
    _probe_pending = [:]
    _users_pending = []
    
    let qry_ins = SQLQry("""
                            WITH ins AS (
                                INSERT INTO probes_active AS p (socket, identifier, probes_settings_id, probes_id, remote_addr, time) VALUES ($1, $2, $3, $4, $5, 1)
                                    ON CONFLICT (socket) DO UPDATE 
                                      SET socket = -p.socket,
                                          probes_id = -p.probes_id,
                                          time = 0 RETURNING time
                            )
                            INSERT INTO probes_active (socket, identifier, probes_settings_id, probes_id, remote_addr, time) 
                                SELECT  $1, $2, $3, $4, $5, 1 FROM ins WHERE time = 0;
                         """)
                         
    let qry_del = SQLQry("""
                            UPDATE probes_active SET socket = -socket,
                                                     probes_id = -probes_id,
                                                     time = 0 
                                          WHERE socket = $1;
                         """)
                           
    for (socket, _con) in probe_pending {
        if let con = _con {
            qry_ins.values = [socket, con.identifier ?? "" as Any, con.settings_id, con.id, <!con.remoteAddr.toString() ?? ""]
            if <!qry_ins.exec() != false {
                let machine = con.machine
                let minfo = MachineInfo(machine:machine)
                _probes[socket] = ProbeInfo(id:con.id, idn:con.identifier, kversion:con.kversion, version:con.version, minfo:minfo)
            } else {
                _probes[socket] = nil
                Socket(v:socket).close(hard:true)
            }
        } else {
            qry_del.values = [socket]
            _ = <!qry_del.exec()
        }
    }
            
    var qry = SQLQry("""
                            WITH upd AS (
                                UPDATE probes_active SET time = $1 WHERE time = 1 RETURNING probes_id, socket, identifier, 1 as type
                            ),
                            del AS (
                                DELETE FROM probes_active WHERE time = 0 RETURNING probes_id, socket, identifier, 0 as type
                            ),
                            comb AS (
                                SELECT probes_id, socket, identifier, type FROM upd 
                                    UNION 
                                SELECT 0 - probes_id AS probes_id, 0 - socket AS socket, identifier, type FROM del
                            )
                            SELECT DISTINCT probes_id, users.id, socket, identifier, type FROM comb, probes, users_groups, users 
                                WHERE comb.probes_id = probes.id AND 
                                ((probes.groups_id = users_groups.groups_id AND
                                users_groups.users_id = users.id) OR probes.users_id = users.id) AND
                                users.login_cookie IS NOT NULL
                                    ORDER BY users.id, type;
                     """)
                     
    qry.values = [Date().to1970]
    if  <!qry.exec() != false {
        for i in 0..<qry.numRows {
            let userId = qry.getAsInt32(i, 1) ?? -1
            if users_pending.contains(UInt32(bitPattern:userId)) == false,
               let info = _users[UInt32(bitPattern:userId)] {
                let probes_id = qry.getAsInt32(i, 0) ?? -1
                let probe_socket = qry.getAsInt32(i, 2) ?? 0
                let identifier = qry.getAsText(i, 3) ?? ""
                let type = qry.getAsInt32(i, 4) ?? -1
                let probe = (_probes[UInt32(bitPattern:probe_socket)] ?? ProbeInfo.empty)!
                let version = type == 1 ? #","v":\#(probe.version),"kv":"\#(probe.kversion)","m":\#(probe.minfo.machine)"# : ""
                _ = ws.send(txt:#"{"t":\#(type),"id":\#(probes_id),"s":\#(probe_socket),"i":"\#(identifier)"\#(version)}"#, info.socket)
                // TODO combine messages per user
            }
        }
    }
    
    qry = SQLQry("""
                        SELECT DISTINCT probes_id, socket, identifier FROM probes_active, probes, users_groups, users 
                            WHERE probes_active.probes_id = probes.id AND 
                            ((probes.groups_id = users_groups.groups_id AND
                            users_groups.users_id = users.id) OR probes.users_id = users.id) AND
                            users.login_cookie IS NOT NULL AND 
                            users.id = $1;
                 """)
    
    for userId in users_pending {
        if let info = _users[userId] {
            qry.values = [userId]
            if <!qry.exec() != false {
                for i in 0..<qry.numRows {
                    let probes_id = qry.getAsInt32(i, 0) ?? -1
                    let probe_socket = qry.getAsInt32(i, 1) ?? 0
                    let identifier = qry.getAsText(i, 2) ?? ""
                    let probe = (_probes[UInt32(bitPattern:probe_socket)] ?? ProbeInfo.empty)!
                    _ = ws.send(txt:#"{"t":1,"id":\#(probes_id),"s":\#(probe_socket),"i":"\#(identifier)", "v":\#(probe.version),"kv":"\#(probe.kversion)","m":\#(probe.minfo.machine)}"#, info.socket)
                }
            }
        }
    }
    
    _pending_run = false
    if(_pending_request) {
        _pending_request = false
        pending_try()
    }
}

func user_send_to(uid : UInt32, data : String) -> Bool {
    if let info = _users[uid] {
        return ws.send(txt:data, info.socket)
    }
    return false
}

func user_send_to(uid : UInt32, data : DataView, probeSocket : UInt32) -> Bool {
    if let info = _users[uid] {
        var d = CBOR(bufferSize:32)
        _ = d.put(sstring:"p")
        _ = d.put(int:Int(probeSocket))
        return ws.cont(bytes:data, first:true, info.socket) && ws.cont(bytes:d, last:true, info.socket)
    }
    return false
}

func user_create_probe_ticket(key : inout String, userId : UInt32, ticket : Int64, time : Int64, nonce : Int32, data : UInt64) -> UInt64? {
    let outBuffer = ManagedCharBuffer.create(64)
    
    if let hmac = HMAC.begin(key, flags:.SHA256),
       <!hmac.update(Int(userId)) != false,
       <!hmac.update(Int(ticket)) != false,
       <!hmac.update(Int(time)) != false,
       <!hmac.update(Int(nonce)) != false,
       <!hmac.update(Int(Int64(bitPattern:data))) != false,
       let _ = <!hmac.finish(outBuffer),
       let v = outBuffer.toInt(0) {
        return UInt64(bitPattern:Int64(v))
    }
    
    return nil
}

func user_run_set_pending(userId : UInt32) -> Bool {
    if var info = _users[userId],
       info.hasPending == false, 
       _run_pending.count < 128 {
        info.hasPending = true
        _users[userId] = info
        _run_pending.insert(userId)
        return true
    }
    return false
}

func user_run_remove_pending(userId : UInt32) -> Bool {
    if var info = _users[userId],
       info.hasPending == true {
       info.hasPending = false
       _users[userId] = info
       _run_pending.remove(userId)
        return true
    }
    return false
}

func user_run_has_pending(userId : UInt32) -> Bool {
    var v = false
    if _run_pending_who == userId {
        _run_pending_who = 0 
        v = Timer.tick1s - _run_pending_when < 5
    }

    return !v && !_run_pending.isEmpty
}

func user_run_inform_pending() {
    let msg = #"{"t":7}"#
    var uinfo = UserInfo()
    for userId in _run_pending {
        if let _uinfo = _users[userId] {
            uinfo = _uinfo
            uinfo.hasPending = false
            _users[userId] = uinfo
            _run_pending_who = userId
            _run_pending_when = Timer.tick1s
            _ = ws.send(txt:msg, uinfo.socket)
            _run_pending.remove(userId)
            break
        } else {
            _run_pending.remove(userId)
        }
    }
}

func user_set_active_run(uid : UInt32, runId : UInt32) -> Bool {
    if var info = _users[uid] {
        if info.activeRunId == runId {
            return true
        }
        if info.activeRunId == 0 {
            info.activeRunId = runId
            _users[uid] = info
            if var ru = _run_uses[runId] {
                if(ru.users.count >= 20) {
                    return false
                }
                ru.users.insert(uid)
                _run_uses[runId] = ru
            } else {
                _run_uses[runId] = RunUses(ownerId:uid, users:[uid], probes:[])
            }
            return true
        }   
    }
    return false
}

func user_stop_active_run(uid : UInt32, flags : UInt32) -> Bool {
    if var info = _users[uid],
       info.activeRunId != 0 {
        let runId = info.activeRunId
        info.activeRunId = 0
        _users[uid] = info
        
        if var m = _run_uses[runId] {
            _run_uses.removeValue(forKey:runId)
            user_run_change(users:&m.users, runId:runId)
            probe_run_change(probes:&m.probes, runId:runId, uid:uid, flags:flags)
            return true
        }
    }
    return false
}

func user_attach_active_run(uid : UInt32, runId : UInt32) -> Bool {
    if var info = _users[uid] {
        if info.activeRunId == runId {
            return true
        }
        
        if info.activeRunId == 0 || user_remove_active_run(uid:uid) {
            info.activeRunId = runId
            _users[uid] = info
            if var ru = _run_uses[runId] {
                if(ru.users.count >= 20) {
                    return false
                }
                ru.users.insert(uid)
                _run_uses[runId] = ru
            } else {
                _run_uses[runId] = RunUses(ownerId:uid, users:[uid], probes:[])
            }
            return true
        }
    }
    return false
}

func user_remove_active_run(uid : UInt32) -> Bool {
    if var info = _users[uid],
       info.activeRunId != 0 {
       let runId = info.activeRunId
       info.activeRunId = 0
       _users[uid] = info
       if var uses = _run_uses[runId],
          let _ = uses.users.remove(uid) {
            if(uses.users.count == 0) {
                _run_uses.removeValue(forKey:runId)
                probe_run_change(probes:&uses.probes, runId:runId, uid:uid, flags:0xFF)
            } else {
                _run_uses[runId]!.users = uses.users
            }
            return true
        }
    }
    return false
}

func user_run_change(users : inout Set<UInt32>, runId : UInt32) {
    var targets = ContiguousArray<Socket>()
    let msg = #"{"t":8, "d":\(runId)}"#
    for socket in users {
        targets.append(Socket(v:socket))
        if(targets.count == 64) {
            _ = ws.send(txt:msg, targets)
            targets = ContiguousArray<Socket>()
        }
    }
    if(targets.count != 0) {
        _ = ws.send(txt:msg, targets)
    }
}

func user_get_perm(uid : UInt32) -> UserPermissions {
    if let info = _users[uid] {
        return info.perm
    }
    return UserPermissions()
}

func probe_run_change(probes : inout Set<UInt32>, runId : UInt32, uid : UInt32, flags : UInt32) {
    var targets = ContiguousArray<Socket>()
    let msg = #"{"t":7,"f":\#(flags),"u":\#(uid)}"#
    var run_uses_empty = true
    for socket in probes {
    
        if let _info = _probes[socket],
            var info = _info {
            if(info.activeRunId != runId) {
                continue
            }
            
            if !run_uses_empty,
               let uses = _run_uses[runId],
               uses.probes.contains(socket) {
                continue
            }
            
            info.activeRunId = 0
            _probes[socket] = info
            
            
            targets.append(Socket(v:socket))
            if(targets.count == 64) {
                _ = ws.send(txt:msg, targets)
                targets = ContiguousArray<Socket>()
                run_uses_empty = _run_uses[runId] == nil
            }
        }
    
    }
    if(targets.count != 0) {
        _ = ws.send(txt:msg, targets)
    }
}

func probe_set_active_run(socket : UInt32, runId : UInt32, userId : UInt32, force : Bool = false) -> Bool {
    if let _info = _probes[socket],
       var info = _info {
        if info.activeRunId == runId {
            return true
        }
        if force == true ||
           info.activeRunId == 0 || 
           _run_uses[info.activeRunId]!.ownerId == userId {
           if(info.activeRunId != 0) {
               _run_uses[info.activeRunId]!.probes.remove(socket)
           }
            info.activeRunId = runId
            _probes[socket] = info
            if var ru = _run_uses[runId] {
                ru.probes.insert(socket)
                _run_uses[runId] = ru
            } else {
                _run_uses[runId] = RunUses(ownerId:userId, users:[], probes:[socket])
            }
            if var users = _run_uses[runId]?.users {
                user_run_change(users:&users, runId:runId)
            }
            return true
        }   
    }
    return false
}

func probe_remove_active_run(socket : UInt32, userId : UInt32, force : Bool = false) -> Bool {
    if let _info = _probes[socket],
       var info = _info,
       info.activeRunId != 0,
       force == true || 
       _run_uses[info.activeRunId]!.ownerId == userId {
        let runId = info.activeRunId
        info.activeRunId = 0
        _probes[socket] = info
        if var probes = _run_uses[runId]?.probes,
          let _ = probes.remove(socket) {
            _run_uses[runId]!.probes = probes
        }
        if var users = _run_uses[runId]?.users {
            user_run_change(users:&users, runId:runId)
        }
        return true
    }
    return false
}

func probe_get_socket(probe : ProbeTarget) -> UInt32 {
    if let _info = _probes[probe.s],
       let pinfo = _info,
       ProbeInfo(id:probe.id, idn:probe.idn) == pinfo {
        return probe.s
    }
    return 0
}

func probe_get_info(probe : ProbeTarget) -> ProbeInfo? {
    if let _info = _probes[probe.s],
       let pinfo = _info,
       ProbeInfo(id:probe.id, idn:probe.idn) == pinfo {
        return pinfo
    }
    return nil
}

func probe_send_to(probe : ProbeTarget, data : String) -> Bool {
    if let _info = _probes[probe.s],
       let pinfo = _info,
       ProbeInfo(id:probe.id, idn:probe.idn) == pinfo {
        return ws.send(txt:data, Socket(v:probe.s))
    }
    return false
}