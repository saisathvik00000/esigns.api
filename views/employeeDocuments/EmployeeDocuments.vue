<template>
  <section id="employee-documents-view">
    <div class="inner-navbar">
      <div class="header-action-block">
        <el-row>
          <el-col :span="8">
            <div class="left-block">
              <div class="icon-block">
                <div class="icon">
                  <img
                    src="@/assets/img/icons/menu/employee-documents.svg"
                    alt="icon"
                    class="img-fluid"
                  />
                </div>
                <div class="icon-text">
                  <h3>All Employees Documents</h3>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-form :inline="true" :model="formInline" class="demo-form-inline text-right">
              <el-form-item>
                <h3 class="font-weight-medium mr-1">Filter By</h3>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.user" placeholder="Select Category">
                  <el-option label="Employee Onboarding" value="shanghai"></el-option>
                  <el-option label="I9 Form" value="beijing"></el-option>
                  <el-option label="W4 Form" value="beijing"></el-option>
                  <el-option label="Employee Contract" value="beijing"></el-option>
                  <el-option label="Experience" value="beijing"></el-option>
                  <el-option label="E-Signature Form" value="beijing"></el-option>
                  <el-option label="Offer Letter" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formInline.region" placeholder="Select Group">
                  <el-option label="W2" value="shanghai"></el-option>
                  <el-option label="W4" value="beijing"></el-option>
                  <el-option label="I9" value="beijing"></el-option>
                  <el-option label="Offer Letter" value="beijing"></el-option>
                  <el-option label="Guidelines" value="beijing"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-select v-model="formInline.region" placeholder="Select User">
                  <el-option label="EMPLOYEE" value="shanghai"></el-option>
                  <el-option label="VENDOR" value="beijing"></el-option>
                  <el-option label="CUSTOMER" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="gotoEmployeeDocuments">Employee Wise</el-button>
              </el-form-item>-->
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="main-content-section">
        <div class="inner-wrap">
          <el-row :gutter="20">
            <el-col :span="14">
              <div class="emp-document-tabs-2 relation-top">
                <ul>
                  <li>
                    <router-link :to="'/employee-documents'">
                      All Documents
                      <span class="count">50</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="'/employee-documents/all-categories'"
                      :class="getActiveClassForCategories"
                    >
                      Categories
                      <span class="count">13</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="'/employee-documents/all-groups'"
                      :class="getActiveClassForGroups"
                    >
                      Groups
                      <span class="count">13</span>
                    </router-link>
                  </li>
                </ul>
              </div>

              <router-view></router-view>
            </el-col>
            <el-col :span="10">
              <RecentActivitiesList></RecentActivitiesList>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </section>
</template>

 <script>
import { mapGetters } from "vuex";
import RecentActivitiesList from "./../../components/employeeDocuments/RecentActivitiesList";
export default {
  name:"Employee-Documents",
  computed: {
    ...mapGetters("employeeDocuments", ["getEmployeeAllDocuments"]),

    getActiveClassForGroups() {
      if (this.$route.path.indexOf("/all-groups") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },
    getActiveClassForCategories() {
      if (this.$route.path.indexOf("/all-categories") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    }
  },

  components: {
    RecentActivitiesList
  },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          document_name: "Employee Passport",
          employee_name: "Anish Kumar Gupta",
          verification_status: "Verified",
          expiredby: "2016-05-03",
          tag: "Home"
        },
        {
          document_name: "Resideny Application",
          employee_name: "Atulkumar Bedre",
          verification_status: "Signature Pending",
          expiredby: "2016-05-03",
          tag: "Office"
        },
        {
          document_name: "Direct Deposit Form",
          employee_name: "Natalisa Kendya",
          verification_status: "Verified",
          expiredby: "2016-05-03",
          tag: "Home"
        },
        {
          document_name: "Health Insurance",
          employee_name: "Sundar Aluri",
          verification_status: "Pending",
          expiredby: "2016-05-03",
          tag: "Office"
        },
        {
          document_name: "Flexible Spending Account",
          employee_name: "John Wesley Charpir",
          verification_status: "Pending",
          expiredby: "2016-05-03",
          tag: "Home"
        },
        {
          document_name: "Retirement benefit 401",
          employee_name: "Dasari Suresh Babu",
          verification_status: "Verified",
          expiredby: "2016-05-03",
          tag: "Office"
        },
        {
          document_name: "W4 Form",
          employee_name: "Sundar Aluri",
          verification_status: "Verified",
          expiredby: "2016-05-03",
          tag: "Office"
        }
      ]
    };
  },
  mounted() {
    // this.fetchEmployeeDocuments();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick() {
      console.log("click");
    },
    gotoEmployeeDocuments() {
      this.$router.push({ name: "SingleEmployeeDocuments" });
    }
  }
};
</script>

<style lang="scss" scoped>
#employee-documents-view {
  width: 100%;
  display: table;
  margin: 0 auto;
  .header-action-block {
    margin-bottom: 1em;
  }
  .vue-table-static {
    box-shadow: 0 0px 2px 1px #1b487e21;
    border-radius: 2px;
  }
}
.emp-document-tabs-2 {
  &.relation-top {
    position: relative;
    top: -1px;
    z-index: 100;
  }
  ul {
    display: inline-flex;
    padding: 0px;
    li {
      &:not(:last-child) {
        margin-right: 0.5em;
      }
      .router-link-exact-active {
        background: #285fd3;
        color: #fff;
        box-shadow: none;
        span.count {
          background-color: rgba(0, 0, 0, 0.2);
          color: #ffffff;
        }
      }
      a {
        cursor: pointer;
        padding: 0.5em 1.25em;
        display: inline-block;
        transition: all 0.3s ease-in-out;
        border-radius: 5px 5px 0 0;
        text-transform: uppercase;
        color: #404040;
        font-size: 1em;
        font-weight: 500;
        background-color: #ffffff;
        box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
        span.count {
          background-color: rgba(0, 0, 255, 0.1);
          color: #334455;
          padding: 1px 5px;
          margin-left: 10px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
