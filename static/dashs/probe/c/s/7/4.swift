
import libappudo
import libappudo_run
import libappudo_env
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

func debug(_ msg : String) {
    if var f = <!Dir.tmp.open("debug.txt", [.O_CREAT, .O_RDWR]) {
        if let s = <!f.stat, 
           s.size > 32000 {
               _ = <!f.truncate(0)
           }
        _ = <!f.append("\(msg)\n")
    }
}

enum PostType : Int32, Codable {
    case DISSASSEMBLY_ADD        = 1
    case MODULE_ADD              = 2
    case MODULE_CODE_SAVE        = 3
    case MODULE_GEN_CODE_SAVE    = 4
    case MODULE_PACKAGE_ADD      = 5
    case MODULE_PACKAGE_INIT     = 6
}

struct PostParam : FastCodable {
    let cmd : PostType
    let id : UInt32?
    let data : String?
    let x : Int?
    let y : Int?
}

struct PostInfo {
    let param : PostParam
    let file : FileItem
    let uid : Int32
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

func login_check(param : PostParam, data : String, uinfo : inout LoginInfo) -> Bool {
    let login = String(data.dropFirst(Int(strtoul(param.data ?? "", nil, 16))))
    switch(param.cmd) {
        case .DISSASSEMBLY_ADD:
            if let id = param.id {
                return probe_login_check(id:id, login:login)
            }
        case .MODULE_ADD:
            fallthrough
        case .MODULE_CODE_SAVE:
            fallthrough
        case .MODULE_PACKAGE_ADD:
            fallthrough
        case .MODULE_PACKAGE_INIT:
            fallthrough
        case .MODULE_GEN_CODE_SAVE:
            return user_login_check(uinfo:&uinfo)
    }
    return false
}

/* ----------------------------------------------- */
/*                 disassembly handling            */
/* ----------------------------------------------- */

func disassembly_add(_ param : PostParam, _ upload : UploadData, _ out : inout FileItem?) -> ErrorResult {
    var err = AsyncError()
    
    if let sdata = SignData.from(json:Post.sign.value),       
       let id = param.id,
       let erase = param.x,
       probe_validate_user(userId:sdata.uId, ticket:sdata.ticket, time:sdata.time, nonce:sdata.nonce, data:UInt64(id) << 32 | UInt64(erase), sign:sdata.sign) != false,
       let f = err <! Dir.out.open("\(id)") {
        var path = (upload.parent ?? "") + "/" + upload.name
       
        let qry = SQLQry("""
                                INSERT INTO disassembly_files AS d (path, probes_id) VALUES ($1, $2) 
                                    ON CONFLICT (path, probes_id) DO UPDATE SET id = d.id RETURNING id
                         """);
        qry.values = [path, id]
        if (err <! qry.exec()) != false && qry.numRows == 1 {
            let id = qry.getAsInt(0, 0) ?? -1
            path = "\(id)"
            if(erase != 0) {
                _ = <!f.remove(path)
            }
            let mode : FileItem.Mode = [ .U0600, .G0060 ]
            out = err <! f.open(path, [.O_CREAT, .O_EXCL, .O_RDWR], mode)
            if(out != nil) {
                print(#"{"r":0,"d":"\#(path)"}"#)
                return ErrorNone
            }
        }
    }
    
    if(err.hasError) {
        return Int(err.errValue) as ErrorResult 
    }
    
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 module handling                 */
/* ----------------------------------------------- */

func module_package_add_begin(_ param : PostParam, _ upload : UploadData, _ uinfo : LoginInfo, _ out : inout FileItem?) -> ErrorResult {
    if let f = <!FileItem.create_tmp() {
        out = f
        Page.userData = PostInfo(param:param, file:f, uid:uinfo.id)
        return uinfo.perm.has(.MODULE_ADD) ? ErrorNone : ErrorDefault
    }
    return ErrorDefault
}

func module_package_init_begin(_ param : PostParam, _ uinfo : LoginInfo, _ out : inout FileItem?) -> ErrorResult {
    if let f = <!Dir.init_packages.open("init.probem", .O_RDONLY) {
        Page.userData = PostInfo(param:param, file:f, uid:uinfo.id)
        let res = uinfo.perm.has(.ADMIN_ALL) ? ErrorNone : ErrorDefault
        if(res == ErrorNone) {
            out = <!FileItem.create_tmp()
        }
        return res
    }
    return ErrorDefault
}

struct ModuleAddParam : FastCodable {
    let n : String
    let d : String
    let l : Int
    let g : Int?
}

func package_extract(dir : FileItem, file : FileItem) -> Bool {
    var err = AsyncError()
    if let bin = err <! Dir.bin.open("appudo_archiver", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_archiver", "-x", file], env:["PATH=/usr/lib"], 
                                       cwd:dir, flags:.SUID) {
            return true
        }
    }
    return false
}

func module_package_add_end( _ _file : FileItem, _ uid : Int32, fromModule : Bool = false) -> ErrorResult {
    var file = _file
    if var tmp = <!FileItem.create_tmp(Dir.tmp, "pkgXXXXXX", flags:[.O_DIRECTORY, .O_RDONLY], mode:[.S_IRWXU, .S_IRWXG, .S_IXOTH]) {
        defer {
            _ = <!tmp.remove(outer:true)
        }
        let _data : ModuleAddParam? = fromModule ? nil : ModuleAddParam.from(json:Post.ext_data.value)
        if fromModule || _data != nil,
           package_extract(dir:tmp, file:file),
           var minfo = <!tmp.open("minfo", .O_RDONLY) {
            var err = AsyncError()
            var buffer = ManagedCharBuffer.create(64)
            var cbor = CBOR(buffer:buffer)
            var fail = true
            var moduleId : Int32 = -1
            var nm = ""
            var desc = ""
            var mopt = "{}"
            var locked = 0
            var g : Int? = nil
            _ = <!SQLQry.begin()
            defer {
                if fail {
                    if moduleId != -1 {
                        _ = Dir.module_source.remove("\(moduleId)")
                        _ = Dir.module_gen_source.remove("\(moduleId)")
                    }
                    _ = <!SQLQry.rollback()
                }
            }
            
            if var _ = err <! minfo.read(to:buffer, offset:0) {
                var offset = 0
                if (cbor.popMapSize() ?? -1) == 2,
                   cbor.pop(sstring:"m"),
                   let num = cbor.popMapSize() {
                    for _ in 0..<num {
                        let i = cbor.pop(sstrings:"n", "d", "o", "l")
                        if i < 0 {
                            break
                        } else
                        if i < 3 {
                            let s = cbor.popStringSize() ?? 0
                            if(fromModule || i == 2) {
                                let v = <!minfo.readAsText(s, offset:cbor.count + offset)
                                switch(i) {
                                    case 0:
                                        nm = v ?? ""
                                    case 1:
                                        desc = v ?? ""
                                    case 2:
                                        mopt = v ?? "{}"
                                    default:
                                        break
                                }
                            }
                            offset += cbor.count + s
                            cbor.reset()
                            _ = <!minfo.read(to:buffer, offset:offset)
                        } else {
                            _ = cbor.popBool()
                        }
                    }
                    
                    if fromModule == false {
                        if let data = _data  {
                            nm = data.n
                            desc = data.d
                            locked = data.l
                            g = data.g
                        }
                    }
                    
                    var qry = SQLQry("""
                                        INSERT INTO modules(name, options, description, groups_id, users_id, locked) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
                                     """)
                    qry.values = [nm, mopt == "{}" ? Optional<String>.none as Any : mopt, desc, g ?? Optional<Int>.none as Any, uid, locked]
                    if (err <! qry.exec()) != false {
                        moduleId = qry.getAsInt32(0, 0) ?? -1 
                    } else {
                        return ErrorResult(err.asSQL.rawValue)
                    }
             
                    if var ms = err <! tmp.open("source", .O_PATH),
                       err <! ms.rename("\(moduleId)", Dir.module_source),
                       let nms = err <! Dir.module_source.open("\(moduleId)", .O_PATH),
                       err <! nms.setMode([.U0700, .G0050, .O0001]),
                       let gen = err <! Dir.module_gen_source.mkpath("\(moduleId)", [.U0700, .G0050, .O0001]),
                       cbor.pop(sstring:"i"),
                       cbor.popArray() {
                       var ok = true
                        while(!cbor.popEnd()) {
                            if cbor.popMapSize() ?? -1 != 3 {
                                ok = false
                                break
                            }
                            _ = cbor.pop(sstring:"r")
                            let iid = cbor.popInt() ?? -1
                            _ = cbor.pop(sstring:"n")
                            var s = cbor.popStringSize() ?? 0
                            let nm = <!minfo.readAsText(s, offset:cbor.count + offset) ?? ""
                            offset += cbor.count + s
                            cbor.reset()
                            _ = <!minfo.read(to:buffer, offset:offset)
                            _ = cbor.pop(sstring:"o")
                            s = cbor.popStringSize() ?? 0 
                            let opt = <!minfo.readAsText(s, offset:cbor.count + offset) ?? "{}"
                            offset += cbor.count + s
                            cbor.reset()
                            _ = <!minfo.read(to:buffer, offset:offset)
                            qry = SQLQry("""
                                            INSERT INTO module_instances (modules_id, name, options) SELECT $1, $2, $3 RETURNING id;
                                         """)
                            qry.values = [moduleId, nm, opt == "{}" ? Optional<String>.none as Any : opt]
                            
                            if (err <! qry.exec()) == false {
                                return ErrorResult(err.asSQL.rawValue)
                            }
                            
                            let niid = qry.getAsInt32(0, 0) ?? -1
                            if var d = err <! tmp.open("gen/\(iid)", .O_PATH),
                               err <! d.rename("\(niid)", gen),
                               let nd = err <! gen.open("\(niid)", .O_PATH),
                               err <! nd.setMode([.U0700, .G0050, .O0001]) {
                                   
                            } else {
                                ok = false
                                break
                            }
              
                        }
                        
                        if(ok) {
                            fail = false
                             _ = <!SQLQry.end()
                            print(#"{"r":0, "d": \#(moduleId)}"#)
                            return ErrorNone
                        }
                    }
                }
            }
            
            if(err.hasError) {
                return ErrorResult(err.errValue)
            }
        }
    }
    return ErrorDefault
}

func module_save_begin(_ param : PostParam, _ upload : UploadData, _ uinfo : LoginInfo, _ out : inout FileItem?) -> ErrorResult {
    var err = AsyncError()
    if let moduleId = param.id {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m 
                                    WHERE g.users_id = $1 
                                        AND m.id = $2
                                        AND m.groups_id = g.groups_id 
                                           
                        )
                        SELECT m.users_id FROM modules m 
                            LEFT OUTER JOIN perm p ON((p.perm & \(GroupPermissions.MODULE_SOURCE_EDIT.rawValue)) != 0) 
                                WHERE (m.users_id = $1 OR $3::Boolean IS TRUE) AND m.id = $2;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, moduleId, admin]
            
            if(err <! qry.exec()) != false && qry.numRows != 0 {
                if let o = <!FileItem.create_tmp() {
                    out = o
                    Page.userData = PostInfo(param:param, file:o, uid:-1)
                    return ErrorNone
                }
            }

        }
    }
    
