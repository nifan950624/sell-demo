<template>
  <div class="ratings-wrapper" ref="wrapper">
    <div class="content-wrapper">
      <div class="ratings-content">
      <div class="desc border-right">
        <div class="score">{{seller.score}}</div>
        <div class="scoreDesc">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="stars">
        <div class="attitude"><span class="text">服务态度</span>
        <div class="star">
          <star :score="seller.serviceScore" :size= 36></star>
        </div>
        <span class="score-item">{{seller.serviceScore}}</span>
        </div>
        <div class="food-attitude"><span class="food-text">美食评分</span>
        <div class="star">
          <star :score="seller.foodScore" :size= 36></star>
        </div>
        <span class="score-item">{{seller.foodScore}}
          </span> 
        </div>
        <div class="delivery-time">
          <span class="time-content">送达时间</span>
          <span class="num">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
      <split></split>
      <rating
      class="ratingList"
      :ratings="ratings"
      :select-type="selectType"
      :seen-content="seenContent"
      :button-content="buttonContent"
      @typeChange="handleTypeChange"
      @contentChange="handleContentChange"
      ></rating>
      <ul 
      class="ratingList" 
      v-show="ratings.length"
      >
        <li
        v-show="selectShow(rating.rateType,rating.text)" 
        v-for="(rating,index) of ratings"
        :key="index"
        class="rating-item border-bottom">
          <div class="item-header">
            <div class="header-left">
              <div class="avatar">
                <img :src="rating.avatar" width=28 height=28 class="img">
              </div>
              <div class="userAndRateScore">
                <div class="user-name">{{rating.username}}</div>
                <div class="rateScore">
                  <span class="star-score">
                    <star 
                  :score="rating.score" :size= 36
                  ></star>
                  </span>
                  <span 
                  v-show="rating.deliveryTime"
                  class="deliverytime">{{rating.deliveryTime}}分钟到达</span>
                </div>
              </div>
            </div>
            <div class="header-right">
              {{rating.rateTime | formDate}}
            </div>
          </div>
          <div class="content">
            <p class="text">{{rating.text}}</p>
            <div class="status"> 
              <div class="recommends">
                <i
                class="icon" 
                :class="rating.rateType === 1? 'icon-thumb_down' :'icon-thumb_up'"
                >
                </i>
                <div
                v-show="rating.recommend.length" 
                v-for="(item, index) of rating.recommend"
                :key="index"
                class="recommend">{{item}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-show="!ratings.length" class="no-ratings">暂无评价内容</div>
  </div>
  <shop-cart
  :minPrice="seller.minPrice"
  :deliveryPrice="seller.deliveryPrice"
  ></shop-cart>
</div>
</template>

<script>
const ALL = 2
const ERR_OK = 0
import rating from '@/components/rating/rating'
import split from '@/components/split/split'
import star from 'base/common/star/star'
import BScroll from 'better-scroll'
import {getDate} from 'base/common/js/Date.js'
import shopCart from '../goods/shopCart/shopCart'
export default {
  name: 'ratings',
  props: {
    seller: Object
  },
  filters: {
    formDate(time) {
      return getDate(time)
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      seenContent: false,
      buttonContent: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
      }
    }
  },
  components: {
    star,
    split,
    rating,
    shopCart
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
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.$nextTick(() => {
          this.ratings = res.body.data
          this.scroll = new BScroll(this.$refs.wrapper,{
            click: true
          }) 
        })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~style/mixin.styl' 
  .ratings-wrapper
    position: absolute
    top: 174px
    bottom: 48px
    width: 100%
    overflow: hidden
    .ratings-content
      display: flex
      padding: 18px 0
      font-size: 0
      .desc
        flex: 0 0 137.5px
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 115px
        &.border-right::before
          border-color: rgba(7,17,27, 0.1)
        .score
          font-size: 24px
          line-height: 28px
          color: rgb(255,153,0)
        .scoreDesc
          margin-top: 6px
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
        .rankRate
          margin: 8px 0 6px 0
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .stars
        flex: 1
        padding: 0 24px
        @media only screen and (max-width: 320px)
          padding:0 8px
        .attitude,.food-attitude,.delivery-time
          height: 18px
          line-height: 18px
          .text,.food-text,.time-content,.num
            margin-right: 12px
            font-size: 12px    
          .star
            display: inline-block
            vertical-align: top
            margin-top: 2px
        .score-item
          margin-left: 12px
          font-size: 12px
          color: rgb(255,153,0)
        .food-attitude
          margin-top: 8px
        .delivery-time
          margin-top: 8px
          .num
            margin-right: 0
            color: rgb(147,153,159)
    .ratingList
      .rating-item
        margin: 0 18px
        padding: 18px 0
        &.border-bottom::before
          border-color: rgba(7,17,27,0.1)
        .item-header
          display: flex
          justify-content: space-between
          .header-left
            font-size: 0
            .avatar
              display: inline-block
              vertical-align: top
              .img
                border-radius: 50%
            .userAndRateScore
              display: inline-block
              vertical-align: top
              margin-left: 12px
              .user-name
                font-size: 10px
                line-height: 12px
                color: rgb(7,17,27)
              .rateScore
                display: flex
                margin-top: 4px
                line-height: 12px
                .deliverytime
                  vertical-align: top
                  margin:1px 0 0 6px
                  font-size: 10px
                  color: rgb(147,153,159)
          .header-right
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
        .content
          margin-left: 40px
          .text
            margin: 6px 0 8px 0
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .status
            font-size: 0
            .recommends
              .icon
                display: inline-block
                vertical-align: top
                line-height: 16px
                margin: 2px 8px 0 0
                font-size: 12px
                &.icon-thumb_down
                  color: rgb(183,187,191)
                &.icon-thumb_up
                  color: rgb(0,160,220)
              .recommend
                display: inline-block
                margin:0 8px 4px 0
                padding:0 6px
                max-width: 40px
                line-height: 16px
                border: 1px solid rgba(7,17,27,0.1)
                border-radius: 2px
                font-size: 9px
                color: rgb(147,153,159)
                ellipsis()
    .no-ratings
      padding: 18px
</style>