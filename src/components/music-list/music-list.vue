<template>
    <div class="music-list" v-if='songs.length'>
        <div class="title">
            <img @click='back' src="../../common/images/back.png" alt="">
            <div v-html='title'></div>
        </div>
        <section class="bg" v-bind:style='bg'>
            
        </section>
        <loading class="loading" v-if='!songs.length'></loading>
        <scroll :data='songs' class="song-list">
            <song-list @playSong='playSong' :songs='songs'></song-list>
        </scroll>
    </div>
</template>
<script>
import loading from '@/base/loading/loading'
import scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import {mapActions} from 'vuex'
export default {
    components:{
        SongList,
        scroll,
        loading
    },
    props:{
        bgImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        }
    },
    computed:{
        bg(){
            return `background-image:url(${this.bgImage})`
        }
    },
    methods:{
        back(){
            this.$router.back();
            this.showVolumn=false;
        },
        playSong(item,index){
            this.selectPlay({
                list:this.songs,
                index:index
            });
            this.showVolumn=true;
        },
        ...mapActions([
            'selectPlay'
        ])
    }
}
</script>
<style scoped>
.title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: absolute;
    top: 1rem;
    left: 2rem;
}
.title img{
    height: 2.6rem;
}
.title div{
    font-size: 1.4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 70vw;
    color:#fff;
}
section{
    width: 100%;
    height: 40vh;
    background-repeat: no-repeat;
    background-size: cover;
}
.song-list{
    height: 60vh;
    overflow: hidden;
    background-color: #222;
}
.loading{
    height: 60vh;
}
</style>


