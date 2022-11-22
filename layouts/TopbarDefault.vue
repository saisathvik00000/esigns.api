<template>
  <section class="top-navbar">
    <div>
      <el-row type="flex" align="middle">
        <el-col :span="4">
          <div class="top-navbar-left-menu">
            <ul>
              <li v-if="!getIsMobile">
                <div class="company-logo">
                  <a href="/dashboard">
                    <img
                      src="@/assets/img/logo-white.svg"
                      alt="Nimble logo"
                      class="img-fluid"
                    />
                  </a>
                </div>
              </li>
              <li>
                <div class="toggle-menu-animation">
                  <div
                    id="burger"
                    :class="getIsOpen ? 'active' : ''"
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
              </li>
            </ul>
          </div>

          <div class="company-logo" v-if="getIsMobile">
            <a href="/dashboard">
              <img
                src="@/assets/img/logo-white.svg"
                alt="Nimble logo"
                class="img-fluid"
              />
            </a>
          </div>
        </el-col>
        <el-col :md="20">
          <div class="top-navbar-right-menu">
            <ul class="logout-dropdown">
              <li>
                <div class="workspace-wrapper" v-loading="loading">
                  <el-col v-if="!isExist">
                    <el-select
                      v-loading="selectLoad"
                      v-model="currentWorkspaceId"
                      placeholder="Workspace"
                      @change="ChangeAccount"
                    >
                      <el-option
                        v-for="(company, index) of userWorkspaceList"
                        :key="index"
                        :label="company.company_id.name"
                        :value="company.company_id._id"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </li>
              <li  v-if="isWorkspaceIsBusiness(this.getActiveWorkspace)">
                <div class="workspace-wrapper" v-loading="loading">
                  <el-col v-if="!isExist" >
                    <el-select v-model="activeRole" placeholder="Role" @change="changeRole">
                      <el-option
                        v-for="item in assignedRoles"
                        :key="item.userType_id"
                        :label="item.role_title"
                        :value="item.userType_id">
                        <span style="float: left">{{ item.role_title }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userType_name }}</span>
                      </el-option>
                    </el-select>
                  </el-col>
                </div>
              </li>
              <li>
                <div class="notification-wrapper" @click="toggleChatPopup">
                  <div
                    class="number-on-bell chat"
                    v-if="getChatCountUnOpened > 0"
                  >
                    {{ getChatCountUnOpened }}
                  </div>
                  <div class="icon-block">
                    <div class="icon user-image">
                      <img
                        src="@/assets/img/Chats.svg"
                        alt="chat-image"
                        class="img-fluid chat"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="notification-popup"
                  v-if="isChatPopupShow && getChats && getChats.length"
                  v-click-outside="hideChatPopup"
                >
                  <ul
                    class="list-group list-group-flush"
                    v-if="getChats && getChats.length"
                  >
                    <li class="notifications-top-row">
                      <span> Chats({{ getChatsUnReadCnt }}) </span>
                      <a v-if="getChatsUnReadCnt && getChatsUnReadCnt > 0" @click="markAsReadChats"> Mark all as read </a>
                    </li>
                    <li
                      class="list-group-item notifcation-item"
                      v-for="(item, index) in getChats"
                      :key="index"
                      @click="goToChats(item._id, true)"
                    >
                      <div class="item-avatar">
                        {{ item | getUserNameAvatar }}
                        <div class="unread" v-if="!item.is_read"></div>
                      </div>
                      <div class="item-body">
                        <p class="mb-0 text-secondary">
                          <span class="name">
                            {{ item | getUserFullName }}
                          </span>
                          <span class="commented-on"> commented on </span>
                          <span class="doc-name">
                            {{ item.title }}
                          </span>
                          {{ item.text | truncate(20, "...") }}
                        </p>
                        <span
                          class="date-time text-dark fw-medium pl-0 opacity-80"
                          >{{
                            item.created_at | getFormattedDateTypeThree
                          }}</span
                        >
                      </div>
                    </li>
                  </ul>
                  <div class="notifications-bottom-row">
                    <a @click="viewAllChats"> View all messages </a>
                  </div>
                  <!-- </el-scrollbar> -->
                </div>
              </li>
              <li>
                <div
                  class="notification-wrapper"
                  @click="toggleNotificationPopup"
                >
                  <div
                    class="number-on-bell"
                    v-if="getNotificationCountUnOpened > 0"
                  >
                    {{ getNotificationCountUnOpened }}
                  </div>
                  <div class="icon-block">
                    <div class="icon user-image">
                      <img
                        src="@/assets/img/Notifications.svg"
                        alt="notification-image"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="notification-popup"
                  v-if="
                    isNotificationPopupShow &&
                    getNotifications &&
                    getNotifications.length
                  "
                  v-click-outside="hideNotificationPopup"
                >
                  <!-- <div class="arrow">
									</div> -->
                  <!-- <el-scrollbar wrap-style="max-height: 350px;"> -->
                  <ul
                    class="list-group list-group-flush"
                    v-if="getNotifications && getNotifications.length"
                  >
                    <li class="notifications-top-row">
                      <span>
                        Notifications({{ getNotificationsUnReadCnt }})
                      </span>
                      <a @click="markAsReadActivities"> Mark all as read </a>
                    </li>
                    <li
                      class="list-group-item notifcation-item"
                      v-for="(item, index) in getNotifications"
                      :key="index"
                      @click="goToDocView(item)"
                    >
                      <div class="item-avatar">
                        {{ item.user_id | getUserNameAvatar }}
                        <div class="unread" v-if="!unmark(item)"></div>
                      </div>
                      <div class="item-body">
                        <p class="mb-0 text-secondary">
                          <span class="name">
                            {{ item.user_id | getUserFullName }}
                          </span>

                          {{ item.description }}
                          <!-- <span class="text-danger fw-medium">Offer Letter Doc</span> -->

                          <span
                            class="doc-name"
                            v-if="item.employee_document_id"
                          >
                            {{ item.employee_document_id.name }}
                          </span>
                          <span class="doc-name" v-else> &nbsp; </span>
                        </p>
                        <span
                          class="date-time text-dark fw-medium pl-0 opacity-80"
                          >{{
                            item.created_at | getFormattedDateTypeThree
                          }}</span
                        >
                      </div>
                    </li>
                  </ul>
                  <div class="notifications-bottom-row">
                    <a @click="viewAllNotifications">
                      View all notifications
                    </a>
                  </div>
                  <!-- </el-scrollbar> -->
                </div>
              </li>
              <li>
                <el-dropdown>
                  <el-button>
                    <div class="icon-block">
                      <div class="icon user-image profile-image">
                        <img
                          v-if="
                            getAuthenticatedUser &&
                            getAuthenticatedUser.avatar &&
                            getAuthenticatedUser.avatar.length > 20
                          "
                          :src="getAuthenticatedUser.avatar"
                          alt="user-image"
                          class="img-fluid"
                        />

                        <img
                          v-else
                          src="@/assets/img/avatar.svg"
                          alt="user-image"
                          class="img-fluid"
                        />
                      </div>
                      <div class="icon-text" v-if="!getIsMobile">
                        {{ getAuthenticatedUser | getUserFullName }}
                        <span class="el-icon-arrow-down text-white"></span>
                      </div>
                      <div class="icon-text" v-else>
                        {{ getAuthenticatedUser | getUserFullNameShortened }}
                        <span class="el-icon-arrow-down text-white"></span>
                      </div>
                    </div>
                    <template
                      v-if="isWorkspaceIsBusiness(this.getActiveWorkspace)"
                    >
                      <p class="user-role">
                        <span v-if="this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole &&this.getAuthenticatedUser.activeRole.userType_id">{{ this.getAuthenticatedUser.activeRole.userType_name }}</span>
                        <span v-else>{{getUserType.name}}</span>
                      </p>
                    </template>
                    <template
                      v-else
                    >
                      <p class="user-role">
                        <span >INDIVIDUAL</span>
                      </p>
                    </template>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile">
                      <el-dropdown-item>
                        <i class="el-icon-user"></i> Profile
                      </el-dropdown-item>
                    </router-link>

                    <router-link to="/profilesettings">
                      <el-dropdown-item>
                        <i class="el-icon-setting"></i>Settings
                      </el-dropdown-item>
                    </router-link>
                    <router-link
                      v-if="
                      isWorkspaceIsBusiness(this.getActiveWorkspace) &&
                        checkPermissionsCategory('companyUsers')
                      "
                      to="/company/users"
                    >
                      <el-dropdown-item>
                        <i class="el-icon-s-custom"></i>Company Users
                      </el-dropdown-item>
                    </router-link>

                    <router-link
                      v-if="
                        checkPermissionsCategory('formTempaltes') && this.isWorkspaceIsBusiness(this.getActiveWorkspace)
                       
                      "
                      to="/template"
                    >
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/Form_Inactive.svg"
                          alt="menu"
                          style="height: 12px; width: 14px; margin-right: 2px"
                        />
                        Form Template
                      </el-dropdown-item>
                    </router-link>
                    <router-link
                      v-if="
                        checkPermissionsCategory('entities') &&this.isWorkspaceIsBusiness(this.getActiveWorkspace)
                      "
                      to="/entity"
                    >
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/Entities Inactive.svg"
                          alt="menu"
                          style="height: 12px; width: 12px; margin-right: 2px"
                        />
                        Entities
                      </el-dropdown-item>
                    </router-link>
                    <router-link
                      v-if="
                        checkPermissionsCategory('globalVariables') &&this.isWorkspaceIsBusiness(this.getActiveWorkspace)
                      "
                      to="/global-variables"
                    >
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/data-variable.svg"
                          alt="menu"
                          style="height: 11px; width: 12px"
                        />
                        Global Variables
                      </el-dropdown-item>
                    </router-link>
                    <!-- <el-dropdown-item>
											<router-link to="/company-profile"onmouseover>
												<i class="el-icon-office-building"></i> Company Profile
											</router-link>
										</el-dropdown-item> -->
                    <router-link to="/company-entity-groups" v-if="this.isWorkspaceIsBusiness(this.getActiveWorkspace)">
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/data-variable.svg"
                          alt="menu"
                          style="height: 11px; width: 12px"
                        />
                        Groups
                      </el-dropdown-item>
                    </router-link>
                    <router-link
                      to="/formBuilders"
                      v-if="this.isWorkspaceIsBusiness(this.getActiveWorkspace)
                      "
                    >
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/data-variable.svg"
                          alt="menu"
                          style="height: 11px; width: 12px"
                        />
                        Form Builder
                      </el-dropdown-item>
                    </router-link>
                    <router-link
                      to="/custom/dashboard-list"
                      v-if="this.isWorkspaceIsBusiness(this.getActiveWorkspace)
                      "
                    >
                      <el-dropdown-item>
                        <img
                          src="@/assets/img/sideMenu/inactive_icons/data-variable.svg"
                          alt="menu"
                          style="height: 11px; width: 12px"
                        />
                        Custom Dashboard
                      </el-dropdown-item>
                    </router-link>
                    <a @click="logout()">
                      <el-dropdown-item>
                        <i class="el-icon-back"></i> Logout
                      </el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="vue-modal"> -->
    <el-dialog
      class="all-notifications-dialog"
      :width="getIsMobile ? '100%' : '60%'"
      :visible.sync="isViewAllNotificationsPopupShow"
      :title="'All Notifications'"
      :before-close="handleCloseAllNotificationsPopup"
      :show-close="true"
      :modalAppendToBody="false"
      ref="viewAllNotificationsPopup"
    >
      <ViewAllNotifications v-if="isViewAllNotificationsPopupShow" />
    </el-dialog>
    <!-- </div> -->

    <div class="vue-modal">
      <el-dialog
        class="all-chats-dialog"
        :width="getIsMobile ? '100%' : '60%'"
        :visible.sync="isViewAllChatsPopupShow"
        :title="'All Chats'"
        :before-close="handleCloseAllChatsPopup"
        :show-close="true"
        :modalAppendToBody="false"
        ref="viewAllChatsPopup"
      >
        <ViewAllChats></ViewAllChats>
      </el-dialog>
    </div>

    <div>
      <!-- <vue-element-loading
        :active="show"
        spinner="bar-fade-scale"
        color="#FF6700"
      /> -->
    </div>
  </section>
