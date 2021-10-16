<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>

    <scroll class="detail-content" ref="scroll">    
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';

  import DetailNavBar from './childComps/DetailNavBar.vue';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
  import DetailShopInfo from './childComps/DetailShopInfo.vue';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';

  import { getDetail, Goods, Shop} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
      }
    },
    methods: {
      detailImgLoad() {
        this.$refs.scroll.refresh();
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        // 获取商品展示图，作轮播处理
        this.topImages = data.itemInfo.topImages;
        // 获取商品信息，将信息整合到一个 Goods 类中
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 获取店铺信息，整合到 Shop 类
        this.shop = new Shop(data.shopInfo);
        // 获取商品穿着效果、图片等详细信息
        this.detailInfo = data.detailInfo;
      })
    }
  }
</script>

<style scoped>
  #detail {
    /* height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff; */
  }
  .detail-content {
  position: absolute;
  top: 43px;
  bottom: 0px;
  overflow: hidden;
  }
</style>
