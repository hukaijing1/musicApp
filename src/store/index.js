import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NOOD_ENV !== 'production';    //开发环境进行检测
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,    //如果state状态不是有mutaitons进行改变将抛出错误
    plugins:debug?[createLogger()]:[]   //生成state操作日志
})