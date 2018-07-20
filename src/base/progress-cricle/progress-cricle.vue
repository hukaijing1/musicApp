<template>
    <div class="progress-cricle" @click="trigger">
        <svg xmlns="http://www.w3.org/2000/svg" 
        version="1.1" viewBox='0 0 100 100'>
            <circle class="background" cx="50" cy="50" r="50" />
            <circle class="progress" cx="50" cy="50" r="50" 
            :stroke-dasharray="dashArray"
            :stroke-dashoffset='dashOffset' 
            />
        </svg>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dashArray:Math.PI*100
        }
    },
    props:{
        percent:{
            type:Number,
            default:0
        }
    },
    methods:{
        trigger(){
            this.$emit('trigger');
        }
    },
    computed:{
        dashOffset(){
            return this.dashArray*(1-this.percent);
        }
    }
}
</script>

<style scoped>
svg{
    width: 2.5rem;
    height: 2.5rem;
}
circle {
  transform-origin: center;
  fill: transparent;
}
.background {
  stroke: transparent;
   transform: scale(0.9);
}
.progress {
  stroke: #ce0a0a;
  transform: rotate(-90deg) scale(0.89);
  stroke-width: 0.9rem;
}
</style>

