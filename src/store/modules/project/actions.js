import httpClient from '../../../common/api.service'
import {
    SAVE_PROJECT
} from './actions.type'

const actions = {
    [SAVE_PROJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post(`/project/insert/${payload.SolutionId}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions