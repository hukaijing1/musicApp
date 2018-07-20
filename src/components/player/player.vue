<template>
  <div class="player" v-if='playlist.length>0'>
    <transition name='normal'>
      <div class="normal-player" v-if='fullScreen'>
        <!--全屏播放器-->
        <div class="background">
          <img :src='currentSong.image'>
        </div>
        <div class="top">
          <!--头部信息-->
          <img @click='back' class="back" src="../../common/images/back.png">
          <div class="title">
            <h1 class="song-name" v-html='currentSong.name'></h1>
            <p class="singer" v-html='currentSong.singer'></p>
          </div>
        </div>
        <div class="line"></div>
        <div class='middle' @touchstart='middleTouchStart' @touchmove='middleTouchMove' @touchend='middleTouchEnd'>
          <article ref='disc' class="discSection">
            <img class="needle" src='../../common/images/needle.png'>
            <section class="disc" :class="isActive">
              <!--唱片部分-->
              <img src="../../common/images/DISC.png" alt="">
              <img class="discImg" :src='currentSong.image' :alt="currentSong.name">
            </section>
            <p>{{playingLyric}}</p>
          </article>
          <scroll ref='lyricScroll' :data='currentLyric&&currentLyric.lines' class="lyricSection" v-if='currentLyric'>
            <ul>
              <li :class="{'current':highlight==index}" v-for='(line,index) in currentLyric.lines' ref='line'>
                {{line.txt}}
              </li>
            </ul>
          </scroll>
        </div>
        <section class="time">
          <span>{{currentTime}}</span>
          <progress-bar @percentChange='percentChange' :percent='percent'></progress-bar>
          <span v-html="endTime"></span>
        </section>

        <section class="control">
          <!--操作区-->
          <img @click="changeMode" :src="loopImg" alt="">
          <img @click.stop.prevent='per' src="../../common/images/per.png" alt="">
          <img @click.stop.prevent='play' :src="playIcon" alt="">
          <img @click.stop.prevent='next' src="../../common/images/next.png" alt="">
          <img @click='collectSong' :src="collectImg" alt="">
        </section>
      </div>

    </transition>
    <transition name="mini">
      <!--mini播放器-->
      <div class="mini-player" v-if='!fullScreen'>
        <div class="left" @click="open">
          <img :class='isActive' class="mini-disc" :src='currentSong.image'>
          <div>
            <h2 class="miniSong" v-html='currentSong.name'></h2>
            <!--歌曲名-->
            <p class="miniName" v-html='currentSong.singer'></p>
            <!--歌手名-->
          </div>
        </div>
        <div class="right">
          <img class="play-btn" :src="playIcon" alt="">
          <progress-cricle @trigger="play" :percent='percent' class="cricle"></progress-cricle>
          <img class="list-btn" @click='collectSong' :src="collectImg" alt="">
        </div>
      </div>
    </transition>
    <audio ref='audio' :src="currentSong.url" @canplay="ready" @error='error' @timeupdate="updateTime" @ended='audioEnd'></audio>
  </div>
</template>
<script>
import ProgressBar from "@/base/progress-bar/progress-bar";
import ProgressCricle from "@/base/progress-cricle/progress-cricle";
import { mapGetters, mapMutations, mapActions } from "vuex";
import randomList from "@/common/js/randomList";
import { playMode } from "@/common/js/common";
import Lyric from "lyric-parser";
import Scroll from "@/base/scroll/scroll";

