<template>
<div class="rating">
  <div class="buttons border-bottom">
    <div class="button all"
    :class="{'active': selectType===0}"
    >{{buttonContent.all}}</div>
    <div class="button positive"
    :class="{'active': selectType===1}"
    >{{buttonContent.positive}}</div>
    <div class="button negative"
    :class="{'active': selectType===2}"
    >{{buttonContent.negative}}</div>
  </div>
  <ul>
    <div class="seen">
      <i class="icon-check_circle"
      :class="{'on': seenContent===false}"
      ></i>
      <span class="selectrate">只看有内容的评价</span>
    </div>
    <li class="rate border-bottom"
    v-for="(rating,index) of ratings"
    :key="index"
    >
      <div class="rate-data">
        <span class="data">{{rating.rateTime}}</span><span class="time">12:34</span>
      </div>
      <div class="content">
        <i class="icon-thumb_down"></i>
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
</div>
</template>

<script>
import Vue from 'vue'
const ALL = 0
const POSITIVE = 1
const NEGATIVE = 2
export default {
  props: {
    selectType: {
      type: Number,
      default: ALL
    },
    seenContent: {
      type: Boolean,
      default: true
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
  mounted() {
    this.$nextTick(()=> {
      this.ratings.forEach((rating) => {
      let timeNum = rating.rateTime
      var date = new Date(timeNum);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      let time = Y+M+D+h+m+s
      console.log(timeNum)
     })
    })
  },
}
</script>

<style lang="stylus" scoped>
  .rating
    .buttons
      padding: 18px 0
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
          background: rgb(0,160,220)
          &.active
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
  .rate
    position: relative
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
</style>
