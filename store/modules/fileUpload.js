// initial state
import axios from "@/config/axios";
import appConfig from "@/config/app";
const initiateState = () => {
  return {

    uploadStatus: {},
    uploadedPdfData: null,
    uploadFileDataStatus: null,
    fileUploadRefId: null,
    fontTypes: [],
    uploadConvertFilesStatus: false,
    uploadConvertFiles: '',
    addPageStatus: false,
    addPageData: null,
    copyDocumentStatus: false,
    copyDocumentUrl: null,
    fileUpdateStatus: false,
    fetchPreSignedUrlStatus: false,
    fetchPreSignedUrlData: [],
    allDocumentFieldsRemoved: false
  }
};
const state = initiateState()
const getters = {
  getUploadStatus: state => state.uploadStatus,
  getUploadedPdfData: state => state.uploadedPdfData,
  getUploadFileDataStatus: state => state.uploadFileDataStatus,
  getFileUploadRefId: state => state.fileUploadRefId,
  getFontTypes: state => state.fontTypes,
  getUploadConvertFilesStatus: state => state.uploadConvertFilesStatus,
  getUploadConvertFiles: state => state.uploadConvertFiles,
  getAddPageStatus: state => state.addPageStatus,
  getAddPageData: state => state.addPageData,
  getCopyDocumentStatus: state => state.copyDocumentStatus,
  getCopyDocumentUrl: state => state.copyDocumentUrl,
  getFileUpdateStatus: state => state.fileUpdateStatus,
  getFetchPreSignedUrlStatus: state => state.fetchPreSignedUrlStatus,
  getFetchPreSignedUrlData: state => state.fetchPreSignedUrlData,
  getAllDocumentFieldsRemoved: state => state.allDocumentFieldsRemoved
};

