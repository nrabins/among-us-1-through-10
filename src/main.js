import Vue from 'vue'
import App from './App.vue'
import { formatMs } from './filters/time'

Vue.config.productionTip = false

Vue.filter('formatMs', formatMs);

new Vue({
  render: h => h(App),
}).$mount('#app')
