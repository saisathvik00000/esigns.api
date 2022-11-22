import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home = () =>
    import('@/views/Home.vue')
const Dashboard = () =>
    import('@/views/Dashboard')
// Auth routes
const SignIn = () =>
    import('@/views/auth/SignIn')
const SignUp = () =>
    import('@/views/auth/SignUp')
const UserRegistrationProfile = () =>
    import('@/views/auth/UserRegistrationProfile')
const UserVerify = () =>
    import('@/views/auth/UserVerify')
const SendVerification = () =>
    import('@/views/auth/SendVerification')
const JoinUs = () =>
    import('@/views/auth/JoinUs')

const ForgotPassword = () =>
    import('@/views/auth/ForgotPassword')
const ForgotPasswordVerification = () =>
    import('@/views/auth/ForgotPasswordVerification')
const InviteUser = () =>
    import('@/views/auth/InviteUser')

// Profile routes
const Profile = () =>
    import('@/views/account/Profile');
const Profilesettings = () =>
    import('@/views/account/Profilesettings');
const PersonalInformation = () =>
    import("@/components/account/PersonalInformation");
const SubscriptionInformation = () =>
    import("@/components/account/SubscriptionInformation");
const Brandings = () =>
    import("@/components/account/Branding");
const CompanyUsers = () =>
    import("@/components/account/CompanyUsers");
const Signature = () =>
    import("@/components/account/Signature");
const Initial = () =>
    import("@/components/account/Initial");
const UpdatePassword = () =>
    import("@/components/account/UpdatePassword");
const Permissions = () =>
    import("@/components/account/Permissions");
const Statistics = () =>
    import("@/components/account/dashboardStats");
const AppCredentials = () =>
    import("@/components/account/AppCredentials");
    
const DocumentExpirationReminders = () =>
    import("@/components/account/DocumentExpirationReminders");
const ApplicationSettings = () =>
    import("@/components/account/ApplicationSettings");
const Notifications = () =>
    import("@/components/account/Notifications");

// Branding
const Branding = () =>
    import("@/views/account/Branding");
const signSuccessMessage = () =>
    import('@/components/signSuccessMessage')
const SignDocuments = () =>
    import('@/components/SignDocuments')
const FinishLaterSuccess = () =>
    import('@/components/FinishLaterSuccess')

// Contact routes
const Contacts = () =>
    import('@/components/contacts/Contacts')
const AddContacts = () =>
    import('@/components/contacts/AddContact')
const UserDocuments = () =>
    import('@/components/contacts/UserDocuments');

// Contact types routes
const ContactTypes = () =>
    import('@/components/contacts/ContactTypes')

import AuthMiddleware from "@/middleware/auth"

const Documents = () =>
    import('@/components/companyDocuments/AllDocuments')
const RequestDocuments = () =>
    import('@/components/requestDocuments/AllRequestDocuments')
const RequestDocumentsSelectCardType = () =>
    import('@/components/requestDocuments/SelectCardType')
const RequestDocumentDraft = () =>
    import('@/components/requestDocuments/RequestDocumentDraft')
const AllTemplates = () =>
    import('@/components/templates/AllTemplates')

// uploading files
const UploadDocumentPreference = () =>
    import('@/components/companyDocuments/UploadDocumentPreference')
const UploadTemplatePreference = () =>
    import('@/components/companyDocuments/UploadTemplatePreference')

const UploadRequestDocumentPreference = () =>
    import('@/components/requestDocuments/UploadRequestDocumentPreference')

// const ViewEmployeeCustomDraftDocument = () => import('@/components/ViewEmployeeCustomDocumentDraftPreview')
const ViewEmployeeCustomDocument = () =>
    import('@/components/ViewEmployeeCustomDocumentPreview')
const DocumentPreview = () =>
    import('@/components/employeeDocuments/viewDocuments/DocumentPreview')
const ConfigureEmployeeDocumentDraft = () =>
    import("@/components/ConfigureEmployeeDocumentDraft")

