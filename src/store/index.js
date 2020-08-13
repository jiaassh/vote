import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state:sessionStorage.getItem('store')? JSON.parse(sessionStorage.getItem('store')): state,
    mutations
})