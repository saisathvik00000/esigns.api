<template>
  <section id="Signup__Page">
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
        <div
          class="signUp__Flow"
          v-loading.fullscreen.lock="configureLoading"
          :element-loading-text="LoadingText"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div class="p-sm-5 p-3">
            <div class="nav-link fs-7 text-right">
              Already have an account?
              <router-link to="/signin" class="text-dark fw-medium"
                >Sign in</router-link
              >
            </div>
            <div class="content mt-3">
              <div class="mt-4">
                <h1 class="fs-3 text-dark pb-2">
                  {{ getRegisterationHeading }}
                </h1>
                <p class="text-muted opacity-80 fs-7">
                  For the purpose of industry regulation, your details are
                  required.
                </p>
                <hr />
                <!-- {{ emailRegistred }}
                {{ getEmailExist }} -->
                <el-form
                  :model="signup"
                  :rules="rules"
                  ref="signup"
                  class="log-form"
                  @keyup.enter.native="submitForm('signup')"
                >
                  <el-form-item label="Email Address" prop="email">
                    <el-input
                      v-model="signup.email"
                      placeholder="Ex: johnwesley@abc.com"
                      autocomplete="off"
                      @blur="checkEmailAlreadyReg"
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

                  <div class="d-flex">
                    <el-form-item
                      label="First Name"
                      prop="first_name"
                      class="mr-1"
                    >
                      <el-input
                        v-model="signup.first_name"
                        placeholder="Enter first name"
                        :readonly="isDisabled"
                      ></el-input>
                      <p class="error" v-if="getErrors && getErrors.first_name">
                        {{ getErrors.first_name }}
                      </p>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="last_name">
                      <el-input
                        v-model="signup.last_name"
                        placeholder="Enter last name"
                        :readonly="isDisabled"
                      ></el-input>
                      <p class="error" v-if="getErrors && getErrors.last_name">
                        {{ getErrors.last_name }}
                      </p>
                    </el-form-item>
                  </div>
                  <el-form-item label="Mobile" prop="phone">
                    <el-input
                      v-model="signup.phone"
                      placeholder="989 989 9899"
                      autocomplete="off"
                      :readonly="isDisabled"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.phone">
                      {{ getErrors.phone }}
                    </p>
                  </el-form-item>

                  <el-form-item label="Choose an Account Type" prop="type"
                    ><br />
                    <el-radio
                      v-model="signup.accountType"
                      label="INDIVIDUAL"
                    ></el-radio>
                    <el-radio
                      v-model="signup.accountType"
                      label="BUSINESS"
                    ></el-radio>
                  </el-form-item>
                  <el-form-item
                    v-if="signup.accountType == 'BUSINESS'"
                    label="Company Name"
                    prop="company_name"
                  >
                    <el-input
                      v-model="signup.company_name"
                      placeholder="Enter company name"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.company_name">
                      {{ getErrors.company_name }}
                    </p>
                    <p class="error" v-if="errors && errors.company_name">
                      {{ errors.company_name }}
                    </p>
                  </el-form-item>
                  <el-form-item
                    v-if="emailRegistred"
                    label="Password"
                    class="mb-1"
                    prop="password"
                  >
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
                    v-if="emailRegistred"
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
                      name="type"
                      v-model="signup.terms_and_conditions"
                      @change="handleTermsState"
                    >
                      I agree to eSigns
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="displayTermsAndConditions"
                        >Terms of Services
                      </el-link>
                      &
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="displayPrivacyPolicy"
                      >
                        Privacy Policy
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
                      >Register Account</el-button
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
  name: "SignUp",
  components: {
    termsAndConditionsTemplate,
    privacyAndPolicyTemplate,
  },
  data() {
    return {
      passwordError: [],
      submitLoading: false,
      passwordType: "password",
      cpasswordType: "password",
      isPrivacyPolicyActive: false,
      terms_and_conditions_dialog: false,
      isTermsConditionsActive: false,
      configureLoading: false,
      LoadingText: "Loading...",
      isDisabled: false,
      companyPattern:
        /^(?!.*[.&!@#()+-/_*]{2})([a-zA-Z0-9.,&!@#()+-/_*]+[^\s])*[a-zA-Z0-9.,&!@#()+-/_*]+$/,

      // /^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/
      // signup: {
      //   first_name: "",
      //   last_name: "",
      //   company_name: "",
      //   email: "",
      //   password: "",
      //   terms_and_conditions: "",
      //   phone: "",
      //   cPassword: "",
      //   accountType: false,
      // },

      //   { message: "One lowercase letter required.", regex: /[a-z]+/ },
      //   { message: "One uppercase letter required.", regex: /[A-Z]+/ },
      //   { message: "8 characters minimum.", regex: /.{6,}/ },
      //   { message: "One number required.", regex: /[0-9]+/ },
      //   { message: "One special character required", regex: /[!@#$%^&*]/ },
      // ],
      // rules: {
      //   email: [
      //     {
      //       required: true,
      //       message: "Email is required",
      //       trigger: "blur",
      //     },
      //     {
      //       type: "email",
      //       message: "Invalid Email",
      //       trigger: "blur",
      //     },
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       message: "Password is required",
      //       trigger: "blur",
      //     },
      //   ],
      //   phone: [
      //     {
      //       required: true,
      //       message: "Phone is required",
      //       trigger: "blur",
      //     },
      //   ],
      //   first_name: [
      //     {
      //       required: true,
      //       message: "First name is required",
      //       trigger: "blur",
      //     },
      //   ],
      //   last_name: [
      //     {
      //       required: true,
      //       message: "Last name is required",
      //       trigger: "blur",
      //     },
      //   ],
      //   company_name: [
      //     {
      //       required: true,
      //       message: "Company name is required",
      //       trigger: "blur",
      //     },
      //   ],
      //   /*type:[
      //     {
      //       required: true,
      //       message: "Choose account type",
      //       trigger: "blur",
      //     },
      //   ],*/
      //   terms_and_conditions: [
      //     {
      //       required: true,
      //       message: "Terms & conditions are need to be accept",
      //       trigger: "blur",
      //     },
      //   ],
      //   // cPassword: [
      //   //   {
      //   //     required: true,
      //   //     message: "Confirm Password is required",
      //   //     trigger: "blur",
      //   //   },
      //   // ],
      // },
      emailRegistred: true,

      signup: {
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        password: "",
        // terms_and_conditions: false,
        phone: "",
        cPassword: "",
        accountType: "INDIVIDUAL",
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
    this.$store.dispatch("auth/reset");
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", [
      "getAuthenticationStatus",
      "isSignupCompleted",
      "getAccountNotVerified",
      "getAccountNotVerifiedEmail",
      "getEmailExist",
      "getCompanyInfo",
    ]),
    termsError() {
      return !this.signup.terms_and_conditions;
    },
    getRegisterationHeading() {
      console.log("cons", this.$route.query);
      let heading = "";
      if (
        this.$route &&
        this.$route.query &&
        this.$route.query.type == "free-trial"
      ) {
        heading = "Sign up for a free trial!";
      } else if (
        this.$route &&
        this.$route.query &&
        this.$route.query.type == "request-demo"
      ) {
        heading = "Request for a demo";
      } else {
        heading = "Register eSigns Account!";
      }
      return heading;
    },
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    // checkPassword() {
    //   this.passwordError = [];
    //   this.password_rules.forEach((rule) => {
    //     if (!rule.regex.test(this.signup.password)) {
    //       this.passwordError.push(rule.message);
    //     }
    //   });
    //   if (!this.passwordError.length && this.signup.cPassword.length) {
    //     if (
    //       this.signup.password != this.signup.cPassword &&
    //       this.passwordError.length != -1
    //     ) {
    //       this.passwordError.push("Password missmatch");
    //     } else if (this.passwordError.length != -1) {
    //       console.log(this.passwordError);
    //     } else {
    //       this.passwordError = [];
    //     }
    //   }
    // },
    // checkConfirmPassword() {
    //   this.passwordError = [];
    //   this.password_rules.forEach((rule) => {
    //     if (!rule.regex.test(this.signup.cPassword)) {
    //       this.passwordError.push(rule.message);
    //     }
    //   });
    //   // if (this.passwordError.length && this.signup.cPassword.length) {
    //   if (this.signup.password != this.signup.cPassword) {
    //     this.passwordError.push("Password missmatch");
    //   } else if (this.passwordError.length != -1) {
    //     console.log(this.passwordError);
    //   } else {
    //     this.passwordError = [];
    //   }
    // },
    goToEmployee() {
      this.$router.push({ path: "/employee/signin" });
    },
    submitForm(formName) {
      this.errors = {};

      if (this.emailRegistred) {
        this.checkPassword();
        if (
          !this.signup.cPassword.length &&
          this.signup.password != this.signup.cPassword
        ) {
          this.passwordError.push("Password miss match");
        }
      }
      this.$refs[formName].validate((valid, errors) => {
        if (valid) {
          if (this.passwordError.length) {
            return false;
          } else if (
            this.emailRegistred &&
            this.errors &&
            this.errors.password
          ) {
            return false;
          }
          // else if (this.signup.accountType === "BUSINESS") {
          //   console.log(this.signup.company_name.trim());
          //   if (this.companyPattern.test(this.signup.company_name)) {
          //     this.errors.company_name = "Invalid Company Name";
          //     return false;
          //   }
          //   // /^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/
          // }
          else if (!this.signup.terms_and_conditions) {
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       if (!this.passwordError.length) {
    //         this.signUp();
    //       }
    //     } else {
    //       return false;
    //     }
    //   });
    // },
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
        if (!this.signup.terms_and_conditions) {
          this.$message.error("Please accept terms and conditions of eSigns.!");
        } else {
          this.submitLoading = true;
          let data = {
            first_name: this.signup.first_name,
            last_name: this.signup.last_name,
            email: this.signup.email.toLowerCase(),
            password: this.signup.password,
            terms_and_conditions: this.signup.terms_and_conditions,
            phone: this.signup.phone,
            cPassword: this.signup.cPassword,
            plan_type: this.signup.accountType,
          };
          if (!this.emailRegistred) {
            delete data.password;
            delete data.cPassword;
          }
          if (this.signup.accountType == "BUSINESS") {
            data["company"] = this.signup.company_name.trim();
          }
          await this.$store.dispatch("auth/companySignup", data);
          if (this.getAccountNotVerified) {
            this.$router.push("/send-verification?email=" + this.signup.email);
          } else if (this.isSignupCompleted) {
            let companyDetails = this.getCompanyInfo.data;
            if (this.getCompanyInfo.message == "COMPANY_ON_HOLD") {
              this.$notify.success({
                title: "Success",
                message:
                  "Company Name is already registered with the user and need verification",
              });
              this.$router.push(
                `/verify?email=${data.email}&company=${companyDetails._id}`
              );
            } else if (this.getCompanyInfo.message == "COMPANY_ACTIVE") {
              this.$notify.success({
                title: "Success",
                message: "Company Name is already registered with the user",
              });
              this.$router.push("/signin");
            } else {
              this.$notify.success({
                title: "Success",
                message: "Registered Successfully",
              });
              if (companyDetails && companyDetails._id) {
                this.$router.push(
                  `/verify?email=${data.email}&company=${companyDetails._id}`
                );
              }
              if (!companyDetails) {
                this.$router.push(`/verify?email=${data.email}`);
              }
            }
          }
          this.submitLoading = false;
        }
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
      }
    },
    async checkEmailAlreadyReg() {
      if (this.signup.email) {
        this.configureLoading = true;
        this.LoadingText = "We are checking the email.... Please wait .....";
        try {
          await this.$store.dispatch("auth/checkUserExist", this.signup.email);
          if (this.getEmailExist) {
            if (
              this.getEmailExist.status_code === 200 ||
              this.getEmailExist.statusCode === 200
            ) {
              setTimeout(() => {
                this.LoadingText =
                  "Account already exist with this email. Please continue with existing account Password ";
              }, 2000);

              this.signup.first_name = this.getEmailExist.message.first_name;
              this.signup.last_name = this.getEmailExist.message.last_name;
              this.signup.phone = this.getEmailExist.message.phone;
              this.signup.cPassword = "";
              this.signup.password = "";
              this.emailRegistred = false;
              this.isDisabled = true;

              this.$refs["signup"].validate((valid, errors) => {
                if (valid) {
                  console.log(valid);
                } else {
                  console.log(errors);
                }
              });
              this.$store.commit("errors/setErrors", null, { root: true });
              this.passwordError = [];
              setTimeout(() => {
                this.configureLoading = false;
              }, 5000);
            } else {
              this.emailRegistred = true;

              setTimeout(() => {
                this.configureLoading = false;
                this.LoadingText = "Loading ....";
              }, 3000);
              this.signup.first_name = "";
              this.signup.last_name = "";
              this.signup.phone = "";
              this.isDisabled = false;
            }
          }
        } catch (err) {
          this.submitLoading = false;
          this.configureLoading = false;
          this.LoadingText = "Loading ....";
          console.log(err);
        }
      }
    },

    handleTermsState() {
      this.errors.terms_and_conditions = this.signup.terms_and_conditions
        ? false
        : true;
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
    // checkCompanyName() {
    //   // this.signup.company_name = this.signup.company_name.trim();
    //   if (!this.companyPattern.test(this.signup.company_name)) {
    //     this.errors.company_name = "Invalid Company Name";
    //   } else {
    //     this.errors.company_name = "";
    //   }
    // },
  },
};
</script>
 
<style lang="scss" scoped>
#joinUs__Page {
  .signUp__Flow {
    .content {
      margin: 0 auto;
      min-height: calc(100vh - 300px);
      p {
        max-width: 90%;
      }
    }
  }
}
</style>
<style lang="scss">
#Signup__Page {
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
      max-width: 400px;
      margin: 0 auto;
      min-height: calc(100vh - 300px);
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
  }
  .error {
    color: red !important;
  }
}
</style>