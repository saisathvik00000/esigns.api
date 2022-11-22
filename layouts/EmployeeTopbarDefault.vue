<template>
  <section class="top-navbar">
    <div>
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <div class="top-navbar-left-menu">
            <ul>
              <li>
                <div class="company-logo">
                  <img
                    src="@/assets/img/logo-icon.png"
                    alt="Nimble logo"
                    class="img-fluid"
                  />
                </div>
              </li>
              <li>
                <div class="toggle-menu-animation">
                  <div
                    id="burger"
                    :class="isOpen ? 'active' : ''"
                    @click="sendMessageToParent"
                  >
                    <button type="button" class="burger-button" title="Menu">
                      <span class="hidden">Toggle menu</span>
                      <span class="burger-bar burger-bar--1"></span>
                      <span class="burger-bar burger-bar--2"></span>
                      <span class="burger-bar burger-bar--3"></span>
                    </button>
                  </div>
                </div>
                <!-- <router-link to="/emp">Dashboard</router-link> -->
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :md="20">
          <div class="top-navbar-right-menu">
            <ul class="logout-dropdown">
              <li>
                <div class="top-search">
                  <div class="form-group">
                    <el-input placeholder="Search">
                      <i
                        slot="prefix"
                        class="el-input__icon el-icon-search"
                      ></i>
                    </el-input>
                  </div>
                </div>
              </li>
              <li>
                <div class="alert-icon">
                  <img
                    src="@/assets/img/icons/alert.svg"
                    alt="icon"
                    class="img-fluid"
                  />
                  <div class="alert-count">
                    <p>2</p>
                  </div>
                </div>
              </li>
              <li>
                <a class="dropdown">
                  <div class="icon-block">
                    <div class="icon user-image">
                      <img
                        src="@/assets/img/users/user-1.png"
                        alt="user-image"
                        class="img-fluid"
                      />
                    </div>
                    <div class="icon-text">
                      {{ getUserName }}
                      <span class="el-icon-arrow-down"></span>
                    </div>
                  </div>
                </a>
                <ul class="sub-menu">
                  <li>
                    <router-link to="/profile">
                      <i class="el-icon-user"></i> Profile
                    </router-link>
                  </li>
                  <li>
                    <a @click="logout()">
                      <i class="el-icon-back"></i> Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TopbarDefault",
  computed: {
    getUserName() {
      return this.getAuthenticatedUser.email;
    },
    ...mapGetters("auth", ["getAuthenticatedUser"]),
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
  },
  data() {
    return {
      title: "",
      isOpen: "",
      isCollapse: "",
      routerValue: "",
      offCanvas: "",
      openProfile: false,
    };
  },
  mounted() {
    this.title = this.$route.meta.title || "Dashboard";
  },
  watch: {
    $route({ meta }) {
      this.title = meta.title || "Dashboard";
    },
  },
  methods: {
    logout() {
      this.resetStore();
      this.$router.push("/employee/signin");
    },
    // sendMessageToParent() {
    //   this.isOpen = !this.isOpen;
    //   this.isCollapse = !this.isCollapse;
    //   this.$store.commit("navigationOpen/setIsOpen", this.isOpen, {
    //     root: true,
    //   });
    //   // this.$emit('open:sidebar', this.isOpen)
    // },
    sendMessageToParent() {
      this.isOpen = !this.isOpen
      this.$emit('open:sidebar', this.isOpen)
    },
    resetStore() {
      this.$store.commit("auth/resetAuthData");
      this.$store.commit("profile/resetProfileData");
      this.$store.commit("company/resetCompanyData");
      this.$store.commit("auth/resetAuthData", null, { root: true });
      this.$store.commit("company/resetCompanyData", null, { root: true });
      this.$store.commit("companyDocuments/resetCompanyDocumentsData", null, {
        root: true,
      });
      this.$store.commit("documentGroups/resetDocumentGroupsData", null, {
        root: true,
      });
      this.$store.commit(
        "documentCategories/resetDocumentCategoriesData",
        null,
        {
          root: true,
        }
      );

      this.$store.commit("companyBenefits/resetCompanyBenefitsData", null, {
        root: true,
      });
      this.$store.commit("companyTemplates/resetCompanyTemplatesData", null, {
        root: true,
      });
      this.$store.commit("offerLetter/resetOfferLetterData", null, {
        root: true,
      });
      this.$store.commit("employee/resetEmployeesData", null, {
        root: true,
      });
      this.$store.commit("configurableDocuments/resetConfigurableDocuments");

      this.$store.commit("standardDocumentConfig/reset");
      this.$store.commit("employeeData/reset");
      this.$store.commit("employeeDocuments/reset");
      this.$store.commit("workflowData/reset");
      this.$store.commit("workflows/reset");
      this.$store.commit("templatesData/reset");
      this.$store.commit("i9formDocuments/reset");
      this.$store.commit("authorizedRepresentatives/reset");
      this.$store.commit("employeeDocumentAuthorizedUsers/reset");
    },
  },
};
</script>

