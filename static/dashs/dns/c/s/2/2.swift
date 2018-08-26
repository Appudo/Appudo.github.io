
import libappudo
import libappudo_run
import libappudo_env

struct DNSInfo : FastCodable {
    let dmn : String 
    let IPv4 : String?
    let IPv6 : String?
    let ser : String?
    let reverse : Bool?
}

func onControl(ev : PageEvent) -> ControlResult {
    if let data = DNSInfo.from(json:ev.data as? String ?? "") {
        let reverse = data.reverse ?? false
        if(reverse) {
            REVERSE_ORIGIN("origin")
            REVERSE_PTR("ip")
            DOMAIN("domain")
            REVERSE()
        } else {
            DOMAIN(data.dmn)
            if let ip = data.IPv4 {
                WITH_IPV4(ip)
            }
            if let ip = data.IPv6 {
                WITH_IPV6(ip)
            }
            
            
            SERIAL(data.ser ?? "0")
            NORM()
        }
        return .OK
    }
    return .ABORT
}

func main() {
	printSub()
}

func NORM(out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func REVERSE(out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func IPV4(_ ip : String) -> Void {
    print(ip)
}

func WITH_IPV4(_ ip : String) -> Void {
    IPV4(ip)
    printSub()
}

func IPV6(_ ip : String) -> Void {
    print(ip)
}

func WITH_IPV6(_ ip : String) -> Void {
    IPV6(ip)
    printSub()
}

func DOMAIN(_ dmn : String) -> Void {
    print(dmn)
}

func REVERSE_PTRS() -> Void {
    printSub()
}

func REVERSE_ORIGIN(_ origin : String) -> Void {
    print(origin)
}

func REVERSE_PTR(_ ptr : String) -> Void {
    print(ptr)
}

func SERIAL(_ ptr : String) -> Void {
    print(ptr)
}