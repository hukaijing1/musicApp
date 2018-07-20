import Jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'

export function getRank() {     //排行页数据获取
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
    let data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
    })
    return Jsonp(url, data, options);
}

export function getRankDetail(id) {         //排行页子级菜单获取
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
    let data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid:id
    })
    return Jsonp(url, data, options);
}