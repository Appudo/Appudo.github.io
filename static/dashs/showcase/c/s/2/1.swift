import libappudo
import libappudo_run
import libappudo_env

func header() {
	
}

func main() {
	printSub();
}

func SDIR() -> Void {
    print(Dir.stream.name);
}

func WSSTREM_SERVER() -> Void {
    if let m = <!MenuItem.get(Page.root, 1), let c = m.getChildAt(0) {
        print(c.link.toString());
    }
}

