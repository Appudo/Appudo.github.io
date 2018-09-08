 
import libappudo
import libappudo_run
import libappudo_env
import Foundation

extension HTTPRequestStatus : Error {
    
}

enum AuthType : Int {
    case Unknown
    case Basic
    case Digest
}

enum DavHeader : Int {
    case Accept              = 0
    case Authorization       = 1
    case ContentLength       = 2
    case Depth               = 3
    case Destination         = 4
    case Host                = 5
    case If                  = 6
    case IfMatch             = 7
    case IfModifiedSince     = 8
    case IfNoneMatch         = 9
    case IfRange             = 10
    case IfUnmodifiedSince   = 11
    case LockToken           = 12
    case Overwrite           = 13
    case Source              = 14
    case Timeout             = 15
}

enum DavDepth : Int {
    case zero        
    case one 
    case one_noroot
    case infinity
    case infinity_noroot
    
    static func get(_ hdr : UnsafeTmpString?) -> DavDepth {
        var idx = 0
        if let _ = HTTPValueParser(hdr).string(&idx, "0", "1", "1,noroot", "infinity", "infinity,noroot") {
            return DavDepth(rawValue:idx) ?? .infinity
        }
        return .infinity
    }
    
    var next : DavDepth {
        switch(self) {
            case .one_noroot:
                fallthrough
            case .zero:
                fallthrough
            case .one:
                return .zero
            case .infinity:
                fallthrough
            case .infinity_noroot:
                return .infinity
        }
    }
}

struct DavLiveProps : OptionSet {
    let rawValue: Int

    static let EMPTY            = DavLiveProps(rawValue: 0)
    static let resourcetype     = DavLiveProps(rawValue: 1 << 0)
    static let getcontentlength = DavLiveProps(rawValue: 1 << 1)
    static let getlastmodified  = DavLiveProps(rawValue: 1 << 2)
    static let creationdate     = DavLiveProps(rawValue: 1 << 3)
    static let getetag          = DavLiveProps(rawValue: 1 << 4)
    static let getcontenttype   = DavLiveProps(rawValue: 1 << 5)
    static let displayname      = DavLiveProps(rawValue: 1 << 6)
    static let executable       = DavLiveProps(rawValue: 1 << 7)
    static let source           = DavLiveProps(rawValue: 1 << 8)
    static let supportedlock    = DavLiveProps(rawValue: 1 << 9)
    static let lockdiscovery    = DavLiveProps(rawValue: 1 << 10)
    static let getcontentlanguage    = DavLiveProps(rawValue: 1 << 11)
    
    static let ALL              = DavLiveProps(rawValue: (1 << 11) - 1)
    
    var label : String {
        switch(self) {
            case .EMPTY: return "EMPTY"
            case .resourcetype: return "resourcetype"
            case .getcontentlength: return "getcontentlength"
            case .getlastmodified: return "getlastmodified"
            case .creationdate: return "creationdate"
            case .getetag: return "getetag"
            case .getcontenttype: return "getcontenttype"
            case .displayname: return "displayname"
            case .executable: return "executable"
            case .source: return "source"
            case .supportedlock: return "supportedlock"
            case .lockdiscovery: return "lockdiscovery"
            case .getcontentlanguage: return "getcontentlanguage"
            default: return ""
        }
    } 
    
    mutating func pop() -> DavLiveProps? {
        let v = ffsl(rawValue)
        if v != 0 {
            let r = DavLiveProps(rawValue:1 << (v - Int32(1)))
            remove(r)
            return r
        }
        
        return nil
    }
}

struct TheDavHeaders {
    var _data : ContiguousArray<UnsafeTmpString?>
    init(_ data : ContiguousArray<UnsafeTmpString?>) {
        _data = data
    }
    
    func get(_ hdr : DavHeader) -> UnsafeTmpString? {
        return _data[hdr.rawValue]
    }
}

func onStart() {
    switch Setting.auth.value {
        case "digest":
            _authType = .Digest
        case "basic":
            _authType = .Basic
        default:
            _authType = .Unknown
    }
}


var _authType : AuthType = .Unknown
var _authNonceStore : TimedArray? = nil
var _authBasicStore : TimedArray? = nil
var _authTick : UInt32 = UInt32(truncatingIfNeeded:<!Rand.int32() ?? 0)

func auth_nonceStore() -> TimedArray? {
    if let arr = _authNonceStore {
        return arr
    }
    do {
        _authNonceStore = try TimedArray(1000 * 60 * 5)
        return _authNonceStore
    } catch {
        return nil
    }
}

func auth_basicStore() -> TimedArray? {
    if let arr = _authBasicStore {
        return arr
    }
    do {
        _authBasicStore = try TimedArray(1000 * 60 * 5)
        return _authBasicStore
    } catch {
        return nil
    }
}

func auth_basic_check(_ name : String, _ password : String) -> Bool {
    let qry = SQLQry("SELECT name FROM users WHERE name = $1 AND temp_password = $2")
    qry.values = [name, password]
    if <!qry.exec() != false && qry.numRows != 0 {
        return true
    }
    return false
}

func auth_create_h1(user : String, realm: String, password : String, flags : CHASH.DigestFlags = .MD5) -> Bool {
    if let h = CHASH.begin(flags:flags),
       <!h.update("\(user):\(realm):\(password)") != false {
        return true
    }
    return false
}

func auth_create_h1_sess(h1 : String, nonce : String, cnonce : String) -> String {
    return "\(h1):\(nonce):\(cnonce)"
}

func auth_create_h2(method : String, uri : String, flags : CHASH.DigestFlags = .MD5) -> Bool {
    if let h = CHASH.begin(flags:flags),
       <!h.update("\(method):\(uri)") != false {
        return true
    }
    return false
} 

func auth_create_h2_auth_init(method : String, uri : String, entity_body_hash : String, flags : CHASH.DigestFlags = .MD5) -> Bool {
    if let h = CHASH.begin(flags:flags),
       <!h.update("\(method):\(uri):\(entity_body_hash)") != false {
        return true
    }
    return false
}

func auth_create_response(h1 : String, h2 : String, nonce : String, nc : String, cnonce : String, qop : String, flags : CHASH.DigestFlags = .MD5) -> Bool {
    if let h = CHASH.begin(flags:flags),
       <!h.update("\(h1):\(nonce):\(nc):\(cnonce):\(qop):\(h2)") != false{
        return true
    }
    return false
}

