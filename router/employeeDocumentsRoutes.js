

import AuthMiddleware from "../middleware/auth"


const DownloadEmployeeStandardDocument = () => import('../components/employeeDocuments/downloadDocuments/DownloadEmployeeStandardDocument')
const DownloadEmployeeCustomDocTypeDocument = () => import('../components/employeeDocuments/downloadDocuments/DownloadEmployeeCustomDocTypeDocument')
const DownloadEmployeeCustomDocument = () => import('../components/employeeDocuments/downloadDocuments/DownloadEmployeeCustomDocument')
const ViewEmployeeStaticDocument = () => import('../components/employeeDocuments/viewDocuments/ViewEmployeeStaticDocument')
const ViewEmployeeStandardDocument = () => import('../components/employeeDocuments/viewDocuments/ViewEmployeeStandardDocument')
const ViewEmployeeCustomDocument = () => import('../components/employeeDocuments/viewDocuments/ViewEmployeeCustomDocument')
const ViewEmployeeRequestedDocument = () => import('../components/employeeDocuments/viewDocuments/ViewEmployeeRequestedDocument')
const ViewEmployeeCustomDocTypeDocument = () => import('../components/employeeDocuments/viewDocuments/ViewEmployeeCustomDocTypeDocument')
const ViewEmployeeCustomDocTypeDocumentDraft = () => import('@/components/employeeDocuments/viewDocuments/ViewEmployeeCustomDocTypeDocumentDraft')

export default [
    {
        path: "/emp-documents/standard/:document_slug/:employee_document_id/download",
        name: "employee-documents-standard-document-download",
        component: DownloadEmployeeStandardDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },
    {
        path: "/emp-documents/custom/:employee_document_id/download",
        name: "employee-documents-custom-document-download",
        component: DownloadEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },
    {
        path: "/emp-documents/custom/document/:employee_document_id/download",
        name: "employee-documents-custom-doc-type-document-download",
        component: DownloadEmployeeCustomDocTypeDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },
    {
        path: "/employee-documents/static/:employee_document_id",
        name: "employee-documents-static-document",
        component: ViewEmployeeStaticDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/standard/:document_slug/:employee_document_id",
        name: "employee-documents-standard-document",
        component: ViewEmployeeStandardDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/custom/:employee_document_id",
        name: "employee-documents-custom-document",
        component: ViewEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/custom/document/:employee_document_id",
        name: "employee-documents-custom-doc-type-document",
        component: ViewEmployeeCustomDocTypeDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/custom/document/:employee_document_id/draft",
        name: "employee-documents-custom-doc-type-document-draft",
        component: ViewEmployeeCustomDocTypeDocumentDraft,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/requested/:employee_document_id",
        name: "employee-documents-requested-document",
        component: ViewEmployeeRequestedDocument,
        beforeEnter: AuthMiddleware.user
    },

    {
        path: "/emp-documents/static/:employee_document_id/preview",
        name: "employee-documents-static-document",
        component: ViewEmployeeStaticDocument,
        beforeEnter: AuthMiddleware.user
    },
    {
        path: "/emp-documents/standard/:document_slug/:employee_document_id/preview",
        name: "employee-documents-standard-document-preview",
        component: ViewEmployeeStandardDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },

    {
        path: "/emp-documents/custom/:employee_document_id/preview",
        name: "employee-documents-custom-document-preview",
        component: ViewEmployeeCustomDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },

    {
        path: "/emp-documents/custom/document/:employee_document_id/preview",
        name: "employee-documents-custom-doc-type-document-preview",
        component: ViewEmployeeCustomDocTypeDocument,
        beforeEnter: AuthMiddleware.userOrServer
    },

    {
        path: "/emp-documents/requested/:employee_document_id/preview",
        name: "employee-documents-requested-document-preview",
        component: ViewEmployeeRequestedDocument,
        beforeEnter: AuthMiddleware.user
    },

]