import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style/reset.css'
import 'swiper/dist/css/swiper.css'
import VueResource from 'vue-resource'
import VueSwiper from 'vue-awesome-swiper'
import './assets/style/iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.use(VueSwiper)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
