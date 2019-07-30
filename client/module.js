import '@babel/polyfill'
import './normalize'
import pkg from '../package.json'
import { app, initModule } from './app'

window[`load_${pkg.name}`] = ($el, state = {}, emitter, baseRouter) => {
  require('./pwa')
  initModule(state, emitter, baseRouter)
  app.$mount($el)
}