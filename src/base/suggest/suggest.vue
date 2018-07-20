<template>
    <scroll :pullup='pullup' 
    :data='songlist'
    :beforeScroll='beforeScroll' 
    class="suggest-scroll"
    @scrollToEnd='searchMore'
    @beforeScroll='listScroll'
    >
        <div class="suggest">
            <div @click="goToSinger(singer)" class="singer" v-show="singer.singername">
                <img :src='getImage'>
                <section>
                    <div class="singername">{{singer.singername}}</div>
                    <div>
                        <span class="songnum">单曲：{{singer.songnum}}</span>
                        <span class="albumnum">专辑：{{singer.albumnum}}</span>
                    </div>
                </section>
            </div>
            <ul>
                <li @click="playSong(item)" v-for="item in songlist">
                    <img src='../../common/images/music.png'>
                    <div class="song">
                        <div v-html="item.songname"></div>
                        <div v-html="getSingerName(item.singer)"></div>
                    </div>
                </li>
            </ul>
            <loading v-show="hasMore"></loading>
        </div>
        <no-result v-show='!hasMore&&!songlist.length&&!singer.singername'></no-result>
    </scroll>
</template>
<script>
import scroll from "@/base/scroll/scroll";
import NoResult from "@/base/no-result/no-result";
import {createSong} from '@/common/js/song'
import {mapActions} from 'vuex'
import Singer from '@/common/js/singer.js' 
import { search } from "@/api/search";
import loading from '@/base/loading/loading'
import {mapMutations} from 'vuex'
const TYPE_SINGER = "singer";
const perpage=20;
export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      songlist: [],
      singer: {},
      pullup:true,
      hasMore:true,
      beforeScroll:true
    };
  },
  watch: {
    query() {
      this.search();
    }
  },
  computed: {
    getImage() {
      let id = this.singer.singermid;
      let imgSrc = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg`;
      return imgSrc;
    }
  },
  methods: {
    ...mapMutations({
      setSinger:'SET_SINGER'
    }),
    ...mapActions(['insertSong']),
    search() {
      //调用查找接口
      this.hasMore=true;
      search(this.query, this.page, this.zhida,perpage).then(res => {
        if (res.code == 0) {
          this.songlist = this.getResult(res.data);
          this.singer = this.getSinger(res.data);
          this.checkMore(res.data);
        }
      });
    },
    searchMore(){   //下拉刷新
        if(!this.hasMore){
            return
        }
        this.page++;
        search(this.query, this.page, this.zhida,perpage).then(res => {
        if (res.code == 0) {
          this.songlist =this.songlist.concat(this.getResult(res.data));
          this.singer = this.getSinger(res.data);
          this.checkMore(res.data);
        }
      });
    },
    checkMore(data){
        const song = data.song;
        this.hasMore=true;
        if(!song.list.length){
          this.hasMore=false;
        } 
        if((song.curnum+(song.curpage-1)*perpage)===song.totalnum){
          this.hasMore=false;
        }
    },
    goToSinger(item){   //点击歌手跳转至歌手页
      let singer=new Singer(item.singername,item.singermid);
      this.$router.push({path:`/search/${singer.id}`});
      this.setSinger(singer);
      this.$emit('select');
    },
    playSong(item){   //点击歌曲跳转至歌曲页
      let song=createSong(item);
      console.log(song);
      this.insertSong(song);
      this.$emit('select');
    },
    getSinger(data) {
      //获取歌手
      let singer = {};
      if (data.zhida.singerid) {
        singer = { ...data.zhida, ...{ type: TYPE_SINGER } };
      }
      return singer;
    },
    getSingerName(singer) {
      //格式化歌手名
      let ret = [];
      singer.forEach(item => {
        ret.push(item.name);
      });
      return ret.join("/");
    },
    getResult(data) {
      //获取歌曲列表
      let ret = [];
      if (data.song) {
        ret = data.song.list;
      }
      return ret;
    },
    listScroll(){ //监听滚动事件
      this.$emit('listScroll');
    }
  },
  components: {
    scroll,
    loading,
    NoResult
  }
};
</script>
<style scoped>
.singer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4rem;
  border-bottom: 1px solid #454545;
}
.singer img {
  height: 3rem;
  border-radius: 1.5rem;
  margin: 0 1.4rem;
}
li {
  display: flex;
  justify-content: flex-start;
  height: 4rem;
  align-items: center;
  border-bottom: 1px solid #454545;
}
ul img {
  height: 3rem;
  margin: 0 1.2rem;
}
.song div:first-child{
    width: 70vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
}
.song div:first-child {
  font-size: 1.2rem;
  color: #ddd;
}
.song div:last-child {
  color: #838383;
}
</style>

