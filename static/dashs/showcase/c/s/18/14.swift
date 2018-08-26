import libappudo
import libappudo_run
import libappudo_env
import libappudo_master

func main() {
    _ = <!Dir.download.remove("myPackage.appudo") != false;
    if var file = <!Dir.package.open("myPackage.appudo", [.O_RDWR, .O_CREAT]) {
        var k = Package.fromAccount(Account.current, file, keepPasswords:true)
        if <!k != false {
            _ = <!file.copy("myPackage.appudo", Dir.download) != false
            
            if var f = <!Dir.download.open("myPackage.appudo"), let l = Link.toFile(f) {
                STATUS("ok")
                LINK(l.toString(true))
            }
        } else {
            STATUS("fail")
        }
    } else {
        STATUS("fail")
    }
	printSub();
}

func LINK(_ v : String) -> Void {
    print(v);
}

func STATUS(_ v : String) -> Void {
    print(v);
}


