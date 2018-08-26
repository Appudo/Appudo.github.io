
import libappudo
import libappudo_run
import libappudo_env

public func onGetCache(ev : PageEvent) -> PageCacheResult {
    let v = Get.spf.value
    let s = v.utf8.count
    let c = ev.data as! PageFileCache
    let p = Page.path
    let t = p == nil || s == 0 ? "main" : p!
    if let f = <!Dir.tmpl.open(t, .O_RDONLY) {
        if(p == nil || <!Dir.tmpl.access(p!, mode:.R_OK)) {
            return .CACHED(f)
        }
    }
    Page.error = .NotFound
    return .NOTCACHED
}
