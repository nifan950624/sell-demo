<template>
  <div class="cartfood">
      <transition name="fade">
          <div
          v-show="food.count > 0" 
          class="discreaseCount"
          @click="decreaseCountClick"
          >
            <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
    <div class="count"
    v-show="food.count > 0" 
    >{{food.count}}</div>
    <div
    @click="addCountClick"
    class="addCount icon-add_circle"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  methods: {
    addCountClick(e) {
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else {
        this.food.count++
      }
      this.bus.$emit('addcart',e.currentTarget)
    },
    decreaseCountClick() {
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartfood
    font-size: 0
    height: 36px
    .discreaseCount
      display: inline-block
      padding: 6px
      height: 24px
      transition: all 0.4s linear
      .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.fade-enter-active,&.fade-leave-active
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          transition: all 0.4s linear
          transform: rotate(0)
      &.fade-enter, &.fade-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .addCount
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color:rgb(0,160,220)
      
</style>
