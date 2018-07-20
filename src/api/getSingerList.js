import Jsonp from '../common/js/jsonp';
import { commonParams, options, ERR_OK } from './config'
export function getSingerList() {   //歌手页数据
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    })
    return Jsonp(url, data, options)
}

export function getSingerDetail(singerId) {   //歌手详情页数据
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId
  })
  return Jsonp(url, data, options);
}