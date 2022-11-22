import axios from "axios";
import store from "@/store";
import router from "@/router";
import moment from "moment";

let apiUrl =
  process.env.VUE_APP_STAGE == "DEV" ?
    process.env.VUE_APP_DEV_API_URL :
    process.env.VUE_APP_LOCAL_API_URL;

if (process.env.NODE_ENV == "production") {
  apiUrl = process.env.VUE_APP_PROD_API_URL || process.env.VUE_APP_LOCAL_API_URL
} else {
  apiUrl = process.env.VUE_APP_DEV_API_URL || process.env.VUE_APP_LOCAL_API_URL
}

const $axios = axios.create({
  baseURL: apiUrl,
  timeout: 100000
});


$axios.interceptors.request.use(
  async config => {

    store.commit('errors/reset')

    if (refreshTokenWillExpire()) {
      return logoutUser()
    }

    prepareHeaders(config)

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


const refreshTokenWillExpire = () => {
  let authDetails = store.getters["auth/getAuthenticationDetails"];

  if (authDetails && authDetails.refresh_token_expires_at) {
    let refreshTokenExireTime = moment.utc(authDetails.refresh_token_expires_at)
    let currentTime = moment.utc()
    let padding = 30 //secs
    return refreshTokenExireTime.diff(currentTime, 'seconds') <= padding
  } else {
    return false
  }
}

const refreshTokenNotExisted = () => {
  let authDetails = store.getters["auth/getAuthenticationDetails"];
  return !authDetails || !authDetails.refresh_token_expires_at || !authDetails.refresh_token
}


// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log("Process Queue Called", error, token)
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })

  failedQueue = [];
}



$axios.interceptors.response.use((response) => {
  return response;
}, async (error) => {

  const originalRequest = error.config;

  let allowedEndpoints = ['signin', 'verify-reset-password', 'verify-email', 'signin', 'verify-password']

  let lastEndpoint = originalRequest.url.split('/').pop()
  if (error.response.status === 401 && !originalRequest._retry && allowedEndpoints.indexOf(lastEndpoint) == -1) {
    console.log(error.response.data.status_code);
    if (error.response.data.status_code === "INACTIVE_WORKSPACE") {
      console.log("Error Inactive Workspace")
      processQueue(true, null);
      isRefreshing = false;
      return logoutUser()
    } else {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({
            resolve,
            reject
          })
        }).then(token => {
          originalRequest.headers['Authorization'] = token;
          return $axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      if (refreshTokenNotExisted() || refreshTokenWillExpire()) {
        processQueue(true, null);
        isRefreshing = false;
        return logoutUser();
      }

      originalRequest._retry = true;
      isRefreshing = true;
      let authDetails = store.getters["auth/getAuthenticationDetails"];
      const refreshToken = authDetails.refresh_token
      try {
        let response = await $axios.post(`${apiUrl}/revoke-token`, {
          token: refreshToken
        });

        let data = response.data

        let tokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          refresh_token_expires_at: data.refresh_token_expires_at,
          access_token_expires_at: data.access_token_expires_at
        };

        store.commit("auth/setAuthenticationDetails", tokens, {
          root: true
        });

        $axios.defaults.headers.common['Authorization'] = data.access_token;
        originalRequest.headers['Authorization'] = data.access_token;
        processQueue(null, data.access_token);
        return $axios(originalRequest)
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        return logoutUser()
      }
    }
  } else if (error.response.status == 403) {
    if (isRefreshing) {
      processQueue(true, null);
      isRefreshing = false;
      return logoutUser()
    }
  }
  return Promise.reject(error);
});


const logoutUser = () => {
  console.log("Logout Called")
  resetStore();
  return router.push({
    path: "/signin"
  })
}


const prepareHeaders = (config) => {
  let authDetails = store.getters["auth/getAuthenticationDetails"];

  if (authDetails && authDetails["user_id"]) {
    config.headers.common["userid"] = authDetails["user_id"];
  }

  if (authDetails && authDetails["password"]) {
    config.headers.common["password"] = authDetails["password"];
  }

  if (authDetails && authDetails["document_id"]) {
    config.headers.common["documentid"] = authDetails["document_id"];
  }
  if (authDetails && authDetails["workflow_data_id"]) {
    config.headers.common["workflowdataid"] = authDetails["workflow_data_id"];
  }

  if (authDetails && authDetails["access_token"]) {
    config.headers.common["Authorization"] = authDetails["access_token"];
  }

  if (authDetails && authDetails["passcode"]) {
    config.headers.common["passcode"] = authDetails["passcode"];
  }

  if (authDetails && authDetails["formbuilder_id"]) {
    config.headers.common["formbuilderid"] = authDetails["formbuilder_id"];
  }

  // if (getCookie("access_token") && getCookie("forceClose_access_token")) {
  //   config.headers.common["Authorization"] = getCookie("access_token");
  // }

}


const resetStore = () => {
  store.commit("auth/resetAuthData", null, {
    root: true
  });
  store.commit("entityGroups/resetData", null, {
    root: true
  });
  store.commit("menuManagementV2/resetData", null, {
    root: true
  });
  store.commit("menuManagement/resetData", null, {
    root: true
  });
  store.commit("globalVariables/resetData", null, {
    root: true
  });
  store.commit("repeatableTemplates/resetData", null, {
    root: true
  });
  store.commit("templatesData/resetData", null, {
    root: true
  });
  store.commit("entities/resetData", null, {
    root: true
  });
  store.commit("companyTemplates/resetData", null, {
    root: true
  });
  store.commit("templateWorkflow/resetData", null, {
    root: true
  });
  store.commit("company/resetData", null, {
    root: true
  });
  store.commit("userStatus/resetData", null, {
    root: true
  });
  store.commit("subscription/resetData", null, {
    root: true
  });
  store.commit("templates/resetData", null, {
    root: true
  });
  store.commit("settings/resetData", null, {
    root: true
  });
  store.commit("dashboard/resetData", null, {
    root: true
  });
  store.commit("contactTypes/resetData", null, {
    root: true
  });
  store.commit("documentNotes/resetData", null, {
    root: true
  });
  store.commit("configurableDocuments/resetData", null, {
    root: true,
  });
  store.commit("contacts/resetData", null, {
    root: true
  });
  store.commit("s3FileUpload/resetData", null, {
    root: true
  });
  store.commit("documents/resetData", null, {
    root: true
  });
  store.commit("errors/resetData", null, {
    root: true
  });
  store.commit("fileUpload/resetData", null, {
    root: true
  });
  store.commit("errors/reset", null, {
    root: true
  });

  store.commit("employeeData/reset", null, {
    root: true
  });
  store.commit("employeeDocuments/reset", null, {
    root: true
  });

  return;

}

export default $axios;