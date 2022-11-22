<template>
  <section id="userRegistrationProfile__Page">
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
        <div class="create_profile__Flow">
          <div class="p-sm-5 p-3">
            <div class="nav-link d-flex justify-content-between fs-7">
              <router-link to="/create_profile" class="text-muted">
                <i class="el-icon-arrow-left"></i> Back
              </router-link>
              <div class="step-info">
                <span class="d-block text-muted opacity-40"> STEP 02/03 </span>
                <span class="d-block fw-bold text-muted fs-8 ls-1"
                  >Residency Info.</span
                >
              </div>
            </div>
            <div class="content mt-3">
              <div class="mt-4">
                <h1 class="fs-3 text-dark pb-2">Complete Your Profile!</h1>
                <p class="text-muted opacity-80 fs-7">
                  For the purpose of industry regulation, your details are
                  required.
                </p>
                <hr />
                <el-form
                  :model="create_profile"
                  ref="create_profile"
                  class="log-form"
                >
                  <el-form-item label="Phone number*" prop="age">
                    <el-input
                      placeholder="Enter Phone"
                      v-model="create_profile.phone"
                      class="input-with-select"
                      number="number"
                    >
                      <!-- <el-select
                        v-model="country_code"
                        slot="prepend"
                        placeholder="Select"
                      >
                        <el-option label="+91" value="+91"></el-option>
                        <el-option label="+0" value="0"></el-option>
                        <el-option label="+1" value="1"></el-option>
                      </el-select> -->
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Your address*" prop="age">
                    <el-input
                      v-model="create_profile.address"
                      placeholder="Ex: #34, John Son Street, 3rd division"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Country of residence" class="mb-1">
                    <el-select
                      v-model="create_profile.country"
                      placeholder="select country"
                    >
                      <el-option label="USA" value="usa"></el-option>
                      <el-option label="India" value="india"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item prop="type">
                    <el-checkbox-group v-model="create_profile.agreement">
                      <el-checkbox
                        label="I agree to term &amp; conditions"
                        name="type"
                      ></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item class="mt-1">
                    <el-button type="primary" class="type-2 w-100 fs-6"
                      >Save &amp; Continue</el-button
                    >
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
export default {
  name: "UserRegistrationProfile",
  data() {
    return {
      create_profile: {
        phone: "",
        address: "",
        country: "",
      },
    };
  },
};
</script>

<style lang="scss">
#userRegistrationProfile__Page {
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
  .create_profile__Flow {
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