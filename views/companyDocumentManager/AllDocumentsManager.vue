<template>
  <section class="documents-view">
    <el-collapse class="stat-collapse" @change="handleCollapseChange" v-model="activeItem">
      <el-collapse-item :title="stateTitle" name="stats">
        <div class="company-documents-stats">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card shadow="never" class="card-1">
                <img src="@/assets/img/icons/files-2.svg" alt="icon" class="image-icon" />
                <h2>15</h2>
                <h4>Static Docs</h4>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="never" class="card-2">
                <img src="@/assets/img/icons/custom-documents.svg" alt="icon" class="image-icon" />
                <h2>112</h2>
                <h4>Custom Docs</h4>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="never" class="card-3">
                <img src="@/assets/img/icons/standard-documents.svg" alt="icon" class="image-icon" />
                <h2>2</h2>
                <h4>Standard Docs</h4>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="never" class="card-4">
                <img src="@/assets/img/icons/offer-letter-1.svg" alt="icon" class="image-icon" />
                <h2>10</h2>
                <h4>Offer Letters</h4>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="inner-navbar">
      <el-row type="flex">
        <el-col :span="8">
          <div class="left-block">
            <div class="icon-block">
              <div class="icon">
                <img src="@/assets/img/icons/files.svg" alt="icon" class="img-fluid" />
              </div>
              <div class="icon-text">
                <h3>Company Documents</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="document-tabs">
            <ul>
              <li>
                <router-link
                  to="/company-documents/static"
                  :class="getActiveClassForStatic"
                >Static Docs</router-link>
              </li>
              <li>
                <router-link
                  to="/company-documents/custom"
                  :class="getActiveClassForCustom"
                >Custom Docs</router-link>
              </li>
              <li>
                <router-link
                  to="/company-documents/requested"
                  :class="getActiveClassForRequested"
                >Requested Docs</router-link>
              </li>
              <li>
                <router-link
                  to="/company-documents/standard"
                  :class="getActiveClassForStandard"
                >Standard Docs</router-link>
              </li>
              <li>
                <router-link
                  to="/company-documents/offer-letters"
                  :class="getActiveClassForOfferLetters"
                >Offer Letters</router-link>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="document-tabs-content">
      <router-view :layout.sync="layout"></router-view>
    </div>
    <!-- Upload Document Model -->
    <div class="vue-model vue-form">
      <el-dialog
        title="Upload Document"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
        top="5vh"
      >
        <AddEditDocument
          v-if="dialogVisible"
          v-on:document-cancelled="dialogVisible= false"
          v-on:document-added="handleDocumentAdd"
          v-on:document-updated="handleDocumentUpdate"
        ></AddEditDocument>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import AddEditDocument from "../../components/companyDocuments/AddEditDocument";
