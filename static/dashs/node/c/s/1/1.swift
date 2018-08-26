import libappudo
import libappudo_run
import libappudo_env
import libappudo_master
import libappudo_backend
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

struct Fail : Error {

}

enum WsType : Int32, Codable {
    case STATUS         = 0
    case WELCOME        = 1
    case STATUS_RETRY   = 2
    case DASH_ADD       = 3
    case DASH_REMOVE    = 4
    case STATS_GET      = 5
    case FORWARD_ADD    = 6
    case FORWARD_IN     = 7
    case FORWARD_OUT    = 8
    case UPSK_UPDATE    = 9
    case DOMAIN_ADD     = 10
    case NODE_INIT      = 11
}

struct WsParam : FastCodable {
    let cmd : WsType
    let a : Int?
    let t : Int?
    let d : String?
}

struct NodeInitParam : FastCodable {
    let dm : String
    let psk : String
    let id : Int
    let sc : Int?
}

struct ConnectParam : FastCodable, FastJSONMarkerUpdater {
    let nonce : Int
    let time : Int
    let name : String
    var before : FastJSONMarker
    let hash : String
    var after : FastJSONMarker

    mutating func updateMarker(_ key : CodingKey, _ value : Int) {
        switch(key) {
            case CodingKeys.before:
                before = .Value(value)
            case CodingKeys.after:
                after = .Value(value)
            default:
                break
        }
    }
}

struct ForwardItem {
    let result : FileItem
    let event : FileItem
}

enum ConnectStatus : Int32 {
    case NONE    = 0
    case PENDING = 1
    case OK      = 2
    case FAILED  = 3
}

var _status : ConnectStatus = .FAILED
var _nonce = 0
var _name = ""
var _psk = ""
var _nodeID = -1
var _masterID = -1
var _master = Socket(v:0)
var _tick : Int32 = 0
var _forwardPending : [Int:ForwardItem]? = nil
var _pendingConnect = false

func getStatus(_ result : FileItem) {
    var r = result
    var url = Setting.master_host.value
    var out = ""
    if(url.utf8.count != 0) {
        out = "{\"nid\":\"\(_nodeID)\",\"mid\":\"\(_masterID)\",\"s\":\(_status.rawValue),\"v\":\"\(System.version)\",\"p\":\"\(_psk)\",\"n\":\"\(_name)\"}"
    } else {
        out = "{\"s\":0}"
    }
    _ = <!r.write(out)
}

func tryConnect() {
    if(_status == .FAILED && !_pendingConnect) {
        _pendingConnect = true
        doConnect()
    }
}

func doConnect() {
    let outBuffer = ManagedCharBuffer.create(64)
    let resBuffer = ManagedCharBuffer.create(64)
    let master_host = Setting.master_host.value
    _nonce = _nonce &+ 1
    var param = ConnectParam(nonce:_nonce, time:Date().to1970, name:_name, before:.Before(0), hash:"", after:.After(0))
    var data = ""
    if var d = param.jsonUpdate(strict:false),
        // create sign hash
       let m = <!HMAC.create(d, _psk, outBuffer, exclude:Int32(param.before.rawValue-1)...Int32(param.after.rawValue), flags:.SHA256),
        // convert sign hash to String
       let s = <!Base64.encode(outBuffer, resBuffer, inSizeLimit:m),
       let h = resBuffer.toString(s) {

        // add sign hash
        var repl = "\"hash\":\"\(h)\",\"before\":\(param.before.rawValue),\"after\":";
        let len = repl.utf8.count + 3
        repl = repl + String(format: "%03d", param.before.rawValue + len)
        d.replaceSubrange(d.index(d.startIndex, offsetBy: param.before.rawValue)..<d.index(d.startIndex, offsetBy: param.after.rawValue), with: repl)
        data = d
    }
    if let s = <!ws.open("\(master_host)/connect/?\(data)", flags:[.NO_MASK, .FORCE_SSL]) {
        _master = s
        _status = .PENDING
        _pendingConnect = false
        return
    }
    _status = .FAILED
    _ = AsyncTimer.wait(millis:5000).then {
        doConnect()
    }
}

