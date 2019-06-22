<template>
  <div class="header">
    <div class="content">
      <div class="content-avatar">
        <img :src="seller.avatar" width=64 height=64>
      </div>
      <div class="brand">
        <div class="title">
          <span class="title-img"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}/38分钟必达</div>
        <div class="movement" v-if="seller.supports"><span class="icon" :class="classList[seller.supports[0].type]"></span>{{seller.supports[0].description}}
        </div>
      </div>
      <div class="float-wrapper-button"
      @click="handleShowClick"
      >5个
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin">
      <span class="notice">
      </span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"
      @click="handleShowClick"
      >
      </span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width=100% height=100%>
    </div>
    <div v-show="toggle" class="float-wrapper">
      <div class="toggle">
          <div class="icon-close"
          @click="handleCloseClick"
          ></div>
      </div>
      <div class="title">{{seller.name}}</div>
      <div class="rank"></div>
      <div class="discount-message">
        <div class="name"><h2 class="title-message">优惠信息</h2></div>
        <div class="movement" 
        v-if="seller.supports">
          <span class="icon" 
          :class="classList[seller.supports[0].type]"></span>{{seller.supports[0].description}}
        </div>
      </div>
      <div class="seller-bulletin">
        <div class="name"><h2 class="title-message">商家公告</h2></div>
        <p class="desc">{{seller.bulletin}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import floatWrapper from './components/float-wrapper'
export default {
  name: 'Header',
  props: {
    seller: Object
  },
  data() {
    return {
      toggle: false
    }
  },
  methods: {
    handleCloseClick() {
      this.toggle = false
    },
    handleShowClick() {
      this.toggle = true
    }
  },
  created() {
    this.classList = ['discrease','discount','guarantee','invoice','special']  
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/mixin'
  .header
    position: relative
    color: white
    background-color: rgba(7, 17, 27, 0.5 )
    overflow: hidden
    .content
      position: relative 
      display: flex
      padding: 24px 0 18px 24px
      font-size: 0
      .float-wrapper-button
        position: absolute
        height: 24px
        line-height : 24px
        bottom: 14px
        right: 12px
        background: rgba(0,0,0,0.2)
        border-radius: 14px
        font-size: 10px
        padding: 0 8px
      .content-avatar
        height: 0
        padding-bottom: 64px;
        overflow: hidden 
        border-radius: 2px
      .brand
        margin-left: 18px
        font-size: 12px
        .title 
          margin-top: 2px  
          .title-img
            vertical-align: top
            display inline-block
            width: 30px
            height: 18px   
            bg-img('brand')
            background-size: cover
            background-repeat: no-repeat
          .name
            font-size: 16px
            font-weight: bold
            margin-left: 6px  
        .desc
          margin:8px 0 10px 0
          font-size: 12px
          line-height: 12px
        .movement
          font-size: 10px
          line-height: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height 12px
            background-size: cover
            background-repeat: no-repeat
            margin-right: 4px
            &.discrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
    .bulletin
      position: relative
      line-height: 28px
      padding: 0 16px 0 12px
      background-color: rgba(7, 17, 27, 0.2)
      ellipsis()   
      .notice
        display: inline-block
        vertical-align: top
        margin-right: 4px
        margin-top: 7px
        bg-img('bulletin')
        width: 22px
        height: 12px
        background-size: cover
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 10px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px) 
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
