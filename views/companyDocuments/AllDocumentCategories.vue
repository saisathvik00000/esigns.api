<template>
  <div>
    <AllCategoriesList :type="type"></AllCategoriesList>
  </div>
</template>

<script>
import AllCategoriesList from "../../components/companyDocuments/AllCategoriesList";
export default {
  name:"All-Document-Categories",
  components: {
    AllCategoriesList
  },
  data() {
    return {};
  },
  computed: {
    type() {
      if (this.$route.path.indexOf("custom") > -1) {
        return "CUSTOM";
      } else if (this.$route.path.indexOf("requested") > -1) {
        return "REQUESTED";
      } else {
        return "STATIC";
      }
    }
  }
};
</script>

<style>
</style>