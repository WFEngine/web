import httpClient from '../../../common/api.service'

import { GET_DASHBOARD } from './actions.type'

import { SET_DASHBOARD } from './mutations.type'

const actions = {
    [GET_DASHBOARD](context) {
        return new Promise((resolve, reject) => {
            httpClient.get('/dashboard/list').then((payload) => {
                context.commit(SET_DASHBOARD, payload.data);
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default actions;