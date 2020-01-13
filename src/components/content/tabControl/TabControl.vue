<!-- TabControl -->
<template>
  <div class="tab-control">
      <!-- 只是文字不一样，没必要用到插槽 -->
        <div v-for="(item,index) in titles" :key="index" class="tab-control-item" 
            :class="{'active':index==currentIndex}" 
            @click="tabclick(index)">
            <span>{{item}}</span>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            currentIndex:0,
        };
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        tabclick(index){
            this.currentIndex=index;
            this.$emit('tabClick',index);
        }
    }
}

</script>
<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        background: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .active span{
        padding:5px;
        color: var(--color-high-text);
        border-bottom: 3px solid var(--color-tint);
    }
</style>