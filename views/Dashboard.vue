<template>
  <div class="dashboard">
    <div class="Greeting">
      <h2 class="fw-normal mb-3 blue-dark fs-5">
        Hello, {{ getAuthenticatedUser | getUserFullName }}
      </h2>
    </div>
    <div
      class="dashboard-tabs"
      v-if="hasCustomDashboard && activeCustomDashboard"
    >
      <el-tabs v-model="activeCustomDashboardId" @tab-click="changeDashboard">
        <el-tab-pane
          v-for="(item, index) in customDashboardsList"
          :key="index + item._id"
          :label="item.name"
          :name="item._id"
        ></el-tab-pane>
      </el-tabs>
      <el-row
        class="dashboard-filters"
        v-if="
          activeCustomDashboard.allCustomFilters &&
          activeCustomDashboard.allCustomFilters.length
        "
      >
        <el-col
          :span="24"
          style="border-bottom: #d2dcfa solid 1px; margin-bottom: 5px"
        >
          <CustomDashboardFilters
            :allDashboardstats="activeCustomDashboard"
          ></CustomDashboardFilters>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top: 10px">
          <CustomDashboardStats
            :allDashboardstats="activeCustomDashboard"
            :hide_options="true"
            :refresh="refresh"
          ></CustomDashboardStats>
        </el-col>
      </el-row>
    </div>
    <div
      class="stats-container"
      v-loading="statsLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-else
    >
      <el-scrollbar>
        <div class="mb-1" v-if="activeDashboardStatics">
          <el-row>
            <el-col
              :lg="3"
              :md="6"
              :sm="12"
              :xs="12"
              class="card dashboard-top-buttons"
              style="min-with: 100px"
              v-for="(stat, index) in activeDashboardStatics"
              :key="index"
              :style="
                isSelectedStats(stat.slug)
                  ? `color:white;background-color:${stat.active_color}`
                  : `background-color:${stat.background_color}`
              "
            >
              <div
                style="width: 150px"
                class="p-1"
                v-on:click="getSelecetedDocumentStatus(stat)"
              >
                <div class="d-flex align-items-center mb-3">
                  <p class="Title_sty mb-0 fw-300 pl-1">{{ stat.title }}</p>
                </div>
                <div class="d-flex align-items-center">
                  <img
                    class="imgstyle"
                    :src="
                      require(`@/assets/img/icons/${
                        isSelectedStats(stat.slug)
                          ? 'dashboardActiveIcons'
                          : 'dashboardStatsIcons'
                      }/${stat.key}.svg`)
                    "
                    alt="Docs"
                  />
                </div>
                <div
                  class="number_sty count fs-6 fw-light"
                  :style="
                    isSelectedStats(stat.slug) ? `color:white` : `color:black`
                  "
                >
                  {{ stat.count }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
    <hr v-if="hasCustomDashboard" />
    <el-row v-if="hasCustomDashboard && activeCustomDashboard" :gutter="25">
      <div v-if="!activeCustomDashboard.allTableComponents.length">
        <el-empty description="No tables configured"></el-empty>
      </div>
      <!-- :span="index == expendedIndex || getIsMobile ? 24 : 12" -->
      <el-scrollbar wrap-style="height: calc(100vh - 100px) !important;">
        <div class="wrapper-grid">
          <div
            v-for="(
              component, index
            ) in activeCustomDashboard.allTableComponents"
            :key="
              component.entity_id + '_' + component.keyValue + '_table_' + index
            "
            class="grid-item"
            :style="
              index == expendedIndex || getIsMobile ? 'grid-column: 1/3;' : ''
            "
          >
            <CustomDashboardTable
              v-if="component.type == 'TABLE'"
              :component="component"
              :entity_id="component.entity_id"
              :filter_id="component.filter_id"
              :index="index"
              @expendTable="expendTable"
              :hide_options="true"
            ></CustomDashboardTable>
            <CustomDashboardPieChart
              v-else-if="component.type == 'CHART'"
              :component="component"
              :hide_options="true"
              :hide_expend="true"
              :index="index"
              @expendTable="expendTable"
            ></CustomDashboardPieChart>
          </div>
        </div>
      </el-scrollbar>
    </el-row>
    <el-row :gutter="24" v-else>
      <el-col :xl="12" :lg="12" :md="8" :sm="12" :xs="12">
        <!-- <div class="d-flex justify-content-between align-items-center"> -->
        <h3 class="fw-medium blue-dark mb-3 fs-6">
          {{ `${getSelecetedDocStatus}` }}
        </h3>
      </el-col>
      <el-col
        v-if="
          !getIsMobile &&
          this.$route &&
          this.$route.query &&
          this.$route.query.type &&
          this.$route.query.type == 'company-documents' &&
          checkPermissionByPermissionName('viewDocument')
        "
        :xl="8"
        :lg="8"
        :md="8"
        :sm="12"
        :xs="12"
      >
        <el-select
          v-model="selected_company_user"
          filterable
          clearable
          class="select float-right"
          placeholder="Select Company User"
        >
          <el-option
            v-for="(status, index) in companyUsers"
            :key="index"
            :value="status.first_name + ' ' + status.last_name"
            :label="status.first_name + ' ' + status.last_name"
          ></el-option>
        </el-select>
      </el-col>
      <el-col
        v-if="
          !getIsMobile &&
          this.$route &&
          this.$route.query &&
          this.$route.query.type &&
          this.$route.query.type == 'company-documents'
        "
        :xl="4"
        :lg="4"
        :md="8"
        :sm="12"
        :xs="12"
      >
        <el-input
          class="search float-right mb-3 icon-search"
          placeholder="Search"
          v-model="search_string"
          clearable
        >
          <i class="el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col
        v-else
        :style="getIsMobile ? '' : 'margin-left:340px'"
        :xl="6"
        :lg="4"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <el-input
          class="search float-right mb-3 icon-search"
          placeholder="Search"
          v-model="search_string"
          clearable
        >
          <i class="el-icon-search"></i>
        </el-input>
      </el-col>
      <!-- </div> -->
      <el-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <DocumentsList
          page_size="5"
          :selectedDocStatus="selecetedDocStatus"
          :selected_company_user="selected_company_user"
          :search_string="search_string"
          @reloadDashboardStats="getDashboardStats"
        ></DocumentsList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DocumentsList from "@/components/companyDocuments/DocumentsList";
