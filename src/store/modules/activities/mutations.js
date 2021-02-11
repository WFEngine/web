import {SET_ACTIVITIES} from './mutations.type'


const mutations = {
    [SET_ACTIVITIES](state,payload){
        state.activities = payload.activities;        
    }    
}

export default mutations;