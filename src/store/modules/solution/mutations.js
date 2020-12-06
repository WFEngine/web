import {
    SET_SOLUTIONS,
    SET_SOLUTION
} from './mutations.type'
const mutations = {
    [SET_SOLUTIONS](state, payload) {
        state.solutions = payload.solutions;
    },
    [SET_SOLUTION](state, payload) {
        state.solution = payload.solution
    }
}

export default mutations;