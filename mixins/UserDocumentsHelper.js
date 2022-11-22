// import { bus } from "../main";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      usersDataLoading: false,
      documentUsersData: [],
      urlParams: {
        employee_document_id: null,
        user_id: null,
      },
      sendRemainderToUserID: null,
      employeeDocumentId: "",
    };
  },
  mounted() {
    this.urlParams.employee_document_id =
      this.$route.query.employee_document_id;
  },
  computed: {
    ...mapGetters("employeeDocuments", [
      "getDocumentApprovalStatus",
      "getDocumentApprovalErrors",
      "getDocumentRejectStatus",
      "getDocumentRejectErrors",
    ]),
  },
  methods: {
    // getting user document data
    async fetchDocumentUsersData() {
      this.dialogdocumentStatus = true;

      this.usersDataLoading = true;

      await this.$store.dispatch("employeeDocumentUsers/fetchDocumentUsers", {
        employee_document_id: this.$route.query.employee_document_id,
      });
      this.documentUsersData = this.getDocumentUsers.employee_document_users;

      this.usersDataLoading = false;
    },
    // accept user document
    async acceptUserDocument(user_id) {
      this.loading = true;
      this.urlParams.user_id = user_id;
      await this.$store.dispatch(
        "employeeDocumentUsers/acceptUserDocument",
        this.urlParams
      );
      if (this.getDocumentUserAcceptStatus.data.success) {
        this.$notify.success({
          title: "Success",
          message: "Employee Document is Accepted Successfully.",
        });
        location.reload();
      } else {
        this.$notify.warning({
          title: "Warning",
          message: "Error in Accepting Employee Document.",
        });
      }
      this.fetchDocumentUsersData();
      this.loading = false;
    },

    // reject user document
    async rejectUserDocument(reason) {
      try {
        this.loading = true;
        let params = {
          document_id: this.$route.params.employee_document_id,
          data: {
            document_rejected_notes: reason,
          },
        };
        await this.$store.dispatch(
          "employeeDocuments/rejectUserDocument",
          params
        );

        if (this.getDocumentRejectStatus) {
          this.successNotify("Document declined successfully");
          window.location.reload();
        } else {
          this.errorNotify("Error in rejecting document");
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    sendRemainder(user_id) {
      this.sendRemainderDialog = true;
      this.sendRemainderToUserID = user_id;
    },

    async sendRemainderToUser() {
      //this.sendReminder
      this.loading = true;
      this.urlParams.user_id = this.sendRemainderToUserID;
      await this.$store.dispatch(
        "employeeDocumentUsers/sendRemainderToUser",
        this.urlParams
      );
      this.sendRemainderDialog = false;
      this.sendRemainderToUserID = null;
      if (this.getDocumentUserRemainderStatus.data.success) {
        this.$notify.success({
          title: "Success",
          message: "Employee Remainder Successfully.",
        });
      } else {
        this.$notify.warning({
          title: "Warning",
          message: "Error in Sending Employee Remainder.",
        });
      }
      this.fetchDocumentUsersData();
      this.loading = false;
    },

    // checking the user has approval access
    checkApprovalAccess(documentUsers, userId) {
      if (documentUsers) {
        // getting user_id of approval access user
        let approvalUser = this.documentUsers
          .filter((user) => {
            if (user.has_approval_access) {
              return true;
            }
          })
          .map((item) => item.user_id._id);

        // checking current user has access or not
        if (approvalUser && approvalUser == userId) {
          return true;
        }

        return false;
      }

      return false;
    },

    // approver fields checking
    checkApprovalUsers(users, fields) {
      users.map((user) => {
        if (
          user &&
          user.user_type == "APPROVER" &&
          fields.indexOf(user.value) != -1
        ) {
          user.user_type = "SIGNER";
          user.has_approval_access = false;
        }
      });
      return users;
    },

    // Quick doc create methods
    prepareFieldsData(elements = []) {
      let data = {};
      elements.forEach((element) => {
        if (element.type == "HEADING" || element.type == "PARAGRAPH") {
          data[element.selected_tag] = element.content;
        } else if (element.value) {
          data[element.key] = element.value;
        } else if (element.source) {
          data[element.key] = element.source;
        } else {
          data[element.key] = "";
        }
      });
      return data;
    },
    getDocumentDataByConfigurable(data) {
      return data;
    },
    async removeFormFieldsFromPdf() {
      await this.$store.commit(
        "fileUpload/setAllDocumentFieldsRemoved",
        false,
        {
          root: true,
        }
      );
      await this.document_url_paths.forEach(async (document, index) => {
        let urlSliptArray = document.split("/");
        let tempUrl = "";
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          tempUrl = `/${process.env.VUE_APP_APP_TYPE}${document}`;
        } else {
          tempUrl = document;
        }
        let url = this.basePdfdownloadUrl + tempUrl;
        let params = {
          addDocId: false,
          addPageNumber: false,
          stampByTsa: false,
          pdfSignatures: [],
          defaultScale: this.scale || 1.0,
          keepFileID: true,
          pdfTexts: [],
          pdfLines: [],
          pdfRecs: [],
          pdfImages: [],
          pdfContent: url,
          removeAllFormFields: true,
        };
        await this.$store.dispatch("fileUpload/fileTheUploadv4", params);
        if (index == this.document_url_paths.length - 1) {
          if (this.getUploadStatus && this.getUploadStatus.responseCode == 0) {
            await this.$store.commit(
              "fileUpload/setAllDocumentFieldsRemoved",
              true,
              {
                root: true,
              }
            );
          }
        }
      });
    },
  },
  filters: {
    getUserFullName(data) {
      if (!data) return "-";
      return data.first_name
        ? data.first_name
        : "" + " " + data.last_name
        ? data.last_name
        : "";
    },
  },
};