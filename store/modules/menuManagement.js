import axios from "@/config/axios";
const initiateState = () => {
    return {
        menuManagementAddStatus: false,
        menuManagementUpdateStatus: false,
        menuManagementDeleteStatus: false,
        menuManagementDeleteError: false,
        allMenuData: [],
        menuManagementErrors: [],
        menu: {},
    }
}
const state = initiateState()
const getters = {
    getMenuManagementAddStatus: state => state.menuManagementAddStatus,
    getMenuManagementUpdateStatus: state => state.menuManagementUpdateStatus,
    getMenuManagementErrors: state => state.menuManagementErrors,
    getMenu: state => state.menu,
}
const mutations = {
    setMenuManagementAddStatus(state, data) {
        state.menuManagementAddStatus = data
    },
    setMenuManagementUpdateStatus(state, data) {
        state.menuManagementUpdateStatus = data
    },
    setMenu(state, data) {
        state.menu = data
    },
    setMenuManagementErrors(state, data) {
        state.menuManagementErrors = data
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
        context.commit("menuManagement/resetData", null, {
            root: true
        });
    },
    async clearErrors(context) {
        try {
            context.commit("menuManagement/setMenuManagementErrors", {}, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },
    async addMenuManagement(context, params) {
        try {
            context.commit("menuManagement/setMenuManagementAddStatus", false, {
                root: true
            })
            await axios.post('menu', params)
            context.commit("menuManagement/setMenuManagementAddStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("menuManagement/setMenuManagementAddStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("menuManagement/errorResponse", error.response, {
                    root: true
                });
                context.commit("menuManagement/setMenuManagementErrors", errors, {
                    root: true
                })
            }
        }
    },
    async updateMenuManagement(context, params) {
        try {
            context.commit("menuManagement/setMenuManagementUpdateStatus", false, {
                root: true
            })
            await axios.put('menu', params)
            context.commit("menuManagement/setMenuManagementUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("menuManagement/setMenuManagementUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("menuManagement/errorResponse", error.response, {
                    root: true
                });
                context.commit("menuManagement/setMenuManagementErrors", errors, {
                    root: true
                })
            }
        }
    },
    async fetchMenuWithUserType(context, id) {
        try {
            const response = await axios.get(`menu/${id}`)
            context.commit("menuManagement/setMenu", response.data, {
                root: true
            })
        } catch (errors) {
            context.commit("menuManagement/setMenu", {}, {
                root: true
            })
        }
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
}
export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
}