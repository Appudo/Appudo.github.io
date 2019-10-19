
import libappudo
import libappudo_run
import libappudo_env

struct RegData : FastCodable {
    let url : String
    let mail : String
    let ticket : String
    let lID : Int?
}

func onControl(ev : PageEvent) -> ControlResult {
    let outBuffer = ManagedCharBuffer.create(128)
    if let data = RegData.from(json:ev.data as? String ?? ""),
       let kn = <!libappudo.URL.encode(data.ticket, outBuffer),
       let ticket = outBuffer.toString(kn),
       let nn = <!libappudo.URL.encode(data.mail, outBuffer),
       let mail = outBuffer.toString(nn) {
        MAIL(mail)
        TICKET(ticket)
        URL("\(data.url)probe.html#login/register")
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

func MAIL(_ mail : String) -> Void {
    print(mail)
}

func TICKET(_ ticket : String) -> Void {
    print(ticket)
}
