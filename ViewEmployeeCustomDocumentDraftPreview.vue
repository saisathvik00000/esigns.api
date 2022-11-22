<template>
  <section
    class="view-configure-document"
    id="drag-template-background"
    v-loading="documentDataLoading"
  >
    <div class="inner-navbar">
      <div class="d-flex">
        <el-button
          class="rounded-0 back-btn type-2"
          type="primary"
          @click="backToDashCompanyDocuments()"
        >
          <i class="el-icon-back"></i>
        </el-button>
        <div class="flex-fill left-block vue-form ml-2">
          <el-form class="form-title">
            <p>{{ documentTitle }}</p>
            <p>{{ getEmployeeDocumentDataById }}</p>
          </el-form>
        </div>
        <div class="right-block flex-self-end pe-3 align-items-self">
          <el-tag type="danger" class="expiry-date">
            <i class="el-icon-date"></i>
            <span class="pl-1">04-24-2021</span>
          </el-tag>
          <el-button
            @click="addDocumentRecipient = true"
            class="manage-recipients ml-2"
            plain
            >Manage
            <el-tag>SR</el-tag>
            <el-tag type="success">AS</el-tag>
            <el-tag type="info">SK</el-tag>
          </el-button>
          <el-button
            type="danger"
            class="ml-2"
            @click="addDocumentRecipient = true"
            plain
            >Preview</el-button
          >
          <el-button type="primary" class="type-2 ml-2" @click="saveTemplate()"
            >Send Document</el-button
          >
        </div>
      </div>
    </div>

    <div class="document-preview-block">
      <div class="document-container">
        <div v-loading="documentDataLoading">
          <div class="document-root">
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
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
                    ></el-input>
                    <el-input
                      :style="getStyle(item)"
                      type="text"
                      :placeholder="item.placeholder"
                      v-if="item.type == 'NUMBER'"
                      v-model="item.value"
                      :disabled="checkFieldAllow(item)"
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
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
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
                    ></el-date-picker>

                    <el-select
                      :height="item.height"
                      :width="item.width"
                      :style="getStyle(item)"
                      v-if="item.type == 'SELECT'"
                      v-model="item.value"
                      :placeholder="item.placeholder"
                      :disabled="checkFieldAllow(item)"
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
                    >
                      <el-option
                        v-for="(option, index) of item.options"
                        :key="index"
                        :value="option"
                        :label="option"
                      ></el-option>
                    </el-select>

                    <el-select
                      :height="item.height"
                      :width="item.width"
                      :style="getStyle(item)"
                      v-if="item.type == 'MULTI_SELECT'"
                      v-model="item.value"
                      :placeholder="item.placeholder"
                      :disabled="checkFieldAllow(item)"
                      multiple
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
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
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
                    />
                    <el-input
                      type="textarea"
                      :rows="item.rows"
                      :style="getStyle(item)"
                      v-if="item.type == 'MULTI_LINE_TEXT'"
                      v-model="item.value"
                      :placeholder="item.placeholder"
                      :disabled="checkFieldAllow(item)"
                      :ref="removeHashesFromKey(item.key)"
                      :class="
                        currentEnabledFieldKey == item.key ? 'active' : ''
                      "
                    />

                    <a
                      v-if="item.type == 'SIGNATURE' && !item.source"
                      :style="getStyle(item)"
                      @click="captureSignature(item, index)"
                      :disabled="checkFieldAllow(item)"
                      :ref="removeHashesFromKey(item.key)"
                    >
                      {{ item.label }}
                      <i class="el-icon-edit"></i>
                    </a>
                    <img
                      v-if="item.type == 'SIGNATURE' && item.source"
                      :src="item.source"
                      :style="getStyle(item)"
                      @click="captureSignature(item, index)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="form-field-options d-flex align-center justify-between">
              <div class="field-stats-block d-flex">
                <div class="each-stat d-flex">
                  <div class="count">
                    <p class="mt-0 blue-2">{{ getCompletedFieldsCount() }}</p>
                  </div>
                  <p class="text mt-0">Completed Fields</p>
                </div>
                <div class="each-stat d-flex">
                  <div class="count">
                    <p class="mt-0 success">
                      {{ getRemainingFieldsCount() }}
                    </p>
                  </div>
                  <p class="text mt-0">Remaining Fields1</p>
                </div>
              </div>
              <div class="fields-navigators">
                <el-button
                  size="mini"
                  :disabled="disablePrevButton"
                  @click="goToPrevField()"
                >
                  <i class="el-icon-back"></i> Prev
                </el-button>
                <el-button
                  size="mini"
                  :disabled="disableNextButton"
                  @click="goToNextField()"
                >
                  Next
                  <i class="el-icon-right"></i>
                </el-button>
                <el-button
                  size="mini"
                  class="document-sign ml-2 bg-tomato-red"
                  type="danger"
                  @click="onSignDocument"
                  v-if="!isDocumentSigned"
                >
                  <i class="el-icon-edit-outline"></i>
                  <span>Sign Document</span>
                </el-button>

                <span
                  v-if="
                    showApprovalAccess &&
                    userDocumentData.approval_status &&
                    userDocumentData.approval_status != 'APPROVED'
                  "
                >
                  <el-button
                    size="mini"
                    class="document-sign ml-2"
                    type="success"
                    @click="userApproveDocument"
                    :disabled="!isDocumentSigned"
                  >
                    <span>Approve</span>
                  </el-button>

                  <el-button
                    size="mini"
                    class="document-sign bg-tomato-red ml-025"
                    type="danger"
                    @click="rejectDocument = true"
                    :disabled="!isDocumentSigned"
                    plain
                  >
                    <span>Reject</span>
                  </el-button>
                </span>

                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="
                    'Document Approved on ' +
                    $moment(userDocumentData.approval_date).format('MM-DD-YYYY')
                  "
                  placement="top"
                  v-if="
                    userDocumentData &&
                    userDocumentData.approval_status &&
                    userDocumentData.approval_status == 'APPROVED'
                  "
                >
                  <el-tag
                    type="success"
                    class="ml-1"
                    effect="plain"
                    v-if="
                      userDocumentData &&
                      userDocumentData.approval_status &&
                      userDocumentData.approval_status == 'APPROVED'
                    "
                    ><i class="el-icon-success"></i> Approved</el-tag
                  >
                </el-tooltip>

                <el-button
                  size="mini"
                  class="document-sign ml-2"
                  type="success"
                  @click="onESignView"
                  v-if="isDocumentSigned"
                >
                  <i class="el-icon-check"></i>
                  <span>View Signature</span>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DocumentUsersLog
      v-if="showDocumentUsersLog"
      @dialog:close="showDocumentUsersLog = false"
      :employeeDocumentId="employeeDocumentId"
      :employeeDocumentData="getEmployeeDocumentDataById"
    >
    </DocumentUsersLog>
    <CompleteEmployeeDocument
      v-if="completedialogVisible"
      @dialog:close="completeStatusClosed"
      :userDocumentFormData="userDocumentFormData"
    >
    </CompleteEmployeeDocument>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="eSignatureDialogVisible"
      title="Authorize Signature"
      class="outersize-confirm-type-three"
      width="100%"
    >
      <ESignature
        v-if="eSignatureDialogVisible"
        :workflowName="workflowName"
        :templateName="documentFormData.name"
        :purpose="'COMPANY_DOCUMENT'"
        v-on:onVerfiedSignature="updateDocumentSignature"
        v-on:cancelESign="eSignatureDialogVisible = false"
      ></ESignature>
    </el-dialog>

    <el-dialog :visible.sync="showSavedSignatureData" title="eSignature">
      <div v-loading="esignLoading">
        <el-row>
          <el-col :span="18">
            <table v-if="esignData">
              <tr>
                <td>Signed On</td>
                <td>
                  :: {{ esignData.signed_at | moment("MM-DD-YYYY HH:mm:ss") }}
                </td>
              </tr>
            </table>

            <p>Signature</p>
            <img :src="esignData.signature" height="100" />
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import appConfig from "@/config/app";
import { mapGetters } from "vuex";

