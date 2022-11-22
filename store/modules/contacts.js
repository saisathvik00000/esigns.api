import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    allContacts: null,
    createContactStatus: false,
    contactErrors: null,
    createContactData: null,
    contactDeleteStatus: false,
    newContactData: null,
    updateContactStatus: false,
    contact: null,
    contactUser: null,
    checkContactDataWithEmail: null,
    updateDocumentPrimaryDetailsStatus: false,
    checkContactExist: {},
    createContactForFormbuilderData: {}
  };
};

const state = initialState();

const getters = {
  getAllContacts: state => state.allContacts,
  getCreateContactStatus: state => state.createContactStatus,
  getContactErrors: state => state.contactErrors,
  getCreateContactData: state => state.createContactData,
  getContactDeleteStatus: state => state.contactDeleteStatus,
  getUpdateContactStatus: state => state.updateContactStatus,
  getContact: state => state.contact,
  getContactUser: state => state.contactUser,
  getCheckContactDataWithEmail: state => state.checkContactDataWithEmail,
  getUpdateDocumentPrimaryDetailsStatus: state => state.updateDocumentPrimaryDetailsStatus,
  getCheckContactExist: state => state.checkContactExist,
  getCreateContactForFormbuilderData: state => state.createContactForFormbuilderData
};

