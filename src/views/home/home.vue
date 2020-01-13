<!--  -->
<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']" 
					@tabClick='tabClick1' 
					ref=tabControl1 
					v-show='isShowFixed' class="tab-control"></tab-control>
		<scroll class="content" 
				ref="scroll" 
				:probe-type='3' 
				@scroll="contentScroll"
				:pull-up-load='true'
				@pullingUp="loadMore"
				> <!-- 接收子组件传来的值与传来的方法-->
			<home-swiper :banners="banners" class="swiper" @swiperImageLoad.once='swiperImageLoad'></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view />
			<tab-control :titles="['流行','新款','精选']" 
						@tabClick='tabClick1' 
						ref=tabControl
						></tab-control>
			<goods-list :goods="goods[currentType].list" ></goods-list>
		</scroll>
		<back-top @click.native="tabClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import TabControl from "components/content/tabControl/TabControl";
import NavBar from "components/common/navbar/NavBar";
import GoodsList from "components/content/goods/GoodsList";
import scroll from 'components/common/scroll/scroll'
// import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata , getHomeGoods } from "network/home.js";
import {itemListenerMixins,backTopMixin} from '@/common/mixins'

export default {
	name: "home",
	components: {
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		NavBar,
		GoodsList,
		scroll,
	},
	mixins:[itemListenerMixins,backTopMixin],
	data() {
		return {
			banners: [],
			recommends: [],
			//流行，新款，精选中的数据
			goods:{
				'pop' :{ page: 0, list: [] },
				'new' :{ page: 0, list: [] },
				'sell' :{ page: 0, list: [] }
			},
			currentType:'pop',
			tabOffSetTop:0,
			isShowFixed:false,
			saveY:0,
		};
	},
	//重新进来时，滚动到离开时的位置
	activated(){
		this.$refs.scroll.scrollTo(0,this.saveY,0);
		this.$refs.scroll.refresh();
	},
	//离开时，保存一个位置信息
	deactivated(){
		//1.离开时的位置
		this.saveY=this.$refs.scroll.scroll.y;
		//2.离开时，取消全局事件的监听
		this.$bus.$off('finishImgLoad',this.itemImgListener);
	},
	created() {
		//请求多个数据 轮播图和推荐
		this.getHomeMultidata();
		//请求商品数据
		this.getHomeGoods('pop');
		this.getHomeGoods('new');
		this.getHomeGoods('sell');
	},
	// mounted(){
	// 	//1.图片加载完成的事件监听
	// 	const refresh=this.debounce(this.$refs.scroll.refresh,50);
	// 	//2.监听从goodsListItem传来的事件总线的事件。调用scroll的refresh刷新
	// 	//3.报存函数
	// 	this.itemImgListener=()=>{
	// 		// this.$refs.scroll.refresh();
	// 		refresh();
	// 	}
	// 	this.$bus.$on('finishImgLoad',this.itemImgListener);	
	// },
	methods:{
		//函数的防抖，减少请求
		debounce(func,delay){
			let timer=null;
			return function(...args){
				if(timer) clearTimeout(timer);
				timer=setTimeout(() =>{
					func.apply(this,args)
				},delay);
			}
		},

		//点击跳转相关代码
		tabClick1(index){
			console.log(index);
			switch(index){
				case 0:
					this.currentType='pop';
				break;
				case 1:
					this.currentType='new';
				break;
				case 2:
					this.currentType='sell';
				break;
			}
			//让两个tabControl的currentIndex保持一致
			this.$refs.tabControl1.currentIndex=index;
			this.$refs.tabControl.currentIndex=index;
		},
		//回到顶部，点击按钮监听scroll对象的事件 用到了混入
		// tabClick(){
		// 	/*方法一：获取到组件并拿到组件中data的scroll对象,并调用scrollTo方法
		// 	this.$refs.scroll.scroll.scrollTo(0,0,1000);*/
		// 	/*方法二：在scroll组件中封装好方法，然后调用 调用组件里面的方法 */
		// 	this.$refs.scroll.scrollTo(0,0);
		// },

		swiperImageLoad(){
			//获取tabControl的offsetTop
			//所有组件都有一个属性$el:用于获取组件中的元素
			console.log(this.$refs.tabControl.$el.offsetTop);
			this.tabOffSetTop=this.$refs.tabControl.$el.offsetTop;
		},

		//接收子组件传来的事件，并把传来的值带进来 回到顶部按钮
		contentScroll(position){
			// console.log(position);
			this.isShowBackTop = -(position.y) > 1000;  //大于1000的时候显示按钮

			this.isShowFixed=(-position.y)>this.tabOffSetTop; //大于高度的时候显示吸顶效果
		},
		//根据当前类型 上拉加载更多 
		loadMore(){
			// console.log(11);
			this.getHomeGoods(this.currentType);
			console.log("上拉加载更多")
		},

		//网络请求相关代码
		getHomeMultidata(){
			getHomeMultidata().then(res => {
				this.banners = res.data.data.banner.list;
				this.recommends = res.data.data.recommend.list;
			});
		},
		//获取类型的数据
		getHomeGoods(type){
			//动态获取page
			const page=this.goods[type].page+1;
			getHomeGoods(type,page).then(res => {
				console.log(res);
				//获取到的list是数组，要把数组里面的内容塞到list中，page+1
				this.goods[type].list.push(...res.data.data.list);
				this.goods[type].page+=1;

				//数据加载完成后，完成刷新
				this.$refs.scroll.finishPullUp()
			})
		}
	}
};
</script>
<style scoped>
	#home {
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav {
		color: #fff;
		background: rgb(247, 164, 182);
		/* position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9; */
	}
	.tab-control{
		position: relative;
		z-index: 9;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		right: 0;
		left: 0;
	}
	/* .content{
		height: calc(100%-93px);
		overflow: hidden;
		margin-top: 44px;
	} */


</style>