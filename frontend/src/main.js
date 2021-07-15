import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/msg'
import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6IlVzZXIgbmFtZSIsImVtYWlsIjoidGVzdGVAaG90bWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjI2MzAzOTI3LCJleHAiOjE2MjY1NjMxMjd9.pctJr180VMw0eR7l7KzudpSO0zAoSeOXzAp_h6pGwPs'
require('axios').defaults.headers.common['Authorization'] = `bearer ${token}`

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');