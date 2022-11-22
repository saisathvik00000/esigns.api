<template>
  <section class="add-benefits-view">
    <div class="inner-navbar d-none">
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <div class="icon-block">
            <div class="icon">
              <img src="@/assets/img/icons/add-benefits.svg" alt="icon" class="img-fluid" />
            </div>
            <div class="text">
              <h3>Add Benefits</h3>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="close-icon float-right">
            <router-link to="/company-benefits">
              <img src="@/assets/img/icons/close-icon.svg" alt="icon" class="img-fluid" />
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="add-benefits-form">
      <el-row type="flex" align="middle" justify="center">
        <el-col :span="23">
          <div class="form-content" v-loading="loading">
            <div class="vue-form">
              <el-form v-model="benefitFormData">
                <el-row :gutter="50">
                  <el-col :span="12">
                    <div class="form-group">
                      <label for="text">Title</label>
                      <el-input placeholder="Title" v-model="benefitFormData.title"></el-input>
                      <p
                        class="error"
                        v-if="getBenefitErrors && getBenefitErrors.title"
                      >{{getBenefitErrors.title}}</p>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="form-group">
                      <label for="text">Benefit Group</label>
                      <el-input placeholder="Benefit Group" v-model="benefitFormData.group"></el-input>
                      <p
                        class="error"
                        v-if="getBenefitErrors && getBenefitErrors.group"
                      >{{getBenefitErrors.group}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label for="text">Description</label>
                    <el-input
                      type="textarea"
                      :rows="3"
                      placeholder="Description"
                      v-model="benefitFormData.description"
                    ></el-input>
                    <p
                      class="error"
                      v-if="getBenefitErrors && getBenefitErrors.description"
                    >{{getBenefitErrors.description}}</p>
                  </el-col>
                </el-row>

                <div class="attach-document">
                  <el-row>
                    <el-col :span="24">
                      <el-checkbox
                        v-model="benefitFormData.has_documents"
                      >Attach document for this Benefit</el-checkbox>
                    </el-col>
                  </el-row>
                </div>

                <div v-if="benefitFormData.has_documents">
                  <div v-for="(file,index) of benefitFormData.files" :key="index">
                    <el-row :gutter="20" type="flex" align="middle">
                      <el-col :span="10">
                        <el-select
                          v-model="file.category"
                          placeholder="Docuemnt category"
                          @change="onCategorySelected($event,index)"
                        >
                          <el-option
                            v-for="(category,index) of categories"
                            :key="index"
                            :label="category.name"
                            :value="category._id"
                          ></el-option>
                        </el-select>
                        <p
                          class="error"
                          v-if="getBenefitErrors && getBenefitErrors[`files.${index}.category`]"
                        >{{getBenefitErrors[`files.${index}.category`] }}</p>
                      </el-col>
                      <el-col :span="10">
                        <el-select v-model="file.company_document" placeholder="Docuemnt">
                          <el-option
                            v-for="(document,index) of file.documents"
                            :key="index"
                            :label="document.title"
                            :value="document._id"
                            :disabled="documentSeleted(document._id)"
                          ></el-option>
                        </el-select>
                        <p
                          class="error"
                          v-if="getBenefitErrors && getBenefitErrors[`files.${index}.company_document`]"
                        >{{getBenefitErrors[`files.${index}.company_document`] }}</p>
                      </el-col>
                      <el-col :span="4" v-if="index>=0">
                        <div class="button-group">
                          <el-button
                            icon="el-icon-close"
                            title="Remove document"
                            class="remove-btn"
                            @click="removeDocument(index)"
                          ></el-button>
                          <div v-if="index == benefitFormData.files.length-1">
                            <el-button
                              icon="el-icon-plus"
                              title="Add document"
                              @click="addNewDocument"
                              class="add-button plus-button"
                            ></el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <div class="auth-sign">
                          <span>Auth Sign Required ?</span>
                          <el-radio-group v-model="file.e_sign_required">
                            <el-radio :label="true">Yes</el-radio>
                            <el-radio :label="false">No</el-radio>
                          </el-radio-group>

                          <p
                            class="error"
                            v-if="getBenefitErrors && getBenefitErrors[`files.${index}.e_sign_required`]"
                          >{{getBenefitErrors[`files.${index}.e_sign_required`] }}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="add-document-btn">
                    <div v-if="!benefitFormData.files.length">
                      <el-button @click="addNewDocument">Add document</el-button>
                    </div>
                  </div>
                </div>

                <div>
                  <button class="modal-button button-center" type="button" @click="submitForm">
                    <span class="el-icon-edit" v-if="isEdit"></span>
                    <span class="el-icon-circle-plus" v-if="!isEdit"></span>
                    {{isEdit ? 'Update ' :'Add '}}
                    Benefit
                  </button>
                </div>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name:"Global-AddBenefits",
  props: ["isEdit", "selectedBenefitData"],
  computed: {
    ...mapGetters("companyDocuments", ["getCompanyAllDocuments"]),
    ...mapGetters("documentCategories", ["getAllCategories"]),
    ...mapGetters("companyBenefits", [
      "getBenefitAddStatus",
      "getBenefitErrors",
      "getBenefitUpdateStatus"
    ]),

    documentSeleted() {
      return documentId => {
        return this.benefitFormData.files
          .map(e => e.company_document)
          .indexOf(documentId) > -1
          ? true
          : false;
      };
    }
  },

  mounted() {
    this.$store.dispatch("companyBenefits/resetErrors");
    this.fetchAllCategories();
    this.checkForEditbenefit();
  },
  data() {
    return {
      documents: [],
      categories: [],
      loading: false,
      benefitFormData: {
        title: "",
        group: "",
        description: "",
        has_documents: false,
        files: [
          {
            category: "",
            company_document: "",
            e_sign_required: false,
            documents: []
          }
        ]
      },
      newFile: {
        category: "",
        company_document: "",
        e_sign_required: false,
        documents: []
      }
    };
  },
  methods: {
    async checkForEditbenefit() {
      if (this.isEdit) {
        this.setBenifitDataIntoForm();
      }
    },
    async fetchAllCategories() {
      await this.$store.dispatch("documentCategories/fetchAllCategories", {
        get_all: true
      });
      this.categories = this.getAllCategories;
    },
    // fetched document relevent to selecetd category
    async onCategorySelected(category, index) {
      this.benefitFormData.files[index].documents = [];
      this.benefitFormData.files[
        index
      ].documents = await this.fetchAllDocumentsByCategory(category, index);
      // unset the selected value for company_document
      this.benefitFormData.files[index].company_document = "";
    },
    // method to get documents list by allCategories
    async fetchAllDocumentsByCategory(category) {
      let params = {
        id: category,
        get_all: true
      };
      await this.$store.dispatch(
        "companyDocuments/fetchSingleCategoryDocuments",
        params
      );
      return this.getCompanyAllDocuments.data;
    },

    submitForm() {
      if (this.selectedBenefitData && this.selectedBenefitData._id) {
        this.updateBenifitData();
      } else {
        this.addBenifitData();
      }
    },

    addNewDocument() {
      let newFileObject = Object.assign({}, this.newFile);
      this.benefitFormData.files.push(newFileObject);
    },
    removeDocument(index) {
      this.benefitFormData.files.splice(index, 1);
    },
    async updateBenifitData() {
      let params = this.preparePayloadFromData();
      params.id = this.selectedBenefitData._id;
      await this.$store.dispatch("companyBenefits/updateBenefit", params);
      if (this.getBenefitUpdateStatus) {
        this.$notify.success({
          title: "Success",
          message: "Benifit data updated successfully"
        });
        this.$emit("benefit-updated");
      } else {
        if (this.getBenefitErrors.critical_error) {
          this.$notify.error({
            title: "Error",
            message: this.getBenefitErrors.critical_error
          });
        }
      }
    },
    async addBenifitData() {
      let params = this.preparePayloadFromData();
      await this.$store.dispatch("companyBenefits/addBenefit", params);
      if (this.getBenefitAddStatus) {
        this.$notify.success({
          title: "Success",
          message: "Benifit data added successfully"
        });
        this.$emit("benefit-added");
      } else {
        if (this.getBenefitErrors.critical_error) {
          this.$notify.error({
            title: "Error",
            message: this.getBenefitErrors.critical_error
          });
        }
      }
    },
    preparePayloadFromData() {
      let payload = {
        title: this.benefitFormData.title,
        group: this.benefitFormData.group,
        description: this.benefitFormData.description
      };

      if (
        this.benefitFormData.has_documents &&
        this.benefitFormData.files.length
      ) {
        payload.files = this.benefitFormData.files.map(e => {
          return {
            e_sign_required: e.e_sign_required,
            category: e.category,
            company_document: e.company_document
          };
        });
      } else {
        payload.files = [];
      }

      return payload;
    },
    async setBenifitDataIntoForm() {
      this.loading = true;
      this.benefitFormData.title = this.selectedBenefitData.title;
      this.benefitFormData.group = this.selectedBenefitData.group;
      this.benefitFormData.description = this.selectedBenefitData.description;
      if (this.selectedBenefitData.files) {
        this.benefitFormData.has_documents = true;
        this.benefitFormData.files = [];
        for (
          let index = 0;
          index < this.selectedBenefitData.files.length;
          index++
        ) {
          let file = {
            e_sign_required: this.selectedBenefitData.files[index]
              .e_sign_required,
            category: this.selectedBenefitData.files[index].category._id,
            company_document: this.selectedBenefitData.files[index]
              .company_document._id,
            documents: await this.fetchAllDocumentsByCategory(
              this.selectedBenefitData.files[index].category._id,
              index
            )
          };
          await this.benefitFormData.files.push(file);
        }
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-benefits-view {
  .inner-navbar {
    background: linear-gradient(92.88deg, #380674 1.34%, #6979f8 99.9%);
    padding: 15px 4em;
    .icon-block {
      display: grid;
      grid-template-columns: 50px auto;
      gap: 20px;
      align-items: center;
      h3 {
        color: #fff;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
    .close-icon {
      img {
        width: 40px;
      }
    }
  }
  .add-benefits-form {
    margin-top: 1em;
    .form-title {
      border-bottom: 1px solid #dadada;
      padding-bottom: 20px;
      h4 {
        font-weight: 500;
        font-size: 1.3em;
        color: #1b487e;
      }
    }
    .form-content {
      margin-top: 0;
    }
  }
  .add-benefits-btn {
    margin-top: 35px;
    button {
      display: table;
      margin: 0 auto;
      background: #6979f8;
      border-radius: 6px;
      border: none;
      color: #fff;
      font-weight: 600;
      padding: 12px 45px;
      letter-spacing: 0.5px;
    }
  }
}
</style>