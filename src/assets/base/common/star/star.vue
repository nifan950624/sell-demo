<template>
  <div>
    <div :class="starType">
      <div 
      class="star-item" 
      v-for="(itemClass,index) of itemClasses" 
      :class="itemClass" 
      :key="index"
      ></div>
    </div>
  </div>  
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    starType() {
      return  'star-'  + this.size
    },
    itemClasses() {
      const result = []
      const score = Math.floor(this.score * 2)/ 2
      const Integer = Math.floor(this.score)
      const Decmail = this.score - Integer
      for(let i = 0; i < Integer ; i++){
         result.push(CLS_ON)
      }
      if(Decmail && Decmail >= 0.5) {
        result.push(CLS_HALF)
      }
      while(result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
  
}
</script>

<style lang="stylus" scoped>
@import '~style/mixin'
    .star-24
      width: 90px
      height: 0px
      padding-bottom: 10px
      font-size: 0
      .star-item
        display: inline-block
        margin-right: 10px
        width: 10px
        height: 10px
        &.on
          bg-img('star24_on')
          background-size: cover
        &.half
          bg-img('star24_half')
          background-size: cover
        &.off
          bg-img('star24_off')
          background-size: cover
      .star-item:last-child
        margin-right: 0
    .star-36
      height: 0px
      padding-bottom: 15px
      font-size: 0
      .star-item
        display: inline-block
        margin-right: 15px
        width: 15px
        height: 15px
        &.on
          bg-img('star36_on')
          background-size: cover
        &.half
          bg-img('star36_half')
          background-size: cover
        &.off
          bg-img('star36_off')
          background-size: cover
      .star-item:last-child
        margin-right: 0
    .star-48
      height: 0px
      padding-bottom: 20px
      font-size: 0
      .star-item
        display: inline-block
        width: 20px
        height: 20px
        margin-right: 20px
        &.on
          bg-img('star48_on')
          background-size: cover
        &.half
          bg-img('star48_half')
          background-size: cover
        &.off
          bg-img('star48_off')
          background-size: cover
      .star-item:last-child
        margin-right: 0
</style>