const mutations = {
  setFileUploadRefId: (state, refId) => {
    state.fileUploadRefId = refId
  },
  setUploadFileDataStatus(state, status) {
    state.uploadFileDataStatus = status
  },
  setUploadStatus(state, status) {
    state.uploadStatus = status;
  },
  setUploadedPdfData(state, data) {
    state.uploadedPdfData = data;
  },
  setFontTypes(state, data) {
    state.fontTypes = data;
  },
  setUploadConvertFilesStatus(state, status) {
    state.uploadConvertFilesStatus = status
  },
  setUploadConvertFiles(state, data) {
    state.uploadConvertFiles = data
  },
  setAddPageStatus: (state, status) => {
    state.addPageStatus = status
  },
  setAddPageData: (state, data) => {
    state.addPageData = data
  },
  setCopyDocumentUrl: (state, url) => {
    state.copyDocumentUrl = url
  },
  setCopyDocumentStatus: (state, status) => {
    state.copyDocumentStatus = status
  },
  setFileUpdateStatus: (state, status) => {
    state.fileUpdateStatus = status
  },
  setFetchPreSignedUrlStatus: (state, status) => {
    state.fetchPreSignedUrlStatus = status
  },
  setFetchPreSignedUrlData: (state, data) => {
    state.fetchPreSignedUrlData = data
  },
  setAllDocumentFieldsRemoved: (state, status) => {
    state.allDocumentFieldsRemoved = status
  },  
  resetData: state => {
    const initial = initiateState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key];
    });
  },
};
const actions = {
  reset: function (context) {
    context.commit("fileUpload/resetData", null, {
      root: true
    });
  },
  addPageToDocumentv1: async (context, params) => {
    try {
      context.commit("fileUpload/setAddPageStatus", false, {
        root: true
      });
      context.commit("fileUpload/setAddPageData", null, {
        root: true
      });
      console.log(params)
      // let response = await fetch(appConfig.JAVA_BASE_URL+"/rest/esignature/addNewPage", {method: 'POST',body:JSON.stringify(params),headers: {
      //   'Content-Type': 'application/json'
      // }})
      let response = await axios.post(`/documents/addNewPage`, params);
      const data = await response.json();
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setAddPageStatus", true, {
        root: true
      });
      context.commit("fileUpload/setAddPageData", dt, {
        root: true
      });
      // const data = await response.json();
      // const dt = data.fileInfos[0]
      // context.commit("fileUpload/setAddPageData", dt, { root: true });
    } catch (error) {
      console.log(error)
    }
  },
  addPageToDocument: async (context, params) => {
    try {
      context.commit("fileUpload/setAddPageStatus", false, {
        root: true
      });
      context.commit("fileUpload/setAddPageData", null, {
        root: true
      });
      console.log(params)
      // await fetch(appConfig.JAVA_BASE_URL+"/rest/esignature/addNewPage", {method: 'POST',body:JSON.stringify(params),headers: {
      //   'Content-Type': 'application/json'
      // }})
      await axios.post(`/documents/addNewPage`, params);
      context.commit("fileUpload/setAddPageStatus", true, {
        root: true
      });
      // const data = await response.json();
      // const dt = data.fileInfos[0]
      // context.commit("fileUpload/setAddPageData", dt, { root: true });
    } catch (error) {
      console.log(error)
    }
  },
  addAttachments: async (context, params) => {
    try {
      console.log(params)
      context.commit("fileUpload/setUploadConvertFilesStatus", false, {
        root: true
      });
      await axios.post(`/attachments`, params);
      context.commit("fileUpload/setUploadConvertFilesStatus", true, {
        root: true
      });
    } catch (error) {
      context.commit("fileUpload/setUploadConvertFilesStatus", false, {
        root: true
      });
      console.log(error);
    }
  },
  //upload single file
  uploadFilesToConvertv1: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadConvertFilesStatus", false, {
        root: true
      });
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + "/rest/esignature/convertFiles", {
        method: 'POST',
        body: params
      })
      const data = await response.json();
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  //V4 API's using from frontend
  uploadFilesToConvertv4: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadConvertFilesStatus", false, {
        root: true
      });
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      let uploadUrl = `${appConfig.JAVA_BASE_URL}/rest/esignaturev4/convertFiles?company_id=${process.env.VUE_APP_APP_TYPE}/${params.companyId}`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: params.data
      });
      const data = await response.json();
      const dt = data.fileInfos;
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  uploadUserDocxFilev4: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      let uploadUrl = `${appConfig.JAVA_BASE_URL}/rest/esignaturev4/mergeFiles?company_id=${process.env.VUE_APP_APP_TYPE}/${params.companyId}`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: params.data
      });
      const data = await response.json();
      const dt = data.fileInfos[0];
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  addPageToDocumentv4: async (context, params) => {
    try {
      context.commit("fileUpload/setAddPageStatus", false, {
        root: true
      });
      context.commit("fileUpload/setAddPageData", null, {
        root: true
      });
      console.log(params)
      await fetch(appConfig.JAVA_BASE_URL + "/rest/esignaturev4/addNewPage", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      context.commit("fileUpload/setAddPageStatus", true, {
        root: true
      });
      // const data = await response.json();
      // const dt = data.fileInfos[0]
      // context.commit("fileUpload/setAddPageData", dt, { root: true });
    } catch (error) {
      console.log(error)
    }
  },
  fileTheUploadv4: async (context, params) => {
    try {
      //signed pdf download api
      context.commit("fileUpload/setUploadStatus", null, {
        root: true
      })
      console.log(params)
      const response = await fetch(appConfig.JAVA_BASE_URL + "/rest/esignaturev4/edit", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = await response.json();
      console.log(res)
      // const data = res.data
      context.commit("fileUpload/setUploadStatus", res, {
        root: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  duplicateUploadedDocumentv4: async (context, params) => {
    try {
      context.commit("fileUpload/setCopyDocumentUrl", null, {
        root: true
      });
      context.commit("fileUpload/setCopyDocumentStatus", false, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + `/rest/esignaturev4/duplicateFile?&company_id=${process.env.VUE_APP_APP_TYPE}/${params.companyId}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const dt = data.fileInfos[0];
      context.commit("fileUpload/setCopyDocumentUrl", dt, {
        root: true
      });
      context.commit("fileUpload/setCopyDocumentStatus", true, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },



  uploadFilesToConvert: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadConvertFilesStatus", false, {
        root: true
      });

      // const response = await fetch(appConfig.JAVA_BASE_URL+"/rest/esignature/convertFiles", {method: 'POST', body:params})
      const response = await axios.post(`/documents/attachFiles`, params)
      // const data = await response.data.json();
      const data = response.data.data;
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  getCopiedDocument: async (context, id) => {
    try {
      context.commit("fileUpload/setCopyDocumentUrl", null, {
        root: true
      });
      context.commit("fileUpload/setCopyDocumentStatus", false, {
        root: true
      });
      // const response = await fetch(appConfig.JAVA_BASE_URL+`/rest/esignature/duplicateFile?fileName=${id}`, {method: 'POST'});
      const response = await axios.post(`/documents/duplicateFile/` + id)
      // const data = await response.data.json();
      const data = response.data.data;
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setCopyDocumentUrl", dt, {
        root: true
      });
      context.commit("fileUpload/setCopyDocumentStatus", true, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  uploadUserFile: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + "/rest/esignature/files", params)
      const data = await response.json();
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  uploadUserDocxFilev1: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + "/rest/esignature/mergeFiles", {
        method: 'POST',
        body: params
      });
      const data = await response.json();
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  fetchUploadedDocumentv1: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadedPdfData", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + `/rest/esignature/retrieveUnsignedFile?fileName=${params}`, {
        method: 'GET'
      });
      const data = await response.json();
      context.commit("fileUpload/setUploadedPdfData", data, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  uploadUserDocxFile: async (context, params) => {
    try {
      context.commit("fileUpload/setUploadFileDataStatus", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + "/rest/esignature/mergeFiles", {
        method: 'POST',
        body: params
      });
      const data = await response.json();
      const dt = data.fileInfos[0]
      context.commit("fileUpload/setUploadFileDataStatus", dt, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  fileTheUploadv1: async (context, params) => {
    try {
      //signed pdf download api
      context.commit("fileUpload/setUploadStatus", null, {
        root: true
      })
      console.log(params)
      // const response = await fetch (appConfig.JAVA_BASE_URL+"/rest/esignature/edit", {method: 'POST', body:JSON.stringify(params),headers: {
      //   'Content-Type': 'application/json'
      // }})
      const response = await axios.post(`/documents/editFile`, params)
      // const data = await response.data.json();
      const data = response.data.data;
      const dt = data.fileInfos[0]
      // const data = res.data
      context.commit("fileUpload/setUploadStatus", dt, {
        root: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  fileTheUpload: async (context, params) => {
    try {
      //signed pdf download api
      context.commit("fileUpload/setUploadStatus", null, {
        root: true
      })
      console.log(params)
      // const response = await fetch (appConfig.JAVA_BASE_URL+"/rest/esignature/edit", {method: 'POST', body:JSON.stringify(params),headers: {
      //   'Content-Type': 'application/json'
      // }})
      const response = await axios.post(`/documents/editFile`, params)
      // const res = await response.data.json();
      const res = response.data.data;
      console.log(res)
      // const data = res.data
      context.commit("fileUpload/setUploadStatus", res, {
        root: true
      })
    } catch (error) {
      console.log(error)
    }
  },
  fetchFontTypes: async (context) => {
    try {
      const config = {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
      };
      //getting font styles
      context.commit("fileUpload/setFontTypes", null, {
        root: true
      });
      const response = await fetch(appConfig.JAVA_BASE_URL + '/rest/esignature/getFonts', config);
      const data = await response.json();
      context.commit("fileUpload/setFontTypes", data, {
        root: true
      });
    } catch (error) {
      console.log(error)
    }
  },
  removeFormFieldsFromPdf: async (context, params) => {
    try {
      context.commit("fileUpload/setFileUpdateStatus", false, {
        root: true
      });
      await axios.post('/s3/remove-form-fields', params);
      context.commit("fileUpload/setFileUpdateStatus", true, {
        root: true
      });
    } catch (err) {
      console.log(err)
    }
  },
  fetchPreSignedUrl: async (context, params) => {
    try {
      context.commit("fileUpload/setFetchPreSignedUrlStatus", false, {
        root: true
      });
      context.commit("fileUpload/setFetchPreSignedUrlData", [], {
        root: true
      });
      const response = await axios.post('/s3/edit-document', params);
      context.commit("fileUpload/setFetchPreSignedUrlData", response.data.data, {
        root: true
      });
      context.commit("fileUpload/setFetchPreSignedUrlStatus", true, {
        root: true
      });
    } catch (err) {
      console.log(err)
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