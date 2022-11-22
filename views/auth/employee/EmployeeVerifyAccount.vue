<template>
	<section id="email-verification">
		<div
			class="email-verification-inner"
			v-loading="loading"
			element-loading-text="Verifying link..."
			element-loading-spinner="el-icon-loading"
			element-loading-background="rgba(0, 0, 0, 0.8)"
		>
			<!-- <h2>Verify your Mail</h2> -->
			<el-row type="flex" class="row-bg" justify="center" v-if="showAlert">
				<el-col>
					<div class="inner-wrap">
						<div class="main-logo">
							<img href="#" src="@/assets/img/logo.png" alt="Logo" />
						</div>
						<div class="alert-box">
							<div
								class="error-verification"
								v-if="!getVerificationStatus.success"
							>
								<!-- <img src="@/assets/img/icons/error.svg" alt="icon" class="img-fluid" /> -->
								<h2 class="font-normal color1">Verification Failed!</h2>
								<img src="@/assets/img/icons/information.svg" alt="User mail" />
								<p class="color25 mb-05">
									This verification link is either invaild or has expired.
								</p>
							</div>
							<div
								class="success-verification"
								v-if="getVerificationStatus.success"
							>
								<!-- <img src="@/assets/img/icons/sucess.svg" alt="icon" class="img-fluid" /> -->
								<h3 class="heading font-normal color-success">
									Email Verified Successfully!
								</h3>
								<p class="color-25 mb-0">
									You can now
									<router-link
										to="/employee/signin"
										class="color-orange font-normal letter-spacing--1"
										>Login</router-link
									>
								</p>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<p class="copyright-text">
			&copy; Copyright 2020 Nimble HRMS. All rights reserved.
		</p>
	</section>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		name:"EmployeeVerifyAccount",
		created() {},
		data() {
			return {
				loading: false,
				showAlert: false,
			};
		},
		computed: {
			...mapGetters("auth", ["getVerificationStatus", "getErrorMessage"]),
		},
		mounted() {
			this.verifyAccount();
		},
		destroyed() {},
		methods: {
			async verifyAccount() {
				this.loading = false;
				this.showAlert = true;
				let params = {
					vc: this.$route.query.vc,
					email: this.$route.query.email,
				};
				await this.$store.dispatch("auth/verifyAccount", params);
				this.loading = false;
				this.showAlert = true;
			},
		},
	};
</script>

<style lang="scss" rel="stylesheet/scss">
	#email-verification {
		text-align: center;
		.inner-wrap {
			display: inline-block;
			max-width: 35em;
			text-align: left;
		}
		.email-verification-inner {
			padding-top: 20vh;
			width: 100%;
			h2 {
				font-weight: 400;
				font-size: 2em;
				letter-spacing: 0px;
			}
			p {
				line-height: 1.5;
				letter-spacing: 0.5px;
				font-size: 0.93em;
				font-weight: 300;
				margin-bottom: 2.5em;
				margin-top: 0;
				color: #555555;
			}
			.main-logo {
				padding-bottom: 1em;
				img {
					max-width: 250px;
				}
			}
			.alert-box {
				background: #ffffff;
				.success-verification {
					h2 {
						color: green;
					}
					img {
						width: 120px;
						margin: 10px 0px;
					}
				}
				.error-verification {
					h2 {
						color: #ff4444;
					}
					img {
						width: 120px;
						margin: 10px 0px;
					}
				}
			}
		}
		.copyright-text {
			position: absolute;
			bottom: 10px;
			left: 0;
			right: 0;
			text-align: center;
			font-size: 0.85em;
			color: #999999;
		}
	}
</style>
