
import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

enum PostType : Int32, Codable {
    case USER_LOGIN              = 1
    case USER_LOGOUT             = 2
}

struct PostParam : FastCodable {
    let cmd : PostType
    let data : String?
}

struct UserLoginParam : FastCodable {
    let em : String
    let pw : String
}

func userLogin(_ param : PostParam) -> ErrorResult {
    if let data = UserLoginParam.from(json:param.data ?? ""),
       <!User.login(data.em, data.pw) == true {
        print("{\"r\":0,\"m\":\(<!User.hasGroup(Role.admin) ? 1 : 0)}")
        return ErrorNone
    }
    return ErrorDefault
}

func userLogout() -> ErrorResult {
    User.logout()
    print("{\"r\":0}")
    return ErrorNone
}

func checkLogin(_ type : PostType) -> Bool {
    return type == .USER_LOGIN || 
           User.logon != nil
}

func userAdd(_ param : PostParam) -> ErrorResult {
    
    return ErrorDefault
}

func userUpdate(_ param : PostParam) -> ErrorResult {
    
    return ErrorDefault
}

func userRemove(_ param : PostParam) -> ErrorResult {
    
    return ErrorDefault
}

func main() {
    var res = ErrorDefault
    switch(Page.requestMethod) {
        case .UNDEFINED:
            return
        case .POST:
        /*
            if(!Page.sameOrigin) {
                if let sd = getSubdomain(Page.origin ?? "") {
                    _ = Page.addResultHeader("Access-Control-Allow-Origin: \(sd)\(Setting.static_host.value)\n")
                    _ = Page.addResultHeader("Access-Control-Allow-Credentials: true\n")
                }
            }
            */
            if let params = PostParam.from(json:Post.data.value) {
                if(checkLogin(params.cmd)) {
                    switch(params.cmd) {
                        case .USER_LOGIN:
                            res = userLogin(params)
                        case .USER_LOGOUT:
                            res = userLogout()
                        default:
                            break
                    }
                    if(res == ErrorNone) {
                        return
                    }
                } else {
                    print("{\"r\":1,\"l\":1}")
                    return
                }
            }
            /*
        case .OPTIONS:
            if let sd = getSubdomain(Page.origin ?? "") {
                _ = Page.addResultHeader("""
                                    Access-Control-Allow-Origin: \(sd)\(Setting.static_host.value)
                                    Access-Control-Allow-Methods: GET, POST, OPTIONS
                                    Access-Control-Allow-Credentials: true
                                    Access-Control-Max-Age: 86400
                                    
                                    """)
            }
            return
            */
        default:
            break
    }
    print("{\"r\":\(res)}")
}

