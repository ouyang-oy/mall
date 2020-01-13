<!--  -->
<template>
  <div>
      <nav-bar>
          <div slot="left" class="back" @click="$router.back()"><img src="@/assets/img/common/back.svg" alt=""></div>
          <div slot="center" class="title" >
              <div class="item-title" 
                v-for='(item,index) in titles' :key="index" 
                :class="{active:index===curIndex}"
                @click="titleClick(index)"
              >{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data () {
        return {
            titles:['商品','参数','评论','推荐'],
            curIndex:0,
        }; 
    },
    methods:{
        titleClick(index){
            this.curIndex=index;
            this.$emit('titleClick',index);
        }
    }
}

</script>
<style scoped>
    .title{
        display: flex;
    }
    .item-title{
        flex: 1;
        font-size: 14px;
    }
    .active{
        color: var(--color-high-text)
    }
    .back img{
        margin-top: 12px;
    }
</style>