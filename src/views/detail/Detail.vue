<!--  -->
<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
		<scroll class="content" ref="scroll" :probe-type='3' @scroll='contentScroll'>
			<detail-swiper :swiperImg='detailImg'></detail-swiper>
			<detail-base-info :goods='goods'></detail-base-info>
			<detail-shop-info :shop='shop'></detail-shop-info>
			<detail-goods-info :detail-info='detailInfo' @imgLoad='imgLoad'></detail-goods-info>
			<detail-param-info ref="params" :param-info='paramInfo'></detail-param-info>
			<detail-commend-info ref="commend" :commend-info='commendInfo'></detail-commend-info>
			<goods-list ref="recommend" :goods='recommendImg'></goods-list>
		</scroll>
		<back-top @click.native="tabClick" v-show="isShowBackTop"></back-top>
		<detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
	</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import { getDetailData, Goods , Shop, GoodsParams, getRecommendData } from "network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import scroll from 'components/common/scroll/scroll';
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommendInfo from "./childComps/DetailCommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from 'components/content/goods/GoodsList';
import {itemListenerMixins,backTopMixin} from '@/common/mixins'

export default {
	name:'Detail',
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		scroll,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommendInfo,
		GoodsList,
		DetailBottomBar
	},
	data() {
		return {
			iid: null,
			detailImg:[],
			goods:{},
			shop:{},
			detailInfo:{},
			paramInfo:{},
			commendInfo:{},
			recommendImg:[],
			// 保存标题对应内容的高度
			themeTopYs:[],
			getThemeTopY:null
		};
	},
	//使用混入 将组件相同的部分抽取到mixins.js中
	mixins:[itemListenerMixins,backTopMixin],
	created() {
		this.iid = this.$route.params.iid;
		getDetailData(this.iid).then(res=>{
			console.log(res);
			const data=res.data.result;
			this.detailImg=data.itemInfo.topImages;
			this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
			this.shop=new Shop(data.shopInfo);
			this.detailInfo=data.detailInfo;
			this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule);
			if(data.rate.cRate!==0){
				this.commendInfo=data.rate.list[0];
			}
		});
		getRecommendData().then(res=>{
			// console.log(res);
			this.recommendImg=res.data.data.list;
		});
		this.getThemeTopY=this.debounce(()=>{
			this.themeTopYs=[];
			this.themeTopYs.push(0);
			this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
			this.themeTopYs.push(this.$refs.commend.$el.offsetTop-44);
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
			this.themeTopYs.push(Number.MAX_VALUE);
			// console.log(this.themeTopYs);
		},100)
	},
	//使用了混入，所以不需要单独在写一遍
	// mounted(){
	// 	const refresh=this.debounce(this.$refs.scroll.refresh,50)
	// 	//图片加载完成后，再刷新 和home里相同
	// 	this.itemImgListener=()=>{
	// 		refresh()
	// 	}
	// 	this.$bus.$on('finishImgLoad',this.itemImgListener);
	// },

	//离开时，取消全局事件的监听
	destroyed(){
		this.$bus.$off('finishImgLoad',this.itemImgListener);
	},
	methods:{
		imgLoad(){
			//图片加载完成后，刷新页面，防止出现滚动到一半滚动不了的bug
			this.$refs.scroll.refresh();
			this.getThemeTopY();
		},
		//函数的防抖
		debounce(func,delay){
			let timer=null;
			return function(...args){
				if(timer) clearTimeout(timer)
				timer=setTimeout(()=>{
					func.apply(this,args)
				},delay);
			}
		},
		titleClick(index){
			// console.log(index);
			this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
		},
		contentScroll(position){
			this.isShowBackTop = -(position.y) > 1000;  //大于1000的时候显示按钮
			//获取滚动的y值和主题中的值对比
			//[0, 15575, 16252, 16540,一个非常大的值] 
			/* positionY 在0-15575 之间 index=0
			positionY 在15575-16252 之间 index=1
			positionY 在16252-16540 之间 index=2

			positionY >16540  index=3 */
			const positionY=-position.y;
			let length=this.themeTopYs.length; //4
			//1.第一种做法
			//分两种情况
			// for(let i=0;i<length;i++){
			// 	if((i<length-1 && positionY >= this.themeTopYs[i] && positionY <  this.themeTopYs[i+1]) || (i==length-1 && positionY>=this.themeTopYs[i])){
			// 		this.$refs.nav.curIndex=i
			// 	}
			// }

			//2.第二种巧妙做法
			for(let i=0;i<length-1;i++){
				if(positionY>= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
					this.$refs.nav.curIndex=i;
				}
			};
		},
		addToCart(){
			//1.获取购物车需要展示的信息
			const product={};
			product.title=this.goods.title;
			product.desc=this.goods.desc;
			product.image=this.detailImg[0];
			product.price=this.goods.realPrice;
			product.iid=this.iid;
			//2.将商品添加到购物车里
			// this.$store.cartList.push(product);
			this.$store.commit('addCart',product)
		},
	}
};
</script>
<style scoped>
	#detail{
		position: relative;
		z-index: 9999999;
		background: #fff;
		height: 100vh;
	}
	.content{
		height: calc(100% - 44px - 49px);
		/* overflow: hidden;
		position: absolute;
		top: 44px;
		right: 0;
		left: 0; */
	}
	.detail-nav{
		position: relative;
		z-index: 9;
		background: #fff;
	}
</style>