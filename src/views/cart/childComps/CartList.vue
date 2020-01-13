<!--  -->
<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info='item'></cart-list-item>
        </scroll>  
    </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll'
import CartListItem from './CartListItem'
export default {
    components:{
        scroll,
        CartListItem
    },
    data () {
        return {
            cartList:[],
        };
    },
    created(){
        this.cartList=this.$store.state.cartList;
    },
    activated(){
        this.$refs.scroll.refresh();
    },
}

</script>
<style scoped>
    .cart-list{
        height: calc(100vh - 44px - 49px - 40px);
        /* position: relative;
        height: 100vh; */
    }
    .content{
        height: 100%;
        overflow: hidden;
    }
</style>