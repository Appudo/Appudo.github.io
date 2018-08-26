
import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend
import libappudo_master
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

struct Fail : Error {

}

var _nodeID = -1    // from the user dash perspective

enum PostType : Int32, Codable {
    case STATUS             = 0
    case DASH_LIST          = 1
    case DASH_ADD           = 2
    case DASH_REMOVE        = 3
    case LOGIN              = 4
    case LOGOUT             = 5
    case DISABLE            = 6
    case STATUS_RETRY       = 7
    case DASH_ADD_PRECHECK  = 8
    case DOMAIN_ADD         = 9
    case SSL_REFRESH        = 10
    case LOGIN_ADD          = 11
    case LOGIN_REMOVE       = 12
    case DOMAIN_REMOVE      = 13
    case NAME_UPDATE        = 14
    case SSL_REMOVE         = 15
    case PING               = 16
    case DASH_NAME          = 17
    case SSL_NAME           = 18
    case DASH_USER          = 19
    case DASH_SET_EDIT      = 20
    case DASH_SET_PASSWORD  = 21
}

struct TicketLogin : FastCodable {
    let r : Int32
    let n : Int
    let t : Int
}

struct TicketInfo : FastCodable {
    let n : Int
    let t : Int
    let p : Int
    let sn : Int
    let h : String
}

struct StateInfo : FastCodable {
    let nid : String
    let s : Int
}

struct PostParam : FastCodable {
    let cmd : PostType
    let data : String?
}

struct LoginData : FastCodable {
    let name : String
    let password : String
}

struct DashAddData : FastCodable {
    let an : String
    let dn : String
    let un : String
    let up : String
    let ac : String?
    let af : String?
    let ed : String?
    let ma : String?
    let di : String?
    let ds : String
    let pp : String
    let sn : String
    let on : String
    let se : String?
    let sc : String?
    let eo : String?
}

struct DashPasswordData : FastCodable {
    let id : Int
    let pwd : String
}

struct DashEditData : FastCodable {
    let id : Int
    let ed : Bool
}

struct DashRemData : FastCodable {
    let d : String
    let n : Int?
}

struct DomainAddData : FastCodable {
    let an : String
    let dn : String
    let sn : String
    let se : String?
    let sc : String?
}

struct DomainRemoveData : FastCodable {
    let an : String
    let dn : String
    let n : Int?
}

struct SSLRefreshData : FastCodable {
    let an : String
}

struct SSLRemoveData : FastCodable {
    let an : String
    let u : Int?
}

struct FormFiles {
    var ssl_key : FileItem? = nil
    var ssl_cert : FileItem? = nil
    var package : FileItem? = nil
}

struct CheckData : FastCodable {
    let an : String
    let dn : String
    let sn : String
    let on : String
    let se : String?
    let eo : String?
}


func createSign(_ data0 : Int, _ data1 : Int, _ data2 : Int, _ data3 : Int, _ secret : String) -> String? {

    let outBuffer = ManagedCharBuffer.create(64)
    let resBuffer = ManagedCharBuffer.create(64)
    if let hmac = HMAC.begin(secret, flags:.SHA256),
               <!hmac.update(data0, _nodeID, data1, data2, data3) != false,
       let m = <!hmac.finish(outBuffer),
        // convert sign hash to String
       let s = <!Base64.encode(outBuffer, resBuffer, inSizeLimit:m) {
           return resBuffer.toString(s)
    }
    return nil
}

func checkLogin(_ ticket : String) -> Bool {
    if ticket != "" {
        if let info = TicketLogin.from(json:ticket),
        loginGet(info) != false {
            return true
        }
        return false
    }
    if(User.logon != nil) {
        let p : UInt = 0xFFFFFFFFFFFFFFFF
        // Page.userData = p // userData is used for the file upload
        return true
    }
    return false
}

func printStatus() -> ErrorResult {
    if let txt = getStatus() {
        print(txt)
        return ErrorNone
    }
    return ErrorDefault;
}

func getNodeID() -> Bool {
    _nodeID = Int(Setting.user_node_id.value) ?? -1
    return _nodeID != -1
}

func getStatus() -> String? {
    if var f = <!Dir.dev.open("ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":0}"),
       let txt = <!f.readAsText() {
        return txt
    }
    return nil
}

func statusRetry() -> ErrorResult {
    if var f = <!Dir.dev.open("ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":2}"),
       let txt = <!f.readAsText() {
        print(txt)
        return ErrorNone
    }
    return ErrorDefault
}

