import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend

/*
 * Only members of the "backend" group are allowed to add new users and groups.
 * The admin users for this use case are members of the "page_admin" group and 
 * not the backend group. To add new users the page run must be owned by a 
 * user that is a member of the backend group.
 */
 
 struct AdminData : FastCodable {
     let id : String?
     let name : String?
     let pwd : String?
     let groups : Int?
     let active : Int?
 }

struct Fail : Error {
    
}

func main() -> Void {
    if(Page.requestMethod == .POST) {
        switch(Post.t.value) {
            case "u":   // list user
                doListUser()
            case "l":   // login user
                doLogin()
            case "k":   // logout user
                doLogout()
            case "a":   // add user
                doAddUser()
            case "d":   // delete user
                doDeleteUser()
            case "m":   // update user
                doUpdateUser()
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

func pushLogin(_ login : Bool = true) -> Void {
    if var wsDev = <!Dir.dev.open("websocket_push_server", [.O_APPUDO]) {
        let ticket = Post.h.value
        if let _ = <!wsDev.write(login ? "{\"t\":\"login\",\"h\":\"\(ticket)\"}" : "{\"t\":\"logout\",\"h\":\"\(ticket)\"}") {

        }
    } else {
    }
}

func pushUpdate() -> Void {
    if var wsDev = <!Dir.dev.open("websocket_push_server", [.O_APPUDO]) {
        let ticket = Post.h.value
        if let _ = <!wsDev.write("{\"t\":\"user\",\"h\":\"\(ticket)\"}") {
        }
    } else {
    }
}

func doListUser() -> Void {
    if(checkLogin()) {
        ITEM(true)
        USER_LIST()
    } else {
        NEED_LOGIN()
    }
}

func doAddUser() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = AdminData.from(json:json) {
            let name = data.name ?? ""
            let pwd = data.pwd  ?? ""
            let groups = data.groups ?? 0
            let active = data.active ?? 0
            if var a = <!User.add(name, pwd, active == 1) {
                do {
                    if((groups & 1) != 0) {
                        if <!a.addGroup(Role.admin) == false {
                            throw Fail()
                        }
                    }
                    if((groups & 2) != 0) {
                        if <!a.addGroup(Role.files) == false {
                            throw Fail()
                        }
                    }
                    if <!a.setOwner(User.owner, Role.admin) == false {
                        throw Fail()
                    }
                    RESULT_DATA(String(a.id.rawValue))
                    pushUpdate()
                    res = 1
                } catch {
                    _ = <!a.remove() != false
                }
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func toggleGroup(_ u : User, _ group : GroupID, _ v :Bool) throws -> Void {
    let r = <!u.hasGroup(group) != false
    if(r) {
        if(!v) {
            if <!u.removeGroup(group) == false {
                throw Fail()
            } 
        }
    } else {
        if(v) {
            if <!u.addGroup(group) == false {
                throw Fail()
            } 
        }
    }
}

func doUpdateUser() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = AdminData.from(json:json) {
            if let ids = data.id {
                let id = CInt(ids) ?? -1
                if var u = <!UserID(id).value {
                    let groups = data.groups ?? 0
                    let active = data.active ?? 0
                    do {
                        if let pwd = data.pwd {
                            if <!u.setPassword(pwd) == false {
                                throw Fail()
                            }
                        }
                        
                        try toggleGroup(u, Role.admin, (groups & 1) != 0)
                        try toggleGroup(u, Role.files, (groups & 2) != 0)
                        
                        if <!u.setActive(active != 0) == false {
                                throw Fail()
                        }
                        
                        res = 1
                        pushUpdate()
                    } catch {
                    
                    } 
                }
                
            }
        }  
    }
    RESULT(String(res))
    OP_RESULT()
}

func doDeleteUser() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = AdminData.from(json:json) {
            if let ids = data.id {
                let id = CInt(ids) ?? -1
                if var u = <!UserID(id).value {
                    if <!u.remove() {
                        res = 1
                        pushUpdate()
                    }
                }
                
            }
        }  
    }
    RESULT(String(res))
    OP_RESULT()
}

func doLogin() -> Void {
    let json = Post.d.value
    var res = 0
    if let data = AdminData.from(json:json) {
        let name = data.name ?? ""
        let pwd = data.pwd  ?? ""
        if <!User.login(name, pwd) != false {
            if(checkLogin()) {
                pushLogin() 
                res = 1
            } else {
                User.logout()
            }
        }
    }  
    RESULT(String(res))
    OP_RESULT()
}

func doLogout() -> Void {
    User.logout()
    _ = User.swap(User.owner)
    pushLogin(false) 
    RESULT("1")
    OP_RESULT()
}

func USER_LIST(_ out : Bool = true) -> Void {
    if(out) {
        SEP(false)
    	printSub()
	}
}

func ITEM(_ admin : Bool) -> Void {
    if(admin == false) {
        return
    }
    if let l = <!User.listOwned(Role.admin, withGroups:true) {
        for item in l {
            var groups = 0
            ID(item.id)
            NAME(item.name)
            ACTIVE(item.active)
            if(item.numGroups != 0) {
                for group in 0..<item.numGroups {
                    switch(item.getGroupAt(group)) {
                        case Role.admin:
                          groups |= 1 
                        case Role.files:
                          groups |= 2
                        default:
                        break
                    }
                }
            }
            GROUPS(groups)
            printSub()
        }
    }
}

func NAME(_ name : String) -> Void {
    print(name)
}

func GROUPS(_ groups : Int) -> Void {
    print(groups)
}

func SEP(_ sep : Bool) -> Void {
    if(sep) {
        printSub()
    }
    SEP(true)
}

func NEED_LOGIN(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func ID(_ id : Int32) -> Void {
    print(id)
}

func ACTIVE(_ active : Bool) -> Void {
    print(active ? 1 : 0)
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