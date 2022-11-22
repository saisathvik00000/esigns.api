
<template>
  <section>
    <p
      class="status-text sm-90 line-height-15 mt-10 text-center"
      v-if="isPendingDocument()"
    >
      <i class="el-icon-info"></i> Signature pending at
      <span class="yale-blue">{{ pendingUserEmail() }} </span>
    </p>

    <p
      class="status-text sm-90 line-height-15 mt-10 text-center"
      v-if="allSignaturesCompleted()"
    >
      <i class="el-icon-right"></i> All Signatures Completed
    </p>
  </section>
</template>

<script>
export default {
  props: ["employeeDocumentUsers"],

  methods: {
    isPendingDocument() {
      return !this.allSignaturesCompleted();
    },

    allSignaturesCompleted() {
      if (this.employeeDocumentUsers.length > 0) {
        let allSignatureCompleted = this.employeeDocumentUsers.every(
          (user) => user.e_signature
        );
        return allSignatureCompleted;
      }
    },
    pendingUserEmail() {
      if (this.employeeDocumentUsers.length > 0) {
        let signaturePendingUser = this.employeeDocumentUsers.find(
          (user) => !user.e_signature
        );
        return signaturePendingUser && signaturePendingUser.user_id
          ? signaturePendingUser.user_id.email
          : "NA";
      }
    },
  },
};
</script>

<style>
</style>