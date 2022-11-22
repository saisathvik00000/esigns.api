import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    entityRelationships: [],
    currentEntityRelationships: [],
    currentEntityNestedRelationships: [],
    entityRelationshipAddStatus: false,
    entityRelationshipUpdateStatus: false,
    entityRelationshipDeleteStatus: false,
    entityRelationshipDataAssignStatus: false,
    entityRelationshipDataDetachStatus: false,
    parentEntityRelationshipData: {

    },
    allExistedEntityRelationships: [],
    parentEntityNestedRelationshipData: [],
    entityNestedRelationships: [],
    entityRelationshipDataAssignFeildsDataStatus: false
  };
};

const state = initialState();

const getters = {
  getEntityRelationships: state => state.entityRelationships,
  getEntityNestedRelationships: state => state.entityNestedRelationships,
  getCurrentEntityRelationships: state => state.currentEntityRelationships,
  getCurrentEntityNestedRelationships: state => state.currentEntityNestedRelationships,

  getEntityRelationshipAddStatus: state => state.entityRelationshipAddStatus,
  getEntityRelationshipUpdateStatus: state => state.entityRelationshipUpdateStatus,
  getEntityRelationshipDeleteStatus: state => state.entityRelationshipDeleteStatus,
  getEntityRelationshipDataAssignStatus: state => state.entityRelationshipDataAssignStatus,
  getEntityRelationshipDataDetachStatus: state => state.
    entityRelationshipDataDetachStatus,
  getParentEntityRelatiponshipData: state => state.parentEntityRelationshipData,

  getAllExistedEntityRelationships: state => state.allExistedEntityRelationships,
  getEntityRelationshipDataAssignFeildsDataStatus: state => state.entityRelationshipDataAssignFeildsDataStatus,
  getParentEntityNestedRelationshipData: state => state.parentEntityNestedRelationshipData,

};

