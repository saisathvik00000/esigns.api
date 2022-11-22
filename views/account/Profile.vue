<template>
  <section class="Profile-view">
    <ProfileBody></ProfileBody>
  </section>
</template>

<script>
const ProfileBody = () => import("@/components/account/ProfileBody");
export default {
  name: "Profile",
  components: {
    ProfileBody,
  },
};
</script>

<style lang="scss" scoped>
</style>