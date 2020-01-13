// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from './store'
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload,{
  loading:require('@/assets/img/common/placeholder.png')
})

FastClick.attach(document.body);

Vue.use(vueSwiper)
Vue.prototype.$bus=new Vue();

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
