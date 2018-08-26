
import libappudo
import libappudo_run
import libappudo_env

/*
 * The GET varibale name is used and transferred to the template.
 * A PDF named target.pdf is created from the template in 
 * the out directory and served as a result to the request.
 * The template has an embedded image and some html items. 
 */
func main() {
    if var f = <!Dir.dev.open("template", .O_APPUDO),
       let t = <!Dir.out.open("target.pdf", [.O_CREAT, .O_RDWR]),
       let _ = <!f.write("{\"name\":\"\(Get.name.value)\"}"),
       <!PDF.create(f, t, margin:"0") != false {
       send(t)
       _ = Page.setMime("pdf")
    } else {
        Page.error = .NotFound
    }
    
}


