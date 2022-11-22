<template>
  <section class="employee-on-boarding">
    <div class="inner-navbar" style="width: 80%">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="left-block">
            <div class="icon-block">
              <div class="icon">
                <img
                  src="@/assets/img/icons/dashboard/employee.svg"
                  alt="icon"
                  class="img-fluid"
                />
              </div>
              <div class="icon-text">
                <h3>Employee Onboarding</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right-block float-right">
            <button @click="backToEmployees" class="btn back-button">
              <i class="el-icon-back"></i> Back
            </button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="inner-navbar-content top" style="width: 80%">
      <div class="vue-form">
        <el-form ref="form" :model="form" :label-position="'top'">
          <div class="vue-tabs">
            <el-tabs :tab-position="'top'" v-model="activeTab">
              <el-tab-pane label="Employee Information" name="basic">
                <el-row :gutter="30">
                  <el-col :span="12">
                    <div class="form-group">
                      <label for="text">First Name</label>
                      <el-form-item>
                        <el-input v-model="form.first_name"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="form-group">
                      <label for="text">Last Name</label>
                      <el-form-item>
                        <el-input v-model="form.last_name"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="form-group">
                      <label for="text">Address Line</label>
                      <el-form-item>
                        <el-input
                          type="textarea"
                          v-model="form.address"
                          rows="3"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">City</label>
                      <el-form-item>
                        <el-input v-model="form.city"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">State</label>
                      <el-form-item>
                        <el-input v-model="form.state"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Zip</label>
                      <el-form-item>
                        <el-input v-model="form.zip"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <div class="submit-group">
                  <button
                    type="button"
                    @click="goToSection('job')"
                    class="btn submit-btn mt-0"
                  >
                    Save & Next
                  </button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Job Details" name="job">
                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Employment Type</label>
                      <el-form-item>
                        <el-select v-model="form.employment_type">
                          <el-option
                            :value="'FULL-TIME'"
                            :label="'Full Time'"
                          ></el-option>
                          <el-option
                            :value="'PART-TIME'"
                            :label="'Part Time'"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Job Title</label>
                      <el-form-item>
                        <el-input v-model="form.job_title"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Department</label>
                      <el-form-item>
                        <el-input v-model="form.job_department"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Job Location</label>
                      <el-form-item>
                        <el-input v-model="form.job_location"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Compensation Type</label>
                      <el-form-item>
                        <el-select v-model="form.compensation_type">
                          <el-option
                            :value="'MONTHLY'"
                            :label="'Monthly'"
                          ></el-option>
                          <el-option
                            :value="'HOURLY'"
                            :label="'Hourly'"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <label for="text">Compensation Amount ( $ )</label>
                    <div class="form-group">
                      <el-form-item>
                        <el-input v-model="form.compensation_amount"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Joining Date</label>
                      <el-form-item>
                        <el-date-picker
                          v-model="form.date_of_joining"
                          type="date"
                          placeholder="Select Date"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Reporting Person</label>
                      <el-form-item>
                        <el-input v-model="form.reporting_person"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Benefits</label>
                      <el-form-item>
                        <el-input
                          v-model="form.benefits"
                          placeholder="Common benifits"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Handbook name</label>
                      <el-form-item>
                        <el-input
                          v-model="form.handbook"
                          placeholder="Company document"
                        ></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="submit-group">
                      <button
                        @click="goToSection('offer-letter')"
                        class="btn submit-btn mt-0"
                        type="button"
                      >
                        Save & Next
                      </button>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="Offer Letter" name="offer-letter">
                <el-row :gutter="30">
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Offer Letter Issue Date</label>
                      <el-form-item>
                        <el-date-picker
                          v-model="form.offer_letter_issue_date"
                          type="date"
                          placeholder="Select Date"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Offer Letter Expire Date</label>
                      <el-form-item>
                        <el-date-picker
                          v-model="form.offer_letter_expire_date"
                          type="date"
                          :picker-options="datePickerOptions"
                          placeholder="Select Date"
                        ></el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="form-group">
                      <label for="text">Offer Letter Template</label>
                      <el-form-item>
                        <el-select
                          v-model="selectedOfferLetterTemplate"
                          value-key="_id"
                        >
                          <el-option
                            v-for="(
                              template, index
                            ) of getOfferLetterTemplates.data"
                            :value="template"
                            :key="index"
                            :label="template.name"
                          ></el-option>
                        </el-select>
                        <router-link to="/offer-letter-templates"
                          >Configure Offer Letters</router-link
                        >
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-tag
                    v-if="form.offer_letter_source"
                    @click="showPreparedOfferLetter = true"
                    closable
                    @close="clearOfferLetter()"
                    >Offer Letter</el-tag
                  >
                </el-row>
                <el-row>
                  <ul class="submit-group-list">
                    <li>
                      <button
                        type="button"
                        v-if="!form.offer_letter_source"
                        @click="generateOfferLetter"
                        class="btn submit-button mt-0"
                      >
                        Generate Offer Letter
                      </button>
                    </li>
                    <li>
                      <el-button
                        type="button"
                        :disabled="!form.offer_letter_source"
                        @click="saveEmployee"
                        class="btn disabled-button"
                        >Save Employee</el-button
                      >
                    </li>
                  </ul>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form>
      </div>
      <div class="vue-modal">
        <el-dialog
          width="80%"
          :visible.sync="showPreparedOfferLetter"
          :title="'Offer Letter'"
        >
          <PreviewOfferLetter
            v-if="showPreparedOfferLetter"
            :selectedOfferLetterTemplate="selectedOfferLetterTemplate"
            :employeeData="form"
            v-on:offer-letter-generated="copyOfferLetter"
          ></PreviewOfferLetter>

          <span slot="footer" class="dialog-footer">
            <el-button @click="showPreparedOfferLetter = false"
              >Cancel</el-button
            >
            <el-button type="primary" @click="saveOfferLetter"
              >Save Offer Letter</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
