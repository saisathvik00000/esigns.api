<template>
  <div>
    <AllCategoriesList></AllCategoriesList>
  </div>
</template>

<script>
import AllCategoriesList from "../../components/employeeDocuments/AllCategoriesList";
export default {
  name:"AllEmployeeDocumentCategories",
  components: {
    AllCategoriesList
  },
  data() {
    return {};
  },
  computed: {
    type() {
      return this.$route.path.indexOf("custom") > -1 ? "CUSTOM" : "STATIC";
    }
  }
};
</script>

<style>
</style>