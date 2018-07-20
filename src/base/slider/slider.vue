<template>
    <div id='slider' ref='slider'>
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span v-for='(item,key) in dots' :class="{active:currentPage===key}"></span>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
    export default{
        props:{
            loop:{
                type:Boolean,
                default:true
            },
            autoplay:{
                type:Boolean,
                default:true
            },
            interval:{
                type:Number,
                default:4000
            }
        },
        data(){
            return{
                dots:[],
                currentPage:0
            }
        },
        mounted(){
            setTimeout(()=>{
                this._initSlider();
                this._initDots();
                if(this.autoplay){
                    this.play();
                }
            },20);
        },
        destroyed(){
            clearInterval(timeout);
        },
        methods:{
            _initSlider(){
                this.slider=new BScroll(this.$refs.slider,{
                    scrollX:true,
                    scrollY:false,
                    momentum:false,
                    snap:{
                        loop:true,
                        threshold: 0.1,
                    },
                    snapSpeed:400,
                    click:true
                });
                this.slider.on('scrollEnd',()=>{
                    let index=this.slider.getCurrentPage().pageX;
                    this.currentPage=index;
                })
            },
            _initDots(){
                this.dots=new Array(5);
                let children=this.$refs.sliderGroup.children;
            },
            play(){
                  var timeout= setInterval(()=>{
                    let page=this.currentPage+1;
                    if(page==5){
                        page=0;
                    }
                    this.slider.goToPage(page,0,400)
                },this.interval)
            }
        }
    }
</script>
<style scoped>
#slider{
    overflow: hidden;
    position: relative;
}
    .slider-group{
        width:700vw;
    }
    img{
        width:100vw;
    }
    a{
        display: block;
        float: left;
        overflow: hidden;
    }
    .dots{
        text-align: center;
         position: absolute;
         bottom:  1rem;
         left: 50%;
         transform: translateX(-50%);
    }
    .dots span{
        display: inline-block;
        margin: 0 0.5rem;
        width:0.6rem;
        height:0.6rem;
        border-radius: 0.3rem;
        background-color:#555;
    }
    .dots .active{
        background-color: #ca2b2c;
    }

</style>

