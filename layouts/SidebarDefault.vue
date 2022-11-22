<template>
  <section class="side-navigation-menu" :class="{ 'is-open': isCollapse }">
    <el-scrollbar>
      <el-menu :default-active="activeLink" :collapse="!isCollapse" background-color="#fff" text-color="#303133"
        active-text-color="#F754A2" ref="sidebarMenu">
        <template v-for="sideBarItem in menu">
          <template v-if="sideBarItem.children && sideBarItem.children.length">
            <el-submenu :key="sideBarItem._id" :index="sideBarItem._id">
              <template slot="title">
                <img :src="require('@/assets/img/icons/menu/' + sideBarItem.icon)" alt="menu"
                  style="height: 22px; width: 22px" />&nbsp;&nbsp;
                <span slot="title"> {{ sideBarItem.title }}</span></template>

              <el-menu-item-group>
                <template v-for="sideBarSubItem in sideBarItem.children">
                  <el-menu-item :key="sideBarSubItem._id" :index="sideBarSubItem._id"
                    @click="routeClick(sideBarSubItem, true)" v-if="checkPermissionsStatus(sideBarSubItem)">
                    <img :src="
                      require('@/assets/img/icons/menu/' +
                        sideBarSubItem.icon)
                    " alt="menu" style="height: 22px; width: 22px" />
                    &nbsp;&nbsp;
                    <span class="menu-title">{{ sideBarSubItem.title }}</span>
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="sideBarItem._id" :index="sideBarItem._id" @click="routeClick(sideBarItem, false)"
              v-if="checkPermissionsStatus(sideBarItem)">
              <img :src="require('@/assets/img/icons/menu/' + sideBarItem.icon)" alt="menu"
                style="height: 22px; width: 22px" />&nbsp;&nbsp;
              <span class="menu-title" slot="title">{{
              sideBarItem.title
              }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PermissionsHelper from "@/mixins/permissionsHelper";

export default {
  name: "SidebarDefault",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  mixins: [PermissionsHelper],
  data() {
    return {
      activeLink: "62b55e9eb310d91964580ea5",
      menu: [],
      menuLoading: false,
      isOpen: "",
      routerValue: "",
      offCanvas: "",
      path: "",
      menuItems: [
        {
          title: "Company Documents",
          route: "/signup",
          icon: "company-document-2.svg",
          allowedUsers: ["GUEST"],
        },
      ],
      userMenu: [],
      defaultProps: {
        children: "children",
        title: "title",
      },
      adminMenu: true,
      isAdmin: false,
      userType: {},
      permissionsList: [],
      staticPaths: [
        {
          children: [],
          _id: "62b55e9eb310d91964580ea0",
          title: "Create Document",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "company-document-2.svg",
          route_id: "documents/upload",
          staticMenu: true,
          permission: "createNewDocument",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580ea5",
          title: "Dashboard",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "dashboard_active.svg",
          route_id: "dashboard",
          staticMenu: true,
          permission: "dashboard",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580ea6",
          title: "Documents",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "documents_active.svg",
          route_id: "documents/all",
          staticMenu: true,
          permission: "documents",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580ea7",
          title: "Templates",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "templates_active.svg",
          route_id: "templates",
          staticMenu: true,
          permission: "documentTemplate",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580ea8",
          title: "Contacts",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "contact_active.svg",
          route_id: "contacts",
          staticMenu: true,
          permission: "contacts",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580ea9",
          title: "Workflows",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "workflow_active.svg",
          route_id: "workflows",
          staticMenu: true,
          permission: "workflows",
        },
        {
          children: [],
          _id: "62b55e9eb310d91964580eaa",
          title: "Request Documents",
          feature: "OWNERROUTES",
          category: "OWNERROUTES",
          type: "Individual",
          icon: "request-document_active.svg",
          route_id: "request-documents/select-card-type",
          staticMenu: true,
          permission: "request-documents",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"]),
    ...mapGetters("auth", [
      "getAuthenticatedUser",
      "getUserMenu",
      "getActiveWorkspace",
      "getUserType",
      "getPermissionList",
      "getPermissions",
    ]),
    ...mapGetters("menuManagementV2", [
      "getMenu",
      "getMenuManagementAddStatus",
      "getMenuManagementUpdateStatus",
    ]),
    isCollapse: {
      get() {
        return this.getIsOpen;
      },
      set(isCollapse) {
        this.$store.commit("navigationOpen/setIsOpen", isCollapse, {
          root: true,
        });
      },
    },
    getCurrentRouteName() {
      if (
        this.$router &&
        this.$router.currentRoute &&
        this.$router.currentRoute.name
      )
        return this.$router.currentRoute.name;
      else return null;
    },
    getUserMenuItems() {
      let userType = this.getActiveWorkspace ? this.userType.name : "";
      return this.menuItems.filter(
        (item) => item.allowedUsers.indexOf(userType) > -1
      );
    },
  },
  watch: {
    async "$route.path"() {
      if(this.$route && this.$route.path){
        let name = this.$route.path.charAt(0) == '/' ? this.$route.path.slice(1): this.$route.path;
        let ownerRoute = this.staticPaths.find(e => e.route_id == name);
        if(ownerRoute && ownerRoute._id) { 
          this.activeLink = ownerRoute._id;
        }
      } 
    },
  },
  async mounted() {
    this.getPermissionsList();
    if (
      this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole && this.getAuthenticatedUser.activeRole.userType_id
    ) {
      await this.$store.dispatch(
        "auth/getUserTypeById",
        this.getAuthenticatedUser.activeRole.userType_id
      );
    }
    if (
      this.isWorkspaceIsBusiness(this.getActiveWorkspace) &&
      this.getActiveWorkspace.company_id
    ) {
      this.userType = this.getUserType;
      this.getMenuList();
    } else {
      this.menu = this.staticPaths;
    }
  },
  methods: {
    async getMenuList() {
      this.menu = [];
      if (
        this.getAuthenticatedUser && this.getAuthenticatedUser.activeRole &&this.getAuthenticatedUser.activeRole.userType_id
      ) {
        await this.$store.dispatch(
          "menuManagementV2/fetchMenuWithUserType",
          this.getAuthenticatedUser.activeRole.userType_id
        );
      }

      if (this.getMenu) {
        this.menu = this.getMenu
          ? this.getMenu.menu_list.map((e) => {
            if (e.entity_id && e.entity_id._id) {
              e.entity_id = e.entity_id._id;
            }

            if (e.workflow_id && e.workflow_id._id) {
              e.workflow_id = e.workflow_id._id;
            }
            return e;
          })
          : [];
      } else if (this.userType && this.userType.name === "OWNER") {
        this.menu = [];
        this.menu = this.staticPaths;
      } else {
        this.menu = [];
        this.menu = this.staticPaths;
      }
    },
    routeClick(data, isChild) {
      console.log("menu item-route id", data);
      if (data && data.feature === "ENTITIES") {
        this.activeLink = data._id;

        if (isChild) {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/entity?group=${data.groups
                }&routeType=subEntity&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/entity/${data.entity_id._id
                }?routeType=subEntity&filter=${data.filters ? data.filters._id ? data.filters._id : data.filters : ''}&key=${Math.floor(Math.random() * 100000)}`,
            });
          }
        } else {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/entity?group=${data.groups
                }&routeType=entity&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/entity/${data.entity_id
                }?routeType=entity&filter=${data.filters ? data.filters._id ? data.filters._id : data.filters : ''}&key=${Math.floor(Math.random() * 100000)}`,
            });
          }
        }
      } else if (data && data.feature === "WORKFLOWS") {
        this.activeLink = data._id;
        if (isChild) {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/workflows?group=${data.groups
                }&routeType=subWF&key=${Math.floor(Math.random() * 100000)}&t=${data.title
                }`,
            });
          } else {
            this.$router.push({
              path: `/workflow/${data.workflow_id
                }?routeType=subWF&key=${Math.floor(Math.random() * 100000)}&t=${data.title
                }`,
            });
          }
        } else {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/workflows?group=${data.groups
                }&routeType=WF&key=${Math.floor(Math.random() * 100000)}&t=${data.title
                }`,
            });
          } else {
            this.$router.push({
              path: `/workflow/${data.workflow_id
                }?routeType=WF&key=${Math.floor(Math.random() * 100000)}&t=${data.title
                }`,
            });
          }
        }
      } else if (data && data.feature === "OWNERROUTES") {
        this.activeLink = data._id;
        this.$router.push({
          path: `/${data.route_id}`,
        });
      } else if (data && data.feature === "FORM_TEMPLATE") {
        this.activeLink = data._id;

        if (isChild) {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/template?group=${data.groups
                }&routeType=subFT&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/template?routeType=subFT&key=${Math.floor(
                Math.random() * 100000
              )}`,
            });
          }
        } else {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/template?group=${data.groups
                }&routeType=FT&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/template?routeType=FT&key=${Math.floor(
                Math.random() * 100000
              )}`,
            });
          }
        }
      } else if (data && data.feature === "DOC_TEMPLATE") {
        this.activeLink = data._id;

        if (isChild) {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/templates?group=${data.groups
                }&routeType=subDT&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/templates?routeType=subDT&key=${Math.floor(
                Math.random() * 100000
              )}`,
            });
          }
        } else {
          if (data.isGroup === "Groups") {
            this.$router.push({
              path: `/templates?group=${data.groups
                }&routeType=DT&key=${Math.floor(Math.random() * 100000)}`,
            });
          } else {
            this.$router.push({
              path: `/templates?routeType=DT&key=${Math.floor(
                Math.random() * 100000
              )}`,
            });
          }
        }
      } else {
        this.activeLink = "62b55e9eb310d91964580ea5";
        this.$router.push({
          path: `/dashboard`,
        });
      }
      this.$store.commit("navigationOpen/setCurrentMenu", data, {
        root: true,
      });
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
    checkPermissionsStatus(menuData) {
      if (
        this.isIndividualWorkspace(this.getActiveWorkspace) &&
        menuData &&
        (menuData.permission === "companyUsers" ||
          menuData.permission === "workflows")
      ) {
        return false;
      } else if (menuData && menuData.feature === "OWNERROUTES") {
        if (this.checkPermissionsCategory(menuData.permission)) {
          return true;
        } else if (this.checkPermissionByPermissionName(menuData.permission)) {
          return true;
        } else if (menuData.permission === "dashboard") {
          return true;
        } else {
          {
            return false;
          }
        }
      } else if (menuData && menuData.feature === "ENTITIES") {
        // Check Entities permission
        return this.checkPermissionsCategory("entities");
      } else if (menuData && menuData.feature === "WORKFLOWS") {
        // Check workflow permission permission
        return this.checkPermissionsCategory("workflows");
        // return true;
      } else if (menuData && menuData.feature === "DOC_TEMPLATE") {
        // Check workflow permission permission
        // return this.checkPermissionsCategory("workflows");
        return true;
      } else if (menuData && menuData.feature === "FORM_TEMPLATE") {
        // Check workflow permission permission
        // return this.checkPermissionsCategory("workflows");
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.dashboard-view {
  &.mobile {
    .side-navigation-menu {
      &.is-open {
        transform: translate3d(0px, 0, 0);
      }

      transform: translate3d(-210px, 0, 0);
    }
  }
}

.side-navigation-menu {
  transform: translate3d(0px, 0, 0);
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  top: 67.5px;
  z-index: 999;
  background: white;
  border-right: 1px solid #f2f2f2;
  width: 70px;
  padding-top: 10px;

  .el-scrollbar__wrap {
    max-height: calc(100vh - 68px);
    overflow-y: scroll;
  }

  .menu-item {
    list-style: none;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    span {
      display: inline-flex;

      img {
        max-width: 27px;
        max-height: 27px;
      }
    }

    .menu-title {
      display: none;
    }

    a {
      &.btn {
        background-color: transparent;
        padding: 0px;
        font-size: 2em;
        line-height: 1;
        transition: 0s all ease-in;
        color: #f754a2;
      }
    }
  }

  &.is-open {
    width: 220px;
    min-height: calc(100vh - 70px);

    .menu-item {
      display: flex;
      padding: 10px 15px;
      justify-content: flex-start;
      text-align: left;

      a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1.1em;

        &.btn {
          background-color: #f754a2;
          padding: 2px 10px;
          border-radius: 3px;

          .icon,
          .menu-title {
            color: #ffffff;
          }
        }
      }

      .menu-title {
        display: inline-flex;
        line-height: 30px;
        padding-left: 10px;
        color: #4c4b4e;
      }
    }
  }

  .menu-icon {
    width: 120px !important;
    height: 50px !important;
    visibility: initial !important;

    img {
      width: 30px;
    }
  }
}

.is-active {
  background: #ecf5ff;
}

.el-menu--collapse {
  .menu-icon {
    margin-right: 0 !important;
  }

  .el-tooltip {
    display: flex !important;
    align-items: center !important;
  }
}

.el-tooltip {
  padding: 0 15px !important;
}
</style>
