import { mapGetters } from "vuex";
import { bus } from "../main";

export default {
  data() {
    return {
      allTemplatesData: {},
      nonCompletedUserValues: [],
      notCompletedUsers: [],
      allUsersRepeatableDataKeys: {},
      repeatableIndexKeys: {},
      entityPrimaryData: {},
      getPrimaryTitle: "",
    };
  },
  computed: {
    isPageInEntityGroups() {
      return this.$route.path.indexOf("entity-groups") > -1;
    },
    ...mapGetters("entities", [
      "getEntityDataByQuery",
      "getEntitiesDataByQuery",
      "getCompanyEntityDetails",
      "getEntityPrimaryData",
    ]),
    ...mapGetters("templatesData", [
      "getTemplatesData",
      "getRepeatableTemplateIds",
      "getAddNewRepeatableDataStatus",
      "getAddNewRepeatableData",
      "getAddNewRepeatableDataErrors",
    ]),
    checkPrimaryFieldsFilled() {
      if (this.newRepeatableData && this.newRepeatableTemplateData) {
        let isFilled = false;
        this.newRepeatableTemplateData.forEach((e) => {
          if (e && e.is_primary && !this.newRepeatableData[e.key]) {
            isFilled = true;
          }
        });
        return isFilled;
      }
      return true;
    },
  },
  methods: {
    async updateUserEntityFieldsRelations(users){
      let mappedUserDetails = {};
      users.filter(user => user.contact_type).forEach(user => {
        mappedUserDetails[user.value] = {
          entity_id: user.contact_type._id || user.contact_type,
          data_id: user.entity_data_id ? user.entity_data_id._id ? user.entity_data_id._id : user.entity_data_id : ''
        }
      });
      this.elements.forEach(ele => {
        if(ele.field_type == "ENTITY" && ele.filters && ele.filters.length){
          let hasUserLikendFilter = ele.filters.filter(e => e.data_source == "user_entity" && e.data_type == "RELATION");
          if(hasUserLikendFilter && hasUserLikendFilter.length){
            let filters = ele.filters.map(e => {
              if(e.data_source == "user_entity" && e.data_type == "RELATION" && mappedUserDetails[e.field.split("/")[1]]){
                let selectedUser = mappedUserDetails[e.field.split("/")[1]];
                if(selectedUser.data_id){
                  e.relation_entity_id = selectedUser.entity_id;
                  e.value = selectedUser.data_id;
                }
              }
              return e;
            });
            ele.filters = [...filters];
            bus.$emit("entity-ur-updated", {
              field: ele
            });
          }
        }
      });
    },
    async getEntityPrimaryTitle() {
      let name = "";
      let template =
        this.getEntityDataById &&
          this.getEntityDataById.primaryFields &&
          this.getEntityDataById.primaryFields[0]
          ? this.getEntityDataById.primaryFields[0]
          : null;
      let key =
        this.getEntityDataById &&
          this.getEntityDataById.primaryFields &&
          this.getEntityDataById.primaryFields[0] &&
          this.getEntityDataById.primaryFields[0].key
          ? this.getEntityDataById.primaryFields[0].key
          : this.entityPrimaryData &&
            this.entityPrimaryData.entity_prime_data &&
            Object.keys(this.entityPrimaryData.entity_prime_data) &&
            Object.keys(this.entityPrimaryData.entity_prime_data)[0]
            ? Object.keys(this.entityPrimaryData.entity_prime_data)[0]
            : null;
      if (this.entityPrimaryData && this.entityPrimaryData.entity_prime_data) {
        if (key && this.entityPrimaryData.entity_prime_data[key]) {

          if (this.entityPrimaryData.entity_prime_data[key + "/name"]) {
            name = this.entityPrimaryData.entity_prime_data[key + "/name"];
          }
          else {
            name = this.entityPrimaryData.entity_prime_data[key];
          }
        } else {
          let data = await this.fetchPrimaryTemplateData(
            template.template_id,
            this.entityPrimaryData._id
          );
          if (key && data && data.template_data) {
            name = data.template_data[key];
          }
        }
      } else {
        let data = await this.fetchPrimaryTemplateData(
          template.template_id,
          this.entityPrimaryData._id
        );
        if (key && data && data.template_data) {
          name = data.template_data[key];
        }
      }
      this.getPrimaryTitle = name;
    },
    async getEntityPrimaryTitleFromNew() {
      let name = "";
      let template =
        this.getEntityDataById &&
          this.getEntityDataById.primaryFields &&
          this.getEntityDataById.primaryFields[0]
          ? this.getEntityDataById.primaryFields[0]
          : null;
      let key =
        this.getEntityDataById &&
          this.getEntityDataById.primaryFields &&
          this.getEntityDataById.primaryFields[0] &&
          this.getEntityDataById.primaryFields[0].key
          ? this.getEntityDataById.primaryFields[0].key
          : this.getNewEntityData &&
            this.getNewEntityData.entity_prime_data &&
            Object.keys(this.getNewEntityData.entity_prime_data) &&
            Object.keys(this.getNewEntityData.entity_prime_data)[0]
            ? Object.keys(this.getNewEntityData.entity_prime_data)[0]
            : null;
      if (this.getNewEntityData && this.getNewEntityData.entity_prime_data) {
        if (key && this.getNewEntityData.entity_prime_data[key]) {

          if (this.getNewEntityData.entity_prime_data[key + "/name"]) {
            name = this.getNewEntityData.entity_prime_data[key + "/name"];
          }
          else {
            name = this.getNewEntityData.entity_prime_data[key];
          }
        } else {
          let data = await this.fetchPrimaryTemplateData(
            template.template_id,
            this.getNewEntityData._id
          );
          if (key && data && data.template_data) {
            name = data.template_data[key];
          }
        }
      } else {
        let data = await this.fetchPrimaryTemplateData(
          template.template_id,
          this.entityPrimaryData._id
        );
        if (key && data && data.template_data) {
          name = data.template_data[key];
        }
      }
      this.getPrimaryTitle = name;
    },
    async fetchPrimaryTemplateData(templateId, entityDataId) {
      if (!templateId || !entityDataId) {
        return null;
      }
      await this.$store.dispatch("templatesData/fetchUserTemplateData", {
        entity_data_id: entityDataId,
        template_id: templateId,
      });
      if (this.getTemplatesData && this.getTemplatesData[0]) {
        return this.getTemplatesData[0];
      } else {
        return null;
      }
    },
    async fetchEntityData(id) {
      try {
        await this.$store.dispatch("entities/fetchEntityPrimaryDataById", id);
        if (this.getEntityPrimaryData) {
          this.entityPrimaryData = this.getEntityPrimaryData;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getTemplateFields(data) {
      let fields = [];
      data.sections.forEach((e) => {
        fields = [...fields, ...e.fields];
      });
      fields = fields.map((e) => {
        e.template_id = data._id;
        return e;
      });
      return fields;
    },
    checkIsUserConfigured(item, documentUsers) {
      if (item) {
        if (item.field_type == "ENTITY_FIELD" && item.selected_user) {
          let selectedUser = documentUsers.find(
            (e) => e.value == item.selected_user
          );
          if (selectedUser && selectedUser.entity_data_id) {
            return false;
          } else {
            return true;
          }
        } else if (item.field_type == "ENTITY_VARIABLE") {
          return true;
        }
      }
      return false;
    },
    handleCloseRepeatable() {
      this.repeatableDataModal = false;
      this.newRepeatableData = {};
    },
    async addNewRepeatableData(documentUsers) {
      this.repeatableDataLoading = true;
      this.newRepeatableData = {
        ...this.newRepeatableData,
        ...{ indexKey: this.repeatableIds[0] },
      };
      let entityDataId = "";
      if (this.repeatableSelectedField.field_type == "ENTITY_FIELD") {
        const selectedUser = documentUsers.find(
          (e) => e.value == this.repeatableSelectedField.selected_user
        );
        if (selectedUser && selectedUser.entity_data_id) {
          entityDataId = selectedUser.entity_data_id._id
            ? selectedUser.entity_data_id._id
            : selectedUser.entity_data_id;
        }
      }
      await this.$store.dispatch("templatesData/addNewRepeatableData", {
        entity_data_id: entityDataId,
        template_id: this.repeatableSelectedField.template_id,
        template_data: this.newRepeatableData,
        company_id:
          this.getSingleDocumentData &&
            this.getSingleDocumentData.data &&
            this.getSingleDocumentData.data.company_id
            ? this.getSingleDocumentData.data.company_id
            : null,
        user_id:
          this.getSingleDocumentData &&
            this.getSingleDocumentData.data &&
            this.getSingleDocumentData.data.created_by
            ? this.getSingleDocumentData.data.created_by._id
              ? this.getSingleDocumentData.data.created_by._id
              : this.getSingleDocumentData.data.created_by
            : null,
      });
      if (this.getAddNewRepeatableDataStatus) {
        this.$notify.success({
          title: "Success",
          message: "Date saved successfully",
        });
        if (
          this.getAddNewRepeatableData &&
          this.getAddNewRepeatableData.template_data
        ) {
          if (this.repeatableSelectedField.field_type == "ENTITY_FIELD") {
            const selectedUser = documentUsers.find(
              (e) => e.value == this.repeatableSelectedField.selected_user
            );
            let templateData = this.getTemplatesData;
            const selectedTemplateDataIndex =
              this.getTemplatesData && this.getTemplatesData.length
                ? this.getTemplatesData.findIndex(
                  (t) =>
                    (selectedUser &&
                      selectedUser.entity_data_id &&
                      t.template_id ==
                      this.repeatableSelectedField.template_id &&
                      t.entity_data_id == selectedUser.entity_data_id._id) ||
                    t.entity_data_id == selectedUser.entity_data_id
                )
                : null;
            if (selectedTemplateDataIndex > -1) {
              templateData[selectedTemplateDataIndex] = {
                ...this.getAddNewRepeatableData,
              };
            }
            await this.$store.commit(
              "templatesData/setTemplatesData",
              templateData,
              {
                root: true,
              }
            );
            let allParentFields = this.elements.filter(
              (e) =>
                e.selected_user == this.repeatableSelectedField.selected_user &&
                e.type == "REPEATABLE_PARENT" &&
                e.template_id == this.repeatableSelectedField.template_id &&
                e.entity_id == this.repeatableSelectedField.entity_id
            );
            if (allParentFields && allParentFields.length) {
              allParentFields.forEach((el) => {
                let parentIndex = this.elements.findIndex(
                  (e) => e.key == el.key
                );
                if (
                  parentIndex > -1 &&
                  Object.keys(this.getAddNewRepeatableData.template_data)[0]
                ) {
                  let data =
                    this.getAddNewRepeatableData.template_data[
                    Object.keys(this.getAddNewRepeatableData.template_data)[0]
                    ];
                  let obj = this.elements[parentIndex];
                  obj.repeatable_data = data;
                  if (el.key == this.repeatableSelectedField.key) {
                    obj.indexKey = this.newRepeatableData.indexKey;
                  }
                  this.elements[parentIndex] = { ...obj };
                  bus.$emit("repeatable-data-selected", {
                    key: el.key,
                    repeatableData: data,
                    indexKey:
                      el.key == this.repeatableSelectedField.key
                        ? this.newRepeatableData.indexKey
                        : null,
                  });
                }
              });
            }
          }
          console.log(
            "this.elements this.elements this.elements",
            this.elements
          );
        }
        this.handleCloseRepeatable();
        this.repeatableDataLoading = false;
      } else {
        this.repeatableDataLoading = false;
        let message = "Error while adding data";
        if (
          this.getAddNewRepeatableDataErrors &&
          this.getAddNewRepeatableDataErrors.message
        ) {
          message = this.getAddNewRepeatableDataErrors.message;
        }
        this.$notify.error({
          title: "Error",
          message: message,
        });
      }
      console.log("newRepeatableData", this.newRepeatableData);
      console.log("indexKeys", this.repeatableIds, entityDataId);
    },
    setRepeatableUserDataToField(selectedUser, template_id) {
      let dataValues = this.allTemplatesData[selectedUser + "-" + template_id];
      if (dataValues && Object.keys(dataValues)[0]) {
        return dataValues[Object.keys(dataValues)[0]];
      } else {
        return null;
      }
    },
    setRepeatableDataStucture(data, name) {
      if (data && Object.keys(data) && Object.keys(data).length > 1) {
        let obj = data;
        data = {};
        if (obj && obj.indexKey) {
          data[name] = [obj];
        } else {
          data[name] = [{ ...obj, ...{ indexKey: "newData:0" } }];
        }
      }
      return data;
    },
    updateEntityVariablesData(entityDataId, field, data, value) {
      let originalFields = this.elements;
      let parentIndex = originalFields.findIndex((e) => e.key == field.key);
      if (
        parentIndex != -1 &&
        originalFields[parentIndex] &&
        originalFields[parentIndex].key == field.key
      ) {
        let temp = {
          entity_data_id: entityDataId,
          value: value ? value : entityDataId,
        };
        // field.entity_data_id = entityDataId;
        // field.value = value ? value : entityDataId;
        this.elements[parentIndex] = { ...this.elements[parentIndex], ...temp };
        let fields = this.elements;
        if (field.field_type == "ENTITY") {
          setTimeout(() => {
            this.elements = [];
            fields.forEach((e, i) => {
              if (
                e.parent_entity_field_key == field.key &&
                !e.parent_repeatable_field_key
              ) {
                let fieldTemplateId = e.template_id;
                let key = e.key;
                if (e.type != "REPEATABLE_PARENT") {
                  if (e.indexKey) {
                    key = key.split("-")[2];
                  } else {
                    key = key.split("-")[1];
                  }
                  if (key.includes("#")) {
                    key = key.split("#")[0];
                  }
                }
                if (
                  e.field_type == "ENTITY_FIELD" &&
                  e.parent_template_field &&
                  e.parent_template_field.includes("#")
                ) {
                  fieldTemplateId = e.parent_template_field.split("#")[0];
                  key = e.parent_template_field.split("#")[1];
                }
                if (data[fieldTemplateId]) {
                  if (
                    e.indexKey ||
                    (e.type == "REPEATABLE_PARENT" &&
                      !e.parent_repeatable_field_key)
                  ) {
                    let selectedData = data[fieldTemplateId];
                    if (selectedData) {
                      let repeatableData =
                        selectedData[Object.keys(selectedData)[0]];
                      if (e.type == "REPEATABLE_PARENT") {
                        this.$set(e, "repeatable_data", repeatableData);
                        bus.$emit("repeatable-data-selected", {
                          key: e.key,
                          repeatableData: repeatableData,
                        });
                      } else {
                        if (e.indexKey.includes(":")) {
                          let index = e.indexKey.split(":")[1];
                          this.$set(
                            e,
                            "value",
                            repeatableData[index - 1] &&
                              repeatableData[index - 1][key]
                              ? repeatableData[index - 1][key + "/name"]
                                ? repeatableData[index - 1][key + "/name"]
                                : repeatableData[index - 1][key]
                              : ""
                          );
                          if (e.type == "ENTITY") {
                            e.entity_data_id = e.value;
                            bus.$emit("entityDataId-selected", {
                              entityDataId:
                                repeatableData[index - 1] &&
                                  repeatableData[index - 1][key]
                                  ? repeatableData[index - 1][key]
                                  : "",
                              form: e,
                              reset: true,
                            });
                          }
                        } else {
                          let selectedRow = repeatableData.find(
                            (el) => el.indexKey == e.indexKey
                          );
                          this.$set(
                            e,
                            "value",
                            selectedRow && selectedRow[key]
                              ? selectedRow[key]
                              : ""
                          );
                        }
                      }
                    } else {
                      this.$set(e, "value", "");
                      if (e.type == "REPEATABLE_PARENT") {
                        this.$set(e, "repeatable_data", []);
                        bus.$emit("repeatable-data-selected", {
                          key: e.key,
                          repeatableData: [],
                        });
                      }
                    }
                  } else {
                    this.$set(
                      e,
                      "value",
                      data[fieldTemplateId][key]
                        ? data[fieldTemplateId][key]
                        : ""
                    );
                  }
                } else {
                  this.$set(e, "value", "");
                  if (e.type == "REPEATABLE_PARENT") {
                    this.$set(e, "repeatable_data", []);
                    bus.$emit("repeatable-data-selected", {
                      key: e.key,
                      repeatableData: [],
                    });
                  }
                }
                fields[i] = { ...e };
              }
              this.elements.push(e);
            });
          }, 100);
        }
      }
    },
    getTemplateFieldKey(key, el) {
      if (el.type != "REPEATABLE_PARENT") {
        if (el.indexKey) {
          key = key.split("-")[2];
        } else {
          key = key.split("-")[1];
        }
        if (key.includes("#")) {
          key = key.split("#")[0];
        }
      }
      return key;
    },
    getTemplateFieldValue(el) {
      if (el.type == "ENTITY") {
        return {
          value: el.value,
          entity_data_id: el.entity_data_id,
        };
      } else if (el.indexKey) {
        if (el.type == "ENTITY") {
          return {
            value: el.value,
            entity_data_id: el.entity_data_id,
            indexKey: el.indexKey,
          };
        }
        return {
          indexKey: el.indexKey,
          value: el.value,
        };
      }
      return el.value;
    },
    setTemplateFieldValue(data, key, indexKey) {
      if (indexKey) {
        let innerRow = data && data["data"] ? data["data"] : [];
        if (innerRow && innerRow.length) {
          let selectedRow = innerRow.find((e) => e && e.indexKey == indexKey);
          if (selectedRow && selectedRow[key]) {
            return selectedRow[key];
          }
          // else if(indexKey.includes(":") && indexKey.split(":") && innerRow[indexKey.split(":")[1] - 1]){
          //   return innerRow[indexKey.split(":")[1] - 1][key] ? innerRow[indexKey.split(":")[1] - 1][key] : '';
          // }
          return "";
        }
        return "";
      }
      return data[key] ? data[key] : "";
    },
    updateRepeatableVariablesData(repeatableDataId, field, data, value) {
      let originalFields = this.elements;
      let parentIndex = originalFields.findIndex((e) => e.key == field.key);
      if (
        parentIndex != -1 &&
        originalFields[parentIndex] &&
        originalFields[parentIndex].key == field.key
      ) {
        field.indexKey = repeatableDataId;
        field.value = repeatableDataId
          ? value
            ? value
            : repeatableDataId
          : "";
        this.elements[parentIndex] = {
          ...this.elements[parentIndex],
          ...field,
        };
        let fields = this.elements;
        setTimeout(() => {
          this.elements = [];
          fields.map((e, i) => {
            if (e.parent_repeatable_field_key == field.key) {
              console.log("111", data);
              let key = e.key;
              if (e.indexKey) {
                key = key.split("-")[2];
              } else {
                key = key.split("-")[1];
              }
              if (key.includes("#")) {
                key = key.split("#")[0];
              }
              e.indexKey = repeatableDataId ? repeatableDataId : "newData:1";
              e.key =
                field.key +
                "-" +
                (repeatableDataId ? repeatableDataId : "newData:1") +
                "-" +
                key +
                "#" +
                field.template_id;
              if (data[key]) {
                this.$set(
                  e,
                  "value",
                  data[key + "/name"] ? data[key + "/name"] : data[key]
                );
                e.indexKey = field.indexKey;
                e.key =
                  field.key +
                  "-" +
                  field.indexKey +
                  "-" +
                  key +
                  "#" +
                  field.template_id;
                if (e.type == "ENTITY") {
                  this.$set(e, "entity_data_id", data[key]);
                  bus.$emit("entityDataId-selected", {
                    entityDataId: e.value,
                    form: e,
                    reset: true,
                  });
                }
              } else {
                if (e.type == "ENTITY") {
                  this.$set(e, "entity_data_id", e.value);
                  bus.$emit("entityDataId-selected", {
                    entityDataId: e.value,
                    form: e,
                    reset: true,
                  });
                }
                this.$set(e, "value", "");
              }
              fields[i] = { ...e };
            }
            this.elements.push(e);
          });
        }, 100);
      }
    },
    getAllFieldsFromEntityData(entityData) {
      return entityData.sections
        .map((section) => section.fields)
        .reduce((sectionAFields, sectionBFields) => {
          return sectionAFields.concat(sectionBFields);
        });
    },
    getRelationshipFields(entityData) {
      let allFields = this.getAllFieldsFromEntityData(entityData);
      return allFields.filter((field) => field.input_type == "GLOBAL_VARIABLE");
    },
    async setEntityData(documentUsers) {
      this.allTemplatesData = {};
      let params = {
        entity_data_ids: [],
      };
      documentUsers.forEach((e) => {
        if (e.entity_data_id) {
          if (e.entity_data_id._id) {
            params.entity_data_ids.push(e.entity_data_id._id);
          } else {
            params.entity_data_ids.push(e.entity_data_id);
          }
        }
      });
      await this.$store.commit("templatesData/setTemplatesData", [], {
        root: true,
      });
      if (params.entity_data_ids && params.entity_data_ids.length) {
        await this.$store.dispatch(
          "templatesData/fetchUserTemplateData",
          params
        );
        this.setUsersEntityData(documentUsers);
      }
    },
    setUsersEntityData(documentUsers) {
      if (this.getTemplatesData && this.getTemplatesData.length) {
        documentUsers.forEach((e) => {
          const seletedUserTemplateData = this.getTemplatesData.filter(
            (dt) =>
              (e.entity_data_id &&
                e.entity_data_id._id &&
                dt.entity_data_id == e.entity_data_id._id) ||
              dt.entity_data_id == e.entity_data_id
          );
          seletedUserTemplateData.forEach((dt) => {
            this.allTemplatesData[e.value + "-" + dt.template_id] =
              dt.template_data;
          });
          this.elements.map((el) => {
            if (
              el.template_id &&
              el.selected_user == e.value &&
              this.allTemplatesData &&
              this.nonCompletedUserValues.indexOf(el.filled_by) != -1
            ) {
              if (el.type == "REPEATABLE_PARENT") {
                let value = this.setRepeatableUserDataToField(
                  el.selected_user,
                  el.template_id
                );
                console.log(" new value", value);
                if (value) {
                  el.repeatable_data = value;
                } else {
                  el.repeatable_data = [];
                }
                bus.$emit("repeatable-data-selected", {
                  key: el.key,
                  repeatableData: value,
                });
              } else {
                let value = this.setEntityDataToField(
                  el.key,
                  el.template_id,
                  el.indexKey
                );
                if (value) {
                  if (el.type == "ENTITY") {
                    this.$set(
                      el,
                      "entity_data_id",
                      value
                        ? typeof value == "string" &&
                          value.includes("-") &&
                          value.split("-")[0]
                          ? value.split("-")[0]
                          : value
                        : ""
                    );
                  }
                  el.value = value
                    ? typeof value == "string" &&
                      el.type == "ENTITY" &&
                      value.includes("-") &&
                      value.split("-")[1]
                      ? value.split("-")[1]
                      : value
                    : "";
                }
              }
            }
          });
        });
      }
    },
    setEntityDataToField(rawKey, template_id, indexKey) {
      let dataValues =
        this.allTemplatesData[rawKey.split("-")[0] + "-" + template_id];
      if (dataValues) {
        if (indexKey && Object.keys(dataValues)[0]) {
          let key = rawKey.split("-")[2];
          if (key.includes("#")) {
            key = key.split("#")[0];
          }
          let innerData = dataValues[Object.keys(dataValues)[0]];
          if (innerData && innerData.length) {
            let selectedInnerData = innerData.find(
              (e) => e && e.indexKey == indexKey
            );
            if (selectedInnerData && selectedInnerData[key]) {
              return (
                selectedInnerData[key] +
                "" +
                (selectedInnerData[key + "/name"]
                  ? "-" + selectedInnerData[key + "/name"]
                  : "")
              );
            }
          }
        } else {
          let key = rawKey.split("-")[1];
          if (key.includes("#")) {
            key = key.split("#")[0];
          }
          return dataValues[key];
        }
      }
    },
    async companyEntityDetails() {
      try {
        await this.$store.dispatch("entities/fetchCompanyEntityDetails");
        if (
          this.getCompanyEntityDetails &&
          this.getCompanyEntityDetails.entity_data_details &&
          this.getCompanyEntityDetails.entity_data_details[0] &&
          this.documentUsers.length
        ) {
          this.documentUsers.forEach((e) => {
            if (e.type == "SENDER") {
              this.$set(
                e,
                "entity_data_id",
                this.getCompanyEntityDetails.entity_data_details[0]._id
              );
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async checkForEntityDataUpdate(documentUsers) {
      if (documentUsers && documentUsers.length) {
        this.nonCompletedUserValues = documentUsers
          .filter(
            (user) => user.user_type != "CC" && !user.document_filling_status
          )
          .flatMap((e) => e.value);
        if (this.nonCompletedUserValues && this.nonCompletedUserValues.length) {
          let params = {
            entity_data_ids: [],
          };
          documentUsers.forEach((e) => {
            if (e.entity_data_id) {
              if (e.entity_data_id._id) {
                params.entity_data_ids.push(e.entity_data_id._id);
              } else {
                params.entity_data_ids.push(e.entity_data_id);
              }
            }
            if (e && e.contact_type && e.contact_type.templates) {
              let repeatableKeys = e.contact_type.templates
                .filter((temp) => temp && temp.is_repeatable)
                .flatMap((temp) => temp.template_id);
              if (repeatableKeys && repeatableKeys.length) {
                this.allUsersRepeatableDataKeys[e.value] = repeatableKeys;
              }
            }
          });
          await this.$store.commit("templatesData/setTemplatesData", [], {
            root: true,
          });
          if (params.entity_data_ids && params.entity_data_ids.length) {
            await this.$store.dispatch(
              "templatesData/fetchUserTemplateData",
              params
            );
          }
        }
      }
    },
    //updateCurrentUserEntityData
    async updateCurrentUserEntityData(users) {
      try {
        let allData = this.prepareUserEntityData(users, this.elements);
        await this.$store.dispatch(
          "templatesData/updateUserEntityData",
          allData
        );
      } catch (error) {
        console.log(error);
        this.$notify.error({
          title: "Error",
          message: error,
        });
      }
    },
    prepareUserEntityData(users, elements) {
      let allData = {};
      users.forEach((user) => {
        if (user && user.entity_data_id) {
          let currentUserFields = elements.filter(
            (e) =>
              e.selected_user == user.value &&
              e.field_type == "ENTITY_FIELD" &&
              e.type != "REPEATABLE_PARENT"
          );
          let templates = {};
          currentUserFields.forEach((e) => {
            if (!e.indexKey) {
              let obj = {};
              let key = e.key.split("-")[1];
              if (key.includes("#")) {
                key = key.split("#")[0];
              }
              if (e.type == "ENTITY") {
                obj[key] = e.entity_data_id;
                obj[key + "/name"] = e.value;
              } else {
                obj[key] = e.value;
              }
              templates[e.template_id] = {
                ...templates[e.template_id],
                ...obj,
              };
            } else {
              let obj = {
                indexKey: e.indexKey,
              };
              let key = e.key.split("-")[2];
              if (key.includes("#")) {
                key = key.split("#")[0];
              }
              if (e.type == "ENTITY") {
                obj[key] = e.entity_data_id;
                obj[key + "/name"] = e.value;
              } else {
                obj[key] = e.value;
              }
              if (
                templates[e.template_id] &&
                templates[e.template_id]["data"] &&
                templates[e.template_id]["data"].length
              ) {
                let existedDataIndex = templates[e.template_id][
                  "data"
                ].findIndex((el) => el && el.indexKey == obj.indexKey);
                if (existedDataIndex == -1) {
                  templates[e.template_id]["data"].push(obj);
                } else {
                  templates[e.template_id]["data"][existedDataIndex] = {
                    ...templates[e.template_id]["data"][existedDataIndex],
                    ...obj,
                  };
                }
              } else {
                templates[e.template_id] = {
                  data: [obj],
                  isRepeatable: true,
                };
              }
            }
          });
          if (user.entity_data_id && user.entity_data_id._id) {
            allData[user.entity_data_id._id] = templates;
          } else {
            allData[user.entity_data_id] = templates;
          }
        }
      });
      return allData;
    },
  },
};
