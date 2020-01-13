<!-- 封装backtop组件  -->
<template>
  <div class="back-top">
      <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
}

</script>
<style scoped>
    .back-top{
        position: fixed;
        bottom: 55px;
        right: 8px;
    }
    .back-top img{
        width: 43px;
        height: 43px;
    }
</style>