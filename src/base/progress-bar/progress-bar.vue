<template>
    <div class="progress-bar" @click='jumpTo'>
            <div class="progress" ref="progress"></div>
            <div class="progress-btn" 
            ref='btn' 
            @touchstart.pervent='start' 
            @touchmove.pervent='move'
            @touchend='end'
            >
                <div></div>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            touch:{
                initiated:false
            }
        }
    },
    props:{
        percent:{
            type:Number,
            default:0
        }
    },
    computed:{
        len(){
            let btnWidth=document.querySelector('.progress-btn').clientWidth;
            let barWidth=document.querySelector('.progress-bar').clientWidth;
            let len=barWidth-btnWidth;
            return len;
        }
    },
    watch:{
        percent(value){
            if(!this.touch.initiated){
                let offset=value*this.len;
                this.offset(offset);          
            }
        }
    },
    methods:{
        offset(value){      //提取进度条和按钮偏移方法
            let progress=document.querySelector('.progress');
            let btn=document.querySelector('.progress-btn');
            progress.style.width=value+'px';
            btn.style.transform=`translate3d(${value+'px'},0,0)`;
        },
        start(e){
            this.touch.begin=e.touches[0].pageX;
            this.touch.initiated=true;
            this.touch.start=this.$refs.progress.clientWidth;
        },
        move(e){
            const offset=e.touches[0].pageX-this.touch.begin+this.touch.start;
            this.touch.offsetX=Math.min(this.len,Math.max(0,offset));
            this.offset(this.touch.offsetX);
        },
        end(){
            this.touch.initiated=false;
            let percent=this.$refs.progress.clientWidth/this.len;
            this.$emit('percentChange',percent);
        },
        jumpTo(e){      //进度条点击跳跃
            this.offset(e.offsetX);
            let percent=e.offsetX/this.len;
            this.$emit('percentChange',percent);
        }
    }
}
</script>

<style>
    .progress-bar{
        height: 2px;
        position: relative;
        width: 65vw;
        margin: 0 1rem;
        background-color: #ccc;
        display: flex;
        justify-content: flex-start;
    }
    .progress{
        height: 2px;
        width: 0px;
        background-color: #b82525;
    }
    .progress-btn{
        position: absolute;
        height: 1.2rem;
        width: 1.2rem;
        left: 0rem;
        top: calc((1.4rem - 6px)/-2);
        border-radius: 50%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .progress-btn div{
        height: 4px;
        width: 4px;
        background-color: #b82525;
        border-radius: 1px;
    }
</style>

