import axios from '@/config/axios'

const initiateState = () => {
    return {
        workflowsData: [],
        eSignVerificationSentStatus: false,
        eSignVerifiedStatus: false,
        eSignVerificationData: {},
        eSignVerificationErrors: {},
        eSignVerifiedData: {},
        eSignData: {},
        userTemplatesData: {},
        userSignature: {}
    }
}
const state = initiateState()
const getters = {
    getWorkflowsData: state => state.workflowsData,
    getESignVerificationSentStatus: state => state.eSignVerificationSentStatus,
    getESignVerifiedStatus: state => state.eSignVerifiedStatus,
    getESignVerificationData: state => state.eSignVerificationData,
    getESignVerificationErrors: state => state.eSignVerificationErrors,
    getESignVerifiedData: state => state.eSignVerifiedData,
    getESignData: state => state.eSignData,
    getUserTemplatesData: state => state.userTemplatesData,
    getUserSignature: state => state.userSignature
}
const mutations = {
    setWorkflowsData(state, data) {
        state.workflowsData = data
    },
    setESignVerificationSentStatus(state, data) {
        state.eSignVerificationSentStatus = data
    },
    setESignVerificationData(state, data) {
        state.eSignVerificationData = data
    },

    setESignVerifiedStatus(state, data) {
        state.eSignVerifiedStatus = data
    },
    setESignVerificationErrors(state, data) {
        state.eSignVerificationErrors = data
    },
    setESignVerifiedData(state, data) {
        state.eSignVerifiedData = data
    },
    setESignData(state, data) {
        state.eSignData = data
    },

    setUserTemplatesData(state, data) {
        state.userTemplatesData = data
    },
    setUserSignature(state, data) {
        state.userSignature = data
    },
    reset: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },
}
const actions = {
    async fetchUserWorkflowData(context, params) {
        try {
            context.commit("employeeData/setWorkflowsData", {}, { root: true })
            const response = await axios.get("workflow-data/", { params })
            context.commit("employeeData/setWorkflowsData", response.data, { root: true })
        }
        catch (error) {
            context.commit("employeeData/setWorkflowsData", {}, { root: true })
        }
    },

    async sendESignVerification(context, params) {
        try {
            const response = await axios.post("/e-sign/send-verification", params);
            context.commit("employeeData/setESignVerificationData", response.data.data, { root: true })
            context.commit("employeeData/setESignVerificationSentStatus", true, { root: true })
        }
        catch (error) {
            context.commit("employeeData/setESignVerificationSentStatus", false, { root: true })
        }
    },
    async verifyESignVerificationCode(context, params) {
        try {
            context.commit("employeeData/setESignVerificationErrors", {}, { root: true })
            const response = await axios.post("e-sign/verify", params);
            context.commit("employeeData/setESignVerifiedStatus", true, { root: true })
            context.commit("employeeData/setESignVerifiedData", response.data.data, { root: true })
        }
        catch (error) {
            context.commit("employeeData/setESignVerifiedStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("employeeData/errorResponse", error.response, { root: true });
                context.commit("employeeData/setESignVerificationErrors", errors, { root: true })
            }
        }
    },
    verifyNonSecureSignature: async({commit, dispatch}, params) => {
        try {
            commit("setESignVerificationErrors", {})
            const response = await axios.post("/e-sign/no-secure-signature", params);
            commit("setESignVerifiedStatus", true)
            console.log(response.data)
            commit("setESignVerifiedData", response.data.data)
        }
        catch (error) {
            commit("setESignVerifiedStatus", false)
            if (error.response) {
                const errors = await dispatch("errorResponse", error.response);
                commit("setESignVerificationErrors", errors)
            }
        }
    },
    async fetchEmployeeTemplatesData(context, params) {
        try {
            context.commit("employeeData/setUserTemplatesData", [], { root: true })
            const response = await axios.get('templates-data', { params })
            context.commit("employeeData/setUserTemplatesData", response.data.data, { root: true })
        }
        catch (error) {
            context.commit("employeeData/setUserTemplatesData", [], { root: true })
        }
    },
    async fetchESignData(context, params) {
        try {
            const response = await axios.get("e-signs/" + params.id)
            context.commit("employeeData/setESignData", response.data.data, { root: true })
        }
        catch (error) {
            context.commit("employeeData/setESignData", {}, { root: true })
            context.commit("employeeData/setESignVerifiedStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("employeeData/errorResponse", error.response, { root: true });
                context.commit("employeeData/setESignVerificationErrors", errors, { root: true })
            }
        }
    },


    async fetchUserSignature(context) {
        try {
            const response = await axios.get("/signature")
            context.commit("employeeData/setUserSignature", response.data.data, { root: true })
        }
        catch (err) {
            context.commit("employeeData/setUserSignature", null, { root: true })
        }
    },

    errorResponse: async (context, errorResponse) => {
        let errorStatusCode = errorResponse.status;

        let errorData = [];

        switch (errorStatusCode) {
            case 422:
                var errors = errorResponse.data.errors;

                errors.details.forEach(detail => {
                    errorData[detail.key] = detail.message;
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
    }

}
export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
}