const mutations = {

  setEntityRelationships: (state, data) => {
    state.entityRelationships = data
  },

  setEntityNestedRelationships: (state, data) => {
    state.entityNestedRelationships = data
  },

  setEntityRelationshipAddStatus: (state, data) => {
    state.entityRelationshipAddStatus = data
  },
  setEntityRelationshipUpdateStatus: (state, data) => {
    state.entityRelationshipUpdateStatus = data
  },

  setEntityRelationshipDeleteStatus: (state, data) => {
    state.entityRelationshipDeleteStatus = data
  },

  setCurrentEntityRelationships: (state, data) => {
    state.currentEntityRelationships = data
  },
  setCurrentEntityNestedRelationships: (state, data) => {
    state.currentEntityNestedRelationships = data
  },

  setEntityRelationshipDataAssignStatus: (state, data) => {
    state.entityRelationshipDataAssignStatus = data
  },

  setEntityRelationshipDataAssignFeildsDataStatus: (state, data) => {
    state.entityRelationshipDataAssignFeildsDataStatus = data
  },


  setEntityRelationshipDataDetachStatus: (state, data) => {
    state.entityRelationshipDataDetachStatus = data
  },

  setParentEntityRelationshipData: (state, data) => {
    state.parentEntityRelationshipData = data
  },

  setParentEntityNestedRelationshipData: (state, data) => {
    state.parentEntityNestedRelationshipData = data
  },

  setAllExistedEntityRelationships: (state, data) => {
    state.allExistedEntityRelationships = data
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
    context.commit("entityRelationships/resetData", null, {
      root: true
    });
  },


  updateCurrentEntityRelationships: ({
    commit
  }, params) => {
    try {
      commit('setCurrentEntityRelationships', params);
    }
    catch (err) {
      console.error(err)
    }
  },

  updateCurrentEntityNestedRelationships: ({
    commit
  }, params) => {
    try {
      commit('setCurrentEntityNestedRelationships', params);
    }
    catch (err) {
      console.error(err)
    }
  },


  fetchEntityRelationships: async ({
    commit,
    dispatch
  }, params) => {
    try {
      let URL = `/entities/${params.entity_id}/relationships`;
      commit('setEntityRelationships', []);
      let res = await axios.get(URL);
      commit('setEntityRelationships', res.data.data);

    } catch (err) {
      console.log(err)
      commit('setEntityRelationships', []);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },


  fetchEntityNestedRelationships: async ({
    commit,
    dispatch
  }, params) => {
    try {
      let URL = `/entities/${params.entity_id}/nested-relationships`;
      commit('setEntityNestedRelationships', []);
      let res = await axios.get(URL);
      commit('setEntityNestedRelationships', res.data.data);

    } catch (err) {
      console.log(err)
      commit('setEntityNestedRelationships', []);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },




  addEntityRelationship: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships`;

      commit('setEntityRelationshipAddStatus', false);

      await axios.post(URL, params);

      commit('setEntityRelationshipAddStatus', true);

    } catch (err) {

      console.log(err)
      commit('setEntityRelationshipAddStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },




  updateEntityRelationship: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.entity_id}/relationships`;

      commit('setEntityRelationshipUpdateStatus', false);
      await axios.post(URL, params);

      commit('setEntityRelationshipUpdateStatus', true);
    } catch (err) {
      commit('setEntityRelationshipUpdateStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },



  deleteEntityRelationship: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships/${params.entity_relationship_id}`;

      commit('setEntityRelationshipDeleteStatus', false);

      await axios.delete(URL, params);

      commit('setEntityRelationshipDeleteStatus', true);

    } catch (err) {
      commit('setEntityRelationshipDeleteStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  assignEntityRelationshipData: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships-data/assign`;

      commit('setEntityRelationshipDataAssignStatus', false);

      await axios.post(URL, params);

      commit('setEntityRelationshipDataAssignStatus', true);

    } catch (err) {

      console.log(err)
      commit('setEntityRelationshipDataAssignStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  assignFieldsEntityRelationshipData: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships-data/assign-fields-data`;

      commit('setEntityRelationshipDataAssignFeildsDataStatus', false);

      console.log({ URL })
      await axios.post(URL, params);

      commit('setEntityRelationshipDataAssignFeildsDataStatus', true);

    } catch (err) {

      console.log(err)
      commit('setEntityRelationshipDataAssignFeildsDataStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  detachEntityRelationshipData: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships-data/detach`;

      commit('setEntityRelationshipDataDetachStatus', false);
      await axios.post(URL, params);
      commit('setEntityRelationshipDataDetachStatus', true);

    } catch (err) {

      console.log(err)
      commit('setEntityRelationshipDataDetachStatus', false);
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  fetchParentEntityRelationshipData: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships-data/${params.parent_entity_data_id}/${params.child_entity_id}`;

      commit('setParentEntityRelationshipData', {});

      let response = await axios.get(URL, params);

      commit('setParentEntityRelationshipData', response.data.data);

    } catch (err) {

      console.log(err)
      commit('setParentEntityRelationshipData', {});
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },

  fetchParentEntityNestedRelationshipData: async ({
    commit,
    dispatch
  }, params) => {
    try {

      let URL = `/entities/${params.parent_entity_id}/relationships-data/${params.parent_entity_data_id}/${params.child_entity_id}/${params.nested_child_entity_id}`;

      commit('setParentEntityNestedRelationshipData', {});

      let response = await axios.get(URL, params);

      commit('setParentEntityNestedRelationshipData', response.data.data);

    } catch (err) {

      console.log(err)
      commit('setParentEntityNestedRelationshipData', {});
      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  },
  fetchAllExistedRelationships: async ({
    commit,
    dispatch
  }, params) => {
    try {
      commit('setAllExistedEntityRelationships', [])
      let response = await axios.post('/entities/entity-relationships/existed', params)

      commit('setAllExistedEntityRelationships', response.data.data)

    }
    catch (err) {

      commit('setAllExistedEntityRelationships', [])

      await dispatch('errors/errorResponse', err.response, {
        root: true
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};