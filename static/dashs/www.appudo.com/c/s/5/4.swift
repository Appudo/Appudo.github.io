
import libappudo
import libappudo_run
import libappudo_env

public func onGetCache(ev : PageEvent) -> PageCacheResult {
    let entry = "local_storage"
    let dir = Dir.tmpl_www
    if let f = <!dir.open(entry, .O_RDONLY) {
        return .CACHED(f)
    }
    Page.error = .NotFound
    return .NOTCACHED
}