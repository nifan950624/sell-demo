<template>
  <div id="app">
    <home-header :seller="seller"></home-header>
      <div class="item-tab border-bottom">
        <router-link tag="div" to="/goods" class="item">商品</router-link>
        <router-link tag="div" to="/ratings" class="item">评价</router-link>
        <router-link tag="div" to="/seller" class="item">商家</router-link>
      </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import homeHeader from '@/components/header/header'
const ERR_OK = 0
export default {
  name: 'App',
  components: {
    homeHeader
  },
   data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.$nextTick(() => {
          this.seller = res.body.data 
        })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~style/mixin'
  #app
    .item-tab
      width: 100%
      line-height: 40px  
      display: flex
      boder-color(rgba(7, 17,27,0.1))      
      .item 
        flex 1
        text-align center
        color: rgb(75, 85, 93)
      .active
        font-size: 14px
        color:  rgb(240, 20 ,20)
</style>
