import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../store/index'
import router from '../router/index'
import { IS_LOADING } from '../store/modules/base/actions.type'
import jwtService from './jwt.service'
import { DESTROY_USER } from '../store/modules/auth/actions.type'

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = "http://localhost:51400/api"
        Vue.axios.defaults.headers["Location"] = "https://github.com/"
    },

    setHeader() {
        var tokenItem = jwtService.getToken();
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${tokenItem.token}`;
    },

    setLocalization() {
        Vue.axios.defaults.baseURL = "tr"
    },

    removeHeader() {
        delete axios.defaults.headers.comon["Authorization"];
    },

    post(resource, params) {
        delete Vue.axios.defaults.headers.post["Content-Type"]
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING)

            Vue.axios.post(`${resource}`, params).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        message: ""
                    }
                    reject(data)
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        if (err.response.data.statusCode === undefined) {
                            store.dispatch(DESTROY_USER)
                            router.push({ path: '/auth/login' })
                            err.response.data.message = '';
                        }
                        reject(err.response.data)
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    } else if (statusCode === 500) {
                        err.response.data.message = ''
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING)
            })
        })
    },

    get(resource, params) {
        delete Vue.axios.defaults.headers.post['Content-Type']
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING);

            Vue.axios.get(`${resource}`, params).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        message: ''
                    };
                    reject(data);
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        if (err.response.data.statusCode === undefined) {
                            store.dispatch(DESTROY_USER)
                            router.push({ path: '/auth/login' })
                            err.response.data.message = '';
                        }
                        reject(err.response.data)
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    } else if (statusCode === 500) {
                        err.response.data.message = ''
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING);
            })
        })
    },

    put(resource, params) {
        delete Vue.axios.defaults.headers.post['Content-Type']
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING);

            Vue.axios.put(`${resource}`, params).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        message: ''
                    };
                    reject(data);
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        if (err.response.data.statusCode === undefined) {
                            store.dispatch(DESTROY_USER)
                            router.push({ path: '/auth/login' })
                            err.response.data.message = '';
                        }
                        reject(err.response.data)
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    } else if (statusCode === 500) {
                        err.response.data.message = ''
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING);
            })
        })
    },

    delete(resource, params) {
        delete Vue.axios.defaults.headers.post['Content-Type']
        return new Promise((resolve, reject) => {
            store.dispatch(IS_LOADING);

            Vue.axios.put(`${resource}`, params).then((response) => {
                resolve(response.data);
            }).catch((err) => {
                if (!err.response) {
                    const data = {
                        message: ''
                    };
                    reject(data);
                } else {
                    const statusCode = err.response.status;
                    if (statusCode === 401) {
                        if (err.response.data.statusCode === undefined) {
                            store.dispatch(DESTROY_USER)
                            router.push({ path: '/auth/login' })
                            err.response.data.message = '';
                        }
                        reject(err.response.data)
                    } else if (statusCode === 404) {
                        reject(err.response.data);
                    } else if (statusCode === 500) {
                        err.response.data.message = ''
                        reject(err.response.data);
                    }
                }
            }).finally(() => {
                store.dispatch(IS_LOADING);
            })
        })
    },
}

export default ApiService;