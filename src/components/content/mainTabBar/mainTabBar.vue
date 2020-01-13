<!--  -->
<template>
   <tab-bar>
        <tabbarItem path='/home' >
            <img slot="item-icon" src="~@/assets/img/shouye.png" alt="">
            <img slot="item-icon-active" src="~@/assets/img/shouye-active.png" alt="">
            <div slot="item-text">首页</div>
        </tabbarItem>
        <tabbarItem path='/category'>
            <img slot="item-icon" src="~@/assets/img/fenlei.png" alt="">
            <img slot="item-icon-active" src="~@/assets/img/fenlei-active.png" alt="">
            <div slot="item-text">分类</div>
        </tabbarItem>
        <tabbarItem path='/cart'>
            <img slot="item-icon" src="~@/assets/img/gouwuche.png" alt="">
            <img slot="item-icon-active" src="~@/assets/img/gouwuche-active.png" alt="">
            <div slot="item-text">购物车</div>
        </tabbarItem>
        <tabbarItem path='/profile'>
            <img slot="item-icon" src="~@/assets/img/wode.png" alt="">
            <img slot="item-icon-active" src="~@/assets/img/wode-active.png" alt="">
            <div slot="item-text">我的</div>
        </tabbarItem>         
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabBar/tabbar.vue' 
import tabbarItem from '@/components/common/tabBar/tabbarItem' 
export default {
    name:'mainTabBar',
    components:{
        TabBar,
        tabbarItem
    },
  data () {
    return {
    };
  },


}

</script>
<style scoped>
</style>