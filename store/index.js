export const strict = false;

import Vue from "vue";
import Vuex from "vuex";
// Modules
import fileUpload from "@/store/modules/fileUpload"
import auth from "@/store/modules/auth";
import config from "@/config/app";
import createPersistedState from "vuex-persistedstate";
import errors from "@/store/modules/errors"
import documents from "@/store/modules/documents";
import requestDocuments from "@/store/modules/requestDocuments";
import navigationOpen from "@/store/modules/navigationOpen";
import s3FileUpload from "@/store/modules/s3FileUpload"
import contacts from "@/store/modules/contacts"
import contactTypes from "@/store/modules/contactTypes"
import configurableDocuments from "@/store/modules/configurableDocuments"
import employeeDocuments from "@/store/modules/employee/employeeDocuments"
import employeeData from "@/store/modules/employee/employeeData"
import documentNotes from "@/store/modules/documentNotes"
import dashboard from "@/store/modules/dashboard"
import settings from "@/store/modules/settings"
import templates from "@/store/modules/templates"
import subscription from "@/store/modules/subscription"
import userStatus from "@/store/modules/userStatus"
import company from "@/store/modules/company"
import templateWorkflow from "@/store/modules/templateWorkflow"
import companyTemplates from "@/store/modules/companyTemplates"
import entities from "@/store/modules/entity";
import templatesData from "./modules/templatesData";
import repeatableTemplates from "./modules/repeatableTemplates";
import globalVariables from './modules/globalVariables';
import menuManagement from "./modules/menuManagement";
import menuManagementV2 from "./modules/menuManagementV2";
import entityGroups from "./modules/entityGroups";
import filters from "./modules/filters"
import entityRelationships from "./modules/entityRelationships";
import roles from "./modules/roles";


import formBuilders from "./modules/formBuilder";
import formbuilderData from "./modules/formbuilderData";
import customDashboard from "./modules/customDashboard";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        fileUpload,
        errors,
        documents,
        navigationOpen,
        s3FileUpload,
        contacts,
        configurableDocuments,
        employeeDocuments,
        employeeData,
        documentNotes,
        contactTypes,
        dashboard,
        settings,
        templates,
        subscription,
        userStatus,
        company,
        templateWorkflow,
        companyTemplates,
        entities,
        templatesData,
        repeatableTemplates,
        globalVariables,
        menuManagement,
        menuManagementV2,
        entityGroups,
        entityRelationships,
        roles,
        requestDocuments,
        filters,
        formBuilders,
        formbuilderData,
        customDashboard,
    },
    strict: false,
    plugins: [
        createPersistedState({
            key: config.APP_NAME + '_' + config.APP_VERSION
        })
    ]
});

export default store;