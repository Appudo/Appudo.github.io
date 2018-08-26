import libappudo
import libappudo_run
import libappudo_env

func header() {
	
}

func main() {
	printSub();
}

func MAIN() -> Void {
	printSub();
}

func STYLE() -> Void {
	printSub();
}

func PAGE_ADMIN_SERVER() -> Void {
    if let m = <!MenuItem.get(Page.root, 1), let c = m.getChildAt(0) {
        print(c.link.toString(true));
    }
}
