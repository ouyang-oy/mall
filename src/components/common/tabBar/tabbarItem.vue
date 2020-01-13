<!--  -->
<template>
    <div class="tab-bar-item" @click="itemClick">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :style="activeStyle"><slot name="item-text"></slot></div>    
    </div>
</template>

<script>
export default {
  name: "tabbarItem",
  data() {
    return {        
    };
  },
  computed:{
      isActive(){
          //表示当前为活跃状态
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
          return this.isActive ? {color:this.activeColor} : {}
      }
  },
  props:{
      path:'',
      activeColor:{
          type:String,
          default:'red'
      }
  },
  methods:{
      itemClick(){
          if(this.$route.path != this.path){
              this.$router.push(this.path);
          }
      }
  }
};
</script>
<style scoped>
    .tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
    }
    .tab-bar-item img{
        width: 24px;
        height: 24px;
    }

</style>