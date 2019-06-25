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
    <div class="ball-contain">
        <div 
        v-for="(ball,index) of balls" 
        :key="index" 
        > 
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            name="dropball"
          >
            <div 
            class="ball"
            v-show="ball.show"
            >
                <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
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
  data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
        ],
        dropBalls: []
      }
    },
  methods: {
    drop() {
      this.bus.$on('addcart', (el) => {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return 
          }
        }
      })
    },
    beforeEnter(el) {
      let count = this.balls.length
      while(count--) {
        let ball = this.balls[count]
        if(ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el,done) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend',done)
        })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
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
          width: 40px
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
    .ball-contain
      position: fixed
      bottom: 22px
      left: 32px
      .ball
       &.dropball-enter-active
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            background: red
            transition: all 0.4s linear
      
</style>
