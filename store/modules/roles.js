import axios from "@/config/axios";

const initiateState = () => {
    return {
        allRoles: [],
        errors: {},
        success: {},
        role:{}
    }
}
const state = initiateState()
const getters = {
    getAllRoles: state => state.allRoles,
    getRoleErrors: state => state.errors,
    getSuccess: state => state.success,
    getRoleById:state=> state.role
}
const mutations = {
    setRoleErrors(state, data) {
        state.errors = data
    },
    setAllRoles(state, data) {
        state.allRoles = data
    },
    setSuccess(state, data) {
        state.success = data
    },
    setRole(state,data)
    {
        state.role=data
    },

    resetData: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },

}
const actions = {
    reset: function (context) {
        context.commit("roles/resetData", null, {
            root: true
        });
    },
    fetchRoles: async (context, params) => {
        try {
            const response = await axios.get('/roles', {
                params
            })
            // we will get pagination data so we are storing complete data 
            context.commit("roles/setAllRoles", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("roles/setAllRoles", {
                data: [],
                total: 0,
                page: 0
            }, {
                root: true
            })
        }
    },
    createRole: async (context, params) => {
        try {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
            const response = await axios.post('/createRole', params)
            context.commit("roles/setSuccess", response.data, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
        } catch (errors) {
            console.log("error",errors.response)
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            if (errors.response && errors.response.data) {
                context.commit("setRoleErrors", errors.response.data);
            }
        }
    },
    updateRole: async (context, params) => {
        try {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
            const response = await axios.patch('/updateRole/' + params._id, params)
            context.commit("roles/setSuccess", response.data, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
        } catch (errors) {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            if (errors.response && errors.response.data) {
                context.commit("setRoleErrors", errors.response.data);
            }
        }
    },

    resetErrors: (context) => {
        context.commit("setRoleErrors", {}, {
            root: true
        })
    },
    errorResponse: (context, errorResponse) => {
        let errorStatusCode = errorResponse.status;
        let errorData = {};
        switch (errorStatusCode) {
            case 422:
                var errors = errorResponse.data.errors;
                errors.details.forEach(detail => {

                    if (detail.key == "files") {
                        if (!errorData[detail.path]) {
                            errorData[detail.path] = detail.message
                        }
                    } else {
                        if (!errorData[detail.key]) {
                            errorData[detail.key] = detail.message;
                        }
                    }
                });
                break;
            case 401:
            case 403:
                errorData["critical_error"] = errorResponse.data.message;

                break;

            default:
                errorData["critical_error"] = errorResponse.data.message;
                break;
        }
        return errorData;
    },

    deleteRole: async (context, role_id) => {
        try {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
           let response= await axios.delete(`deleteRole/${role_id}`)
            context.commit("roles/setSuccess", response.data, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
        } catch (errors) {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            if (errors.response && errors.response.data) {
                context.commit("setRoleErrors", errors.response.data);
            }
        }
    },

    fetchRoleById: async (context, params) => {
        try {
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            context.commit("setRoleErrors", {}, {
                root: true
            })
            context.commit("roles/setRole", {
            }, {
                root: true
            })
            const response = await axios.get('/role/'+params)
            // we will get pagination data so we are storing complete data 
            context.commit("roles/setRole", response.data.data, {
                root: true
            })
        } catch (errors) {
            context.commit("roles/setRole", {
            }, {
                root: true
            })
            context.commit("roles/setSuccess", {}, {
                root: true
            })
            if (errors.response && errors.response.data) {
                context.commit("setRoleErrors", errors.response.data);
            }
        }
    },
}
export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
}