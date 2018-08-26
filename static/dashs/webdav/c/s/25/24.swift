
import libappudo
import libappudo_run
import libappudo_env

func main() {
    switch(Page.requestMethod) {
        case .OPTIONS:
            _ = Page.addResultHeader("Allow: COPY, DELETE, GET, HEAD, LOCK, MKCOL, MOVE, OPTIONS, PROPFIND, PROPPATCH, PUT, UNLOCK\r\n")
            _ = Page.addResultHeader("DAV: 1, 2, 3\r\n")
        default:
            break
    }
}