</template>

<script>
import { bus } from "../main";
import { mapGetters, mapActions } from "vuex";
import axios from "@/config/axios";
import ViewAllNotifications from "../components/notifications/ViewAllNotifications";
import ViewAllChats from "../components/notifications/ViewAllChats";
import config from "../config/app";
import PermissionsHelper from "@/mixins/permissionsHelper";
import Swal from "sweetalert2";
export default {
  name: "TopBarDefault",
  components: {
    ViewAllNotifications,
    ViewAllChats,
  },

  mixins: [PermissionsHelper],
  data() {
    return {
      res: [],
      title: "",
      isOpen: false,
      isCollapse: "",
      routerValue: "",
      offCanvas: "",
      documentLogs: [],
      openProfile: false,
      isNotificationPopupShow: false,
      isViewAllNotificationsPopupShow: false,
      isChatPopupShow: false,
      isViewAllChatsPopupShow: false,
      isExist: false,
      userWorkspaceList: [],
      currentWorkspace: {},
      currentWorkspaceId: "",
      selectLoad: false,
      permissionsList: [],
      loading: false,

      isLoading: false,
      fullPage: true,
      canCancel: true,
      useSlot: false,
      loader: "spinner",
      color: "#F754A2",
      bgColor: "#b0aeae",
      height: 64,
      width: 64,
      timeout: 15000, //ms
      opacity: 0.7,
        activeRole: '',
        assignedRoles:[]
    };
  },
  computed: {
    ...mapGetters("userStatus", [
      "getNotificationCountUnOpened",
      "getChatCountUnOpened",
    ]),
    ...mapGetters("navigationOpen", ["getIsMobile", "getIsOpen"]),
    ...mapGetters("auth", [
      "getAuthenticatedUser",
      "getActiveWorkspace",
      "getAuthenticationStatus",
      "getWorkspaceList",
      "getUserType",
      "getSwitchWorkspaceError",
      "getPermissionList",
      "getPermissions",
    ]),
    ...mapGetters("dashboard", [
      "getNotifications",
      "getChats",
      "getNotificationsUnReadCnt",
      "getChatsUnReadCnt",
    ]),
    ...mapGetters("company", ["getCompanyDetails"]),
  },
  async mounted() {
    try {
      // console.log("Auth User", this.getAuthenticatedUser)
      // console.log("AuthUserType",this.getUserType)
      if (this.getAuthenticatedUser && this.getAuthenticatedUser.contact_type) {
        await this.handleLogoutInfo();
      } else {
        this.loading = true;
        this.getPermissionsList();
        this.selectLoad = true;
        this.fetchUserData();
        this.fetchNotifications();
        this.fetchChats();
        this.title = this.$route.meta.title || "Dashboard";

        var el = document
          .getElementsByClassName("all-notifications-dialog")[0]
          .getElementsByClassName("el-dialog__headerbtn")[0];
        var self = this;
        el.addEventListener("click", () => {
          self.isViewAllNotificationsPopupShow = false;
          document.querySelector("body").classList.remove("modal-open");
        });

        el = document
          .getElementsByClassName("all-chats-dialog")[0]
          .getElementsByClassName("el-dialog__headerbtn")[0];
        self = this;
        el.addEventListener("click", () => {
          self.isViewAllChatsPopupShow = false;
          document.querySelector("body").classList.remove("modal-open");
        });

        this.fetchUserStatus();
        this.selectLoad = true;
        this.fetchUserData();
        this.fetchRolesList();
        this.setActiveRole();


        if (this.isWorkspaceIsBusiness(this.getActiveWorkspace)) {
          if (
            !(this.isIndividualWorkspace(this.getActiveWorkspace)
            )
          ) {
            this.updateUserData();
            this.getCompanyUserType();
            this.getCompanyInfo();
            // this.fetchRolesList();
            // this.setActiveRole();
          }
        }
        bus.$on("workspaceList", (data) => {
          this.userWorkspaceList = data;
        });
        this.loading = false;
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  watch: {
    $route({ meta }) {
      this.title = meta.title || "Dashboard";
    },
  },

  methods: {

    async fetchRolesList(){
      console.log(this.getAuthenticatedUser)
      if(this.getAuthenticatedUser && this.getAuthenticatedUser.roles)
      {
        this.assignedRoles= this.getAuthenticatedUser.roles
      }
      else{
        this.assignedRoles=[]
      }
    },
    async setActiveRole(){
      this.activeRole= this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole &&this.getAuthenticatedUser.activeRole.userType_id?this.getAuthenticatedUser.activeRole.userType_id:''
    },
    async handleLogoutInfo() {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please re-login. Sorry for the inconvenience.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          let timerInterval;
          Swal.fire({
            title: "",
            html: "Please wait ..... ",
            timer: 2000,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              clearInterval(timerInterval);
              this.logout();
            },
          });
        }
      });
    },
    getLabel() {
      return (userType) => {
        if (userType && userType.role) {
          return userType.role.title + " - " + userType.name;
        } else {
          return userType.name;
        }
      };
    },

    ...mapActions({
      fetchUserStatus: "userStatus/fetchUserStatus",
      updateUserStatus: "userStatus/updateUserStatus",
      fetchNotifications: "dashboard/fetchNotifications",
      fetchChats: "dashboard/fetchChats",
      fetchPermissionList: "auth/getPermissions",
      fetchPermissions: "auth/updatePermissions",
    }),
    handleCloseAllNotificationsPopup() {
      //no lines
    },
    async getPermissionsList() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/getPermissions");
        if (this.getPermissionList) {
          this.permissionsList = this.getPermissionList;
        }

        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    handleCloseAllChatsPopup() {},
    async goToChats(document_id, isChat = false) {
      if (isChat) {
        this.markAsReadChats({ document_id });
      }
      if (document) {
        if (document.document_status == "DRAFT") {
          this.$router.push({
            name: "employee-documents-custom-document-edit",
            params: {
              employee_document_id: document_id,
            },
          });
        } else {
          this.$router.push({
            name: "employee-documents-custom-document",
            params: {
              employee_document_id: document_id,
            },
            query: { tab: "chat" },
          });
        }
      }
    },
    async goToDocView(document) {
      if (
        document &&
        document.employee_document_id &&
        document.employee_document_id._id
      ) {
        this.markAsReadEachActivities(document._id);
        if (document) {
          if (document.document_status == "DRAFT") {
            this.$router.push({
              name: "employee-documents-custom-document-edit",
              params: {
                employee_document_id: document.employee_document_id._id,
              },
            });
          } else {
            this.$router.push({
              name: "employee-documents-custom-document",
              params: {
                employee_document_id: document.employee_document_id._id,
              },
              query: { tab: "logs" },
            });
          }
        }
      } else {
        this.$router.push({
          path: "/templates",
        });
      }
    },
    viewAllNotifications() {
      this.isViewAllNotificationsPopupShow = true;
      this.isNotificationPopupShow = false;
      document.body.className += " modal-open";
    },
    viewAllChats() {
      this.isViewAllChatsPopupShow = true;
      this.isChatPopupShow = false;
      document.body.className += " modal-open";
    },
    async toggleNotificationPopup() {
      if (this.getNotifications && !this.getNotifications.length) {
        this.$message.info("You have no notifications yet to display.");
      }
      console.log(">>> toggleNotificationPopup() called");
      this.isNotificationPopupShow = !this.isNotificationPopupShow;
      if (this.isNotificationPopupShow) {
        this.updateUserStatus({
          notification_last_open_date: "1",
        });
        this.fetchUserStatus();
      }
    },
    async toggleChatPopup() {
      if (this.getChats && !this.getChats.length) {
        this.$message.info("You have no chats yet to display.");
      }
      console.log(">>> toggleChatPopup() called");
      this.isChatPopupShow = !this.isChatPopupShow;
      if (this.isChatPopupShow) {
        this.updateUserStatus({
          chat_last_open_date: "1",
        });
        this.fetchUserStatus();
      }
    },
    unmark(doc) {
      if (
        doc.sender_email &&
        doc.sender_email.email == this.getAuthenticatedUser.email &&
        doc.sender_email.is_read &&
        doc.sender_email.is_read == true
      ) {
        return doc.sender_email.is_read;
      } else {
        let user = doc.rec_email.find(
          (x) =>
            x.email && x.email == this.getAuthenticatedUser.email && x.is_read
        );
        return user;
      }
    },
    async markAsReadEachActivities(query = {}) {
      try {
        await axios.post("all-documents/mark-as-read-each-activities", {
          query,
        });
        if (this.getNotificationsUnReadCnt > 0) {
          await this.fetchNotifications();
        }
      } catch (err) {
        console.log(">>> markAsReadActivities(), err", err);
      }
    },
    async markAsReadActivities() {
      try {
        await axios.post("all-documents/mark-as-read-activities");
        await this.fetchNotifications();
        if (this.getNotificationsUnReadCnt > 0) {
          await this.fetchNotifications();
        }
      } catch (err) {
        console.log(">>> markAsReadActivities(), err", err);
      }
    },
    async markAsReadChats(query = {}) {
      try {
        await axios.post("all-documents/mark-as-read-notes", { query });

        if (this.getChatsUnReadCnt > 0) {
          await this.fetchChats();
        }
      } catch (err) {
        console.log(">>> markAsReadChats(), err", err);
      }
    },
    hideNotificationPopup() {
      this.isNotificationPopupShow = false;
    },
    hideChatPopup() {
      this.isChatPopupShow = false;
    },
    logout() {
      let timerInterval;
      Swal.fire({
        title: "",
        html: "E-Signs signing off....",
        timer: 3000,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();

          this.resetStore();
          localStorage.removeItem(config.APP_NAME + "_" + config.APP_VERSION);
          localStorage.clear();
        },
        willClose: () => {
          clearInterval(timerInterval);
          this.resetStore();
          this.$router.push({ path: "/signin" });
        },
      });
    },
    sendMessageToParent() {
      this.$store.commit("navigationOpen/setIsOpen", !this.getIsOpen, {
        root: true,
      });
      this.$emit("open:sidebar", !this.isOpen);
    },
    resetStore() {
      this.$store.commit("auth/resetAuthData", null, { root: true });
      this.$store.commit("entityGroups/resetData", null, { root: true });
      this.$store.commit("menuManagementV2/resetData", null, { root: true });
      this.$store.commit("menuManagement/resetData", null, { root: true });
      this.$store.commit("globalVariables/resetData", null, { root: true });
      this.$store.commit("repeatableTemplates/resetData", null, { root: true });
      this.$store.commit("templatesData/resetData", null, { root: true });
      this.$store.commit("entities/resetData", null, { root: true });
      this.$store.commit("companyTemplates/resetData", null, { root: true });
      this.$store.commit("templateWorkflow/resetData", null, { root: true });
      this.$store.commit("company/resetData", null, { root: true });
      this.$store.commit("userStatus/resetData", null, { root: true });
      this.$store.commit("subscription/resetData", null, { root: true });
      this.$store.commit("templates/resetData", null, { root: true });
      this.$store.commit("settings/resetData", null, { root: true });
      this.$store.commit("dashboard/resetData", null, { root: true });
      this.$store.commit("contactTypes/resetData", null, { root: true });
      this.$store.commit("documentNotes/resetData", null, { root: true });
      this.$store.commit("configurableDocuments/resetData", null, {
        root: true,
      });
      this.$store.commit("contacts/resetData", null, { root: true });
      this.$store.commit("s3FileUpload/resetData", null, { root: true });
      this.$store.commit("documents/resetData", null, { root: true });
      this.$store.commit("errors/resetData", null, { root: true });
      this.$store.commit("fileUpload/resetData", null, { root: true });
      this.$store.commit("errors/reset", null, { root: true });

      this.$store.commit("employeeData/reset", null, { root: true });
      this.$store.commit("employeeDocuments/reset", null, { root: true });
    },
    async fetchUserData() {
      if (this.getActiveWorkspace) {
        this.currentWorkspace = this.getActiveWorkspace;
        this.currentWorkspaceId = this.currentWorkspace.company_id;
        this.userWorkspaceList = this.getWorkspaceList;

        let info= await this.updateIndividualWorkspace(this.getActiveWorkspace)
        this.currentWorkspace = info.currentWorkspace;
        this.userWorkspaceList = info.userWorkspaceList;

        this.selectLoad = false;
      } else {
        await this.handleLogoutInfo();
      }
    },

    async getCompanyInfo() {
      this.loading = true;
      try {
        await this.$store.dispatch(
          "company/fetchCompany",
          this.getActiveWorkspace.company_id
        );
        if (this.getCompanyDetails) {
          this.loading = false;
          this.brandingInfo = this.getCompanyDetails;
        }
      } catch (e) {
        this.loading = false;
        this.$notify.error({
          title: "Error",
          message: e,
        });
      }
    },
    async updateUserData() {
      this.loading = true;
      await this.$store.dispatch(
        "auth/fetchUsersWithEmail",
        this.getAuthenticatedUser.email
      );
      this.loading = false;
      if (this.getWorkspaceList) {
        let info= await this.updateIndividualWorkspace(this.getActiveWorkspace)
        console.log("info",info)
        this.currentWorkspace = info.currentWorkspace;
        this.userWorkspaceList = info.userWorkspaceList;
      } else {
        this.userWorkspaceList = [];
      }
    },
    async getCompanyUserType() {
      try {
        await this.$store.dispatch(
          "auth/getUserTypeById",
          this.activeRole
        );
      } catch (err) {
        console.log(err);
        this.$notify.error({
          title: "Error",
          message: err,
        });
      }
    },
    async changeRole()
    {
        // console.log(this.activeRole,this.currentWorkspaceId)
        // this.ChangeAccount(this.activeRole)

        this.loading = true;
      let timerInterval;
      Swal.fire({
        title: "",
        html: "Validation process is going on.It will take few seconds.Please wait....",
        timer: 15000,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      await this.$store.dispatch(
        "auth/fetchUsersWithEmail",
        this.getAuthenticatedUser.email
      );
      this.loading = false;

      if (this.getWorkspaceList) {
        let presentWorkSpace = this.getWorkspaceList.filter((u) => {
          if (
            u.company_id == this.currentWorkspace.company_id ||
            u.company_id._id == this.currentWorkspace.company_id
          ) {
            return u;
          }
        });
        let selectedWorkSpace = this.getWorkspaceList.filter((u) => {
          if (
            u.company_id == this.currentWorkspaceId ||
            u.company_id._id == this.currentWorkspaceId
          ) {
            return u;
          }
        });
        if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "ACTIVE"
        ) {
          if (selectedWorkSpace && selectedWorkSpace.length) {
            if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "ACTIVE"
            ) {
              Swal.close();
              // console.log("roleId",roleId)
              // if(roleId)
              // {
                await this.changeWorkspaceRole()
              // }
              // else{
              // await this.changeWorkspace();
              // }

            } else if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "HOLD"
            ) {
              Swal.close();
              await this.activateAccount();
            } else if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "INACTIVE"
            ) {
              await this.revertOldWorkspace(
                "This workspace is in inactive state. Please contact administrator"
              );
              console.log("Inactive workspace details");
            } else {
              await this.revertOldWorkspace(
                "This workspace is not found in your records . Please verify once "
              );
              console.log("invalid workspace details");
            }
          } else {
            // console.log("invalid workspace details");
            await this.revertOldWorkspace(
              "This workspace is not found in your records . Please verify once "
            );
          }
        } else if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "HOLD"
        ) {
          await this.handleLogoutInfo(
            "This workspace is in Hold state. Please contact to  administrator.Please re-login."
          );
        } else if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "INACTIVE"
        ) {
          await this.handleLogoutInfo(
            "This workspace is in inactive state. Please contact to administrator.Please re-login."
          );
        }
      }

    },

    async ChangeAccount() {
      this.loading = true;
      let timerInterval;
      Swal.fire({
        title: "",
        html: "Validation process is going on.It will take few seconds.Please wait....",
        timer: 15000,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      await this.$store.dispatch(
        "auth/fetchUsersWithEmail",
        this.getAuthenticatedUser.email
      );
      this.loading = false;

      if (this.getWorkspaceList) {
        let presentWorkSpace = this.getWorkspaceList.filter((u) => {
          if (
            u.company_id == this.currentWorkspace.company_id ||
            u.company_id._id == this.currentWorkspace.company_id
          ) {
            return u;
          }
        });
        let selectedWorkSpace = this.getWorkspaceList.filter((u) => {
          if (
            u.company_id == this.currentWorkspaceId ||
            u.company_id._id == this.currentWorkspaceId
          ) {
            return u;
          }
        });
        if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "ACTIVE"
        ) {
          if (selectedWorkSpace && selectedWorkSpace.length) {
            if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "ACTIVE"
            ) {
              Swal.close();
              // console.log("roleId",roleId)
              // if(roleId)
              // {
              //   await this.changeWorkspaceRole()
              // }
              // else{
              await this.changeWorkspace();
              // }

            } else if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "HOLD"
            ) {
              Swal.close();
              await this.activateAccount();
            } else if (
              selectedWorkSpace[0] &&
              selectedWorkSpace[0].status === "INACTIVE"
            ) {
              await this.revertOldWorkspace(
                "This workspace is in inactive state. Please contact administrator"
              );
              console.log("Inactive workspace details");
            } else {
              await this.revertOldWorkspace(
                "This workspace is not found in your records . Please verify once "
              );
              console.log("invalid workspace details");
            }
          } else {
            // console.log("invalid workspace details");
            await this.revertOldWorkspace(
              "This workspace is not found in your records . Please verify once "
            );
          }
        } else if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "HOLD"
        ) {
          await this.handleLogoutInfo(
            "This workspace is in Hold state. Please contact to  administrator.Please re-login."
          );
        } else if (
          presentWorkSpace &&
          presentWorkSpace.length &&
          presentWorkSpace[0] &&
          presentWorkSpace[0].status === "INACTIVE"
        ) {
          await this.handleLogoutInfo(
            "This workspace is in inactive state. Please contact to administrator.Please re-login."
          );
        }
      }
    },
    async changeWorkspaceRole() {
      Swal.close();
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to switch the Role?",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.loadingAlert(10000);
          await this.$store.dispatch(
            "auth/switchWorkspace",
            {currentWorkspaceId:this.currentWorkspaceId,
              activeRole:this.activeRole
            }
          );
          if (this.getAuthenticationStatus) {
            this.$store.commit("errors/reset", null, { root: true });
            this.currentWorkspace = this.getAuthenticatedUser.current_workspace;
            await this.fetchUserDataAfterSwitch();
            if (
              this.isWorkspaceIsBusiness(this.getActiveWorkspace)
            ) {
              await this.getCompanyUserType();
            }
            await this.$store.dispatch("auth/fetchProfile");
            this.$router.push({ path: "/" });
            //  this.$router.push({ path: "/documents" });
            Swal.close();
            // eslint-disable-next-line no-debugger
            // debugger;
            window.location.reload();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.currentWorkspaceId = this.currentWorkspace.company_id;
          this.setActiveRole();
        }
      });
    },
    async changeWorkspace() {
      Swal.close();
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure to switch the workspace?",
        icon: "warning",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.loadingAlert(10000);
          await this.$store.dispatch(
            "auth/switchWorkspace",
            {currentWorkspaceId:this.currentWorkspaceId
            }
          );
          if (this.getAuthenticationStatus) {
            this.$store.commit("errors/reset", null, { root: true });
            this.currentWorkspace = this.getAuthenticatedUser.current_workspace;
            await this.fetchUserDataAfterSwitch();
            if (
              this.isWorkspaceIsBusiness(this.getActiveWorkspace)
            ) {
              await this.getCompanyUserType();
               await this.$store.dispatch("settings/fetchUserDashboardStatics");
            }
            await this.$store.dispatch("auth/fetchProfile");
            await this.$store.dispatch("settings/fetchUserDashboardStatics");
            this.$router.push({ path: "/" });
            //  this.$router.push({ path: "/documents" });
            Swal.close();
            // eslint-disable-next-line no-debugger
            // debugger;
            window.location.reload();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.currentWorkspaceId = this.currentWorkspace.company_id;
          this.setActiveRole();
        }
      });
    },
    async activateAccount() {
      Swal.close();
      Swal.fire({
        title: "Are you sure?",
        text: "This workspace is in hold state. Do you want to activate it?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.loadingAlert(10000);
          try {
            await this.$store.dispatch(
              "auth/verifyAndSwitch",
              this.currentWorkspaceId
            );
            if (this.getAuthenticationStatus) {
              Swal.close();
              await this.changeWorkspace();
            } else {
              await this.revertOldWorkspace("Failed to active the account");
            }
          } catch (HoldError) {
            console.log(HoldError);
            Swal.close();
            await this.revertOldWorkspace("");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.currentWorkspaceId = this.currentWorkspace.company_id;
        }
      });
    },

    async fetchUserDataAfterSwitch() {
      this.loading = true;
      await this.$store.dispatch(
        "auth/fetchUsersWithEmail",
        this.getAuthenticatedUser.email
      );
      this.loading = false;
      if(this.getWorkspaceList)
      {
       let info= await this.updateIndividualWorkspace(this.getActiveWorkspace)
        this.currentWorkspace = info.currentWorkspace;
        this.userWorkspaceList = info.userWorkspaceList;
      }
      else
      {
        this.userWorkspaceList = []
      }
    },

    async revertOldWorkspace(msg = "") {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: msg ? msg : "Something went wrong!",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.currentWorkspaceId = this.currentWorkspace.company_id;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.currentWorkspaceId = this.currentWorkspace.company_id;
        }
      });
    },
    async loadingAlert(timer = 1500) {
      Swal.close();
      let timerInterval;
      Swal.fire({
        title: "",
        html: "Please wait....",
        timer: timer,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
    },
  },
};
</script>

