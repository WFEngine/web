import httpClient from '../../../common/api.service'
import { GET_VARIABLE_TYPES } from './actions.type'
import {SET_VARIABLE_TYPES} from './mutations.type'

const actions = {
    [GET_VARIABLE_TYPES](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/variabletype/get/${payload.ProjectId}`).then((payload) => {
                context.commit(SET_VARIABLE_TYPES,payload.data)
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions;