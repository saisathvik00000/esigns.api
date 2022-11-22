import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'

// Auth routes
import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/SignUp'
import UserRegistrationProfile from '@/views/auth/UserRegistrationProfile'
import UserVerify from '@/views/auth/UserVerify'
import JoinUs from '@/views/auth/JoinUs'

import ForgotPassword from '../views/auth/ForgotPassword'
import UpdatePassword from '../views/auth/UpdatePassword'
import Dashboard from '../components/Dashboard'
import CompanyProfile from '../views/company/CompanyProfile'
import Myprofile from '../views/myaccount/Profile'


import AuthMiddleware from "../middleware/auth"

// Hr
import Employees from '../views/hr/Employees.vue'
import Vendors from '../views/hr/Vendors.vue'
import Users from '../views/hr/Users.vue'
import Customers from '../views/hr/Customers.vue'
import DocumentTemplates from '../views/hr/DocumentTemplates.vue'


/** START OF COMPANY DOCUMENTS  */

// import CompanyDocuments from '../views/companyDocuments/CompanyDocuments'

// outer pages
import AllDocumentsManager from '../views/companyDocumentManager/AllDocumentsManager'
import CustomDocumentsList from '../views/companyDocumentManager/CustomDocumentsList'
import StaticDocumentsList from '../views/companyDocumentManager/StaticDocumentsList'
import RequestedDocumentsList from '../views/companyDocumentManager/RequestedDocumentsList'
import StandardDocumentsList from '../views/companyDocumentManager/StandardDocumentsList'


// listing pages
import AllDocuments from '../views/companyDocuments/AllDocuments'
import AllDocumentGroups from '../views/companyDocuments/AllDocumentGroups'
import AllDocumentGroupsDetails from '../views/companyDocuments/AllDocumentGroupsDetails'
import AllDocumentCategoriesDetails from '../views/companyDocuments/AllDocumentCategoriesDetails'
import AllDocumentCategories from '../views/companyDocuments/AllDocumentCategories'


// configure pages
import ConfigureCompanyDocument from '../components/companyDocuments/configureDocuments/ConfigureCompanyDocument'
import ConfigureDocTypeDocument from '../components/companyDocuments/configureDocuments/ConfigureDocTypeDocument'
import ConfigureI9Document from '../components/companyDocuments/configureDocuments/ConfigureI9Document'
import ConfigureW4Document from '../components/companyDocuments/configureDocuments/ConfigureW4Document'
import ConfigureW9Document from '../components/companyDocuments/configureDocuments/ConfigureW9Document'
import ConfigureMDVDocument from '../components/companyDocuments/configureDocuments/ConfigureMDVDocument'
import ConfigureMEFGDocument from '../components/companyDocuments/configureDocuments/ConfigureMEFGDocument'



import CustomDocumentExecute from '../components/executeCompanyDocuments/CustomDocumentExecute'
import StaticDocumentExecute from '../components/executeCompanyDocuments/StaticDocumentExecute'
import StandardDocumentExecute from '../components/executeCompanyDocuments/StandardDocumentExecute'
import RequestedDocumentExecute from '../components/executeCompanyDocuments/RequestedDocumentExecute'

import CustomDocTypeDocumentExecute from '../components/executeCompanyDocuments/CustomDocTypeDocumentExecute'

// Preview Documents
import CustomDocumentPreview from '../components/previewCompanyDocuments/CustomDocumentPreview'
import StaticDocumentPreview from '../components/previewCompanyDocuments/StaticDocumentPreview'
import StandardDocumentPreview from '../components/previewCompanyDocuments/StandardDocumentPreview'
import RequestedDocumentPreview from '../components/previewCompanyDocuments/RequestedDocumentPreview'
import CustomDocTypeDocumentPreview from '../components/previewCompanyDocuments/CustomDocTypeDocumentPreview'




/* Start of  Users*/
import UsersList from '../components/users/UsersList'
import AddUser from '../components/users/AddUser'
import UserTypes from '../components/users/UserTypes'


import CompanyBenefits from '../views/companyBenefits/companyBenefits.vue'
import AddBenefits from '../views/companyBenefits/addBenefits.vue'
import OfferLetter from '../views/OfferLetter.vue'
import OfferLetterTemplate from '../components/OfferLetterTemplate'
import EmployeeOnboarding from '../components/EmployeeOnboarding'


