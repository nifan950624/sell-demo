<template>
  <div class="float-wrapper">
    <div class="toggle">
        <div class="icon-close"></div>
    </div>
    <div class="title">{{seller.name}}</div>
    <div class="rank"></div>
    <div class="discount-message">
      <div class="name"><h2 class="title-message">优惠信息</h2></div>
      <div class="movement" 
      v-if="seller.supports">
        <span class="icon" :class="
        classList[seller.supports[0].type]"></span>{{seller.supports[0].description}}
      </div>
    </div>
    <div class="seller-bulletin">
      <div class="name"><h2 class="title-message">商家公告</h2></div>
      <p class="desc">{{seller.bulletin}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: Object,
    classList: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/mixin'
  .float-wrapper
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: black
    padding: 0 36px
    z-index: 99
    .toggle
      position: absolute
      bottom: 32px
      left: 50%
      transform: translateX(-50%)
      .icon-close
        height: 0
        padding-bottom: 32px
        width: 32px 
        font-size: 32px
        color: rgba(255, 255, 255, 0.5) 
    .title
      text-align: center
      line-height: 16px
      font-weight: 700
      font-size: 16px
      margin-top: 64px
    .rank
      text-align: center
      height: 0
      margin-top: 16px
      padding-bottom: 24px
      overflow: hidden
      background: red
    .discount-message, .seller-bulletin
      .name
        display: flex
        margin-top: 28px
        font-size: 14px
        .title-message
          padding: 0 12px
        &::after,&::before
          flex: 1
          content: ''
          display: block
          height: 0
          width: 122px
          border-top: 1px solid white
          margin-top: 7px
      .desc
        line-height: 24px
        margin-top:24px
        padding:0 12px
        font-size: 12px
</style>
