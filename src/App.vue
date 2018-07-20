<template>
  <div id="app">
    <keep-alive>
      <router-view/> 
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import player from '@/components/player/player'
export default {
  name: 'App',
  components:{
    player
  }
}
</script>

<style>
@import './common/css/reset.css';
@import './common/css/media.css';
#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  background-color: #191b1f;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

</style>
