<template>
	<section class="update-password-view">
		<el-row type="flex" align="middle">
			<el-col :span="12">
				<div class="right-block">
					<div class="image"></div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="left-block">
					<div class="main-logo">
						<img src="@/assets/img/logo-white.png" alt="Logo" />
					</div>
					<div class="signIn-form">
						<div class="form-title">
							<h3>OTP Verification</h3>
							<p>
								We send verification code
								<br />to your email :
								<a href="mailto:muffin.sweet@gmail.com"
									>muffin.sweet@gmail.com</a
								>
							</p>
						</div>
						<el-form :model="formData" :rules="rules" ref="ruleForm">
							<div class="form-group">
								<el-form-item prop="password">
									<otp-input
										v-model="token"
										class="style-1"
										size="24"
									></otp-input>
									<!-- <el-input v-model="formData.password" type="password" placeholder="Password"></el-input> -->
								</el-form-item>
							</div>
							<div class="form-group">
								<el-form-item prop="password">
									<el-input
										v-model="formData.password"
										type="password"
										placeholder="Password"
									></el-input>
									<span class="input-icon">
										<img src="@/assets/img/icons/password.svg" alt />
									</span>
								</el-form-item>
							</div>
							<span class="err-msg">{{ formData.err }}</span>
							<el-form-item>
								<el-button
									type="primary"
									v-loading="loading"
									class="submit-btn"
									@click="submitForm('ruleForm')"
									:disabled="loading"
								>
									Send
									<span class="submit-loading" v-if="loading"></span>
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "Signin2",
		computed: {
			...mapGetters("auth", [
				"getGeneralErrorMessage",
				"getAuthenticationStatus",
			]),
		},

		data() {
			return {
				loading: false,
				formData: {
					email: "",
					password: "",
					err: "",
				},
				rules: {
					email: [
						{
							required: true,
							message: "Email is required",
							trigger: "blur",
						},
						{
							type: "email",
							message: "Invalid Email",
							trigger: "blur",
						},
					],
					password: [
						{
							required: true,
							message: "Password is required",
							trigger: "blur",
						},
					],
				},
			};
		},
		created() {},
		mounted() {
			this.$store.dispatch("auth/reset");
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.signIn();
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			async signIn() {
				let params = {
					email: this.formData.email,
					password: this.formData.password,
				};

				this.loading = true;
				await this.$store.dispatch("auth/signin", params);
				this.loading = false;

				if (this.getAuthenticationStatus) {
					this.$router.push("/");
				} else {
					this.formData.err = this.getGeneralErrorMessage;
				}
			},
		},
	};
</script>

<style lang="scss">
	.update-password-view {
		min-height: 100vh;
		overflow: hidden;
		.el-row {
			height: 100vh;
		}
		.left-block {
			background: #fff;
			position: relative;
			height: 100%;
			.main-logo {
				margin-bottom: 60px;
				img {
					display: table;
					margin: 0 auto;
					max-width: 9em;
				}
			}
			.signIn-form {
				width: 400px;
				display: table;
				margin: 0 auto;
				.form-title {
					margin-bottom: 30px;
					h3 {
						font-weight: 500;
						color: #1b487e;
						font-size: 1.6em;
					}
					p {
						color: #979797;
						letter-spacing: 0.5px;
						line-height: 24px;
						a {
							color: #313f51;
						}
					}
				}
				.el-form {
					.form-group {
						&:nth-child(1) {
							margin-bottom: 35px;
						}
					}
					.input-icon {
						position: absolute;
						right: 20px;
						top: 60%;
						transform: translateY(-50%);
					}
				}
				.forgot-password {
					margin-top: 20px;
					text-align: right;
					a {
						color: #f84d6c;
						font-size: 0.9em;
						span {
							img {
								width: 22px;
								margin-bottom: -7px;
							}
						}
					}
				}

				.el-form-item {
					margin-bottom: 0;
				}
				.el-input__inner {
					height: 58px !important;
					background: #f9f9f9;
					border: 0.5px solid #e5e5e5;
					box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
					border-radius: 4px;
					font-size: 1.15em;
					letter-spacing: 0.05em;
					color: #313f51;
				}
				.el-form-item__error {
					font-size: 15px;
					font-weight: 500;
					padding-top: 5px;
				}
				.submit-btn {
					display: block;
					width: 100%;
					background: #ef3651;
					box-shadow: 0px 4px 8px rgba(239, 54, 81, 0.35);
					border-radius: 25px;
					padding: 18px 0;
					margin-top: 35px;
					text-transform: uppercase;
					color: #f5f5f5;
					font-size: 1.1em;
					font-weight: 600;
					letter-spacing: 2px;
					transition: all 0.3s ease-in-out;
					border: none;
					&:hover {
						background: #da2741;
					}
				}
			}
			.login-others {
				background: linear-gradient(
					180deg,
					rgba(255, 255, 255, 0) 0%,
					#e5e5e5 100%
				);
				display: none;
				min-height: 200px;
				align-items: center;
				justify-content: center;
				p {
					color: #7c848d;
					font-size: 0.9em;
				}
				ul {
					display: flex;
					align-items: center;
					justify-content: center;
					li {
						background: #ffffff;
						box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.05);
						border-radius: 50%;
						width: 50px;
						height: 50px;
						display: flex;
						align-items: center;
						justify-content: center;
						line-height: normal !important;
						&:not(:last-child) {
							margin-right: 25px;
						}
					}
				}
			}
		}
		.right-block {
			color: #ffffff;
			height: 100vh;
			display: flex;
			align-items: center;
			background-image: url("../../assets/img/login.png");
			background-position: center;
			.image {
				margin: 0 auto;
				h2 {
					font-size: 2.5em;
					font-weight: 500;
				}
				p {
					font-size: 1.25em;
				}
				img {
					max-width: 650px;
				}
			}
		}
		.err-msg {
			color: red;
		}
		.style-1 {
			.otp-input-8-field {
				border-radius: 4px;
				border: 1px solid #f5cd79;
				&:not(:last-child) {
					margin-right: 0.5rem;
				}
			}
		}
	}
</style>
