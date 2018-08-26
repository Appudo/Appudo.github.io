
import libappudo
import libappudo_run
import libappudo_env
import libappudo_master
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

struct CtrlParam : FastCodable {
    let t : Int
    let d : String
}

enum WsType : Int32, Codable {
    case MASTER_ADD_DOMAIN      = 1
    case MASTER_DEL_DOMAIN      = 2
    case SLAVE_ADD_DOMAIN       = 3
    case SLAVE_DEL_DOMAIN       = 4
    case MASTER_ADD_SLAVE       = 5
    case MASTER_DEL_SLAVE       = 6
    case MASTER_UPDATE_DOMAINS  = 7
}

struct ForwardResult : FastCodable {
    let r : Int
}

struct WsParam : FastCodable {
    let cmd : WsType
    let data : String?
    let data1 : String?
}

struct DomainAddParam : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let a : Int           // the actionID used by the target to handle the response
    let dn : String
    let i4 : String
    let i6 : String?
}

struct DomainAddItem : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let dn : String
    let i4 : String
    let i6 : String?
}

struct MultiDomainAddParam : FastCodable {
    let a : Int          // the actionID used by the target to handle the response
    let h : String       // static host
    let d : [DomainAddItem]
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.a = try container.decode(Int.self, forKey: .a)
        self.h = try container.decode(String.self, forKey: .h)
        var ct = try container.nestedUnkeyedContainer(forKey: .d)
        var items = [DomainAddItem]()
        while !ct.isAtEnd {
            if let item = try? ct.decode(DomainAddItem.self) {
                items.append(item)
            }
        }
        self.d = items
    }
}

struct MultiDomainRemParam : FastCodable {
    let a : Int          // the actionID used by the target to handle the response
    let h : String       // static host
    let d : [DomainRemoveItem]
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.a = try container.decode(Int.self, forKey: .a)
        self.h = try container.decode(String.self, forKey: .h)
        var ct = try container.nestedUnkeyedContainer(forKey: .d)
        var items = [DomainRemoveItem]()
        while !ct.isAtEnd {
            if let item = try? ct.decode(DomainRemoveItem.self) {
                items.append(item)
            }
        }
        self.d = items
    }
}

struct DomainRemoveItem : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let dn : String
}

struct DomainRemoveParam : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let a : Int           // the actionID used by the target to handle the response
    let dn : String
}

struct ResultParam : FastCodable {
    let r : Int
}

/*

func add_reverse_master(_ domain : String, _ ipv4 : String) {
    if var f = <!Dir.dev.open("dns_template", .O_APPUDO),
       let t = <!Dir.cfg.open("\(domain).rv.conf", [.O_RDWR, .O_CREAT]),
       let _ = <!f.write("{\"dmn\":\"@\",\"IPv4\":\"\(ipv4)\",\"reverse\":true}") {
        _ = <!t.setMode(rawValue:0o744)
        _ = <!t.truncate(0)
        if let _ = <!f.send(t),
           <!DNS.addZone("rvx", t, flags:.MASTER) {
            print("true")
            return
        }
    }
    print("false")
}

func del_reverse(_ domain : String) {
    if <!DNS.remZone("rvx"),
       <!Dir.cfg.remove("\(domain).rv.conf") {
        print("true")
        return
    }
    print("false")
}

*/

func debug(_ msg : String) {
    if var f = <!Dir.debug.open("debug.txt", [.O_CREAT, .O_RDWR]) {
        if let s = <!f.stat, 
           s.size > 32000 {
               _ = <!f.truncate(0)
           }
        _ = <!f.append("\(msg)\n")
    }
}

func dnsMasterAdd(_ domain : String, _ ipv4 : String, _ ipv6 : String? = nil) -> ErrorResult {
    debug("dnsMasterAdd0\n")
    var err = AsyncError()
    if var f = err <! Dir.dev.open("dns_template", .O_APPUDO),
       let t = err <! Dir.cfg.open("\(domain).conf", [.O_RDWR, .O_CREAT]),
       let _ = err <! f.write("{\"dmn\":\"@\",\"IPv4\":\"\(ipv4)\",\"ser\":\"\(Date().toString(format:"YYYYMMddss"))\"}") {
    debug("dnsMasterAdd1\n")
        _ = <!t.setMode(rawValue:0o744)
        _ = <!t.truncate(0)
        if let _ = err <! f.send(t),
           err <! DNS.addZone(domain, t, flags:.MASTER) {
            return ErrorNone
        }
    }
    debug("dnsMasterAdd2\n")
    if(err.errValue != ErrorNone) {
        return Int(err.errValue)
    }
    return ErrorDefault
}