/*
 * TODO
 * create a db storage for the realm+user H1 passwordword hash
 *     auto generate keys that are valid for 10 minutes
 *     1. send mail to user with a link to get the new key
 *     2. send mail to user when key is requested for the first time
 *     3. user can invalidate key
 *     4. add page that shows the key
 * fetch and store h1 string with the nonce store
 * store nc with the nonce store
 * calculate H2 and check value from client => valid or not
 * check against nonce store
 */

func auth_nonce_create(_ res : inout String) -> Int32? {
    let inBuffer = ManagedCharBuffer.create(64)
    let outBuffer = ManagedCharBuffer.create(64)
    _authTick = _authTick &+ 1
    let n = _authTick
    let t = Timer.tick1s
    if let b = <!Rand.int64(),
       let c = <!Rand.int64(),
       let arr = auth_nonceStore() {
        /*
         * 3 * 8 byte
         * 4 byte | 4 byte | 4 byte | 4 byte | 8 byte  |
         * time   | tick   | nc     |  rand  | rand    |
         */
        let a = Int(bitPattern:(UInt(n) << 32) + (UInt(bitPattern:t) & 0xFFFFFFFF))
        let idx = arr.Insert(a, b, c)
        if idx != 0,
           let _ = inBuffer.fill(a, b, c), 
           let s = <!Base64.encode(inBuffer, outBuffer, inSizeLimit:24), 
           let r = outBuffer.toString(s) {
            res = r
            return idx
        }
    }
    return nil
}
 
func auth_check(_ path : String, _ authorization : UnsafeTmpString?) -> Bool {
    let theRealm = Setting.realm.value
    if(Page.schema != .HTTPS) {
        Page.resultStatus = .S_401
        return false
    }
    switch(_authType) {
        case .Digest:
            if let  parser = HTTPValueParser(authorization).string("Digest")?.set(keys:"username", "realm", "nonce", "uri", "response", "opaque", "qop", "nc", "cnonce") {
                var idx = 0
                var v : UnsafeTmpString? = nil
                var name : UnsafeTmpString? = nil
                var realm : UnsafeTmpString? = nil
                var nonce : UnsafeTmpString? = nil
                var uri : UnsafeTmpString? = nil
                var response : UnsafeTmpString? = nil
                var opaque : UnsafeTmpString? = nil
                var qop : UnsafeTmpString? = nil
                var nc : UnsafeTmpString? = nil
                var cnonce : UnsafeTmpString? = nil
                while parser.value(&idx, &v, stripQuote:true) != nil {
                    switch(idx) {
                        case 0:
                            name = v
                        case 1:
                            realm = v
                        case 2:
                            nonce = v
                        case 3:
                            uri = v
                        case 4:
                            response = v
                        case 5:
                            opaque = v
                        case 6:
                            qop = v
                        case 7:
                            nc = v
                        case 8:
                            cnonce = v
                        default:
                            return false
                    }
                    //print(idx, v, "<br>")
                    _ = parser.comma()
                }
                // check auth
                return true
            }
            var theNonce = ""
            
            if let idx = auth_nonce_create(&theNonce) {
                let opaque = Hex.encode(UInt32(bitPattern:idx), upper:true)
                // need a user, pass db
                // use hmac for calculations
                // need to store a session => use timed array 
                // use array index as opaque but validate against nonce
                // if stall, get value from db 24 bytec
                Page.resultStatus = .S_401
            }
            // need digest auth + cookie if supported
        case .Basic:
            var v : UnsafeTmpString? = nil
            if let _ = HTTPValueParser(authorization).string("Basic")?.string(&v) {
               let outBuffer = ManagedCharBuffer.create(v!.count)
               if let n = <!Base64.decode(v!, outBuffer),
                  let p = outBuffer.find(char:UInt8(ascii:":")),
                   let name = outBuffer.toString(p),
                   let pwd = outBuffer.toString(n-p-1, offset:p+1),
                   auth_basic_check(name, pwd) != false {
                    return true
                }
            }
            _ = Page.addResultHeader("WWW-Authenticate: Basic realm=\"\(theRealm)\", charset=\"UTF-8\"\r\n")
            Page.resultStatus = .S_401
        default:
            Page.error = .NotFound
    }
    return false
}


// test prop store

struct DeadPropKey : Hashable {
    let ns : String
    let key : String
}

struct LockInfo {
    let token : String
    let owner : String
    let write : Bool
    let exclusive : Bool
    let full : Bool
}


var _dead_props : [String:[DeadPropKey:String]] = [:]
var _locks : [String:[LockInfo]] = [:]

func prop_dead_get(_ path : String, _ ns : String, _ key : String) -> String? {
    return _dead_props[path]?[DeadPropKey(ns:ns,key:key)]
}

func prop_dead_set(_ path : String, _ ns : String, _ key : String, _ value : String) -> Bool {
    if var v = _dead_props[path] {
        v[DeadPropKey(ns:ns,key:key)] = value
        _dead_props[path] = v
    } else {
        var v = [DeadPropKey:String]()
        v[DeadPropKey(ns:ns,key:key)] = value
        _dead_props[path] = v
    }
/*
    var err = AsyncError()
    //let qry = SQLQry("SELECT * FROM files;")
    let qry = SQLQry(";")
    
    qry.values = [path, key, value]
    
    if (err <! qry.exec()) != false {
        return true
    }
    */
    return true
}

func prop_dead_unset(_ path : String, _ ns : String, _ key : String) -> Bool {
    if var v = _dead_props[path] {
        v[DeadPropKey(ns:ns,key:key)] = nil
        _dead_props[path] = v
    }
    return true
}

func prop_dead_remove(_ path : String) -> Bool {
    for (key, _) in _dead_props {
        if key.starts(with:path) {
            _dead_props[key] = nil
        }
    }
    return true
}

func prop_dead_move(_ patha : String, _ pathb : String) -> Bool {
    for (key, _) in _dead_props {
        if key.starts(with:patha) {
            _dead_props[pathb + key.suffix(key.utf8.count - patha.utf8.count)] = _dead_props[key]
            _dead_props[key] = nil
        }
    }
    return true
}

func prop_dead_copy(_ patha : String, _ pathb : String) -> Bool {
    for (key, _) in _dead_props {
        if key.starts(with:patha) {
            _dead_props[pathb + key.suffix(key.utf8.count - patha.utf8.count)] = _dead_props[key]
        }
    }
    return true
}

var _lockTick : UInt32 = UInt32(truncatingIfNeeded:<!Rand.int32() ?? 0)
// TODO need a lock timer store

