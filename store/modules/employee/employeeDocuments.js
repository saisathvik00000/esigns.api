import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    employeeAllDocuments: [],
    employeeDocumentsRequests: [],
    employeeDocumentAddStatus: false,
    employeeDocumentUpdateStatus: false,
    documentStatusUpdated: false,
    errors: [],
    employeeDocumentDataById: false,
    documentUserSignatureStatus: false,
    authorizedRepresentativeSignatureStatus: false,
    documentUsersUpdateStatus: false,
    documentUsersUpdateError: null,
    newlyAddedUser: null,
    documentResendStatus: false,
    documentResendError: null,
    documentSignatureError: null,

    documentUploadData: null,
    documentUploadStatus: false,
    employeeDocumentDownloadUrl: "",
    employeeDocumentsCounts: [],
    employeeDocumentCompleteStatus: false,

    // approve
    documentApprovalStatus: false,
    documentApprovalErrors: null,

    // reject
    documentRejectStatus: false,
    documentRejectErrors: null,

    sendingEmployeeDocumentStatus: false,
    recentlySentEmployeeDocument: {},
    sendingEmployeeDocumentErrors: {},
    documentCompletedAfterApproval: false
  };
};

const state = initialState()
const getters = {
  getEmployeeAllDocuments: state => state.employeeAllDocuments,
  getEmployeeDocumentAddStatus: state => state.employeeDocumentAddStatus,
  getEmployeeDocumentUpdateStatus: state => state.employeeDocumentUpdateStatus,
  getAddCategoryStatus: state => state.addCategoryStatus,
  getEmployeeDocumentDataById: state => state.documentDataById,
  getDocumentStatusUpdated: state => state.documentStatusUpdated,

  getDocumentUserSignatureStatus: state => state.documentUserSignatureStatus,

  getDocumentSignatureError: state => state.documentSignatureError,

  getAuthorizedRepresentativeSignatureStatus: state => state.authorizedRepresentativeSignatureStatus,

  getDocumentUsersUpdateStatus: state => state.documentUsersUpdateStatus,
  getDocumentUsersUpdateError: state => state.documentUsersUpdateError,

  getDocumentResendStatus: state => state.documentResendStatus,
  getDocumentResendError: state => state.documentResendError,

  getEmployeeDocumentsRequests: state => state.employeeDocumentsRequests,

  getEmployeeDocumentDownloadUrl: state => state.employeeDocumentDownloadUrl,

  getEmployeeDocumentsCounts: state => state.employeeDocumentsCounts,
  getEmployeeDocumentCompleteStatus: state => state.employeeDocumentCompleteStatus,

  // for approve user document
  getDocumentApprovalStatus: state => state.documentApprovalStatus,
  getDocumentApprovalErrors: state => state.documentApprovalErrors,
  getDocumentCompletedAfterApproval: state => state.documentCompletedAfterApproval,

  // for reject user document
  getDocumentRejectStatus: state => state.documentRejectStatus,
  getErrors: state => state.documentRejectErrors,
  getDocumentRejectErrors: state => state.documentRejectErrors,

  getSendingEmployeeDocumentStatus: state => state.sendingEmployeeDocumentStatus,
  getSendingEmployeeDocumentErrors: state => state.sendingEmployeeDocumentErrors,
  getRecentlySentEmployeeDocument: state => state.recentlySentEmployeeDocument,
}