    if(err.hasError) {
        return Int(err.errValue) as ErrorResult 
    }
    
    return ErrorDefault
}

func module_save_code_end(_ param : PostParam, _ file : FileItem) -> ErrorResult {
    var err = AsyncError()
    if let type = param.x,
       let moduleId = param.id {
        var f = ""
        switch(type) {
            case 0:
                f = "setup.html"
            case 1:
                f = "config.html"
            case 3:
                f = "setup.tmpl"
            case 4:
                f = "config.tmpl"
            case 5:
                f = "run.tmpl"
            default:    // 2
                f = "run.html"
        }
        
        if type < 3 {
            let tmp = f + ".tmp"
            if let dir = err <! Dir.module_source.open("\(moduleId)", .O_DIRECTORY) {
                _ = <!dir.remove(tmp)
                if let bin = err <! Dir.bin.open("xdelta3", .O_RDONLY),
                   var target = err <! FileItem.create_tmp(),
                   let _ = err <! Process.exec(bin, args:["xdelta3", f, file, target], env:["PATH=/usr/lib"], cwd:dir, flags:.SUID),
                   var out = err <! dir.open(tmp),
                   (err <! target.link_open(out.path, hard:true)) != false,
                   (err <! out.rename(f)) != false {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            }
        } else {
            var inFile = file
            if let dir = err <! Dir.module_source.open("\(moduleId)", .O_DIRECTORY) {
                _ = <!dir.remove(f)
                if (err <! inFile.rename(f, dir)) != false || (err <! inFile.link_open(f, dir, hard:true)) {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            }
        }
        
        if(err.hasError) {
            return Int(err.errValue) as ErrorResult 
        }
    }
    return ErrorDefault
}

func module_save_gen_code_end(_ param : PostParam, _ file : FileItem) -> ErrorResult {
    var err = AsyncError()
    if let type = param.x,
       let moduleId = param.id,
       let instanceId = param.y {
        var f = ""
        switch(type) {
            case 0:
                f = "ebpf.h"
            case 1:
                f = "ebpf.c"
            case 2:
                f = "user.h"
            default:
                f = "user.cpp"
        }
        var inFile = file
        _ = <!Dir.module_gen_source.mkpath("\(moduleId)/\(instanceId)", [.U0700, .G0050, .O0001])
        if let dir = err <! Dir.module_gen_source.open("\(moduleId)/\(instanceId)", .O_DIRECTORY) {
            _ = <!dir.remove(f)
            if (err <! inFile.rename(f, dir)) != false || (err <! inFile.link_open(f, dir, hard:true)) {
                print(#"{"r":0}"#)
                
                let qry = SQLQry("""
                                    SELECT runs_id FROM run_instances WHERE module_instances_id = $1;
                                 """);
                qry.values = [instanceId]
                if (err <! qry.exec()) != false {
                    for i in 0 ..< qry.numRows {
                        let runId = qry.getAsInt32(i, 0) ?? -1
                        if let dir = <!Dir.run_binary.open("\(runId)", .O_DIRECTORY),
                           let list = <!dir.listDir() {
                           for item in list {
                               if item.name != "settings.json" {
                                   _ = <!item.remove(outer:true)
                               }
                           }
                        }
                    }
                }
                
                
                return ErrorNone
            }
        }
        
        if(err.hasError) {
            return Int(err.errValue) as ErrorResult 
        }
    }
    return ErrorDefault
}

func onUpload(ev : PageEvent) -> UploadResult {
	var out : FileItem? = nil
	var res = ErrorDefault
	Page.userData = 1
    let data = Post.data.value
    if let param = PostParam.from(json:data),
       let upload = ev.data as? UploadData {
       var uinfo = LoginInfo(id:-1, perm:.NONE, keep:false)
        if(login_check(param:param, data:data, uinfo:&uinfo)) {
            switch(param.cmd) {
                case .DISSASSEMBLY_ADD:
                    res = disassembly_add(param, upload, &out)
                case .MODULE_PACKAGE_ADD:
                    res = module_package_add_begin(param, upload, uinfo, &out)
                case .MODULE_PACKAGE_INIT:
                    res = module_package_init_begin(param, uinfo, &out)
                case .MODULE_CODE_SAVE:
                    fallthrough
                case .MODULE_GEN_CODE_SAVE:
                    res = module_save_begin(param, upload, uinfo, &out)
                default:
                    break
            }
            if(out != nil) {
                return .OK(out!)
            }
        } else {
            print(#"{"r":1,"l":1}"#)
            return .ABORT
        }
    }
    print(#"{"r":\#(res)}"#)
	return .ABORT
}

func main() {
    if(Page.userData == nil) {
        print(#"{"r":\#(ErrorDefault)}"#)
    } else {
        if let info = Page.userData as? PostInfo {
	        var res = ErrorDefault
            switch(info.param.cmd) {
                case .MODULE_PACKAGE_INIT:
                    res = module_package_add_end(info.file, info.uid, fromModule:true)
                case .MODULE_PACKAGE_ADD:
                    res = module_package_add_end(info.file, info.uid)
                case .MODULE_CODE_SAVE:
                    res = module_save_code_end(info.param, info.file)
                case .MODULE_GEN_CODE_SAVE:
                    res = module_save_gen_code_end(info.param, info.file)
                default:
                    break
            }
            
            if(res == ErrorNone) {
                return
            }
            
            print(#"{"r":\#(res)}"#)
        }
    }
}