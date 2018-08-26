import libappudo
import libappudo_run
import libappudo_env
import Foundation

var lastModified = 0

func updateLastModified() {
    let time = Date().to1970
    if(lastModified > time) {
        lastModified += 1 
    } else {
        lastModified = time
    }
}

public func onStart() -> Void {
    _ = <!Dir.cache.remove(".") != false
}

public func onControl(ev : PageEvent) -> Bool {
    if let _ = ev.data as? String  {
        updateLastModified()
    }
    return false
}

func onGetCache(ev : PageEvent) -> PageCacheResult {
    let cache = ev.data as! PageFileCache
    var key = ""
    if let page = Page.path, let pageNum = Int(page) {              // update get variable with the path
        if(pageNum >= 1) {
            key = String(pageNum)
        }
    }
    if(key == "") {
        key = "1"
    }
    Get.page.value = key
    
    let res = Dir.cache.open(key, [.O_RDONLY],
                                         emptyPath:true)            // try to open cache file
    if var dest = <!res {
        if let stat = <!dest.stat_open {                            // check if the client has a valid local version
            if(lastModified <= stat.time_latest.to1970) {
                if(stat.time_latest <= cache.lastModified) {
                    return .NOTMODIFIED
                }
                return .CACHED(dest)
            }
            _ = <!dest.remove() != false
        }
    }
    return .NOTCACHED
}

func onSetCache(ev : PageEvent) -> FileItem? {
    let key = Get.page.value
    let res = Dir.cache.open(key, [.O_CREAT, .O_EXCL, .O_RDWR], 
                                          emptyPath:true)           // try to create the cache file
    if let dest = <!res {
        return dest
    }
    return nil
}

func main() {
    printSub()
}

func MAIN() -> Void {
    var max = 0
    let thePage = Int(Get.page.value) ?? 1
    let itemsPerPage = Int(Setting.itemsPerPage.value) ?? 10
    let offset = (thePage-1)*itemsPerPage
    
    let qry = SQLQry("""
    SELECT pid, users.name, categories.label, head, text, date, nr 
        FROM (SELECT p.id as pid, date, head, text, users_id, categories_id, row_number() 
            OVER (ORDER BY date ASC) AS nr FROM posts as p) as X 
    LEFT JOIN users ON(X.users_id = users.id) 
    LEFT JOIN categories ON(X.categories_id = categories.id) 
    ORDER BY nr DESC
    LIMIT $2::bigint OFFSET $1::bigint
    """)
    qry.values = [offset, itemsPerPage]
    if <!qry.exec() {
        max = qry.get(0, 6).int ?? 0
    }
    
    if(max != 0) {
        let numItems = max + offset
        let numPages = (numItems / itemsPerPage) + (numItems % itemsPerPage != 0 ? 1 : 0)
        POSTS(qry)
        PAGES(numItems, thePage, numPages)
        
        if(thePage != 1) {
            REL_PREV("./\(thePage-1)")
        }
        
        if(thePage != numPages) {
            REL_NEXT("./\(thePage+1)")
        }
        
        printSub()
    } else {
        Page.error = .NotFound
        Page.doCache = false;           // prevent cache on error
    }
    
}

func STYLE() -> Void {
}

func POSTS(_ qry : SQLQry) -> Void {
    for i in 0..<qry.numRows {
        let id = qry.get(i, 0).int ?? 0
        let author = qry.get(i, 1).string ?? ""
        let category = qry.get(i, 2).string ?? ""
        let head = qry.get(i, 3).string ?? ""
        let text = qry.get(i, 4).string ?? ""
        let date = qry.get(i, 5).int ?? 0
        ID(id)
        CATEGORY(category)
        HEAD(head)
        DATE(date)
        TEXT(text)
        AUTHOR(author)
        
        printSub()
    }
}


func ID(_ id : Int) -> Void {
    print(id)
    ID(id)
}

func CATEGORY(_ category : String) -> Void {
    print(category)
}

func HEAD(_ head : String) -> Void {
    print(head)
}

func DATE(_ date : Int) -> Void {
    print(date)
}

func AUTHOR(_ author : String) -> Void {
    print(author)
}

func TEXT(_ text : String) -> Void {
    print(text)
}

func PAGES(_ numItems : Int, _ page : Int, _ numPages : Int) -> Void {
    
    // newer
    if(page != 1) {
        PAGE_LINK()
        PAGE_HREF("./\(page-1)")
    } else {
        PAGE_CURRENT()
    }
    PAGE_LABEL("Newer")
    printSub()
    
    // first
    PAGE_CLASS("first")
    PAGE_LINK()
    PAGE_LABEL("First")
    PAGE_HREF("./")
    PAGE_LONG_SEP()
    printSub()
    
    var begin = page - 2
    
    if(begin <= 0) {
        begin = 1
    }
    
    let upper = begin + 5
    
    // range
    for i in begin..<upper {
        if(i > numPages) {
            break
        }
        
        PAGE_LONG_SEP()
        if(i != page) {
            // else
            PAGE_LINK()
            PAGE_LABEL("\(i)")
            PAGE_HREF("./\(i)")
            printSub()
        } else {
            // current
            PAGE_CURRENT()
            PAGE_LABEL(String(page))
            printSub()
        }
    }
    
    // last
    PAGE_CLASS("last")
    PAGE_LINK()
    PAGE_LABEL("Last")
    PAGE_HREF("./\(numPages)")
    printSub()
    
    // older
    if(page != numPages) {
        PAGE_LINK()
        PAGE_HREF("./\(page+1)")
    } else {
        PAGE_LINK(false)
        PAGE_CURRENT()
    }
    PAGE_LABEL("Older")
    printSub()
    
}

func PAGE_CURRENT(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func PAGE_LINK(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func PAGE_CLASS(_ value : String) -> Void {
    print(value)
}

func PAGE_HREF(_ value : String) -> Void {
    print(value)
}

func PAGE_LABEL(_ value : String) -> Void {
    print(value)
}

func PAGE_SEP(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func PAGE_LONG_SEP(_ out : Bool = true) -> Void {
    if(out) {
        printSub()
    }
}

func REL_PREV_HREF(_ value : String) -> Void {
    print(value)
}

func REL_NEXT_HREF(_ value : String) -> Void {
    print(value)
}

func REL_PREV(_ value : String) -> Void {
    REL_PREV_HREF(value)
    printSub()
}

func REL_NEXT(_ value : String) -> Void {
    REL_NEXT_HREF(value)
    printSub()
}

func PAGE_BLOG_SERVER() -> Void {
    if let m = <!MenuItem.get(Page.root, 1), let c = m.getChildAt(0) {
        print(c.link.toString(true));
    }
}
