
import libappudo
import libappudo_run
import libappudo_env
import libappudo_master

public func onGetCache(ev : PageEvent) -> PageCacheResult {
    if let p = Page.path,
       let f = <!Dir.acme.open(p, .O_RDONLY) {
        return .CACHED(f)
    }
    Page.error = .NotFound
    return .NOTCACHED
}

