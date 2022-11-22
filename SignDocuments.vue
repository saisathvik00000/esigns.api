<template>
  <section class="all-documents-view">
    <el-row type="flex" justify="center" align="center">
      <el-col :span="22">
        <div class="mb-4 d-flex justify-content-between align-items-center">
          <h3 class="title fw-normal text-dark mb-0 ls-05">Signed Documents</h3>
          <div class="search">
            <el-input
              placeholder="Search"
              suffix-icon="el-icon-search"
            ></el-input>
          </div>
        </div>
        <div v-loading="loading" class="vue-data-table-default">
          <data-tables-server
            v-loading="configureLoading"
            :fullscreen="true"
            :data="documents"
            :total="getAllDocuments.total"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :pagination-props="paginationProps"
            @query-change="loadData"
            style="width: 100%"
          >
            <el-table-column
              label="Name"
              id="name"
              min-width="200"
              fixed="left"
            >
              <template slot-scope="scope">
                <div class="icon-block">
                  <div class="icon">
                    <div class="image-file" v-if="isImage(scope.row.file_type)">
                      <img
                        src="@/assets/img/icons/image-file.svg"
                        alt="icon"
                        class="img-fluid"
                      />
                    </div>
                    <div class="pdf-file" v-if="isPdf(scope.row.file_type)">
                      <img
                        src="@/assets/img/icons/pdf-file.svg"
                        alt="icon"
                        class="img-fluid"
                      />
                    </div>
                    <div
                      class="doc-file"
                      v-if="
                        !isImage(scope.row.file_type) &&
                        !isPdf(scope.row.file_type)
                      "
                    >
                      <img
                        src="@/assets/img/icons/doc-file.svg"
                        alt="icon"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="icon-text">
                    <template v-if="scope.row.title">{{
                      scope.row.title
                    }}</template>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="From" min-width="200">
              <template id="category">
                <span class="text-muted">Suresh Ch</span>
              </template>
            </el-table-column>
            <el-table-column label="Status" id="category" width="200">
              <template slot-scope="scope" id="category">
                <span :class="scope.row.status.toLowerCase() + ' circle'">
                  {{ scope.row.status }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="Recipients" width="200">
              <template id="category">
                <span class="recipients-title">
                  <el-tag type="success" class="mt-n1">KS</el-tag>
                  <el-tag type="info" class="mt-n1">AS</el-tag>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="action" class="action" width="70">
              <template>
                <ul class="action-buttons hover-buttons">
                  <li>
                    <el-button
                      plain
                      size="mini"
                      align="right"
                      type="primary"
                      class="px-2"
                      title="Configure Document"
                    >
                      <i class="el-icon-view"></i>
                    </el-button>
                  </li>
                </ul>
              </template>
            </el-table-column>
          </data-tables-server>
        </div>
      </el-col>
    </el-row>

    <!-- Upload Document Model -->
    <!-- <el-dialog
        title="Update Document"
        :visible.sync="editDailogVisible"
        width="60%"
        :before-close="handleClose"
        top="5vh"
      >
        <AddEditDocument
          v-if="editDailogVisible"
          v-on:document-cancelled="editDailogVisible = false"
          v-on:document-updated="handleDocumentUpdate"
          :isEdit="true"
          :selectedCompanyDocument="selectedCompanyDocument"
        ></AddEditDocument>
      </el-dialog>

      <ConfigureSingleDocumentUsers
        v-if="showSendDocumentoUserSettings"
        :documentUsers="documentUsers"
        :companyDocument="selectedCompanyDocument"
        :enforceSignatureOrder="enforceSignatureOrder"
        v-on:close="closeSendDocumentUserSettings"
        v-on:savedUsersData="savedUsersSettings"
      ></ConfigureSingleDocumentUsers>
    </div> -->
  </section>
</template>

 <script>
import { mapGetters } from "vuex";
// import AddEditDocument from "./AddEditDocument";
// import ConfigureSingleDocumentUsers from "./configureDocuments/ConfigureSingleDocumentUsers.vue";

// import { bus } from "../../main";
export default {
  name:"Global-SignDocuments",
  props: ["pageSizes", "type", "categoryId", "groupId"],
  data() {
    return {
      loading: false,
      editDailogVisible: false,
      selectedCompanyDocument: "",
      total: 2,
      currentPage: 1,
      pageSize: 10,
      configureLoading: false,
      openSendDocumentsModal: false,
      documentUsers: [],
      showSendDocumentoUserSettings: false,
      enforceSignatureOrder: null,

      documents: [],
    };
  },
  computed: {
    ...mapGetters("documents", ["getAllDocuments"]),
    paginationProps() {
      return {
        pageSizes: this.pageSizes || [10, 20, 50],
      };
    },
    isImage() {
      return (type) => (type && type.indexOf("image") > -1 ? true : false);
    },
    isPdf() {
      return (type) => (type && type.indexOf("pdf") > -1 ? true : false);
    },
  },

  // components: {
  //   AddEditDocument,
  //   ConfigureSingleDocumentUsers,
  // },
  async mounted() {
    await this.fetchDocuments();
  },
  methods: {
    async fetchDocuments() {
      try {
        this.configureLoading = true;
        let params = { limit: this.pageSize  };
        await this.$store.dispatch("documents/fetchAllDocuments", params);
        this.documents = this.getAllDocuments.data;
        this.configureLoading = false;
      } catch (err) {
        this.configureLoading = false;
      }
    },
    onEdit(document) {
      this.$router.push({
        name: "edit-configure-document-image",
        params: {
          document_id: document._id,
          configurable_document_id: document.configurable_document_id,
        },
      });
    },
    async loadData(data) {
      if (this.data && this.data.length) {
        this.pageSize = data.pageSize;
        this.page = data.page;
        await this.fetchDocuments();
      }
    },
    goToCreateDocument() {
      this.$router.push({ name: "upload-documents" });
    },
  },
};
</script>

<style lang="scss" scoped>
.all-documents-view {
  .title {
    letter-spacing: 0.019em;
  }
  .circle {
    position: relative;
    padding-left: 20px;
    text-transform: capitalize;
    font-size: 14px;
    &::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 0;
      height: 10px;
      width: 10px;
      display: inline-block;
      border-radius: 50%;
    }
    &.completed::after {
      background: #08ad36;
    }
    &.draft::after {
      background: #c4c4c4;
    }
    &.viewed::after {
      background: #2f80ed;
    }
    &.cancelled::after {
      background: #ff3860;
    }
  }
  .recipients-title {
    .el-tag {
      border-radius: 30px;
      padding: 0;
      height: 35px;
      width: 35px;
      line-height: 35px;
      text-align: center;
    }
  }
}
</style>
