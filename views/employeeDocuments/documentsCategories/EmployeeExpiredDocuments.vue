<template>
  <!-- Employee Module -->
  <section id="employee-documents">
    <div class="inner-navbar">
      <!-- Employee Documents -->
      <div class="main-content-section">
        <div class="inner-navbar-content">
          <div class="vue-data-table-default">
            <data-tables-server
              v-loading="loading"
              :fullscreen="true"
              :data="data"
              :total="total"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :pagination-props="paginationProps"
              @query-change="loadData"
              style="width: 100%"
            >
              <el-table-column label="Name" width="320">
                <template slot-scope="scope">
                  <div class="d-flex align-center">
                    <span class="doc-icon">
                      <img
                        v-if="scope.row.document_type"
                        :src="
                          require('@/assets/img/document-type/' +
                            getDocumentType(scope.row) +
                            '.svg')
                        "
                        alt="icon"
                        width="20"
                      />
                    </span>
                    <span
                      class="usr-name d-block yale-blue ml-10 line-height-1"
                      >{{ scope.row.title }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Type" width="200">
                <template slot-scope="scope">
                  <span class="rich-black">{{ scope.row.document_type }}</span>
                </template>
              </el-table-column>
              <el-table-column label="User Name" width="300">
                <template slot-scope="scope">
                  <span class="usr-name d-block yale-blue">{{
                    scope.row.user_id && scope.row.user_id.name ? scope.row.user_id.name : "" 
                  }}</span>
                  <span class="usr-email medium">{{ scope.row.user_id && scope.row.user_id.email ? scope.row.user_id.email : "" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Expired On">
                <template slot-scope="scope">
                  <span class="tomato">{{ getDateWithFormat(scope.row.expires_at) }}</span>
                </template>
              </el-table-column>

              <el-table-column label="Actions" fixed="right" width="120">
                <template slot-scope="scope">
                  <ul class="action-buttons">
                    <li>
                      <el-button @click="viewDoc(scope.row)">
                        <!-- <router-link :to="'/wfd/' + scope.row.code"> -->
                          <img
                            src="@/assets/img/icons/visibility.svg"
                            alt="icon"
                          />
                        <!-- </router-link> -->
                      </el-button>
                    </li>
                    <li>
                      <el-button @click="downloadDocument(scope.row)">
                        <img
                          src="@/assets/img/icons/download-docuement.svg"
                          alt="icon"
                        />
                      </el-button>
                    </li>
                    <!-- <li>
                      <el-button>
                        <img
                          src="@/assets/img/icons/delete.png"
                          alt="icon"
                          @click="onDelete(scope.row)"
                        />
                      </el-button>
                    </li> -->
                  </ul>
                </template>
              </el-table-column>
            </data-tables-server>
            <!-- </el-table> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import * as moment from "moment";
import companyDocumentsData from "./../../../constants/lg-en/companyDocuments";

// import employeeDocumentsStats from "@/components/employeeDocuments/employeeDocumentsStats";
export default {
  name:"EmployeeExpiredDocuments",
  components: {
    // employeeDocumentsStats,
  },
  computed: {
    ...mapGetters("employeeDocuments", ["getEmployeeAllDocuments"]),

    ...mapGetters("auth", ["getAuthenticationDetails"]),

    ...mapGetters("users", ["getEmployeesList"]),
    ...mapGetters("documentCategories", ["getAllCategories"]),
    ...mapGetters("documentGroups", ["getAllGroups"]),

    paginationProps() {
      return {
        pageSizes: this.pageSizes || [10, 20, 50]
      };
    },
  },
  data() {
    return {
      loading: false,
      total: 0,
      currentPage: Number(this.$route.query.page) || 1,
      pageSize: 10,
      data: [],
      configureLoading: false,
      loadingText: "",
      filterQuery: this.$route.query
    };
  },
  async mounted() {
    await this.fetchEmployeeDocuments()
  },
  methods: {
    async fetchEmployeeDocuments() {
      let params = {
        page: this.currentPage,
        limit: this.pageSize,
        type: 'EXPIRED'
      };
      let filters = Object.keys(this.filterQuery)
      if (filters && filters.length) {
        filters.forEach(e => {
          if (e == 'user') {
            let data = this.getEmployeesList.data.find(x=> x.first_name + x.last_name == this.filterQuery[e])
            data ? params['user'] = data._id : null
          } else if (e == 'category') {
            let data = this.getAllCategories.find(x=> x.name == this.filterQuery[e])
            data ? params['category'] = data._id : null
          } else {
            let data = this.getAllGroups.find(x=> x.name == this.filterQuery[e])
            data ? params['group'] = data._id : null
          }
        })
      }
      this.loading = true
      await this.$store.dispatch(
        "employeeDocuments/fetchEmployeeAllDocuments",
        params
      );
      if (this.getEmployeeAllDocuments) {
        this.total = this.getEmployeeAllDocuments.total || 0;
        this.data = this.getEmployeeAllDocuments.data || [];
      }
      this.loading = false;
    },
    getDateWithFormat(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    async loadData(data) {
      if (this.data && this.data.length) {
        this.pageSize = data.pageSize;
        this.page = data.page;
        this.$router.push({name: 'emp-expired-documents', query: { page: this.page }}).catch(()=>{})
        await this.fetchEmployeeDocuments();
      }
    },
    viewDoc(doc) {
      if (doc.document_type == "CUSTOM") {
        if (doc.configure_type == "WORD_DOCUMENT") {
          this.$router.push({
            name: "employee-documents-custom-doc-type-document",
            params: {
              employee_document_id: doc._id
            }
          });
        } else {
          this.$router.push({
            name: "employee-documents-custom-document",
            params: {
              employee_document_id: doc._id
            }
          });
        }
      }
      if (doc.document_type == "STATIC") {
        this.$router.push({
          name: "employee-documents-static-document",
          params: {
            employee_document_id: doc._id
          }
        });
      }
      if (doc.document_type == "STANDARD") {
        this.$router.push({
          name: "employee-documents-standard-document",
          params: {
            document_slug: this.getStandardDocumentSlug(doc.standard_document),
            employee_document_id: doc._id
          }
        });
      }
      if (doc.document_type == "REQUESTED") {
        this.$router.push({
          name: "employee-documents-requested-document",
          params: {
            employee_document_id: doc._id
          }
        });
      }
    },
    async downloadDocument(doc) {
      if (doc.document_type == "CUSTOM") {
        if (doc.configure_type == "WORD_DOCUMENT") {
          let urlData = this.$router.resolve({
            name: "employee-documents-custom-doc-type-document-download",
            params: {
              employee_document_id: doc._id
            }
          });

          let params = {
            id: doc._id,
            url: window.location.origin + urlData.href,
            access_token: this.getAuthenticationDetails.access_token,
            refresh_token: this.getAuthenticationDetails.refresh_token
          };
          this.loading = true;
          this.loadingText = "Preparing document.....";

          await this.$store.dispatch(
            "employeeDocuments/downloadEmployeeDocumentFromURL",
            params
          );
          this.loading = false;
          this.loadingText = "";
        } else {
          let urlData = this.$router.resolve({
            name: "employee-documents-custom-document-download",
            params: {
              employee_document_id: doc._id
            }
          });

          let params = {
            id: doc._id,
            url: window.location.origin + urlData.href,
            access_token: this.getAuthenticationDetails.access_token,
            refresh_token: this.getAuthenticationDetails.refresh_token
          };

          this.loading = true;
          this.loadingText = "Preparing document.....";

          await this.$store.dispatch(
            "employeeDocuments/downloadEmployeeDocumentFromURL",
            params
          );
          this.loading = false;
          this.loadingText = "";
        }
      }
      if (doc.document_type == "STATIC") {
        let urlData = this.$router.resolve({
          name: "employee-documents-static-document",
          params: {
            employee_document_id: doc._id
          }
        });
        let params = {
          id: doc._id,
          url: window.location.origin + urlData.href,
          access_token: this.getAuthenticationDetails.access_token,
          refresh_token: this.getAuthenticationDetails.refresh_token
        };

        this.loading = true;
        this.loadingText = "Preparing document.....";

        await this.$store.dispatch(
          "employeeDocuments/downloadEmployeeDocumentFromURL",
          params
        );
        this.loading = false;
        this.loadingText = "";
      }
      if (doc.document_type == "STANDARD") {
        let urlData = this.$router.resolve({
          name: "employee-documents-standard-document-download",
          params: {
            document_slug: this.getStandardDocumentSlug(doc.standard_document),
            employee_document_id: doc._id
          }
        });
        let params = {
          id: doc._id,
          url: window.location.origin + urlData.href,
          access_token: this.getAuthenticationDetails.access_token,
          refresh_token: this.getAuthenticationDetails.refresh_token
        };

        this.loading = true;
        this.loadingText = "Preparing document.....";

        await this.$store.dispatch(
          "employeeDocuments/downloadEmployeeDocumentFromURL",
          params
        );
        this.loading = false;
        this.loadingText = "";
      }
      if (doc.document_type == "REQUESTED") {
        let urlData = this.$router.resolve({
          name: "employee-documents-requested-document",
          params: {
            employee_document_id: doc._id
          }
        });
        let params = {
          id: doc._id,
          url: window.location.origin + urlData.href,
          access_token: this.getAuthenticationDetails.access_token,
          refresh_token: this.getAuthenticationDetails.refresh_token
        };

        this.loading = true;
        this.loadingText = "Preparing document.....";

        await this.$store.dispatch(
          "employeeDocuments/downloadEmployeeDocumentFromURL",
          params
        );
        this.loading = false;
        this.loadingText = "";
      }
    },
    getStandardDocumentSlug(standardDocument) {
      return companyDocumentsData.STANDARD_DOCUMENTS_MAP[standardDocument].slug;
    },
    getDocumentType(data) {
      if (data.company_document_data && data.company_document_data.file_name) {
        let type = data.company_document_data.file_name.split(".").pop()
        if (type == 'jpg' || type == 'jpeg' || type == 'png') {
          return 'image'
        } else if (type == 'pdf') {
          return 'pdf'
        } else if (type == 'doc' || type == 'docx') {
          return 'word'
        } else {
          return 'pdf'
        }
      } else {
        return 'pdf'
      }
    }
  },
  watch: {
    async "$route.query.user"() {
      this.filterQuery = this.$route.query
      await this.fetchEmployeeDocuments()
    },
    async "$route.query.category"() {
      this.filterQuery = this.$route.query
      await this.fetchEmployeeDocuments()
    },
    async "$route.query.group"() {
      this.filterQuery = this.$route.query
      await this.fetchEmployeeDocuments()
    }
  }
};
</script>

<style lang="scss" scoped>
#employee-documents {
  .tabs-group {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 1em;
    .el-button {
      text-transform: uppercase;
      color: #303133;
      letter-spacing: 0.5px;
      border-radius: 5px;
      padding: 0 15px;
      line-height: 30px;
      border: none;
      &.active {
        color: #ffffff;
        background-color: #1b487e;
        -webkit-box-shadow: 0 3px 6px 0 rgba(140, 152, 164, 0.25);
        box-shadow: 0 3px 6px 0 rgba(140, 152, 164, 0.25);
      }
    }
  }
}
</style>