import axios from "@/config/axios";
const initiateState = () => {
    return {
        formbuilderDataCreateByTemplateStatus: false,
        formbuilderDataCreateByAssetStatus: false,
        formbuilderTemplateDataAddStatus: false,
        formbuilderTemplateDataUpdateStatus: false,
        formbuilderDataUpdateByAssetStatus: false,
        formbuilderDataAssetDataAddStatus: false,
        formbuilderDataAssetDataUpdateStatus: false,
        formbuilderDataTemplateDataErrors: {},
        formbuilderDataAssetDataErrors: {},
        newFormbuilderData: {},
        newFormbuilderDataError: {},
        userFormbuilderData: {},
        formbuilderUsersData: [],
        formbuilderUniqueUsersData: [],
        userFormbuilderDataWithTemplate: {},
        formbuilderDataEmployeeDocuments: [],
        formbuilderSentStatus: false,
        formbuilderSentData: {},
        formbuilderSentErrors: {},
        newFormbuilderUser: null,

        defaultDocumentsAssignedStatus: null,
        newDocumentAssignedStatus: null,
        documentRemovedStatus: null,

        userFormbuilderCompanyDocuments: [],

        formbuilderDataCreateByEntityStatus: false,
        formbuilderEntityDataAddStatus: false,
        usersFormbuilderTemplatesData: [],
        usersFormbuilderTemplatesDataWithFilters: [],
        usersFormbuilderTemplatesDataWithSort: [],
        usersFormbuilderTemplatesExportData: false,
        guestFormbuilderPasscodeSentStatus: false,
        formbuilderDataCreateByTemplateForGuestStatus: false,
        guestUserFormbuildersList: [],
        entityUserFormbuildersList: [],

        guestUserFormbuilderSubmissions: null,
        entityUserFormbuilderSubmissions: null,
        formbuilderBatchs: [],
        formbuilderBatcheData: null,
        resendFormbuilderLinkStatus: false,
        formbuilderCreateByContactStatus: false,
        formbuilderCreateByContactErrors: null,
        formbuilderCreateByContactData: {},
        checkAndFetchFormbuilderData: {},
        checkAndFetchFormbuilderError: {}
    }
}
const state = initiateState()
const getters = {
    getFormbuilderDataCreateByTemplateStatus: state => state.formbuilderDataCreateByTemplateStatus,

    getFormbuilderDataCreateByAssetStatus: state => state.formbuilderDataCreateByAssetStatus,
    getFormbuilderTemplateDataAddStatus: state => state.formbuilderTemplateDataAddStatus,
    getFormbuilderTemplateDataUpdateStatus: state => state.formbuilderTemplateDataUpdateStatus,
    getFormbuilderDataTemplateDataUpdateStatus: state => state.formbuilderDataTemplateDataUpdateStatus,
    getFormbuilderDataUpdateByAssetStatus: state => state.formbuilderDataUpdateByAssetStatus,
    getFormbuilderDataAssetDataAddStatus: state => state.formbuilderDataAssetDataAddStatus,
    getFormbuilderDataEmployeeDocuments: state => state.formbuilderDataEmployeeDocuments,
    getNewFormbuilderData: state => state.newFormbuilderData,
    getNewFormbuilderDataError: state => state.newFormbuilderDataError,
    getFormbuilderDataTemplateDataErrors: state => state.formbuilderDataTemplateDataErrors,
    getUserFormbuilderData: state => state.userFormbuilderData,
    getUserFormbuilderDataWithTemplate: state => state.userFormbuilderDataWithTemplate,
    getFormbuilderUsersData: state => state.formbuilderUsersData,
    getFormbuilderUniqueUsersData: state => state.formbuilderUniqueUsersData,


    getFormbuilderSentStatus: state => state.formbuilderSentStatus,
    getFormbuilderSentData: state => state.formbuilderSentData,
    getFormbuilderSentErrors: state => state.formbuilderSentErrors,
    getNewFormbuilderUser: state => state.newFormbuilderUser,

    getDefaultDocumentsAssignedStatus: state => state.defaultDocumentsAssignedStatus,
    getNewDocumentAssignedStatus: state => state.newDocumentAssignedStatus,
    getDocumentRemovedStatus: state => state.documentRemovedStatus,
    getUserFormbuilderCompanyDocuments: state => state.userFormbuilderCompanyDocuments,

    getFormbuilderDataCreateByEntityStatus: state => state.formbuilderDataCreateByEntityStatus,
    getFormbuilderEntityDataAddStatus: state => state.formbuilderEntityDataAddStatus,
    getUsersFormbuilderTemplatesData: state => state.usersFormbuilderTemplatesData,
    getUsersFormbuilderTemplatesDataWithFilters: state => state.usersFormbuilderTemplatesDataWithFilters,
    getUsersFormbuilderTemplatesDataWithSort: state => state.usersFormbuilderTemplatesDataWithSort,

    getUsersFormbuilderTemplatesDataExportStatus: state => state.usersFormbuilderTemplatesDataExportStatus,
    getGuestFormbuilderPasscodeSentStatus: state =>
        state.guestFormbuilderPasscodeSentStatus,
    getGuestUserFormbuildersList: state => state.guestUserFormbuildersList,
    getEntityUserFormbuildersList: state => state.entityUserFormbuildersList,

    getGuestUserFormbuilderSubmissions: state => state.guestUserFormbuilderSubmissions,

    getEntityUserFormbuilderSubmissions: state => state.entityUserFormbuilderSubmissions,
    getFormbuilderBatches: state => state.formbuilderBatches,
    getFormbuilderBatchData: state => state.formbuilderBatcheData,
    getResendFormbuilderLinkStatus: state => state.resendFormbuilderLinkStatus,
    getFormbuilderCreateByContactStatus: state => state.formbuilderCreateByContactStatus,
    getFormbuilderCreateByContactErrors: state => state.formbuilderCreateByContactErrors,
    getFormbuilderCreateByContactData: state => state.formbuilderCreateByContactData,
    getCheckAndFetchFormbuilderData: state => state.checkAndFetchFormbuilderData,
    getCheckAndFetchFormbuilderError: state =>  state.checkAndFetchFormbuilderError
}
const mutations = {
    setFormbuilderDataCreateByTemplateStatus(state, data) {
        state.formbuilderDataCreateByTemplateStatus = data
    },

    setFormbuilderDataCreateByAssetStatus(state, data) {
        state.formbuilderDataCreateByAssetStatus = data
    },

    setFormbuilderDataAssetDataAddStatus(state, data) {
        state.formbuilderDataAssetDataAddStatus = data
    },
    setFormbuilderDataEmployeeDocuments(state, data) {
        state.formbuilderDataEmployeeDocuments = data
    },
    setFormbuilderTemplateDataAddStatus(state, data) {
        state.formbuilderTemplateDataAddStatus = data
    },
    setNewFormbuilderData(state, data) {
        state.newFormbuilderData = data
    },
    setNewFormbuilderDataError(state, error) {
        state.newFormbuilderDataError = error
    },
    setFormbuilderDataTemplateDataErrors(state, data) {
        state.newFormbuilderData = data
    },

    setUserFormbuilderData(state, data) {
        state.userFormbuilderData = data
    },
    setUserFormbuilderDataWithTemplate(state, data) {
        state.userFormbuilderDataWithTemplate = data
    },

    setFormbuilderUsersData(state, data) {
        state.formbuilderUsersData = data
    },


    setFormbuilderUniqueUsersData(state, data) {
        state.formbuilderUniqueUsersData = data
    },

    setFormbuilderSentStatus(state, data) {
        state.formbuilderSentStatus = data
    },


    setFormbuilderSentData(state, data) {
        state.formbuilderSentData = data
    },


    setFormbuilderSentErrors(state, data) {
        state.formbuilderSentErrors = data
    },

    setNewFormbuilderUser(state, data) {
        state.newFormbuilderUser = data
    },


    setDefaultDocumentsAssignedStatus(state, data) {
        state.defaultDocumentsAssignedStatus = data
    },
    setNewDocumentAssignedStatus(state, data) {
        state.newDocumentAssignedStatus = data
    },
    setDocumentRemovedStatus(state, data) {
        state.documentRemovedStatus = data
    },
    setUserFormbuilderCompanyDocuments(state, data) {
        state.userFormbuilderCompanyDocuments = data
    },

    setFormbuilderDataCreateByEntityStatus(state, data) {
        state.formbuilderDataCreateByEntityStatus = data
    },

    setFormbuilderEntityDataAddStatus(state, data) {
        state.formbuilderEntityDataAddStatus = data
    },

    setUsersFormbuilderTemplatesData(state, data) {
        state.usersFormbuilderTemplatesData = data
    },

    setUsersFormbuilderTemplatesDataWithFilters(state, data) {
        state.usersFormbuilderTemplatesDataWithFilters = data
    },

    setUsersFormbuilderTemplatesDataWithSort(state, data) {
        state.usersFormbuilderTemplatesDataWithSort = data
    },

    setUsersFormbuilderTemplatesDataExportStatus(state, data) {
        state.usersFormbuilderTemplatesDataExportStatus = data
    },

    setGuestFormbuilderPasscodeSentStatus(state, data) {
        state.guestFormbuilderPasscodeSentStatus = data
    },

    setGuestUserFormbuildersList(state, data) {
        state.guestUserFormbuildersList = data
    },


    setEntityUserFormbuildersList(state, data) {
        state.entityUserFormbuildersList = data
    },

    setGuestUserFormbuilderSubmissions(state, data) {
        state.guestUserFormbuilderSubmissions = data
    },

    setEntityUserFormbuilderSubmissions(state, data) {
        state.entityUserFormbuilderSubmissions = data
    },



    setFormbuilderBatches(state, data) {
        state.formbuilderBatches = data
    },

    setFormbuilderBatchData(state, data) {
        state.formbuilderBatcheData = data
    },


    setResendFormbuilderLinkStatus(state, data) {
        state.resendFormbuilderLinkStatus = data
    },
    setFormbuilderCreateByContactData(state, data){
        state.formbuilderCreateByContactData = data
    },
    setFormbuilderCreateByContactStatus(state, data){
        state.formbuilderCreateByContactStatus = data
    },
    setFormbuilderCreateByContactErrors(state, error){
        state.formbuilderCreateByContactErrors = error
    },
    setCheckAndFetchFormbuilderData(state, data){
        state.checkAndFetchFormbuilderData = data
    },
    setCheckAndFetchFormbuilderError(state, data){
        state.checkAndFetchFormbuilderError = data
    },
    reset: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },



}
const actions = {

    async checkAndFetchFormbuilderDataForContact(context, params) {
        try{
            context.commit("formbuilderData/setCheckAndFetchFormbuilderError", {}, { root: true })
            context.commit("formbuilderData/setCheckAndFetchFormbuilderData", {}, { root: true });
            const response = await axios.post("/formbuilder-data/contact/check", params);
            context.commit("formbuilderData/setCheckAndFetchFormbuilderData", response.data.data, { root: true });
        }catch(error){
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setCheckAndFetchFormbuilderError", errors, { root: true });
            }
        }
    },

    async clearFormbuilderErrors(context) {
        context.commit("formbuilderData/setFormbuilderSentErrors", {}, { root: true })
    },
    async createFormbuilderDataByTemplateData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", false, { root: true })
            context.commit("formbuilderData/setNewFormbuilderData", {}, { root: true })
            context.commit("formbuilderData/setNewFormbuilderDataError", {}, { root: true });
            const response = await axios.post(`/formbuilder-data/template`, params)
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", true, { root: true })
            context.commit("formbuilderData/setNewFormbuilderData", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setNewFormbuilderDataError", errors, { root: true });
            }
        }
    },

    async createFormbuilderDataByTemplateDataForGuest(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", false, { root: true })
            const response = await axios.post(`formbuilder-url/create`, params)
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", true, { root: true })
            context.commit("formbuilderData/setNewFormbuilderData", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderDataCreateByTemplateStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }
    },



    async updateStepCompletionStatus(context, params) {
        try {
            await axios.post(`formbuilder-data/step-status`, params)
            await context.dispatch("formbuilderData/fetchUserFormbuilderData", {id: params.formbuilder_data_id}, { root: true });
        } catch (error) {
            console.log(error)
        }
    },
    async addTemplateDataToFormbuilderData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderTemplateDataAddStatus", false, { root: true })
            await axios.post(`formbuilder-data/template/${params.formbuilder_data_id}`, params)
            context.commit("formbuilderData/setFormbuilderTemplateDataAddStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderTemplateDataAddStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }
    },
    async addAssetDataToFormbuilderData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderDataAssetDataAddStatus", false, { root: true })
            await axios.post(`formbuilder-data/asset/${params.formbuilder_data_id}`, params)
            context.commit("formbuilderData/setFormbuilderDataAssetDataAddStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderDataAssetDataAddStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }
    },

    async fetchUsersFormbuilderTemplatesData(context, params) {

        try {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesData", [], { root: true })
            let response = await axios.get('formbuilder-template-data/template-data', { params })
            context.commit("formbuilderData/setUsersFormbuilderTemplatesData", response.data, { root: true })

        } catch (err) {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesData", [], { root: true })
        }
    },

    async fetchUsersFormbuilderTemplatesDataWithFilters(context, params) {

        try {

            let response = await axios.post('formbuilder-template-data/template-data', params)

            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataWithFilters", response.data, { root: true })

        } catch (err) {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataWithFilters", [], { root: true })
        }
    },

    async fetchUsersFormbuilderTemplatesDataWithSort(context, params) {

        try {

            let response = await axios.post('formbuilder-template-data/sort-template-data', params)

            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataWithSort", response.data, { root: true })

        } catch (err) {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataWithSort", [], { root: true })
        }
    },

    async exportUsersFormbuilderTemplatesData(context, params) {

        try {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataExportStatus", false, { root: true })
            let response = await axios.post('formbuilder-template-data/export', params)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${params.name}_data_list.csv`); //or any other extension
            document.body.appendChild(link);
            link.click();

            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataExportStatus", true, { root: true })

        } catch (err) {
            context.commit("formbuilderData/setUsersFormbuilderTemplatesDataExportStatus", false, { root: true })
        }
    },


    async fetchUserFormbuilderData(context, params) {
        try {
            context.commit("formbuilderData/setUserFormbuilderData", {}, { root: true });
            console.log("called un", params)
            const response = await axios.get("formbuilder-data/" + params.id, {params})
            context.commit("formbuilderData/setUserFormbuilderData", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setUserFormbuilderData", {}, { root: true })
        }
    },

    async clearUserFormbuilderData(context) {
        context.commit("formbuilderData/setUserFormbuilderData", {}, { root: true })
    },

    async fetchUserFormbuilderDataWithTemplate(context, params) {
        try {

            context.commit("formbuilderData/setUserFormbuilderDataWithTemplate", {}, { root: true })
            const response = await axios.get("formbuilder-data/" + params.formbuilder_data_id, { params })
            context.commit("formbuilderData/setUserFormbuilderDataWithTemplate", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setUserFormbuilderDataWithTemplate", {}, { root: true })
        }
    },
    async fetchUsersFormbuilderData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderUsersData", {}, { root: true })
            const response = await axios.get("formbuilder-data", { params })
            context.commit("formbuilderData/setFormbuilderUsersData", response.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderUsersData", {}, { root: true })
        }
    },

    async fetchFormbuilderUniqueUsersData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderUniqueUsersData", {}, { root: true })
            const response = await axios.get("formbuilder-data/unique", { params })
            context.commit("formbuilderData/setFormbuilderUniqueUsersData", response.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderUniqueUsersData", {}, { root: true })
        }
    },


    async fetchFormbuilderBatchesData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderBatches", {}, { root: true })
            const response = await axios.get("formbuilders-batch", { params })
            context.commit("formbuilderData/setFormbuilderBatches", response.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderBatches", {}, { root: true })
        }
    },


    async fetchFormbuilderBatchEmailData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderBatchData", {}, { root: true })
            const response = await axios.get("formbuilders-batch/email-data/" + params.formbuilder_data_id)
            context.commit("formbuilderData/setFormbuilderBatchData", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderBatchData", {}, { root: true })
        }
    },

    async resendFormbuilderLink(context, params) {
        try {
            context.commit("formbuilderData/setResendFormbuilderLinkStatus", false, { root: true })
            await axios.post("wh/formbuilders/" + params.formbuilder_data_id, params)
            context.commit("formbuilderData/setResendFormbuilderLinkStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setResendFormbuilderLinkStatus", false, { root: true })
        }
    },

    async sendFormbuilderDataToUser(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderSentErrors", {}, { root: true })
            context.commit("formbuilderData/setFormbuilderSentStatus", false, { root: true })
            context.commit("formbuilderData/setFormbuilderSentData", {}, { root: true })
            let response = await axios.post("formbuilder-data/send", params)
            context.commit("formbuilderData/setFormbuilderSentStatus", true, { root: true })
            context.commit("formbuilderData/setFormbuilderSentData", response.data.data, { root: true })
        } catch (error) {
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderSentErrors", errors, { root: true })
            }
        }
    },

    async sendFormbuilderDataToEntities(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderSentErrors", {}, { root: true })
            context.commit("formbuilderData/setFormbuilderSentStatus", false, { root: true })
            context.commit("formbuilderData/setFormbuilderSentData", {}, { root: true })
            let response = await axios.post("formbuilder-data/multiple-entities", params)
            context.commit("formbuilderData/setFormbuilderSentStatus", true, { root: true })
            context.commit("formbuilderData/setFormbuilderSentData", response.data.data, { root: true })
        } catch (error) {
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderSentErrors", errors, { root: true })
            }
        }
    },

    async fetchFormbuilderDataEmployeeDocuments(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderDataEmployeeDocuments", [], { root: true })
            const response = await axios.get("formbuilder-data/company-documents/" + params.formbuilder_data_id + '/' + params.formbuilder_step_id)
            context.commit("formbuilderData/setFormbuilderDataEmployeeDocuments", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderDataEmployeeDocuments", [], { root: true })
        }
    },

    async assignFormbuilderDefaultDocuments(context, params) {
        try {
            context.commit("formbuilderData/setDefaultDocumentsAssignedStatus", false, { root: true })
            await axios.post("formbuilder-data/company-documents/" + params.formbuilder_data_id + "/default", params)
            context.commit("formbuilderData/setDefaultDocumentsAssignedStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setDefaultDocumentsAssignedStatus", false, { root: true })
        }
    },
    async addFormbuilderDataEmployeeDocuments(context, params) {
        try {
            context.commit("formbuilderData/setNewDocumentAssignedStatus", false, { root: true })
            await axios.post("formbuilder-data/company-documents/" + params.formbuilder_data_id + '/multiple', params)
            context.commit("formbuilderData/setNewDocumentAssignedStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setNewDocumentAssignedStatus", false, { root: true })
        }
    },
    async removeFormbuilderDataEmployeeDocument(context, params) {
        try {
            context.commit("formbuilderData/setDocumentRemovedStatus", false, { root: true })
            await axios.delete("formbuilder-data/company-documents/" + params.formbuilder_data_id, { data: params })
            context.commit("formbuilderData/setDocumentRemovedStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setDocumentRemovedStatus", false, { root: true })
        }
    },

    async createFormbuilderDataByEntityData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderDataCreateByEntityStatus", false, { root: true })
            const response = await axios.post(`formbuilder-data/entity`, params)
            context.commit("formbuilderData/setFormbuilderDataCreateByEntityStatus", true, { root: true })
            context.commit("formbuilderData/setNewFormbuilderData", response.data.data, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderDataCreateByEntityStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }
    },

    async addEntityDataToFormbuilderData(context, params) {
        try {
            context.commit("formbuilderData/setFormbuilderEntityDataAddStatus", false, { root: true })
            await axios.post(`formbuilder-data/entity/${params.formbuilder_data_id}`, params)
            context.commit("formbuilderData/setFormbuilderEntityDataAddStatus", true, { root: true })
        } catch (error) {
            context.commit("formbuilderData/setFormbuilderEntityDataAddStatus", false, { root: true })
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }
    },

    async fetchGuestUserFormbuildersData(context, params) {
        try {
            context.commit("formbuilderData/setGuestUserFormbuildersList", [], { root: true })
            context.commit("formbuilderData/setGuestUserFormbuilderSubmissions", 0, { root: true })
            const url = `formbuilder-data/${params.formbuilder_details_id}/user-data/${params.user_id}`

            const response = await axios.get(url)

            context.commit("formbuilderData/setGuestUserFormbuildersList", response.data.data, { root: true })

            context.commit("formbuilderData/setGuestUserFormbuilderSubmissions", response.data.total_formbuilder_submissions, { root: true })


        } catch (error) {
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });

                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }

    },

    async fetchEntityUserFormbuildersData(context, params) {
        try {


            context.commit("formbuilderData/setEntityUserFormbuildersList", [], { root: true })
            const url = `formbuilder-data/entity-user/${params.formbuilder_details_id}/user-data/${params.user_id}`

            const response = await axios.get(url, { params })

            context.commit("formbuilderData/setEntityUserFormbuildersList", response.data, { root: true })



        } catch (error) {
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });

                context.commit("formbuilderData/setFormbuilderErrors", errors, { root: true })
            }
        }

    },

    async createFormbuilderDataByContact(context, params){
        try{
            context.commit("formbuilderData/setFormbuilderCreateByContactData", {}, { root: true });
            context.commit("formbuilderData/setFormbuilderCreateByContactStatus", false, { root: true });
            context.commit("formbuilderData/setFormbuilderCreateByContactErrors", null, { root: true })
            const responce = await axios.post('/formbuilder-data/contact', params)
            context.commit("formbuilderData/setFormbuilderCreateByContactData", responce.data.data, { root: true });
            context.commit("formbuilderData/setFormbuilderCreateByContactStatus", true, { root: true });

        }catch(error){
            if (error.response) {
                const errors = await context.dispatch("formbuilderData/errorResponse", error.response, { root: true });
                console.log("errors",errors)
                context.commit("formbuilderData/setFormbuilderCreateByContactErrors", errors, { root: true })
            }
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