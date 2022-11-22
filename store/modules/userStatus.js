import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    notificationCountUnOpened: 0,
    chatCountUnOpened: 0,
  };
};

const state = initialState();

const getters = {
  getNotificationCountUnOpened: state => state.notificationCountUnOpened,
  getChatCountUnOpened: state => state.chatCountUnOpened,
};

const mutations = {
  setNotificationCountUnOpened: (state, data) => {
    state.notificationCountUnOpened = data
  },
  setChatCountUnOpened: (state, data) => {
    state.chatCountUnOpened = data
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
    context.commit("userStatus/resetData", null, {
      root: true
    });
  },
  fetchUserStatus: async ({
    commit
  }) => {
    let response = null;
    try {
      commit('setNotificationCountUnOpened', 0);
      commit('setChatCountUnOpened', 0);
      response = await axios.get('user-status')
      commit('setNotificationCountUnOpened', response.data.data.notificationCountUnOpened);
      commit('setChatCountUnOpened', response.data.data.chatCountUnOpened);
    } catch (err) {
      // commit('setNotificationCountUnOpened', 0);
      // commit('setChatCountUnOpened', 0);
    }
  },
  updateUserStatus: async ({
    commit,
    dispatch
  }, params) => {
    try {
      if (params.notification_last_open_date && params.notification_last_open_date == "1") {
        commit('setNotificationCountUnOpened', 0);
      }
      if (params.chat_last_open_date && params.chat_last_open_date == "1") {
        commit('setChatCountUnOpened', 0);
      }
      await axios.post('user-status', params);
    } catch (err) {
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },
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