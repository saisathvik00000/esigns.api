<template>
	<section class="signIn-view employee-signin">
		<el-row type="flex" align="middle">
			<el-col :span="12">
				<div class="left-block">
					<div>
						<div class="signIn-form">
							<div class="text-left mb-2">
								<img
									href="#"
									src="@/assets/img/logo.png"
									alt="Logo"
									height="65"
								/>
							</div>
							<div class="form-title">
								<h3>Welcome Back!</h3>
								<p>Sign In</p>
							</div>
							<el-form :model="formData" :rules="rules" ref="ruleForm">
								<div class="form-group">
									<el-form-item prop="email">
										<el-input
											v-model="formData.email"
											placeholder="Email"
										></el-input>
										<span class="input-icon">
											<img src="@/assets/img/icons/mail.svg" alt="email" />
										</span>
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
											<img src="@/assets/img/icons/locked.svg" alt="locked" />
										</span>
									</el-form-item>
								</div>
								<div class="d-flex justify-between align-center">
									<!-- <div class="remember-pass pt-2 mt-1">
										<el-checkbox v-model="checked">Remember Me</el-checkbox>
									</div> -->
									<div class="forgot-password pt-1">
										<router-link to="/forgot-password"
											>Forgot Password?</router-link
										>
									</div>
								</div>
								<el-form-item>
									<el-button
										type="primary"
										v-loading="loading"
										class="submit-btn"
										@click="submitForm('ruleForm')"
										:disabled="loading"
									>
										Login
										<span class="submit-loading" v-if="loading"></span>
									</el-button>
								</el-form-item>
								<span class="err-msg">{{ formData.err }}</span>
							</el-form>
						</div>
						<div class="login-others">
							<div>
								<p>Or login with social account</p>
								<div>
									<ul>
										<li>
											<a href="#">
												<img src="@/assets/img/icons/google.svg" alt="icon" />
											</a>
										</li>
										<li>
											<a href="#">
												<img src="@/assets/img/icons/linkedin.svg" alt="icon" />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="support">
							<a href="#">
								<img src="@/assets/img/icons/support.svg" alt="icon" />
								<span>Help &amp; Support</span>
							</a>
						</div>
						<div class="copyrights text-center mt-3 black6 pt-1">
							<p>
								Copyright © 2020 <a href="#">Nimble</a> All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="right-block"></div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		name: "Signin3",
		computed: {
			...mapGetters("auth", [
				"getGeneralErrorMessage",
				"getAuthenticationStatus",
			]),
		},

		data() {
			return {
				loading: false,
				checked: true,
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

			goToAdmin() {
				this.$router.push({ path: "/signin" });
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
				await this.$store.dispatch("auth/employeeSignin", params);
				this.loading = false;

				if (this.getAuthenticationStatus) {
					console.log("authenticationstatus")
					this.goToDashboard();
				} else {
					this.formData.err = this.getGeneralErrorMessage;
				}
			},
			goToDashboard() {
				let query = this.$route.query;

				console.log(query);
				if (query) {
					let redirect = query.redirect;
					let routerParams = query.params ? JSON.parse(query.params) : {};
					let routerQuery = query.query ? JSON.parse(query.query) : {};
					if (redirect) {
						this.$router.push({
							name: redirect,
							query: routerQuery,
							params: routerParams,
						});
					} else {
						this.$router.push("/emp");
					}
				} else {
					this.$router.push("/emp");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.err-msg {
		position: relative;
		top: 1em;
		color: #fa607e;
		text-align: left;
		display: block;
		letter-spacing: 1px;
	}
	.signIn-view {
		background: #1c487e;
		min-height: 100vh;
		overflow: hidden;

		.left-block {
			background: #ffffff;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
			height: 100%;
			.top-links {
				position: absolute;
				top: 1.75em;
				right: 1.75em;
				.el-button {
					background-color: transparent;
					border-color: #4a90e2;
					color: #113765;
				}
			}
			.support {
				text-align: center;
				margin-top: 2.5em;
				a {
					color: #909399;
					display: inline-block;
					display: flex;
					align-items: center;
					justify-content: center;
					span {
						padding-left: 10px;
					}
				}
			}
			.signIn-form {
				width: 400px;
				padding-top: 1em;
				display: block;
				margin: 0 auto;
				.form-title {
					margin-bottom: 30px;
					text-align: left;
					h3 {
						font-weight: 400;
						font-size: 1em;
						color: #333333;
					}
					p {
						font-size: 1.5em;
						color: #113765;
						margin-top: 3px;
					}
				}
				.el-form {
					.form-group {
						&:nth-child(1) {
							margin-bottom: 30px;
						}
					}
					.input-icon {
						position: absolute;
						left: 20px;
						top: 35px;
						transform: translateY(-50%);
					}
				}
				.forgot-password {
					margin-top: 20px;
					text-align: right;
					a {
						color: #113765;
						font-size: 0.95em;
						letter-spacing: 0.02em;
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
				.submit-btn {
					display: block;
					width: 100%;
					background: #000577;
					box-shadow: 0px 4px 8px rgba(74, 144, 226, 0.1);
					border-radius: 5px;
					padding: 18px 0;
					margin-top: 25px;
					color: #f5f5f5;
					font-size: 1.1em;
					font-weight: 500;
					letter-spacing: 1px;
					transition: all 0.3s ease-in-out;
					border: none;
					&:hover {
						background: #1d7be9;
						box-shadow: 0px 4px 8px rgba(74, 144, 226, 0.1);
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
			background-color: #ffffff;
			background-image: url(/assets/img/login-employee.png);
			background-position: bottom center;
			background-size: cover;
			background-repeat: no-repeat;
			min-height: 100vh;
			.image {
				position: relative;
				min-height: 80vh;
				margin: 0 auto;
				h2 {
					position: absolute;
					left: 0;
					right: 0;
					text-align: center;
					bottom: 10%;
					font-size: 1.5em;
					font-weight: 400;
					color: #113765;
					text-align: center;
					padding-top: 1em;
					letter-spacing: -0.5px;
					line-height: 1.7;
				}
				p {
					font-size: 1.25em;
				}
				img {
					position: absolute;
					max-width: 100%;
					top: 0%;
					display: block;
					margin: 0 auto;
				}
			}
		}
	}
</style>
<style lang="scss">
	.employee-signin {
		.el-form-item__label {
			color: #1c487e;
			font-size: 1em;
			letter-spacing: 0.02em;
			&::before {
				content: "";
				display: none;
			}
		}
		.el-input__inner {
			height: 58px !important;
			color: #113765;
			background-color: #ffffff;
			border: 0.5px solid #dddddd;
			border-radius: 4px;
			font-size: 1.15em;
			letter-spacing: 0.05em;
			padding-left: 60px;
		}
		.el-form-item__error {
			font-size: 15px;
			font-weight: 500;
			padding-top: 5px;
		}
	}
</style>
