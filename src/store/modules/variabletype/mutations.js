import {SET_VARIABLE_TYPES} from './mutations.type'
const mutations = {
    [SET_VARIABLE_TYPES](state,payload){
        state.variableTypes = payload.variableTypes
    }
}

export default mutations;