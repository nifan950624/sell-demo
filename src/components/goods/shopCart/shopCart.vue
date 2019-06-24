<template>
  <div class="shopcart">
    <div class="shopleft">
      <div 
      class="shop-wrapper"
      :class="{'heightLight': totileCount > 0}"
      >
        <div class="foodCount">{{totileCount}}</div>
        <div 
        class="icon-shopping_cart"
        :class="{'heightLight': totileCount > 0}"
        ></div>
      </div>
      <div class="content">
        <div class="price"
        :class="{'heightLight': totilePrice > 0}"
        >￥{{totilePrice}}</div>
        <div class="needPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>
    </div>
    <div class="shopright">
      <div class="minPrice" 
      v-show="!totileCount">￥{{minPrice}}起送</div>
      <div class="minPrice" 
      v-show="Spread > 0">还差￥{{minPrice - totilePrice}}起送</div>
      <div 
      class="minPrice"
      :class="{'heightLight': Spread <= 0}" 
      v-show="Spread <= 0">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sellectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totilePrice() {
      let price = 0
      this.sellectFoods.forEach((food) => {
        price += food.price * food.count
      })
      return price
    },
    totileCount() {
      let count = 0
      this.sellectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    Spread() {
      return this.minPrice - this.totilePrice
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
        &.heightLight
          .foodCount
            position: absolute
            right: 0
            top: 0
            text-align: center
            width: 24px
            height: 16px
            line-height: 16px
            font-size: 12px
            font-weight: 700
            border-radius: 16px
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0px rgba(0,0,0,0.4)  
        .icon-shopping_cart
          font-size: 24px
          text-align: center
          width: 100%
          line-height: 44px
          color: rgba(255,255,255,0.4)
          background: rgb(43,52,60)
          border-radius: 50%
          box-sizing: border-box
          &.heightLight
            background: rgb(0,160,220) 
            color: #fff
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
          &.heightLight
            color: rgb(255,255,255)
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
      width: 105px
      .minPrice
        text-align: center
        line-height: 48px
        background: rgb(43,51,59)
        color: rgba(255,255,255,0.4)
        font-size: 12px
        font-weight: 700
        &.heightLight
          background: rgb(76,217,111)
          color: #fff
</style>
