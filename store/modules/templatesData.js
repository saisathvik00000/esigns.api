import axios from "@/config/axios";
import * as PrivateAxios from "axios"

const initiateState = () => {
    return {
        userTemplateData: [],
        userTemplatePrimaryData: [],
        userTemplateDataUpdateStatus: false,
        formbuilderTemplatesDataUpdateStatus: false,
        formbuilderTemplatesDataUpdateData: {},
        templateFieldsData: [],
        fileUploadURL: null,
        fileUploadRefId: null,
        documentUploadStatus: false,
        documentUploadStatusUpdated: false,
        uploadedFileData: null,
        documentDownloadUrl: null,
        downloadError: null,
        templateDataValidateErrors: {},
        templateDataValidateStatus: false,
        entityDataCreateByTemplateStatus: false,
        newEntityData: {},
        newEntityCreateError: {},
        primaryEntityDataStatus: false,
        primaryEntityDataErrors: {},
        templateDeleteStatus: false,
        templateDeleteError: "",
        updateUserEntityData: false,
        updateUserEntityError: null,
        templateDataByentityId: null,
        templateDataByentityIdAndTemplateId: null,
        repeatableTemplateIds: [],
        addNewRepeatableDataStatus: false,
        addNewRepeatableData: {},
        addNewRepeatableDataErrors: {}
    }
}
const state = initiateState()
const getters = {
    getEntityDataCreateByTemplateStatus: state => state.entityDataCreateByTemplateStatus,
    getPrimaryEntityDataStatus: state => state.primaryEntityDataStatus,
    getPrimaryEntityDataErrors: state => state.primaryEntityDataErrors,
    getTemplatesData: state => state.userTemplateData,
    getTemplatesPrimaryData: state => state.userTemplatePrimaryData,
    getTemplatesDataUpdateStatus: state => state.userTemplateDataUpdateStatus,
    getFormbuilderTemplatesDataUpdateStatus: state => state.formbuilderTemplatesDataUpdateStatus,
    getFormbuilderTemplatesDataUpdateData: state => state.formbuilderTemplatesDataUpdateData,
    getTemplateFieldsData: state => state.templateFieldsData,
    getFileUploadURL: state => state.fileUploadURL,
    getFileUploadRefId: state => state.fileUploadRefId,
    getDocumentUploadStatus: state => state.documentUploadStatus,
    getDocumentUploadStatusUpdated: state => state.documentUploadStatusUpdated,
    getUploadedFileData: state => state.uploadedFileData,
    getDownloadUrl: state => state.documentDownloadUrl,
    getDownloadError: state => state.downloadError,
    getTemplateDataValidateErrors: state => state.templateDataValidateErrors,
    getTemplateDataValidateStatus: state => state.templateDataValidateStatus,
    getNewEntityData: state => state.newEntityData,
    getTemplateDeleteStatus: state => state.templateDeleteStatus,
    getTemplateDeleteError: state => state.templateDeleteError,
    getUpdateUserEntityData: state => state.updateUserEntityData,
    getUpdateUserEntityError: state => state.updateUserEntityError,
    getNewEntityCreateError: state => state.newEntityCreateError,
    getTemplateDataByentityId: state => state.templateDataByentityId,
    getTemplateDataByentityIdAndTemplateId: state => state.templateDataByentityIdAndTemplateId,
    getRepeatableTemplateIds: state => state.repeatableTemplateIds,
    getAddNewRepeatableDataStatus: state => state.addNewRepeatableDataStatus,
    getAddNewRepeatableData: state => state.addNewRepeatableData,
    getAddNewRepeatableDataErrors: state => state.addNewRepeatableDataErrors
}
const mutations = {
    setEntityDataCreateByTemplateStatus(state, data) {
        state.entityDataCreateByTemplateStatus = data
    },
    setPrimaryEntityDataStatus(state, data) {
        state.primaryEntityDataStatus = data
    },
    setPrimaryEntityDataErrors(state, data) {
        state.primaryEntityDataErrors = data
    },
    setNewEntityData(state, data) {
        state.newEntityData = data
    },
    setTemplatesData(state, data) {
        state.userTemplateData = data
    },
    setTemplatesPrimaryData(state, data) {
        state.userTemplatePrimaryData = data
    },
    setTemplatesDataUpdateStatus(state, data) {
        state.userTemplateDataUpdateStatus = data
    },
    setFormbuilderTemplatesDataUpdateStatus(state, data) {
        state.formbuilderTemplatesDataUpdateStatus = data
    },
    setFormbuilderTemplatesDataUpdateData(state, data) {
        state.formbuilderTemplatesDataUpdateData = data
    },
    setTemplateFieldsData(state, data) {
        state.templateFieldsData = data
    },

    setFileUploadURL(state, data) {
        state.fileUploadURL = data
    },
    setFileUploadRefId(state, data) {
        state.fileUploadRefId = data
    },
    setDocumentUploadStatus(state, data) {
        state.documentUploadStatus = data
    },
    setDocumentUploadStatusUpdated(state, data) {
        state.documentUploadStatusUpdated = data
    },
    setUploadedFileData(state, data) {
        state.uploadedFileData = data
    },
    setDownloadUrl(state, url) {
        state.documentDownloadUrl = url
    },

    setDownloadError(state, error) {
        state.downloadError = error
    },

    setTemplateDataValidateErrors(state, errors) {
        state.templateDataValidateErrors = errors
    },

    setTemplateDataValidateStatus(state, data) {
        state.templateDataValidateStatus = data
    },
    setNewEntityCreateError(state, error) {
        state.newEntityCreateError = error
    },

    resetData: state => {
        const initial = initiateState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },
    setTemplateDeleteStatus(state, data) {
        state.templateDeleteStatus = data
    },
    setTemplateDeleteError(state, data) {
        state.templateDeleteError = data
    },
    setUpdateUserEntityData(state, data) {
        state.updateUserEntityData = data
    },
    setUpdateUserEntityError(state, data) {
        state.updateUserEntityError = data
    },
    setTemplateDataByentityId(state, data) {
        state.templateDataByentityId = data
    },
    setTemplateDataByentityIdAndTemplateId(state, data) {
        state.templateDataByentityIdAndTemplateId = data
    },
    setRepeatableTemplateIds(state, data) {
        state.repeatableTemplateIds = data
    },
    setAddNewRepeatableDataStatus(state, status){
        state.addNewRepeatableDataStatus = status
    },
    setAddNewRepeatableData(state, data){
        state.addNewRepeatableData = data
    },
    setAddNewRepeatableDataErrors(state, error){
        state.addNewRepeatableDataErrors = error
    }
}
const actions = {
    reset: function (context) {
        context.commit("templatesData/resetData", null, {
            root: true
        });
    },
    async addNewRepeatableData(context, params) {
        try{
            context.commit("templatesData/setAddNewRepeatableDataStatus", false, {
                root: true
            });
            context.commit("templatesData/setAddNewRepeatableData", [], {
                root: true
            });
            const response = await axios.post(`/repeatable-template/add`, params);
            context.commit("templatesData/setAddNewRepeatableDataStatus", true, {
                root: true
            });
            context.commit("templatesData/setAddNewRepeatableData", response.data.data, {
                root: true
            });
            console.log("api response", response)
        }catch(err){
            if(err.response && err.response.data){
                context.commit("templatesData/setAddNewRepeatableDataErrors", err.response.data, {
                    root: true
                });
            }
        }
    },
    async createEntityDataByTemplateData(context, params) {
        try {
            context.commit("templatesData/setEntityDataCreateByTemplateStatus", false, {
                root: true
            })
            const response = await axios.post(`/templates-data`, params)
            context.commit("templatesData/setEntityDataCreateByTemplateStatus", true, {
                root: true
            })
            context.commit("templatesData/setNewEntityData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("templatesData/setEntityDataCreateByTemplateStatus", false, {
                root: true
            })
            context.commit("templatesData/setNewEntityData", {}, {
                root: true
            })
            if (error.response && error.response.data) {
                context.commit("templatesData/setNewEntityCreateError", error.response.data, {
                    root: true
                })
            }
            // if (error.response) {
            //     const errors = await context.dispatch("templatesData/errorResponse", error.response, {
            //         root: true
            //     });
            //     // context.commit("templatesData/setWorkflowErrors", errors, {
            //     //     root: true
            //     // })
            // }
        }
    },
    async createEntityPrimaryData(context, params) {
        try {
            context.commit("templatesData/setPrimaryEntityDataStatus", false, {
                root: true
            })
            const response = await axios.post(`/templates-primaryData`, params)
            context.commit("templatesData/setPrimaryEntityDataStatus", true, {
                root: true
            })
            context.commit("templatesData/setNewEntityData", response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit("templatesData/setPrimaryEntityDataStatus", false, {
                root: true
            })
            context.commit("templatesData/setNewEntityData", {}, {
                root: true
            })
            if (error.response && error.response.data) {
                context.commit("templatesData/setPrimaryEntityDataErrors", error.response.data, {
                    root: true
                });
                // const errors = await context.dispatch("templatesData/errorResponse", error.response, {
                //     root: true
                // });
                // context.commit("templatesData/setWorkflowErrors", errors, {
                //     root: true
                // })
            }
        }
    },

    async fetchUserTemplateData(context, params) {
        try {
            context.commit("templatesData/setTemplatesData", {}, {
                root: true
            })
            const response = await axios.get("templates-data", {
                params
            })
            context.commit("templatesData/setTemplatesData", response.data.data, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },

    async fetchUserTemplatesPrimaryData(context, params) {
        try {
            context.commit("templatesData/setTemplatesPrimaryData", {}, {
                root: true
            })
            let response = await axios.get("templates-primary-data", {
                params
            })
            console.log(response)
            context.commit("templatesData/setTemplatesPrimaryData", response.data.data, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },


    async fetchTemplateDataByEntity(context, params) {
        try {
            context.commit("templatesData/setTemplateDataByentityId", {}, {
                root: true
            });
            const response = await axios.get("templates-entity-data", {
                params
            })
            context.commit("templatesData/setTemplateDataByentityId", response.data.data, {
                root: true
            });
        } catch (err) {
            console.log(err)
        }
    },

    async fetchTemplateDataByEntityAndTemplateId(context, params) {
        try {
            context.commit("templatesData/setTemplateDataByentityIdAndTemplateId", {}, {
                root: true
            });
            const response = await axios.get("templates-entity-data-all-entities", {
                params
            })
            console.log(response)
            context.commit("templatesData/setTemplateDataByentityIdAndTemplateId", response.data.data, {
                root: true
            });
        } catch (err) {
            console.log(err)
        }
    },
    ///templates-entity-data-all-entities
    async fetchTemplateFieldsData(context, params) {
        try {
            context.commit("templatesData/setTemplateFieldsData", [], {
                root: true
            })
            const response = await axios.get("template-fields", {
                params
            })
            context.commit("templatesData/setTemplateFieldsData", response.data.data, {
                root: true
            })
        } catch (err) {
            console.log(err)
        }
    },

    async validateTemplateData(context, params) {
        try {
            context.commit("templatesData/setTemplateDataValidateErrors", {}, {
                root: true
            })
            await axios.post('/templates-data/' + params.template_id + '/validate', params)
            context.commit("templatesData/setTemplateDataValidateStatus", true, {
                root: true
            })
        } catch (err) {
            context.commit("templatesData/setTemplateDataValidateStatus", false, {
                root: true
            })
            if (err.response) {
                const errors = await context.dispatch("templatesData/errorResponse", err.response, {
                    root: true
                });
                console.log(errors)
                context.commit("templatesData/setTemplateDataValidateErrors", errors, {
                    root: true
                })
            }
        }
    },

    async updateUserTemplateData(context, params) {
        try {
            context.commit("templatesData/setTemplatesDataUpdateStatus", false, {
                root: true
            })
            await axios.patch(`templates-data/${params.entity_data_id}/${params.template_id}`, params)
            context.commit("templatesData/setTemplatesDataUpdateStatus", true, {
                root: true
            })
        } catch (err) {
            context.commit("templatesData/setTemplatesDataUpdateStatus", false, {
                root: true
            })
        }
    },

    async updateUserFormbuilderTemplateData(context, params) {
        try {
            context.commit("templatesData/setFormbuilderTemplatesDataUpdateStatus", false, {
                root: true
            })
            context.commit("templatesData/setFormbuilderTemplatesDataUpdateData", {}, {root: true});
            const responce = await axios.patch(`/formbuilder/templates-data/${params.formbuilder_data_id}/${params.template_id}`, params);
            context.commit("templatesData/setFormbuilderTemplatesDataUpdateData",responce.data.data, {root: true});
        
            context.commit("templatesData/setFormbuilderTemplatesDataUpdateStatus", true, {
                root: true
            })
        } catch (err) {
            context.commit("templatesData/setFormbuilderTemplatesDataUpdateStatus", false, {
                root: true
            })
        }
    },


    fetchDocumentUploadUrl: async (context, params) => {
        try {
            context.commit("templatesData/setUploadedFileData", {}, {
                root: true
            })
            context.commit("templatesData/setFileUploadURL", null, {
                root: true
            })
            context.commit("templatesData/setFileUploadRefId", null, {
                root: true
            })
            const response = await axios.post("/templates-data/file-upload-url", params)
            const data = response.data.data
            context.commit("templatesData/setFileUploadURL", data.upload_url, {
                root: true
            })
            context.commit("templatesData/setFileUploadRefId", data.file_ref_id, {
                root: true
            })
            context.commit("templatesData/setUploadedFileData", data, {
                root: true
            })
        } catch (error) {
            console.log(error)
            context.commit("templatesData/setUploadedFileData", {}, {
                root: true
            })


        }
    },

    uploadDocumentToGeneratedUrl: async (context, params) => {
        try {
            context.commit("templatesData/setDocumentUploadStatus", false, {
                root: true
            })
            let pAxios = PrivateAxios.create({})
            await pAxios.put(params.upload_url, params.file);
            context.commit("templatesData/setDocumentUploadStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("templatesData/setDocumentUploadStatus", false, {
                root: true
            })
        }
    },

    updateDocumentUploadStatus: async (context, params) => {
        try {
            context.commit("templatesData/setDocumentUploadStatusUpdated", false, {
                root: true
            })
            await axios.post("/templates-data/file-upload-status", params)
            context.commit("templatesData/setDocumentUploadStatusUpdated", true, {
                root: true
            })
        } catch (error) {
            context.commit("templatesData/setDocumentUploadStatusUpdated", false, {
                root: true
            })
        }
    },

    downloadTemplateDocument: async (context, params) => {
        try {
            context.commit("templatesData/setDownloadUrl", null, {
                root: true
            });
            context.commit("templatesData/setDownloadError", null, {
                root: true
            });

            let response = await axios.post("/templates-data/file-download-url", params)
            context.commit("templatesData/setDownloadUrl", response.data.data.download_url, {
                root: true
            });
        } catch (error) {
            if (error && error.data && error.data.message) {
                context.commit("templatesData/setDownloadError", error.data.message, {
                    root: true
                });
            } else {
                context.commit("templatesData/setDownloadError", "Error while downloading the data", {
                    root: true
                });
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
    async deleteEntityData(context, params) {
        try {
            context.commit("templatesData/setTemplateDeleteStatus", false, {
                root: true
            })
            await axios.delete('entity-data/' + params.id)
            context.commit("templatesData/setTemplateDeleteStatus", true, {
                root: true
            })
        } catch (error) {
            context.commit("templatesData/setTemplateDeleteStatus", false, {
                root: true
            })
            if (error.response) {
                const errors = await context.dispatch("templatesData/errorResponse", error.response, {
                    root: true
                });
                context.commit("templatesData/setTemplateDeleteError", errors.critical_error, {
                    root: true
                })
            }
        }
    },
    //update template data from user documents
    async updateUserEntityData(context, params) {
        try {
            context.commit("templatesData/setUpdateUserEntityData", false, {
                root: true
            });
            await axios.post('user-entity-data', params);
            context.commit("templatesData/setUpdateUserEntityData", true, {
                root: true
            });
        } catch (error) {
            if (error.response) {
                const errors = await context.dispatch("templatesData/errorResponse", error.response, {
                    root: true
                });
                context.commit("templatesData/setUpdateUserEntityError", errors.critical_error, {
                    root: true
                })
            }
        }
    },
    async fetchRepeatableTemplateIds(context, count) {
        try {
            context.commit("templatesData/setRepeatableTemplateIds", [], {
                root: true
            });
            const response = await axios.get('/repeatable-template/ids/' + count);
            context.commit("templatesData/setRepeatableTemplateIds", response.data.data, {
                root: true
            });
        } catch (err) {
            console.log(err)
        }
    }
}
export default {
    namespaced: true,
    mutations,
    getters,
    state,
    actions
}