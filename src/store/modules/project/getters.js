const getters = {
    getProjectTypes : state => {
        return state.projectTypes;
    },
    getProject : state => {
        return state.project;
    },
    getProjectWFObjects: state=>{
        return state.projectWFObjects;
    }
}

export default getters;