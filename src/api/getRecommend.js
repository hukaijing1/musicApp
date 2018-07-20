import Jsonp from '../common/js/jsonp'
import { commonParams, options} from './config'
import axios from 'axios'

export function getRecommend() {        //推荐页轮播图数据
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
             
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode:1
    });
    return Jsonp(url, data, options);
}
export function getDiscList() {         //推荐页专辑数据获取
    let url = '/api/getDiscList';
    let data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format:'json'
    })
    return axios(url, {
        params:data
    }).then(res => {
        return res.data;
    })
}
export function getSongList(disstid) {      //专辑详情页
    let url = '/api/getSongList';
    const data = Object.assign({}, commonParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: disstid,
        format:'json',
        jsonpCallback: 'playlistinfoCallback',
        loginUin: 0,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
      })
      return axios.get(url, {
        params: data
      }).then((res) => {
        return Promise.resolve(res.data)
      })
  }