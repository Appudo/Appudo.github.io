import libappudo
import libappudo_env
import libappudo_run
import libappudo_backend

struct DownloadData : FastCodable {
    let t : Int?
    let p : Int?
    let r : String?
    let f : String?
    let d : [String]?
}

struct CopyData : FastCodable {
    let f : String?
    let t : String?
    let m : Int?
    let d : [String]?
}

struct RenameData : FastCodable {
    let p : String?
    let f : String?
    let t : String?
}

struct CopyInfo : FastCodable {
    let f : String?
    let t : String?
}

struct Fail : Error {
    
}
             
func onUpload(ev : PageEvent) -> UploadResult {
    var ret : FileItem? = nil
    var res = 0
    if(Post.t.value == "u" && checkLogin()) {
        if let data = ev.data as? UploadData, var p = data.parent == nil ? Dir.download : <!Dir.download.open(data.parent!) {
            let pub = Int(Post.h.value) ?? 0
            let mode : FileItem.Mode = pub == 1 ? [ .U0600, .G0060, .O0004 ] : [ .U0600, .G0060 ]
            if <!User.swap(User.owner) != false && <!Group.swap(Role.files) != false {
                do {
                    let dir = data.subDir
                    var k : FileItem? = nil
                    if(dir != nil) {
                        if let m = <!p.open(dir!), <!m.access() != false {
                            p = m
                        } else {
                            k = <!p.mkpath(dir!, [mode, .U0100, .G0010, .O0001])
                            if(k != nil) {
                                p = k!
                            } else {
                                throw Fail()
                            }
                        }
                    }
                    if(data.type == .DIR) {
                        ret = <!p.mkpath(data.name, [mode, .U0100, .G0010, .O0001])
                    } else {
                        ret = <!p.open(data.name, [.O_CREAT, .O_EXCL, .O_RDWR], mode)
                    }
                    if ret != nil {
                        res = 1
                        pushUpdate()
                    }
                } catch {
                    
                }
                _ = User.swap();
                _ = Group.swap();
            }
    
            if(res == 0) {
                return .ABORT
            }
        }
    }
    
    RESULT(String(res))
    OP_RESULT()
        
    if(ret != nil) {
        return .OK(ret!);
    }
    
    return .ABORT
}

func header() {
	
}

func main() {
    if(Page.requestMethod == .POST) {
        switch(Post.t.value) {
            case "d":
                fallthrough
            case "l":
                doList()
            case "f":
                doFileInfo()
            case "r":
                doRemove();
            case "n":
                doAdd()
            case "a":
                doRename()
            case "c":
                doCopy()
            case "p":
                doChangeProt()
            case "u":
                fallthrough
            default:
                break
        }
        
        printSub()
    }
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
        if let _ = <!wsDev.write("{\"t\":\"download\",\"h\":\"\(ticket)\"}") {
        }
    } else {
    }   
}

func printFile(_ c : FileItem, dir : Bool = true) -> Void {
    if let list = <!c.listDir() {
        for f in list {
            _printFile(f, dir:dir)
        }
    } else {
        print("\"error\"")
    }
}

func _printFile(_ c : FileItem, dir : Bool = true) -> Void {
    if let stat = <!c.stat {
        if(stat.isFileNotDir != dir) {
            let l = Link.toFile(c)!
            HREF("/" + l.toString())
            PATH(c.path)
            NAME(c.name)
            PARENT(dir)
            PUBLIC(stat.mode.has(.O0004))
            SIZE(stat.size)
            printSub()
        }
    }
}

func doList() -> Void {
    _ = User.swap(User.owner)
    let path = Post.p.value
    ITEM_LIST()
    ITEM(path)
}

func doFileInfo() -> Void {
    _ = User.swap(User.owner)
    FILE_INFO()
}

