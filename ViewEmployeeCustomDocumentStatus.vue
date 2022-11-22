<template>
  <div class="main-section" v-loading="loading">
    <div class="box-center" v-if="isDecline">
      <div class="box-header">
        <i class="el-icon-error pb-2 pr-1 pl-2 icon" />
        <h1 class="box-heading">Signing Declined</h1>
      </div>
      <div class="box-main m-4">
        <span
          >You have declined to sign {{ documentName }} providing the reason
          below.</span
        >
      </div>
      <div class="box-decline-reason">
        <span class="m-4">Decline Reason:</span>
        <p>{{ note }}</p>
      </div>
      <span class="notify m-4">
        Don’t have account in eSigns?
        <a @click="gotoSignUp">Create account</a>
      </span>
    </div>
    <div class="box-center-2" v-if="notAllowed">
      <i class="el-icon-error icon" />You are not allowed here
    </div>

    <div class="box-center-1" v-if="isSigned">
      <div class="box-header-1">
        <i class="el-icon-circle-check pb-2 pr-1 pl-2 icon" />
        <h1 class="box-heading-1">Document Signed</h1>
      </div>
      <div class="box-main-1 m-4">
        <span>You have successfully sign the {{ documentName }} document</span>
      </div>
      <hr />
      <!-- <span class="notify-1 m-4">
        Don’t have account in eSigns?
        <a @click="gotoSignUp">Create account</a>
      </span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserDocumentsHelper from "@/mixins/UserDocumentsHelper";
export default {
  name: "Global-ViewEmployeeCustomDocumentStatus",
  mixins: [UserDocumentsHelper],
  data() {
    return {
      employeeDocumentId: "",
      documentName: "",
      userId: "",
      note: "",
      loading: false,
      isDecline: false,
      is_forbidden_doc: false,
      isSigned: false,
      notAllowed: false,
    };
  },
  computed: {
    ...mapGetters("documents", [
      "getSingleDocumentData",
      "getSingleDocumentErrors",
    ]),
    ...mapGetters("auth", ["getAuthenticatedUser"]),
    currentAuthUserId() {
      return this.getAuthenticatedUser;
    },
  },
  async mounted() {
    this.loading = true;
    this.userId = this.getAuthenticatedUser._id;
    this.employeeDocumentId = this.$route.params.employee_document_id;
    await this.fetchEmployeDocumentData();
    this.setData();
    await this.getCurrentAuthUser();
    await this.signedOrDeclined();
    this.loading = false;
  },
  methods: {
    signedOrDeclined() {
      let user = this.getCurrentAuthUser();
      if (user) {
        if (user.e_signature_status) {
          this.isSigned = true;
        }
        if (user.declined_status) {
          this.note = user.declined_notes;
          this.isDecline = true;
        }
      } else {
        this.notAllowed = true;
      }
    },
    gotoSignUp() {
      this.$router.push({ path: "/signin" });
    },
    async fetchEmployeDocumentData() {
      try {
        await this.$store.dispatch("documents/fetchDocumentDataById", {
          document_id: this.employeeDocumentId,
        });
      } catch (err) {
        console.log(err);
        this.is_forbidden_doc = true;
        this.notAllowed = true;
      }
    },
    getCurrentAuthUser() {
      let currentUser = this.documentUsers.find(
        (x) =>
          (x.user_id && x.user_id.email === this.currentAuthUserId.email) ||
          (x.contact_id && x.contact_id.email == this.currentAuthUserId.email)
      );
      console.log(currentUser);
      return currentUser;
    },
    setData() {
      this.documentName = this.getSingleDocumentData.data.title;
      this.documentUsers = this.getSingleDocumentData.data.document_users;
    },
  },
  beforeDestroy() {
    this.$store.commit("documents/setSingleDocumentData", null, {
      root: true,
    });
    this.$store.commit("dashboard/setSingleDocumentErrors", null, {
      root: true,
    });
  },
};
</script>
<style lang="scss" scoped>
.main-section {
  color: white;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  .box-center-2 {
    background-color: #fafafa !important;
    border: 1.5px solid rgb(240, 240, 240);
    width: 800px;
    height: 350px;
    font-size: 30px;
    color: #e35257;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 30px;
      margin-right: 10px;
    }
  }
  .box-center {
    background-color: #fafafa !important;
    border: 1.5px solid rgb(240, 240, 240);
    width: 800px;
    height: 350px;
    .box-header {
      position: relative;
      top: 0px;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      background-color: #e35257 !important;
      .box-heading {
        color: white;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        line-height: 26.63px;
      }
      .icon {
        font-size: 28px;
      }
    }
    .box-main {
      position: relative;
      top: 11px;
      color: #4c4f6d;
      font-weight: 300;
      font-style: normal;
      font-size: 18px;
      line-height: 30.8px;
    }
    .box-decline-reason {
      background-color: #eaedf0;
      position: relative;
      top: 5px;
      width: 790px;
      height: 70px;
      padding: 5px;
      span {
        color: #4c4f6d;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
      }
      p {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        color: #4c4f6d;
        margin-left: 24px;
      }
    }
    .notify {
      color: black;
      position: relative;
      top: 40px;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 27px;
      a {
        color: #2f80ed;
        cursor: pointer;
      }
    }
  }
  .box-center-1 {
    background-color: #fafafa !important;
    border: 1.5px solid rgb(240, 240, 240);
    width: 800px;
    height: 250px;
    .box-header-1 {
      position: relative;
      top: 0px;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      background-color: #27ae60 !important;
      .box-heading-1 {
        color: white;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        line-height: 26.63px;
      }
      .icon {
        font-size: 28px;
      }
    }
    .box-main-1 {
      position: relative;
      top: 11px;
      color: #4c4f6d;
      font-weight: 300;
      font-style: normal;
      font-size: 18px;
      line-height: 30.8px;
    }
    .notify-1 {
      color: black;
      position: relative;
      top: 10px;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 27px;
      a {
        color: #2f80ed;
        cursor: pointer;
      }
    }
  }
}
</style>
