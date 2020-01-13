import {request} from './request'
export function getDetailData(iid){
    return request({
        url:'/api/hy/detail',
        params:{
            iid
        }
    })
}

export function getRecommendData(){
    return request({
        url:'/api/hy/recommend'
    })
}
//让所有数据都保存在一个对象里
export class Goods{
    constructor(itemInfo,columns,services){
        this.title=itemInfo.title;
        this.desc=itemInfo.desc;
        this.newPrice=itemInfo.price;
        this.oldPrice=itemInfo.oldPrice;
        this.discountDesc=itemInfo.discountDesc;
        this.columns=columns;
        this.services=services;
        this.realPrice=itemInfo.lowNowPrice
    }
}

export class Shop{
    constructor(shopInfo){
        this.shopLogo=shopInfo.shopLogo;
        this.name=shopInfo.name;
        this.cFans=shopInfo.cFans;
        this.cSells=shopInfo.cSells;
        this.score=shopInfo.score;
        this.cGoods=shopInfo.cGoods;
    }
}

export class GoodsParams{
    constructor(info,rule){
        this.image=info.images ? info.images[0] :'';
        this.set=info.set;
        this.tables=rule.tables;
    }
}