<template>
    <div id='header'>
        <header>
            <router-link to='/collect'>
               <img src="../../common/images/Category.png" alt="">
            </router-link>
            <span>MYMUSIC</span>
            <router-link to='/search'>
                <img src="../../common/images/search.png">
            </router-link>
        </header>
        <ul class="tab" ref="nav">
            <li>
                <router-link to="/recommend" class="navItem">推荐</router-link>
            </li>
            <li>
                <router-link to="/rank" class="navItem">排行</router-link>
            </li>
            <li>
                <router-link to="/singer" class="navItem">歌手</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      recommendActive: true,
      rankActive: false,
      singerActive: false
    };
  },
};
</script>
<style scoped>
#header{
  height: 7rem;
}
header {
  display: flex;
  background-color: #c92727;
  justify-content: space-around;
  align-items: center;
  height: 3.5rem;
}
header span {
  font-weight: bold;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2rem;
}
img {
  height: 1.6rem;
}
.tab {
  display: flex;
  background-color: #c92727;
  justify-content: space-around;
  align-items: center;
  height: 3.5rem;
}
.navItem {
  color: white;
  font-size: 1.2rem;
}
.router-link-active {
  font-weight: bold;
  display: inline-block;
  border-bottom: 2px solid #fff;
}
</style>
