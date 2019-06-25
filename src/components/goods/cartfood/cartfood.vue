<template>
  <div class="cartfood">
    <transition>
      <div
      v-show="food.count > 0"
      @click="decreaseCountClick"
      class="disceaseCount"
      transition="move"
      >
        <span class="icon-remove_circle_outline"></span>
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
  computed: {
    
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
      this.bus.$emit('changeCount',this.food)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartfood
    font-size: 0
    .disceaseCount
      display: inline-block
      &.v-enter,&.v-leave-to
        opacity: 0
        transform: translate3d(24px,0,0)
      .icon-remove_circle_outline
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color:rgb(0,160,220)
      &.v-enter-active,&.v-leave-active
        transform: translate3d(0,0,0) 
        transition: all 0.35s linear
    .count
      display: inline-block
      vertical-align: top
      text-align: center
      margin-top: 6px
      width: 12px
      line-height: 24px
      font-size: 10px
      color: rgb(147,153,159)
    .addCount
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color:rgb(0,160,220)
      
</style>
