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
      <div class="float-wrapper-button">5个
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin">
      <span class="notice">
      </span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right">
      </span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width=100% height=100%>
    </div>
    <!-- <div class="float-wrapper">
      <div class="">{{seller.name}}</div>

    </div> -->
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
    seller: Object
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
        // .float-wrapper
        // position: absolute
        // left: 0
        // right: 0
        // top: 0
        // bottom: 0
        // background: rgba(7,17,27,0.8)
        // z-index: 1
</style>
