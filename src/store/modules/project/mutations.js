import {SET_PROJECT_TYPES} from './mutations.type'

const mutations = {
    [SET_PROJECT_TYPES](state,payload){
        state.projectTypes = payload.projectTypes;
    }
}

export default mutations