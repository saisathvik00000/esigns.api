import axios from "@/config/axios";

const initiateState = () => {
    return {
        allGlobalVariables: [],
        allGlobalVariableTypes: [],
        globalVariableById: [],
        errors: {},
        globalVariablesAddStatus: false,
        globalVariablesUpdateStatus: false,
        globalVariablesDeleteStatus: false,
        globalVariablesDeleteError: false,

        allGlobalVariableTags: [],
        newTag: {},
        globalVariableTagAddStatus: false,
        globalVariableTagUpdateStatus: false,
        globalVariableTagDeleteStatus: false,
        globalVariableTagDeleteError: false,
        allStandardGlobalVariables: [],
    }
}
const state = initiateState()
const getters = {
    getAllGlobalVariables: state => state.allGlobalVariables,
    getAllGlobalVariableTypes: state => state.allGlobalVariableTypes,
    getGlobalVariableById: state => state.globalVariableById,
    getGlobalVariableErrors: state => state.errors,
    getGlobalVariableAddStatus: state => state.globalVariablesAddStatus,
    getGlobalVariableUpdateStatus: state => state.globalVariablesUpdateStatus,
    getGlobalVariableDeleteStatus: state => state.globalVariablesDeleteStatus,
    getGlobalVariableDeleteError: state => state.globalVariablesDeleteError,

    getAllGlobalVariableTags: state => state.allGlobalVariableTags,
    getNewTag: state => state.newTag,
    getGlobalVariableTagAddStatus: state => state.globalVariableTagAddStatus,
    getAllStandardGlobalVariables: state => state.allStandardGlobalVariables
}
const mutations = {
    setGlobalVariableErrors(state, data) {
        state.errors = data
    },
    setAllGlobalVariables(state, data) {
        state.allGlobalVariables = data
    },
    setAllGlobalVariableTypes(state, data) {
        state.allGlobalVariableTypes = data
    },
    setGlobalVariableById(state, data) {
        state.globalVariableById = data
    },
    setGlobalVariableAddStatus(state, data) {
        state.globalVariablesAddStatus = data
    },
    setGlobalVariableUpdateStatus(state, data) {
        state.globalVariablesUpdateStatus = data
    },
    setGlobalVariableDeleteStatus(state, data) {
        state.globalVariablesDeleteStatus = data
    },
    setGlobalVariableDeleteError(state, data) {
        state.globalVariablesDeleteError = data
    },
    setAllGlobalVariableTags(state, data) {
        state.allGlobalVariableTags = data
    },
    setNewTag(state, data) {
        state.newTag = data
    },
    setGlobalVariableTagAddStatus(state, data) {
        state.globalVariableTagAddStatus = data
    },
    setAllStandardGlobalVariables(state, data) {
        state.allStandardGlobalVariables = data
    },
    resetData: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },

}
const actions = {
    reset: function (context) {
        context.commit("globalVariables/resetData", null, {
            root: true
        });
    },
    fetchStandardGlobalVariables: async (context, params) => {
        try {
            context.commit("globalVariables/setAllStandardGlobalVariables",[], {
                root: true
            })
            const response = await axios.get('/standard/global-variables', {
                params
            })
            context.commit("globalVariables/setAllStandardGlobalVariables", response.data.data, {
                root: true
            })
        } catch (errors) {
            context.commit("globalVariables/setAllStandardGlobalVariables",[], {
                root: true
            })
            console.log(errors)
        }
    },

    fetchGlobalVariables: async (context, params) => {
        try {
            const response = await axios.get('/global-variables', {
                params
            })
            // we will get pagination data so we are storing complete data 
            context.commit("globalVariables/setAllGlobalVariables", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("globalVariables/setAllGlobalVariables", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },

    fetchGlobalVariableTypes: async (context) => {
        try {
            const response = await axios.get('/global-variables/types')
            // we will get pagination data so we are storing complete data 
            context.commit("globalVariables/setAllGlobalVariableTypes", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("globalVariables/setAllGlobalVariableTypes", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },

    fetchGlobalVariableById: async (context, params) => {
        try {
            const response = await axios.get('/global-variables/' + params.id, {
                params
            })
            context.commit("globalVariables/setGlobalVariableById", response.data.data, {
                root: true
            })
        } catch (errors) {
            context.commit("globalVariables/setGlobalVariableById", {}, {
                root: true
            })
            console.log(errors)
        }
    },

    resetErrors: (context) => {
        context.commit("globalVariables/setGlobalVariableErrors", {}, {
            root: true
        })
    },
    addGlobalVariable: async ({
        dispatch,
        commit
    }, params) => {
        try {
            commit("globalVariables/setGlobalVariableAddStatus", false, {
                root: true
            })
            commit("globalVariables/setGlobalVariableErrors", {}, {
                root: true
            })
            await axios.post('/global-variables', params)
            commit("globalVariables/setGlobalVariableAddStatus", true, {
                root: true
            })
        } catch (error) {
            commit("globalVariables/setGlobalVariableAddStatus", false, {
                root: true
            })
            await dispatch('errors/errorResponse', error.response, {
                root: true
            })
            if (error.response) {
                const errors = await dispatch("globalVariables/errorResponse", error.response, {
                    root: true
                });
                commit("globalVariables/setGlobalVariableErrors", errors, {
                    root: true
                })
            }
        }
    },
    updateGlobalVariable: async (context, params) => {
        try {
            context.commit("globalVariables/setGlobalVariableUpdateStatus", false, {
                root: true
            })
            context.commit("globalVariables/setGlobalVariableErrors", {}, {
                root: true
            })
            await axios.patch('/global-variables/' + params.id, params)
            context.commit("globalVariables/setGlobalVariableUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("globalVariables/setGlobalVariableUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("globalVariables/errorResponse", error.response, {
                    root: true
                })
                context.commit("globalVariables/setGlobalVariableErrors", errors, {
                    root: true
                })
            }
        }
    },
    deleteGlobalVariable: async (context, params) => {
        try {
            context.commit("globalVariables/setGlobalVariableDeleteStatus", false, {
                root: true
            })
            context.commit("globalVariables/setGlobalVariableErrors", {}, {
                root: true
            })
            await axios.delete('/global-variables/' + params.id, params)
            context.commit("globalVariables/setGlobalVariableDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("globalVariables/setGlobalVariableDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("globalVariables/errorResponse", error.response, {
                    root: true
                });
                context.commit("globalVariables/setGlobalVariableErrors", errors, {
                    root: true
                })
            }
        }
    },

    unSetNewTag: async (context) => {
        context.commit("globalVariables/setNewTag", {}, {
            root: true
        })
        context.commit("globalVariables/setGlobalVariableErrors", {}, {
            root: true
        });
    },

    fetchGlobalVariableTags: async (context) => {
        try {
            const response = await axios.get('/global-variable-tags')
            // we will get pagination data so we are storing complete data 
            context.commit("globalVariables/setAllGlobalVariableTags", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("globalVariables/setAllGlobalVariableTags", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },

    addGlobalVariableTag: async ({
        dispatch,
        commit
    }, params) => {
        try {
            commit("globalVariables/setGlobalVariableTagAddStatus", false, {
                root: true
            })
            commit("globalVariables/setNewTag", {}, {
                root: true
            })
            commit("globalVariables/setGlobalVariableErrors", {}, {
                root: true
            })
            let response = await axios.post('/global-variable-tags', params)
            commit("globalVariables/setNewTag", response.data, {
                root: true
            })
            commit("globalVariables/setGlobalVariableTagAddStatus", true, {
                root: true
            })
        } catch (error) {
            commit("globalVariables/setGlobalVariableTagAddStatus", false, {
                root: true
            })
            await dispatch('errors/errorResponse', error.response, {
                root: true
            })
            if (error.response) {
                const errors = await dispatch("globalVariables/errorResponse", error.response, {
                    root: true
                });
                commit("globalVariables/setGlobalVariableErrors", errors, {
                    root: true
                })
            }
        }
    },
    errorResponse: (context, errorResponse) => {
        let errorStatusCode = errorResponse.status;
        let errorData = {};
        switch (errorStatusCode) {
            case 422:
                var errors = errorResponse.data.errors;
                errors.details.forEach(detail => {

                    if (detail.key == "files") {
                        if (!errorData[detail.path]) {
                            errorData[detail.path] = detail.message
                        }
                    } else {
                        if (!errorData[detail.key]) {
                            errorData[detail.key] = detail.message;
                        }
                    }
                });
                break;
            case 401:
            case 403:
                errorData["critical_error"] = errorResponse.data.message;

                break;

            default:
                errorData["critical_error"] = errorResponse.data.message;
                break;
        }
        return errorData;
    },
}
export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
}