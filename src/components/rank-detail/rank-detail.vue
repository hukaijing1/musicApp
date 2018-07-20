<template>
    <div class="rank-detail">
        <music-list :songs='songlist' :bgImage='bgImage' :title='title'></music-list>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import MusicList from "@/components/music-list/music-list";
import { getRankDetail } from "@/api/getRank";
import { createSong } from "@/common/js/song";
export default {
  data() {
    return {
      title: "",
      bgImage: "",
      songlist: []
    };
  },
  components: {
    MusicList
  },
  mounted() {
    this._getRankDetail();
  },
  computed: {
    ...mapGetters(["rankList"])
  },
  methods: {
    _getRankDetail() {
      let id = this.rankList.id;
      if(!id){
          this.$router.push({ path: "/rank" });
          return;
      }
      getRankDetail(id).then(res => {
        if (res.code == 0) {
          this.title = res.topinfo.ListName;
          this.bgImage = res.topinfo.pic_album;
          let songlist = res.songlist;
          let ret = [];
          songlist.forEach(item => {
            let song = createSong(item.data);
            ret.push(song);
          });
          this.songlist = ret;
        }
      });
    }
  }
};
</script>

<style scoped>
.rank-detail {
  position: absolute;
  top: 0rem;
  left: 0rem;
  right: 0rem;
  bottom: 0rem;
  z-index: 100;
  background-color: #191b1f;
}
</style>
