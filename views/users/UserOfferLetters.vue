<template>
	<!-- Employee Module -->
	<section id="employee-documents">
		<div class="inner-navbar">
			<el-row type="flex" justify="center">
				<el-col :span="22">
					<!-- Employee Documents -->
					<div class="main-content-section">
						<div class="inner-wrap">
							<div class="view-type-switch">
								<el-switch
									v-model="showListView"
									active-color="#4185F4"
									inactive-color="#1D467E"
									active-text="List"
									inactive-text="Gird"
								>
								</el-switch>
							</div>
							<el-row :gutter="20">
								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-success">
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">My Employeement</h4>
											<p class="exp-date">Expired on Dec-25-2020</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">My Employeement</h4>
											<p class="exp-date mt-0 ml-2">Expired on Dec-25-2020</p>
										</div>
										<div class="action-header">
											<el-button
												type="text"
												class="alert alert-success"
												title="Verify"
											>
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">Offer Letter</h4>
											<p class="exp-date warning">Under processing</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">Offer Letter</h4>
											<p class="exp-date mt-0 ml-2 warning">Under processing</p>
										</div>

										<div class="action-header">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-success">
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-sheets.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">Employment Agreement</h4>
											<p class="exp-date">Expired on Dec-25-2020</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-sheets.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">Employment Agreement</h4>
											<p class="exp-date mt-0 ml-2">Expired on Dec-25-2020</p>
										</div>

										<div class="action-header">
											<el-button
												type="text"
												class="alert alert-success"
												title="Verify"
											>
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-slides.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">Contracts Information</h4>
											<p class="exp-date warning">Under processing</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-slides.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">Contracts Information</h4>
											<p class="exp-date mt-0 ml-2 warning">Under processing</p>
										</div>

										<div class="action-header">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-success">
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/pdf.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">Immigration</h4>
											<p class="exp-date">Expired on Dec-25-2020</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/pdf.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">Immigration</h4>
											<p class="exp-date mt-0 ml-2">Expired on Dec-25-2020</p>
										</div>

										<div class="action-header">
											<el-button
												type="text"
												class="alert alert-success"
												title="Verify"
											>
												<i class="el-icon-document-checked"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/placeholder-img-format.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">Company Guidelines</h4>
											<p class="exp-date warning">Under processing</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/placeholder-img-format.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">Company Guidelines</h4>
											<p class="exp-date mt-0 ml-2 warning">Under processing</p>
										</div>

										<div class="action-header">
											<el-button type="text" class="view alert-warning">
												<i class="el-icon-timer"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>

								<el-col
									:xl="{ span: 6 }"
									:lg="{ span: 6 }"
									:md="{ span: 8 }"
									:sm="{ span: 12 }"
									v-if="!showListView"
								>
									<div class="each-doc">
										<div class="action-header d-flex justify-between">
											<el-button type="text" class="view alert-danger">
												<i class="el-icon-warning-outline"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info">
											<h4 class="name">I9 Form</h4>
											<p class="exp-date tomato">Expired</p>
										</div>
									</div>
								</el-col>
								<el-col v-if="showListView" :span="24">
									<div class="each-doc mobile">
										<div class="document-icon">
											<img
												src="@/assets/img/document-type/google-docs.svg"
												alt="docs"
												class="image"
											/>
										</div>
										<div class="document-info d-flex align-center">
											<h4 class="name">I9 Form</h4>
											<p class="exp-date mt-0 ml-2 tomato">Expired</p>
										</div>

										<div class="action-header">
											<el-button type="text" class="view alert-danger">
												<i class="el-icon-document-delete"></i>
											</el-button>
											<el-button type="text" class="download">
												<i class="el-icon-download"></i>
											</el-button>
										</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</section>
</template>

 <script>
	export default {
		name:"User-Offer-Letters",
		data() {
			return {
				showListView: false,
			};
		},
	};
</script>

