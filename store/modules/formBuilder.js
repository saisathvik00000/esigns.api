import axios from "@/config/axios";
const initiateState = () => {
    return {
        formBuilderAddStatus: false,
        formBuilderUpdateStatus: false,
        formBuilderDeleteStatus: false,
        formBuilderDeleteError: false,
        allFormBuildersData: [],
        formBuilderErrors: [],
        formBuilder: {},
        previewData: {},
        formBuilderPublicURLDetails: false,
        publicformBuilderDetails: {},
        publicformBuilderDataCount: 0,
        formBuilderRemindersUpdateStatus: false,
        formBuilderRemindersSettings: {},
        formBuilderRelatedEntities: [],
        formBuilderSharingSettingsUpdateStatus: false,
        formBuilderSharingSettingsData: {},
        formBuilderSendersFileUploadURLStatus: false,
        formBuilderSendersFileUploadURL: false,
        formBuilderSendersFileUploadStatus: false,
        formBuilderOTPSentStatus: false,
        formBuilderUserVerifyStatus: false,
        formBuilderUserVerifyError: {}
    }
}
const state = initiateState();
const getters = {
    getFormBuilderAddStatus: state => state.formBuilderAddStatus,
    getFormBuilderUpdateStatus: state => state.formBuilderUpdateStatus,
    getFormBuilderDeleteStatus: state => state.formBuilderDeleteStatus,
    getFormBuilderDeleteError: state => state.formBuilderDeleteError,
    getAllFormBuildersData: state => state.allFormBuildersData,
    getFormBuilderErrors: state => state.formBuilderErrors,
    getFormBuilder: state => state.formBuilder,
    getPreviewData: state => state.previewData,
    getFormBuilderPublicURLDetails: state => state.formBuilderPublicURLDetails,
    getPublicformBuilderDetails: state => state.publicformBuilderDetails,
    getPublicformBuilderDataCount: state => state.publicformBuilderDataCount,
    getFormBuilderRemindersUpdateStatus: state => state.formBuilderRemindersUpdateStatus,
    getFormBuilderRemindersSettings: state => state.formBuilderRemindersSettings,
    getFormBuilderRelatedEntities: state => state.formBuilderRelatedEntities,
    getFormBuilderSharingSettingsUpdateStatus: state => state.formBuilderSharingSettingsUpdateStatus,
    getFormBuilderSharingSettingsData: state => state.formBuilderSharingSettingsData,
    getFormBuilderSendersFileUploadURLStatus: state => state.formBuilderSendersFileUploadURLStatus,
    getFormBuilderSendersFileUploadURL: state => state.formBuilderSendersFileUploadURL,
    getFormBuilderSendersFileUploadStatus: state => state.formBuilderSendersFileUploadStatus,
    getFormBuilderOTPSentStatus: state => state.formBuilderOTPSentStatus,
    getFormBuilderUserVerifyStatus: state => state.formBuilderUserVerifyStatus,
    getFormBuilderUserVerifyError: state => state.formBuilderUserVerifyError
}
const mutations = {
    setFormBuilderAddStatus(state, data) {
        state.formBuilderAddStatus = data
    },
    setFormBuilderUpdateStatus(state, data) {
        state.formBuilderUpdateStatus = data
    },
    setFormBuilderDeleteStatus(state, data) {
        state.formBuilderDeleteStatus = data
    },
    setFormBuilderDeleteError(state, data) {
        state.formBuilderDeleteError = data
    },
    setAllFormBuildersData(state, data) {
        state.allFormBuildersData = data
    },
    setFormBuilderErrors(state, data) {
        state.formBuilderErrors = data
    },
    setFormBuilder(state, data) {
        state.formBuilder = data
    },
    setPreviewData(state, data) {
        state.previewData = data
    },
    setFormBuilderRemindersSettings(state, data) {
        state.formBuilderRemindersSettings = data
    },
    setFormBuilderPublicURLDetails(state, data) {
        state.formBuilderPublicURLDetails = data
    },
    setPublicformBuilderDetails(state, data) {
        state.publicformBuilderDetails = data
    },
    setpublicformBuilderDataCount(state, count) {
        state.publicformBuilderDataCount = count
    },
    setFormBuilderOTPSentStatus(state, status) {
        state.formBuilderOTPSentStatus = status
    },
    setFormBuilderUserVerifyStatus(state, data) {
        state.formBuilderUserVerifyStatus = data
    },
    setFormBuilderUserVerifyError(state, error) {
        state.formBuilderUserVerifyError = error
    }
}

