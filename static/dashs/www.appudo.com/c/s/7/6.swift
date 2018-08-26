
import libappudo
import libappudo_run
import libappudo_env
import Foundation

struct HashData : FastCodable, FastJSONMarkerUpdater {
    let tick: Int
    let time: Int
    var begin: FastJSONMarker?
    let hash: String
    var end: FastJSONMarker?
    
    mutating func updateMarker(_ key : CodingKey, _ value : Int){
        switch(key) {
            case CodingKeys.begin:
                begin = .Value(value)
            case CodingKeys.end:
                end = .Value(value)
            default:
                break
        }
    }
    
    mutating func getHash() -> (String, String) {
        let buffer = ManagedCharBuffer.create(512)
        let out = ManagedCharBuffer.create(512)
        let hv = jsonUpdate() ?? "nope"
        if let hm = <!HMAC.create(hv, secret, buffer, exclude:Int32(begin!.rawValue)...Int32(end!.rawValue), flags:.MD5),
           let em = <!Base64.encode(buffer, out, inSizeLimit:hm),       
           let s = out.toString(em) {
           return (hv, s)
        }
        return ("", "")
    }
}

var tick : Int = 0
var secret : String = createSecret()

public func createSecret() -> String {
    let buffer = ManagedCharBuffer.create(512)
    let out = ManagedCharBuffer.create(512)
    if let rl = <!Rand.bytes(buffer, sizeLimit:16),
       let hm = <!Base64.encode(buffer, out, inSizeLimit:rl) {
        return out.toString(hm) ?? ""
    }
    return ""
}

func main() {
    var res = 1
    if(Page.requestMethod == .POST) {
        
        if(Post.comment.value == "" && 
           Post.mail.value != "" && 
           Post.msg.value != "" && 
           Post.hash.value != ""),
           var data = HashData.from(json:Post.hash.value),
           Date().to1970 - data.time > 5 {
            data.begin = .Before(0)
            data.end = .After(0)
            let r = data.getHash()
            if(r.1 == data.hash) {
                var m = Mail()
                var body = "mail: " + Post.mail.value
                body += "\ntext: " + Post.msg.value
                if <!m.send("contact@appudo.com", "[APPUDO CONTACT]", body) {
                    print("{\"r\":0}")
                    return
                }
            }
        }
        print("{\"r\":1}")
    } else {
        hashGen()
    }
    printSub()
}

func hashGen() -> Void {
    var data = HashData(tick:tick, time:Date().to1970, begin:.Before(0), hash:"", end:.After(0))
    let res = data.getHash()
    let hv = res.0.prefix(data.begin!.rawValue) + "\"hash\":\"\(res.1)\"}"
    tick = tick &+ 1
    print(hv)
}