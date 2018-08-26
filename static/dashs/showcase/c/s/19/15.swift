import libappudo
import libappudo_run
import libappudo_env

func header() {
	
}

func main() { 
    if var a = <!Account.get("package_test") {
        print(a)
        if var file = <!Dir.package.open("myPackage.appudo", [.O_RDWR, .O_CREAT]) {
            var k = Package.deploy(a.id, file, "new3_")
            if <!k != false {
                print(true)
            } 
        }
    }
	printSub();
}