<style lang="scss">
body.modal-open {
  height: 100vh;
  //overflow-y: hidden;
}
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1b487e;
  color: #ffffff;
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
          padding-top: 15px;
          padding-bottom: 10px;
          img {
            width: 100px;
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
      .alert-icon {
        position: relative;
        margin-right: 35px;
        .alert-count {
          position: absolute;
          top: -12px;
          right: -6px;
          span {
            background: #f754a2;
            font-size: 0.8em;
            border: 1px solid #f754a2;
            color: #ffffff;
            padding: 2px;
            width: 9px;
            height: 9px;
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
          border-radius: 3px;
          background: rgba(236, 245, 255, 0.1);
          font-size: 0.9rem;
          line-height: 2;
          width: calc(100% - 22px);
          border-color: rgba(236, 245, 255, 0.2);
          height: 38px;
          color: #ffffff;
          &:focus {
            border-color: #1b487e;
          }
        }
        .el-input__icon {
          line-height: 27px !important;
        }
      }

      .el-dropdown {
        font-size: 15px;
        padding-right: 0;
        display: flex;
        align-items: center;
        button {
          padding: 0;
          margin: 0;
          background: transparent;
          border: none;
        }
        &:hover {
          cursor: pointer;
        }
        .user-image {
          img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
            margin-bottom: -20px;
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
          color: rgba($color: #ffffff, $alpha: 0.85);
          &:hover {
            color: rgba($color: #ffffff, $alpha: 1);
          }
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
      background-color: #ffffff;
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
  .user-role {
    color: rgba($color: #ffffff, $alpha: 0.95);
    font-size: 0.8em;
    font-weight: 300;
  }
}
.card:hover .img-top {
  display: inline;
}
.notification-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
  @media (min-width: 800px) {
    margin-right: -10px;
  }
  cursor: pointer;
  @media (max-width: 400px) {
    width: 40px;
  }
  .user-image {
    img {
      margin-top: 18px;
      width: 20px;
      &.chat {
        margin-top: 21px;
      }
    }
  }
  .number-on-bell {
    height: 17px;
    min-width: 13px;
    background-color: #f754a2;
    border-radius: 20px;
    color: white;
    text-align: center;
    position: absolute;
    top: 7px;
    &.chat {
      top: 6px;
    }
    left: 15px;
    padding: 0px 2px 0px 2px;
    font-size: 12px;
    font-weight: 400;
  }
}
.notification-popup {
  margin-right: -40px;
  border: 1px solid #e3eafd;
  border-radius: 5px;
  @media (max-width: 499.98px) {
    // width: 100vw;
    
    // top: 55px;
    .arrow {
      display: none;
    }
    // .list-group-flush {
    // 	padding: 0px 5px 10px 5px !important;
    // }
    left: -7%;
    max-width: 400px;
  }
  @media (max-width: 400px) {
    width: 300px;
    left: -20%;
  }
  top: 58px;
  z-index: 10000;
  position: absolute;
  left: 20%;
  .notifications-bottom-row {
    a {
      color: #409eff;
      cursor: pointer;
    }
    padding: 11px 0px;
    text-align: center;
    background-color: white;
  }
  .notifications-top-row {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    span {
      color: #000;
      font-weight: 500;
    }
    a {
      color: #409eff;
      cursor: pointer;
    }
  }
  .arrow {
    width: 0px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 0px;
    border-bottom: 10px solid white;
    margin-left: 62%;
    margin-top: 14px;
  }
  .el-scrollbar {
    border: 1px solid #e3eafd;
    border-radius: 5px;
  }
  .list-group-flush {
    padding: 0px;
    background: white;
    & > .list-group-item {
      border-width: 0 0 1px;
    }
  }
  .noNotifications {
    margin-left: 40%;
    display: grid;
    gap: 0px;
    .img-text {
      margin-left: 5px;
      color: #1f1f1f;
    }
  }
  .notifcation-item {
    cursor: pointer;
    padding: 10px 20px;
    display: grid;
    grid-template-columns: 2.75em 1fr;
    gap: 15px;
    @media (max-width: 499.98px) {
      // display: grid;
      padding: 5px 5px !important;
    }
    .item-avatar {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #f754a2;
      background-color: rgba(#f754a2, $alpha: 0.1);
      color: #f754a2;
      .unread {
        position: absolute;
        z-index: 10000;
        width: 7px;
        height: 7px;
        top: 9px;
        left: 28px;
        border-radius: 8px;
        background: #40a0ff;
      }
    }
    .item-body {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 13px;
        font-style: italic;
      }
      .name {
        font-style: normal;
        margin-bottom: 0;
        color: #6c757d !important;
        min-height: 21px;
        font-weight: 500;
        font-size: 15px !important;
      }
      .date-time {
        font-style: normal;
        min-width: 100px;
        @media (max-width: 499.98px) {
          min-width: 70px !important;
        }
        text-align: right;
        color: rgba(0, 0, 0, 0.5) !important;
        font-size: 12px;
      }
      .doc-name {
        font-style: normal;
        font-size: 13px !important;
        font-weight: 500;
        color: gray;
        min-width: 20px;
        margin-left: 5px;
      }
    }
    @media (max-width: 499.98px) {
      // display: list-item;
    }
  }
}
.workspace-wrapper {
  position: relative;
  margin-right: 30px;
  cursor: pointer;
  @media (max-width: 500px) {
    max-width: 130px;
  }
  @media (max-width: 400px) {
    max-width: 100px;
    margin-right: 20px;
  }
}
.top-navbar-right-menu {
  @media (max-width: 500px) {
    .user-image {
      &.profile-image {
        display: none;
      }
    }
  }
  .user-role {
    @media (max-width: 500px) {
      text-align: left;
      padding-left: 0px;
    }
    padding-left: 27px;
  }
}
.el-message-box__wrapper {
  .el-message-box {
    @media (max-width: 420px) {
      width: 95% !important;
    }
  }
}
</style>
