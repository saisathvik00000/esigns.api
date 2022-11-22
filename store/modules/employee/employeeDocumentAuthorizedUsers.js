import axios from "@/config/axios";


const initiateState = () => {
    return {
        authorizedUsers: [],
        authorizedUserAddStatus: false,
        authorizedUserDeleteStatus: false,
        authorizedUserDeleteError: null,
        authorizedUserResendStatus: false,
        authorizedUserResendError: null,
        authorizedUserErrors: {}
    }
}
const state = initiateState()
const getters = {
    getAuthorizedUsers: state => state.authorizedUsers,
    getAuthorizedUserAddStatus: state => state.authorizedUserAddStatus,
    getAuthorizedUserDeleteStatus: state => state.authorizedUserDeleteStatus,
    getAuthorizedUserResendStatus: state => state.authorizedUserResendStatus,
    getAuthorizedUserResendError: state => state.authorizedUserResendError,
    getAuthorizedUserDeleteError: state => state.authorizedUserDeleteError,
    getAuthorizedUserErrors: state => state.authorizedUserErrors,


}
const mutations = {
    setAuthorizedUsers(state, data) {
        state.authorizedUsers = data
    },
    setAuthorizedUserAddStatus(state, data) {
        state.authorizedUserAddStatus = data
    },
    setAuthorizedUserDeleteStatus(state, data) {
        state.authorizedUserDeleteStatus = data
    },
    setAuthorizedUserDeleteError(state, data) {
        state.authorizedUserDeleteError = data
    },
    setAuthorizedUserResendStatus(state, data) {
        state.authorizedUserResendStatus = data
    },
    setAuthorizedUserResendError(state, data) {
        state.authorizedUserResendError = data
    },

    setAuthorizedUserErrors(state, data) {
        state.authorizedUserErrors = data
    },
    reset: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },
}
const actions = {
    async fetchAuthorizedUsers(context, params) {
        try {
            const response = await axios.get('/employee-documents/' + params.employee_document_id + '/authorized-users', { params })
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUsers", response.data, { root: true })
        }
        catch (err) {

            //context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUsers", [], { root: true })
        }
    },

    clearErrors(context) {
        context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserDeleteError", "", { root: true })
        context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserResendError", "", { root: true })
        context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserErrors", {}, { root: true })
    },

    async addAuthorizedUser(context, params) {
        try {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserAddStatus", false, { root: true })
            await axios.post('/employee-documents/' + params.employee_document_id + '/authorized-users', params)
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserAddStatus", true, { root: true })
        }
        catch (err) {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserAddStatus", false, { root: true })
            if (err.response) {
                const errors = await context.dispatch("employeeDocumentAuthorizedUsers/errorResponse", err.response, { root: true });
                context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserErrors", errors, { root: true })
            }
        }
    },

    async deleteAuthorizedUser(context, params) {
        try {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserDeleteStatus", false, { root: true })
            await axios.delete('/employee-documents/' + params.employee_document_id + '/authorized-users/' + params.authorized_user_id)
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserDeleteStatus", true, { root: true })
        }
        catch (err) {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserDeleteStatus", false, { root: true })
            if (err.response) {
                context.commit("employeeDocumentAuthorizedUsers/setAuthorizedUserDeleteError", err.response.message, { root: true })
            }
        }
    },



    async resendAuthorizedUser(context, params) {
        try {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedResendStatus", false, { root: true })
            await axios.post('/employee-documents/' + params.employee_document_id + '/authorized-users/' + params.authorized_user_id + '/resend')
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedResendStatus", true, { root: true })
        }
        catch (err) {
            context.commit("employeeDocumentAuthorizedUsers/setAuthorizedResendStatus", false, { root: true })
            if (err.response) {
                context.commit("employeeDocumentAuthorizedUsers/setAuthorizedDeleteError", err.response.message, { root: true })
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