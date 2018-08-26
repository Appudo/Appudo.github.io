         
import libappudo
import libappudo_run
import libappudo_env

func onMessage(ev : WebSocketEvent) {
    if(ev.isText) {
        _ = ws.send(txt:ev.data, ev.target)
    } else {
        _ = ws.send(bytes:ev.data, ev.target)
    }
}