import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import pkg from '../../package.json'

import globe from './globe'

Vue.use(Vuex)

const state = {}

const mutations = {}

const actions = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    globe,
  },
  plugins: [createPersistedState({ key: pkg.name, paths: ['globe'] })],
})

export default store
