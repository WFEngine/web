const getters={
    isAuthenticated : state => {
        return state.isAuthenticated;
    },

    getToken : state => {
        return state.token;
    },

    getUser : state => {
        return state.user
    },

    getOrganization : state => {
        return state.organization;
    }
}

export default getters;