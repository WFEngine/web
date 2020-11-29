import httpClient from '../../../common/api.service'
import {
    REGISTER,
    LOGIN,
    GET_USER,
    DESTROY_USER
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
    }
}

export default actions;