<style lang="scss" scoped>
	#employee-documents {
		width: 90%;
		display: table;
		margin: 0 auto;
		.view-type-switch {
			position: absolute;
			top: -3em;
			right: 0;
			text-align: right;
			z-index: 100;
		}
		.section-heading {
			position: relative;
			margin-top: 1em;
			margin-bottom: 0.75em;
			.view-type-switch {
				top: -0em;
			}
		}
		.each-doc {
			cursor: pointer;
			margin: 0.35em 0;
			min-height: 170px;
			padding: 1em;
			box-shadow: 0 6px 12px rgba(140, 152, 164, 0.05);
			min-width: 0;
			word-wrap: break-word;
			background-color: #fff;
			background-clip: border-box;
			border: 0.0625rem solid rgba(231, 234, 243, 0.7);
			border-radius: 0.5rem;
			&.mobile {
				padding: 0.5em 2em;
				display: grid;
				grid-template-columns: 70px auto 120px;
				align-items: center;
				min-height: 50px;
				.document-info {
					padding: 1em 0em;
					.mobile {
						min-width: 440px;
						text-align: center;
					}
					text-align: center;
				}
			}
			&.expiring {
				background-color: #fff7f7;
				border: 0.0625rem solid #fceaea;
			}
			&:hover {
				background-color: #ffffff !important;
				border-color: #ffffff;
				box-shadow: 0 6px 12px rgba(140, 152, 164, 0.25) !important;
			}

			&.mobile {
				padding: 0.5em;
			}
			.document-icon {
				text-align: center;
				// margin-top: -1em;
				img {
					width: 30px;
				}
			}
			.document-info {
				text-align: center;
				padding: 1.5em 0em 1em;
				.name {
					font-weight: 500;
					display: block;
					color: #1e2022;
					margin-bottom: 0;
				}
				.exp-date {
					margin-top: 10px;
					font-size: 80%;
					font-weight: 400;
					color: #677788;
					line-height: 1;
				}
				.user {
					margin-top: 10px;
					font-size: 80%;
					font-weight: 400;
					color: #677788;
					line-height: 1;
				}
			}
		}
		.document-to-upload {
			display: flex;
			align-items: center;
			justify-items: center;
			column-gap: 20px;
			border-bottom: 1px solid #dddddd;
			margin-bottom: 1em;
			.document-icon {
				text-align: center;
				img {
					width: 30px;
				}
			}
			.document-info {
				text-align: left;
				padding: 0.5em 0em 1em;
				.name {
					font-weight: 500;
					display: block;
					color: #1e2022;
					margin: 0;
				}
				.user {
					margin-top: 10px;
					font-size: 80%;
					font-weight: 400;
					color: #677788;
					line-height: 1;
				}
			}
		}
		.requested-docuents-inner {
			margin-top: 0.5em;
			.block-title {
				font-weight: 400;
				margin-bottom: 1.5em;
			}
		}
	}
</style>
<style lang="scss">
	#employee-documents {
		.add-document {
			padding: 7px 15px !important;
		}
		.view-type-switch {
			.el-switch__core {
				// display: none;
			}
			.el-switch__label {
				padding: 2px 8px;
			}
			.el-switch__label.is-active {
				color: #1b487e;
				padding: 2px 8px;
				border-radius: 4px;
				background-color: #ffffff;
				box-shadow: 0 2px 4px rgba(140, 152, 164, 0.05);
			}
		}
		.action-header {
			padding: 0em;
			text-align: right;
			padding-right: 0.5em;
			.el-button {
				color: #677788;
				font-size: 1.125em;
				line-height: 1;
				padding: 5px;
				&:hover {
					background-color: #dbe9ff;
					color: #4185f4;
					box-shadow: 0 0 0 4px #dbe9ff;
				}
				&.alert-warning {
					color: #e6a630;
					&:hover {
						background-color: #ffeedb;
						box-shadow: 0 0 0 4px #ffeedb;
					}
				}
				&.alert-success {
					color: #14a720;
					&:hover {
						background-color: #ebffdb;
						color: #14a720;
						box-shadow: 0 0 0 4px #ebffdb;
					}
				}
				&.alert-danger {
					color: #f754a2;
					&:hover {
						background-color: #f5c8c8;
						color: #f754a2;
						box-shadow: 0 0 0 4px #f5c8c8;
					}
				}
			}
		}
		.el-tabs {
			.el-tabs__nav {
				background: #ffffff;
				padding: 10px;
				border-radius: 5px;
			}
			// &.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
			//     padding-left: 15px;
			// }
			&.el-tabs--top .el-tabs__item.is-top:first-child,
			&.el-tabs--top .el-tabs__item.is-top:last-child {
				padding-right: 15px;
			}
			.el-tabs__nav-wrap::after {
				display: none;
			}
			.el-tabs__item {
				text-transform: uppercase;
				letter-spacing: 0.5px;
				padding: 0 15px;
				border-radius: 5px;
				line-height: 30px;
				height: 30px;
			}
			.el-tabs__item.is-active {
				// color: #1e2022;
				// background-color: #fff;
				color: #ffffff;
				padding: 0 15px;
				background-color: #1b487e;
				box-shadow: 0 3px 6px 0 rgba(140, 152, 164, 0.25);
			}
			.el-tabs__active-bar {
				display: none;
			}
			.el-tabs__content {
				overflow: initial !important;
			}
		}
		.el-tooltip__popper.is-dark {
			background: #4185f4 !important;
			padding: 0 !important;
		}

		// Dragger
		.el-upload {
			display: block;
			.el-upload-dragger {
				width: auto;
			}
		}
		.divider-300 {
			height: 300px;
		}
		.divider-400 {
			height: 400px;
		}

		// Collapse
		.el-collapse {
			border-top: none;
			.el-collapse-item {
				&.is-active {
					background-color: transparent;
				}
			}
			.el-collapse-item__header,
			.el-collapse-item__wrap {
				background-color: transparent;
			}
			.el-collapse-item__header {
				font-weight: 400;
				font-size: 16px;
			}
			.el-collapse-item__content {
				font-size: initial;
			}
		}
	}
</style>