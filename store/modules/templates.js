import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    renameTemplateStatus: false,
    updateCompanyDocumentStatus: false,
    duplicateTemplateStatus: false,
    shareTemplateStatus: false,
  };
}
const state = initialState();

const getters = {
  getRenameTemplateStatus: state => state.renameTemplateStatus,
  getDuplicateTemplateStatus: state => state.duplicateTemplateStatus,
  getShareTemplateStatus: state => state.shareTemplateStatus,
  getUpdateCompanyDocumentStatus: state => state.updateCompanyDocumentUpdateStatus
}

const mutations = {
  setShareTemplateStatus(state, status) {
    state.shareTemplateStatus = status
  },
  setRenameTemplateStatus(state, status) {
    state.renameTemplateStatus = status;
  },
  setUpdateCompanyDocumentStatus(state, status) {
    state.updateCompanyDocumentStatus = status;
  },
  setDuplicateTemplateStatus(state, status) {
    state.duplicateTemplateStatus = status;
  },
  resetData: state => {
    const initial = initialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },
}

const actions = {
  reset: function (context) {
    context.commit("templates/resetData", null, {
      root: true
    });
  },
  shareTemplatesToContactUsers: async ({
    commit
  }, params) => {
    try {
      commit('setShareTemplateStatus', false);
      await axios.post('share-template', params)
      commit('setShareTemplateStatus', true);
    } catch (err) {
      commit('setShareTemplateStatus', false);
    }
  },
  renameTemplate: async ({
    commit
  }, {
    template_id,
    configId,
    name
  }) => {
    try {
      commit('setRenameTemplateStatus', false)
      await axios.post(`document-templates/${template_id}/rename`, {
        name,
        configId
      })
      commit('setRenameTemplateStatus', true)
    } catch (err) {
      commit('setRenameTemplateStatus', false)
    }
  },
  updateCompanyDocumentStatus: async ({
    commit
  }, {
    template_id
  }, params) => {
    try {
      commit('setUpdateCompanyDocumentStatus', false)
      await axios.put(`document-templates/${template_id}`, params)
      commit('setUpdateCompanyDocumentStatus', true)
    } catch (err) {
      commit('setUpdateCompanyDocumentStatus', false)
    }
  },
  duplicateTemplate: async ({
    commit,
    dispatch
  }, {
    template_id,
    name,
    isShareTemplate
  }) => {
    try {
      commit('errors/reset', null, {
        root: true
      })
      commit('setDuplicateTemplateStatus', false)
      await axios.post(`document-templates/${template_id}/duplicate`, {
        name,
        isShareTemplate
      })
      commit('setDuplicateTemplateStatus', true)
    } catch (err) {
      commit('setDuplicateTemplateStatus', false)
      if (err.response) {
        await dispatch('errors/errorResponse', err.response, {
          root: true
        });
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};