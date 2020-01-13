import {request} from './request'

//封装home的网络请求
export  function getHomeMultidata(){
    return request({
        url:'/api/hy/home/multidata'
    })
}
export  function getHomeGoods(type,page){
    return request({
        url:'/api/hy/home/data',
        params:{
            type,
            page
        }
    })
}