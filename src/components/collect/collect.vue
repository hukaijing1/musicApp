<template>
    <div class="collect">
        <img class="back" @click="back" src="../../common/images/back.png">
        <header>
            <div class="like"><img class="like-icon" src="../../common/images/heart.png">&nbsp;我喜欢的音乐</div>
        </header>
        <section>
            <div class="tip" v-if='!favoriteList.length'>
              <img src="../../common/images/notes.png" alt="">
              <p>暂未收藏音乐</p>
            </div>
            <scroll class="list">
                <ul>
                    <li @click="playSong(item)" v-for="item in favoriteList">
                        <img v-lazy='item.image'>
                        <div class="song">
                            <div v-html="item.name"></div>
                            <div v-html="item.singer"></div>
                        </div>
                    </li>
                </ul>
            </scroll>
        </section>
    </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import Song from '@/common/js/song'
import scroll from "@/base/scroll/scroll";
export default {
  computed: {
    ...mapGetters(["favoriteList"])
  },
  methods: {
    ...mapActions(['insertSong']),
    back() {
      this.$router.back();
    },
    playSong(item){
      this.$nextTick(()=>{
        let song=new Song(item);
        this.insertSong(song);
      });

    }
  },
  components:{
      scroll
  }
};
</script>

<style scoped>
.collect {
  background-color: #191b1f;
  color: #ddd;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.back {
  height: 3rem;
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
.like {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #252525;
}
.like-icon {
  height: 2rem;
}
.tip{
  position: fixed;
  top: 40%;
  left:50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.tip img{
  height: 2rem;
  margin-right: 1rem;
}
.song-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #000;
}
.song-list img {
  height: 3rem;
  margin: 0 1rem;
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
.song div:first-child {
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
.list{
    height: 80vh;
    overflow: hidden;
}
</style>

