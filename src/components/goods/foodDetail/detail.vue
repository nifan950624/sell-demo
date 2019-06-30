<template>
  <transition name="move">
    <div 
    v-show="showflag"
    class="detail"
    ref="wrapper"
    >
      <div>
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
            <span class="oldPrice"
            v-show="selectedFood.oldPrice"
            >￥{{selectedFood.oldPrice}}</span>
          </div>
          <div class="cartfood-wrapper">
            <cartfood 
            :food="selectedFood"
            ></cartfood>
          </div>
          <transition name="fade">
            <div 
            class="addCartButton"
            @click="addFood"
            v-show="!selectedFood.count || selectedFood.count===0"
            >
            加入到购物车
            </div>
          </transition>
        </div>
        <split></split>
        <div class="introduce">
          <h2 class="title">商品介绍</h2>
            <p class="info">
              {{selectedFood.info}}
            </p>
        </div>
        <split></split>
        <div class="goodRates">
          <div class="rataTitle">商品评价</div>
          <rating
          :select-type="selectType"
          :seen-content="seenContent"
          :button-content="buttonContent"
          :ratings="ratings"
          @typeChange="handleTypeChange"
          @contentChange="handleContentChange"
          ></rating>
        <ul v-show="ratings.length">
          <li 
          v-show="selectShow(rating.rateType, rating.text)"
          class="rate border-bottom"
          v-for="(rating,index) of ratings"
          :key="index"
          >
            <div class="rate-data">
              <span class="time">{{rating.rateTime | formDate}}</span>
            </div>
            <div class="content">
              <i 
              :class="rating.rateType === 1? 'icon-thumb_down' :'icon-thumb_up'"></i>
              <span class="text">{{rating.text}}</span>
            </div>
            <div class="usermsg">
              <div class="name">{{rating.username}}</div>
              <div class="avatar">
                <img 
                class="img"
                :src="rating.avatar">
              </div>
            </div>
          </li>
        </ul>
        <div class="no-ratings" v-show="!ratings.length">暂无评价内容</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartfood from '../cartfood/cartfood'
import rating from '@/components/rating/rating'
import split from '@/components/split/split'
import {getDate} from 'base/common/js/Date.js'
const ALL = 2
export default {
    props: {
      selectedFood: {
        type: Object
      },
      ratings: {
        type: Array,
        default() {
          return []
        }
      }
    },
  data() {
    return {
      showflag: false,
      selectType: ALL,
      seenContent: false,
      buttonContent: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
      }
    }      
  },
  components: {
    cartfood,
    rating,
    split
  },
  filters: {
    formDate(time) {
      return getDate(time)
    }
  },
  methods: {
    selectShow(type,text) {
      if (this.seenContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      }else {
        return this.selectType === type
      }
    },
    addFood(e) {
      Vue.set(this.selectedFood, 'count', 1)
      this.bus.$emit('addcart',e.currentTarget)
    },
    showDetail() {
      this.showflag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper,
          {
            click: true
          })
        }else {
          this.scroll.refresh()
        }
      })   
    },
    handleCloseClick() {
      this.showflag = false
    },
    handleContentChange(content) {
      this.seenContent = content
      this.$nextTick(()=> {
        this.scroll.refresh()
      })
    },
    handleTypeChange(type) {
      this.selectType = type
      this.$nextTick(()=> {
        this.scroll.refresh()
      })
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
    overflow: hidden
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
        .img
          width: 100%
      .back-wrapper
        position: absolute
        top: 10px
        left: 5px
        border-radius: 50%
        background: rgba(0,0,0,0.2)
        .icon-arrow_lift
          display: inline-block
          padding: 10px
          font-size: 20px
          color: #fff
    .desc
      position: relative
      padding: 18px
      .name
        height: 14px
        line-height: 14px
        font-weight: 700
        font-size: 14px
        color: rgb(7,17,27)
      .SalesAndrate
        margin-top: 8px
        height: 10px
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
      .cartfood-wrapper
        position: absolute
        right: 12px
        bottom: 12px
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
        z-index: 20
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.3s
        &.fade-enter,&.fade-leave-to
          opacity: 0
    .introduce
      padding: 18px
      .title
        height: 14px 
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
      padding: 18px 0
      .rataTitle
        height: 14px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .rate
        position: relative
        padding: 16px 0
        margin: 18px
        &.border-bottom::before
          border-color: rgba(7,17,27,0.1)
        .rate-data
          line-height: 12px
          color: rgb(147,153,159)
          overflow: hidden
          .time
            display: inline-block
            vertical-align: top
        .content
          margin-top: 6px
          font-size: 0
          line-height: 24px
          .icon-thumb_down,.icon-thumb_up,.text
            display: inline-block
            vertical-align: top
            font-size: 12px
            color: #000
          .icon-thumb_down
            margin-top: 6px
            color: rgb(147,153,159)
            margin-right: 4px
          .icon-thumb_up
            margin-top: 6px
            color: rgb(0,160,220)
            margin-right: 4px
        .usermsg
          position: absolute
          display: flex
          right: 18px
          top: 16px
          height: 12px
          line-height: 12px
        .name
          margin-right: 6px
          font-size: 10px
          color: rgb(147,153,159)
        .avatar
          height: 0
          padding-bottom: 12px
          overflow: hidden
          .img
            border-radius: 50%
            width: 12px
            height: 12px
      .no-ratings
        padding: 16px 0
        font-size: 10px
</style>
