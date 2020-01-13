<!--  -->
<template>
  <div>
    <nav-bar class="cartNav">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部工具栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
export default {
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  data () {
    return {
     
    };
  },
  

}

</script>
<style scoped>
  .cartNav{
    background: var(--color-tint);
    color: #fff;
  }
</style>