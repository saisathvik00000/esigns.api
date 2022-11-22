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
        deleteMenuStatus: false
    }
}
const state = initiateState()
const getters = {
    getMenuManagementAddStatus: state => state.menuManagementAddStatus,
    getMenuManagementUpdateStatus: state => state.menuManagementUpdateStatus,
    getMenuManagementErrors: state => state.menuManagementErrors,
    getMenu: state => state.menu,
    getDeleteMenuStatus: state => state.deleteMenuStatus
}
const mutations = {
    setDeleteMenuStatus(state, data) {
        state.deleteMenuStatus = data
    },
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
        context.commit("menuManagementV2/resetData", null, {
            root: true
        });
    },
    async clearErrors(context) {
        try {
            context.commit("menuManagementV2/setMenuManagementErrors", {}, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },
    async addMenuManagement(context, params) {
        try {
            context.commit("menuManagementV2/setMenuManagementAddStatus", false, {
                root: true
            })
            await axios.post('menu/v2', params)
            context.commit("menuManagementV2/setMenuManagementAddStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("menuManagementV2/setMenuManagementAddStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("menuManagementV2/errorResponse", error.response, {
                    root: true
                });
                context.commit("menuManagementV2/setMenuManagementErrors", errors, {
                    root: true
                })
            }
        }
    },
    async updateMenuManagement(context, params) {
        try {
            context.commit("menuManagementV2/setMenuManagementUpdateStatus", false, {
                root: true
            })
            await axios.put('menu/v2', params)
            context.commit("menuManagementV2/setMenuManagementUpdateStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("menuManagementV2/setMenuManagementUpdateStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("menuManagementV2/errorResponse", error.response, {
                    root: true
                });
                context.commit("menuManagementV2/setMenuManagementErrors", errors, {
                    root: true
                })
            }
        }
    },
    async fetchMenuWithUserType(context, id) {
        try {
            context.commit("menuManagementV2/setMenu", {}, {
                root: true
            })
            const response = await axios.get(`menu/v2/${id}`)
            context.commit("menuManagementV2/setMenu", response.data.data, {
                root: true
            })
        } catch (errors) {
            context.commit("menuManagementV2/setMenu", {}, {
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
    async deleteMenuById(context, id) {
        try{
            context.commit("menuManagementV2/setDeleteMenuStatus", false, {
                root: true
            });
            await axios.delete(`menu/v2/${id}`);
            context.commit("menuManagementV2/setDeleteMenuStatus", true, {
                root: true
            });
        } catch (error){
            if (error.response) {
                const errors = await context.dispatch("menuManagementV2/errorResponse", error.response, {
                    root: true
                });
                context.commit("menuManagementV2/setMenuManagementErrors", errors, {
                    root: true
                })
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