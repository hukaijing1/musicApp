import { playMode } from '@/common/js/common.js' //通用配置文件
import {loadSearch,loadFavorite} from '@/common/js/cache.js'
const state = {
    singer: {},
    playing: false,    //是否播放
    fullScreen: false,   //是否全屏
    playlist: [],    //播放列表
    sequenceList: [],      //队列列表，随机播放时使用
    mode: playMode.sequence,   //播放模式
    currentIndex:-1,        //当前歌曲位置，用于前进后退
    disc: {},                //歌单推荐详情页
    rankList: {},             //排行歌单详情页
    searchHistory: loadSearch(),        //搜索历史
    favoriteList:loadFavorite()
}
export default state;