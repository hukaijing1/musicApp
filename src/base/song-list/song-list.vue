<template>
    <div>
        <h1>热门100首单曲</h1>
        <ul>
            <li @click='playSong(item,index)' v-for='(item,index) in songs'>
                <div class="index" v-if='!(item.id==currentSong.id)' :class="[index<3?'red':'']">{{index+1}}</div>
                <div class="volume" v-if='item.id==currentSong.id'>
                    <img src='../../common/images/volume.png'>
                </div>
                <div class="song">
                    <div class="song-name">{{item.name}}</div>
                    <div class="song-album">{{getAlbum(item)}}</div>
                </div>  
            </li>
        </ul>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    props:{
        songs:{
            type:Array,
            default:[]
        }
    },
    computed:{
        ...mapGetters(['currentIndex','currentSong','playlist'])
    },
    methods:{
        getAlbum(song){
            return `${song.singer}-${song.album}`;
        },
        playSong(item,index){
            this.$emit('playSong',item,index);
        }
    }
}
</script>
<style scoped>
h1{
    height: 4rem;
    color: #f53434;
    line-height: 4rem;
    text-indent: 4rem;
}
.red{
    color: #f53434!important;
}
li{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    height: 5rem;
}
.index{
    color: #eee;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: lighter;
}
.volume{
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.volume img{
    height: 1.5rem;
}
.song{
    border-top: 1px solid #292929;
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width:100%;
}
.song:first-child{
    border-top: none!important;
}
.song-name{
    font-size: 1.2rem;
    width: 80vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight:bolder;
    color: #fff;
}
.song-album{
    color: #848484;
    width: 80vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>

