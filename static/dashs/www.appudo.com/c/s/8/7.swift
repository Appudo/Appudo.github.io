
import libappudo
import libappudo_run
import libappudo_env

func preHeader() {
	
}

func main() {
    switch(Get.t.value) {
        case "api":
            _ = Page.redirect(to:Link.to(url:"https://www.appudo.com/pub/api/docs_\(Get.v.value)/index.html"))
        case "doc":
            _ = Page.redirect(to:Link.to(url:"https://www.appudo.com/doc/"))
        case "howto":
            _ = Page.redirect(to:Link.to(url:"https://www.appudo.com/doc/edit"))
        default:
            break
    }
}