<template>
  <section class="company-benefits-view">
    <div class="inner-navbar">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="left-block">
            <div class="icon-block">
              <div class="icon">
                <img
                  src="@/assets/img/icons/menu/benefits-2.svg"
                  alt="icon"
                  class="img-fluid"
                />
              </div>
              <div class="icon-text">
                <h3>Company Benefits</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right-block float-right pt-1">
            <el-button type="success" plain @click="addBenefitVisible = true">
              <span class="el-icon-circle-plus pr-1"></span>ADD BENEFITS
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="inner-navbar-content top">
      <div class="vue-data-table-default" v-loading="loading">
        <data-tables-server
          v-if="allBenefits && allBenefits.length"
          :data="allBenefits"
          :total="total"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :pagination-props="paginationProps"
          @query-change="loadData"
          style="width: 100%"
        >
          <el-table-column label="S.No" width="90" align="center">
            <template slot-scope="scope">{{ ((currentPage -1) * pageSize) + (scope.$index + 1)}}</template>
          </el-table-column>
          <el-table-column prop="title" label="Title" width="280"></el-table-column>
          <el-table-column prop="description" label="Description">
            <template slot-scope="scope">
                <p class="text-grey-sm mt-0 mb-0">{{ scope.row.description }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="group" label="Group" width="200" class="text-left"></el-table-column>
          <el-table-column prop="action" label="Action" width="120" fixed="right">
            <template slot-scope="scope">
              <ul class="action-buttons">
                <li>
                  <el-button @click="onEdit(scope.row)">
                    <img src="@/assets/img/icons/create.svg" alt="icon" />
                  </el-button>
                </li>
                <li>
                  <el-button @click="onDelete(scope.row)">
                    <img src="@/assets/img/icons/delete.png" alt="icon" />
                  </el-button>
                </li>
              </ul>
            </template>
          </el-table-column>
        </data-tables-server>
      </div>
      <div class="vue-modal">
        <el-dialog title="Add Benefit" :visible.sync="addBenefitVisible" width="40%">
          <AddBenefits
            v-if="addBenefitVisible"
            :isEdit="false"
            v-on:benefit-added="this.closeAddBenefit"
          ></AddBenefits>
        </el-dialog>
        <el-dialog title="Edit Benefit" :visible.sync="updateBenefitVisible" width="40%">
          <AddBenefits
            v-if="updateBenefitVisible"
            :isEdit="true"
            :selected-benefit-data="this.selectedBenefit"
            v-on:benefit-updated="this.closeUpdateBenefit"
          ></AddBenefits>
        </el-dialog>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import AddBenefits from "./AddBenefits";
export default {
  name:"Global-CompanyBenefits",
  computed: {
    ...mapGetters("companyBenefits", [
      "getAllBenefits",
      "getBenefitDeleteStatus",
      "getBenefitErrors"
    ]),
    paginationProps() {
      return {
        pageSizes: this.pageSizes || [10, 15, 20]
      };
    }
  },

  components: {
    AddBenefits
  },

  mounted() {
    this.fetchAllBenefits();
  },
  data() {
    return {
      allBenefits: [],
      currentPage: 1,
      limit: 5,
      pageSize: 5,
      total: 0,
      addBenefitVisible: false,
      updateBenefitVisible: false,
      selectedBenefit: null,
      loading: false
    };
  },
  methods: {
    async fetchAllBenefits() {
      this.loading = true;
      let params = {
        page: this.currentPage,
        limit: this.pageSize
      };
      await this.$store.dispatch("companyBenefits/getBenefits", params);
      this.loading = false;
      this.total = this.getAllBenefits.total;
      this.allBenefits = this.getAllBenefits.data;
    },
    async loadData(data) {
      if (this.allBenefits && this.allBenefits.length) {
        this.pageSize = data.pageSize;
        this.page = data.page;
        await this.fetchAllBenefits();
      }
    },

    async refreshBenefits() {
      this.pageSize = 10;
      this.currentPage = 1;
      await this.fetchAllBenefits();
    },
    closeAddBenefit() {
      this.addBenefitVisible = false;
      this.refreshBenefits();
    },
    closeUpdateBenefit() {
      this.updateBenefitVisible = false;
      this.refreshBenefits();
    },
    onEdit(benefit) {
      this.selectedBenefit = benefit;
      this.updateBenefitVisible = true;
    },

    async onDelete(benefit) {
      this.$confirm("Are you sure to delete the Benifit?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        this.deleteBenefit(benefit);
      });
    },
    async deleteBenefit(benefit) {
      await this.$store.dispatch("companyBenefits/deleteBenefit", {
        id: benefit._id
      });
      if (this.getBenefitDeleteStatus) {
        this.$notify.success({
          title: "Success",
          message: "Benifit deleted successfully"
        });
        this.refreshBenefits();
      } else {
        this.$notify.error({
          title: "Error",
          message: this.getBenefitErrors.critical_error
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>