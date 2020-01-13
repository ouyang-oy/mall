<!-- 封装better-scroll组件 -->
<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
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
  //传值给父组件，有需要监听位置的组件，在传值，低耦合
  props:{
    probeType:{
		type:Number,
		default:0
    },
    pullUpLoad:{
		type:Boolean,
		default:false
    }
  },
  	mounted(){
		//1.创建scroll对象
		this.scroll=new BScroll(this.$refs.wrapper,{
			click:true,
			probeType:this.probeType, 
			pullUpLoad:this.pullUpLoad
		});
		//2.实时监听滚动的位置 要把probeType设置为3
		this.scroll.on('scroll',(position)=>{
			// console.log(position);
			this.$emit('scroll',position); //将自定义事件传给父组件，并把position值传出去
		});
		console.log(this.scroll);
		//3.监听scroll滚动到底部 上拉加载更多 把组件中的事件传递出去
		this.scroll.on('pullingUp',()=>{
			this.$emit('pullingUp');
		})
  	},
	methods:{
		//定义返回顶部的组件，在父组件home.vue中调用
		scrollTo(x,y,time=500){
			this.scroll && this.scroll.scrollTo(x,y,time);
		},
		//完成刷新的方法
		finishPullUp(){
			this.scroll && this.scroll.finishPullUp();
		},
		//图片加载完成后，刷新
		refresh(){
			this.scroll && this.scroll.refresh();
		}		
	}
}

</script>
<style scoped>
</style>