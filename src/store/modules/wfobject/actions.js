import ApiService from '../../../common/api.service'
import httpClient from '../../../common/api.service'
import {
    INSERT_WF_OBJECT,
    DELETE_WF_OBJECT,
    GET_WF_OBJECT,
    UPDATE_WF_OBJECT,
    SAVE_WF_OBJECT
} from './actions.type.js'

import { SET_WF_OBJECT } from './mutations.type'

const actions = {
    [INSERT_WF_OBJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.post(`/wfobject/insert/${payload.ProjectId}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [DELETE_WF_OBJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.delete(`/wfobject/delete/${payload.ProjectId}/${payload.WFObjectId}`).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [GET_WF_OBJECT](context, payload) {
        return new Promise((resolve, reject) => {
            httpClient.get(`/wfobject/get/${payload.ProjectId}/${payload.WFObjectId}`).then((payload) => {
                context.commit(SET_WF_OBJECT, payload.data);
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [UPDATE_WF_OBJECT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/wfobject/update/${payload.ProjectId}/${payload.WFObjectId}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    [SAVE_WF_OBJECT](context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.put(`/wfobject/save/${payload.ProjectId}/${payload.WFObjectId}`, payload).then((payload) => {
                resolve(payload)
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default actions;