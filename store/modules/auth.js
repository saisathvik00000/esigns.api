import axios from "@/config/axios";

// initial state
const initialState = () => {
    return {
        user: null,
        authenticationStatus: null,
        authenticationDetails: {},
        signupCompleted: null,
        authorizedRepresentativeVerifyPasswordErrors: null,
        userMenu: {},
        verificationStatus: null,
        initialUrl: null,
        updateProfileStatus: false,
        updateProfileErrors: null,
        updatePasswordStatus: false,
        updatePasswordErrors: null,
        /* New design of Signup process start */
        // updateUserPasswordStatus: false,
        // updateUserPasswordErrors: null,
        /* New design of Signup process end */
        forgotPasswordStatus: false,
        forgotPasswordErrors: null,
        forgotPasswordVerifyStatus: false,
        forgotPasswordVerifyErrors: null,
        signatureUpdateStatus: false,
        signatureUpdateErrors: null,
        userSignature: null,
        accountNotVerified: false,
        accountNotVerifiedEmail: null,
        resendVerificationEmail: false,
        initialAddStatus: false,
        profile: null,
        defaultDateFormat: 'MM-DD-YYYY',

        updateProfilePicStatus: false,
        updateprofilepicture: null,
        addCompanyUser: null,
        companyUsers: [],
        userType: null,
        workspaceList: [],
        activeWorkspace: null,
        userTypeList: null,
        permissions: null,
        permissonList: [],
        emailExist: null,
        managePermissionsStatus: false,
        managePermissionsErrors: null,
        companyInfo: null,
        switchWorkspaceError: null,
        accountStatusByEmail: false,
        errorCode: '',
        resendEmailCompany: '',

    };
};

const state = initialState();

const getters = {
    getupdateprofilepicture: state => state.updateprofilepicture,
    getUpdateProfilePicStatus: state => state.updateProfilePicStatus,

    getAuthenticatedUser: state => state.user,
    isSignupCompleted: state => state.signupCompleted,
    getVerificationStatus: state => state.verificationStatus,
    getVerificationEmailSentStatus: state => state.verificationEmailSent,
    getAuthenticationStatus: state => state.authenticationStatus,
    getAuthenticationDetails: state => state.authenticationDetails,
    getGeneralErrorMessage: state => state.generalErrorMessage,
    getResendVerificationEmail: state => state.resendVerificationEmail,
    getForgotPasswordEmailSent: state => state.forgotPasswordEmailSent,
    getValidationErrors: state => state.validationErrors,
    getPasswordResetStatus: state => state.passwordResetStatus,
    getPasswordUpdateStatus: state => state.passwordUpdateStatus,
    getSocialAuthUserDetails: state => state.socialAuthUserDetails,
    getSocialAuthStatus: state => state.socialAuthStatus,
    getUserExpireStatus: state => state.userExpireStatus,
    getUserExpireTime: state => state.userExpireTime,
    getAuthorizedRepresentativeVerifyPasswordErrors: state => state.authorizedRepresentativeVerifyPasswordErrors,
    getUserMenu: state => state.userMenu,
    getInitialUrl: state => state.initialUrl,
    getUpdateProfileStatus: state => state.updateProfileStatus,
    getUpdateProfileErrors: state => state.updateProfileErrors,
    getUpdatePasswordStatus: state => state.updatePasswordStatus,
    getUpdatePasswordErrors: state => state.updatePasswordErrors,

    /* New design of Signup process start */
    // getUpdateUserPasswordStatus: state => state.upzdateUserPasswordStatus,
    // getUpdateUserPasswordErrors: state => state.updateUserPasswordErrors,
    
    /* New design of Signup process end */
 
    getForgotPasswordStatus: state => state.forgotPasswordStatus,
    getForgotPasswordErrors: state => state.forgotPasswordErrors,
    getForgotPasswordVerifyStatus: state => state.forgotPasswordVerifyStatus,
    getForgotPasswordVerifyErrors: state => state.forgotPasswordVerifyErrors,
    getSignatureUpdateStatus: state => state.signatureUpdateStatus,
    getSignatureUpdateErrors: state => state.signatureUpdateErrors,
    getUserSignature: state => state.userSignature,
    getAccountNotVerified: state => state.accountNotVerified,
    getAccountNotVerifiedEmail: state => state.accountNotVerifiedEmail,
    getInitialAddStatus: state => state.initialAddStatus,
    getProfile: state => state.profile,
    getDefaultDateFormat: state => state.defaultDateFormat,
    getAddCompanyUser: state => state.addCompanyUser,
    getCompanyUsers: state => state.companyUsers,
    getUserType: state => state.userType,
    getWorkspaceList: state => state.workspaceList,
    getActiveWorkspace: state => state.activeWorkspace,
    getUserTypeList: state => state.userTypeList,
    getPermissions: state => state.permissions,
    getPermissionList: state => state.permissonList,
    getEmailExist: state => state.emailExist,
    getManagePermissionsStatus: state => state.managePermissionsStatus,
    getManagePermissionsErrors: state => state.managePermissionsErrors,
    getCompanyInfo: state => state.companyInfo,
    getSwitchWorkspaceError: state => state.switchWorkspaceError,
    getAccountStatusByEmail: state => state.accountStatusByEmail,
    getErrorCode: state => state.errorCode,
    getErrorData: state => state.resendEmailCompany,
};

