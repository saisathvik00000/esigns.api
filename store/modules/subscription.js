import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    allPlans: null,
    allFeatures: null,
    plansList: [],
    featuresList: [],
    singlePayment: null,
    singlePaymentDetails: null,
    stripeProductList: [],
    stripeProducts: null,
    stripePlans: null,
    customer: null,
    subscribe: null,
    userTrasactions: [],
    promoCode: null,
    promoStatus: null
  };
};

const state = initialState();

const getters = {
  getAllPlans: state => state.allPlans,
  getAllFeatures: state => state.allFeatures,
  getPlansList: state => state.plansList,
  getFeaturesList: state => state.featuresList,
  getSinglePayment: state => state.singlePayment,
  getSinglePaymentDetails: state => state.singlePaymentDetails,
  getStripeProductList: state => state.stripeProductList,
  getStripeProducts: state => state.stripeProducts,
  getStripePlans: state => state.stripePlans,
  getCustomer: state => state.customer,
  getSubscribe: state => state.subscribe,
  getUserTrasactions: state => state.userTrasactions,
  getPromoCode: state => state.promoCode,
  getPromoStatus: state => state.promoStatus
};

const mutations = {
  setAllPlans: (state, data) => {
    state.allPlans = data
  },
  setAllFeatures: (state, data) => {
    state.allFeatures = data
  },
  setPlansList: (state, data) => {
    state.plansList = data
  },
  setFeaturesList: (state, data) => {
    state.featuresList = data
  },
  setSinglePayment: (state, data) => {
    state.singlePayment = data
  },
  setSinglePaymentDetails: (state, data) => {
    state.singlePaymentDetails = data
  },
  setStripeProductList: (state, data) => {
    state.stripeProductList = data
  },
  setStripeProducts: (state, data) => {
    state.stripeProducts = data
  },
  setStripePlans: (state, data) => {
    state.stripePlans = data
  },
  setCustomer: (state, data) => {
    state.customer = data
  },
  setSubscribe: (state, data) => {
    state.subscribe = data
  },
  setUserTrasactions: (state, data) => {
    state.userTrasactions = data
  },
  setPromoCode: (state, data) => {
    state.promoCode = data
  },
  setPromoStatus: (state, data) => {
    state.promoStatus = data
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
    context.commit("subscription/resetData", null, {
      root: true
    });
  },
  fetchAllPlans: async (context) => {
    try {
      context.commit('subscription/setAllPlans', null, {
        root: true
      });
      let response = await axios.get('/plans');
      context.commit('subscription/setAllPlans', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setAllPlans', null, {
        root: true
      });
    }
  },
  fetchAllFeatures: async (context) => {
    try {
      context.commit('subscription/setAllFeatures', null, {
        root: true
      });
      let response = await axios.get('/features');
      context.commit('subscription/setAllFeatures', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setAllFeatures', null, {
        root: true
      });
    }
  },
  fetchFeaturesList: async (context, params) => {
    try {
      context.commit('subscription/setFeaturesList', null, {
        root: true
      });
      let response = await axios.get('/features/' + params);
      context.commit('subscription/setFeaturesList', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setFeaturesList', null, {
        root: true
      });
    }
  },
  fetchPlansList: async (context, params) => {
    try {
      context.commit('subscription/setPlansList', null, {
        root: true
      });
      let response = await axios.get('/plans/' + params);
      context.commit('subscription/setPlansList', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setPlansList', null, {
        root: true
      });
    }
  },
  buyPackage: async (context, params) => {
    try {
      context.commit('subscription/setSinglePayment', null, {
        root: true
      });
      let response = await axios.post('/charge', params);
      context.commit('subscription/setSinglePayment', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setSinglePayment', null, {
        root: true
      });
    }
  },
  getSinglePaymentDetails: async (context, params) => {
    try {
      context.commit('subscription/setSinglePaymentDetails', null, {
        root: true
      });
      let response = await axios.get('/charge/' + params);
      context.commit('subscription/setSinglePaymentDetails', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setSinglePaymentDetails', null, {
        root: true
      });
    }
  },
  getStripeProductsPlans: async (context) => {
    try {
      context.commit('subscription/setStripeProductList', null, {
        root: true
      });
      let response = await axios.get('/getAllProductsAndPlans');
      context.commit('subscription/setStripeProductList', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setStripeProductList', null, {
        root: true
      });
    }
  },
  createProduct: async (context, params) => {
    try {
      context.commit('subscription/setStripeProducts', null, {
        root: true
      });
      let response = await axios.post('/createProduct', params);
      context.commit('subscription/setStripeProducts', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setStripeProducts', null, {
        root: true
      });
    }
  },
  createPlan: async (context, params) => {
    try {
      context.commit('subscription/setStripePlans', null, {
        root: true
      });
      let response = await axios.post('/createPlan', params);
      context.commit('subscription/setStripePlans', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setStripePlans', null, {
        root: true
      });
    }
  },
  createCustomer: async (context, params) => {
    try {
      context.commit('subscription/setCustomer', null, {
        root: true
      });
      let response = await axios.post('/createCustomer', params);
      context.commit('subscription/setCustomer', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setCustomer', null, {
        root: true
      });
    }
  },
  subscribe: async (context, params) => {
    try {
      context.commit('subscription/setSubscribe', null, {
        root: true
      });
      let response = await axios.post('/subscribe', params);
      context.commit('subscription/setSubscribe', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setSubscribe', null, {
        root: true
      });
    }
  },
  userTrasactions: async (context) => {
    try {
      context.commit('subscription/setUserTrasactions', null, {
        root: true
      });
      let response = await axios.get('/userTrasactions');
      context.commit('subscription/setUserTrasactions', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setUserTrasactions', null, {
        root: true
      });
    }
  },
  validatePromoCode: async (context, params) => {
    try {
      context.commit('subscription/setPromoCode', null, {
        root: true
      });
      let response = await axios.put('/promoCodeRedeem/validate/' + params);
      context.commit('subscription/setPromoCode', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setPromoCode', null, {
        root: true
      });
    }
  },
  updatePromoStatus: async (context, params) => {
    try {
      context.commit('subscription/setPromoStatus', null, {
        root: true
      });
      let response = await axios.put('/promoCodeRedeem/validateStatus/' + params.id, params);
      context.commit('subscription/setPromoStatus', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('subscription/setPromoStatus', null, {
        root: true
      });
    }
  }
};

// /userTrasactions
// /transaction

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};