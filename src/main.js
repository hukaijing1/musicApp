// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
import store from './store'
Vue.config.productionTip = false

fastclick.attach(document.body);  //解决手机屏幕点击300毫秒延迟的问题
Vue.use(vueLazyLoad, {
  loading: require('./common/images/logo.png'),
  attempt: 10000000,
  preLoad:2
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
