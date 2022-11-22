import * as PrivateAxios from "axios"
import axios from "@/config/axios";

// initial state
const initialState = () => {
  return {
    documentUploadStatus: false,
    fileUploadStatus: false,
    fileUploadData: null
  };
};

const state = initialState();

const getters = {
  getDocumentUploadStatus: state => state.documentUploadStatus,
  getFileUploadStatus: state => state.fileUploadStatus,
  getFileUploadData: state => state.fileUploadData
};

const mutations = {
  setDocumentUploadStatus: (state, status) => {
    state.documentUploadStatus = status
  },
  setFileUploadStatus: (state, status) => {
    state.fileUploadStatus = status
  },
  setFileUploadData: (state, data) =>{
    state.fileUploadData = data
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
    context.commit("s3FileUpload/resetData", null, {
      root: true
    });
  },
  // upload to s3 bucket using presigned url
  uploadDocumentToGeneratedUrl: async (context, params) => {
    try {
      context.commit("s3FileUpload/setDocumentUploadStatus", false, {
        root: true
      })
      let pAxios = PrivateAxios.create({})
      await pAxios.put(params.upload_url, params.file);
      context.commit("s3FileUpload/setDocumentUploadStatus", true, {
        root: true
      })
    } catch (error) {
      context.commit("s3FileUpload/setDocumentUploadStatus", false, {
        root: true
      })
    }
  },

  uploadFileToS3: async (context, params) => {
    try {
      context.commit("s3FileUpload/setFileUploadStatus", false, {
        root: true
      });
      context.commit("s3FileUpload/setFileUploadData", false, {
        root: true
      });
      const respose = await axios.put(`/upload/file-upload-s3`, params);
      console.log("respose",respose)
      context.commit("s3FileUpload/setFileUploadData", respose.data.data, {
        root: true
      });
      context.commit("s3FileUpload/setFileUploadStatus", true, {
        root: true
      });
    } catch (error) {
      context.commit("s3FileUpload/setFileUploadStatus", false, {
        root: true
      });
      console.log(error);
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