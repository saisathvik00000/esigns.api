<template>
  <section id="userVerify__Page">
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
        <div class="verify_email__Flow">
          <div class="p-sm-5 p-3">
            <div class="nav-link d-flex justify-content-between fs-7">
              <router-link to="/signup" class="text-muted">
                <i class="el-icon-arrow-left"></i> Back
              </router-link>
              <!-- <div class="step-info">
                <span class="d-block text-muted opacity-40"> STEP 03/03 </span>
                <span class="d-block fw-bold text-muted fs-8 ls-1"
                  >Residency Info.</span
                >
              </div> -->
            </div>
            <div class="content mt-3" v-loading="resendSubmitLoading">
              <div class="mt-5">
                <h1 class="fs-3 text-dark pb-2">Email Verification!</h1>
                <p class="text-muted opacity-80 fs-7">
                  A Verification mail has been sent to your email account.
                  Please check your inbox to verify.
                </p>
                <hr />
                <el-form
                  :model="verify_email"
                  ref="verify_email"
                  class="log-form"
                  @keyup.enter.prevent="submitForm('verify_email')"
                >
                  <el-form-item label="Email Address">
                    <el-input
                      v-model="verify_email.email"
                      readonly
                      placeholder="Enter Email Address"
                    ></el-input>
                    <p class="error" v-if="getErrors && getErrors.email">
                      {{ getErrors.email }}
                    </p>
                  </el-form-item>
                  <el-form-item label="Verification Code (OTP)">
                    <!-- :readonly="$route.query.vc?true:false" -->
                    <el-input
                      v-model="verify_email.verification_code"
                      placeholder="Enter Verification Code"
                    ></el-input>
                    <p
                      class="error"
                      v-if="getErrors && getErrors.verification_code"
                    >
                      {{ getErrors.verification_code }}
                    </p>
                  </el-form-item>
                  <el-form-item class="mt-5">
                    <el-button
                      type="primary"
                      class="type-2 w-100 fs-6"
                      @click="submitForm('verify_email')"
                      :loading="submitLoading"
                      :disabled="!verify_email.verification_code.length"
                      >Verify</el-button
                    >
                    <p
                      class="error"
                      v-if="getErrors && getErrors.critical_error"
                    >
                      {{ getErrors.critical_error }}
                    </p>
                  </el-form-item>
                  <p class="mb-0 text-muted fs-8 text-center">
                    <i class="el-icon-lock"></i>
                    Your Info is safely secured
                  </p>
                  <p class="mb-0 text-muted fs-8 text-center">
                    <el-button @click="resendVerificationMail()" type="text">
                      <i class="el-icon-s-promotion"></i>
                      Resend Verification
                    </el-button>
                  </p>
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
  name: "UserVerify",
  data() {
    return {
      submitLoading: false,
      resendSubmitLoading: false,
      verify_email: {
        email: "",
        verification_code: "",
        company_id: "",
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
        verification_code: [
          {
            required: true,
            message: "Verification Code is required",
            trigger: "blur",
          },
        ],
      },
    };
  },

  mounted() {
    this.$store.dispatch("auth/reset");
    this.verify_email.email = this.$route.query.email;
    console.log(this.$route.query);
    if (this.$route.query.company) {
      this.verify_email.company_id = this.$route.query.company;
    }
    if (this.$route.query.vc) {
      this.verify_email.verification_code = this.$route.query.vc;
    }
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", [
      "getVerificationStatus",
      "getResendVerificationEmail",
    ]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
    this.verify_email.email = this.$route.query.email;
    if (this.$route.query.company) {
      this.verify_email.company_id = this.$route.query.company;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.verify();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async resendVerificationMail() {
      try {
        this.resendSubmitLoading = true;
        let email = this.verify_email.email.toLowerCase();

        if (this.$route.query.vc) {
          await this.$store.dispatch("auth/resendInviteEmailToUser", {
            email: email,
            company: this.verify_email.company_id,
          });
        } else {
          await this.$store.dispatch("auth/resendVerificationEmailToUser", {
            email: email,
            company: this.verify_email.company_id,
          });
        }

        if (this.getResendVerificationEmail) {
          this.$notify.success({
            title: "Success",
            message: "Verification mail sent to your email",
          });
        }
        this.resendSubmitLoading = false;
      } catch (err) {
        this.resendSubmitLoading = false;
        console.log(err);
        this.$notify.error({
          title: "Error",
          message: "Error at sending verification mail",
        });
      }
    },
    async verify() {
      try {
        this.submitLoading = true;
        let data = {
          email: this.verify_email.email.toLowerCase(),
          verification_code: this.verify_email.verification_code,
        };
        await this.$store.dispatch("auth/verifyAccount", data);

        if (this.getVerificationStatus) {
          this.$notify.success({
            title: "Success",
            message: "Verified successfully",
          });
          this.$router.push("/signin");
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
#userVerify__Page {
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
      max-width: 200px;
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
  .verify_email__Flow {
    padding: 0em 1em;
    .content {
      max-width: 400px;
      margin: 0 auto;
      min-height: calc(100vh - 300px);
      p {
        max-width: 90%;
      }
      .log-form {
        // .el-input-group__prepend {
        //   padding: 0;
        //   line-height: 3.5em;
        //   width: 50px;
        //   box-shadow: none;
        //   background: transparent !important;
        // }
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