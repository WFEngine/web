import { SET_SOLUTIONS } from './mutations.type'
const mutations = {
    [SET_SOLUTIONS](state, payload) {
        state.solutions = payload.solutions;
    }
}

export default mutations;