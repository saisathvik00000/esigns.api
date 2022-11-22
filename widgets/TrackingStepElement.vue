<template>
  <div class="each-log-item">
    <div class="d-flex align-center space-between">
      <div class="d-flex user-mail align-center">
        <el-tag class="text-avatar getLogStat" :type="getLogStat">{{
          log.user_id.email.charAt(0).toUpperCase()
        }}</el-tag>
        <div class="dark-black pl-1">
          <p class="mb-0">
            {{ log.user_id ? log.user_id.email : "" }}
          </p>
          <div class="tomato medium">
            <i class="el-icon-date"> </i>
            {{ log.time | moment("MM-DD-YYYY") }}
            <i class="el-icon-time"> </i>
            {{ log.time | moment("HH:mm") }}
          </div>
        </div>
      </div>
      <div class="">
        <el-tag size="mini" :class="getStatusClass" :type="getLogStat">
          {{ log.status }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["log"],

  computed: {
    getStatusClass() {
      return this.log.status == "ACCEPTED"
        ? "success"
        : this.log.status == "REJECTED"
        ? "failure"
        : "";
    },
    getLogStat() {
      if (this.log.status == "DOCUMENT_SENT") {
        return "primary";
      } else if (
        this.log.status == "REMAINDER_SENT" ||
        this.log.status == "DOCUMENT_REJECTED"
      ) {
        return "danger";
      } else {
        return "success";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.each-log-item {
  padding: 0.25em 0em;
  position: relative;
  top: -15px;
  .user-mail {
    .text-avatar {
      font-size: 1em;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>