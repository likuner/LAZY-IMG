import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '@likun./lazy-img'
import '../dest/index.js'
// import '/usr/local/lib/node_modules/lazy-img'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
