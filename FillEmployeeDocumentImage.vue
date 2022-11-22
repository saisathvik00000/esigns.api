<template>
  <div>
    <div class="employee-data">
      <el-row>
        <el-col :span="4"
          >Employee : {{ getSingleEmployeeData.first_name }}
          {{ getSingleEmployeeData.last_name }}</el-col
        >
      </el-row>
    </div>
    <div v-loading.fullscreen.lock="documentDataLoading" class="document-data">
      <h3>{{ documentFormData.name }}</h3>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <div class="form-builder" ref="formBuilder">
            <div class="form-holder">
              <div class="form-image-holder">
                <img
                  v-for="(image, index) of backgroundImages"
                  :key="index"
                  :src="image"
                  class="page-image"
                />
              </div>
              <div class="form-fields-holder" v-loading="loadingElements">
                <div v-for="(item, index) of this.elements" :key="index">
                  <img
                    v-if="item.type == 'logo'"
                    :src="getLogoUrl"
                    :style="getStyle(item)"
                  />

                  <img
                    v-if="item.type == 'my-signature'"
                    :src="item.source"
                    :style="getStyle(item)"
                  />

                  <el-input
                    :style="getStyle(item)"
                    type="text"
                    :placeholder="item.placeholder"
                    v-if="item.type == 'SINGLE_LINE_TEXT'"
                    v-model="item.value"
                    :disabled="checkFieldAllow(item)"
                  ></el-input>

                  <el-date-picker
                    :height="item.height"
                    :width="item.width"
                    :style="getStyle(item)"
                    type="date"
                    :placeholder="item.placeholder"
                    v-if="item.type == 'DATE'"
                    v-model="item.value"
                    :disabled="checkFieldAllow(item)"
                  ></el-date-picker>

                  <el-select
                    :height="item.height"
                    :width="item.width"
                    :style="getStyle(item)"
                    v-if="item.type == 'SELECT'"
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
                    v-if="item.type == 'CHECKBOX'"
                    v-model="item.value"
                    :disabled="checkFieldAllow(item)"
                  />
                  <el-input
                    type="textarea"
                    :rows="item.rows"
                    :style="getStyle(item)"
                    v-if="item.type == 'MULTI_LINE_TEXT'"
                    v-model="item.value"
                    :placeholder="item.placeholder"
                    :disabled="checkFieldAllow(item)"
                  />

                  <a
                    v-if="item.type == 'signature' && !item.source"
                    :style="getStyle(item)"
                    @click="captureSignature(item, index)"
                    :disabled="checkFieldAllow(item)"
                  >
                    {{ item.label }}
                    <i class="el-icon-edit"></i>
                  </a>
                  <img
                    v-if="item.type == 'signature' && item.source"
                    :src="item.source"
                    :style="getStyle(item)"
                    @click="captureSignature(item, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

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
  name: "Global-FillEmployeeDocumentImage",
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
      backgroundImage: null,
      backgroundImages: [],
      elements: [],
      currentFormBuilderWidth: null,
      storedFormBuilderWidth: null,
      loadingElements: false,
      signatureFields: [],
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
    this.currentFormBuilderWidth = this.$refs.formBuilder.clientWidth;

    this.fetchCompanyDetails();
    this.setData();
    await this.fetchEmployeeData();
    await this.fetchDocumentData();
  },
  methods: {
    calculateRelativeLeft(x) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * x
        );
      }
      return x;
    },

    calculateRelativeTop(y) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * y
        );
      }
      return y;
    },
    calculateRelativeWidth(width) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * width
        );
      }
      return width;
    },
    setData() {
      this.employeeId = this.$route.params.employee_id;
      this.configurableDocumentId = this.$route.params.configurable_document_id;
    },

    setEmployeDataToForm() {
      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        if (field.field_type == "TEMPLATE_FIELD") {
          const value = this.getValueFromTempaleFieldFromEmployeeData(field);
          this.$set(this.elements[index], "value", value);
        }
      }
    },

    getValueFromTempaleFieldFromEmployeeData(field) {
      let key = field.key.split("#").pop();
      if (
        this.getSingleEmployeeData.templates_data &&
        this.getSingleEmployeeData.templates_data.length
      ) {
        let templateData = this.getSingleEmployeeData.templates_data.find(
          (template) => template.template_id == field.template_id
        );
        if (templateData && templateData.form_data) {
          return templateData.form_data[key] ? templateData.form_data[key] : "";
        }
      }
      return "";
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

      this.backgroundImage = this.documentFormData.pages[0].background_image;
      this.backgroundImages = this.documentFormData.pages[0].background_images;

      this.storedFormBuilderWidth =
        this.documentFormData.pages[0].page_base_width;

      this.loadingElements = true;
      setTimeout(() => {
        this.elements = this.documentFormData.pages[0].fields;
        this.elements = this.setSizeAndPositionForElements();
        this.setEmployeDataToForm();
        this.loadingElements = false;
      }, this.backgroundImages * 500);
    },

    setSizeAndPositionForElements() {
      return this.elements.map((field) => {
        field.x = this.calculateRelativeLeft(field.x);
        field.y = this.calculateRelativeTop(field.y);
        field.width = this.calculateRelativeWidth(field.width);
        field.height = this.calculateRelativeWidth(field.height);
        return field;
      });
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
      if (item.type == "signature" || item.type == "my-signature") {
        return `position:absolute;left:${item.x}px;top:${item.y}px;height:50px;cursor:pointer;`;
      } else if (item.type == "MULTI_LINE_TEXT") {
        return `position:absolute;left:${item.x}px;top:${item.y}px;height:auto;width:${item.width}px;`;
      }
      return `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;`;
    },
    checkFieldAllow(item) {
      return item.filled_by === "RECEIVER";
    },
    goToEmployesPage() {
      this.$router.push({ path: "/employee-list" });
    },

    getData() {
      let data = {};

      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        let key = field.key;
        data[key] = this.elements[index].value || this.elements[index].source;
        if (field.type == "signature") {
          this.signatureFields.push(field);
        }
      }
      return data;
    },
    async saveFormData() {
      let data = this.getData();
      try {
        let params = {
          name: this.getConfigurableDocumentDataById.name,
          company_document_id:
            this.getConfigurableDocumentDataById.company_document_id,
          configurable_document: this.getConfigurableDocumentDataById._id,
          employee: this.getSingleEmployeeData._id,
          document_data: data,
          e_sign_required: this.signatureFields.length ? true : false,
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
        this.elements[this.selectedSignatureItemIndex] =
          this.selectedSignatureItem;
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
    this.$store.commit(
      "configurableDocuments/setConfigurableDocumentDataById",
      null,
      {
        root: true,
      }
    );
    this.$store.commit("employeeDocuments/setEmployeeDocumentAddStatus", null, {
      root: true,
    });
  },
};
</script>

<style lang="scss">
.form-holder {
  position: relative;
  .el-input__inner,
  .el-textarea__inner {
    height: 100% !important;
    min-height: 30px !important;
    line-height: inherit !important;
    background: #c2d8de !important;
    color: #3f484a !important;
  }
  input[type="checkbox"] {
    margin: 0 !important;
    background: #c2d8de !important;
  }
}

.form-builder {
  width: 950px;
  max-height: 900px;
  overflow-y: auto;
  .form-image-holder {
    width: 100%;
    img {
      max-width: 100%;
    }
  }

  .form-fields-holder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .each-element img {
      max-width: 100%;
    }
  }
}

.document-data {
  text-align: center;
}

.sample-form {
  position: relative;
  width: 1240px;
  border: 1px solid #ccc;
  margin: 1em;
  max-height: 90vh;
  overflow: scroll;
  padding: 20px;
  .each-page {
    border: 1px solid #ccc;
    position: relative;
    width: 1200px;
    height: 1400px;
    margin: 0 auto 40px;
    .page-image {
      max-width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
  }

  .draggable.resizable {
    position: absolute;
    z-index: 100;
  }
}

.color-btn {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: 10px;
  &.red {
    background-color: red;
  }
  &.black {
    background-color: black;
  }

  &.green {
    background-color: green;
  }
}
</style>