func lock_new_token() -> String? { 
    let inBuffer = ManagedCharBuffer.create(72)
    let outBuffer = ManagedCharBuffer.create(72)
    let v = Int(bitPattern:UInt(_lockTick) << 32) | Int(UInt32(truncatingIfNeeded:Timer.tick1s))
    _lockTick += 1
    if let rand0 = <!Rand.int64(),
       let rand1 = <!Rand.int64(),
       let _ = inBuffer.fill(rand0, v, rand1),
       let s = <!Hex.encode(inBuffer, outBuffer, inSizeLimit:24), 
       let k = <!SHComp.encode(outBuffer, inBuffer, inSizeLimit:s), 
       let r = inBuffer.toString(k) {
           return "urn:utk:\(r)"
    }
    return nil   
}

func lock_get(_ path : String, _ token : String) -> LockInfo? {
    for (key, value) in _locks {
        if(path.starts(with:key)) {
            for lock in value {
                if(lock.full || path == key) {
                    if(lock.token == token) {
                        return lock
                    }
                }
            }
        }
    }
    return nil
}

func lock_set(_ path : String, _ owner : String, _ write : Bool, _ exclusive : Bool, _ full : Bool, onError: (_ target : String, _ lock : LockInfo) -> Void) -> String? {
    for (key, value) in _locks {
        if(path.starts(with:key)) {
            for lock in value {
                if(lock.full || path == key) {
                    if(lock.exclusive || exclusive) {
                        onError(key, lock)
                        return nil
                    }
                }
            }
        }
    }
    
    if let token = lock_new_token() {
        let newLock = LockInfo(token:token, owner:owner, write:write, exclusive:exclusive, full:full)
        if var l = _locks[path] {
            l.append(newLock)
            _locks[path] = l
        } else {
            var l = [LockInfo]()
            l.append(newLock)
            _locks[path] = l
        }
        return token
    } else {
        return nil
    }
}

func lock_remove(_ path : String) -> Bool {
    _locks[path] = nil
    return true
}

func lock_unset(_ path : String, _ token : String) -> HTTPRequestStatus {
    if let value = _locks[path] {
        let num = value.count
        let newValue = value.filter { $0.token != token }
        _locks[path] = newValue
        if newValue.count != num {
            return .S_204
        }
        return .S_403
    }
    return .S_409
}


func lock_has_lock(_ path : String, _ token : String) -> Bool {
    for (key, value) in _locks {
        if(path.starts(with:key)) {
            for lock in value {
                if(lock.full || path == key) {
                    if(lock.token == token) {
                        return true
                    }
                }
            }
        }
    }
    return false
}

func lock_get_locks(_ path : String, _ lockTokens : inout Set<String>, _ single : Bool) -> Bool {
    for (key, value) in _locks {
        if(path.starts(with:key)) {
            for lock in value {
                if(lock.full || path == key) {
                    if(single) {
                        return true
                    }
                    lockTokens.insert(lock.token)
                }
            }
        }
    }
    
    return false
}

func _lock_is_locked(_ path : String, _ lockTokens : inout Set<String>, _ If : UnsafeTmpString?) -> HTTPRequestStatus? {
    if If != nil && !lock_handle_if(path, If, &lockTokens) {
        return .S_412
    }
    if(lockTokens.isEmpty) {
        return nil
    }
    return .S_423
}

func lock_is_locked(_ path : String, _ If : UnsafeTmpString?) -> HTTPRequestStatus? {
    var lockTokens : Set<String> = []
    let hasLock = lock_get_locks(path, &lockTokens, If == nil)
    if(hasLock && If == nil) {
        return .S_423
    }
    return _lock_is_locked(path, &lockTokens, If)
}

func lock_is_locked(_ patha : String, _ pathb : String, _ If : UnsafeTmpString?) -> HTTPRequestStatus? {
    var lockTokens : Set<String> = []
    let hasLock = !(!lock_get_locks(patha, &lockTokens, If == nil) && !lock_get_locks(pathb, &lockTokens, If == nil))
    if(hasLock && If == nil) {
        return .S_423
    }
    return _lock_is_locked(patha, &lockTokens, If)
}

func lock_compare_etag(_ path : String, _ etag : String) -> Bool {
    if let f = <!Dir.base.open(path),
       let e = <!f.ETag,
       e == etag {
        return true
    }
    return false
}

func lock_handle_if(_ path : String, _ If : UnsafeTmpString?, _ lockTokens : inout Set<String>) -> Bool {
    let p = HTTPValueParser(If)
    var idx = 0
    var target = ""
    var res = false
    var eval = true // becomes false if at least one list evaluates to true
    while true {
        var v : UnsafeTmpString? = nil
        // tag
        if p.next(&idx, char:UInt8(ascii:"<"))?.until(char:UInt8(ascii:">"), &v) != nil {
            var t = v!
            if(t.starts(swith:"http://", remove:true) || t.starts(swith:"https://", remove:true)) {
                if(!t.starts(with:getBasePathNoSchema(), remove:true) &&
                   (t.find(char:UInt8(ascii:"@"), remove_until:true) == -1 || !t.starts(with:getBasePathNoSchema(), remove:true))) {
                    return false
                }
            }
            t.url_decode(path:true)
            target = t.description
        } else {
            target = path
        }
        
        while true { // lists
        
            if p.next(&idx, char:UInt8(ascii:"("), UInt8(ascii:"<"), peek:true)?.drop(idx == 0 ? 1 : 0) != nil {
                if(idx != 0) {
                    break
                } 
            } else {
                _ = p.space()
                return p.end && !eval
            }
            
            res = true
            
            while true {        // list items
                var v : UnsafeTmpString? = nil
                let not = p.next(sstr:"Not") != nil
                
                if let _ = p.next(&idx, char:UInt8(ascii:"<"), UInt8(ascii:"["))?
                            .until(char:idx == 0 ? UInt8(ascii:">") : UInt8(ascii:"]"), &v) {
                    
                    // single list item
                    // only evaluate if not already one list evaluated to true
                    if(idx == 0) {  // token
                        let token = v!.description
                        lockTokens.remove(token)
                        if(eval) {
                            // check token of target
                            res = res && (lock_has_lock(target, token) != not)
                        } else {
                            // bail out if lockTokens is empty => we have seen all lock tokens and one list evaluated to true
                            if(lockTokens.isEmpty) {
                                return true
                            }
                        }
                    } else {        // etag
                        // check etag of target
                        if(eval) {
                            res = res && (lock_compare_etag(target, v!.description) != not)
                        }
                    }
                    
                } else {
                    if p.next(sstr:")") != nil {
                        if(res) {
                            /*
                                Bail out if all list items evaluated to true and lockTokens is empty.
                                This will omnit the case when the If-Header is invalid afterwards but
                                we are liberal here.
                            */
                            if(lockTokens.isEmpty) {
                                return true
                            }
                            eval = false
                        }
                        break
                    } else {
                        return false
                    }
                }
                _ = p.reset()
            }
        }
        
    }
}

func OPTIONS_Handler() {
    _ = Page.addResultHeader("Allow: COPY, DELETE, GET, HEAD, LOCK, MKCOL, MOVE, OPTIONS, PROPFIND, PROPPATCH, PUT, UNLOCK\r\n")
    _ = Page.addResultHeader("DAV: 1, 2, 3\r\n")
}

func POST_Handler() { 
    Page.resultStatus = .S_405
}

func GET_Handler(_ path : String, _ modifiedSince : UnsafeTmpString?) {
    // TODO handle all If-* headers
    if var f = <!Dir.base.open(path, .O_RDONLY),
       let s = <!f.stat_open {
        if(s.isDir) {
            Page.resultStatus = .S_403
            print("This is a Dir")
        } else {
            let mod_time = s.time_latest;
            if let last_mod = modifiedSince, 
               let d = try? Date.fromString(String(describing:last_mod), format:String(describing:Date.format0)) {
                if(mod_time <= d) {
                    Page.resultStatus = .S_304
                    return
                }
            }
            <!Page.setMime()
            if let etag = <!f.ETag {
                _ = Page.addResultHeader("ETag: \(etag)\r\n")
            }
            //_ = Page.addResultHeader("Content-Length: \(s.size)\r\n")
            //_ = Page.addResultHeader("Last-Modified: \(mod_time.toString(format:String(describing:Date.format0)))\r\n")
            send(f)
        }
        return
    }
    Page.error = .NotFound
}

func HEAD_Handler(_ path : String, _ modifiedSince : UnsafeTmpString?) {
    if var f = <!Dir.base.open(path, .O_RDONLY),
       let s = <!f.stat_open {
       let mod_time = s.time_latest;
        if let last_mod = modifiedSince, 
           let d = try? Date.fromString(String(describing:last_mod), format:String(describing:Date.format0)) {
            if(mod_time <= d) {
                Page.resultStatus = .S_304
                return
            }
        }
        if(s.isDir) {
            _ = Page.addResultHeader("Content-Length: 13\r\n")
            Page.resultStatus = .S_403
        } else {
            <!Page.setMime()
            if let etag = <!f.ETag {
                _ = Page.addResultHeader("ETag: \(etag)\r\n")
            }
            _ = Page.addResultHeader("Content-Length: \(s.size)\r\n")
            _ = Page.addResultHeader("Last-Modified: \(mod_time.toString(format:String(describing:Date.format0)))\r\n")
        }
        return
    }
    Page.error = .NotFound
}

func PUT_Handler(_ path : String, _ If : UnsafeTmpString?) {
    var err = AsyncError()
    
    // TODO need to fail on unhandled Content-* headers
    if let e = lock_is_locked(path, If) {
        Page.resultStatus = e
        return
    }

    if let target = err <! Dir.base.open2(path, [.O_CREAT, .O_RDWR]) {
        let r : HTTPRequestStatus = target.created ? .S_201  : .S_204
        var tf = target.item
        if var body = Page.rawBody {
            if target.created || <!tf.truncate_open(0) != false,
               let _ = err <! body.send(tf, inOffset:0) {
                Page.resultStatus = r
                return
            }
        } else {
            Page.resultStatus = r
            return
        }
    }
    
    switch(err.asRAW) {
        case .NOENT:
            Page.resultStatus = .S_409
        case .NOMEM:
            fallthrough
        case .NOSPC:
            Page.resultStatus = .S_407
        default:
            Page.resultStatus = .S_403
    }
}

func MKCOL_Handler(_ path : String, _ If : UnsafeTmpString?) {
    var thePath = path
    var err = AsyncError()
    
    if Page.rawBody != nil {
        Page.resultStatus = .S_415
        return
    }
    
    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
        //flags.insert(.DIR_ROOT)
    }
    
    if let e = lock_is_locked(thePath, If) {
        Page.resultStatus = e
        return
    }
    
    if let _ = err <! Dir.base.mkpath(thePath, flags:.MKDIR, emptyPath:true) {
        Page.resultStatus = .S_201
        return
    }
    
    switch(err.asRAW) {
        case .EXIST:
            Page.resultStatus = .S_405
        case .NOENT:
            Page.resultStatus = .S_409
        case .NOMEM:
            fallthrough
        case .NOSPC:
            Page.resultStatus = .S_407
        default:
            Page.resultStatus = .S_403
    }
}

func MOVE_Handler(_ path : String, _ If : UnsafeTmpString?, _ Dest : UnsafeTmpString?, _ Overwrite : UnsafeTmpString?) { 
    let abs_base = getBasePath()
    var writer : XMLWriter? = nil
    var err = AsyncError()
    var flags : FileItem.RenameFlags = [.NONE ]
    var rstat = HTTPRequestStatus.S_404
    var thePath = path
    
    if let _ = HTTPValueParser(Overwrite).string("F") {
       flags = .NOREPLACE
    }
    
    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
        //flags.insert(.DIR_ROOT)
    }
    
    if var theDest = toRelDest(abs_base, Dest),
       var source = <!Dir.base.open(thePath) {

        if(theDest.suffix(1) == "/") {
            theDest = String(theDest.dropLast())
            //flags.insert(.DIR_ROOT)
        }
    
        if let e = lock_is_locked(thePath, theDest, If) {
            Page.resultStatus = e
            return
        }
    
        if let r = err <! source.rename2(theDest.description, Dir.base, flags:flags, 
                onError:{ (_ file : FileItem, _ offset : Int, _ err : AppudoError, _ source : Bool) in 
                    if(err == .NOENT) {
                        return
                    }
                    if(err == .EXIST) {
                        rstat = .S_412
                        return
                    }
                
                    if writer == nil {
                        writer = XMLWriter.new
                        
                        if let w = writer {
                            _ = w.startDoc()  
                            _ = w.startElem(sname:"D:multistatus")
                            _ = w.writeAttr(sname: "xmlns:D", scontent:"DAV:");
                            _ = w.startElem(sname:"D:response")
                        }
                    }
                    if let w = writer {
                        switch(err) {
                            default:
                                _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:file.path))
                                _ = w.writeElem(sname:"D:status", content:"\(err.description)")
                                break
                        }
                    }
                }
        ) {
            switch(r) {
                case .New:
                    Page.resultStatus = .S_201
                case .Exist:
                    Page.resultStatus = .S_204
            }
        
            // TODO exclude failed branches if any
            _ = prop_dead_move(thePath, theDest)
            return
        }
    }
    if let w = writer {
        Page.resultStatus = .S_207
        _ = Page.setMime("xml")
    
        _ = w.endElem()
        _ = w.endElem()
        _ = w.endDoc()
        if let res = w.data {
            send(res)
            return
        }
    }
    Page.resultStatus = rstat
}

