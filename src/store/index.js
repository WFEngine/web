import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//#region Modules
import base from './modules/base/index'
import auth from './modules/auth/index'
//#endregion

export default new Vuex.Store({
  modules: {
    base,
    auth
  }
})
