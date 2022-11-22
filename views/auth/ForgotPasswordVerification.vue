<template>
  <section id="resetPasswordVerification">
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
                <p class="text-white fs-6 line-height-175">
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
                >Sign In</router-link
              >
            </div>
            <!-- <div class="nav-link d-flex justify-content-between fs-7">
              <router-link to="/join-us" class="text-muted">
                Cancel <i class="el-icon-close"></i>
              </router-link>
              <div class="step-info">
                <span class="d-block text-muted opacity-40"> STEP 01/03 </span>
                <span class="d-block fw-bold text-muted fs-8 ls-1"
                  >Reset Password.</span
                >
              </div>
            </div> -->
            <div class="content mt-5">
              <div class="mt-4">
                <h1 class="fs-3 text-dark pb-2">
                  Forgot Password Verification
                </h1>
                <p class="text-muted opacity-80 fs-7">
                  Forgot your password ? No worries.. Just enter the email you
                  used to signup and we'll send you a link to reset it.
                </p>
                <hr />
                <el-form
                  :model="forgotPasswordData"
                  ref="forgotPassword"
                  class="log-form"
                  @keyup.enter.native="submitForm('forgotPassword')"
                  v-if="showForm"
                  autocomplete="off"
                >
                  <el-form-item label="Email *" class="mb-1">
                    <el-input
                      type="text"
                      placeholder="Enter Email"
                      v-model="forgotPasswordData.email"
                      autocomplete="off"
                    ></el-input>
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordVerifyErrors &&
                        getForgotPasswordVerifyErrors.email
                      "
                    >
                      {{ getForgotPasswordVerifyErrors.email }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Password *" class="mb-1" prop="password">
                    <el-input
                      :type="passwordType"
                      placeholder="Enter Password"
                      v-model="forgotPasswordData.password"
                      autocomplete="off"
                      @change="checkPassword"
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
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordVerifyErrors &&
                        getForgotPasswordVerifyErrors.password
                      "
                    >
                      {{ getForgotPasswordVerifyErrors.password }}
                    </p>
                  </el-form-item>
                  <span
                    class="error"
                    v-for="(err, index) in passwordError"
                    :key="index"
                  >
                    {{ err }}<br />
                  </span>
                  <el-form-item label="Verification Code *" class="mb-1">
                    <el-input
                      type="text"
                      placeholder="Enter Verification Code"
                      v-model="forgotPasswordData.verification_code"
                      autocomplete="off"
                    ></el-input>
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordVerifyErrors &&
                        getForgotPasswordVerifyErrors.verification_code
                      "
                    >
                      {{ getForgotPasswordVerifyErrors.verification_code }}
                    </p>
                  </el-form-item>
                  <el-form-item class="mt-4">
                    <el-button
                      type="danger"
                      class="type-2 w-100 fs-6"
                      @click="submitForm('forgotPassword')"
                      :loading="submitLoading"
                      >Reset Password</el-button
                    >
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordVerifyErrors &&
                        getForgotPasswordVerifyErrors.critical_error
                      "
                    >
                      {{ getForgotPasswordVerifyErrors.critical_error }}
                    </p>
                  </el-form-item>
                </el-form>
                <!-- <p class="mt-3 mt-lg-4">
                  Don't have an eSigns account ?
                  <a href="/signup" class="text-primary">Sign Up</a>
                </p> -->
              </div>
              <div class="error-view" v-if="errorView">
                <h3>
                  URL is not correct, please try again using
                  <a href="/forgot-password" class="text-primary"
                    >Forgot Password</a
                  >
                  or <a href="/signin" class="text-primary">Sign In</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ForgotPasswordVerification",
  data() {
    return {
      passwordType: "password",
      submitLoading: false,
      showForm: true,
      passwordError: [],
      errorView: false,
      forgotPasswordData: {
        email: "",
        verification_code: "",
        password: "",
      },
      password_rules: [
        { message: "One lowercase letter required.", regex: /[a-z]+/ },
        { message: "One uppercase letter required.", regex: /[A-Z]+/ },
        { message: "8 characters minimum.", regex: /.{6,}/ },
        { message: "One number required.", regex: /[0-9]+/ },
        { message: "One special character required", regex: /[!@#$%^&*]/ },
      ],
      rules: {
        password: [
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("auth/reset");
    this.forgotPasswordData.verification_code = this.$route.query.vc;
    this.forgotPasswordData.email = this.$route.query.email;
    // if(this.$route.query.code && this.$route.query.email) {
    //   this.showForm = true;
    //   this.errorView = false;
    // } else {
    //   this.errorView = true;
    //   this.showForm = false;
    // }
  },
  computed: {
    ...mapGetters("auth", [
      "getForgotPasswordVerifyStatus",
      "getForgotPasswordVerifyErrors",
    ]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    checkPassword() {
      this.passwordError = [];
      this.password_rules.forEach((rule) => {
        if (!rule.regex.test(this.forgotPasswordData.password)) {
          this.passwordError.push(rule.message);
        }
      });
    },
    goToEmployee() {
      this.$router.push({ path: "/employee/signin" });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.passwordError.length) {
            this.resetPassword();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async resetPassword() {
      try {
        this.submitLoading = true;
        this.forgotPasswordData.email =
          this.forgotPasswordData.email.toLowerCase();
        await this.$store.dispatch(
          "auth/forgotPasswordVerify",
          this.forgotPasswordData
        );

        if (this.getForgotPasswordVerifyStatus) {
          this.$notify.success({
            title: "Success",
            message: `Reset password successfully`,
          });

          this.$router.push({ path: "/signin" });
        }
        this.submitLoading = false;
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#resetPasswordVerification {
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
      p {
        max-width: 90%;
      }
    }
  }
  .error {
    color: red !important;
  }
}
</style>
<style lang="scss">
#resetPassword {
  .signUp__Flow {
    .content {
      max-width: 400px;
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
      }
    }
  }
}
</style>