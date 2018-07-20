import Jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey() {
    let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';
    let data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode:1
    })
    return Jsonp(url, data, options);
}