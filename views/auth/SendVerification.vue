<template>
  <section id="sendVerification">
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
              <img src="@/assets/img/logo.svg" alt="Sign Up Banner" />
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
        <div class="verify_email__Flow">
          <div class="p-sm-5 p-3">
            <div class="nav-link d-flex justify-content-between fs-7">
              <router-link to="/signup" class="text-muted">
                <i class="el-icon-arrow-left"></i> Back
              </router-link>
            </div>
            <div class="content mt-3">
              <div class="mt-5">
                <h1 class="fs-3 text-dark pb-2">Account Not Verified!</h1>
                <p class="text-muted opacity-80 fs-7">
                  Your Account with <b>{{ email }}</b> not active. Please send
                  verify your email and activate your account.
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
                      v-model="email"
                      placeholder="Enter Email Address"
                      readonly
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="Select Workspace*"
                    prop="workspace"
                    v-if="isExist"
                  >
                    <el-col :span="24">
                      <el-select
                        v-model="verify_email.company"
                        placeholder="Workspace"
                      >
                        <el-option
                          v-for="(company, index) of userWorkspaceList"
                          :key="index"
                          :label="company.company_id.name"
                          :value="company.company_id._id"
                        >
                        </el-option>
                      </el-select>
                      <p class="error" v-if="getErrors && getErrors.company">
                        {{ getErrors.company }}
                      </p>
                    </el-col>
                  </el-form-item>

                  <el-form-item class="mt-5">
                    <el-button
                      type="primary"
                      class="type-2 w-100 fs-6 bg-color"
                      @click="submitForm('verify_email')"
                      :loading="submitLoading"
                      >Send Verfication</el-button
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
  name: "SendVerification",
  data() {
    return {
      submitLoading: false,
      email: "",
      verify_email: {
        email: "",
        verification_code: "",
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
      isExist: false,
      userWorkspaceList: [],
    };
  },

  mounted() {
    this.$store.dispatch("auth/reset");
    this.email = this.getAccountNotVerifiedEmail;
    this.email = this.$route.query.email;
  },
  computed: {
    ...mapGetters("errors", ["getErrors"]),
    ...mapGetters("auth", [
      "getVerificationStatus",
      "getResendVerificationEmail",
      "getAccountNotVerifiedEmail",
      "getWorkspaceList",
    ]),
  },
  created() {
    this.$store.commit("errors/setErrors", null, { root: true });
    this.email = this.getAccountNotVerifiedEmail;
    this.email = this.$route.query.email;
    if (this.email) {
      this.getUsers();
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resendVerifcation();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async resendVerifcation() {
      try {
        this.submitLoading = true;

        await this.$store.dispatch("auth/resendVerificationEmailToUser", {
          email: this.email,
          company: this.verify_email.company,
        });

        if (this.getResendVerificationEmail) {
          this.$notify.success({
            title: "Success",
            message: "Verification mail sent to your email",
          });
          this.$router.push("/verify?email=" + this.email);
        }
        this.submitLoading = false;
      } catch (err) {
        this.submitLoading = false;
        console.log(err);
        this.$notify.error({
          title: "Error",
          message: "Error at sending verification mail",
        });
      }
    },
    getUsers() {
      this.isExist = false;
      if (this.email) {
        this.fetchUserData();
      } else {
        this.verify_email.company = "";
        this.userWorkspaceList = [];
      }
    },
    async fetchUserData() {
      let userList = [];
      this.userWorkspaceList = [];
      this.loading = true;
      await this.$store.dispatch("auth/fetchUsersWithEmail", this.email);
      this.loading = false;
      if (this.getWorkspaceList) {
        userList = this.getWorkspaceList;
        for (let i = 0; i < userList.length; i++) {
          let element = userList[i];
          if (element.status != "ACTIVE") {
            if (element.plan_type == "INDIVIDUAL") {
              let individualWorkspace = {
                _id: "0",
                name: "INDIVIDUAL",
                status: "ACTIVE",
              };
              this.$set(element, "company_id", individualWorkspace);
            }
            if (
              element.company_id.status === "ACTIVE" ||
              element.company_id.status === "INITIATE"
            ) {
              this.userWorkspaceList.push(element);
            }
          }
        }
        if (this.userWorkspaceList) {
          if (this.userWorkspaceList.length === 1) {
            this.verify_email.company =
              this.userWorkspaceList[0].company_id._id;
          } else {
            this.verify_email.company = "";
          }
          if (this.userWorkspaceList.length > 1) {
            this.isExist = true;
          }
        }
      } else {
        this.userWorkspaceList = [];
        this.verify_email.company = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#sendVerification {
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
  .bg-color {
    background-color: #f754a2 !important;
  }
  .el-select {
    width: 100%;
  }
}
</style>