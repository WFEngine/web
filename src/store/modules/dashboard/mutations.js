import { SET_DASHBOARD } from './mutations.type'

const mutations = {
    [SET_DASHBOARD](state, payload) {
        state.solutionCount = payload.solutionCount;
        state.projectCount = payload.projectCount;
        state.workflowCount = payload.workflowCount;
    }
}

export default mutations;