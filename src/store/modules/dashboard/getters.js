const getters = {
    getSolutionCount: state => {
        return state.solutionCount;
    },
    getProjectCount: state => {
        return state.projectCount;
    },
    getWorkflowCount: state => {
        return state.workflowCount;
    }
}

export default getters;