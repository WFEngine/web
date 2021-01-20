import httpClient from '../../../common/api.service'
import {
    GET_PACKAGE_VERSIONS
} from './actions.type'

import {
    SET_PACKAGE_VERSIONS
} from './mutations.type'

const actions = {
    [GET_PACKAGE_VERSIONS](context) {
        return new Promise((resolve, reject) => {
            httpClient.get("/packageversion/list").then((payload) => {
                context.commit(SET_PACKAGE_VERSIONS, payload.data);
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default actions;