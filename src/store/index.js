import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//#region Modules
import auth from './modules/auth/index'
//#endregion

export default new Vuex.Store({ 
  modules: {
    auth
  }
})