func setDisabled() -> ErrorResult {
    if let m = <!TreeMenuItem.get(Page.root, 1, shift:1),
       let uID = User.logon,
       let g = <!Group.get("node_dash_user"),
       let u = <!uID.value {
        var r2 =  m.id
        if (<!u.removeGroup(g.id) && <!r2.setActive(false)) {
            print("{\"r\":0}")
            return ErrorNone
        }
    }
    return ErrorDefault
}

func printDash(_ item : ServerDomainListItem) {
   print("{\"id\":\"\(item.id)\",\"cid\":\"\(item.certId)\",\"aid\":\"\(item.accountId)\",\"host\":\"\(item.host)\"}")
}

func dashList() -> ErrorResult {
    if let l = <!ServerDomain.list() {
        print("[")
        if let n = l.next() {
            printDash(n)
        }
        while(true) {
            if let n = l.next() {
                print(",")
                printDash(n)
            } else {
                break
            }

        }
        print("]")

        return ErrorNone
    }
    return ErrorDefault
}

func dashAddCheck(_ params : PostParam) -> ErrorResult {
    if let frm = CheckData.from(json:params.data ?? "") {
        let addOwner = frm.eo != nil
        let addSSL = frm.se != nil
        // check if account exists
        if var _ = <!Account.get(frm.an) {
            print("{\"r\":1,\"e\":1}")
            return ErrorNone
        }
        // TODO check if domain exists
        // TODO check if ssl name exists
        // TODO check if owner name exists
        print("{\"r\":0}")
        return ErrorNone
    }
    return ErrorDefault
}

func domainAdd(_ params : PostParam) -> ErrorResult {
    var err = AsyncError()
    if let frm = DomainAddData.from(json:params.data ?? ""),
       var a = err <! Account.get(frm.an),
       (err <! a.addDomain(frm.dn)) != false {

        var sadd = false
        let addSSL = frm.se != nil
        let ssl = frm.sn

        do {
            if(addSSL) {
                var _cert : FileItem? = nil
                var _key : FileItem? = nil
                if frm.sc != nil,
                   let key = <!Dir.tmp.open("." , [.O_RDWR, .O_TMPFILE]),
                   let cert = <!Dir.tmp.open("." , [.O_RDWR, .O_TMPFILE]),
                   <!Cert.selfsigned(name:frm.dn, country:"EN", org:"dummy", outKey:key, outCert:cert) != false {
                    _cert = cert
                    _key = key
                } else {
                    if let dummy = <!Dir.tmp.open("." , [.O_RDWR, .O_TMPFILE]) {
                        _cert = dummy
                        _key = dummy
                    }
                }

                if let key = _key,
                let cert = _cert,
                <!a.addSSLCert(ssl, cert:cert, key:key) {
                    sadd = true
                } else {
                    throw Fail()
                }
            }

            if ssl != "" {
                guard <!Account.linkSSLCert(frm.dn, cert:ssl) else {
                    throw Fail()
                }
            }

            print("{\"r\":0}")
            return ErrorNone

        } catch {
            _ = <!a.removeDomain(frm.dn)

            if(sadd) {
                _ = <!Account.removeSSLCert(ssl)
            }
        }
    }

    if(err.errValue != ErrorNone) {
        return Int(err.errValue)
    }

    return ErrorDefault
}

func domainRemove(_ params : PostParam) -> ErrorResult {
    var err = AsyncError()
    if let frm = DomainRemoveData.from(json:params.data ?? ""),
       var a = frm.n != nil ? err <! Account.get(frm.an) : err <! AccountID(Int(frm.an) ?? -1).value,
       (err <! a.removeDomain(frm.dn)) != false {
            print("{\"r\":0}")
            return ErrorNone
    }

    if(err.errValue != ErrorNone) {
        return Int(err.errValue)
    }

    return ErrorDefault
}

func sslRefresh(_ params : PostParam) -> ErrorResult {
    if let frm = SSLRefreshData.from(json:params.data ?? ""),
       let l = <!ServerDomain.list(cert:frm.an){
        var hosts = [String]()
        var account : Int = -1
        while(true) {
            if let n = l.next() {
                hosts.append(n.host)
                account = n.accountId
            } else {
                break
            }

        }

        if(acmeDashRequest(frm.an, hosts, account)) {
            print("{\"r\":0}")
            return ErrorNone
        }
    }
    return ErrorDefault
}

func sslRemove(_ params : PostParam) -> ErrorResult {
    var err = AsyncError()
    if let frm = SSLRemoveData.from(json:params.data ?? ""),
       err <! Account.removeSSLCert(frm.an, unused:frm.u != nil) {
       print("{\"r\":0}")
       return ErrorNone
    }

    if(err.errValue != ErrorNone) {
        return Int(err.errValue)
    }

    return ErrorDefault
}

func sslNameById(_ data : String) -> ErrorResult {
    if let id = Int(data),
       let a = <!CertID(id).value {
        print("{\"r\":0,\"d\":\"\(a.name)\"}")
        return ErrorNone
    }
    return ErrorDefault
}

func dashNameById(_ data : String) -> ErrorResult {
    if let id = Int(data),
       let a = <!AccountID(id).value {
        print("{\"r\":0,\"d\":\"\(a.name)\"}")
        return ErrorNone
    }
    return ErrorDefault
}

func dashGetUser(_ data : String) -> ErrorResult {
    if let id = Int(data),
       let a = <!AccountID(id).value,
       let u = <!a.user {
        print("{\"r\":0,\"d\":{\"i\":\(u.id.rawValue),\"n\":\"\(u.name)\"}}")
        return ErrorNone
    }
    return ErrorDefault
}

func dashSetPassword(_ data : String) -> ErrorResult {
    if let frm = DashPasswordData.from(json:data),
       let a = <!AccountID(frm.id).value,
       var u = <!a.user,
       <!Account.swap(a.id) != false,
       <!u.setPassword(frm.pwd) != false {
        <!Account.swap()
        print("{\"r\":0}")
        return ErrorNone
    }
    <!Account.swap()
    return ErrorDefault
}

func dashSetEdit(_ data : String) -> ErrorResult {
    if let frm = DashEditData.from(json:data),
       var a = <!AccountID(frm.id).value,
       <!a.setEdit(frm.ed) != false {
        print("{\"r\":0}")
        return ErrorNone
    }
    return ErrorDefault
}

func dashAdd(_ params : PostParam) -> ErrorResult {
    if let frm = DashAddData.from(json:params.data ?? "") {
        let addOwner = frm.eo != nil
        let addSSL = frm.se != nil
        let owner = frm.on
        let ssl = frm.sn
        var flags = Account.CreatFlags.NONE
        var account : Account? = nil
        var oadd = false
        var sadd = false
        if(frm.ac != nil) {
            flags = flags.union(.ACTIVE)
        }
        if(frm.ed != nil) {
            flags = flags.union(.EDIT)
        }
        if(frm.ma != nil) {
            flags = flags.union(.MASTER)
        }
        if(frm.di != nil) {
            flags = flags.union(.DISK)
        }

        do {

            if var a = <!Account.add(frm.an, frm.un, frm.up, flags, diskSize:Int32(frm.ds) ?? 0) {
                account = a
                if(addOwner) {
                    var err = AsyncError()
                    guard (err <! Account.addOwner(owner)) || (frm.af != nil && err.asSQL == .UNIQUE_VIOLATION) else {
                        throw Fail()
                    }
                    if(err.noError) {
                        oadd =  true
                    }
                }
                if owner != "" {
                    guard <!a.updateOwner(owner) else {
                        throw Fail()
                    }
                }
                guard <!a.addDomain(frm.dn) else {
                    throw Fail()
                }
                if(addSSL) {
                    var _cert : FileItem? = nil
                    var _key : FileItem? = nil
                    if let files = Page.userData as? FormFiles,
                       let cert = files.ssl_cert,
                       let key = files.ssl_key {
                        _cert = cert
                        _key = key
                    } else {
                        if frm.sc != nil,
                           let key = <!Dir.tmp.open("." , [.O_RDWR, .O_TMPFILE]),
                           let cert = <!Dir.tmp.open("." , [.O_RDWR, .O_TMPFILE]),
                           <!Cert.selfsigned(name:frm.dn, country:"EN", org:"dummy", outKey:key, outCert:cert) != false {
                            _cert = cert
                            _key = key
                        }
                    }

                    if let key = _key,
                       let cert = _cert,
                       <!a.addSSLCert(ssl, cert:cert, key:key) {
                        sadd = true
                    } else {
                        throw Fail()
                    }
                }
                if ssl != "" {
                    guard <!Account.linkSSLCert(frm.dn, cert:ssl) else {
                        throw Fail()
                    }
                }
                if let files = Page.userData as? FormFiles,
                   let pkg = files.package,
                   let acc = account {
                    guard <!Package.deploy(acc.id, pkg, frm.pp) else {
                        throw Fail()
                    }
                }
                print("{\"r\":0}")
                return ErrorNone
            } else {
                throw Fail()
            }
        } catch {
            if var a = account {
                _ = <!a.remove()
            }

            if(sadd) {
                _ = <!Account.removeSSLCert(ssl)
            }

            if(oadd) {
                _ = <!Account.removeOwner(owner)
            }
        }
    }
    return ErrorDefault
}