const mutations = {
    setErrorCode: (state, data) => {
        state.errorCode = data;
    },
    setErrorData: (state, data) => {
        state.resendEmailCompany = data
    },

    setUpdateProfilePicStatus: (state, ProfilePicStatus) => {
        state.updateProfilePicStatus = ProfilePicStatus;
    },
    setUpdateprofilepicture: (state, data) => {
        state.updateprofilepicture = data;
    },

    setValidationErrors: (state, errorData) => {
        state.validationErrors = errorData;
    },
    clearValidationErrors: state => {
        state.validationErrors = [];
    },
    setSignupStatus: (state, status) => {
        state.signupCompleted = status;
    },
    setVerificationStatus: (state, statusData) => {
        state.verificationStatus = statusData;
    },
    setVerificationEmailSentStatus: (state, statusData) => {
        state.verificationEmailSent = statusData;
    },
    setAuthenticatedUser: (state, user) => {
        state.user = user;
    },
    setAuthenticationStatus: (state, status) => {
        state.authenticationStatus = status;
    },
    setAuthenticationDetails: (state, tokens) => {
        state.authenticationDetails = tokens;
    },
    setGeneralErrorMessage: (state, message) => {
        state.generalErrorMessage = message;
    },
    setResendVerificationEmail: (state, status) => {
        state.resendVerificationEmail = status;
    },
    setForgotPasswordEmailSent: (state, statusData) => {
        state.forgotPasswordEmailSent = statusData;
    },
    setPasswordResetStatus: (state, statusData) => {
        state.passwordResetStatus = statusData;
    },
    setPasswordUpdateStatus: (state, statusData) => {
        state.passwordUpdateStatus = statusData;
    },
    resetAuthData: state => {
        const initial = initialState();
        Object.keys(initial).forEach(key => {
            state[key] = initial[key];
        });
    },

    setSocialAuthUserDetails: (state, statusData) => {
        state.socialAuthUserDetails = statusData
    },
    setSocialAuthStatus: (state, statusData) => {
        state.socialAuthStatus = statusData
    },
    setUserExpireStatus: (state, statusData) => {
        state.userExpireStatus = statusData
    },
    setUserExpireTime: (state, value) => {
        state.userExpireTime = value
    },
    setAuthorizedRepresentativeVerifyPasswordErrors(state, data) {
        state.authorizedRepresentativeVerifyPasswordErrors = data
    },
    setUserMenu(state, data) {
        state.userMenu = data
    },
    setInitialUrl(state, url) {
        state.initialUrl = url
    },
    setUpdateProfileStatus(state, status) {
        state.updateProfileStatus = status
    },
    setUpdateProfileErrors(state, errors) {
        state.updateProfileErrors = errors
    },
    setUpdateUserProfile(state, data) {
        state.user.first_name = data.first_name
        state.user.last_name = data.last_name
        state.user.title = data.title
        state.user.phone = data.phone
        state.user.address = data.address
        state.user.company_name = data.company_name
    },
    setUpdateUserSignature(state, data) {
        state.user.signature = data.signature
    },
    setUpdateUserInitial(state, data) {
        state.user.initial = data.initial
    },
    setUpdatePasswordStatus(state, status) {
        state.updatePasswordStatus = status
    },
    setUpdatePasswordErrors(state, errors) {
        state.updatePasswordErrors = errors
    },


    /* New design of Signup process start */
    // setUpdateUserPasswordStatus(state, status) {
    //     state.updateUserPasswordStatus = status
    // },
    // setUpdateUserPasswordErrors(state, errors) {
    //     state.updateUserPasswordErrors = errors
    // },

    /* New design of Signup process end */

    setForgotPasswordStatus(state, status) {
        state.forgotPasswordStatus = status
    },
    setForgotPasswordErrors(state, errors) {
        state.forgotPasswordErrors = errors
    },
    setForgotPasswordVerifyStatus(state, status) {
        state.forgotPasswordVerifyStatus = status
    },
    setForgotPasswordVerifyErrors(state, errors) {
        state.forgotPasswordVerifyErrors = errors
    },
    setSignatureUpdateStatus(state, status) {
        state.signatureUpdateStatus = status
    },
    setSignatureUpdateErrors(state, errors) {
        state.signatureUpdateErrors = errors
    },
    setUserSignature(state, signature) {
        state.userSignature = signature;
    },

    setAccountNotVerified(state, data) {
        state.accountNotVerified = data
    },
    setAccountNotVerifiedEmail(state, data) {
        state.accountNotVerifiedEmail = data
    },
    setProfile(state, profile) {
        state.profile = profile;
    },
    setInitialAddStatus(state, status) {
        state.initialAddStatus = status
    },
    setDefaultDateFormat(state, format) {
        state.defaultDateFormat = format;
    },
    setUpdateUserProfilePicture(state, data) {
        state.user.avatar = data
    },
    setAddCompanyUser(state, data) {
        state.addCompanyUser = data
    },
    setCompanyUsers(state, data) {
        state.companyUsers = data
    },
    setUserType(state, data) {
        state.userType = data
    },
    setWorkspaceList(state, data) {
        state.workspaceList = data
    },
    setActiveWorkspace(state, data) {
        state.activeWorkspace = data
    },
    setUserTypeList(state, data) {
        state.userTypeList = data
    },
    setPermissions(state, data) {
        state.permissions = data
    },
    setPermissionList(state, data) {
        state.permissonList = data
    },
    setEmailExist(state, data) {
        state.emailExist = data
    },
    setManagePermissionsStatus(state, data) {
        state.managePermissionsStatus = data
    },
    setManagePermissionsErrors(state, data) {
        state.managePermissionsErrors = data
    },
    setCompanyInfo(state, data) {
        state.companyInfo = data
    },
    setSwitchWorkspaceError(state, data) {
        state.switchWorkspaceError = data
    },
    setAccountStatusByEmail(state, data) {
        state.accountStatusByEmail = data
    }
};

