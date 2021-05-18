import httpClient from '../../../common/api.service'
import {
    REGISTER,
    LOGIN,
    GET_USER,
    DESTROY_USER,
    LOGOUT_USER,
    CHANGE_LANGUAGE,
    RECOVER_PASSWORD
} from './actions.type'
import {
    SET_USER,
    DESTROY_SESSION
} from './mutations.type'

const actions = {
    [REGISTER](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post("/auth/register", payload).then((payload) => {
                resolve(payload.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [LOGIN](context, payload) {
        return new Promise((resolve, reject) => {
            var loginType = payload.loginType;
            httpClient.post("/auth/login", payload).then((payload) => {
                if (loginType !== 1) {
                    window.location.href = payload.data.redirectUrl
                } else {
                    context.commit(SET_USER, payload.data)
                }
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_USER](context) {
        httpClient.setHeader();
        return new Promise((resolve, reject) => {
            httpClient.get("/auth/getuser").then((payload) => {
                context.commit(SET_USER, payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [DESTROY_USER](context) {
        context.commit(DESTROY_SESSION)
    },
    [LOGOUT_USER](context) {
        return new Promise((resolve, reject) => {
            httpClient.post('/auth/logout').then((payload) => {
                context.commit(DESTROY_SESSION)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [CHANGE_LANGUAGE](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post('/auth/changelanguage', payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [RECOVER_PASSWORD](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post('/auth/recoverypassword', payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default actions;