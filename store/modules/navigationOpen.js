// initial state
const state = {
  isOpen: true,
  isCollapse: true,
  routerValue: true,
  offCanvas: false,
  isMobile: false,
  isRSOpen: false,
  currentMenu: {}
};

const getters = {
  getIsOpen: state => state.isOpen,
  getIsCollapse: state => state.isCollapse,
  getRouterValue: state => state.routerValue,
  getOffCanvas: state => state.offCanvas,
  getIsMobile: state => state.isMobile,
  getIsRSOpen: state => state.isRSOpen,
  getCurrentMenu: state => state.currentMenu
};

const mutations = {
  setIsOpen(state, isOpen) {
    state.isOpen = isOpen;
  },
  setIsCollapse(state, isCollapse) {
    state.isCollapse = isCollapse;
  },
  setRouterValue(state, routerValue) {
    state.routerValue = routerValue;
  },
  setOffCanvas(state, offCanvas) {
    state.offCanvas = offCanvas;
  },
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },
  setIsRSOpen(state, isRSOpen) {
    state.isRSOpen = isRSOpen;
  },

  resetIsOpen(state) {
    state.isOpen = false;
  },
  resetIsCollapse(state) {
    state.isCollapse = false;
  },
  resetRouterValue(state) {
    state.routerValue = false;
  },
  resetOffCanvas(state) {
    state.offCanvas = false;
  },
  resetIsMobile(state) {
    state.isMobile = false;
  },
  resetIsRSOpen(state) {
    state.isRSOpen = false;
  },
  setCurrentMenu(state, data){
    state.currentMenu = data
  },
};

const actions = {
  editNavigation: async ({commit}, isOpen) => {
    try {
      commit("setIsOpen", isOpen);
    } catch (error) {
      // console.log(error)
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