import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './locales/index'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import httpClient from './common/api.service'
import jwtService from './common/jwt.service'
import { DESTROY_USER } from './store/modules/auth/actions.type'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import JsonViewer from 'vue-json-viewer'

Vue.use(VueLodash, { lodash: lodash })
Vue.use(JsonViewer);
Vue.component("activity-item",()=>import('./components/Tabs/Workflow/Designer/Activity.vue'))
Vue.component("wf-designer-toolbar",()=>import('./components/Tabs/Workflow/Designer/Toolbar.vue'))

Vue.config.productionTip = false

httpClient.init();
Vue.use(VueSweetalert2)

const allowScopes = [
  "/auth/login",
  "/auth/register"
]

router.beforeEach((to, from, next) => {
  var token = jwtService.getToken()
  if (token.token !== undefined) {
    httpClient.setHeader();
  }
  var isAuthenticated = store.getters.isAuthenticated;
  var relativePath = to.path;
  if (!isAuthenticated) {
    if (!allowScopes.includes(relativePath)) {
      router.push({
        path: '/auth/login'
      })
    }
  } else {
    if (new Date(token.expiryDate) > new Date()) {
      if (allowScopes.includes(relativePath)) {
        router.push({
          path: '/dashboard'
        })
      }
    } else {
      store.dispatch(DESTROY_USER)
      router.push({
        path: '/auth/login'
      })
    }
  }

  if (to.fullPath == '/') {
    if (isAuthenticated)
      router.push({ path: '/dashboard' })
      else
      router.push({path:'/auth/login'})
  }
  next(true)
})


new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