import ESignature from "@/components/signature/ESignature";
import DocumentUsersLog from "@/components/executeCompanyDocuments/DocumentUsersLog";
import CompleteEmployeeDocument from "@/components/executeCompanyDocuments/CompleteEmployeeDocument";
// import SignatureCompleteStatus from "@/widgets/SignatureCompleteStatus";
export default {
  name: "Global-ViewEmployeeCustomDocumentDraftPreview",
  components: {
    ESignature,
    DocumentUsersLog,
    // SignatureCompleteStatus,
    CompleteEmployeeDocument,
  },

  created() {},
  data() {
    return {
      elements: [],
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      addItemDataDialogVisible: false,
      selectedItemIndex: null,
      selectedItem: {},
      refreshForm: false,
      selectedSignatureItem: {},
      selectedSignatureItemIndex: -1,
      captureSignatureDialog: false,
      hasBackground: false,
      documentId: null,
      configurableDocumentId: null,
      documentDataLoading: false,
      documentFormData: null,
      documentName: "",
      loading: false,
      backgroundImage: "",
      previewVisible: false,
      activatedItem: null,
      activatedItemIndex: -1,

      currentFormBuilderWidth: null,
      storedFormBuilderWidth: null,
      checkExistingData: false,
      backgroundImages: [
        "https://devnimblehrms.s3.ap-south-1.amazonaws.com/company-document-backgrounds/60468b2c0a7b7942d5781c36/60468b2c0a7b7942d5781c36-0.png",
      ],
      loadingElements: false,
      selectedTemplateFields: [],
      templatesUsed: [],
      showErrorElementDialog: false,
      errorElements: [],
      fieldErrorMessage: "",
      workflowDataId: "",
      userId: "",

      userDocumentFormData: {
        valid_from: "",
        expires_at: "",
        e_signature_required: "",
        e_signature_value: "",
      },
      employeeDocumentId: "",
      templateDataIdsData: [],
      workflowStepId: "",

      //e-sign data
      eSignId: "",
      eSignatureDialogVisible: false,
      showSavedSignatureData: false,
      workflowName: "",
      esignLoading: false,
      esignData: {},
      documentUsers: [],
      showDocumentUsersLog: false,
      completedialogVisible: false,

      // navigation
      currentFieldIndex: -1,
      disableNextButton: false,
      disablePrevButton: true,
      completedFieldsCountLoading: false,
      showApprovalAccess: false,
      userDocumentData: {},
      currentEnabledFieldKey: "",
      documentTitle: "",
    };
  },
  computed: {
    ...mapGetters("company", ["getCompanyProfileData"]),
    ...mapGetters("employee", ["getSingleEmployeeData"]),
    ...mapGetters("configurableDocuments", ["getConfigurableDocumentDataById"]),
    ...mapGetters("employeeData", ["getESignData"]),
    ...mapGetters("auth", ["getAuthenticatedUser"]),

    ...mapGetters("templatesData", ["getTemplatesData"]),
    ...mapGetters("workflowData", [
      "getUserWorkflowDataWithTemplate",
      "getWorkflowDataAssetDataAddStatus",
      "getUserWorkflowData",
      "getWorkflowSentStatus",
      "getWorkflowSentErrors",
    ]),
    ...mapGetters("companyDocuments", ["getCompanyDocumentDataById"]),
    ...mapGetters("employeeDocuments", [
      "getEmployeeDocumentDataById",
      "getEmployeeDocumentUpdateStatus",
    ]),

    getLogoUrl() {
      return appConfig.S3_BUCKET_URL + "/" + this.getCompanyProfileData.logo;
    },
    isUserIsDocumentOwner() {
      return (user) => {
        return user._id == this.employeeId;
      };
    },
    isDocumentSigned() {
      return this.getCurrentUserFromDocumentUsers ? true : false;
    },
  },
  async mounted() {
    this.userId = this.getAuthenticatedUser._id;

    this.currentFormBuilderWidth = this.$refs.formBuilder.clientWidth;
    this.employeeDocumentId = this.$route.params.employee_document_id;
    await this.fetchEmployeDocumentData();
    this.setData();
    await this.fetchDocumentData();

    this.setEmployeDataToForm();
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
      console.lo;
      this.configurableDocumentId =
        this.getEmployeeDocumentDataById.configurable_document_id;
      this.documentId = this.getEmployeeDocumentDataById.company_document_id;
      this.workflowName = this.$route.query.workflow_name || "Company Document";
      this.documentTitle = this.getEmployeeDocumentDataById.name;
    },

    setEmployeDataToForm() {
      this.documentDataLoading = true;
      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        if (field.field_type == "TEMPLATE_FIELD") {
          const fieldData = this.getFieldDataFromTemplate(
            field.template_id,
            field.template_field_id
          );
          if (fieldData) {
            this.$set(this.elements[index], "label", fieldData.label);
            this.$set(this.elements[index], "filled_by", fieldData.filled_by);
            this.$set(this.elements[index], "options", fieldData.options);
            this.$set(
              this.elements[index],
              "placeholder",
              fieldData.placeholder
            );
            this.$set(this.elements[index], "source", fieldData.source);
            this.$set(this.elements[index], "source", fieldData.source);
            this.$set(this.elements[index], "required", fieldData.required);
          }
        }

        const value = this.getValueFromTempaleFieldFromEmployeeData(field);

        const documentValue = this.getValueFromSavedDocument(field.key);

        if (documentValue) {
          this.$set(this.elements[index], "value", documentValue);
        } else if (value) {
          this.$set(this.elements[index], "value", value);
        }
      }

      if (this.employeeDocumentId && this.getEmployeeDocumentDataById) {
        this.userDocumentFormData.e_signature_required =
          this.getEmployeeDocumentDataById.e_signature_required;
        this.userDocumentFormData.e_signature_status =
          this.getEmployeeDocumentDataById.e_signature_status;
        this.userDocumentFormData.expires_at =
          this.getEmployeeDocumentDataById.expires_at;
        this.userDocumentFormData.valid_from =
          this.getEmployeeDocumentDataById.valid_from;
        this.userDocumentFormData.e_signature_value = this
          .getEmployeeDocumentDataById.e_signature_required
          ? "YES"
          : "NO";

        this.documentUsers = this.getEmployeeDocumentDataById.document_users;
      }

      this.documentDataLoading = false;
    },

    async fetchUserTemplateData() {
      if (this.templatesUsed.length) {
        let templateIds = this.templatesUsed.map((e) => e._id);
        await this.$store.dispatch("templatesData/fetchUserTemplateData", {
          user_id: this.userId,
          template_ids: templateIds,
        });
      }
    },

    getFieldDataFromTemplate(templateId, templateFieldId) {
      let template = this.templatesUsed.find((x) => x._id == templateId);
      if (template) {
        let field = template.sections[0].fields.find(
          (x) => x._id == templateFieldId
        );
        if (field) {
          return field;
        }
        return {};
      }
      return {};
    },
    getValueFromTempaleFieldFromEmployeeData(field) {
      let key = field.key.split("#")[1];

      if (this.getTemplatesData && this.getTemplatesData.length) {
        let template = this.getTemplatesData.find(
          (x) => x.template_id == field.template_id
        );
        if (template) {
          return template.template_data[key] ? template.template_data[key] : "";
        }
        return "";
      }
      return "";
    },

    getValueFromSavedDocument(key) {
      if (
        this.getEmployeeDocumentDataById &&
        this.getEmployeeDocumentDataById.document_data
      ) {
        return this.getEmployeeDocumentDataById.document_data[key];
      }
      return null;
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

    async fetchEmployeDocumentData() {
      await this.$store.dispatch(
        "employeeDocuments/fetchEmployeeDocumentById",
        {
          id: this.employeeDocumentId,
        }
      );
    },
    showDocumentUsers() {
      this.showDocumentUsersLog = true;
    },
    completeStatusClosed(status) {
      this.completedialogVisible = false;
      if (status) {
        this.mounted();
      }
    },

    async fetchDocumentData() {
      // this.documentDataLoading = true;
      await this.$store.dispatch(
        "configurableDocuments/fetchConfigurableDocumentById",
        {
          id: this.configurableDocumentId,
          include_template_details: true,
        }
      );

      await this.$store.dispatch("companyDocuments/fetchCompanyDocumentById", {
        id: this.documentId,
      });

      this.userDocumentFormData.valid_from =
        this.getCompanyDocumentDataById.valid_from;
      this.userDocumentFormData.expires_at =
        this.getCompanyDocumentDataById.valid_to;
      this.userDocumentFormData.e_signature_required =
        this.getCompanyDocumentDataById.e_signature_required;

      this.documentFormData = JSON.parse(
        JSON.stringify(this.getConfigurableDocumentDataById)
      );

      this.backgroundImage = this.documentFormData.pages[0].background_image;
      this.backgroundImages = this.documentFormData.pages[0].background_images;

      this.storedFormBuilderWidth =
        this.documentFormData.pages[0].page_base_width;
      this.templatesUsed = this.documentFormData.pages[0].templates_used;

      // this.loadingElements = true;
      setTimeout(() => {
        this.elements = this.documentFormData.pages[0].fields;
        this.elements = this.setSizeAndPositionForElements();
        // this.loadingElements = false;
      }, this.backgroundImages * 500);

      // this.documentDataLoading = false;
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
      if (item.type == "SIGNATURE") {
        return (
          `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;background:#c2d8de;` +
          (item.source ? `height:50px;` : ``)
        );
      } else if (item.type == "my-signature") {
        return `position:absolute;left:${item.x}px;top:${item.y}px;height:50px;cursor:pointer;`;
      } else if (item.type == "MULTI_LINE_TEXT") {
        return `position:absolute;left:${item.x}px;top:${item.y}px;height:auto;width:${item.width}px;`;
      }
      return `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;`;
    },
    checkFieldAllow(item) {
      if (
        this.getCurrentDocumentUser() &&
        (item.filled_by == this.getCurrentDocumentUser().value ||
          item.filled_by == "SENDER_OR_RECEIVER")
      ) {
        return false;
      }
      return true;
      // return item.filled_by === "SENDER";
    },
    getCurrentDocumentUser() {
      return this.documentUsers.find(
        (user) => user.user_id && user.user_id._id == this.userId
      );
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
        if (field.type == "SIGNATURE") {
          this.signatureFields.push(field);
        }
      }
      return data;
    },

    goToDocuments() {
      this.$router.go(-1);
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

    saveDocumentData() {
      try {
        this.updateEmployeeDocument();
      } catch (err) {
        console.log(err);
      }
    },

    async updateEmployeeDocument() {
      try {
        let documentData = this.prepareDocumentData();
        let params = {
          id: this.employeeDocumentId,
          document_data: documentData,
          valid_from: this.userDocumentFormData.valid_from,
          expires_at: this.userDocumentFormData.expires_at,
          e_signature_required:
            this.userDocumentFormData.e_signature_value == "YES" ? true : false,
        };

        await this.$store.dispatch(
          "employeeDocuments/updateEmployeeDocument",
          params
        );

        if (this.getEmployeeDocumentUpdateStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document Data Saved Successfully",
          });
          this.goToDocuments();
        } else {
          this.$notify.error({
            title: "Error",
            message: "Erorr at updating document",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    prepareDocumentData() {
      let data = {};
      this.elements.forEach((element) => {
        if (element.value) {
          data[element.key] = element.value;
        } else if (element.source) {
          data[element.key] = element.source;
        } else {
          data[element.key] = "";
        }
      });
      return data;
    },

    onSignDocument() {
      this.eSignatureDialogVisible = true;
    },
    async updateDocumentSignature(eSignData) {
      this.eSignatureDialogVisible = false;
      this.eSignId = eSignData.e_signature_id;
      try {
        let params = {
          id: this.employeeDocumentId,
          e_signature: this.eSignId,
          e_signature_status: true,
          document_data: this.prepareDocumentData(),
        };

        await this.$store.dispatch(
          "employeeDocuments/updateEmployeeDocument",
          params
        );

        if (this.getEmployeeDocumentUpdateStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document signature updated successfully",
          });
          this.goToDocuments();
        } else {
          this.$notify.error({
            title: "Error",
            message: "Erorr at updating Signature ",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onESignView() {
      try {
        this.showSavedSignatureData = true;
        this.esignLoading = true;
        let params = {
          id: this.getEmployeeDocumentDataById.e_signature,
        };
        await this.$store.dispatch("employeeData/fetchESignData", params);
        this.esignLoading = false;
        this.esignData = this.getESignData;
      } catch (err) {
        console.log(err);
      }
    },
    getCompletedFieldsCount() {
      this.completedFieldsCountLoading = true;
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            !this.checkFieldAllow(element) &&
            element.value
          ) {
            value = value + 1;
          }
        });
        this.completedFieldsCountLoading = false;
        return value;
      } else {
        this.completedFieldsCountLoading = false;
        return 0;
      }
    },
    getRemainingFieldsCount() {
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            !this.checkFieldAllow(element) &&
            !element.value
          ) {
            value = value + 1;
          }
        });
        return value;
      } else {
        return 0;
      }
    },
    goToPrevField() {
      let index = this.getIndexOfPrevField();
      if (index == -1) {
        this.disableNextButton = false;
        this.disablePrevButton = true;
      } else {
        if (
          this.elements &&
          this.elements.length &&
          this.elements[index] &&
          this.elements[index]["key"]
        ) {
          this.disableNextButton = false;
          let key = this.removeHashesFromKey(this.elements[index].key);
          this.currentEnabledFieldKey = this.elements[index].key;
          if (this.$refs[key] && this.$refs[key].length) {
            this.$refs[key][0].focus();
          } else {
            this.disableNextButton = true;
          }
        } else {
          this.disableNextButton = true;
        }
      }
    },

    getIndexOfField() {
      let index = this.currentFieldIndex + 1;
      if (index > this.elements.length) {
        return -1;
      } else {
        let field = this.elements[index];
        this.currentFieldIndex = this.currentFieldIndex + 1;
        if (this.checkFieldAllow(field)) {
          return this.getIndexOfField();
        } else {
          return index;
        }
      }
    },

    goToNextField() {
      // while (!this.$refs[this.elements[this.currentFieldIndex].key]) {
      //   this.currentFieldIndex++;
      // }
      let index = this.getIndexOfField();
      if (index == -1) {
        this.disableNextButton = true;
        this.disablePrevButton = false;
      } else {
        if (
          this.elements &&
          this.elements.length &&
          this.elements[index] &&
          this.elements[index]["key"]
        ) {
          this.disablePrevButton = false;
          let key = this.removeHashesFromKey(this.elements[index].key);
          this.currentEnabledFieldKey = this.elements[index].key;
          if (this.$refs[key] && this.$refs[key].length) {
            this.$refs[key][0].focus();
          } else {
            this.disableNextButton = true;
          }
        } else {
          this.disablePrevButton = false;
          this.disableNextButton = true;
        }
      }
    },
    removeHashesFromKey(str) {
      return str.replace(/#/g, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.document-root {
  margin: 10px auto 0;
  position: relative;
  width: 950px;
  border-radius: 10px;
  margin: 10px auto 0;
  .form-field-options {
    position: sticky;
    bottom: 0px;
    margin: 10px auto 0;
    padding: 8px 10px;
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 5px;
  }
  .each-stat {
    margin-right: 1em;
  }
  .field-stats-block {
    p {
      line-height: 40px;
    }
    .count {
      margin-right: 0.5em;
      background-color: #ffffff;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    }
  }
}
.form-builder {
  width: 950px;
  max-height: 900px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #efefef;
  -webkit-box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  .form-image-holder {
    width: 100%;
    img {
      width: 100%;
    }
  }

  .form-fields-holder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .each-element img {
      width: 100%;
    }
  }
}
#drag-template-background {
  .img-fluid {
    height: auto !important;
  }
  .inner-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #ffffff;
    border: 1px solid #efefef;
    margin-bottom: 0 !important;
    & > .d-flex {
      gap: 10px;
      .back-btn {
        height: inherit;
      }
    }
    .left-block {
      .el-input__inner {
        min-width: 250px;
        max-width: 300px;
        background: #fff;
        height: 47px;
      }
    }
    .expiry-date {
      border-radius: 20px;
      padding: 0px 10px;
      background: #f754a2;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.91em;
      border-color: #f754a2;
    }
    .manage-recipients {
      padding: 7px 14px;
      .el-tag {
        border-radius: 20px;
        padding: 4px;
        line-height: 1;
        height: 30px;
        width: 30px;
        height: auto;
        margin-left: -0.2em;
      }
    }
  }
  .document-preview-block {
    position: relative;
    top: 64px;
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 1fr 340px;
    .activity-block {
      background-color: #ffffff;
      // border-left: 1px solid #efefef;
      // Tags
      .el-tabs {
        box-shadow: none;
        min-height: calc(100vh - 62px);
      }
    }
    td {
      padding-top: 0;
      vertical-align: top;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 80%;
      }
    }
    .inputs-list {
      background: #fff;
      padding: 15px;
      box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.06),
        0 1px 0px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      .el-button {
        border: none;
        background: rgba(236, 245, 255, 0.7);
        &:hover {
          background: rgba(236, 245, 255, 1);
        }
      }
      li {
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
  .form-image {
    max-width: 770px;
    min-height: 1000px;
    background-color: #e6dcdc;
  }
  .el-input__inner {
    display: inline !important;
  }

  .form-holder {
    width: 100%;
    position: relative;
    .el-input__inner,
    .el-textarea__inner {
      height: 100% !important;
      min-height: 30px !important;
      line-height: inherit !important;
    }
    input[type="checkbox"] {
      margin: 0 !important;
    }
  }

  .sample-form1 {
    position: relative;
    width: 100%;
    max-height: 91vh;
    overflow: scroll;
    border: 1px solid #ccc;
    margin-left: 20px;
    margin-bottom: 45px;

    ///
    .each-page {
      position: relative;
      width: 900px;
      display: block;
      height: 800px;
      overflow-y: auto;
      .form-image {
        height: 800px;
        position: absolute;
        width: 850px;
        top: 0;
        left: 0;
      }
      .form-fields {
        height: 800px;
        position: absolute;
        width: 850px;
        top: 0;
        left: 0;
        z-index: 100;
      }
      .page-image {
        width: 850px;
        margin: 0 auto;
      }
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

  // Fields
  .form-fields-set {
    background-color: #ffffff;
    padding: 1.25em 1em;
    border-radius: 2px;
    -webkit-box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
    box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
    .el-form-item {
      margin-bottom: 0.5em;
    }
  }
}
</style>


<style lang="scss">
.view-configure-document {
  padding-top: 0 !important;
  background-color: #f8f9fa;

  .form-title {
    .el-input {
      position: relative;

      input {
        padding: 0;
        line-height: 1;
        background-color: rgba(255, 255, 255, 0.35);
        border: none;
        font-size: 1.5em;
        height: 60px !important;
        font-weight: 500;
        letter-spacing: -0.5px;
        margin-bottom: 0;
        color: #222222;
        box-shadow: none;
      }
      &::before {
        position: absolute;
        content: "";
        top: 0;
        height: 20px;
        width: 10px;
        background-image: url(/img/hover-dots.ecfb2fa2.svg);
        background-size: 10px 20px;
        background-repeat: no-repeat;
        background-position: center;
        left: 0px;
        opacity: 0;
        z-index: 10;
        transition: 0.3s all ease-in-out;
        -webkit-transition: 0.3s all ease-in-out;
      }
    }
  }

  .activity-block {
    .el-tabs__content {
      padding: 0;
    }
    .el-tabs--border-card {
      .el-tabs__header {
        .el-tabs__item {
          &.is-active {
            color: #f15178;
          }
        }
      }
    }
  }

  .right-block {
    height: inherit;
    display: flex;
    align-items: center;
  }
}
</style>
