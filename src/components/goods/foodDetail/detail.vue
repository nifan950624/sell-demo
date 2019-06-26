<template>
  <transition name="move">
    <div 
    v-show="showflag"
    class="detail">
      <div class="header">
        <div class="image-wrapper">
          <img  class="img" :src="selectedFood.image">
        </div>
        <div class="back-wrapper">
          <i 
          @click="handleCloseClick"
          class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="desc">
        <h1 class="name">{{selectedFood.name}}</h1>
        <div class="SalesAndrate">
          <span class="sellCount">
            月销{{selectedFood.sellCount}}份
          </span>
          <span class="ratetext">
            好评率{{selectedFood.rating}}%
          </span>
        </div>
        <div class="price">
          <span class="newPrice">￥{{selectedFood.price}}</span>
          <span class="oldPrice">￥{{selectedFood.oldPrice}}</span>
        </div>
        <div class="addCartButton">加入到购物车</div>
      </div>
      <div class="Separate border-topbottom"></div>
      <div class="introduce">
        <h2 class="title">商品介绍</h2>
          <p class="info">
            {{selectedFood.info}}
          </p>
      </div>
      <div class="Separate border-topbottom"></div>
      <div class="goodRates">
        <div class="rataTitle">商品评价</div>
        <div class="buttons border-bottom">
          <div class="all">全部</div>
          <div class="recommend">推荐</div>
          <div class="bad-rate">吐槽</div>
        </div>
        <ul>
          <div class="seen">
            <i class="icon-check_circle"></i>
            <span class="selectrate">只看有内容的评价</span>
          </div>
          <li class="rate border-bottom">
            <div class="rate-data">
              <span class="data">2016-07-07</span><span class="time">12:34</span>
            </div>
            <div class="content">
              <i class="icon-thumb_down"></i>
              <span class="text">太少了不够吃</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    props: {
      selectedFood: {
        type: Object
      }
    },
  data() {
    return {
      showflag: false
    }
  },
  methods: {
    showDetail() {
      this.showflag = true    
    },
    handleCloseClick() {
      this.showflag = false
    }
  } 
}
</script>

<style lang="stylus" scoped>
  .detail
    position: fixed
    top: 0
    bottom: 48px
    left: 0
    width: 100%
    z-index: 20
    background: white
    overflow: auto
    transform: translate3d(0,0,0)
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translate3d(100%,0,0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.35s
    .header
      position: relative
      max-width: 100%
      .image-wrapper
        width: 100%
        height: 0
        padding-bottom: 100%
        .img
          width: 100%
      .back-wrapper
        position: absolute
        top: 10px
        left: 5px
        .icon-arrow_lift
          display: inline-block
          padding: 10px
          font-size: 20px
          color: #fff
    .desc
      position: relative
      padding: 18px
      .name
        line-height: 14px
        font-weight: 700
        font-size: 14px
        color: rgb(7,17,27)
      .SalesAndrate
        margin-top: 8px
        line-height: 10px
        font-size: 0px
        color: rgb(147,153,159)
        .sellCount,.ratetext
          display: inline-block
          vertical-align: top
          font-size: 10px
        .ratetext
          margin-left: 12px
      .price
        margin-top: 18px
        font-size: 0
        .newPrice
          display: inline-block
          vertical-align: top
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240,20,20)
        .oldPrice
          display: inline-block
          vertical-align: top
          margin-left: 6px
          line-height: 24px
          font-size: 10px
          font-weight: 700
          color: rgb(147,153,159)
          text-decoration: line-through
      .addCartButton
        position: absolute
        right: 18px
        bottom: 18px
        width: 74px
        height: 24px
        text-align: center
        border-radius: 12px
        color: #fff
        line-height: 24px
        font-size: 10px
        background: rgb(0,160,220)
    .Separate
      height: 18px
      background: #f3f5f7
      &.border-topbottom::before,&.border-topbottom::after
        border-color: rgba(7,17,27,0.1)
    .introduce
      padding: 18px
      .title
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .info
        margin-top: 6px
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77,85,93)
    .goodRates
      padding: 18px
      .rataTitle
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .buttons
        padding: 18px 0
        line-height: 16px
        font-size: 0
        &.border-bottom::before
          border-color: rgba(7,17,27,0.1)
        .all,.recommend,.bad-rate
          display: inline-block
          vertical-align: top
          padding: 2px 8px
          text-align: center
          font-size: 12px
          background: rgb(0,160,220)
          border-radius: 2px
          color: #fff
        .recommend
          margin: 0 8px
          background: rgba(0,160,220,0.2)
          color: rgb(75,85,93)
        .bad-rate
          background: rgba(77,85,93,0.2)
          color: rgb(75,85,93)
    .seen
      padding: 12px 0
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      font-size: 0
      .icon-check_circle,.selectrate
        display: inline-block
        vertical-align: top
        font-size: 12px
        color: rgb(147,153,159)
      .icon-check_circle
        font-size: 24px
        margin-right: 4px 
    .rate
      padding: 16px 0
      &.border-bottom::before
        border-color: rgba(7,17,27,0.1)
      .rate-data
        line-height: 12px
        color: rgb(147,153,159)
        overflow: hidden
        .data,.time
          display: inline-block
          vertical-align: top
        .time
          margin-left: 6px
      .content
        margin-top: 6px
        font-size: 0
        line-height: 24px
        .icon-thumb_down,.text
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: #000
        .icon-thumb_down
          margin-top: 6px
          color: rgb(147,153,159)
          margin-right: 4px

        
      


</style>