<style lang="scss">
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
  padding: 5px 10px;
  .top-navbar-left-menu {
    ul {
      display: flex;
      align-items: center;
      li {
        &:not(:last-child) {
          margin-right: 25px;
        }
        .company-logo {
          img {
            width: 50px;
          }
        }
      }
    }
  }
  .top-navbar-right-menu {
    .logout-dropdown {
      float: right;
      position: relative;
      display: flex;
      align-items: center;
      > li {
        min-width: auto !important;

        &:nth-child(1) {
          margin-right: 75px;
        }
      }
      .alert-icon {
        position: relative;
        .alert-count {
          position: absolute;
          top: -10px;
          right: -4px;
          p {
            background: #1b487e;
            font-size: 0.8em;
            color: #fff;
            padding: 2px;
            width: 8px;
            height: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }
        }
        img {
          width: 22px;
          margin-top: 5px;
        }
      }
      .top-search {
        .el-input__inner {
          border-radius: 100px;
          background: rgba(236, 245, 255, 0.48);
          color: #212121;
          font-size: 0.8rem;
          line-height: 2;
          width: calc(100% - 22px);
          border-color: rgba(236, 245, 255, 0.9);
          height: 38px;
          &:focus {
            border-color: #1b487e;
          }
        }
      }
      .dropdown {
        font-size: 15px;
        padding-right: 0;
        &:hover {
          cursor: pointer;
        }
        .user-image {
          img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
            margin-bottom: -10px;
          }
        }
        .icon-block {
          display: flex;
          align-items: center;
        }

        .icon-text {
          font-size: 1.1em;
          font-weight: 500;
          letter-spacing: 0.2px;
          .dropdown-arrow {
            img {
              width: 10px;
            }
          }
        }

        .user-profile-image {
          img {
            width: 25px;
          }
        }
      }

      li {
        display: inline-block;
        margin: 0;
        padding: 0;
        position: relative;
        min-width: 20%;
      }

      .sub-menu {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 0;
        margin-top: -15px;
        border-bottom: 2px solid #380674;
        width: 200px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        a {
          font-size: 16px;
          text-align: left;
          padding: 3px 0 3px 15px;
          font-weight: 400;
          transition: all 0.2s ease-in-out;
          i {
            display: inline-block;
            margin-right: 5px;
            color: #380674;
            transition: all 0.2s ease-in-out;
          }

          &:hover {
            cursor: pointer;
          }
        }
        li {
          padding: 7px 0;
          transition: all 0.2s ease-in-out;
        }
        li {
          &:hover {
            background: #380674;
            a {
              color: #fff;
            }
            i {
              color: #fff;
            }
          }
        }
      }

      a {
        color: #444;
        display: block;
        padding: 0 25px;
        text-align: center;
        text-decoration: none;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        transition: all 0.25s ease;
      }
      li ul {
        right: 0;
        opacity: 0;
        position: absolute;
        top: 35px;
        visibility: hidden;
        z-index: 1;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -ms-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        transition: all 0.25s ease;
      }

      li:hover ul {
        opacity: 1;
        top: 50px;
        visibility: visible;
      }

      li ul li {
        width: 100%;
      }
    }
  }
  .toggle-menu-animation {
    .hidden {
      visibility: hidden;
    }

    /** burger **/

    button {
      cursor: pointer;
    }

    /* remove blue outline */
    button:focus {
      outline: 0;
    }

    .burger-button {
      position: relative;
      height: 30px;
      width: 40px;
      display: block;
      z-index: 60;
      border: 0;
      border-radius: 0;
      background-color: transparent;
      pointer-events: all;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .burger-bar {
      background-color: #380674;
      position: absolute;
      top: 50%;
      right: 6px;
      left: 6px;
      height: 2px;
      width: auto;
      margin-top: -1px;
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      opacity: 1;
    }

    .burger-bar--1 {
      -webkit-transform: translateY(-6px);
      transform: translateY(-8px);
    }

    .burger-bar--3 {
      transform: translateY(8px);
    }

    #burger.active .burger-button {
      transform: rotate(-180deg);
    }

    #burger.active .burger-bar--1 {
      transform: rotate(45deg);
    }

    #burger.active .burger-bar--2 {
      opacity: 0;
    }

    #burger.active .burger-bar--3 {
      transform: rotate(-45deg);
    }
  }
}
</style>
