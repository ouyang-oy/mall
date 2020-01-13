<!-- 推荐 -->
<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link"><img :src="item.image" alt=""></a>
          <div>{{item.title}}</div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        recommends:{
            type:Array,
            default(){
                return [];
            }
        }
    }
}

</script>
<style scoped>
    .recommend{
        width: 100%;
        padding: 10px 0 20px;
        display: flex;
        text-align: center;
        font-size: 12px;
        border-bottom: 8px solid #eee;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend img{
        width: 65px;
        margin-bottom: 10px;
    }
</style>