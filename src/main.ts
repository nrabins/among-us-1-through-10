import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { formatMs } from './filters/time'

Vue.config.productionTip = false

Vue.filter('formatMs', formatMs)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