const mutations = {

  setEmployeeAllDocuments (state, documentsList) {
    state.employeeAllDocuments = documentsList
  },

  setRecentlySentEmployeeDocument (state, data) {

    state.recentlySentEmployeeDocument = data
  },

  setEmployeeDocumentsRequests (state, documentsList) {
    state.employeeDocumentsRequests = documentsList
  },


  setSendingEmployeeDocumentErrors (state, data) {
    state.sendingEmployeeDocumentErrors = data
  },

  setEmployeeDocumentAddStatus (state, status) {
    state.employeeDocumentAddStatus = status
  },
  setEmployeeDocumentUpdateStatus (state, status) {
    state.employeeDocumentUpdateStatus = status
  },
  setAddCategoryStatus (state, status) {
    state.addCategoryStatus = status
  },
  setErrors (state, errors) {
    state.errors = errors
  },
  setEmployeeDocumentDataById (state, data) {
    state.documentDataById = data
  },
  setDocumentStatusUpdated (state, data) {
    state.documentStatusUpdated = data
  },

  setDocumentUserSignatureStatus (state, data) {
    state.documentUserSignatureStatus = data
  },

  setDocumentSignatureError (state, data) {
    state.documentSignatureError = data
  },

  setAuthorizedRepresentativeSignatureStatus (state, data) {
    state.authorizedRepresentativeSignatureStatus = data
  },

  setDocumentUsersUpdateStatus (state, data) {
    state.documentUsersUpdateStatus = data
  },
  setDocumentUsersUpdateError (state, data) {
    state.documentUsersUpdateError = data
  },

  setDocumentResendStatus (state, data) {
    state.documentResendStatus = data
  },
  setDocumentResendError (state, data) {
    state.documentResendError = data
  },

  setEmployeeDocumentDownloadUrl (state, data) {
    state.employeeDocumentDownloadUrl = data
  },

  setEmployeeDocumentsCounts (state, data) {
    state.employeeDocumentsCounts = data
  },
  setEmployeeDocumentCompleteStatus (state, data) {
    state.employeeDocumentCompleteStatus = data
  },

  // for approve user document
  setDocumentApprovalStatus (state, status) {
    state.documentApprovalStatus = status
  },
  setDocumentApprovalErrors (state, data) {
    state.documentApprovalErrors = data
  },
  setDocumentCompletedAfterApproval(state, status){
    state.documentCompletedAfterApproval = status
  },

  // for reject user document
  setDocumentRejectStatus (state, status) {
    state.documentRejectStatus = status
  },
  setDocumentRejectErrors (state, data) {
    state.documentRejectErrors = data
  },
  setSendingEmployeeDocumentStatus (state, status) {
    state.sendingEmployeeDocumentStatus = status
  },
  reset: state => {
    const initial = initialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },
};