export default {
  data() {
    return {
      songReady: false,
      currentTime: "00:00",
      endTime: "00:00",
      percent: 0,
      currentLyric: null,
      highlight: 0,
      playingLyric: "",
      touch: {},
      currentShow: "cd"
    };
  },
  components: {
    ProgressBar,
    ProgressCricle,
    Scroll
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playlist",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "favoriteList"
    ]),
    playIcon() {
      //设置播放暂停图片
      let play = require("../../common/images/play.png");
      let pause = require("../../common/images/pause.png");
      return this.playing ? pause : play;
    },
    collectImg: {
      get() {
        let song = this.currentSong;
        let index = this.favoriteList.findIndex(item => {
          return item.id === song.id;
        });
        if (index > -1) {
          return require("../../common/images/like.png");
        } else {
          return require("../../common/images/dislike.png");
        }
      },
      set(){

      }
    },
    isActive() {
      //设置旋转状态
      return this.playing ? "rotate" : "pause-rotate";
    },
    loopImg() {
      //播放模式图片切换
      if (this.mode == 0) {
        return require("../../common/images/listloop.png");
      } else if (this.mode == 1) {
        return require("../../common/images/oneloop.png");
      } else if (this.mode == 2) {
        return require("../../common/images/randomloop.png");
      } else {
        return require("../../common/images/listloop.png");
      }
    }
  },
  watch: {
    currentSong(newValue, oldValue) {
      if (newValue.id == oldValue.id) {
        return;
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      setTimeout(() => {
        //解决手机切换无js响应问题
        //因为watch时数据更新但dom没有更新，获取不到audio，使用此方法可获取
        this.$refs.audio.play();
        this.getLyric();
        if (!this.playing) {
          this.setPlayingState(true);
        }
      }, 10);
    },
    playing(flag) {
      //监听是否播放
      this.$nextTick(() => {
        let audio = this.$refs.audio;
        flag ? audio.play() : audio.pause();
      });
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN", //映射全屏方法
      setPlayingState: "SET_PLAYING_STATE", //映射播放暂停方法
      setCurrentIndex: "SET_CURRENT_INDEX", //歌曲定位
      setPlayMode: "SET_PLAY_MODE", //设置播放模式
      setPlayList: "SET_PLAYLIST" //设置播放列表
    }),
    ...mapActions(["saveFavoriteList", "removeFavoriteList"]),
    middleTouchStart(e) {
      this.touch.moved = false
      this.touch.startX = e.touches[0].pageX;
      this.touch.startY = e.touches[0].pageY;
    },
    middleTouchMove(e) {
      //歌词滑动
      let x = e.touches[0].pageX - this.touch.startX;
      let y = e.touches[0].pageY - this.touch.startY;
      if (Math.abs(y) > Math.abs(x)) {
        return;
      }
      if (!this.touch.moved) {
          this.touch.moved = true
        }
      this.touch.offset = e.touches[0].pageX - this.touch.startX;
      let offset = this.touch.offset;
      const left = this.currentShow == "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + offset)
      );
      this.touch.widthPercent = Math.abs(offsetWidth / window.innerWidth);
      let lyric = document.querySelector(".lyricSection");
      lyric.style.transform = `translate3d(${offsetWidth + "px"},0,0)`;
      lyric.style.transition = `-webkit-transform 0ms`;
      this.$refs.disc.style.opacity = 1 - this.touch.widthPercent;
    },
    middleTouchEnd(e) {
      //歌词滑动结束
      if (!this.touch.moved) {
          return
        }
      let time = 200;
      let opacity;
      let offsetWidth;
      let lyric = document.querySelector(".lyricSection");
      if (this.currentShow == "cd") {
        if (this.touch.widthPercent > 0.2) {
          offsetWidth = -window.innerWidth;
          this.currentShow = "lyric";
          opacity = 0;
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.8) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        } else {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        }
      }
      lyric.style.transform = `translate3d(${offsetWidth + "px"},0,0)`;
      lyric.style.transition = `-webkit-transform ${time}ms`;
      this.$refs.disc.style.opacity = opacity;
    },
    getLyric() {
      //封装歌词获取方法
      this.currentSong.getLyric().then(lyric => {
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        this.currentLyric.play();
      });
    },
    handleLyric({ lineNum, txt }) {
      //当行数变化时触发
      this.highlight = lineNum; //当前行数
      this.playingLyric = txt; //当前歌词
      if (this.$refs.lyricScroll) {
        if (lineNum > 4) {
          let li = this.$refs.line[lineNum - 4];
          this.$refs.lyricScroll.scrollToElement(li, 1000);
        } else {
          this.$refs.lyricScroll.scrollTo(0, 0, 1000);
        }
      }
    },
    updateTime(e) {
      //计算变化时间
      this.currentTime = this.formatTime(e.target.currentTime);
      this.percent = e.target.currentTime / e.target.duration;
    },
    formatTime(e) {
      //格式化时间
      let time = Math.floor(e);
      let minute = Math.floor(time / 60);
      let second = time % 60;
      let per = minute > 9 ? minute : "0" + minute;
      let after = second > 9 ? second : "0" + second;
      let newTime = per + ":" + after;
      return newTime;
    },
    togglePlaying() {
      //设置播放状态
      let audio = this.$refs.audio;
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay(); //歌词暂停
      }
    },
    back() {
      //关闭全屏
      this.setFullScreen(false);
    },
    open() {
      //打开播放器
      this.setFullScreen(true);
    },
    play() {
      //播放暂停切换
      this.togglePlaying();
    },
    per() {
      //上一曲
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    next() {
      //下一曲
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
        return;
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    ready(e) {
      //只有当audio加载完成才可以点击，并计算歌曲总时间
      this.songReady = true;
      this.endTime = this.formatTime(e.target.duration);
    },
    error() {
      //当网络异常时，可以播放缓存歌曲
      this.songReady = true;
    },
    audioEnd() {
      //自动播放下一曲
      if (this.mode === 1) {
        this.loop();
      } else {
        this.next();
      }
    },
    changeMode() {
      //设置播放方式
      let mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = randomList(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    loop() {
      //单曲循环
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.currentLyric.seek(0); //歌词回到开始
    },
    resetCurrentIndex(list) {
      //当播放方式为随机播放时返回变化后的下标
      let index = list.findIndex(item => {
        return item.id == this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    percentChange(percent) {
      //进度条改变
      let time = this.$refs.audio.duration * percent;
      this.$refs.audio.currentTime = time;
      this.currentLyric.seek(time * 1000); //歌词跳跃到指定位置
    },
    collectSong() {
      //收藏歌曲
      let song = this.currentSong;
      let index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      if (index > -1) {
        this.removeFavoriteList(song);
        this.collectImg = require("../../common/images/dislike.png");
      } else {
        this.saveFavoriteList(song);
        this.collectImg = require("../../common/images/like.png");
      }
    }
  }
};
</script>
<style scoped>
.background {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  opacity: 0.8;
  filter: blur(10rem);
}
.background img {
  width: 100%;
  height: 100%;
}
.normal-player {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 150;
  color: #fff;
  background-color: #39322f;
}
.top {
  height: 5rem;
  display: flex;
  padding-left: 1rem;
  align-items: center;
  justify-content: flex-start;
}
.title {
  width: 100%;
}
.line {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #867154, #ddd, #867154);
}
.top img {
  height: 3.2rem;
  margin-right: 0.5rem;
}
.song-name {
  font-size: 1.2rem;
  width: 80vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  color: #d8d8d8;
}
/*disc部分*/
.middle {
  height: 66vh;
  width: 100vw;
}
.discSection {
  height: 66vh;
  transform: translateX(0);
  position: absolute;
}
.discSection p {
  width: 100vw;
  line-height: 4vh;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
  bottom: 1rem;
}
.disc {
  height: 62vh;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.discImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 46vw;
  border-radius: 50%;
}
.disc img:first-child {
  width: 70vw;
  border-radius: 50%;
  box-shadow: 0rem 0rem 0rem 1rem rgba(169, 169, 169, 0.1);
}
.needle {
  height: 10rem;
  position: absolute;
  left: 45%;
  z-index: 151;
}
/*歌词部分*/
.lyricSection {
  width: 100vw;
  position: absolute;
  left: 100vw;
  margin-top: 2rem;
  margin-bottom: 2rem;
  height: 60vh;
  font-size: 1.1rem;
  text-align: center;
  overflow: hidden;
  color: #fff;
}
.current {
  color: red;
}
.lyricSection li {
  line-height: 3rem;
}

.time {
  position: fixed;
  bottom: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*控制区*/
.control {
  position: fixed;
  bottom: 0px;
  height: 8rem;
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: space-around;
}
.control img {
  height: 2.6rem;
  width: 2.6rem;
}
.control img:nth-of-type(3) {
  height: 3.6rem;
  width: 3.6rem;
}
.mini-player {
  position: fixed;
  left: 0px;
  bottom: 0px;
  z-index: 150;
  color: #000;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #333;
}
.mini-player h2 {
  font-size: 1.2rem;
  color: #eee;
}
.mini-player p {
  color: #aaa9a9;
}
.mini-disc {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-left: 1rem;
  margin-right: 1rem;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.miniSong {
  width: 50vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.miniName {
  width: 50vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play-btn {
  width: 2.4rem;
  height: 2.4rem;
}
.cricle {
  position: absolute;
  top: 1.2rem;
  right: 4.15rem;
  z-index: 10;
}
.list-btn {
  margin: 0 1rem;
  width: 2.2rem;
  height: 2.2rem;
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.3s;
}
.normal-enter-active .top,
.normal-enter-active .control {
  transition: all 0.3s;
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
}
.normal-enter .top,
.normal-leave-to {
  transform: translate3d(0, -100%, 0);
}
.normal-enter .control,
.normal-leave-to .control {
  transform: translate3d(0, 100%, 0);
}
.mini-enter-active {
  transition: all 0.4s;
}

.mini-enter {
  opacity: 0;
}
/*旋转动画实现*/
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rotate {
  animation-name: rotate;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.pause-rotate {
  animation-name: rotate;
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}
</style>
