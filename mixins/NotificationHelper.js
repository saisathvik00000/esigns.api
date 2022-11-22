export default {
  methods: {
    successNotify(successMessage, successTitle = 'Success') {
      this.$notify({
        title: successTitle,
        message: successMessage,
        type: 'success'
      });
    },
    warningNotify(warningMessage, warningTitle = 'Warning') {
      this.$notify({
        title: warningTitle,
        message: warningMessage,
        type: 'warning'
      });
    },
    infoNotify(infoMessage, infoTitle = 'Info') {
      this.$notify.info({
        title: infoTitle,
        message: infoMessage,
      });
    },
    errorNotify(errorMessage, errorTitle = 'Error') {
      this.$notify.error({
        title: errorTitle,
        message: errorMessage,
      });
    },
  }
}