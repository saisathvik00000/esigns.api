import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue')

const Dashboard = () => import('@/views/Dashboard')


// Auth routes
const SignIn = () => import('@/views/auth/SignIn')
const SignUp = () => import('@/views/auth/SignUp')
const UserRegistrationProfile = () => import('@/views/auth/UserRegistrationProfile')
const UserVerify = () => import('@/views/auth/UserVerify')
const SendVerification = () => import('@/views/auth/SendVerification')
const JoinUs = () => import('@/views/auth/JoinUs')
const OTP = () => import('@/views/auth/OTP')
const ForgotPassword = () => import('@/views/auth/ForgotPassword')
const ForgotPasswordVerification = () => import('@/views/auth/ForgotPasswordVerification')
const UpdateNewPassword = () => import('@/views/auth/UpdateNewPassword')
const InviteUser = () => import('@/views/auth/InviteUser')

// Profile routes
const Profile = () => import('@/views/account/Profile');
const Profilesettings = () => import('@/views/account/Profilesettings');
const PersonalInformation = () => import("@/components/account/PersonalInformation");
const SubscriptionInformation = () => import("@/components/account/SubscriptionInformation");
const Brandings = () => import("@/components/account/Branding");
const CompanyUsers = () => import("@/components/account/CompanyUsers");
const Signature = () => import("@/components/account/Signature");
const Initial = () => import("@/components/account/Initial");
const UpdatePassword = () => import("@/components/account/UpdatePassword");
const Permissions = () => import("@/components/account/Permissions");
const Statistics = () => import("@/components/account/dashboardStats");
const DocumentExpirationReminders = () => import("@/components/account/DocumentExpirationReminders");
const ApplicationSettings = () => import("@/components/account/ApplicationSettings");
const Notifications = () => import("@/components/account/Notifications");

// Branding
const Branding = () => import("@/views/account/Branding");

// const UpdatePassword = () => import('@/views/auth/UpdatePassword')
// const Dashboard = () => import('@/components/Dashboard')
// import CompanyProfile from '../views/company/CompanyProfile'
//success page
const signSuccessMessage = () => import('@/components/signSuccessMessage')
const SignDocuments = () => import('@/components/SignDocuments')
const FinishLaterSuccess = () => import('@/components/FinishLaterSuccess')

// Contact routes
const Contacts = () => import('@/components/contacts/Contacts')
const AddContacts = () => import('@/components/contacts/AddContact')
const UserDocuments = () => import('@/components/contacts/UserDocuments');

// Contact types routes
const ContactTypes = () => import('@/components/contacts/ContactTypes')

import AuthMiddleware from "@/middleware/auth"

const Documents = () => import('@/components/companyDocuments/AllDocuments')
const AllTemplates = () => import('@/components/templates/AllTemplates')

// uploading files
const UploadDocumentPreference = () => import('@/components/companyDocuments/UploadDocumentPreference')
const UploadTemplatePreference = () => import('@/components/companyDocuments/UploadTemplatePreference')

// const ViewEmployeeCustomDraftDocument = () => import('@/components/ViewEmployeeCustomDocumentDraftPreview')
const ViewEmployeeCustomDocument = () => import('@/components/ViewEmployeeCustomDocumentPreview')
const DocumentPreview = () => import('@/components/employeeDocuments/viewDocuments/DocumentPreview')
const ConfigureEmployeeDocumentDraft = () => import("@/components/ConfigureEmployeeDocumentDraft")

//get link routes
// const PublishedTemplatePreiview = () => import('@/components/templates/ViewPublishedTemplatePreiview.vue');

const sendDocumentOnMail = () => import('@/components/companyDocuments/sendDocumentOnMail')
const sendTemplateOnMail = () => import('@/components/companyDocuments/sendTemplateOnMail')

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
const ViewEmployeeCustomDocumentStatus = () => import('@/components/ViewEmployeeCustomDocumentStatus')
//document flow 
// const ViewDocumentSentWorkflow = () => import('@/components/ViewDocumentSendWorkflow')


import CustomDocumentPreview from '../components/previewCompanyDocuments/CustomDocumentPreview'
import StaticDocumentPreview from '../components/previewCompanyDocuments/StaticDocumentPreview'
import CustomDocTypeDocumentPreview from '../components/previewCompanyDocuments/CustomDocTypeDocumentPreview'

