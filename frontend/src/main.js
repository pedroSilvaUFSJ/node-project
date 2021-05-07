import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlBlZHJvIEhlbnJpcXVlIGRhIFNpbHZhIiwiZW1haWwiOiJwZWRyby51ZnNqQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjAzODAyMTksImV4cCI6MTYyMDYzOTQxOX0.-LhdmVhYauksKCTkPwKKBfVFkskU87QOCFUVkx5cmA0'
require('axios').defaults.headers.common['Authorization'] = `bearer ${token}`

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');