import libappudo
import libappudo_env
import libappudo_run

func onRun() {
    if var f = <!Dir.dev.open("ws_server", .O_APPUDO) {
        _ = <!f.write("{\"c\":0}")
    }
}