func onStart() {
    if let r = <!Rand.int64() {
        _nonce = r
    }
    _name = Setting.node_name.value
    if var f = <!Dir.psk.open("PSK", .O_RDONLY),
       let p = <!f.readAsText() {
       _psk = p
    }
    tryConnect()
}

func onDisconnect(ev : WebSocketEvent)  {
    if(ev.target.value == _master.value) {
        _master = Socket(v:0)
        _status = .FAILED
        _ = AsyncTimer.wait(millis:5000).then {
            tryConnect()
        }
        forwardDestroy()
    }
}

var _forward_targets : [Int:FileItem] = [:]

func forwardAdd(_ account : Int, _ type : Int, _ data : String, _ _out: FileItem) {
    var out  = _out
    var res = "{\"r\":1}"
    if <!Account.swap(AccountID(account)) != false,
        let f = <!Dir.dev_base.open(data, .O_APPUDO) {
        _forward_targets[type] = f;
        res = "{\"r\":0}"
    }
    _ = <!Account.swap()
    _ = <!out.write(res)
}

func forwardIn(_ type : Int, _ ticket : Int, _ data : String, _ target : Socket) {
    if var f = _forward_targets[type],
       var _ = <!f.write(data),
       let st = <!f.stat_open {
        _ = ws.cont(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(st.size))", first:true, target)
        _ = ws.cont(txt:f, target)
        _ = ws.cont(txt:"}", last:true, target)
    } else {
        let d = "{\"r\":1,\"f\":4}"
        _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
    }
}

func forwardOut(_ ticket : Int, _ data : String, _ target : Socket) {
    if var forwardPending = _forwardPending,
        let p = forwardPending[ticket] {
        forwardPending[ticket] = nil
        if(forwardPending.count == 0) {
            _forwardPending = nil
        } else {
            _forwardPending = forwardPending
        }
        var result = p.result
        _ = <!result.write(data)
    }
}

func forwardMaster(_ data : String, _ event : FileItem, _ _out : FileItem) {
    var err = true
    if _status == .OK {
        let ticket : Int = Date().to1970 | Int(_tick) << 32
        _tick = _tick &+ 1
        if(_forwardPending == nil) {
            _forwardPending = [:]
        }
        _forwardPending![ticket] = ForwardItem(result:_out, event:event)

        err = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(data.count))\(data),\"r\":1}", _master) == false
        if(err) {
            _forwardPending![ticket] = nil
        }
    }

    if(err) {
        var out = _out
        _ = <!out.write("{\"r\":1,\"f\":1}")
    }
}

func forwardDestroy() {
    if let forwards = _forwardPending {
        for (_, item) in forwards {
               var result = item.result
                _ = <!result.write("{\"r\":1,\"f\":3}")
        }
    }
}

func nodeInit(_ ticket : Int, _ data : String, _ target : Socket) {
    var res = ErrorDefault
    if let param = NodeInitParam.from(json:data) {
        res = _domainAdd(param.dm, sslName:"appudo_dash", addSSL:true, selfSigned:param.sc != nil)
        if res == ErrorNone {
            res = _idUpdate(param.id)
            if res == ErrorNone {
                res = _upskUpdate(param.psk)
                if res == ErrorNone {
                    let d = "{\"r\":0}"
                    _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
                    return
                }
            }
        }
    }
    let d = "{\"r\":\(res),\"f\":4}"
    _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
}

func upskUpdate(_ ticket : Int, _ data : String, _ target : Socket) {
    let res = _upskUpdate(data)
    if res == ErrorNone {
        let d = "{\"r\":0}"
        _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
        return
    }
    let d = "{\"r\":\(res),\"f\":4}"
    _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
}

func _idUpdate(_ id : Int) -> ErrorResult {
    if let m = <!MenuItem.get(Run.current, 1, shift:1),
        <!Setting.update(m.id, "user_node_id", "\(id)") != false {
        return ErrorNone
    }
    return ErrorDefault
}

func _upskUpdate(_ psk : String) -> ErrorResult {
    if let m = <!MenuItem.get(Run.current, 1, shift:1),
        <!Setting.update(m.id, "user_psk", psk) != false {
        return ErrorNone
    }
    return ErrorDefault
}

