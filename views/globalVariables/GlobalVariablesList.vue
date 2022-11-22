<template>
  <section id="global-variables-list">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="mb-05">
        <el-breadcrumb-item> <a @click="goToDashBoard()">Dashboard</a></el-breadcrumb-item>
        <el-breadcrumb-item>Global Variables</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col :xl="16" :lg="16" :md="8" :sm="8" :xs="8">
          <h2 class="h2 f-weight-400 mt-0">Global Variables</h2>
        </el-col>
        <el-col  :xl="4" :lg="4" :md="8" :sm="8" :xs="8">
          <!-- <el-form :inline="true"  @keypress="event.keyCode != 13" class="demo-form-inline text-right mb-0">
            <el-form-item class="mb-0"> -->
              <el-input
                placeholder="Search by name"
                v-model="search_string"
                @clear="onChangeSearchString"
                @keyup.enter.native="fetchAllGlobalVariables()"
                size="medium"
                clearable
                class="inputbtn"
              >
                <el-button
                  slot="append"
                  size="medium"
                  @click="searchFilter"
                  :disabled="disableSearchButton()"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            <!-- </el-form-item> -->
            
          <!-- </el-form> -->
        </el-col>
         <el-col  :xl="4" :lg="4" :md="8" :sm="8" :xs="8">
            <router-link
              class="el-button el-button--primary el-button--medium mb-1 btn"
              to="/global-variables/add"
              >NEW VARIABLE</router-link
            >
             </el-col>
      </el-row>
    <el-tabs
      class="items-container sidemenu"
      v-model="selectedTab"
      :tab-position="tabPosition"
      @tab-click="onClickPanel"
      style="max-height: calc(100vh - 220px)"
      v-loading="loading"
    
    >
      <el-tab-pane label="All Categories" name="All Categories" >
        <div class="inner-wrap-items ">
          <el-row :gutter="15">
            <el-col :span="8" v-for="(variable, index) of data" :key="index">
              <el-card shadow="hover" class="single-cell el-card-15">
                <h4 class="h4 f-weight-500 mb-05">{{ variable.label }} </h4>
                <div class="d-flex justify-between">
                  <el-tag size="small">{{ variable.input_type }}</el-tag>
                  <div class="action-block">
                    <el-button
                      icon="el-icon-view"
                      @click="onEdit(variable)"
                      type="warning"
                      plain
                      circle
                      size="mini"
                    ></el-button>
                    <el-button
                      icon="el-icon-delete"
                      @click="onDelete(variable)"
                      type="danger"
                      plain
                      circle
                      size="mini"
                    ></el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-pagination
          @size-change="loadData"
          @current-change="loadData"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane
      
        :label="getTabLabelName(type)"
        :name="getTabLabelName(type)"
        v-for="(type, index) of getAllGlobalVariableTypes.data"
        v-bind:key="index"
      >
        <el-row :gutter="15">
          <el-col :span="8" v-for="(variable, index) of data" :key="index">
            <el-card shadow="hover" class="single-cell el-card-15">
              <h4 class="h4 f-weight-500 mb-05">{{ variable.label }}</h4>
              <div class="d-flex justify-between">
                <el-tag size="small">{{ variable.input_type }}</el-tag>
                <div class="action-block">
                  <el-button
                    icon="el-icon-view"
                    @click="onEdit(variable)"
                    type="warning"
                    plain
                    circle
                    size="mini"
                  ></el-button>
                  <el-button
                    icon="el-icon-delete"
                    @click="onDelete(variable)"
                    type="danger"
                    plain
                    circle
                    size="mini"
                  ></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- Display None (D-NONE) -->
    <div class="inner-navbar-content top d-none">
      <div class="vue-data-table-default">
        <data-tables-server
          :data="data"
          :total="total"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :pagination-props="paginationProps"
          @query-change="loadData"
          v-loading="loading"
        >
          <el-table-column
            label="Variable"
            id="category"
            width="300"
            fixed="left"
          >
            <template slot-scope="scope">{{ scope.row.label }}</template>
          </el-table-column>

          <el-table-column label="Type" id="name" width="240">
            <template slot-scope="scope">{{ scope.row.input_type }}</template>
          </el-table-column>

          <el-table-column label="Data" id="name" min-width="240">
            <template slot-scope="scope">{{ scope.row.value }}</template>
          </el-table-column>

          <el-table-column
            prop="action"
            label="Action"
            fixed="right"
            width="120"
          >
            <template slot-scope="scope">
              <ul class="action-buttons">
                <li>
                  <el-button>
                    <img
                      src="@/assets/img/icons/visibility.svg"
                      alt="icon"
                      @click="onView(scope.row)"
                    />
                  </el-button>
                </li>
                <li>
                  <el-button>
                    <img
                      src="@/assets/img/icons/delete.png"
                      alt="icon"
                      @click="onDelete(scope.row)"
                    />
                  </el-button>
                </li>
              </ul>
            </template>
          </el-table-column>
        </data-tables-server>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GlobalVariablesList",
  components: {},
  data() {
    return {
      loading: false,
      total: 0,
      currentPage: 1,
      pageSize: 0,
      data: [],
      tabPosition: "left",
      globelVariableType: "",
      search_string: "",
      selectedTab: "All Categories",
    };
  },
  computed: {
    ...mapGetters("globalVariables", [
      "getAllGlobalVariables",
      "getGlobalVariableDeleteStatus",
      "getGlobalVariableAddStatus",
      "getGlobalVariableDeleteError",
      "getUserDeleteError", 
      "getAllGlobalVariableTypes",
    ]),
    paginationProps() {
      return {
        pageSizes: this.pageSizes || [10, 20, 50],
      };
    },
    queryType() {
      return this.$route.query.type || this.selectedTab;
    },
  },
  async mounted() {
   this.fetchAllGlobalVariableTypes();
    let limit = this.pageSize > 0 ? this.pageSize : 10
    this.pageSize = limit;
    if (this.getGlobalVariableAddStatus && this.$route && this.$route.query && this.$route.query.type && this.globelVariableType && this.$route.query.type === this.globelVariableType) {
      this.selectedTab = this.queryType;
    }
    
    // if (this.$route.query.search) {
    //   this.searchString = this.$route.query.search;
    // }
    this.fetchAllGlobalVariables();
  },
  methods: {
    goToDashBoard(){
      this.$router.push({
        path:"/"
    })
    },
    async fetchAllGlobalVariableTypes() {
      await this.$store.dispatch("globalVariables/fetchGlobalVariableTypes");
    },
    async onChangeSearchString() {
      await this.fetchAllGlobalVariables();
    },
    onEdit(variable) {
      // this.selectedOfferLetterTemplate = variable;
      // this.editDailogVisible = true;
      this.$router.push({
        name: "UpdateGlobalVariable",
        params: {
          global_variable_id: variable._id,
        },
      });
    },
    async onView(row) {
      this.$router.push({
        name: "UpdateGlobalVariable",
        params: {
          global_variable_id: row._id,
        },
      });
    },
    async onDelete(variable) {
      this.$confirm("Are you sure to delete the Global Variable?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(async () => {
        await this.deleteGlobalVariable(variable);
      });
    },
    assignGlobalVariableType(item) {
      if (item != "All Categories") {
        this.globelVariableType = item;
        this.fetchAllGlobalVariables();
      } else {
        this.globelVariableType = "";
        this.fetchAllGlobalVariables();
      }
      console.log("this.globelVariableType",this.globelVariableType)
    },
    onClickPanel(tab) {
      this.loading = true;
      this.selectedTab = tab.label;
      let params = {};
      this.search_string = "";
      if (tab.label != "All Categories") {
        params["type"] = tab.label;
        this.$router
          .push({
            path: "/global-variables",
            query: params,
          })
          this.fetchAllGlobalVariables()
          .catch(() => {});
      } else {
        this.$router
          .push({
            path: "/global-variables",
            query: params,
          })
           this.fetchAllGlobalVariables()
          .catch(() => {});
      }
    },

    async deleteGlobalVariable(data) {
      await this.$store.dispatch("globalVariables/deleteGlobalVariable", {
        id: data._id,
      });

      if (this.getGlobalVariableDeleteStatus) {
        this.currentPage = 1;
        this.$notify.success({
          title: "Success",
          message: "Global variable deleted successfully",
        });

        this.fetchAllGlobalVariables();
      } else {
        this.$notify.error({
          title: "Error",
          message:
            this.getUserDeleteErr || "This Global Varible Is Already Used In Templates",
        });
      }
    },

    async fetchAllGlobalVariables() {
      this.loading = true;
      this.data = [];
      let params = {
        page:this.currentPage,
        limit: this.pageSize,
        order_by: "updated_at",
        order_type: "desc",
      };
      if (this.globelVariableType) {
        params["global_variable_type"] = this.globelVariableType;
      }
      if (this.search_string) {
        params["search_string"] = this.search_string;
      }
      await this.$store.dispatch(
        "globalVariables/fetchGlobalVariables",
        params
      );
      
      this.loading = false;
      this.currentPage = this.getAllGlobalVariables.page ? parseInt(this.getAllGlobalVariables.page) : 1;
      this.total = this.getAllGlobalVariables.total || 0;
      this.data = this.getAllGlobalVariables.data || [];
    },
  
    getTabLabelName(type) {
      return type.split("_").join(" ");
    },

    async loadData(data) {
      if (this.data && this.data.length) {
        this.pageSize = data.pageSize ? data.pageSize : 10;
        this.page = data.page;

        await this.fetchAllGlobalVariables();
      }
    },
    searchFilter() {
      let params = {};
      if (this.$route.query.type) {
        params["type"] = this.$route.query.type;
      }
      if (this.search_string) {
        params["search"] = this.search_string;
        this.$router
          .push({
            path: "/global-variables",
            query: params,
          });
      }
      this.fetchAllGlobalVariables();
    },
    disableSearchButton() {
      if (this.$route.query.search == this.search_string) {
        return true;
      } else if (!this.search_string) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    queryType() {
      this.assignGlobalVariableType(this.queryType);
      this.selectedTab = this.queryType
      this.fetchAllGlobalVariables()
    },
     search_string: function (val) {
      this.search_string = val;
      this.fetchAllGlobalVariables()
    },
  },
};
</script>

