import axios from "@/config/axios";

const initialState = () => {
  return {
    createNewDashboard: null,
    allDashboards: [],
    deleteDashboardStatus: false,
    updateDashboardStatus: false,
    allEntityFilters: null,
    singleDashboardData: null,
    userDashboardsList: null
  };
};
const state = initialState();

const getters = {
  getCreateNewDashboard: (state) => state.createNewDashboard,
  getAllDashboards: (state) => state.allDashboards,
  getDeleteDashboardStatus: (state) => state.deleteDashboardStatus,
  getUpdateDashboardStatus: (state) => state.updateDashboardStatus,
  getAllEntityFilters: (state) => state.allEntityFilters,
  getSingleDashboardData: (state) => state.singleDashboardData,
  getUserDashboardsList: (state) => state.userDashboardsList
};
const mutations = {
  setCreateNewDashboard: (state, data) => {
    state.createNewDashboard = data;
  },
  setAllDashboards: (state, data) => {
    state.allDashboards = data
  },
  setDeleteDashboardStatus: (state, status) => {
    state.deleteDashboardStatus = status;
  },
  setUpdateDashboardStatus: (state, status) => {
    state.updateDashboardStatus = status
  },
  setAllEntityFilters: (state, data) => {
    state.allEntityFilters = data
  },
  setSingleDashboardData: (state, data) => {
    state.singleDashboardData = data
  },
  setUserDashboardsList: (state, data) => {
    state.userDashboardsList = data
  }
};
const actions = {
  fetchCreateNewDashboard: async ({ commit }, params) => {
    try {
      commit("setCreateNewDashboard", null);
      const response = await axios.post("custom-dashboard/create", params);
      commit("setCreateNewDashboard", response.data.data);
    } catch (err) {
      commit("setCreateNewDashboard", null);
    }
  },

  fecthAllDashboards: async ({commit}, params) => {
    try {
        commit("setAllDashboards", null);
        const response = await axios.get(`custom-dashboard`, {params});
        commit("setAllDashboards", response.data);
      } catch (err) {
        commit("setAllDashboards", null);
      }
  },

  getDashboardById: async ({ commit }, id) => {
    try {
      commit("setSingleDashboardData", null);
      const response = await axios.get(`custom-dashboard/${id}`);
      commit("setSingleDashboardData", response.data.data);
    } catch (err) {
      commit("setSingleDashboardData", null);
    }
  },

  updateDashboard: async ({ commit }, data) => {
    try {
      commit("setUpdateDashboardStatus", null);
      console.log("paaa", data)
      await axios.post(`custom-dashboard/${data.id}`, data.params);
      commit("setUpdateDashboardStatus", true);
    } catch (err) {
      commit("setUpdateDashboardStatus", null);
    }
  },

  fetchUserDashboardsList: async ({ commit }, id) => {
    try {
        commit("setUserDashboardsList", null);
        const response = await axios.get(`custom-dashboard/user-type/${id}`);
        commit("setUserDashboardsList", response.data.data);
      } catch (err) {
        commit("setUserDashboardsList", null);
      }
  },

  fetchAllEntityFilters: async ({ commit }, params) => {
    try {
      commit("setAllEntityFilters", null);
      const response = await axios.get(`custom-dashboard`, {params});
      commit("setAllEntityFilters", response.data.data);
    } catch (err) {
      commit("setAllEntityFilters", null);
    }
  },
  deleteDashboard: async ({ commit }, id) => {
    try {
      commit("setDeleteDashboardStatus", false);
      await axios.delete(`custom-dashboard/${id}`);
      commit("setDeleteDashboardStatus", true);
    } catch (err) {
      commit("setDeleteDashboardStatus", false);
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
