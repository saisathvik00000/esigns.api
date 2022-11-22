import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    allContactTypes: null,
    contactTypeCreateStatus: false,
    contactTypeUpdateStatus: false,
    contactTypeDeleteStatus: false,
    contactTypeErrors: null,
    newContactTypeData: null,
    contactTypeCreateData: null,
  };
};

const state = initialState();

const getters = {
  getAllContactTypes: (state) => state.allContactTypes,
  getContactTypeCreateStatus: (state) => state.contactTypeCreateStatus,
  getContactTypeUpdateStatus: (state) => state.contactTypeUpdateStatus,
  getContactTypeDeleteStatus: (state) => state.contactTypeDeleteStatus,
  getContactTypeCreateData: (state) => state.contactTypeCreateData,
  getContactTypeErrors: (state) => state.contactTypeErrors,
  getNewContactTypeData: (state) => state.newContactTypeData,
};

const mutations = {
  setAllContactTypes: (state, data) => {
    state.allContactTypes = data;
  },
  setContactTypeCreateStatus: (state, status) => {
    state.contactTypeCreateStatus = status;
  },
  setContactTypeUpdateStatus: (state, status) => {
    state.contactTypeUpdateStatus = status;
  },
  setContactTypeDeleteStatus: (state, status) => {
    state.contactTypeDeleteStatus = status;
  },
  setContactTypeErrors: (state, errors) => {
    state.contactTypeErrors = errors;
  },
  setNewContactTypeData: (state, data) => {
    state.newContactTypeData = data;
  },
  setContactTypeCreateData: (state, data) => {
    state.contactTypeCreateData = data;
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
    context.commit("contactTypes/resetData", null, {
      root: true
    });
  },
  //get contact type
  fetchContactType: async ({
    commit
  }, contact_type_id) => {
    try {
      commit('contactTypes/setContactTypeErrors', null, {
        root: true
      });
      commit('contactTypes/setNewContactTypeData', null, {
        root: true
      });

      commit('contactTypes/setContactTypeErrors', null, {
        root: true
      });
      commit('contactTypes/setNewContactTypeData', null, {
        root: true
      });
      const response = await axios.get(`/contact-types/${contact_type_id}`);
      commit('contactTypes/setNewContactTypeData', response.data.data, {
        root: true
      });
      commit('contactTypes/setNewContactTypeData', response.data.data, {
        root: true
      });
    } catch (error) {
      commit('contactTypes/setContactTypeErrors', null, {
        root: true
      });
    }
  },
  // getting all contacts
  fetchAllContactTypes: async ({
    commit
  }, params) => {
    try {
      commit("contactTypes/setContactTypeErrors", null, {
        root: true,
      });
      commit("contactTypes/setAllContactTypes", null, {
        root: true,
      });
      const response = await axios.get("/contact-types", {
        params,
      });
      commit("contactTypes/setAllContactTypes", response.data.data, {
        root: true,
      });
    } catch (error) {
      commit("contactTypes/setAllContactTypes", null, {
        root: true,
      });
    }
  },
  createContactType: async (context, params) => {
    try {
      context.commit("contactTypes/setContactTypeErrors", null, {
        root: true,
      });
      context.commit("contactTypes/setContactTypeCreateStatus", false, {
        root: true,
      });
      context.commit("contactTypes/setContactTypeCreateData", null, {
        root: true,
      });
      const response = await axios.post("/contact-types", params);
      context.commit("contactTypes/setContactTypeCreateData", response.data, {
        root: true,
      });
      context.commit("contactTypes/setContactTypeCreateStatus", true, {
        root: true,
      });
    } catch (err) {
      context.commit("contactTypes/setContactTypeCreateStatus", false, {
        root: true,
      });
      context.commit("contactTypes/setContactTypeCreateData", null, {
        root: true,
      });
      if (err.response) {
        let errordata = await context.dispatch(
          "errors/errorResponse",
          err.response, {
            root: true,
          }
        );
        context.commit("contactTypes/setContactTypeErrors", errordata, {
          root: true,
        });
      }
    }
  },

  fetchContactTypes: async ({
    commit
  }, params) => {
    try {
      commit("contactTypes/setContactTypeErrors", null, {
        root: true,
      });
      commit("contactTypes/setAllContactTypes", null, {
        root: true,
      });
      const response = await axios.get("/contact-types", {
        params,
      });
      commit("contactTypes/setAllContactTypes", response.data, {
        root: true,
      });
    } catch (error) {
      commit("contactTypes/setAllContactTypes", null, {
        root: true,
      });
    }
  },

  update: async ({
    commit,
    dispatch
  }, {
    id,
    name
  }) => {
    try {
      commit("setContactTypeErrors", null);
      commit("setContactTypeUpdateStatus", false);
      await axios.patch(`/contact-types/${id}/updating_contact`, {
        name,
      });
      //await axios.post(`/contact-types`,params)
      commit("setContactTypeUpdateStatus", true);
    } catch (err) {
      commit("setContactTypeUpdateStatus", false);
      if (err.response) {
        let errordata = await dispatch("errors/errorResponse", err.response, {
          root: true,
        });
        commit("setContactTypeErrors", errordata);
      }
    }
  },
  delete: async ({
    commit,
    dispatch
  }, id) => {
    try {
      commit("setContactTypeDeleteStatus", false);
      await axios.delete(`/contact-types/${id}`);
      commit("setContactTypeDeleteStatus", true);
    } catch (err) {
      commit("setContactTypeDeleteStatus", false);
      if (err.response) {
        let errordata = await dispatch("errors/errorResponse", err.response, {
          root: true,
        });
        commit("setContactTypeErrors", errordata);
      }
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