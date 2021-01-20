import {
    SET_PACKAGE_VERSIONS
} from './mutations.type'

const mutations = {
    [SET_PACKAGE_VERSIONS](state, payload) {
        state.packageVersions = payload.packageVersions;        
    }
}

export default mutations;