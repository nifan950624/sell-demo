<template>
  <transition name="fold">
    <div class="cartContain">
      <div class="header">
        <span class="shop-cart">购物车</span>
        <span class="delete">清空</span>
      </div>
      <div class="cartlist">
        <ul>
          <li class="list-item border-bottom" 
          v-for="(food,index) of sellectFoods"
          :key="index"
          >
              <span class="name">{{food.name}}</span>
              <span class="price">￥{{food.count*food.price}}</span>
              <div class="cartfood-wrapper">
                <cartfood :food="food"></cartfood>
            </div>  
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import cartfood from '@/components/goods/cartfood/cartfood'
export default {
  props: {
    sellectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    cartfood
  },
}
</script>

<style lang="stylus" scoped>
    .cartContain
      position: absolute
      max-height: 257.5px
      overflow: hidden
      bottom: 0
      left: 0
      width: 100%
      z-index: 100
      background: white
      font-size: 0
      z-index: 98
      &.fold-enter-active,&.fold-leave-active
        transform: translate3d(0, 0, 0)
        transition: all 0.3s
      &.fold-enter,&.fold-leave-to
        opacity: 0
        transform: translate3d(0, 100%, 0)
      .header
        height: 40px
        line-height: 40px
        padding:0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .shop-cart
          float: left
          font-size: 14px
        .delete
          float: right
          font-size: 12px
          color: rgb(0,160,220)
      .cartlist
        .list-item
          position: relative
          height: 48px
          margin:0 18px
          &.border-bottom::before
            border-color: rgba(7,17,27,0.1)
          .name
            line-height: 48px
            font-size: 14px
            color: rgb(7,17,27)
          .price
            position: absolute
            top: 12px
            right: 90px
            line-height: 24px
            color: rgb(240,20,20)
            font-weight: 700
            font-size: 14px
          .cartfood-wrapper
            position: absolute
            top: 6px
            right: 0
           

</style>
