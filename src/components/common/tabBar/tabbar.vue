<!--  -->
<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'TabBar',
  data () {
    return {
    };
  },

}

</script>
<style scoped>
    #tab-bar{
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        box-shadow: 0 -1px 1px rgba(0, 0, 0, .08);
        width: 100%;
        z-index: 9999;
    }
    
</style>