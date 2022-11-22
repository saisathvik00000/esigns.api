import axios from "axios";
import router from "@/router";
// import appConfig from "@/config/app";
import store from "@/store";

//"http://localhost:3003/v1.0"

// let apiUrl = 'http://localhost:3003/v1.0'

let apiUrl =
  process.env.VUE_APP_STAGE == "DEV"
    ? process.env.VUE_APP_DEV_API_URL
    : process.env.VUE_APP_LOCAL_API_URL;

if (process.env.NODE_ENV == "production") {
  apiUrl = process.env.VUE_APP_PROD_API_URL || process.env.VUE_APP_LOCAL_API_URL
}
else {
  apiUrl = process.env.VUE_APP_DEV_API_URL || process.env.VUE_APP_LOCAL_API_URL
}

const CancelToken = axios.CancelToken;
let cancel;

const $axios = axios.create({
  baseURL: apiUrl,
  timeout: 100000,
});

$axios.interceptors.request.use(
  async config => {
    store.commit('errors/reset')
    let authDetails = store.getters["auth/getAuthenticationDetails"];
    if (authDetails && authDetails["access_token"]) {
      config.headers.common["Authorization"] = authDetails["access_token"];
    }

    if (authDetails && authDetails["user_id"]) {
      config.headers.common["userid"] = authDetails["user_id"];
    }

    if (authDetails && authDetails["password"]) {
      config.headers.common["password"] = authDetails["password"];
    }

    if (authDetails && authDetails["document_id"]) {
      config.headers.common["documentid"] = authDetails["document_id"];
    }
    // return config;
    if (cancel) {
      cancel(); // cancel request
    }
  
    config.cancelToken =  new CancelToken(function executor(c)
      {
        cancel = c;
      })
  
    return config
  },
  error => {
    return Promise.reject(error);
  }

);

$axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let originalRequest = error.config;
    let errorStatusCode = error.response.status;

    let lastEndpoint = error.config.url.split('/').pop()
    let allowedEndpoints = ['signin', 'verify-reset-password', 'verify-email', 'signin', 'verify-password']
    if (
      errorStatusCode === 401 &&
      !originalRequest._retry &&
      allowedEndpoints.indexOf(lastEndpoint) == -1
    ) {
      originalRequest._retry = true;
      // resetStore()
      if (error.config.url !== 'signin') {
        router.push("/signin");
      }
    }


    return Promise.reject(error);
  }
);

export default $axios;
