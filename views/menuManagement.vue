<template>
  <section id="global-variables-list">
    <new-menu-management-v-2 />
  </section>
</template>

<script>
export default {
  components: {
    NewMenuManagementV2: () =>
      import("@/components/menuManagement/NewMenuManagementV2"),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.user-menu-container {
  background: #f5f7ff;
  border: 1px solid rgba(168, 171, 255, 0.3);
  border-radius: 20px;
  padding: 2em;
  position: relative;
  .menuPreviewButton {
    position: absolute;
    top: -1.5em;
    right: 2em;
    border-radius: 5px;
  }
  .el-tree {
    background-color: transparent;
    .el-tree-node__content {
      height: 6em;
      &:hover {
        background-color: #f7f9fd;
      }
    }
  }
  .each-item {
    width: 25em;
    overflow: visible;
    margin-bottom: 1em;
    min-height: 5em;
    position: relative;
    z-index: 20;
    .el-card__body {
      padding-top: 0.75em;
    }
    &:last-child {
      margin-bottom: 0em;
    }
    & + .sub-item-1 {
      position: relative;
      margin-left: 3.5em;
      z-index: 15;
      &:after {
        content: "";
        position: absolute;
        top: 2em;
        left: -2em;
        width: 2em;
        border-top: 2px dashed #285fd3;
        height: 1px;
      }
      &:before {
        content: "";
        position: absolute;
        top: -3.75em;
        left: -2em;
        width: 2px;
        border-left: 2px dashed #285fd3;
        height: calc(100% + 1em);
      }
    }
    & + .sub-item-2 {
      position: relative;
      margin-left: 5.5em;
      z-index: 15;
      &:after {
        content: "";
        position: absolute;
        top: 2em;
        left: -4em;
        width: 4em;
        border-top: 2px dashed #285fd3;
        height: 1px;
      }
      &:before {
        content: "";
        position: absolute;
        top: -3.75em;
        left: -4em;
        width: 2px;
        border-left: 2px dashed #285fd3;
        height: calc(100% + 1em);
      }
    }
  }
}
</style>