import i9 from '@/components/templates/StandardTemplates/I9Form'
import w4 from '@/components/companyDocuments/standardDocuments/W4Form'

import OfferLetters from '../views/offerLetters/OfferLetters'

import AddOfferLetter from '../views/offerLetters/AddOfferLetter'

import EmployeeDocument from '../views/employeeDocuments/EmployeeDocument'

import EmployeeDocuments from '../views/employeeDocuments/EmployeeDocuments'

// listing pages

import AllEmployeeDocuments from '../views/employeeDocuments/AllEmployeeDocuments'
import AllEmployeeDocumentGroups from '../views/employeeDocuments/AllEmployeeDocumentGroups'
import AllEmployeeDocumentGroupsDetails from '../views/employeeDocuments/AllEmployeeDocumentGroupsDetails'
import AllEmployeeDocumentCategoriesDetails from '../views/employeeDocuments/AllEmployeeDocumentCategoriesDetails'
import AllEmployeeDocumentCategories from '../views/employeeDocuments/AllEmployeeDocumentCategories'




import SingleEmployeeDocuments from '../views/employeeDocuments/SingleEmployeeDocuments'

// import VerifyEmployeeDocument from '../components/employeeDocuments/VerifyEmployeeDocument'
// import ViewEmployeeDocument from '../components/employeeDocuments/ViewEmployeeDocument'
// import VerifyEmployeeDocumentImage from '../components/employeeDocuments/VerifyEmployeeDocumentImage'


// employee routes

import EmployeeSignIn from '../views/auth/employee/EmployeeSignIn'
import EmployeeVerifyAccount from '../views/auth/employee/EmployeeVerifyAccount'
import EmployeeHome from '../views/EmployeeHome.vue'
import EmployeeDashboard from '../components/employee/EmployeeDashboard'

import EmployeeProfile from '../components/employee/EmployeeProfile'
import EmployeeBenefits from '../components/employee/EmployeeBenefits'

import EmployeeWorkflowsData from '../views/employee/EmployeeWorkflowsData'

import EmployeeWorkFlowExecute from '../components/employee/EmployeeWorkFlowExecute'
import EmployeeWorkFlowExecuteStep from '../components/employee/EmployeeWorkFlowExecuteStep'

import EmployeeWorkFlowView from '../components/employee/EmployeeWorkFlowView'
import EmployeeWorkFlowViewStep from '../components/employee/EmployeeWorkFlowViewStep'


import MyDocuments from '../views/employee/MyDocuments'


import EmpDocumentsStats from '../components/employeeDocuments/employeeDocumentsStats'
import EmpDocuments from '../views/employeeDocuments/documentsCategories/EmployeeDocuments'
import EmpPendingDocuments from '../views/employeeDocuments/documentsCategories/EmployeePendingDocuments'
import EmpExpiredDocuments from '../views/employeeDocuments/documentsCategories/EmployeeExpiredDocuments'
import EmpDocsSignatureRequests from '../views/employeeDocuments/documentsCategories/EmpDocsSignatureRequests'
import EmpDocsWaitingForOthers from '../views/employeeDocuments/documentsCategories/EmpDocsWaitingForOthers'

import EmployeeStaticDocument from '../components/employee/executeEmployeeDocuments/EmployeeStaticDocument'
import EmployeeStandardDocument from '../components/employee/executeEmployeeDocuments/EmployeeStandardDocument'
import EmployeeCustomDocument from '../components/employee/executeEmployeeDocuments/EmployeeCustomDocument'
import EmployeeCustomDocTypeDocument from '../components/employee/executeEmployeeDocuments/EmployeeCustomDocTypeDocument'
import EmployeeRequestedDocument from '../components/employee/executeEmployeeDocuments/EmployeeRequestedDocument'

import RequestedEmployeeDocuments from '../components/employee/documentRequests/RequestedEmployeeDocuments'

import EmployerStandardDocument from '../components/employee/executeEmployeeDocuments/EmployerStandardDocument'
import EmployerPasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerPasswordVerification'
import EmployerCustomDocTypePasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocTypePasswordVerification'
import EmployerCustomDocumentPasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocumentPasswordVerification'


Vue.use(Router)

