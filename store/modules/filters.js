import axios from "@/config/axios";

const initialState = () => {
  return {
    createNewFilter: null,
    deleteFilterStatus: false,
    updateFilterStatus: false,
    allEntityFilters: null,
    singleFilterData: null,
  };
};
const state = initialState();

const getters = {
  getCreateNewFilter: (state) => state.createNewFilter,
  getDeleteFilterStatus: (state) => state.deleteFilterStatus,
  getUpdateFilterStatus: (state) => state.updateFilterStatus,
  getAllEntityFilters: (state) => state.allEntityFilters,
  getSingleFilterData: (state) => state.singleFilterData
};
const mutations = {
  setCreateNewFilter: (state, data) => {
    state.createNewFilter = data;
  },
  setDeleteFilterStatus: (state, status) => {
    state.deleteFilterStatus = status;
  },
  setUpdateFilterStatus: (state, status) => {
    state.updateFilterStatus = status
  },
  setAllEntityFilters: (state, data) => {
    state.allEntityFilters = data
  },
  setSingleFilterData: (state, data) => {
    state.singleFilterData = data
  }
};
const actions = {
  fetchCreateNewFilter: async ({ commit }, params) => {
    try {
      commit("setCreateNewFilter", null);
      const response = await axios.post("entity-filter", params);
      commit("setCreateNewFilter", response.data.data);
    } catch (err) {
      commit("setCreateNewFilter", null);
    }
  },
  getFilterById: async ({ commit }, id) => {
    try {
      commit("setSingleFilterData", null);
      const response = await axios.get(`entity-filter/${id}`);
      commit("setSingleFilterData", response.data.data);
    } catch (err) {
      commit("setSingleFilterData", null);
    }
  },
  fetchAllEntityFilters: async ({ commit }, params) => {
    try {
      commit("setAllEntityFilters", null);
      const response = await axios.get(`entity-filter`, {params});
      commit("setAllEntityFilters", response.data.data);
    } catch (err) {
      commit("setAllEntityFilters", null);
    }
  },
  updateFilter: async ({ commit }, data) => {
    try {
      commit("setUpdateFilterStatus", null);
      console.log("paaa", data)
      await axios.post(`entity-filter/${data.id}`, data.params);
      commit("setUpdateFilterStatus", true);
    } catch (err) {
      commit("setUpdateFilterStatus", null);
    }
  },
  deleteFilter: async ({ commit }, id) => {
    try {
      commit("setDeleteFilterStatus", false);
      await axios.delete(`entity-filter/${id}`);
      commit("setDeleteFilterStatus", true);
    } catch (err) {
      commit("setDeleteFilterStatus", false);
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
