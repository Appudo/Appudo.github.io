
import libappudo
import libappudo_run
import libappudo_env
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

enum PostType : Int32, Codable {
    case USER_REGISTER              = 0
    case USER_LOGIN                 = 1
    case USER_LOGOUT                = 2
    case USER_LIST                  = 3
    case USER_REMOVE                = 4
    case USER_PASSWORD_RESET        = 5
    case USER_PASSWORD_RECOVER      = 6
    case USER_LOGIN_CHECK           = 8
    case USER_ADD                   = 9
    case USER_INVITE                = 10
    case USER_ADD_TO_GROUP          = 11
    case USER_REMOVE_FROM_GROUP     = 12
    case USER_GROUP_GET             = 13
    case USER_GROUP_UPDATE          = 14
    case USER_GROUP_LIST            = 15
    case USER_GROUP_ADD             = 16
    case USER_GROUP_REMOVE          = 17
    case USER_GET                   = 18
    case USER_UPDATE                = 19
    
    case PROBE_LIST                 = 40
    case PROBE_ADD                  = 41
    case PROBE_GET                  = 42
    case PROBE_UPDATE               = 43
    case PROBE_REMOVE               = 44
    case PROBE_USES_GET             = 45
    case PROBE_SETTING_LIST         = 46
    case PROBE_SETTING_ADD          = 47
    case PROBE_SETTING_REMOVE       = 48
    
    case MODULE_LIST                = 60
    case MODULE_GET                 = 61
    case MODULE_PACK                = 62
    case MODULE_USES_GET            = 63
    case MODULE_ADD                 = 64
    case MODULE_UPDATE              = 65
    case MODULE_REMOVE              = 66
    case MODULE_DOWLOAD             = 67
    case MODULE_INSTALL             = 68
    case MODULE_SHARE               = 69
    case MODULE_CODE_LOAD           = 70
    case MODULE_INSTANCE_LIST       = 72
    case MODULE_INSTANCE_ADD        = 73
    case MODULE_INSTANCE_REMOVE     = 74
    case MODULE_INSTANCE_SETTING_GET = 75
    
    case RUN_LIST                   = 81
    case RUN_GET                    = 82
    case RUN_ADD                    = 84
    case RUN_UPDATE_OPTIONS         = 83
    case RUN_UPDATE                 = 85
    case RUN_REMOVE                 = 86
    case RUN_USES_GET               = 87
    case RUN_INSTANCE_LIST          = 88
    case RUN_INSTANCE_ADD           = 89
    case RUN_INSTANCE_REMOVE        = 90
    case RUN_INSTANCE_UPDATE        = 91
    case RUN_INSTANCE_SETTING_GET   = 93
    
    case SETTING_GET                = 100
    case SETTING_UPDATE             = 101
    
    case REPO_LIST                  = 120
    case REPO_ADD                   = 121
    case REPO_UPDATE                = 122
    case REPO_REMOVE                = 123
    
    case CROSS_LIST                  = 140
    case CROSS_ADD                   = 141
    case CROSS_UPDATE                = 142
    case CROSS_REMOVE                = 143
}

struct PostParam : FastCodable {
    let cmd : PostType
}

struct IdParam : FastCodable {
    let id : Int
}

struct TwoInt32Param : FastCodable {
    let a : Int32
    let b : Int32
}

struct ThreeInt32Param : FastCodable {
    let a : Int32
    let b : Int32
    let c : Int32
}

struct TwoStringParam : FastCodable {
    let a : String
    let b : String
}

struct UpdateParam : FastCodable {
    let a : String?
    let b : String?
    let c : String?
    let d : String?
    let e : String?
    let m : Int?
    let n : Int?
    let o : Int?
    let p : Int?
    let q : Int?
}

/* ----------------------------------------------- */
/*                 user handling                   */
/* ----------------------------------------------- */

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

struct LoginStringParam : FastCodable {
    let a : String
    let b : String?
    let c : String?
    let l : Int?
}

