import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    sendCompletedDocumentStatus: false,
    allDocumnets: null,
    userDocuments: null,
    allTemplates: null,
    fileUploadURL: null,
    fileUploadRefId: null,
    documentUploadStatusUpdated: false,
    companyDocumentAddStatus: false,
    newCompanyDocument: {},

    documentLogs: [],
    createConfigureDocumentData: null,

    draftDocumentCreateStatus: false,
    draftDocumentCreateData: null,
    draftDocumentCreateErrors: null,

    singleDocumentData: null,
    singleDocumentErrors: null,

    draftDocumentUpdateStatus: false,
    draftDocumentUpdateData: null,
    draftDocumentUpdateErrors: null,

    companyDocumentStatus: false,
    companyDocumentData: null,
    companyDocumentStatusErrors: null,

    documentTemplateDeleteStatus: false,
    documentTemplatePermanentDeleteStatus: false,

    documentSendErrors: null,
    documentSendStatus: false,

    singleDocumentUpdateStatus: false,
    singleDocumentUpdateErrors: null,

    resendDocumentStatus: false,
    renameDocumentStatus: false,
    duplicateDocumentStatus: false,
    archiveDocumentStatus: false,
    archiveDocumentUndoStatus: false,
    duplicateDocumentErrors: null,

    documentSettings: null,
    documentSettingsUpdateStatus: null,

    documentVoidStatus: false,
    documentDeclineStatus: false,
    documentCompletedStatus: false,
    documnetSentDocumnet: null,
    documentSaveAsTemplate: false,
    documentSaveAsTemplateData: null,
    singleDocumentCompletedStatus: false,
    documentCorrectStatus: false,
    documentCorrectErrors: null,
    cloneVoidDocStatus: false,
    cloneVoidDocErrors: null,
    cloneVoidDocData: null,
    documentPreviewData: null,
    documentUserTermsUpdate: false,
    updateDocumentUsersStatus: false,
    updateDocumentUsersErrors: null,
    createBulkContactsStatus: false,
    documentsCountByTemplatId: null,
    documentsDataByConfigurableId: null,
    employeeDocumentUsers: null,
    documentUsersStatus: false,
    uploadedFileUpdateStatus: false,
    addWorkflowContactStatus: false,
    discardDocumentStatus: false,
    discardDocumentErrors: null,
    discardDocumentData: null,
    employeeDocumentsByConfigurableIdData: null,
    employeeDocumentsByConfigurableIdStatus: false,
    ChangeOwnershipOfTemplateData: null,
    ChangeOwnershipOfTemplatestatus: false,
    documentFormFieldsData: {},
  };
};

const state = initialState();

const getters = {
  getSendCompletedDocumentStatus: (state) => state.sendCompletedDocumentStatus,
  getAllDocuments: (state) => state.allDocumnets,
  getUserDocuments: (state) => state.userDocuments,
  getAllTemplates: (state) => state.allTemplates,
  getFileUploadURL: (state) => state.fileUploadURL,
  getFileUploadRefId: (state) => state.fileUploadRefId,
  getDocumentUploadStatusUpdated: (state) => state.documentUploadStatusUpdated,
  getCompanyDocumentAddStatus: (state) => state.companyDocumentAddStatus,
  getNewCompanyDocument: (state) => state.newCompanyDocument,
  getDocumentSaveAsTemplate: (state) => state.documentSaveAsTemplate,
  getDocumentSaveAsTemplateData: (state) => state.documentSaveAsTemplateData,
  getDocumentLogs: (state) => state.documentLogs,
  getCreateConfigureDocumentData: (state) => state.createConfigureDocumentData,
  getDocumnetSentDocumnet: (state) => state.documnetSentDocumnet,
  getDraftDocumentCreateStatus: (state) => state.draftDocumentCreateStatus,
  getDraftDocumentCreateData: (state) => state.draftDocumentCreateData,
  getDraftDocumentCreateErrors: (state) => state.draftDocumentCreateErrors,

  getSingleDocumentData: (state) => state.singleDocumentData,
  getSingleDocumentErrors: (state) => state.singleDocumentErrors,

  getCompanyDocumentStatus: (state) => state.companyDocumentStatus,
  getCompanyDocumentData: (state) => state.companyDocumentData,
  getCompanyDocumentErrors: (state) => state.companyDocumentErrors,
  getDraftDocumentUpdateStatus: (state) => state.draftDocumentUpdateStatus,
  getDraftDocumentUpdateErrors: (state) => state.draftDocumentUpdateErrors,

  getDocumentTemplateDeleteStatus: (state) =>
    state.documentTemplateDeleteStatus,
  getDocumentTemplatePermanentDeleteStatus: (state) =>
    state.documentTemplatePermanentDeleteStatus,

  getDocumentSendErrors: (state) => state.documentSendErrors,
  getDocumentSendStatus: (state) => state.documentSendStatus,

  getSingleDocumentUpdateStatus: (state) => state.singleDocumentUpdateStatus,
  getSingleDocumentUpdateErrors: (state) => state.singleDocumentUpdateErrors,

  getResendDocumentStatus: (state) => state.resendDocumentStatus,
  getRenameDocumentStatus: (state) => state.renameDocumentStatus,
  getDuplicateDocumentStatus: (state) => state.duplicateDocumentStatus,
  getArchiveDocumentStatus: (state) => state.archiveDocumentStatus,
  getDuplicateDocumentErrors: (state) => state.duplicateDocumentErrors,
  getDocumentSettings: (state) => state.documentSettings,
  getDocumentSettingsUpdateStatus: (state) =>
    state.documentSettingsUpdateStatus,

  getDocumentVoidStatus: (state) => state.documentVoidStatus,
  getDocumentDeclineStatus: (state) => state.documentDeclineStatus,
  getDocumentCompletedStatus: (state) => state.documentCompletedStatus,
  getSingleDocumentCompletedStatus: (state) =>
    state.singleDocumentCompletedStatus,
  getDocumentCorrectStatus: (state) => state.documentCorrectStatus,
  getDocumentCorrectErrors: (state) => state.documentCorrectErrors,
  //cloning of void document
  getCloneVoidDocStatus: (state) => state.cloneVoidDocStatus,
  getCloneVoidDocErrors: (state) => state.cloneVoidDocErrors,
  getCloneVoidDocData: (state) => state.cloneVoidDocData,
  getDocumentPreviewData: (state) => state.documentPreviewData,
  getDocumentUserTermsUpdate: (state) => state.documentUserTermsUpdate,
  getUpdateDocumentUsersStatus: (state) => state.updateDocumentUsersStatus,
  getUpdateDocumentUsersErrors: (state) => state.updateDocumentUsersErrors,
  getCreateBulkContactsStatus: (state) => state.createBulkContactsStatus,
  getDocumentsCountByTemplatId: (state) => state.documentsCountByTemplatId,
  getDocumentsDataByConfigurableId: (state) =>
    state.documentsDataByConfigurableId,
  getEmployeeDocumentUsers: (state) => state.employeeDocumentUsers,
  getDocumentUsersStatus: (state) => state.documentUsersStatus,
  getUploadedFileUpdateStatus: (state) => state.uploadedFileUpdateStatus,
  getAddWorkflowContactStatus: (state) => state.addWorkflowContactStatus,
  getDiscardDocumentStatus: (state) => state.discardDocumentStatus,
  getDiscardDocumentData: (state) => state.discardDocumentData,
  getDiscardDocumentErrors: (state) => state.discardDocumentErrors,
  getEmployeeDocumentsByConfigurableIdData: (state) =>
    state.employeeDocumentsByConfigurableIdData,
  getEmployeeDocumentsByConfigurableIdStatus: (state) =>
    state.employeeDocumentsByConfigurableIdStatus,
  getAllCompanyUsers: (state) => state.allCompanyUsers,
  getChangeOwnershipOfTemplateData: (state) =>
    state.changeOwnershipOfTemplateData,
  getChangeOwnershipOfTemplatestatus: (state) =>
    state.changeOwnershipOfTemplatestatus,
  getDocumentFormFieldsData: (state) => state.documentFormFieldsData,
};

const mutations = {
  setSendCompletedDocumentStatus(state, status) {
    state.sendCompletedDocumentStatus = status;
  },
  setDiscardDocumentStatus(state, status) {
    state.discardDocumentStatus = status;
  },
  setDiscardDocumentErrors(state, err) {
    state.discardDocumentErrors = err;
  },
  setUpdateDocumentUsersStatus: (state, status) => {
    state.updateDocumentUsersStatus = status;
  },
  setUpdateDocumentUsersErrors: (state, error) => {
    state.updateDocumentUsersErrors = error;
  },
  setAllDocuments: (state, data) => {
    state.allDocumnets = data;
  },
  setAllTemplates: (state, data) => {
    state.allTemplates = data;
  },
  setDocumentSaveAsTemplate: (state, status) => {
    state.documentSaveAsTemplate = status;
  },
  setDocumentSaveAsTemplateData: (state, data) => {
    state.documentSaveAsTemplateData = data;
  },
  setFileUploadURL: (state, URL) => {
    state.fileUploadURL = URL;
  },
  setFileUploadRefId: (state, refId) => {
    state.fileUploadRefId = refId;
  },
  setDocumentUploadStatusUpdated: (state, status) => {
    state.documentUploadStatusUpdated = status;
  },
  setCompanyDocumentAddStatus(state, status) {
    state.companyDocumentAddStatus = status;
  },
  setNewCompanyDocument(state, data) {
    state.newCompanyDocument = data;
  },

  setDocumentLogs(state, data) {
    state.documentLogs = data;
  },
  setUserDocuments(state, data) {
    state.userDocuments = data;
  },
  setCreateConfigureDocumentData(state, data) {
    state.createConfigureDocumentData = data;
  },

  setDraftDocumentCreateStatus(state, status) {
    state.draftDocumentCreateStatus = status;
  },
  setDraftDocumentCreateData(state, data) {
    state.draftDocumentCreateData = data;
  },
  setDraftDocumentCreateErrors(state, errors) {
    state.draftDocumentCreateErrors = errors;
  },

  setSingleDocumentData(state, data) {
    state.singleDocumentData = data;
  },
  setSingleDocumentErrors(state, errors) {
    state.singleDocumentErrors = errors;
  },
  setDraftDocumentUpdateStatus(state, status) {
    state.draftDocumentUpdateStatus = status;
  },
  setDraftDocumentUpdateData(state, data) {
    state.draftDocumentUpdateData = data;
  },
  setDraftDocumentUpdateErrors(state, errors) {
    state.draftDocumentUpdateErrors = errors;
  },
  setCompanyDocumentStatus(state, status) {
    state.companyDocumentStatus = status;
  },
  setCompanyDocumentData(state, data) {
    state.companyDocumentData = data;
  },
  setCompanyDocumentErrors(state, errors) {
    state.companyDocumentErrors = errors;
  },

  setDocumentTemplateDeleteStatus(state, status) {
    state.documentTemplateDeleteStatus = status;
  },

  setDocumentTemplatePermanentDeleteStatus(state, status) {
    state.documentTemplatePermanentDeleteStatus = status;
  },

  setDocumentSendErrors(state, errors) {
    state.documentSendErrors = errors;
  },
  setDocumentSendStatus(state, status) {
    state.documentSendStatus = status;
  },
  setDocumnetSentDocumnet(state, data) {
    state.documnetSentDocumnet = data;
  },
  setSingleDocumentUpdateStatus(state, status) {
    state.singleDocumentUpdateStatus = status;
  },
  setSingleDocumentCompletedStatus(state, status) {
    state.singleDocumentCompletedStatus = status;
  },
  setSingleDocumentUpdateErrors(state, errors) {
    state.singleDocumentUpdateErrors = errors;
  },
  setResendDocumentStatus(state, status) {
    state.resendDocumentStatus = status;
  },
  setRenameDocumentStatus(state, status) {
    state.renameDocumentStatus = status;
  },
  setDuplicateDocumentStatus(state, status) {
    state.duplicateDocumentStatus = status;
  },
  setDuplicateDocumentErrors(state, errors) {
    state.duplicateDocumentErrors = errors;
  },
  setArchiveDocumentStatus(state, status) {
    state.archiveDocumentStatus = status;
  },
  setDocumentSettings(state, settings) {
    state.documentSettings = settings;
  },
  setDocumentSettingsUpdateStatus(state, status) {
    state.documentSettingsUpdateStatus = status;
  },

  setDocumentVoidStatus(state, status) {
    state.documentVoidStatus = status;
  },
  setDocumentDeclineStatus(state, status) {
    state.documentDeclineStatus = status;
  },
  setDocumentCompletedStatus(state, status) {
    state.documentCompletedStatus = status;
  },
  setDocumentCorrectStatus(state, status) {
    state.documentCorrectStatus = status;
  },
  setDocumentCorrectErrors(state, err) {
    state.documentCorrectErrors = err;
  },
  //cloning void doc status
  setCloneVoidDocStatus(state, status) {
    state.cloneVoidDocStatus = status;
  },
  setCloneVoidDocErrors(state, err) {
    state.cloneVoidDocErrors = err;
  },
  setCloneVoidDocData(state, data) {
    state.cloneVoidDocData = data;
  },
  setDocumentPreviewData(state, data) {
    state.documentPreviewData = data;
  },
  setDocumentUserTermsUpdate(state, data) {
    state.documentUserTermsUpdate = data;
  },
  setCreateBulkContactsStatus(state, status) {
    state.createBulkContactsStatus = status;
  },
  setDocumentsCountByTemplatId(state, data) {
    state.documentsCountByTemplatId = data;
  },
  setDocumentsDataByConfigurableId(state, data) {
    state.documentsDataByConfigurableId = data;
  },
  setEmployeeDocumentUsers(state, data) {
    state.employeeDocumentUsers = data;
  },
  setDocumentUsersStatus(state, data) {
    state.documentUsersStatus = data;
  },
  setUploadedFileUpdateStatus: (state, status) => {
    state.uploadedFileUpdateStatus = status;
  },
  setAddWorkflowContactStatus: (state, status) => {
    state.addWorkflowContactStatus = status;
  },
  setEmployeeDocumentsByConfigurableIdData(state, data) {
    state.employeeDocumentsByConfigurableIdData = data;
  },
  setEmployeeDocumentsByConfigurableIdStatus(state, status) {
    state.employeeDocumentsByConfigurableIdStatus = status;
  },
  setAllCompanyUsers(state, data) {
    state.allCompanyUsers = data;
  },
  setChangeOwnershipOfTemplateData(state, data) {
    state.changeOwnershipOfTemplateData = data;
  },
  setChangeOwnershipOfTemplatestatus(state, status) {
    state.changeOwnershipOfTemplatestatus = status;
  },
  setDocumentFormFieldsData(state, data) {
    state.documentFormFieldsData = data;
  },
  resetData: (state) => {
    const initial = initialState();
    Object.keys(initial).forEach((key) => {
      state[key] = initial[key];
    });
  },
};

