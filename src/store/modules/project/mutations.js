import {
SET_PROJECT_TYPES,
SET_PROJECT
} from './mutations.type'

const mutations = {
    [SET_PROJECT_TYPES](state, payload) {
        state.projectTypes = payload.projectTypes;
    },
    [SET_PROJECT](state, payload) {
        state.project = payload.project;
        state.projectWFObjects = payload.wfObjects;
    }
}

export default mutations