<template>
  <div class="shopcart">
    <div class="shopleft">
      <div class="shop-wrapper">
        <div class="icon-shopping_cart"></div>
      </div>
      <div class="content">
        <div class="price">￥0</div>
        <div class="needPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>
    </div>
    <div class="shopright">
      <div class="minPrice">￥{{minPrice}}起送</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .shopcart
    position: fixed
    display: flex
    left: 0
    bottom: 0
    width : 100%
    height: 48px
    background: rgb(0, 0, 0)
    font-size: 0
    .shopleft
      flex: 1
      .shop-wrapper
        position: relative
        display: inline-block
        vertical-align: top
        width: 56px
        height: 56px
        top: -10px
        margin: 0 12px
        padding: 6px
        background: rgb(0, 0, 0)
        border-radius: 50%
        box-sizing: border-box
        .icon-shopping_cart
          font-size: 24px
          text-align: center
          width: 100%
          line-height: 44px
          color: rgba(255,255,255,0.4)
          background: rgb(43,52,60)
          border-radius: 50%
          box-sizing: border-box
      .content
        display: inline-block
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,0.4)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
        .needPrice
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-left: 12px
          font-size: 10px
          font-weight: 700
          color: rgba(255,255,255,0.4)
    .shopright
      flex: 0 0 105px
      text-align: center
      width: 105px
      line-height: 48px
      background: rgb(43,51,59)
      color: rgba(255,255,255,0.4)
      font-size: 12px
      font-weight: 700
</style>
