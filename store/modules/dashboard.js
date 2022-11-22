import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    notifications: null,
    notificationsUnReadCnt: 0,
    chats: null,
    chatsUnReadCnt: 0,
    allDocumentsDashboardStats: []
  };
};
const state = initialState();
const getters = {
  getAllDocumentsDashboardStats: state => state.allDocumentsDashboardStats,
  getNotifications: state => state.notifications,
  getNotificationsUnReadCnt: state => state.notificationsUnReadCnt,
  getChats: state => state.chats,
  getChatsUnReadCnt: state => state.chatsUnReadCnt,
};

const mutations = {
  setAllDocumentsDashboardStats: (state, data) => {
    state.allDocumentsDashboardStats = data
  },
  setNotifications(state, notifications) {
    state.notifications = notifications
  },
  setNotificationsUnReadCnt(state, notificationsUnReadCnt) {
    state.notificationsUnReadCnt = notificationsUnReadCnt
  },
  setChats(state, chats) {
    state.chats = chats
  },
  setChatsUnReadCnt(state, chatsUnReadCnt) {
    state.chatsUnReadCnt = chatsUnReadCnt
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
    context.commit("dashboard/resetData", null, {
      root: true
    });
  },
  fetchAllDocumentsDashboardStats: async ({
    commit
  }, params) => {
    try {
      commit('setAllDocumentsDashboardStats', 0);
      let response = await axios.get('/all-document-stats', {
        params
      });
      commit('setAllDocumentsDashboardStats', response.data.data);
    } catch {
      commit('setAllDocumentsDashboardStats', null)
    }
  },
  fetchNotifications: async ({
    commit
  }) => {
    // console.log('>>> fetchNotifications() called');
    try {
      commit('setNotifications', null);
      const response = await axios.get('all-documents/recent-activities');
      commit('setNotifications', response.data.data);
      commit('setNotificationsUnReadCnt', response.data.unread_count);
      //console.log("205------------205store console",response.data)
    } catch (err) {
      commit('setNotifications', null);
    }
  },
  fetchChats: async ({
    commit
  }) => {
    // console.log('>>> fetchChats() called');
    try {
      commit('setChats', null);
      const response = await axios.get('all-documents/recent-notes');
      commit('setChats', response.data.data);
      commit('setChatsUnReadCnt', response.data.unread_count);
    } catch (err) {
      commit('setChats', null);
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