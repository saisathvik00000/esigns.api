import axios from '../../config/axios'

const initiateState = () => {
    return {
        configurableDocumentAddStatus: false,
        configurableDocumentUpdateStatus: false,
        configurableDocumentData: [],
        configurableDocuments: {},
        configurableDocumentDataById: {},
        newConfigurableDocumentDataId: null,
        documentLoadingCount: 0,
        errorData: {},
        configurableDocumentStatusUpdateStatus: false,
        configurableDocumentExpirationSettigns: {},
        configurableDocumentPublishData: null,
        authenticateUserToFillDocumentStatus: false,
        authenticateUserToFillDocumentData: null,
        authenticateUserToFillDocumentErrors: null,
        documentUsers: null,
        documentUsersStatus: false,
        updateViewDataStatus: false,
        updateViewDataData: null,
        updateViewDataErrors: null
    }
}
const state = initiateState()
const getters = {
    getConfigurableDocumentAddStatus: state => state.configurableDocumentAddStatus,
    getConfigurableDocumentUpdateStatus: state => state.configurableDocumentUpdateStatus,
    getConfigurableDocumentData: state => state.configurableDocumentData,
    getConfigurableDocumentDataById: state => state.configurableDocumentDataById,
    getConfigurableDocumentErrors: state => state.errorData,
    getConfigurableDocuments: state => state.configurableDocuments,
    getNewConfigurableDocumentDataId: state => state.newConfigurableDocumentDataId,
    getDocumentLoadingCount: state => state.documentLoadingCount,
    getConfigurableDocumentStatusUpdateStatus: state => state.configurableDocumentStatusUpdateStatus,
    getConfigurableDocumentExpirationSettigns: state => state.configurableDocumentExpirationSettigns,
    getConfigurableDocumentPublishData: state => state.configurableDocumentPublishData,
    getAuthenticateUserToFillDocumentStatus: state => state.authenticateUserToFillDocumentStatus,
    getAuthenticateUserToFillDocumentData: state => state.authenticateUserToFillDocumentData,
    getAuthenticateUserToFillDocumentErrors: state => state.authenticateUserToFillDocumentErrors,
    getDocumentUsers: state => state.documentUsers,
    getDocumentUsersStatus: state => state.documentUsersStatus,
    getUpdateViewDataStatus: state => state.updateViewDataStatus,
    getUpdateViewDataData: state => state.updateViewDataData,
    getUpdateViewDataErrors: state => state.updateViewDataErrors
}
const mutations = {
    setConfigurableDocumentStatusUpdateStatus(state, data) {
        state.configurableDocumentStatusUpdateStatus = data
    },
    setConfigurableDocumentAddStatus(state, data) {
        state.configurableDocumentAddStatus = data
    },
    setConfigurableDocumentUpdateStatus(state, data) {
        state.configurableDocumentUpdateStatus = data
    },
    setConfigurableDocumentData(state, data) {
        state.configurableDocumentData = data
    },
    setConfigurableDocumentErrors(state, data) {
        state.errorData = data
    },
    setConfigurableDocumentDataById(state, data) {
        state.configurableDocumentDataById = data
    },
    setConfigurableDocuments(state, data) {
        state.configurableDocuments = data
    },

    setNewConfigurableDocumentDataId(state, data) {
        state.newConfigurableDocumentDataId = data
    },
    setDocumentLoadingCount(state, data) {
        state.documentLoadingCount = data
    },
    setConfigurableDocumentExpirationSettigns(state, data) {
        state.configurableDocumentExpirationSettigns = data
    },
    setConfigurableDocumentPublishData(state, data) {
        state.configurableDocumentPublishData = data
    },
    setAuthenticateUserToFillDocumentStatus(state, status) {
        state.authenticateUserToFillDocumentStatus = status
    },
    setAuthenticateUserToFillDocumentData(state, data) {
        state.authenticateUserToFillDocumentData = data
    },
    setAuthenticateUserToFillDocumentErrors(state, data) {
        state.authenticateUserToFillDocumentErrors = data
    },
    //ViewData update 
    setUpdateViewDataStatus(state, status) {
        state.updateViewDataStatus = status
    },
    setUpdateViewDataData(state, data) {
        state.updateViewDataData = data
    },
    setUpdateViewDataErrors(state, err) {
        state.updateViewDataErrors = err
    },
    setDocumentUsers(state, data) {
        state.documentUsers = data
    },
    setDocumentUsersStatus(state, status) {
        state.documentUsersStatus = status
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
        context.commit("configurableDocuments/resetData", null, {
            root: true
        });
    },

    saveCurrentDocumentFields: async (context, data) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentData", data, {
                root: true
            })
        } catch (error) {
            console.log(error)
        }
    },

    authenticateUserToFillDocument: async (context, params) => {
        try {
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentStatus', false, {
                root: true
            })
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentData', null, {
                root: true
            })
            context.commit("configurableDocuments/setAuthenticateUserToFillDocumentErrors", null, {
                root: true
            })
            const response = await axios.post(`document-templates/${params.configurable_document_id}/published`, params)
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentStatus', true, {
                root: true
            })
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentData', response.data.data, {
                root: true
            })
            if (!response.data.data.secure_access && response.data.data.user_details) {
                let userDetails = response.data.data.user_details;
                let authData = {
                    user_id: userDetails._id,
                    password: userDetails.password,
                    document_id: userDetails.document_id
                };
                context.commit("auth/setAuthenticatedUser", userDetails, {
                    root: true
                });

                context.commit("auth/setAuthenticationDetails", authData, {
                    root: true
                });

                context.commit("auth/setAuthenticationStatus", true, {
                    root: true
                });
            }
        } catch (error) {
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentStatus', false, {
                root: true
            })
            context.commit('configurableDocuments/setAuthenticateUserToFillDocumentData', null, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setAuthenticateUserToFillDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },

    checkConfigurableDocumentPublished: async (context, params) => {
        try {
            context.commit('configurableDocuments/setConfigurableDocumentPublishData', null, {
                root: true
            })
            context.commit("configurableDocuments/setAuthenticateUserToFillDocumentErrors", null, {
                root: true
            })
            const response = await axios.get(`document-templates/${params.configurable_document_id}/published`)
            context.commit('configurableDocuments/setConfigurableDocumentPublishData', response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit('configurableDocuments/setConfigurableDocumentPublishData', null)
        }
    },


    fetchConfigurableDocuments: async (context, params) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocuments", {
                data: []
            }, {
                root: true
            })
            const response = await axios.get('configurable-documents', {
                params
            })
            context.commit("configurableDocuments/setConfigurableDocuments", response.data, {
                root: true
            })

        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocuments", {
                data: []
            }, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },

    addConfigurableDocument: async (context, params) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentErrors", {}, {
                root: true
            })
            context.commit("configurableDocuments/setConfigurableDocumentAddStatus", false, {
                root: true
            })
            const response = await axios.post("configurable-documents", params)
            context.commit("configurableDocuments/setNewConfigurableDocumentDataId", response.data.data._id, {
                root: true
            })
            context.commit("configurableDocuments/setConfigurableDocumentAddStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocumentAddStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },
    updateViewData: async (context, params) => {
        try {
            context.commit('configurableDocuments/setUpdateViewDataStatus', false, {
                root: true
            })
            context.commit('configurableDocuments/setUpdateViewDataData', null, {
                root: true
            })
            context.commit("configurableDocuments/setUpdateViewDataErrors", null, {
                root: true
            })
            let response = await axios.put("configurable-documents/updateViewData/" + params.id, params);
            // const data = response.data.data
            context.commit('configurableDocuments/setUpdateViewDataData', response.data, {
                root: true
            });
            context.commit('configurableDocuments/setUpdateViewDataStatus', true, {
                root: true
            })
            //context.commit('configurableDocuments/setUpdateViewDataData', response.data.data, {root: true})
        } catch (err) {
            context.commit('configurableDocuments/setUpdateViewDataStatus', false, {
                root: true
            })
        }

    },
    updateConfigurableDocument: async (context, params) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentErrors", {}, {
                root: true
            })
            context.commit("configurableDocuments/setConfigurableDocumentUpdateStatus", false, {
                root: true
            })
            let docId = params.id;
            console.log(!docId)
            if (!docId) {
                let tempParams = JSON.parse(params.get("data"));
                docId = tempParams.id;
            }
            await axios.patch("configurable-documents/" + docId, params)
            context.commit("configurableDocuments/setConfigurableDocumentUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocumentUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },

    updateConfigurableTemplateStatus: async (context, params) => {
        try {

            context.commit("configurableDocuments/setConfigurableDocumentStatusUpdateStatus", false, {
                root: true
            })
            await axios.patch(`/configurable-documents/${params.id}/status`, params)
            context.commit("configurableDocuments/setConfigurableDocumentStatusUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocumentStatusUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },

    fetchConfigDocumentUsers: async (context, params) => {
        try {
            context.commit("configurableDocuments/setDocumentUsers", null, {
                root: true
            });
            context.commit("configurableDocuments/setDocumentUsersStatus", false, {
                root: true
            });
            const response = await axios.get("configurable-documents/users/" + params.id);
            context.commit("configurableDocuments/setDocumentUsers", response.data.data, {
                root: true
            });
            context.commit("configurableDocuments/setDocumentUsersStatus", true, {
                root: true
            });
        } catch (err) {
            context.commit("configurableDocuments/setDocumentUsers", null, {
                root: true
            });
            context.commit("configurableDocuments/setDocumentUsersStatus", false, {
                root: true
            });
            console.log(err)
        }
    },

    fetchConfigurableDocumentById: async (context, params) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentDataById", {}, {
                root: true
            })
            const response = await axios.get("configurable-documents/" + params.id, {
                id: params.id
            })

            context.commit("configurableDocuments/setConfigurableDocumentDataById", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocumentDataById", {}, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
                if (error.response.status === 404) {
                    params.confirmModel(error.response.data.message, "Warning", {
                        confirmButtonText: "Ok",
                    }).then(async () => {
                        params.router.push("/dashboard");
                    }).catch(async () => {
                        params.router.push("/dashboard");
                    })
                }
            }
        }
    },

    fetchConfigurableDocumentExpirationSettignsByID: async (context, params) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentExpirationSettigns", {}, {
                root: true
            })
            const response = await axios.get(`/configurable-documents/${params.id}/expiration-settings`)

            context.commit("configurableDocuments/setConfigurableDocumentExpirationSettigns", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("configurableDocuments/setConfigurableDocumentExpirationSettigns", {}, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
                    root: true
                });
                context.commit("configurableDocuments/setConfigurableDocumentErrors", errors, {
                    root: true
                })
            }
        }
    },

    updateDocumentLoadingCount: async (context, data) => {
        try {
            context.commit("configurableDocuments/setDocumentLoadingCount", data, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },
    clearErrors: async (context) => {
        try {
            context.commit("configurableDocuments/setConfigurableDocumentErrors", null, {
                root: true
            })
        } catch (error) {
            console.log()
        }
    },
    errorResponse: (context, errorResponse) => {
        let errorStatusCode = errorResponse.status;
        let errorData = {};
        switch (errorStatusCode) {
            case 422:
                var errors = errorResponse.data.errors;
                errors.details.forEach(detail => {
                    if (!errorData[detail.key]) {
                        errorData[detail.key] = detail.message;
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