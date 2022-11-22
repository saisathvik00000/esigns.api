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
                  <h3>Employee Documents</h3>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-form :inline="true" class="demo-form-inline text-right">
              <el-form-item>
                <h3 class="font-weight-medium mr-1">Search Employees</h3>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="userId"
                  @change="updateEmployeeDetails"
                  placeholder="Type Emp Name or Id"
                  prefix-icon="el-icon-search"
                  filterable
                >
                  <el-option
                    v-for="(user,index) of getAllUsers"
                    :key="index"
                    :value="user._id"
                    :label="user.email"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="main-content-section">
        <div class="inner-wrap">
          <div class="employee-details">
            <h4 class="card-title">
              <i class="el-icon-info"></i> Employee Information
            </h4>
            <el-card shadow="never">
              <div>
                <p class="d-inline-block each-cell">
                  <span class="label">Employee Name</span>
                  -
                </p>
                <el-divider direction="vertical"></el-divider>
                <p class="d-inline-block each-cell">
                  <span class="label">Email Address</span>
                  {{userDetails.email}}
                </p>
                <el-divider direction="vertical"></el-divider>
                <p class="d-inline-block each-cell">
                  <span class="label">Contact Number</span>
                  + 055 239 3203
                </p>
                <el-divider direction="vertical"></el-divider>
                <p class="d-inline-block each-cell">
                  <span class="label">DOB</span>
                  27-02-1993
                </p>
                <el-divider direction="vertical"></el-divider>
                <p class="d-inline-block each-cell">
                  <span class="label">Gender</span>
                  Male
                </p>
                <el-divider direction="vertical"></el-divider>
                <p class="d-inline-block each-cell">
                  <span class="label">Address</span>
                  3 Thompson St., Utica, NEWYORK
                </p>
              </div>
            </el-card>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="emp-document-tabs-2 relation-top">
                <ul>
                  <li>
                    <router-link :to="'/employee-documents/employee/'+employeeId">
                      All Documents
                      <span class="count">50</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="'/employee-documents/employee/'+ employeeId +'/all-categories'"
                      :class="getActiveClassForCategories"
                    >
                      Categories
                      <span class="count">13</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="'/employee-documents/employee/'+ employeeId +'/all-groups'"
                      :class="getActiveClassForGroups"
                    >
                      Groups
                      <span class="count">13</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="document-tabs-content">
                <router-view></router-view>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog title="Select User" :visible.sync="selectUserDailogVisible" width="35%">
      <el-row>
        <el-col :span="22">
          <el-form ref="form" class="basic-form" label-width="100px">
            <div class="form-group">
              <el-form-item label="Select User">
                <el-select v-model="userId" filterable>
                  <el-option
                    v-for="(user,index) of getAllUsers"
                    :key="index"
                    :value="user._id"
                    :label="user.email"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item class="mb-0">
              <el-button type="primary" @click="addUserDetails">
                <i class="el-icon-plus"></i> Get User Documents
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name:"Single-Employee-Documents",
  data() {
    return {
      formInline: {
        user: "",
        input2: ""
      },
      userId: "",
      userDetails: {},
      selectUserDailogVisible: false
    };
  },

  computed: {
    ...mapGetters("employee", ["getEmployeeList", "getSingleEmployeeData"]),

    employeeId() {
      return this.$route.params.employee_id;
    },
    getAllUsers() {
      return this.getEmployeeList && this.getEmployeeList.data
        ? this.getEmployeeList.data
        : [];
    },

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

  mounted() {
    this.checkEmployeeData();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick() {
      console.log("click");
    },
    async checkEmployeeData() {
      await this.getUsers();
      if (!this.employeeId) {
        this.selectUserDailogVisible = true;
      } else {
        this.userId = this.employeeId;
        this.userDetails = this.getAllUsers.find(x => x._id == this.userId);
      }
    },
    async getUsers() {
      await this.$store.dispatch("employee/getAllEmployee", { get_all: true });
    },
    addUserDetails() {
      this.selectUserDailogVisible = false;

      let urlData = this.$router.resolve({
        path: "/employee-documents/employee/" + this.userId
      });
      window.location.href = urlData.href;
    },
    updateEmployeeDetails() {
      this.addUserDetails();
    }
  },
  watch: {
    "$route.params.employee_id"() {
      this.userId = this.$route.params.employee_id;
    }
  }
};
</script>

<style lang="scss" scoped>
#employee-documents-view {
  max-width: 1250px;
  display: table;
  margin: 0 auto;
  .header-action-block {
    margin-bottom: 1em;
  }
  .vue-table-static {
    box-shadow: 0 0px 2px 1px #1b487e21;
    border-radius: 2px;
  }
  .employee-details {
    position: relative;
    margin-bottom: 1.5em;
    .card-title {
      position: absolute;
      top: -1em;
      left: 2em;
      display: inline-block;
      padding: 1px 8px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 0.85em;
      background-color: #e4e4ff;
    }
    .each-cell {
      margin: 0 1em 0 0;
      padding: 0 0 0 1em;
      .label {
        display: block;
        font-size: 0.85em;
        color: #a7a7a7;
      }
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
}
</style>
