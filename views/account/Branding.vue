<template>
	<div class="branding-page">
		<div class="card mb-3" style="width: 600px; margin: 0 auto">
			<div class="card-header bg-light">
				<h3 class="title fw-normal mb-0 p-2">Company Branding</h3>
			</div>
			<el-form ref="form" :model="brandingInfo">
				<div class="card-body">
					<div class="p-4">
						<p class="text-sm">
							Set your logo and colors for tools where you can show your
							branding.
						</p>
						<div class="uploaded-logo mb-3">
							<img
								src="@/assets/img/logo.svg"
								alt="logo"
								width="120"
								class="mb-3"
							/>
							<br />
							<el-button
								type="primary"
								plain
								class="border-primary bg-white text-primary"
								>Change Logo</el-button
							>
						</div>
						<div class="mb-1">
							<el-upload
								class="upload-demo"
								drag
								action="https://jsonplaceholder.typicode.com/posts/"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:file-list="fileList"
								multiple
							>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">
									Drop file here or <em>click to upload</em>
								</div>
								<div class="el-upload__tip" slot="tip">
									jpg/png files with a size less than 500kb
								</div>
							</el-upload>
						</div>

						<el-row type="flex" :gutter="20">
							<el-col>
								<div class="each-field mb-3">
									<el-form-item label="Brand Color" class="mr-2 mb-0">
										<el-input
											class="fw-bold"
											v-model="brandingInfo.button_color"
											prefix-icon="el-icon-brush"
										></el-input>
									</el-form-item>
									<div>
										<el-button
											icon="el-icon-aim"
											:style="'background-color:' + brandingInfo.button_color"
											circle
										></el-button>
									</div>
								</div>
							</el-col>
							<el-col>
								<div class="each-field">
									<el-form-item label="Button Text Color" class="mr-2 mb-0">
										<el-input
											class="fw-bold"
											v-model="brandingInfo.button_text_color"
											prefix-icon="el-icon-brush"
										></el-input>
									</el-form-item>
									<div>
										<el-button
											icon="el-icon-aim"
											:style="
												'background-color:' + brandingInfo.button_text_color
											"
											circle
										></el-button>
									</div>
								</div>
							</el-col>
						</el-row>

						<el-form-item label="Email Footer Text" class="mb-0">
							<el-input
								type="textarea"
								rows="6"
								v-model="brandingInfo.email_footer_text"
							></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card-footer bg-white">
					<el-form-item class="mb-0 p-2">
						<el-button>Cancel</el-button>
						<el-button  style="background-color:#409EFF;color:#ffffff" class="type-2">Save Changes</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		name:"Branding",
		data() {
			return {
				brandingInfo: {
					button_color: "#F754A2",
					button_text_color: "#FFFFFF",
					email_footer_text:
						"I understand that eSigns uses my name, email address and limited information will be used to complete the signature process and to enhance the user experience. ",
				},
			};
		},
	};
</script>

<style lang="scss">
	.branding-page {
		.each-field {
			display: grid;
			grid-template-columns: 1fr 50px;
			align-items: flex-end;
		}
		.el-textarea__inner,
		.el-input__inner {
			background-color: #f5f8fa;
		}
	}
</style>