//workflow
import WorkflowList from '../components/workFlows/templateWorkflowList'
import AddEditWorkflow from '../components/workFlows/addEditWorkflow'
import WorkflowDataList from '../components/workFlows/templateWorkflowDataList'

import AddBenefits from '../views/companyBenefits/addBenefits.vue'
// import EmployerPasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerPasswordVerification'
import EmployerCustomDocTypePasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocTypePasswordVerification'
import EmployerCustomDocumentPasswordVerification from '../components/employee/executeEmployeeDocuments/EmployerCustomDocumentPasswordVerification'

const CompanyUserList = () => import('@/components/company/CompanyUsers');
const NewTemplate = () => import('../views/templates/NewTemplate');
const TemplateList = () => import('../views/templates/TemplatesList');
const ViewTemplate = () => import('@/components/templates/ViewTemplate')
const EntitiesList = () => import('@/components/entity/EntitiesList');
const AddEditEntity = () => import('@/components/entity/AddEditEntity');
const ViewEntity = () => import("@/components/entity/ViewEntity");
const UserTemplatesData = () => import('@/views/users/UserTemplatesData');
const ViewEntityData = () => import('@/components/entity/ViewEntityData');

// entity Exectute
const EntityExecute = () => import("@/components/entity/entityExecute");
const EntityExecuteStep = () => import("@/components/entity/entityExecuteSteps");
const PreviewEntityData = () => import("@/components/entity/preview");
const PreviewEntityDataStep = () => import("@/components/entity/previewStep");

