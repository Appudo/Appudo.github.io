
import libappudo
import libappudo_run
import libappudo_env
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

enum GetType : Int32, Codable {
    case DISASSEMBLY_FILE_GET       = 1
    case RUN_BINARY_FILE_GET        = 2
    case RUN_SETTINGS_GET           = 3
}

struct GetParam : FastCodable {
    let cmd : GetType
    let id : UInt32?
    let data : String?
    let x : Int?
}

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
    static let MODULE_SOURCE      = UserPermissions(rawValue: 1 << 12)
    static let USER_CHANGE_LOGIN  = UserPermissions(rawValue: 1 << 13)
    static let REPO_ADD           = UserPermissions(rawValue: 1 << 14)
    
    func has(_ perm : UserPermissions) -> Bool {
        return contains(.ADMIN_ALL) || contains(perm)
    }
}

struct GroupPermissions: OptionSet {
    let rawValue: Int32
    
    static let RUN_EDIT           = GroupPermissions(rawValue: 1 << 0)
    static let PROBE_EDIT         = GroupPermissions(rawValue: 1 << 1)
    static let PROBE_VIEW_KEY     = GroupPermissions(rawValue: 1 << 2)
    static let MODULE_EDIT        = GroupPermissions(rawValue: 1 << 3)
    static let MODULE_SOURCE_EDIT = GroupPermissions(rawValue: 1 << 4)
    static let MODULE_SETUP       = GroupPermissions(rawValue: 1 << 5)
    static let REPO_EDIT          = GroupPermissions(rawValue: 1 << 6)
}

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

struct LoginTicket : FastCodable {
    let r : Int32
    let p : Int
    let n : Int
    let t : Int
}

struct LoginInfo {
    let id : Int32
    let perm : UserPermissions
    let keep : Bool
}

struct SignData : FastCodable {
    let uId : UInt32
    let ticket : Int64
    let time : Int64
    let nonce : Int32
    let sign : UInt64
}

struct TwoInt32Param : FastCodable {
    let a : Int32
    let b : Int32
}

func user_ticket_toInfo(_ p : Int) -> LoginInfo {
    let _p = UInt(bitPattern:p)
    return LoginInfo(id:Int32(bitPattern:UInt32(_p & 0xFFFFFFFF)), perm:UserPermissions(rawValue:Int32(bitPattern:UInt32((_p >> 32) & 0x7FFFFFFF))), keep:(_p & ~0x7FFFFFFFFFFFFFFF) != 0)
}

func user_login_check(uinfo : inout LoginInfo) -> Bool {
    let ticket = Cookie.lt.value
    if ticket != "",
       let info = LoginTicket.from(json:ticket) {
        uinfo = user_ticket_toInfo(info.p)
        let qry = SQLQry("SELECT id FROM users WHERE id = $1 AND login_cookie = $2 AND locked = FALSE;")
        qry.values = [uinfo.id, ticket]
        
        if <!qry.exec() != false && qry.numRows != 0 {
            return true
        }
    }
    
    return false
}

func probe_validate_user(userId : UInt32, ticket : Int64, time : Int64, nonce : Int32, data : UInt64, sign : UInt64) -> Bool {
    let outBuffer = ManagedCharBuffer.create(64)
    
    let qry = SQLQry("SELECT login_cookie FROM users WHERE id = $1 AND locked = FALSE;")
    qry.values = [userId]
    if <!qry.exec() != false && qry.numRows != 0,
       let login_cookie = qry.getAsText(0, 0),
       let login = LoginTicket.from(json:login_cookie) {
        if let hmac = HMAC.begin("\(login.n)", flags:.SHA256),
           <!hmac.update(Int(userId)) != false,
           <!hmac.update(Int(ticket)) != false,
           <!hmac.update(Int(time)) != false,
           <!hmac.update(Int(nonce)) != false,
           <!hmac.update(Int(Int64(bitPattern:data))) != false,
           let _ = <!hmac.finish(outBuffer),
           let v = outBuffer.toInt(0) {
            return UInt64(bitPattern:Int64(v)) == sign
        }
    }
    
    return false
}

func getBase64len(_ buffer : inout ManagedCharBuffer, _ bufferLen : Int) -> Int {
    var len = bufferLen
    len -= 1
    len -= buffer.data[len] == 61 ? 1 : 0
    len -= buffer.data[len] == 61 ? 1 : 0
    return len + 1
}

func probe_login_check(id : UInt32, login : String) -> Bool {
    if let param = LoginParam.from(json:login, customValueParser:LoginParam.sizedValueParser) {
        let qry = SQLQry("SELECT key FROM probes WHERE id = $1 AND login = $2;")
        qry.values = [id, param.l]
        if <!qry.exec() != false && qry.numRows != 0 {
            let key = qry.getAsText(0, 0) ?? ""
            let outBuffer = ManagedCharBuffer.create(64)
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
                return true
           }
        }
    }
    return false
}

