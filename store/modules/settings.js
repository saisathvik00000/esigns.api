import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    userSettings: null,
    updateUserDocumentSettings: false,
    userNotifications: null,
    updateUserNotificationStatus: false,
    applicationSettings: null,
    updateApplicationSettingsStatus: false,
    defaultSettings: null,
    userDashboardStatistics: {},
    updateUserDashboardStaticsStatus: false
  };
};

const state = initialState();

const getters = {
  getUserSettings: state => state.userSettings,
  getUpdateUserDocumentSettings: state => state.updateUserDocumentSettings,
  getUserNotifications: state => state.userNotifications,
  getUpdateUserNotificationsStatus: state => state.updateUserNotificationStatus,
  getApplicationSettings: state => state.applicationSettings,
  getUpdateApplicationSettingsStatus: state => state.updateApplicationSettingsStatus,
  getDefaultSettings: state => state.defaultSettings,
  getUserDashboardStastics: state => state.userDashboardStatistics,
  getUpdateUserDashboardStaticsStatus: state => state.updateUserDashboardStaticsStatus,
  getClientKeys: state => state.clientKeys,
  getGenerateClientKeys: state => state.generateclientKeys,
  getReGenerateClientKeys: state => state.RegenerateclientKeys,
};

const mutations = {
  setUserSettings: (state, settings) => {
    state.userSettings = settings
  },
  setUpdateUserDocumentSettings: (state, status) => {
    state.updateUserDocumentSettings = status;
  },
  setUserNotifications: (state, data) => {
    state.userNotifications = data;
  },
  setUpdateUserNotificationsStatus: (state, status) => {
    state.updateUserNotificationStatus = status;
  },
  setApplicationSettings: (state, data) => {
    state.applicationSettings = data;
  },
  setUpdateApplicationSettingsStatus: (state, status) => {
    state.updateApplicationSettingsStatus = status;
  },
  setDefaultSettings: (state, settings) => {
    state.defaultSettings = settings;
  },
  setUserDashboardStastics: (state, settings) => {
    state.userDashboardStatistics = settings;
  },
  setUpdateUserDashboardStaticsStatus: (state, status) => {
    state.updateUserDashboardStaticsStatus = status;
  },
  setClientKeys: (state, data) => {
    state.clientKeys = data;
  },

  setGenerateClientKeys: (state, data) => {
    state.generateclientKeys = data;
  },
  setReGenerateClientKeys: (state, data) => {
    state.RegenerateclientKeys = data;
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
    context.commit("settings/resetData", null, {
      root: true
    });
  },
  // user doc expire settings
  fetchUserDocumentSettings: async ({
    commit
  }, params) => {
    try {
      commit('setUserSettings', null);
      const response = await axios.get('expirations-reminders', {
        params
      })
      commit('setUserSettings', response.data.data);
    } catch (err) {
      commit('setUserSettings', null);
    }
  },
  updateUserDocumentSettings: async ({
    commit,
    dispatch
  }, params) => {
    try {
      commit('setUpdateUserDocumentSettings', false);
      await axios.post('expirations-reminders', params);
      commit('setUpdateUserDocumentSettings', true);
    } catch (err) {
      commit('setUpdateUserDocumentSettings', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },
  // notify user on performing actions on doc
  fetchUserNotifications: async ({
    commit
  }) => {
    try {
      commit('setUserNotifications', null);
      const response = await axios.get('notifications');
      commit('setUserNotifications', response.data);
    } catch (err) {
      commit('setUserNotifications', null);
    }
  },
  updateUserNotifications: async ({
    commit,
    dispatch
  }, params) => {
    try {
      commit('setUpdateUserNotificationsStatus', false);
      await axios.post('notifications', params);
      commit('setUpdateUserNotificationsStatus', true);
    } catch (err) {
      commit('setUpdateUserNotificationsStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },
  // notify user on performing actions on doc
  fetchApplicationSettings: async ({
    commit
  }) => {
    try {
      commit('setApplicationSettings', null);
      const response = await axios.get('application-settings');
      commit('setApplicationSettings', response.data);
    } catch (err) {
      commit('setApplicationSettings', null);
    }
  },
  updateApplicationSettings: async ({
    commit,
    dispatch
  }, params) => {
    try {
      commit('setUpdateApplicationSettingsStatus', false);
      await axios.post('application-settings', params);
      if (params.application_settings.date) {
        commit('auth/setDefaultDateFormat', params.application_settings.date, {
          root: true
        })
      }
      commit('setUpdateApplicationSettingsStatus', true);
    } catch (err) {
      commit('setUpdateApplicationSettingsStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  fetchDefaultSettings: async ({
    commit
  }) => {
    try {
      commit('setDefaultSettings', null);
      const response = await axios.get('/document-settings/default');
      commit('setDefaultSettings', response.data.data);
      console.log(response.data.data);
    } catch (err) {
      commit('setDefaultSettings', null);
    }
  },
  fetchUserDashboardStatics: async ({
    commit
  }) => {
    try {
      commit('setUserDashboardStastics', null);
      const response = await axios.get('/dashboard-stats-settings')
      commit('setUserDashboardStastics', response.data);
    } catch (err) {
      commit('setUserDashboardStastics', null)
    }
  },
  updateUserDashboardStatics: async ({
    commit,
    dispatch
  }, params) => {
    try {
      commit('setUpdateUserDashboardStaticsStatus', false);
      await axios.post('/dashboard-stats-settings', params);
      commit('setUpdateUserDashboardStaticsStatus', true);
    } catch (err) {
      commit('setUpdateUserDashboardStaticsStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },
// for client id token

fetchClientKeys: async ({
  commit
}) => {
  try {
    commit('setClientKeys', null);
    const response = await axios.get('Get-keys');
    commit('setClientKeys', response.data);
  } catch (err) {
    commit('setClientKeys', null);
  }
},

generateClientKeys: async ({
  commit
}) => {
  try {
    commit('setGenerateClientKeys', null);
    const response = await axios.get('generate-keys');
    commit('setGenerateClientKeys', response.data);
  } catch (err) {
    commit('setGenerateClientKeys', null);
  }
},


RegenerateClientKeys: async ({
  commit
}) => {
  try {
    commit('setReGenerateClientKeys', null);
    const response = await axios.get('regenerate-keys');
    commit('setReGenerateClientKeys', response.data);
  } catch (err) {
    commit('setReGenerateClientKeys', null);
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