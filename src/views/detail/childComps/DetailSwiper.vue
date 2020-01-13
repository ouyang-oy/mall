<!-- 詳情頁輪播圖 -->
<template>
  <swiper :options="swiperOption" class="item-swiper">
        <swiper-slide class="swiper-slide" v-for="(item,index) in swiperImg" :key="index">
            <img :src="item"/>  
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination"  slot="pagination"></div>   
            <!-- 左右箭头 --> 
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> 
        <div class="swiper-button-next" slot="button-next"></div>  -->
    </swiper>
</template>

<script>
export default {
  data () {
    return {
		swiperOption:{
            //显示分页
            pagination: {
                el: '.swiper-pagination'
            },
            //设置点击箭头
            /* navigation: {
                nextEl: '.swiper-button-next', 
                prevEl: '.swiper-button-prev'
            }, */
            //自动轮播
            autoplay: {
                delay: 2000,
                stopOnLastSlide: false,
                //当用户滑动图片后继续自动轮播
                disableOnInteraction: false,
            },
            //开启循环模式
            loop: true
        },
    };
  },
props:{
    swiperImg:{
		type:Array,
		default(){
			return [];
      }
    }
  }
}

</script>
<style scoped>
	.item-swiper{
		height: 300px;
	}
	.swiper-slide img{
        width: 100%;
    }
</style>