func domainAdd(_ ticket : Int, _ data : String, _ target : Socket) {
    let res = _domainAdd(data, sslName:"appudo_dash", addSSL:true)
    if res == ErrorNone {
        let d = "{\"r\":0}"
        _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
        return
    }
    let d = "{\"r\":\(res),\"f\":4}"
    _ = ws.send(txt:"{\"t\":\(ticket),\"data\":\(WsParam.sizedValueHeader(d.count))\(d)}", target)
}

func _domainAdd(_ name : String, sslName : String, addSSL : Bool, selfSigned : Bool = false) -> ErrorResult {
    var err = AsyncError()
    if var a = <!Account.get("node"),
       (err <! a.addDomain(name)) != false {

        var sadd = false
        let ssl = sslName

        do {
            if(addSSL) {
                err.reset()
                if let key = <!Dir.dev_base.open("." , [.O_RDWR, .O_TMPFILE]),
                   let cert = <!Dir.dev_base.open("." , [.O_RDWR, .O_TMPFILE]),
                    (selfSigned == false || <!Cert.selfsigned(name:name,country:"EN",org:"dummy",outKey:key,outCert:cert) != false),
                   err <! a.addSSLCert(ssl, cert:cert, key:key, flags:.UPDATE_ADD) {
                    sadd =  true
                } else {
                    if(err.pos == 0 || err.asSQL != .UNIQUE_VIOLATION) {
                        throw Fail()
                    }
                }
            }

            if ssl != "" {
                guard err <! Account.linkSSLCert(name, cert:ssl) else {
                    throw Fail()
                }
            }

            print("{\"r\":0}")
            return ErrorNone

        } catch {
            _ = <!a.removeDomain(name)

            if(sadd) {
                _ = <!Account.removeSSLCert(ssl)
            }
        }
    }
    if(err.errValue != 0) {
        return Int(err.errValue)
    }
    return ErrorDefault
}

func onControl(ev : WebSocketEvent) -> ControlResult {
    let ctrl = ev.data as! ControlData
    if let data = WsParam.from(json:ctrl.data, customValueParser:WsParam.sizedValueParser) {
        switch(data.cmd) {
            case .STATUS_RETRY:
                tryConnect()
                fallthrough
            case .STATUS:
                getStatus(ctrl.result)
            case .FORWARD_IN:
                if let d = data.d {
                       forwardMaster(d, ctrl.event, ctrl.result)
                   }
            case .FORWARD_ADD:
                if let a = data.a,
                   let t = data.t,
                   let d = data.d {
                       forwardAdd(a, t, d, ctrl.result)
                   }
            default:
                break
        }
        return .OK
    }
    return .ABORT
}

func onMessage(ev : WebSocketEvent) {
    if(ev.isText) {
        if let data = WsParam.from(json:ev.data as! String, customValueParser:WsParam.sizedValueParser) {
            switch(data.cmd) {
                case .WELCOME:
                    _status = .OK
                    if let id = data.a,
                       let mid = data.t {
                        _nodeID = id
                        _masterID = mid
                    }
                    break
                case .DASH_ADD:
                    break
                case .DASH_REMOVE:
                    break
                case .STATS_GET:
                    break
                case .UPSK_UPDATE:
                    if let t = data.t,
                       let d = data.d {
                        upskUpdate(t, d, ev.target)
                    }
                case .DOMAIN_ADD:
                    if let t = data.t,
                       let d = data.d {
                        domainAdd(t, d, ev.target)
                    }
                case .NODE_INIT:
                    if let t = data.t,
                       let d = data.d {
                       nodeInit(t, d, ev.target)
                   }
                case .FORWARD_IN:
                    if let a = data.a,
                       let t = data.t,
                       let d = data.d {
                       forwardIn(a, t, d, ev.target)
                    }
                case .FORWARD_OUT:
                    if let t = data.t,
                       let d = data.d {
                        forwardOut(t, d, ev.target)
                    }
                default:
                    break
            }
            return
        }
    }
    ev.target.close()
}
