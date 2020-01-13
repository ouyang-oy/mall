<!--  -->
<template>
  <div class="check-button" :class="{'check':isChecked}">
      <img src="@/assets/img/cart/tick.svg" >
  </div>
</template>

<script>
export default {
    data () {
        return {
        };
    },
    props:{
        isChecked:{
            type:Boolean,
            default:false
        }
    }
}

</script>
<style scoped>
    .check-button{
        border:2px solid #aaa;
        border-radius: 50%;
    }
    .check{
        background: red;
        border-color: red;
    }

</style>