<template>
  <div id="app">
    <home-header></home-header>
      <div class="item-tab border-bottom">
          <router-link tag="div" to="/goods" class="item">商品</router-link>
          <router-link tag="div" to="/ratings" class="item">评价</router-link>
          <router-link tag="div" to="/seller" class="item">商家</router-link>
        </div>
      <router-view/>
  </div>
</template>

<script>
import homeHeader from '@/components/header'
export default {
  name: 'App',
  components: {
    homeHeader
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
