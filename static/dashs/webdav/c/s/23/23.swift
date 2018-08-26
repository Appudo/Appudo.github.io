import libappudo
import libappudo_run
import libappudo_env

func checkLang() -> Bool {
    var l = Lang.EN_GB
    
    if let host = Page.host,
       Page.has_referer == false,
       host.starts(with:"www"),
       let lang = User.parse_lang {
        var pre = ""
        switch(lang.0) {
            case .DE:
                fallthrough
            case .DE_AT:
                l = .DE
                pre = "de-de"
            default:
                break
        }
        
        if(l != .EN_GB) {
            let param = Page.param ?? ""
            let path = Page.path ?? ""
            _ = Page.redirect(to:Link.to(url:"https://\(pre).appudo.com/" + path +  param))
            return false
        }
    }
    return true
}

public func onGetCache(ev : PageEvent) -> PageCacheResult {
   /*
   if(!checkLang()) {
        return .NOTCACHED
    }
    */

    var entry = "landing"
    var dir = Dir.tmpl_www
    
    /*
    if(Page.host == "store1.appudo.com") {
        entry = "main"
        dir = Dir.tmpl_store
    } 
    else if(Page.host == "appudo.com") {
        _ = Page.redirect(to:Link.to(url:"https://www.appudo.com"))
        return .NOTCACHED
    }
    */

    let v = Get.spf.value
    let s = v.utf8.count
    let p = Page.path
    let t = p == nil || s == 0 ? entry : p!
    if let f = <!dir.open(t, .O_RDONLY) {
        if(p == nil || <!dir.access(p!, mode:.R_OK)) {
            return .CACHED(f)
        }
    }
    Page.error = .NotFound
    return .NOTCACHED
}
