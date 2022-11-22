<template>
	<section class="user-profile-dashobard">
		<div v-loading="loading">
			<div>
				<el-row type="flex">
					<el-col class="navi-steps-left">
						<div class="profile-card">
							<img
								src="@/assets/img/users/profile.png"
								alt="pic"
								class="image"
							>
							<div class="name">
								<p v-if="getUser && getUser.email">{{ getUser.email }}</p>
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
							<div class="menu-list">
								<el-collapse
									class="menu-scrollable"
									v-model="userProfileSideMenu"
									accordion
								>
									<el-collapse-item title="User Profile" name="1">
										<div class="sub-menu-line"></div>
										<div
											class="templates-list"
											v-if="getAllSteps && getAllSteps.length"
										>
											<div
												index="1"
												v-for="(step, index) of getAllSteps"
												:key="index"
												:class="
													activeStep(step) ? 'nav-link active' : 'nav-link'
												"
											>
												<router-link :to="getStepUrl(step)">
													<span>{{ step.name }}</span>
												</router-link>
											</div>
										</div>
										<div v-else>No Data</div>
									</el-collapse-item>
									<!-- we can add another collapse group as well here -->
									<!-- <el-collapse-item title="Offer Letters" name="2">
                  </el-collapse-item> -->
									<router-link
										class="el-button el-button--text"
										to="/users/5f824cc068e7760a73d2bf50/profile/offer-letter"
										>Offer Letters</router-link
									>
									<router-link
										class="el-button el-button--text"
										to="/users/5f824cc068e7760a73d2bf50/profile/company-documents"
										>Company Documents</router-link
									>
								</el-collapse>
							</div>
						</div>
					</el-col>
					<el-col>
						<div>
							<UserStats></UserStats>
						</div>
						<div class="main-content-block">
							<router-view
								:layout.sync="layout"
								:key="$route.fullPath"
							></router-view>
						</div>
						<div></div>
					</el-col>
				</el-row>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import { bus } from "../../main";
	import UserStats from "@/components/users/userProfile/UserStats";
	export default {
		name:"UserTemplatesProfile",
		components: {
			UserStats,
		},
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
				userProfileSideMenu: ["1"],
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
	.user-profile-dashobard {
		margin-top: -30px;
		margin-right: -30px;
		.navi-steps-left {
			max-width: 300px;
			min-width: 200px;
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
			margin-top: 20px;
			position: sticky;
			top: 100px;
			width: auto;
			.sub-menu-line {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 11px;
				width: 1.5px;
				background-color: #e0e0e0;
				z-index: 9;
			}
			.templates-list {
				position: relative;
				padding: 10px 0px;
				height: 200px;
				overflow-y: scroll;
				.nav-link {
					a {
						position: relative;
						color: #999a9d;
						font-size: 15px;
						display: block;
						height: 48px;
						line-height: 48px;
						margin-bottom: 0.5em;
						border-radius: 0 15px 15px 0;
						padding-left: 2em;
						z-index: 10;
						&::after {
							content: "";
							position: absolute;
							top: 0;
							bottom: 0;
							left: 10px;
							width: 6px;
							background-color: #5096f1;
							opacity: 0;
							transition: 0.3s all ease-in-out;
							-webkit-transition: 0.3s all ease-in-out;
						}
						&:hover {
							color: #1b487e;
							background-color: #f6f6f6;
							z-index: 8;
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
						&:hover {
							z-index: 11;
							background-color: #ffffff;
						}
						&::after {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	.user-profile-dashobard {
		.sidebar-navigation {
			.menu-scrollable {
				.el-button {
					font-family: "Inter", sans-serif;
					display: block;
					width: 100%;
					font-size: 15px;
					padding: 0px 1em 0px 1.25em;
					border-radius: 0 15px 15px 0;
					line-height: 48px;
					height: 48px;
					color: #303133;
					text-align: left;
					i {
						line-height: 48px;
					}
					& + .el-button {
						margin-left: 0;
					}
					&.active,
					&:focus {
						background-color: #e2edfc !important;
						color: #0f56b3;
					}
				}
			}
			.el-collapse {
				background-color: transparent;
				border-top: none;
				border-bottom: none;
				.el-collapse-item {
					position: relative;
					border-radius: 0 15px 15px 0;
					border-bottom: none;
					background-color: transparent;
					.el-collapse-item__arrow.is-active {
						background-color: transparent;
					}
					.el-collapse-item__content {
						padding-bottom: 0;
					}
					.el-collapse-item__header {
						font-size: 15px;
						background-color: transparent;
						position: relative;
						z-index: 10;
					}
					&.is-active {
						background-color: transparent !important;
						.el-collapse-item__header {
							background-color: #e2edfc !important;
							color: #0f56b3;
						}
					}
					.el-collapse-item__header {
						padding: 0px 1em 0px 1.25em;
						border-radius: 0 15px 15px 0;
						border-bottom: none;
					}
					.el-collapse-item__wrap {
						background-color: transparent;
						border-bottom: none;
					}
				}
			}
		}
	}
</style>