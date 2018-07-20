<template>
    <div class="search">
        <my-header></my-header>
        <search-box @query='getQuery' class="search-bar" ref='searchBox'></search-box>
        <section v-if="!query">
          <h2>热门搜索</h2>
          <ul class="hotkey">
            <li @click="selectKey(item)" v-for='item in hotkey'>{{item.k}}</li>
          </ul>
          <div class="historyTitle" v-if='searchHistory.length'>
             <h2 class="searchHistory">搜索历史</h2>
             <img class="del" @click="clearHistory" src='../../common/images/delete.png' alt='删除'>
          </div>
            <ul class="history">
              <li @click="selectSong(item)" v-for='item in searchHistory'>
                <span>{{item}}</span>
              </li>
            </ul>
        </section>
          <suggest @select="insertHistory" @listScroll='blurInput' class="suggest" v-show="query" :query='query' ref='suggest'></suggest>
        </scroll>
        <section></section>
        <router-view></router-view>
    </div>
</template>
<script>
import myHeader from "../header/header";
import SearchBox from "@/base/search-box/search-box";
import { getHotKey } from "@/api/getHotKey";
import suggest from '@/base/suggest/suggest';
import {mapActions,mapGetters,mapMutations} from 'vuex'
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
export default {
  data() {
    return {
      hotkey:[],
      query:''
    };
  },
  mounted() {
    this._getHotKey();
  },
  computed:{
    ...mapGetters(['searchHistory'])
  },
  methods:{
    ...mapMutations({
      setSearchHistory:'SET_SEARCHHISTORY'
    }),
    ...mapActions(['saveSearchHistory']),
      _getHotKey(){
        getHotKey().then(res=>{
          if(res.code===0){
            let arr=res.data.hotkey;
            this.hotkey=arr.slice(0,15);
          }
        });
      },
      blurInput(){  
        this.$refs.searchBox.blur();
      },
      getQuery(query){
        this.query=query;
      },
      selectKey(item){    //点击关键词查找
        let query=item.k;
        this.$refs.searchBox.setQuery(query);
        this.$refs.suggest.search();
      },
      selectSong(item){
        this.$refs.searchBox.setQuery(item);
        this.$refs.suggest.search();
      },
      insertHistory(){
        this.saveSearchHistory(this.query);
      },
      clearHistory(){
        this.setSearchHistory([]);
        storage.clear(SEARCH_KEY);
      }
  },
  components: {
    myHeader,
    SearchBox,
    suggest,

  }
};
</script>
<style scoped>
.suggest{
  height: calc(100vh - 14rem);
  overflow: hidden;
}
.search {
  background-color: #242424;
  height: 100vh;
  color: #fff;
}
h2{
  text-indent: 2rem;
  height: 1.6rem;
  color: #ddd;
}
.historyTitle{
  display: flex;
  align-items: center;
  height: 2.5rem;
  justify-content: space-between;
}
.searchHistory{
  margin-top: 0.6rem;

}
.del{
  height: 1.8rem;
  margin-right: 2rem;
}
.hotkey,.history{
  display: flex;
  justify-content: flex-start;
  margin: 0 1rem;
  flex-wrap: wrap;
}
.hotkey{
  border-bottom: 1px solid #4b4b4b;
  padding-bottom: 1rem;
}
.hotkey li{
  height: 2rem;
  line-height: 2rem;
  border: 1px solid #5f5f5f;
  color: #b9b9b9;
  padding: 0 0.6rem;
  border-radius: 1rem;
  margin: 0 0.3rem;
  margin-top: 0.5rem;
}
.history li{
  height: 2rem;
  line-height: 2rem;
  border: 1px solid #5f5f5f;
  color: #b9b9b9;
  padding: 0 0.6rem;
  border-radius: 1rem;
  margin: 0 0.3rem;
  margin-top: 0.5rem;
}
</style>

