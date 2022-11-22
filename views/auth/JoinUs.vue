<template>
  <section id="joinUs__Page">
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
            <div class="nav-link fs-7 text-right">
              Already have an account?
              <router-link to="/signin" class="text-dark fw-medium"
                >Sign In</router-link
              >
            </div>
            <div class="content mt-5">
              <div class="mt-4">
                <h1 class="fs-2 text-dark pb-2">Join Us</h1>
                <p class="text-muted opacity-80 fs-6">
                  To begin this journey, tell us what type of account you’d be
                  opening.
                </p>
                <div class="mt-5">
                  <el-button class="selection-btn text-left active">
                    <span class="text-center">
                      <img
                        src="@/assets/img/individual-filled.svg"
                        alt="icon"
                        width="50"
                      />
                    </span>
                    <span class="text">
                      <div class="fw-semi-medium fs-7 text-dark">
                        Individual
                      </div>
                      <div class="text-muted pt-1 opacity-6">
                        Personal account to manage all you documents.
                      </div>
                    </span>
                    <div class="right-icon">
                      <i class="el-icon-right"></i>
                    </div>
                  </el-button>
                </div>
                <div class="mt-4">
                  <el-button class="selection-btn text-left">
                    <span>
                      <img
                        src="@/assets/img/individual-filled.svg"
                        alt="icon"
                        width="50"
                      />
                    </span>
                    <span class="text">
                      <div class="fw-semi-medium fs-7 text-dark">Business</div>
                      <div class="text-muted pt-1 opacity-6">
                        Own or belong to a company, this is for you.
                      </div>
                    </span>
                    <div class="right-icon">
                      <i class="el-icon-right"></i>
                    </div>
                  </el-button>
                </div>
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
  name: "JoinUs",
};
</script>
<style lang="scss" scoped>
#joinUs__Page {
  min-height: 100vh;
  .banner-image {
    padding: 0em 1em;
    position: relative;
    background-image: url(../../assets/img/banner-signup.jpg);
    background-size: cover;
    background-position: center;
    height: 100vh;
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
      max-width: 450px;
      margin: 0 auto;
      display: flex;
      min-height: calc(100vh - 300px);
      p {
        max-width: 90%;
      }
      .selection-btn {
        padding: 1.75em 1.5em;
        border-color: #ffffff;
        display: block;
        width: 100%;
        &.active:hover,
        &:focus,
        &.active {
          border-color: #f754a2;
          background-color: #fffcfc;
        }
        &:hover {
          border-color: #eeeeee;
          background-color: #fffcfc;
        }
        & > span {
          display: grid;
          width: 100%;
          align-items: center;
          justify-items: space-between;
          gap: 1em;
          grid-template-columns: 60px 1fr 40px;
        }
        .right-icon {
          width: 40px;
          text-align: center;
          font-size: 1.5em;
        }
      }
    }
  }
}
</style>