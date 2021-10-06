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
    },

    // better-scroll 需要传入一个 html 元素，在 create 生命周期里面还没有挂载元素，无法获取，所以要在 mounted 中创建 scroll 对象
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {       
        click: true,
        probeType: this.probeType,
        // observeDOM: true,
      });

      this.scroll.on("scroll", position => {    //监听滚动
        // console.log(position);
        this.$emit('scrolling',position);
      });
    },
    methods: {
      scrollTo(x, y, time) {
        this.scroll.scrollTo(x, y, time);
      }
    }

  }
</script>

<style scoped>
</style>
