<template>
    <div id="singer">
        <my-header ref='header'></my-header>
        <listview class="listview" ref='scroll' :data='singers'></listview>
        <router-view></router-view>
    </div>
</template>
<script>
import myHeader from "../header/header";
import { getSingerList } from "@/api/getSingerList";
import { ERR_OK } from "@/api/config";
import Singer from "@/common/js/singer";
import listview from "@/base/listview/listview";
import { mapMutations } from "vuex";
const HOT_NAME = "热门";
const HOT_LENGTH = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    getSinger(singer) {
      this.setSinger(singer);
      let id = singer.id;
      this.$router.push({ path: `/singer/${singer.id}` });
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    _getSingerList() {
      getSingerList().then(res => {
        this.singers = this._normalizeSinger(res.data.list);
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.items.push(new Singer(item.Fsinger_name, item.Fsinger_mid));
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer(item.Fsinger_name, item.Fsinger_mid));
      });
      let hot = [];
      let ret = [];
      for (var i in map) {
        let val = map[i];
        if (val.title == HOT_NAME) {
          hot.push(map[i]);
        } else if (map[i].title.match(/[a-zA-Z]/)) {
          ret.push(map[i]);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    }
  },
  components: {
    myHeader,
    listview
  }
};
</script>
<style scopes>
#singer {
  position: fixed;
  top: 0px;
  width: 100%;
}

.listview {
  height: calc(100vh - 7rem);
  overflow: hidden;
  position: relative;
}
</style>