func doAdd() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = DownloadData.from(json:json) {
            let type = data.t ?? 0
            let pub = data.p ?? 0
            let path = data.r ?? "";
            var name = data.f ?? "";
            let mode : FileItem.Mode = pub == 1 ? [ .U0600, .G0060, .O0004 ] : [ .U0600, .G0060 ]
            var f : FileItem? = nil 
            if(type == 1) {
                if(path != "") {
                    name = path + "/" + name
                }
                f = <!Dir.download.open(name, [.O_CREAT, .O_EXCL], mode)
            } else {
                var dir : FileItem? = Dir.download
                if(path != "") {
                    dir = <!Dir.download.open(path)
                }
                
                if(dir != nil) {
                    f = <!dir!.mkpath(name, [mode, .U0100, .G0010, .O0001])
                }
            }
            if let tf = f {
                _ = <!tf.setOwner(UserID(-1), Role.files) != false;
                res = 1
                pushUpdate()
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doCopy() -> Void {
    let json = Post.d.value
    var res = 0
    var err = [Int]()
    if(checkLogin()) {
        if let data = CopyData.from(json:json) {
            let from_path = data.f ?? ""
            let to_path = data.t ?? ""
            let move = data.m ?? 0
            var idx = 0;
            if var d = data.d {
                for item in d {
                    var from : String = "";
                    var to : String = "";
                    if let cinfo = CopyInfo.from(json:item) {
                        from = cinfo.f ?? ""
                        to = cinfo.t ?? from
                    } else {
                        from = item
                        to = item
                    }
                    if var f = <!Dir.download.open(from_path + "/" + from), let td = <!Dir.download.open(to_path) {
                        if(move == 0) {
                            if(<!f.copy(to, td) == false) {
                                err.append(idx)
                            }
                        } else {
                            if(<!f.rename(to, td) == false) {
                                err.append(idx)
                            }
                        }
                    } else {
                        err.append(idx)
                    }
                    idx += 1;
                }
            }
        }
        if(err.count == 0) {
            res = 1
        } else {
            RESULT_DATA(String(describing:err));
        }
        pushUpdate()
    }
    RESULT(String(res))
    OP_RESULT()
}

func doRename() -> Void {
    let json = Post.d.value
    var res = 0
    if(checkLogin()) {
        if let data = RenameData.from(json:json) {
            let path = data.p ?? ""
            let from = data.f ?? ""
            let to = data.t ?? ""
            if var f = <!Dir.download.open(path + "/" + from) {
                res = <!f.rename(to) ? 1 : 0
                pushUpdate()
            }
        }
    }
    RESULT(String(res))
    OP_RESULT()
}

func doChangeProt() -> Void {
    let json = Post.d.value
    var res = 0
    var err = [Int]()
    if(checkLogin()) {
        if let data = DownloadData.from(json:json) {
            let pub = data.p ?? 0
            var idx = 0;
            if var d = data.d {
                for f in d {
                    do {
                        if let f = <!Dir.download.open(f) {
                            let mode : FileItem.Mode = pub == 1 ? [.U0400, .G0040, .O0004] : [.U0400, .G0040]
                            if <!f.setMode(mode) == false {
                                throw Fail()
                            }
                        } else {
                            throw Fail()
                        }
                    } catch {
                        err.append(idx)
                    }
                    idx += 1;
                } 
            }
        }
        if(err.count == 0) {
            res = 1
        } else {
            RESULT_DATA(String(describing:err));
        }
        pushUpdate()
    }
    RESULT(String(res))
    OP_RESULT()
}

func doRemove() -> Void {
    let json = Post.d.value
    var res = 0
    var err = [Int]()
    if(checkLogin()) {
        if let data = DownloadData.from(json:json) {
            var idx = 0;
            if var d = data.d {
                for f in d {
                    if <!Dir.download.remove(f) == false {
                        err.append(idx)
                    }
                    idx += 1
                } 
            }
        }
        if(err.count == 0) {
            res = 1
        } else {
            RESULT_DATA(String(describing:err));
        }
        pushUpdate()
    }
    RESULT(String(res))
    OP_RESULT()
}

func ITEM_LIST(_ out : Bool = true) -> Void {
    if(out) {
        SEP(false)
        printSub()  
    }
}

func FILE_INFO(_ out : Bool = true) -> Void {
    if(out) {
        let dir = Dir.download
        let path = Post.p.value
        if let d = <!dir.open(path) {
            _printFile(d, dir:false)
        }
    }
}

func ITEM(_ path : String) -> Void {
    var dir = Dir.download
    let root = Post.r.value != ""
    let d = Post.t.value == "d"
    if(!root && path != "") {
        if let d = <!dir.open(path) {
            dir = d
        } else {
            return
        }
    }
    if(root) {
        _printFile(dir, dir:d)
    }  else {
        printFile(dir, dir:d)
    }
}

func HREF(_ href : String) -> Void {
    print(href)
}

func NAME(_ name : String) -> Void {
    print(name)
}

func PATH(_ path : String) -> Void {
    print(path)
}

func PARENT(_ parent : Bool) -> Void {
    print(parent ? 1 : 0)
}

func PUBLIC(_ PUBLIC : Bool) -> Void {
    print(PUBLIC ? 1 : 0)
}

func SIZE(_ size : Int) -> Void {
    print(size)
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
