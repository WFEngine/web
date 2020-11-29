import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import auth from './auth'
import dashboard from './dashboard'

const routes = [
  auth,
  dashboard
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
