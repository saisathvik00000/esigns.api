import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    allDocumentNotes: null,
    documentNotesAddingStatus: false,
    documentNotesUpdateStatus: false,
  };
};

const state = initialState();

const getters = {
  getAllDocumentNotes: state => state.allDocumentNotes,
  getDocumentNotesAddingStatus: state => state.documentNotesAddingStatus,
  getDocumentNotesUpdateStatus: state => state.documentNotesUpdateStatus,
};

const mutations = {
  setAllDocumentNotes: (state, data) => {
    state.allDocumentNotes = data
  },
  setDocumentNotesAddingStatus: (state, status) => {
    state.documentNotesAddingStatus = status
  },
  setDocumentNotesUpdateStatus: (state, status) => {
    state.documentNotesUpdateStatus = status
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
    context.commit("documentNotes/resetData", null, {
      root: true
    });
  },
  // getting all document notes
  fetchAllDocumentNotes: async (context, params) => {
    try {
      context.commit('documentNotes/setAllDocumentNotes', null, {
        root: true
      });
      if (params.employee_document_id) {
        let response = await axios.get(`/documents/${params.employee_document_id}/notes`, {
          params
        });
        context.commit('documentNotes/setAllDocumentNotes', response.data, {
          root: true
        });
      }
    } catch (error) {
      context.commit('documentNotes/setAllDocumentNotes', null, {
        root: true
      });
    }
  },
  addDocumentNotes: async (context, params) => {
    try {
      context.commit('documentNotes/setDocumentNotesAddingStatus', null, {
        root: true
      });
      let response = await axios.post(`/documents/${params.employee_document_id}/notes`, params);
      context.commit('documentNotes/setDocumentNotesAddingStatus', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('documentNotes/setDocumentNotesAddingStatus', null, {
        root: true
      });
    }
  },
  updateDocumentNote: async (context, params) => {
    try {
      console.log(params)
      context.commit('documentNotes/setDocumentNotesUpdateStatus', false, {
        root: true
      });
      await axios.patch(`/documents/${params.employee_document_id}/notes/${params.note_id}`, params.data);
      context.commit('documentNotes/setDocumentNotesUpdateStatus', true, {
        root: true
      });
    } catch (error) {
      context.commit('documentNotes/setDocumentNotesUpdateStatus', false, {
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