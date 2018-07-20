<template>
  <div class='rank' ref='rank'>
    <my-header class="header" ref='header'></my-header>
    <scroll class="rankScroll" ref='scroll'>
      <ul class="main">
        <li @click="selectItem(item,index)" class="rankList" v-for="(item,index) in rank">
          <figure class="left">
            <img :src="item.picUrl" alt="">
          </figure>
          <section class="right">
            <h1>{{item.topTitle}}</h1>
            <ul>
              <li class="songList" v-for="(song,index) in item.songList">
                <span class="index">{{index+1}}</span>
                <span class="songName">{{song.songname}}</span>
                <span class="singerName">{{song.singername}}</span>
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import myHeader from "../header/header";
import { getRank } from "@/api/getRank";
import scroll from "@/base/scroll/scroll";
import { mapMutations, mapGetters } from "vuex";
import {playlistMixin} from '@/common/js/mixin'
import {getKey} from '@/api/getSongKey'
export default {
  mixins:[playlistMixin],
  data() {
    return {
      rank: []
    };
  },
  mounted() {
    this._getRank();
      // getKey('000Rt4qI4Rfs4w').then(res=>{
      //   console.log(res.data.items[0].vkey);
      // })
  },
  methods: {
    ...mapMutations({
      setRankList: "SET_RANKLIST"
    }),
    changeHeight() {
      if (this.playlist.length > 0) {
        let headerH = this.$refs.header.$el.offsetHeight;
        let playerH = Math.ceil(headerH * 5 / 7);
        let windowH = window.innerHeight;
        let scrollH = windowH - playerH - headerH;
        let scroll=document.querySelector('.rankScroll')
        let rank=document.querySelector('.rank');
        scroll.style.height=scrollH+'px';
        rank.style.bottom=playerH+'px';
        this.$refs.scroll.refresh();
      }
    },
    _getRank() {

      getRank().then(res => {
        this.rank = res.data.topList;
      });
    },
    selectItem(item) {
      let id = item.id;
      this.$router.push({ path: `/rank/${id}` });
      this.setRankList(item);
    }
  },
  computed: {
    ...mapGetters(["playlist"])
  },
  components: {
    myHeader,
    scroll
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.rankScroll {
  width: 100vw;
  height: calc(100vh - 7rem);
  overflow: hidden;
}
.rank {
  position: fixed;
  top: 0px;
  bottom: 0rem;
  width: 100%;
  color: #fff;
}
.rankList {
  display: flex;
  align-items: center;
  width: 94vw;
  margin: 0 auto;
  background-color: #333;
  justify-content: flex-start;
  height: 9rem;
  margin-top: 1rem;
}
.rankList:last-child {
  margin-bottom: 1rem;
}
.left {
  height: 7rem;
  width: 7rem;
  margin: 0 1.4rem;
}
.left img {
  height: 7rem;
  width: 7rem;
}
.songList {
  width: 15rem;
  overflow: hidden;
  color: #b5b5b5;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>


