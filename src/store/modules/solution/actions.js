import httpClient from '../../../common/api.service'
import {
    INSERT_SOLUTION,
    GET_SOLUTIONS,
    DELETE_SOLUTION,
    GET_SOLUTION,
    UPDATE_SOLUTION
} from './actions.type'

import {
    SET_SOLUTIONS,
    SET_SOLUTION
} from './mutations.type'

const actions = {
    [INSERT_SOLUTION](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post('/solution/insert', payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [GET_SOLUTIONS](context) {
        return new Promise((resolve, reject) => {
            httpClient.get('/solution/solutions').then((payload) => {
                context.commit(SET_SOLUTIONS, payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    },
    [DELETE_SOLUTION](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.delete(`/solution/delete/${payload.id}`).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_SOLUTION](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/solution/solution/${payload.id}`).then((payload) => {
                context.commit(SET_SOLUTION, payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [UPDATE_SOLUTION](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.put(`/solution/update/${payload.Id}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default actions;