func dashRemove(_ params : PostParam) -> ErrorResult {
    var err = AsyncError()
    if let data = DashRemData.from(json:params.data ?? "") {
        var a : Account? = nil
        if(data.n != nil) {
            a = err <! Account.get(data.d)
        } else {
            a = err <! AccountID(Int(data.d) ?? -1).value
        }

        if var account = a,
           err <! account.remove() {
            print("{\"r\":0}")
            return ErrorNone;
        }

        if(err.errValue != ErrorNone) {
            return Int(err.errValue)
        }
    }
    return ErrorDefault
}

func nameUpdate(_ name : String) -> ErrorResult {
    if let m = <!MenuItem.get(Run.current, 1, shift:-1),
        <!Setting.update(m.id, "node_name", name) != false {
        return ErrorNone
    }
    return ErrorDefault
}

var _loginArray : TimedArray? = nil

func loginArray() -> TimedArray? {
    if let arr = _loginArray {
        return arr
    }
    do {
        _loginArray = try TimedArray(5*60)
        return _loginArray
    } catch {
        return nil
    }
}

func loginAdd(_ ticket : String) -> ErrorResult {
    let secret = Setting.user_psk.value
    var idx : Int32 = 0

    if _nodeID == -1 && getNodeID() == false {
        return ErrorDefault;
    }

    if secret != "",
       let info = TicketInfo.from(json:ticket),
       let hash = createSign(info.sn, info.n, info.t, info.p, secret),
       hash == info.h,
       Date().to1970 < info.t + 60,
       let rt = <!Rand.int64(),
       let rn = <!Rand.int64(),
       let arr = loginArray() {
            idx = arr.Insert(rt, rn, info.p)
            if(idx != 0) {
                let tk = "{\\\"t\\\":\(rt),\\\"n\\\":\(rn),\\\"r\\\":\(idx)}"
                print("{\"r\":0, \"tk\":\"\(tk)\"}")
                return ErrorNone
            }
    }

    return ErrorDefault
}

func loginRemove(_ ticket : String) -> ErrorResult {
    if let arr = loginArray(),
       let info = TicketLogin.from(json:ticket),
       arr.Remove(info.r) != false {
            print("{\"r\":0}")
            return ErrorNone
    }
    return ErrorDefault
}

func loginGet(_ info : TicketLogin) -> Bool {
    if let arr = loginArray(),
       let v = arr.GetAndUpdate(info.r),
       v.0 == info.t,
       v.1 == info.n {
           return true
    }
    return false
}

func doLogin(_ params : PostParam) -> ErrorResult {
    if let data = LoginData.from(json:params.data ?? ""),
       let g = <!Group.get("node_dash_user"),
       <!User.login(data.name, data.password),
       let uid = User.logon,
       let u = <!uid.value,
       <!u.hasGroup(g.id) {
        print("{\"r\":0}")
        return ErrorNone
    }
    User.logout()
    return ErrorDefault
}

func doLogout() -> ErrorResult {
    User.logout()
    return ErrorNone
}

func onUpload(ev : PageEvent) -> UploadResult {
    var f : FileItem? = nil
    if let data = ev.data as? UploadData {
        var files : FormFiles = FormFiles()
        if let _files = Page.userData as? FormFiles {
            files = _files
        }
        if let of = <!Dir.tmp.open(".", [.O_TMPFILE, .O_RDWR]) {
            f = of
            switch(data.name) {
                case "pkg":
                    files.package = of
                case "ssc":
                    files.ssl_key = of
                case "ssk":
                    files.ssl_cert = of
                default:
                    f = nil
            }
        }
        Page.userData = files
    }
    if(f != nil) {
        return .OK(f!)
    }
    return .ABORT
}

