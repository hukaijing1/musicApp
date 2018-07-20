import { commonParams, options } from './config'
import axios from 'axios'
export function getKey(mid) {
    let url = '/api/getKey';
    let data = Object.assign({}, commonParams, {
        jsonpCallback:'MusicJsonCallback6279022616504133',
        cid:205361747,
        hostUin: 0,
        loginUin: 0,
        platfrom: 'yqq',
        format:'json',
        needNewCode: 0,
        inCharset:'utf8',
        uin: 0,
        songmid: mid,
        filename:'C400'+mid+'.m4a',
        guid: 2944656380,
    })
    return axios(url, {
        params:data
    }).then(res => {
        return res.data;
    })
}