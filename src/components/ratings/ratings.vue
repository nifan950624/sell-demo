<template>
  <div class="ratings-wrapper" ref="wrapper">
    <div>
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
        </div>
        <div class="food-attitude"><span class="food-text">美食评分</span>
        <div class="star">
          <star :score="seller.foodScore" :size= 36></star>
        </div> 
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
  </div>
</div>
</template>

<script>
const ALL = 2
const ERR_OK = 0
import rating from '@/components/rating/rating'
import split from '@/components/split/split'
import star from 'base/common/star/star'
import BScroll from 'better-scroll'
export default {
  name: 'ratings',
  props: {
    seller: Object
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
    rating
  },
  methods: {
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
        .attitude,.food-attitude,.delivery-time
          height: 18px
          line-height: 18px
          .text,.food-text,.time-content,.num
            margin-right: 6px
            font-size: 12px    
          .star
            display: inline-block
            vertical-align: top
            margin-top: 2px
        .food-attitude
          margin-top: 8px
        .delivery-time
          margin-top: 8px
          .num
            margin-right: 0
            color: rgb(147,153,159)
    .ratingList
      padding: 0 18px
</style>