import PermissionsHelper from "@/mixins/permissionsHelper";
import MobileRelatedHelper from "@/mixins/MobileRelatedHelper";
// import config from "../config/app";
export default {
  name: "Dashboard",

  metaInfo() {
    return {
      title: "eSigns - Dashboard",
      meta: [
        {
          name: "description",
          content:
            "eSigns understands your business process better, faster, and quicker than the rest of the world to ensure hassle-free and paperless workflow management.",
        },
        {
          property: "og:title",
          content: "eSigns - Dashboard",
        },
        { property: "og:site_name", content: "eSigns" },
        { property: "og:type", content: "website" },
        { name: "robots", content: "index,follow" },
      ],
    };
  },
  props: ["pageSizes", "type", "categoryId", "groupId"],
  mixins: [PermissionsHelper, MobileRelatedHelper],
  components: {
    DocumentsList,
    CustomDashboardTable: () =>
      import("@/components/customDashboard/customDashboardTable.vue"),
    CustomDashboardStats: () =>
      import("@/components/customDashboard/customDashboardStats.vue"),
    CustomDashboardPieChart: () =>
      import("@/components/customDashboard/customDashboardPieChart.vue"),
    CustomDashboardFilters: () =>
      import("@/components/customDashboard/customDashboardFilters.vue"),
  },
  data() {
    return {
      statsLoading: false,
      selecetedDocStatus: "",
      search_string: "",
      selected_company_user: "",
      selectedDocTitle: "",
      companyUsers: [],
      activeDashboardStatics: [],
      DashboardStatsColor: [
        {
          key: "all_documents",
          background_color: "#FFDDE9",
          active_color: "#FF679D",
        },
        {
          key: "waiting_for_me",
          background_color: "#FFEEDE",
          active_color: "#FFA754",
        },
        {
          key: "waiting_for_others",
          background_color: "#FFFBD9",
          active_color: "#F2DD27",
        },
        {
          key: "approved",
          background_color: "#EDFCF6",
          active_color: "#52E5A4",
        },
        {
          key: "sent_docs",
          background_color: "#F0F4FF",
          active_color: "#668FFF",
        },
        {
          key: "draft_docs",
          background_color: "#F6F1E6",
          active_color: "#C9A362",
        },
        {
          key: "expired",
          background_color: "#FFE0E0",
          active_color: "#F37F7F",
        },
        {
          key: "expiring_soon",
          background_color: "#E4F5FC",
          active_color: "#6AD6FF",
        },
        { key: "voided", background_color: "#F2F1FB", active_color: "#8370D6" },
        {
          key: "declined",
          background_color: "#FFE8FF",
          active_color: "#FF85FF",
        },
        {
          key: "deleted",
          background_color: "#FFE8E8",
          active_color: "#FF8585",
        },
        {
          key: "completed",
          background_color: "#E8FFE8",
          active_color: "#85FF85",
        },
        {
          key: "company-documents",
          background_color: "#d4e6fc",
          active_color: "#245fa6",
        },
      ],
      selectedRoute: "",
      customDashboardsList: [],
      hasCustomDashboard: false,
      activeCustomDashboard: null,
      activeCustomDashboardId: "",
      expendedIndex: -1,
      refresh: false,
    };
  },
  computed: {
    getSelecetedDocStatus() {
      if (this.selecetedDocStatus === "waiting-for-me") {
        return "Documents Waiting for Me";
      }
      if (this.selecetedDocStatus === "waiting-for-others") {
        return "Documents Waiting for Others";
      }
      if (this.selecetedDocStatus === "all-documents") {
        return this.selectedDocTitle;
      }
      return this.selectedDocTitle + " " + "Documents";
    },
    ...mapGetters("dashboard", ["getAllDocumentsDashboardStats"]),
    ...mapGetters("auth", [
      "getAuthenticatedUser",
      "getActiveWorkspace",
      "getUserType",
    ]),
    ...mapGetters("navigationOpen", ["getIsMobile", "getIsRSOpen"]),
    ...mapGetters("settings", ["getUserDashboardStastics"]),
    ...mapGetters("documents", ["getAllCompanyUsers"]),
    ...mapGetters("customDashboard", ["getUserDashboardsList"]),
    ...mapGetters("companyTemplates", ["getAllCompanyTemplatesData"]),
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (
      this.getAuthenticatedUser &&
      this.getAuthenticatedUser.activeRole &&
      this.getAuthenticatedUser.activeRole.userType_id
    ) {
      this.fetchDashboardList();
    } else {
      this.getDashboardStats();
    }
  },
  methods: {
    ...mapActions({
      fetchNotifications: "dashboard/fetchNotifications",
      fetchUserDashboardStatics: "settings/fetchUserDashboardStatics",
      fetchAllDocumentsDashboardStats:
        "dashboard/fetchAllDocumentsDashboardStats",
    }),
    changeDashboard(tab) {
      this.refresh = true;
      this.changeCustomDashboard(tab.index);
    },
    expendTable(index) {
      if (this.expendedIndex !== index) {
        this.expendedIndex = index;
      } else {
        this.expendedIndex = -1;
      }
    },
    async fetchDashboardList() {
      await this.$store.dispatch(
        "customDashboard/fetchUserDashboardsList",
        this.getAuthenticatedUser.activeRole.userType_id
      );
      if (this.getUserDashboardsList && this.getUserDashboardsList.length) {
        this.customDashboardsList = [];
        this.customDashboardsList = this.getUserDashboardsList.filter(
          (e) => e.components.length
        );
        await this.$store.dispatch("companyTemplates/getAllCompanyTemplates", {
          get_all: true,
          include_standard: true,
        }),
          this.changeCustomDashboard(0);
        this.hasCustomDashboard = true;
      } else {
        this.getDashboardStats();
      }
    },
    changeCustomDashboard(index) {
      this.activeCustomDashboard = null;
      this.activeCustomDashboard = {
        name: this.customDashboardsList[index].name,
        allTableComponents: this.customDashboardsList[index].components.filter(
          (e) => e.type == "TABLE" || e.type == "CHART"
        ),
        allStatComponents: this.customDashboardsList[index].components.filter(
          (e) => e.type == "STAT"
        ),
        allCustomFilters: this.customDashboardsList[index].components
          .filter((e) => e.type == "CUSTOM_FILTER")
          .map((e) => {
            e.value = "";
            e.selected_filter = "";
            return e;
          }),
        keyValue: (Math.random() + 1).toString(36).substring(7),
      };
      const allEntities = [
        ...this.activeCustomDashboard.allTableComponents.flatMap(
          (e) => e.entity_id
        ),
        ...this.activeCustomDashboard.allStatComponents.flatMap(
          (e) => e.entity_id
        ),
        ...this.activeCustomDashboard.allCustomFilters.flatMap(
          (e) => e.entity_id
        ),
      ];
      this.activeCustomDashboard.allCustomFilters =
        this.activeCustomDashboard.allCustomFilters.filter(
          (e) => allEntities.indexOf(e.entity_id) !== -1
        );
      this.activeCustomDashboard.allTableComponents =
        this.activeCustomDashboard.allTableComponents.map((e) => {
          e.keyValue = (Math.random() + 1).toString(36).substring(7);
          return e;
        });
      this.activeCustomDashboard.allStatComponents =
        this.activeCustomDashboard.allStatComponents.map((e) => {
          e.keyValue = (Math.random() + 1).toString(36).substring(7);
          return e;
        });
      this.activeCustomDashboard.allCustomFilters =
        this.activeCustomDashboard.allCustomFilters.map((e) => {
          e.keyValue = (Math.random() + 1).toString(36).substring(7);
          return e;
        });
      this.activeCustomDashboardId = this.customDashboardsList[index]._id;
    },
    isSelectedStats(key) {
      if (key === this.selecetedDocStatus) {
        return true;
      } else {
        return false;
      }
    },
    getSelecetedDocumentStatus(stat) {
      this.selecetedDocStatus = stat.slug;
      this.selectedDocTitle = stat.title;
    },
    goToCreateDocument() {
      this.$router.push({ name: "upload-documents" });
    },
    async getDashboardStats() {
      this.statsLoading = true;
      let params = {};
      if (
        this.$router &&
        this.$router.currentRoute &&
        this.$router.currentRoute.query &&
        this.$router.currentRoute.query.type
      ) {
        this.selectedRoute = this.$router.currentRoute.query.type;
      }
      await Promise.all([
        this.fetchNotifications(),
        this.fetchUserDashboardStatics(),
        this.fetchAllDocumentsDashboardStats(),
      ]);
      params.company_id =
        this.getActiveWorkspace && this.getActiveWorkspace.company_id;
      await this.$store.dispatch("documents/fetchAllCompanyUsers", params);
      this.setDashboardStaticsData();
      let companyUserName = " ";
      let fullName =
        this.getAuthenticatedUser.first_name +
        " " +
        this.getAuthenticatedUser.last_name;
      if (this.getAllCompanyUsers && this.getAllCompanyUsers.data) {
        let companyUsersData = this.getAllCompanyUsers.data;
        this.companyUsers = companyUsersData.filter((el) => {
          companyUserName = el.first_name + " " + el.last_name;
          return companyUserName != fullName;
        });
      }
      this.statsLoading = false;
    },
    setDashboardStaticsData() {
      if (
        this.getUserDashboardStastics &&
        this.getUserDashboardStastics.data &&
        this.getAllDocumentsDashboardStats &&
        this.getAllDocumentsDashboardStats.length
      ) {
        let data = this.getUserDashboardStastics.data;
        data.map((stat) => {
          this.getAllDocumentsDashboardStats.forEach((el) => {
            if (stat.key == el.key) {
              stat.count = el.count;
            }
          });
        });

        let activeDashboardStatics = data.filter((element) => {
          return element.status === true;
        });
        //logic for dashboard stats color change
        activeDashboardStatics.map((stat) => {
          this.DashboardStatsColor.forEach((color) => {
            if (color.key == stat.key) {
              stat.background_color = color.background_color;
              stat.active_color = color.active_color;
            }
          });
        });

        this.activeDashboardStatics = activeDashboardStatics;
        if (this.activeDashboardStatics.length) {
          if (this.selectedRoute) {
            let statRoute = this.activeDashboardStatics.find(
              (e) => e && e.slug == this.selectedRoute
            );
            //console.log("statRoute",statRoute)
            if (statRoute) {
              this.getSelecetedDocumentStatus(statRoute);
            } else {
              this.getSelecetedDocumentStatus(this.activeDashboardStatics[0]);
            }
          } else {
            this.getSelecetedDocumentStatus(this.activeDashboardStatics[0]);
          }
        }
        // console.log("activeDashboardStatics")
      }
    },

    goToDocView(document) {
      if (document) {
        if (
          document.document_status == "SENT" ||
          document.document_status == "COMPLETED"
        ) {
          this.$router.push({
            name: "employee-documents-custom-document",
            params: {
              employee_document_id: document._id,
            },
          });
        } else {
          this.$router.push({
            name: "employee-documents-custom-document-edit",
            params: {
              employee_document_id: document._id,
            },
          });
        }
      }
    },
  },
  beforeDestroy() {
    console.log("Before destroy called");
    // this.$store.commit("dashboard/resetDashboardData", null, { root: true });
    this.$store.commit("dashboard/setAllDocumentsDashboardStats", null, {
      root: true,
    });
    // var data = JSON.parse(
    //   localStorage.getItem(config.APP_NAME + "_" + config.APP_VERSION)
    // );
    // // await localStorage.removeItem(data.auth);
    // data.allDocumentsDashboardStats = {};
    // localStorage.setItem(config.APP_NAME + "_" + config.APP_VERSION, data);

    // setTimeout(() => {
    //   console.log("DATA", data.auth);
    // }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.dashboard-filters {
  height: 50px;
}
.wrapper-grid {
  display: grid !important;
  // grid-template-columns: 1fr, 1fr !important;
  grid-template-columns: 50% 50%;
  column-gap: 10px;
  row-gap: 1em;
  padding: 25px;
}
// .el-card {
//   margin-top: 10% !important;
// }

.dashboard {
  .stats-container {
    // height:85px;
    margin-bottom: 1.25em;
    // display: flex;
    gap: 30px;
    .card {
      margin-right: 5px;
      margin-bottom: 5px;
      width: 165px;
      height: 69px;
      border-radius: 10px;
      min-width: 170px;

      cursor: pointer;
      border-color: #e3eafd;
      &:hover {
        background-color: #f4f7ff;
      }
      &.active {
        background-color: #ebeffd;
        border-color: #d2dcfa;
      }
    }
    .latest-updates {
      font-size: 0.85em;
    }
  }
  .icon-block {
    display: flex;
    gap: 10px;
    .icon-file {
      max-width: 20px;
      display: inline;
    }
  }
  .search {
    border-radius: 5px;
    border: none !important;
    //box-shadow: 3px 3px 3px 0.5px rgba(0,0,0,0.1);
  }
  .vue-data-table-default {
    .title {
      letter-spacing: 0.019em;
    }
    .circle {
      position: relative;
      padding-left: 20px;
      text-transform: capitalize;
      font-size: 14px;
      &::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 0;
        height: 10px;
        width: 10px;
        display: inline-block;
        border-radius: 50%;
      }
      &.completed::after {
        background: #08ad36;
      }
      &.draft::after {
        background: #f19203;
      }
      &.sent::after {
        background: #2f80ed;
      }
      &.active::after {
        background: #635e5e;
      }
    }
  }
  .notification-box {
    .list-group-flush > .list-group-item {
      border-width: 0 0 1px;
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
      padding: 0;
      display: grid;
      grid-template-columns: 2.75em 1fr;
      gap: 15px;
      padding: 10px 0;
      .item-avatar {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #f754a2;
        background-color: rgba(#f754a2, $alpha: 0.1);
        color: #f754a2;
      }
      .item-body {
        .name {
          margin-bottom: 0;
        }
      }
    }
  }
}
.Title_sty {
  font-size: 12px;
  margin-left: -20px;
  margin-top: -10px;
}
.imgstyle {
  width: 25%;
  margin-left: 100px;
  margin-top: -18px;
  @media (max-width: 399.98px) {
    width: 36px;
    margin-top: -19px;
  }
}
.number_sty {
  margin-top: -35px;
  margin-left: -10px;
}
</style>