import employeeDocumentsRoutes from './employeeDocumentsRoutes'

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      name: "home",

      children: [{
        path: "",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: AuthMiddleware.user,
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: "/company-profile",
        name: "Company Profile",
        component: CompanyProfile,
        beforeEnter: AuthMiddleware.user,
        meta: {
          title: 'Dashboard'
        }
      },
      {
        path: "/company-benefits",
        name: "CompanyBenefits",
        component: CompanyBenefits,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/hr/employees",
        name: "employees",
        component: Employees,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/hr/vendors",
        name: "vendors",
        component: Vendors,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/hr/users",
        name: "users",
        component: Users,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/hr/customers",
        name: "customers",
        component: Customers,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/hr/document-templates",
        name: "DocumentTemplates",
        component: DocumentTemplates,
        beforeEnter: AuthMiddleware.user,
      },
      // Company Documents 
      {
        path: "/company-documents",
        name: "Company Documents",
        component: AllDocumentsManager,
        beforeEnter: AuthMiddleware.user,
        children: [

          {
            path: "static",
            name: "Static-documents",
            component: StaticDocumentsList,
            beforeEnter: AuthMiddleware.user,
            children: [{
              path: "",
              name: "All Documents",
              component: AllDocuments,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories",
              name: "static-categories",
              component: AllDocumentCategories,
              beforeEnter: AuthMiddleware.user

            },
            {
              path: "all-groups",
              name: "static-groups",
              component: AllDocumentGroups,
              beforeEnter: AuthMiddleware.user

            },
            {
              path: "all-groups/:groupId",
              name: "static-group-data",
              component: AllDocumentGroupsDetails,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories/:categoryId",
              name: "static-category-data",
              component: AllDocumentCategoriesDetails,
              beforeEnter: AuthMiddleware.user
            },
            ]
          },
          {
            path: "custom",
            name: "Custom-documents",
            component: CustomDocumentsList,
            beforeEnter: AuthMiddleware.user,
            children: [{
              path: "",
              name: "All Documents",
              component: AllDocuments,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories",
              name: "custom-categories",
              component: AllDocumentCategories,
              beforeEnter: AuthMiddleware.user

            },
            {
              path: "all-groups",
              name: "custom-groups",
              component: AllDocumentGroups,
              beforeEnter: AuthMiddleware.user

            },
            {
              path: "all-groups/:groupId",
              name: "custom-group-data",
              component: AllDocumentGroupsDetails,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories/:categoryId",
              name: "custom-category-data",
              component: AllDocumentCategoriesDetails,
              beforeEnter: AuthMiddleware.user
            },
            ]
          },

          {
            path: "requested",
            name: "requested-documents",
            component: RequestedDocumentsList,
            beforeEnter: AuthMiddleware.user,
            children: [{
              path: "",
              name: "All Documents",
              component: AllDocuments,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories",
              name: "requested-categories",
              component: AllDocumentCategories,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-groups",
              name: "requested-groups",
              component: AllDocumentGroups,
              beforeEnter: AuthMiddleware.user

            },
            {
              path: "all-groups/:groupId",
              name: "requested-group-data",
              component: AllDocumentGroupsDetails,
              beforeEnter: AuthMiddleware.user
            },
            {
              path: "all-categories/:categoryId",
              name: "requested-category-data",
              component: AllDocumentCategoriesDetails,
              beforeEnter: AuthMiddleware.user
            },
            ]
          },
          {
            path: "/company-documents/standard",
            name: "Standard-documents",
            component: StandardDocumentsList,
            beforeEnter: AuthMiddleware.user
          },

          {
            path: "/company-documents/offer-letters",
            name: "OfferLetters",
            component: OfferLetter,
            beforeEnter: AuthMiddleware.user
          },

        ]
      },


      {
        path: "/i9",
        name: "i9",
        component: i9,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/w4",
        name: "w4",
        component: w4,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/offer-letters",
        name: "OfferLetters",
        component: OfferLetters,
        beforeEnter: AuthMiddleware.user,

      },

      {
        path: "/offer-letters/add",
        name: "AddOfferLetter",
        component: AddOfferLetter,
        beforeEnter: AuthMiddleware.user,
      },

      {
        path: "/offer-letter-templates/template",
        name: "OfferLetterTemplate",
        component: OfferLetterTemplate,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/offer-letter-templates/template/:template_id",
        name: "EditOfferLetterTemplate",
        component: OfferLetterTemplate,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/employee-onboarding",
        name: "EmployeeOnboarding",
        component: EmployeeOnboarding,
        beforeEnter: AuthMiddleware.user,

      },

      {
        path: "/users",
        name: "UsersList",
        component: UsersList,
        beforeEnter: AuthMiddleware.user,

      },
      {
        path: "/users/add",
        name: "AddUser",
        component: AddUser,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/users/user-types",
        name: "UserTypes",
        component: UserTypes,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/employee-list/:employee_id/document/:configurable_document_id",
        name: "EmployeeDocument",
        component: EmployeeDocument,
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/employee-list/:employee_id/document/:configurable_document_id/:type",
        name: "EmployeeDocumentImage",
        component: EmployeeDocument,
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/employee-documents",
        name: "EmployeeDocuments",
        component: EmployeeDocuments,
        beforeEnter: AuthMiddleware.user,
        children: [{
          path: "",
          name: "AllEmployeeDocuments",
          component: AllEmployeeDocuments,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-categories",
          name: "AllEmployeeDocumentCategories",
          component: AllEmployeeDocumentCategories,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-groups",
          name: "AllEmployeeDocumentGroups",
          component: AllEmployeeDocumentGroups,
          beforeEnter: AuthMiddleware.user

        },
        {
          path: "all-groups/:groupId",
          name: "AllEmployeeDocumentGroupsDetails",
          component: AllEmployeeDocumentGroupsDetails,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-categories/:categoryId",
          name: "AllEmployeeDocumentCategoriesDetails",
          component: AllEmployeeDocumentCategoriesDetails,
          beforeEnter: AuthMiddleware.user
        }
        ]
      },

      {
        path: "/emp-documents",
        component: EmpDocumentsStats,
        name: "emp-documents",
        beforeEnter: AuthMiddleware.user,
        children: [
          {
            path: "all",
            name: "all-documents",
            component: EmpDocuments,
            beforeEnter: AuthMiddleware.user,
          },
          {
            path: "pending",
            component: EmpPendingDocuments,
            name: "emp-pending-documents",
            beforeEnter: AuthMiddleware.user
          },
          {
            path: "expired",
            component: EmpExpiredDocuments,
            name: "emp-expired-documents",
            beforeEnter: AuthMiddleware.user
          },
          {
            path: "signature-requests",
            component: EmpDocsSignatureRequests,
            name: "emp-docs-signature-requests",
            beforeEnter: AuthMiddleware.user
          },
          {
            path: "waiting-for-others",
            component: EmpDocsWaitingForOthers,
            name: "emp-docs-waiting-for-others",
            beforeEnter: AuthMiddleware.user
          },
        ]
      },

      {
        path: "/employee-documents/employee",
        name: "SingleEmployeeDocuments",
        component: SingleEmployeeDocuments,
        beforeEnter: AuthMiddleware.user,
      },
      {
        path: "/employee-documents/employee/:employee_id",
        name: "SingleEmployeeDocuments",
        component: SingleEmployeeDocuments,
        beforeEnter: AuthMiddleware.user,

        children: [{
          path: "",
          name: "SingleEmployeeAllDocuments",
          component: AllEmployeeDocuments,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-categories",
          name: "SingleEmployeeDocumentCategories",
          component: AllEmployeeDocumentCategories,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-groups",
          name: "SingleEmployeeDocumentGroups",
          component: AllEmployeeDocumentGroups,
          beforeEnter: AuthMiddleware.user

        },
        {
          path: "all-groups/:groupId",
          name: "SingleEmployeeDocumentGroupsDetails",
          component: AllEmployeeDocumentGroupsDetails,
          beforeEnter: AuthMiddleware.user
        },
        {
          path: "all-categories/:categoryId",
          name: "SingleEmployeeDocumentCategoriesDetails",
          component: AllEmployeeDocumentCategoriesDetails,
          beforeEnter: AuthMiddleware.user
        }
        ]
      },
      ]
    },


    // Admin routes which does not have side bar 
    {
      path: "/company-documents/:document_id/configure/image",
      name: "configure-document-image",
      component: ConfigureCompanyDocument,
      beforeEnter: AuthMiddleware.user
    },


    // page to create new document 
    {
      path: "/company-documents/:document_id/configure/document",
      name: "configure-custom-document",
      component: ConfigureDocTypeDocument,
      beforeEnter: AuthMiddleware.user
    },


    {
      path: "/company-documents/:document_id/configure/document/:configurable_document_id/update",
      name: "edit-configure-custom-document",
      component: ConfigureDocTypeDocument,
      beforeEnter: AuthMiddleware.user
    },



    {
      path: "/company-documents/:document_id/configure/image/:configurable_document_id/update",
      name: "edit-configure-document-image",
      component: ConfigureCompanyDocument,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/custom/:document_id/:configurable_document_id/execute",
      name: "execute-custom-document",
      component: CustomDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },

    {
      path: "/company-documents/custom/:document_id/:configurable_document_id/preview",
      name: "preview-custom-document",
      component: CustomDocumentPreview,
      beforeEnter: AuthMiddleware.user
    },

    {
      path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute",
      name: "execute-custom-doc-type-document",
      component: CustomDocTypeDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/custom/:document_id/:configurable_document_id/execute/:workflow_data_id",
      name: "execute-custom-document-user",
      component: CustomDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/custom/:document_id/:configurable_document_id/preview/:workflow_data_id",
      name: "preview-custom-document-user",
      component: CustomDocumentPreview,
      beforeEnter: AuthMiddleware.user
    },

    {
      path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute/:workflow_data_id",
      name: "execute-custom-doc-type-document-user",
      component: CustomDocTypeDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/custom/document/:document_id/:configurable_document_id/preview/:workflow_data_id",
      name: "preview-custom-doc-type-document-user",
      component: CustomDocTypeDocumentPreview,
      beforeEnter: AuthMiddleware.user
    },

    {
      path: "/company-documents/static/:document_id/execute",
      name: "execute-static-document",
      component: StaticDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/static/:document_id/execute",
      name: "execute-static-document-user",
      component: StaticDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/static/:document_id/preview/:workflow_data_id",
      name: "preview-static-document",
      component: StaticDocumentPreview,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/requested/:document_id/execute/:workflow_data_id",
      name: "execute-requested-document-user",
      component: RequestedDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/requested/:document_id/preview/:workflow_data_id",
      name: "preview-requested-document",
      component: RequestedDocumentPreview,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/standard/:document_slug/execute/:workflow_data_id",
      name: "execute-standard-document-user",
      component: StandardDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/standard/:document_slug/execute",
      name: "execute-standard-document",
      component: StandardDocumentExecute,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/standard/:document_slug/preview/:workflow_data_id",
      name: "preview-standard-document-user",
      component: StandardDocumentPreview,
      beforeEnter: AuthMiddleware.userOrServer
    },
    {
      path: "/company-documents/i9-form/configure",
      name: "i9-form-add-configuration",
      component: ConfigureI9Document,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/w4-form/configure",
      name: "w4-form-add-configuration",
      component: ConfigureW4Document,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/w9-form/configure",
      name: "w9-form-add-configuration",
      component: ConfigureW9Document,
      beforeEnter: AuthMiddleware.user
    },
    {
      path: "/company-documents/dental-vision-enrollment-form/configure",
      name: "dental-vision-enrollment-form-add-configuration",
      component: ConfigureMDVDocument,
      beforeEnter: AuthMiddleware.user
    },

    {
      path: "/company-documents/medical-enrollment-form-geoblue/configure",
      name: "medical-enrollment-form-geoblue-add-configuration",
      component: ConfigureMEFGDocument,
      beforeEnter: AuthMiddleware.user
    },

    // employee document download paths
    ...employeeDocumentsRoutes,



    // Auth Employee Routes
    {
      path: "/emp",
      component: EmployeeHome,
      name: "EmployeeHome",
      children: [{
        path: "",
        name: "EmployeeDashboard",
        component: EmployeeDashboard,
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/workflows",
        component: EmployeeWorkflowsData,
        name: "Employee-account-details",
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/document-requests",
        component: RequestedEmployeeDocuments,
        name: "requested-employee-documents",
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/documents",
        component: MyDocuments,
        name: "employee-documents",
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/profile",
        component: EmployeeProfile,
        name: "Employee-profile",
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/benefits",
        component: EmployeeBenefits,
        name: "Employee-profile",
        beforeEnter: AuthMiddleware.user
      },


      // for edit workflow for emp
      {
        path: "/emp/wf/:workflow_code/:workflow_data_id",
        name: "EmployeeWorkFlowExecute",
        component: EmployeeWorkFlowExecute,
        beforeEnter: AuthMiddleware.user,

        children: [{
          path: '/emp/wf/:workflow_code/:template_code/:workflow_data_id',
          name: "EmployeeWorkFlowExecuteStep",
          component: EmployeeWorkFlowExecuteStep,
          beforeEnter: AuthMiddleware.user
        }]
      },

      // for view workflow data  from emp
      {
        path: "/emp/wf/:workflow_code/:workflow_data_id",
        name: "EmployeeWorkFlowView",
        component: EmployeeWorkFlowView,
        beforeEnter: AuthMiddleware.user,

        children: [{
          path: '/emp/wf/view/:workflow_code/:template_code/:workflow_data_id',
          name: "EmployeeWorkFlowViewStep",
          component: EmployeeWorkFlowViewStep,
          beforeEnter: AuthMiddleware.user
        }]
      },
      {
        path: "/emp/documents/static/:employee_document_id",
        name: "employee-static-document",
        component: EmployeeStaticDocument,
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/documents/standard/:document_slug/:employee_document_id",
        name: "employee-standard-document",
        component: EmployeeStandardDocument,
        beforeEnter: AuthMiddleware.user
      },
      {
        path: "/emp/documents/standard/:document_slug/:employee_document_id/pp",
        name: "employee-standard-document-pp",
        component: EmployerStandardDocument,
        beforeEnter: AuthMiddleware.passwordProtected
      },

      {
        path: "/emp/documents/custom/:employee_document_id",
        name: "employee-custom-document",
        component: EmployeeCustomDocument,
        beforeEnter: AuthMiddleware.user
      },

      {
        path: "/emp/documents/custom/:employee_document_id/pp",
        name: "employee-custom-document-pp",
        component: EmployeeCustomDocument,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
      },


      {
        path: "/emp/documents/custom/document/:employee_document_id",
        name: "employee-custom-doc-type-document",
        component: EmployeeCustomDocTypeDocument,
        beforeEnter: AuthMiddleware.user
      },

      {
        path: "/emp/documents/custom/document/:employee_document_id/pp",
        name: "employee-custom-doc-type-document-pp",
        component: EmployeeCustomDocTypeDocument,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
      },
      {
        path: "/emp/documents/requested/:employee_document_id",
        name: "employee-requested-document",
        component: EmployeeRequestedDocument,
        beforeEnter: AuthMiddleware.user
      }
      ]
    },


    {
      path: "/emp/documents/standard/:document_slug/:employee_document_id/pp/verify-password",
      name: "employee-standard-document-password-verification",
      component: EmployerPasswordVerification
    },
    {
      path: "/emp/documents/custom/:employee_document_id/pp/verify-password",
      name: "employee-custom-document-password-verification",
      component: EmployerCustomDocumentPasswordVerification
    },
    {
      path: "/emp/documents/custom/document/:employee_document_id/pp/verify-password",
      name: "employee-doc-type-document-password-verification",
      component: EmployerCustomDocTypePasswordVerification
    },


    // Un Auth Employee Routes
    {
      path: "/employee/signin",
      component: EmployeeSignIn,
      name: "Employee-signin",
      beforeEnter: AuthMiddleware.guestEmployee

    },
    {
      path: "/employee/verify-account",
      component: EmployeeVerifyAccount,
      name: "Employee-verify-account",

    },


    // Admin routes



    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/join-us",
      name: "JoinUs",
      component: JoinUs,
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/create-profile",
      name: "UserRegistrationProfile",
      component: UserRegistrationProfile,
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/verify",
      name: "UserVerify",
      component: UserVerify,
      beforeEnter: AuthMiddleware.guest
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword
    },
    {
      path: "/update-password",
      name: "UpdatePassword",
      component: UpdatePassword
    },

    {
      path: "/add-benefits",
      name: "AddBenefits",
      component: AddBenefits
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})