export default {
  name:"AllDocumentsManager",
  data() {
    return {
      activeItem: "stats",
      fieldsFormUpload: {
        title: "",
        description: "",
        type: "",
        category: "",
        groups: [],
        file_ref_id: "",
        selectedFile: ""
      },
      createCategoryForm: {
        name: ""
      },
      createGroupForm: {
        name: ""
      },
      layout: "documents",
      disabled: false,
      dialogVisible: false,
      radio: "1",
      search_input: "",
      description: "",
      logoError: "",
      category: "",
      group: "",
      stateTitle: "Close Stats"
    };
  },
  computed: {
    ...mapGetters("companyDocuments", [
      "getErrors",
      "getFileUploadURL",
      "getFileUploadRefId",
      "getDocumentUploadStatus",
      "getCompanyDocumentAddStatus"
    ]),
    ...mapGetters("documentCategories", ["getAllCategories"]),
    ...mapGetters("documentGroups", ["getAllGroups"]),
    ...mapGetters("auth", ["getAuthenticationDetails"]),
    uploadHeaders() {
      return {
        Authorization: this.getAuthenticationDetails.access_token
      };
    },
    getActiveClassForStandard() {
      if (this.$route.path.indexOf("/standard") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },

    getActiveClassForOfferLetters() {
      if (this.$route.path.indexOf("/offer-letters") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },
    getActiveClassForStatic() {
      if (this.$route.path.indexOf("/static") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },
    getActiveClassForCustom() {
      if (this.$route.path.indexOf("/custom") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },
    getActiveClassForRequested() {
      if (this.$route.path.indexOf("/requested") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    }
  },
  components: {
    AddEditDocument
  },
  async mounted() {
    this.checkCurrentPage();
  },
  methods: {
    checkCurrentPage() {
      if (this.$route.path == "/company-documents") {
        this.$router.push("/company-documents/static");
      }
    },

    handleCollapseChange(tabs) {
      if (tabs.indexOf("stats") > -1) {
        this.stateTitle = "Close Stats";
      } else {
        this.stateTitle = "Open Stats";
      }
    },
    async refreshDocuments() {
      this.loading = true;
      await this.$store.dispatch("companyDocuments/fetchCompanyAllDocuments");
      this.loading = false;
    },
    onAddNewDocuemnt() {
      this.fieldsFormUpload = {
        title: "",
        description: "",
        type: "",
        category: "",
        groups: [],
        file_ref_id: "",
        selectedFile: "",
        properties: {}
      };
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleDocumentAdd() {
      this.dialogVisible = false;
      this.refreshDocuments();
    },
    handleDocumentUpdate() {
      this.dialogVisible = false;
      this.refreshDocuments();
    }
  },

  watch: {
    $route: "checkCurrentPage"
  }
};
</script>

<style lang="scss" scoped>
.documents-view {
  max-width: 1300px;
  margin: 0 auto;
  .company-documents-stats {
    margin-bottom: 1.75em;
    .el-card {
      color: #ffffff;
      border-radius: 5px;
      border: none;
      position: relative;
      background-size: 100%;
      background-position: center left;
      background-repeat: no-repeat;
      background-image: url(../../assets/img/vectors/pattern-2.png);
      h2 {
        font-weight: 500;
        font-size: 2em;
      }
      h4 {
        font-weight: 500;
        font-size: 1.1em;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .image-icon {
        position: absolute;
        right: 1.5em;
        top: 1.25em;
        opacity: 0.8;
        padding: 0.75em;
        width: 35px;
        background-color: rgba(0, 0, 0, 0.25);
        border-radius: 6px;
      }
    }
    .card-1 {
      background-color: #ffbc25;
      color: #fef3d9;
    }
    .card-2 {
      background-color: #ff575f;
      color: #ffe5e7;
    }
    .card-3 {
      background-color: #0062ff;
      color: #e3eeff;
    }
    .card-4 {
      background-color: #755fe2;
      color: #edeafd;
    }
  }
  .document-tabs {
    ul {
      float: right;
      display: inline-flex;
      background: #ffffff;
      border-radius: 30px;
      box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
      padding: 4px;
      margin-bottom: 1.5em;
      li {
        width: auto;
        &:not(:last-child) {
          margin-right: 0.5em;
        }
        .router-link-exact-active {
          background: #285ed3;
          color: #fff;
        }
        a {
          padding: 0.5em 1em;
          display: inline-block;
          transition: all 0.3s ease-in-out;
          border-radius: 27px;
          color: #334455;
          font-size: 1em;
          font-weight: 500;
        }
      }
    }
  }
  .document-tabs-content {
    margin-bottom: 60px;
    &.top {
      margin-top: 2em;
    }
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
.company-documents-stats {
  .el-card {
    .el-card__body {
      padding: 0.5em 1em;
    }
  }
}
.stat-collapse {
  border: none !important;
  .is-active {
    background: transparent;
  }
  .el-collapse-item__header {
    align-items: center;
    background-color: transparent;
    border: none;
    text-align: right;
    height: 20px;
    position: relative;
    top: -10px;
    width: 110px;
    margin: 0 0 0 auto;
    text-transform: uppercase;
    .el-collapse-item__arrow {
      margin-top: 0px;
    }
  }
  .el-collapse-item__wrap {
    background-color: transparent;
    border: none;
    .el-collapse-item__content {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
}
</style>