func login_check(param : GetParam, data : String, uinfo : inout LoginInfo) -> Bool {
    let login = String(data.dropFirst(Int(strtoul(param.data ?? "", nil, 16))))
    switch(param.cmd) {
        case .DISASSEMBLY_FILE_GET:
            return user_login_check(uinfo:&uinfo)
        case .RUN_SETTINGS_GET:
            fallthrough
        case .RUN_BINARY_FILE_GET:
            if let id = param.id {
                return probe_login_check(id:id, login:login)
            }
        default:
            break
    }
    return false
}

/* ----------------------------------------------- */
/*                 run handling                    */
/* ----------------------------------------------- */

struct BinaryGetParam : FastCodable {
    let r : UInt32
    let m : String
    let k : UInt64
    let t : UInt32
    let o : UInt32
}

func run_get_settings(uinfo : LoginInfo) -> ErrorResult {
    if let sdata = SignData.from(json:Get.sign.value),
       let data = TwoInt32Param.from(json:Get.ext_data.value),
       probe_validate_user(userId:sdata.uId, ticket:sdata.ticket, time:sdata.time, nonce:sdata.nonce, data:UInt64(data.a), sign:sdata.sign) != false,
       let f = <!Dir.run_binary.open("\(data.a)/settings.json", .O_RDONLY),
       <!Page.setMime("bin") != false, 
       send(exclusive:f) {
        return ErrorNone
    }
    Page.resultStatus = .S_404
    return ErrorNone
}

func run_get_binary_file(uinfo : LoginInfo) -> ErrorResult {
    if let sdata = SignData.from(json:Get.sign.value),
       let data = BinaryGetParam.from(json:Get.ext_data.value),
       probe_validate_user(userId:sdata.uId, ticket:sdata.ticket, time:sdata.time, nonce:sdata.nonce, data:UInt64(data.r), sign:sdata.sign) != false {
        var name = "none"

        switch(data.t) {
            case 1:
                name = "ebpf.bin"
            default:
                name = "user.bin"
        }
        
        if let o = <!Dir.run_binary.open("\(data.r)/\(data.k)/\(data.m)-\(data.o)/\(name)", .O_RDONLY) {
            if(<!Page.setMime("bin") != false && send(exclusive:o)) {
                return ErrorNone
            }
        }
    }
    Page.resultStatus = .S_404
    return ErrorNone
}

/* ----------------------------------------------- */
/*                 disassembly handling            */
/* ----------------------------------------------- */

func disassembly_get_file(uinfo : LoginInfo) -> ErrorResult {
    if let data = TwoInt32Param.from(json:Get.ext_data.value) {
        let can_use = uinfo.perm.has(.DISASSEMBLER_USE)

        if can_use == true,
           var o = <!Dir.disassembly.open("\(data.a)/\(data.b)", .O_RDONLY) {
            let lm = Page.lastModified
            if let s = <!o.stat_open {
                let mtime = s.time_latest.to1970
                if lm != 0,
                   mtime <= lm {
                        Page.resultStatus = .S_304
                        return ErrorNone
                } else {
                    Page.lastModified = mtime
                    _ = Page.addResultHeader("Cache-Control:max-age=31536000\n\r")
                }
            }
            
            if(<!Page.setMime("bin") != false && send(exclusive:o)) {
                return ErrorNone
            }
        }
        
    }

    Page.resultStatus = .S_404
    return ErrorNone
}


/* ----------------------------------------------- */
/*                        main                     */
/* ----------------------------------------------- */

func main() {
	var res = ErrorDefault
    let data = Get.data.value
    if(Page.schema == .HTTPS && Page.requestMethod == .GET) {
        if let param = GetParam.from(json:Get.data.value) {
            var uinfo = LoginInfo(id:-1, perm:.NONE, keep:false)
            if(login_check(param:param, data:data, uinfo:&uinfo)) {
                switch(param.cmd) {
                    case .DISASSEMBLY_FILE_GET:
                        res = disassembly_get_file(uinfo:uinfo)
                    case .RUN_BINARY_FILE_GET:
                        res = run_get_binary_file(uinfo:uinfo)
                    case .RUN_SETTINGS_GET:
                        res = run_get_settings(uinfo:uinfo)
                }
                if(res == ErrorNone) {
                    return
                }
            } else {
                print(#"{"r":1,"l":1}"#)
                return
            }
        }
    } 
    print(#"{"r":\#(res)}"#)
    Page.resultStatus = .S_404
}