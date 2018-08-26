import libappudo
import libappudo_run

var users : [Int: String] = [Int: String]()

func onConnect(ev : WebSocketEvent) {  
    let s : Socket = ev.target
    let data = ev.data as? String ?? "noname"
    
    if(users[Int(s.value)] != nil) {
        _ = ws.send(txt:"\u{7}e,")
        s.close()
        return
    }
    
    if(users.count >= 100) {
        _ = ws.send(txt:"\u{7}f,")
        s.close()
        return
    }
    
    ev.set(_monitor:true)
    
    for (id, name) in users {
        _ = ws.send(txt:"\u{7}a," + String(describing:id) + "," + name, s)
    }
    
    users[Int(s.value)] = data
    _ = ws.bc(txt:"\u{7}a," + String(describing:s.value) + "," + data)
      
}

func onDisconnect(ev : WebSocketEvent) {  
    let s : Socket = ev.target
    _ = ws.bc(txt:"\u{7}r," + String(describing:s.value))
    users[Int(s.value)] = nil
}

func onMessage(ev : WebSocketEvent) {
    let s : Socket = ev.target
    if(ev.isText) {
        let data = ev.data as! String;
        if(data.characters[data.startIndex] == "\u{7}") {
            s.close()
            return
        }
      
        _ = ws.bc(txt:String(describing:s.value) + ", " + data, ev.target)
    } else {
        s.close()
    }
}
