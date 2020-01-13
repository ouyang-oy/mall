import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store= new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
            //payload新添加的商品 product
            let oldProduct=null;
            for(var item of state.cartList){
                if(item.iid===payload.iid){
                    oldProduct=item;
                }
            }
            //2.判断oldProduct
            if(oldProduct){
                oldProduct.count+=1
            }else{
                payload.count=1;
                payload.checked=true;//在模型中修改，默认是选中的
                state.cartList.push(payload);
            }

        }
    }
})

//3.挂载到vue实例上
export default store