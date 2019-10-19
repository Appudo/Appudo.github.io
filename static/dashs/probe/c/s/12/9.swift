
import libappudo
import libappudo_run
import libappudo_env


func main() {
/*
   var err = AsyncError()
    if let target = err <! FileItem.create_tmp() {
        let client = HTTPClient.get(.GET, Link.to(url:"https://cdn.kernel.org/pub/linux/kernel/v4.x/linux-4.19.tar.xz"))
        /*
        if <!client.send(result:target) {
            send(client.bodyData!)
        }*/
         
        _ = client.send(result:target).then({ (_ res : Bool) -> Void in 
            print(res)
        })
        }
        */
        /*
    var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.bin.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_runner", "make", "123"], env:["PATH=/usr/lib:/usr/bin:/usr/sbin:/sbin:/bin"], cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
    */
        /*
    var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.bin.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_archiver", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_archiver", "123"], env:["PATH=/usr/lib"], cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
    */
    
    
    /*
    var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("clang-9", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["clang-9", "-v", "test.c", "-o", "test"], env:["PATH=/bin:/usr/bin:/usr/lib:/lib:/lib64:/usr/lib64"], cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:.SUID) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
        var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open(".", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_runner", "printenv" ], env:["PATH=/bin:/usr/bin:/usr/lib:/lib:/lib64:/usr/lib64"], cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:[.SUID,.ADD_PWD]) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
    */
    /*
        var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open("267008", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_runner", "make", "CC='gcc -includeprobe_kernel_fix.h -I${PWD}/../../probe_kernel_fix'", "ARCH=x86", "INSTALL_HDR_PATH=out", "defconfig"], 
                                            env:["PATH=../../probe_bin:/usr/bin:/usr/sbin:/sbin:/bin"], 
                                            cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:[.SUID, .ADD_PWD]) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
    */
    /*
        var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let dir = err <! Dir.tmp.open("267008", .O_DIRECTORY),
       let bin = err <! Dir.bin.open("appudo_runner", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["appudo_runner", "make", "KBUILD_CFLAGS=-includeprobe_kernel_fix.h -I${PWD}/../../probe_kernel_fix", "ARCH=x86", "INSTALL_HDR_PATH=out", "prepare"], 
                                            env:["PATH=../../probe_bin:/usr/bin:/usr/sbin:/sbin:/bin"], 
                                            cwd:dir, .IO(stdout:outFile, stderr:errFile), flags:[.SUID, .ADD_PWD]) {
            print("ok")
        } else {
            print("error", err)
        }
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
    }
    */
    
        var err = AsyncError()
    if var errFile = err <! FileItem.create_tmp(),
       var outFile = err <! FileItem.create_tmp(),
       let bin = err <! Dir.bin.open("clang", .O_RDONLY) {
        if let _ = err <! Process.exec(bin, args:["clang", "--target=aarch64-unknown-linux-gnu", "-print-canonical-triple"], env:["PATH=/usr/lib"], .IO(stdout:outFile, stderr:errFile), flags:.SUID),
           let txt = <!outFile.readAsText(offset:0) {
            print(String(txt.dropLast())) 
        } else {
            
        print(<!errFile.readAsText(offset:0) ?? "")
        print(<!outFile.readAsText(offset:0) ?? "")
        }
    }

	printSub()
	
}