func toRelDest(_ host : String, _ Dest : UnsafeTmpString?) -> String? {
    if var theDest = Dest {
        let c = theDest.common(with:host, remove : true)
        if c != 0 {
            var len = host.utf8.count
            if(c != len) {
                let d = theDest.find(char:UInt8(ascii:"@"), remove_until:true)
                len -= c
                if(d == -1 || theDest.common(with:String(host.dropFirst(c)), remove : true) != len) {
                    return nil
                }
            }
            theDest.url_decode(path:true)
            return theDest.description
        }
    }
    return nil
}

func COPY_Handler(_ path : String, _ If : UnsafeTmpString?, _ Dest : UnsafeTmpString?, _ Overwrite : UnsafeTmpString?, _ Depth : UnsafeTmpString?) {
    let abs_base = getBasePath()
    var writer : XMLWriter? = nil
    var err = AsyncError()
    var flags : FileItem.CopyFlags = [.NONE]
    let theDepth = DavDepth.get(Depth)
    var thePath = path
    var rstat = HTTPRequestStatus.S_409
    
    if(theDepth == .zero) {
       flags.insert(.NORECURSIVE)
    }
    
    if let _ = HTTPValueParser(Overwrite).string("F") {
       flags.insert(.NOREPLACE)
    }
    
    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
        //flags.insert(.DIR_ROOT)
    }
    
    if var theDest = toRelDest(abs_base, Dest),
       let source = <!Dir.base.open(thePath) {
    
        if(theDest.suffix(1) == "/") {
            theDest = String(theDest.dropLast())
            //flags.insert(.DIR_ROOT)
        }
        
        if let e = lock_is_locked(theDest, If) {
            Page.resultStatus = e
            return
        }
       
        if let r = err <! source.copy2(theDest, Dir.base, flags:flags, 
            onError:{ (_ file : FileItem, _ offset : Int, _ err : AppudoError, _ source : Bool) in 
                if(err == .NOENT) {
                    return
                }
                
                if(err == .EXIST) {
                    rstat = .S_412
                    return
                }
            
                if writer == nil {
                    writer = XMLWriter.new
                    
                    if let w = writer {
                        _ = w.startDoc()  
                        _ = w.startElem(sname:"D:multistatus")
                        _ = w.writeAttr(sname: "xmlns:D", scontent:"DAV:");
                        _ = w.startElem(sname:"D:response")
                    }
                }
                if let w = writer {
                    switch(err) {
                        default:
                            _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:file.path))
                            _ = w.writeElem(sname:"D:status", content:"")
                            break
                    }
                }
            }
        ) {
            switch(r) {
                case .New:
                    Page.resultStatus = .S_201
                case .Exist:
                    Page.resultStatus = .S_204
                    
                // TODO exclude failed branches if any
                _ = prop_dead_move(thePath, theDest)
            }
            return
        }
    }
    if let w = writer {
        Page.resultStatus = .S_207
        _ = Page.setMime("xml")
    
        _ = w.endElem()
        _ = w.endElem()
        _ = w.endDoc()
        if let res = w.data {
            send(res)
            return
        }
    }
    Page.resultStatus = rstat
}

func DELETE_Handler(_ path : String, _ If : UnsafeTmpString?) {
    let abs_base = getBasePath()
    var writer : XMLWriter? = nil
    var err = AsyncError()
    var flags : FileItem.RemoveFlags = [.NONE, .ENOENT_ROOT]
    var thePath = path
    
    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
        flags.insert(.DIR_ROOT)
    }
    
    if let e = lock_is_locked(thePath, If) {
        Page.resultStatus = e
        return
    }
    
    if(err <! Dir.base.remove(thePath, flags:flags, 
        onError:{ (_ file : FileItem, _ offset : Int, _ err : AppudoError, _ source : Bool) in 
            if(err == .NOENT) {
                return
            }
        
            if writer == nil {
                writer = XMLWriter.new
                
                if let w = writer {
                    _ = w.startDoc()  
                    _ = w.startElem(sname:"D:multistatus")
                    _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
                    _ = w.startElem(sname:"D:response")
                }
            }
            if let w = writer {
                switch(err) {
                    default:
                        _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:file.path))
                        _ = w.writeElem(sname:"D:status", content:"")
                        break
                }
            }
        }
    )) != false {
        _ = prop_dead_remove(thePath)
        _ = lock_remove(thePath)
        Page.resultStatus = .S_204
        return
    }
    if let w = writer {
        Page.resultStatus = .S_207
        _ = Page.setMime("xml")
    
        _ = w.endElem()
        _ = w.endElem()
        _ = w.endDoc()
        if let res = w.data {
            send(res)
        }
    }
    Page.resultStatus = .S_404
}

func writeActiveLock(_ w : XMLWriter, _ exclusive : Bool, _ timeout : Int32, _ depth : DavDepth, _ owner : String, _ token : String, _ abs_path : String) -> Void {
    
    _ = w.startElem(sname:"D:activelock")

    _ = w.startElem(sname:"D:locktype") 
    _ = w.writeElem(sname:"D:write", scontent:"")
    _ = w.endElem() // end locktype
    _ = w.startElem(sname:"D:lockscope") 
    _ = w.writeElem(sname: exclusive ? "D:exclusive" : "D:shared", scontent:"")
    _ = w.endElem() // end lockscope
    _ = w.writeElem(sname:"D:depth", scontent:depth == .infinity ? "infinity" : "0")
    _ = w.writeElem(sname:"D:owner", content:owner)
    _ = w.writeElem(sname:"D:timeout", content:"Second-\(timeout)")
    _ = w.startElem(sname:"D:locktoken") 
    _ = w.writeElem(sname:"D:href", content:token)
    _ = w.endElem() // end locktoken
    _ = w.startElem(sname:"D:lockroot") 
    _ = w.writeElem(sname:"D:href", content:abs_path)
    _ = w.endElem() // end lockroot
                                
    _ = w.endElem() // end activelock
}

