<template>
  <div>
    <div v-loading="empDataLoading" class="employee-data">
      <el-row>
        <el-col :span="4"
          >Employee : {{ getSingleEmployeeData.first_name }}
          {{ getSingleEmployeeData.last_name }}</el-col
        >
      </el-row>
    </div>
    <div v-loading="documentDataLoading" class="document-data">
      <h3>{{ documentFormData.name }}</h3>
      <div
        v-for="(page, pageIndex) of documentFormData.pages"
        :key="pageIndex"
        :style="getFormStyle(page)"
      >
        <div v-for="(item, index) of page.fields" :key="index">
          <img
            :height="item.height"
            :width="item.width"
            v-if="item.type == 'logo'"
            :src="getLogoUrl"
            :style="getStyle(item)"
          />

          <img
            :height="item.height"
            :width="item.width"
            v-if="item.type == 'my-signature'"
            :src="item.source"
            :style="getStyle(item)"
          />

          <el-input
            :height="item.height"
            :width="item.width"
            :style="getStyle(item)"
            type="text"
            :placeholder="item.placeholder"
            v-if="item.type == 'single-line-input'"
            v-model="item.value"
            :disabled="checkFieldAllow(item)"
          ></el-input>

          <el-date-picker
            :height="item.height"
            :width="item.width"
            :style="getStyle(item)"
            type="date"
            :placeholder="item.placeholder"
            v-if="item.type == 'date'"
            v-model="item.value"
            :disabled="checkFieldAllow(item)"
          ></el-date-picker>

          <el-select
            :height="item.height"
            :width="item.width"
            :style="getStyle(item)"
            v-if="item.type == 'drop-down'"
            v-model="item.value"
            :placeholder="item.placeholder"
            :disabled="checkFieldAllow(item)"
          >
            <el-option
              v-for="(option, index) of item.options"
              :key="index"
              :value="option"
              :label="option"
            ></el-option>
          </el-select>

          <input
            type="checkbox"
            :height="item.height"
            :width="item.width"
            :style="getStyle(item)"
            v-if="item.type == 'check-box'"
            v-model="item.value"
            :disabled="checkFieldAllow(item)"
          />
          <el-input
            type="textarea"
            :rows="item.rows"
            :style="getStyle(item)"
            v-if="item.type == 'textarea'"
            v-model="item.value"
            :placeholder="item.placeholder"
            :disabled="checkFieldAllow(item)"
          />

          <div v-if="item.type == 'signature'" :style="getStyle(item)">
            <p>{{ item.label }}</p>
            <a
              v-if="!item.source"
              style="cursor: pointer"
              @click="captureSignature(item, index, pageIndex)"
              :disabled="checkFieldAllow(item)"
            >
              <i class="el-icon-edit"></i>
            </a>
            <img
              v-if="item.source"
              :src="item.source"
              style="cursor: pointer"
              @click="captureSignature(item, index, pageIndex)"
              height="45"
            />
          </div>
        </div>
      </div>

      <el-button @click="goToEmployesPage">Cancel</el-button>
      <el-button @click="saveFormData">Save & Send</el-button>
    </div>

    <el-dialog
      :visible.sync="captureSignatureDialog"
      with="30%"
      title="Add signature"
      :destroy-on-close="true"
    >
      <VueSignaturePad
        width="500px"
        height="300px"
        ref="signaturePad"
        :options="{
          penColor: selectedSignatureItem.color,
        }"
      />

      <el-button
        icon="el-icon-refresh-left"
        title="Undo"
        @click="undo"
      ></el-button>
      <button
        type="button"
        class="color-btn red"
        @click="setColor(selectedSignatureItem, 'red')"
      ></button>
      <button
        type="button"
        class="color-btn black"
        @click="setColor(selectedSignatureItem, 'black')"
      ></button>
      <button
        type="button"
        class="color-btn green"
        @click="setColor(selectedSignatureItem, 'green')"
      ></button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="captureSignatureDialog = false">Cancel</el-button>
        <el-button type="primary" @click="saveCapturedSignature()"
          >Add Signature</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "@/config/app";

