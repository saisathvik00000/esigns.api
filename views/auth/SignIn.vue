<template>
  <section id="signIn__Page">
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
              Don't you have an account ?
              <router-link to="/signup" class="text-dark fw-medium"
                >Sign up</router-link
              >
            </div>
            <div class="content mt-4">
              <div class="mt-4">
                <h1 class="fs-2 text-dark pb-2">Sign In</h1>
                <p class="text-muted opacity-80 fs-7">
                  Welcome back,<br />
                  Please enter your Credentials:
                </p>
                <hr />
                <el-form
                  :model="signin"
                  ref="signin"
                  class="log-form"
                  @keyup.enter.native="submitForm('signin')"
                >
                  <el-form-item label="Email address*" prop="email">
                    <el-input
                      v-model="signin.email"
                      placeholder="Ex: johnwesley@abc.com"
                      autocomplete="off"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.email">
                      {{ getErrors.email }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Password*" class="mb-1" prop="password">
                    <el-input
                      :type="passwordType"
                      placeholder="Enter Password"
                      v-model="signin.password"
                      autocomplete="off"
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
                  </el-form-item>
                  <el-form-item prop="type">
                    <!-- <el-col :span="11">
											<el-checkbox-group v-model="signin.remember_me">
												<el-checkbox
													label="RememberMe" type="checkbox" value="lsRememberMe"></el-checkbox>
											</el-checkbox-group>
										</el-col> -->
                    <el-col :span="11">
                      <el-button
                        type="text"
                        class=""
                        style="margin-left: 139%"
                        @click="goToForgotPassword"
                        >Forgot Password?</el-button
                      >
                    </el-col>
                  </el-form-item>
                  <!-- {{ getErrorCode }} -->
                  <el-form-item class="mt-1">
                    <p
                      class="error"
                      v-if="getErrors && getErrors.critical_error"
                    >
                      {{ getErrors.critical_error }}
                      <span v-if="getErrorCode === 'USER_NOT_FOUND'">
                        Please use a different account or
                        <router-link to="/signup" class="fw-medium"
                          >Sign up</router-link
                        >
                        for a new account.
                      </span>
                      <span v-if="getErrorCode === 'HOLD_WORKSPACE'">
                        <span class="fw-medium" @click="resendVerificationMail"
                          >Click here to send activation link</span
                        >
                      </span>
                      <!-- <span v-if="getErrorCode === 'INACTIVE_WORKSPACE'">
                        <router-link to="/signup" class="fw-medium"
                          >Click here to send email to
                          Administrative</router-link
                        >
                      </span> -->

                      <a v-if="isResent">
                        <span
                          class="resentColor"
                          @click="navigateToVerificaation()"
                          >Click here to Resent Verification ?</span
                        >
                      </a>
                    </p>
                    <el-button
                      type="danger"
                      class="type-2 w-100 fs-6"
                      @click="submitForm('signin')"
                      :loading="submitLoading"
                      >Sign in</el-button
                    >
                  </el-form-item>
                </el-form>
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
  name: "SignIn",
  data() {
    return {
      isResent: false,
      submitLoading: false,
      passwordType: "password",
      signin: {
        email: "",
        phone: "",
        password: "",
        remember_me: "",
      },
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
          {
            required: true,
            message: "Password is required",
            trigger: "blur",
          },
        ],
      },
      isExist: false,
      userWorkspaceList: [],
      currentWorkspace: {},
    };
  },
  mounted() {
    this.$store.dispatch("auth/reset");
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", [
      "getAuthenticationStatus",
      "getAccountNotVerified",
      "getAccountNotVerifiedEmail",
      "getWorkspaceList",
      "getAuthenticatedUser",
      "getUserType",
      "getErrorCode",
      "getErrorData",
      "getResendVerificationEmail",
    ]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    async resendVerificationMail() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/resendInviteEmailToUser", {
          email: this.signin.email.toLowerCase(),
          company: this.getErrorData,
        });

        if (this.getResendVerificationEmail) {
          this.$notify.success({
            title: "Success",
            message: "Verification mail sent to your email",
          });
          this.signin = {
            email: "",
            phone: "",
            password: "",
            remember_me: "",
          };
          this.$store.commit("errors/reset", null, { root: true });
          this.$store.commit("auth/setErrorCode", "", { root: true });
          this.$store.commit("auth/setErrorData", "", { root: true });
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$notify.error({
          title: "Error",
          message: "Error at sending verification mail",
        });
      }
    },
    goToEmployee() {
      this.$router.push({ path: "/employee/signin" });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signIn();
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async signIn() {
      try {
        this.submitLoading = true;
        let params = {
          email: this.signin.email.toLowerCase(),
          password: this.signin.password,
        };
        await this.$store.dispatch("auth/signin", params);
        if (this.getAccountNotVerified) {
          this.isResent = true;
        } else if (this.getAuthenticationStatus) {
          this.$store.commit("errors/reset", null, { root: true });
          this.$store.commit("auth/setErrorCode", "", { root: true });
          this.$store.commit("auth/setErrorData", "", { root: true });

          this.currentWorkspace = this.getAuthenticatedUser.current_workspace;
          await this.fetchUserData();
          if (
            this.currentWorkspace.plan_type != "INDIVIDUAL" &&
            this.currentWorkspace.user_type
          ) {
            await this.getCompanyUserType();
          }
          this.isResent = false;
          await this.$store.dispatch("auth/fetchProfile");
          this.$router.push({ path: "/documents" });
        }
        this.submitLoading = false;
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
      }
    },
    navigateToVerificaation() {
      this.$router.push("/send-verification?email=" + this.signin.email);
    },
    goToForgotPassword() {
      this.$router.push({ path: "/forgot-password" });
    },
    async fetchUserData() {
      this.loading = true;
      await this.$store.dispatch(
        "auth/fetchUsersWithEmail",
        this.getAuthenticatedUser.email
      );
      this.loading = false;
      if (this.getWorkspaceList) {
        this.userWorkspaceList = this.getWorkspaceList;
        let hasIndividual = this.getAuthenticatedUser.workspace.findIndex(
          (u) => u.plan_type == "INDIVIDUAL"
        );
        if (hasIndividual != -1) {
          let individualWorkspace = {};
          if (this.getAuthenticatedUser.workspace[hasIndividual].company_id) {
            this.$set(
              individualWorkspace,
              "_id",
              "" + this.getAuthenticatedUser.workspace[hasIndividual].company_id
            );
          } else {
            this.$set(individualWorkspace, "_id", "0");
          }
          this.$set(individualWorkspace, "name", "INDIVIDUAL");
          this.userWorkspaceList[hasIndividual]["company_id"] =
            individualWorkspace;
          if (this.currentWorkspace.plan_type == "INDIVIDUAL") {
            if (this.getAuthenticatedUser.workspace[hasIndividual].company_id) {
              this.currentWorkspace["company_id"] =
                "" +
                this.getAuthenticatedUser.workspace[hasIndividual].company_id;
            } else {
              this.currentWorkspace["company_id"] = "0";
            }
          }
        }
        this.$store.commit("auth/setActiveWorkspace", this.currentWorkspace, {
          root: true,
        });
        this.$store.commit("auth/setWorkspaceList", this.userWorkspaceList, {
          root: true,
        });
      } else {
        this.userWorkspaceList = [];
      }
    },
    async getCompanyUserType() {
      try {
        await this.$store.dispatch(
          "auth/getUserTypeById",
          this.currentWorkspace.user_type
        );
        if (this.getUserType) {
          console.log(this.getUserType);
        }
      } catch (err) {
        console.log(err);
        this.$notify.error({
          title: "Error",
          message: err,
        });
      }
    },
  },
};
</script>

<style lang="scss">
#signIn__Page {
  min-height: 100vh;
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
        .el-select {
          width: 100%;
        }
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
    .error {
      color: red !important;
      text-align: center;
    }
    .resentColor {
      color: black;
      cursor: pointer;
    }
  }
  .banner-image {
    padding: 0em 1em;
    position: relative;
    background-image: url(../../assets/img/sign-in.jpg);
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
}
</style>