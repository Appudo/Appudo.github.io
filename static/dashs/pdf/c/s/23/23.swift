
import libappudo
import libappudo_run
import libappudo_env

struct Param : FastCodable {
    let name : String
}

func onControl(ev : PageEvent) -> ControlResult {
    if let p = Param.from(json:ev.data as? String ?? "") {
        NAME(p.name)
    }
    return .OK
}

func main() {
	printSub()
}

func NAME(_ v : String) -> Void {
    print(v)
}
