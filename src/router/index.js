import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import auth from './auth'
import dashboard from './dashboard'
import solution from './solution'
import project from './project'

const routes = [
  auth,
  dashboard,
  solution,
  project
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
