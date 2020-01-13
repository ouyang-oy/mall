import axios from 'axios'
//封装axios
export function request(config){
    //1.创建axios实例
    const instance=axios.create({
        baseURL:'http://123.207.32.32:8000',     
    })
    //2.axios的拦截器
    //2.1请求拦截 最后结果要返回config
        /*请求拦截器的作用
        1.比如config中一些信息不符合服务器的要求
        2.比如每次发送网络请求时，希望在界面中显示一个加载的图标
        3.某些网络请求(例如登录(token)),必须携带一些特殊的信息*/
    instance.interceptors.request.use(config=>{
        //console.log(config);
        return config;
    },err=>{
        //console.log(err);
    })

    //2.2响应拦截,最后结果要返回res
    instance.interceptors.response.use(res =>{
        //console.log(res);
        return res;
    }, err =>{
        //console.log(err);
    })
    //3.发送真正的网络请求,返回的是promise对象
    return instance(config)
}