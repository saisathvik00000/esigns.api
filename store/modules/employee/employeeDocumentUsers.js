import axios from "@/config/axios";

const initiateState = () => {
    return {
        documentUsers: [],
        documentUserAcceptStatus: false,
        documentUserRejectStatus: false,
        documentUserDeleteError: null,
        documentUserRemainderStatus: false,
        documentUserResendError: null,
        userDocumentResendStatus: false,
        documentUserErrors: {},
        documentUserLogs:[]
    }
}
const state = initiateState()
const getters = {
    getDocumentUsers: state => state.documentUsers,
    getDocumentUserAcceptStatus: state => state.documentUserAcceptStatus,
    getDocumentUserRejectStatus: state => state.documentUserRejectStatus,
    getDocumentUserRemainderStatus: state => state.documentUserRemainderStatus,
    getDocumentUserResendError: state => state.documentUserResendError,
    getUserDocumentResendStatus: state => state.userDocumentResendStatus,
    getDocumentUserDeleteError: state => state.documentUserDeleteError,
    getDocumentUserErrors: state => state.documentUserErrors,
    getDocumentUserLogs: state => state.documentUserLogs


}
const mutations = {
    setDocumentUsers(state, data) {
        state.documentUsers = data
    },
    setDocumentUserAcceptStatus(state, data) {
        state.documentUserAcceptStatus = data
    },
    setDocumentUserRejectStatus(state, data) {
        state.documentUserRejectStatus = data
    },
    setDocumentUserDeleteError(state, data) {
        state.documentUserDeleteError = data
    },
    setDocumentUserRemainderStatus(state, data) {
        state.documentUserRemainderStatus = data
    },
    setDocumentUserResendError(state, data) {
        state.documentUserResendError = data
    },

    setDocumentUserErrors(state, data) {
        state.documentUserErrors = data
    },
    setDocumentUserLogs(state,data){
        state.documentUserLogs = data
    },
    setUserDocumentResendStatus(state, status) {
        state.userDocumentResendStatus = status
    },
    reset: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },
}
const actions = {
    async fetchDocumentUsers(context, params) {
        try {
            const response = await axios.get('/employee-documents/' + params.employee_document_id + '/users', { params })
            context.commit("employeeDocumentUsers/setDocumentUsers", response.data, { root: true })
        }
        catch (err) {
            //context.commit("employeeDocumentUsers/setDocumentUsers", [], { root: true })
        }
    },

    async acceptUserDocument(context, params) {
      try {
          const response = await axios.post('/employee-documents/' + params.employee_document_id + '/users/'+params.user_id+'/accept')
          context.commit("employeeDocumentUsers/setDocumentUserAcceptStatus", response.data, { root: true })
      }
      catch (err) {
          context.commit("employeeDocumentUsers/setDocumentUserAcceptStatus", false, { root: true })
      }
    },

    async rejectUserDocument(context, params) {
      try {
          const response = await axios.post('/employee-documents/' + params.employee_document_id + '/users/'+params.user_id+'/reject')
          context.commit("employeeDocumentUsers/setDocumentUserRejectStatus", response.data, { root: true })
      }
      catch (err) {
          context.commit("employeeDocumentUsers/setDocumentUserRejectStatus", false, { root: true })
      }
    },

    async sendRemainderToUser(context, params) {
      try {
          const response = await axios.get('/employee-documents/' + params.employee_document_id + '/users/'+params.user_id+'/send-reminder', { params })
          context.commit("employeeDocumentUsers/setDocumentUserRemainderStatus", response.data, { root: true })
      }
      catch (err) {
          context.commit("employeeDocumentUsers/setDocumentUserRemainderStatus", false, { root: true })
      }
    },

    async fetchUserDocumentsLogs( context, params ){
        try{
            const response = await axios.get('/employee-documents/'+ params.employee_document_id +'/users/logs')
            context.commit("employeeDocumentUsers/setDocumentUserLogs", response.data , {root: true})
        }
        catch(err){
            context.commit("employeeDocumentUsers/setDocumentUserLogs", [], {root: true});
        }
    },

    async resendUserDocument(context, params) {
        try {
            context.commit("employeeDocumentUsers/setUserDocumentResendStatus", false, { root: true })
            let employee_document_id = params.employee_document_id;
            delete params.employee_document_id;
            await axios.post('/employee-documents/' + employee_document_id + '/document-users/resend-document', params)
            context.commit("employeeDocumentUsers/setUserDocumentResendStatus", true, { root: true })
        } catch (err) {
            context.commit("employeeDocumentUsers/setUserDocumentResendStatus", false, { root: true })
        }
    },

    clearErrors(context) {
        context.commit("employeeDocumentUsers/setDocumentUserDeleteError", "", { root: true })
        context.commit("employeeDocumentUsers/setDocumentUserResendError", "", { root: true })
        context.commit("employeeDocumentUsers/setDocumentUserErrors", {}, { root: true })
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