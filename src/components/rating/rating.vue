<template>
<div class="rating">
  <div class="buttons border-bottom">
    <div class="button all"
    :class="{'active': type===2}"
    @click="handleActiveClick(2)"
    >{{buttonContent.all}}{{ratings.length}}</div>
    <div class="button positive"
    :class="{'active': type===0}"
    @click="handleActiveClick(0)"
    >{{buttonContent.positive}}{{positives.length}}</div>
    <div class="button negative"
    :class="{'active': type===1}"
    @click="handleActiveClick(1)"
    >{{buttonContent.negative}}{{negatives.length}}</div>
  </div>
  <div class="seen">
    <i class="icon-check_circle"
    :class="{'on': content===true && ratings.length}"
    @click="handleSelect"
    ></i>
    <span class="selectrate">只看有内容的评价</span>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  props: {
    selectType: {
      type: Number,
      default: ALL
    },
    seenContent: {
      type: Boolean,
      default: false
    },
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    buttonContent: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
      type : this.selectType,
      content: this.seenContent
    }
  },
  methods: {
    handleActiveClick(type) {
      this.type = type;
      this.$emit('typeChange', this.type)
    },
    handleSelect() {
      this.content = !this.content
      this.$emit('contentChange', this.content)
    },
  },
  computed: {
    positives() {
      return this.ratings.filter((rating)=> {
        return rating.rateType === POSITIVE
      })
    },
    negatives() {
      return this.ratings.filter((rating)=> {
      return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .rating
    .buttons
      padding: 18px 0
      margin: 0 18px
      line-height: 16px
      font-size: 0
      &.border-bottom::before
        border-color: rgba(7,17,27,0.1)
      .button
        display: inline-block
        vertical-align: top
        padding: 2px 8px
        margin-right: 8px
        text-align: center
        font-size: 12px
        border-radius: 2px
        &.all
          background: rgba(0,160,220,0.2)
          &.active
            background: rgb(0,160,220)  
            color: #fff
        &.positive
          background: rgba(0,160,220,0.2)
          color: rgb(77,85,93)
          &.active
            background: rgb(0,160,220)
            color: #fff
        &.negative
          margin-right: 0
          background: rgba(77,85,93,0.2)
          color: rgb(77,85,93)
          &.active
            background: rgb(77,85,93)
            color: #fff  
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
      &.on
        color: green
    .icon-check_circle
      font-size: 24px
      margin-right: 4px 
</style>