func acmeDashRequest(_ name : String, _ domains : [String], _ firstAccount : Int) -> Bool {
    _ = <!Dir.acme_out.mkpath(name)
    if var p = <!Dir.acme_certs.mkpath(name, [.S_IRWXU, .S_IRWXG]) {
        _ = <!p.setOwner(User.admin, Group.master)
    }

    // get cert
    var a = ACME()
    if var log = <!Dir.tmp.open(".", [.O_RDWR, .O_TMPFILE]),
       let resDir = <!Dir.acme_certs.open(name, .O_DIRECTORY),
       let cngDir = <!Dir.acme_cdir.open(".", .O_DIRECTORY),
       let accPKey = <!Dir.acme_out.open("\(name)/accountKey.pem", [.O_CREAT, .O_RDWR]),
       let dmnPKey = <!Dir.acme_out.open("\(name)/domainKey.pem", [.O_CREAT, .O_RDWR]) {
        //a.logTo = log

        if(<!a.request(resDir:resDir,
                       cngDir:cngDir,
                       accPKey:accPKey,
                       dmnPKey:dmnPKey,
                       domains:domains,
                       flags:[ .DEFAULT, .NEW_ACCOUNT, .NEW_DOMAIN, .VERBOSE ]) == false) {
            print(<!log.readAsText() ?? "")
            return false
        }

    } else {
        return false
    }

    // set cert
    if let c = <!Dir.acme_certs.open("\(name)/fullchain.pem", .O_RDONLY),
       let k = <!Dir.acme_out.open("\(name)/domainKey.pem", .O_RDONLY),
       var a = <!AccountID(firstAccount).value,
       <!a.addSSLCert(name, cert:c, key:k, flags:.UPDATE_ONLY) != false {
       return true
    }

    return false
}

func getSubdomain(_ dmn : String) -> String? {
    if let idx = dmn.index(of: "."),
       idx.encodedOffset < 15 {
           return String(dmn[dmn.startIndex...idx])
    }
    return nil
}

func doPing() -> ErrorResult {
    print("{\"r\":0}")
    return ErrorNone
}

func main() {
    var res = ErrorDefault
    if(Page.requestMethod == .POST) {
        if(!Page.sameOrigin) {
            if let sd = getSubdomain(Page.origin ?? "") {
                _ = Page.addResultHeader("Access-Control-Allow-Origin: \(sd)\(Setting.static_host.value)\n")
                _ = Page.addResultHeader("Access-Control-Allow-Credentials: true\n")
            }
        }
        let postData = Post.data.value
        if let params = PostParam.from(json:postData) {
            if(params.cmd == .LOGIN || params.cmd == .LOGIN_ADD || checkLogin(Post.tk.value)) {
                switch(params.cmd) {
                    case .STATUS:
                        res = printStatus()
                    case .LOGIN:
                        res = doLogin(params)
                    case .LOGOUT:
                        res = doLogout()
                    case .DASH_LIST:
                        res = dashList()
                    case .DASH_ADD:
                        res = dashAdd(params)
                    case .DASH_REMOVE:
                        res = dashRemove(params)
                    case .DISABLE:
                        res = setDisabled()
                    case .STATUS_RETRY:
                        res = statusRetry()
                    case .DASH_ADD_PRECHECK:
                        res = dashAddCheck(params)
                    case .DOMAIN_ADD:
                        res = domainAdd(params)
                    case .DOMAIN_REMOVE:
                        res = domainRemove(params)
                    case .SSL_REFRESH:
                        res = sslRefresh(params)
                    case .SSL_REMOVE:
                        res = sslRemove(params)
                    case .LOGIN_ADD:
                        res = loginAdd(Post.tk.value)
                    case .LOGIN_REMOVE:
                        res = loginRemove(Post.tk.value)
                    case .NAME_UPDATE:
                        res = nameUpdate(params.data ?? "")
                    case .PING:
                        res = doPing()
                    case .DASH_NAME:
                        res = dashNameById(params.data ?? "")
                    case .SSL_NAME:
                        res = sslNameById(params.data ?? "")
                    case .DASH_USER:
                        res = dashGetUser(params.data ?? "")
                    case .DASH_SET_EDIT:
                        res = dashSetEdit(params.data ?? "")
                    case .DASH_SET_PASSWORD:
                        res = dashSetPassword(params.data ?? "")
                }
                if(res == ErrorNone) {
                    return
                }
            } else {
                print("{\"r\":1,\"l\":1}")
                return
            }
        }
    } else {
        if(Page.requestMethod == .OPTIONS) {
            if let sd = getSubdomain(Page.origin ?? "") {
                _ = Page.addResultHeader("""
                                    Access-Control-Allow-Origin: \(sd)\(Setting.static_host.value)
                                    Access-Control-Allow-Methods: GET, POST, OPTIONS
                                    Access-Control-Allow-Credentials: true
                                    Access-Control-Max-Age: 86400

                                    """)
            }
            return
        }
    }
    print("{\"r\":\(res)}")
}