const actions = {
  clearErrors: async (context) => {
    context.commit("employeeDocuments/setErrors", {}, { root: true });
    context.commit("employeeDocuments/setDocumentUsersUpdateError", null, { root: true });
  },
  fetchEmployeeAllDocuments: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeAllDocuments", {}, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      let response = await axios.get("employee-documents", { params });
      context.commit("employeeDocuments/setEmployeeAllDocuments", response.data, { root: true });
    } catch (error) {
      if (error.response) {
        context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
      }
    }
  },

  fetchEmployeeDocumentsRequests: async (context, params) => {
    try {
      let response = await axios.get("employee-document-requests", { params });
      context.commit("employeeDocuments/setEmployeeDocumentsRequests", response.data, { root: true });
    } catch (error) {
      if (error.response) {
        context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
      }
    }
  },

  uploadEmployeeDocument: async (context, params) => {
    try {
      await axios.post("documents/" + params.id + "/upload-url", params)
    }
    catch (error) {
      if (error.response) {
        context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
      }
    }
  },

  fetchEmployeeDocumentById: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeDocumentDataById", {}, { root: true });
      const response = await axios.get('documents/' + params.id)
      context.commit("employeeDocuments/setEmployeeDocumentDataById", response.data.data, { root: true });
    }
    catch (error) {
      context.commit("employeeDocuments/setEmployeeDocumentDataById", {}, { root: true });
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
    }
  },

  downloadEmployeeDocumentById: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeDocumentDownloadUrl", {}, { root: true });
      const response = await axios.get('documents/' + params.id + "/download-document")
      console.log(response.data)
      context.commit("employeeDocuments/setEmployeeDocumentDownloadUrl", response.data.data, { root: true });
    }
    catch (error) {
      context.commit("employeeDocuments/setEmployeeDocumentDownloadUrl", {}, { root: true });
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
    }
  },


  addEmployeeDocument: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeDocumentAddStatus", false, { root: true });
      context.commit("employeeDocuments/setErrors", {}, { root: true });
      await axios.post("employee-documents", params);
      context.commit("employeeDocuments/setEmployeeDocumentAddStatus", true, { root: true })
    } catch (error) {
      context.commit("employeeDocuments/setEmployeeDocumentAddStatus", false, { root: true })
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
    }
  },
  updateEmployeeDocument: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeDocumentUpdateStatus", false, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      await axios.put("documents/" + params.id, params);
      context.commit("employeeDocuments/setEmployeeDocumentUpdateStatus", true, { root: true })
    } catch (error) {
      context.commit("employeeDocuments/setEmployeeDocumentUpdateStatus", false, { root: true })
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
    }
  },

  completeEmployeeDocument: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeDocumentCompleteStatus", false, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      await axios.post("documents/e-sign-completed/" + params.id, params);
      context.commit("employeeDocuments/setEmployeeDocumentCompleteStatus", true, { root: true })
    } catch (error) {
      context.commit("employeeDocuments/setEmployeeDocumentCompleteStatus", false, { root: true })
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
    }
  },

  updateDocumentSignature: async (context, params) => {
    try {
      context.commit("employeeDocuments/setDocumentUserSignatureStatus", false, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      await axios.post("documents/" + params.id + '/signature', params);
      context.commit("employeeDocuments/setDocumentUserSignatureStatus", true, { root: true })
    } catch (error) {
      context.commit("employeeDocuments/setDocumentUserSignatureStatus", false, { root: true })
      context.commit("employeeDocuments/setDocumentSignatureError", error.response.message, { root: true })
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
    }
  },
  updateAuthorizedRepresentativeSignature: async (context, params) => {
    try {
      context.commit("employeeDocuments/setAuthorizedRepresentativeSignatureStatus", false, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      await axios.post("documents/" + params.id + '/authorized-representative-signature', params);
      context.commit("employeeDocuments/setAuthorizedRepresentativeSignatureStatus", true, { root: true })
    } catch (error) {
      context.commit("employeeDocuments/setAuthorizedRepresentativeSignatureStatus", false, { root: true })
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
    }
  },
  updateEmployeeDocumentStatus: async (context, params) => {
    try {
      context.commit("employeeDocuments/setDocumentStatusUpdated", false, { root: true })
      await axios.patch('documents/' + params.id + '/status/' + params.status)
      context.commit("employeeDocuments/setDocumentStatusUpdated", true, { root: true })
    }
    catch (error) {
      context.commit("employeeDocuments/setDocumentStatusUpdated", false, { root: true })
    }
  },
  updateEmployeeDocumentUsers: async (context, params) => {
    try {
      context.commit("employeeDocuments/setDocumentUsersUpdateStatus", false, { root: true })
      context.commit("employeeDocuments/setDocumentUsersUpdateError", null, { root: true })
      context.commit("employeeDocuments/setErrors", {}, { root: true })
      await axios.post('documents/' + params.id + '/document-users', params)
      context.commit("employeeDocuments/setDocumentUsersUpdateStatus", true, { root: true })
    }
    catch (error) {
      context.commit("employeeDocuments/setDocumentUsersUpdateStatus", false, { root: true })
      if (error.response) {
        context.dispatch("employeeDocuments/errorResponse", error.response, { root: true })
        context.commit("employeeDocuments/setDocumentUsersUpdateError", error.response.message, { root: true })
      }
    }
  },

  resendEmployeeDocumentToUser: async (context, params) => {
    try {
      context.commit("employeeDocuments/setDocumentResendStatus", false, { root: true })
      context.commit("employeeDocuments/setDocumentResendError", null, { root: true })
      await axios.post('documents/' + params.id + '/document-users/resend-document', params)
      context.commit("employeeDocuments/setDocumentResendStatus", true, { root: true })
    }
    catch (error) {
      context.commit("employeeDocuments/setDocumentResendStatus", false, { root: true })
      if (error.response) {
        context.commit("employeeDocuments/setDocumentResendError", error.response.message, { root: true })
      }
    }
  },





  fetchSingleCategoryDocuments: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeAllDocuments", {}, { root: true });
      context.commit("employeeDocuments/setErrors", [], { root: true });
      let response = await axios.get("/documents/categories/" + params.id, { params });
      context.commit("employeeDocuments/setEmployeeAllDocuments", response.data, { root: true });
    } catch (error) {
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
    }
  },
  fetchSingleGroupDocuments: async (context, params) => {
    try {
      context.commit("employeeDocuments/setEmployeeAllDocuments", [], { root: true });
      let response = await axios.get("/documents/groups/" + params.id, { params });
      await context.commit("employeeDocuments/setEmployeeAllDocuments", response.data, { root: true });
    } catch (error) {
      context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
    }
  },

  downloadEmployeeDocumentFromURL: async (context, params) => {
    try {
      let response = await axios.post("/documents/" + params.id + "/download-pdf-document", params)
      let data = response.data.data

      window.open(data.Location, '_blank')
    }
    catch (error) {
      context.dispatch()
    }
  },

  fetchEmployeeDocumentsCounts: async (context) => {
    try {
      let response = await axios.get("/employee-documents-counts");
      context.commit("employeeDocuments/setEmployeeDocumentsCounts", response.data, { root: true });
    } catch (error) {
      if (error.response) {
        context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });
      }
    }
  },

  approveUserDocument: async (context, {document_id, params}) => {
    try {
      context.commit('employeeDocuments/setDocumentApprovalStatus', false, { root: true });
      context.commit('employeeDocuments/setDocumentApprovalErrors', null, { root: true });
      context.commit('employeeDocuments/setDocumentCompletedAfterApproval',false, {root: true});

      let response = await axios.post(`/documents/${document_id}/approved`, params);
      console.log(response.data)
      context.commit('employeeDocuments/setDocumentCompletedAfterApproval',response.data, {root: true});
      context.commit('employeeDocuments/setDocumentApprovalStatus', true, { root: true });
    } catch (error) {
      if (error.response) {
        let errorData = await context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });

        context.commit('employeeDocuments/setDocumentApprovalStatus', false, { root: true });
        context.commit('employeeDocuments/setDocumentApprovalErrors', errorData, { root: true })
      }
    }
  },

  rejectUserDocument: async (context, {document_id, data}) => {
    try {
      context.commit('employeeDocuments/setDocumentRejectStatus', false, { root: true });
      context.commit('employeeDocuments/setDocumentRejectErrors', null, { root: true })

      await axios.post(`/documents/${document_id}/reject`, data);

      context.commit('employeeDocuments/setDocumentRejectStatus', true, { root: true });
    } catch (error) {
      if (error.response) {
        let errorData = await context.dispatch("employeeDocuments/errorResponse", error.response, { root: true });

        context.commit('employeeDocuments/setDocumentRejectStatus', false, { root: true });
        context.commit('employeeDocuments/setDocumentRejectErrors', errorData, { root: true })
      }
    }
  },

  sendingEmployeeDocumentToUsers: async (context, params) => {
    try {
      context.commit('employeeDocuments/setSendingEmployeeDocumentStatus', false, { root: true })
      const response = await axios.post("/company-documents/documents/send", params);
      context.commit('employeeDocuments/setSendingEmployeeDocumentStatus', true, { root: true })
      context.commit('employeeDocuments/setRecentlySentEmployeeDocument', response.data.data, { root: true })
    } catch (err) {
      if (err.response) {
        context.dispatch("employeeDocuments/errorResponse", err.response, { root: true });
      }
    }
  },
  errorResponse: async (context, errorResponse) => {
    let errorData = {};
    if (errorResponse.status) {
      let errorStatusCode = errorResponse.status;
      switch (errorStatusCode) {
        case 422:

          var errors = errorResponse.data.errors;
          errors.details.forEach(detail => {
            if (!errorData[detail.key]) {
              if (detail.key == 'document_users') {
                errorData[detail.path] = detail.message;
              }
              else {
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
    }
    else {
      errorData["critical_error"] = "Something went wrong"
    }


    context.commit("employeeDocuments/setErrors", errorData, { root: true });

    return errorData;

  },



};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