//get link routes
// const PublishedTemplatePreiview = () => import('@/components/templates/ViewPublishedTemplatePreiview.vue');

const sendDocumentOnMail = () =>
    import('@/components/companyDocuments/sendDocumentOnMail')
const sendTemplateOnMail = () =>
    import('@/components/companyDocuments/sendTemplateOnMail');
const MenuManagement = () =>
    import('../views/menuManagement')

// configure pages
import ConfigureCompanyDocument from '../components/companyDocuments/configureDocuments/ConfigureCompanyDocument'
import ConfigureCompanyTemplate from '../components/companyDocuments/configureDocuments/ConfigureCompanyTemplate'
import ConfigureCompanyTemplatePreview from '../components/companyDocuments/configureDocuments/ConfigureCompanyTemplatePreview'
import ConfigureDocTypeDocument from '../components/companyDocuments/configureDocuments/ConfigureDocTypeDocument'

import CustomDocumentExecute from '../components/executeCompanyDocuments/CustomDocumentExecute'
import StaticDocumentExecute from '../components/executeCompanyDocuments/StaticDocumentExecute'
import RequestedDocumentExecute from '../components/executeCompanyDocuments/RequestedDocumentExecute'

import CustomDocTypeDocumentExecute from '../components/executeCompanyDocuments/CustomDocTypeDocumentExecute'

// Preview Documents
const ViewEmployeeCustomDocumentStatus = () =>
    import('@/components/ViewEmployeeCustomDocumentStatus')
//document flow 
// const ViewDocumentSentWorkflow = () => import('@/components/ViewDocumentSendWorkflow')


import CustomDocumentPreview from '../components/previewCompanyDocuments/CustomDocumentPreview'
import StaticDocumentPreview from '../components/previewCompanyDocuments/StaticDocumentPreview'
import CustomDocTypeDocumentPreview from '../components/previewCompanyDocuments/CustomDocTypeDocumentPreview'

//workflow
import WorkflowList from '../components/workFlows/templateWorkflowList'
import AddEditWorkflow from '../components/workFlows/addEditWorkflow'
import WorkflowDataList from '../components/workFlows/templateWorkflowDataList'

import EmployerCustomDocTypePasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocTypePasswordVerification'
import EmployerCustomDocumentPasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocumentPasswordVerification'

//Custom Dashboard
const customDashboardConfig = () => import('@/components/customDashboard/customDashboardConfig.vue');
const customDashboardList = () => import('@/components/customDashboard/customDashboardList.vue');

const CompanyUserList = () =>
    import('@/components/company/CompanyUsers');
const NewTemplate = () =>
    import('../views/templates/NewTemplate');
const TemplateList = () =>
    import('../views/templates/TemplatesList');
const ViewTemplate = () =>
    import('@/components/templates/ViewTemplate')
const EntitiesList = () =>
    import('@/components/entity/EntitiesList');
const AddEditEntity = () =>
    import('@/components/entity/AddEditEntity');
const ViewEntity = () =>
    import("@/components/entity/ViewEntity");
const UserTemplatesData = () =>
    import('@/views/users/UserTemplatesData');
const ViewEntityData = () =>
    import('@/components/entity/ViewEntityData');

// entity Exectute
const EntityExecute = () =>
    import("@/components/entity/entityExecute");
const EntityExecuteStep = () =>
    import("@/components/entity/entityExecuteSteps");
const PreviewEntityData = () =>
    import("@/components/entity/preview");
const PreviewEntityDataStep = () =>
    import("@/components/entity/previewStep");
const PageNotFound = () => import('@/views/pageNotFound');

const GlobalVariablesList = () =>
    import('../views/globalVariables/GlobalVariablesList');
const GlobalVariableAdd = () =>
    import('../views/globalVariables/GlobalVariableAdd');
const EntityGroupsDashboard = () =>
    import('@/components/Groups/EntityGroups');

