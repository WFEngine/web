import httpClient from '../../../common/api.service'

import { GET_ACTIVITIES } from './actions.type'
import {SET_ACTIVITIES} from './mutations.type'

const actions = {
    [GET_ACTIVITIES](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/activity/get/${payload.projectId}`, payload).then((payload) => {
                context.commit(SET_ACTIVITIES,payload.data);
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions;