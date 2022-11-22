import axios from "@/config/axios";

const initialState = () => {
  return {
    allEntities: null,
    entityCreatedStatus: false,
    entityCreatedData: null,
    entitySettings: null,
    entityDataById: null,
    entityById: null,
    childEntityDataById: null,
    entityDataUpdateStatus: false,
    selectedEntityUsers: null,
    entityDataCreatedStatus: false,
    entityDataCreatedData: null,
    entitySendStatus: false,
    entitySendData: null,
    createdEntityDataById: null,
    createdEntityStatus: false,
    currentUserStatus: null,
    entityCreatedDataUpdateStatus: false,
    viewEntityData: null,
    entityDeleteStatus: false,
    entityErrors: {},
    entityDeleteError: "",
    newEntityUser: null,
    entityDataByEntityId: {},
    entityDataByQuery: null,
    entitiesDataByQuery: null,
    companyEntityDetails: null,
    addEntityToCompanyStatus: false,
    entityDocumentsData: null,
    entityDocumentsDataStatus: false,
    entityDocumentsNotIncludingTemplatesData: null,
    entityDocumentsNotIncludingTemplatesStatus: false,
    employeeDocumentsByEntityIdAndConfigurableDocumentIdData: null,
    employeeDocumentsByEntityIdAndConfigurableDocumentIdStatus: false,
    templatesFieldsDataFromEntitiesData: null,
    templatesFieldsDataFromEntitiesStatus: false,
    entityRecordsForTable: [],
    entityPrimaryData: {},
    errors: {},
    templateRelatedEntities: [],
    documentUploadToEntityProfileStatus:false,
    documentUploadToEntityProfileData:null,
    customDashboardStats: null,
    customDashboardPieStats: null
  };
};

const state = initialState();

const getters = {
  getAllEntities: (state) => state.allEntities,
  getEntityCreatedStatus: (state) => state.entityCreatedStatus,
  getEntityCreatedData: (state) => state.entityCreatedData,
  getEntitySettings: (state) => state.entitySettings,
  getEntityDataById: (state) => state.entityDataById,
  getChildEntityDataById: (state) => state.childEntityDataById,
  getEntityById: (state) => state.entityById,

  getCompanyEntity: (state) => state.companyEntity,
  getEntityDataUpdateStatus: (state) => state.entityDataUpdateStatus,
  getSelectedEntityUsers: (state) => state.selectedEntityUsers,
  getEntityDataCreatedStatus: (state) => state.entityDataCreatedStatus,
  getEntityDataCreatedData: (state) => state.entityDataCreatedData,
  getEntitySendStatus: (state) => state.entitySendStatus,
  getEntitySendData: (state) => state.entitySendData,
  getCreatedEntityDataById: (state) => state.createdEntityDataById,
  getCreatedEntityStatus: (state) => state.createdEntityStatus,
  getCurrentUserStatus: (state) => state.currentUserStatus,
  getEntityCreatedDataUpdateStatus: (state) =>
    state.entityCreatedDataUpdateStatus,
  getViewEntityData: (state) => state.viewEntityData,
  getEntityErrors: (state) => state.entityErrors,
  getEntityDeleteStatus: (state) => state.entityDeleteStatus,
  getEntityDeleteError: (state) => state.entityDeleteError,
  getNewEntityUser: (state) => state.newEntityUser,
  getEntityDataByEntityId: (state) => state.entityDataByEntityId,
  getEntityDataByQuery: (state) => state.entityDataByQuery,
  getEntitiesDataByQuery: (state) => state.entitiesDataByQuery,
  getCompanyEntityDetails: state => state.companyEntityDetails,
  getAddEntityToCompanyStatus: state => state.addEntityToCompanyStatus,
  getEntityDocumentsData: state => state.entityDocumentsData,
  getEntityDocumentsDataStatus: state => state.entityDocumentsDataStatus,
  getEntityDocumentsNotIncludingTemplatesData: state => state.entityDocumentsNotIncludingTemplatesData,
  getEntityDocumentsDataNotIncludingTemplatesStatus: state => state.entityDocumentsDataNotIncludingTemplatesStatus,
  getEmployeeDocumentsByEntityIdAndConfigurableDocumentIdData: state => state.employeeDocumentsByEntityIdAndConfigurableDocumentIdData,
  getEmployeeDocumentsByEntityIdAndConfigurableDocumentIdStatus: state => state.employeeDocumentsByEntityIdAndConfigurableDocumentIdStatus,
  getTemplatesFieldsDataFromEntitiesData: state => state.templatesFieldsDataFromEntitiesData,
  getTemplatesFieldsDataFromEntitiesStatus: state => state.templatesFieldsDataFromEntitiesStatus,
  getEntityRecordsForTable: state => state.entityRecordsForTable,
  getEntityPrimaryData: state => state.entityPrimaryData,
  getEntitiesDataErrors: state => state.errors,
  getTemplateRelatedEntities: state => state.templateRelatedEntities,
  getDocumentUploadToEntityProfileStatus: state => state.documentUploadToEntityProfileStatus,
  getDocumentUploadToEntityProfileData: state => state.documentUploadToEntityProfileData,
  getCustomDashboardStats: state => state.customDashboardStats,
  geCustomDashboardPieStats: state => state.customDashboardPieStats
};
const mutations = {
  setEntitySendStatus: (state, status) => {
    state.entitySendStatus = status;
  },
  setEntitySendData: (state, data) => {
    state.entitySendData = data;
  },
  setEntityDataCreatedStatus: (state, status) => {
    state.entityDataCreatedStatus = status;
  },
  setEntityDataCreatedData: (state, data) => {
    state.entityDataCreatedData = data;
  },
  setSelectedEntityUsers: (state, data) => {
    state.selectedEntityUsers = data;
  },
  setEntityDataUpdateStatus: (state, status) => {
    state.entityDataUpdateStatus = status;
  },
  setEntityDataById: (state, data) => {
    state.entityDataById = data;
  },

  setChildEntityDataById: (state, data) => {
    state.childEntityDataById = data;
  },
  setEntityById: (state, data) => {
    state.entityById = data;
  },
  setCompanyEntity: (state, data) => {
    state.companyEntity = data
  },
  setEntitySettings: (state, data) => {
    state.entitySettings = data;
  },
  setAllEntities: (state, data) => {
    state.allEntities = data;
  },
  setEntityCreatedData: (state, data) => {
    state.entityCreatedData = data;
  },
  setEntityCreatedStatus: (state, status) => {
    state.entityCreatedStatus = status;
  },
  setCreatedEntityDataById: (state, data) => {
    state.createdEntityDataById = data;
  },
  setCreatedEntityStatus: (state, status) => {
    state.createdEntityStatus = status;
  },
  setCurrentUserStatus: (state, data) => {
    state.currentUserStatus = data;
  },
  setEntityCreatedDataUpdateStatus: (state, status) => {
    state.entityCreatedDataUpdateStatus = status;
  },
  setViewEntityData: (state, data) => {
    state.viewEntityData = data;
  },
  setEntityDeleteStatus(state, data) {
    state.entityDeleteStatus = data;
  },
  setEntityErrors(state, data) {
    state.entityErrors = data;
  },
  setEntityDeleteError(state, data) {
    state.entityDeleteError = data;
  },
  setNewEntityUser(state, data) {
    state.newEntityUser = data;
  },
  setEntityDataByEntityId(state, data) {
    state.entityDataByEntityId = data;
  },
  setEntityDataByQuery(state, data) {
    state.entityDataByQuery = data
  },
  setEntitiesDataByQuery(state, data) {
    state.entitiesDataByQuery = data
  },
  setCompanyEntityDetails(state, data) {
    state.companyEntityDetails = data
  },
  setAddEntityToCompanyStatus(state, data) {
    state.addEntityToCompanyStatus = data
  },
  setEntityDocumentsData(state, data) {
    state.entityDocumentsData = data
  },
  setEntityDocumentsDataStatus(state, status) {
    state.entityDocumentsDataStatus = status
  },
  setEntityDocumentsNotIncludingTemplatesData(state, data) {
    state.entityDocumentsNotIncludingTemplatesData = data
  },
  setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdData(state, data) {
    state.employeeDocumentsByEntityIdAndConfigurableDocumentIdData = data
  },
  setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdStatus(state, status) {
    state.employeeDocumentsByEntityIdAndConfigurableDocumentIdStatus = status
  },
  setEntityDocumentsDataNotIncludingTemplatesStatus(state, status) {
    state.entityDocumentsDataNotIncludingTemplatesStatus = status
  },
  setTemplatesFieldsDataFromEntitiesStatus(state, status) {
    state.templatesFieldsDataFromEntitiesStatus = status
  },
  setTemplatesFieldsDataFromEntitiesData(state, data) {
    state.templatesFieldsDataFromEntitiesData = data
  },
  setEntityRecordsForTable(state, data) {
    state.entityRecordsForTable = data
  },
  setEntityPrimaryData(state, data) {
    state.entityPrimaryData = data
  },
  setEntitiesDataErrors(state, data) {
    state.errors = data
  },

  setTemplateRelatedEntities(state, data) {
    state.templateRelatedEntities = data
  },
  setDocumentUploadToEntityProfileStatus(state,status) {
    state.documentUploadToEntityProfileStatus = status
  },
  setDocumentUploadToEntityProfileData(state,data){
    state.documentUploadToEntityProfileData = data
  },
  setCustomDashboardStats(state, data){
    state.customDashboardStats = data
  },
  setCustomDashboardPieStats(state, data) {
    state.customDashboardPieStats = data
  },
  resetData: state => {
    const initial = initialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },

};

