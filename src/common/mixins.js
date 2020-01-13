//混入 home和detail组件里相同的内容用混入抽取出来
export const itemListenerMixins={
    data(){
        return{
            itemImgListener:null
        }
    },
    mounted(){
        const refresh=this.debounce(this.$refs.scroll.refresh,50);
        //图片加载完成后，再刷新 和home里相同
		this.itemImgListener=()=>{
			refresh()
		}
        this.$bus.$on('finishImgLoad',this.itemImgListener);
    }
}

//回到顶部的抽取 
import BackTop from 'components/content/backTop/BackTop'
export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false,
        }
    },
    methods:{
        tabClick(){
			/*方法一：获取到组件并拿到组件中data的scroll对象,并调用scrollTo方法
			this.$refs.scroll.scroll.scrollTo(0,0,1000);*/
			/*方法二：在scroll组件中封装好方法，然后调用 调用组件里面的方法 */
			this.$refs.scroll.scrollTo(0,0);
        },
        
    },
}