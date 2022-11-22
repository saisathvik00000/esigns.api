import { makeSlug } from "../helpers/appHelper";

export default {

    computed: {

        getStepEntityRelationshipUrl() {
            return (reationship) => {
                let slug = reationship.relationship_slug;
                let id = reationship.relationship_id;

                return `/entityData-Edit/${this.$route.params.entity_id
                    }/${slug}?dataId=${this.entityDataId || ""}&relationship_id=${id}`;
            };
        },
    },
    methods: {
        prepareRelationshipData(fieldsData, currentEntityRelationships, entityDataId) {
            let relationshipsForFields = currentEntityRelationships.filter(
                (e) => e.owner_type == "PARENT" && e.representation == "FIELD"
            );

            let fieldsHasRelationships = fieldsData.filter((field) => {
                let relationship = relationshipsForFields.find(
                    (x) => x.field_id == field._id && x.child_entity_id == field.entity_id
                );

                if (relationship) {
                    field.relationshipDetails = { ...relationship };
                    return true;
                } else {
                    return false;
                }
            });

            if (fieldsHasRelationships.length) {
                return fieldsHasRelationships.map((field) => {
                    let relatinshipValue = this.form[field.key];


                    let previousValue = null
                    if (this.oldForm) {
                        previousValue = this.oldForm[field.key];
                    }

                    let child_entity_data_ids = [];
                    let type = "NEW";

                    if (
                        previousValue &&
                        previousValue.length &&
                        relatinshipValue &&
                        relatinshipValue.length
                    ) {
                        type = "REPLACE";
                        child_entity_data_ids = [relatinshipValue];
                    } else if (
                        (!previousValue || !previousValue.length) &&
                        relatinshipValue &&
                        relatinshipValue.length
                    ) {
                        child_entity_data_ids = [relatinshipValue];
                        type = "NEW";
                    } else if (
                        (!relatinshipValue || !relatinshipValue.length) &&
                        previousValue &&
                        previousValue.length
                    ) {
                        type = "REMOVE";
                        child_entity_data_ids = [];
                    }

                    return {
                        parent_entity_id: field.relationshipDetails.parent_entity_id,
                        child_entity_id: field.relationshipDetails.child_entity_id,
                        parent_entity_data_id: entityDataId,
                        child_entity_data_ids,
                        type,
                    };
                });
            } else {
                return [];
            }
        },

        async fetchEntityRelationships(entityId) {
            this.loading = true;
            this.loadingText = "Fetching Entity relationships..";
            await this.$store.dispatch(
                "entityRelationships/fetchEntityRelationships",
                { entity_id: entityId }
            );

            this.relationshipsData = [...(this.getEntityRelationships || [])];
            // we have to add type owner of relationship
            this.relationshipsData = this.relationshipsData.map((e) => {
                if (e.parent_entity_id == entityId) {
                    e.owner_type = "PARENT";
                    e.relationship_title = e.child_relation_title;
                    e.relationship_slug = makeSlug(e.relationship_title);
                    e.relationship_id = e.child_entity_id;
                } else {
                    e.owner_type = "CHILD";
                    e.relationship_title = e.parent_relation_title;
                    e.relationship_slug = makeSlug(e.relationship_title);
                    e.relationship_id = e.parent_entity_id;
                }
                e.parent_entity_data_id = this.entityDataId;
                return e;
            });

            this.relationshipsData = this.relationshipsData.filter((e) => {
                if (e.owner_type == "CHILD" && !e.is_bidirectional) {
                    return false;
                } else {
                    return true;
                }
            });
            this.$store.dispatch(
                "entityRelationships/updateCurrentEntityRelationships",
                this.relationshipsData
            );

            this.relationshipsData = this.relationshipsData.filter(
                (e) => e.owner_type == "CHILD" || e.representation == "TAB"
            );

            this.loading = false;
        },


    }
}
