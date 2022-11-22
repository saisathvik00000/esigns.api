<template>
  <div>
    <FillEmployeeDocument v-if="!image"></FillEmployeeDocument>
    <FillEmployeeDocumentImage v-if="image"></FillEmployeeDocumentImage>
  </div>
</template>

<script>
import FillEmployeeDocument from "../../components/FillEmployeeDocument";
import FillEmployeeDocumentImage from "../../components/FillEmployeeDocumentImage";
export default {
  name:"EmployeeDocument",
  components: { FillEmployeeDocument, FillEmployeeDocumentImage },
  data() {
    return {
      image: false
    };
  },
  mounted() {
    if (this.$route.params.type) {
      this.image = true;
    }
  }
};
</script>

<style>
</style>