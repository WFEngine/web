import {SET_WF_OBJECT} from './mutations.type'

const mutations = {
    [SET_WF_OBJECT](state,payload){
        state.wfObject = payload.wfObject;
    }
}

export default mutations;