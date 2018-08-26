import libappudo
import libappudo_env
import libappudo_run
import libappudo_master

func debug(_ msg : String) {
    if var f = <!Dir.debug.open("debug.txt", [.O_CREAT, .O_RDWR]) {
        if let s = <!f.stat, 
           s.size > 32000 {
               _ = <!f.truncate(0)
           }
        _ = <!f.append("\(msg)\n")
    }
}

func register() {
    var ok = false
      if let f = <!Dir.dev.open("dns_ws_server", .O_RDONLY), 
         let p = f.parent,
         let a = <!Account.get("node"),
         <!Account.swap(a.id) != false,
         let n = <!Dir.com.open("node"), 
         let nl = <!n.readLink(splitDepth:2),
         let np = nl.parent,
         var k = <!Dir.dev_base.open(np.name + "/" + nl.name, .O_APPUDO){
            let path = p.name + "/" + f.name
            if var s = <!k.write("{\"cmd\":6,\"a\":\(Account.current.rawValue),\"t\":2,\"d\":\"\(path)\"}") {
                //print(<!k.readAsText() ?? "")
                ok = true
            }
         } else {
         }
         
        _ = Account.swap()
        
        debug("register \(ok)")
}

func onRun() {
    register()
    
    if var f = <!Dir.dev.open("dns_ws_server", .O_APPUDO) {
        _ = <!f.write("{\"c\":0}")
    }
}