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
        <div class="movement" v-if="seller.supports"><span class="icon" :class="classList[seller.supports[0].type]"></span>{{seller.supports[0].description}}</div>
      </div>
    </div>
    <div class="bulletin"><span class="notice"></span>{{seller.bulletin}}</div>
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
    color: white
    .content
      display: flex
      padding: 24px 12px 18px 24px
      font-size: 0
      background-color: rgba(7, 17, 27, 0.5 )
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
      line-height: 28px
      padding: 0 12px
      font-size: 10px
      background-color: rgba(7, 17, 27, 0.2)
      ellipsis()  
      .notice
        display: inline-block
        vertical-align: middle
        margin-right: 4px
        bg-img('bulletin')
        width: 22px
        height: 12px
        background-size: cover
        background-repeat: no-repeat
    // .float-wrapper
    //   position: absolute
    //   left: 0
    //   right: 0
    //   top: 0
    //   bottom: 0
    //   background: rgba(7,17,27,0.8)
    //   z-index: 1
            
      
</style>
