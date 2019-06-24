<template>
  <div class="goods border-top">
    <div class="food-nav" ref="wrapper1">
      <ul class="nav-list">
        <li class="nav-item border-bottom"
        @click="handleNavClick(index,$event)"
        v-for="(item,index) of goods"
        :key="index"
        ref="navItem"
        :class="{'active':currentIndex===index}"
        >
          <span class="text">
             <span v-if="item.type > 0" 
          class="icon"
          :class="classList[item.type]"
          ></span>{{item.name}}
          </span> 
        </li>
      </ul>
    </div>
    <div class="foods" ref="wrapper2">
      <ul class="foods-list">
        <li 
        class="food-item"
        v-for="(item,index) of goods"
        :key="index"
        ref="foodList"
        >
          <div class="title">{{item.name}}</div>
          <div class="food-wrapper border-bottom"
          v-for= "(food,index) of item.foods"
          :key="index"
          >
            <div class="food-img"><img :src="food.image" width=57 height=57></div>
            <div class="content">
              <h2 class="content-title">{{food.name}}</h2>
              <div class="desc">{{food.description}}</div>
              <div class="sellMsg">
                <span class="sellCount">月销{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%
                </span>
                </div>
              <div class="price">￥{{food.price}}</div><div
              v-show="food.oldPrice"  
              class="oldPrice">￥{{food.oldPrice}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shop-cart 
    :minPrice="seller.minPrice"
    :deliveryPrice="seller.deliveryPrice"
    ></shop-cart>
  </div>
</template>

<script>
import shopCart from './shopCart/shopCart'
import BScroll from 'better-scroll'
const ERR_OK = 0
export default {
  name: 'goods',
  props: {
    seller: Object
  },
  components: {
    shopCart
  },
  data() {
    return {
      goods: [],
      classList: ['discrease','discount','guarantee','invoice','special'],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
     currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    handleNavClick(index, event) {
      if(!event._constructed) {
        return
      }
      let foodList = this.$refs.foodList
      let el = foodList[index]
      this.scroll2.scrollToElement(el ,300)
    },
    _initScroll() {
      this.scroll1 = new BScroll(this.$refs.wrapper1, {
        click: true
      })
      this.scroll2 = new BScroll(this.$refs.wrapper2, {
        probeType: 3
      })
      this.scroll2.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
  },
  created() {
    this.$http.get('api/goods').then((res) => {
      if (res.body.errno === ERR_OK) {
        this.goods = res.body.data
        this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
        });
      }
    })
  },
}
</script>

<style lang="stylus" scoped>
  @import '~style/mixin'
  .goods
    position: absolute
    display: flex
    top: 174px
    bottom: 58px
    left: 0
    right: 0
    overflow: hidden
  .border-top
    &::before
      border-color: rgba(7,17,27,0.1) 
    .food-nav
      flex: 0 0 80px
      background: #f3f5f7
      .nav-list
        .nav-item
          display: table
          width: 56px
          height: 54px
          margin: 0 12px
          &.active
            margin: 0
            margin-top: -1px
            padding: 0 12px
            background: #fff
            font-weight: 700
            &::before
              display: none
        .border-bottom
          &::before
            border-color: rgba(7,17,27,0.1) 
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 2px
            width: 14px
            height 14px
            background-size: cover
            background-repeat: no-repeat
            &.discrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
          .text
            display: table-cell
            vertical-align: middle
            line-height: 14px
            font-size: 12px             
    .foods
      flex: 1
      .foods-list
        .food-item
          .title
            line-height: 26px
            text-indent: 14px
            background: #f3f5f7
            font-size: 12px
            color: rgb(147, 153, 159)
            font-weight: normal/700
            border-left: #d9dde1 2px solid 
          .food-wrapper
            display: flex
            margin: 0 18px   
            padding: 18px 0
          .border-bottom
            &::bofore
              border-color: rgb(7,17,27,0.1)
            &:last-child::before
              display: none
            .food-img
              height: 0
              padding-bottom: 57px
              overflow: hidden
            .content
              flex: 1
              margin-left: 10px
              .content-title
                line-height: 14px
                font-size: 14px
                color: rgb(7, 17, 27)
                margin-top: 2px
              .desc
                margin: 8px 0
                line-height: 12px
                font-size: 10px
                color: rgb(147,153,159)
              .sellMsg
                font-size: 10px
                line-height: 10px
                color: rgb(147,153,159)
                .rating
                  margin-left: 12px
              .price
                display: inline-block    
                margin-right: 8px
                line-height: 24px
                font-size: 14px
                font-weight: 700
                color: rgb(240,20,20)
              .oldPrice
                display: inline-block
                vertical-align: top
                line-height: 24px   
                font-size: 10px
                color: rgb(147,153,159)
                font-weight: 700
                    

</style>
