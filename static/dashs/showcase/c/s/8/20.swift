import libappudo
import libappudo_run

func onControl(ev : WebSocketEvent) -> ControlResult {  
    let ctrl = ev.data as! ControlData;
    _ = ws.bc(txt:"\u{7}a," + ctrl.data)
    return .OK
}

func onConnect(ev : WebSocketEvent) {
}

func onDisconnect(ev : WebSocketEvent) {  
}

func onMessage(ev : WebSocketEvent) {
}
