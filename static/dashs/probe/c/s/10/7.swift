
import libappudo
import libappudo_run
import libappudo_env
import libappudo_backend

func deleteDir(_ d : FileItem) -> Bool {
    var err = AsyncError()
    if let list = <!d.listDir() {
        for f in list {
            if (err <! f.remove()) == false {
                print(err)
                return false
            }
        }
        return true
    } else {
        return false
    }
}

func deleteSql(_ qry : SQLQry) -> Bool {
    if <!qry.exec() != false {
        return true
    }
    return false
}

func main() {
    if let m = <!MenuItem.get(Page.current, 1, shift:1),
       <!Setting.update(m.id, "checks_enabled", "1") != false,
       deleteDir(Dir.log),
       deleteDir(Dir.tmp),
       deleteDir(Dir.run_binary),
       deleteDir(Dir.module_source),
       deleteDir(Dir.kernel_source),
       deleteDir(Dir.module_gen_source),
       deleteDir(Dir.disassembly),
       <!SQLQry.begin() != false,
       deleteSql(SQLQry("TRUNCATE settings RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE runs RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE run_instances RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE modue_instances RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE groups RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE user_groups RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE users_register RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE users RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE modules RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE probes_settings RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE probes RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE probes_active RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE repositories RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE disassembly_files RESTART IDENTITY CASCADE;")),
       deleteSql(SQLQry("TRUNCATE disassembly RESTART IDENTITY CASCADE;")),
       <!SQLQry.end() != false {
        print("ok")
        return
    }
    
    print("fail")
    
}