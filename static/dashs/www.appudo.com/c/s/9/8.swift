import libappudo
import libappudo_run
import libappudo_env

public func onGetCache(ev : PageEvent) -> PageCacheResult {
    var dir = Dir.tmpl_www
    if let f = <!dir.open("noiesupport", .O_RDONLY) {
        return .CACHED(f)
    }
    Page.error = .NotFound
    return .NOTCACHED
}