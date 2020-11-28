import httpClient from '../../../common/api.service'
import {
    REGISTER,
    LOGIN
} from './actions.type'

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
                console.log(payload)
                if (loginType !== 1) {
                    window.location.href = payload.data.data.redirectUrl
                }
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions;