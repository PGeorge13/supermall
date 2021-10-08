<template>
  <div id="home">  
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
    ref="scroll"
    :probeType="3"
    @scrolling="scrolling"
    :pullUpLoad="true"
    @pulledUp="pulledUp"
    >
      <home-swiper :banners = "banners" ref="hSwiper"></home-swiper>
      <home-recommend :recommends = "recommends"></home-recommend>
      <home-feature></home-feature>
      <split-list :titles="['流行', '新款', '精选']" 
      class="split-list"
      @splitClick="splitClick"></split-list>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

  <back-top @click.native="backTopClick" v-show="showBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import SplitList from 'components/content/splitList/SplitList';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper.vue';
  import HomeRecommend from './childComps/HomeRecommend.vue';
  import HomeFeature from './childComps/HomeFeature.vue';

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils"

  export default {
    name: 'Home',
    components: {
      NavBar,
      SplitList,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        showBackTop: false,
        positionY: 0,   //路由切换时 Y 的坐标
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },  
    created() {
      // 请求首页多个数据
      this.getHomeMultidata();
      // 请求首页商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    // activated: function () {
    //   console.log(this.$refs.hSwiper);
    // },
    // deactivated: function () {
    //   this.$refs.hSwiper.stopTimer()
    // },
    activated() {
      // this.$refs.hSwiper.startTimer();
      this.$refs.scroll.scrollTo(0, this.positionY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      // this.$refs.hSwiper.stopTimer();
    },
    
    mounted() {
      // 注意：这部分不能在 created 里面
      // 防抖动处理，防止频繁 refresh
      const refreshScroll = debounce(this.$refs.scroll.refresh, 100);
      this.$bus.$on("goodImgLoaded", () => {
        // 解决首页中滚动区域受限的问题
        // Better-Scroll在的滚动区域 scrollerHeight 属性决定，这个属性根据放Better-Scroll的content中的子组件的高度，但是计算scrollerHeight属性时, 图片可能没加载完，导致高度缺失
        // 监听每一张图片是否加载完成, 只要有一张图片加载完成了, 执行一次refresh()
        refreshScroll();
      });
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      splitClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2: 
            this.currentType = 'sell';
            break;
        }
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      scrolling(position) {
        this.showBackTop = (-position.y) > 1000;
        this.positionY = position.y;
      },
      pulledUp() {
        this.loadMore(this.currentType)
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1;
        })
      },
      loadMore(type) {
        this.getHomeGoods(type);
        // 完成上拉加载过多
        this.$refs.scroll.finishPullUp();
      }
    },
  }
</script>

<style scoped>
/* 一定要加 scoped 限制样式只对此文件起作用，避免给其他组件的同名元素设置样式，造成干扰 */
  #home {
    position: relative;
    /* padding-top: 44px; */
    height: 100vh;
    width: 100%;
  }
  .home-nav {
    background: var(--color-tint);
    color: white;
  }
  .split-list {
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }
  .content {
  position: absolute;
  top: 43px;
  bottom: 49px;
  overflow: hidden;
  }
</style>
