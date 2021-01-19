import httpClient from '../../../common/api.service'
import {
    SAVE_PROJECT,
    GET_PROJECT_TYPES,
    GET_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from './actions.type'

import {
    SET_PROJECT_TYPES,
    SET_PROJECT
} from './mutations.type'

const actions = {
    [SAVE_PROJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post(`/project/insert/${payload.SolutionId}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_PROJECT_TYPES](context) {
        return new Promise((resolve, reject) => {
            httpClient.get('/project/projecttypes').then((payload) => {
                context.commit(SET_PROJECT_TYPES, payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_PROJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/project/get/${payload.id}`).then((payload) => {
                context.commit(SET_PROJECT, payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [UPDATE_PROJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.put(`/project/update/${payload.Id}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [DELETE_PROJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.delete(`/project/delete/${payload.id}`).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions