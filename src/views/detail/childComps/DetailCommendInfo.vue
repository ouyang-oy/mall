<!--  -->
<template>
  <div v-if="Object.keys(commendInfo).length !==0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
          <img :src="commendInfo.user.avatar" alt="">
          <span>{{commendInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
          <p>{{commendInfo.content}}</p>
          <div class="info-other">
              <span class="date">{{commendInfo.created | showDate}}</span>
              <span>{{commendInfo.style}}</span> 
          </div>
          <div class="info-imgs">
              <img v-for="(item,index) in commendInfo.images" :key="index" :src="item" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils'
export default {
  data () {
    return {
    };
  },
    props:{
        commendInfo:{
            type:Object,
            default(){
                return{}
            }
        }
    },
    filters:{
        //得到的是时间戳对象(秒) 转为date对象(需要毫秒要 X 1000),引入对应的js
        showDate(value){
            let date =new Date(value*1000);
            return formatDate(date,'yyyy-MM-dd')
        }
    }
}

</script>
<style scoped>
    .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>