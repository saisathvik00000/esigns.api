import 'element-ui/lib/theme-chalk/index.css';
import 'tippy.js/dist/tippy.css';
import './assets/css/app.scss';
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import './plugins/ckeditor'
import VueMeta from 'vue-meta'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VOffline from 'v-offline';
import VueScrollTo from "vue-scrollto";

import {
  DataTables,
  DataTablesServer
} from 'vue-data-tables'

import App from './App.vue'
import ElementUI from 'element-ui';

import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueHtmlToPaper from "vue-html-to-paper";
import VueSignaturePad from 'vue-signature-pad';
import locale from 'element-ui/lib/locale/lang/en'
import router from "@/router"
import store from "@/store"
import vueMoment from 'vue-moment'
import "@/helpers/filters"
import GoogleAPIs from 'vue-googleapis'
import vClickOutside from 'v-click-outside'
import Meta from 'vue-meta'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueScrollTo)
Vue.use(VueDraggableResizable)
Vue.use(vClickOutside)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

const options = {
  "name": "_blank",
  "specs": [
    "fullscreen=yes",
    "titlebar=yes",
    "scrollbars=yes"
  ],
  "styles": [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
    "path/to/font-awesome/css/font-awesome.min.css"
  ]
};

Vue.use(VueHtmlToPaper, options);
Vue.use(VueSignaturePad);

Vue.use(ElementUI, {
  locale
})

Vue.use(DataTables)
Vue.use(DataTablesServer)

Vue.use(vueMoment);
Vue.use(VueSweetalert2);
Vue.use(VOffline);

const CLIENT_ID = '689727011138-vtf8fnjjgcpbluamb2kk8cejvrt3ri0c.apps.googleusercontent.com';
const API_KEY = 'AIzaSyByrdgNgrLHASHGaeqX75wLs9fN9zlC7XY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
// const SCOPES = [
//   'https://www.googleapis.com/auth/directory.readonly',
//   'https://www.googleapis.com/auth/contacts.readonly'
// ]
// const SCOPES = 'https://www.googleapis.com/auth/directory.readonly';
const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';

Vue.use(GoogleAPIs, {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
})

Vue.config.productionTip = false

export const bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

import NotificationHelper from '@/mixins/NotificationHelper'

Vue.mixin(NotificationHelper);
Vue.use(Meta, {
  keyName: 'metaInfo',
  attribute: 'data-vue-meta',
  ssrAttribute: 'data-vue-meta-server-rendered',
  tagIDKeyName: 'vmid',
  refreshOnceOnNavigation: true
});
Vue.use(VueLodash, {
  name: 'custom',
  lodash: lodash
})