import { getLyric } from '@/api/song'
import { Base64 } from 'js-base64'    //base64解析
export default class Song{
    constructor({id,mid,singer,name,album,duration,image,url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
    getLyric() {            //获取歌词
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        } else {
            return new Promise((resolve) => {
                getLyric(this.id).then((res) => {
                    this.lyric = Base64.decode(res.lyric);
                    resolve(this.lyric);
                })
            })
        }

    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0&guid=126548448`
        // url:getUrl(musicData)
        // url:`http://stream3.qqmusic.qq.com/C200${musicData.songmid}.mp3`
        
    })
}
function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return '';
    }
    singer.forEach((item) => {
        ret.push(item.name)
    })
    return ret.join('/');
}