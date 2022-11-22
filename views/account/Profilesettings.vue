<template>
  <section class="Profile-view">
    <ProfileBody></ProfileBody>
  </section>
</template>

<script>
const ProfileBody = () => import("@/components/account/ProfileBodysettings");
export default {
  name: "Profilesettings",
  components: {
    ProfileBody,
  },
};
</script>

<style lang="scss" scoped>
</style>