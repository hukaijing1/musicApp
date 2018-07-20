<template>
    <div class="search-box">
        <img class="search-img" src="../../common/images/search-btn.png" alt="">
        <input ref='input' v-model="query" autocomplete="on" type="text" :placeholder="placeholder">
        <img v-if='query' @click="clear" class="close" src="../../common/images/close.png" alt="">
    </div>
</template>
<script>
import {debounce} from '@/common/js/debounce'
export default {
    data(){
        return{
            isShow:false,
            query:''
        }
    },
    props:{
        placeholder:{
            type:String,
            default:'搜索歌曲/歌手'
        }
    },
    created(){
        this.$watch('query',debounce(value=>{
            this.$emit('query',value);
        },200));
    },
    methods:{
        clear(){
            this.query='';
        },
        setQuery(item){
            this.query=item;
        },
        blur(){
            this.$refs.input.blur();
        }
    }
    
}
</script>
<style scoped>

.search-box{
    height: 4rem;
    width: 100%;
    position: relative;
    color: #fff;
    line-height: 4rem;
}
.search-img{
    position: absolute;
    height: 1.6rem;
    left: 2rem;
    top: 0.5rem;
}
.search-box input{
    width: 90vw;
    display: block;
    margin: 0 auto;
    margin-top: 1.7rem;
    height: 2.6rem;
    border-radius: 1.4rem;
    text-indent: 3rem;
    border: none;
    color: #9b9b9b;
    background-color: #333;
}
.close{
    height: 1.2rem;
    position: absolute;
    right: 2rem;
    top: 0.6rem;
}
</style>

