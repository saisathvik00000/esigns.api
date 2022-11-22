import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    allDocumnets: null,
  };
};

const state = initialState();

const getters = {
  getAllDocuments: state => state.allDocumnets,
};

const mutations = {
  setAllDocuments: (state, data) => {
    state.allDocumnets = data
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
    context.commit("requestDocuments/resetData", null, {
      root: true
    });
  },
  // getting all request documents
  fetchAllRequestDocuments: async (context, params) => {
    try {
      // let urlParam = params.document_status && params.document_status != 'all-documents' ? 'all-requestDocuments/' + params.document_status : 'documents';
      let urlParam = 'request-documents-list/' + params.card_type;
      delete params.card_type;
      // delete params.document_status;
      context.commit('requestDocuments/setAllDocuments', null, {
        root: true
      });
      let response = await axios.get(urlParam, {
        params
      });
      context.commit('requestDocuments/setAllDocuments', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('requestDocuments/setAllDocuments', null, {
        root: true
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};