const EntityGroupPreview = () =>
    import('../views/entities/EntityGroupPreview')
const EntityGroupPreviewEntityData = () =>
    import('../views/entities/EntityGroupPreviewEntityData');

const Roles=()=> import('@/components/Roles/Roles');
const NewFormBuilder = () => import('@/views/formBuilders/NewFormBuilder')
const FormBuilderList = () => import('@/views/formBuilders/FormBuildersList')
const FormBuilderUserData = () => import('@/views/formBuilders/FormBuilderUserData')
const FormbuilderView = () => import('@/components/formBuilders/formbuilderView.vue')
const FormbuilderViewStep = () => import('@/components/formBuilders/formbuilderViewStep.vue')
const FormbuilderDataList = () => import('@/components/formBuilders/formbuilderTemplateDataList')
const GuestFormbuilderExecute = () => import('@/components/formBuilders/GuestFormbuilderExecute.vue')
const GuestFormbuilderCompleted = () => import('@/components/formBuilders/formbuilderCompletedMessage')
const GuestFormbuilderExecuteStep = () => import('@/components/formBuilders/GuestFormbuilderExecuteStep.vue')
const GuestFormbuilderUserSubmittedDataList = () => import('@/components/formBuilders/FormbuilderUserSubmittedDataList')

const routes = [{
        path: '/',
        component: Home,
        name: "home",
        beforeEnter: AuthMiddleware.user,
        children: [{
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard,
                // beforeEnter: AuthMiddleware.user,
                alias: '',
                meta: {
                    title: 'Dashboard',
                    metaTags: [{
                            name: 'Dashboard',
                            content: 'eSigns understands your business process better, faster, and quicker than the rest of the world to ensure hassle-free and paperless workflow management.'
                        },
                        {
                            property: 'og:description',
                            content: 'eSigns understands your business process better, faster, and quicker than the rest of the world to ensure hassle-free and paperless workflow management.'
                        }
                    ]               
                },
            },
            //custom dashboard
            {
                path: '/custom/dashboard-list',
                component: customDashboardList,
                name: 'CustomDashboardList'
            },
            //Roles
            {
                path: "/roles",
                component: Roles,
                name: "Roles",
            },

            {
                path: "/request-documents/all/:card_type?",
                name: "RequestDocuments",
                component: RequestDocuments,
                meta: {
                    title: 'Request Documents'
                }
            },
            {
                path: "/request-documents/select-card-type/:contact_id?",
                name: "RequestDocumentsSelectCardType",
                component: RequestDocumentsSelectCardType,
                meta: {
                    title: 'Request Documents'
                }
            },
            {
                path: "/request-documents/upload",
                name: "upload-request-documents",
                component: UploadRequestDocumentPreference,
                meta: {
                    title: 'Upload Request Documents'
                }
            },
            {
                path: "/request-documents/:request_document_id/edit",
                name: "request-documents-edit",
                component: RequestDocumentDraft,
                // beforeEnter: AuthMiddleware.user
                meta: {
                    title: 'Request Documents Edit'
                }
            },
            //Global Variables
            {
                path: "/global-variables",
                component: GlobalVariablesList,
                name: "GlobalVariables",

            },
            {
                path: "/global-variables/add",
                component: GlobalVariableAdd,

            },
            {
                path: "/global-variables/view/:global_variable_id",
                component: GlobalVariableAdd,
                name: "UpdateGlobalVariable",

            },
            {
                path: "/menu-management",
                name: "menuManagement",
                component: MenuManagement,
            },
            {
                path: "/company-entity-groups",
                name: "EntityGroupsDashboard",
                component: EntityGroupsDashboard,

            },
            {
                path: "/company-entity-groups/:group_id/preview",
                name: "EntityGroupPreview",
                component: EntityGroupPreview,
                beforeEnter: AuthMiddleware.user,
                children: [{
                        path: ":entity_id",
                        component: EntityGroupPreviewEntityData,
                        name: "EntityGroupPreviewEntityData",
                        beforeEnter: AuthMiddleware.user
                    },

                    // {
                    //     path: ":entity_id/preview",
                    //     name: "PreviewGroupEntity",
                    //     component: PreviewEntity,
                    //     beforeEnter: AuthMiddleware.user,
                    // },
                    // {
                    //     path: ":entity_id/preview/:entity_data_id",
                    //     name: "PreviewGroupEntityData",
                    //     component: PreviewEntity,
                    //     beforeEnter: AuthMiddleware.user,
                    // },
                    // {
                    //     path: ":entity_id/view/:entity_data_id",
                    //     name: "ViewGroupEntityData",
                    //     component: PreviewEntityData,
                    //     beforeEnter: AuthMiddleware.user,
                    // },
                    // {
                    //     path: ":entity_id/data",
                    //     name: "GroupEntitiesDataList",
                    //     component: EntitiesDataList,
                    //     beforeEnter: AuthMiddleware.user,
                    // }, 
                ]
            },
            {
                path: '/formBuilders',
                name: 'FormBuilderList',
                component: FormBuilderList,
                beforeEnter: AuthMiddleware.user
            },
            {
                path: '/fbd/:formbuilder_code',
                name:'FormBuilderUserData',
                component: FormBuilderUserData,
                beforeEnter: AuthMiddleware.user
            },
            {
                path: "/fbd/:formbuilder_code/data-list",
                name: "FormbuilderDataList",
                component: FormbuilderDataList,
                beforeEnter: AuthMiddleware.user,
            },
            {
                path: "/fb/:formbuilder_code/:formbuilder_data_id",
                name: "FormbuilderView",
                component: FormbuilderView,
                beforeEnter: AuthMiddleware.user,
                children: [{
                    path: '/fb/view/:formbuilder_code/:template_code/:formbuilder_data_id',
                    name: "FormbuilderViewStep",
                    component: FormbuilderViewStep,
                    beforeEnter: AuthMiddleware.user,
                    },
                ]
            },{
                path: "/fb/:formbuilder_code/:formbuilder_data_id",
                name: "FormbuilderEdit",
                component: FormbuilderView,
                beforeEnter: AuthMiddleware.user,
                children: [{
                    path: '/fb/edit/:formbuilder_code/:template_code/:formbuilder_data_id',
                    name: "FormbuilderEditStep",
                    component: FormbuilderViewStep,
                    beforeEnter: AuthMiddleware.user,
                    }
                ]
            },
            {
                path: "/templates",
                name: "Templates",
                component: AllTemplates,
                // beforeEnter: AuthMiddleware.user,
                meta: {
                    title: 'Templates'
                }
            },
            {
                path: "/workflows",
                name: "Workflows",
                component: WorkflowList,
                meta: {
                    title: 'Workflows'
                }
            },
            {
                path: "/workflow/:workflow_id",
                name: "Workflows-Data",
                component: WorkflowDataList,
                meta: {
                    title: 'Workflow Data'
                }
            },
            {
                path: "/documents/all/:contact_id?",
                name: "Documents",
                component: Documents,
                meta: {
                    title: 'Documents'
                }
            },
            {
                path: "/request-documents/all/:card_type?",
                name: "RequestDocuments",
                component: RequestDocuments,
                meta: {
                    title: 'Request Documents'
                }
            },
            {
                path: "/request-documents/select-card-type/:contact_id?",
                name: "RequestDocumentsSelectCardType",
                component: RequestDocumentsSelectCardType,
                meta: {
                    title: 'Request Documents'
                }
            },
            {
                path: "/documents-signed",
                name: "SignDocuments",
                component: SignDocuments,
                meta: {
                    title: 'Signed Documents'
                }
            },
            {
                path: "/documents/upload",
                name: "upload-documents",
                component: UploadDocumentPreference,
                meta: {
                    title: 'Upload Documents'
                }
            },
            {
                path: "/request-documents/upload",
                name: "upload-request-documents",
                component: UploadRequestDocumentPreference,
                meta: {
                    title: 'Upload Request Documents'
                }
            },
            {
                path: "/templates/upload",
                name: "upload-templates",
                component: UploadTemplatePreference,
                meta: {
                    title: 'Upload Templates'
                }
            },
            // Profile Routes
            {
                path: '/profile',
                name: "profile",
                component: Profile,
                children: [{
                        path: '/profile/personal-information',
                        name: 'personal-information',
                        component: PersonalInformation,
                        meta: {
                            title: 'Personal Information'
                        },
                        alias: '/profile',
                    },
                    {
                        path: '/profile/change-password',
                        name: 'change-password',
                        component: UpdatePassword,
                        meta: {
                            title: 'Change Password'
                        }
                    },
                    {
                        path: '/profile/manage-permissions',
                        name: 'manage-permissions',
                        component: Permissions,
                        meta: {
                            title: 'Manage Permissions'
                        }
                    },
                    {
                        path: '/profile/signature',
                        name: 'signature',
                        component: Signature,
                        meta: {
                            title: 'Signature'
                        }
                    },
                    {
                        path: '/profile/initial',
                        name: 'initial',
                        component: Initial,
                        meta: {
                            title: 'Initial'
                        }
                    },
                    {
                        path: '/profile/subscription',
                        name: 'subscription',
                        component: SubscriptionInformation,
                        meta: {
                            title: 'Subscription'
                        }
                    },
                    {
                        path: '/profile/companyUsers',
                        name: 'companyUsers',
                        component: CompanyUsers,
                        meta: {
                            title: 'Company Users'
                        }
                    },
                    {
                        path: '/profile/companyProfile',
                        name: 'companyProfile',
                        component: Brandings,
                        meta: {
                            title: 'Company Profile'
                        }
                    },

                ]
            },
            //profilesettings
            {
                path: '/profilesettings',
                name: "profilesettings",
                component: Profilesettings,
                children: [

                    {
                        path: '/profilesettings/document-expiration-reminders',
                        name: 'expiration-reminders',
                        component: DocumentExpirationReminders,
                        meta: {
                            title: 'Document Expiration & Reminders'
                        }
                    },
                    {
                        path: '/profilesettings/application-settings',
                        name: 'application-settings',
                        component: ApplicationSettings,
                        meta: {
                            title: 'Settings'
                        }
                    },
                    {
                        path: '/profilesettings/document-notifications',
                        name: 'document-notifications',
                        component: Notifications,
                        meta: {
                            title: 'Notifications'
                        }
                    },

                    {
                        path: '/profilesettings/initial',
                        name: 'profilesettingsInitial',
                        component: Initial,
                        meta: {
                            title: 'Profile settings Initial'
                        }
                    },
                    {
                        path: '/profilesettings/dashboard-settings',
                        name: 'statistics',
                        component: Statistics,
                        meta: {
                            title: 'Dashboard Status'
                        },
                        alias: '/profilesettings',
                    },
                    {
                        path: '/profilesettings/myapps-credentials',
                        name: 'myapps-credentials',
                        component: AppCredentials,
                        meta: {
                            title: 'Myapps Credentials'
                        },
                      
                    },

                ]
            },

            {
                path: '/branding',
                name: "Branding",
                component: Branding,
                meta: {
                    title: 'Branding'
                }
            },

            // Conatct Routes
            {
                path: "/contacts",
                name: "contacts",
                component: Contacts,
                meta: {
                    title: 'Contacts'
                }
            },
            {
                path: "/contacts/documents/:contact_id",
                name: "user-contacts",
                component: UserDocuments,
                meta: {
                    title: 'User Documents'
                }
            },
            {
                path: "/contacts/add",
                name: "add-contact",
                component: AddContacts,
                meta: {
                    title: 'Add Contact'
                }
            },
            {
                path: "/contacts/edit/:contact_id",
                name: "edit-contact",
                component: AddContacts,
                meta: {
                    title: 'Edit Contact'
                }
            },
            // Contact type 
            {
                path: "/contact-types",
                name: "contactTypes",
                component: ContactTypes,
                meta: {
                    title: 'Contact Types'
                }
            },
            {
                path: "/signature/documents/:status",
                name: "signature-documents",
                component: Documents,
                meta: {
                    title: 'Signature Documents'
                }
            },
            {
                path: "/send-document/mail/:id",
                name: "send-document-mail",
                component: sendDocumentOnMail,
            },
            {
                path: "/send-template/mail/:id/:document_id",
                name: "send-template-mail",
                component: sendTemplateOnMail,
            },
            {
                path: "/company/users",
                name: "Company Users",
                component: CompanyUserList,
                alias: '',
                meta: {
                    title: 'Company Users'
                }
            },
            // template Routes

            {
                path: "/template/create",
                name: "CreateFormTemplate",
                component: NewTemplate,
                meta: {
                    title: 'Create New Template '
                },
                alias: '',
            },

            {
                path: "/template",
                name: "Form Template",
                component: TemplateList,
                meta: {
                    title: 'Create New Template '
                },
                alias: '',
            },
            {
                path: "/template/:template_id/edit",
                name: "Edit Templates",
                component: NewTemplate,
                alias: '',
                meta: {
                    title: 'Edit Template '
                }
            },
            {
                path: "template/:template_id/view",
                name: "ViewTemplate",
                component: ViewTemplate,

            },

            //Entities Route
            {
                path: "/entity",
                name: "Entity List",
                component: EntitiesList,
                meta: {
                    title: 'Entity List'
                }
            },
            {
                path: "/entity/:entity_id/add",
                name: "Create Entity",
                component: AddEditEntity,
                meta: {
                    title: 'Create Entity'
                }
            },
            {
                path: "/entity/:entity_id/edit",
                name: "Edit Entity",
                component: AddEditEntity,
                meta: {
                    title: 'Edit Entity'
                }
            },
            {
                path: "/entity/:entity_id/view",
                name: "View Entity",
                component: ViewEntity,
                meta: {
                    title: 'View Entity'
                }
            },
            {
                path: "/entity/:entity_id",
                name: "EntityData",
                component: ViewEntityData,
                meta: {
                    title: 'View Entity Data'
                }
            },
            {
                path: "/entity/:user_id/:template_code",
                name: "TemplatesData",
                component: UserTemplatesData,
                meta: {
                    title: 'TemplatesData'
                }
            },
            {
                path: "/entity-execute/:entity_id",
                name: "EntityExecute",
                component: EntityExecute,
                children: [{
                    path: '/entity-execute/:entity_id/:template_code',
                    name: "EntityExecuteStep",
                    component: EntityExecuteStep,
                }]
            },
            {
                path: "/entity_data_view/:entity_id",
                name: "PreviewEntityData",
                component: PreviewEntityData,
                children: [{
                    path: '/entity_data_view/:entity_id/:template_code',
                    name: 'PreviewEntityDataStep',
                    component: PreviewEntityDataStep
                }]
            },
            {
                path: "/entityData-Edit/:entity_id",
                name: "EntityDataEdit",
                component: EntityExecute,
                children: [{
                    path: '/entityData-Edit/:entity_id/:template_code',
                    name: "EntityDataEditStep",
                    component: EntityExecuteStep,
                }]
            },

            //Entities Route End
        ]
    },
    /* form bulder */
    {
        path: "/formBuilders/add",
        name: "new-form-builder",
        component: NewFormBuilder,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/formBuilders/:form_builder_id",
        name: "EditFormBuilders",
        component: NewFormBuilder,
        beforeEnter: AuthMiddleware.user,

    },
    // sent document
    {
        path: "/emp-documents/custom/finish",
        name: "finish-later",
        component: FinishLaterSuccess,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    {
        path: "/emp-documents/custom/:employee_document_id",
        name: "employee-documents-custom-document",
        component: ViewEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    //success page 
    {
        path: "/emp-documents/custom/:employee_document/success",
        name: "signer-success-message",
        component: signSuccessMessage
    },
    {
        path: "/emp-documents/preview/:employee_document_id/pp/vp/:user_id",
        name: "document-preview",
        component: DocumentPreview,
    },
    {
        path: "/company-documents/:document_id/configure/template/:configurable_document_id/preview",
        name: "published-template-preiview",
        component: DocumentPreview
    },
    {
        path: "/public/fb/:formbuilder_code/:template_code/:formbuilder_details_id/auth/verify",
        name: "FormbuilderGuestAuth",
        component: DocumentPreview,
    },
    {
        path: "/public/fb/:formbuilder_code/:template_code/:formbuilder_details_id/vp/:user_id",
        name: "FormbuilderGuestUserAuth",
        component: DocumentPreview,
    },
    {
        path: "/public/fb/:formbuilder_code/:formbuilder_details_id",
        name: "GuestFormbuilderExecute",
        component: GuestFormbuilderExecute,
        beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected,

        children: [{
                path: '/public/fb/:formbuilder_code/:template_code/:formbuilder_details_id',
                name: "GuestFormbuilderExecuteStep",
                component: GuestFormbuilderExecuteStep,
                beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected
            },
            {
                path: '/public/fb/:formbuilder_code/:template_code/:formbuilder_details_id/:formbuilder_data_id',
                name: "GuestFormbuilderExecuteUpdateStep",
                component: GuestFormbuilderExecuteStep,
                beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected
            },
            {
                path: '/public/fb/:formbuilder_code/:template_code/:formbuilder_details_id/:formbuilder_data_id/view',
                name: "GuestFormbuilderExecuteViewStep",
                component: GuestFormbuilderExecuteStep,
                beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected
            }
        ]
    },
    {
        path: "/public/fbd/:formbuilder_code/:formbuilder_details_id/:user_id",
        name: "GuestFormbuilderUserSubmittedDataList",
        component: GuestFormbuilderUserSubmittedDataList,
        beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected
    },
    {
        path: "/public/fb/:formbuilder_code/:formbuilder_details_id/:formbuilder_data_id/status/completed",
        name: "GuestFormbuilderCompleted",
        component: GuestFormbuilderCompleted,
        beforeEnter: AuthMiddleware.guestUserFormbuilderPasswordProtected
    },
    //for declined
    {
        path: "/emp-documents/custom/:employee_document_id/pp/decline",
        name: "employee-documents-custom-document-pp-decline",
        component: ViewEmployeeCustomDocumentStatus,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    //for signed user
    {
        path: "/emp-documents/preview/:employee_document_id/pp/finish/success",
        name: "Finish-Later-Success",
        components: FinishLaterSuccess,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    {
        path: "/emp-documents/custom/:employee_document_id/pp/signed",
        name: "employee-documents-custom-document-pp-signed",
        component: ViewEmployeeCustomDocumentStatus,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    // for contacts document
    {
        path: "/emp-documents/custom/:employee_document_id/pp",
        name: "employee-documents-custom-document-pp",
        component: ViewEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.passwordProtectedOrAuthUser
    },
    // for draft doc
    {
        path: "/emp-documents/custom/:employee_document_id/draft",
        name: "employee-documents-custom-document-draft",
        component: ViewEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.user
    },
    // for edit doc
    {
        path: "/emp-documents/custom/:employee_document_id/edit",
        name: "employee-documents-custom-document-edit",
        component: ConfigureEmployeeDocumentDraft,
        beforeEnter: AuthMiddleware.user
    },
    // for edit request document
    {
        path: "/request-documents/:request_document_id/edit",
        name: "request-documents-edit",
        component: RequestDocumentDraft,
        // beforeEnter: AuthMiddleware.user
        meta: {
            title: 'Request Documents Edit'
        }
    },

    // Admin routes which does not have side bar 
    {
        path: "/company-documents/:document_id/configure/image",
        name: "configure-document-image",
        component: ConfigureCompanyDocument,
    },

    {
        path: "/workflow/send/:workflow_data_id",
        name: "workflow-send",
        component: AddEditWorkflow,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/workflow/edit/:workflow_id",
        name: "workflow-edit",
        component: AddEditWorkflow,
        beforeEnter: AuthMiddleware.user
    },

    // page to create new document 
    {
        path: "/company-documents/:document_id/configure/document",
        name: "configure-custom-document",
        component: ConfigureDocTypeDocument,
    },


    {
        path: "/company-documents/:document_id/configure/document/:configurable_document_id/update",
        name: "edit-configure-custom-document",
        component: ConfigureDocTypeDocument,
    },



    {
        path: "/company-documents/:document_id/configure/image/:configurable_document_id/update",
        name: "edit-configure-document-image",
        component: ConfigureCompanyDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/company-documents/:document_id/configure/template/image/:configurable_document_id/update",
        name: "edit-configure-template-image",
        component: ConfigureCompanyTemplate,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/company-documents/:document_id/configure/image/:configurable_document_id/preview",
        name: "edit-configure-template-image-preview",
        component: ConfigureCompanyTemplatePreview,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/company-documents/custom/:document_id/:configurable_document_id/execute",
        name: "execute-custom-document",
        component: CustomDocumentExecute,
    },

    {
        path: "/company-documents/custom/:document_id/:configurable_document_id/preview",
        name: "preview-custom-document",
        component: CustomDocumentPreview,
    },

    {
        path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute",
        name: "execute-custom-doc-type-document",
        component: CustomDocTypeDocumentExecute,
    },
    {
        path: "/company-documents/custom/:document_id/:configurable_document_id/execute/:workflow_data_id",
        name: "execute-custom-document-user",
        component: CustomDocumentExecute,
    },
    {
        path: "/company-documents/custom/:document_id/:configurable_document_id/preview/:workflow_data_id",
        name: "preview-custom-document-user",
        component: CustomDocumentPreview,
    },

    {
        path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute/:workflow_data_id",
        name: "execute-custom-doc-type-document-user",
        component: CustomDocTypeDocumentExecute,
    },
    {
        path: "/company-documents/custom/document/:document_id/:configurable_document_id/preview/:workflow_data_id",
        name: "preview-custom-doc-type-document-user",
        component: CustomDocTypeDocumentPreview,
    },

    {
        path: "/company-documents/static/:document_id/execute",
        name: "execute-static-document",
        component: StaticDocumentExecute,
    },
    {
        path: "/company-documents/static/:document_id/execute",
        name: "execute-static-document-user",
        component: StaticDocumentExecute,
    },
    {
        path: "/company-documents/static/:document_id/preview/:workflow_data_id",
        name: "preview-static-document",
        component: StaticDocumentPreview,
    },
    {
        path: "/company-documents/requested/:document_id/execute/:workflow_data_id",
        name: "execute-requested-document-user",
        component: RequestedDocumentExecute,
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
        path: "/inviteUser",
        name: "InviteUser",
        component: InviteUser,
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
        path: "/send-verification",
        name: "SendVerification",
        component: SendVerification,
        beforeEnter: AuthMiddleware.guest
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        beforeEnter: AuthMiddleware.authenticatedRoutes

    },
    {
        path: "/forgot-password-verification",
        name: "ForgotPasswordVerification",
        component: ForgotPasswordVerification,
        beforeEnter: AuthMiddleware.authenticatedRoutes
    },
    {
        path: '/documents',
        redirect: '/dashboard',
        beforeEnter: AuthMiddleware.authenticatedRoutes
    },
    {
        path: '*',
        component: PageNotFound
    },
    //custom dashboard
    {
        path: '/custom/dashboard/config/:dashboardId',
        name: 'custom-dashboard-config',
        component: customDashboardConfig,
        beforeEnter: AuthMiddleware.user
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router