export default {
  name: "Global-FillEmployeeDocument",
  data() {
    return {
      employeeId: null,
      configurableDocumentId: null,
      empDataLoading: false,
      documentDataLoading: false,
      documentFormData: { pages: [] },
      selectedSignatureItem: {},
      selectedSignatureItemIndex: -1,
      pageIndex: -1,
      captureSignatureDialog: false,
      allFields: [],
    };
  },

  components: {},
  computed: {
    ...mapGetters("company", ["getCompanyProfileData"]),
    ...mapGetters("employee", ["getSingleEmployeeData"]),
    ...mapGetters("configurableDocuments", ["getConfigurableDocumentDataById"]),
    ...mapGetters("employeeDocuments", ["getEmployeeDocumentAddStatus"]),
    getLogoUrl() {
      return appConfig.S3_BUCKET_URL + "/" + this.getCompanyProfileData.logo;
    },
  },
  async mounted() {
    this.fetchCompanyDetails();
    this.setData();
    await this.fetchEmployeeData();
    await this.fetchDocumentData();
  },
  methods: {
    setData() {
      this.employeeId = this.$route.params.employee_id;
      this.configurableDocumentId = this.$route.params.configurable_document_id;
    },
    async fetchCompanyDetails() {
      await this.$store.dispatch("company/getCompany");
    },
    async fetchEmployeeData() {
      this.empDataLoading = true;
      await this.$store.dispatch("employee/fetchEmployeeSingleEmployee", {
        id: this.employeeId,
      });
      this.empDataLoading = false;
    },
    async fetchDocumentData() {
      this.documentDataLoading = true;
      await this.$store.dispatch(
        "configurableDocuments/fetchConfigurableDocumentById",
        {
          id: this.configurableDocumentId,
        }
      );
      this.documentDataLoading = false;

      this.documentFormData = JSON.parse(
        JSON.stringify(this.getConfigurableDocumentDataById)
      );
    },
    getFormStyle(page) {
      if (page.background) {
        let style = page.style + `background:url('${page.background_image}');`;
        return style;
      } else {
        return page.style || "";
      }
    },
    getStyle(item) {
      let style = `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;`;
      return style;
    },

    checkFieldAllow(item) {
      return item.filled_by === "EMPLOYEE";
    },
    goToEmployesPage() {
      this.$router.push({ path: "/employee-list" });
    },
    async saveFormData() {
      let data = {};
      try {
        let signatureFields = [];
        for (
          let pageIndex = 0;
          pageIndex < this.documentFormData.pages.length;
          pageIndex++
        ) {
          for (let field of this.documentFormData.pages[pageIndex].fields) {
            data[field.key] = field.value || field.source;
            if (field.type == "signature") {
              signatureFields.push(field);
            }
          }
        }

        let params = {
          name: this.getConfigurableDocumentDataById.name,
          company_document_id:
            this.getConfigurableDocumentDataById.company_document_id,
          configurable_document: this.getConfigurableDocumentDataById._id,
          employee: this.getSingleEmployeeData._id,
          document_data: data,
          e_sign_required: signatureFields.length ? true : false,
        };
        await this.$store.dispatch(
          "employeeDocuments/addEmployeeDocument",
          params
        );

        if (this.getEmployeeDocumentAddStatus) {
          this.$notify.success({
            title: "Success",
            message: "Employee Document saved successfully",
          });

          this.$alert(
            "This document avaible at employee documents",
            "Success",
            {
              confirmButtonText: "Employee Documents",
              callback: () => {
                this.$router.push({
                  name: "EmployeeDocuments",
                });
              },
            }
          );
        } else {
          this.$notify.error({
            title: "Error",
            message: "Error at saving Employee document",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    setColor(selectedSignatureItem, color) {
      this.$set(selectedSignatureItem, "color", color);
    },
    captureSignature(item, index, pageIndex) {
      if (this.checkFieldAllow(item)) {
        return;
      }
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.pageIndex = pageIndex;
      this.captureSignatureDialog = true;
    },
    saveCapturedSignature() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.selectedSignatureItem.source = data;
        this.documentFormData.pages[this.pageIndex][
          this.selectedSignatureItemIndex
        ] = this.selectedSignatureItem;
      }
      this.$refs.signaturePad.clearSignature();
      this.selectedSignatureItem = {};
      this.selectedSignatureItemIndex = -1;
      this.captureSignatureDialog = false;
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    backToEmployees() {
      this.$router.push({
        path: "employee-list",
      });
    },
  },
  beforeDestroy() {
    this.$store.commit("company/setCompanyProfileData", null, {
      root: true,
    });
    this.$store.commit("employee/setSingleEmployeeData", null, {
      root: true,
    });
    // this.$store.commit(
    //   "configurableDocuments/setConfigurableDocumentDataById",
    //   null,
    //   {
    //     root: true,
    //   }
    // );
    this.$store.commit("employeeDocuments/setEmployeeDocumentAddStatus", null, {
      root: true,
    });
  },
};
</script>

<style  scoped>
.document-data {
  text-align: center;
}

.sample-form {
  position: relative;
  height: 800px;
  width: 800px;
  border: 1px solid blue;
  margin: 1em;
}
</style>