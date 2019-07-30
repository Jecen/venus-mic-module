

import * as modules from './*/index.js'

export default (Vue, store, router, http) => {
  Object.keys(modules).forEach(key => {
    Vue.use(modules[key], store, router, http)
  })

  router.addRoutes([{
    path: '/404', // 此处需特别注意至于最底部
    component: () => import('../components/NotFound'),
  }])
}