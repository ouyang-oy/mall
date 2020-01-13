<!--  -->
<template>
  <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked='isSelectAll' @click.native="seleckAll"></check-button>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate">
            去计算({{calculate}})
        </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    data () {
        return {
        };
    },
    components:{
        CheckButton,
    },
    computed:{
        //总价
        totalPrice(){
            return '￥'+this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.price*item.count
            },0).toFixed(2)
        },
        calculate(){
            return this.$store.state.cartList.filter(item =>item.checked).length
        },
        isSelectAll(){
            //有一个没被选中，就不显示全选 不被选中有长度为真，取反为假
            if(this.$store.state.cartList.length==0){
                return false
            }

            //1.使用filter
            // return !(this.$store.state.cartList.filter(item => !item.checked).length); //false

            //第2 使用find函数，找到不符合的就不往下查找 取反为假 不显示全选按钮   
            return !(this.$store.state.cartList.find(item => !item.checked));

            //3，使用普通遍历
            // for(let item of this.$store.state.cartList){
            //     if(!item.checked){
            //         return false
            //     }
            // }
            // return true;
        }
    },
    methods:{
        //点击全选按钮 1.如果原来都是选中，点击一次，全部不选中 2.如果原来都是不选中(某些不选中)，全部选中
        seleckAll(){
            if(this.isSelectAll){ //全部选中
                this.$store.state.cartList.forEach(item => item.checked=false);
            }else{ //全部不选中或者某些没被选中
                 this.$store.state.cartList.forEach(item => item.checked=true);
            }
        }
    }
}

</script>
<style scoped>
    .bottom-bar{
        height: 40px;
        background-color:#eee;
        position: relative;
        line-height: 40px;
        display: flex
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left:10px;
        width: 60px;
    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price{
        margin-left: 5px;
        flex: 1;
    }
    .calculate{
        width: 90px;
        background: var(--color-tint);
        color: #fff;
        text-align: center;
    }
</style>