struct LoginIntParam : FastCodable {
    let a : Int
    let l : Int?
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

var _loginArray : TimedArray? = {
    do {
        return try TimedArray(5*60)
    } catch {
        return nil
    }
}()

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

/*
 * Try user login with name and password.
 * There is an exponential backoff that increases
 * with each failed login after the current backoff 
 * time is expired.
 */
func user_login(_ keep : Bool, _ password : UnsafeTmpString) -> ErrorResult {
    let name = Post.name.value
    var err = AsyncError()
    
    let qry = SQLQry("""
                            WITH time AS (SELECT id, attempts = 0 OR ($2 > (last_login + (1 << attempts))) AS expired FROM users WHERE login = $1 AND locked = FALSE),
                                 upd AS (UPDATE users SET last_login = (CASE WHEN time.expired = TRUE THEN $2
                                                                           ELSE last_login END),
                                                          attempts = (CASE WHEN attempts < 32 AND time.expired = TRUE
                                                                        THEN attempts + 1 
                                                                           ELSE attempts END)
                                         FROM time
                                         WHERE users.id = time.id RETURNING users.id, last_login, attempts)
                                         SELECT users.id, key, salt, upd.last_login, upd.attempts, perm, expired, settings #>> '{}' FROM users, upd, time WHERE users.id = upd.id;
                     """)
    let login_time = Date().to1970
    qry.values = [name, login_time]
    if(err <! qry.exec()) != false {
        let id = qry.getAsInt32(0, 0) ?? -1
        let key = qry.getAsText(0, 1) ?? ""
        let salt = qry.getAsText(0, 2) ?? ""
        let perm = qry.getAsInt32(0, 5) ?? 0
        let expired = qry.getAsBool(0, 6) ?? false

        if expired,
           key == user_login_keyFrom(salt:salt, password:password), 
           let cookie = user_login_add(id:id, perm:perm, keep:keep) {
            let settings = qry.getAsText(0, 7) ?? "{}"
            print(#"{"r":0,"d":\#(id),"p":\#(perm),"c":\#(cookie),"s":\#(settings)}"#)
            return ErrorNone
        } else {
            let last_login = qry.getAsInt(0, 3) ?? -1
            let attempts = qry.getAsInt32(0, 4) ?? -1
            let dist = 1 << Int(attempts)
            print(#"{"r":1, "a":\#(attempts), "l":\#((last_login + dist) - login_time)}"#)
            return ErrorNone
        }
    } else {
        return ErrorResult(err.asSQL.rawValue)
    }
}

/*
 * Generate login cookie.
 */
func user_cookie_gen(idx : Int32, t : Int, n : Int, p : Int) -> String {
    return #"{"r":\#(idx),"t":\#(t),"n":\#(n),"p":\#(p)}"#
}

/*
 * Generate json escaped login cookie.
 */
func user_cookie_genEscaped(idx : Int32, t : Int, n : Int, p : Int) -> String {
    return #""{\"r\":\#(idx),\"t\":\#(t),\"n\":\#(n),\"p\":\#(p)}""#
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
 * Generate key with salt from password.
 */
func user_login_keyFrom(salt : String, password : UnsafeTmpString) -> String? {
    let bufferA = ManagedCharBuffer.create(128)
    var bufferB = ManagedCharBuffer.create(192)
    if let saltLen = bufferB.fill(salt),
       let rawCryptLen = <!SCRYPT.create(password, bufferB, bufferA, outSizeLimit:128, saltSizeLimit:saltLen),
       let cryptLen = <!Base64.encode(bufferA, bufferB, inSizeLimit:rawCryptLen) { 
       return bufferB.toString(getBase64len(&bufferB, cryptLen))
    }
    return nil
}

/*
 * Add new login ticket to TimedArray, database and cookie.
 */
func user_login_add(id : Int32, perm : Int32, keep : Bool = false) -> String? {
    let p : Int = user_ticket_fromInfo(id:id, perm:perm, keep:keep)
    var cookie = ""
    
    if let rt = <!Rand.int64(),
       let rn = <!Rand.int64(),
       let arr = _loginArray {
        let idx = arr.Insert(rt, rn, p)
        if(idx == 0) {
            return nil;
        }
        cookie = user_cookie_gen(idx:idx, t:rt, n:rn, p:p)
        
        let qry = SQLQry("UPDATE users SET attempts = 0, login_cookie = $2, keep = $3 WHERE id = $1")
        qry.values = [id, cookie, keep]
        if <!qry.exec() == false {
            return nil
        }
        
        Cookie.lt.set(cookie, expire:keep ? (60*60*24*265) : (5*60), secureOnly:true)
        
        return user_cookie_genEscaped(idx:idx, t:rt, n:rn, p:p)
    }
    
    
    return nil;
}

/*
 * Logout user on permission change.
 */
func user_change_logout(id : Int32) -> Void {
    let qry = SQLQry("""
                            UPDATE users u SET login_cookie = NULL FROM 
                                (SELECT id, login_cookie FROM users WHERE id = $1 FOR UPDATE) o 
                                    WHERE u.id = o.id RETURNING o.login_cookie;
                     """)
    qry.values = [id]
    
    if <!qry.exec() != false,
       let ticket = qry.getAsText(0, 0),
       let info = LoginTicket.from(json:ticket),
       let arr = _loginArray {
        _ = arr.Remove(info.r)
    }
}

/*
 * Remove ticket from TimedArray, database and cookie.
 */
func user_login_remove(id : Int32) -> Bool {
    let ticket = Cookie.lt.value
    
    Cookie.lt.remove()
    
    let qry = SQLQry("UPDATE users SET login_cookie = NULL WHERE id = $1")
    qry.values = [id]
    if <!qry.exec() == false {
        return false
    }
    
    if let arr = _loginArray,
       let info = LoginTicket.from(json:ticket) {
       if(user_ticket_toId(info.p) == id && 
          arr.Remove(info.r) == false) {
            return false
        }
    }
    
    return true
}

/*
 * Check if ticket is alive in TimedArray or database.
 */
func user_login_get(_ info : LoginTicket) -> Bool {
    let linfo = user_ticket_toInfo(info.p)
    var idx : Int32 = 0
    if let arr = _loginArray,
       let v = arr.GetAndUpdate(info.r),
       v.0 == info.t,
       v.1 == info.n,
       user_ticket_toId(v.2) == linfo.id {
       Page.userData = linfo
        return true
    }
    
    var new_cookie = ""
    let old_cookie = user_cookie_gen(idx:info.r, t:info.t, n:info.n, p:info.p)
    
    if let rt = <!Rand.int64(),
       let rn = <!Rand.int64(),
       let arr = _loginArray {
        idx = arr.Insert(rt, rn, Int(-1))
        if(idx == 0) {
            return false;
        }
        
        new_cookie = user_cookie_gen(idx:idx, t:rt, n:rn, p:info.p)
        
        let qry = SQLQry("UPDATE users SET login_cookie = $3 WHERE id = $1 AND login_cookie = $2 AND keep = TRUE RETURNING id;")
        qry.values = [linfo.id, old_cookie, new_cookie]
        if <!qry.exec() == false || qry.numRows == 0 {
            _ = arr.Remove(idx)
            return false
        }
        
        Cookie.lt.set(new_cookie, expire:(60*60*24*265), secureOnly:true)
        Page.userData = linfo
        
        return arr.Update(idx, rt, rn, info.p)
    }
    
    return false
}

/*
 * Validate login.
 */
func _user_login_check() -> Bool {
    let ticket = Cookie.lt.value
    if ticket != "",
       let info = LoginTicket.from(json:ticket) {   // does login ticket exist and format is ok?
        return user_login_get(info) != false        // is ticket alive?
    }
    return false
}

/*
 * Check login only if needed.
 */
func user_login_check(_ type : PostType) -> Bool {
    return type == .USER_LOGIN || 
           type == .USER_REGISTER || 
           type == .USER_PASSWORD_RESET ||
           type == .USER_PASSWORD_RECOVER ||
           type == .USER_LOGIN_CHECK ||
           _user_login_check()
}

func user_ticket_toId(_ p : Int) -> Int32 {
    return Int32(bitPattern:UInt32(p & 0xFFFFFFFF))
}

func user_getInfo() -> LoginInfo? {
    return Page.userData as? LoginInfo
}

func user_getPerm() -> UserPermissions {
    if let data = Page.userData as? LoginInfo {
        return data.perm
    }
    return UserPermissions()
}

func user_ticket_toPerm(_ p : Int) -> UserPermissions {
    let _p = UInt(bitPattern:p)
    return UserPermissions(rawValue:Int32(bitPattern:UInt32((_p >> 32) & 0x7FFFFFFF)))
}

func user_ticket_toInfo(_ p : Int) -> LoginInfo {
    let _p = UInt(bitPattern:p)
    return LoginInfo(id:Int32(bitPattern:UInt32(_p & 0xFFFFFFFF)), perm:UserPermissions(rawValue:Int32(bitPattern:UInt32((_p >> 32) & 0x7FFFFFFF))), keep:(_p & ~0x7FFFFFFFFFFFFFFF) != 0)
}

func user_ticket_fromInfo(id : Int32, perm : Int32, keep : Bool) -> Int {
    return Int(bitPattern:(UInt(id) | UInt(perm & 0x7FFFFFFF) << 32) | ((keep ? UInt(1) : UInt(0)) << 63))
}

/*
 * Check current login.
 */
func user_check() -> ErrorResult {
    let ticket = Cookie.lt.value
    if ticket != "",
       let info = LoginTicket.from(json:ticket),
       user_login_get(info) != false {
        let li = user_ticket_toInfo(info.p)
        let cookie = user_cookie_genEscaped(idx:info.r, t:info.t, n:info.n, p:info.p)
        print(#"{"r":0,"d":\#(li.id),"p":\#(li.perm.rawValue),"c":\#(cookie)}"#)
        
        if(!li.keep) {
            let cookie = user_cookie_gen(idx:info.r, t:info.t, n:info.n, p:info.p)
            Cookie.lt.set(cookie, expire:5*60, secureOnly:true)
        }
        
        return ErrorNone
    }
    return ErrorDefault
}

/*
 * Logout current user.
 */
func user_logout() -> ErrorResult {
    var err = AsyncError()
    var id : Int32 = -1
    let ticket = Cookie.lt.value
    if ticket != "",
       let info = LoginTicket.from(json:ticket) { 
        id = user_ticket_toId(info.p)
    }
    
    if(Post.ext_data.value != "") {
        let qry = SQLQry("UPDATE users SET login_cookie = NULL, settings = $2 WHERE id = $1;")
                         
        qry.values = [id, Post.ext_data.value]       
        if(err <! qry.exec()) != false {
            
        }
    } else {
        let qry = SQLQry("UPDATE users SET login_cookie = NULL WHERE id = $1;")
                         
        qry.values = [id]       
        if(err <! qry.exec()) != false {
            
        }
    }
    
    Cookie.lt.remove()
    
    print(#"{"r":0}"#)
    return ErrorNone
}

func getBase64len(_ buffer : inout ManagedCharBuffer, _ bufferLen : Int) -> Int {
    var len = bufferLen
    len -= 1
    len -= buffer.data[len] == 61 ? 1 : 0
    len -= buffer.data[len] == 61 ? 1 : 0
    return len + 1
}

func user_login_reset_ticket() -> String? {
    let inBuffer = ManagedCharBuffer.create(128)
    var outBuffer = ManagedCharBuffer.create(128)
    if let r = <!Rand.bytes(inBuffer, sizeLimit:22),
       let e = <!Base64.encode(inBuffer, outBuffer, inOffset:0, inSizeLimit:r) {
        return outBuffer.toString(getBase64len(&outBuffer, e))
    }
    return nil
}

func user_login_reset() -> ErrorResult {
    if let data = LoginStringParam.from(json:Post.ext_data.value) {
        let login = data.a
        let lID = data.l ?? 1
        let time = Date().to1970
        
        // remove old items after 60 * 5 * 12 seconds = 30 minutes
        var qry = SQLQry("""
                                DELETE FROM users_register WHERE time + 3600 < $1::bigint and type = 1
                         """)
                         
        qry.values = [time]
        
        _ = <!qry.exec()
        
        // create random ticket
        guard let ticket = user_login_reset_ticket() else {
            return ErrorDefault
        }
        
        _ = <!SQLQry.begin()
        
        // store ticket to db
        qry = SQLQry("""
                        WITH qry AS (
                            SELECT id FROM users WHERE login = $1
                        ),
                        ins AS (
                            INSERT INTO users_register (users_id, ticket, time, type) SELECT id, $2, $3, 1 FROM qry RETURNING users_id
                        )
                        SELECT mail FROM users, ins WHERE users.id = ins.users_id;
                     """)
        qry.values = [login, ticket, time]
        
        if <!qry.exec() == false {
            return ErrorDefault
        }
        
        let mail = qry.getAsText(0, 0) ?? ""
        
        // send validation mail with template
        var m = Mail()
        m.CTtype = "text/html"
        if var f = <!Dir.login_reset.open("reset_template", .O_APPUDO) {
            let url = Link.to(url:"", isLocal:true).toHostString(true)
            _ = <!f.write(#"{"url":"\#(url)","name":"\#(login)","ticket":"\#(ticket)","lID":\#(lID)}"#)
            
            if let r = <!f.readAsText(8),
               let s = <!f.readAsText(Int(r) ?? 0),
               <!m.send(mail, s, f) != false {
                print(#"{"r":0}"#)
                _ = <!SQLQry.end()
                return ErrorNone
            }
        }
        _ = <!SQLQry.rollback()
    }
    return ErrorDefault
}

func user_login_recover(_ password : UnsafeTmpString) -> ErrorResult {
    if let data = LoginStringParam.from(json:Post.ext_data.value),
       let gen = user_login_keyFrom(password:password) {
        let login = data.a
        let ticket = data.b ?? ""
    
        let qry = SQLQry("""
                            WITH qry AS (
                                SELECT id FROM users WHERE login = $1 
                            ),
                            del AS (
                                DELETE FROM users_register USING qry WHERE users_id = qry.id AND ticket = $2 AND type = 1 RETURNING users_id
                            ) 
                            UPDATE users SET key = $3, salt = $4 FROM del WHERE id = del.users_id RETURNING id;
                        """)
                        
        qry.values = [login, ticket, gen.0, gen.1]
        
        if <!qry.exec() != false && qry.numRows != 0 {
            print(#"{"r":0}"#)
            return ErrorNone
        }
    }
    return ErrorDefault
}

func user_register(_ password : UnsafeTmpString) -> ErrorResult {
    let time = Date().to1970
    // remove old items after 60 * 60 * 24 × 30 seconds = 30 days
    // pending from db
    let qry = SQLQry("""
                    WITH qry AS (
                        DELETE FROM users_register WHERE time + 2592000 < $1::bigint and type = 0 
                            RETURNING users_id
                    )
                    DELETE FROM users
                    USING qry
                    WHERE id = qry.users_id;
                 """)
                 
    qry.values = [time]
    
    if <!qry.exec() != false {
    /*
        for i in 0..<qry.numRows {
            if let mail = qry.getAsText(i, 0) {
            }
        }
        */
    }

    if let data = LoginStringParam.from(json:Post.ext_data.value),
       let gen = user_login_keyFrom(password:password) {
        let login = data.a
        let ticket = data.b ?? ""
        let mail = data.c ?? ""
        
        _ = <!SQLQry.begin()
            
        let qry = SQLQry("""
                                WITH del AS (
                                    DELETE FROM users_register WHERE ticket = $3 RETURNING users_id
                                )
                                UPDATE users SET login = $1, key = $4, salt = $5 FROM del WHERE users.id = del.users_id AND users.mail = $2 RETURNING id;
                            """)
                            
        qry.values = [login, mail, ticket, gen.0, gen.1]
        
        if <!qry.exec() == false {
            return ErrorDefault
        }
        
        if qry.numRows != 0 {
            _ = <!SQLQry.end()
            print(#"{"r":0}"#)
            return ErrorNone
        }
        
        _ = <!SQLQry.rollback()
    }
    return ErrorDefault
}

func user_invite() -> ErrorResult {
    let time = Date().to1970
    let perm = user_getPerm()
    
    if perm.has(.USER_EDIT), 
       let data = LoginIntParam.from(json:Post.ext_data.value) {
        let lID = data.l ?? 1
        
        guard let ticket = user_login_reset_ticket() else {
            return ErrorDefault
        }
        
        _ = <!SQLQry.begin()
        
        let qry = SQLQry("""
                            WITH ins AS (
                                INSERT INTO users_register (users_id, ticket, time, type) 
                                    SELECT id, $2, $3, 0 FROM users WHERE id = $1 RETURNING users_id
                            )
                            SELECT mail FROM users, ins WHERE id = ins.users_id;
                         """)
        
        qry.values = [data.a, ticket, time]
        
        if <!qry.exec() == false {
            return ErrorDefault
        }
        
        if qry.numRows != 0 {
            let mail = qry.getAsText(0, 0) ?? ""
            
            // send validation mail with template
            var m = Mail()
            m.CTtype = "text/html"
            if var f = <!Dir.login_invite.open("invite_template", .O_APPUDO) {
                let url = Link.to(url:"", isLocal:true).toHostString(true)
                _ = <!f.write(#"{"url":"\#(url)","mail":"\#(mail)","ticket":"\#(ticket)","lID":\#(lID)}"#)
                if let r = <!f.readAsText(8),
                   let s = <!f.readAsText(Int(r) ?? 0),
                   <!m.send(mail, s, f) != false {
                    print(#"{"r":0}"#)
                    _ = <!SQLQry.end()
                    return ErrorNone
                }
            }
        }
        
        _ = <!SQLQry.rollback()
    }
    
    return ErrorDefault
}

func user_add() -> ErrorResult {
    let perm = user_getPerm()
    if perm.has(.USER_EDIT), 
       let data = LoginStringParam.from(json:Post.ext_data.value) {
        let mail = data.a
        let user_perm = data.l ?? 0
        let qry = SQLQry("""
                            INSERT INTO users (login, mail, login_cookie, key, last_login, salt, attempts, keep, perm) 
                                       SELECT NULL, $1, NULL, '', 0, '', 0, FALSE, $2
                                RETURNING id;
                         """)
        qry.values = [mail, user_perm]
        if <!qry.exec() == false {
            return ErrorDefault
        }
        let id = qry.getAsInt32(0, 0) ?? -1
        print(#"{"r":0,"d":\#(id)}"#)
        return ErrorNone
    }
    return ErrorDefault
}

func user_update(_ password : UnsafeTmpString) -> ErrorResult {
    if let user = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let userId = data.m {
        let admin = user.perm.has(.USER_EDIT)
        if(admin || (user.id == userId && user.perm.has(.ACCOUNT_EDIT))) {
            let change_login = user.perm.has(.USER_CHANGE_LOGIN)
            
            var qryArgs : [Any] = [userId]
            var optArg = 2
            var args = ""
        
            if password.is_nil == false {
                if change_login == true,
                   let gen = user_login_keyFrom(password:password) {
                    args += "key = $\(optArg),salt = $\(optArg + 1),"
                    qryArgs.append(gen.0)
                    qryArgs.append(gen.1)
                    optArg += 2
                } else {
                    return ErrorDefault
                }
            }
            
            if let login = data.a {
                if(!change_login) {
                    return ErrorDefault
                }
                args += "login = $\(optArg),"
                qryArgs.append(login)
                optArg += 1
            }
            
            if let mail = data.b {
                args += "mail = $\(optArg),"
                qryArgs.append(mail)
                optArg += 1
            }
            
            if let perm = data.n {
                args += "perm = $\(optArg),"
                qryArgs.append(perm)
                optArg += 1
            }
            
            if let locked = data.o {
                args += "locked = $\(optArg),"
                qryArgs.append(locked == 1 ? true : false)
                optArg += 1
            }
            
            let qryStr = """
                            UPDATE users SET \(args.dropLast()) WHERE id = $1 RETURNING id
                         """
            
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = qryArgs
                
                var err = AsyncError()
                if (err <! qry.exec()) != false {
                    if(qry.numRows != 0) {
                        if let _ = data.n,
                           user.id != userId {  
                            user_change_logout(id:Int32(userId))
                        }
                    
                        print(#"{"r":0}"#)
                        return ErrorNone
                    }
                } else {
                    return ErrorResult(err.asSQL.rawValue)
                }
            }
        }
    }
    return ErrorDefault
}

func user_update_group() -> ErrorResult {
    if let user = user_getInfo(),
       user.perm.has(.USER_EDIT),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let groupId = data.m {
        var qryArgs : [Any] = [groupId]
        var optArg = 2
        var args = ""
        var update_perm = "SELECT"
        
        if let name = data.a {
            args += "name = $\(optArg),"
            qryArgs.append(name)
            optArg += 1
        }
        
        if let desc = data.b {
            args += "description = $\(optArg),"
            qryArgs.append(desc)
            optArg += 1
        }
        
        let update = optArg == 2 ?
                                "SELECT" 
                                    :
                                "UPDATE groups SET \(args.dropLast()) WHERE id = $1 RETURNING id" 
        
        if let userId = data.n,
           let perm = data.o {
            update_perm = "UPDATE users_groups SET perm = $\(optArg + 1) WHERE users_id = $\(optArg) AND groups_id = $1 RETURNING users_id"
            qryArgs.append(userId)
            qryArgs.append(perm)
            optArg += 2
        }
        
        let qryStr = """
                        WITH update_perm AS (
                            \(update_perm)
                        ),
                        update AS (
                            \(update)
                        )
                        SELECT * FROM update_perm, update;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = qryArgs
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                if(qry.numRows != 0) {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func user_remove() -> ErrorResult {
    if let user = user_getInfo(),
       let data = LoginIntParam.from(json:Post.ext_data.value),
       user.perm.has(.USER_EDIT) || (data.a == user.id && user.perm.has(.ACCOUNT_REMOVE)) {
        let id = data.a
        let rm = data.l ?? 1
        
        let qry = (id == user.id || rm == 1) ?
                  SQLQry("""
                            WITH _runs AS (
                                DELETE FROM runs WHERE users_id = $1 RETURNING TRUE
                            ),
                            _modules AS (
                                DELETE FROM modules WHERE users_id = $1 RETURNING TRUE
                            ),
                            _probes AS (
                                DELETE FROM probes WHERE users_id = $1 RETURNING TRUE
                            ),
                            _repos AS (
                                DELETE FROM repositories WHERE users_id = $1 RETURNING TRUE
                            ),
                            del AS (
                               DELETE FROM users WHERE users.id = $1 RETURNING users.id
                            )
                            SELECT id, $2::integer, (SELECT TRUE FROM _runs, _modules, _probes, _repos) FROM del;
                         """)
                                :
                  SQLQry("""
                            WITH _runs AS (
                                UPDATE runs SET users_id = $2 WHERE users_id = $1 RETURNING TRUE
                            ),
                            _modules AS (
                                UPDATE modules SET users_id = $2 WHERE users_id = $1 RETURNING TRUE
                            ),
                            _probes AS (
                                UPDATE probes SET users_id = $2 WHERE users_id = $1 RETURNING TRUE
                            ),
                            _repos AS (
                                UPDATE repositories SET users_id = $2 WHERE users_id = $1 RETURNING TRUE
                            ),
                            del AS (
                               DELETE FROM users WHERE users.id = $1 RETURNING users.id
                            )
                            SELECT id, (SELECT TRUE FROM _runs, _modules, _probes, _repos) FROM del;
                         """)
                         
        qry.values = [id, user.id]
        if <!qry.exec() == false || qry.numRows == 0 {
            return ErrorDefault
        }
        print(#"{"r":0}"#)
        return ErrorNone
    }
    return ErrorDefault
}

struct UserListParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
}

func printUser(_ id : Int32, _ name : String, _ mail : Bool) {
    print(#"{"id":\#(id),"n":"\#(name)""#)
    if(mail) {
        print(#","m":1"#)
    }
        print("},")
}

func user_list() -> ErrorResult {
    if let user = user_getInfo(),
       user.perm.has(.USER_EDIT) != false,
       let info = UserListParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 1:
                    fallthrough
                default:
                    orderQry += "login "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND login LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        
         
        let qryStr = """
                        SELECT id, CASE WHEN login IS NULL THEN mail ELSE login END, 
                                CASE WHEN login IS NULL THEN TRUE ELSE FALSE END,
                                row_number() OVER (\(orderQry)) AS nr FROM users u
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 3) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                        let mail = qry.getAsBool(i, 2) ?? false
                        printUser(id, name, mail)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

struct UserGroupParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
    let id : Int32?
}

func printGroup(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func user_list_group() -> ErrorResult {
    if let user = user_getInfo(),
       let info = UserGroupParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let id = info.id ?? user.id
        var admin = user.perm.has(.USER_EDIT)
        
        if info.id != nil {
            if(!admin) {
                return ErrorDefault
            }
            admin = false
        }
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 2:
                    orderQry += "g.description::bytea "
                case 1:
                    fallthrough
                default:
                    orderQry += "g.name::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND g.name LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        if let f2 = info.f2 {
            filterQry += "AND g.description LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f2)
        }
        
        if(!admin) {
            filterQry += "AND id IN(SELECT groups_id FROM users_groups WHERE users_id = $\(optArg))"
            qryArgs.append(id)
        }
        
         
        let qryStr = """
                        SELECT g.id, g.name, 
                                row_number() OVER (\(orderQry)) AS nr FROM groups g
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                        printGroup(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

func user_add_group() -> ErrorResult {
    let perm = user_getPerm()
    
    if perm.has(.USER_EDIT), 
       let data = UpdateParam.from(json:Post.ext_data.value) {
        if let name = data.a,
           let description = data.b {
        
            let qry = SQLQry("INSERT INTO groups(name, description) VALUES ($1, $2) RETURNING id;")
            
            qry.values = [name, description]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                let id = qry.getAsInt32(0, 0) ?? -1
                print(#"{"r":0,"d":\#(id)}"#)
                return ErrorNone
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        } else if let userId = data.n,
                  let groupId = data.m {
            
            let qry = SQLQry("INSERT INTO users_groups(users_id, groups_id, perm) VALUES ($1, $2, 0) RETURNING users_id;")
            
            qry.values = [userId, groupId]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                print(#"{"r":0}"#)
                return ErrorNone
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func user_remove_group() -> ErrorResult {
    let perm = user_getPerm()
    if perm.has(.USER_EDIT), 
       let data = UpdateParam.from(json:Post.ext_data.value),
       let groupId = data.m {
        if let userId = data.n {
            let qry = SQLQry("DELETE FROM users_groups WHERE users_id = $1 AND groups_id = $2 RETURNING users_id;")
            
            qry.values = [userId, groupId]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        } else {
            let qry = SQLQry("DELETE FROM groups WHERE id = $1 RETURNING id;")
            
            qry.values = [groupId]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func user_add_to_group() -> ErrorResult {
    let perm = user_getPerm()
    
    if perm.has(.USER_EDIT), 
       let data = ThreeInt32Param.from(json:Post.ext_data.value) {
        let userId = data.a
        let groupId = data.b
        let perm = data.c
        
        let qry = SQLQry("INSERT INTO users_groups (users_id, groups_id, perm) VALUES ($1, $2, $3);")
        
        qry.values = [userId, groupId, perm]
        
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            print(#"{"r":0}"#)
            return ErrorNone
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func user_remove_from_group() -> ErrorResult {
    let perm = user_getPerm()
    
    if perm.has(.USER_EDIT), 
       let data = TwoInt32Param.from(json:Post.ext_data.value) {
        let userId = data.a
        let groupId = data.b
        
        let qry = SQLQry("DELETE FROM users_groups WHERE users_id = $1 AND groups_id = $2 RETURNING users_id;")
        
        qry.values = [userId, groupId]
        
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            if qry.numRows != 0 {
                print(#"{"r":0}"#)
                return ErrorNone
            }
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func user_get() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.USER_EDIT) != false
        if(admin || uinfo.id == data.id) {
                
            let qry = SQLQry("SELECT id, login, mail, perm, locked, last_login FROM users WHERE id = $1;")
            
            qry.values = [data.id]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false && qry.numRows != 0 {
                let id = qry.getAsInt32(0, 0) ?? -1
                let login = qry.getAsText(0, 1) ?? ""
                let mail = qry.getAsText(0, 2) ?? ""
                let perm = qry.getAsInt32(0, 3) ?? 0
                let locked = qry.getAsBool(0, 4) ?? false
                let last_login = qry.getAsInt(0, 5) ?? 0
                print(#"{"r":0,"id":\#(id),"p":\#(perm),"n":"\#(login)","m":"\#(mail)","l":\#(locked ? 1 : 0),"t":"\#(last_login)"}"#)
                return ErrorNone
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func user_get_group_setting() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let groupId = data.m {
        let userId = data.n ?? -1
        let admin = uinfo.perm.has(.USER_EDIT) != false
        if(admin || (data.n != nil && uinfo.id == userId)) {
                
            let qry = SQLQry("SELECT g.id, g.name, g.description, a.perm FROM groups g LEFT OUTER JOIN users_groups a ON(g.id = a.groups_id AND a.users_id = $1) WHERE g.id = $2;")
            
            qry.values = [data.n == nil ? Optional<Int>.none as Any : userId, groupId]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false && qry.numRows != 0 {
                let id = qry.getAsInt32(0, 0) ?? -1
                let name = qry.getAsText(0, 1) ?? ""
                let desc = qry.getAsText(0, 2) ?? ""
                let perm = qry.getAsInt32(0, 3) ?? 0
                print(#"{"r":0,"id":\#(id),"p":\#(perm),"n":"\#(name)","d":"\#(desc)"}"#)
                return ErrorNone
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

struct UsesParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let id : Int
}

func printUse(_ id : Int32, _ name : String, _ perm : Int32) {
   print(#"{"id":\#(id),"n":"\#(name)","p":\#(perm)},"#)
}

func uses_get(_ info : UsesParam, _ table : String) -> ErrorResult {
    let items_per_page = info.i ?? 10
    let page_offset = info.p ?? 0
    
    var orderQry = ""
    if let order = info.o {
        orderQry = "ORDER BY "
        switch(order >> 1) {
            case 2:
                orderQry += "u.description::bytea "
            case 1:
                fallthrough
            default:
                orderQry += "u.login::bytea "
        }
        
        orderQry += (order & 1) == 1 ? "DESC " : "ASC "
    }
    
    var qryArgs : [Any] = [page_offset, items_per_page, info.id]
    var filterQry = "TRUE "
    var optArg = 4
    
    if let f1 = info.f1 {
        filterQry += "AND u.login LIKE '%' || $\(optArg) || '%' "
        optArg += 1
        qryArgs.append(f1)
    }
    if let f2 = info.f2 {
        filterQry += "AND u.description LIKE '%' || $\(optArg) || '%' "
        optArg += 1
        qryArgs.append(f2)
    }
     
    let qryStr = """
                    WITH sel AS (
                        SELECT users_id, groups_id FROM \(table) WHERE id = $3
                    ),
                    perm AS (
                        SELECT s.users_id, perm FROM users_groups g, sel s WHERE g.groups_id = s.groups_id
                    ),
                    unordered AS (
                        SELECT DISTINCT ON(u.id) u.id, u.login, CASE WHEN p.perm IS NULL THEN -1 ELSE p.perm END,
                                   row_number() OVER (\(orderQry)) AS nr FROM users u LEFT OUTER JOIN perm p ON (p.users_id = u.id)
                               WHERE ((u.perm & \(UserPermissions.ADMIN_ALL.rawValue)) != 0 OR u.id IN (SELECT users_id FROM sel) OR p.users_id = u.id)
                                AND \(filterQry)
                            LIMIT $2::bigint OFFSET $1::bigint
                    ) 
                    SELECT * FROM unordered
                           ORDER BY nr DESC;
                 """
    
    if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
        
        qry.values = qryArgs
        
        if <!qry.exec() == false {
            return ErrorDefault
        }
        
        var max = 0
        print(#"{"r":0,"d":["#)
        if(qry.numRows != 0) {
            max = qry.getAsInt(0, 3) ?? 0
            for i in 0..<qry.numRows {
                if let id = qry.getAsInt32(i, 0),
                   let name = qry.getAsText(i, 1),
                   let perm = qry.getAsInt32(i, 2) {
                    printUse(id, name, perm)
                }
            }
            _ = revert_print(1)
        }
        print(#"],"m":\#(max)}"#)
        
        return ErrorNone
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 probe handling                  */
/* ----------------------------------------------- */

struct ProbeParam : FastCodable {
    let id : Int?
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
}

func printProbe(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func printConnectedProbe(_ id : Int32, _ pid : Int32, _ identifier : String) {
   print(#"{"id":\#(id),"pid":\#(id),"n":"\#(identifier)"},"#)
}

func probe_list() -> ErrorResult {
    if let user = user_getInfo(),
       let info = ProbeParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let connected = info.f3 ?? false
        let admin = user.perm.has(.ADMIN_ALL)
        let ident = connected ? "identifier " : "login "
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 2:
                    orderQry += "n.description::bytea "
                case 1:
                    fallthrough
                default:
                    orderQry += ident + "::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = connected ? "p.id = a.probes_id " : "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND \(ident) LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        if let f2 = info.f2 {
            filterQry += "AND description LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f2)
        }
        
        if(!admin) {
            filterQry += "AND (groups_id IN(SELECT groups_id FROM users_groups WHERE users_id = $\(optArg)) OR users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT p.id, \(ident),
                                row_number() OVER (\(orderQry)) AS nr \(connected ? ",a.probes_settings_id" : "") FROM probes p \(connected ? ",probes_active a" : "")
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                       if(connected) {
                            let pid = qry.getAsInt32(i, 3) ?? -1
                            printConnectedProbe(id, pid, name)
                       } else {
                            printProbe(id, name)
                       }
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

struct ProbeAddParam : FastCodable {
    let n : String
    let d : String
    let g : Int?
}

func probe_add(_ key : UnsafeTmpString) -> ErrorResult {
    if let uinfo = user_getInfo(),
       uinfo.perm.has(.PROBE_ADD) != false,
       let data = ProbeAddParam.from(json:Post.ext_data.value) {
        _ = <!SQLQry.begin()
        let qry = SQLQry("""
                            WITH ins AS (
                                INSERT INTO probes(login, description, groups_id, users_id, key) VALUES ($1, $2, $3, $4, $5) RETURNING id
                            ) 
                            INSERT INTO probes_settings(probes_id) SELECT id FROM ins RETURNING probes_id;
                        """)
        qry.values = [data.n, data.d, data.g ?? Optional<Int>.none as Any, uinfo.id, key]
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            let id = qry.getAsInt32(0, 0) ?? -1 
            if let _ = err <! Dir.disassembly.mkpath("\(id)", [.U0700, .G0050, .O0001]) {
                 _ = <!SQLQry.end()
                print(#"{"r":0, "d": \#(id)}"#)
                return ErrorNone
            } else {
                _ = <!SQLQry.rollback()
                if(err.hasError) {
                    return ErrorResult(err.errValue)
                }
            }
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

struct ProbeGetParam : FastCodable {
    let pid : Int?
    let sid : Int?
}

func probe_get() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = ProbeGetParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH probe AS (
                            SELECT id, login, key, groups_id, users_id, description FROM probes WHERE id = $2
                        ),
                        setting AS (
                            SELECT probes_id, identifier, settings FROM probes_settings WHERE id = $3
                        ),
                        res AS(
                            SELECT CASE WHEN id IS NULL THEN probes_id ELSE id END, login, key, groups_id, users_id, description, identifier, settings 
                                FROM probe m FULL JOIN setting s ON(m.id = s.probes_id)
                        ),
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, probes p, res
                                    WHERE g.users_id = $1 
                                        AND p.id = res.id
                                        AND p.groups_id = g.groups_id 
                        )
                        SELECT login, 
                                (CASE WHEN $4::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_VIEW_KEY.rawValue)) != 0 THEN key ELSE NULL END), 
                                users_id, groups_id, description, identifier, settings #>> '{}' FROM res m, perm p WHERE
                                ($4::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0)
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.pid ?? Optional<Int32>.none as Any, data.sid ?? Optional<Int32>.none as Any, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    let login = qry.getAsText(0, 0) ?? ""
                    let key = qry.getAsText(0, 1) ?? ""
                    let users_id = qry.getAsInt32(0, 2) ?? -1
                    let groups_id = qry.getAsInt32(0, 3) ?? -1
                    let desc = qry.getAsText(0, 4) ?? ""
                    let identifier = qry.getAsText(0, 5) ?? ""
                    let settings = qry.getAsText(0, 6) ?? "{}"
                    let sid = data.sid == nil ? "" : #""i":"\#(identifier)","s":\#(settings),"#
                    let pid = data.pid == nil ? "" : #""n":"\#(login)","k":"\#(key)","d":"\#(desc)","u":\#(users_id),"g":\#(groups_id),"#
                    print(#"{\#(pid)\#(sid)"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
            
    }
    return ErrorDefault
}

func probe_remove() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, probes p 
                                    WHERE g.users_id = $1 
                                        AND p.id = $2
                                        AND p.groups_id = g.groups_id 
                                           
                        ),
                        del AS (
                            DELETE FROM probes m USING perm p WHERE id = $2 AND 
                                ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0) RETURNING m.id
                        )
                        DELETE FROM probes_settings s USING del WHERE probes_id = del.id RETURNING s.id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    _ = Dir.disassembly.remove("\(data.id)")
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func probe_update(_ password : UnsafeTmpString) -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let user_edit = uinfo.perm.has(.USER_EDIT)
        let empty = "SELECT"
        var update_probe = empty
        var update_setting = empty
        var args = ""
    
        var qryArgs : [Any] = [uinfo.id, data.m ?? Optional<Int32>.none as Any, data.n ?? Optional<Int32>.none as Any, admin]
        var optArg = 5
    
        if let login = data.a {
            args += "login = $\(optArg),"
            qryArgs.append(login)
            optArg += 1
        }
        
        if password.is_nil == false {
            args += "key = $\(optArg),"
            qryArgs.append(password)
            optArg += 1
        }
        
        if let description = data.b {
            args += "description = $\(optArg),"
            qryArgs.append(description)
            optArg += 1
        }
        
        if let users_id = data.o {
            if user_edit == false {
                return ErrorDefault
            }
            args += "users_id = $\(optArg),"
            qryArgs.append(users_id)
            optArg += 1
        }
        
        if let groups_id = data.p {
            if user_edit == false {
                return ErrorDefault
            }
            args += "groups_id = $\(optArg),"
            qryArgs.append(groups_id)
            optArg += 1
        }
        
        if(args != "") {
            update_probe = "UPDATE probes p SET \(args.dropLast()) FROM has, probe WHERE p.id = probe.id AND has.perm RETURNING p.id"
        }
        
        args = ""
        
        if let identifier = data.c {
            args += "identifier = $\(optArg),"
            qryArgs.append(identifier)
            optArg += 1
        }
        
        if let settings = data.d {
            args += "settings = $\(optArg),"
            qryArgs.append(settings)
            optArg += 1
        }
        
        if(args != "") {
            update_setting = "UPDATE probes_settings s SET \(args.dropLast()) FROM has WHERE s.id = $3 AND has.perm RETURNING s.id"
        }
        
        let qryStr = """
                        WITH probe AS (
                            SELECT CASE WHEN $2::bigint IS NULL THEN (SELECT probes_id FROM probes_settings WHERE id = $3::bigint) ELSE $2::bigint END AS id
                        ), 
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, probes p, probe
                                    WHERE g.users_id = $1 
                                        AND p.id = probe.id
                                        AND p.groups_id = g.groups_id 
                        ),
                        has AS (
                            SELECT ($4::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0) AS perm 
                                FROM probes m, perm p, probe WHERE m.id = probe.id
                        ),
                        upd1 AS (
                            \(update_probe)
                        ),
                        upd2 AS (
                            \(update_setting)
                        )
                        SELECT* FROM upd1, upd2;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = qryArgs
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func probe_get_uses() -> ErrorResult {
    let perm = user_getPerm()
    if perm.has(.USER_EDIT) != false,
       let info = UsesParam.from(json:Post.ext_data.value) {
        return uses_get(info, "probes") 
    }
    return ErrorDefault
}

func printProbeSetting(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func probe_list_settings() -> ErrorResult {
    if let user = user_getInfo(),
       let info = ProbeParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        let probeId = info.id ?? -1
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 1:
                    fallthrough
                default:
                    orderQry += "s.identifier::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page, probeId]
        var filterQry = "s.probes_id = $3 "
        var optArg = 4
        
        if let f1 = info.f1 {
            filterQry += "AND s.identifier LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        
        if(!admin) {
            filterQry += "AND probes_id IN(SELECT p.id FROM probes p, users_groups g WHERE (g.users_id = $\(optArg) AND g.groups_id = p.groups_id) OR p.users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT s.id, s.identifier, 
                                row_number() OVER (\(orderQry)) AS nr FROM probes_settings s
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0) {
                       let name = qry.getAsText(i, 1) ?? ""
                        printProbeSetting(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

func probe_add_setting() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let identifier = data.a { 
        let admin = uinfo.perm.has(.ADMIN_ALL)
        if let setting_id = data.m {
            let qryStr = """
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm FROM users_groups g, probes p, probes_settings s
                                        WHERE g.users_id = $1 
                                            AND s.id = $2
                                            AND s.probes_id = p.id
                                            AND p.groups_id = g.groups_id 
                                               
                            ),
                            sel AS (
                                SELECT m.id FROM probes m, probes_settings s, perm p WHERE s.id = $2 AND m.id = s.probes_id AND
                                    ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0)
                            )
                            INSERT INTO probes_settings(probes_id, identifier, settings) SELECT probes_id, $4, settings 
                                FROM probes_settings s, sel 
                                    WHERE s.id = $2 AND probes_id = sel.id RETURNING id;
                         """
                         
             
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = [uinfo.id, setting_id, admin, identifier]
                
                var err = AsyncError()
                if (err <! qry.exec()) != false {
                    if let id = qry.getAsInt32(0, 0) {
                        print(#"{"r":0, "d": \#(id)}"#)
                        return ErrorNone
                    }
                } else {
                    return ErrorResult(err.asSQL.rawValue)
                }
            }
        } else 
        if let probe_id = data.n {
            let qryStr = """
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm FROM users_groups g, probes p
                                        WHERE g.users_id = $1 
                                            AND p.id = $2
                                            AND p.groups_id = g.groups_id 
                                               
                            ),
                            sel AS (
                                SELECT m.id FROM probes m, perm p WHERE m.id = $2 AND
                                    ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0)
                            )
                            INSERT INTO probes_settings(probes_id, identifier) SELECT id, $4 
                                FROM sel 
                                    WHERE sel.id IS NOT NULL RETURNING id;
                         """
                         
             
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = [uinfo.id, probe_id, admin, identifier]
                
                var err = AsyncError()
                if (err <! qry.exec()) != false {
                    if let id = qry.getAsInt32(0, 0) {
                        print(#"{"r":0, "d": \#(id)}"#)
                        return ErrorNone
                    }
                } else {
                    return ErrorResult(err.asSQL.rawValue)
                }
            }
        }
    }
    return ErrorDefault
}

func probe_remove_setting() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, probes p, probes_settings s
                                    WHERE g.users_id = $1 
                                        AND s.id = $2
                                        AND s.probes_id = p.id
                                        AND p.groups_id = g.groups_id 
                                           
                        ),
                        sel AS (
                            SELECT m.id FROM probes m, probes_settings s, perm p WHERE s.id = $2 AND m.id = s.probes_id AND
                                ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.PROBE_EDIT.rawValue)) != 0)
                        )
                        DELETE FROM probes_settings s USING sel WHERE s.id = $2 AND probes_id = sel.id RETURNING s.id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 module handling                 */
/* ----------------------------------------------- */

struct ModuleParam : FastCodable {
    let id : Int?
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
}

func printModule(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func module_list() -> ErrorResult {
    if let user = user_getInfo(),
       let info = ModuleParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 2:
                    orderQry += "m.description::bytea "
                case 1:
                    fallthrough
                default:
                    orderQry += "m.name::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND m.name LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        if let f2 = info.f2 {
            filterQry += "AND m.description LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f2)
        }
        
        if(!admin) {
            filterQry += "AND (groups_id IN(SELECT groups_id FROM users_groups WHERE users_id = $\(optArg)) OR users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT m.id, m.name, 
                                row_number() OVER (\(orderQry)) AS nr FROM modules m
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                        printModule(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

struct ModuleAddParam : FastCodable {
    let n : String
    let d : String
    let i : String
    let l : Int
    let g : Int?
}

func module_add() -> ErrorResult {
    if let uinfo = user_getInfo(),
       uinfo.perm.has(.MODULE_ADD) != false,
       let data = ModuleAddParam.from(json:Post.ext_data.value) {
        _ = <!SQLQry.begin()
        let qry = SQLQry("""
                            WITH ins_modules AS (
                                INSERT INTO modules(name, description, groups_id, users_id, locked) VALUES ($1, $2, $3, $4, $5) RETURNING id
                            )
                            INSERT INTO module_instances (modules_id, name) SELECT ins_modules.id, $6 RETURNING modules_id;
                         """)
        qry.values = [data.n, data.d, data.g ?? Optional<Int>.none as Any, uinfo.id, data.l, data.i]
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            let id = qry.getAsInt32(0, 0) ?? -1 
            if let _ = err <! Dir.module_gen_source.mkpath("\(id)", [.U0700, .G0050, .O0001]),
               let d = err <! Dir.module_source.mkpath("\(id)", [.U0700, .G0050, .O0001]),
               let _ = err <! d.open("config.html", [.O_CREAT,.O_RDONLY]),
               let _ = err <! d.open("run.html", [.O_CREAT,.O_RDONLY]),
               let _ = err <! d.open("setup.html", [.O_CREAT,.O_RDONLY]) {
                 _ = <!SQLQry.end()
                print(#"{"r":0, "d": \#(id)}"#)
                return ErrorNone
            } else {
                _ = Dir.module_source.remove("\(id)")
                _ = Dir.module_gen_source.remove("\(id)")
                _ = <!SQLQry.rollback()
                if(err.hasError) {
                    return ErrorResult(err.errValue)
                }
            }
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func module_remove() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m 
                                    WHERE g.users_id = $1 
                                        AND m.id = $2
                                        AND m.groups_id = g.groups_id 
                                           
                        )
                        DELETE FROM modules m USING perm p WHERE id = $2 AND 
                            ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0) RETURNING m.id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    _ = Dir.module_source.remove("\(data.id)")
                    _ = Dir.module_gen_source.remove("\(data.id)")
                
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func module_update() -> ErrorResult {
   if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let user_edit = uinfo.perm.has(.USER_EDIT)
        let empty = "SELECT"
        var update_module = empty
        var update_instance = empty
        var args = ""
    
        var qryArgs : [Any] = [uinfo.id, data.m ?? Optional<Int32>.none as Any, data.n ?? Optional<Int32>.none as Any, admin]
        var optArg = 5
    
        if let description = data.a {
            args += "description = $\(optArg),"
            qryArgs.append(description)
            optArg += 1
        }

        if let options = data.b {
            args += "options = $\(optArg),"
            qryArgs.append(options)
            optArg += 1
        }

        if let name = data.c {
            args += "name = $\(optArg),"
            qryArgs.append(name)
            optArg += 1
        }
        
        if let users_id = data.o {
            if user_edit == false {
                return ErrorDefault
            }
            args += "users_id = $\(optArg),"
            qryArgs.append(users_id)
            optArg += 1
        }
        
        if let groups_id = data.p {
            if user_edit == false {
                return ErrorDefault
            }
            args += "groups_id = $\(optArg),"
            qryArgs.append(groups_id)
            optArg += 1
        }
        
        if let locked = data.q {
            args += "locked = $\(optArg),"
            qryArgs.append(locked)
            optArg += 1
        }
        
        if(args != "") {
            update_module = "UPDATE modules m SET \(args.dropLast()) FROM has, module WHERE m.id = module.id AND has.perm RETURNING m.id"
        }
        
        args = ""
        
        if let name = data.d {
            args += "name = $\(optArg),"
            qryArgs.append(name)
            optArg += 1
        }
        
        if let options = data.e {
            args += "options = $\(optArg),"
            qryArgs.append(options)
            optArg += 1
        }
        
        if(args != "") {
            update_instance = "UPDATE module_instances i SET \(args.dropLast()) FROM has WHERE i.id = $3 AND has.perm RETURNING i.id"
        }
        
        let qryStr = """
                        WITH module AS (
                            SELECT CASE WHEN $2::bigint IS NULL THEN (SELECT modules_id FROM module_instances WHERE id = $3::bigint) ELSE $2::bigint END AS id
                        ), 
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m, module
                                    WHERE g.users_id = $1 
                                        AND m.id = module.id
                                        AND m.groups_id = g.groups_id 
                        ),
                        has AS (
                            SELECT ($4::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0) AS perm 
                                FROM modules m, perm p, module WHERE m.id = module.id
                        ),
                        upd1 AS (
                            \(update_module)
                        ),
                        upd2 AS (
                            \(update_instance)
                        )
                        SELECT * FROM upd1, upd2;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = qryArgs
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

struct ModuleGetParam : FastCodable {
    let mid : Int?
    let iid : Int?
}

func module_get() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = ModuleGetParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH module AS (
                            SELECT id, name, users_id, groups_id, description, locked FROM modules WHERE id = $2
                        ),
                        instance AS (
                            SELECT modules_id, name, options FROM module_instances WHERE id = $3
                        ),
                        res AS(
                            SELECT CASE WHEN id IS NULL THEN modules_id ELSE id END, m.name, users_id, groups_id, description, locked, i.name AS iname, options
                                FROM module m FULL JOIN instance i ON(m.id = i.modules_id)
                        ),
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m, res
                                    WHERE g.users_id = $1 
                                        AND m.id = res.id
                                        AND m.groups_id = g.groups_id 
                        )
                        SELECT name, users_id, groups_id, description, locked, 
                                     CASE WHEN p.perm IS NULL THEN -1 ELSE p.perm END
                                    ,iname, options #>> '{}' FROM res m, perm p WHERE
                                ($4::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0)
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.mid ?? Optional<Int32>.none as Any, data.iid ?? Optional<Int32>.none as Any, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    let name = qry.getAsText(0, 0) ?? "";
                    let users_id = qry.getAsInt32(0, 1) ?? -1;
                    let groups_id = qry.getAsInt32(0, 2) ?? -1;
                    let desc = qry.getAsText(0, 3) ?? "";
                    let locked = qry.getAsBool(0, 4) ?? true;
                    let perm = qry.getAsInt32(0, 5) ?? -1;
                    let iname = qry.getAsText(0, 6) ?? "";
                    let options = qry.getAsText(0, 7) ?? "{}";
                    let iid = data.iid == nil ? "" : #""o":\#(options),"i":"\#(iname)","#
                    let mid = data.mid == nil ? "" : #""n":"\#(name)","d":"\#(desc)","p":\#(perm),"u":\#(users_id),"g":\#(groups_id),"l":\#(locked ? 1 : 0),"#
                    print(#"{\#(mid)\#(iid)"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
            
    }
    return ErrorDefault
}

func module_download() -> ErrorResult {
    // TODO gen package from module
    return ErrorDefault
}

func module_install() -> ErrorResult {
    // TODO 
    return ErrorDefault
}

func module_share() -> ErrorResult {
    // TODO
    return ErrorDefault
}

func package_compress(dir : FileItem) -> Bool {
    var err = AsyncError()
    if let bin = err <! Dir.bin.open("appudo_archiver", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_archiver", "-c", "-o", "result.tar.gz", "out"], env:["PATH=/usr/lib"], 
                                       cwd:dir, flags:.SUID) {
            return true
        }
    }
    return false
}

func module_pack() -> ErrorResult {
    var err = AsyncError()
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       uinfo.perm.has(.MODULE_SHARE),
       let name = data.a, 
       let moduleId = data.m {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        if var tmp = <!FileItem.create_tmp(Dir.tmp, "pkgXXXXXX", flags:[.O_DIRECTORY, .O_RDONLY], mode:[.S_IRWXU, .S_IRWXG]) {
           _ = <!tmp.mkpath("out", [.U0700, .G0050, .O0001])
            defer {
                _ = <!tmp.remove(outer:true)
            }
            
            if var minfo = <!tmp.open("out/minfo", [.O_CREAT, .O_RDWR]) {
           
                var qry = SQLQry("""
                                    WITH perm AS (
                                        SELECT bit_or(perm) AS perm FROM users_groups g, modules m
                                                WHERE g.users_id = $1 
                                                    AND m.id = $2
                                                    AND m.groups_id = g.groups_id 
                                                       
                                    )
                                    
                                    SELECT name, description, options #>> '{}', locked FROM modules m, perm p WHERE m.id = $2 AND
                                            ($3::Boolean IS TRUE OR m.users_id = $1);
                                 """)
                                 
                
                qry.values = [uinfo.id, moduleId , admin]               
                if <!qry.exec() == false || qry.numRows != 1 {
                    Page.resultStatus = .S_404
                    return ErrorNone
                }
            
                let buffer = ManagedCharBuffer.create(64)
                var cbor = CBOR(buffer:buffer)
                var nm = qry.getAsUnsafeData(0, 0)
                var desc = qry.getAsUnsafeData(0, 1)
                var opt = qry.getAsUnsafeData(0, 2)
                let locked = qry.getAsBool(0, 3) ?? true
                var num : Int32 = 1
                
                num += nm.is_nil ? 0 : 1 
                num += desc.is_nil ? 0 : 1 
                num += opt.is_nil ? 0 : 1 
                
                _ = cbor.put(mapSize:2)
                _ = cbor.put(sstring:"m")
                _ = cbor.put(mapSize:num)
                
                if !nm.is_nil {
                    _ = cbor.put(sstring:"n")
                    _ = cbor.put(stringSize:nm.size)
                    _ = <!minfo.write(cbor, nm)
                    cbor.reset()
                }
                
                if !desc.is_nil {
                    _ = cbor.put(sstring:"d")
                    _ = cbor.put(stringSize:desc.size)
                    _ = <!minfo.write(cbor, desc)
                    cbor.reset()
                }
        
                if !opt.is_nil {
                    _ = cbor.put(sstring:"o")
                    _ = cbor.put(stringSize:opt.size)
                    _ = <!minfo.write(cbor, opt)
                    cbor.reset()
                }
                
                nm.clear()
                desc.clear()
                opt.clear()
                withExtendedLifetime(qry) {
                    
                }
                
                _ = cbor.put(sstring:"l")
                _ = cbor.put(bool:locked)
                _ = cbor.put(sstring:"i")
                
                
                qry = SQLQry("""
                                    SELECT id, name, options #>> '{}' FROM module_instances WHERE modules_id = $1;
                             """)  
                             
                qry.values = [moduleId]
                qry.singleRowMode = true
                
                _ = cbor.put_array()
                
                if(err <! qry.exec()) != false {
                    repeat {
                        if qry.numRows != 0 {
                            let iid = qry.getAsInt32(0, 0) ?? -1
                            let name = qry.getAsUnsafeData(0, 1)
                            let v = qry.getAsUnsafeData(0, 2)
                            _ = cbor.put(mapSize:3)
                            _ = cbor.put(sstring:"r")
                            _ = cbor.put(int:iid)
                            _ = cbor.put(sstring:"n")
                            _ = cbor.put(stringSize:name.size)
                            _ = <!minfo.write(cbor, name)
                            cbor.reset()
                            _ = cbor.put(sstring:"o")
                            if !v.is_nil {
                                _ = cbor.put(stringSize:v.size)
                                _ = <!minfo.write(cbor, v)
                            } else {
                                _ = cbor.put(sstring:"{}")
                                _ = <!minfo.write(cbor)
                            }
                            cbor.reset()
                        }
                    } while(<!qry.cont() != false)
                } else  {
                    Page.resultStatus = .S_404
                    return ErrorNone
                }
                
                _ = cbor.put_end()
                _ = <!minfo.write(cbor)
                
                if let d = <!Dir.module_source.open("\(moduleId)", .O_PATH) {
                    _ = <!d.copy("out/source", tmp)
                }
                
                if let d = <!Dir.module_gen_source.open("\(moduleId)", .O_PATH) {
                    _ = <!d.copy("out/gen", tmp)
                }
               
                if package_compress(dir:tmp),
                    let out = <!tmp.open("result.tar.gz", .O_RDONLY) {
                    _ = Page.addResultHeader("Content-Disposition: attachment; filename=\(name)\r\n")
                    _ = Page.addResultHeader("Content-Transfer-Encoding: binary\r\n");
                    if send(exclusive:out) {
                        return ErrorNone
                    }
                }
                    
            }
        }
    }
    Page.resultStatus = .S_404
    return ErrorNone
}

func module_load_code() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = TwoInt32Param.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let type = data.b
        var f = ""
        if(type < 64) {
            let moduleId = data.a
            
            if(type == 0 || type == 3) {
                let qryStr = """
                                WITH perm AS (
                                    SELECT bit_or(perm) AS perm FROM users_groups g, modules m 
                                            WHERE g.users_id = $1 
                                                AND m.id = $2
                                                AND m.groups_id = g.groups_id 
                                                   
                                )
                                SELECT m.users_id FROM modules m 
                                    LEFT OUTER JOIN perm p ON((p.perm & \(GroupPermissions.MODULE_SETUP.rawValue)) != 0) 
                                        WHERE (m.users_id = $1 OR $3::Boolean IS TRUE OR perm IS NOT NULL) AND m.id = $2;
                             """
                
                if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                    qry.values = [uinfo.id, moduleId, admin]
                    
                    var err = AsyncError()
                    if(err <! qry.exec()) == false || qry.numRows == 0 {
                        Page.resultStatus = .S_401
                        return ErrorNone
                    }
                }
            }
            
            switch(type) {
                case 0:
                    f = "\(moduleId)/setup.html"
                case 1:
                    f = "\(moduleId)/config.html"
                case 3:
                    f = "\(moduleId)/setup.tmpl"
                case 4:
                    f = "\(moduleId)/config.tmpl"
                case 5:
                    f = "\(moduleId)/run.tmpl"
                default:    // 2
                    f = "\(moduleId)/run.html"
            }
            if let o = <!Dir.module_source.open(f, .O_RDONLY) {
                if(<!Page.setMime("html") != false && send(exclusive:o)) {
                    return ErrorNone
                }
            }
        } else {
            let miid = data.a
            var moduleId = -1
            
            let qryStr = """
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm, min(i.modules_id) AS modules_id, min(m.users_id) AS users_id
                                        FROM module_instances i, modules m 
                                        LEFT OUTER JOIN users_groups g ON(g.users_id = $1 AND m.groups_id = g.groups_id) 
                                        WHERE i.id = $2
                                            AND i.modules_id = m.id
                                               
                            )
                            SELECT p.modules_id FROM module_instances i, perm p
                                    WHERE (p.users_id = $1 OR $3::Boolean IS TRUE OR (p.perm & \(GroupPermissions.MODULE_SETUP.rawValue)) != 0) AND i.id = $2 AND i.modules_id = p.modules_id;
                         """
            
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = [uinfo.id, miid, admin]
                
                var err = AsyncError()
                if(err <! qry.exec()) == false || qry.numRows == 0 {
                    Page.resultStatus = .S_401
                    return ErrorNone
                }
                
                moduleId = Int(qry.getAsInt32(0, 0) ?? -1)
            }
            
            switch(type) {
                case 64:
                    f = "\(moduleId)/\(miid)/ebpf.h"
                case 65:
                    f = "\(moduleId)/\(miid)/ebpf.c"
                case 66:
                    f = "\(moduleId)/\(miid)/user.h"
                default:
                    f = "\(moduleId)/\(miid)/user.cpp"
            }
                    
            if let o = <!Dir.module_gen_source.open(f, .O_RDONLY) {
                if(<!Page.setMime("txt") != false && send(exclusive:o)) {
                    return ErrorNone
                }
            }
        }
        
    }

    Page.resultStatus = .S_404
    return ErrorNone
}

func printModuleInstance(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func module_list_instances() -> ErrorResult {
    if let user = user_getInfo(),
       let info = ModuleParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 1:
                    fallthrough
                default:
                    orderQry += "i.name::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page, info.id ?? Optional<Int>.none as Any]
        var filterQry = "($3::integer IS NULL OR i.modules_id = $3) "
        var optArg = 4
        
        if let f1 = info.f1 {
            filterQry += "AND i.name LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        
        if(!admin) {
            filterQry += "AND modules_id IN(SELECT p.id FROM modules p, users_groups g WHERE (g.users_id = $\(optArg) AND g.groups_id = p.groups_id) OR p.users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT i.id, i.name, 
                                row_number() OVER (\(orderQry)) AS nr FROM module_instances i
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0) {
                       let name = qry.getAsText(i, 1) ?? ""
                        printModuleInstance(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

func module_add_instance() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let name = data.a { 
        let admin = uinfo.perm.has(.ADMIN_ALL)
        if let instance_id = data.m {
            let qryStr = """
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm FROM users_groups g, modules m, module_instances i
                                        WHERE g.users_id = $1 
                                            AND i.id = $2
                                            AND i.modules_id = m.id
                                            AND m.groups_id = g.groups_id 
                                               
                            ),
                            sel AS (
                                SELECT m.id FROM modules m, module_instances i, perm p WHERE i.id = $2 AND m.id = i.modules_id AND
                                    ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0)
                            )
                            INSERT INTO module_instances(modules_id, name, options) SELECT modules_id, $4, options 
                                FROM module_instances i, sel 
                                    WHERE i.id = $2 AND modules_id = sel.id RETURNING id;
                         """
            
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = [uinfo.id, instance_id, admin, name]
                
                var err = AsyncError()
                if (err <! qry.exec()) != false {
                    if let id = qry.getAsInt32(0, 0) {
                        print(#"{"r":0, "d": \#(id)}"#)
                        return ErrorNone
                    }
                } else {
                    return ErrorResult(err.asSQL.rawValue)
                }
            }
        } else 
        if let module_id = data.n {
            let qryStr = """
                            WITH perm AS (
                                SELECT bit_or(perm) AS perm FROM users_groups g, modules m
                                        WHERE g.users_id = $1 
                                            AND m.id = $2
                                            AND m.groups_id = g.groups_id 
                                               
                            ),
                            sel AS (
                                SELECT m.id FROM modules m, perm p WHERE m.id = $2 AND
                                    ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0)
                            )
                            INSERT INTO module_instances(modules_id, name) SELECT id, $4 
                                FROM sel 
                                    WHERE sel.id IS NOT NULL RETURNING id;
                         """
                         
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                qry.values = [uinfo.id, module_id, admin, name]
                
                var err = AsyncError()
                if (err <! qry.exec()) != false {
                    if let id = qry.getAsInt32(0, 0) {
                        print(#"{"r":0, "d": \#(id)}"#)
                        return ErrorNone
                    }
                } else {
                    return ErrorResult(err.asSQL.rawValue)
                }
            }
        }
    }
    return ErrorDefault
}

func module_remove_instance() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules p, module_instances i
                                    WHERE g.users_id = $1 
                                        AND i.id = $2
                                        AND i.modules_id = p.id
                                        AND p.groups_id = g.groups_id 
                                           
                        ),
                        sel AS (
                            SELECT m.id FROM modules m, module_instances i, perm p WHERE i.id = $2 AND m.id = i.modules_id AND
                                ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.MODULE_EDIT.rawValue)) != 0)
                        )
                        DELETE FROM module_instances i USING sel WHERE i.id = $2 AND modules_id = sel.id RETURNING i.modules_id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                let moduleId = qry.getAsInt(0, 0) ?? -1
                    _ = <!Dir.module_gen_source.remove("\(moduleId)/\(data.id)")
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func module_instance_get_settings() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = TwoInt32Param.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        var qryStr = ""
        
        if(data.b == 0) {
            qryStr = """
                        WITH instance AS (
                            SELECT i.options, users_id, groups_id FROM modules m, module_instances i WHERE i.id = $2 AND m.id = i.modules_id
                        ),
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, instance i
                                    WHERE g.users_id = $1 
                                        AND i.groups_id = g.groups_id
                        )
                        SELECT options #>> '{}' FROM instance i, perm p WHERE
                                ($3::Boolean IS TRUE OR i.users_id = $1 OR p.perm IS NOT NULL)
                     """
        } else {
            qryStr = """
                        WITH instance AS (
                            SELECT i.options, users_id, groups_id FROM modules m, module_instances i, run_instances r
                                WHERE r.id = $2 
                                  AND m.id = i.modules_id
                                  AND i.id = r.module_instances_id
                        ),
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, instance i
                                    WHERE g.users_id = $1 
                                        AND i.groups_id = g.groups_id
                        )
                        SELECT options #>> '{}' FROM instance i, perm p WHERE
                                ($3::Boolean IS TRUE OR i.users_id = $1 OR p.perm IS NOT NULL)
                     """
        }
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.a, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    let options = qry.getAsText(0, 0) ?? "{}";
                    print(#"{"d":\#(options),"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
            
    }
    return ErrorDefault
}

func module_get_uses() -> ErrorResult {
    let perm = user_getPerm()
    if perm.has(.USER_EDIT) != false,
       let info = UsesParam.from(json:Post.ext_data.value) {
        return uses_get(info, "modules") 
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 run handling                    */
/* ----------------------------------------------- */

struct RunParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
}

func printRun(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func run_list() -> ErrorResult {
    if let user = user_getInfo(),
       let info = RunParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 2:
                    orderQry += "r.description::bytea "
                case 1:
                    fallthrough
                default:
                    orderQry += "r.name::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND r.name LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        if let f2 = info.f2 {
            filterQry += "AND r.description LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f2)
        }
        
        if(!admin) {
            filterQry += "AND (groups_id IN(SELECT groups_id FROM users_groups WHERE users_id = $\(optArg)) OR users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT r.id, r.name, 
                                row_number() OVER (\(orderQry)) AS nr FROM runs r
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                        printRun(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

func run_get() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, runs r
                                    WHERE g.users_id = $1 
                                        AND r.id = $2
                                        AND r.groups_id = g.groups_id 
                                           
                        )
                        SELECT name, description, options #>> '{}', users_id, groups_id FROM runs r, perm p WHERE id = $2 AND 
                            ($3::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0);
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                let name = qry.getAsText(0, 0) ?? ""
                let desc = qry.getAsText(0, 1) ?? ""
                let options = qry.getAsText(0, 2) ?? "{}"
                let user_id = qry.getAsInt32(0, 3) ?? -1
                let group_id = qry.getAsInt32(0, 4) ?? -1
                    print(#"{"r":0,"n":"\#(name)","d":"\#(desc)","o":\#(options),"u":\#(user_id),"g":\#(group_id)}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func _run_update_options(uid : Int32, perm : UserPermissions, data : IdParam) -> ErrorResult {
    let admin = perm.has(.ADMIN_ALL)
    
    let qryStr = """
                    WITH perm AS (
                        SELECT bit_or(perm) AS perm FROM users_groups g, runs r 
                                WHERE g.users_id = $1 
                                    AND r.id = $2
                                    AND r.groups_id = g.groups_id 
                                       
                    )
                    SELECT i.id, i.module_instances_id, i.options #>> '{}' FROM run_instances i, runs r, perm p WHERE runs_id = $2 AND r.id = runs_id AND 
                        ($3::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0);
                 """
         
    if var out = <!FileItem.create_tmp(),
       let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
        qry.values = [uid, data.id, admin]
        qry.singleRowMode = true
        
        let buffer = ManagedCharBuffer.create(64)
        var cbor = CBOR(buffer:buffer)
        
        var err = AsyncError()
        _ = cbor.put_array()
        _ = <!out.write(cbor)
        
        cbor.reset()
        
        if(err <! qry.exec()) != false {
            repeat {
                if qry.numRows != 0 {
                    let riid = qry.getAsInt32(0, 0) ?? -1
                    let miid = qry.getAsInt32(0, 1) ?? -1
                    let v = qry.getAsUnsafeData(0, 2)
                    _ = cbor.put(mapSize:3)
                    _ = cbor.put(sstring:"r")
                    _ = cbor.put(int:riid)
                    _ = cbor.put(sstring:"m")
                    _ = cbor.put(int:miid)
                    _ = cbor.put(sstring:"o")
                    if !v.is_nil  {
                        _ = cbor.put(stringSize:v.size)
                        _ = <!out.write(cbor)
                        _ = <!out.write(v)
                    } else {
                        _ = cbor.put(sstring:"{}")
                        _ = <!out.write(cbor)
                    }
                    cbor.reset()
                }
            } while(<!qry.cont() != false)
        } 
        
        _ = cbor.put_end()
        _ = <!out.write(cbor)
        
        let file = "settings.json"
        if qry.hasError == false,
           let target = <!Dir.run_binary.open("\(data.id)", .O_PATH) {
            _ = <!target.remove(file)
            if <!out.link_open(file, target, hard:true) != false {
                return ErrorNone
            }
        }  else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    
    return ErrorDefault
}

func run_update_options() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let res = _run_update_options(uid:uinfo.id, perm:uinfo.perm, data:data)
        
        if(res == ErrorNone) {
            print(#"{"r":0}"#)
            return ErrorNone
        } else {
            return res
        }
    }
    return ErrorDefault
}

func run_update() -> ErrorResult {
   if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let run_id = data.m {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let user_edit = uinfo.perm.has(.USER_EDIT)
        let empty = "SELECT"
        var update = empty
        var args = ""
    
        var qryArgs : [Any] = [uinfo.id, run_id, admin]
        var optArg = 4
    
        if let description = data.a {
            args += "description = $\(optArg),"
            qryArgs.append(description)
            optArg += 1
        }

        if let options = data.b {
            args += "options = $\(optArg),"
            qryArgs.append(options)
            optArg += 1
        }

        if let name = data.c {
            args += "name = $\(optArg),"
            qryArgs.append(name)
            optArg += 1
        }
        
        if let users_id = data.n {
            if user_edit == false {
                return ErrorDefault
            }
            args += "users_id = $\(optArg),"
            qryArgs.append(users_id)
            optArg += 1
        }
        
        if let groups_id = data.o {
            if user_edit == false {
                return ErrorDefault
            }
            args += "groups_id = $\(optArg),"
            qryArgs.append(groups_id)
            optArg += 1
        }
        
        if(args != "") {
            update = "UPDATE runs r SET \(args.dropLast()) FROM has WHERE r.id = $2 AND has.perm RETURNING r.id"
        }
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, runs r
                                    WHERE g.users_id = $1 
                                        AND r.id = $2
                                        AND r.groups_id = g.groups_id 
                        ),
                        has AS (
                            SELECT ($3::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0) AS perm 
                                FROM runs r, perm p WHERE r.id = $2
                        ),
                        upd AS (
                            \(update)
                        )
                        SELECT * FROM upd;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = qryArgs
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

struct RunAddParam : FastCodable {
    let n : String
    let d : String
    let g : Int?
}

func run_add() -> ErrorResult {
    if let uinfo = user_getInfo(),
       uinfo.perm.has(.RUN_ADD) != false,
       let data = RunAddParam.from(json:Post.ext_data.value) {
       
        _ = <!SQLQry.begin()
        
        let qry = SQLQry("INSERT INTO runs(name, description, groups_id, users_id) VALUES ($1, $2, $3, $4) RETURNING id;")
        qry.values = [data.n, data.d, data.g ?? Optional<Int>.none as Any, uinfo.id]
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            let id = qry.getAsInt32(0, 0) ?? -1 
            if let _ = err <! Dir.run_binary.mkpath("\(id)", [.U0700, .G0050, .O0001]) {
                 _ = <!SQLQry.end()
                print(#"{"r":0, "d": \#(id)}"#)
                return ErrorNone
            } else {
                _ = <!SQLQry.rollback()
                if(err.hasError) {
                    return ErrorResult(err.errValue)
                }
            }
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func run_remove() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m 
                                    WHERE g.users_id = $1 
                                        AND m.id = $2
                                        AND m.groups_id = g.groups_id 
                                           
                        )
                        DELETE FROM runs m USING perm p WHERE id = $2 AND 
                            ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0) RETURNING m.id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    _ = Dir.run_binary.remove("\(data.id)")
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func run_get_uses() -> ErrorResult {
    let perm = user_getPerm()
    if perm.has(.USER_EDIT) != false,
       let info = UsesParam.from(json:Post.ext_data.value) {
        return uses_get(info, "runs") 
    }
    return ErrorDefault
}

func printRunInstance(_ id : Int32, _ mid : Int32, _ name : String) {
   print(#"{"id":\#(id),"mid":\#(mid),"n":"\#(name)"},"#)
}

func run_list_instances() -> ErrorResult {
    if let user = user_getInfo(),
       let info = ModuleParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 1:
                    fallthrough
                default:
                    orderQry += "i.name::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page, info.id ?? Optional<Int>.none as Any]
        var filterQry = "($3::integer IS NULL OR i.runs_id = $3) "
        var optArg = 4
        
        if let f1 = info.f1 {
            filterQry += "AND i.name LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        
        if(!admin) {
            filterQry += "AND runs_id IN(SELECT r.id FROM runs r, users_groups g WHERE (g.users_id = $\(optArg) AND g.groups_id = r.groups_id) OR r.users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT i.id, m.modules_id, i.name, 
                                row_number() OVER (\(orderQry)) AS nr FROM run_instances i, module_instances m
                            WHERE \(filterQry) AND i.module_instances_id = m.id
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0) {
                        let mid = qry.getAsInt32(i, 1) ?? -1 
                        let name = qry.getAsText(i, 2) ?? ""
                        printRunInstance(id, mid, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

func run_add_instance() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let run_id = data.n,
       let module_inst_id = data.m,
       let name = data.a {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, runs r
                                    WHERE g.users_id = $1 
                                        AND r.id = $2
                                        AND r.groups_id = g.groups_id 
                                           
                        ),
                        sel AS (
                            SELECT r.id FROM runs r, perm p WHERE r.id = $2 AND
                                ($4::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0)
                        ),
                        ins AS (
                        INSERT INTO run_instances(runs_id, module_instances_id, name, visible) SELECT id, $3, $5, $6
                            FROM sel 
                                WHERE sel.id IS NOT NULL RETURNING run_instances.id, run_instances.module_instances_id) 
                        SELECT ins.id, modules_id FROM module_instances, ins WHERE ins.module_instances_id = module_instances.id;
                     """
                     
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, run_id, module_inst_id, admin, name, (data.o ?? 0) == 1]
            
            var err = AsyncError()
            if (err <! qry.exec()) != false {
                if let id = qry.getAsInt32(0, 0),
                   let mid = qry.getAsInt32(0, 1){
                    print(#"{"r":0,"d": \#(id),"m": \#(mid)}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func run_update_instance() -> ErrorResult {
   if let uinfo = user_getInfo(),
       let data = UpdateParam.from(json:Post.ext_data.value),
       let run_instance_id = data.m {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        let empty = "SELECT"
        var update = empty
        var args = ""
    
        var qryArgs : [Any] = [uinfo.id, run_instance_id, admin]
        var optArg = 4

        if let options = data.b {
            args += "options = $\(optArg),"
            qryArgs.append(options)
            optArg += 1
        }

        if let name = data.a {
            args += "name = $\(optArg),"
            qryArgs.append(name)
            optArg += 1
        }
        
        if let visible = data.n {
            args += "visible = $\(optArg),"
            qryArgs.append(visible)
            optArg += 1
        }
        
        if(args != "") {
            update = "UPDATE run_instances r SET \(args.dropLast()) FROM has WHERE r.id = $2 AND has.perm RETURNING r.runs_id"
        }
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, runs r, run_instances i
                                    WHERE g.users_id = $1 
                                        AND i.id = $2
                                        AND r.id = i.runs_id
                                        AND r.groups_id = g.groups_id 
                        ),
                        has AS (
                            SELECT ($3::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0) AS perm 
                                FROM runs r, perm p, run_instances i WHERE  i.id = $2 AND r.id = i.runs_id
                        ),
                        upd AS (
                            \(update)
                        )
                        SELECT * FROM upd;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = qryArgs
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    if data.b != nil {
                        let run_id = qry.getAsInt32(0, 0) ?? -1;
                        _ = _run_update_options(uid:uinfo.id, perm:uinfo.perm, data:IdParam(id:Int(run_id)))
                    }
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func run_instance_get_settings() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH instance AS (
                            SELECT i.options, users_id, groups_id FROM runs r, run_instances i WHERE i.id = $2 AND r.id = i.runs_id
                        ),
                        perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, instance i
                                    WHERE g.users_id = $1 
                                        AND i.groups_id = g.groups_id 
                        )
                        SELECT options #>> '{}' FROM instance i, perm p WHERE
                                ($3::Boolean IS TRUE OR i.users_id = $1 OR p.perm IS NOT NULL);
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                let options = qry.getAsText(0, 0) ?? "{}"
                    print(#"{"r":0,"d":\#(options)}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

func run_remove_instance() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, runs r, run_instances i
                                    WHERE g.users_id = $1 
                                        AND i.id = $2
                                        AND i.runs_id = r.id
                                        AND r.groups_id = g.groups_id 
                                           
                        ),
                        sel AS (
                            SELECT r.id FROM runs r, run_instances i, perm p WHERE i.id = $2 AND r.id = i.runs_id AND
                                ($3::Boolean IS TRUE OR r.users_id = $1 OR (p.perm & \(GroupPermissions.RUN_EDIT.rawValue)) != 0)
                        )
                        DELETE FROM run_instances i USING sel WHERE i.id = $2 AND runs_id = sel.id RETURNING i.runs_id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    let run_id = qry.getAsInt32(0, 0) ?? -1;
                    _ = _run_update_options(uid:uinfo.id, perm:uinfo.perm, data:IdParam(id:Int(run_id)))
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 settings handling               */
/* ----------------------------------------------- */

func setting_get() -> ErrorResult {
    let qry = SQLQry("SELECT data #>> '{}' FROM global_settings;")
    
    if <!qry.exec() != false,
       let data = qry.getAsText(0, 0) {
        print(#"{"r":0,"d":\#(data)}"#)
        return ErrorNone
    }
    return ErrorDefault
}

func setting_update() -> ErrorResult {
    let qry = SQLQry("UPDATE global_settings SET data = $1;")
    
    qry.values = [Post.ext_data.value];
    if let user = user_getInfo(),
       user.perm.has(.SETTING_EDIT),
       <!qry.exec() != false,
       let data = qry.getAsText(0, 0) {
        print(#"{"r":0,"d":\#(data)}"#)
        return ErrorNone
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 repo handling                   */
/* ----------------------------------------------- */

struct RepoParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
}

func printRepo(_ id : Int32, _ name : String) {
   print(#"{"id":\#(id),"n":"\#(name)"},"#)
}

func repo_list() -> ErrorResult {
    if let user = user_getInfo(),
       let info = RepoParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        var orderQry = ""
        if let order = info.o {
            orderQry = "ORDER BY "
            switch(order >> 1) {
                case 2:
                    orderQry += "r.description::bytea "
                case 1:
                    fallthrough
                default:
                    orderQry += "r.url::bytea "
            }
            
            orderQry += (order & 1) == 1 ? "DESC " : "ASC "
        }
        
        var qryArgs : [Any] = [page_offset, items_per_page]
        var filterQry = "TRUE "
        var optArg = 3
        
        if let f1 = info.f1 {
            filterQry += "AND r.url LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f1)
        }
        if let f2 = info.f2 {
            filterQry += "AND r.description LIKE '%' || $\(optArg) || '%' "
            optArg += 1
            qryArgs.append(f2)
        }
        
        if(!admin) {
            filterQry += "AND (groups_id IN(SELECT groups_id FROM users_groups WHERE users_id = $\(optArg)) OR users_id = $\(optArg))"
            qryArgs.append(user.id)
        }
        
         
        let qryStr = """
                        SELECT r.id, r.url, 
                                row_number() OVER (\(orderQry)) AS nr FROM repositories r
                            WHERE \(filterQry)
                            ORDER BY nr DESC
                            LIMIT $2::bigint OFFSET $1::bigint;
                     """
        
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            
            qry.values = qryArgs
            
            if <!qry.exec() == false {
                return ErrorDefault
            }
            
            var max = 0
            print(#"{"r":0,"d":["#)
            if(qry.numRows != 0) {
                max = qry.getAsInt(0, 2) ?? 0
                for i in 0..<qry.numRows {
                    if let id = qry.getAsInt32(i, 0),
                       let name = qry.getAsText(i, 1) {
                        printRepo(id, name)
                    }
                }
                _ = revert_print(1)
            }
            print(#"],"m":\#(max)}"#)
            
            return ErrorNone
        }
    }
    return ErrorDefault
}

struct RepoAddParam : FastCodable {
    let u : String
    let d : String
    let g : Int?
}

func repo_add(_ password : UnsafeTmpString) -> ErrorResult {
    if let uinfo = user_getInfo(),
       uinfo.perm.has(.REPO_ADD) != false,
       let data = RepoAddParam.from(json:Post.ext_data.value) {
        let qry = SQLQry("INSERT INTO repositories(url, key, description, groups_id, users_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;")
        qry.values = [data.u, password.is_nil ? Optional<UnsafeTmpString>.none as Any : password, data.d, data.g ?? Optional<Int>.none as Any, uinfo.id]
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            let id = qry.getAsInt32(0, 0) ?? -1 
            print(#"{"r":0,"d": \#(id)}"#)
            return ErrorNone
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func repo_update() -> ErrorResult {
    // TODO
    return ErrorDefault
}

func repo_remove() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        let qryStr = """
                        WITH perm AS (
                            SELECT bit_or(perm) AS perm FROM users_groups g, modules m 
                                    WHERE g.users_id = $1 
                                        AND m.id = $2
                                        AND m.groups_id = g.groups_id 
                                           
                        )
                        DELETE FROM repositories m USING perm p WHERE id = $2 AND 
                            ($3::Boolean IS TRUE OR m.users_id = $1 OR (p.perm & \(GroupPermissions.REPO_EDIT.rawValue)) != 0) RETURNING m.id;
                     """
             
        if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
            qry.values = [uinfo.id, data.id, admin]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 cross compiler handling         */
/* ----------------------------------------------- */


struct CrossParam : FastCodable {
    let i : Int?
    let p : Int?
    let o : Int?
    let f1 : String?
    let f2 : String?
    let f3 : Bool?
}

func printCross(_ prefix : String, _ triple : String) {
   print(#"{"p":"\#(prefix)","n":"\#(triple)"},"#)
}

func cross_list() -> ErrorResult {
    if let user = user_getInfo(),
       let info = CrossParam.from(json:Post.ext_data.value) {
        let items_per_page = info.i ?? 10
        let page_offset = info.p ?? 0
        let admin = user.perm.has(.ADMIN_ALL)
        
        if admin {
            
            var orderQry = ""
            if let order = info.o {
                orderQry = "ORDER BY "
                switch(order >> 1) {
                    case 2:
                        orderQry += "c.description::bytea "
                    case 1:
                        fallthrough
                    default:
                        orderQry += "c.triple::bytea "
                }
                
                orderQry += (order & 1) == 1 ? "DESC " : "ASC "
            }
            
            var qryArgs : [Any] = [page_offset, items_per_page]
            var filterQry = "TRUE "
            var optArg = 3
            
            if let f1 = info.f1 {
                filterQry += "AND c.triple LIKE '%' || $\(optArg) || '%' "
                optArg += 1
                qryArgs.append(f1)
            }
            if let f2 = info.f2 {
                filterQry += "AND c.description LIKE '%' || $\(optArg) || '%' "
                optArg += 1
                qryArgs.append(f2)
            }
            
             
            let qryStr = """
                            SELECT c.compiler_prefix, c.triple, 
                                    row_number() OVER (\(orderQry)) AS nr FROM cross_compilers c
                                WHERE \(filterQry)
                                ORDER BY nr DESC
                                LIMIT $2::bigint OFFSET $1::bigint;
                         """
            
            if let qry = try? SQLQry(dirty_and_dangerous:qryStr) {
                
                qry.values = qryArgs
                
                if <!qry.exec() == false {
                    return ErrorDefault
                }
                
                var max = 0
                print(#"{"r":0,"d":["#)
                if(qry.numRows != 0) {
                    max = qry.getAsInt(0, 2) ?? 0
                    for i in 0..<qry.numRows {
                        if let prefix = qry.getAsText(i, 0),
                           let name = qry.getAsText(i, 1) {
                            printCross(prefix, name)
                        }
                    }
                    _ = revert_print(1)
                }
                print(#"],"m":\#(max)}"#)
                
                return ErrorNone
            }
        }
    }
    return ErrorDefault
}

struct CrossAddParam : FastCodable {
    let p : String
    let t : String
    let d : String
}

func cross_add(_ password : UnsafeTmpString) -> ErrorResult {
    if let uinfo = user_getInfo(),
       uinfo.perm.has(.ADMIN_ALL) != false,
       let data = CrossAddParam.from(json:Post.ext_data.value) {
        let qry = SQLQry("INSERT INTO cross_compilers(compiler_prefix, triple, description) VALUES ($1, $2, $3) RETURNING id;")
        qry.values = [data.p, data.t, data.d]
        var err = AsyncError()
        if (err <! qry.exec()) != false {
            print(#"{"r":0}"#)
            return ErrorNone
        } else {
            return ErrorResult(err.asSQL.rawValue)
        }
    }
    return ErrorDefault
}

func cross_update() -> ErrorResult {
    // TODO
    return ErrorDefault
}

func cross_remove() -> ErrorResult {
    if let uinfo = user_getInfo(),
       let data = IdParam.from(json:Post.ext_data.value) {
        let admin = uinfo.perm.has(.ADMIN_ALL)
        
        if admin {
            let qry = SQLQry("DELETE FROM cross_compilers WHERE id = $2")
        
            qry.values = [data.id]
            
            var err = AsyncError()
            if(err <! qry.exec()) != false {
                if qry.numRows != 0 {
                    print(#"{"r":0}"#)
                    return ErrorNone
                }
            } else {
                return ErrorResult(err.asSQL.rawValue)
            }
        }
    }
    return ErrorDefault
}

/* ----------------------------------------------- */
/*                 disassembly handling            */
/* ----------------------------------------------- */

/* ----------------------------------------------- */
/*                        main                     */
/* ----------------------------------------------- */

func main() {
	var res = ErrorDefault
    if(Page.schema == .HTTPS && Page.requestMethod == .POST) {
        if let param = PostParam.from(json:Post.data.value) {
            let sensitive = Page.userData as? UnsafeTmpString ?? UnsafeTmpString()
            if(user_login_check(param.cmd)) {
                switch(param.cmd) {
                    case .USER_REGISTER:
                        if sensitive.is_nil == false {
                            res = user_register(sensitive)
                        }
                    case .USER_LOGIN:
                        if sensitive.is_nil == false {
                            res = user_login((Int(Post.ext_data.value) ?? 0) == 1, sensitive)
                        }
                    case .USER_LOGOUT:
                        res = user_logout()
                    case .USER_LIST:
                        res = user_list()
                    case .USER_REMOVE:
                        res = user_remove()
                    case .USER_PASSWORD_RESET:
                        res = user_login_reset()
                    case .USER_PASSWORD_RECOVER:
                        if sensitive.is_nil == false {
                            res = user_login_recover(sensitive)
                        }
                    case .USER_LOGIN_CHECK:
                        res = user_check()
                    case .USER_ADD:
                        res = user_add()
                    case .USER_INVITE:
                        res = user_invite()
                    case .USER_ADD_TO_GROUP:
                        res = user_add_to_group()
                    case .USER_REMOVE_FROM_GROUP:
                        res = user_remove_from_group()
                    case .USER_GROUP_GET:
                        res = user_get_group_setting()
                    case .USER_GROUP_UPDATE:
                        res = user_update_group()
                    case .USER_GROUP_LIST:
                        res = user_list_group()
                    case .USER_GROUP_ADD:
                        res = user_add_group()
                    case .USER_GROUP_REMOVE:
                        res = user_remove_group()
                    case .USER_GET:
                        res = user_get()
                    case .USER_UPDATE:
                        res = user_update(sensitive)
                        
                    case .PROBE_LIST:
                        res = probe_list()
                    case .PROBE_ADD:
                        if sensitive.is_nil == false {
                            res = probe_add(sensitive)
                        }
                    case .PROBE_GET:
                        res = probe_get()
                    case .PROBE_UPDATE:
                        res = probe_update(sensitive)
                    case .PROBE_REMOVE:
                        res = probe_remove()
                    case .PROBE_USES_GET:
                        res = probe_get_uses()
                    case .PROBE_SETTING_LIST:
                        res = probe_list_settings()
                    case .PROBE_SETTING_ADD:
                        res = probe_add_setting()
                    case .PROBE_SETTING_REMOVE:
                        res = probe_remove_setting()
                        
                    case .MODULE_LIST:
                        res = module_list()
                    case .MODULE_GET:
                        res = module_get()
                    case .MODULE_USES_GET:
                        res = module_get_uses()
                    case .MODULE_ADD:
                        res = module_add()
                    case .MODULE_UPDATE:
                        res = module_update()
                    case .MODULE_REMOVE:
                        res = module_remove()
                    case .MODULE_DOWLOAD:
                        res = module_download()
                    case .MODULE_INSTALL:
                        res = module_install()
                    case .MODULE_SHARE:
                        res = module_share()
                    case .MODULE_PACK:
                        res = module_pack()
                    case .MODULE_CODE_LOAD:
                        res = module_load_code()
                    case .MODULE_INSTANCE_LIST:
                        res = module_list_instances()
                    case .MODULE_INSTANCE_ADD:
                        res = module_add_instance()
                    case .MODULE_INSTANCE_REMOVE:
                        res = module_remove_instance()
                    case .MODULE_INSTANCE_SETTING_GET:
                        res = module_instance_get_settings()
                        
                    case .RUN_LIST:
                        res = run_list() 
                    case .RUN_GET:
                        res = run_get() 
                    case .RUN_ADD:
                        res = run_add() 
                    case .RUN_UPDATE:
                        res = run_update() 
                    case .RUN_UPDATE_OPTIONS:
                        res = run_update_options() 
                    case .RUN_REMOVE:
                        res = run_remove() 
                    case .RUN_USES_GET:
                        res = run_get_uses()
                    case .RUN_INSTANCE_LIST:
                        res = run_list_instances()
                    case .RUN_INSTANCE_ADD:
                        res = run_add_instance()
                    case .RUN_INSTANCE_REMOVE:
                        res = run_remove_instance()
                    case .RUN_INSTANCE_UPDATE:
                        res = run_update_instance()
                    case .RUN_INSTANCE_SETTING_GET:
                        res = run_instance_get_settings()
    
                    case .SETTING_GET:
                        res = setting_get() 
                    case .SETTING_UPDATE:
                        res = setting_update() 
    
                    case .REPO_LIST:
                        res = repo_list() 
                    case .REPO_ADD:
                        res = repo_add(sensitive) 
                    case .REPO_UPDATE:
                        res = repo_update() 
                    case .REPO_REMOVE:
                        res = repo_remove()
    
                    case .CROSS_LIST:
                        res = cross_list() 
                    case .CROSS_ADD:
                        res = cross_add(sensitive) 
                    case .CROSS_UPDATE:
                        res = cross_update() 
                    case .CROSS_REMOVE:
                        res = cross_remove()
                }
                if(res == ErrorNone) {
                    return
                }
            } else {
                print(#"{"r":1,"l":1}"#)
                return
            }
        }
    } else {
    }
    print(#"{"r":\#(res)}"#)
}