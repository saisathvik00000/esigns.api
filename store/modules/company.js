import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    companyDetails: null,
    updateCompany: null,
    companyLogo: null,
    listOfCompanies: [],
  };
};

const state = initialState();

const getters = {
  getCompanyDetails: state => state.companyDetails,
  getUpdateCompany: state => state.updateCompany,
  getCompanyLogo: state => state.companyLogo,
  getListOfCompanies: state => state.listOfCompanies,
};

const mutations = {
  setCompanyDetails: (state, data) => {
    state.companyDetails = data
  },
  setUpdateCompany: (state, data) => {
    state.updateCompany = data
  },
  setCompanyLogo: (state, data) => {
    state.companyLogo = data
  },
  setListOfCompanies: (state, data) => {
    state.listOfCompanies = data
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
    context.commit("company/resetData", null, {
      root: true
    });
  },
  fetchCompany: async ({
    commit
  }, params) => {
    try {
      commit('company/setCompanyDetails', null, {
        root: true
      })
      commit('company/setCompanyDetails', null, {
        root: true
      });
      const response = await axios.get('/company/' + params);
      commit('company/setCompanyDetails', response.data.data, {
        root: true
      });
    } catch (error) {
      commit('company/setCompanyDetails', null, {
        root: true
      });
    }
  },
  updateCompany: async (context, params) => {
    try {
      context.commit('company/setUpdateCompany', null, {
        root: true
      })
      context.commit('company/setUpdateCompany', null, {
        root: true
      });
      context.commit('errors/errorResponse', null, {
        root: true
      });
      const response = await axios.patch('/company', params);
      context.commit('company/setUpdateCompany', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('company/setUpdateCompany', error.data, {
        root: true
      });
      await context.dispatch("errors/errorResponse", error.response, {
        root: true
      });
    }
  },
  updateCompanyLogo: async (context, params) => {
    try {
      context.commit('company/setCompanyLogo', null, {
        root: true
      })
      context.commit('company/setCompanyLogo', null, {
        root: true
      });
      const response = await axios.post('/company/logo', params);
      context.commit('company/setCompanyLogo', response.data.data, {
        root: true
      });
    } catch (error) {
      context.commit('company/setCompanyLogo', error.data, {
        root: true
      });
      await context.dispatch("errors/errorResponse", error.response, {
        root: true
      });
    }
  },
  fetchListOfCompanies: async ({
    commit
  }, params) => {
    try {
      commit('company/setListOfCompanies', null, {
        root: true
      })
      commit('company/setListOfCompanies', null, {
        root: true
      });
      // const response = await axios.get('/accountNames');
      const response = await axios.get(`/entityDataNames/${params.contactTypeName}`);
      commit('company/setListOfCompanies', response.data.data, {
        root: true
      });
    } catch (error) {
      commit('company/setListOfCompanies', null, {
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