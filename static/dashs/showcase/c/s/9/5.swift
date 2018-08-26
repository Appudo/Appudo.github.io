import libappudo
import libappudo_run
import libappudo_env

func header() {
	
}

func main() {
	printSub();
}

func WSPUSH_SERVER() -> Void {
    if let m = <!MenuItem.get(Page.root, 1), let c = m.getChildAt(0) {
        print(c.link.toString());
    }
}

func PAGE_STREAM() -> Void {
    if let m = <!MenuItem.get(Page.root, 0, shift:3) {
        print(m.link.toString(true));
    }
}

func PAGE_CHAT_SKIN() -> Void {
    if let m = <!MenuItem.get(Page.root, 1, shift:1), let c = m.getChildAt(1) {
        print(c.link.toString(true));
    }
}

func PAGE_ADMIN_SERVER() -> Void {
    if let m = <!MenuItem.get(Page.root, 1, shift:-4), let c = m.getChildAt(0) {
        print(c.link.toString());
    }
}

func PAGE_ADMIN() -> Void {
    if let m = <!MenuItem.get(Page.root, 0, shift:-4) {
        print(m.link.toString(true));
    }
}

func PAGE_BLOG() -> Void {
    if let m = <!MenuItem.get(Page.root, 0, shift:-3) {
        print(m.link.toString(true));
    }
}

func PAGE_DOWNLOAD() -> Void {
    if let m = <!MenuItem.get(Page.root, 0, shift:-2) {
        print(m.link.toString(true));
    }
}

func PAGE_POLL() -> Void {
    if let m = <!MenuItem.get(Page.root, 0, shift:-1) {
        print(m.link.toString(true));
    }
}

