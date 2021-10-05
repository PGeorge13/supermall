<template>
<!-- 这个组件没有选择使用插槽，因为组件很简单，只有文字不同，传入一个数组即可使用 -->
  <div class="split-list">
    <div v-for="(item, index) in titles" :key="index"
    class="split-list-item"
    :class="{active: index === currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SplitList",
    data() {
      return {
        currentIndex: 0,
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        },
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('splitClick', index)
      }
    }
  }
</script>

<style scoped>
  .split-list {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: rgb(255, 255, 255);
  }
  .split-list-item {
    flex: 1;
  }
  .split-list-item span{
    padding: 5px;
  }
  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }

</style>