func LOCK_Handler(_ path : String, _ If : UnsafeTmpString?, _ Timeout : UnsafeTmpString?, _ Depth : UnsafeTmpString?) { 
    let abs_base = getBasePath()
    var thePath = path
    let theDepth = DavDepth.get(Depth)
    var lockScope = 0
    var lockType = 0
    var lockOwner = ""
    var created = false
    var theTimeout = Int32(3600 * 5)
    
    if(Timeout != nil) {
        
    }

    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
    }
    
    do {
    
        if let w = XMLWriter.new {
            if var body = Page.rawBody {
                  if let _ = <!body.seek(0, .SEEK_SET),
                     let xml = XMLDoc.from(file:body),
                     xml.hasError == false,
                     let root = xml.root,
                     root.name.match(str:"lockinfo") != false {
                       
                        var nshref = xml.empty_str
                       
                        if let ns = root.ns,
                           ns.href.match(str:"DAV:") != false {
                            nshref = ns.href;
                        } else {
                            throw HTTPRequestStatus.S_400
                        }
                       
                        var n = root.childElem
                        
                        while(n != nil) {
                            let type = n!.name.match("lockscope", "locktype", "owner") ?? -1
                            if let ns = n!.ns,
                               ns.href == nshref,
                               type != -1 {
                            } else {
                                throw HTTPRequestStatus.S_400
                            }
                            if(type == 2) {
                                lockOwner = n!.content.description
                            } else {
                                if let e = n!.childElem, 
                                   let l = e.name.match("exclusive", "shared", "write") {
                                    switch(type + l) {
                                        case 0+0: // lockscope
                                            lockScope = 1
                                        case 0+1: // lockscope
                                            lockScope = 2
                                        case 1+2: // locktype
                                            lockType = 1
                                        default:
                                            throw HTTPRequestStatus.S_400
                                            
                                    }
                                } else {
                                    throw HTTPRequestStatus.S_400
                                }
                            }
                            n = n!.nextElem
                        }
                        
                        if(lockScope == 0 || lockType == 0 || lockOwner == "") {
                            throw HTTPRequestStatus.S_400
                        }
                        
                        // create if not exist
                        var err = AsyncError()
                        if let _ = err <! Dir.base.open(thePath, [.O_CREAT, .O_EXCL]) {
                            // was created
                            created = true
                        } else {
                            switch(err.asRAW) {
                                case .EXIST:
                                    break
                                case .NOENT:
                                    Page.resultStatus = .S_409
                                case .NOMEM:
                                    fallthrough
                                case .NOSPC:
                                    Page.resultStatus = .S_407
                                default:
                                    Page.resultStatus = .S_403
                            }
                        }
                        
                        _ = w.startDoc()
                        
                        let aMode : FileItem.AccessMode = [.R_OK, .W_OK] // only write locks supported
                        var aFlags = FileItem.AccessFlags.NONE
                        if(theDepth != .infinity) {
                            aFlags = .NORECURSIVE
                        }
                        
                        if var target = <!Dir.base.open(thePath),
                           <!target.access2(mode:aMode, flags:aFlags, onError:{ (_ file : FileItem, _ offset : Int, _ err : AppudoError, _ source : Bool) in 
                            // first and only error when access fails
                            Page.resultStatus = .S_207
                            
                            _ = w.startElem(sname:"D:multistatus")
                            _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
                            
                            _ = w.startElem(sname:"D:response")
                            _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:file.path))
                            _ = w.writeElem(sname:"D:status", scontent:"HTTP/1.1 403 Forbidden")
                        }),
                        let token = lock_set(thePath, lockOwner, lockType == 1, lockScope == 1, theDepth == .infinity, onError: { (_ target : String, _ lock : LockInfo) -> Void in 
                            // first and only error when lock fails
                            
                            if(created) {
                                created = <!Dir.base.remove(thePath) == false
                            }
                            
                            if(theDepth != .infinity) {
                                Page.resultStatus = HTTPRequestStatus.S_423
                                return
                            }
                            
                            Page.resultStatus = .S_207
                            
                            _ = w.startElem(sname:"D:multistatus")
                            _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
                            
                            _ = w.startElem(sname:"D:response")
                            _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:target))
                            _ = w.writeElem(sname:"D:status", scontent:"HTTP/1.1 423 Locked")
                        }) {
                            if(created) {
                                Page.resultStatus = .S_201
                            } else {
                                Page.resultStatus = .S_200
                            }
                            
                            _ = w.startElem(sname:"D:prop")
                            _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
                            _ = w.startElem(sname:"D:lockdiscovery")
                        
                            writeActiveLock(w, lockScope == 1, theTimeout, theDepth, lockOwner, token, abs_base + URL.encode(path:thePath))
                            
                            _ = Page.addResultHeader("Lock-Token: <\(token)>\r\n")
                             
                        } else {
                            if(Page.resultStatus == .S_200) {
                                throw HTTPRequestStatus.S_400
                            }
                        }
                        
                        _ = w.endElem() // end multistatus OR lockdiscovery
                        _ = w.endElem() // end response OR prop
                        _ = w.endDoc()
                        
                    }
            } else {    // refresh lock
                
                var token : UnsafeTmpString? = nil
                var theToken = ""
                
                if let _ = HTTPValueParser(If).next(char:UInt8(ascii:"("))?
                                              .next(char:UInt8(ascii:"<"))?
                                              .until(char:UInt8(ascii:">"), &token) {
                    theToken = token!.description
                }
                
                if let lock = lock_get(thePath, theToken) {
                    Page.resultStatus = .S_200
                    
                    _ = w.startDoc()
                        
                    _ = w.startElem(sname:"D:prop")
                    _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
                    _ = w.startElem(sname:"D:lockdiscovery")
                    
                    writeActiveLock(w, lock.exclusive, theTimeout, lock.full ? DavDepth.infinity : DavDepth.zero, lock.owner, theToken, abs_base + URL.encode(path:thePath))
                    
                    _ = w.endElem() // end lockdiscovery
                    _ = w.endElem() // end prop
                    _ = w.endDoc()
                } else {
                    throw HTTPRequestStatus.S_400
                }
            }
            
            if let d = w.data {
                 _ = Page.setMime("xml")
                send(d)
                return
            }
        }

        Page.resultStatus = .S_400
                
    } catch let e as HTTPRequestStatus {
        Page.resultStatus = e
    } catch {
        Page.resultStatus = .S_400
    }
       
      
}

func UNLOCK_Handler(_ path : String, _ If : UnsafeTmpString?, _ LockToken : UnsafeTmpString?) {
    let theToken = LockToken?.trimmed(front:UInt8(ascii:"<"), back:UInt8(ascii:">")).description ?? ""
    var thePath = path

    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
    }
    
    if(theToken == "") {
        Page.resultStatus = .S_400
        return
    }
    
    let r = lock_unset(thePath, theToken)
    Page.resultStatus = r
}

