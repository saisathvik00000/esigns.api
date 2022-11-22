<template>
  <div id="entity-group-view">
    <section
      class="template-dashboard-view templates-list-view"
      v-loading.fullscreen.lock="loading"
      element-loading-text="Fetching Data..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="inner-navbar">
        <div class="top-strip">
          <el-row>
            <el-col :span="24">
              <div class="d-flex align-center">
                <el-button @click="backToEntityGroups" class="px-10">
                  <i class="el-icon-back" />
                </el-button>
                <h4
                  class="group-title h4 f-weight-500 pl-15"
                  v-if="entityGroupData"
                >
                  <span class="yale-blue">{{ this.entityGroupData.name }}</span>
                </h4>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-divider class="mt-0 mb-0"></el-divider>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-card class="card-style" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>Entities</span>
                  <span class="float-right">
                    <span v-if="entityGroupData && entityGroupData.entities">
                      ( {{ entityGroupData.entities.length }} )
                    </span>
                    <span v-else>( 0 )</span>
                  </span>
                </div>
                <el-empty
                  :image-size="50"
                  description="No data"
                  v-if="!entityGroupData.entities.length"
                ></el-empty>
                <template :gutter="15" v-else>
                  <el-tag
                    type="info"
                    class="text-center"
                    style="margin: 0.2rem"
                    v-for="(entityId, index) of entityGroupData.entities"
                    :key="index"
                  >
                    {{ entityId.name }}
                  </el-tag>
                </template>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card-style" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>Form Templates</span>
                  <span class="float-right">
                    ( {{ entityGroupData.formTemplates.length }} )</span
                  >
                </div>
                <el-empty
                  :image-size="50"
                  description="No data"
                  v-if="!entityGroupData.formTemplates.length"
                ></el-empty>
                <template :gutter="15" v-else>
                  <el-tag
                    type="info"
                    class="text-center"
                    style="margin: 0.2rem"
                    v-for="(tempId, index) of entityGroupData.formTemplates"
                    :key="index"
                  >
                    {{ tempId.name }}
                  </el-tag>
                </template>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card-style" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>Global Variable</span>
                  <span class="float-right">
                    ( {{ entityGroupData.globalVariables.length }} )</span
                  >
                </div>
                <el-empty
                  :image-size="50"
                  description="No data"
                  v-if="!entityGroupData.globalVariables.length"
                ></el-empty>
                <template :gutter="15" v-else>
                  <el-tag
                    type="info"
                    class="text-center"
                    style="margin: 0.2rem"
                    v-for="(variable, index) of entityGroupData.globalVariables"
                    :key="index"
                  >
                    {{ variable.label }}
                  </el-tag>
                </template>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card-style" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>Doc Templates</span>
                  <span class="float-right">
                    ( {{ entityGroupData.docTemplates.length }} )</span
                  >
                </div>
                <el-empty
                  :image-size="50"
                  description="No data"
                  v-if="!entityGroupData.docTemplates.length"
                ></el-empty>
                <template :gutter="15" v-else>
                  <el-tag
                    type="info"
                    class="text-center"
                    style="margin: 0.2rem"
                    v-for="(docTemplate, index) of entityGroupData.docTemplates"
                    :key="index"
                  >
                    {{ docTemplate.title }}
                  </el-tag>
                </template>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="card-style" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>Workflows</span>
                  <span class="float-right">
                    ( {{ entityGroupData.workflows.length }} )</span
                  >
                </div>
                <el-empty
                  :image-size="50"
                  description="No data"
                  v-if="!entityGroupData.workflows.length"
                ></el-empty>
                <template :gutter="15" v-else>
                  <el-tag
                    type="info"
                    class="text-center"
                    style="margin: 0.2rem"
                    v-for="(workflow, index) of entityGroupData.workflows"
                    :key="index"
                  >
                    {{ workflow.name }}
                  </el-tag>
                </template>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      entityGroupId: "",
      entityIconPath: "block-portfolio.svg",
      entityGroupData: {},
      loading: false,
      allEntities: [],
      allFormTemplates: [],
      allGlobalVariables: [],
      allWorkflows: [],
      allDocuments: [],
      allDocTemplates: [],
    };
  },
  computed: {
    ...mapGetters("entityGroups", ["getSingleEntityGroupData"]),
  },

  components: {},

  mounted() {
    this.entityGroupId = this.$route.params.group_id;
    this.fetchEntityGroupData();
  },

  methods: {
    async fetchEntityGroupData() {
      this.loading = true;
      await this.$store.dispatch(
        "entityGroups/fetEntityGroupDataById",
        this.entityGroupId
      );
      this.entityGroupData = this.getSingleEntityGroupData;
      this.loading = false;
    },

    isActiveEntity(entity) {
      let currentPageEntityId = this.$route.params.entity_id;
      return entity._id == currentPageEntityId;
    },
    backToEntityGroups() {
      this.$router.push({
        name: "EntityGroupsDashboard",
      });
    },

    getEntityName(entityId) {
      console.log(this.allEntities.length);
      console.log("entityId", entityId);
      let entity = this.allEntities.find((x) => x._id == entityId);
      if (entity) {
        return entity.name;
      } else {
        return "-";
      }
    },
    getFormTemplateName(formTemplateId) {
      let selectedFormTemplate = this.allFormTemplates.find(
        (x) => x._id == formTemplateId
      );
      if (selectedFormTemplate) {
        return selectedFormTemplate.name;
      } else {
        return "-";
      }
    },

    getGlobalVariableName(variableId) {
      // console.log(variableId);
      let selectedVariable = this.allGlobalVariables.find(
        (x) => x._id == variableId
      );
      if (selectedVariable) {
        return selectedVariable.label;
      } else {
        return "-";
      }
    },
  },
  watch: {
    entityId: function () {
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
  width: 100%;
  display: table;
  margin: 0 auto;
  .inner-navbar {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.05);
    .group-title {
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  .top-strip {
    background-color: #ffffff;
    padding: 10px;
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
  .entity-table-view {
    padding: 20px;
    width: 95%;
    margin: 0 auto;
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
#entity-group-view {
  .el-scrollbar__wrap {
    overflow-y: hidden;
  }
  .nav-tabs {
    position: relative;
    padding: 10px 10px 0;
    background-color: #fdfdfd;
    border-left: none;
    border-right: none;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      z-index: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #efefef;
    }
    .el-scrollbar__view {
      display: flex;
      align-items: bottom;
      gap: 1em;
      .each-tab-item {
        position: relative;
        z-index: 1;
        border-radius: 0px;
        min-width: 80px;
        max-width: 150px;
        text-align: center;
        padding: 0.5em 1em;
        margin-bottom: -1px;
        border: 1px solid transparent;
        border-bottom: none;
        display: flex;
        align-items: center;
        justify-content: center;
        h4 {
          font-size: 0.9em;
          padding-top: 0.25em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 2.75em;
        }
        &.active {
          background: #ffffff;
          border-color: #e2ecf7;
          border-radius: 3px 3px 0 0;
        }
      }
    }
  }
}
.templates-list-view {
  .el-table {
    td:first-child {
      .cell {
        text-overflow: unset !important;
      }
    }
  }
}

.card-style {
  min-height: 320px;
  max-height: 480px;
  overflow: scroll;
  margin: 0.4rem;
}
</style>