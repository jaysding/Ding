<template>
  <div>
    <header class="header">
      <div class="back iconfont">&#xe624;</div>
      <div class="search"><a href="#" class="prompt">输入城市/景点/游玩主题</a></div>
      <div class="city">城市</div>
    </header>

    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperInfo" :key="item.id">
        <div class="swiper-img-con">
          <img  class="swiper-img" :src="item.imgUrl"/>
        </div>
      </swiper-slide> 
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  <div class="iconbox">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(pageInfo, index) in pages" :key="index" class="iconpage">
        <div class="icon-wrapper">
          <div class="icon-item" v-for="item in pageInfo" :key="item.id">
            <div class="icon-img-con">
              <img class="icon-img" :src="item.imgUrl">
            </div>
            <span class="iconText">{{item.iconInfoText}}</span>
          </div>
        </div>
      </swiper-slide>
      <div class="icon-pagination" id="iconpot" slot="pagination"></div>
    </swiper>
  </div>
    <div class="promotion-box">
      <div class="promotion-solid"></div>
      <ul class="promotion-box-con">
        <li class="promotion-item">
          <a href="#" class="geolocation iconfont">&#xe611;定位失败</a>
        </li>
        <li class="promotion-item promotion-item2">
          <a href="#" class="hot-spring iconfont">&#xe62e;5折泡温泉</a>
        </li>
      </ul>
    </div>
    <div class="null-background"></div>
    <div class="discount">
      <ul class="discount-box">
        <li class="discount-water">
          <a href="#"></a>
        </li>
        <li class="discount-tickies">
          <a href="#"></a>
        </li>
      </ul>
    </div>
    <div class="page-bottom">
      <div class="sales-recommend">
        <h2>热销推荐</h2>
      </div>
      <div class="hot-bottom">
        <ul class="hot-box">
          <li class="hot-item" v-for="hitem in hotlist" :key="hitem.id">
            <a class="hot-item-box" href="#">
              <div class="hot-img-con">
                <img :src="hitem.imgUrl" class="hot-img">
              </div>
              <div class="hot-introduce">
                <div class="hitem-name">{{hitem.name}}</div>
                <div class="hitem-explain">{{hitem.explain}}</div>
                <div class="hitem-price-box">
                  <span class="iconfont hitem-price">&#xe607;{{hitem.price}}</span>
                  <span class="qi">起</span>
                </div>
              </div>
          </a>
          </li>
          <div class="more">
            <a class="lookat" href="#">查看所有产品</a>
          </div>
        </ul>
      </div>
      <div class="weekendgo">
        <span class="wherego">周末去哪</span>
        <li class="weekitem" v-for="(item, index) in weekendlist" :key="item.id">
          <div class="weekimg-con">
            <img :src="item.imgUrl" class="week-img">
          </div>
          <div class="week-intro">
            <span class="scenic-name">{{item.name}}</span>
            <span class="scenic-intro">{{item.explain}}</span>
          </div>
        </li>
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      iconInfo: [],
      swiperInfo: [],
      hotlist: [],
      weekendlist: [],
      swiperOption: {
        autoplay: 1000,
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperOptions: {
        pagination: '.icon-pagination'
      }
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconInfo.forEach((value, index) => {
        let page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(value)
      })
      return pages
    }
  },
  methods: {
    getIndexData () {
      this.$http.get('./static/index.json')
       .then(this.handleGetDataSucc.bind(this))
    },
    handleGetDataSucc (res) {
      const body = res.body
      if (body && body.data && body.data.swiper) {
        this.swiperInfo = body.data.swiper
        this.iconInfo = body.data.icons
        this.hotlist = body.data.hitem
        this.weekendlist = body.data.weekend
      }
    }
  },
  created () {
    this.getIndexData()
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    background: #05bad5;
    color: #fff;
  }
  .back {
    width: .64rem;
    line-height: .86rem;
    text-align: center;
  }
  .search {
    flex: 1;
    margin: .14rem .18rem;
    background: #fff;
    border-radius: .1rem;
  }
  .prompt {
    font-size: 0.26rem;color: #ccc;line-height: 0.6rem;
  }
  .city {
    width: 1.14rem;
    line-height: .86rem;
    text-align: left;
  }
  .city::after{
    content:"";
    display: block;
    width: 0px;
    height: 0px;
    border: 0.1rem solid #fff;
    border-color: white transparent transparent transparent;
    position: absolute;
    right: 0.3rem;
    top: 0.36rem;
  }
  .swiper-img-con {
    width: 100%;
    overflow: hidden;
    height: 0;
    padding-bottom: 31.25%
  }
  .swiper-img {
    width: 100%;
  }
  .iconbox {
    width: 100%;
    padding-bottom: .2rem
  }

  .icon-item {
    width: 25%;
    float: left;
    box-sizing: border-box;
    text-align: center;
    padding-top: .5rem
  }
  .icon-img-con {
    width: .66rem;
    height: .66rem;
    display: inline-block;
  }
  .icon-img {
    width: 100%
  }
  .iconText {
    display: block;
    box-sizing: border-box;
    font-size: 0.26rem;
    color: #1b1b1b;
    text-align: center;
    padding-top:0.21rem;
  }
  #iconpot {
    text-align: center; 
    padding-bottom: .05rem;
    padding-top: .05rem;
  }
  .promotion-solid {
    display: block;
    width: 100%;
    height: .01rem;
    border-top: 0.01rem #e1e1e1 solid
  }
  .promotion-solid-vertical {
    display: block;
    width: .01rem;
    border-right: 0.01rem #e1e1e1 solid
  }
  .promotion-box {
    width: 100%;
    overflow: hidden
  }
  .promotion-box-con {
    position: relative;
    display: flex;
  }
  .promotion-item2::before {
     content:'';
     position: absolute;
     top: 0;
     background: #e1e1e1;
     width: 1px;
     height: 100%;
     transform: scaleX(0.8);
  }
  .promotion-item2 {
    border: none;
    position: relative;
  }
  .promotion-item {
    width: 100%;
  }
  .geolocation {
    display: block;
    padding: .35rem 1.18rem;
    font-size: .25rem;
    margin: 0 auto;
    color: #000;
    text-align: center;
  }
  .hot-spring {
    display: block;
    padding: .35rem 1.07rem;
    margin: 0 auto;
    font-size: .25rem;
    color: #000;
    text-align: center;
  }
  .null-background {
    height: .2rem;
    width: 100%;
    background: #f5f5f5;
  }
  .discount {
    width: 100%;
  }
  .discount-box {
    display: flex;
    width: 100%;
  }
  .discount-water {
    width: 100%;
    background: url(http://img1.qunarzz.com/piao/fusion/1710/a2/e395615b16fb1302.png) center center no-repeat;
    background-size: auto 100%;
    padding: .7rem 0
  }
  .discount-tickies::before {
     content:'';
     position: absolute;
     top: 0;
     background: #e1e1e1;
     width: 1px;
     transform: scaleX(0.8);
     height: 100%;
  }
  .discount-tickies {
    border: none;
    position: relative;
    width: 100%;
    background: url(http://img1.qunarzz.com/piao/fusion/1711/8a/4c62d1a89fc2d602.png) center center no-repeat;
    background-size: auto 100%;
    padding: .7rem 0
   }
   .sales-recommend h2{
    width: 100%;
    height: .8rem;
    padding-left: .26rem;
    line-height: .8rem;
    color: #212121;
   }
   .sales-recommend {
    background: #f5f5f5;
   }
   .hot-box {
    display: flex;
    flex-direction: column;
   }
   .page-bottom {
    width: 100%;
   }
   .hot-bottom {
    width: 100%
   }
   .hot-item-box {
    display: flex;
    padding: .24rem;
    overflow: hidden;

   }
   .hot-img-con {
    overflow: hidden;
    float: left;
   }
   .hot-item::before {
     content:'';
     position: absolute;
     top: 0;
     background: #e1e1e1;
     width: 100%;
     transform: scaleY(0.8);
     height: 1px;
  }
   .hot-item {
    border: none;
    position: relative;
    overflow:hidden;
   }
   .hot-introduce {
      width: 5.22rem;
      padding-left:.2rem;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap 
   }
   .hitem-name {
      color: #000;
      padding: .05rem 0 .12rem 0;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap  
   }
   .hitem-explain {
      color: #9e9e9e;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap
   }
   .hitem-price {
      color: #ff8300;
      font: .33rem Tahoma,Helvetica,sans-serif;
      font-weight: 550;
   }
   .hitem-price-box {
      padding-top: .1rem 
   }
   .qi{
      color: #9e9e9e;
      font-size: .24rem
   }
   .hot-img {
      width: 1.4rem;
      height: 1.4rem
   }
   .more {
    border: none;
    position: relative;
   }
   .more::before {
     content:'';
     position: absolute;
     top: 0;
     background: #e1e1e1;
     width: 100%;
     transform: scaleY(0.8);
     height: 1px;
   }
   .lookat {
    display: block;
    text-align: center;
    font-size: .28rem;
    padding: .35rem 0
   }
   .weebendgo {
    display: flex;
    flex-direction: column;
    background: #f5f5f5
   }
   .wherego {
    display: block;
    font-size: .28rem;
    padding: .2rem 0 .2rem .2rem
   }
   .week-img {
    width: 100%
   }
   .weekitem {
    background: #fff;
    overflow: hidden;
    list-style: none;
   }
   .weekimg-con {
    width: 100%;
    overflow: hidden;
    height: 0;
    padding-bottom: 37%
   }
   .week-intro {
     padding: .22rem 0 .3rem .2rem
   }
   .scenic-name {
     display: block;
     padding-bottom: .15rem
   }
   .scenic-intro {
     display: block;
     color: #616161;
     font-size: .24rem
   }
</style>
