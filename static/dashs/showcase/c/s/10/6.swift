import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend

struct PollData : FastCodable {
    let i : String?
    let l : String?
    let t : Int?
    let c : Int?
}

func main() -> Void {
    if(Page.requestMethod == .POST) {
        switch(Post.t.value) {
            case "l":   // list poll
                doListPoll()
            case "a":   // add item
                doAddItem()
            case "d":   // remove item
                doRemoveItem()
            case "m":   // update item
                doUpdateItem()
            case "c":   // reset poll
                doResetPoll()
            case "v":   // vote
                doVote()
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
    if var wsDev = <!Dir.dev.open("websocket_push_server", [.O_APPUDO]) {
        let ticket = Post.h.value
        if let _ = <!wsDev.write("{\"t\":\"poll\",\"h\":\"\(ticket)\"}") {
        }
    } else {
    }   
}

func doVote() -> Void {
    let json = Post.d.value
    let hasCookie = Int(Cookie.s.value) ?? 0
    var res = 0
    if(hasCookie == 0) {
        if let data = PollData.from(json:json) {
            if let id = data.i {
                let qry = SQLQry("UPDATE options SET value=value+1 WHERE id=$1")
                qry.values = [id]
                if <!qry.exec() != false {
                    Cookie.s.set("1", expire:0)
                    res = 1
                    pushUpdate()
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doAddItem() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = PollData.from(json:json) {
            if let label = data.l {
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("INSERT INTO polls(label)VALUES($1) RETURNING id") :
                                      SQLQry("INSERT INTO options(label, poll_id, value)VALUES($1,$2, 0) RETURNING id")
                
                if(type == 1) {
                    let id = data.i ?? "0"
                    qry.values = [label, id]
                } else {
                    qry.values = [label]
                }
                if <!qry.exec() != false {
                    RESULT_DATA(String(qry.get(0, 0).int ?? 0))
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
        if let data = PollData.from(json:json) {
            if let id = data.i {
                let label = data.l ?? ""
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("UPDATE polls SET label=$1 WHERE id=$2") :
                                      SQLQry("UPDATE options SET label=$1 WHERE id=$2")
                qry.values = [label, id]
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

func doRemoveItem() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = PollData.from(json:json) {
            if let id = data.i {
                let type = data.t ?? 0 
                let qry = type == 0 ? SQLQry("DELETE FROM polls WHERE id=$1") :
                                      SQLQry("DELETE FROM options WHERE id=$1")
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

func doResetPoll() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) { 
        if let data = PollData.from(json:json) {
            if let id = data.i {
                let clear = data.c ?? 0
                let qry = SQLQry("UPDATE options SET value=0 WHERE poll_id=$1")
                qry.values = [id]
                if <!qry.exec() != false {
                    if(clear != 0) {
                        Cookie.s.remove()
                    }
                    res = 1
                    pushUpdate()
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doListPoll() -> Void {
    let hasCookie = Int(Cookie.s.value) ?? 0
    let id = Int(Setting.defaultID.value) ?? 0
    let qry = SQLQry("SELECT id, label FROM polls WHERE id=$1;")
    qry.values = [id]
    if <!qry.exec(), let id = qry.get(0, 0).int {
        let label = qry.get(0, 1).string ?? ""
        ID(id)
        RESULT(label)
        RESULT_VALUE(String(hasCookie))
        ITEM(id)
        POLL_LIST()
    } else {
        RESULT(String(0))
        OP_RESULT()
    }
    qry.close()
}

func POLL_LIST(_ out : Bool = true) -> Void {
    if(out) {
        SEP(false)
    	printSub()
	}
}

func ITEM(_ id : Int) -> Void {
    let qry = SQLQry("SELECT id, label, value FROM options WHERE poll_id = $1;")
    qry.values = [id]
    if <!qry.exec() {
        for i in 0..<qry.numRows {
            let id = qry.get(i, 0).int ?? 0
            let label = qry.get(i, 1).string ?? ""
            let value = qry.get(i, 2).int ?? 0
            ID(id)
            LABEL(label)
            VALUE(value)
            printSub()
        }
    }
}

func ID(_ id : Int) -> Void {
    print(id)
}

func LABEL(_ label : String) -> Void {
    print(label)
}

func VALUE(_ value : Int) -> Void {
    print(value)
}

func SEP(_ sep : Bool) -> Void {
    if(sep) {
        printSub()
    }
    SEP(true)
}

func OP_RESULT(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func RESULT(_ result : String) -> Void {
    print(result)
}

func RESULT_DATA(_ result : String) -> Void {
    RESULT_VALUE(result)
    printSub()
}

func RESULT_VALUE(_ result : String) -> Void {
    print(result)
}