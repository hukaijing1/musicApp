import Jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'

export function search(query,page,zhida,lineNum) {          //搜索接口调用
    let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    let data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        w: query,
        zhidaqu: 1,
        catZhida: zhida ? 1 : 0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: lineNum,
        n: lineNum,
        p: page,
        remoteplace:'txt.mqq.all'
    })
    return Jsonp(url, data, options);
}