<!--  -->
<template>
  <div class="wrapper">
    <ul class="content">
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
	    <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
	    <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
	    <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
	    <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
	    <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
		  scroll:null
    };
  },
  mounted(){
	  this.scroll=new BScroll('.wrapper',{
      //实时位置的检测，包括惯性
      probeType:3,	  
      //上拉加载更多
      pullUpLoad:true,
	  });
    this.scroll.on('scroll',(position)=>{
      //console.log(position);
    })
    this.scroll.on('pullingUp',function(){
      console.log('上拉加载更多')
    })
  }


}

</script>
<style scoped>
	.wrapper{
		height: 300px;
		background: red;
		overflow: hidden;
	}
</style>