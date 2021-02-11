import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//#region Modules
import base from './modules/base/index'
import auth from './modules/auth/index'
import solution from './modules/solution/index'
import project from './modules/project/index'
import packageversion from './modules/packageversion/index'
import wfobject from './modules/wfobject/index'
import activities from './modules/activities/index'
//#endregion

export default new Vuex.Store({
  modules: {
    base,
    auth,
    solution,
    project,
    packageversion,
    wfobject,
    activities
  }
})
