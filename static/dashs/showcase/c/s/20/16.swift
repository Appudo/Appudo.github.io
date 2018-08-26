import libappudo
import libappudo_master
import libappudo_run
import libappudo_env

func main() {
    _ = <!Account.remove("package_test") != false;
    if var a = <!Account.add("package_test", "test", "test", [.MASTER, .EDIT]) {
        _ = <!a.setActive(true)
        _ = <!a.addDomain("bla.master.net") != false;
        if var file = <!Dir.package.open("myPackage.appudo", [.O_RDWR, .O_CREAT]) {
            var k = Package.deploy(a.id, file, "new_")
            if <!k != false {
                let owner = "Owner" + String(describing:a.id.rawValue)
                let crt = <!Dir.certs.open("server.cert.crt", .O_RDONLY)
                let key = <!Dir.certs.open("server.cert.key", .O_RDONLY)
                _ = <!Account.addOwner(owner)
                _ = <!a.updateOwner(owner)
                _ = <!a.addSSLCert("mycert", cert:crt!, key:key!)
                _ = <!Account.linkSSLCert("bla.master.net", cert:"mycert")
            } 
            STATUS(k)
        }
    } else {
    }
    
	printSub();
}

func STATUS(_ v : AsyncBool?) -> Void {
    if(v != nil && v!.hasError == false) {
        print("ok")
    } else {
        print("fail")
        if(v != nil) {
            print(" - ", v!.errorValue)
        } 
    }
}
