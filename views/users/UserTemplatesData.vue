<template>
  <div v-loading="loading" style="margin-left: 20px">
    <div v-if="!loading">
      <div class="" style="margin: 10px 0">
        <h3 v-if="getCurrentStep && getCurrentStep.name"> {{ getCurrentStep.name }} </h3>
      </div>
      <div v-if="!isCurrentSlugPresent">Invalid step</div>
      <div class v-else>
        <div v-if="getCurrentStep && getCurrentStep.type === 'TEMPLATE'">
          <template>
            <PreviewTemplateUserProfile
              :templateData="getCurrentStep.template_id"
              :template-data-id="getCurrentStep.templateDataId"
              :is-execute="false"
              :hasNext="false"
            />
          </template>
          <!-- <template v-else>
            <component v-bind:is="currentSlug" class="tab"></component>
          </template>-->
        </div>
        <div v-else-if="getCurrentStep && getCurrentStep.type">
          <keep-alive>
            <component :is="getDefautComponent(getCurrentStep)"></component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreviewTemplateUserProfile from "@/components/templates/PreviewTemplateUserProfile";
import UserDocuments from "@/components/users/userProfile/UserDocuments";
import UserOfferLetters from "@/components/users/userProfile/UserOfferLetters";

import { mapGetters } from "vuex";

export default {
  name:"UserTemplatesData",
  components: {
    PreviewTemplateUserProfile,
    UserOfferLetters,
    UserDocuments,
  },
  data() {
    return {
      currentSlug: null,
      loading: false,
      workflowDataId: null,
    };
  },
  mounted() {
    // this.getNecessaryInfo();
    this.currentSlug = this.$route.params.template_code;
  },
  computed: {
    ...mapGetters("users", ["getUserCompleteProfile"]),

    getAllSteps() {
      return this.getUserCompleteProfile.data;
    },

    slugs() {
      if (this.getAllSteps && this.getAllSteps.length) {
        return this.getAllSteps.map((step) => step.slug);
      }
      return [];
    },
    isCurrentSlugPresent() {
      // console.log(this.slugs, this.currentSlug);
      if (this.slugs && this.slugs.length) {
        if (this.slugs.indexOf(this.currentSlug) === -1) {
          return false;
        }
        return true;
      }
      return true;
    },

    getTemplateDataIdMap() {
      if (this.workflowDataId && this.getUserWorkflowData) {
        let templateDataIdMap = {};

        if (
          this.getUserWorkflowData.template_data_ids &&
          this.getUserWorkflowData.template_data_ids.length
        ) {
          this.getUserWorkflowData.template_data_ids.forEach((e) => {
            templateDataIdMap[e.template_id] = e.template_data_id;
          });
        }
        return templateDataIdMap;
      } else {
        return {};
      }
    },
    getAssetDataIdMap() {
      if (this.workflowDataId && this.getUserWorkflowData) {
        let assetDataIdMap = {};
        if (
          this.getUserWorkflowData.assets_data &&
          this.getUserWorkflowData.assets_data.length
        ) {
          this.getUserWorkflowData.assets_data.forEach((e) => {
            assetDataIdMap[e.asset] = e.asset_data_id;
          });
        }
        return assetDataIdMap;
      } else {
        return {};
      }
    },

    getStepsObject() {
      if (this.getAllSteps && this.getAllSteps.length) {
        const data = {};
        this.getAllSteps.forEach((step) => {
          // it will use to determine finish step

          if (step.type === "TEMPLATE") {
            step.templateDataId = step._id;
          }
          data[step.slug] = step;
        });

        return data;
      }
      return {};
    },

    getCurrentStep() {
      if (this.getStepsObject && this.currentSlug) {
        // console.log(this.getStepsObject, this.currentSlug);
        const step = this.getStepsObject[this.currentSlug];
        return step;
      }

      return null;
    },
    getDefautComponent() {
      return (step) => {
        let sections = {
          COMPANY_DOCUMENTS: "user-documents",
          OFFER_LETTER: "user-offer-letters",
          COMPANY_BENEFIT: "company-benefits-section",
        };
        return sections[step.type];
      };
    },
  },
  methods: {
    async getNecessaryInfo() {
      this.currentSlug = this.$route.params.template_code;
      this.workflowDataId = this.$route.params.workflow_data_id;

      if (!this.getWorkflow || Object.keys(this.getWorkflow).length === 0) {
        this.loading = true;

        const workflowCode = this.$route.params.workflow_code;
        this.step = this.$route.query.step || 1;

        await this.$store.dispatch("workflows/fetchWorkFlowByCode", {
          code: workflowCode,
          include_template_details: true,
          include_document_details: true,
        });

        this.loading = false;
      }

      if (this.workflowDataId) {
        this.loading = true;

        await this.$store.dispatch("workflowData/fetchUserWorkflowData", {
          workflow_data_id: this.workflowDataId,
        });

        this.loading = false;
      }
    },
    async goToNext(step) {
      console.log({ step });
    },
  },
  watch: {
    "$route.params.slug"(slug) {
      this.currentSlug = slug;
    },
  },
};
</script>

<style>
</style>