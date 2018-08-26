import libappudo
import libappudo_env
import libappudo_run

// 1. ffmpeg -i BigBuckBunny.mp4  -vf scale=854x480  -b:v 400k  -movflags frag_keyframe+empty_moov+default_base_moof -frag_size 131072 bunny_int.mp4
// 2. fix duration
// 3. extract segments

struct StreamData : FastCodable {
    let offset : Int
    let len : Int
}

func onMessage(ev : WebSocketEvent) {
    let json = ev.data as! String
    if let data = StreamData.from(json:json) {
        let offset = data.offset
        let len = data.len
        
        if let file = <!Dir.video.open("bunny.mp4", [.O_RDONLY]) {
            _ = ws.send(bytes:file.getView(offset, len), ev.target)
        }
    }
}