// import appConfig from "@/config/app";
import PreviewOfferLetter from "./PreviewOfferLetter";
export default {
  name: "Global-EmployeeOnboarding",
  components: {
    PreviewOfferLetter,
  },
  data() {
    let vm = this;
    return {
      form: {
        first_name: "Sundar",
        last_name: "Konapala",
        address: "Cecilia Chapman,711-2880 Nulla St.",
        city: "Mankato",
        state: "Mississippi",
        zip: "96522",
        employment_type: "FULL-TIME",
        job_title: "FULL STACK ENGINEERR",
        date_of_joining: "2020-04-23",
        reporting_person: "Ramayya Ketana",
        job_location: "NEW YORK",
        compensation_amount: 1000,
        compensation_type: "MONTHLY",
        benefits: "412",
        handbook: "Company Brochure",
        job_department: "Technical Team",
        offer_letter_expire_date: "2020-04-23",
        offer_letter_issue_date: "2020-04-30",
        authentication_signature: "SUNDAR",
        authentication_name: "SUNDAR",
        authentication_designation: "Head of Human Resource",
        offer_letter_source: "",
      },
      company: {},
      showPreparedOfferLetter: false,
      finalOfferLetter: "",
      selectedOfferLetterTemplate: null,
      activeTab: "basic",
      datePickerOptions: {
        disabledDate(date) {
          const disableNewDates = date.setDate(date.getDate());
          return disableNewDates < vm.getMinExpireDate;
        },
      },
    };
  },
  computed: {
    ...mapGetters("offerLetter", ["getOfferLetterTemplates"]),

    // ...mapGetters("company", []),
    ...mapGetters("employee", ["getEmployeeAddStatus"]),

    getMinExpireDate() {
      return this.form.offer_letter_issue_date
        ? new Date(this.form.offer_letter_issue_date)
        : new Date();
    },
  },
  mounted() {
    this.fetchCompanyDetails();
    this.fetchAllOfferLetterTemplates();
    this.fetchAllBenefits();
  },

  methods: {
    async fetchAllOfferLetterTemplates() {
      this.loading = true;
      this.data = [];
      let params = {
        get_all: true,
      };
      await this.$store.dispatch("offerLetter/getOfferLetterTemplates", params);
    },

    async fetchAllBenefits() {
      let params = {
        get_all: true,
      };
      await this.$store.dispatch("companyBenefits/getBenefits", params);
    },

    generateOfferLetter() {
      if (!this.selectedOfferLetterTemplate) {
        this.$message.warning("Please select Offer Letter Template");
        return;
      }
      this.showPreparedOfferLetter = true;
    },
    async fetchCompanyDetails() {
      //this.$store.dispatch("company/getCompany");
      //this.$store.dispatch("company/getCompanyAuthorizationSignatures");
    },
    async printOfferLetter() {
      await this.$htmlToPaper("offerLetterBody");
    },

    async saveOfferLetter() {
      this.form.offer_letter_source = this.finalOfferLetter;
      this.showPreparedOfferLetter = false;
    },

    async copyOfferLetter(offerLetterSource) {
      this.finalOfferLetter = offerLetterSource;
    },

    async clearOfferLetter() {
      this.form.offer_letter_source = "";
    },
    async saveEmployee() {
      await this.$store.dispatch("employee/addEmployeeData", this.form);
      if (this.getEmployeeAddStatus) {
        this.$notify.success({
          title: "Success",
          message: "Employee Onboarded successfully",
        });

        this.$alert("Employee Onboarded successfully", "Success", {
          confirmButtonText: "Go to Employees List",
          callback: () => {
            this.$router.push({ path: "/employee-list" });
          },
        });
      } else {
        this.$message.error("Error at saving employee data");
      }
    },

    async disableExpireDate(date) {
      return new Date(this.form.offer_letter_issue_date) < date;
    },
    goToSection(tab) {
      this.activeTab = tab;
    },
    backToEmployees() {
      this.$router.push({ path: "/employee-list" });
    },
  },
  beforeDestroy() {
    this.$store.commit("offerLetter/setOfferLetterTemplates", null, {
      root: true,
    });
    this.$store.commit("employee/setEmployeeAddStatus", false, {
      root: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.employee-on-boarding {
  .submit-group {
    margin-top: 15px;
    border-top: 1px solid rgba(27, 72, 126, 0.1);
    padding-top: 25px;
    margin-bottom: 55px;
    button {
      float: right;
    }
  }
  .submit-group-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 15px;
    border-top: 1px solid rgba(27, 72, 126, 0.1);
    padding-top: 25px;
    li {
      &:first-child {
        margin-right: 25px !important;
      }
      .submit-btn {
        margin-right: 35px;
      }
    }
  }
}
</style>