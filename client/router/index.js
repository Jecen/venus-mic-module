import Vue from 'vue'
import Router from 'vue-router'
import pkg from '../../package.json'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'module' ? `/${pkg.name}` : '/',
  routes: [{
    path: '/',
    redirect: '/tpl',
  }],
})

export default router