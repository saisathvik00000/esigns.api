<template>
  <section id="updatePassword">
    <el-row type="flex">
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
                <p class="text-white fs-6 line-height-175">
                  Process bottlenecks are now a thing of the past with all
                  employees efficiently functioning with eSigns. HR and other
                  District departments benefit from time saved by replacing
                  manual data entry, filing, and mailing with eSigns.
                </p>
                <p
                  class="
                    fw-semi-medium
                    text-white
                    fs-6
                    d-flex
                    align-items-center
                  "
                >
                  <span class="pe-2">Pamela McLeo</span>
                  <img
                    src="@/assets/img/check-full-circe.svg"
                    alt="img-fluid"
                  />
                </p>
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
            <div class="nav-link d-flex justify-content-between fs-7">
              <router-link to="/join-us" class="text-muted">
                Cancel <i class="el-icon-close"></i>
              </router-link>
              <div class="step-info">
                <span class="d-block text-muted opacity-40"> STEP 01/03 </span>
                <span class="d-block fw-bold text-muted fs-8 ls-1"
                  >Reset Password.</span
                >
              </div>
            </div>
            <div class="content mt-5">
              <div class="mt-4">
                <h1 class="fs-3 text-dark pb-2">New password</h1>
                <p class="text-muted opacity-80 fs-7">
                  A strong password helps prevent unauthorized access to your
                  account.
                </p>
                <hr />
                <el-form
                  :model="updateNewPassword"
                  ref="updateNewPassword"
                  class="log-form"
                  @keyup.enter.native="submitForm('updateNewPassword')"
                >
                  <el-form-item label="Password*" class="mb-1" prop="password">
                    <el-input
                      type="password"
                      placeholder="Enter New Password"
                      v-model="updateNewPassword.password"
                      autocomplete="off"
                    ></el-input>
                    <el-button type="text" class="password-switch">
                      SHOW</el-button
                    >
                    <p class="error" v-if="getErrors && getErrors.password">
                      {{ getErrors.password }}
                    </p>
                    <p class="helper-text mt-1 text-muted">
                      <i class="el-icon-s-help"></i> 8-character minimum in
                      length; case sensitive
                    </p>
                  </el-form-item>

                  <el-form-item class="mt-4">
                    <el-button
                      type="success"
                      class="type-2 w-100 fs-6"
                      @click="submitForm('signup')"
                      :loading="submitLoading"
                      >Update Password</el-button
                    >
                    <p
                      class="error"
                      v-if="getErrors && getErrors.critical_error"
                    >
                      {{ getErrors.critical_error }}
                    </p>
                  </el-form-item>
                </el-form>
                <p class="mt-3 mt-lg-4">
                  Don't have an eSigns account ?
                  <a href="#" class="text-primary">Sign Up</a>
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
export default {
  name: "UpdateNewPassword",
  data() {
    return {
      submitLoading: false,
      updateNewPassword: {
        password: "",
      },
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
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", ["getAuthenticationStatus", "isSignupCompleted"]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
  },
  methods: {
    goToEmployee() {
      this.$router.push({ path: "/employee/signin" });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signUp();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async signUp() {
      try {
        this.submitLoading = true;

        await this.$store.dispatch("auth/signup", this.signup);

        if (this.isSignupCompleted) {
          this.$notify.success({
            title: "Success",
            message: "Registered Successfully",
          });

          this.$router.push("/verify");
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
#updatePassword {
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
      }
    }
  }
}
</style>