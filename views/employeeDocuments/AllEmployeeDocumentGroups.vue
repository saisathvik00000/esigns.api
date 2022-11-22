<template>
  <div>
    <AllGroupsList></AllGroupsList>
  </div>
</template>

<script>
import AllGroupsList from "../../components/employeeDocuments/AllGroupsList";

export default {
  name:"AllEmployeeDocumentGroups",
  components: {
    AllGroupsList
  },
  computed: {
    type() {
      return this.$route.path.indexOf("custom") > -1 ? "CUSTOM" : "STATIC";
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