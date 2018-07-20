<template>
    <scroll @scroll="scroll" class='listview' :data="data" ref="listview">
        <ul>
            <li class='singerList' v-for='(item,index) in data' ref="listGroup">
                <h2>{{item.title}}</h2>
                <ul>
                    <li @click='goToSinger(list)' class='singer' v-for='list in item.items'>
                        <img v-lazy='list.imgSrc' alt="图片">
                        <p v-html='list.name'></p>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="item" @touchmove.stop.prevent='moveToList'>
            <ul>
                <li 
                class='tag' 
                :class="{'active':currentIndex===index}"
                @touchstart.stop.prevent='goToList(index,$event)' 
                v-for='(item,index) in getTag'
                :data-index='index'
                >{{item}}
                </li>
            </ul>
        </div>
        <div class="fix-title" v-if='tagName'>
            <h2>{{tagName}}</h2>
        </div>
    </scroll>
</template>
<script>
import scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'
    export default{
        components:{
            scroll
        },
        data(){
            return{
                touch:{},
                currentIndex:0,
                listHeight:[],
                scrollY:0
            }
        },
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        computed:{
            getTag(){
                return this.data.map(item=>{
                    return(item.title.substr(0,1));
                })
            },
            tagName(){      
                if(this.scrollY<0){
                    return this.data[this.currentIndex]?this.data[this.currentIndex].title:null;
                }
            }
        },
        watch:{
            data(){
                setTimeout(() => {
                    this.calcHeight();
                }, 20);
            }
        },
        methods:{
            goToSinger(singer){
                // console.log(singer);
                //  this.$emit('getSinger',singer);
                this.setSinger(singer);
                this.$router.push({path:`/singer/${singer.id}`})
            },
            ...mapMutations({
                setSinger:"SET_SINGER"
            }),
            goToList(index,el){     //右侧快捷导航栏点击后定位列表
                const list=this.$refs.listGroup[index];
                this.$refs.listview.scrollToElement(list);
                this.touch.startY=el.touches[0].pageY;  //点击初始位置
                this.currentIndex=index;
            },
            moveToList(el){         //右侧快捷导航栏滑动定位列表
                this.touch.endY=el.touches[0].pageY;    //移动结束位置
                let offset=this.touch.endY-this.touch.startY;   //偏移量
                let li=document.querySelector(".tag").offsetHeight;
                let value=Math.floor(offset/li);
                let currentIndex=this.index+value;
                const list=this.$refs.listGroup[currentIndex];
                this.$refs.listview.scrollToElement(list);
            },
            scroll(pos){        //滚动事件
                this.scrollY=pos.y;
                let offset=Math.floor(0-pos.y);
                for(var i=0;i<this.listHeight.length;i++){
                    let height1=parseInt(this.listHeight[i]);
                    let height2=parseInt(this.listHeight[i+1]);
                    let distance=this.listHeight[i]-offset;
                    if(height1<offset&&height2>offset){
                         this.currentIndex=i+1;
                        //  let distance=offset-this.listHeight[i];
                        //  console.log(distance);

                    }else if(offset<this.listHeight[0]){
                        this.currentIndex=0;
                    }
                    
                }

            },
            calcHeight(){       //计算每类列表长度，并填充到数组中
                let listGroup=this.$refs.listGroup;
                let height=0;
                for(var i=0;i<listGroup.length;i++){
                    height+=listGroup[i].clientHeight;
                    this.listHeight.push(height);
                }
            }
        }
    }
</script>
<style scoped>
*{
    color: #abafb2;
}
.singerList h2{
    line-height: 3rem;
    text-indent: 2rem;
    background-color: #26282c;
    margin-bottom: 1rem;
    height: 3rem;
}
.singer{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 1rem;
}
.singer img{
    margin: 0 2rem;
    height: 4rem;
    width: 4rem;
}


.item{
    position: absolute;
    right: 0.5rem;
    width: 1.5rem;
    padding: 0.5rem 0rem;
    top:3rem;
    text-align: center;
    border-radius: 1rem;
    z-index: 9;
    background-color: #242424;
}
.item li{
    height: 1.4rem;
}
.active{
    color:#c92727;
}
.fix-title{
    position: absolute;
    top: 0px;
    line-height: 3rem;
    text-indent: 2rem;
    height: 3rem;
    width: 100vw;
    background-color: #26282c;
}
</style>
