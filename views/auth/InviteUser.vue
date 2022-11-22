<template>
  <section id="inviteUserPage">
    <el-row class="row-type-one">
      <el-col
        :xl="{ span: 11 }"
        :lg="{ span: 11 }"
        :md="{ span: 24 }"
        :sm="{ span: 24 }"
      >
        <div class="banner-image">
          <div class="p-sm-5 p-3">
            <a href="#" class="logo">
              <img src="@/assets/img/logo-white.svg" alt="Sign Up Banner" />
            </a>
            <div class="content d-flex align-items-center">
              <div>
                <p
                  class="text-white fs-4 line-height-195"
                  style="font-weight: bold; font-family: inter"
                >
                  Manage Documents Better. Run Business Smoothly<br />
                </p>
                <p
                  class="text-white fs-5 line-height-175"
                  style="font-family: inter"
                >
                  We ensure all our features & functionality at eSigns will let
                  you manage your documents better and improve efficiency and
                  visibility into your workflows to drive better business
                  performance. Get the most out of eSigns!
                </p>
                <p
                  class="
                    fw-semi-medium
                    text-white
                    fs-6
                    d-flex
                    align-items-center
                  "
                ></p>
              </div>
            </div>
            <div class="copyright text-center text-light">
              ©2021 eSigns, Inc. All Rights Reserved.
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        :xl="{ span: 13 }"
        :lg="{ span: 13 }"
        :md="{ span: 24 }"
        :sm="{ span: 24 }"
      >
        <div class="signUp__Flow">
          <div class="p-sm-5 p-3">
            <div class="nav-link fs-7 text-right">
              Already have an account?
              <router-link to="/signin" class="text-dark fw-medium"
                >Sign in</router-link
              >
            </div>
            <div class="content mt-3">
              <div class="mt-4">
                <h1 class="fs-3 text-dark pb-2">Complete Your Profile</h1>
                <p class="text-muted opacity-80 fs-7">
                  For the purpose of industry regulation, your details are
                  required.
                </p>
                <hr />
                <el-form
                  :model="signup"
                  :rules="rules"
                  ref="signup"
                  class="log-form"
                  @keyup.enter.native="submitForm('signup')"
                >
                  <div class="d-flex">
                    <el-form-item
                      label="First Name"
                      prop="first_name"
                      class="mr-1"
                    >
                      <el-input
                        v-model="signup.first_name"
                        placeholder="Enter first name"
                      ></el-input>
                      <p class="error" v-if="getErrors && getErrors.first_name">
                        {{ getErrors.first_name }}
                      </p>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="last_name">
                      <el-input
                        v-model="signup.last_name"
                        placeholder="Enter last name"
                      ></el-input>
                      <p class="error" v-if="getErrors && getErrors.last_name">
                        {{ getErrors.last_name }}
                      </p>
                    </el-form-item>
                  </div>
                  <el-form-item label="Mobile" prop="phone">
                    <el-input
                      type="number"
                      v-model="signup.phone"
                      placeholder="989 989 9899"
                      autocomplete="off"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.phone">
                      {{ getErrors.phone }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Email Address" prop="email">
                    <el-input
                      type="email"
                      :readonly="$route.query.email ? true : false"
                      v-model="signup.email"
                      placeholder="Ex: johnwesley@abc.com"
                      autocomplete="off"
                      :disabled="$route.query.email ? true : false"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.email">
                      {{ getErrors.email }}
                    </p>
                    <p
                      class="error"
                      v-if="
                        getErrors &&
                        getErrors.critical_error &&
                        getErrors.critical_error ==
                          'Account with this email is already taken'
                      "
                    >
                      {{ getErrors.critical_error }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Company Name" prop="company_name">
                    <el-input
                      v-model="signup.company_name"
                      :readonly="
                        $route.query.company && signup.company_name
                          ? true
                          : false
                      "
                      :disabled="
                        $route.query.company && signup.company_name
                          ? true
                          : false
                      "
                      placeholder="Enter company name"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.company_name">
                      {{ getErrors.company_name }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Password" class="mb-1" prop="password">
                    <el-input
                      :type="passwordType"
                      placeholder="Enter Password"
                      v-model="signup.password"
                      autocomplete="off"
                      ref="passwordInput"
                      @input="checkPassword"
                    ></el-input>
                    <el-button
                      type="text"
                      class="password-switch"
                      v-if="passwordType == 'password'"
                      @click="passwordType = 'text'"
                      >SHOW</el-button
                    >
                    <el-button
                      type="text"
                      class="password-switch"
                      v-if="passwordType != 'password'"
                      @click="passwordType = 'password'"
                      >HIDE</el-button
                    >
                    <p class="error" v-if="getErrors && getErrors.password">
                      {{ getErrors.password }}
                    </p>
                    <p class="error" v-if="errors && errors.password">
                      {{ errors.password }}
                    </p>
                  </el-form-item>
                  <el-form-item
                    label="Confirm Password"
                    class="mb-1"
                    prop="cPassword"
                  >
                    <el-input
                      :type="cpasswordType"
                      placeholder="Enter Password"
                      v-model="signup.cPassword"
                      autocomplete="off"
                      ref="passwordInput"
                      @input="checkConfirmPassword"
                    ></el-input>
                    <el-button
                      type="text"
                      class="password-switch"
                      v-if="cpasswordType == 'password'"
                      @click="cpasswordType = 'text'"
                      >SHOW</el-button
                    >
                    <el-button
                      type="text"
                      class="password-switch"
                      v-if="cpasswordType != 'password'"
                      @click="cpasswordType = 'password'"
                      >HIDE</el-button
                    >
                  </el-form-item>
                  <span
                    class="error"
                    v-for="(err, index) in passwordError"
                    :key="index"
                  >
                    {{ err }}<br />
                  </span>
                  <el-form-item prop="terms_and_conditions">
                    <el-checkbox
                      name="terms_and_conditions"
                      v-model="signup.terms_and_conditions"
                      @change="handleTermsState"
                    >
                      I agree to eSigns
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="displayTermsAndConditions"
                        >Terms</el-link
                      >
                      &
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="displayPrivacyPolicy"
                      >
                        Conditions
                      </el-link>
                    </el-checkbox>
                    <p class="error" v-if="errors.terms_and_conditions">
                      You have to agree the terms and privacy condition.
                    </p>
                  </el-form-item>
                  <el-form-item class="mt-1">
                    <el-button
                      type="primary"
                      class="type-2 w-100 fs-6 bg-color"
                      @click="submitForm('signup')"
                      :loading="submitLoading"
                      >Update Profile</el-button
                    >
                    <p
                      class="error"
                      v-if="
                        getErrors &&
                        getErrors.critical_error &&
                        getErrors.critical_error !=
                          'Account with this email is already taken'
                      "
                    >
                      {{ getErrors.critical_error }}
                    </p>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="terms_and_conditions_dialog"
      :title="
        isTermsConditionsActive ? 'Terms and Conditions' : 'Privacy Policy'
      "
      class="terms-conditions-dilalog-main"
      :before-close="resetTermsAndPrivacy"
    >
      <div class="terms-conditions-dilalog">
        <div style="padding: 5px" v-if="isTermsConditionsActive">
          <termsAndConditionsTemplate />
        </div>
        <div style="padding: 5px" v-else>
          <privacyAndPolicyTemplate />
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import termsAndConditionsTemplate from "@/components/templates/termsAndConditionsTemplate.vue";
import privacyAndPolicyTemplate from "@/components/templates/privacyAndPolicyTemplate.vue";
export default {
  name: "InviteUser",
  components: {
    termsAndConditionsTemplate,
    privacyAndPolicyTemplate,
  },
  data() {
    return {
      userDetails: {},
      isPrivacyPolicyActive: false,
      terms_and_conditions_dialog: false,
      isTermsConditionsActive: false,
      passwordError: [],
      submitLoading: false,
      passwordType: "password",
      cpasswordType: "password",
      signup: {
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        password: "",
        // terms_and_conditions: false,
        phone: "",
        cPassword: "",
      },
      password_rules: [
        {
          message:
            "Must have one Uppercase(A-Z) letter,one lowercase(a-z) letter ,one number(0-9) and one symbol",
          regex:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        },
      ],
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Invalid Email",
            trigger: "blur",
          },
        ],
        password: [
          // {
          //   required: true,
          //   message: "Password is required",
          //   trigger: "blur",
          // },
          // { validator: validatePass, trigger: "blur" },
        ],
        cPassword: [
          // {
          //   required: true,
          //   message: "Password is required",
          //   trigger: "blur",
          // },
          // { validator: validatePass2, trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            message: "Phone is required",
            trigger: "blur",
          },
        ],
        first_name: [
          {
            required: true,
            message: "First name is required",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Last name is required",
            trigger: "blur",
          },
        ],
        company_name: [
          {
            required: true,
            message: "Company name is required",
            trigger: "blur",
          },
        ],
      },
      errors: {},
    };
  },
  mounted() {
    // this.$store.dispatch("auth/signOut");
    this.resetStore();
    this.getInviteUserDetails();
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", [
      "getAuthenticationStatus",
      "isSignupCompleted",
      "getAccountNotVerified",
      "getAccountNotVerifiedEmail",
      "getAddCompanyUser",
      "getSignupStatus",
    ]),
    termsError() {
      return !this.signup.terms_and_conditions;
    },
  },
  created() {
    this.resetStore();
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    handleTermsState() {
      this.errors.terms_and_conditions = this.signup.terms_and_conditions
        ? false
        : true;
    },
    resetStore() {
      this.$store.commit("auth/resetAuthData", null, { root: true });
      this.$store.commit(
        "configurableDocuments/resetConfigurableDocuments",
        null,
        { root: true }
      );
      this.$store.commit("employeeData/reset", null, { root: true });
      this.$store.commit("employeeDocuments/reset", null, { root: true });
      // this.$store.commit("employeeDocumentAuthorizedUsers/reset");
    },
    checkPassword() {
      this.errors.password = "";
      this.passwordError = [];
      if (this.signup.password) {
        this.password_rules.forEach((rule) => {
          if (!rule.regex.test(this.signup.password)) {
            this.passwordError.push(rule.message);
          }
        });
        if (this.signup.password.length && this.signup.cPassword.length) {
          // this.checkConfirmPassword();
          if (this.signup.password != this.signup.cPassword) {
            this.passwordError.push("Password miss match");
          }
        }
      } else {
        {
          this.errors.password = "Password is required";
        }
      }
    },
    checkConfirmPassword() {
      this.passwordError = [];
      // if (this.passwordError.length && this.signup.cPassword.length) {
      if (this.signup.password != this.signup.cPassword) {
        this.passwordError.push("Password miss match");
      } else {
        this.passwordError = [];
      }
    },
    submitForm(formName) {
      this.errors = {};
      this.checkPassword();
      if (
        !this.signup.cPassword.length &&
        this.signup.password != this.signup.cPassword
      ) {
        this.passwordError.push("Password miss match");
      }
      this.$refs[formName].validate((valid, errors) => {
        if (valid) {
          if (
            (this.errors && this.errors.password) ||
            this.passwordError.length
          ) {
            return false;
          } else if (!this.signup.terms_and_conditions) {
            {
              this.errors.terms_and_conditions = true;
              return false;
            }
          } else {
            // console.log("Validation Passed");
            this.signUp();
          }
        } else {
          console.log(errors);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    resetTermsAndPrivacy() {
      this.isTermsConditionsActive = false;
      this.terms_and_conditions_dialog = false;
    },
    displayTermsAndConditions() {
      this.isTermsConditionsActive = true;
      this.terms_and_conditions_dialog = true;
    },
    displayPrivacyPolicy() {
      this.terms_and_conditions_dialog = true;
    },
    async signUp() {
      try {
        this.submitLoading = true;
        let companyId = this.$route.query.company;
        console.log(this.userDetails);
        let wIndex = this.userDetails.user.workspace.findIndex(
          (w) => w.company_id.toString() == companyId.toString()
        );
        let cWorkspace = this.userDetails.user.workspace[wIndex];
        if (
          cWorkspace.status != "ACTIVE" ||
          cWorkspace.email_confirmed == false
        ) {
          let data = {
            _id: this.userDetails.user._id,
            company_id: this.userDetails.company._id,
            first_name: this.signup.first_name,
            last_name: this.signup.last_name,
            email: this.signup.email.toLowerCase(),
            password: this.signup.password,
            terms_and_conditions: this.signup.terms_and_conditions,
            phone: this.signup.phone,
            account_status: true,
          };
          await this.$store.dispatch("auth/inviteUserSignup", data);
          if (this.isSignupCompleted) {
            this.$notify.success({
              title: "Success",
              message: "Registered Successfully",
            });
            this.$router.push("/signin");
          }
        } else {
          this.$router.push("/signin");
          // this.$router.push("/verify?email=" + this.signup.email);
        }
        this.submitLoading = false;
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
      }
    },
    async getInviteUserDetails() {
      let params = {
        userId: this.$route.query.email,
        companyId: this.$route.query.company,
      };
      await this.$store.dispatch("auth/getInviteUser", params);
      if (this.getAddCompanyUser) {
        this.userDetails = this.getAddCompanyUser;
        this.signup = this.userDetails.user;
        this.signup.email = params.userId;
        this.signup.company_name = this.userDetails.company.name;
        this.signup.password = "";
        this.signup.cPassword = "";
        this.signup.terms_and_conditions = false;
      }
    },
  },
};
</script>
<style lang="scss">
#inviteUserPage {
  min-height: 100vh;
  .banner-image {
    padding: 0em 1em;
    position: relative;
    background-image: url(../../assets/img/banner-signup.jpg);
    background-size: cover;
    background-position: center;
    height: 100%;
    min-height: 100vh;
    .logo {
      img {
        width: 9em;
      }
    }
    .content {
      min-height: calc(100vh - 150px);
      max-width: 90%;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: 100px;
        right: -20px;
        background: url(../../assets/img/end-scroll.svg);
        background-size: 30px;
        height: 30px;
        width: 30px;
      }
    }
    .copyright {
      position: absolute;
      bottom: 1.5em;
      left: 0;
      right: 0;
    }
  }
  .signUp__Flow {
    padding: 0em 1em;
    .content {
      margin: 0 auto;
      min-height: calc(100vh - 300px);
      max-width: 400px;
      p {
        max-width: 90%;
      }
      .log-form {
        .el-input__inner {
          padding: 0 1.5em;
          line-height: 3.5em;
          height: auto;
          font-size: 1.15em;
          border-color: #8692a6;
          letter-spacing: 0.075em;
          &:hover,
          &:focus {
            border-color: #f754a2;
            background-color: #ffffff;
          }
        }
        .el-button {
          padding: 0 1.5em;
          line-height: 3.35em;
          height: auto;
          letter-spacing: 0.5px;
        }
        .password-switch {
          position: absolute;
          right: 0;
          top: 3.25em;
          color: #f754a2;
        }
        .bg-color {
          background-color: #f754a2 !important;
        }
      }
    }
    .error {
      color: red !important;
    }
  }
}
</style>