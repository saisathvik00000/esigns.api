<template>
  <section
    class="template-dashboard-view templates-list-view"
    v-loading.fullscreen.lock="loading"
    element-loading-text="Fetching Data..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- <EntitiesDataList
      :selectedEntityId="entityId"
      v-if="!refreshPage"
    ></EntitiesDataList> -->
  </section>
</template>
<script>
import { mapGetters } from "vuex";
// import EntitiesDataList from "@/components/entities/EntitiesDataList";
export default {
  data() {
    return {
      entityId: "",
      entityIconPath: "block-portfolio.svg",
      entityGroupData: {},
      loading: false,
      refreshPage: false,
    };
  },
  computed: {
    ...mapGetters("entityGroups", ["getSingleEntityGroupData"]),
  },

  components: {
    // EntitiesDataList,
  },

  mounted() {
    this.entityId = this.$route.params.entity_id;
  },

  methods: {},
  watch: {
    "$route.params.entity_id": function () {
      this.refreshPage = true;
      setTimeout(() => {
        this.refreshPage = false;
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.template-dashboard-view {
  width: 90%;
  display: table;
  margin: 0 auto;
  .nav-tabs {
    display: flex;
    align-items: center;
    gap: 1em;
    .each-tab-item {
      border-radius: 6px;
      min-width: 70px;
      text-align: center;
      padding: 0.75em 0.25em;
      &.active {
        background: #ffffff;
        border: 1px solid #e2ecf7;
      }
    }
  }
  .add-button {
    padding: 0.45em 0.65em;
    color: rgb(81, 161, 0);
    &:hover {
      background-color: rgb(81, 161, 0);
      color: #ffffff;
      border-color: rgb(81, 161, 0);
    }
  }
  .inner-navbar-content {
    margin-top: 20px;
  }
  .guide-stats-block {
    padding: 1em 0 2em;
    .each-stat {
      position: relative;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 1em 1em 0.75em;
      color: #ffffff;
      overflow: hidden;
      min-height: 105px;
      &.stat-card-one {
        background-color: #ff83a1;
      }
      &.stat-card-two {
        background-color: #5673dc;
      }
      &.stat-card-three {
        background-color: #ffbd12;
      }
      .icon {
        position: relative;
        z-index: 3;
        img {
          max-height: 50px;
        }
      }
      .cover {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .stat-content {
        position: relative;
        z-index: 2;
      }
      h3 {
        font-size: 3em;
        font-weight: 300;
        line-height: 1;
        text-align: center;
      }
      p {
        position: absolute;
        text-align: right;
        bottom: 0;
        right: 0;
      }
    }
    .usage-guide {
      position: relative;
      min-height: 105px;
      display: flex;
      background-color: #ebf0f3;
      border-radius: 8px;
      padding: 1em 1em 0.75em;
      overflow: hidden;
      .content {
        position: relative;
        z-index: 2;
      }
      .icon-right {
        width: 200px;
        position: relative;
        z-index: 3;
      }
      h4 {
        font-size: 1em;
        margin: 0;
        font-weight: 400;
      }
      p {
        font-size: 0.75em;
        line-height: 1.3;
        margin: 0.25em 0 0.75em;
      }
      .el-button {
        font-size: 0.85em;
        padding: 0.35em 0.75em;
        background-color: #6979f8;
        &:hover {
          background-color: #4558e9;
        }
      }

      .cover {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.templates-list-view {
  .el-table {
    td:first-child {
      .cell {
        text-overflow: unset !important;
      }
    }
  }
}
</style>