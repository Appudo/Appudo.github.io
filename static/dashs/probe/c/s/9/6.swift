

import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

enum PostType : Int32, Codable {
    case CHECK_RUN              = 0
    case CHECK_DISABLE          = 1
    case CHECK_ENABLE           = 2
}

struct PostParam : FastCodable {
    let cmd : PostType
    let a : Int32?
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

enum CheckType : Int32, Codable {
    case NONE              = 0
    case MAKE              = 1
    case BISON             = 2
    case FLEX              = 3
    case BC                = 4
    case C                 = 5
    case CPP               = 6
}

func check_exec_usr(cmd : String, args : [String]) -> Bool {
    var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.bin.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:args, env:["PATH=.:/usr/lib:/usr/bin:/bin"], 
                                        cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            return true
        }
        if(err.errValue == -1) {
            print("error: command not found")
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    } else {
        print("error: command not found")
    }
    return false
}

func check_exec(cmd : String, args : [Any]) -> Bool {
    var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.bin.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open(cmd, .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:args, env:["PATH=.:/usr/lib:/usr/bin:/bin"], 
                                        cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            return true
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    } else {
        print("error: command not found")
    }
    return false
}

func check_run(_ param : PostParam) -> Bool {
    var res = false
    if let type = param.a {
        switch(CheckType(rawValue:type) ?? .NONE) {
            case .MAKE:
                res = check_exec_usr(cmd:"run", args:["appudo_runner", "make", "--version"])
            case .BISON:
                res = check_exec_usr(cmd:"run", args:["appudo_runner", "bison", "--version"])
            case .FLEX:
                res = check_exec_usr(cmd:"run", args:["appudo_runner", "flex", "--version"])
            case .BC:
                res = check_exec_usr(cmd:"run", args:["appudo_runner", "bc", "--version"])
            case .C:
                if var tmp = <!FileItem.create_tmp(),
                   let _ = <!tmp.write("#include <stdio.h>\n#include <stdint.h>\n#include <stdlib.h>\nint main() { return 0; }") {
                    let qry = SQLQry("""
                                        SELECT triple, compiler_prefix, args FROM compilers 
                                            LEFT JOIN compiler_options ON(compiler_options.id = ANY(compilers.options)) 
                                                WHERE active IS TRUE;
                                     """)
                    if <!qry.exec() != false {
                        for i in 0 ..< qry.numRows {
                            let triple = qry.getAsText(i, 0) ?? ""
                            let args = qry.getAsText(i, 2) ?? ""
                            let prefix = qry.getAsText(i, 1) ?? ""
                                
            	            res = check_exec(cmd:"clang", args:["clang", "-xc", tmp, args, "-o/dev/null", "--target=\(triple)", 
            	                                                "-nostartfiles", "-rtlib=compiler-rt",
            	                                                "-isystem../lib/libc/include",
            	                                                "-L../lib/libc/lib/\(triple)",
            	                                                "-L../lib/libcxx/lib/\(triple)",
            	                                                "-B/usr/\(prefix.dropLast())/bin", "-O2", "-v", "-fPIC"])
            	            if(!res) {
            	                print("error: cannot compile c code for \(triple) with \(prefix)\n")
            	                break
            	            }
        	            }
                    }
        	    }
            case .CPP:
                if var tmp = <!FileItem.create_tmp(),
                   let _ = <!tmp.write("#include <cstddef>\n#include <iostream>\nint main() { return 0; }") {
                    let qry = SQLQry("""
                                        SELECT triple, compiler_prefix, args FROM compilers 
                                            LEFT JOIN compiler_options ON(compiler_options.id = ANY(compilers.options)) 
                                                WHERE active IS TRUE;
                                     """)
                    if <!qry.exec() != false {
                        for i in 0 ..< qry.numRows {
                            let triple = qry.getAsText(i, 0) ?? ""
                            let args = qry.getAsText(i, 2) ?? ""
                            let prefix = qry.getAsText(i, 1) ?? ""
            	            res = check_exec(cmd:"clang", args:["clang", "-xc++", tmp, args, "-o/dev/null", "--target=\(triple)", 
            	                                                "-stdlib=libc++", "-nostartfiles", "-rtlib=compiler-rt",
            	                                                "-D_LIBCPP_HAS_MUSL_LIBC", 
            	                                                "-L../lib/libc/lib/\(triple)",
            	                                                "-L../lib/libcxx/lib/\(triple)",
            	                                                "-isystem../lib/libc/include", "-isystem../lib/libcxx/include/c++/v1", 
            	                                                "-B/usr/\(prefix.dropLast())/bin", "-O2", "-v", "-fPIC"])
            	            if(!res) {
            	                print("error: cannot compile c++ code for \(triple) with \(prefix)\n")
            	                break
            	            }
        	            }
                    }
        	    }
            default:
                break
        }
	}
	
	return res
}

func user_ticket_toInfo(_ p : Int) -> LoginInfo {
    let _p = UInt(bitPattern:p)
    return LoginInfo(id:Int32(bitPattern:UInt32(_p & 0xFFFFFFFF)), 
                     perm:UserPermissions(rawValue:Int32(bitPattern:UInt32((_p >> 32) & 0x7FFFFFFF))), 
                     keep:(_p & ~0x7FFFFFFFFFFFFFFF) != 0)
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

func main() {
	var res = false

    if(Page.schema == .HTTPS && Page.requestMethod == .POST) {
        if let param = PostParam.from(json:Post.data.value) {
            switch(param.cmd) {
                case .CHECK_RUN:
                    if Setting.checks_enabled.value == "1" {
                        res = check_run(param)
                    } else {
                        Page.resultStatus = .S_404
                        return
                    }
                    break
                case .CHECK_ENABLE:
                    var uinfo = LoginInfo(id:-1, perm:.NONE, keep:false)
                    if user_login_check(uinfo:&uinfo),
                       uinfo.perm.has(.ADMIN_ALL),
                       let m = <!MenuItem.get(Page.current, 1),
                       <!Setting.update(m.id, "checks_enabled", "1") != false {
                        res = true  
                    }
                    break
                case .CHECK_DISABLE:
                    if let m = <!MenuItem.get(Page.current, 1),
                       <!Setting.update(m.id, "checks_enabled", "0") != false {
                        res = true  
                    }
                    break
            }
            if(res == true) {
                return
            }
        }
    }
    Page.resultStatus = .S_400
}