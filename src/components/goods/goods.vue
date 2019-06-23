<template>
  <div class="goods border-top">
    <div class="food-nav"></div>
    <div class="foods-list"></div>
  </div>
</template>

<script>
  const ERR_OK = 0
export default {
  name: 'goods',
  props: {
    seller: Object
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this.$http.get('api/goods').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.goods = res.body.data
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    position: absolute
    display: flex
    top: 174px
    bottom: 58px
    left: 0
    right: 0
    overflow: hidden
  .border-top
    &::before
      border-color: rgba(7,17,27,0.1) 
    .food-nav
      flex: 0 0 80px
      background: #f3f5f7
</style>