const mutations = {
  setContactUser: (state, data) => {
    state.contactUser = data
  },
  setAllContacts: (state, data) => {
    state.allContacts = data
  },
  setCreateContactStatus: (state, status) => {
    state.createContactStatus = status
  },
  setCreateContactData: (state, data) => {
    state.createContactData = data
  },
  setContactErrors: (state, errors) => {
    state.contactErrors = errors
  },
  setContactDeleteStatus: (state, status) => {
    state.contactDeleteStatus = status
  },
  setUpdateContactStatus(state, status) {
    state.updateContactStatus = status;
  },
  setContact(state, contact) {
    state.contact = contact;
  },
  setCheckContactDataWithEmail(state, data) {
    state.checkContactDataWithEmail = data
  },
  setUpdateDocumentPrimaryDetailsStatus(state, status) {
    state.updateDocumentPrimaryDetailsStatus = status
  },
  setCheckContactExist(state, data) {
    state.checkContactExist = data
  },
  setCreateContactForFormbuilderData(state, data) {
    state.createContactForFormbuilderData = data
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
    context.commit("contacts/resetData", null, {
      root: true
    });
  },
  fetchContactUser: async (context) => {
    try {
      context.commit('contacts/setContactUser', null, {
        root: true
      });
      // let response = await axios.get('/documents/users', {params});
      let response = await axios.get('/contact-users');
      context.commit('contacts/setContactUser', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('contacts/setContactUser', null, {
        root: true
      });
    }
  },
  fetchAllContacts: async (context, params) => {
    try {
      context.commit('contacts/setAllContacts', null, {
        root: true
      });
      // let response = await axios.get('/documents/users', {params});
      let response = await axios.get('/contacts', {
        params
      });
      context.commit('contacts/setAllContacts', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('contacts/setAllContacts', null, {
        root: true
      });
    }
  },

  fetchAllContactsByEntity: async (context, params) => {
    try {
      context.commit('contacts/setAllContacts', null, {
        root: true
      });
      // let response = await axios.get('/documents/users', {params});
      const response = await axios.get(`/contacts/${params.contactType}/${ params.accountName }/list`, {
        params
      });
      context.commit('contacts/setAllContacts', response.data, {
        root: true
      });
    } catch (error) {
      context.commit('contacts/setAllContacts', null, {
        root: true
      });
    }
  },

  createContact: async (context, params) => {
    try {
      context.commit('contacts/setContactErrors', null, {
        root: true
      });
      context.commit('contacts/setCreateContactStatus', false, {
        root: true
      })
      context.commit('contacts/setCreateContactData', null, {
        root: true
      })
      params.email = params.email.toLowerCase()
      const response = await axios.post('/contacts', params)
      context.commit('contacts/setCreateContactStatus', true, {
        root: true
      })
      context.commit('contacts/setCreateContactData', response.data.data, {
        root: true
      })
    } catch (err) {
      context.commit('contacts/setCreateContactStatus', false, {
        root: true
      })
      context.commit('contacts/setCreateContactData', null, {
        root: true
      })
      if (err.response) {
        let errorData = await context.dispatch('errors/errorResponse', err.response, {
          root: true
        })
        context.commit('contacts/setContactErrors', errorData, {
          root: true
        });
      }
    }
  },
  updateContact: async (context, {
    contact_id,
    contact
  }) => {
    try {
      context.commit('contacts/setContactErrors', null, {
        root: true
      });
      context.commit('contacts/setUpdateContactStatus', false, {
        root: true
      })
      contact.email = contact.email.toLowerCase()
      await axios.patch(`/contacts/${contact_id}`, contact)
      context.commit('contacts/setUpdateContactStatus', true, {
        root: true
      })
    } catch (err) {
      context.commit('contacts/setUpdateContactStatus', false, {
        root: true
      })
      if (err.response) {
        let errorData = await context.dispatch('errors/errorResponse', err.response, {
          root: true
        })
        context.commit('contacts/setContactErrors', errorData, {
          root: true
        });
      }
    }
  },
  deleteContact: async (context, contact_id) => {
    try {
      context.commit('contacts/setContactDeleteStatus', false, {
        root: true
      })
      await axios.delete(`contacts/${contact_id}`)
      context.commit('contacts/setContactDeleteStatus', true, {
        root: true
      })
    } catch (err) {
      context.commit('contacts/setContactDeleteStatus', false, {
        root: true
      })
    }
  },
  fetchContact: async ({
    commit
  }, contact_id) => {
    try {
      commit('setContact', null);
      let response = await axios.get(`/contacts/${contact_id}`);
      commit('setContact', response.data.data);
    } catch (error) {
      commit('setContact', null);
    }
  },
  checkContactEmailForGetLink: async (context, params) => {
    try {
      context.commit('contacts/setCheckContactDataWithEmail', null, {
        root: true
      });
      context.commit("configurableDocuments/setAuthenticateUserToFillDocumentErrors", {}, {
        root: true
      })
      const response = await axios.post('/contacts/check-contact', params);
      context.commit('contacts/setCheckContactDataWithEmail', response.data.data, {
        root: true
      });
    } catch (error) {
      context.commit('contacts/setCheckContactDataWithEmail', null, {
        root: true
      });
      if (error.response) {
        const errors = await context.dispatch("configurableDocuments/errorResponse", error.response, {
          root: true
        });
        context.commit("configurableDocuments/setAuthenticateUserToFillDocumentErrors", errors, {
          root: true
        })
      }
    }
  },
  checkContactEmail: async(context, params) => {
    try{
      context.commit("contacts/setCheckContactExist", {}, {root: true});
      const response = await axios.post('/contacts/check-exists', params)
      context.commit("contacts/setCheckContactExist", response.data.data, {root: true});
    }catch(err){
      console.log("error", err)
    }
  },
  createContactForFormbuilder: async(context, params) => {
    try{
      context.commit("contacts/setCreateContactForFormbuilderData", {}, {root: true});
      const response = await axios.post('/contacts/formbuilder/user-create', params)
      context.commit("contacts/setCreateContactForFormbuilderData", response.data.data, {root: true});
    }catch(err){
      console.log("err", err)
    }
  },
  updateDocumentPrimaryDetails: async (context, params) => {
    try {
      context.commit('contacts/setUpdateDocumentPrimaryDetailsStatus', false, {
        root: true
      });
      await axios.post('document-users/update-primary-details', params);
      context.commit('contacts/setUpdateDocumentPrimaryDetailsStatus', true, {
        root: true
      });
    } catch (error) {
      console.log(error)
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