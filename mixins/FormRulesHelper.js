


export default {
    data() {
        return {
            companyPrimaryDetails: {
                name: [
                    {
                        required: true,
                        message: "Company Name is required",
                        trigger: "blur"
                    }
                ],
                website: [
                    {
                        required: true,
                        message: "Website is required",
                        trigger: "blur"
                    }
                    , {
                        pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                        message: "Website is not valid",
                        trigger: "blur"
                    }
                ],
                size: [
                    {
                        required: true,
                        message: "Size is required",
                        trigger: "blur"
                    }
                ]
            }
        }

    }
    ,
    computed: {
        getCompanyPrimaryFormRules() {
            return this.companyPrimaryDetails
        }
    },
    methods: {}
}