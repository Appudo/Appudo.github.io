
import libappudo
import libappudo_run
import libappudo_env
import Foundation

typealias ErrorResult = Int

let ErrorDefault = 1
let ErrorNone = 0

struct DomainAddParam : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let a : Int           // the actionID used by the target to handle the response
    let dn : String
    let i4 : String
    let i6 : String?
}

struct DomainRemoveParam : FastCodable {
    let n : Int           // the remote nodeID
    let t : Int           // the remote targetID e.g. the master id for the user dash node
    let a : Int           // the actionID used by the target to handle the response
    let dn : String
}

func debug(_ msg : String) {
    if var f = <!Dir.debug.open("debug.txt", [.O_CREAT, .O_RDWR]) {
        _ = <!f.append(msg)
    }
}

func update(_ old : String, _ new : String, _ ipv4 : String) {
    let padd = DomainAddParam(n:1,t:2,a:3,dn:new,i4:ipv4,i6:nil)
    let prem = DomainRemoveParam(n:1,t:2,a:3,dn:old)
    
    if var f = <!Dir.dev_ws.open("dns_ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":2,\"data\":\"\(prem.jsonStringEscaped ?? "")\"}"),
       let res = <!f.readAsText() {
        print("rem: ", res)
    } else {
        print("rem: error")
    }
    
    if var f = <!Dir.dev_ws.open("dns_ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":1,\"data\":\"\(padd.jsonStringEscaped ?? "")\"}"),
       let res = <!f.readAsText() {
        print("add: ", res)
    } else {
        print("add: error")
    }
}

func add(_ old : String, _ new : String, _ ipv4 : String) {
    let padd = DomainAddParam(n:1,t:2,a:3,dn:new,i4:ipv4,i6:nil)
    
    if var f = <!Dir.dev_ws.open("dns_ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":1,\"data\":\"\(padd.jsonStringEscaped ?? "")\"}"),
       let res = <!f.readAsText() {
        print("add: ", res)
    } else {
        print("add: error")
    }
}

func rem(_ old : String, _ new : String, _ ipv4 : String) {
    let prem = DomainRemoveParam(n:1,t:2,a:3,dn:old)
    
    if var f = <!Dir.dev_ws.open("dns_ws_server", .O_APPUDO),
       let _ = <!f.write("{\"cmd\":2,\"data\":\"\(prem.jsonStringEscaped ?? "")\"}"),
       let res = <!f.readAsText() {
        print("rem: ", res)
    } else {
        print("rem: error")
    }
}

func test() { 
    
}

func main() {
    test()
}