func dnsSlaveAdd(_ domain : String) -> ErrorResult {
    var err = AsyncError()
    _ = <!Dir.slave.remove("\(domain).conf")
    if let t = err <! Dir.slave.open("\(domain).conf", [.O_RDWR, .O_CREAT]),
      <!t.setMode(rawValue:0o744),
       err <! DNS.addZone(domain, t, flags:.SLAVE) {
        _ = <!t.remove()
        return ErrorNone
    }
    if(err.errValue != ErrorNone) {
        return Int(err.errValue)
    }
    return ErrorDefault
}

func dnsMasterRemove(_ domain : String) -> ErrorResult {
    var err = AsyncError()
    if err <! DNS.remZone(domain),
       err <! Dir.cfg.remove("\(domain).conf") {
        return ErrorNone
    }
    if(err.errValue != ErrorNone) {
        if(err.pos == 2 && err.asRAW == .NOENT) {
            return ErrorNone
        }
        return Int(err.errValue)
    }
    return ErrorDefault
}

func dnsSlaveRemove(_ domain : String) -> ErrorResult {
    var err = AsyncError()
    if err <! DNS.remZone(domain),
       err <! Dir.slave.remove("\(domain).conf") {
        return ErrorNone
    }
    if(err.errValue != ErrorNone) {
        if(err.pos == 2 && err.asRAW == .NOENT) {
            return ErrorNone
        }
        return Int(err.errValue)
    }
    return ErrorDefault
}

var _masterCon : FileItem? = nil
var _inPending = false
var _Incoming = false

func deferDomainHandlePending() -> Void {
    _ = AsyncTimer.wait(millis:10000).then {
        domainHandlePending()
    }  
}

func masterConInit() {
    if let f = <!Dir.dev_node.open("node", .O_APPUDO) {
        _masterCon = f
    }
}

func onStart() {
    debug("onStart0\n")
    masterConInit()
    
    debug("onStart1\n")
    deferDomainHandlePending()
}

func forwardMaster(_ data : String) -> String {
    debug("forwardMaster0  \(data)\n")
    let err = "{\"r\":1}"
    if var f = _masterCon,
       let _ = <!f.write("{\"cmd\":7,\"d\":\(CtrlParam.sizedValueHeader(data.count))\(data)}") {
        
    debug("forwardMaster1\n")
        return <!f.readAsText() ?? err
    }
    debug("forwardMaster2\n")
    return err
}

func forwardRequest(id : Int, type : Int, data : String) -> String? {
    debug("forwardRequest0\n")
    return forwardMaster("{\"cmd\":5,\"fty\":\(type),\"nid\":\(id),\"data\":\(CtrlParam.sizedValueHeader(data.count))\(data)}")
}

func remoteSlaveAdd(_ slaveID : Int, _ domain : String) -> ErrorResult {
    let data = "{\"cmd\":3,\"data\":\"\(domain)\"}"
    let rdata = forwardMaster("{\"cmd\":5,\"nid\":\(slaveID),\"fty\":2,\"data\":\(CtrlParam.sizedValueHeader(data.count))\(data)}")
    
    debug("remoteSlaveAdd \(slaveID), \(domain) \(rdata)\n")
    if let result = ResultParam.from(json:rdata) {
        return result.r
    } 
    return ErrorDefault
}

func remoteSlaveRemove(_ slaveID : Int, _ domain : String) -> ErrorResult {   
    let data = "{\"cmd\":4,\"data\":\"\(domain)\"}"
    let rdata = forwardMaster("{\"cmd\":5,\"nid\":\(slaveID),\"fty\":2,\"data\":\(CtrlParam.sizedValueHeader(data.count))\(data)}")
    if let result = ResultParam.from(json:rdata) {
        return result.r
    }
    return ErrorDefault
}

