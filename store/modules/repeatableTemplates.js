import axios from "@/config/axios";

const initiateState = () => {
    return {
        allRepeatableTemplates: [],
        errors: {},
        repeatableTemplateAddStatus: false,
        repeatableTemplateUpdateStatus: false,
        repeatableTemplateDeleteStatus: false,
        repeatableTemplateData: {},
        parentEntityData: {}
    }
}
const state = initiateState()
const getters = {
    getAllRepeatableTemplates: state => state.allRepeatableTemplates,
    getRepeatableTemplateErrors: state => state.errors,
    getRepeatableTemplateAddStatus: state => state.repeatableTemplateAddStatus,
    getRepeatableTemplateUpdateStatus: state => state.repeatableTemplateUpdateStatus,
    getRepeatableTemplateDeleteStatus: state => state.repeatableTemplateDeleteStatus,

    getRepeatableTemplateData: state => state.repeatableTemplateData,
    getParentEntityData: state => state.parentEntityData
}
const mutations = {
    setRepeatableTemplateErrors(state, data) {
        state.errors = data
    },
    setAllRepeatableTemplates(state, data) {
        state.allRepeatableTemplates = data
    },
    setRepeatableTemplateData(state, data) {
        state.repeatableTemplateData = data;
    },
    setRepeatableTemplateAddStatus(state, data) {
        state.repeatableTemplateAddStatus = data
    },
    setRepeatableTemplateUpdateStatus(state, data) {
        state.repeatableTemplateUpdateStatus = data
    },
    setRepeatableTemplateDeleteStatus(state, data) {
        state.repeatableTemplateDeleteStatus = data
    },

    setParentEntityData(state, data) {
        state.parentEntityData = data
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
        context.commit("repeatableTemplates/resetData", null, {
            root: true
        });
    },
    getRepeatableTemplates: async (context, params) => {
        try {
            const response = await axios.get('/templates-data/repeatable-template', {
                params
            })
            // we will get pagination data so we are storing complete data 
            context.commit("repeatableTemplates/setAllRepeatableTemplates", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("repeatableTemplates/setAllRepeatableTemplates", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },
    fetchRepeatableTemplateData: async (context, params) => {
        try {
            let template_id = params.template_id;
            delete params.template_id;
            const response = await axios.get('/templates-data/repeatable-template/' + template_id, {
                params
            })
            // we will get pagination data so we are storing complete data 
            context.commit("repeatableTemplates/setRepeatableTemplateData", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("repeatableTemplates/setRepeatableTemplateData", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },

    resetErrors: (context) => {
        context.commit("repeatableTemplates/setRepeatableTemplateErrors", {}, {
            root: true
        })
    },

    updateParentEntityData: ({
        commit,
        getters
    }, data) => {
        let existedData = {
            ...getters.getParentEntityData
        } || {}
        existedData[data.entity_id] = data
        commit("repeatableTemplates/setParentEntityData", existedData, {
            root: true
        })
    },
    resetParentEntityData: ({
        commit
    }) => {
        commit("repeatableTemplates/setParentEntityData", {}, {
            root: true
        })
    },

    addRepeatableTemplate: async (context, params) => {
        try {
            context.commit("repeatableTemplates/setRepeatableTemplateAddStatus", false, {
                root: true
            })
            context.commit("repeatableTemplates/setRepeatableTemplateErrors", {}, {
                root: true
            })
            await axios.post('/templates-data/repeatable-template', params)
            context.commit("repeatableTemplates/setRepeatableTemplateAddStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("repeatableTemplates/setRepeatableTemplateAddStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("repeatableTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("repeatableTemplates/setRepeatableTemplateErrors", errors, {
                    root: true
                })
            }
        }
    },
    updateRepeatableTemplate: async (context, params) => {
        try {
            context.commit("repeatableTemplates/setRepeatableTemplateUpdateStatus", false, {
                root: true
            })
            context.commit("repeatableTemplates/setRepeatableTemplateErrors", {}, {
                root: true
            })
            await axios.patch('/templates-data/repeatable-template/' + params.id, params)
            context.commit("repeatableTemplates/setRepeatableTemplateUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("repeatableTemplates/setRepeatableTemplateDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("repeatableTemplates/errorResponse", error.response, {
                    root: true
                })
                context.commit("repeatableTemplates/setRepeatableTemplateErrors", errors, {
                    root: true
                })
            }
        }
    },
    deleteRepeatableTemplate: async (context, params) => {
        try {
            context.commit("repeatableTemplates/setRepeatableTemplateDeleteStatus", false, {
                root: true
            })
            context.commit("repeatableTemplates/setRepeatableTemplateErrors", {}, {
                root: true
            })
            await axios.delete('/templates-data/repeatable-template/' + params.id, params)
            context.commit("repeatableTemplates/setRepeatableTemplateDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("repeatableTemplates/setRepeatableTemplateDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("repeatableTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("repeatableTemplates/setBenefitErrors", errors, {
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