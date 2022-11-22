// import companyDocuments from "@/constants/lg-en/companyDocuments";
// import companyDocumentsData from "@/constants/lg-en/companyDocuments";
import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters("companyDocuments", ["getCompanyAllDocuments"]),

        ...mapGetters("documentCategories", ["getAllCategories"]),
        ...mapGetters("documentGroups", ["getAllGroups"]),
        ...mapGetters("auth", [
            "getAuthenticatedUser",
            "getInitialUrl",
            "getUserSignature",
            "getDefaultDateFormat",
            "getActiveWorkspace",
            "getUserType", "getPermissionList", "getWorkspaceList"
        ]),

        getTotalDocuments() {
            return documents => {
                return (
                    documents.static.length +
                    documents.custom.length +
                    documents.standard.length +
                    documents.requested.length
                );
            };
        }
    },
    methods: {

        getUserLevelPermission(scope) {
            if (this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole && this.getAuthenticatedUser.activeRole.userType_name && this.getAuthenticatedUser.activeRole.userType_name === "OWNER") {
                return true;
            }
            else {
                let activeRoleId = ''
                let activeUserType = ''
                if (this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole && this.getAuthenticatedUser.activeRole.role_id) {
                    activeRoleId = this.getAuthenticatedUser.activeRole.role_id
                    activeUserType = this.getAuthenticatedUser.activeRole.userType_name
                }
                if (scope.row.rolesList && scope.row.rolesList.length && this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole) {
                    let roleList = this.lodash.filter(scope.row.rolesList, function (node) {
                        if (node.role_id._id === activeRoleId) {
                            if (node && node.userType && node.userType.name != 'OWNER') {
                                if (activeUserType === 'ADMIN') {
                                    return node
                                }
                                else if (activeUserType === 'MANAGER' && (node.userType.name === activeUserType || node.userType.name === 'MEMBER')) {
                                    return node
                                }
                                else if (activeUserType === 'MEMBER' && node.userType.name === activeUserType) {
                                    return node
                                }
                            }

                        }
                        // else{

                        // }
                        return (node.role_id._id === activeRoleId) && (node && node.userType && node.userType.name != 'OWNER')
                    });

                    if (roleList.length) {
                        return true
                    }
                    else {
                        return false
                    }
                }
                else {

                    return false
                }

            }
        },

        checkIsSuperAdminOrNotForProfileManagementPermissions(permissionsName) {
                if (this.getUserType && this.getUserType.permissionSet) {
                    return this.getUserType.permissionSet.includes(permissionsName) ? true : false;
                }
        },
        updateIndividualWorkspace(workspace) {
            console.log(workspace)

            let currentWorkspace = this.getAuthenticatedUser.current_workspace;

            if (this.getWorkspaceList) {
                let userWorkspaceList = this.getWorkspaceList;
                let hasIndividual = this.getAuthenticatedUser.workspace.findIndex(
                    (u) => u.plan_type == "INDIVIDUAL"
                );
                if (hasIndividual != -1) {
                    let individualWorkspace = {};
                    if (this.getAuthenticatedUser.workspace[hasIndividual].company_id) {
                        this.$set(
                            individualWorkspace,
                            "_id",
                            "" + this.getAuthenticatedUser.workspace[hasIndividual].company_id
                        );
                    } else {
                        this.$set(individualWorkspace, "_id", "0");
                    }
                    this.$set(individualWorkspace, "name", "INDIVIDUAL");
                    userWorkspaceList[hasIndividual]["company_id"] =
                        individualWorkspace;
                    if (currentWorkspace.plan_type == "INDIVIDUAL") {
                        if (this.getAuthenticatedUser.workspace[hasIndividual].company_id) {
                            currentWorkspace["company_id"] =
                                "" +
                                this.getAuthenticatedUser.workspace[hasIndividual].company_id;
                        } else {
                            currentWorkspace["company_id"] = "0";
                        }
                    }
                }
                // this.currentWorkspaceId = this.currentWorkspace.company_id;
                this.$store.commit("auth/setActiveWorkspace", currentWorkspace, {
                    root: true,
                });
                this.$store.commit("auth/setWorkspaceList", userWorkspaceList, {
                    root: true,
                });
                return {
                    currentWorkspace, userWorkspaceList
                }
            }



        },
        isWorkspaceIsBusiness(workspace) {
            if (workspace && this.getActiveWorkspace &&
                this.getActiveWorkspace.plan_type &&
                this.getActiveWorkspace.plan_type == 'BUSINESS') {
                return true;
            }
            else {
                return false;
            }
        },
        isIndividualWorkspace(workspace) {
            if (workspace && (this.getActiveWorkspace &&
                this.getActiveWorkspace.plan_type &&
                this.getActiveWorkspace.plan_type == 'INDIVIDUAL') || this.getActiveWorkspace.company_id == "0") {
                return true;
            }
            else {
                return false;
            }
        },

        isAdmin() {
            if (this.getActiveWorkspace && this.getActiveWorkspace.plan_type == 'INDIVIDUAL') {
                return false
            } else {
                if (this.getUserType && this.getUserType.name && this.getUserType.name == 'ADMIN') {
                    return true;
                } else {
                    return false
                }
            }
        },

        isOwner() {
            if (this.getActiveWorkspace && this.getActiveWorkspace.plan_type == 'INDIVIDUAL') {
                return true
            } else {
                if (this.getUserType && this.getUserType.name && this.getUserType.name == 'OWNER') {
                    return true;
                } else {
                    return false
                }
            }
        },
        checkPermissionByPermissionNameFormTemplates(data, permissionsName) {
            if (this.getActiveWorkspace && this.getActiveWorkspace.plan_type && this.getActiveWorkspace.plan_type == 'INDIVIDUAL' && this.getAuthenticatedUser && this.getAuthenticatedUser._id && this.getAuthenticatedUser.email) {
                if (data && data.created_by && data.created_by._id) {
                    let isCreator = data.created_by._id == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    let isCreator = data && data.created_by && this.getAuthenticatedUser && this.getAuthenticatedUser._id && data.created_by == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {

                let isCreator = false;
                if (data && data.created_by) {
                    isCreator = data && data.created_by._id == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    }
                } else {
                    isCreator = data && data.created_by && this.getAuthenticatedUser && this.getAuthenticatedUser._id && data.created_by == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    }
                }
                if (this.getUserType && this.getUserType.name && this.getUserType.name == 'OWNER') {
                    return true;
                } else if (this.getUserType && this.getUserType.permissionSet) {
                    return this.getUserType.permissionSet.includes(permissionsName) ? true : false;
                } else {
                    return false;
                }
            }
        },
        checkPermissionForDocument(data, permissionName) {
            if (this.getActiveWorkspace && this.getActiveWorkspace.plan_type && this.getActiveWorkspace.plan_type == 'INDIVIDUAL' && this.getAuthenticatedUser && this.getAuthenticatedUser._id && this.getAuthenticatedUser.email) {
                if (data && data.created_by && data.created_by._id) {
                    let isCreator = data.created_by._id == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    let isCreator = data && data.created_by && this.getAuthenticatedUser && this.getAuthenticatedUser._id && data.created_by == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                let hasUser = (data && data.document_users ? data.document_users : []).find((cu) => (cu && cu.email && this.getAuthenticatedUser && this.getAuthenticatedUser.email && cu.email == this.getAuthenticatedUser.email && cu.type == 'SENDER'));
                let isUserReceiver = (data && data.document_users ? data.document_users : []).find((user) => (user && user.email && this.getAuthenticatedUser && this.getAuthenticatedUser.email && user.email == this.getAuthenticatedUser.email && user.type == 'RECEIVER'));
                // let isCreator = data.created_by.toString() == this.getAuthenticatedUser._id.toString();
                let isCreator = false;
                if (data && data.created_by && data.created_by._id) {
                    isCreator = data && data.created_by._id == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    }
                } else {
                    isCreator = data && data.created_by && this.getAuthenticatedUser && this.getAuthenticatedUser._id && data.created_by == this.getAuthenticatedUser._id;
                    if (isCreator) {
                        return true
                    }
                }
                if (this.getUserType && this.getUserType.name && this.getUserType.name == 'OWNER' && !isUserReceiver) {
                    return true;
                } else if (hasUser || isCreator) {
                    return true;
                } else if (isUserReceiver) {
                    return false;
                } else if (this.getUserType && this.getUserType.permissionSet) {
                    return this.getUserType.permissionSet.includes(permissionName) ? true : false;
                } else {
                    return false;
                }
            }

        },
        checkPermissionByPermissionName(permission) {
            // console.log("Permission:",this.getUserType)
            if (
                this.getUserType &&
                this.getUserType.name &&
                this.getUserType.name == "OWNER"
            ) {
                return true;
            }
            else if (this.getUserType && this.getUserType.permissionSet) {
                return this.getUserType.permissionSet.includes(permission) ?
                    true :
                    false;
            } else {
                return false;
            }
        },
        checkPermissionByPermissionsName(permission){
            if (this.getUserType && this.getUserType.permissionSet) {
                return this.getUserType.permissionSet.includes(permission) ?
                    true :
                    false;
            } else {
                return false;
            } 
        },
        checkPermissionsCategory(category) {
            if (
                this.getPermissionList &&
                this.getActiveWorkspace &&
                this.getActiveWorkspace.plan_type &&
                this.getActiveWorkspace.plan_type == "BUSINESS"
            ) {
                let catInd = this.getPermissionList.findIndex((c) => c.slug == category);
                if (catInd != -1) {
                    let hasPermission = this.getPermissionList[
                        catInd
                    ].permissions.findIndex(
                        (p) =>
                            this.getUserType &&
                            this.getUserType.permissionSet.includes(p.slug)
                    );
                    return hasPermission != -1 ? true : false;
                }
                if (
                    this.getUserType &&
                    this.getUserType.name &&
                    this.getUserType.name == "OWNER"
                ) {
                    return true;
                }

                return false;
            } else {
                return true;
            }
        },
    },
}