const actions = {
    signOut: async (context) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("company/resetCompanyData", null, {
            root: true
        });
        context.commit("companyDocuments/resetCompanyDocumentsData", null, {
            root: true
        });
        context.commit("documentGroups/resetDocumentGroupsData", null, {
            root: true
        });
        context.commit("documentGroups/resetDocumentCategoriesData", null, {
            root: true
        });
    },
    signup: async (context, params) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("auth/setAccountNotVerified", false, {
            root: true
        })
        context.commit("auth/setAccountNotVerifiedEmail", null, {
            root: true
        })

        try {
            await axios.post("signup", params);

            context.commit("auth/setSignupStatus", true, {
                root: true
            });
        } catch (error) {
            if (error.response) {
                if (error.response.data.statusCode === "ACCOUNT_NOT_VERIFIED") {

                    context.commit("auth/setAccountNotVerified", true, {
                        root: true
                    })

                    context.commit("auth/setAccountNotVerifiedEmail", error.response.data.email, {
                        root: true
                    })
                } else {
                    await context.dispatch("errors/errorResponse", error.response, {
                        root: true
                    });
                }
            }

            context.commit("auth/setSignupStatus", false, {
                root: true
            });
        }
    },
    companySignup: async (context, params) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("auth/setAccountNotVerified", false, {
            root: true
        })
        context.commit("auth/setAccountNotVerifiedEmail", null, {
            root: true
        })

        try {
            let response = await axios.post("companySignup", params);
            context.commit("auth/setCompanyInfo", response.data, {
                root: true
            });
            context.commit("auth/setSignupStatus", true, {
                root: true
            });
        } catch (error) {
            if (error.response) {
                if (error.response.data.statusCode === "ACCOUNT_NOT_VERIFIED") {

                    context.commit("auth/setAccountNotVerified", true, {
                        root: true
                    })

                    context.commit("auth/setAccountNotVerifiedEmail", error.response.data.email, {
                        root: true
                    })
                } else {
                    await context.dispatch("errors/errorResponse", error.response, {
                        root: true
                    });
                }
            }

            context.commit("auth/setSignupStatus", false, {
                root: true
            });
        }
    },


    signin: async (context, params) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("auth/setAccountNotVerified", false, {
            root: true
        })
        context.commit("auth/setAccountNotVerifiedEmail", null, {
            root: true
        })
        context.commit("auth/setAuthenticationDetails", {}, {
            root: true
        });
        context.commit("auth/setErrorCode", "", {
            root: true
        });
        context.commit("auth/setErrorData", "", {
            root: true
        });

        try {
            let response = await axios.post("signin", params);
            let userDetails = response.data.user_details;
            let tokens = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                refresh_token_expires_at: response.data.refresh_token_expires_at,
                access_token_expires_at: response.data.access_token_expires_at
            };


            context.commit("auth/setAuthenticatedUser", userDetails, {
                root: true
            });

            context.commit("auth/setAuthenticationDetails", tokens, {
                root: true
            });

            context.commit("auth/setAuthenticationStatus", true, {
                root: true
            });
            context.commit("auth/setErrorCode", "", {
                root: true
            });
            context.commit("auth/setErrorData", "", {
                root: true
            });

        } catch (error) {
            context.commit("auth/setAuthenticatedUser", null, {
                root: true
            });
            context.commit("auth/setAuthenticationStatus", false, {
                root: true
            });
            if (error.response) {
                if (error.response.data.errorCode === "EMAIL_NOT_VERIFIED") {

                    context.commit("auth/setAccountNotVerified", true, {
                        root: true
                    })

                    context.commit("auth/setAccountNotVerifiedEmail", error.response.data.email, {
                        root: true
                    })
                    await context.dispatch('errors/errorResponse', error.response, {
                        root: true
                    });
                } else {
                    await context.dispatch('errors/errorResponse', error.response, {
                        root: true
                    });
                }
                context.commit("auth/setErrorCode", error.response.data.errorCode, {
                    root: true
                });
                context.commit("auth/setErrorData", error.response.data.errorData, {
                    root: true
                });
            }
        }
    },
    employeeSignin: async (context, params) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        try {
            let response = await axios.post("employee/signin", params);
            let userDetails = response.data.user_details;
            let tokens = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
            };
            context.commit("auth/setAuthenticatedUser", userDetails, {
                root: true
            });

            context.commit("auth/setAuthenticationDetails", tokens, {
                root: true
            });

            context.commit("auth/setAuthenticationStatus", true, {
                root: true
            });
        } catch (error) {
            context.commit("auth/setAuthenticatedUser", null, {
                root: true
            });
            context.commit("auth/setAuthenticationStatus", false, {
                root: true
            });

            console.log(error.response.data)
            context.commit(
                "auth/setGeneralErrorMessage",
                error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Something went wrong', {
                    root: true
                }
            )
        }
    },

    reset: function (context) {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
    },

    verifyAccount: async (context, params) => {
        try {
            context.dispatch('errors/clear', null, {
                root: true
            });
            context.commit('auth/setVerificationStatus', false, {
                root: true
            });

            await axios.post('/email/verify', params);
            context.commit('auth/setVerificationStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setVerificationStatus', false, {
                root: true
            });
            if (error.response) {
                await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
            }
        }
    },
    resendVerificationEmailToUser: async (context, params) => {
        try {
            context.commit('auth/setResendVerificationEmail', false, {
                root: true
            });
            await axios.post('/resend/verify', params);
            context.commit('auth/setResendVerificationEmail', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setResendVerificationEmail', false, {
                root: true
            });
            if (error.response) {
                await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
            }
        }
    },

    verifyAuthorizedRepresentativePassword: async (context, params) => {

        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("auth/setAuthenticationDetails", {}, {
            root: true
        });
        try {
            let response = await axios.post("/authorized-representative/verify-password", params);
            let userDetails = response.data.user_details;
            let authData = {
                user_id: userDetails._id,
                password: userDetails.password,
                document_id: userDetails.document_id
            };
            if (userDetails.workflow_data_id) {
                authData.workflow_data_id = userDetails.workflow_data_id
            }
            context.commit("auth/setAuthenticatedUser", userDetails, {
                root: true
            });

            context.commit("auth/setAuthenticationDetails", authData, {
                root: true
            });

            context.commit("auth/setAuthenticationStatus", true, {
                root: true
            });
        } catch (error) {
            context.commit("auth/setAuthenticatedUser", null, {
                root: true
            });
            context.commit("auth/setAuthenticationStatus", false, {
                root: true
            });

            if (error.response) {
                let errorsData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
                context.commit("auth/setAuthorizedRepresentativeVerifyPasswordErrors", errorsData, {
                    root: true
                })
            }
        }
    },
    async fetchMenuWithUserType(context, id) {
        try {
            const response = await axios.get(`menu/${id}`)
            context.commit("auth/setUserMenu", response.data.data, {
                root: true
            });
        } catch (errors) {
            context.commit("auth/setUserMenu", {}, {
                root: true
            })
        }
    },
    fetchupdateProfilePicStatus: async (context, params) => {
        try {
            context.commit('auth/setUpdateProfilePicStatus', false, {
                root: true
            })
            context.commit('auth/setUpdateprofilepicture', null, {
                root: true
            })
            const response = await axios.patch('/user/update-profile-picture', params);
            context.commit('auth/setUpdateUserProfilePicture', params.file, {
                root: true
            })
            context.commit('auth/setUpdateprofilepicture', response.data.data.avatar, {
                root: true
            })
            context.commit('auth/setUpdateProfilePicStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setUpdateUserProfilePicture', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setUpdateUserProfilePicture', error.response.data, {
                    root: true
                })
            }
        }
    },
    fetchupdateProfilePicture: async (context) => {
        try {
            context.commit('auth/setUpdateprofilepicture', null, {
                root: true
            })
            const response = await axios.get('/user/update-profile-picture');
            context.commit('auth/setUpdateprofilepicture', response.data.data.profile, {
                root: true
            })

        } catch (error) {
            context.commit('auth/setUpdateprofilepicture', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setUpdateprofilepicture', error.response.data, {
                    root: true
                })
            }
        }
    },
    fetchInitialSignature: async (context) => {
        try {
            context.commit('auth/setInitialUrl', null, {
                root: true
            })
            let initialData = await axios.get('/initials/user/me');
            context.commit('auth/setInitialUrl', initialData.data.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setInitialUrl', null, {
                root: true
            })
        }
    },
    addInitialSignature: async (context, params) => {
        try {
            context.commit('auth/setInitialAddStatus', false, {
                root: true
            })
            await axios.post('/initials/user/me', params);
            context.commit('auth/setInitialAddStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setInitialAddStatus', false, {
                root: true
            })
        }
    },
    updateUserProfile: async (context, params) => {
        try {
            context.commit('auth/setUpdateProfileStatus', false, {
                root: true
            })
            await axios.patch('/user/update-profile', params)
            context.commit('auth/setUpdateProfileStatus', true, {
                root: true
            })
            context.commit('auth/setUpdateUserProfile', params, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setUpdateProfileStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setUpdateProfileErrors', errorData, {
                    root: true
                })
            }
        }
    },
    updateUserPassword: async (context, params) => {
        try {
            context.commit('auth/setUpdatePasswordStatus', false, {
                root: true
            })
            await axios.patch('/password/update', params)
            context.commit('auth/setUpdatePasswordStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setUpdatePasswordStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setUpdatePasswordErrors', errorData, {
                    root: true
                })
            }
        }
    },

    /* New design of Signup process start */

    // updateUserNewPassword: async (context, params) => {
    //     try {
    //         context.commit('auth/setUpdateUserPasswordStatus', false, {
    //             root: true
    //         })
    //         await axios.patch('/userpassword/update', params)
    //         context.commit('auth/setUpdateUserPasswordStatus', true, {
    //             root: true
    //         })
    //     } catch (error) {
    //         context.commit('auth/setUpdateUserPasswordStatus', false, {
    //             root: true
    //         })
    //         if (error.response) {
    //             let errorData = await context.dispatch('errors/errorResponse', error.response, {
    //                 root: true
    //             })
    //             context.commit('auth/setUpdateUserPasswordErrors', errorData, {
    //                 root: true
    //             })
    //         }
    //     }
    // },

    /* New design of Signup process end */

    forgotPassword: async (context, params) => {
        try {
            context.commit('auth/setForgotPasswordStatus', false, {
                root: true
            })
            await axios.patch('/forgot-password', params)
            context.commit('auth/setForgotPasswordStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setForgotPasswordStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setForgotPasswordErrors', errorData, {
                    root: true
                })
            }
        }
    },
    forgotPasswordVerify: async (context, params) => {
        try {
            context.commit('auth/setForgotPasswordVerifyStatus', false, {
                root: true
            })
            await axios.patch('/verify/forgot-password', params)
            context.commit('auth/setForgotPasswordVerifyStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setForgotPasswordVerifyStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setForgotPasswordVerifyErrors', errorData, {
                    root: true
                })
            }
        }
    },
    fetchUserSignature: async ({
        commit
    }) => {
        try {
            commit('setUserSignature', null)
            const response = await axios.get('signature');
            commit('setUserSignature', response.data.data)
        } catch (error) {
            commit('setUserSignature', null)
            console.log(error)
        }
    },
    updateUserSignature: async (context, params) => {
        try {
            context.commit('auth/setSignatureUpdateStatus', false, {
                root: true
            })
            context.commit('auth/setSignatureUpdateErrors', null, {
                root: true
            })
            await axios.patch('/signature', params);
            context.commit('auth/setUpdateUserSignature', params, {
                root: true
            })
            context.commit('auth/setSignatureUpdateStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setSignatureUpdateStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setSignatureUpdateErrors', errorData, {
                    root: true
                })
            }
        }
    },
    updateUserInital: async (context, params) => {
        try {
            context.commit('auth/setSignatureUpdateStatus', false, {
                root: true
            })
            context.commit('auth/setSignatureUpdateErrors', null, {
                root: true
            })
            await axios.patch('/initial', params);
            context.commit('auth/setUpdateUserInitial', params, {
                root: true
            })
            context.commit('auth/setSignatureUpdateStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setSignatureUpdateStatus', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setSignatureUpdateErrors', errorData, {
                    root: true
                })
            }
        }
    },
    fetchProfile: async ({
        commit
    }) => {
        try {
            commit('setProfile', null)
            const response = await axios.get('/user/profile');
            commit('setProfile', response.data.data)
            const settings = response.data.data && response.data.data.document_settings ? response.data.data.document_settings : null;
            if (settings && settings.application_settings && settings.application_settings.date) {
                commit('setDefaultDateFormat', settings.application_settings.date)
            }
        } catch (error) {
            commit('setProfile', null)
        }
    },
    addCompanyUser: async (context, params) => {
        try {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            let response = await axios.post('/user/companyUsers', params);
            context.commit('auth/setAddCompanyUser', response.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setAddCompanyUser', error.response.data, {
                    root: true
                })
            }
        }
    },
    inviteCompanyUser: async (context, params) => {
        try {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            // let response = await axios.post('/user/inviteCompanyUser', params);
            let response = await axios.post('/user/inviteUser', params);
            context.commit('auth/setAddCompanyUser', response.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setAddCompanyUser', error.response.data, {
                    root: true
                })
            }
        }
    },
    getCompanyUsersList: async (context, params) => {
        try {
            context.commit('auth/setCompanyUsers', false, {
                root: true
            })
            let response = await axios.get('/user/companyUsers', {
                params
            });
            context.commit('auth/setCompanyUsers', response.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setCompanyUsers', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setCompanyUsers', error.response.data, {
                    root: true
                })
            }
        }
    },
    updateCompanyUser: async (context, params) => {
        try {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            let response = await axios.put('/user/companyUsers', params);
            context.commit('auth/setAddCompanyUser', response.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setAddCompanyUser', error.response.data, {
                    root: true
                })
            }
        }
    },
    deleteCompanyUser: async (context, params) => {
        try {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            let response = await axios.delete('/user/companyUsers/' + params);
            context.commit('auth/setAddCompanyUser', response.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setAddCompanyUser', error.response.data, {
                    root: true
                })
            }
        }
    },
    getUserTypeList: async (context, params) => {
        try {
            context.commit('auth/setUserTypeList', false, {
                root: true
            })
            const response = await axios.get('/userTypeList/' + params)
            context.commit('auth/setUserTypeList', response.data.message, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setUserTypeList', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setForgotPasswordErrors', errorData, {
                    root: true
                })
            }
        }
    },
    getInviteUser: async (context, params) => {
        try {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            let response = await axios.get('/getInviteUser', {
                params
            });
            context.commit('auth/setAddCompanyUser', response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setAddCompanyUser', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setAddCompanyUser', error.response.data, {
                    root: true
                })
            }
        }
    },
    inviteUserSignup: async (context, params) => {
        context.commit("auth/resetAuthData", null, {
            root: true
        });
        context.commit("auth/setAccountNotVerified", false, {
            root: true
        })
        context.commit("auth/setAccountNotVerifiedEmail", null, {
            root: true
        })

        try {
            await axios.post("inviteUserSignup", params);

            context.commit("auth/setSignupStatus", true, {
                root: true
            });
        } catch (error) {
            if (error.response) {
                if (error.response.data.statusCode === "ACCOUNT_NOT_VERIFIED") {

                    context.commit("auth/setAccountNotVerified", true, {
                        root: true
                    })

                    context.commit("auth/setAccountNotVerifiedEmail", error.response.data.email, {
                        root: true
                    })
                } else {
                    await context.dispatch("errors/errorResponse", error.response, {
                        root: true
                    });
                }
            }

            context.commit("auth/setSignupStatus", false, {
                root: true
            });
        }
    },
    async fetchUsersWithEmail(context, email) {
        try {
            const response = await axios.get(`userList/${email}`)
            context.commit("auth/setWorkspaceList", response.data.data, {
                root: true
            });
        } catch (errors) {
            context.commit('auth/setWorkspaceList', false, {
                root: true
            })
        }
    },
    getUserWorkspaceList: async (context) => {
        try {
            // context.commit('auth/setWorkspaceList',null,{root:true})
            const response = await axios.get('/user/getUserWorkspaceList');
            context.commit('auth/setWorkspaceList', response.data.data, {
                root: true
            })

        } catch (error) {
            context.commit('auth/setWorkspaceList', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setWorkspaceList', error.response.data, {
                    root: true
                })
            }
        }
    },
    getUserTypeById: async (context, params) => {
        try {
            // context.commit('auth/setUserType', false, { root: true })
            const response = await axios.get('/userType/' + params)
            context.commit('auth/setUserType', response.data.message, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setUserType', false, {
                root: true
            })
            if (error.response) {
                let errorData = await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                })
                context.commit('auth/setForgotPasswordErrors', errorData, {
                    root: true
                })
            }
        }
    },
    switchWorkspace: async (context, params) => {
        try {
            // let switchRole={}
            console.log("params",params)
           
            let response = await axios.post("/switchWorkspace/" + params.currentWorkspaceId,params);
            let userDetails = response.data.user_details;
            let tokens = {
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                refresh_token_expires_at: response.data.refresh_token_expires_at,
                access_token_expires_at: response.data.access_token_expires_at
            };
            context.commit("auth/setAuthenticationDetails", tokens, {
                root: true
            });
            context.commit("auth/setAuthenticatedUser", userDetails, {
                root: true
            });

            context.commit("auth/setAuthenticationStatus", true, {
                root: true
            });
        } catch (error) {
            context.commit("auth/setSwitchWorkspaceError", error.response.data, {
                root: true
            });
            context.commit("auth/setAuthenticationStatus", false, {
                root: true
            });
            if (error.response) {
                await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
            }
        }
    },

    updatePermissions: async (context, params) => {
        try {
            context.commit('auth/setManagePermissionsStatus', false, {
                root: true
            })
            context.commit('auth/setPermissions', false, {
                root: true
            })
            let response = await axios.patch('/permissions/' + params.id, params.permissions);
            context.commit('auth/setPermissions', response.data, {
                root: true
            })
            context.commit('auth/setManagePermissionsStatus', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setManagePermissionsStatus', false, {
                root: true
            })
            context.commit('auth/setPermissions', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setManagePermissionsErrors', error.response.data, {
                    root: true
                })
                context.commit('auth/setPermissions', error.response.data, {
                    root: true
                })
            }
        }
    },

    getPermissions: async (context) => {
        try {
            context.commit('auth/setPermissionList', [], {
                root: true
            })
            let response = await axios.get('/permissions');
            context.commit('auth/setPermissionList', response.data.data, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setPermissionList', [], {
                root: true
            })
            if (error.response) {
                context.commit('auth/setPermissionList', error.response.data, {
                    root: true
                })
            }
        }
    },

    checkUserExist: async (context, params) => {
        try {
            context.commit("auth/setAccountStatusByEmail", false, {
                root: true
            })
            context.commit('auth/setEmailExist', false, {
                root: true
            })
            let response = await axios.get('/checkUser/' + params);
            context.commit('auth/setEmailExist', response.data, {
                root: true
            })
            context.commit("auth/setAccountStatusByEmail", true, {
                root: true
            })
        } catch (error) {
            console.log("Check User", error.response)
            context.commit("auth/setAccountStatusByEmail", false, {
                root: true
            })

            context.commit('auth/setEmailExist', false, {
                root: true
            })
            if (error.response) {
                context.commit('auth/setEmailExist', error.response.data, {
                    root: true
                })
            }
        }
    },
    resendInviteEmailToUser: async (context, params) => {
        try {
            context.commit('auth/setResendVerificationEmail', false, {
                root: true
            });
            await axios.post('/resend/inviteMail', params);
            context.commit('auth/setResendVerificationEmail', true, {
                root: true
            })
        } catch (error) {
            context.commit('auth/setResendVerificationEmail', false, {
                root: true
            });
            if (error.response) {
                await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
            }
        }
    },
    verifyAndSwitch: async (context, params) => {
        try {
            let response = await axios.post("/user/verifyEmail/" + params);
            let userDetails = response.data.user_details;
            context.commit("auth/setAuthenticatedUser", userDetails, {
                root: true
            });

            context.commit("auth/setAuthenticationStatus", true, {
                root: true
            });
        } catch (error) {
            context.commit("auth/setSwitchWorkspaceError", error.response.data, {
                root: true
            });
            context.commit("auth/setAuthenticationStatus", false, {
                root: true
            });
            if (error.response) {
                await context.dispatch('errors/errorResponse', error.response, {
                    root: true
                });
            }
        }
    },
    errorResponse: async (context, errorResponse) => {
        let errorStatusCode = errorResponse.status;

        let errorData = [];

        switch (errorStatusCode) {
            case 422:
                var errors = errorResponse.data.errors;

                errors.details.forEach(detail => {
                    if (!errorData[detail.key]) {
                        errorData[detail.key] = detail.message;
                    }
                });

                break;

            case 401:
            case 403:
                errorData["critical_error"] = errorResponse.data.message;

                break;

            default:
                break;
        }

        return errorData;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};