<template>
  <NewTemplate></NewTemplate>
</template>

<script>
export default {
  name:"View-New-Template",
  components: { 
      "NewTemplate":()=>import("@/components/templates/NewTemplate")
    }
};
</script>

<style>
</style>