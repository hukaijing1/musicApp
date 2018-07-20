<template>
    <transition name='slider'>
        <music-list class='list' :songs='songs' :title='title' :bgImage='bgImg'>
        </music-list>
    </transition>
</template>
<script>
import MusicList from '../music-list/music-list'
import {getSingerDetail} from '@/api/getSingerList'
import {createSong} from '@/common/js/song'
import {mapState} from 'vuex'
export default {
    data(){
        return{

            songs:[]
        }
    },
    components:{
        MusicList
    },
    computed:{
        title(){
            return this.singer.name;
        },
        bgImg(){
            return this.singer.imgSrc;
        },
        ...mapState([ 
         'singer'   
        ])
    },
    created(){
        this.getDetail();
    },
    methods:{
        getDetail(){
            if(!this.singer.id){
                this.$router.back();
                return;
            }
            getSingerDetail(this.singer.id).then(res=>{
                this.songs=this.normalizeSongs(res.data.list);
            })
        },
        normalizeSongs(list){
            let array=[];
            list.forEach((item)=>{
                let {musicData}=item;
                if(musicData.songid&&musicData.albumid){
                    array.push(createSong(musicData));
                }
            })
            return array;
        }
    }
}
</script>
<style scoped>
.list{
        position: absolute;
        top:0px;
        left:0px;
        right: 0px;
        bottom: 0px;
        z-index: 100;
        color: #abafb2;
    }
    .slider-enter{
        transform: translate(-100%,0);
    }
    /* .slider-leave{
        transform: translate(100%,0);
    } */
    .slider-enter-active,.slider-leave-active{
        transition: all 0.5s;
    }
</style>

