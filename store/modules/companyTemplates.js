import axios from "@/config/axios";
const initiateState = () => {
    return {
        allCompanyTemplatesData: {},
        allCompanyDefaultTemplates: [],
        templateAddStatus: false,
        templateUpdateStatus: false,
        templateUpdateData: {},
        templateDeleteStatus: false,
        templateDeleteError: "",
        templateErrors: {},
        singleCompanyTemplate: {},
        singleDefaultTemplate: {},
        primaryTemplateForUser: null,
        imageUploadData: {}
    }
}
const state = initiateState()
const getters = {
    getAllCompanyTemplatesData: state => state.allCompanyTemplatesData,
    getTemplateAddStatus: state => state.templateAddStatus,
    getTemplateUpdateStatus: state => state.templateUpdateStatus,
    getTemplateDeleteStatus: state => state.templateDeleteStatus,
    getTemplateDeleteError: state => state.templateDeleteError,
    getTemplateErrors: state => state.templateErrors,
    getTemplateUpdateData: state => state.templateUpdateData,
    getAllCompanyDefaultTemplates: state => state.allCompanyDefaultTemplates,
    getSingleCompanyTemplate: state => state.singleCompanyTemplate,
    getSingleDefaultTemplate: state => state.singleDefaultTemplate,
    getPrimaryTemplateForUserType: state => state.primaryTemplateForUser,
    getImageUploadData: state => state.imageUploadData
}
const mutations = {
    setAllCompanyTemplatesData(state, data) {
        state.allCompanyTemplatesData = data
    },
    setTemplateAddStatus(state, data) {
        state.templateAddStatus = data
    },
    setTemplateUpdateStatus(state, data) {
        state.templateUpdateStatus = data
    },

    setTemplateUpdateData(state, data) {
        state.templateUpdateData = data
    },
    setTemplateDeleteStatus(state, data) {
        state.templateDeleteStatus = data
    },
    setTemplateDeleteError(state, data) {
        state.templateDeleteError = data
    },
    setTemplateErrors(state, data) {
        state.templateErrors = data
    },
    setAllCompanyDefaultTemplates(state, data) {
        state.allCompanyDefaultTemplates = data
    },
    setSingleCompanyTemplatesData(state, data) {
        state.singleCompanyTemplate = data
    },
    setSingleDefaultTemplatesData(state, data) {
        state.singleDefaultTemplate = data
    },

    setPrimaryTemplateForUserType(state, data) {
        state.primaryTemplateForUser = data
    },

    setImageUploadData(state, data) {
        state.imageUploadData = data
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
        context.commit("companyTemplates/resetData", null, {
            root: true
        });
    },
    async getAllCompanyTemplates(context, params = {}) {
        try {
            context.commit("companyTemplates/setAllCompanyTemplatesData", {
                data: []
            }, {
                root: true
            })
            let response = await axios.get('template/list', {
                params
            })
            context.commit("companyTemplates/setAllCompanyTemplatesData", response.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setAllCompanyTemplatesData", {
                data: []
            }, {
                root: true
            })
        }
    },

    async fetchSingleCompanyTemplate(context, templateId) {
        try {
            context.commit("companyTemplates/setSingleCompanyTemplatesData", {
                data: {}
            }, {
                root: true
            })
            let response = await axios.get(`template/${templateId}`)
            context.commit("companyTemplates/setSingleCompanyTemplatesData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setSingleCompanyTemplatesData", {
                data: {}
            }, {
                root: true
            })
        }
    },
    async fetchSingleCompanyTemplateByCode(context, templateCode) {
        try {
            context.commit("companyTemplates/setSingleCompanyTemplatesData", {
                data: {}
            }, {
                root: true
            })
            let response = await axios.get(`templates/code/${templateCode}`)
            context.commit("companyTemplates/setSingleCompanyTemplatesData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setSingleCompanyTemplatesData", {
                data: {}
            }, {
                root: true
            })
        }
    },
    async fetchPrimaryTemplateForUserType(context, params) {
        try {
            context.commit("companyTemplates/setPrimaryTemplateForUserType", {
                data: {}
            }, {
                root: true
            })
            let response = await axios.get(`templates/primary-template/${params.user_type}`)
            context.commit("companyTemplates/setPrimaryTemplateForUserType", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setPrimaryTemplateForUserType", {
                data: {}
            }, {
                root: true
            })
        }
    },

    async fetchSingleDefaultTemplate(context, templateId) {
        try {
            context.commit("companyTemplates/setSingleDefaultTemplatesData", {
                data: {}
            }, {
                root: true
            })
            let response = await axios.get(`default-templates/${templateId}`)
            context.commit("companyTemplates/setSingleDefaultTemplatesData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setSingleDefaultTemplatesData", {
                data: {}
            }, {
                root: true
            })
        }
    },

    async fetchAllCompanyDefaultTemplates(context) {
        try {
            context.commit("companyTemplates/setAllCompanyDefaultTemplates", [], {
                root: true
            })
            let response = await axios.get('default-templates')
            context.commit("companyTemplates/setAllCompanyDefaultTemplates", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setAllCompanyDefaultTemplates", [], {
                root: true
            })
        }
    },

    async addCompanyTemplates(context, params) {
        try {
            context.commit("companyTemplates/setTemplateAddStatus", false, {
                root: true
            })
            await axios.post('template/create', params)
            context.commit("companyTemplates/setTemplateAddStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setTemplateAddStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("companyTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("companyTemplates/setTemplateErrors", errors, {
                    root: true
                })
            }
        }
    },
    async updateCompanyTemplate(context, params) {
        try {
            context.commit("companyTemplates/setTemplateUpdateStatus", false, {
                root: true
            })
            let response = await axios.put('template', params)
            context.commit("companyTemplates/setTemplateUpdateStatus", true, {
                root: true
            })

            context.commit("companyTemplates/setTemplateUpdateData", response.data.data, {
                root: true
            })

        } catch (error) {
            context.commit("companyTemplates/setTemplateUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("companyTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("companyTemplates/setTemplateErrors", errors, {
                    root: true
                })
            }
        }
    },
    async deleteCompanyTemplate(context, params) {
        try {
            context.commit("companyTemplates/setTemplateDeleteStatus", false, {
                root: true
            })
            await axios.delete('template/' + params.id)
            context.commit("companyTemplates/setTemplateDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setTemplateDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("companyTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("companyTemplates/setTemplateErrors", errors, {
                    root: true
                })
                context.commit("companyTemplates/setTemplateDeleteError", errors.critical_error, {
                    root: true
                })
            }
        }
    },
    async uploadImage(context, params) {
        try {
            context.commit("companyTemplates/setImageUploadData", {}, {
                root: true
            })
            let response = await axios.post('document-assets/', params, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            context.commit("companyTemplates/setImageUploadData", response.data, {
                root: true
            })
        } catch (error) {
            context.commit("companyTemplates/setImageUploadData", {}, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("companyTemplates/errorResponse", error.response, {
                    root: true
                });
                context.commit("companyTemplates/setTemplateErrors", errors, {
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