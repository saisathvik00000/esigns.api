import {
    mapGetters
} from "vuex"

export default {
    data() {
        return {
            filledByUserTypeMap: {
                'SENDER': ["ADMIN"],
                'RECEIVER': ["EMPLOYEE"],
                'SENDER_OR_RECEIVER': ["EMPLOYEE", "ADMIN"]
            }
        }
    },
    computed: {
        ...mapGetters("auth", ["getAuthenticatedUser", "getUserType"]),
        userType() {
            // console.log(this.getUserType)
            return this.getUserType ? this.getUserType.name : null
        },
        isLoggedUserAdmin() {
            this.userType == "ADMIN"
        }
    },
    methods: {
        fieldFilledByCurrentUser() {
            // let userTypesList = ['ADMIN', 'OWNER'];
            // if (filledBy == "RECEIVER" && !userTypesList.includes(this.userType)) {
            //     return false
            // } else if (filledBy == "SENDER" && userTypesList.includes(this.userType)) {
            //     return true
            // } else {
            //     return true;
            // }
            return true;
        }
    }
}