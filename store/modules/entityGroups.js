import axios from "@/config/axios";

const initiateState = () => {
    return {
        allEntityGroupsData: [],
        entityGroupDataAddStatus: false,
        entityGroupDataUpdateStatus: false,
        entityGroupDataDeleteStatus: false,
        entityGroupDataDeleteError: false,
        singleEntityGroupData: {},
        entityGroupErrors: {},
        error: {},
    }
}
const state = initiateState()
const getters = {
    getAllEntityGroupsData: state => state.allEntityGroupsData,
    getEntityGroupDataAddStatus: state => state.entityGroupDataAddStatus,
    getEntityGroupDataUpdateStatus: state => state.entityGroupDataUpdateStatus,
    getEntityGroupDataDeleteStatus: state => state.entityGroupDataDeleteStatus,
    getEntityGroupDataDeleteError: state => state.entityGroupDataDeleteError,
    getSingleEntityGroupData: state => state.singleEntityGroupData,
    getEntityGroupErrors: state => state.entityGroupErrors,
    getError: state => state.error
}
const mutations = {
    setAllEntityGroupsData(state, data) {
        state.allEntityGroupsData = data
    },
    setEntityGroupDataAddStatus(state, data) {
        state.entityGroupDataAddStatus = data
    },
    setEntityGroupDataUpdateStatus(state, data) {
        state.entityGroupDataUpdateStatus = data
    },
    setEntityGroupDataDeleteStatus(state, data) {
        state.entityGroupDataDeleteStatus = data
    },
    setEntityGroupErrors(state, data) {
        state.entityGroupErrors = data
    },
    setEntityGroupDataDeleteError(state, data) {
        state.entityGroupDataDeleteError = data
    },
    setSingleEntityGroupData(state, data) {
        state.singleEntityGroupData = data
    },
    setError(state, data) {
        state.error = data
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
        context.commit("entityGroups/resetData", null, {
            root: true
        });
    },

    clearErrors: (context) => {
        context.commit("entityGroups/setEntityGroupErrors", {}, {
            root: true
        })
    },

    fetEntityGroupsData: async (context, params) => {
        try {
            const response = await axios.get('/entity-groups', {
                params
            })
            // we will get pagination data so we are storing complete data 
            context.commit("entityGroups/setAllEntityGroupsData", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("entityGroups/setAllEntityGroupsData", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
            console.log(errors)
        }
    },



    fetEntityGroupDataById: async (context, entityGroupDataId) => {
        try {
            context.commit("entityGroups/setSingleEntityGroupData", {
                data: {}
            }, {
                root: true
            })
            let response = await axios.get(`entity-groups/${entityGroupDataId}`)
            context.commit("entityGroups/setSingleEntityGroupData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("entityGroups/setSingleEntityGroupData", {
                data: {}
            }, {
                root: true
            })
        }
    },

    deleteEntityData: async (context, entityDataId) => {
        try {
            context.commit("entityGroups/setEntityDataDeleteStatus", false, {
                root: true
            })
            await axios.delete(`entity-groups/${entityDataId}`)
            context.commit("entityGroups/setEntityDataDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("entityGroups/setEntityDataDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("entityGroups/errorResponse", error.response, {
                    root: true
                });
                context.commit("entityGroups/setEntitiesDataErrors", errors, {
                    root: true
                })
            }
        }
    },

    resetErrors: (context) => {
        // context.commit("entityGroups/setEntitiesDataErrors", {}, {
        //     root: true
        // })

        context.commit(
            "entityGroups/setError", {}, {
                root: true,
            }
        );
        context.commit(
            "entityGroups/setEntityGroupErrors", {}, {
                root: true,
            }
        );
    },
    addEntityGroup: async (context, params) => {
        try {
            context.commit("entityGroups/setSingleEntityGroupData", {}, {
                root: true
            })
            context.commit("entityGroups/setEntityGroupDataAddStatus", false, {
                root: true
            })
            context.commit("entityGroups/setEntityGroupErrors", {}, {
                root: true
            })
            let response = await axios.post('/entity-groups', params)
            context.commit("entityGroups/setSingleEntityGroupData", response.data, {
                root: true
            })
            context.commit("entityGroups/setEntityGroupDataAddStatus", true, {
                root: true
            })
            context.commit("entityGroups/setError", {}, {
                root: true
            })
        } catch (error) {
            context.commit("entityGroups/setSingleEntityGroupData", {}, {
                root: true
            })
            context.commit("entityGroups/setEntityGroupDataAddStatus", false, {
                root: true
            })
            context.commit("entityGroups/setError", error.response.data, {
                root: true
            })
            if (error.response) {
                context.commit("entityGroups/setEntityGroupErrors", error.response, {
                    root: true
                })
            }
        }
    },

    updateEntityGroup: async (context, params) => {
        try {
            context.commit("entityGroups/setEntityGroupDataUpdateStatus", false, {
                root: true
            })
            context.commit("entityGroups/setEntityGroupErrors", {}, {
                root: true
            })
            await axios.patch('/entity-groups/' + params.id, params)
            context.commit("entityGroups/setEntityGroupDataUpdateStatus", true, {
                root: true
            })
            context.commit("entityGroups/setError", {}, {
                root: true
            })

        } catch (error) {
            context.commit("entityGroups/setEntityGroupDataUpdateStatus", false, {
                root: true
            })
            context.commit("entityGroups/setError", error.response.data, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("entityGroups/errorResponse", error.response, {
                    root: true
                })
                context.commit("entityGroups/setEntityGroupErrors", errors, {
                    root: true
                })
            }
        }
    },
    deleteEntityGroup: async (context, params) => {
        try {
            context.commit("entityGroups/setEntityGroupDataDeleteStatus", false, {
                root: true
            })
            context.commit("entityGroups/setEntitiesDataErrors", {}, {
                root: true
            })
            await axios.delete('/entity-groups/' + params.id, params)
            context.commit("entityGroups/setEntityGroupDataDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("entityGroups/setBenefitDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("entityGroups/errorResponse", error.response, {
                    root: true
                });
                context.commit("entityGroups/setEntitiesDataErrors", errors, {
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