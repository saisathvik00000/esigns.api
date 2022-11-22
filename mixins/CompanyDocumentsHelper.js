import companyDocumentsData from "@/constants/lg-en/companyDocuments";
import { mapGetters } from "vuex";
import { bus } from "../main";
export default {
  data() {
    return {
      fetchingCompanyDocumentDetails: false,
      configureCompanyDocumentsVisible: false,
      newlySelectedDocuments: {
        static: [],
        standard: [],
        custom: [],
        requested: [],
      },
      searchDocumentFormData: {
        type: "",
        group_id: "",
        category_id: "",
        searchedDocuments: [],
      },
      standardDocumentsMap: companyDocumentsData.STANDARD_DOCUMENTS_MAP,
      standardDocumentsList: companyDocumentsData.STANDARD_DOCUMENTS_LIST,

      documentViewComponentsMap:
        companyDocumentsData.EMP_DOC_VIEW_COMPONENT_MAP,
    };
  },
  computed: {
    ...mapGetters("companyDocuments", ["getCompanyAllDocuments"]),
    ...mapGetters("templatesData", ["getTemplateDataByentityId"]),
    ...mapGetters("documentCategories", ["getAllCategories"]),
    ...mapGetters("documentGroups", ["getAllGroups"]),

    getTotalDocuments() {
      return (documents) => {
        return (
          documents.static.length +
          documents.custom.length +
          documents.standard.length +
          documents.requested.length
        );
      };
    },
    checkForChildren() {
      return (this.elements || []).filter(
        (e) => e.parent_entity_field_key == this.selectedItem.key
      ).length
        ? true
        : false;
    },
    checkForChildrenWithActiveParent() {
      return (this.elements || []).filter(
        (e) =>
          this.elements[this.activatedItemIndex] &&
          e.parent_entity_field_key ==
            this.elements[this.activatedItemIndex].key
      ).length
        ? true
        : false;
    },
    checkForRepeatableChild() {
      return (this.elements || []).filter(
        (e) =>
          this.elements[this.activatedItemIndex] &&
          e.parent_repeatable_field_key ==
            this.elements[this.activatedItemIndex].key
      ).length
        ? true
        : false;
    },
    checkForRepeatableChildren() {
      return (this.elements || []).filter(
        (e) => e.parent_repeatable_field_key == this.selectedItem.key
      ).length
        ? true
        : false;
    },
  },
  methods: {
    isDocExisted(doc, type) {
      type = type.toLowerCase();
      if (type == "standard") {
        return this.newlySelectedDocuments[type].find(
          (e) => e.type == doc.type && e.value == doc.value
        ) || this.documentsData.find((e) => e.standard_document == doc.value)
          ? true
          : false;
      } else {
        return this.newlySelectedDocuments[type].find(
          (e) => e._id == doc._id
        ) || this.documentsData.find((e) => e.company_document_id == doc._id)
          ? true
          : false;
      }
    },

    async onAddNewDocument() {
      this.configureCompanyDocumentsVisible = true;
      this.newlySelectedDocuments.static = [];
      this.newlySelectedDocuments.standard = [];
      this.newlySelectedDocuments.custom = [];
      this.newlySelectedDocuments.requested = [];
      this.searchDocumentFormData.type = "";
      this.searchDocumentFormData.group_id = "";
      this.searchDocumentFormData.category_id = "";
      this.searchDocumentFormData.searchedDocuments = [];
      this.fetchCategories();
      this.fetchGroups();
    },
    async fetchCategories() {
      await this.$store.dispatch("documentCategories/fetchAllCategories", {
        get_all: true,
      });
    },
    async fetchGroups() {
      await this.$store.dispatch("documentGroups/fetchAllGroups", {
        get_all: true,
      });
    },

    async getCompanyDocuments() {
      this.fetchingCompanyDocumentDetails = true;
      let params = {
        type: this.searchDocumentFormData.type || undefined,
        category: this.searchDocumentFormData.category_id || undefined,
        search_string: this.searchDocumentFormData.search_string || undefined,
        groups: this.searchDocumentFormData.group_id || undefined,
        get_all: true,
      };
      await this.$store.dispatch(
        "companyDocuments/fetchCompanyAllDocuments",
        params
      );

      this.fetchingCompanyDocumentDetails = false;
    },
    // addDocumentToStep(doc, type) {
    //   if (!this.isDocExisted(doc, type)) {
    //     this.newlySelectedDocuments[type].push(doc);
    //   }
    // },

    addDocumentToStep(doc, type) {
      if (!this.isDocExisted(doc, type)) {
        if (doc.type == "CUSTOM") {
          if (doc.configurable_document_id) {
            this.newlySelectedDocuments[type].push(doc);
          } else {
            this.$message.warning({
              message: "Selected Custom Document has no configuration",
              showClose: true,
            });
          }
        } else {
          this.newlySelectedDocuments[type].push(doc);
        }
      }
    },
    async doneCompanyDocuemnts() {
      this.configureCompanyDocumentsVisible = false;
      if (this.getTotalDocuments(this.newlySelectedDocuments) > 0) {
        await this.addWorkflowEmployeeDocument();
      }
    },
    async fecthEntityData() {
      try {
        if (this.selectedEntity && this.selectedEntity.length) {
          this.allEntitytemplateData = [];
          let params = {
            templateIds: this.selectedEntity
              .filter((e) => e.template_id)
              .flatMap((e) => e.template_id),
            entityId: this.$route.params.entity_id,
          };
          await this.$store.dispatch(
            "templatesData/fetchTemplateDataByEntity",
            params
          );
          if (this.getTemplateDataByentityId) {
            this.allEntitytemplateData = this.getTemplateDataByentityId;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    doneCompanyUserDocuemnts() {
      this.configureCompanyDocumentsVisible = false;
    },
    removeComapnyDocument(type, index) {
      this.newlySelectedDocuments[type].splice(index, 1);
    },
    preareNewlyAddedDocumentData() {
      let data = {
        static: [],
        standard: [],
        custom: [],
        requested: [],
      };
      data.static = this.newlySelectedDocuments.static.map((e) => e._id);
      data.custom = this.newlySelectedDocuments.custom.map((e) => e._id);
      data.requested = this.newlySelectedDocuments.requested.map((e) => e._id);
      data.standard = this.newlySelectedDocuments.standard.map((e) => e.value);
      return data;
    },
    getStandardDocumentSlug(standardDocument) {
      return companyDocumentsData.STANDARD_DOCUMENTS_MAP[standardDocument].slug;
    },
    closeUploadedDocumentDialog() {
      this.uploadRequestedDocumentDialog = false;
    },

    getEmployeeDocumentComponentByCompanyDocument(companyDocument) {
      let type = companyDocument.type;
      if (type == "CUSTOM") {
        return this.documentViewComponentsMap[type][
          companyDocument.configure_type
        ];
      } else {
        return this.documentViewComponentsMap[type];
      }
    },
    checkIsRepeatable(selectedItem) {
      if (
        selectedItem &&
        selectedItem.entity_id &&
        this.allUsersEntityData &&
        selectedItem.template_id
      ) {
        let selectedEntity = this.allUsersEntityData.find(
          (e) => e && e.id == selectedItem.entity_id
        );
        if (selectedEntity && selectedEntity.templates) {
          let selectedTemp = selectedEntity.templates.find(
            (e) => e && e.template_id == selectedItem.template_id
          );
          if (
            selectedTemp &&
            selectedTemp.is_repeatable &&
            !selectedItem.indexKey &&
            selectedItem.type != "REPEATABLE_PARENT" &&
            !selectedItem.parent_repeatable_field_key
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    },
    checkDisabled() {
      if (this.selectedItem.type == "PRIMARY_FIELDS") {
        if (
          !this.selectedItem.selected_tag ||
          !this.selectedItem.selected_user
        ) {
          return true;
        }
        return false;
      }
      if (this.selectedItem.field_type == "ENTITY_FIELD") {
        if (
          !this.selectedItem.template_id ||
          !this.selectedItem.key ||
          this.checkIsRepeatable(this.selectedItem)
        ) {
          return true;
        }
      }
      if (this.selectedItem.type == "CURRENCY") {
        if (
          this.selectedItem.validations &&
          !this.selectedItem.validations.currency
        ) {
          return true;
        }
      }
      if (this.selectedItem.field_type == "ENTITY") {
        if (!this.selectedItem.entity_id || !this.selectedItem.key) {
          return true;
        }
      }
      if (this.selectedItem.field_type == "ENTITY_VARIABLE") {
        if (
          !this.selectedItem.entity_id ||
          !this.selectedItem.key ||
          !this.selectedItem.template_id ||
          (!this.selectedItem.parent_entity_field_key &&
            !this.selectedItem.parent_repeatable_field_key)
        ) {
          return true;
        }
      }
      if (this.selectedItem.type == "INITIAL" && this.selectedItem.text) {
        return false;
      }
      if (this.selectedItem.type == "IMAGE" && this.imgData) {
        return false;
      }
      if (
        this.selectedItem.type == "TABLE" &&
        this.selectedItem.data &&
        this.selectedItem.headers &&
        this.selectedItem.data.length &&
        this.selectedItem.headers.length
      ) {
        return false;
      }
      if (this.selectedItem.type == "my-signature") {
        return false;
      } else if (this.selectedItem.type == "DATE_SIGNED") {
        return !this.selectedItem.signature_field;
      }

      if (
        this.selectedItem.type == "HEADING" &&
        this.selectedItem.selected_tag &&
        this.selectedItem.content &&
        this.selectedItem.content.trim()
      ) {
        return false;
      }

      if (
        this.selectedItem.type == "PARAGRAPH" &&
        this.selectedItem.content &&
        this.selectedItem.content.trim()
      ) {
        return false;
      }

      return this.selectedItem.label && this.selectedItem.filled_by
        ? false
        : true;
    },
    async save() {
      let pageBoundary = this.getPagesBoundaries(this.selectedItem.y);
      if (
        this.selectedItem.filters &&
        this.selectedItem.filters.length &&
        this.selectedItem.entity_data_id
      ) {
        this.selectedItem.filters = [];
      }
      var newWidth = 0;
      if (this.selectedItem.type == "ENTITY") {
        bus.$emit("entity-selected");
      }
      if(this.selectedItem.type == "HORIZONTAL_LINE"){
        console.log(this.elements)
       }
      if (this.selectedItem.type == "MY_INITIAL") {
        await this.$refs.configureField.saveCapturedInitial();
        await this.getCurrentUserInitial();
        this.elements.forEach((el) => {
          if (el.type === "MY_INITIAL") {
            el.value = this.currentUserInitial;
          }
        });
        this.selectedItem.value = this.currentUserInitial;
      }
      if (this.selectedItem.type == "CHECKBOX") {
        this.selectedItem.width = this.selectedItem.height;
        this.isAspectRatio = false;
        setTimeout(() => {
          this.isAspectRatio = true;
        }, 1000);
      }
      if (this.selectedItem.type === "my-signature") {
        await this.$refs.configureField.saveCapturedSignature();
        if (this.getAuthenticatedUser && this.getAuthenticatedUser.signature) {
          this.elements.forEach((el) => {
            if (el.type === "my-signature") {
              el.source = this.getAuthenticatedUser.signature;
            }
          });
          this.selectedItem.source = this.getAuthenticatedUser.signature;
          var dimensions = await this.getImageDimensions(
            this.selectedItem.source
          );
          this.isAspectRatio = false;
          this.elements.forEach((el) => {
            if (el.type === "my-signature") {
              el.source = this.getAuthenticatedUser.signature;
              // el.width = dimensions.w;
              el.height = (el.width * dimensions.h) / dimensions.w;
            }
          });
          this.selectedItem.height =
            (this.selectedItem.width * dimensions.h) / dimensions.w;
          setTimeout(() => {
            this.isAspectRatio = true;
          }, 1000);
        }
      }

      if (this.selectedItem.type === "PRIMARY_FIELDS") {
        this.selectedItem.content = this.getFieldVal(
          this.selectedItem.selected_tag,
          this.selectedItem.selected_user
        );
        let fontSize =
          this.selectedItem.font && this.selectedItem.font.size
            ? this.selectedItem.font.size
            : 16;
        this.selectedItem.height = fontSize * 1.5;
        if (!this.selectedItem.content) {
          this.selectedItem.content = "";
        }
        if (this.selectedItem.template_id) {
          delete this.selectedItem.template_id;
        }
        if (this.selectedItem.value) {
          delete this.selectedItem.value;
        }
        this.selectedItem.field_type = "CUSTOM_FIELD";
        this.elements[this.selectedItemIndex] = { ...this.selectedItem };
        this.addItemDataDialogVisible = false;

        return;
      } else if (
        this.selectedItem.type != "HEADING" &&
        this.selectedItem.type != "PARAGRAPH"
      ) {
        if (this.selectedItem.content) {
          delete this.selectedItem.content;
        }
      }
      if (this.selectedItem.type === "SINGLE_LINE_TEXT") {
        if (this.selectedItem.selected_tag) {
          delete this.selectedItem.selected_tag;
        }
        let fontSize =
          this.selectedItem.font && this.selectedItem.font.size
            ? this.selectedItem.font.size
            : 16;
        this.selectedItem.height = fontSize * 1.5;
        if (this.selectedItem.content) {
          delete this.selectedItem.content;
        }
        // let indx = this.getLastIndexOfElement("SINGLE_LINE_TEXT");
        // this.selectedItem.label = "Single Line Text " + indx + 1;
        if (
          this.selectedItem.field_type != "ENTITY_FIELD" &&
          this.selectedItem.field_type != "ENTITY" &&
          this.selectedItem.field_type != "ENTITY_VARIABLE"
        ) {
          this.selectedItem.field_type = "CUSTOM_FIELD";
        }
        this.elements[this.selectedItemIndex] = { ...this.selectedItem };
        this.addItemDataDialogVisible = false;
        return;
      }
      if (this.selectedItem.type == "TABLE") {
        let tblWidth = this.selectedItem.headers.length * 70;
        if (this.selectedItem.width < tblWidth) {
          this.selectedItem.width = tblWidth;
        }
      }
      
      if (this.selectedItem.type == "HEADING") {
        newWidth = 0;
        if (this.selectedItem.selected_tag == "h1") {
          this.selectedItem.font.size = 32;
          newWidth = this.selectedItem.content.length * 14;
          this.selectedItem.height = this.selectedItem.height + 10;
        } else if (this.selectedItem.selected_tag == "h2") {
          this.selectedItem.font.size = 24;
          newWidth = this.selectedItem.content.length * 13;
        } else if (this.selectedItem.selected_tag == "h3") {
          this.selectedItem.font.size = 18.72;
          newWidth = this.selectedItem.content.length * 13;
        } else if (this.selectedItem.selected_tag == "h4") {
          this.selectedItem.font.size = 16;
          newWidth = this.selectedItem.content.length * 13;
        } else if (this.selectedItem.selected_tag == "h5") {
          this.selectedItem.font.size = 13.28;
          newWidth = this.selectedItem.content.length * 13;
        } else if (this.selectedItem.selected_tag == "h6") {
          this.selectedItem.font.size = 10.72;
          newWidth = this.selectedItem.content.length * 13;
        }
        if (newWidth > this.selectedItem.width) {
          if (newWidth > this.pageWidth) {
            newWidth = this.pageWidth - 10;
          }
          if (
            this.selectedItem.x + newWidth >
            pageBoundary.pageOffset + pageBoundary.pageWidth
          ) {
            this.selectedItem.x =
              pageBoundary.pageOffset + pageBoundary.pageWidth - newWidth;
          }
          this.selectedItem.width = newWidth;
        }
      }
      if (this.selectedItem.type == "IMAGE") {
        if (this.imgData) {
          this.selectedItem.value = this.imgData;
          if (this.imgDataWidth > 0 && this.imgDataHeight > 0) {
            if (this.imgDataWidth > this.pageWidth) {
              this.selectedItem.width = this.pageWidth - 5;
              this.selectedItem.height =
                this.imgDataHeight * (this.pageWidth / this.imgDataWidth);
              this.selectedItem.x = 0;
              this.selectedItem.y = 0;
            } else {
              if (
                this.pageWidth <
                this.selectedItem.x + this.imgDataWidth - 5
              ) {
                this.selectedItem.x =
                  this.selectedItem.x -
                  (this.selectedItem.x + this.imgDataWidth - this.pageWidth) -
                  5;
              }
              this.selectedItem.width = this.imgDataWidth;
              this.selectedItem.height = this.imgDataHeight;
            }
          }
        }
      }
      if (this.selectedItem.type == "ATTACHMENT") {
        if (this.selectedItem.label.length > 12) {
          this.selectedItem.width = this.selectedItem.label.length * 8;
        }
        // let indx = this.getLastIndexOfElement("ATTACHMENT");
        // this.selectedItem.label = "Attachment " + indx + 1;
        if (this.selectedItem.field_type != "ENTITY_FIELD") {
          this.selectedItem.field_type = "CUSTOM_FIELD";
        }
      }
      if (this.selectedItem.type == "NUMBER") {
        let fontSize =
          this.selectedItem.font && this.selectedItem.font.size
            ? this.selectedItem.font.size
            : 16;
        this.selectedItem.height = fontSize * 1.5;
      }
      if (
        this.selectedItem.type == "SELECT" ||
        this.selectedItem.type == "MULTI_SELECT"
      ) {
        let fontSize =
          this.selectedItem.font && this.selectedItem.font.size
            ? this.selectedItem.font.size
            : 16;
        this.selectedItem.height = fontSize * 1.5;
        if (
          this.selectedItem &&
          this.selectedItem.options &&
          !this.selectedItem.options.length
        ) {
          this.$message({ message: "Please add options", type: "warning" });
          return;
        }
      }
      if (this.selectedItem.type == "SIGNATURE") {
        this.selectedItem.width = 225;
        this.selectedItem.height = 36;
        this.isAspectRatio = false;
        setTimeout(() => {
          this.isAspectRatio = true;
        }, 1000);
      }
      if (this.selectedItem.type == "INITIAL") {
        this.selectedItem.width = 100;
        this.selectedItem.height = 50;
      }
      console.log(
        "this.selectedItem 22",
        this.selectedItem,
        this.selectedItemIndex
      );
      this.imgData = null;
      this.elements[this.selectedItemIndex] = { ...this.selectedItem };
      if (this.selectedItem.type == "FORMULA") {
        bus.$emit("formula-updated");
      }
      this.addItemDataDialogVisible = false;
      this.dialogFormVisible =  false;
      this.selectedItem.key = "";
      this.selectedItem.label = "";
      this.selectedItem.filled_by = "";
      this.selectedItem.placeholder = "";
      if (this.selectedItem.type == "PARAGRAPH") {
        setTimeout(() => {
          const element = document.getElementById(
            `MULTI_LINE_TEXT_${this.selectedItem.index}`
          );
          if (element && element.scrollHeight) {
            this.selectedItem.height = element.scrollHeight;
            this.elements[this.selectedItemIndex] = {
              ...this.elements[this.selectedItemIndex],
              ...{ height: element.scrollHeight },
            };
          }
        }, 100);
      }
    },
    checkLabelIsReserved() {
      let reserve = false;
      if (
        this.selectedItem.label &&
        this.reservedLabels.indexOf(this.selectedItem.label.toLowerCase()) != -1
      ) {
        reserve = true;
      }
      return reserve;
    },
    getFieldsFromElements() {
      let duplicateKeyCounter = {};
      this.templatesUsed = [];
      this.entitiesUsed = [];
      this.elements.forEach((e) => {
        let key = this.generateKeyForField(e.label);
        if (!e.entity_id && !e.template_id) {
          if (typeof duplicateKeyCounter[key] == "number") {
            let index =
              e.key && e.key.includes(key + "_") && e.key.split(key + "_")[1]
                ? parseInt(e.key.split(key + "_")[1]) + 1
                : 1;
            if (index > duplicateKeyCounter[key]) {
              duplicateKeyCounter[key] = index;
            }
          } else {
            duplicateKeyCounter[key] =
              e.key && e.key.includes(key + "_") && e.key.split(key + "_")[1]
                ? parseInt(e.key.split(key + "_")[1]) + 1
                : 1;
          }
        }
      });
      return this.elements.map((element, index) => {
        element.sno = index + 1;
        if (!element.entity_id && !element.template_id) {
          let newKey = this.generateKeyForField(element.label);
          if (duplicateKeyCounter[newKey]) {
            if (!element.key) {
              let index = parseInt(duplicateKeyCounter[newKey]);
              element.key = newKey + "_" + index+1;
              duplicateKeyCounter[newKey]++;
            }
          } else {
            duplicateKeyCounter[newKey] = 1;
            if (!element.key) {
              element.key = newKey;
              duplicateKeyCounter[newKey]++;
            }
          }
        }
        if (element.type == "HEADING") {
          element.content = element.content ? element.content : element.value;
          element.source = element.selected_tag;
        }

        if (element.type == "PARAGRAPH") {
          element.content = element.content ? element.content : element.value;
          element.source = "";
        }
        if (element.type == "HORIZONTAL_LINE") {
          element.value = element.content;
        }
        return element;
      });
    },
    deleteElement() {
      if (this.selectedItemIndex > -1 && this.selectedItem) {
        if (
          this.elements[this.selectedItemIndex] &&
          this.elements[this.selectedItemIndex]["type"] &&
          (this.elements[this.selectedItemIndex]["type"] == "SIGNATURE" ||
            this.elements[this.selectedItemIndex]["type"] == "my-signature") &&
          this.elements[this.selectedItemIndex]["filled_by"] == "SENDER"
        ) {
          let selectedUserSignatures = this.elements.filter(
            (el) =>
              (el.type == "SIGNATURE" || el.type == "my-signature") &&
              el.filled_by == "SENDER"
          );
          if (selectedUserSignatures && selectedUserSignatures.length == 1) {
            // let dateSignedIndex = this.elements.findIndex(el => el.type == 'DATE_SIGNED' && el.filled_by == 'SENDER');
            // this.elements.splice(dateSignedIndex, 1);
            let dateSignedIndexs = [];
            this.elements.forEach((el, index) => {
              if (el.type == "DATE_SIGNED" && el.filled_by == "SENDER") {
                dateSignedIndexs.push(index);
              }
            });
            if (dateSignedIndexs.length) {
              dateSignedIndexs.forEach((el) => this.elements.splice(el, 1));
            }
          }
        }
        if (
          this.elements[this.selectedItemIndex] &&
          this.elements[this.selectedItemIndex]["type"] &&
          this.elements[this.selectedItemIndex]["filled_by"] &&
          this.elements[this.selectedItemIndex]["type"] == "SIGNATURE" &&
          this.elements[this.selectedItemIndex]["filled_by"] != "SENDER"
        ) {
          let selectedUserSignatures = this.elements.filter(
            (el) =>
              el.type == "SIGNATURE" &&
              el.filled_by == this.elements[this.selectedItemIndex]["filled_by"]
          );
          if (selectedUserSignatures && selectedUserSignatures.length == 1) {
            // let dateSignedIndex = this.elements.filter(el => el.type == 'DATE_SIGNED' && el.filled_by == this.elements[this.selectedItemIndex]['filled_by']);
            let dateSignedIndexs = [];
            this.elements.forEach((el, index) => {
              if (
                el.type == "DATE_SIGNED" &&
                el.filled_by ==
                  this.elements[this.selectedItemIndex]["filled_by"]
              ) {
                dateSignedIndexs.push(index);
              }
            });
            if (dateSignedIndexs.length) {
              dateSignedIndexs.forEach((el) => this.elements.splice(el, 1));
            }
          }
        }
        if (
          this.elements[this.selectedItemIndex] &&
          this.elements[this.selectedItemIndex]["type"] == "ENTITY" &&
          this.checkForChildren
        ) {
          this.$message({
            message:
              "Some fields are associated to this entity field. Can't delete.",
            type: "warning",
          });
          return;
        }
        if (
          this.elements[this.selectedItemIndex] &&
          this.elements[this.selectedItemIndex]["type"] ==
            "REPEATABLE_PARENT" &&
          this.checkForRepeatableChildren
        ) {
          this.$message({
            message:
              "Some fields are associated to this repeatable field. Can't delete.",
            type: "warning",
          });
          return;
        }
        this.elements.splice(this.selectedItemIndex, 1);
        this.addItemDataDialogVisible = false;
        this.selectedItemIndex = -1;
        this.selectedItem = {};
      }
    },
    generateKeyForField(label) {
      let parsedLabel = label.replace(/[^a-zA-Z 0-9]/g, "");
      parsedLabel = parsedLabel.toLowerCase().split(" ").join("_");

      return parsedLabel;
    },
    fillImageData({ file, imgDataHeight, imgDataWidth }) {
      this.imgData = file;
      this.imgDataWidth = imgDataWidth;
      this.imgDataHeight = imgDataHeight;
    },
    checkRoleDuplicate(name, index) {
      let checkExistedUser = "";
      this.users.forEach((e, i) => {
        if (
          e.name &&
          name &&
          (typeof index != "number" || (index > -1 && index != i))
        ) {
          if (
            this.generateKeyForField(name) == this.generateKeyForField(e.name)
          ) {
            checkExistedUser = e.name;
          }
        }
      });
      //
      if (checkExistedUser) {
        return false;
      } else {
        return true;
      }
    },
  },
};