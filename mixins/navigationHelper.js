// import companyDocuments from "@/constants/lg-en/companyDocuments";
// import companyDocumentsData from "@/constants/lg-en/companyDocuments";
// import {
//     mapGetters
// } from 'vuex';

export default {
    data() {
        return {}
    },
    computed: {},
    methods: {

        async getNavigationQuery(query) {
            let q = {
                key: Math.floor(Math.random() * 100000)
            }
            query.group ? q.group = query.group : '';
            query.groups ? q.groups = query.groups : '';
            query.t ? q.t = query.t : '';
            query.routeType ? q.routeType = query.routeType : '';
            return q
        }
    },
}