const actions = {
    async clearErrors(context) {
        try {
            context.commit("formBuilders/setFormBuilderErrors", {}, { root: true })
        }
        catch (err) {
            console.log(err)
        }
    },
    async addFormBuilder(context, params) {
        try {
            context.commit("formBuilders/setFormBuilderAddStatus", false, { root: true })
            context.commit("formBuilders/setFormBuilderErrors",null, { root: true })
            await axios.post('formBuilders', params)
            context.commit("formBuilders/setFormBuilderAddStatus", true, { root: true })
        }
        catch (error) {
            context.commit("formBuilders/setFormBuilderAddStatus", false, { root: true })
            if(error.response){
                console.log("error.response",error.response)
                context.commit("formBuilders/setFormBuilderErrors", error.response.data, { root: true })
            }
        }
    },
    async fetchAllFormBuilders(context, params) {
        try{
            context.commit("formBuilders/setAllFormBuildersData", { data: [], total: 0, page: 0 }, { root: true });
            const response = await axios.get('formBuilders', {params});
            context.commit("formBuilders/setAllFormBuildersData", response.data, { root: true });
        }catch(error){
            if (error.response) {
                await context.dispatch("formBuilders/errorResponse", error.response, { root: true });
                context.commit("formBuilders/setAllFormBuildersData", { data: [], total: 0, page: 0 }, { root: true })
            }
        }
    },
    async fetchFormBuilder (context, params) {
        try {
            let id = params.id
            delete params.id
            const response = await axios.get(`formBuilders/${id}`, { params })
            // we will get pagination data so we are storing complete data 
            context.commit("formBuilders/setFormBuilder", response.data.data, { root: true })
        }
        catch (errors) {
            context.commit("formBuilders/setFormBuilder", {}, { root: true })
        }
    },
    async fetchFormBuilderRemindersSettings(context, params) {
        try {
            context.commit("formBuilders/setFormBuilderRemindersSettings", false, { root: true })
            let response = await axios.get(`/formBuilders/${params.id}/reminder-settings`)
            context.commit("formBuilders/setFormBuilderRemindersSettings", response.data.data, { root: true })
        }
        catch (error) {
            context.commit("formBuilders/setFormBuilderRemindersSettings", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formBuilders/errorResponse", error.response, { root: true });
                context.commit("formBuilders/setFormBuilderErrors", errors, { root: true })
            }
        }
    },
    async updateFormBuilder(context, params) {
        try {
            context.commit("formBuilders/setFormBuilderUpdateStatus", false, { root: true })
            await axios.put('formBuilders', params)
            context.commit("formBuilders/setFormBuilderUpdateStatus", true, { root: true })
        }
        catch (error) {
            context.commit("formBuilders/setFormBuilderUpdateStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formBuilders/errorResponse", error.response, { root: true });
                context.commit("formBuilders/setFormBuilderErrors", errors, { root: true })
            }
        }
    },
    fetchFormBuilderByCode: async (context, params) => {
        try {
            const response = await axios.get(`formBuilders/code/` + params.code, { params })

            context.commit("formBuilders/setFormBuilder", response.data.data, { root: true })
        }
        catch (errors) {
            context.commit("formBuilders/setFormBuilder", {}, { root: true })
        }
    },
    fetchWorkFlowPublicURL: async (context, params) => {
        try {
            const response = await axios.post(`formBuilders-url`, params)

            context.commit("formBuilders/setFormBuilderPublicURLDetails", response.data.data, { root: true })
        }
        catch (errors) {
            context.commit("formBuilders/setFormBuilderPublicURLDetails", {}, { root: true })
        }
    },
    fetchPublicWorkFlowById: async (context, params) => {
        try {
            context.commit("formBuilders/setPublicformBuilderDetails", {}, { root: true })
            let response = await axios.get(`formBuilders/${params.id}/public`,{params});
            let formBuilder = {};
            if(response.data && response.data.total_count){
                formBuilder = {...response.data.data, ...{total_submissions_count: response.data.total_count}}
            }else{
                formBuilder = {...response.data.data}
            }
            context.commit("formBuilders/setPublicformBuilderDetails", formBuilder, { root: true })
        }
        catch (errors) {
            context.commit("formBuilders/setPublicformBuilderDetails", {}, { root: true })
        }
    },
    sentFormBuilderOTPToContact: async (context, params) => {
        try {
            context.commit("formBuilders/setFormBuilderOTPSentStatus", false, {root: true});
            context.commit("formBuilders/setFormBuilderUserVerifyError", {}, {root: true});
            const response = await axios.post("formBuilders/sent-otp", params);
            if(response && !response.data.data.secure_access && response.data.data.passcode){
                let authData = {
                    user_id: response.data.data.contact,
                    passcode: response.data.data.passcode,
                    formbuilder_id: response.data.data.formbuilder_details_id
                };
                context.commit("auth/setAuthenticationDetails", authData, {
                    root: true
                });

                context.commit("auth/setAuthenticationStatus", true, {
                    root: true
                });
            }
            context.commit("formBuilders/setFormBuilderOTPSentStatus", true, {root: true});

        } catch(err) {
            console.log(err)
        }///formBuilders/verify
    },
    verifyFormbuilderUser: async (context, params) => {
        try {
            context.commit("formBuilders/setFormBuilderUserVerifyStatus", false, {root: true});
            context.commit("formBuilders/setFormBuilderUserVerifyError", {}, {root: true});
            const response = await axios.post("formBuilders/verify", params);
            context.commit("formBuilders/setFormBuilderUserVerifyStatus", true, {root: true});
            if (response.data.data.contact && response.data.data.passcode) {
                let authData = {
                    user_id: response.data.data.contact,
                    passcode: response.data.data.passcode,
                    formbuilder_id: response.data.data.formbuilder_details_id
                };
                context.commit("auth/setAuthenticationDetails", authData, {
                    root: true
                });

                context.commit("auth/setAuthenticationStatus", true, {
                    root: true
                });
            }
        } catch(error) {
            if (error.response) {
                context.commit("formBuilders/setFormBuilderUserVerifyError", error.response.data, {root: true});
            }
            console.log(error.response)
        }
    },
    deleteFormbuilder: async (context, id) => {
        try {
            context.commit("formBuilders/setFormBuilderDeleteStatus", false, {root: true});
            context.commit("formBuilders/setFormBuilderDeleteError", {}, {root: true});
            await axios.delete("formBuilders/"+id );
            context.commit("formBuilders/setFormBuilderDeleteStatus", true, {root: true});

        } catch(error) {
            if (error.response) {
                context.commit("formBuilders/setFormBuilderDeleteError", error.response.data, {root: true});
            }
            context.commit("formBuilders/setFormBuilderDeleteStatus", false, {root: true});
            console.log(error)
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
                    }
                    else {
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