const actions = {
  reset: function (context) {
    context.commit("documents/resetData", null, {
      root: true,
    });
  },
  sendCompletedDocument: async (context, params) => {
    try {
      context.commit("documents/setSendCompletedDocumentStatus", false, {
        root: true,
      });
      await axios.post("/document/completed/send-mail", params);
      context.commit("documents/setSendCompletedDocumentStatus", true, {
        root: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
  //update file uploaded data
  updateUploadedFileData: async (context, params) => {
    try {
      context.commit("documents/setUploadedFileUpdateStatus", false, {
        root: true,
      });
      await axios.post("/documents/update-uploaded-data", params);
      context.commit("documents/setUploadedFileUpdateStatus", true, {
        root: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateDocumentUserTerms: async (context, data) => {
    try {
      context.commit("documents/setDocumentUserTermsUpdate", false, {
        root: true,
      });
      await axios.post(`/documents/user/terms-and-conditions`, data);
      context.commit("documents/setDocumentUserTermsUpdate", true, {
        root: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
  //get document preview data
  getDocumentPreviewData: async (context, params) => {
    try {
      context.commit("documents/setDocumentPreviewData", null, {
        root: true,
      });
      let response = await axios.get(
        `/documents/${params.id}/preview/${params.user_id}`
      );
      context.commit("documents/setDocumentPreviewData", response.data.data, {
        root: true,
      });
    } catch (err) {
      if (err.response.data.message) {
        context.commit(
          "documents/setDocumentPreviewData",
          err.response.data.message,
          {
            root: true,
          }
        );
      }
    }
  },
  //correct document
  correctDocument: async (context, params) => {
    try {
      context.commit("documents/setDocumentCorrectStatus", false, {
        root: true,
      });
      context.commit("documents/setDocumentCorrectErrors", null, {
        root: true,
      });
      await axios.post(`/documents/${params}/correct`);
      context.commit("documents/setDocumentCorrectStatus", true, {
        root: true,
      });
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response) {
        context.commit(
          "documents/setDocumentCorrectErrors",
          err.response.data.message,
          {
            root: true,
          }
        );
      }
    }
  },
  DiscardDocument: async (context, params) => {
    try {
      context.commit("documents/setDiscardDocumentStatus", false, {
        root: true,
      });
      await axios.delete(
        `/documents/${params.configurable_document_id}/${params.company_document_id}/discard`,
        params
      );
      context.commit("documents/setDiscardDocumentStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDiscardDocumentStatus", false, {
        root: true,
      });
    }
  },
  //clone document from void state
  EditVoidDocument: async (context, params) => {
    try {
      context.commit("documents/setCloneVoidDocStatus", false, {
        root: true,
      });
      context.commit("documents/setCloneVoidDocErrors", null, {
        root: true,
      });
      let response = await axios.post(`/documents/${params}/cloneVoidDoc`);
      // const data = response.data.data
      context.commit("documents/setCloneVoidDocData", response.data, {
        root: true,
      });
      context.commit("documents/setCloneVoidDocStatus", true, {
        root: true,
      });
      console.log("responsedata in getters", response.data);
    } catch (err) {
      if (err.response.data.message) {
        context.commit(
          "documents/setCloneVoidDocErrors",
          err.response.data.message,
          {
            root: true,
          }
        );
      }
    }
  },
  fetchEmployeeDocumentsByConfigurableDocumentId: async (
    { commit },
    params
  ) => {
    console.log(params);
    try {
      commit("setEmployeeDocumentsByConfigurableIdData", null);
      commit("setEmployeeDocumentsByConfigurableIdStatus", false);
      let response = await axios.get(`/entities/employeeDocuments`, {
        params,
      });
      commit("setEmployeeDocumentsByConfigurableIdData", response.data, true);
      commit("setEmployeeDocumentsByConfigurableIdStatus", false);
    } catch (err) {
      console.log(err);
    }
  },
  ChangeOwnershipOfTemplate: async (context, params) => {
    try {
      context.commit("setChangeOwnershipOfTemplateData", null);
      context.commit("setChangeOwnershipOfTemplatestatus", false);
      let response = await axios.patch(`documents/changeOwnership`, params);
      context.commit("setChangeOwnershipOfTemplatestatus", true);
      context.commit("setChangeOwnershipOfTemplateData", response.data, true);
    } catch (err) {
      console.log(err);
    }
  },
  // getting all docuents
  fetchAllDocuments: async (context, params) => {
    try {
      let urlParam =
        params.document_status && params.document_status != "all-documents"
          ? "all-documents/" + params.document_status
          : "documents";
      delete params.document_status;
      context.commit("documents/setAllDocuments", null, {
        root: true,
      });
      let response = await axios.get(urlParam, {
        params,
      });
      context.commit("documents/setAllDocuments", response.data, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setAllDocuments", null, {
        root: true,
      });
    }
  },
  // getting all docuents
  fetchAllTemplates: async (context, params) => {
    try {
      context.commit("documents/setAllTemplates", null, {
        root: true,
      });
      let response = await axios.get("/document-templates", {
        params,
      });
      context.commit("documents/setAllTemplates", response.data, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setAllTemplates", null, {
        root: true,
      });
    }
  },
  //fetch all templates for workflow
  fetchAllConfigTemplates: async (context, params) => {
    try {
      context.commit("documents/setAllTemplates", null, {
        root: true,
      });
      let response = await axios.get("/configurable-documents", {
        params,
      });
      context.commit("documents/setAllTemplates", response.data, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setAllTemplates", null, {
        root: true,
      });
    }
  },
  // upload file and getting an url
  fetchDocumentUploadUrl: async (context, params) => {
    try {
      context.commit("documents/setFileUploadURL", null, {
        root: true,
      });
      context.commit("documents/setFileUploadRefId", null, {
        root: true,
      });
      const response = await axios.post(
        "/document-templates/file-upload",
        params
      );
      const data = response.data.data;
      context.commit("documents/setFileUploadURL", data.upload_url, {
        root: true,
      });
      context.commit("documents/setFileUploadRefId", data.file_ref_id, {
        root: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // update uploaded document status
  updateDocumentUploadStatus: async (context, params) => {
    try {
      context.commit("documents/setDocumentUploadStatusUpdated", false, {
        root: true,
      });
      await axios.post("/document-templates/file-upload/status", params);
      context.commit("documents/setDocumentUploadStatusUpdated", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setDocumentUploadStatusUpdated", false, {
        root: true,
      });
    }
  },
  // save document data
  addCompanyDocument: async (context, params) => {
    try {
      context.commit("documents/setCompanyDocumentAddStatus", false, {
        root: true,
      });
      context.commit("documents/setNewCompanyDocument", null, {
        root: true,
      });

      const response = await axios.post("/document-templates", params);

      context.commit("documents/setNewCompanyDocument", response.data.data, {
        root: true,
      });
      context.commit("documents/setCompanyDocumentAddStatus", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setCompanyDocumentAddStatus", false, {
        root: true,
      });
      if (error.response) {
        await context.dispatch("errors/errorResponse", error.response, {
          root: true,
        });
      }
    }
  },

  fetchDocumentUsers: async (context, params) => {
    try {
      context.commit("documents/setEmployeeDocumentUsers", null, {
        root: true,
      });
      context.commit("documents/setDocumentUsersStatus", false, {
        root: true,
      });
      let response = await axios.get(
        `/documents/${params.document_id}/recipients`
      );
      context.commit("documents/setEmployeeDocumentUsers", response.data.data, {
        root: true,
      });
      context.commit("documents/setDocumentUsersStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDocumentUsers", null, {
        root: true,
      });
      console.log(err);
    }
  },
  fetchDocumentLogsById: async (context, params) => {
    try {
      context.commit("documents/setDocumentLogs", null, {
        root: true,
      });
      let response = await axios.get(
        `/documents/${params.document_id}/users/logs`
      );
      context.commit("documents/setDocumentLogs", response.data, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setDocumentLogs", null, {
        root: true,
      });
    }
  },

  fetchConfigureDocumentIdByDocumentId: async (
    context,
    document_id,
    is_template
  ) => {
    try {
      context.commit("documents/setCreateConfigureDocumentData", null, {
        root: true,
      });
      if (is_template) {
        let response = await axios.post(
          `/document-templates/${document_id}/configure`,
          {
            is_template,
          }
        );
        context.commit(
          "documents/setCreateConfigureDocumentData",
          response.data,
          {
            root: true,
          }
        );
      } else {
        let response = await axios.post(
          `/document-templates/${document_id}/configure`
        );
        context.commit(
          "documents/setCreateConfigureDocumentData",
          response.data,
          {
            root: true,
          }
        );
      }
    } catch (error) {
      context.commit("documents/setCreateConfigureDocumentData", null, {
        root: true,
      });
      if (error.response) {
        await context.dispatch("errors/errorResponse", error.response, {
          root: true,
        });
      }
    }
  },
  addWorkflowContacts: async (context, params) => {
    try {
      context.commit("documents/setAddWorkflowContactStatus", false, {
        root: true,
      });
      await axios.post("addWorkflow-contacts", params);
      context.commit("documents/setAddWorkflowContactStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setAddWorkflowContactStatus", true, {
        root: true,
      });
    }
  },
  bulkSend: async (context, params) => {
    try {
      context.commit("documents/setCreateBulkContactsStatus", false, {
        root: true,
      });
      await axios.post("/bulk-users-add", params);
      context.commit("documents/setCreateBulkContactsStatus", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setCreateBulkContactsStatus", false, {
        root: true,
      });
    }
  },
  fetchUserDocuments: async (context, params) => {
    try {
      context.commit("documents/setUserDocuments", null, {
        root: true,
      });
      let user = params.contact_id;
      delete params.contact_id;
      const response = await axios.get(`/documents/users/${user}`, {
        params,
      });
      context.commit("documents/setUserDocuments", response.data, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setUserDocuments", null, {
        root: true,
      });
    }
  },
  createDraftDocument: async (context, params) => {
    try {
      context.commit("documents/setDraftDocumentCreateStatus", false, {
        root: true,
      });
      context.commit("documents/setDraftDocumentCreateData", null, {
        root: true,
      });
      const response = await axios.post(
        "/document-templates/documents/draft",
        params
      );
      context.commit("documents/setDraftDocumentCreateStatus", true, {
        root: true,
      });
      context.commit("documents/setDraftDocumentCreateData", response.data, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDraftDocumentCreateStatus", false, {
        root: true,
      });
      if (err.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          err.response,
          {
            root: true,
          }
        );
        context.commit("documents/setDraftDocumentCreateErrors", errorData, {
          root: true,
        });
      }
    }
  },
  createSentDocument: async (context, params) => {
    try {
      context.commit("documents/setDraftDocumentCreateStatus", false, {
        root: true,
      });
      context.commit("documents/setDraftDocumentCreateData", null, {
        root: true,
      });
      console.log(params);
      const response = await axios.post(
        "/document-templates/documents/send-template",
        params
      );
      context.commit("documents/setDraftDocumentCreateStatus", true, {
        root: true,
      });
      context.commit("documents/setDraftDocumentCreateData", response.data, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDraftDocumentCreateStatus", false, {
        root: true,
      });
      if (err.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          err.response,
          {
            root: true,
          }
        );
        context.commit("documents/setDraftDocumentCreateErrors", errorData, {
          root: true,
        });
      }
    }
  },

  fetchDocumentDataById: async (context, params) => {
    try {
      context.commit("documents/setSingleDocumentData", null, {
        root: true,
      });
      context.commit(
        "documents/setDocumentSendErrors",
        {},
        {
          root: true,
        }
      );
      let response = await axios.get(`/documents/${params.document_id}`);
      context.commit("documents/setSingleDocumentData", response.data, {
        root: true,
      });
    } catch (error) {
      if (error.response.data) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          error.response,
          {
            root: true,
          }
        );
        context.commit("documents/setDocumentSendErrors", errorData, {
          root: true,
        });
      }
    }
  },

  updateDraftDocument: async (context, params) => {
    try {
      context.commit("documents/setDraftDocumentUpdateStatus", false, {
        root: true,
      });
      context.commit("documents/setDraftDocumentUpdateData", null, {
        root: true,
      });
      let response = await axios.put(
        "/document-templates/documents/draft",
        params
      );
      context.commit("documents/setDraftDocumentUpdateStatus", true, {
        root: true,
      });
      context.commit("documents/setDraftDocumentUpdateData", response.data, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDraftDocumentUpdateStatus", false, {
        root: true,
      });
      if (err.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          err.response,
          {
            root: true,
          }
        );
        context.commit("documents/setDraftDocumentUpdateErrors", errorData, {
          root: true,
        });
      }
    }
  },
  updateCompanyDocument: async (context, params, template_id) => {
    try {
      context.commit("documents/setCompanyDocumentStatus", false, {
        root: true,
      });
      context.commit("documents/setCompanyDocumentData", null, {
        root: true,
      });
      const response = await axios.put(
        `/document-templates/${template_id}`,
        params
      );
      context.commit("documents/setCompanyDocumentStatus", true, {
        root: true,
      });
      context.commit("documents/setCompanyDocumentData", response.data, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setCompanyDocumentStatus", false, {
        root: true,
      });
      if (err.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          err.response,
          {
            root: true,
          }
        );
        context.commit("documents/setCompanyDocumentStatusErrors", errorData, {
          root: true,
        });
      }
    }
  },
  deleteDocumentTemplate: async (context, template_id) => {
    try {
      context.commit("documents/setDocumentTemplateDeleteStatus", false, {
        root: true,
      });
      await axios.delete(`/document-templates/${template_id}`);
      context.commit("documents/setDocumentTemplateDeleteStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDocumentTemplateDeleteStatus", false, {
        root: true,
      });
    }
  },

  permanentdeleteDocumentTemplate: async (context, params) => {
    try {
      context.commit(
        "documents/setDocumentTemplatePermanentDeleteStatus",
        false,
        {
          root: true,
        }
      );
      await axios.delete(
        `/document-templates/${params.company_document_id}/${params.configurable_document_id}/permanentdelete`,
        params
      );
      context.commit(
        "documents/setDocumentTemplatePermanentDeleteStatus",
        true,
        {
          root: true,
        }
      );
    } catch (err) {
      context.commit(
        "documents/setDocumentTemplatePermanentDeleteStatus",
        false,
        {
          root: true,
        }
      );
    }
  },

  saveAsTemplate: async (context, params) => {
    try {
      context.commit("documents/setDocumentSaveAsTemplate", false, {
        root: true,
      });
      const respose = await axios.post(
        `/document-templates/${params.employee_document_id}/saveastemplate`,
        params
      );
      context.commit("documents/setDocumentSaveAsTemplateData", respose.data, {
        root: true,
      });
      context.commit("documents/setDocumentSaveAsTemplate", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setSingleDocumentUpdateStatus", false, {
        root: true,
      });
    }
  },
  sendDocument: async (context, params) => {
    try {
      context.commit("documents/setDocumentSendErrors", null, {
        root: true,
      });
      context.commit("documents/setDocumentSendStatus", false, {
        root: true,
      });
      context.commit("documents/setDocumnetSentDocumnet", null, {
        root: true,
      });
      let data = await axios.post("/document-templates/documents/send", params);
      context.commit("documents/setDocumentSendStatus", true, {
        root: true,
      });
      context.commit("documents/setDocumnetSentDocumnet", data.data.data, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setDocumentSendStatus", false, {
        root: true,
      });
      if (err.response) {
        let errorData = await context.dispatch(
          "error/errorResponse",
          err.response,
          {
            root: true,
          }
        );
        context.commit("documents/setDocumentSendErrors", errorData, {
          root: true,
        });
      }
    }
  },
  shareDocumentUsers: async (context, params) => {
    try {
      context.commit("documents/setUpdateDocumentUsersStatus", false, {
        root: true,
      });
      await axios.put(
        `/documents/${params.document_id}/share-document`,
        params
      );
      context.commit("documents/setUpdateDocumentUsersStatus", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setUpdateDocumentUsersStatus", false, {
        root: true,
      });
      if (error.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          error.response,
          {
            root: true,
          }
        );
        context.commit("documents/setSingleDocumentUpdateErrors", errorData, {
          root: true,
        });
      }
      if (error.response.data.message) {
        context.commit(
          "documents/setUpdateDocumentUsersErrors",
          error.response.data.message,
          {
            root: true,
          }
        );
      }
    }
  },
  updateDocumentDataById: async (context, params) => {
    try {
      context.commit("documents/setSingleDocumentUpdateStatus", false, {
        root: true,
      });
      context.commit("documents/setSingleDocumentUpdateErrors", null, {
        root: true,
      });
      await axios.put(`/documents/${params.document_id}`, params);
      context.commit("documents/setSingleDocumentUpdateStatus", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setSingleDocumentUpdateStatus", false, {
        root: true,
      });
      if (error.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          error.response,
          {
            root: true,
          }
        );
        context.commit("documents/setSingleDocumentUpdateErrors", errorData, {
          root: true,
        });
      }
    }
  },
  finishDocumentDataById: async (context, params) => {
    try {
      context.commit("documents/setSingleDocumentUpdateStatus", false, {
        root: true,
      });
      context.commit("documents/setSingleDocumentUpdateErrors", null, {
        root: true,
      });
      let response = await axios.post(
        `/documents/${params.document_id}/finish`,
        params
      );
      context.commit(
        "documents/setSingleDocumentCompletedStatus",
        response.data,
        {
          root: true,
        }
      );
      context.commit("documents/setSingleDocumentUpdateStatus", true, {
        root: true,
      });
    } catch (error) {
      context.commit("documents/setSingleDocumentUpdateStatus", false, {
        root: true,
      });
      if (error.response) {
        let errorData = await context.dispatch(
          "errors/errorResponse",
          error.response,
          {
            root: true,
          }
        );
        context.commit("documents/setSingleDocumentUpdateErrors", errorData, {
          root: true,
        });
      }
    }
  },
  resendDocumentLinkToContact: async (context, params) => {
    try {
      context.commit("documents/setResendDocumentStatus", false, {
        root: true,
      });
      await axios.post(
        `documents/${params.document_id}/document-users/resend-document`,
        params
      );
      context.commit("documents/setResendDocumentStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("documents/setResendDocumentStatus", false, {
        root: true,
      });
    }
  },
  renameDocument: async ({ commit }, { document_id, name }) => {
    try {
      commit("setRenameDocumentStatus", false);
      await axios.post(`documents/${document_id}/rename`, {
        name,
      });
      commit("setRenameDocumentStatus", true);
    } catch (err) {
      commit("setRenameDocumentStatus", false);
    }
  },
  duplicateDocument: async ({ commit, dispatch }, { document_id, name }) => {
    try {
      commit("setDuplicateDocumentErrors", null);
      commit("setDuplicateDocumentStatus", false);
      await axios.post(`documents/${document_id}/duplicate`, {
        name,
      });
      commit("setDuplicateDocumentStatus", true);
    } catch (err) {
      commit("setDuplicateDocumentStatus", false);
      if (err.response) {
        const errorData = await dispatch("errors/errorResponse", err.response, {
          root: true,
        });
        commit("setDuplicateDocumentErrors", errorData);
      }
    }
  },
  archiveDocument: async ({ commit }, { document_id }) => {
    try {
      commit("setArchiveDocumentStatus", false);
      await axios.delete(`documents/${document_id}/archive`);
      commit("setArchiveDocumentStatus", true);
    } catch (err) {
      commit("setArchiveDocumentStatus", false);
    }
  },

  undoDocument: async ({ commit }, { document_id }) => {
    try {
      commit("setArchiveDocumentStatus", false);
      await axios.post(`documents/${document_id}/undoDocument`);
      commit("setArchiveDocumentStatus", true);
    } catch (err) {
      commit("setArchiveDocumentStatus", false);
    }
  },

  parmanentdelete: async ({ commit }, { document_id }) => {
    try {
      commit("setArchiveDocumentStatus", false);
      await axios.post(`documents/${document_id}/parmanentdelete`);
      commit("setArchiveDocumentStatus", true);
    } catch (err) {
      commit("setArchiveDocumentStatus", false);
    }
  },
  archiveDocuments: async ({ commit }, { document_id }) => {
    try {
      commit("setArchiveDocumentStatus", false);
      await axios.delete(`documents/${document_id}/archivedoc`);
      commit("setArchiveDocumentStatus", true);
    } catch (err) {
      commit("setArchiveDocumentStatus", false);
    }
  },
  fetchDocumentSettings: async ({ commit }, { document_id }) => {
    try {
      commit("setDocumentSettings", null);
      const response = await axios.get(
        `/documents/${document_id}/document-settings`
      );
      commit("setDocumentSettings", response.data);
    } catch (err) {
      commit("setDocumentSettings", null);
    }
  },
  fetchDocumentSettingsNew: async ({ commit }, { document_id, user_id }) => {
    try {
      commit("setDocumentSettings", null);
      const response = await axios.get(
        `/documents/${document_id}/${user_id}/document-settings`
      );
      commit("setDocumentSettings", response.data);
    } catch (err) {
      commit("setDocumentSettings", null);
    }
  },
  updateDocumentSettings: async ({ commit }, { document_id, data }) => {
    try {
      console.log(data);
      commit("setDocumentSettingsUpdateStatus", false);
      await axios.post(`/documents/${document_id}/document-settings`, data);
      commit("setDocumentSettingsUpdateStatus", true);
    } catch (err) {
      commit("setDocumentSettingsUpdateStatus", false);
    }
  },
  voidDocument: async ({ commit }, { document_id }) => {
    try {
      commit("setDocumentVoidStatus", false);
      await axios.post(`/documents/${document_id}/void`);
      commit("setDocumentVoidStatus", true);
    } catch (err) {
      commit("setDocumentVoidStatus", false);
    }
  },
  declineDocument: async (context, params) => {
    let note = {};
    note.notes = params.note;
    try {
      context.commit("setDocumentDeclineStatus", false);
      await axios.post(`/documents/${params.document_id}/decline`, note);
      context.commit("setDocumentDeclineStatus", true);
    } catch (err) {
      context.commit("setDocumentDeclineStatus", false);
    }
  },
  completedDocument: async (context, params) => {
    try {
      context.commit("setDocumentCompletedStatus", false);
      await axios.patch(`/documents/${params.document_id}/completed`);
      context.commit("setDocumentCompletedStatus", true);
    } catch (err) {
      context.commit("setDocumentCompletedStatus", false);
    }
  },
  fecthDocumentsCountByTemplatId: async (context, params) => {
    try {
      context.commit("setDocumentsCountByTemplatId", null);
      let response = await axios.post(`/documents/template-documents`, params);
      context.commit("setDocumentsCountByTemplatId", response.data.data);
    } catch (err) {
      context.commit("setDocumentsCountByTemplatId", null);
    }
  },
  fecthDocumentsDataByConfigurableId: async (context, params) => {
    try {
      context.commit("setDocumentsDataByConfigurableId", null);
      let id = params.id;
      delete params.id;
      let response = await axios.get(
        `/documents/template-documents-data/${id}`,
        {
          params,
        }
      );
      context.commit("setDocumentsDataByConfigurableId", response.data);
    } catch (err) {
      context.commit("setDocumentsDataByConfigurableId", null);
    }
  },
  fetchAllCompanyUsers: async (context, params) => {
    console.log(params);
    try {
      context.commit("setAllCompanyUsers", null);
      let response = await axios.get(
        `/getAllCompanyUsers/${params.company_id}`,
        params
      );
      context.commit("setAllCompanyUsers", response.data);
    } catch (err) {
      context.commit("setAllCompanyUsers", null);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
