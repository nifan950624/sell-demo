<template>
  <div class="cartfood">
    <transition>
      <div 
      v-show="food.count > 0"
      class="disceaseCount icon-remove_circle_outline"
      @click="decreaseCountClick"
      ></div>
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
    addCountClick() {
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else {
        this.food.count++
      }
      this.$emit('changeCount',this.food) 
    },
    decreaseCountClick() {
      this.food.count--
      this.$emit('changeCount',this.food)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartfood
    font-size: 0
    .disceaseCount,.addCount
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color:rgb(0,160,220)
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
      animation move 0.5 linear 
</style>
