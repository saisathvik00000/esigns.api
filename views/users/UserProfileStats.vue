<template>
	<section class="workflow-form-execute">
		<div v-loading="loading">
			<div>
				<el-row type="flex">
					<el-col class="navi-steps-left">
						<div class="profile-card">
							<img
								src="@/assets/img/users/profile.png"
								alt="pic"
								class="image"
							/>
							<div class="name">
								<p>{{ getUser.email }}</p>
								<!-- <el-button
                  icon="el-icon-arrow-left"
                  @click="backToUsersList()"
                  circle
                ></el-button> -->
								<!-- <div class="user-profile-box">
                  <div class="profile-pic circle">
                    <img href="#" src="@/assets/img/logo-icon.png" alt="Logo" />
                  </div>
                  <div>
                    <h4>Hemasundar Boyapati</h4>
                    <div class="black6">{{getUser.email}}</div>
                  </div>
                </div>-->
							</div>
						</div>
						<div class="sidebar-navigation" v-if="!loading">
							<div
								class="templates-list"
								v-if="getAllSteps && getAllSteps.length"
							>
								<div
									index="1"
									v-for="(step, index) of getAllSteps"
									:key="index"
									:class="activeStep(step) ? 'nav-link active' : 'nav-link'"
								>
									<router-link :to="getStepUrl(step)">
										<span>{{ step.name }}</span>
									</router-link>
								</div>
							</div>
							<div v-else>No Data</div>
						</div>
					</el-col>
					<el-col>
						<div class="main-content-block">
							<router-view
								:layout.sync="layout"
								:key="$route.fullPath"
							></router-view>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import { bus } from "../../main";
	export default {
		name:"UserProfileStats",
		components: {},
		data() {
			return {
				loading: false,
				step: 1,
				slug: null,
				layout: "div",
				employeeData: {},
				stepTypeMap: {
					COMPANY_BENEFIT: "Company Benefits",
					COMPANY_DOCUMENTS: "Company Documents",
					OFFER_LETTER: "Offer Letter",
				},
				workflowCode: null,
				workflowDataId: null,
				userDetailsDialogVisible: false,
				userDetails: {
					email: "",
					first_name: "",
					last_name: "",
				},
				workflowSendingStepsData: [],
				workflowSendingUserData: {},
				userId: "",
			};
		},
		mounted() {
			// this.getNecessaryInfo();
			this.getData();
		},

		created() {},
		beforeDestroy() {},
		computed: {
			...mapGetters("users", ["getUserCompleteProfile"]),

			getIndexFromStep() {
				return this.step - 1;
			},
			getStepDetails() {
				if (
					this.getWorkflow &&
					this.getWorkflow.steps &&
					this.getWorkflow.steps.length
				) {
					return this.getWorkflow.steps[this.getIndexFromStep];
				}
				return {};
			},
			getAllSteps() {
				return this.getUserCompleteProfile.data;
			},

			getUser() {
				return this.getUserCompleteProfile.user;
			},

			getStepUrl() {
				return (step) => {
					if (step.type == "TEMPLATE") {
						return `/users/${this.userId}/profile/${step.slug}/` + step._id;
					} else {
						return `/users/${this.userId}/profile/${step.slug}`;
					}
				};
			},

			activeStep() {
				return (step) => {
					if (this.$route.params.template_code === step.slug) {
						return true;
					}
					return false;
				};
			},
		},
		methods: {
			async getNecessaryInfo() {
				this.loading = true;

				this.workflowCode = this.$route.params.workflow_code;
				this.workflowDataId = this.$route.params.workflow_data_id;
				this.step = this.$route.query.step || 1;

				await this.$store.dispatch("workflows/fetchWorkFlowByCode", {
					code: this.workflowCode,
					include_template_details: true,
					include_document_details: true,
				});

				if (!this.$route.params.template_code) {
					this.gotoStep(this.getAllSteps[0]);
				}

				if (!this.workflowDataId) {
					this.$store.dispatch("workflowData/clearUserWorkflowData");
				} else {
					await this.$store.dispatch("workflowData/fetchUserWorkflowData", {
						workflow_data_id: this.workflowDataId,
					});
				}

				this.loading = false;
			},
			gotoStep(step) {
				console.log({ step });
				this.$router.push({ path: this.getStepUrl(step) });
			},
			gotoNextStep() {
				const code = this.$route.params.template_code;
				const currentStepIndex = this.getAllSteps.findIndex(
					(x) => x.slug == code
				);
				if (
					currentStepIndex > -1 &&
					currentStepIndex < this.getAllSteps.length - 1
				) {
					this.gotoStep(this.getAllSteps[currentStepIndex + 1]);
				}
			},
			backToUsersList() {
				this.$router.push({
					path: "/users",
				});
			},

			async getData() {
				this.loading = true;
				this.userId = this.$route.params.user_id;
				await this.$store.dispatch("users/fetchUserProfileData", {
					id: this.userId,
				});

				if (this.getAllSteps && this.getAllSteps.length) {
					if (!this.$route.params.template_code) {
						this.gotoStep(this.getAllSteps[0]);
					}
				}

				this.loading = false;
			},
			async confirmUserDetails() {
				this.$store.dispatch("workflowData/clearWorkflowErrors");

				let data = this.getUserWorkflowData.workflow_steps_data;

				data = data.map((e) => {
					let step = this.getAllSteps.find((step) => step._id == e.step_id);
					e.step_name =
						step.type == "TEMPLATE"
							? step.template.name
							: this.stepTypeMap[step.type];
					e.already_sent = e.sent_status ? true : false;
					e.sent_status = true;
					return e;
				});
				console.log(data);
				this.workflowSendingStepsData = data;

				await this.$store.dispatch("employee/fetchEmployeeSingleEmployee", {
					id: this.getUserWorkflowData.user_id,
				});

				this.workflowSendingUserData = this.getSingleEmployeeData;
				this.userDetailsDialogVisible = true;
			},
			async sendWorkflow() {
				try {
					let params = {
						workflow_data_id: this.workflowDataId,
						email: this.workflowSendingUserData.email,
						user_id: this.workflowSendingUserData.user_id,
						workflow_steps_data: this.workflowSendingStepsData,
					};
					await this.$store.dispatch(
						"workflowData/sendWorkflowDataToUser",
						params
					);

					if (this.getWorkflowSentStatus) {
						this.$notify.success({
							title: "Success",
							message: "Workflow sent to user successfully",
						});
						this.userDetailsDialogVisible = false;

						bus.$emit("next-step", {
							finish: !this.hasNext,
						});
					} else {
						if (!this.getWorkflowSentErrors) {
							this.$notify.error({
								title: "Error",
								message: "Error at sending workflow to User",
							});
						}
					}
				} catch (err) {
					this.loading = false;
					console.log(err);
				}
			},
		},
		watch: {
			"$route.query.step"(step) {
				this.step = step;
			},
			"$route.params.slug"(slug) {
				this.slug = slug;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.user-profile-box {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		grid-gap: 0.5em;
		margin-top: 2em;
		.profile-pic {
			&.circle {
				img {
					border-radius: 50%;
				}
			}
			img {
				max-width: 100%;
			}
		}
	}
	.workflow-form-execute {
		margin-top: -30px;
		margin-right: -30px;
		.navi-steps-left {
			padding-top: 1.5em;
			.profile-card {
				background: #fdfdfd;
				border: 1px solid #f1f1f1;
				border-radius: 4px;
				text-align: center;
				padding: 1.5em 1em;
				img {
					border-radius: 50%;
					margin-bottom: 1em;
					border: 2px solid #a8abff;
				}
			}
		}
		.main-content-block {
			padding: 2em;
			background-color: #ffffff;

			::v-deep .preview-template-view {
				.preview-form-header {
					margin-bottom: 1.5em !important;
				}
				.footer-action-block {
					.el-button {
						margin: 0em 0 0 auto;
					}
				}
				.form-group {
					label {
						color: #5e6d82 !important;
					}
					p {
						margin-top: 0px;
					}
				}
			}
		}
		.sidebar-navigation {
			position: sticky;
			top: 100px;
			width: auto;
			.page-title {
				font-weight: 600;
				margin-bottom: 1em;
				.el-button {
					margin-right: 0.5em;
					padding: 4px;
					i {
						font-size: 1.1em;
					}
				}
			}
			.templates-list {
				margin-top: 2em;
				.nav-link {
					a {
						position: relative;
						color: #999a9d;
						display: block;
						padding: 1em 1em 1em 2em;
						margin-bottom: 0.5em;
						border-radius: 3px 0 0 3px;
						&::after {
							content: "";
							position: absolute;
							top: 0;
							bottom: 0;
							left: 10px;
							width: 10px;
							background-image: url("../../assets/img/icons/hover-dots.svg");
							background-size: 7px;
							background-repeat: no-repeat;
							background-position: center;
							opacity: 0;
							transition: 0.3s all ease-in-out;
							-webkit-transition: 0.3s all ease-in-out;
						}
						&:hover:after {
							opacity: 1;
						}
						&:hover {
							color: #1b487e;
						}
						.step-edit,
						.step-unfill,
						.step-default,
						.step-success {
							float: right;
							font-size: 1.25em;
							padding-top: 3px;
						}
						.step-success {
							color: rgb(103, 206, 0);
						}

						.step-unfill {
							color: rgb(214, 214, 52);
						}

						.step-edit {
							color: blue;
						}

						.step-default {
							color: #999999;
						}
					}
					.router-link-active {
						color: #1b487e;
						background-color: #ffffff;
						box-shadow: -5px 5px 10px #f9f9f9;
						&::after {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
