import axios from "@/config/axios";


const initialState = () => {
    return {
        allWorkflows: null,
        workflowCreatedStatus: false,
        workflowCreatedData: null,
        workflowResendData: null,
        workflowResendStatus: false,
        workflowResendErrors: false,

        workflowSettings: null,
        workflowDataById: null,
        workflowDataUpdateStatus: false,
        selectedWorkflowUsers: null,
        workflowDataCreatedStatus: false,
        workflowDataCreatedData: null,
        workflowsendStatus: false,
        workflowsendData: null,
        createdworkflowDataById: null,
        createdworkflowStatus: false,
        currentUserStatus: null,
        workflowCreatedDataUpdateStatus: false,
        viewWorkflowData: null,
        workflowsCountById: null,
        deleteArchivedWorkflowStatus: false,
        deleteArchivedWorkflowData: null,
        deleteArchivedWorkflowErrors: null,

        deleteWorkflowStatus: false,

        activeInactiveWorkflowStatus: false,
        permanentDeleteDraftDocStatus: false,
        permanentDeleteDraftDocErrors: null
    };
};

const state = initialState();

const getters = {
    getAllWorkflows: state => state.allWorkflows,
    getWorkflowCreatedStatus: state => state.workflowCreatedStatus,
    getWorkflowCreatedData: state => state.workflowCreatedData,
    getWorkflowResendData: state => state.workflowResendData,
    getWorkflowResendStatus: state => state.workflowResendStatus,
    getWorkflowResendErrors: state => state.workflowResendErrors,

    getWorkflowSettings: state => state.workflowSettings,
    getWorkflowDataById: state => state.workflowDataById,
    getWorkflowDataUpdateStatus: state => state.workflowDataUpdateStatus,
    getSelectedWorkflowUsers: state => state.selectedWorkflowUsers,
    getWorkflowDataCreatedStatus: state => state.workflowDataCreatedStatus,
    getWorkflowDataCreatedData: state => state.workflowDataCreatedData,
    getWorkflowsendStatus: state => state.workflowsendStatus,
    getWorkflowsendData: state => state.workflowsendData,
    getCreatedworkflowDataById: state => state.createdworkflowDataById,
    getCreatedworkflowStatus: state => state.createdworkflowStatus,
    getCurrentUserStatus: state => state.currentUserStatus,
    getWorkflowCreatedDataUpdateStatus: state => state.workflowCreatedDataUpdateStatus,
    getViewWorkflowData: state => state.viewWorkflowData,
    getWorkflowsCountById: state => state.workflowsCountById,
    getActiveInactiveWorkflowStatus: state => state.activeInactiveWorkflowStatus,
    getActiveInactiveWorkflowErrors: state => state.activeInactiveWorkflowErrors,
    getDeleteArchivedWorkflowStatus: state => state.deleteArchivedWorkflowStatus,
    getDeleteArchivedWorkflowData: state => state.deleteArchivedWorkflowData,
    getDeleteArchivedWorkflowErrors: state => state.deleteArchivedWorkflowErrors,
    getDeleteWorkflowStatus: state => state.deleteWorkflowStatus,
    getPermanentDeleteDraftDocStatus: state => state.permanentDeleteDraftDocStatus,
    getPermanentDeleteDraftDocErrors: state => state.permanentDeleteDraftDocErrors

};
const mutations = {
    setWorkflowsendStatus: (state, status) => {
        state.workflowsendStatus = status
    },
    setWorkflowsendData: (state, data) => {
        state.workflowsendData = data
    },
    setWorkflowDataCreatedStatus: (state, status) => {
        state.workflowDataCreatedStatus = status
    },
    setWorkflowDataCreatedData: (state, data) => {
        state.workflowDataCreatedData = data
    },
    setSelectedWorkflowUsers: (state, data) => {
        state.selectedWorkflowUsers = data
    },
    setWorkflowDataUpdateStatus: (state, status) => {
        state.workflowDataUpdateStatus = status
    },
    setWorkflowDataById: (state, data) => {
        state.workflowDataById = data
    },
    setWorkflowSettings: (state, data) => {
        state.workflowSettings = data
    },
    setAllWorkflows: (state, data) => {
        state.allWorkflows = data
    },
    setWorkflowCreatedData: (state, data) => {
        state.workflowCreatedData = data
    },
    setWorkflowResendData: (state, data) => {
        state.workflowResendData = data
    },
    setWorkflowResendStatus: (state, status) => {
        state.workflowResendStatus = status
    },
    setWorkflowResendErrors: (state, errors) => {
        state.workflowResendErrors = errors
    },
    setWorkflowCreatedStatus: (state, status) => {
        state.workflowCreatedStatus = status
    },
    setCreatedworkflowDataById: (state, data) => {
        state.createdworkflowDataById = data
    },
    setCreatedworkflowStatus: (state, status) => {
        state.createdworkflowStatus = status
    },
    setCurrentUserStatus: (state, data) => {
        state.currentUserStatus = data
    },
    setWorkflowCreatedDataUpdateStatus: (state, status) => {
        state.workflowCreatedDataUpdateStatus = status
    },
    setViewWorkflowData: (state, data) => {
        state.viewWorkflowData = data
    },
    setWorkflowsCountById: (state, data) => {
        state.workflowsCountById = data;
    },
    setactiveInactiveWorkflowStatus: (state, status) => {
        state.activeInactiveWorkflowStatus = status
    },
    setactiveInactiveWorkflowErrors: (state, errors) => {
        state.activeInactiveWorkflowStatus = errors
    },
    setdeleteArchivedWorkflowStatus: (state, status) => {
        state.deleteArchivedWorkflowStatus = status
    },
    setdeleteArchivedWorkflowData: (state, data) => {
        state.deleteArchivedWorkflowData = data
    },
    setdeleteArchivedWorkflowErrors: (state, errors) => {
        state.deleteArchivedWorkflowData = errors
    },
    setdeleteWorkflowStatus: (state, status) => {
        state.deleteWorkflowStatus = status
    },
    setpermanentDeleteDraftDocStatus: (state, status) => {
        state.permanentDeleteDraftDocStatus = status
    },
    setpermanentDeleteDraftDocErrors: (state, errors) => {
        state.permanentDeleteDraftDocErrors = errors
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
        context.commit("templateWorkflow/resetData", null, {
            root: true
        });
    },
    fetchWorkflowsCountById: async ({
        commit
    }, params) => {
        try {
            commit('setWorkflowsCountById', null);
            let response = await axios.post(`workflow/count`, {
                params
            });
            commit('setWorkflowsCountById', response.data.data);
        } catch (err) {
            commit('setWorkflowsCountById', null);
            console.log(err)
        }
    },
    viewWorkflowByworkflowId: async ({
        commit
    }, params) => {
        try {
            commit('setViewWorkflowData', null)
            let id = params.id;
            delete params.id
            let response = await axios.get(`view-workflow/${id}`, {
                params
            });
            commit('setViewWorkflowData', response.data)
        } catch (err) {
            console.log(err)
        }
    },
    UpdateActiveInactiveStatusOfWorkflow: async ({
        commit
    }, params) => {
        try {
            commit('setactiveInactiveWorkflowStatus', false)
            await axios.post(`/workflow/${params.id}/status`, params);
            commit('setactiveInactiveWorkflowStatus', true)
        } catch (err) {
            commit('setactiveInactiveWorkflowErrors', {
                root: true
            });
            console.log(err)
        }
    },
    DeleteArchivedStatusWorkflow: async ({
        commit
    }, workflow_id) => {
        try {
            commit('setdeleteArchivedWorkflowStatus', false)
            let response = await axios.delete(`/workflow/${workflow_id}/DeleteArchivedStatusWorkflow`);
            commit('setdeleteArchivedWorkflowStatus', true);
            commit('setdeleteArchivedWorkflowData', response.message);

        } catch (err) {
            commit('setdeleteArchivedWorkflowStatus', false, {
                root: true
            });
            if (err.response.data) {
                let errorData = await commit.dispatch('errors/errorResponse', err.response.data, {
                    root: true
                });
                commit('setdeleteArchivedWorkflowErrors', errorData, {
                    root: true
                });
            }
            console.log(err)
        }
    },
    DeleteWorkflow: async ({
        commit
    }, workflow_id) => {
        try {
            commit('setdeleteWorkflowStatus', false)
            await axios.delete(`/workflow/${workflow_id}/DeleteWorkflow`);
            commit('setdeleteWorkflowStatus', true);
        } catch (err) {
            console.log(err)
        }
    },
    PermanentDeleteDraft: async ({
        commit
    }, {
        workflowId
    }) => {
        try {
            commit('setpermanentDeleteDraftDocStatus', false)
            await axios.post(`/workflow/${workflowId}/PermanentDeleteDraftDocument`)
            commit('setpermanentDeleteDraftDocStatus', true)
        } catch (err) {
            commit('setpermanentDeleteDraftDocStatus', false)
        }
    },
    workflowSend: async ({
        commit
    }, params) => {
        try {
            commit('setWorkflowsendStatus', false);
            commit('setWorkflowsendData', null);
            let response = await axios.post(`/documents/send-workflow`, params)
            commit('setWorkflowsendStatus', true);
            commit('setWorkflowsendData', response.data.data);
        } catch (err) {
            console.log(err)
        }
    },
    createNewWorkflowData: async (context, params) => {
        try {
            context.commit('templateWorkflow/setWorkflowDataCreatedStatus', true, {
                root: true
            });
            context.commit('templateWorkflow/setWorkflowDataCreatedData', null, {
                root: true
            });
            let response = await axios.post(`/create-workflow-data/${params.workflow_id}`, params)
            context.commit('templateWorkflow/setWorkflowDataCreatedStatus', true, {
                root: true
            });
            context.commit('templateWorkflow/setWorkflowDataCreatedData', response.data.data, {
                root: true
            });
        } catch (error) {
            context.commit('templateWorkflow/setWorkflowDataCreatedData', null, {
                root: true
            });
        }
    },
    createNewWorkflow: async ({
        commit
    }, params) => {
        try {
            commit('setWorkflowCreatedData', null);
            commit('setWorkflowCreatedStatus', false);
            let response = await axios.post('/create-workflow', params)
            commit('setWorkflowCreatedData', response.data.data);
            commit('setWorkflowCreatedStatus', true);
        } catch (err) {
            console.log(err)
        }
    },
    resendWorkflowToPrimaryUser: async ({
        commit
    }, params) => {
        try {
            commit('setWorkflowResendData', null);
            commit('setWorkflowResendStatus', false);
            await axios.post(`/resend-workflow/${params.workflow_id}`, params)
            // commit('setWorkflowCreatedData',response.data.data);
            commit('setWorkflowResendStatus', true);
        } catch (err) {
            console.log(err)
        }
    },
    fetchWorkflows: async ({
        commit
    }, params) => {
        let response = null;
        try {
            commit('setAllWorkflows', 0);
            response = await axios.get('/workflows', {
                params
            })
            commit('setAllWorkflows', response.data);
        } catch (err) {
            // commit('setNotificationCountUnOpened', 0);
            // commit('setChatCountUnOpened', 0);
        }
    },
    fetchWorkflowSettings: async ({
        commit
    }) => {
        try {
            commit('setWorkflowSettings', null)
            let response = await axios.get('/workflows/settings');
            commit('setWorkflowSettings', response)
        } catch (err) {
            console.log(err)
        }
    },
    fetchWorkflowById: async ({
        commit
    }, id) => {
        try {
            commit('setWorkflowDataById', null)
            let response = await axios.get(`/workflow/${id}`);
            commit('setWorkflowDataById', response.data.data)
        } catch (err) {
            console.log(err)
        }
    },
    updateWorkFlowById: async ({
        commit
    }, data) => {
        try {
            commit('setWorkflowDataUpdateStatus', false);
            await axios.put(`/workflow/${data.id}`, data)
            commit('setWorkflowDataUpdateStatus', true);
        } catch (err) {
            console.log(err)
        }
    },
    updateWorkFlowDataById: async ({
        commit
    }, data) => {
        try {
            commit('setWorkflowCreatedDataUpdateStatus', false);
            await axios.put(`/workflow-data/${data.id}`, data)
            commit('setWorkflowCreatedDataUpdateStatus', true);
        } catch (err) {
            console.log(err)
        }
    },
    fetchSelectedWorkflowUsers: async ({
        commit
    }, data) => {
        try {
            commit('setSelectedWorkflowUsers', null);
            let response = await axios.post('/workflow/users', data)
            commit('setSelectedWorkflowUsers', response.data.data);
        } catch (err) {
            console.log(err)
        }
    },
    fetchWorkflowDataById: async ({
        commit
    }, id) => {
        try {
            commit('setCreatedworkflowDataById', null)
            commit('setCreatedworkflowStatus', false)
            let response = await axios.get(`/workflow-data/${id}`);
            commit('setCreatedworkflowStatus', true)
            commit('setCreatedworkflowDataById', response.data.data)
        } catch (err) {
            console.log(err)
        }
    },
    getCurrentUserStatus: async ({
        commit
    }, data) => {
        try {
            commit('setCurrentUserStatus', null);
            let response = await axios.post('/workflow/user-status', data)
            commit('setCurrentUserStatus', response.data.data);
        } catch (err) {
            console.log(err)
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