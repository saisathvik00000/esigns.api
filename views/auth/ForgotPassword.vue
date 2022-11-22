<template>
  <section id="resetPassword">
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
                <h1 class="fs-3 text-dark pb-2">Forgot Password</h1>
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
                >
                  <el-form-item label="Email Id*" class="mb-1" prop="email">
                    <el-input
                      type="email"
                      placeholder="Enter email"
                      v-model="forgotPasswordData.email"
                      autocomplete="off"
                    ></el-input>
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordErrors && getForgotPasswordErrors.email
                      "
                    >
                      {{ getForgotPasswordErrors.email }}
                    </p>
                  </el-form-item>

                  <el-form-item class="mt-4">
                    <el-button
                      type="danger"
                      class="type-2 w-100 fs-6"
                      @click="submitForm('forgotPassword')"
                      :loading="submitLoading"
                      >Send password reset email</el-button
                    >
                    <p
                      class="error"
                      v-if="
                        getForgotPasswordErrors &&
                        getForgotPasswordErrors.critical_error
                      "
                    >
                      {{ getForgotPasswordErrors.critical_error }}
                    </p>
                  </el-form-item>
                </el-form>
                <p class="mt-3 mt-lg-4">
                  Don't have an eSigns account ?
                  <a href="/signup" class="text-primary">Sign Up</a>
                </p>
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
// import config from "../../config/app";
export default {
  name: "ForgotPassword",
  data() {
    return {
      submitLoading: false,
      forgotPasswordData: {
        email: "",
        company: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("auth/reset");
  },
  computed: {
    ...mapGetters("auth", [
      "getForgotPasswordStatus",
      "getForgotPasswordErrors",
    ]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    goToEmployee() {
      this.$router.push({ path: "/employee/forgotPasswordData" });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.forgotPassword();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async forgotPassword() {
      try {
        this.submitLoading = true;

        await this.$store.dispatch(
          "auth/forgotPassword",
          this.forgotPasswordData
        );

        if (this.getForgotPasswordStatus) {
          this.$notify.success({
            title: "Success",
            message: `Reset password verification mail send successfully to the ${this.forgotPasswordData.email}`,
          });

          this.$router.push({ name: "ForgotPasswordVerification" });
        }
        this.submitLoading = false;
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
      }
    },
  },
  beforeDestroy() {
    // const vuex = JSON.parse(
    //   localStorage.getItem(config.APP_NAME + "_" + config.APP_VERSION)
    // );
    // if (vuex) {
    //   localStorage.removeItem(vuex);
    // }
    // localStorage.removeItem(config.APP_NAME + "_" + config.APP_VERSION);
  },
};
</script>

<style lang="scss" scoped>
#resetPassword {
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
  .el-select {
    width: 100%;
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