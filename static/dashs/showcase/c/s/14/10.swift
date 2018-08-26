import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend
import Foundation

struct BlogData : FastCodable {
    let i : String?
    let l : String?
    let h : String?
    let c : String?
    let t : Int?
}

func main() -> Void  {
    if(Page.requestMethod == .POST) {
        switch(Post.t.value) {
            case "c":   // list categories
                doListCategories()
            case "a":   // add item
                doAddItem()
            case "d":   // remove item
                doRemoveItem()
            case "m":   // update item
                doUpdateItem()
            default:
                break
        }
	}
    printSub()
}

func checkLogin() -> Bool {
    if let id = User.logon, let user = <!id.value, <!user.hasGroup(Role.admin) != false {
        _ = User.swap(User.owner)
        return true
    }
    return false
}

func pushUpdate() -> Void {
    if var wsDev = <!Dir.dev1.open("websocket_push_server", [.O_APPUDO]) {
        let ticket = Post.h.value
        if let _ = <!wsDev.write("{\"t\":\"blog\",\"h\":\"\(ticket)\"}") {
        }
    } else {
    }   
    if var wsDev = <!Dir.dev2.open("page_blog", [.O_APPUDO]) {
        let ticket = Post.h.value
        if let _ =  <!wsDev.write("{\"t\":\"blog\",\"h\":\"\(ticket)\"}") {
        }
    } else {
    }   
}

func printCategories() -> Void {
    let qry = SQLQry("SELECT id, label FROM categories")
    if <!qry.exec() {
        var first = true
        print("{")
        for i in 0..<qry.numRows {
            let id = qry.get(i, 0).int ?? 0
            let label = qry.get(i, 1).string ?? ""
            if(!first) {
                print(",")
            } else {
                first = false
            }
            print("\"\(label)\":\"\(id)\"")
        }
        print("}")
    }
}

func doListCategories() -> Void {
    RESULT_DATA();
    RESULT_VALUE("", printer:printCategories)
    RESULT(String(1))
    OP_RESULT()
}

func doAddItem() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
         if let data = BlogData.from(json:json) {
            if let label = data.l {
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("INSERT INTO categories(label)VALUES($1) RETURNING id") :
                                      SQLQry("INSERT INTO posts(date, text, head, users_id, categories_id)VALUES($1,$2,$3,$4,$5) RETURNING id")
                
                if(type == 1) {
                    let user = User.logon!.rawValue
                    let time = Date().to1970
                    let txt = data.l ?? ""
                    let head = data.h ?? ""
                    let cat = data.c ?? ""
                    qry.values = [time, txt, head, user, cat]
                } else {
                    qry.values = [label]
                }
                if <!qry.exec() != false {
                    R_DATA(String(qry.get(0, 0).int ?? 0))
                    res = 1
                    pushUpdate()
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doRemoveItem() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
         if let data = BlogData.from(json:json) {
            if let id = data.i {
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("DELETE FROM categories WHERE id=$1") :
                                      SQLQry("DELETE FROM posts WHERE id=$1")
                qry.values = [id]
                if <!qry.exec() != false {
                    res = 1
                    pushUpdate()
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doUpdateItem() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
         if let data = BlogData.from(json:json) {
            if let id = data.i {
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("UPDATE categories SET label=$2 WHERE id=$1") :
                                      SQLQry("UPDATE posts SET head=$2, text=$3, categories_id=$4 WHERE id=$1")
                if(type == 0) {
                    let label = data.l ?? ""
                    qry.values = [id, label]
                } else {
                    let txt = data.l ?? ""
                    let head = data.h ?? ""
                    let cat = data.c ?? ""
                    qry.values = [id, head, txt, cat]
                }
                if <!qry.exec() != false {
                    res = 1
                    pushUpdate()
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func OP_RESULT(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func RESULT(_ result : String) -> Void {
    print(result)
}

func R_DATA(_ result : String) -> Void {
    RESULT_BEFORE()
    RESULT_AFTER()
    RESULT_DATA()
    RESULT_VALUE(result)
}

func RESULT_DATA(_ out : Bool = true) -> Void {
    printSub()
}

func RESULT_VALUE(_ result : String, printer : (() -> Void)? = nil) -> Void {
    if(printer != nil) {
        printer!()
    } else {
        print(result)
    }
}

func RESULT_BEFORE(_ out : Bool = true) -> Void {
    printSub()
}

func RESULT_AFTER(_ out : Bool = true) -> Void {
    printSub()
}