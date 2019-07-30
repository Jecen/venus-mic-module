import '@babel/polyfill'
import './normalize'
import pkg from '../package.json'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import IView from 'iview'
import App from './components/App/index.vue'
import router from './router'
import store from './store'
import components from './components'
import views from  './views'

import 'iview/dist/styles/iview.css'
import 'root/assets/css/reset-1.3.3.css'


window[`load_${pkg.name}`] = ($el, state = {}, emitter, baseRouter) => {

  sync(store, router)

  Vue.use(IView)
  Vue.use(components)

  const app = new Vue({
    router,
    store,
    ...App,
  })

  const { http } = app
  Vue.use(views, store, router, http)

  const initModule = (state, emitter, baseRouter) => {
    store.commit('globe/user/SET_USERINFO', state)
    Vue.prototype.$moduleEmitter = emitter

    router.beforeEach((to, from, next) => { // eslint-disable-line
      // 模块路由对路径无匹配的视图时，返回给Base路由做处理
      if (to.matched.length === 0) {
        app.$destroy()
        baseRouter.push(to)
      } else {
        next()
      }
    })
  }

  require('./pwa')
  initModule(state, emitter, baseRouter)
  app.$mount($el)
}