const actions = {
  reset: function (context) {
    context.commit("entities/resetData", null, {
      root: true
    });
  },
  createNewEntity: async ({
    commit
  }, params) => {
    try {
      commit("setEntityCreatedData", null);
      commit("setEntityErrors", null);
      commit("setEntityCreatedStatus", false);
      let response = await axios.post("/entities/create", params);
      commit("setEntityCreatedData", response.data.data);
      commit("setEntityCreatedStatus", true);
    } catch (err) {
      if (err.response && err.response.data) {
        console.log("eeeeeeee", err.response)
        commit("setEntityErrors", err.response.data.message);
      }
    }
  },
  fetchEntities: async ({
    commit
  }, params) => {
    let response = null;
    try {
      commit("setAllEntities", 0);
      response = await axios.get("/entities", {
        params,
      });
      commit("setAllEntities", response.data);
    } catch (err) {
      // commit('setNotificationCountUnOpened', 0);
      // commit('setChatCountUnOpened', 0);
    }
  },
  fetchEntityById: async ({
    commit
  }, id) => {
    try {
      commit("setEntityDataById", null);
      let response = await axios.get(`/entities/${id}`);
      commit("setEntityDataById", response.data.data);
    } catch (err) {
      commit("setEntityDataById", null);
      console.log(err);
    }
  },

  fetchChildEntityById: async ({
    commit
  }, id) => {
    try {
      commit("setChildEntityDataById", null);
      let response = await axios.get(`/entities/${id}`);
      commit("setChildEntityDataById", response.data.data);
    } catch (err) {
      commit("setChildEntityDataById", null);
      console.log(err);
    }
  },
  fetchEntityByIdForEntityField: async ({
    commit
  }, id) => {
    try {
      commit("setEntityById", null);
      let response = await axios.get(`/entities/${id}`);
      commit("setEntityById", response.data.data);
    } catch (err) {
      commit("setEntityById", null);
      console.log(err);
    }
  },
  updateEntityById: async ({
    commit
  }, data) => {
    try {
      commit("setEntityDataUpdateStatus", false);
      await axios.put(`/entities/${data.id}`, data);
      commit("setEntityDataUpdateStatus", true);
    } catch (err) {
      if (err.response && err.response.data) {
        commit("setEntityErrors", err.response.data.message);
      }
    }
  },
  async deleteEntity({
    commit
  }, params) {
    try {
      commit("setEntityDeleteStatus", false);

      await axios.delete("entities/" + params.id);
      commit("setEntityDeleteStatus", true);
    } catch (error) {
      if (error.response && error.response.data) {
        commit("setEntityDeleteError", error.response.data.message)
      }
    }
  },

  // fetchEntitiesByQuery: async ({
  //   commit
  // }, params) => {
  //   try {
  //     commit("setEntityDataByQuery", null);
  //     let response = await axios.post("/entities", params);
  //     commit("setEntityDataByQuery", response.data.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  fetchEntityPrimaryDataById: async ({ commit }, id) => {
    try {
      commit("setEntityPrimaryData", {});
      const response = await axios.get(`/entity-data/${id}`);
      commit("setEntityPrimaryData", response.data.data);
    } catch (err) {
      console.log(err)
    }
  },
  fetchEntityDataByQuery: async ({
    commit
  }, params) => {
    try {
      commit("setEntitiesDataByQuery", null);
      let response = await axios.post("/entities-data", params);
      commit("setEntitiesDataByQuery", response.data.data);
    } catch (error) {
      console.log(error)
    }
  },
  fetchEntitiesByQuery: async ({
    commit
  }, params) => {
    try {
      commit("setEntityDataByQuery", null);
      let response = await axios.post("/entities", params);
      commit("setEntityDataByQuery", response.data.data);
    } catch (error) {
      console.log(error)
    }
  },
  errorResponse: (context, errorResponse) => {
    let errorStatusCode = errorResponse.status;
    let errorData = {};
    switch (errorStatusCode) {
      case 422:
        var errors = errorResponse.data.errors;
        errors.details.forEach((detail) => {
          if (detail.key == "files") {
            if (!errorData[detail.path]) {
              errorData[detail.path] = detail.message;
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
  fetchEntityDataById: async (context, data) => {
    try {
      let params = data.params;
      context.commit("entities/setEntityDataByEntityId", [], {
        root: true
      });
      let response = await axios.get(
        `/entities/${data.id}/list`, {
        params
      }
      );
      context.commit("entities/setEntityDataByEntityId", response.data, {
        root: true
      });
    } catch (err) {
      console.log(err);
    }
  },
  fetchEntityRecordsForTable: async (context, data) => {
    try {
      context.commit("entities/setEntityRecordsForTable", false, { root: true })
      context.commit("entities/setEntitiesDataErrors", {}, { root: true })
      let response = await axios.post(`/entities-data/entity/data`, data)
      context.commit("entities/setEntityRecordsForTable", response.data, { root: true })
    } catch (error) {
      context.commit("entities/setEntityRecordsForTable", false, { root: true })
      if (error.response) {
        const errors = await context.dispatch("entities/errorResponse", error.response, { root: true });
        context.commit("entities/setEntitiesDataErrors", errors, { root: true })
      }
    }
  },
  fetchEntitiesDocuments: async ({
    commit
  }, params) => {
    console.log(params)
    try {
      commit("setEntityDocumentsData", null);
      commit("setEntityDocumentsDataStatus", false)
      let response = await axios.get(`/entities/getDocuments/${params.entity_id}/${params.entity_data_id}`, {
        params
      });
      commit("setEntityDocumentsDataStatus", true)
      commit("setEntityDocumentsData", response.data.data, true)
    } catch (err) {
      console.log(err)
    }
  },
  fetchEntitiesDocumentsNotIncludingTemplates: async ({
    commit
  }, params) => {
    console.log(params)
    try {
      commit("setEntityDocumentsNotIncludingTemplatesData", null);
      commit("setEntityDocumentsDataNotIncludingTemplatesStatus", false)
      let response = await axios.get(`/entities/fetchEntityDocumentsNotIncludeTemplates/${params.entity_id}/${params.entity_data_id}`, {
        params
      });
      console.log(response.data)
      commit("setEntityDocumentsDataNotIncludingTemplatesStatus", true)
      commit("setEntityDocumentsNotIncludingTemplatesData", response.data, true)
    } catch (err) {
      console.log(err)
    }
  },
  getEmployeeDocumentsByEntityIdAndConfigurableDocumentId: async ({
    commit
  }, params) => {
    try {
      commit("setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdData", null);
      commit("setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdStatus", false)
      let response = await axios.get(`/entities/getEmployeeDocumentsByEntityIdAndConfigurableDocumentId/${params.entity_id}/${params.entity_data_id}`, {
        params
      });
      commit("setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdStatus", true)
      commit("setEmployeeDocumentsByEntityIdAndConfigurableDocumentIdData", response.data, true)
    } catch (err) {
      console.log(err)
    }
  },
  fetchTemplatesFieldsDataFromEntities: async ({
    commit
  }, params) => {
    try {
      commit("setTemplatesFieldsDataFromEntitiesData", null);
      commit("setTemplatesFieldsDataFromEntitiesStatus", false)
      let response = await axios.get(`/entities/TemplatesFieldsDataFromEntities/${params.entity_id}/${params.entity_data_id}`, {
        params
      });
      commit("setTemplatesFieldsDataFromEntitiesStatus", true)
      commit("setTemplatesFieldsDataFromEntitiesData", response.data.data, true)
    } catch (err) {
      console.log(err)
    }
  },
  fetchCompanyEntity: async ({
    commit
  }) => {
    try {
      commit("setCompanyEntity", null);
      let response = await axios.get(`/entities/getCompany/CompanyId`);
      commit("setCompanyEntity", response.data.data);
    } catch (err) {
      commit("setCompanyEntity", null);
      console.log(err);
    }
  },
  fetchCompanyEntityDetails: async ({
    commit
  }) => {
    try {
      commit("setCompanyEntityDetails", null);
      const response = await axios.get('/company-entity');
      commit("setCompanyEntityDetails", response.data.data);
    } catch (err) {
      console.log(err);
    }
  },
  addCompanyEntity: async ({
    commit
  }, params) => {
    try {
      commit("setEntityErrors", null);
      commit("setAddEntityToCompanyStatus", false);
      const response = await axios.post('/entities/createCompany', params);
      console.log("params", response)
      commit("setAddEntityToCompanyStatus", true);
    } catch (err) {
      commit("setEntityErrors", err);
      console.log(err);
    }
  },

  getEntitiesByTemplates: async ({
    commit
  }, params) => {
    try {
      commit("setEntityErrors", null)
      commit("setTemplateRelatedEntities", [])
      const response = await axios.post('/entities/check-entities', params)
      commit("setTemplateRelatedEntities", response.data.data)
    }
    catch (err) {
      commit("setEntityErrors", err)
      console.log(err)
    }
  },
  uploadDocumentToEntityProfile:async ({
    commit
  },params) => {
    try{
      commit("setDocumentUploadToEntityProfileStatus",false)
      commit("setDocumentUploadToEntityProfileData",[])
      const response = await axios.post('/entities/uploadDocuments', params)
      commit("setDocumentUploadToEntityProfileStatus",true)
      commit("setDocumentUploadToEntityProfileData", response.data.data,true)
    }catch(err){
      console.log(err)
    }
  },
  fetchCustomDashboardStats: async ({commit}, params) => {
    try{
      commit("setCustomDashboardStats", null);
      const response = await axios.post('/entities-data/count', params);
      commit("setCustomDashboardStats", response.data.data);
    }catch(err){
      commit("setCustomDashboardStats", null);
    }
  },
  fetchCustomDashboardPieStats: async ({commit}, params) => {
    try{
      commit("setCustomDashboardPieStats", null);
      const response = await axios.post('/entities-data/charts', params);
      commit("setCustomDashboardPieStats", response.data);
    }catch(err){
      commit("setCustomDashboardPieStats", null);
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