func writeProps(_ writer : XMLWriter, _ abs_base : String, _ path : String, _ file : FileItem, _ liveProps : DavLiveProps, _ deadProps : [libappudo.XMLNode]) {
    var theLiveProps = liveProps
    var failedLiveProps = DavLiveProps.EMPTY
    var failedDeadProps : [libappudo.XMLNode]? = nil
    var theStats = FileStat()
    
    if(theLiveProps != .EMPTY) {
        if let s = <!file.stat {
           theStats = s 
        }
    }
    
    _ = writer.startElem(sname:"D:response")
    _ = writer.writeElem(sname:"D:href", content:abs_base + URL.encode(path:path))
    _ = writer.startElem(sname:"D:propstat") // ok propstat
    _ = writer.writeElem(sname:"D:status", scontent:"HTTP/1.1 200 OK")
    _ = writer.startElem(sname:"D:prop") // ok prop
    
    while let p = theLiveProps.pop() {
        switch(p) {
            case .resourcetype:
                if(theStats.isDir) {
                    _ = writer.startElem(sname:"D:resourcetype")
                    _ = writer.writeElem(sname:"D:collection", scontent:"")
                    _ = writer.endElem()
                } else {
                    _ = writer.writeElem(sname:"D:resourcetype", scontent:"")
                }
            case .getcontentlength:
                _ = writer.writeElem(sname:"D:getcontentlength", content:String(theStats.isDir ?  0 : theStats.size))
            case .getlastmodified:
                _ = writer.writeElem(sname:"D:getlastmodified", content:theStats.time_mod.toString(format:String(describing:Date.format0)))
            //case .creationdate:
                //_ = writer.writeElem(sname:"D:creationdate", content:theStats.time_mod.toString(format:String(describing:Date.format0)))
            case .getetag:
                _ = writer.writeElem(sname:"D:getetag", content:<!file.ETag ?? "")
            case .displayname:
                _ = writer.writeElem(sname:"D:displayname", content:file.name)
            case .executable:
                _ = writer.writeElem(sname:"executable", scontent: theStats.mode.rawValue & 0o0111 != 0 ? "true" : "false")
            //case .getcontenttype:
            //case .source:
            //case .supportedlock:
            //case .lockdiscovery:
            default:
                failedLiveProps.insert(p)
                break
        }
    }
    
    for c in deadProps {
        if let p = prop_dead_get(path, c.ns?.href.description ?? "", c.name.description) {
            if let ns = c.ns { 
                _ = writer.writeElem(name:c.name.description, content:p, ns:ns)
            } else {
                _ = writer.writeElem(name:c.name.description, content:p)
            }
        } else {
            if(failedDeadProps == nil) {
                failedDeadProps = []
            }
            failedDeadProps?.append(c)
        }
    }
    
    _ = writer.endElem()    // ok prop end
    _ = writer.endElem()    // ok propstat end
    
    if(failedLiveProps != .EMPTY || failedDeadProps != nil) {
        _ = writer.startElem(sname:"D:propstat") // fail propstat
        _ = writer.writeElem(sname:"D:status", scontent:"HTTP/1.1 404 Not Found")
        _ = writer.startElem(sname:"D:prop")     // fail prop
        
        while let p = failedLiveProps.pop() {
            _ = writer.writeElem(name:"D:" + p.label, content:"")
        }
        
        if let p = failedDeadProps {
            for c in p {
                if let ns = c.ns {
                    _ = writer.startElem(name:ns.prefix.description + c.name.description)
                    _ = writer.writeAttr(name:ns.prefix.description + "xmlns", content:ns.href.description)
                    _ = writer.endElem()
                } else {
                    _ = writer.writeElem(name: c.name.description, content:"")
                }
            }
        }
        
        _ = writer.endElem()    // fail prop end
        _ = writer.endElem()    // fail propstat end
    }
    
    _ = writer.endElem()    // response end
}

func walkWriteProps(_ writer : XMLWriter, _ base : String, _ target : String, _ liveProps : DavLiveProps, _ deadProps : [libappudo.XMLNode], _ depth : DavDepth) -> Bool {
    var err = AsyncError()
    if let file = err <! Dir.base.open(target, .O_RDONLY) {
        switch(depth) {
            case .one:
                fallthrough
            case .infinity:
                if let file = <!Dir.base.open(target),
                   let s = <!file.stat {
                    if(s.isDir) {
                        if let l = <!file.listDir() {
                            for f in l {
                                _ = walkWriteProps(writer, base, target + "/" +  f.name, liveProps, deadProps, depth.next)
                            }
                        }
                    }
                }
                fallthrough
            case .zero:
                writeProps(writer, base, target, file, liveProps, deadProps)
                break
            case .one_noroot:
                break
            case .infinity_noroot:
                break
        }
    } else {
        _ = writer.startElem(sname:"D:response")
        _ = writer.writeElem(sname:"D:href", content:base + URL.encode(path:target))
        _ = writer.startElem(sname:"propstat")
        
        var status : StaticString = "HTTP/1.1 403 Forbidden"
        Page.resultStatus = .S_403
        switch(err.asRAW) {
            case .NOENT:
                status = "HTTP/1.1 404 Not Found"
                Page.resultStatus = .S_404
            default:
                break
        }
        
        _ = writer.writeElem(sname:"status", scontent:status)
        _ = writer.writeElem(sname:"target", content:target)
        _ = writer.endElem()
        _ = writer.endElem()
        
        return false
    }
    return true
}

func PROPFIND_Handler(_ path : String, _ Depth : UnsafeTmpString?) {
    let abs_base = getBasePath()
    var liveProps = DavLiveProps()
    var deadProps = [libappudo.XMLNode]()
    let theDepth = DavDepth.get(Depth)
    var thePath = path

    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
    }
    
    if var body = Page.rawBody {
    
        do {
            
            if let _ = <!body.seek(0, .SEEK_SET),
               let xml = XMLDoc.from(file:body),
               xml.hasError == false,
               let root = xml.root,
               root.name.match(str:"propfind") != false {
               
                var nshref = xml.empty_str
               
                if let ns = root.ns,
                   ns.href.match(str:"DAV:") != false {
                    nshref = ns.href;
                } else {
                    throw HTTPRequestStatus.S_400
                }
               
                var n = root.childElem
                
                
                while(n != nil) {
                    if n!.name.match(str:"allprop") {
                        liveProps = .ALL
                        deadProps = []
                        break
                    }
                    if let ns = n!.ns,
                       ns.href == nshref,
                       n!.name.match(str:"prop") != false {
                    } else {
                        throw HTTPRequestStatus.S_400
                    }
                    var c = n!.childElem
                    while(c != nil) {
                        if let idx = c!.name.match("resourcetype", "getcontentlength", "getlastmodified", "creationdate", "getetag", "getcontenttype", "displayname", "executable"),
                           let ns = c!.ns,
                           ns.href == nshref || idx == 7 {
                            liveProps.insert(DavLiveProps(rawValue:1 << idx))
                        } else {
                            deadProps.append(c!)
                        }
                        c = c!.nextElem
                    }
                    n = n!.nextElem
                }
            }
        
            Page.resultStatus = .S_400
        
        } catch let e as HTTPRequestStatus {
            Page.resultStatus = e
            return
        } catch {
            Page.resultStatus = .S_400
            return
        }
    } else {
        liveProps = .ALL
        deadProps = []
    }
       
    if let w = XMLWriter.new {
        
        _ = w.startDoc()
        _ = w.startElem(sname:"D:multistatus")
        _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
        
        if !walkWriteProps(w, abs_base, thePath, liveProps, deadProps, theDepth) {
            return
        }
        
        _ = w.endElem()
        _ = w.endDoc()
        
        if let d = w.data {
             _ = Page.setMime("xml")
            send(d)
            Page.resultStatus = .S_207
            return
        }
    }
    
    Page.resultStatus = .S_400
}

