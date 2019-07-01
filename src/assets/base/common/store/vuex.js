import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default 
  new vuex.Store({
    state: {
      count: 0,
      collect: false,
      totlePrice: 0,
      totleCount: 0,
    },
    mutations: {
      totilePrice(state,price) {
        state.totilePrice = price
      },
      totleCount(state,count) {
        state.totleCount = count
      }
    }
  })