export default {
    data() {
        return {

        }

    },
    computed: {
        defaultMentionItems() {
            return [
                {
                    name: "CompanyLogo",
                    id: "company#logo"
                },
                {
                    name: "OfferIssuedDate",
                    id: "employee#offer_letter_issue_date"
                },
                {
                    name: "EmployeeFirstName",
                    id: "employee#first_name"
                },
                {
                    name: "EmployeeLastName",
                    id: "employee#last_name"
                },
                {
                    name: "EmployeeAddress",
                    id: "employee#address"
                },
                {
                    name: "EmployeeCity",
                    id: "employee#city"
                },

                {
                    name: "EmployeeState",
                    id: "employee#state"
                },
                {
                    name: "EmployeeZip",
                    id: "employee#zip"
                },
                {
                    name: "EmploymentType",
                    id: "employee#employment_type"
                },
                {
                    name: "JobTitle",
                    id: "employee#job_title"
                },
                {
                    name: "Department",
                    id: "employee#job_department"
                },
                {
                    name: "CompanyName",
                    id: "company#name"
                },
                {
                    name: "JoiningDate",
                    id: "employee#date_of_joining"
                },
                {
                    name: "ReportingPerson",
                    id: "employee#reporting_person"
                },
                {
                    name: "Job Location",
                    id: "employee#job_location"
                },
                {
                    name: "CompensationAmount",
                    id: "employee#compensation_amount"
                },
                {
                    name: "EmployeeSignature",
                    id: "employee#signature"
                },
                {
                    name: "CompensationType",
                    id: "employee#compensation_type"
                },
                {
                    name: "DefaultCompanyBenefits",
                    id: "employee#benefits"
                },
                {
                    name: "EmployeeHandbook",
                    id: "employee#handbook"
                },
                {
                    name: "OfferLetterExpireDate",
                    id: "employee#offer_letter_expire_date"
                }
            ]
        }
    },
    methods: {
        getAuthorizedSignaturesAsMentions(authorizedSignatures) {
            let mentions = [];
            authorizedSignatures.forEach((signature) => {
                let obj = {
                    name: `${signature.designation.split(' ').join('')}AuthorizedSignature`,
                    id: "authorized_signature#id_" + signature._id
                }
                mentions.push(obj)
            })
            return mentions
        },
        convertImageToBase64(url) {
            return new Promise((resolve) => {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        resolve(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            })
        }
    }
}