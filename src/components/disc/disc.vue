<template>
    <div class="disc">
        <music-list :title='title' :songs='songs' :bgImage='bgImage'></music-list>
    </div>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from '@/api/getRecommend'
import {createSong} from '@/common/js/song'
export default {
    data(){
        return {
            songs:[]
        }
    },
    components:{
        MusicList
    },
    computed:{
        ...mapGetters(['disc']),
        title(){
            return this.disc.dissname;
        },
        bgImage(){
            return this.disc.imgurl;
        }
    },
    mounted(){
        this._getSongList();
    },
    methods:{
        _getSongList () {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
            if(typeof res=='string'){
                let data=res.substring(21,res.length-1);
                let newData=JSON.parse(data);
                this.songs=this._normalizeSongs(newData.cdlist[0].songlist);
            }else{
                this.songs=this._normalizeSongs(res.cdlist[0].songlist);
            }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData));
          }
        })
        return ret
      }
    }    
}
</script>
<style scoped>
    .disc{
        position: absolute;
        background-color: #191b1f;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 100;
    }
</style>

