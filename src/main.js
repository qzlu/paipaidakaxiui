import Vue from 'vue'
import App from './App'
import { sa } from './utils/sensorsdata'
Vue.config.productionTip = false
App.mpType = 'app'
sa.init()
const app = new Vue(App)
app.$mount()