<style lang="scss" scoped>
#global-variables-list {
  width: 95%;
  margin: 0 auto;
  .single-cell {
    margin-bottom: 15px !important;
    background-color: #fff;
    background-clip: border-box;
    border: 0.0625rem solid rgba(231, 234, 243, 0.7);
    background-color: rgba(255, 255, 255, 43%);
    border-radius: 0.45rem;
    &:hover {
      border-color: #ffffff;
      box-shadow: 0 3px 6px rgba(140, 152, 164, 0.075);
    }
  }
}
.sidemenu{
  height: 420px;
  overflow-y: scroll;
  overflow-x: scroll;
  border-top:1px ridge;
  border-left: 1px ridge;
  border-bottom: 1px ridge;
  margin-right: 5px;
}
.sidemenu::-webkit-scrollbar {
   width: 0.7em;
}
.sidemenu::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    background: #e1e1e1;
    -webkit-box-shadow: inset 0 0 6px rgba(172, 169, 169, 0.9); 
}
.sidemenu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px #F5F5F5; 
    background-color: #F5F5F5;

}
.doc {
  min-width: 30px;
  &.selected {
    background: green;
  }
}

.green {
  color: green;
}

.font-17 {
  font-size: 17px;
  cursor: pointer;
}

.documents {
  min-height: 200px;
  max-height: 400px;
  overflow: scroll;
}
.btn{
  margin-left:40px;
}


</style>
