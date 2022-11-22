import config from '@/config/app'
import store from '@/store'

export default {
    authenticatedRoutes(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null

        if (!accessToken) {
            next()
        } else {
            next("/dashboard")
        }


    },

    guest(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null
        if (!accessToken) {
            next()
        } else {
            next("/dashboard")
            // next(!accessToken ? true : {
            //     name: "home"
            // })
        }


    },

    guestEmployee(to, from, next) {
        var authData = JSON.parse(localStorage.getItem(config.APP_NAME + '_' + config.APP_VERSION))
        var isAuthenticated = authData ? authData.auth.authenticationStatus : false
        next(!isAuthenticated ? true : {
            path: "/emp"
        })

    },

    user(to, from, next) {

        let authDetails = store.getters['auth/getAuthenticationDetails']
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null

        if (!accessToken) {
            next('/signin');
        } else if (to.path == '/signin') {
            next('/');
        } else {
            next();
        }
    },

    passwordProtected(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']
        let password = authDetails && authDetails['password'] ? authDetails['password'] : null

        if (!password) {
            next('/signin');
        } else {
            next();
        }
    },
    passwordProtectedOrAuthUser(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']
        let password = authDetails && authDetails['password'] ? authDetails['password'] : null
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null

        var isPasswordUser = password ? true : false
        var isAuthenticatedUser = accessToken ? true : false

        if (!isPasswordUser && !isAuthenticatedUser) {
            next('/signin');
        } else {
            next();
        }

    },
    userOrServer(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']
        let accessToken = authDetails && authDetails['access_token'] ? authDetails['access_token'] : null
        var isAuthenticated = accessToken ? true : false
        var server = false
        if (to.query.access_token) {
            let data = {
                "access_token": to.query.access_token,
                "refresh_token": to.query.refresh_token
            }
            store.commit('auth/setAuthenticationDetails', data, {
                root: true
            })
            server = true;
        }
        next((isAuthenticated || server) ? true : {
            path: '/signin',
            query: {
                redirect: to.name
            }
        })
    },

    onlyAdmin(to, from, next) {
        let authUser = store.getters['auth/getAuthenticatedUser']
        let isAdmin = authUser && authUser.user_type && authUser.user_type.name == "ADMIN"
        let redirectPath = '/emp/'
        next(isAdmin ? true : {
            path: redirectPath
        })
    },

    guestUserFormbuilderPasswordProtected(to, from, next) {
        let authDetails = store.getters['auth/getAuthenticationDetails']

        console.log("authDetails", authDetails);

        let passcode = authDetails && authDetails['passcode']
        let formbuilderUserId = authDetails && authDetails['user_id']

        var isAuthenticated = passcode && formbuilderUserId ? true : false
        next(isAuthenticated ? true : {
            name: 'FormbuilderGuestAuth',
            params: to.params,
            query: to.query
        })
    },
}