func PROPPATCH_Handler(_ path : String, _ If : UnsafeTmpString?) { 
    let abs_base = getBasePath()
    var thePath = path

    if(thePath.suffix(1) == "/") {
        thePath = String(thePath.dropLast())
    }
    
    if let e = lock_is_locked(thePath, If) {
        Page.resultStatus = e
        return
    }
    
    do {
       
        if let w = XMLWriter.new,
           var body = Page.rawBody,
           let _ = <!body.seek(0, .SEEK_SET),
           let xml = XMLDoc.from(file:body),
           xml.hasError == false,
           let root = xml.root,
           root.name.match(str:"propertyupdate") != false {
           
            var nshref = xml.empty_str
           
            if let ns = root.ns,
               ns.href.match(str:"DAV:") != false {
                nshref = ns.href;
            } else {
                throw HTTPRequestStatus.S_400
            }
           
            var n = root.childElem
            
            _ = w.startDoc()
            _ = w.startElem(sname:"D:multistatus")
            _ = w.writeAttr(sname:"xmlns:D", scontent:"DAV:");
            
            _ = w.startElem(sname:"D:response")
            _ = w.writeElem(sname:"D:href", content:abs_base + URL.encode(path:thePath))
            _ = w.startElem(sname:"D:propstat") // ok propstat
            _ = w.writeElem(sname:"D:status", scontent:"HTTP/1.1 200 OK")
            _ = w.startElem(sname:"D:prop") // ok prop

            while(n != nil) {
                let type = n!.name.match("set", "remove") ?? -1
                if let ns = n!.ns,
                   ns.href.len == 0 || ns.href == nshref,
                   type != -1 {
                } else {
                    throw HTTPRequestStatus.S_400
                }
                var c = n!.childElem
                while(c != nil) {
                    if c!.name.match(str:"prop"), 
                       let ns = c!.ns,
                       ns.href.len != 0 {
                    } else {
                        throw HTTPRequestStatus.S_400
                    }
                    
                    if let p = c!.childElem {
                        // store successful and undo un fail
                        if(type == 0) {
                            _ = prop_dead_set(thePath, p.ns?.href.description ?? "", p.name.description, p.content.description)
                        } else {
                            _ = prop_dead_unset(thePath, p.ns?.href.description ?? "", p.name.description)
                        }
                        if let ns = p.ns {
                            _ = w.writeElem(name:p.name.description, content:"", ns:ns)
                        } else {
                            _ = w.writeElem(name:p.name.description, content:"")
                        }
                    } else {
                        throw HTTPRequestStatus.S_400
                    }
                    c = c!.nextElem
                }
                n = n!.nextElem
            }
                
            _ = w.endElem()
            _ = w.endElem()
            _ = w.endElem()
            _ = w.endElem()
            _ = w.endDoc()
            
            if let d = w.data {
                 _ = Page.setMime("xml")
                send(d)
                Page.resultStatus = .S_207
                return
            }
        }
        
        Page.resultStatus = .S_400
        
    } catch let e as HTTPRequestStatus {
        Page.resultStatus = e
    } catch {
        Page.resultStatus = .S_400
    }
}

func getBasePathNoSchema() -> String {
    return (Page.host ?? "") + (Page.entry ?? "") + "base/"
    
}

func getBasePath() -> String {
    return Page.schema.description + (Page.host ?? "") + (Page.entry ?? "") + "base/"
}

func main() {  
    let headers = TheDavHeaders(Page.headers("Accept", "Authorization", "Content-Length", "Depth", "Destination", "Host", "If", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Lock-Token", "Overwrite", "Source", "Timeout", trim:true))
    if let m = Page.method("COPY", "DELETE", "GET", "HEAD", "LOCK", "MKCOL", "MOVE", "OPTIONS", "POST", "PROPFIND", "PROPPATCH", "PUT", "UNLOCK") {
        
        if(Page.pathStrip(sprefix:"base/")) {
        
            let path = Page.path ?? ""
            
            if(!auth_check(path, headers.get(.Authorization))) {
                return
            }
            
            switch(m) {
                case 0: // COPY
                    COPY_Handler(path, headers.get(.If), headers.get(.Destination), headers.get(.Overwrite), headers.get(.Depth))
                case 1: // DELETE
                    DELETE_Handler(path, headers.get(.If))
                case 2: // GET
                    GET_Handler(path, headers.get(.IfModifiedSince))
                case 3: // HEAD
                    HEAD_Handler(path, headers.get(.IfModifiedSince))
                case 4: // LOCK
                    LOCK_Handler(path, headers.get(.If), headers.get(.Timeout), headers.get(.Depth))
                case 5: // MKCOL
                    MKCOL_Handler(path, headers.get(.If))
                case 6: // MOVE
                    MOVE_Handler(path, headers.get(.If), headers.get(.Destination), headers.get(.Overwrite))
                case 7: // OPTIONS
                    OPTIONS_Handler()
                case 8: // POST
                    POST_Handler()
                case 9: // PROPFIND
                    PROPFIND_Handler(path, headers.get(.Depth))
                case 10: // PROPPATCH
                    PROPPATCH_Handler(path, headers.get(.If))
                case 11: // PUT
                    PUT_Handler(path, headers.get(.If))
                case 12: // UNLOCK
                    UNLOCK_Handler(path, headers.get(.If), headers.get(.LockToken))
                default:
                    Page.error = .NotFound
            }
        } else {
            print("{}")
        }  
    } 
}
