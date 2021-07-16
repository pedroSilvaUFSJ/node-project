import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticleByCategory'
import ArticleById from '@/components/article/ArticleById'

Vue.use(VueRouter)

const routes = [
    { name: 'home', path: '/', component: Home },
    { name: 'adminPages', path: '/admin', component: AdminPages, meta: { requiresAdmin: true } },
    { name: 'articlesByCategory', path: '/categories/:id/articles', component: ArticlesByCategory, meta: { requiresAdmin: false } },
    { name: 'articleById', path: '/articles/:id', component: ArticleById, meta: { requiresAdmin: false } }
]

const router = new VueRouter({ mode: 'history', routes })

export default router
