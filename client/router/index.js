import Vue from 'vue'
import Router from 'vue-router'
import pkg from '../../package.json'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'module' ? `/${pkg.name}` : '/',
})

export default router