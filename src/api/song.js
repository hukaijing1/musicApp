import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {     //歌词数据获取
    let url = '/api/getLyric';
    let data = Object.assign({}, commonParams, {
        musicid:mid,
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        format:'json'       //axios请求需将格式设置为json
    })
    return axios.get(url, {
        params:data
    }).then(res => {
        return res.data;
    })
}