Vue.use(Router)

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            component: Home,
            name: "home",

            children: [{
                    path: "/dashboard",
                    name: "Dashboard",
                    component: Dashboard,
                    beforeEnter: AuthMiddleware.user,
                    alias: '',
                    meta: {
                        title: 'Dashboard'
                    }
                },
                {
                    path: "/templates",
                    name: "Templates",
                    component: AllTemplates,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Templates'
                    }
                },
                {
                    path: "/workflows",
                    name: "Workflows",
                    component: WorkflowList,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Workflows'
                    }
                },
                {
                    path: "/workflow/:workflow_id",
                    name: "Workflows-Data",
                    component: WorkflowDataList,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Workflow Data'
                    }
                },
                {
                    path: "/documents/all/:contact_id?",
                    name: "Documents",
                    component: Documents,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Documents'
                    }
                },
                {
                    path: "/documents-signed",
                    name: "SignDocuments",
                    component: SignDocuments,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Signed Documents'
                    }
                },
                {
                    path: "/documents/upload",
                    name: "upload-documents",
                    component: UploadDocumentPreference,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Upload Documents'
                    }
                },
                {
                    path: "/templates/upload",
                    name: "upload-templates",
                    component: UploadTemplatePreference,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Upload Templates'
                    }
                },
                // Profile Routes
                {
                    path: '/profile',
                    name: "profile",
                    component: Profile,
                    beforeEnter: AuthMiddleware.user,
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

                        // {
                        //   path: '/profile/document-expiration-reminders',
                        //   name: 'expiration-reminders',
                        //   component: DocumentExpirationReminders,
                        //   meta: {
                        //     title: 'Document Expiration & Reminders'
                        //   }
                        // },
                        // {
                        //   path: '/profile/application-settings',
                        //   name: 'application-settings',
                        //   component: ApplicationSettings,
                        //   meta: {
                        //     title: 'Settings'
                        //   }
                        // },
                        // {
                        //   path: '/profile/document-notifications',
                        //   name: 'document-notifications',
                        //   component: Notifications,
                        //   meta: {
                        //     title: 'Notifications'
                        //   }
                        // },
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
                        // {
                        //   path: '/profile/dashboard-settings',
                        //   name: 'statistics',
                        //   component: Statistics,
                        //   meta: {
                        //     title: 'Dashboard Stats'
                        //   }
                        // },

                    ]
                },
                //profilesettings
                {
                    path: '/profilesettings',
                    name: "profilesettings",
                    component: Profilesettings,
                    beforeEnter: AuthMiddleware.user,
                    children: [
                        // {
                        //   path: '/profilesettings/personal-information',
                        //   name: 'personal-information',
                        //   component: PersonalInformation,
                        //   meta: {
                        //     title: 'Personal Information'
                        //   },
                        //   alias: '/profilesettings',
                        // },
                        // {
                        //   path: '/profilesettings/change-password',
                        //   name: 'change-password',
                        //   component: UpdatePassword,
                        //   meta: {
                        //     title: 'Change Password'
                        //   }
                        // },
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
                        // {
                        //   path: '/profilesettings/signature',
                        //   name: 'signature',
                        //   component: Signature,
                        //   meta: {
                        //     title: 'Signature'
                        //   }
                        // },
                        {
                            path: '/profilesettings/initial',
                            name: 'initial',
                            component: Initial,
                            meta: {
                                title: 'Initial'
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

                    ]
                },

                {
                    path: '/branding',
                    name: "Branding",
                    component: Branding,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Branding'
                    }
                },

                // Conatct Routes
                {
                    path: "/contacts",
                    name: "contacts",
                    component: Contacts,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Contacts'
                    }
                },
                {
                    path: "/contacts/documents/:contact_id",
                    name: "user-contacts",
                    component: UserDocuments,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'User Documents'
                    }
                },
                {
                    path: "/contacts/add",
                    name: "add-contact",
                    component: AddContacts,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Add Contact'
                    }
                },
                {
                    path: "/contacts/edit/:contact_id",
                    name: "edit-contact",
                    component: AddContacts,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Edit Contact'
                    }
                },
                // Contact type 
                {
                    path: "/contact-types",
                    name: "contactTypes",
                    component: ContactTypes,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Contact Types'
                    }
                },
                {
                    path: "/signature/documents/:status",
                    name: "signature-documents",
                    component: Documents,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Signature Documents'
                    }
                },
                {
                    path: "/send-document/mail/:id",
                    name: "send-document-mail",
                    component: sendDocumentOnMail,
                    beforeEnter: AuthMiddleware.user,
                },
                {
                    path: "/send-template/mail/:id/:document_id",
                    name: "send-template-mail",
                    component: sendTemplateOnMail,
                    beforeEnter: AuthMiddleware.user,
                },
                {
                    path: "/company/users",
                    name: "Company Users",
                    component: CompanyUserList,
                    beforeEnter: AuthMiddleware.user,
                    alias: '',
                    meta: {
                        title: 'Company Users'
                    }
                },
                // template Routes

                {
                    path: "/template/create",
                    name: "Form Template",
                    component: NewTemplate,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Create New Template '
                    },
                    alias: '',
                },

                {
                    path: "/template",
                    name: "Templates",
                    component: TemplateList,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Create New Template '
                    },
                    alias: '',
                },
                {
                    path: "/template/:template_id/edit",
                    name: "Edit Templates",
                    component: NewTemplate,
                    beforeEnter: AuthMiddleware.user,
                    alias: '',
                    meta: {
                        title: 'Edit Template '
                    }
                },
                {
                    path: "template/:template_id/view",
                    name: "ViewTemplate",
                    component: ViewTemplate,
                    beforeEnter: AuthMiddleware.user,

                },

                //Entities Route
                {
                    path: "/entity",
                    name: "Entity List",
                    component: EntitiesList,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Entity List'
                    }
                },
                {
                    path: "/entity/:entity_id/add",
                    name: "Create Entity",
                    component: AddEditEntity,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Create Entity'
                    }
                },
                {
                    path: "/entity/:entity_id/edit",
                    name: "Edit Entity",
                    component: AddEditEntity,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'Edit Entity'
                    }
                },
                {
                    path: "/entity/:entity_id/view",
                    name: "View Entity",
                    component: ViewEntity,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'View Entity'
                    }
                }, {
                    path: "/entity/:entity_id",
                    name: "EntityData",
                    component: ViewEntityData,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'View Entity Data'
                    }
                }, {
                    path: "/entity/:user_id/:template_code",
                    name: "TemplatesData",
                    component: UserTemplatesData,
                    beforeEnter: AuthMiddleware.user,
                    meta: {
                        title: 'TemplatesData'
                    }
                }, {
                    path: "/entity-execute/:entity_id",
                    name: "EntityExecute",
                    component: EntityExecute,
                    beforeEnter: AuthMiddleware.user,
                    children: [{
                        path: '/entity-execute/:entity_id/:template_code',
                        name: "EntityExecuteStep",
                        component: EntityExecuteStep,
                        beforeEnter: AuthMiddleware.user,
                    }]
                },
                {
                    path: "/entity_data_view/:entity_id",
                    name: "PreviewEntityData",
                    component: PreviewEntityData,
                    beforeEnter: AuthMiddleware.user,
                    children: [{
                        path: '/entity_data_view/:entity_id/:template_code',
                        name: 'PreviewEntityDataStep',
                        component: PreviewEntityDataStep
                    }]
                }, {
                    path: "/entityData-Edit/:entity_id",
                    name: "EntityDataEdit",
                    component: EntityExecute,
                    beforeEnter: AuthMiddleware.user,
                    children: [{
                        path: '/entityData-Edit/:entity_id/:template_code',
                        name: "EntityDataEditStep",
                        component: EntityExecuteStep,
                        beforeEnter: AuthMiddleware.user,
                    }]
                },

                //Entities Route End
            ]
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
            path: "emp-documents/custom/:employee_document/success",
            name: "signer-success-message",
            component: signSuccessMessage
        },
        {
            path: "/emp-documents/preview/:employee_document_id/pp/vp/:user_id",
            name: "document-preview",
            component: DocumentPreview,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/:document_id/configure/template/:configurable_document_id/preview",
            name: "published-template-preiview",
            component: DocumentPreview
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
        //document workflow
        // {
        //   path:"/document/upload",
        //   name:"document-initiated-flow",
        //   component: ViewDocumentSentWorkflow,
        //   beforeEnter: AuthMiddleware.user
        // },
        // for contacts document
        {
            path: "/emp-documents/custom/:employee_document_id/pp",
            name: "employee-documents-custom-document-pp",
            component: ViewEmployeeCustomDocument,
            beforeEnter: AuthMiddleware.passwordProtected
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


        // Admin routes which does not have side bar 
        {
            path: "/company-documents/:document_id/configure/image",
            name: "configure-document-image",
            component: ConfigureCompanyDocument,
            // // beforeEnter: AuthMiddleware.user
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
            // beforeEnter: AuthMiddleware.user
        },


        {
            path: "/company-documents/:document_id/configure/document/:configurable_document_id/update",
            name: "edit-configure-custom-document",
            component: ConfigureDocTypeDocument,
            // beforeEnter: AuthMiddleware.user
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
            // beforeEnter: AuthMiddleware.user
        },

        {
            path: "/company-documents/custom/:document_id/:configurable_document_id/preview",
            name: "preview-custom-document",
            component: CustomDocumentPreview,
            // beforeEnter: AuthMiddleware.user
        },

        {
            path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute",
            name: "execute-custom-doc-type-document",
            component: CustomDocTypeDocumentExecute,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/custom/:document_id/:configurable_document_id/execute/:workflow_data_id",
            name: "execute-custom-document-user",
            component: CustomDocumentExecute,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/custom/:document_id/:configurable_document_id/preview/:workflow_data_id",
            name: "preview-custom-document-user",
            component: CustomDocumentPreview,
            // beforeEnter: AuthMiddleware.user
        },

        {
            path: "/company-documents/custom/document/:document_id/:configurable_document_id/execute/:workflow_data_id",
            name: "execute-custom-doc-type-document-user",
            component: CustomDocTypeDocumentExecute,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/custom/document/:document_id/:configurable_document_id/preview/:workflow_data_id",
            name: "preview-custom-doc-type-document-user",
            component: CustomDocTypeDocumentPreview,
            // beforeEnter: AuthMiddleware.user
        },

        {
            path: "/company-documents/static/:document_id/execute",
            name: "execute-static-document",
            component: StaticDocumentExecute,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/static/:document_id/execute",
            name: "execute-static-document-user",
            component: StaticDocumentExecute,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/static/:document_id/preview/:workflow_data_id",
            name: "preview-static-document",
            component: StaticDocumentPreview,
            // beforeEnter: AuthMiddleware.user
        },
        {
            path: "/company-documents/requested/:document_id/execute/:workflow_data_id",
            name: "execute-requested-document-user",
            component: RequestedDocumentExecute,
            // beforeEnter: AuthMiddleware.user
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
            // beforeEnter: AuthMiddleware.guest
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
            component: ForgotPassword
        },
        {
            path: "/forgot-password-verification",
            name: "ForgotPasswordVerification",
            component: ForgotPasswordVerification
        },
        {
            path: "/update-password",
            name: "UpdatePassword",
            component: UpdatePassword
        },
        {
            path: "/otp",
            name: "OTP",
            component: OTP
        },
        {
            path: "/update-new-password",
            name: "UpdateNewPassword",
            component: UpdateNewPassword
        },
        {
            path: "/add-benefits",
            name: "AddBenefits",
            component: AddBenefits
        },
        {
            path: '*',
            redirect: '/dashboard'
        },
    ]
})