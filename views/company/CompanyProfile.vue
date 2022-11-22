<template>
  <section class="company-profile-block">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <div class="vue-tabs">
          <el-tabs v-model="tabName">
            <el-tab-pane label="Primary Details" name="primary_details">
              <CompanyPrimaryDetails v-if="tabName == 'primary_details'"></CompanyPrimaryDetails>
            </el-tab-pane>
            <el-tab-pane label="Business Details" name="business_details">
              <CompanyBusinessDetails v-if="tabName == 'business_details'"></CompanyBusinessDetails>
            </el-tab-pane>
            <el-tab-pane class="custom-tab-pane" label="Address Details" name="address_details">
              <CompanyAddressDetails v-if="tabName == 'address_details'"></CompanyAddressDetails>
            </el-tab-pane>
            <el-tab-pane class="custom-tab-pane" label="Authorized Signatures" name="authorized_signatures">
              <CompanyAuthorizedSignatures v-if="tabName == 'authorized_signatures'"></CompanyAuthorizedSignatures>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CompanyPrimaryDetails from "../../components/company/CompanyPrimaryDetails";
import CompanyBusinessDetails from "../../components/company/CompanyBusinessDetails";
import CompanyAddressDetails from "../../components/company/CompanyAddressDetails";
import CompanyAuthorizedSignatures from "../../components/company/CompanyAuthorizedSignatures";
export default {
  name: "CompanyProfile",
  components: {
    CompanyPrimaryDetails,
    CompanyBusinessDetails,
    CompanyAddressDetails,
    CompanyAuthorizedSignatures
  },
  computed: {
    ...mapGetters("company", ["getCompanyProfileData"])
  },

  data() {
    return {
      tabName: null,
      loading: false
    };
  },
  created() {},
  mounted() {
    this.fetchCompanyDetails();
  },

  methods: {
    async fetchCompanyDetails() {
      this.tabName = "primary_details";
    }
  }
};
</script>

<style lang="scss">
.company-profile-block {
}
.custom-tab-pane {
  background-color: transparent!important;
  box-shadow: none!important;
  padding: 0!important;
}
</style>
