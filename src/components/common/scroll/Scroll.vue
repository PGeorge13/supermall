<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      };
    },
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      }
    },

    // better-scroll 需要传入一个 html 元素，在 create 生命周期里面还没有挂载元素，无法获取，所以要在 mounted 中创建 scroll 对象
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {       
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        // observeDOM: true,
      });

      this.scroll.on("scroll", position => {    //监听滚动
        // console.log(position);
        this.$emit('scrolling', position);
      });
      this.scroll.on("pullingUp", () => {
        this.$emit("pulledUp");
      }) 

    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      refresh() {
        // 确保 scroll 被初始化后调用 refresh 方法
        this.scroll && this.scroll.refresh();
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
    }

  }
</script>

<style scoped>
</style>
