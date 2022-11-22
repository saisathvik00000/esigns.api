<template>
  <div>
    <CompanyDocuments type="REQUESTED"></CompanyDocuments>
  </div>
</template>

<script>
import CompanyDocuments from "@/views/companyDocuments/CompanyDocuments";
export default {
  name: "RequestedDocumentsList",
  components: {
    CompanyDocuments
  },
  data() {
    return {
      dialogVisible: false,
      showTable: true
    };
  },
  methods: {
    handleDocumentAdd() {
      this.refreshTable();
    },
    handleDocumentUpdate() {
      this.refreshTable();
    },
    refreshTable() {
      this.showTable = false;
      setTimeout(() => {
        this.showTable = true;
      });
    }
  }
};
</script>

<style>
</style>