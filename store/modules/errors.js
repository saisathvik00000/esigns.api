const initiateState = () => {
  return {
    errors: [],
    error: null
  }
}
const state = initiateState()
const getters = {
  getErrors: state => state.errors,
  getError: state => state.error
}
const mutations = {
  setErrors(state, errors) {
    state.errors = errors
  },
  setError(state, error) {
    state.error = error
  },
  resetData(state) {
    state.errors = []
    state.error = null
  },
  reset(state) {
    state.errors = []
    state.error = null
  }
}
const actions = {
  /**
   * Set the error messages and responses from backend calls.
   * @param commit
   * @param errorResponse
   * @return {{}}
   */
  reset: function (context) {
    context.commit("errors/resetData", null, {
      root: true
    });
  },
  errorResponse: ({
    commit
  }, errorResponse) => {
    let errorStatusCode = errorResponse.status;
    let errorData = {};
    switch (errorStatusCode) {
      case 422:
        var errors = errorResponse.data.errors;
        errors.details.forEach(detail => {
          if (detail.key === "files") {
            if (!errorData[detail.path]) {
              errorData[detail.path] = detail.message
            }
          } else {
            if (!errorData[detail.key]) {
              errorData[detail.key] = detail.message;
            }
          }
        });
        errorData["critical_error"] = ''
        break;
      case 401:
      case 403:
      case 409:
        errorData["critical_error"] = errorResponse.data.message;

        break;

      default:
        errorData["critical_error"] = errorResponse.data.message;
        break;
    }

    commit('setErrors', errorData)
    commit('setError', errorData['critical_error'])

    return errorData;
  }
}
export default {
  namespaced: true,
  mutations,
  getters,
  state,
  actions
}