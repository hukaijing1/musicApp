<template>
  <div id="recommend">
    <my-header ref='header'></my-header>
    <div ref='slider' class="slider-wrapper" v-if='recommends.length'>
      <slider>
        <div v-for="item in recommends">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>
    <main v-if='discList.length'>
      <h1>热门歌单推荐</h1>
      <scroll :data='discList' ref='scroll' class='listScroll'>
        <ul class="musicList">
          <li @click="selectItem(item)" v-for='item in discList' class='discList' v-if='item.imgurl'>
            <div class="discImg">
              <img v-lazy='item.imgurl'>
              <!--懒加载-->
            </div>
            <div class="discName">
              <h1 v-html='item.creator.name'></h1>
              <p v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </scroll>
      <div id="loadingContainer">
        <loading v-show='!discList.length'></loading>
      </div>
    </main>

    <router-view></router-view>
  </div>
</template>
<script>
import myHeader from "../header/header";
import slider from "@/base/slider/slider";
import scroll from "@/base/scroll/scroll";
import loading from "@/base/loading/loading";
import { getRecommend, getDiscList } from "@/api/getRecommend";
import { ERR_OK } from "@/api/config";
import { mapMutations } from "vuex";
import { playlistMixin } from "@/common/js/mixin";

export default {
  mixins: [playlistMixin],
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    ...mapMutations({
      setDisc: "SET_DISC"
    }),
    changeHeight() {
      this.$nextTick(()=>{
        if (this.playlist.length > 0) {
          let headerH = this.$refs.header.$el.offsetHeight;
          let playerH = Math.ceil(headerH * 8 / 7);
          let windowH = window.innerHeight;
          let scroll = document.querySelector(".listScroll");
          let h=this.$refs.slider.clientHeight;
          let scrollH = windowH - playerH - headerH-h;
          scroll.style.height = scrollH + "px";
          this.$refs.scroll.refresh();
        }
      });
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code == ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        this.discList = res.data.list;
      });
    },
    selectItem(item) {
      this.$router.push({ path: `/recommend/${item.dissid}` });
      this.setDisc(item);
    }
  },
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  components: {
    myHeader,
    slider,
    scroll,
    loading
  }
};
</script>
<style scoped>
#recommend {
  background-color: #191b1f;
}
main {
  color: #abafb2;
}
main > h1 {
  text-align: center;
  font-size: 1rem;
  height: 3rem;
  color: #ec191b;
  line-height: 3rem;
}
.discList {
  display: flex;
  margin-bottom: 0.3rem;
  justify-content: flex-start;
  align-items: center;
}
.discImg img {
  width: 4rem;
  height: 4rem;
  margin: 0 1.4rem;
}
.discList h1 {
  font-size: 1.2rem;
  height: 2rem;
  line-height: 2rem;
  color: #fff;
}
.listScroll {
  height: 55vh;
  overflow: hidden;
}
#loadingContainer {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
