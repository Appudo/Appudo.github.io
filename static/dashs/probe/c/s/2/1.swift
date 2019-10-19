
import libappudo
import libappudo_run
import libappudo_env

struct RegData : FastCodable {
    let url : String
    let name : String
    let ticket : String
    let lID : Int?
}

func onControl(ev : PageEvent) -> ControlResult {
    let outBuffer = ManagedCharBuffer.create(128)
    if let data = RegData.from(json:ev.data as? String ?? ""),
       let kn = <!libappudo.URL.encode(data.ticket, outBuffer),
       let ticket = outBuffer.toString(kn),
       let nn = <!libappudo.URL.encode(data.name, outBuffer),
       let name = outBuffer.toString(nn) {
        NAME(name)
        TICKET(ticket)
        URL("\(data.url)probe.html#login/recover")
        Page.skinId = UInt32(data.lID ?? 1)
        return .OK
    }
    return .ABORT
}

func main() {
	printSub()
}

func SUBJECT() -> Void {
    if var s = readSub() {
        print(String(format: "%08d", s.utf8.count))
        print(s)
    }
}

func URL(_ url : String) -> Void {
    print(url)
}

func NAME(_ name : String) -> Void {
    print(name)
}

func TICKET(_ ticket : String) -> Void {
    print(ticket)
}
