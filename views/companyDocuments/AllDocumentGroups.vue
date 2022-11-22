<template>
  <div>
    <AllGroupsList :type="type"></AllGroupsList>
  </div>
</template>

<script>
import AllGroupsList from "../../components/companyDocuments/AllGroupsList";

export default {
  name:"All-Groups-List",
  components: {
    AllGroupsList
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
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>
</style>