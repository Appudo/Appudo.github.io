
import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend
import libappudo_master
import Foundation


typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

enum PostType : Int32, Codable {
    case USER_LOGIN_INIT         = 0
    case USER_MAIL_INIT          = 1
}

struct PostParam : FastCodable {
    let cmd : PostType
    let data : String?
}

struct LoginStringParam : FastCodable {
    let a : String
    let b : String?
    let c : String?
    let l : Int?
}

/* ----------------------------------------------- */
/*                 user handling                   */
/* ----------------------------------------------- */


func beforeVarParse() -> EventResult {
    _ = Page.markSensitive(postKey:"password")
    return .OK
}


func afterVarParse(sensitive : UnsafeTmpString) -> EventResult {
    if sensitive.is_nil == false {
        Page.userData = sensitive
    }
    return .OK
}

func getBase64len(_ buffer : inout ManagedCharBuffer, _ bufferLen : Int) -> Int {
    var len = bufferLen
    len -= 1
    len -= buffer.data[len] == 61 ? 1 : 0
    len -= buffer.data[len] == 61 ? 1 : 0
    return len + 1
}

/*
 * Generate key with random salt from password.
 */
 func user_login_keyFrom(password : UnsafeTmpString) -> (String, String)? {
    let bufferA = ManagedCharBuffer.create(128)
    var bufferB = ManagedCharBuffer.create(192)
    if let rawSaltLen = <!Rand.bytes(bufferA, sizeLimit:64),
       let saltLen = <!Base64.encode(bufferA, bufferB, inSizeLimit:rawSaltLen),
       let salt = bufferB.toString(getBase64len(&bufferB, saltLen)),
       let rawCryptLen = <!SCRYPT.create(password, bufferB, bufferA, outSizeLimit:128, saltSizeLimit:getBase64len(&bufferB, saltLen)),
       let cryptLen = <!Base64.encode(bufferA, bufferB, inSizeLimit:rawCryptLen),
       let cryptKey = bufferB.toString(getBase64len(&bufferB, cryptLen)) { 
       return (cryptKey, salt)
    }
    return nil
}

/*
 * Insert a user if none exists yet.
 */
func user_init() -> ErrorResult {
    if let data = LoginStringParam.from(json:Post.ext_data.value) {
        let name = Post.name.value
        let mail = data.a
        var err = AsyncError()
        let password = Page.userData as? UnsafeTmpString ?? UnsafeTmpString()
        if password.is_nil == false,
           let gen = user_login_keyFrom(password:password) {
            
            _ = <!SQLQry.begin()
            
            let qry = SQLQry("""
                                    WITH ins_user AS (
                                        INSERT INTO users (login, mail, login_cookie, key, last_login, salt, attempts, keep, perm) 
                                               SELECT $1, $2, NULL, $3, 0, $4, 0, FALSE, 2147483647
                                        WHERE NOT EXISTS
                                        (SELECT id FROM users)
                                        RETURNING id
                                        ),
                                        ins_group AS (
                                            INSERT INTO groups (name) 
                                                   SELECT 'admin'
                                            WHERE NOT EXISTS
                                            (SELECT name FROM groups WHERE name = 'admin')
                                            RETURNING id
                                        )
                                    INSERT INTO users_groups (users_id, groups_id, perm) SELECT ins_user.id, ins_group.id, 2147483647 FROM ins_user, ins_group RETURNING users_id;
                             """)
                             
            qry.values = [name, mail, gen.0, gen.1]
            
            if (err <! qry.exec()) == false {
                return ErrorResult(err.asSQL.rawValue)
            }
            
            if qry.numRows != 0,
               let uID = <!User.getAsId("probe_user"),
               <!Mail.set(uID, mail) != false {
                _ = <!SQLQry.end()
                print(#"{"r":0}"#)
                return ErrorNone
            } else {
                _ = <!SQLQry.rollback()
            }
        }
    }
    return ErrorDefault
}

func user_init_mail() -> ErrorResult {
    var err = AsyncError()
    let qry = SQLQry("SELECT mail FROM users WHERE id = 1;")
    
    if (err <! qry.exec()) == false {
        return ErrorResult(err.asSQL.rawValue)
    }
    
    if qry.numRows != 0,
       let mail = qry.getAsText(0, 0),
       let uID = <!User.getAsId("probe_user"),
       <!Mail.set(uID, mail) != false {
        _ = <!SQLQry.end()
        print(#"{"r":0}"#)
        return ErrorNone
    } else {
        _ = <!SQLQry.rollback()
    }
    return ErrorDefault
}

func main() {
	var res = ErrorDefault
    if(Page.schema == .HTTPS && Page.requestMethod == .POST) {
        if let param = PostParam.from(json:Post.data.value) {
            switch(param.cmd) {
                case .USER_LOGIN_INIT:
                    res = user_init()
                case .USER_MAIL_INIT:
                    res = user_init_mail()
                    /*
                default:
                    break
                    */
            }
            if(res == ErrorNone) {
                return
            }
        }
    }
    print("{\"r\":\(res)}")
}