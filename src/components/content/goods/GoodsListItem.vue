<!--  -->
<template>
  <div class="goods-item" @click="itemClick">
      <!-- v-lazy图片懒加载  <img :src='showImg'> => <img v-lazy='showImg'>   -->
      <img v-lazy='showImg' @load="imgLoad">  
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        //监听图片加载的完成，然后执行scroll的refresh方法，解决刷新不了的bug 用到事件总线
        imgLoad(){
            this.$bus.$emit('finishImgLoad');
        },
        itemClick(){
            this.$router.push('/Detail/'+this.goodsItem.iid);
        },
    },
    computed:{
        showImg(){
            return this.goodsItem.image || this.goodsItem.show.img
        }
    }
}

</script>
<style scoped>
    .goods-item{
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        right: 0;
        left: 0;
        overflow: hidden;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect{
        position: relative;
    }
    .goods-info .collect::before{
        content:'';
        position: absolute;
        left: -15px;
        top:-1px;
        width: 14px;
        height: 14px;
        background: url('../../../assets/img/common/collect.svg')  0 0/14px 14px;

    }
</style>