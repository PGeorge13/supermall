<template>
  <div class="good-item" @click="goodItemClick">
    <img :src="goodItem.show.img" alt="" @load="goodImgLoaded">
    <div class="good-info">
      <p>{{goodItem.title}}</p>
      <span class="price">{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goodItem: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      goodImgLoaded() {
        this.$bus.$emit("goodImgLoaded");
      },
      goodItemClick() {
        this.$router.push('/detail/' + this.goodItem.iid)
      }
    }
  }
</script>

<style scoped>
.good-item {
  padding-bottom: 40px;
  position: relative;
  width: 46%;
  /* margin-left: 2%; */
}
.good-item img {
  width: 100%;
  border-radius: 5px;
}
.good-info {
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.good-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.good-info .price {
  color: var(--color-height-text);
  margin-right: 20px;
}
.good-info .collect {
  position: relative;
}
.good-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>