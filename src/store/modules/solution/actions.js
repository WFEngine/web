import httpClient from '../../../common/api.service'
import {
    INSERT_SOLUTION,
    GET_SOLUTIONS
} from './actions.type'

import { SET_SOLUTIONS } from './mutations.type'

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
    }
}

export default actions;