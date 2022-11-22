export default {
    STANDARD_DOCUMENTS_LIST: [
        {
            name: "I9 Form",
            title: "I9 Form",
            description: "I-9, Employment Eligibility Verification",
            value: "I9_FORM",
            slug: "i9-form",
            component: "i9-form",
            preview_component: "I9FormPreview",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        {
            name: "W4 Form",
            title: "W4 Form",
            description:
                "Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay.",
            value: "W4_FORM",
            slug: "w4-form",
            component: "w4-form",
            preview_component: "W4FormPreview",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        {
            name: "W9 Form",
            title: "W9 Form",
            description:
                "Form W-9 is Request for Taxpayer Identification Number and Certifications.",
            value: "W9_FORM",
            slug: "w9-form",
            component: "w9-form",
            preview_component: "W9FormPreview",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        {
            name: "Dental Vision Enrollment Form",
            title: "Dental Vision Enrollment Form",
            description:
                "Dental Vision Enrollment Form From Cigna.",
            value: "DENTAL_VISION_ENROLLMENT_FORM",
            slug: "dental-vision-enrollment-form",
            component: "dental-vision-enrollment-form",
            preview_component: "DentalVisionEnrollmentFormPreview",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        {
            name: "Medical Enrollment form Geoblue",
            title: "Medical Enrollment form Geoblue",
            description:
                "Medical Enrollment form Geoblue",
            value: "MEDICAL_ENROLLMENT_FORM_GEOBLUE",
            slug: "medical-enrollment-form-geoblue",
            component: "medical-enrollment-form-geoblue",
            preview_component: "MedicalEnrollmentFormGeobluePreview",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        }
    ],

    STANDARD_DOCUMENTS_MAP: {
        I9_FORM: {
            name: "I9 Form",
            title: "I9 Form",
            description: "I-9, Employment Eligibility Verification",
            value: "I9_FORM",
            slug: "i9-form",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        W4_FORM: {
            name: "W4 Form",
            title: "W4 Form",
            description:
                "Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay.",
            value: "W4_FORM",
            slug: "w4-form",
            updated_at: "",
            updated_by: {}
        },
        W9_FORM: {
            name: "W9 Form",
            title: "W9 Form",
            description:
                "Form W-9 is Request for Taxpayer Identification Number and Certifications.",
            value: "W9_FORM",
            slug: "w9-form",
            component: "w9-form",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        DENTAL_VISION_ENROLLMENT_FORM: {
            name: "Dental Vision Enrollment Form",
            title: "Dental Vision Enrollment Form",
            description:
                "Dental Vision Enrollment Form From Cigna.",
            value: "DENTAL_VISION_ENROLLMENT_FORM",
            slug: "dental-vision-enrollment-form",
            component: "dental-vision-enrollment-form",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        },
        MEDICAL_ENROLLMENT_FORM_GEOBLUE: {
            name: "Medical Enrollment form Geoblue",
            title: "Medical Enrollment form Geoblue",
            description:
                "Medical Enrollment form Geoblue",
            value: "MEDICAL_ENROLLMENT_FORM_GEOBLUE",
            slug: "medical-enrollment-form-geoblue",
            component: "medical-enrollment-form-geoblue",
            type: "STANDARD",
            updated_at: "",
            updated_by: {}
        }
    },

    STANDARD_DOCUMENTS_CONFIGURATION: {
        W4_FORM: {
            pages: [
                {
                    name: "Page 1",
                    sections: [
                        {
                            name: "Personal  Information",
                            key: "personal_information",
                            fields: [
                                {
                                    name: "First Name",
                                    key: "first_name",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Middle Initial",
                                    key: "middle_initial",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Last name",
                                    key: "last_name",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Address",
                                    key: "address",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "City or Town",
                                    key: "city_or_town",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "State",
                                    key: "state",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "ZIP Code",
                                    key: "zip_code",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Social Security Number",
                                    key: "us_social_security_number",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Single or Married filing separately",
                                    key: "single_or_married_filing_separately",
                                    type: "CHECKBOX",
                                    template_variables: []
                                },
                                {
                                    name: "Married filing jointly",
                                    key: "married_filing_jointly",
                                    type: "CHECKBOX",
                                    template_variables: []
                                },
                                {
                                    name: "Head of household",
                                    key: "head_of_household",
                                    type: "CHECKBOX",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Multiple Jobs or Spouse Works",
                            key: "multiple_jobs_or_spouse_works",
                            fields: [
                                {
                                    name: "Multiple jobs have similar pay",
                                    key: "multiple_jobs_have_similar_pay",
                                    type: "CHECKBOX",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Claim Dependents",
                            key: "claim_dependents",
                            fields: [
                                {
                                    name: "Qualifying Children Dependent Amount",
                                    key: "qualifying_children_dependent_amount",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Other Dependents Amount",
                                    key: "other_dependents_amount",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Total Dependents Amount",
                                    key: "total_dependents_amount",
                                    type: "NUMBER",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Other Adjustments",
                            key: "other_adjustments",
                            fields: [
                                {
                                    name: "Other income (not from jobs)",
                                    key: "other_income_not_from_jobs",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Deductions",
                                    key: "deductions",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Extra withholding",
                                    key: "extra_withholding",
                                    type: "NUMBER",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Sign Here",
                            key: "signature_details",
                            fields: [
                                {
                                    key: "employee_signature",
                                    name: "Employee’s signature ",
                                    type: "SIGNATURE",
                                    template_variables: []
                                },
                                {
                                    key: "employee_signature_date",
                                    name: "Date",
                                    type: "DATE",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Employer Details",
                            key: "employers_details",
                            fields: [
                                {
                                    key: "name_and_address",
                                    name: "Employer’s name and address",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    key: "first_date_of_employment",
                                    name: "First date of employment",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    key: "employer_identification_number",
                                    name: "Employer identification  number",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                }
                            ]
                        }
                    ]
                },

                {
                    name: "Page 3",
                    sections: [
                        {
                            name: "Multiple Jobs Worksheet",
                            key: "multiple_jobs_worksheet",
                            fields: [
                                {
                                    name: "Two jobs",
                                    key: "two_jobs_1",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Three Jobs 2a",
                                    key: "three_jobs_2a",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Three Jobs 2b",
                                    key: "three_jobs_2b",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Three Jobs 2c",
                                    key: "three_jobs_2c",
                                    type: "NUMBER",
                                    template_variables: []
                                },

                                {
                                    name: "No of pay periods",
                                    key: "no_of_pay_periods",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Amount per one period",
                                    key: "amount_per_one_period",
                                    type: "NUMBER",
                                    template_variables: []
                                }
                            ]
                        },
                        {
                            name: "Deductions Worksheet",
                            key: "deductions_worksheet",
                            fields: [
                                {
                                    name: "Estimated Itemized Deductions",
                                    key: "estimated_itemized_deductions",
                                    type: "NUMBER",
                                    template_variables: []
                                },

                                {
                                    name: "Estimated Multiple Jobs Deductions",
                                    key: "estimated_multiple_jobs_deductions",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Difference Itemized multiple job Deductions ",
                                    key: "itemized_multiple_job_deductions_difference",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Student Loan Interest",
                                    key: "student_load_interest",
                                    type: "NUMBER",
                                    template_variables: []
                                },
                                {
                                    name: "Total Deductions",
                                    key: "total_deductions",
                                    type: "NUMBER",
                                    template_variables: []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        MEFG_FORM: {
            pages: [
                {
                    name: "Page 1",
                    sections: [
                        {
                            name: "Employee Information",
                            key: "employee_information",
                            fields: [
                                {
                                    name: "Group Name",
                                    key: "group_name",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Job Title",
                                    key: "job_title",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Last name",
                                    key: "last_name",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "First Name",
                                    key: "first_name",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Tax Id or SSN",
                                    key: "tax_id_or_ssn",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Mailing Address",
                                    key: "mailing_address",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "City",
                                    key: "city",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "State",
                                    key: "state",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Postal Code",
                                    key: "postal_code",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Country",
                                    key: "country",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Gender",
                                    key: "gender",
                                    type: "RADIO",
                                    template_variables: []
                                },
                                {
                                    name: "Date of Birth",
                                    key: "date_of_birth",
                                    type: "DATE",
                                    template_variables: []
                                },
                                {
                                    name: "Emoplyee ID",
                                    key: "employee_id",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Email Address",
                                    key: "email_address",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Mobile Number",
                                    key: "mobile_number",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Home Country",
                                    key: "home_country",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Host Country",
                                    key: "host_country",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Effective Date",
                                    key: "effective_date",
                                    type: "DATE",
                                    template_variables: []
                                },
                                {
                                    name: "Life Event",
                                    key: "life_event",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Signature",
                                    key: "signature",
                                    type: "SINGLE_LINE_TEXT",
                                    template_variables: []
                                },
                                {
                                    name: "Date",
                                    key: "date",
                                    type: "DATE",
                                    template_variables: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },


    STANDARD_DOCUMENTS_FORM_DATA: {
        W4_FORM: {
            personal_information: {
                first_name: "",
                last_name: "",
                middle_initial: "",
                address: "",
                city_or_town: "",
                zip_code: "",
                dob: "",
                us_social_security_number: "",
                signature_of_employee: "",
                single_or_married_filing_separately: "",
                filling_status: "",
                married_filing_jointly: "",
                head_of_household: ""
            },
            multiple_jobs_or_spouse_works: {
                multiple_jobs_have_similar_pay: ""
            },
            claim_dependents: {
                qualifying_children_dependent_amount: "",
                other_dependents_amount: "",
                total_dependents_amount: ""
            },
            other_adjustments: {
                other_income_not_from_jobs: "",
                other_dependents_amount: "",
                total_dependents_amount: ""
            },
            signature_details: {
                employee_signature: "",
                employee_signature_date: ""
            },
            employers_details: {
                name_and_address: "",
                first_date_of_employment: "",
                employer_identification_number: ""
            },
            multiple_jobs_worksheet: {
                two_jobs_1: "",
                three_jobs_2a: "",
                three_jobs_2b: "",
                three_jobs_2c: "",
                no_of_pay_periods: "",
                amount_per_one_period: ""
            },

            deductions_worksheet: {
                estimated_itemized_deductions: "",
                estimated_multiple_jobs_deductions: "",
                itemized_multiple_job_deductions_difference: "",
                student_load_interest: "",
                total_deductions: ""
            }
        },


        MEFG_FORM: {
            employee_information: {
                group_name: "",
                job_title: "",
                last_name: "",
                first_name: "",
                tax_id_or_ssn: "",
                mailing_address: "",
                city: "",
                state: "",
                postal_code: "",
                country: "",
                gender: "",
                date_of_birth: "",
                employee_id: "",
                email_address: "",
                mobile_number: "",
                home_country: "",
                host_country: "",
                effective_date: "",
                life_event: "",
                signature: "",
                date: "",
            }
        }
    },

    I9_FORM: {
        today: "",
        employee_information_attestation: {
            last_name: "",
            first_name: "",
            middle_name: "",
            address: "",
            apt_number: "",
            city_or_town: "",
            zip_code: "",
            dob: "",
            us_social_security_number: "",
            employee_email_address: "",
            employee_telephone_number: "",
            citizen_type: "",
            alien_registration_number_or_uscis_number: "",
            alien_registration_number_or_uscis_number_type: "",
            form_i_94_admission_number: "",
            foreign_passport_number: "",
            country_of_issuance: "",
            signature_of_employee: ""
        },
        preparer_or_translator_certification: {
            preparer_or_translator: "",
            signature_of_preparer_or_translator: "",
            last_name: "",
            first_name: "",
            address: "",
            city_or_town: "",
            state: "",
            zip_code: ""
        },
        authorized_representative_review_and_verification: {
            last_name: "",
            mi: "",
            citizenship_immigration_status: "",
            employee_first_day: "",
            signature_of_employer_or_authorized_representative: "",
            title_of_employer_or_authorized_representative: "",
            last_name_of_employer_or_authorized_representative: "",
            first_name_of_employer_or_authorized_representative: "",
            employer_business_or_organization_name: "",
            employer_business_or_organization_address: "",
            city_or_town: "",
            state: "",
            zip_code: "",
            list_a_documents: [
                {
                    document_category: "Identity and Employment Authorization",
                    document_title: "",
                    document_number: "",
                    issuing_authority: "",
                    expiration_date: ""
                },
                {
                    document_category: "Identity and Employment Authorization",
                    document_title: "",
                    document_number: "",
                    issuing_authority: "",
                    expiration_date: ""
                },
                {
                    document_category: "Identity and Employment Authorization",
                    document_title: "",
                    document_number: "",
                    issuing_authority: "",
                    expiration_date: ""
                }
            ],
            list_b_documents: [
                {
                    document_category: "Identity",
                    document_title: "",
                    document_number: "",
                    issuing_authority: "",
                    expiration_date: ""
                }
            ],
            list_c_documents: [
                {
                    document_category: "Employment Authorization",
                    document_title: "",
                    document_number: "",
                    issuing_authority: "",
                    expiration_date: ""
                }
            ]
        },
        reverification_and_rehires: {
            last_name: "",
            first_name: "",
            middle_initial: "",
            date_of_rehire: "",
            document_title: "",
            document_number: "",
            document_expiration_date: "",
            signature_of_employer_or_authorized_representative: "",
            name_of_employer_or_authorized_representative: ""
        }
    },

    W9_FORM: {
        primary_information: {
            name: "",
            business_name_or_disregarded_entity_name: "",
            federal_tax_classification: "",
            tax_classification: "",
            other_tax_classification: "",
            exempt_payee_code: "",
            exemption_from_fatca: "",
            address: "",
            city_or_town: "",
            zip_code: "",
            requester_name: "",
            requester_address: "",
            account_numbers: ""
        },
        taxpayer_identification_number: {
            us_social_security_number: "",
            employer_identification_number: ""
        },
        certification: {
            signature_of_us_person: "",
            signature_date_of_us_person: ""
        }
    },

    EMP_DOC_VIEW_COMPONENT_MAP: {
        'STATIC': 'employee-documents-static-document',
        'STANDARD': 'employee-documents-standard-document',
        'CUSTOM': {
            'PDF_OR_IMAGE': 'employee-documents-custom-document',
            'WORD_DOCUMENT': 'employee-documents-custom-doc-type-document'
        },
        'REQUESTED': 'employee- documents - requested - document'
    }
}