<template>
<div class="seller" ref="wrapper">
  <div>
    <div class="header">
      <div class="header-top border-bottom">
        <h1 class="title">{{seller.name}}</h1>
        <div class="scoreAndSellCount">
          <div class="star-wrapprt">
            <star :size=36 :score="seller.score"></star>
          </div>
          <span class="rateNumber">({{seller.ratingCount}})</span>
          <span class="sellCount">月销{{seller.sellCount}}单</span>
        </div>
        <div class="collect">
          <div 
          @click="handleCollectClick"
          class="icon-wrapper">
            <i 
            class="icon-favorite"
            :class="{'active' : collect}"
            ></i>
          </div>
          <div class="text">{{sellectCollect}}</div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="item border-right">
          <div class="minPrice">起送价</div>
          <div class="num">{{seller.minPrice}}<span class="unit">元</span></div>
        </div>
        <div class="item">
          <div class="deliveryPrice">商家配送</div>
          <div class="num">{{seller.deliveryPrice}}<span class="unit">元</span></div>
        </div>
        <div class="item border-left">
          <div class="deliveryTime">平均配送时间</div>
          <div class="num">{{seller.deliveryTime}}<span class="unit">分钟</span></div>
        </div>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h2 class="bulletin-title">公告与活动</h2>
      <p class="bulletin-text border-bottom">{{seller.bulletin}}</p>
      <ul class="activities">
        <li
        class="active-item border-bottom" 
        v-for="(item,index) of seller.supports"
        :key="index"
        >
        <span class="icon"
        :class="classList[item.type]"
        ></span><span class="text">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="sellerImages">
      <h2 class="sellerImages-title">商家实景</h2> 
      <swiper :options="swiperOption">
        <swiper-slide v-for="(pic,index) of seller.pics" :key="index">
        <img class="image" :src="pic" width=100%>
        </swiper-slide>
      </swiper>  
    </div>
    <split></split>
    <div class="seller-message">
      <h2 class="seller-message-title border-bottom">商家实景</h2>
      <ul class="info-list">
        <li 
        v-for="(info,index) of seller.infos"
        :key="index"
        class="info-item border-bottom"
        >{{info}}
        </li>
      </ul>
    </div>
  </div>
  <shop-cart
  :minPrice="seller.minPrice"
  :deliveryPrice="seller.deliveryPrice"
  ></shop-cart>
</div>
</template>

<script>
require('swiper/dist/css/swiper.css')
import shopCart from '../goods/shopCart/shopCart'
import Vue from 'vue'
import BScroll from 'better-scroll'
import star from 'base/common/star/star'
import split from '../split/split'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {saveLocal} from './locaStorage.js'
import {getter} from './locaStorage.js'
Vue.use(VueAwesomeSwiper)
export default {
  name: 'seller',
  props: {
    seller: Object
  },
  computed: {
    sellectCollect() {
      if(this.collect) {
        return "已收藏"
      }else {
        return "未收藏"
      }
    }
  },
  data() {
    return {
      classList: ['discrease','discount','guarantee','invoice','special'],
      collect: false,
      swiperOption: {
        slidesPerView : 3,
        spaceBetween : 6,
      }
    }
  },
  methods: {
    handleCollectClick() {
      this.collect = !this.collect
      saveLocal(this.seller.id,'collect',this.collect)
    }
  },
  components: {
    star,
    split,
    shopCart
  },
  created() {
    this.$nextTick(()=> {
       if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper,{
          click: true
        })
      }else {
        this.scroll.refresh()
      }
      getter(this.seller.id,'collect', (value)=> {
        this.collect = value
      })
    })
  },
}
</script>

<style lang="stylus" scoped>
@import '~style/mixin'
  .seller
    position: absolute
    width: 100%
    top: 174px
    bottom: 48px
    overflow: hidden
    .header
      padding: 18px
      .header-top
        padding-bottom: 18px
        &.border-bottom::before
          border-color: rgba(7,17,27,0.1)
        .title
          height: 14px
          line-height: 14px
          color: rgb(7,17,27)
          font-size: 14px
          font-weight: 700
        .scoreAndSellCount
          margin-top: 8px
          height: 18px
          line-height: 18px
          font-size: 0
          .star-wrapprt
            display: inline-block
            vertical-align: top
            margin-top: 3px
          .rateNumber,.sellCount
            font-size: 10px
            color: rgb(147,153,159)
            margin-left: 8px
          .sellCount
            margin-left: 12px
        .collect
          position: absolute
          right: 0
          bottom: 18px
          width: 30px
          text-align: center
          .icon-wrapper
            margin-bottom: 4px
            .icon-favorite
              line-height: 24px
              font-size: 24px
              color: rgb(77,85,93)
              &.active
                color: rgb(240,20,20)
          .text
            line-height: 10px
            font-size: 10px
            color: rgb(77,85,93)
            white-space: nowrap
      .header-bottom
        margin-top: 18px
        display: flex
        .item
          flex: 1
          text-align: center
          &.border-right::before,&.border-left::before
            border-color: rgba(7,17,27,0.1)
          .minPrice,.deliveryPrice,.deliveryTime
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .num
            margin-top: 4px 
            height: 18px
            line-height: 18px
            font-size: 24px
            color: rgb(7,17,27)
            .unit
              line-height: 18px
              font-size: 10px
              color: rgb(7,17,27)
    .bulletin
      padding: 0 18px
      .bulletin-title
        height: 14px
        line-height: 14px
        color: rgb(7,17,27)
        font-size: 14px
        font-weight: 700
        margin-top: 18px
      .bulletin-text
        padding: 8px 12px 16px 12px
        line-height: 24px
        font-size: 12px
        color: rgb(240,20,20)
        &.border-bottom::before
            border-color: rgba(7,17,27,0.1)
      .activities
        .active-item
          padding: 16px 12px
          &.border-bottom::before
            border-color: rgba(7,17,27,0.1)
          &:last-child::before
            display: none
          .icon
            display: inline-block
            vertical-align: top
            margin-top: 2px
            width: 12px
            height 12px
            background-size: cover
            background-repeat: no-repeat
            margin-right: 6px
            &.discrease
              bg-img('decrease_4')
            &.discount
              bg-img('discount_4')
            &.guarantee
              bg-img('guarantee_4')
            &.invoice
              bg-img('invoice_4')
            &.special
              bg-img('special_4')
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
    .sellerImages
      padding: 18px 0 18px 18px
      .sellerImages-title
        margin-bottom: 12px
        height: 14px
        line-height: 14px
        color: rgb(7,17,27)
        font-size: 14px
        font-weight: 700
      .images
        width: 100%
        height: 0
        padding-bottom: 90px
    .seller-message
      padding: 18px 18px 0 18px
      .seller-message-title
        padding-bottom: 12px
        height: 14px
        line-height: 14px
        color: rgb(7,17,27)
        font-size: 14px
        font-weight: 700
        &.border-bottom::before
          border-color: rgba(7,17,27,0.1)
      .info-list
        .info-item
          padding: 16px 12px
          line-height: 16px
          font-size: 12px
          color: rgb(7,17,27)
          &.border-bottom::before
            border-color: rgba(7,17,27,0.1)
          &:last-child::before
            display: none
</style>
