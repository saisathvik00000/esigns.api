<template>
  <section class="documents-view-tab">
    <div class="inner-navbar-content">
      <div class="right-block float-right mb-1">
        <button class="btn add-button mt-0 upload-button" @click="onAddNewDocuemnt">
          <span class="el-icon-upload pr-1"></span>Upload Document
        </button>
      </div>
      <div class="document-tabs-2 relation-top">
        <ul>
          <li>
            <router-link :to="'/company-documents/'+slug">
              All Documents
              <span class="count">50</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="'/company-documents/'+slug+'/all-categories'"
              :class="getActiveClassForCategories"
            >
              Categories
              <span class="count">13</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="'/company-documents/'+slug+'/all-groups'"
              :class="getActiveClassForGroups"
            >
              Groups
              <span class="count">13</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="document-tabs-content">
        <router-view :layout.sync="layout"></router-view>
      </div>
    </div>
    <!-- Upload Document Model -->
    <div class="vue-model vue-form">
      <el-dialog
        title="Upload Document"
        :visible.sync="dialogVisible"
        width="900px"
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
  name:"CompanyDocuments",
  props: ["type"],
  data() {
    return {
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
      slug: "",
      isCustomDocuments: false
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
    getActiveClassForGroups() {
      if (this.$route.path.indexOf("/all-groups") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    },
    getActiveClassForCategories() {
      if (this.$route.path.indexOf("/all-categories") > -1) {
        return ["router-link-exact-active", "router-link-active"];
      }

      return [];
    }
  },
  components: {
    AddEditDocument
  },
  async mounted() {
    this.slug = this.type.toLowerCase();
    this.isCustomDocuments = this.type == "CUSTOM" ? true : false;
  },
  methods: {
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
        selectedFile: ""
      };
      this.dialogVisible = true;
    },

    onAddNewCustomDocument() {
      this.$router.push({
        name: "new-custom-document"
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async handleDocumentAdd(type) {
      this.dialogVisible = false;
      if (type.toLowerCase() == this.type.toLowerCase()) {
        await this.refreshDocuments();
      } else {
        this.$router.push({
          path: "/company-documents/" + type.toLowerCase()
        });
      }
    },
    async handleDocumentUpdate(type) {
      this.dialogVisible = false;
      if (type.toLowerCase() == this.type.toLowerCase()) {
        await this.refreshDocuments();
      } else {
        this.$router.push({
          path: "/company-documents/" + type.toLowerCase()
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.documents-view-tab {
  .upload-button {
    position: relative;
    z-index: 999;
  }
  .document-tabs-2 {
    &.relation-top {
      position: relative;
      top: 1.25em;
      z-index: 100;
    }
    ul {
      display: inline-flex;
      padding: 0px;
      li {
        &:not(:last-child) {
          margin-right: 0.5em;
        }
        .router-link-exact-active {
          background: #285fd3;
          color: #fff;
          box-shadow: none;
          span.count {
            background-color: rgba(0, 0, 0, 0.2);
            color: #ffffff;
          }
        }
        a {
          padding: 0.5em 1.25em;
          display: inline-block;
          transition: all 0.3s ease-in-out;
          border-radius: 5px 5px 0 0;
          text-transform: uppercase;
          color: #404040;
          font-size: 1em;
          font-weight: 500;
          background-color: #ffffff;
          box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
          span.count {
            background-color: rgba(0, 0, 255, 0.1);
            color: #334455;
            padding: 1px 5px;
            margin-left: 10px;
            border-radius: 4px;
          }
        }
      }
    }
  }
  .document-tabs-content {
    // margin-top: 30px;
    margin-bottom: 60px;
    &.top {
      margin-top: 2em;
    }
  }
}
</style>