func slaveAdd(_ nodeID : Int, _ result : inout String) -> ErrorResult {
    let qry = SQLQry("INSERT INTO master_slaves (remote_node_id) VALUES ($1);")
    
    qry.values = [nodeID]
        
    if <!qry.exec() != false {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return Int(qry.errCode.rawValue)
}

func slaveRemove(_ nodeID : Int, _ result : inout String) -> ErrorResult {
    let qry = SQLQry("DELETE FROM master_slaves WHERE remote_node_id = $1;")
    
    qry.values = [nodeID]
        
    if <!qry.exec() != false {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return Int(qry.errCode.rawValue)
}

func domainAddMaster(_ param : MultiDomainAddParam, _ result : inout String) -> ErrorResult { 
    debug("domainAddMasterMulti0 \(param)\n")
    for i in 0..<param.d.count {
        let res = domainAddMaster(param.d[i], param.a, host:param.h)
        if(res != ErrorNone) {
            // TODO send error message to target node
        }
    }
    debug("domainAddMasterMulti1 \(param)\n")
    result = "{\"r\":0}"
    return ErrorNone
}

func domainAddMaster(_ data : DomainAddParam, _ result : inout String) -> ErrorResult {
    let res = domainAddMaster(DomainAddItem(n:data.n,t:data.t,dn:data.dn,i4:data.i4,i6:data.i6), data.a)
    if(res == ErrorNone) {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return res
}

func domainAddMaster(_ item : DomainAddItem, _ action : Int, host:String? = nil) -> ErrorResult {
    // request comes in with domain, ipv4, ipv6, node, target and transaction
    
    let dn = host == nil ? item.dn : item.dn + "." + host!  
    
    debug("domainAddMaster0 \(item)\n")
    // add entry to master
    let res = dnsMasterAdd(dn, item.i4, item.i6)
    if(res != ErrorNone) {
        return res
    }

    debug("domainAddMaster1\n")
    // add a pending item to master_pending
    // for each slave add a pending item in master_domains_pending
    let qry = SQLQry("""
                     WITH insert_domain AS (INSERT INTO master_domains (domain, ipv4, ipv6, deleted) VALUES ($1::TEXT, $2::TEXT, $3::TEXT, false) RETURNING id),
                          insert_pending AS (INSERT INTO master_pending (master_domains_id, remote_node_id, remote_target_id, remote_transaction_id)
                         SELECT id, $4::bigint, $5::bigint, $6::bigint
                         FROM insert_domain RETURNING master_domains_id, id)
                         INSERT INTO master_domains_pending (master_pending_id, master_domains_id, remote_node_id, operation) 
                            SELECT p.id, p.master_domains_id, s.remote_node_id, 0
                                        FROM insert_pending p, master_slaves s WHERE p.id IS NOT NULL;
                     """)
    
    qry.values = [dn, item.i4, item.i6 ?? "", item.n, item.t, action]
    
    if <!qry.exec() == false {
        return ErrorDefault
    }
    
    debug("domainAddMaster2\n")
    deferDomainHandlePending()
    debug("domainAddMaster3\n")
    
    return ErrorNone
}
                 
func domainRemoveMaster(_ param : MultiDomainRemParam, _ result : inout String) -> ErrorResult { 
    for i in 0..<param.d.count {
        let res = domainRemoveMaster(param.d[i], param.a, host:param.h)
        if(res != ErrorNone) {
            // TODO send error message to target node
        }
    }
    debug("domainRemoveMaster \(param)\n")
    result = "{\"r\":0}"
    return ErrorNone
}

func domainRemoveMaster(_ data : DomainRemoveParam, _ result : inout String) -> ErrorResult {
    let res = domainRemoveMaster(DomainRemoveItem(n:data.n,t:data.t,dn:data.dn), data.a)
    if(res == ErrorNone) {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return res
}

func domainRemoveMaster(_ item : DomainRemoveItem, _ action : Int, host:String? = nil) -> ErrorResult {
    let dn = host == nil ? item.dn : item.dn + "." + host!  
    
    debug("domainRemoveMaster0 \(item)\n")
    let res = dnsMasterRemove(dn)
    if(res != ErrorNone) {
        return res
    }

    // check if there are pending items for the domain
    // add a pending item to master_pending
    // for each slave add a pending item in master_domains_pending
    let qry = SQLQry("""
                 WITH update_domain AS (UPDATE master_domains AS d SET deleted = TRUE 
                                            WHERE deleted = FALSE AND domain = $1 RETURNING d.id),
                      insert_pending AS (INSERT INTO master_pending (master_domains_id, remote_node_id, remote_target_id, remote_transaction_id)
                     SELECT id, $2::bigint, $3::bigint, $4::bigint
                     FROM update_domain RETURNING master_domains_id, id)
                     INSERT INTO master_domains_pending (master_pending_id, master_domains_id, remote_node_id, operation) 
                        SELECT p.id, p.master_domains_id, s.remote_node_id, 1
                                        FROM insert_pending p, master_slaves s WHERE p.id IS NOT NULL;
                 """)
                 
    qry.values = [dn, item.n, item.t, action]
    
    if <!qry.exec() == false {
        return Int(qry.errCode.rawValue)
    }
    
    deferDomainHandlePending()
    
    return ErrorNone
}

func domainAddSlave(_ domain : String, _ result : inout String) -> ErrorResult {
    let res = dnsSlaveAdd(domain)
    if(res == ErrorNone) {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return res
}

func domainRemoveSlave(_ domain : String, _ result : inout String) -> ErrorResult {
    let res = dnsSlaveRemove(domain)
    if(res == ErrorNone) {
        result = "{\"r\":0}"
        return ErrorNone
    }
    return res
}

// TODO change handling 
func domainHandlePending() -> Void {
    var again = false
    if(!_inPending) {
        _inPending = true
        debug("domainHandlePending0\n")
        // query the table and ask the salves to do the commands
        var complete = ContiguousArray<Int>()
        /* remote_node_id, master_domains_id */
        var qry = SQLQry("""
                            WITH items AS (
                                SELECT id, remote_node_id, master_domains_id, operation,
                                  min(operation) OVER (PARTITION BY remote_node_id) AS num
                                FROM master_domains_pending
                            )
                            SELECT p.id, domain, remote_node_id, operation
                            FROM items as p LEFT JOIN master_domains AS d ON p.master_domains_id = d.id
                            WHERE operation = num LIMIT 64;
                         """)
            
        if <!qry.exec() != false {
        debug("domainHandlePending1: \(qry.numRows)\n")
            complete.reserveCapacity(64)
            for i in 0..<qry.numRows {
                let id = qry.getAsInt(i, 0)!
                let domain = qry.getAsText(i, 1)!
                let remote_node_id = qry.getAsInt(i, 2)!
                let operation = qry.getAsInt(i, 3)!
                var res = ErrorDefault
                if(operation == 0) {
                    res = remoteSlaveAdd(remote_node_id, domain)
                    debug("domainHandlePending_remoteSlaveAdd: \(res)\n")
                } else {
                    res = remoteSlaveRemove(remote_node_id, domain)
                    debug("domainHandlePending_remoteSlaveRemove: \(res)\n")
                }
                if(res == ErrorNone) {
                    complete.append(id)
                }
            }
            
            again = qry.numRows != 0
        }
        
        // remove item from master_domains_pending when successful
        // query master_pending for items with no items in master_domains_pending
        if(complete.count != 0) {
        debug("domainHandlePending2\n")
            qry = SQLQry("""
                            WITH select_pending AS (SELECT b.id = ANY($1) AS completed, a.master_pending_id, a.id 
                                FROM master_domains_pending AS a LEFT JOIN master_domains_pending AS b 
                                                                    ON a.master_pending_id = b.master_pending_id 
                                                                    WHERE a.id = ANY($1)),
                                delete_pending AS (DELETE FROM master_domains_pending AS d 
                                                            USING select_pending AS p 
                                                            WHERE p.completed = TRUE AND d.id = p.id RETURNING d.master_pending_id)
                                SELECT d.id, remote_node_id, remote_target_id, d.remote_transaction_id, deleted 
                                        FROM master_pending AS d,
                                             master_domains AS m
                                                            WHERE d.master_domains_id = m.id
                                                            AND d.id IN(SELECT master_pending_id FROM delete_pending)
                                                            AND d.id NOT IN(SELECT master_pending_id FROM select_pending WHERE completed = FALSE)
                         """)
                         
            qry.values = [complete]
        } else {
            qry = SQLQry("""
                               SELECT d.id, remote_node_id, remote_target_id, d.remote_transaction_id, deleted 
                                    FROM master_pending AS d,
                                         master_domains AS m
                                    WHERE d.master_domains_id = m.id
                                    AND d.id NOT IN(SELECT master_pending_id FROM master_domains_pending)
                        """)
        }
            
        if <!qry.exec() != false {
            
    debug("domainHandlePending3 \(qry.numRows)\n")
            complete.removeAll()
            for i in 0..<qry.numRows {  
                let id = qry.getAsInt(i, 0)!
                let remote_node_id = qry.getAsInt(i, 1)!
                let remote_target_id = qry.getAsInt(i, 2)!
                let remote_transaction_id = qry.getAsInt(i, 3)!
                let deleted = qry.getAsBool(i, 4)!
                
    debug("domainHandlePending3.1: \(remote_target_id)\n")
                let d = "{\"n\":\(remote_node_id),\"s\":\(deleted ? 0 : 1)}"
                if let rdata = forwardRequest(id:remote_target_id, type:1, data:"{\"cmd\":\(remote_transaction_id),\"data\":\(CtrlParam.sizedValueHeader(d.count))\(d)}"),
                   let res = ForwardResult.from(json:rdata),
                   res.r == ErrorNone {
    debug("domainHandlePending4\n")
                    complete.append(id)
                }
                
            }
        
            if(complete.count != qry.numRows) {
                again = true
            }
            
            let qry2 = SQLQry("""
                                WITH del AS(delete from master_pending WHERE id = ANY($1) RETURNING master_domains_id)
                                DELETE FROM master_domains WHERE deleted = TRUE AND id IN (SELECT master_domains_id FROM del)
                              """)
        
            qry2.values = [complete]
            
            _ = <!qry2.exec()
    debug("domainHandlePending4.1 \(qry2.errMsg)\n")
            
        } else {
    debug("domainHandlePending4.2 \(qry.errMsg)\n")
            again = true
        }
        
        debug("domainHandlePending5\n")
        
        _inPending = false
        
        if(_Incoming) {
            _Incoming = false
            again = true;
        }
    } else {
        _Incoming = true;
    }
    
    // retry after some time if table is not empty
    if(again) {
        debug("domainHandlePending6\n")
        deferDomainHandlePending()
    }
}

func onControl(ev : WebSocketEvent) -> ControlResult {
    let ctrl = ev.data as! ControlData
    var res = ErrorDefault
    var result = ""
    var out = ctrl.result
    debug("onControl \(ctrl.data)\n")
    if let param = WsParam.from(json:ctrl.data, customValueParser:CtrlParam.sizedValueParser) {
        switch(param.cmd) {
            case .MASTER_UPDATE_DOMAINS:
                if let data = MultiDomainAddParam.from(json:param.data ?? "") {
                    res = domainAddMaster(data, &result)
                }
                if let data = MultiDomainRemParam.from(json:param.data1 ?? "") {
                    res = domainRemoveMaster(data, &result)
                }
            case .MASTER_ADD_DOMAIN:
                if let data = DomainAddParam.from(json:param.data ?? "") {
                    res = domainAddMaster(data, &result)
                }
            case .MASTER_DEL_DOMAIN:
                if let data = DomainRemoveParam.from(json:param.data ?? "") {
                    res = domainRemoveMaster(data, &result)
                }
            case .SLAVE_ADD_DOMAIN:
                if let domain = param.data {
                    res = domainAddSlave(domain, &result)
                }
            case .SLAVE_DEL_DOMAIN:
                if let domain = param.data {
                    res = domainRemoveSlave(domain, &result)
                }
            case .MASTER_ADD_SLAVE:
                if let data = param.data,
                   let nodeID = Int(data) {
                    res = slaveAdd(nodeID, &result)
                }
            case .MASTER_DEL_SLAVE:
                if let data = param.data,
                   let nodeID = Int(data) {
                    res = slaveRemove(nodeID, &result)
                }
        }
    }
    if(res != ErrorNone) {
        result = "{\"r\":\(res)}"
    }
    
    debug("onControl1 \(result)\n")
    _ = <!out.append(result)
    return .OK
}


func setupTables() -> Bool {
/*
    var qry = SQLQry("""
                        ALTER TABLE master_slaves ADD CONSTRAINT master_slaves_unique UNIQUE (remote_node_id);
                     """)
    if <!qry.exec() == false { 
        //return false
    }
    
    qry = SQLQry("""
                       ALTER TABLE master_domains ADD CONSTRAINT master_domains_unique UNIQUE (domain);
                 """)
    if <!qry.exec() == false { 
        return false
    }
    */
    
    return true
}

func test() {
    
    var qry = SQLQry("""
                        DELETE FROM master_domains RETURNING id;
                     """)
    
    _ = <!qry.exec()
    
    print("<br>", qry.numRows)
    
    qry = SQLQry("""
                        DELETE FROM master_pending RETURNING id;
                     """)
    
    _ = <!qry.exec()
    
    print("<br>", qry.numRows)
    
    qry = SQLQry("""
                        DELETE FROM master_domains_pending RETURNING id;
                     """)
    
    _ = <!qry.exec()
    
    print("<br>", qry.numRows)
    
}
    /*
        somewhere -> dns master
        dns master -> dns slave
        dns master -> somewhere
    */
    