<template>
  <section v-if="is_forbidden_doc">
    <img
      style="margin-left: 45%; margin-top: 10%"
      src="@/assets/img/Access Denied.svg"
    />
    <div>
      <p class="forbiddenstyle">
        You are not allowed to access the given document.
      </p>
      <p
        class="forbiddenstyleTwo"
        v-if="this.getAuthenticatedUser && this.getAuthenticatedUser.email"
      >
        You are already logged in as an authenticated user with this email "{{
          this.getAuthenticatedUser.email
        }}".
      </p>
      <p class="forbiddenLines" v-if="!this.getAuthenticatedUser">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </p>
      <p class="forbiddenstyleThree" v-if="!this.getAuthenticatedUser">
        To view this document,please signing in to eSigns with the email you
        received.
      </p>
    </div>
    <div class="btnclass" v-if="!this.getAuthenticatedUser">
      <el-button>
        <router-link style="color: #f754a2" to="/signup">Sign up</router-link>
      </el-button>
      <el-button type="danger">
        <router-link style="color: #ffffff" to="/signin">Sign In</router-link>
      </el-button>
    </div>
  </section>
  <section
    v-else
    class="view-configure-document"
    :class="{
      mobile: getIsMobile,
      'is-close-RS': !getIsRSOpen,
      'is-open-RS': getIsRSOpen,
      'is-other-options-RS-opened': isOtherOptionsRSOpened,
    }"
    id="drag-template-background"
    v-loading="documentDataLoading"
  >
    <div class="inner-navbar" v-if="!getIsMobile">
      <div class="inner-navbar-2nd-level-child">
        <div class="inner-navbar-1th-level-child doc-type-one">
          <div style="display: flex; justify-content: space-between">
            <el-popconfirm
              title="Are you sure to Exit?"
              @confirm="goBack()"
              confirm-button-text="Yes"
              cancel-button-text="No"
            >
              <el-button
                slot="reference"
                class="back-btn type-2"
                v-if="isSenderOrnot"
                style="margin-left: 4px; border-radius: 4px"
              >
                <i class="el-icon-back">Back</i>
              </el-button>
            </el-popconfirm>
            <h4
              class="document-title"
              v-if="getIsMobile && !is_corrected_document"
              :title="documentName"
            >
              {{ documentName | truncate(4, "...") }}
            </h4>
          </div>
          <div style="display: flex">
            <div
              class="flex-fill left-block vue-form ml-2"
              v-if="!getIsMobile && !is_corrected_document"
            >
              <h4 class="document-title">
                {{ documentName | truncate(30, "...") }}
              </h4>
            </div>
            <div
              class="flex-fill left-block vue-form ml-2"
              v-if="is_corrected_document"
            >
              <img
                src="@/assets/img/eSigns Logo Black.svg"
                class="mt-1 ml-3"
                style="cursor: pointer"
                @click="gotoDashboard"
              />
            </div>
            <div
              v-if="getIsMobile"
              class="
                right-block
                flex-self-end
                pe-3
                align-items-self
                action-wrapper-type-two
              "
            >
              <div
                class="right-block flex-self-end pe-3 align-items-self"
                v-if="!is_corrected_document"
              >
                <el-progress
                  type="circle"
                  :percentage="100"
                  status="success"
                ></el-progress>
                <el-button
                  @click="viewDocumentRecipient = true"
                  class="manage-recipients"
                  plain
                  :disabled="disableOnVoid || disableDecline"
                >
                  <el-badge :value="documentUsers.length" class="item">
                    <el-tag
                      class="user-tag"
                      :type="tagType[Math.floor(index % tagType.length)]"
                      >{{ documentUsers[0] | getUserNameAvatar }}</el-tag
                    >
                  </el-badge>
                </el-button>
              </div>
              <el-dropdown
                size="mini"
                v-if="!is_corrected_document"
                class="ml-1"
              >
                <span class="el-dropdown-link">
                  Options
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <a
                    v-if="
                      getCurrentUserIsFilled != true &&
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status !=
                        'DECLINED' &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.document_status !=
                        'ARCHIVED' &&
                      !is_current_user_is_cc &&
                      isInDocumentUsers
                    "
                    @click="finishLater()"
                  >
                    <el-dropdown-item
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                      ><i class="el-icon-time"></i>Finish
                      Later</el-dropdown-item
                    ></a
                  >
                  <a
                    @click="printandsign = true"
                    v-if="
                      getCurrentUserIsFilled != true &&
                      checkIsCurrentUser &&
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status !=
                        'DECLINED' &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.document_status !=
                        'ARCHIVED' &&
                      !is_current_user_is_cc &&
                      isInDocumentUsers
                    "
                  >
                    <el-tooltip
                      v-if="!getIsMobile"
                      content="Sign manually using 'Print & Sign'"
                    >
                      <el-dropdown-item
                        :disabled="
                          checkWorkflowDocument && !is_workflow_document
                        "
                      >
                        <i class="el-icon-printer"></i>
                        Print & Sign
                      </el-dropdown-item>
                    </el-tooltip>
                  </a>
                  <a @click="getAllDocLogs">
                    <el-dropdown-item
                      ><i class="el-icon-refresh-right"></i>
                      History</el-dropdown-item
                    >
                  </a>
                  <a
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.created_by._id === authid
                    "
                    @click="docSettingsVisible = true"
                    ><el-dropdown-item
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                    >
                      <i class="el-icon-setting"></i>Settings</el-dropdown-item
                    >
                  </a>
                  <a
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status !=
                        'ARCHIVED' &&
                      getSingleDocumentData.data.created_by._id === authid &&
                      isfilledOrNot &&
                      isInDocumentUsers
                    "
                    @click="alertCorrectedDoc()"
                    ><el-dropdown-item>
                      <i class="el-icon-document-checked"></i>Correct the
                      document</el-dropdown-item
                    >
                  </a>

                  <a
                    @click="saveAsTemplate()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getAuthenticatedUser &&
                      getAuthenticatedUser.email &&
                      getAuthenticatedUser.email == getSenderEmail &&
                      getSingleDocumentData.data.document_status != 'ARCHIVED'
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-folder-add"></i>Save as
                      template</el-dropdown-item
                    >
                  </a>

                  <a
                    @click="shareCompletedDocument()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getAuthenticatedUser &&
                      getAuthenticatedUser.email &&
                      getAuthenticatedUser.email == getSenderEmail &&
                      getSingleDocumentData.data.document_status == 'COMPLETED'
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-share"></i>
                      Share with users
                    </el-dropdown-item>
                  </a>
                  <a
                    @click="alertvoided()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status !=
                        'DECLINED' &&
                      getSingleDocumentData.data.created_by._id === authid &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.document_status != 'ARCHIVED'
                    "
                  >
                    <el-dropdown-item
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                    >
                      <i class="el-icon-remove-outline"></i>Void Document
                    </el-dropdown-item>
                  </a>
                  <a
                    @click="alertEditVoidDoc()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      checkPermissionForDocument(
                        getSingleDocumentData.data,
                        'cloneDocument'
                      ) &&
                      getSingleDocumentData.data.document_status &&
                      (getSingleDocumentData.data.document_status == 'VOIDED' ||
                        getSingleDocumentData.data.document_status ==
                          'COMPLETED')
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-document-copy"></i>
                      Clone</el-dropdown-item
                    >
                  </a>
                  <a
                    @click="archiveDocument()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      checkPermissionForDocument(
                        getSingleDocumentData.data,
                        'deleteDocument'
                      ) &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.document_status != 'ARCHIVED'
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-delete"></i>
                      Delete
                    </el-dropdown-item>
                  </a>

                  <a
                    @click="alertUndoDoc()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.created_by._id === authid &&
                      getSingleDocumentData.data.document_status === 'ARCHIVED'
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-refresh-left"></i> Undo
                      Delete</el-dropdown-item
                    >
                  </a>
                  <a
                    @click="permanentDocument()"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status &&
                      getSingleDocumentData.data.created_by._id === authid &&
                      getSingleDocumentData.data.document_status === 'ARCHIVED'
                    "
                  >
                    <el-dropdown-item
                      ><i class="el-icon-delete-solid"></i>Permanent
                      Delete</el-dropdown-item
                    >
                  </a>
                  <el-dropdown-item
                    disabled
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED'
                    "
                  >
                    <i class="el-icon-timer"></i>Expires on
                    {{ expiraydate | globalDateFormat }}</el-dropdown-item
                  >
                  <a
                    round
                    plain
                    @click="declineDialogVisible = true"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.document_status !=
                        'ARCHIVED' &&
                      getSingleDocumentData.data.document_status !=
                        'DECLINED' &&
                      isDeclineOrNot &&
                      !checkRejectAccess &&
                      !getCurrentUserIsFilled
                    "
                    ><el-dropdown-item
                      style="color: red"
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                      ><i class="el-icon-remove-outline"></i>Decline the
                      document</el-dropdown-item
                    ></a
                  >
                  <a
                    round
                    plain
                    @click="rejectUserDocumentModal = true"
                    v-if="
                      getSingleDocumentData &&
                      getSingleDocumentData.data &&
                      getSingleDocumentData.data.document_status !=
                        'COMPLETED' &&
                      getSingleDocumentData.data.document_status != 'VOIDED' &&
                      getSingleDocumentData.data.document_status != 'EXPIRED' &&
                      getSingleDocumentData.data.document_status !=
                        'ARCHIVED' &&
                      getSingleDocumentData.data.document_status !=
                        'DECLINED' &&
                      checkRejectAccess &&
                      !getCurrentUserIsFilled
                    "
                  >
                    <el-dropdown-item
                      style="color: red"
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                      ><i class="el-icon-remove-outline"></i>Decline the
                      document</el-dropdown-item
                    >
                  </a>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="action-wrapper-type-two" style="display: flex">
          <div
            class="right-block flex-self-end pe-3 align-items-self"
            style="margin-top: 12px"
          >
            <div
              class="right-block flex-self-end pe-3 align-items-self"
              v-if="!is_corrected_document"
            >
              <div v-if="checkWorkflowDocument" style="display: flex">
                <el-progress
                  type="circle"
                  :percentage="getWorkflowCompletionPercentage"
                  :width="45"
                  :stroke-width="1.5"
                  :format="getFormat"
                  style="margin-top: 5px"
                ></el-progress>
                <el-select
                  v-model="currentActiveWorkflow"
                  placeholder="Select"
                  size="mini"
                  style="margin-top: 15px"
                  @change="changeWorkflowDocument"
                >
                  <el-option
                    v-for="(el, i) in selectedWorkflowData.documents"
                    :key="i"
                    :label="el.document_id.title"
                    :value="el.document_id._id"
                    :disabled="checkIsAllow(el.document_id.document_users)"
                  >
                    <span style="float: left; font-size: 13px">{{
                      i + 1
                    }}</span>
                    <span style="float: left; font-size: 13px" class="ml-1">{{
                      el.document_id.title | truncate(15, "...")
                    }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      class="ml-1"
                      >{{ el.document_id.document_status.toLowerCase() }}</span
                    >
                  </el-option>
                </el-select>
              </div>
              <el-tooltip content="Document Users">
                <el-button
                  @click="viewDocumentRecipient = true"
                  class="manage-recipients ml-2"
                  plain
                  :disabled="disableOnVoid || disableDecline"
                >
                  <el-tag
                    class="user-tag"
                    v-for="(user, index) in documentUsers"
                    :key="index"
                    :type="tagType[Math.floor(index % tagType.length)]"
                    >{{ user | getUserNameAvatar }}</el-tag
                  >
                </el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </div>
            <el-dropdown v-if="!is_corrected_document">
              <span class="el-dropdown-link">
                Other Options
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <a
                  v-if="
                    getCurrentUserIsFilled != true &&
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                    !is_current_user_is_cc &&
                    !finish_drawer() &&
                    isInDocumentUsers
                  "
                  @click="finishLater()"
                >
                  <el-dropdown-item
                    :disabled="checkWorkflowDocument && !is_workflow_document"
                    ><i class="el-icon-time"></i>Finish Later</el-dropdown-item
                  ></a
                >
                <!--<el-dropdown-item divided
                  ><i class="el-icon-view"></i>Preview</el-dropdown-item
                >-->
                <a
                  @click="printandsign = true"
                  v-if="
                    getCurrentUserIsFilled != true &&
                    getSingleDocumentData &&
                    checkIsCurrentUser &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                    !is_current_user_is_cc &&
                    isInDocumentUsers
                  "
                >
                  <el-tooltip
                    content="Sign manually using 'Print & Sign'"
                    placement="left-start"
                  >
                    <el-dropdown-item
                      :disabled="checkWorkflowDocument && !is_workflow_document"
                    >
                      <i class="el-icon-printer"></i>
                      Print & Sign
                    </el-dropdown-item>
                  </el-tooltip>
                </a>
                <a
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status == 'SENT'
                  "
                  @click="DownloadDocFOrPrintAndSign"
                  ><el-dropdown-item
                    ><i class="el-icon-download"></i> Download
                  </el-dropdown-item></a
                >
                <a @click="getAllDocLogs">
                  <el-dropdown-item
                    ><i class="el-icon-refresh-right"></i>
                    History</el-dropdown-item
                  >
                </a>
                <a
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'documentSettings'
                    ) &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED'
                  "
                  @click="docSettingsVisible = true"
                  ><el-dropdown-item
                    :disabled="checkWorkflowDocument && !is_workflow_document"
                  >
                    <i class="el-icon-setting"></i>Settings</el-dropdown-item
                  >
                </a>
                <a
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'correctDocument'
                    ) &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                    isfilledOrNot
                  "
                  @click="alertCorrectedDoc()"
                  ><el-dropdown-item>
                    <i class="el-icon-document-checked"></i>Correct the
                    document</el-dropdown-item
                  >
                </a>
                <a
                  @click="saveAsTemplate()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'saveTemplate'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-folder-add"></i>Save as
                    template</el-dropdown-item
                  >
                </a>

                <a
                  @click="shareCompletedDocument()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'shareUsers'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status == 'COMPLETED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-share"></i>
                    Share with users
                  </el-dropdown-item>
                </a>

                <a
                  @click="
                    sendToMail(
                      getSingleDocumentData.data._id,
                      getSingleDocumentData.data.name
                    )
                  "
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status == 'COMPLETED' &&
                    getSingleDocumentData.data.created_by._id === authid
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-position"></i>
                    Send to mail
                  </el-dropdown-item>
                </a>
                <a
                  @click="alertvoided()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'voidDocument'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-remove-outline"></i>Void
                    Document</el-dropdown-item
                  >
                </a>
                <a
                  @click="alertEditVoidDoc()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'cloneDocument'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    (getSingleDocumentData.data.document_status == 'VOIDED' ||
                      getSingleDocumentData.data.document_status == 'COMPLETED')
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-document-copy"></i>
                    Clone</el-dropdown-item
                  >
                </a>
                <a
                  @click="archiveDocument()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'deleteDocument'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-delete"></i>
                    Delete
                  </el-dropdown-item>
                </a>
                <a
                  @click="alertUndoDoc()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.created_by._id === authid &&
                    getSingleDocumentData.data.document_status === 'ARCHIVED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-refresh-left"></i>Undo
                    Delete</el-dropdown-item
                  >
                </a>
                <a
                  @click="permanentDocument()"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    checkPermissionForDocument(
                      getSingleDocumentData.data,
                      'deleteDocument'
                    ) &&
                    getSingleDocumentData.data.document_status &&
                    getSingleDocumentData.data.document_status === 'ARCHIVED'
                  "
                >
                  <el-dropdown-item
                    ><i class="el-icon-delete-solid"></i>Permanent
                    Delete</el-dropdown-item
                  >
                </a>
                <el-dropdown-item
                  disabled
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED'
                  "
                >
                  <i class="el-icon-timer"></i>Expires on
                  {{ expiraydate | globalDateFormat }}</el-dropdown-item
                >
                <a
                  round
                  plain
                  @click="declineDialogVisible = true"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    isDeclineOrNot &&
                    !checkRejectAccess &&
                    !getCurrentUserIsFilled
                  "
                  ><el-dropdown-item
                    style="color: red"
                    :disabled="checkWorkflowDocument && !is_workflow_document"
                    ><i class="el-icon-remove-outline"></i>Decline the
                    document</el-dropdown-item
                  ></a
                >
                <a
                  round
                  plain
                  @click="rejectUserDocumentModal = true"
                  v-if="
                    getSingleDocumentData &&
                    getSingleDocumentData.data &&
                    getSingleDocumentData.data.document_status != 'COMPLETED' &&
                    getSingleDocumentData.data.document_status != 'VOIDED' &&
                    getSingleDocumentData.data.document_status != 'EXPIRED' &&
                    getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                    getSingleDocumentData.data.document_status != 'DECLINED' &&
                    checkRejectAccess &&
                    !getCurrentUserIsFilled
                  "
                >
                  <el-dropdown-item
                    style="color: red"
                    :disabled="checkWorkflowDocument && !is_workflow_document"
                    ><i class="el-icon-remove-outline"></i>Decline the
                    document</el-dropdown-item
                  >
                </a>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              plain
              class="ml-2"
              :loading="downloadButtonLoading"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.created_by &&
                getSingleDocumentData.data.created_by._id &&
                isDocumentHasAttachment
              "
              @click="visibleDocAttachments = true"
            >
              <i class="el-icon-paperclip mr-1"></i>Attachments
            </el-button>
            <el-dropdown
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'downloadDocument'
                ) &&
                getSingleDocumentData.data.created_by &&
                getSingleDocumentData.data.created_by._id &&
                isDocumentHasAttachment &&
                (getAllCompletedDocuments().length > 1 ||
                  attachmentsFiles().length > 1)
              "
            >
              <el-button
                plain
                type="primary"
                class="type-2 ml-2"
                style="color: #ffffff"
              >
                <i class="el-icon-download mr-1"></i>Download
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <a
                  v-for="(file, index) in attachmentsFiles()"
                  :key="index"
                  @click="gotoAttachment(file)"
                >
                  <el-dropdown-item>{{ file.title }}</el-dropdown-item>
                </a>
                <a
                  v-for="(file, index) in getAllCompletedDocuments()"
                  :key="index"
                  @click="downloadCompletedDocumentForUser(file)"
                >
                  <el-dropdown-item style="color: red !important">{{
                    file.name
                  }}</el-dropdown-item>
                </a>
                <a
                  @click="downloadAlldocuments()"
                  v-if="
                    getAllCompletedDocuments().length > 1 ||
                    attachmentsFiles().length > 1
                  "
                >
                  <el-dropdown-item>Download All</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown
              v-else-if="
                (getSingleDocumentData &&
                  getSingleDocumentData.data &&
                  checkPermissionForDocument(
                    getSingleDocumentData.data,
                    'downloadDocument'
                  ) &&
                  getSingleDocumentData.data.document_status == 'COMPLETED') ||
                (getSingleDocumentData &&
                  getSingleDocumentData.data &&
                  getSingleDocumentData.data.document_status &&
                  getSingleDocumentData.data.document_status == 'COMPLETED' &&
                  getSingleDocumentData.data.document_status == 'COMPLETED' &&
                  isInDocumentUsers)
              "
            >
              <el-button
                plain
                type="primary"
                class="type-2 ml-2"
                style="color: #ffffff"
                :loading="downloadButtonLoading"
              >
                <i class="el-icon-download mr-1"></i>Download
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <a
                  v-for="(file, index) in getAllCompletedDocuments()"
                  :key="index"
                  @click="downloadCompletedDocumentForUser(file)"
                >
                  <el-dropdown-item>{{ file.name }}</el-dropdown-item>
                </a>
                <!-- <a v-if="checkDocumentStatus" @click="generateCertificate">
                  <el-dropdown-item>Certificate of completion</el-dropdown-item>
                </a> -->
                <!-- <a
                  v-for="(file, index) in getAllCompletedDocuments()"
                  :key="index"
                  @click="downloadBoth(file)"
                >
                  <el-dropdown-item>Download all</el-dropdown-item>
                </a> -->
                <a
                  @click="downloadAlldocuments"
                  v-if="
                    getAllCompletedDocuments() &&
                    getAllCompletedDocuments().length > 1
                  "
                >
                  <el-dropdown-item>Download All</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          
          </div>
          <el-button
            slot="reference"
            class="rounded-0 btn-one type-2"
            type="primary"
            v-on:click="openRightSideBar()"
            :disabled="getIsRSOpen"
            v-if="!getIsRSOpen && !is_corrected_document"
            >&lt;&lt;</el-button
          >
          <el-button
            slot="reference"
            class="rounded-0 btn-one close type-2"
            type="primary"
            v-on:click="closeRightSideBar()"
            v-if="getIsRSOpen && !is_corrected_document"
            >&gt;&gt;</el-button
          >
        </div>
      </div>
      <div class="navbar-status" v-if="!is_corrected_document">
        <div
          style="text-align: center"
          class="mt-1"
          v-if="
            !checkDocCompleted &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document &&
            checkWorkflowDocument &&
            !is_workflow_document
          "
        >
          <h3 class="clr-black fw-normal" style="min-width: 250px">
            You opened the
            <b>"{{ documentName | truncate(22, "...") }}"</b> document. <br />
            Before that,
            <b>"{{ actionRequiredDocumentName | truncate(22, "...") }}"</b>
            document has to be completed. <br />
            <el-button @click="gotoActionDocument" type="danger" size="mini"
              >Open Document</el-button
            >
          </h3>
        </div>
        <div
          style="text-align: center"
          class="mt-1"
          v-else-if="
            checkDocCompleted &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document
          "
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            <i class="el-icon-success"></i>Document Completed!
          </h3>
        </div>
        <div
          class="mt-1"
          v-else-if="
            getCurrentUserIsFilled &&
            !checkDOCReject &&
            !disableOnVoid &&
            !is_corrected_document
          "
          style="text-align: center"
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            <i class="el-icon-success"></i>
            {{ getSignerIfSignatureFieldIsThere }}
          </h3>
        </div>
        <div
          class="mt-1"
          v-else-if="getIsDocumentIsDeleted"
          style="text-align: center"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> This document is deleted! You can't
            perform any action.
          </h3>
        </div>
        <div
          class="mt-1"
          v-else-if="getIsDocumentIsExpired"
          style="text-align: center"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> This document is Expired! You can't
            perform any action.
          </h3>
        </div>
        <div
          style="text-align: center"
          class="mt-1"
          v-else-if="
            disableOnVoid &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document
          "
        >
          <h2
            class="fw-normal"
            style="min-width: 250px; color: #a321af; font-weight: bold"
          >
            <i class="el-icon-warning"></i> Document Voided!
          </h2>
        </div>
        <div
          class="mt-1"
          style="text-align: center"
          v-else-if="checkDOCReject && !is_corrected_document"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> Document Declined!
          </h3>
          <p class="text-dark fs-8">
            Reason:
            {{
              getSingleDocumentData.data.document_rejected_notes ||
              getDeclinedReason()
            }}
          </p>
        </div>
        <div
          class="mt-2"
          style="text-align: center"
          v-else-if="isCompanyDocument"
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            <i class="el-icon-document"></i> This is company document!
          </h3>
        </div>
        <div
          style="text-align: center"
          class="mt-1"
          v-else-if="
            !is_corrected_document &&
            isSendersTurnOrNot &&
            !is_current_user_is_cc &&
            !checkDocCompleted
          "
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            This is not your turn to sign the document. <br />We will notify you
            through email when it is your turn.
          </h3>
        </div>
        <div
          style="text-align: center"
          class="mt-1"
          v-else-if="
            !is_corrected_document &&
            is_current_user_is_cc &&
            !checkDocCompleted
          "
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            You don't need to perform any action on this document. <br />
            Once document is signed by all parties, you will receive a copy of
            this signed document.
          </h3>
        </div>
        <div
          style="text-align: center"
          class="mt-1"
          v-else-if="
            this.getSingleDocumentData &&
            this.getSingleDocumentData.data &&
            !this.checkPermissionForDocument(
              this.getSingleDocumentData.data,
              'viewDocument'
            ) &&
            checkIsAllow(this.documentUsers) &&
            !documentDataLoading
          "
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> You are not allowed to see this
            document!
          </h3>
        </div>
        <div class="mt-1" v-else>
          <div v-if="finish_drawer()" class="finish-drawer">
            <h2 class="finish-drawer-heading">Final Step</h2>
            <p
              class="finish-drawer-details"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                isCurrentUserIsApprovalOrNotForFinish() &&
                checkIsCurrentUser &&
                checkSignStatus
              "
            >
              {{ getFinishMessage }}
            </p>
            <p
              class="finish-drawer-details"
              v-if="checkApproveAccess && checkIsCurrentUser"
            >
              {{ getApproveMessage }}
            </p>
            <el-button
              size="mini"
              v-if="
                (getCurrentUserFieldsCount() == 0 ||
                  getCurrentUserFieldsCount() != 0) &&
                !showReviewFields
              "
              class="finish-drawer-stay"
              @click="showReviewFields = true"
              >STAY & REVIEW</el-button
            >
            <el-button
              size="mini"
              class="px-3"
              style="border-radius: 2px"
              :disabled="disableOnVoid || disableDecline || isDocumentSigned"
              v-if="showReviewFields"
              @click="goToPrevField()"
              >{{ getIsMobile ? "PREV" : "PREV FIELD" }}</el-button
            >
            <el-button
              size="mini"
              style="color: #f754a2; border-radius: 2px"
              class="px-3"
              :disabled="disableOnVoid || disableDecline || isDocumentSigned"
              v-if="showReviewFields"
              @click="goToNextField()"
              >{{ getIsMobile ? "NEXT" : "NEXT FIELD" }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              class="finish-drawer-finish"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                isCurrentUserIsApprovalOrNotForFinish() &&
                checkIsCurrentUser &&
                checkSignStatus
              "
              @click="finishDocConfirm()"
              >FINISH</el-button
            >
            <el-button
              size="mini"
              type="success"
              class="finish-drawer-finish"
              @click="userApproveDocumentConfirm"
              v-if="checkApproveAccess && checkIsCurrentUser"
              :disabled="!finish_drawer()"
              style="border-radius: 0"
              :loading="approveBotton"
            >
              <span>Approve</span>
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="rejectUserDocumentModal = true"
              v-if="checkRejectAccess && checkIsCurrentUser"
              style="border-radius: 0"
            >
              <span>Decline</span>
            </el-button>
          </div>
          <div v-else>
            <div style="text-align: center">
              <el-button
                :size="getIsMobile ? 'mini' : 'medium'"
                type="success"
                @click="userApproveDocumentConfirm"
                v-if="checkApproveAccess && checkIsCurrentUser"
                :disabled="!finish_drawer()"
                style="border-radius: 0"
                :loading="approveBotton"
              >
                <span>Approve</span>
              </el-button>
              <el-button
                type="danger"
                :size="getIsMobile ? 'mini' : 'medium'"
                @click="rejectUserDocumentModal = true"
                v-if="checkRejectAccess && checkIsCurrentUser"
                style="border-radius: 0"
              >
                <span>Decline</span>
              </el-button>
              <el-button
                size="mini"
                class="px-3"
                style="border-radius: 2px"
                :disabled="disableOnVoid || disableDecline || isDocumentSigned"
                @click="goToPrevField()"
                >{{ getIsMobile ? "PREV" : "PREV FIELD" }}</el-button
              >
              <el-button
                size="mini"
                style="color: #f754a2; border-radius: 2px"
                class="px-3"
                :disabled="disableOnVoid || disableDecline || isDocumentSigned"
                @click="goToNextField()"
                >{{ getIsMobile ? "NEXT" : "NEXT FIELD" }}</el-button
              >
            </div>
            <div style="display: flex">
              <el-progress
                :style="
                  getIsMobile ? 'width: 90%;' : 'width: 90%; padding-left: 10px'
                "
                :percentage="getFieldsCountProgress()"
                :format="format"
                v-if="elements"
                :status="getFieldsCountProgress() == 100 ? 'success' : null"
              >
              </el-progress>
              <span style="color: #000000">
                {{ getFieldsCountProgressBarMethod() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-navbar is-mobile" v-if="getIsMobile">
      <div class="inner-navbar-2nd-level-child">
        <div class="inner-navbar-1th-level-child doc-type-one">
          <div
            style="display: flex; justify-content: space-between; width: 100%"
          >
            <el-popconfirm
              title="Are you sure to Exit?"
              @confirm="goBack()"
              confirm-button-text="Yes"
              cancel-button-text="No"
              class="go-back-btn"
            >
              <el-button
                slot="reference"
                class="rounded-0 back-btn type-2"
                style="margin-top: 2px"
              >
                <i class="el-icon-back"></i>
              </el-button>
            </el-popconfirm>
            <div class="document-title-wrapper">
              <h4
                class="document-title"
                v-if="getIsMobile && !is_corrected_document"
                :title="documentName"
              >
                {{ documentName | truncate(20, "...") }}
              </h4>
            </div>
            <div class="right-icons-wrapper">
              <div class="btn-for-info-tab">
                <img
                  class="arrows"
                  src="@/assets/Icon-info.svg"
                  v-on:click="openCloseRightSideBar()"
                />
              </div>
              <div class="btn-for-other-options-tab">
                <img
                  class="arrows"
                  src="@/assets/Icon-ellipsis-v.svg"
                  v-on:click="openCloseThreeDotsRightSideBar()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="navbar-status is-mobile"
        v-if="getIsMobile && !is_corrected_document"
      >
        <div
          style="text-align: center"
          class=""
          v-if="
            !checkDocCompleted &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document &&
            checkWorkflowDocument &&
            !is_workflow_document
          "
        >
          <h3 class="clr-black fw-normal" style="min-width: 250px">
            You opened the
            <b>"{{ documentName | truncate(22, "...") }}"</b> document. <br />
            Before that,
            <b>"{{ actionRequiredDocumentName | truncate(22, "...") }}"</b>
            document has to be completed. <br />
            <el-button @click="gotoActionDocument" type="danger" size="mini"
              >Open Document</el-button
            >
          </h3>
        </div>
        <div
          style="text-align: center"
          class="doc-completed"
          v-else-if="
            checkDocCompleted &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document
          "
        >
          <h3
            class="clr-green fw-normal"
            style="min-width: 250px; margin-top: 35px"
          >
            <i class="el-icon-success"></i>Document Completed!
          </h3>
        </div>
        <div
          class=""
          v-else-if="
            getCurrentUserIsFilled &&
            !checkDOCReject &&
            !disableOnVoid &&
            !is_corrected_document
          "
          style="text-align: center"
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            <i class="el-icon-success"></i> You have signed the Document!
          </h3>
        </div>
        <div
          class=""
          v-else-if="getIsDocumentIsDeleted"
          style="text-align: center"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> This document is deleted! You can't
            perform any action.
          </h3>
        </div>
        <div
          class=""
          v-else-if="getIsDocumentIsExpired"
          style="text-align: center"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> This document is Expired! You can't
            perform any action.
          </h3>
        </div>
        <div
          style="text-align: center"
          class=""
          v-else-if="
            disableOnVoid &&
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            !is_corrected_document
          "
        >
          <h2
            class="fw-normal"
            style="min-width: 250px; color: #a321af; font-weight: bold"
          >
            <i class="el-icon-warning"></i> Document Voided!
          </h2>
        </div>
        <div
          class=""
          style="text-align: center"
          v-else-if="checkDOCReject && !is_corrected_document"
        >
          <h3 class="clr-red fw-normal" style="min-width: 250px">
            <i class="el-icon-warning"></i> Document Declined!
          </h3>
          <p class="text-dark fs-8">
            Reason:
            {{
              getSingleDocumentData.data.document_rejected_notes ||
              getDeclinedReason()
            }}
          </p>
        </div>
        <div
          style="text-align: center"
          class=""
          v-else-if="
            !is_corrected_document &&
            isSendersTurnOrNot &&
            !is_current_user_is_cc &&
            !checkDocCompleted
          "
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            This is not your turn to sign the document. <br />We will notify you
            through email when it is your turn.
          </h3>
        </div>
        <div
          style="text-align: center"
          class=""
          v-else-if="
            !is_corrected_document &&
            is_current_user_is_cc &&
            !checkDocCompleted
          "
        >
          <h3 class="clr-green fw-normal" style="min-width: 250px">
            You don't need to perform any action on this document. <br />
            Once document is signed by all parties, you will receive a copy of
            this signed document.
          </h3>
        </div>
        <div
          style="text-align: center"
          class=""
          v-else-if="checkIsAllow(this.documentUsers) && !documentDataLoading"
        >
          <h3
            v-if="!getIsMobile && !isCompanyDocument"
            class="clr-red fw-normal"
            style="min-width: 250px"
          >
            <i class="el-icon-warning"></i> You are not allowed to see this
            document!
          </h3>
          <h3
            v-else-if="getIsMobile && isCompanyDocument"
            class="clr-green fw-normal"
            style="min-width: 250px"
          >
            <i class="el-icon-document"></i> This is company document!
          </h3>
        </div>
        <div class="" v-else>
          <div v-if="finish_drawer()" class="finish-drawer">
            <h2 class="finish-drawer-heading">Final Step</h2>
            <p
              class="finish-drawer-details"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                isCurrentUserIsApprovalOrNotForFinish() &&
                checkIsCurrentUser &&
                checkSignStatus
              "
            >
              {{ getFinishMessage }}
            </p>
            <p
              class="finish-drawer-details"
              v-if="checkApproveAccess && checkIsCurrentUser"
            >
              {{ getApproveMessage }}
            </p>
            <el-button
              size="mini"
              v-if="getCurrentUserFieldsCount() != 0 && !showReviewFields"
              class="finish-drawer-stay"
              @click="showReviewFields = true"
              >STAY & REVIEW</el-button
            >
            <el-button
              size="mini"
              class="px-3"
              style="border-radius: 2px"
              :disabled="disableOnVoid || disableDecline || isDocumentSigned"
              v-if="showReviewFields"
              @click="goToPrevField()"
              >PREV FIELD</el-button
            >
            <el-button
              size="mini"
              style="color: #f754a2; border-radius: 2px"
              class="px-3"
              :disabled="disableOnVoid || disableDecline || isDocumentSigned"
              v-if="showReviewFields"
              @click="goToNextField()"
              >NEXT FIELD</el-button
            >
            <el-button
              type="danger"
              size="mini"
              class="finish-drawer-finish"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                isCurrentUserIsApprovalOrNotForFinish() &&
                checkIsCurrentUser &&
                checkSignStatus
              "
              @click="finishDocConfirm()"
              >FINISH</el-button
            >
            <el-button
              size="mini"
              type="success"
              class="finish-drawer-finish"
              @click="userApproveDocumentConfirm"
              v-if="checkApproveAccess && checkIsCurrentUser"
              :disabled="!finish_drawer()"
              style="border-radius: 0"
              :loading="approveBotton"
            >
              <span>Approve</span>
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="rejectUserDocumentModal = true"
              v-if="checkRejectAccess && checkIsCurrentUser"
              style="border-radius: 0"
            >
              <span>Decline</span>
            </el-button>
          </div>
          <div v-else>
            <div style="text-align: center">
              <el-button
                :size="getIsMobile ? 'mini' : 'medium'"
                type="success"
                @click="userApproveDocumentConfirm"
                v-if="checkApproveAccess && checkIsCurrentUser"
                :disabled="!finish_drawer()"
                style="border-radius: 0"
                :loading="approveBotton"
              >
                <span>Approve</span>
              </el-button>
              <el-button
                type="danger"
                :size="getIsMobile ? 'mini' : 'medium'"
                @click="rejectUserDocumentModal = true"
                v-if="checkRejectAccess && checkIsCurrentUser"
                style="border-radius: 0"
              >
                <span>Decline</span>
              </el-button>
              <el-button
                :size="getIsMobile ? 'mini' : 'medium'"
                class="px-3"
                style="border-radius: 2px"
                :disabled="disableOnVoid || disableDecline || isDocumentSigned"
                @click="goToPrevField()"
                >{{ getIsMobile ? "PREV" : "PREV FIELD" }}</el-button
              >
              <el-button
                :size="getIsMobile ? 'mini' : 'medium'"
                style="color: #f754a2; border-radius: 2px"
                class="px-3"
                :disabled="disableOnVoid || disableDecline || isDocumentSigned"
                @click="goToNextField()"
                >{{ getIsMobile ? "NEXT" : "NEXT FIELD" }}</el-button
              >
            </div>
            <div style="display: flex" class="progressbar-wrapper">
              <el-progress
                :style="
                  getIsMobile ? 'width: 90%;' : 'width: 90%; padding-left: 10px'
                "
                :percentage="getFieldsCountProgress()"
                :format="format"
                v-if="elements"
                :status="getFieldsCountProgress() == 100 ? 'success' : null"
              >
              </el-progress>
              <span style="color: #000000">
                {{ getFieldsCountProgressBarMethod() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class="isActive"
      class="document-preview document-container-wrapper-grand-parent"
      :style="
        getIsMobile
          ? 'height:calc(100vh - 166px)'
          : 'margin-top: 70px;height:calc(100vh - 134px);margin-left:10px'
      "
    >
      <div
        class="document-container-wrapper-parent"
        :style="
          finish_drawer() && !getIsMobile && !getCurrentUserIsFilled
            ? 'margin-top: 3%;'
            : ''
        "
      >
        <div class="document-container-wrapper">
          <div class="document-container" v-if="!is_corrected_document">
            <el-row>
              <el-col
                :span="4"
                :style="getIsMobile ? 'display: none' : ''"
                class="pdf-side-bar"
              >
                <div
                  v-if="getIsMobile && isPageNavigationLSOpened"
                  class="title-bar"
                >
                  <span class="title">Document Pages</span>
                  <el-button
                    icon="el-icon-close"
                    title="Remove document"
                    class="remove-btn"
                    @click="closePageNavigationLS"
                  ></el-button>
                </div>
                <hr style="margin-top: 2px" />
                <el-scrollbar v-loading="documentDataLoading">
                  <div
                    id="page-wrapper"
                    style="margin-bottom: 150px"
                    class="pdf-page-preview mt-1"
                  >
                    <div v-for="(doc, j) in getAllPdfData" :key="j">
                      <div v-if="doc && doc.pages">
                        <div
                          v-for="i of doc.pages"
                          :key="i"
                          class="canvas-holder"
                          :id="`${j}_preview_wrapper_${i}`"
                        >
                          <canvas
                            @click="
                              currentActivatePage = i;
                              currentActivateDoc = j;
                            "
                            :id="`${j}_canvas_page_${i}`"
                            tabindex="0"
                            :style="
                              currentActivatePage == i &&
                              currentActivateDoc == j
                                ? 'border: 1px solid #ccc; box-shadow: 0 0px 7px rgba(0, 0, 0, 0.4)'
                                : 'border: 1px solid #ccc;'
                            "
                          ></canvas>
                          <p>Page {{ pageCount(i, j) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </el-col>
              <el-col
                :xl="{ span: 20 }"
                :lg="{ span: 20 }"
                :md="{ span: 20 }"
                :sm="{ span: 24 }"
                :xs="{ span: 24 }"
              >
                <el-scrollbar v-loading="documentDataLoading" ref="scrollbar">
                  <div class="document-root builder-default">
                    <div
                      class="field-identifer-mobile"
                      :style="getHighlightButtonStyleForMobile"
                    >
                      <img
                        src="@/assets/img/icons/Hand.svg"
                        alt="img"
                        width="25px"
                      />
                    </div>
                    <div class="form-builder" ref="formBuilder">
                      <div class="form-holder">
                        <div class="form-image-holder">
                          <div
                            id="wrapper"
                            style="text-align: center; margin-bottom: 50px"
                          >
                            <div
                              v-for="(doc, j) in getAllPdfData"
                              :key="j"
                              :id="`wrapper_${j}`"
                            >
                              <canvas
                                v-for="i of doc.pages"
                                :key="i"
                                :id="`${j}_canvas_${i}`"
                                tabindex="0"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div
                          class="form-fields-holder"
                          v-loading="loadingElements"
                        >
                          <div
                            v-for="(item, index) of this.elements"
                            :key="index"
                            :data-index="index"
                            :class="
                              item.required &&
                              getCurrentAuthUser() &&
                              getCurrentAuthUser().value &&
                              getCurrentAuthUser().value == item.filled_by
                                ? 'req-item'
                                : ''
                            "
                          >
                            <el-tooltip
                              effect="dark"
                              class="tooltip"
                              :content="
                                item && item.userData && item.userData.user
                                  ? item.userData.user
                                  : item.key
                                  ? item.key
                                  : item.label
                              "
                              placement="top"
                              :hide-after="1000"
                            >
                              <!-- Heading Preview -->
                              <p
                                :style="getFieldStyles(item)"
                                v-if="
                                  item.type == 'PRIMARY_FIELDS' &&
                                  item.initial_value
                                "
                              >
                                {{ item.content }}
                              </p>
                              <p
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'HEADING'"
                              >
                                {{ item.content }}
                              </p>
                              <div
                                v-else-if="item.type == 'ENTITY'"
                                :style="getFieldStyles(item)"
                              >
                                <ConfigureEntityField
                                  :entityId="item.entity_id"
                                  :form="item"
                                  :isDisable="checkFieldAllow(item)"
                                  :company_id="
                                    getSingleDocumentData &&
                                    getSingleDocumentData.data &&
                                    getSingleDocumentData.data.company_id
                                      ? getSingleDocumentData.data.company_id
                                      : null
                                  "
                                  :document_id="
                                    getSingleDocumentData &&
                                    getSingleDocumentData.data &&
                                    getSingleDocumentData.data._id
                                      ? getSingleDocumentData.data._id
                                      : null
                                  "
                                >
                                </ConfigureEntityField>
                              </div>
                              <!-- Repeatable Preview -->
                              <div
                                v-else-if="item.type == 'REPEATABLE_PARENT'"
                                :style="getFieldStyles(item)"
                              >
                                <ConfigureRepeatableField
                                  :entityId="item.entity_id"
                                  :form="item"
                                  :isDisable="checkFieldAllow(item)"
                                  :isFromTemplate="
                                    checkFieldAllow(item) ||
                                    checkIsUserConfigured(item, documentUsers)
                                  "
                                >
                                </ConfigureRepeatableField>
                              </div>
                              <div
                                v-else-if="item.type == 'FORMULA'"
                                :style="getFieldStyles(item)"
                                :ref="removeHashesFromKey(item.key)"
                              >
                                <FormulaExecute
                                  :data="item"
                                  :form="documentData"
                                  :is-view="false"
                                  :isFromDocument="true"
                                  :workflowData="{}"
                                  :allFields="elements"
                                  :ref="removeHashesFromKey(item.key)"
                                  :company_id="
                                    getSingleDocumentData &&
                                    getSingleDocumentData.data &&
                                    getSingleDocumentData.data.company_id
                                      ? getSingleDocumentData.data.company_id
                                      : null
                                  "
                                  :document_id="
                                    getSingleDocumentData &&
                                    getSingleDocumentData.data &&
                                    getSingleDocumentData.data._id
                                      ? getSingleDocumentData.data._id
                                      : null
                                  "
                                >
                                </FormulaExecute>
                              </div>
                              <div
                                v-else-if="
                                  item.type == 'HORIZONTAL_LINE' && item.content
                                "
                                :style="getFieldStyles(item)"
                              >
                                <HorizontalLineExecute
                                  :data="item"
                                  :form="documentData"
                                  :is-view="false"
                                  :isFromDocument="true"
                                  :allFields="elements"
                                >
                                </HorizontalLineExecute>
                              </div>
                              <!-- Paragraph Preview -->
                              <textarea
                                type="textarea"
                                :rows="item.rows"
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'PARAGRAPH'"
                                v-model="item.value"
                                :multiline="true"
                                class="para-line"
                                readonly
                              />
                              <img
                                v-else-if="item.type == 'MY_INITIAL'"
                                :src="item.value"
                                :style="getStyle(item)"
                              />
                              <img
                                v-else-if="item.type == 'my-signature'"
                                :src="item.source"
                                :style="getStyle(item)"
                              />
                              <img
                                v-else-if="
                                  item.type == 'IMAGE' && item.value.length
                                "
                                :src="item.value"
                                :style="getStyle(item)"
                              />

                              <el-input
                                :style="getFieldStyles(item)"
                                type="text"
                                :placeholder="item.placeholder"
                                v-else-if="item.type == 'SINGLE_LINE_TEXT'"
                                v-model="item.value"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : !checkFieldAllow(item)
                                    ? 'default'
                                    : item.value
                                    ? 'completed'
                                    : ''
                                "
                              >
                                <el-tooltip content="hai"></el-tooltip>
                              </el-input>
                              <el-input
                                :style="getFieldStyles(item)"
                                type="text"
                                :placeholder="item.placeholder"
                                v-else-if="item.type == 'NUMBER'"
                                v-model="item.value"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : !checkFieldAllow(item)
                                    ? 'default'
                                    : item.value
                                    ? 'completed'
                                    : ''
                                "
                              ></el-input>
                              <div
                                v-else-if="item.type == 'DATE'"
                                :style="getDateFieldStyles(item)"
                              >
                                <el-date-picker
                                  :format="displayDateFormat"
                                  :placeholder="item.placeholder"
                                  v-model="item.value"
                                  :disabled="checkFieldAllow(item)"
                                  :ref="removeHashesFromKey(item.key)"
                                  v-bind:class="{
                                    'date-picker-item': true,
                                    'smaller-than': true,
                                  }"
                                ></el-date-picker>
                              </div>
                              <!-- <p v-else-if="item.type == 'DATE_SIGNED'">oksdf{{item.value}}</p> -->
                              <el-date-picker
                                :height="item.height"
                                :width="item.width"
                                :style="getDateFieldStyles(item)"
                                type="date"
                                :format="displayDateFormat"
                                :placeholder="item.placeholder"
                                v-else-if="item.type == 'DATE_SIGNED'"
                                v-model="item.value"
                                :disabled="true"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              ></el-date-picker>

                              <el-select
                                :height="item.height"
                                :width="item.width"
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'SELECT'"
                                v-model="item.value"
                                :placeholder="item.placeholder"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              >
                                <el-option
                                  v-for="(option, index) of item.options"
                                  :key="index"
                                  :value="option"
                                  :label="option"
                                ></el-option>
                              </el-select>

                              <el-select
                                :height="item.height"
                                :width="item.width"
                                :style="getDateFieldStyles(item)"
                                collapse-tags
                                v-else-if="item.type == 'MULTI_SELECT'"
                                v-model="item.value"
                                :placeholder="item.placeholder"
                                :disabled="checkFieldAllow(item)"
                                multiple
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              >
                                <el-option
                                  v-for="(option, index) of item.options"
                                  :key="index"
                                  :value="option"
                                  :label="option"
                                ></el-option>
                              </el-select>

                              <input
                                type="checkbox"
                                :height="item.height"
                                :width="item.width"
                                :style="getStyle(item)"
                                v-else-if="item.type == 'CHECKBOX'"
                                v-model="item.value"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              />
                              <currency-input
                                v-else-if="item.type == 'CURRENCY' && refreshIndex !== index"
                                v-model="item.value"
                                @input="checkCurrency(item, index)"
                                :disabled="checkFieldAllow(item)"
                                :placeholder="item.placeholder"
                                :id="item.key"
                                :style="getFieldStyles(item)"
                                :currency="
                                  item.validations && item.validations.currency
                                    ? item.validations.currency
                                    : 'USD'
                                "
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active currency-input'
                                    : 'currency-input'
                                "
                              />
                              <div
                                v-else-if="item.type == 'YES_OR_NO'"
                                :style="getStyle(item)"
                              >
                                <el-radio
                                  v-model="item.value"
                                  label="yes"
                                  :disabled="checkFieldAllow(item)"
                                  :ref="removeHashesFromKey(item.key)"
                                  >YES</el-radio
                                >
                                <el-radio
                                  v-model="item.value"
                                  label="no"
                                  :disabled="checkFieldAllow(item)"
                                  :ref="removeHashesFromKey(item.key)"
                                  >NO</el-radio
                                >
                              </div>
                              <textarea
                                type="textarea"
                                :rows="item.rows"
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'MULTI_LINE_TEXT'"
                                v-model="item.value"
                                :multiline="true"
                                :placeholder="item.placeholder"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active textare-background'
                                    : 'textare-background'
                                "
                              />
                              <button
                                v-else-if="
                                  item.type == 'SIGNATURE' && !item.source
                                "
                                :style="getStyle(item)"
                                @click="captureSignature(item, index)"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              >
                                {{ item.label }}
                                <i class="el-icon-edit"></i>
                              </button>
                              <button
                                v-else-if="item.type == 'ATTACHMENT'"
                                :style="getStyle(item)"
                                @click="captureAttachmentMethod(item, index)"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              >
                                {{ item.label }}
                              </button>
                              <img
                                v-else-if="
                                  item.type == 'SIGNATURE' && item.source
                                "
                                :width="item.width"
                                :height="item.height"
                                :src="item.source"
                                :style="getStyle(item, true)"
                                :ref="removeHashesFromKey(item.key)"
                                @click="captureSignature(item, index)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                                tabindex="0"
                              />
                              <button
                                v-else-if="
                                  item.type == 'INITIAL' && !item.source
                                "
                                :style="getStyle(item)"
                                @click="handleInitialClick(item, index)"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                              >
                                {{ item.label }}
                                <i class="el-icon-edit"></i>
                              </button>
                              <img
                                v-else-if="
                                  item.type == 'INITIAL' && item.source
                                "
                                :width="item.width"
                                :height="item.height"
                                :src="item.source"
                                :style="getStyle(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : ''
                                "
                                tabindex="0"
                                @click="handleInitialClick(item, index)"
                              />
                              <textarea 
                                type="textarea"
                                :rows="item.rows"
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'PRIMARY_FIELDS' && item.selected_tag == 'address'"
                                v-model="item.content"
                                :multiline="true"
                                :placeholder="item.placeholder"
                                :disabled="checkFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active textare-background'
                                    : 'textare-background'
                                "
                              />
                              <el-input
                                type="text"
                                :style="getFieldStyles(item)"
                                v-else-if="item.type == 'PRIMARY_FIELDS' && item.selected_tag != 'address'"
                                v-model="item.content"
                                :placeholder="item.placeholder"
                                @change="testing_fields(index)"
                                :disabled="checkPrimaryFieldAllow(item)"
                                :ref="removeHashesFromKey(item.key)"
                                :class="
                                  currentEnabledFieldKey == item.key
                                    ? 'active'
                                    : !checkPrimaryFieldAllow(item)
                                    ? 'default'
                                    : item.content
                                    ? 'completed'
                                    : ''
                                "
                              />
                              <div :style="getStyle(item)" v-else>
                                <el-table
                                  v-if="
                                    item.section == 'table' &&
                                    item.headers &&
                                    item.headers.length &&
                                    !tableElementLoading
                                  "
                                  :data="item.data"
                                >
                                  <el-table-column
                                    type="index"
                                    width="30"
                                  ></el-table-column>
                                  <el-table-column
                                    v-for="(header, index) of item.headers"
                                    :key="index"
                                  >
                                    <template slot="header">{{
                                      header
                                    }}</template>
                                    <tefield-stats-blockmplate
                                      slot-scope="scope"
                                      >{{
                                        item.data[scope.$index][header]
                                      }}</tefield-stats-blockmplate
                                    >
                                  </el-table-column>
                                </el-table>
                              </div>
                            </el-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </el-col>
            </el-row>
          </div>
          <div
            class="document-corrected-container"
            v-if="is_corrected_document"
          >
            <img
              src="@/assets/img/icons/document_corrected.svg"
              style="width: 100px; margin-top: 200px"
            />
            <p class="corrected-heading">
              Document Correction is in progress - Can't Sign!
            </p>
            <p class="corrected-content" v-if="isSenderOrnot">
              Kindly note that the document needs to be resent so your
              recipients can sign in to the updated version.
            </p>
            <p class="corrected-content" v-else>
              The document you’re trying to access is under progress, due to the
              corrections going on behind by the sender. You'll receive an email
              notifying when it is ready. Please come back later!
            </p>
            <el-link
              v-if="isSenderOrnot"
              type="primary"
              @click="resendCorrectedDoc"
              >Resend the document</el-link
            >
            <div
              v-if="is_workflow_document"
              style="text-align: center"
              class="m-1"
            >
              <p>This is an workflow document. Try to fill other documents:</p>
              <el-select
                v-model="currentActiveWorkflow"
                placeholder="Documents"
                size="mini"
                @change="changeWorkflowDocument"
              >
                <el-option
                  v-for="(el, i) in selectedWorkflowData.documents"
                  :key="i"
                  :label="el.document_id.title"
                  :value="el.document_id._id"
                  :disabled="checkIsAllow(el.document_id.document_users)"
                >
                  <span style="float: left; font-size: 13px">{{ i + 1 }}</span>
                  <span style="float: left; font-size: 13px" class="ml-1">{{
                    el.document_id.title | truncate(15, "...")
                  }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                    class="ml-1"
                    >{{ el.document_id.document_status.toLowerCase() }}</span
                  >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div
          :class="
            getIsMobile
              ? 'is-mobile activity-block right-side-bar'
              : 'activity-block right-side-bar'
          "
          v-if="
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            getSingleDocumentData.data.document_status != 'DRAFT'
          "
        >
          <el-tabs
            type="border-card"
            shadow="never"
            :class="
              getIsMobile ? 'form-fields-set is-mobile' : 'form-fields-set'
            "
            v-model="activeTabName"
          >
            <el-tab-pane name="workflow" v-if="checkWorkflowDocument">
              <span slot="label">
                <i class="el-icon-document-copy"></i> Workflow
              </span>
              <DocumentWorkflowStatus
                :data="selectedWorkflowData"
                :currentAuthUserEmail="currentAuthUserEmail"
                :workflow_data_id="workflow_data_id"
              />
            </el-tab-pane>
            <el-tab-pane name="info">
              <span slot="label"> <i class="el-icon-info"></i> Info </span>
              <DocumentInfo
                :document="getSingleDocumentData.data"
                :update_document_data="fetchEmployeDocumentData"
                :is_current_user="checkIsCurrentUser"
                :is_document_completed="checkIsDocumentCompleted"
              />
            </el-tab-pane>
            <el-tab-pane name="chat">
              <span slot="label"> <i class="el-icon-s-claim"></i> Chat </span>
              <DocumentNotes :current_user="getCurrentAuthUser" />
            </el-tab-pane>
            <el-tab-pane name="logs">
              <span slot="label"> <i class="el-icon-date"></i> Logs </span>
              <DocumentLogs
                :document="getSingleDocumentData.data"
                :logs="documentLogs"
              />
            </el-tab-pane>
          </el-tabs>
        </div>

        <div
          v-if="getIsMobile && isOtherOptionsRSOpened"
          class="other-options-right-sidebar"
          v-click-outside="hideOtherOptionsRS"
        >
          <div v-if="checkWorkflowDocument && !is_corrected_document" style="display: flex">
            <el-progress
              type="circle"
              :percentage="getWorkflowCompletionPercentage"
              :width="45"
              :stroke-width="1.5"
              :format="getFormat"
              style="margin-top: 5px"
            ></el-progress>
            <el-select
              v-model="currentActiveWorkflow"
              placeholder="Select"
              size="mini"
              style="margin-top: 15px"
              @change="changeWorkflowDocument"
            >
              <el-option
                v-for="(el, i) in selectedWorkflowData.documents"
                :key="i"
                :label="el.document_id.title"
                :value="el.document_id._id"
                :disabled="checkIsAllow(el.document_id.document_users)"
              >
                <span style="float: left; font-size: 13px">{{ i + 1 }}</span>
                <span style="float: left; font-size: 13px" class="ml-1">{{
                  el.document_id.title | truncate(12, "...")
                }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px"
                  class="ml-1"
                  >{{ el.document_id.document_status.toLowerCase() }}</span
                >
              </el-option>
            </el-select>
          </div>
          <hr />
          <div class="section-title">Recipients</div>
          <el-button
            @click="viewDocumentRecipient = true"
            class="manage-recipients"
            plain
            :disabled="disableOnVoid || disableDecline"
            style="border: none"
          >
            <el-tag
              class="user-tag"
              v-for="(user, index) in documentUsers"
              :key="index"
              :type="tagType[Math.floor(index % tagType.length)]"
              >{{ user | getUserNameAvatar }}</el-tag
            >
          </el-button>
          <hr />
          <div class="section-title">Options</div>
          <div class="section-body">
            <a
              v-if="
                getCurrentUserIsFilled != true &&
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                !finish_drawer() &&
                !is_current_user_is_cc &&
                isInDocumentUsers
              "
              @click="finishLater()"
            >
              <div :disabled="checkWorkflowDocument && !is_workflow_document">
                <i class="el-icon-time"></i>Finish Later
              </div></a
            >
            <!--<div divided
              ><i class="el-icon-view"></i>Preview</div
            >-->
            <a
              @click="printandsign = true"
              v-if="
                getCurrentUserIsFilled != true &&
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                !is_current_user_is_cc &&
                isInDocumentUsers
              "
            >
              <el-tooltip
                content="Sign manually using 'Print & Sign'"
                placement="left-start"
              >
                <div :disabled="checkWorkflowDocument && !is_workflow_document">
                  <i class="el-icon-printer"></i>
                  Print & Sign
                </div>
              </el-tooltip>
            </a>
            <a @click="getAllDocLogs">
              <div><i class="el-icon-refresh-right"></i> History</div>
            </a>
            <a
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                getSingleDocumentData.data.created_by._id === authid
              "
              @click="docSettingsVisible = true"
              ><div :disabled="checkWorkflowDocument && !is_workflow_document">
                <i class="el-icon-setting"></i>Settings
              </div>
            </a>
            <a
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'correctDocument'
                ) &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'DRAFT' &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                isfilledOrNot
              "
              @click="alertCorrectedDoc()"
              ><div>
                <i class="el-icon-document-checked"></i>Correct the document
              </div>
            </a>
            <a
              @click="saveAsTemplate()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'saveTemplate'
                ) &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status != 'ARCHIVED'
              "
            >
              <div><i class="el-icon-folder-add"></i>Save as template</div>
            </a>
            <a
              @click="shareCompletedDocument()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'shareUsers'
                ) &&
                getSingleDocumentData.data.document_status &&
                getAuthenticatedUser &&
                getAuthenticatedUser.email &&
                getAuthenticatedUser.email == getSenderEmail &&
                getSingleDocumentData.data.document_status == 'COMPLETED'
              "
            >
              <div>
                <i class="el-icon-share"></i>
                Share with users
              </div>
            </a>
            <a
              @click="alertvoided()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'voidDocument'
                ) &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED'
              "
            >
              <div><i class="el-icon-remove-outline"></i>Void Document</div>
            </a>
            <a
              @click="alertEditVoidDoc()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'cloneDocument'
                ) &&
                getSingleDocumentData.data.document_status &&
                (getSingleDocumentData.data.document_status == 'VOIDED' ||
                  getSingleDocumentData.data.document_status == 'COMPLETED')
              "
            >
              <div><i class="el-icon-document-copy"></i> Clone</div>
            </a>
            <a
              @click="archiveDocument()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'deleteDocument'
                ) &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status != 'ARCHIVED'
              "
            >
              <div>
                <i class="el-icon-delete"></i>
                Delete
              </div>
            </a>
            <a
              @click="alertUndoDoc()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.created_by._id === authid &&
                getSingleDocumentData.data.document_status === 'ARCHIVED'
              "
            >
              <div><i class="el-icon-refresh-left"></i>Undo Delete</div>
            </a>
            <a
              @click="permanentDocument()"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                checkPermissionForDocument(
                  getSingleDocumentData.data,
                  'deleteDocument'
                ) &&
                getSingleDocumentData.data.document_status &&
                getSingleDocumentData.data.document_status === 'ARCHIVED'
              "
            >
              <div><i class="el-icon-delete-solid"></i>Permanent Delete</div>
            </a>
            <div
              disabled
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED'
              "
            >
              <i class="el-icon-timer"></i>Expires on
              {{ expiraydate | globalDateFormat }}
            </div>
            <a
              round
              plain
              @click="declineDialogVisible = true"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                isDeclineOrNot &&
                !checkRejectAccess &&
                !getCurrentUserIsFilled
              "
              ><div
                style="color: red"
                :disabled="checkWorkflowDocument && !is_workflow_document"
              >
                <i class="el-icon-remove-outline"></i>Decline the document
              </div></a
            >
            <a
              round
              plain
              @click="rejectUserDocumentModal = true"
              v-if="
                getSingleDocumentData &&
                getSingleDocumentData.data &&
                getSingleDocumentData.data.document_status != 'COMPLETED' &&
                getSingleDocumentData.data.document_status != 'VOIDED' &&
                getSingleDocumentData.data.document_status != 'EXPIRED' &&
                getSingleDocumentData.data.document_status != 'ARCHIVED' &&
                getSingleDocumentData.data.document_status != 'DECLINED' &&
                checkRejectAccess &&
                !getCurrentUserIsFilled
              "
            >
              <div
                style="color: red"
                :disabled="checkWorkflowDocument && !is_workflow_document"
              >
                <i class="el-icon-remove-outline"></i>Decline the document
              </div>
            </a>
            
                 <el-button
              v-if="
                (getSingleDocumentData &&
                  getSingleDocumentData.data &&
                  checkPermissionForDocument(
                    getSingleDocumentData.data,
                    'downloadDocument'
                  ) &&
                  getSingleDocumentData.data.document_status == 'COMPLETED') ||
                (getSingleDocumentData &&
                  getSingleDocumentData.data &&
                  getSingleDocumentData.data.document_status &&
                  getSingleDocumentData.data.document_status == 'COMPLETED' &&
                  getSingleDocumentData.data.document_status == 'COMPLETED' &&
                  isInDocumentUsers)
                  
              "
            >
                <a
                  @click="downloadAlldocuments"
                >
                  <i class="el-icon-download">Download</i>
                </a>
              </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="captureSignatureDialog"
      title="Authorize Signature"
      class="outersize-confirm-type-three authorize-signature-popup"
      width="100%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ESignature
        v-if="captureSignatureDialog"
        :workflowName="workflowName"
        :templateName="documentName"
        :purpose="'COMPANY_DOCUMENT'"
        :isSecureSign="secureEsign"
        v-on:onVerfiedSignature="updateDocumentSignature"
        v-on:cancelESign="captureSignatureDialog = false"
      ></ESignature>
    </el-dialog>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="captureInitialDialog"
      title="Initial"
      class="dialog-initial"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-if="captureInitialDialog">
        <Initial ref="myInitialPad"></Initial>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveInitial()">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showSavedSignatureData" title="eSignature">
      <div v-loading="esignLoading">
        <el-row>
          <el-col :span="18">
            <table v-if="esignData">
              <tr>
                <td>Signed On</td>
                <td>
                  :: {{ esignData.signed_at | moment("MM-DD-YYYY HH:mm:ss") }}
                </td>
              </tr>
            </table>

            <p>Signature</p>
            <img :src="esignData.signature" height="100" />
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="viewDocumentRecipient"
      class="outersize-confirm-type-three"
      title="Document Users"
      width="100%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-loading="esignLoading">
        <el-table :data="documentUsers" style="width: 100%" border>
          <el-table-column
            prop="first_name"
            label="First Name"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="last_name"
            label="Last Name"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="Role"
            width="130"
          ></el-table-column>
          <el-table-column prop="company_name" label="Other" width="125">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="resendDocLink(scope.row)"
                v-if="
                  scope.row.sent_status &&
                  !scope.row.document_filling_status &&
                  isUserIsDocumentOwner &&
                  scope.row.type != 'SENDER' &&
                  scope.row.user_type != 'CC' &&
                  isAccessDocument
                "
              >
                Resend</el-button
              >
              <el-dropdown
                v-if="
                  scope.row.type != 'SENDER' &&
                  isAccessDocument &&
                  isUserIsDocumentOwner &&
                  scope.row.sent_status
                "
              >
                <img
                  src="@/assets/img/icons/more-icon.svg"
                  alt="icon"
                  class="el-dropdown-link"
                />
                <el-dropdown-menu slot="dropdown">
                  <a
                    v-if="
                      isUserIsDocumentOwner &&
                      scope.row.sent_status &&
                      isAccessDocument &&
                      scope.row.type != 'SENDER'
                    "
                    @click="copyLinkToShare(scope.row)"
                    ><el-dropdown-item icon="el-icon-document-copy">
                      Copy Link
                    </el-dropdown-item></a
                  >
                  <a
                    v-if="
                      isUserIsDocumentOwner &&
                      isAccessDocument &&
                      scope.row.type != 'SENDER' &&
                      !scope.row.document_filling_status
                    "
                    @click="changeDocumentUser(scope.row)"
                    ><el-dropdown-item icon="el-icon-refresh"
                      >Change User</el-dropdown-item
                    ></a
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="changeRecipientUserModal"
      title="Change User"
      :width="getIsMobile ? '100%' : '25%'"
      :before-close="resetChangeDocumentuser"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-loading="changeContactLoading">
        <span>First Name: </span>
        <el-input
          placeholder="Enter first name"
          class="mb-1"
          v-model="selectedRecipientuser.first_name"
          ref="changeFirstName"
        >
        </el-input>
        <span style="color: red" v-if="changeRecipientUserErrors.first_name">{{
          changeRecipientUserErrors.first_name
        }}</span>
        <br />
        <span class="">Last Name: </span>
        <el-input
          placeholder="Enter last name"
          class="mb-1"
          v-model="selectedRecipientuser.last_name"
        >
        </el-input>
        <span style="color: red" v-if="changeRecipientUserErrors.last_name">{{
          changeRecipientUserErrors.last_name
        }}</span
        ><br />
        <span class="">Email: </span><br />
        <el-select
          autocomplete="on"
          placeholder="Enter email"
          v-model="selectedRecipientuser.email"
          suffix-icon="el-icon-search"
          clearable
          filterable
          allow-create
          style="width: 100%"
          @change="fillContactDetails"
          @blur="onEmailLostFocus"
          :filter-method="handleEmailFilter"
        >
          <el-option
            v-for="(el, key) in availableContacts"
            :key="key"
            :value="el.email"
            :label="el.email"
          ></el-option>
        </el-select>
        <span style="color: red" v-if="changeRecipientUserErrors.email">{{
          changeRecipientUserErrors.email
        }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetChangeDocumentuser">Cancel</el-button>
        <el-button
          @click="chechAndUpdateUser"
          :loading="changeContactLoading"
          type="primary"
          :disabled="
            !selectedRecipientuser.email ||
            !selectedRecipientuser.first_name ||
            !selectedRecipientuser.last_name
          "
          >Update</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="nextDocumentAlertModal"
      :title="`Document ${documentCompletedStatus}`"
      :width="getIsMobile ? '100%' : '40%'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="text-align: center; font-weight: bold">
        <p>
          You have successfully {{ documentCompletedStatus }}
          {{ documentName }} document.
        </p>
        <p>{{ nextDocumentAlertText }}</p>
      </div>
    </el-dialog>
    <!-- Document Users modal -->
    <ConfigureDocumentUsers
      v-if="addDocumentRecipient"
      :documentUsers="documentUsers"
      :enforceSignatureOrder="enforceSignatureOrder"
      :allElements="elements"
      v-on:close="closeDocumentUserSettings"
    ></ConfigureDocumentUsers>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="rejectUserDocumentModal"
      title="Reason for Decline"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Reason for Decline"
        v-model="reason_for_reject"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="rejectDoc"
          type="primary"
          :disabled="!reason_for_reject.length"
          >Submit</el-button
        >
        <el-button @click="rejectUserDocumentModal = false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      :visible.sync="declineDialogVisible"
      title="Reason for Decline"
      class="reason-for-decline"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="Reason for Decline"
        v-model="declineDocumentNote"
        required
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="declineDoc"
          type="primary"
          :disabled="!declineDocumentNote.length"
          >Submit</el-button
        >
        <el-button @click="declineDialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :destroy-on-close="true"
      :visible.sync="requiredAlert"
      class="outersize-confirm-type-one"
      title="Alert"
    >
      <h3>Please fill {{ getCurrentUserRequiredFields }} fields</h3>
    </el-dialog>
    <el-dialog
      :visible.sync="correctedAlertPopup"
      title="Alert"
      class="outersize-confirm-type-one"
      :close-on-click-modal="false"
    >
      <h3>
        Document was corrected by sender. We will notify once sender resends it.
      </h3>
    </el-dialog>
    <div>
      <el-drawer
        title="eSigns"
        :with-header="false"
        :visible.sync="starting_drawer_visible"
        direction="ttb"
        :before-close="checkTermsAndConditions"
        class="signature-request-board-wrapper"
      >
        <!-- :style="getIsMobile ? 'height: 1200px' : 'height: 1100px;'" -->
        <div class="esigns_logo">
          <img
            style="width: 130px; margin-top: 15px; margin-left: 25px"
            src="@/assets/img/logo-white.svg"
          />
        </div>
        <div class="el-drawer__body ml-3 signature-request-board">
          <p
            style="color: #303133; font-weight: 400; font-size: 18px"
            class="fw-500"
          >
            Signature Request
          </p>
          <p
            style="
              font-weight: 300;
              font-size: 12px;
              line-height: 20px;
              color: #303133;
            "
          >
            by {{ getSenderName }}
          </p>
          <p
            style="
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 20px;
              color: #303133;
            "
          >
            Hello {{ getCurrentDocUser }}, <br />Please sign this document
            immediately
          </p>
          <el-divider class="mt-0"></el-divider>
          <el-checkbox
            v-model="terms_and_conditions"
            style="
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 18px;
              color: #4c4b4e;
            "
          >
            I accept eSigns
            <el-link
              type="primary"
              :underline="false"
              @click="displayTermsAndConditions"
            >
              Terms of Service</el-link
            >
            and
            <br v-if="getIsMobile" />
            <el-link
              type="primary"
              :underline="false"
              @click="displayPrivacyPolicy"
            >
              Privacy Policy
            </el-link></el-checkbox
          >
          <el-button
            type="danger"
            size="mini"
            style="border-radius: 2px"
            :disabled="!terms_and_conditions"
            @click="updateUserTermsAndConditions"
            :loading="acceptLoading"
            >Continue</el-button
          >
        </div>
      </el-drawer>
    </div>
    <el-dialog
      :visible.sync="terms_and_conditions_dialog"
      :width="getIsMobile ? '100%' : '50%'"
      :title="
        isTermsConditionsActive ? 'Terms and Conditions' : 'Privacy Policy'
      "
      class="terms-conditions-dilalog-main"
      :before-close="resetTermsAndPrivacy"
    >
      <div class="terms-conditions-dilalog">
        <div style="padding: 5px" v-if="isTermsConditionsActive">
          <termsAndConditionsTemplate />
        </div>
        <div style="padding: 5px" v-else>
          <privacyAndPolicyTemplate />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="visibleDocAttachments"
      title="Document attachments"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :lock-scroll="false"
    >
      <el-scrollbar wrap-style="">
        <div
          v-loading="visibleDocAttachmentsLoading"
          v-if="attachmentsFiles"
          class="file-attach-dilalog"
        >
          <el-table :data="attachmentsFiles()" style="width: 100%" border>
            <el-table-column
              fixed="left"
              prop="document_name"
              label="Name"
              min-width="100"
            ></el-table-column>
            <el-table-column prop="title" label="Title" width="130">
              <template slot-scope="scope">
                <p slot="reference">{{ scope.row.title }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              min-width="130"
            ></el-table-column>
            <el-table-column
              prop="document_number"
              label="Number"
              min-width="160"
            ></el-table-column>
            <el-table-column prop="valid_from" label="Valid From" width="100">
              <template slot-scope="scope">
                {{ scope.row.valid_from | globalDateFormat }}
              </template>
            </el-table-column>
            <el-table-column prop="expires_on" label="Expires On" width="100">
              <template slot-scope="scope">
                {{ scope.row.expires_on | globalDateFormat }}
              </template>
            </el-table-column>
            <el-table-column
              prop="attachment_url"
              label="Actions"
              width="100"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button size="mini" @click="downloadAttachment(scope.row)"
                  >Download</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-scrollbar>
    </el-dialog>
    <el-dialog
      :visible.sync="captureAttachment"
      title="Attach your files"
      class="attachment-dialog-main"
      :width="getIsMobile ? '100%' : '50%'"
      :before-close="resetAttachments"
    >
      <div
        v-if="this.allAttachments && this.allAttachments.length"
        class="mb-1"
      >
        Uploaded files
        <div
          v-for="(file, index) in this.allAttachments"
          :key="index"
          class="file-names"
        >
          <i class="el-icon-check mt-1 ml-1 mr-1" style="color: green"></i>
          <img src="@/assets/img/icons/pdf.svg" alt="icon" width="20px" />
          <div class="ml-1 mt-1">
            <p>{{ file.title | truncate(10, "...") }}</p>
            <p v-if="file.document_number" class="attachment-number">
              {{ file.document_number | truncate(10, "...") }}
            </p>
          </div>
          <p class="valid-from" v-if="file.valid_from && !getIsMobile">
            Valid From:
          </p>
          <p v-if="file.valid_from && !getIsMobile" class="valid-date">
            {{ file.valid_from | globalDateFormat }}
          </p>
          <p v-if="file.expires_on && !getIsMobile" class="valid-date">
            {{ file.expires_on | globalDateFormat }}
          </p>
          <a
            class="attachment-remove mt-1 ml-3"
            @click="removeAttachment(index)"
          >
            <i class="el-icon-circle-close"></i>
          </a>
        </div>
      </div>
      <div
        v-if="this.sampleAttachments && this.sampleAttachments.length"
        class="mb-1"
      >
        Sender uploaded sample files
        <div
          v-for="(file, index) in this.sampleAttachments"
          :key="index"
          class="file-names"
        >
          <i class="el-icon-check mt-1 ml-1 mr-1" style="color: green"></i>
          <img src="@/assets/img/icons/pdf.svg" alt="icon" width="20px" />
          <div class="ml-1 mt-1" :v-loading="previewAttachmentsLoad">
            <p
              style="cursor: pointer"
              @click="openSampleAttachments(file.attachment_url, file.title)"
            >
              {{ file.title | truncate(10, "...") }}
            </p>
            <p v-if="file.document_number" class="attachment-number">
              {{ file.document_number | truncate(10, "...") }}
            </p>
          </div>
          <p class="valid-from" v-if="file.valid_from && !getIsMobile">
            Valid From:
          </p>
          <p v-if="file.valid_from && !getIsMobile" class="valid-date">
            {{ file.valid_from | globalDateFormat }}
          </p>
          <p class="valid-from" v-if="file.expires_on && !getIsMobile">
            Expires On:
          </p>
          <p v-if="file.expires_on && !getIsMobile" class="valid-date">
            {{ file.expires_on | globalDateFormat }}
          </p>
        </div>
      </div>
      <div v-loading="attachmentLoading">
        <el-row class="mb-1" :gutter="24">
          <el-col :span="12">
            <div>
              <span>Document Name</span><br />
              <el-select
                placeholder="Enter Name"
                :clearable="true"
                :filterable="true"
                :allow-create="true"
                :default-first-option="true"
                v-model="selectedAttachmentFile.document_name"
                style="width: 100%"
                class="mt-1"
              >
                <el-option
                  v-for="(name, index) in selectedSignatureItem.file_names"
                  :key="index"
                  :value="name"
                  >{{ name }}</el-option
                >
              </el-select>
              <span
                class="error mt-1"
                style="color: red"
                v-if="attachmentErrors"
                >{{ attachmentErrors }}</span
              >
            </div>
          </el-col>
          <el-col :span="12">
            <span>{{
              getIsMobile ? "Document ID" : "Document ID/Number (Optional)"
            }}</span>
            <el-input
              placeholder="Enter Number"
              v-model="selectedAttachmentFile.document_number"
              style="width: 100%"
              class="mt-1"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :span="24">
            <div>
              <span>Description</span>
              <el-input
                placeholder="Enter description"
                v-model="selectedAttachmentFile.description"
                style="width: 100%"
                class="mt-1"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="mb-1" :gutter="24">
          <el-col :span="12">
            <div>
              <span>Valid from (Optional)</span>
              <el-date-picker
                v-model="selectedAttachmentFile.valid_from"
                type="date"
                v-bind:clearable="true"
                v-bind:editable="false"
                v-bind:picker-options="setMaxDate"
                placeholder="Select Date"
                style="width: 100%"
                class="mt-1"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <span>Expires On (Optional)</span>
              <el-date-picker
                type="date"
                v-bind:clearable="true"
                v-bind:editable="false"
                v-bind:picker-options="setMinDate"
                placeholder="Select Date"
                v-model="selectedAttachmentFile.expires_on"
                style="width: 100%"
                class="mt-1"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row class="mb-1">
          <el-col :span="24">
            <el-upload
              class="avatar-uploader"
              action
              :on-change="uploadFile"
              :show-file-list="false"
              :auto-upload="false"
              multiple
            >
              <div class="upload-attchment-box">
                <img
                  src="@/assets/img/fields/attachment-filling.svg"
                  alt="Upload File"
                  height="20"
                />
                <h4 class="ml-1">Upload a file</h4>
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <div class="bottom-buttons-wrapper">
          <div class="bottom-cancel-button">
            <el-button
              class="attach-save-cancel"
              @click="resetAttachments"
              style="border-radius: 4px"
              >Cancel</el-button
            >
          </div>
          <div class="bottom-save-button">
            <el-button
              style="border-radius: 4px"
              class="attach-save-btn"
              @click="addAttachments"
              :disabled="this.allAttachments && this.allAttachments.length == 0"
              >Save</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="previewAttachments"
      :title="previewAttachmentTitle + ' - preview'"
    >
      <!-- <el-scrollbar wrap-style="max-height: 600px"> -->
      <div style="text-align: center" v-loading="previewAttachmentLoading">
        <div id="attachments">
          <!-- <object width="100%" height="100%" :data="previewAttachmentUrl">Image not found.</object> -->
        </div>
      </div>
      <!-- </el-scrollbar> -->
    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      :visible.sync="printandsign"
      title="Print & Sign"
      v-loading="printloading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :width="getIsMobile ? '100%' : '32%'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="resetPrintAndSign"
    >
      <div>
        <el-steps
          :active="activeStep"
          finish-status="success"
          align-center
          class="print-sign"
        >
          <el-step title="Download Document"> </el-step>
          <el-step title="Return Document"></el-step>
        </el-steps>
        <el-divider style="margin-top: -20px"></el-divider>
        <div v-if="activeStep == 0">
          <span
            >Please download the document. Then print,sign and scan the
            document.Return the document to eSigns when you're done.
          </span>
          <el-button
            class="float-right mt-1"
            @click="DownloadDocFOrPrintAndSign"
            style="border-color: #33bdff; color: #33bdff"
            >Download Document</el-button
          >
        </div>
        <div v-if="activeStep == 1" style="text-align: center">
          <el-upload
            class="upload-file-el-upload"
            drag
            name="logo"
            :on-change="checkToUploadDocument"
            action
            :show-file-list="false"
            :auto-upload="false"
            accept=".doc, .pdf, .docx, .txt, .png, .jpg, .jpeg"
            multiple
          >
            <div class="upload-file">
              <div class="mt-2">
                <img
                  src="@/assets/img/icons/upload-file.svg"
                  alt="Upload File"
                  height="20"
                />
              </div>
              <p>Drag &amp; Drop Signed Documents Here</p>
              <el-button
                size="mini"
                style="
                  background-color: transparent;
                  border-color: #f754a2;
                  color: #f754a2;
                  border-radius: 0;
                "
                >Upload a File</el-button
              >
            </div>
          </el-upload>
        </div>
        <el-row type="flex" justify="center" class="name-types" v-model="files">
          <el-col :span="22">
            <div v-if="this.files.length">
              <transition-group tag="div" name="flip-list" id="field-group">
                <div
                  class="filename d-flex"
                  v-for="(file, index) in files"
                  :key="JSON.stringify(file)"
                >
                  <a class="el-upload-list__item-name">
                    <img
                      :src="require('@/assets/img/icons/upload-active.svg')"
                      alt="icon"
                      class="img-active"
                    />
                    <img
                      v-if="
                        file.raw.type == 'image/jpeg' ||
                        file.raw.type == 'image/jpg'
                      "
                      :src="require('@/assets/img/icons/JPG.svg')"
                      alt="icon"
                      style="width: 15px"
                    />
                    <img
                      v-else-if="file.raw.type == 'image/png'"
                      :src="require('@/assets/img/icons/PNG.svg')"
                      alt="icon"
                      style="width: 15px"
                    />

                    <img
                      v-else
                      :src="require('@/assets/img/icons/pdf.svg')"
                      alt="icon"
                      style="width: 15px"
                    />
                    {{ file.raw.name }}
                  </a>
                  <div class="direction-buttons">
                    <a @click="deleteItem(index)">
                      <i class="el-icon-circle-close"></i>
                    </a>
                  </div>
                </div>
              </transition-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" v-if="activeStep == 0">
        <el-divider></el-divider>
        <el-button @click="resetPrintAndSign">Cancel</el-button>
        <el-button
          type="danger"
          v-if="!this.is_completed"
          @click="activeStep = 1"
          >Continue</el-button
        >
      </span>
      <span slot="footer" v-if="activeStep == 1">
        <el-divider style="margin-bottom: -30px"></el-divider>
        <el-button v-if="this.files.length" @click="resetPrintAndSign"
          >Cancel</el-button
        >
        <el-button v-if="!this.files.length" @click="activeStep = 0"
          >Back</el-button
        >
        <el-button
          type="danger"
          @click="PrintAndSignDoc"
          :loading="printloading"
          >Finish</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Document History"
      :destroy-on-close="true"
      :visible.sync="viewDetailedHistoryModal"
      :width="getIsMobile ? '100%' : '55%'"
    >
      <el-scrollbar wrap-style="max-height: 600px;padding:13px;">
        <div style="height: 430px">
          <vue-html2pdf
            :show-layout="true"
            :float-layout="false"
            :enable-download="true"
            :preview-modal="false"
            filename="hee hee"
            :pagebreak="{
              mode: 'css',
            }"
            :pdf-quality="10"
            :manual-pagination="true"
            pdf-format="a4"
            pdf-orientation="portrait"
            :html-to-pdf-options="{
              html2canvas: { useCORS: true },
            }"
            ref="html2Pdf"
          >
            <section slot="pdf-content">
              <section id="details-report">
                <div style="padding: 10px">
                  <h3 class="float-left fw-bold fs-22">Document Details</h3>
                  <div class="d-flex">
                    <el-row :gutter="10">
                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Document Name</span>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data
                          "
                        >
                          {{
                            this.getSingleDocumentData.data
                              .configurable_document_data.name
                          }}
                        </p>
                      </el-col>
                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Document Recipients</span>
                        <div class="d-flex">
                          <p
                            v-if="
                              this.getSingleDocumentData &&
                              this.getSingleDocumentData.data &&
                              this.getSingleDocumentData.data.document_users &&
                              this.getSingleDocumentData.data.document_users
                                .length > 1
                            "
                          >
                            {{ getDocumentsusers() }}
                          </p>
                          <p v-else>Only me</p>
                        </div>
                      </el-col>
                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Date Created</span>
                        <p
                          style="font-size: 12px"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.created_at
                          "
                        >
                          {{
                            this.getSingleDocumentData.data.created_at
                              | globalDateTimeFormat
                          }}
                        </p>
                      </el-col>
                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Document ID</span>
                        <p
                          class="table mb-1"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'COMPLETED'
                          "
                        >
                          {{ documentIdforHistory }}
                        </p>
                        <p v-else>-- --</p>
                      </el-col>
                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Sender</span>
                        <div
                          v-for="(user, index) in documentUsers"
                          :key="index"
                        >
                          <p
                            class="table mb-1"
                            v-if="user && user.type == 'SENDER'"
                          >
                            {{ user.first_name + " " + user.last_name }}
                          </p>
                        </div>
                      </el-col>

                      <el-col
                        :xl="{ span: 12 }"
                        :lg="{ span: 12 }"
                        :md="{ span: 12 }"
                        :sm="{ span: 12 }"
                        :xs="{ span: 12 }"
                      >
                        <span class="details">Document Status</span>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'SENT'
                          "
                        >
                          Sent
                        </p>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'DECLINED'
                          "
                        >
                          Declined
                        </p>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'ARCHIVED'
                          "
                        >
                          Archived
                        </p>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'COMPLETED'
                          "
                        >
                          Completed
                        </p>
                        <p
                          class="table"
                          v-if="
                            this.getSingleDocumentData &&
                            this.getSingleDocumentData.data &&
                            this.getSingleDocumentData.data.document_status ==
                              'VOIDED'
                          "
                        >
                          Voided
                        </p>
                      </el-col>
                      <el-col
                        :xl="{ span: 24 }"
                        :lg="{ span: 24 }"
                        :md="{ span: 24 }"
                        :sm="{ span: 24 }"
                        :xs="{ span: 24 }"
                      >
                        <span class="details">
                          Date Format
                          <p
                            style="
                              font-family: inter;
                              font-size: 12px;
                              font-weight: normal;
                            "
                          >
                            {{ dateFormat }}
                          </p>
                        </span>
                      </el-col>
                    </el-row>
                  </div>
                  <el-divider></el-divider>
                  <h3>Activities</h3>
                </div>
                <el-table
                  style="width: 100%"
                  border
                  :data="documentLogs"
                  stripe
                >
                  <el-table-column label="Document User Name" min-width="110">
                    <template
                      slot-scope="scope"
                      v-if="scope.row.user_id || scope.row.contact_id"
                    >
                      <p v-if="scope.row.user_id" class="table">
                        {{
                          scope.row.user_id.first_name +
                          " " +
                          scope.row.user_id.last_name
                        }}
                      </p>
                      <p v-if="scope.row.contact_id" class="table">
                        {{
                          scope.row.contact_id.first_name +
                          " " +
                          scope.row.contact_id.last_name
                        }}
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="Status" min-width="95">
                    <template
                      slot-scope="scope"
                      v-if="scope.row.user_id || scope.row.contact_id"
                    >
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_VIEWED'"
                      >
                        Viewed
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_SETTINGS_CHANGED'"
                      >
                        Settings Changed
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_SIGNED'"
                      >
                        Signed
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_SENT'"
                      >
                        Sent
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_DECLINED'"
                      >
                        Declined
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'ACCEPTED_TERMS_&_CONDITIONS'"
                      >
                        Accepted <br />Terms & Conditions
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_VOIDED'"
                      >
                        Voided
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_CORRECTED'"
                      >
                        Corrected
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'DOCUMENT_APPROVED'"
                      >
                        Approved
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'Document Deleted'"
                      >
                        Deleted
                      </p>
                      <p
                        class="table"
                        v-if="scope.row.status == 'Undo Deleted Document'"
                      >
                        Undo Document
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="Document Activity" min-width="200">
                    <template slot-scope="scope">
                      <p v-if="scope.row.user_id" class="table">
                        {{ scope.row.description }}
                      </p>
                      <p v-else class="table">{{ scope.row.description }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="Date & Time" min-width="100">
                    <template
                      slot-scope="scope"
                      v-if="scope.row.user_id || scope.row.contact_id"
                    >
                      <p class="table">
                        {{ scope.row.created_at | globalDateTimeFormat }}
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </section>
          </vue-html2pdf>
        </div>
      </el-scrollbar>
      <div v-if="checkDocumentStatus" style="display: none">
        <vue-html2pdf
          :show-layout="true"
          :float-layout="false"
          :enable-download="true"
          :preview-modal="false"
          filename="hee hee"
          :pagebreak="{
            mode: 'css',
          }"
          :pdf-quality="10"
          :manual-pagination="true"
          pdf-format="a4"
          pdf-orientation="portrait"
          :html-to-pdf-options="{
            html2canvas: { useCORS: true },
          }"
          ref="doc2Cer"
        >
          <section slot="pdf-content">
            <section id="certificate-report">
              <div style="padding: 10px">
                <img
                  src="@/assets/img/eSigns Logo Black.svg"
                  alt="Nimble logo"
                />
                <div style="background: #f2f6fc; padding: 5px">
                  <p style="font-size: 16px" class="fw-bold fs-22">
                    Document Details
                  </p>
                </div>
                <div class="mt-1">
                  <el-row>
                    <el-col :span="12"
                      ><div class="d-flex">
                        ID:
                        <p class="fw-bold ml-1">{{ documentIdforHistory }}</p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Signatures:
                        <p class="fw-bold ml-1">{{ getSignaturesCount }}</p>
                      </div></el-col
                    >
                  </el-row>
                  <el-row class="mt-1">
                    <el-col :span="12"
                      ><div class="d-flex">
                        Subject:
                        <p class="fw-bold ml-1">{{ getDocumentSubject }}</p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Initials:
                        <p class="fw-bold ml-1">{{ getInitialsCount }}</p>
                      </div></el-col
                    >
                  </el-row>
                  <el-row class="mt-1">
                    <el-col :span="12"
                      ><div class="d-flex">
                        Document Pages:
                        <p class="fw-bold ml-1">{{ pdfPages }}</p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Status:
                        <p class="fw-bold ml-1">COMPLETED</p>
                      </div></el-col
                    >
                  </el-row>
                  <el-row class="mt-1">
                    <el-col :span="12"
                      ><div class="d-flex">
                        Certificate pages:
                        <p class="fw-bold ml-1">1</p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Sender:
                        <p class="fw-bold ml-1">{{ getSenderEmail }}</p>
                      </div></el-col
                    >
                  </el-row>
                  <el-row class="mt-1">
                    <el-col :span="12"
                      ><div class="d-flex">
                        Document Created <br />
                        Time Zone:
                        <p class="fw-bold ml-1 mt-1">
                          {{ getDocumentCreatedZone }}
                        </p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Ip address:
                        <p class="fw-bold">{{ getSenderIpAddress }}</p>
                      </div></el-col
                    >
                  </el-row>
                  <div style="background: #f2f6fc; padding: 5px" class="mt-1">
                    <p style="font-size: 16px" class="fw-bold fs-22">
                      Document Tracking
                    </p>
                  </div>
                  <el-row class="mt-1">
                    <el-col :span="12"
                      ><div class="d-flex">
                        Document Created:
                        <p class="fw-bold" v-if="getDocumentCreatedAt">
                          {{ getDocumentCreatedAt | globalDateTimeFormat }}
                        </p>
                        <p v-else>-</p>
                      </div></el-col
                    >
                    <el-col :span="12"
                      ><div class="d-flex">
                        Document Completed:
                        <p class="fw-bold" v-if="getDocumentCompletedAt">
                          {{ getDocumentCompletedAt | globalDateTimeFormat }}
                        </p>
                        <p v-else>-</p>
                      </div></el-col
                    >
                  </el-row>
                  <el-row
                    style="background: #f2f6fc; padding: 5px"
                    class="mt-1"
                  >
                    <el-col :span="8">
                      <p style="font-size: 16px" class="fw-bold fs-22">
                        Signer Details
                      </p>
                    </el-col>
                    <el-col :span="8">
                      <p style="font-size: 16px" class="fw-bold fs-22">
                        Signature
                      </p>
                    </el-col>
                    <el-col :span="8">
                      <p style="font-size: 16px" class="fw-bold fs-22">
                        Timeframe
                      </p>
                    </el-col>
                  </el-row>
                  <el-row
                    v-for="(el, i) in getUsersForCertificate"
                    :key="i"
                    style="border-bottom: 1px solid #e1e1e1; padding: 10px"
                  >
                    <el-col :span="8" style="font-size: 12px">
                      <div class="d-flex">
                        Name:
                        <p class="fw-bold fs-22 ml-1">{{ el.name }}</p>
                      </div>
                      <div class="d-flex">
                        Email:
                        <p class="fw-bold fs-22 ml-1">{{ el.email }}</p>
                      </div>
                      <!-- <div>
                        User :
                        <p class="fw-bold fs-18 ml-1">{{ el.type }}</p>
                      </div> -->
                    </el-col>
                    <el-col :span="8" style="font-size: 12px">
                      <div v-if="el.signature_source && !el.print_complete">
                        <img :src="el.signature_source" style="width: 200px" />
                      </div>
                      <div v-if="el.print_complete" style="color: #409eff">
                        <h4>Uploaded paper with hand signature</h4>
                      </div>
                      <div class="d-flex">
                        Signature Adoption:
                        <p class="fw-bold fs-22">
                          {{
                            el.print_complete
                              ? "Signed on Paper"
                              : "Drawn on Device"
                          }}
                        </p>
                      </div>
                      <div class="d-flex">
                        Using IP Address:
                        <p class="fw-bold fs-22 ml-1">{{ el.user_ip }}</p>
                      </div>
                    </el-col>
                    <el-col :span="8" style="font-size: 12px">
                      <div class="d-flex">
                        Sent:
                        <p class="fw-bold fs-22" v-if="el.sent_time">
                          {{ el.sent_time | globalDateTimeFormat }}
                        </p>
                        <p class="fw-bold fs-22" v-if="!el.sent_time">
                          {{ el.completed_time | globalDateTimeFormat }}
                        </p>
                      </div>
                      <div class="d-flex" v-if="el.type && el.type != 'SENDER'">
                        Terms & Conditions:
                        <p class="fw-bold fs-22" v-if="el.accept_time">
                          {{ el.accept_time | globalDateTimeFormat }}
                        </p>
                      </div>
                      <div class="d-flex" v-if="el.type && el.type != 'SENDER'">
                        Viewed:
                        <p
                          class="fw-bold fs-22"
                          v-if="el.view_time && el.type && el.type != 'SENDER'"
                        >
                          {{ el.view_time | globalDateTimeFormat }}
                        </p>
                      </div>
                      <div class="d-flex">
                        Signed:
                        <p class="fw-bold fs-22" v-if="el.completed_time">
                          {{ el.completed_time | globalDateTimeFormat }}
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </section>
          </section>
        </vue-html2pdf>
      </div>
      <span slot="footer">
        <el-button v-if="checkDocumentStatus" @click="generateCertificate"
          >Download Certificate</el-button
        >
        <el-button
          type="primary"
          @click="generateReport"
          :loading="detailsDownload"
          >Download History</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Share template"
      :visible.sync="templateShareModal"
      :width="getIsMobile ? '100%' : '50%'"
      class="doc-modal"
      v-loading="modalLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :before-close="resetShareDocumentData"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <el-input
          type="text"
          v-model="searchedContact"
          :placeholder="
            activeName == 'contacts'
              ? 'Search by Email'
              : 'Search by Contact Type'
          "
          class="mb-1"
          @input="searchContact"
          clearable
        ></el-input>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Contacts" name="contacts">
            <p>
              You can share this document to any of your contact who is
              registered on eSigns.
            </p>
            <div
              v-if="
                contactUsers && contactUsers.length && !searchedContact.length
              "
            >
              <el-scrollbar wrap-style="max-height: 150px;">
                <div style="border-bottom: 1px solid #eaeaea; height: 45px">
                  <el-checkbox
                    :label="selectAllContacts ? 'Deselect All' : 'Select All'"
                    class="mt-1"
                    @change="selectAllEmails"
                    v-model="selectAllContacts"
                  ></el-checkbox>
                </div>
                <el-checkbox-group v-model="selectedUsers">
                  <div
                    v-for="(el, i) in contactUsers"
                    :key="i"
                    style="border-bottom: 1px solid #eaeaea; height: 45px"
                  >
                    <el-checkbox :label="el.email" class="mt-1"></el-checkbox>
                  </div>
                </el-checkbox-group>
              </el-scrollbar>
            </div>
            <div v-else-if="searchedContact.length">
              <el-scrollbar wrap-style="max-height: 150px;">
                <div style="border-bottom: 1px solid #eaeaea; height: 45px">
                  <el-checkbox
                    :label="selectAllContacts ? 'Deselect All' : 'Select All'"
                    class="mt-1"
                    @change="selectAllEmails"
                    v-model="selectAllContacts"
                  ></el-checkbox>
                </div>
                <el-checkbox-group
                  v-model="selectedUsers"
                  v-if="searchedContacts.length"
                >
                  <div
                    v-for="el in searchedContacts"
                    :key="el.email"
                    style="border-bottom: 1px solid #eaeaea; height: 45px"
                  >
                    <el-checkbox :label="el.email" class="mt-1"></el-checkbox>
                  </div>
                </el-checkbox-group>
                <p v-else>No result</p>
              </el-scrollbar>
            </div>
            <div v-else style="text-align: center; height: 100px">
              No contacts<br />
              <el-button
                class="mt-1"
                type="primary"
                size="mini"
                @click="goToAddContacts"
                >Add Contacts</el-button
              >
            </div>
          </el-tab-pane>
          <el-tab-pane label="Contact types" name="contact_types">
            <div
              v-if="
                contactTypes && contactTypes.length && !searchedContact.length
              "
              style="overflow: scroll"
            >
              <div style="border-bottom: 1px solid #eaeaea; height: 45px">
                <el-checkbox
                  :label="selectAllContactTypes ? 'Deselect All' : 'Select All'"
                  class="mt-1"
                  @change="selectAllContactsTypes"
                  v-model="selectAllContactTypes"
                ></el-checkbox>
              </div>
              <el-checkbox-group
                v-model="selectedContactTypes"
                @change="selectContactTypeContacts"
              >
                <div
                  v-for="(el, i) in contactTypes"
                  :key="i"
                  style="border-bottom: 1px solid #eaeaea; height: 45px"
                >
                  <el-checkbox :label="el.name" class="mt-1"></el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div v-if="searchedContact.length">
              <div style="border-bottom: 1px solid #eaeaea; height: 45px">
                <el-checkbox
                  :label="selectAllContactTypes ? 'Deselect All' : 'Select All'"
                  class="mt-1"
                  @change="selectAllContactsTypes"
                  v-model="selectAllContactTypes"
                ></el-checkbox>
              </div>
              <el-scrollbar wrap-style="max-height: 150px;">
                <el-checkbox-group
                  v-model="selectedContactTypes"
                  v-if="searchedContactTypes.length"
                >
                  <div
                    v-for="(el, i) in searchedContactTypes"
                    :key="i"
                    style="border-bottom: 1px solid #eaeaea; height: 45px"
                  >
                    <el-checkbox :label="el.name" class="mt-1"></el-checkbox>
                  </div>
                </el-checkbox-group>
                <p v-else>No result</p>
              </el-scrollbar>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetShareDocumentData">Cancel</el-button>
        <el-button type="primary" @click="shareTemplateToContacts"
          >Share</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Send To Mail"
      :visible.sync="isSendToMail"
      width="38%"
      style="margin-top: 5%"
      center
    >
      <el-form ref="form" :model="form" clas="py-3 px-4">
        <el-row>
          <el-col :span="24" :lg="{ span: 24 }" :xs="{ span: 24 }">
            <el-form-item class="mb-05" label="Email" prop="email">
              <!-- v-model="user.email" -->
              <el-select
                autocomplete="on"
                class="w-100"
                placeholder="Search with Email"
                suffix-icon="el-icon-search"
                v-model="selectedMail"
                @change="validateMails()"
                multiple
                clearable
                filterable
                :allow-create="true"
                default-first-option
                ref="searchSelect"
              >
                <el-option
                  v-for="(contact, index) in allContacts"
                  :key="index"
                  :value="contact.email"
                  :label="contact.email"
                >
                  {{ contact.email }}
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :lg="{ span: 24 }" :xs="{ span: 24 }">
            <el-form-item label="Subject" class="mb-05">
              <el-input v-model="form.emailSubject"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :lg="{ span: 24 }" :xs="{ span: 24 }">
            <el-form-item label="Body" class="mb-05">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.emailBody"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="mailboxStyle">
        <el-button @click="cancelSendToMail">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="!selectedMail.length"
          @click="sendCompletedDocument"
          >Send</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Add new data"
      :visible.sync="repeatableDataModal"
      width="35%"
      :before-close="handleCloseRepeatable"
    >
      <div v-loading="repeatableDataLoading">
        <ConfigureNewRepeatableDataAdd
          :newRepeatableTemplateData="newRepeatableTemplateData"
          :selectedRow="newRepeatableData"
          :getDefaultDateFormat="getDefaultDateFormat"
          :company_id="
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            getSingleDocumentData.data.company_id
              ? getSingleDocumentData.data.company_id
              : null
          "
          :document_id="
            getSingleDocumentData &&
            getSingleDocumentData.data &&
            getSingleDocumentData.data._id
              ? getSingleDocumentData.data._id
              : null
          "
        >
        </ConfigureNewRepeatableDataAdd>
        <span slot="footer" class="dialog-footer float-right">
          <el-button @click="handleCloseRepeatable">Cancel</el-button>
          <el-button
            type="primary"
            @click="addNewRepeatableData(documentUsers)"
            :loading="repeatableDataLoading"
            :disabled="checkPrimaryFieldsFilled"
            >Add</el-button
          >
        </span>
      </div>
    </el-dialog>
    <ConfigureSettings
      v-if="docSettingsVisible"
      :configurableDocumentId="configurableDocumentId"
      :docSettingsVisible="docSettingsVisible"
      v-on:updated="clsdocSettingsVisible"
      v-on:close="docSettingsVisible = false"
    ></ConfigureSettings>

    <div class="overlay" v-if="isOtherOptionsRSOpened"></div>
  </section>
</template>

<script>
import appConfig from "@/config/app";
import VueHtml2pdf from "vue-html2pdf";
import { mapGetters } from "vuex";
import moment from "moment";
import settings from "@/constants/settings";
import {
  successNotification,
  errorNotification,
} from "@/helpers/notifications.js";
const FormulaExecute = () =>
  import("@/components/templates/formComponentsExecute/FormulaExecute");

const ConfigureSettings = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureSettingsNewTemp"
  );
const ConfigureEntityField = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureEntityField"
  );
const ConfigureRepeatableField = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureRepeatableField"
  );
import UserDocumentsHelper from "@/mixins/UserDocumentsHelper";
import MobileRelatedHelper from "@/mixins/MobileRelatedHelper";
import EntityHelper from "@/mixins/EntitiesHelper";
import axios from "@/config/axios";
import CurrencyInput from "./vue-weblineindia-currency-input/src/component";
// const pdf2base64 = require("pdf-to-base64");
var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js";
const ConfigureDocumentUsers = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureDocumentUsers"
  );
// const Initial = () => import("@/components/signature/Initial");
const Initial = () => import("@/components/account/Initial.vue");
import PermissionsHelper from "@/mixins/permissionsHelper";
import { bus } from "../main";
export default {
  name: "Global-ViewEmployeeCustomDocumentPreview",
  components: {
    HorizontalLineExecute: () =>
      import(
        "@/components/templates/formComponentsExecute/HorizontalLineExecute.vue"
      ),
    ESignature: () => import("@/components/signature/ESignature"),
    DocumentNotes: () =>
      import("@/components/employeeDocuments/viewDocuments/DocumentNotes"),
    DocumentLogs: () =>
      import("@/components/employeeDocuments/viewDocuments/DocumentLogs"),
    DocumentInfo: () =>
      import("@/components/employeeDocuments/viewDocuments/DocumentInfo"),
    DocumentWorkflowStatus: () =>
      import(
        "@/components/employeeDocuments/viewDocuments/DocumentWorkflowStatus"
      ),
    ConfigureDocumentUsers,
    ConfigureSettings,
    Initial,
    termsAndConditionsTemplate: () =>
      import("@/components/templates/termsAndConditionsTemplate.vue"),
    VueHtml2pdf,
    privacyAndPolicyTemplate: () =>
      import("@/components/templates/privacyAndPolicyTemplate.vue"),
    CurrencyInput,
    ConfigureEntityField,
    FormulaExecute,
    ConfigureRepeatableField,
    ConfigureNewRepeatableDataAdd: () =>
      import(
        "./companyDocuments/configureDocuments/ConfigureNewRepeatableDataAdd.vue"
      ),
  },
  mixins: [
    UserDocumentsHelper,
    MobileRelatedHelper,
    PermissionsHelper,
    EntityHelper,
  ],
  created() {
    window.addEventListener("resize", this.handleResize);
    if (this.getIsMobile) {
      this.$store.commit("navigationOpen/setIsOpen", false, {
        root: true,
      });
      this.$store.commit("navigationOpen/setIsRSOpen", false, {
        root: true,
      });
    }
    bus.$on("entityData-updated", (data) => {
      if (data.field && data.field.key) {
        this.updateEntityVariablesData(
          data.entityDataId,
          data.field,
          data.data,
          data.value
        );
      }
    });
    bus.$on("open-repeatable-data", (data) => {
      if (data && data.template_data) {
        let primaryFields = data.template_data.primary_fields
          ? data.template_data.primary_fields
              .filter((e) => e && e.key)
              .flatMap((e) => e.key)
          : [];
        this.newRepeatableTemplateData = this.getTemplateFields(
          data.template_data
        );
        this.newRepeatableTemplateData = this.newRepeatableTemplateData.map(
          (e) => {
            if (
              primaryFields &&
              primaryFields.length &&
              primaryFields.indexOf(e.key) != -1
            ) {
              e.is_primary = true;
            }
            return e;
          }
        );
        this.repeatableIds = data.indexKeys;
        this.repeatableSelectedField = data.field;
        this.repeatableDataModal = true;
      }
    });
    bus.$on("repeatableData-updated", (data) => {
      console.log("template", data);
      if (data.field && data.field.key) {
        this.updateRepeatableVariablesData(
          data.repeatableDataId,
          data.field,
          data.data,
          data.value
        );
      }
    });
  },
  data() {
    return {
      form: {
        emailSubject: this.subjectName,
        emailBody:
          "Please find signed document attached to this mail. Anticipating your action at the earliest.  ",
        documentId: "",
      },
      allContacts: [],
      selectedMail: [],
      isSendToMail: false,
      filterVal: [],
      isPageNavigationLSOpened: false,
      isOtherOptionsRSOpened: false,
      singleClickTimer: null,
      clickCount: 0,
      currentAuthenticatedUserInitial: null,
      activeTabName: "info",
      documentLogs: [],
      secureEsign: true,
      elements: [],
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      activeStep: 0,
      viewDetailedHistory: false,
      viewDetailedHistoryModal: false,
      historyloading: false,
      addItemDataDialogVisible: false,
      selectedItemIndex: null,
      selectedItem: {},
      refreshForm: false,
      selectedSignatureItem: {},
      selectedSignatureItemIndex: -1,
      captureSignatureDialog: false,
      hasBackground: false,
      documentId: null,
      selectedDocumentUsers: [],
      selectedDocumentId: null,
      configurableDocumentId: null,
      documentDataLoading: false,
      templateShareModal: false,
      documentFormData: null,
      isTemplate: false,
      documentName: "",
      documentCompletedStatus: "",
      loading: false,
      backgroundImage: "",
      previewVisible: false,
      activatedItem: null,
      contactUsers: [],
      activatedItemIndex: -1,
      docSettingsVisible: false,
      currentFormBuilderWidth: null,
      storedFormBuilderWidth: null,
      checkExistingData: false,
      is_finish: true,
      is_printAndSignProcess: true,
      selectAllContacts: false,
      is_print: false,
      activeName: "contacts",
      searchedContact: "",
      searchedContacts: [],
      searchedContactTypes: [],
      selectAllContactTypes: false,
      selectedContactTypes: [],
      printed_doc_url: "",
      backgroundImages: [
        "https://devnimblehrms.s3.ap-south-1.amazonaws.com/company-document-backgrounds/60468b2c0a7b7942d5781c36/60468b2c0a7b7942d5781c36-0.png",
      ],
      loadingElements: false,
      selectedTemplateFields: [],
      templatesUsed: [],
      showErrorElementDialog: false,
      errorElements: [],
      fieldErrorMessage: "",
      workflowDataId: "",
      userId: "",

      userDocumentFormData: {
        valid_from: this.$moment().startOf("day").toString(),
        expires_at: this.$moment().endOf("day").toString(),
        e_signature_required: "",
        e_signature_value: "",
      },
      employeeDocumentId: "",
      templateDataIdsData: [],
      workflowStepId: "",

      //e-sign data
      eSignId: "",
      eSignatureDialogVisible: false,
      showSavedSignatureData: false,
      workflowName: "",
      esignLoading: false,
      esignData: {},
      documentUsers: [],
      showDocumentUsersLog: false,
      completedialogVisible: false,

      // navigation
      setMaxDate: "",
      setMinDate: "",
      currentFieldIndex: -1,
      disableNextButton: false,
      disablePrevButton: true,
      completedFieldsCountLoading: false,
      showApprovalAccess: false,
      userDocumentData: {},
      currentEnabledFieldKey: "",
      currentEnabledField: null,
      documentCompletedID: "",
      addDocumentRecipient: false,
      addNewRecipient: {
        email: "",
        first_name: "",
        last_name: "",
        e_signature_required: true,
        value: "RECEIVER",
        name: "RECEIVER",
        type: "RECEIVER",
        e_signature_order: 0,
      },
      tagType: ["success", "info", "", "warning", "danger"],
      enforceSignatureOrder: true,
      isDraft: false,

      viewDocumentRecipient: false,
      isCurrentUserIsContatct: false,
      rejectUserDocumentModal: false,
      reason_for_reject: "",

      captureInitialDialog: false,
      declineDocumentNote: "",
      declineDialogVisible: false,
      isUserIsDocumentSender: true,
      requiredAlert: false,
      document_url_path: "",
      document_url_paths: [],
      total_documents: 1,
      allPdfData: [],
      currentSelectedDocIndex: -1,
      completedDocuments: [],
      printedDocuments: [],
      isLoginedUserOrNot: false,
      correctedAlertPopup: false,
      expiraydate: null,
      authid: null,
      showReviewFields: false,
      downloadButtonLoading: false,
      field_color: {
        filled: "rgb(83, 216, 21)",
        check_box_color: "#FF0001",
        default: "#FF0000",
        highlight: "#f754a2",
        optional: "#61ACF8",
        noColor: "#FFFFFF",
      },
      starting_drawer_visible: false,
      terms_and_conditions: false,
      isCurrentUserHasAccepted: false,
      terms_and_conditions_dialog: false,
      captureAttachment: false,
      allAttachments: [],
      sampleAttachments: [],
      selectedAttachmentFile: {
        document_name: "",
        attachment_url: "",
        valid_from: "",
        document_number: "",
        expires_on: "",
        title: "",
        description: "",
      },
      completed_url: "",
      isPrivacyPolicyActive: false,
      isTermsConditionsActive: false,
      fieldsFormUpload: {
        title: "",
        description: "",
        type: "",
        selectedFile: "",
        selectedFileName: "",
      },
      files: [],
      formats: [],
      attachmentLoading: false,
      attachmentErrors: "",
      visibleDocAttachments: false,
      visibleDocAttachmentsLoading: false,
      approveBotton: false,
      acceptLoading: false,
      isInitiated: false,
      previewAttachments: false,
      previewAttachmentsLoad: true,
      previewAttachmentTitle: "",
      previewAttachmentUrl: "",
      previewAttachmentLoading: false,
      loadingText: "",
      printloading: false,
      printandsign: false,
      is_completed: true,
      contactTypes: [],
      modalLoading: false,
      uploadDocOnLoading: false,
      availableContacts: [],
      changeRecipientUserModal: false,
      selectedRecipientuser: {
        email: "",
        first_name: "",
        last_name: "",
      },
      selectedRecipientEntity: null,
      isStandardEntity: false,
      isBusinessEntity: false,
      isIndividualEntity: false,
      selectedDocumentUser: null,
      changeRecipientUserErrors: {
        email: "",
        first_name: "",
        last_name: "",
      },
      changeContactLoading: false,
      selectedContactData: null,
      allDocumentUsers: [],
      selectedUsers: [],
      scale: 1,
      isInitialRender: true,
      docPages: 0,
      pdfPages: 1,
      isRightRotate: false,
      isLeftRotate: false,
      rotations: [],
      currentActivatePage: 0,
      currentActivateDoc: 0,
      pdfUrl: "",
      detailsDownload: false,
      workflow_data_id: null,
      is_workflow_document: false,
      workflow_enforce_order: false,
      currentActiveWorkflow: null,
      actionRequiredDocument: null,
      nextWorkflowDocument: null,
      workflowDocuments: [],
      activeWorkflow: 0,
      actionRequiredDocumentName: "",
      selectedWorkflowData: null,
      // detailsDownload: false,
      is_forbidden_doc: false,
      isCompanyDocument: false,
      nextDocumentAlertModal: false,
      nextDocumentAlertText: "",
      isRedownloading: false,
      documentInfo: {},
      documentSettings: {},
      documentData: {},
      repeatableDataModal: false,
      repeatableDataLoading: false,
      newRepeatableTemplateData: [],
      repeatableSelectedField: {},
      newRepeatableData: {},
      repeatableIds: [],
      refreshIndex: -1
    };
  },
  computed: {
    ...mapGetters("auth", [
      "getAuthenticatedUser",
      "getUserType",
      "getActiveWorkspace",
    ]),
    ...mapGetters("employeeData", ["getESignData"]),
    ...mapGetters("settings", [
      "getApplicationSettings",
      "getUpdateApplicationSettingsStatus",
    ]),
    ...mapGetters("fileUpload", [
      "getUploadStatus",
      "getFontTypes",
      "getUploadConvertFilesStatus",
      "getUploadConvertFiles",
      "getUploadFileDataStatus",
    ]),
    ...mapGetters("contacts", [
      "getAllContacts",
      "getCreateContactStatus",
      "getContactUser",
      "getUpdateContactStatus",
      "getContactErrors",
      "getCreateContactData",
      "getContactTypeCreateStatus",
      "getUpdateContactStatus",
      "getContact",
    ]),
    ...mapGetters("contactTypes", [
      "getAllContactTypes",
      "getContactTypeCreateStatus",
    ]),
    ...mapGetters("auth", ["getAuthenticatedUser", "getDefaultDateFormat"]),

    // ...mapGetters("templatesData", ["getTemplatesData"]),
    // ...mapGetters("companyDocuments", ["getCompanyDocumentDataById"]),
    ...mapGetters("employeeDocuments", [
      "getAuthorizedRepresentativeSignatureStatus",
      "getDocumentUserSignatureStatus",
      "getDocumentApprovalStatus",
      "getDocumentCompletedAfterApproval",
      "getDocumentApprovalErrors",
    ]),
    ...mapGetters("navigationOpen", ["getIsMobile", "getIsRSOpen"]),
    ...mapGetters("documents", [
      "getSingleDocumentData",
      "getSingleDocumentErrors",
      "getDocumentSendStatus",
      "getSingleDocumentUpdateStatus",
      "getDraftDocumentUpdateStatus",
      "getDocumentVoidStatus",
      "getArchiveDocumentStatus",
      "getResendDocumentStatus",
      "getDocumentDeclineStatus",
      "getDocumentCompletedStatus",
      "getDocumentLogs",
      "getDocumentSaveAsTemplate",
      "getDocumentSaveAsTemplateData",
      "getSingleDocumentCompletedStatus",
      "getDocumentCorrectStatus",
      "getDocumentCorrectErrors",
      "getCloneVoidDocStatus",
      "getCloneVoidDocErrors",
      "getCloneVoidDocData",
      "getSingleDocumentUpdateErrors",
      "getDocumentUserTermsUpdate",
      "getUpdateDocumentUsersStatus",
      "getUpdateDocumentUsersErrors",
      "getSendCompletedDocumentStatus",
      "getDocumentSendErrors",
    ]),
    ...mapGetters("templateWorkflow", [
      "getWorkflowDataById",
      "getCreatedworkflowDataById",
      "getCreatedworkflowStatus",
      "getCurrentUserStatus",
    ]),
    ...mapGetters("templatesData", ["getTemplatesData"]),
    // isCompletedOrNot(){
    //   let user = this.getCurrentAuthUser();

    // },

    checkDocumentStatus() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        this.getSingleDocumentData.data.document_status == "COMPLETED"
      ) {
        return true;
      }
      return false;
    },

    getSignaturesCount() {
      let count = 0;
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data.pages &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0]
          .fields
      ) {
        this.getSingleDocumentData.data.configurable_document_data.pages[0].fields.forEach(
          (el) => {
            if (el && (el.type == "SIGNATURE" || el.type == "my-signature")) {
              count = count + 1;
            }
          }
        );
      }
      return count;
    },
    isInDocumentUsers() {
      let hasUser =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users
          ? this.getSingleDocumentData.data.document_users.findIndex(
              (cu) => cu.email == this.getAuthenticatedUser.email
            )
          : -1;
      if (hasUser != -1) {
        return true;
      } else {
        return false;
      }
    },
    getDocumentSubject() {
      let sub = "Requesting esign";
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.email_content &&
        this.getSingleDocumentData.data.email_content.subject
      ) {
        sub = "";
        sub = this.getSingleDocumentData.data.email_content.subject;
      }
      return sub;
    },
    getInitialsCount() {
      let count = 0;
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data.pages &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0]
          .fields
      ) {
        this.getSingleDocumentData.data.configurable_document_data.pages[0].fields.forEach(
          (el) => {
            if (el && (el.type == "INITIAL" || el.type == "MY_INITIAL")) {
              count = count + 1;
            }
          }
        );
      }
      return count;
    },

    getSenderEmail() {
      let sender = "";
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users
      ) {
        let tempSender = this.getSingleDocumentData.data.document_users.find(
          (el) => el && el.type && el.type == "SENDER"
        );
        sender = tempSender.email;
      }
      return sender;
    },
    getDocumentCreatedZone() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.sender_time_zone
      ) {
        return this.getSingleDocumentData.data.sender_time_zone;
      }
      return "-";
    },
    getDocumentCreatedAt() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.created_at
      ) {
        return this.getSingleDocumentData.data.created_at;
      }
      return "-";
    },
    getDocumentCompletedAt() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.completed_at
      ) {
        return this.getSingleDocumentData.data.completed_at;
      }
      return "-";
    },
    getSenderIpAddress() {
      let ip = "--";
      if (
        (this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.configurable_document_data &&
          this.getSingleDocumentData.data.configurable_document_data
            .sender_ip_address) ||
        this.getSingleDocumentData.data.sender_ip_address
      ) {
        if (
          this.getSingleDocumentData.data.configurable_document_data
            .sender_ip_address
        ) {
          ip =
            this.getSingleDocumentData.data.configurable_document_data
              .sender_ip_address;
        } else {
          ip = this.getSingleDocumentData.data.sender_ip_address;
        }
      }
      return ip;
    },
    getUsersForCertificate() {
      let users = [];
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users &&
        this.documentLogs &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data.pages &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0]
          .fields
      ) {
        this.getSingleDocumentData.data.document_users.forEach((user) => {
          let obj = {};
          if (user.user_type != "CC") {
            if (user.sent_on) {
              obj.sent_time = user.sent_on;
            }
            if (
              this.getSingleDocumentData &&
              this.getSingleDocumentData.data &&
              this.getSingleDocumentData.data.allow_sender_auto_fill &&
              !user.sent_on
            ) {
              obj.sent_time = user.document_filling_date;
            }
            if (user.document_filling_date) {
              obj.completed_time = user.document_filling_date;
            }
            obj.email = user.email;
            obj.name = user.first_name + " " + user.last_name;
            obj.type = user.type;
            obj.print_complete =
              user && user.completed_by_print ? user.completed_by_print : false;
            if (
              user &&
              user.type == "SENDER" &&
              (this.getSingleDocumentData.data.configurable_document_data
                .sender_ip_address ||
                this.getSingleDocumentData.data.sender_ip_address)
            ) {
              obj.user_ip =
                this.getSingleDocumentData.data.configurable_document_data
                  .sender_ip_address ||
                this.getSingleDocumentData.data.sender_ip_address;
            }
            this.documentLogs.forEach((el) => {
              if (
                !obj.user_ip &&
                user &&
                user.email &&
                el &&
                el.contact_id &&
                el.ip_address &&
                el.contact_id.email == user.email
              ) {
                obj.user_ip = el.ip_address;
              }
              if (
                !obj.accept_time &&
                user &&
                user.email &&
                el &&
                el.contact_id &&
                el.contact_id.email == user.email &&
                el.status == "ACCEPTED_TERMS_&_CONDITIONS"
              ) {
                obj.accept_time = el.time;
              }
              if (
                !obj.accept_time &&
                user &&
                user.email &&
                el &&
                el.contact_id &&
                el.contact_id.email == user.email &&
                el.status == "DOCUMENT_VIEWED"
              ) {
                obj.view_time = el.time;
              }
            });
            let elements =
              this.getSingleDocumentData.data.configurable_document_data
                .pages[0].fields;
            for (let index = 0; index < elements.length; index++) {
              let field = elements[index];
              const documentValue = this.getValueFromSavedDocument(field.key);
              if (
                (elements[index].type == "SIGNATURE" ||
                  elements[index].type == "INITIAL") &&
                documentValue
              ) {
                elements[index].source = documentValue;
                this.$set(elements[index], "source", documentValue);
              }
              if (
                elements[index].type == "PRIMARY_FIELDS" &&
                !elements[index].content
              ) {
                this.$set(elements[index], "content", documentValue);
              }
              if (documentValue) {
                this.$set(elements[index], "value", documentValue);
              }
            }
            elements.forEach((el) => {
              if (
                el &&
                (el.type == "SIGNATURE" || el.type == "my-signature") &&
                el.filled_by == user.value &&
                el.source
              ) {
                obj.signature_source = el.source;
              }
            });
            users.push(obj);
          }
        });
      }
      return users;
    },
    isSenderOrnot() {
      let user = this.getCurrentAuthUser();
      if (user && user.value != "SENDER") {
        return false;
      } else {
        return true;
      }
    },
    isRecieverOrnot() {
      let user = this.getCurrentAuthUser();
      if (user && user.value != "RECIEVER") {
        return false;
      } else {
        return true;
      }
    },
    dateFormat() {
      let dateHistory = "";
      if (
        this.getApplicationSettings &&
        this.getApplicationSettings.data &&
        this.getApplicationSettings.data.date
      ) {
        dateHistory = this.getApplicationSettings.data.date;
        return dateHistory;
      } else {
        let date_hist = this.getDefaultDateFormat;
        return date_hist;
      }
    },
    documentIdforHistory() {
      let ids = "";
      let doc_url =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_completed_urls &&
        this.getSingleDocumentData.data.document_completed_urls.length
          ? this.getSingleDocumentData.data.document_completed_urls
          : this.getSingleDocumentData.data.document_completed_url
          ? [this.getSingleDocumentData.data.document_completed_url]
          : [];
      if (doc_url.length) {
        doc_url.forEach((e, i) => {
          let data = e.split("/");
          ids += data[data.length - 1].replace(".pdf", "");
          if (i + 1 != doc_url.length) {
            ids += ", ";
          }
        });
      }
      return ids;
    },
    isSenderForCertificate() {
      let user = this.getCurrentAuthUser();
      if (user && user.value == "SENDER") {
        return true;
      } else {
        return false;
      }
    },
    isSendersTurnOrNot() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users
      ) {
        let currentUser = this.getSingleDocumentData.data.document_users.find(
          (x) => x.email.toLowerCase() === this.currentAuthUserEmail
        );
        if (
          this.getSingleDocumentData.data.enforce_signature_order &&
          currentUser &&
          currentUser.sent_status &&
          this.getSingleDocumentData.data.is_anyone_can_approve &&
          !currentUser.document_filling_status
        ) {
          return false;
        } else if (
          this.getSingleDocumentData.data.enforce_signature_order &&
          currentUser &&
          currentUser.email &&
          currentUser.email !=
            this.getSingleDocumentData.data.current_active_user &&
          !currentUser.document_filling_status
        ) {
          console.log(currentUser,this.getSingleDocumentData.data.current_active_user)
          return true;
        }
      }
      return false;
    },
    isDocumentHasAttachment() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data.pages &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0]
          .fields
      ) {
        let currentUser = this.getCurrentAuthUser();
        if (currentUser && currentUser.type && currentUser.type == "SENDER") {
          let attachments =
            this.getSingleDocumentData.data.configurable_document_data.pages[0].fields
              .filter((field) => field.type == "ATTACHMENT")
              .flatMap((el) => el.key);

          if (attachments && attachments.length) {
            return true;
          }
          return false;
        } else {
          let attachments =
            this.getSingleDocumentData.data.configurable_document_data.pages[0].fields
              .filter(
                (field) =>
                  field.type == "ATTACHMENT" &&
                  currentUser &&
                  currentUser.value &&
                  (field.filled_by == currentUser.value ||
                    field.filled_by == "SENDER")
              )
              .flatMap((el) => el.key);

          if (attachments && attachments.length) {
            return true;
          }
          return false;
        }
      } else {
        return false;
      }
    },
    is_current_user_is_cc() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users &&
        this.currentAuthUserEmail
      ) {
        let currentUser = this.getSingleDocumentData.data.document_users.find(
          (x) => x.email.toLowerCase() === this.currentAuthUserEmail
        );
        if (
          currentUser &&
          currentUser.user_type &&
          currentUser.user_type == "CC"
        ) {
          return true;
        } else {
          0;
          return false;
        }
      } else {
        return false;
      }
      // return false;
    },
    isfilledOrNot() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        this.getSingleDocumentData.data.document_users
      ) {
        if (
          this.getSingleDocumentData.data.document_status != "DECLINED" &&
          this.getSingleDocumentData.data.document_status != "COMPLETED" &&
          this.getSingleDocumentData.data.document_status != "ARCHIVED"
        ) {
          let completedUser =
            this.getSingleDocumentData.data.document_users.find(
              (e) =>
                e.type != "SENDER" &&
                e.document_filling_status &&
                e.user_type != "CC"
            );
          if (completedUser) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    isDeclineOrNot() {
      let user = this.getCurrentAuthUser();
      if (user && user.value != "SENDER") {
        if (
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.document_status === "VOIDED"
        ) {
          return false;
        } else if (
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          (this.getSingleDocumentData.data.document_status === "SENT" ||
            this.getSingleDocumentData.data.document_status === "APPROVED")
        ) {
          if (
            (user && user.declined_status) ||
            (user && user.e_signature_status) ||
            (user && !user.fields_required) ||
            (user && user.approval_status) ||
            (user && user.document_filling_status)
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    getIdentiferText() {
      let text = "";
      if (
        this.currentEnabledField &&
        (this.currentEnabledField.type == "SIGNATURE" ||
          this.currentEnabledField.type == "INITIAL")
      ) {
        if (this.currentEnabledField.source) {
          text = "Signed";
        } else {
          text = "Sign here";
        }
      } else if (
        this.currentEnabledField &&
        this.currentEnabledField.type == "ATTACHMENT"
      ) {
        if (
          this.currentEnabledField &&
          this.currentEnabledField.files &&
          this.currentEnabledField.files.length
        ) {
          text = "Attached";
        } else {
          text = "Fill here";
        }
      } else {
        if (this.currentEnabledField && this.currentEnabledField.value) {
          text = "Filled";
        } else {
          text = "Fill here";
        }
      }
      return text;
    },
    getFinishMessage() {
      let optional_fields = this.optionalFieldsCount();
      if (optional_fields > 0) {
        let count = "";
        if (optional_fields == 1) {
          count = "One non-required field is there,";
        } else if (optional_fields == 2) {
          count = "Two non-required fields are there,";
        } else if (optional_fields == 3) {
          count = "Three non-required fields are there,";
        } else if (optional_fields == 4) {
          count = "Four non-required fields are there,";
        } else if (optional_fields == 5) {
          count = "Five non-required fields are there,";
        } else {
          count = optional_fields + " non-required fields are there,";
        }
        return `${count} If you want still complete this
            document then click "Finish".`;
      } else {
        return 'You have completed all required fields. To finish the document please click "Finish".';
      }
    },
    getApproveMessage() {
      let optional_fields = this.optionalFieldsCount();
      if (optional_fields > 0) {
        let count = "";
        if (optional_fields == 1) {
          count = "One non-required field is there,";
        } else if (optional_fields == 2) {
          count = "Two non-required fields are there,";
        } else if (optional_fields == 3) {
          count = "Three non-required fields are there,";
        } else if (optional_fields == 4) {
          count = "Four non-required fields are there,";
        } else if (optional_fields == 5) {
          count = "Five non-required fields are there,";
        } else {
          count = optional_fields + " non-required fields are there,";
        }
        // return `${count} If you want still complete this
        //     document then click "Approve".`;
        return `${count} If you want still complete then click "Approve".`;
      } else {
        return 'You have completed all required fields. To finish the document please click "Approve".';
      }
    },
    disableDecline() {
      let user = this.getCurrentAuthUser();
      if (user && user.value !== "SENDER") {
        if (
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.document_status === "VOIDED"
        ) {
          return true;
        } else if (
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.document_status === "SENT"
        ) {
          if (user && user.declined_status) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    disableOnVoid() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status === "VOIDED"
      ) {
        return true;
      } else {
        return false;
      }
    },
    displayDateFormat() {
      let date = "MM-dd-yyyy";
      return date;
    },
    getBackgroundImage() {
      return (path) => appConfig.S3_BUCKET_URL + "/" + path;
    },
    getLogoUrl() {
      return appConfig.S3_BUCKET_URL + "/" + this.getCompanyProfileData.logo;
    },
    basePdfdownloadUrl() {
      // return appConfig.JAVA_BASE_URL
      return appConfig.S3_BUCKET_URL;
    },
    getPdfPages() {
      return this.pdfPages;
    },
    getAllPdfData() {
      return this.allPdfData;
    },
    isAccessDocument() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        this.getSingleDocumentData.data.document_status != "DECLINED" &&
        this.getSingleDocumentData.data.document_status != "ARCHIVED" &&
        this.getSingleDocumentData.data.document_status != " VOIDED" &&
        this.getSingleDocumentData.data.document_status != "EXPIRED" &&
        this.getSingleDocumentData.data.document_status != "COMPLETED"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isUserIsDocumentOwner() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.user_id &&
        this.getSingleDocumentData.data.user_id.email &&
        this.currentAuthUserEmail ==
          this.getSingleDocumentData.data.user_id.email.toLowerCase()
      ) {
        return true;
      } else {
        return false;
      }
    },
    isDocumentSigned() {
      return this.getCurrentUserFromDocumentUsers ? true : false;
    },
    getIsDocumentIsDeleted() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "ARCHIVED"
      ) {
        return true;
      }
      return false;
    },
    getIsDocumentIsExpired() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "EXPIRED"
      ) {
        return true;
      }
      return false;
    },
    getCurrentUserIsFilled() {
      let currentUser = this.documentUsers.find(
        (x) =>
          (x.user_id && x.email == this.currentAuthUserId) ||
          (x.contact_id && x.email == this.currentAuthUserId)
      );
      if (
        currentUser &&
        currentUser.document_filling_status &&
        currentUser.user_type != "CC"
      ) {
        return true;
      } else {
        return false;
      }
    },
    getSignerIfSignatureFieldIsThere() {
      let currentUser = this.documentUsers.find(
        (x) =>
          (x.user_id && x.email == this.currentAuthUserId) ||
          (x.contact_id && x.email == this.currentAuthUserId)
      );
      let message = " ";
      if (
        currentUser &&
        currentUser.document_filling_status &&
        currentUser.user_type != "CC" &&
        currentUser.e_signature_required
      ) {
        message = "You have signed the document!";
      } else if (
        currentUser.approval_status &&
        currentUser.approval_status == "APPROVED" &&
        currentUser.has_approval_access &&
        currentUser &&
        currentUser.document_filling_status &&
        currentUser.user_type != "CC"
      ) {
        message = "You have approved the document!";
      } else {
        message = "You have completed the document!";
      }
      return message;
    },
    getCurrentUserFromDocumentUsers() {
      let currentUser = this.documentUsers.find(
        (x) =>
          ((x.user_id && x.user_id.email == this.currentAuthUserId) ||
            (x.contact_id && x.contact_id.email == this.currentAuthUserId)) &&
          x.e_signature
      );
      return currentUser;
    },
    currentAuthUserId() {
      return this.getAuthenticatedUser.email;
    },
    currentAuthUserEmail() {
      return this.getAuthenticatedUser.email.toLowerCase();
    },
    getColorByFilledBy() {
      return (item) => {
        let style = "";

        if (item.filled_by || item.selected_user) {
          this.documentUsers.map((user) => {
            if (
              (user.value == item.filled_by ||
                user.value == item.selected_user) &&
              user.color
            ) {
              let color = "";
              if (
                item.filled_by &&
                !this.checkFieldAllow(item) &&
                item.type != "my-signature" &&
                item.type != "MY_INITIAL"
              ) {
                if (
                  (item && item.value && item.value.length) ||
                  (item.source && item.source.length) ||
                  (item.required
                    ? item && item.requiredFiles == 1
                      ? item && item.files && item.files.length
                      : item.files && item.files.length >= item.requiredFiles
                    : item.files &&
                      item.files.length &&
                      item.type != "HORIZONTAL_LINE")
                ) {
                  color = `${this.field_color.filled}`;
                } else if (this.currentEnabledFieldKey == item.key) {
                  color = `${this.field_color.highlight}`;
                } else {
                  color = `${this.field_color.default}`;
                }
              } else {
                color = user.color;
              }
              style = `background: ${
                user.color + "33"
              }; border: 2px solid ${color}; color: #000000`;
              if (
                item.type == "SIGNATURE" &&
                this.currentEnabledFieldKey == item.key &&
                item.source &&
                !item.source.length
              ) {
                style += `outline: 2px solid ${this.field_color.highlight} !important;`;
              }
            }
          });
          return style;
        } else {
          if (item.template_field_filled_by == "SENDER") {
            style = "background:#dcffca; color: #000000";
          } else if (item.entity_field_filled_by == "SENDER") {
            style = "background:#dcffca; color: 000000";
          } else {
            style = "background:#f6d2d5; color:#000000";
          }
        }
        if (item.type != "logo") {
          return style;
        }
        return "";
      };
    },

    isActive() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status != "DRAFT"
      ) {
        return "document-preview-block twoColumn";
      } else {
        return "document-preview-block singleColumn";
      }
    },
    checkIsCurrentUser() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.enforce_signature_order
      ) {
        let currentUser = this.getSingleDocumentData.data.document_users.find(
          (x) => x.email.toLowerCase() === this.currentAuthUserEmail
        );
        if (
          currentUser &&
          currentUser.sent_status &&
          this.getSingleDocumentData.data.is_anyone_can_approve &&
          !currentUser.document_filling_status
        ) {
          return true;
        } else if (
          this.getSingleDocumentData.data.current_active_user ==
          this.currentAuthUserId
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    checkIsDocumentCompleted() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_completed_status
      ) {
        return true;
      }
      return false;
    },
    checkSignStatus() {
      let user = this.getCurrentAuthUser();
      if (user && user.has_approval_access) {
        if (
          user.approval_status &&
          this.getSingleDocumentData.data.document_approval_status
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (user && !user.document_filling_status) {
          return true;
        }
        return false;
      }
    },
    checkApproveAccess() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status != "REJECTED"
      ) {
        let user = this.getCurrentAuthUser();
        if (
          user &&
          user.has_approval_access &&
          user.approval_status != "APPROVED"
        ) {
          return true;
        }
      }
      return false;
    },
    checkRejectAccess() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_approval_status != "REJECTED"
      ) {
        let user = this.getCurrentAuthUser();
        if (user && user.has_approval_access && !user.approval_status) {
          return true;
        }
      }
      return false;
    },
    checkDocCompleted() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "COMPLETED"
      ) {
        return true;
      }
      return false;
    },
    checkDOCReject() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "DECLINED"
      ) {
        return true;
      }
      return false;
    },
    getCurrentUserRequiredFields() {
      let user = this.getCurrentAuthUser();
      let fields = [];
      if (user && user.value) {
        fields = this.elements
          .filter(
            (element) =>
              (element.filled_by == user.value ||
                element.selected_user == user.value) &&
              element.required &&
              !element.value
          )
          .flatMap((element) => element.label);
      }
      return fields.join(", ");
    },
    getCurrentUserEntityFields() {
      let user = this.getCurrentAuthUser();
      let fields = this.elements.filter(
        (element) =>
          element.template_id &&
          (element.filled_by == user.value ||
            element.selected_user == user.value)
      );
      return fields;
    },
    getCurrentUserFields() {
      let user = this.getCurrentAuthUser();
      if (user && user.has_approval_access) {
        if (
          user.approval_status &&
          this.getSingleDocumentData.data.document_approval_status
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        let fields = this.elements.filter(
          (element) =>
            element.filled_by == user.value ||
            element.selected_user == user.value
        );
        return fields.length || user.type == "SENDER" ? true : false;
      }
    },
    getCurrentDocUser() {
      let userName = "";
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users &&
        this.currentAuthUserEmail
      ) {
        let currentUser = this.getSingleDocumentData.data.document_users.find(
          (x) => x && x.email.toLowerCase() === this.currentAuthUserEmail
        );
        if (currentUser && currentUser.first_name && currentUser.last_name) {
          userName = currentUser.first_name + " " + currentUser.last_name;
        }
      }
      return userName;
    },
    getSenderName() {
      let senderName = "";
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users
      ) {
        let sender = this.getSingleDocumentData.data.document_users.find(
          (x) => x && x.type === "SENDER"
        );
        if (sender.first_name && sender.last_name) {
          senderName = sender.first_name + " " + sender.last_name;
        }
      }
      return senderName;
    },
    is_corrected_document() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "DRAFT"
      ) {
        return true;
      } else {
        return false;
      }
    },
    getHighlightButtonStyleForMobile() {
      let element = this.elements.filter(
        (element) => element.key == this.currentEnabledFieldKey
      );
      if (!element.length || (this.finish_drawer() && !this.showReviewFields)) {
        return "display:none";
      }
      return `top: ${element[0].y - element[0].height - 30}px; left: ${
        element[0].x + element[0].width / 2.5
      }px;z-index: 100;`;
    },
    getHighlightButtonStyle() {
      let element = this.elements.filter(
        (element) => element.key == this.currentEnabledFieldKey
      );
      if (!element.length || (this.finish_drawer && !this.showReviewFields)) {
        return "display:none";
      }
      return `top: ${element[0].y}px;z-index: 100;`;
    },
    getWorkflowCompletionPercentage() {
      let percentage = 0;
      if (
        this.selectedWorkflowData &&
        this.selectedWorkflowData.completed_documents &&
        this.selectedWorkflowData.total_documents
      ) {
        percentage =
          (this.selectedWorkflowData.completed_documents /
            this.selectedWorkflowData.total_documents) *
          100;
      }
      return percentage;
    },
    checkWorkflowDocument() {
      if (
        this.selectedWorkflowData &&
        this.selectedWorkflowData.documents &&
        this.selectedWorkflowData.documents.length
      ) {
        return true;
      }
      return false;
    },
  },
  async mounted() {
    this.formats = settings.DATE_FORMATS;

    this.$store.commit("errors/reset", null, { root: true });
    this.authid =
      this.getAuthenticatedUser && this.getAuthenticatedUser._id
        ? this.getAuthenticatedUser._id
        : null;
    this.documentDataLoading = true;
    this.employeeDocumentId = this.$route.params.employee_document_id;
    await this.fetchEmployeDocumentData();
    this.workflow_data_id =
      this.getSingleDocumentData &&
      this.getSingleDocumentData.data &&
      this.getSingleDocumentData.data.workflow_data_id
        ? this.getSingleDocumentData.data.workflow_data_id
        : null;
    if (this.workflow_data_id) {
      await this.fetchWorkflowData();
    }
    this.userId = this.getAuthenticatedUser._id;
    this.UserEmail = this.getAuthenticatedUser.email.toLowerCase();
    await this.fetchContactTypes();
    try {
      this.currentFormBuilderWidth = this.$refs.formBuilder.clientWidth;
    } catch (e) {
      this.currentFormBuilderWidth = 0;
    }
    if (this.getSingleDocumentData && this.getSingleDocumentData.data) {
      this.getDocLogs();
      if (
        this.getSingleDocumentData.data.document_status == "COMPLETED" &&
        this.getSingleDocumentData.data.document_completed_url
      ) {
        let allUrls =
          this.getSingleDocumentData.data.document_completed_urls &&
          this.getSingleDocumentData.data.document_completed_urls.length
            ? this.getSingleDocumentData.data.document_completed_urls
            : [this.getSingleDocumentData.data.document_completed_url];
        this.documentUsers = this.getSingleDocumentData.data.document_users;
        await this.setData();
        await this.renderAllDocuments(allUrls, true);
        this.handleScroll();
      } else {
        this.correctedAlertPopup = false;
        if (
          this.getSingleDocumentData.data.document_status == "SENT" ||
          this.getSingleDocumentData.data.document_status == "APPROVED"
        ) {
          this.checkForEntityDataUpdate(
            this.getSingleDocumentData.data.document_users
          );
        }
        await this.setData();
        await this.renderAllDocuments(this.document_url_paths, true);
        this.handleScroll();
      }
    }

    this.getCurrentUser();
    //this.getAllDocLogs();
    this.isUserAcceptTerms();
    this.documentDataLoading = false;

    if (this.$route.query && this.$route.query.tab) {
      this.activeTabName = this.$route.query.tab;
    }
    let that = this;
    that.setMaxDate = {
      disabledDate: (time) => {
        return (
          time.getTime() >
          new Date(that.selectedAttachmentFile.expires_on).getTime()
        );
      },
    };
    that.setMinDate = {
      disabledDate: (time) => {
        return (
          time.getTime() <
          new Date(that.selectedAttachmentFile.valid_from).getTime()
        );
      },
    };
  },
  methods: {
    checkCurrency(item, index) {
      if (typeof item.value !== "number") {
        item.value = 0;
        this.elements[index] = { ...item };
        this.refreshIndex = index;
        setTimeout(() => {
          this.refreshIndex = -1;
        });
      }
    },
    async sendToMail(id, name) {
      this.form.documentId = id;
      this.subjectName = name;
      this.form.emailSubject = "Signed  " + this.subjectName;
      let params = { get_all: true };
      await this.$store.dispatch("contacts/fetchAllContacts", params);
      this.allContacts = this.getAllContacts.data;
      this.isSendToMail = true;
      this.configureLoading = false;
    },
    cancelSendToMail() {
      this.isSendToMail = false;
      this.form.documentId = "";
      this.selectedMail = [];
      this.form.emailSubject = "Signed  " + this.subjectName;
      this.form.emailBody =
        "Please find attached signed document attached to this mail. Anticipating your action at the earliest.";
    },
    async sendCompletedDocument() {
      let params = {
        docId: this.form.documentId,
        email: this.selectedMail,
        emailSubject: this.form.emailSubject,
        emailBody: this.form.emailBody,
      };
      this.sendingMail = true;
      this.isSendToMail = false;
      this.configureLoading = true;
      await this.$store.dispatch("documents/sendCompletedDocument", params);
      if (this.getSendCompletedDocumentStatus) {
        this.$notify.success({
          title: "Success",
          message: "Document sent successfully",
        });
        this.configureLoading = false;
        this.form.documentId = "";
        this.selectedMail = [];
        this.form.emailSubject = "Signed  " + this.subjectName;
        this.form.emailBody =
          "Please find signed document attached to this mail. Anticipating your action at the earliest.";
      } else {
        errorNotification("Error in sending document");
      }
    },
    fillContactDetails(flag) {
      this.changeRecipientUserErrors.email = "";
      this.changeRecipientUserErrors.first_name = "";
      this.changeRecipientUserErrors.last_name = "";
      if (this.selectedRecipientuser.email) {
        let selectedContact = this.getAllContacts.data.find(
          (el) =>
            el.email.toLowerCase() ==
            this.selectedRecipientuser.email.toLowerCase()
        );
        if (selectedContact) {
          let isStandardContact =
            selectedContact.contact_type &&
            selectedContact.contact_type.type == "STANDARD" &&
            selectedContact.contact_type.slug == "receiver"
              ? true
              : false;
          if (
            this.isStandardEntity ||
            (selectedContact.contact_type &&
              this.selectedRecipientEntity._id ==
                selectedContact.contact_type._id) ||
            isStandardContact
          ) {
            if (
              this.isBusinessEntity &&
              this.selectedDocumentUser.entity_data_id &&
              selectedContact.account_data_id &&
              this.selectedDocumentUser.entity_data_id._id !=
                selectedContact.account_data_id._id &&
              flag != true
            ) {
              console.log(
                "this.selectedDocumentUser.entity_data_id._id",
                this.selectedDocumentUser.entity_data_id._id,
                selectedContact.account_data_id._id
              );
              this.$confirm(
                `Selected contact is not belong to account name in document. Do you want to update the contact?`,
                "Warning",
                {
                  confirmButtonText: "Update",
                  cancelButtonText: "Cancel",
                  type: "warning",
                }
              )
                .then(() => {
                  this.selectedRecipientuser.first_name =
                    selectedContact.first_name;
                  this.selectedRecipientuser.last_name =
                    selectedContact.last_name;
                })
                .catch(() => {
                  this.selectedRecipientuser.first_name = "";
                  this.selectedRecipientuser.last_name = "";
                  this.selectedRecipientuser.email = "";
                });
            } else if (
              this.isIndividualEntity &&
              !this.isStandardEntity &&
              flag != true
            ) {
              this.$confirm(
                `This document user is connected to Individual entity. With selected contact, entity data will be modified/deleted. Do you want to update the contact?`,
                "Warning",
                {
                  confirmButtonText: "Update",
                  cancelButtonText: "Cancel",
                  type: "warning",
                }
              )
                .then(() => {
                  this.selectedRecipientuser.first_name =
                    selectedContact.first_name;
                  this.selectedRecipientuser.last_name =
                    selectedContact.last_name;
                })
                .catch(() => {
                  this.selectedRecipientuser.first_name = "";
                  this.selectedRecipientuser.last_name = "";
                  this.selectedRecipientuser.email = "";
                });
            } else {
              this.selectedRecipientuser.first_name =
                selectedContact.first_name;
              this.selectedRecipientuser.last_name = selectedContact.last_name;
            }
          } else {
            if (this.selectedRecipientEntity.name) {
              this.changeRecipientUserErrors.email =
                "Selected contact not associated with " +
                this.selectedRecipientEntity.name;
            } else {
              this.changeRecipientUserErrors.email =
                "Selected contact not associated with contact type in document";
            }
            this.selectedRecipientuser.email = "";
          }
        }
      } else {
        this.selectedRecipientuser.first_name = "";
        this.selectedRecipientuser.last_name = "";
      }
    },
    handleEmailFilter(filterVal) {
      this.selectedRecipientuser.email = filterVal;
      this.selectedRecipientuser.first_name = "";
      this.selectedRecipientuser.last_name = "";
      this.filterVal = filterVal;
    },
    onEmailLostFocus() {
      // console.log(">>> onEmailLostFocus(), e", e);
      this.fillContactDetails(true);
    },
    //get page count
    pageCount(i, j) {
      let prevPagesCount = 0;
      for (let index = 0; index < j; index++) {
        prevPagesCount = prevPagesCount + this.allPdfData[index].pages;
      }
      return prevPagesCount + i;
    },
    //render all documents
    async renderAllDocuments(document_url_paths, isNew) {
      // this.documentDataLoading = true;
      for (let i = 0; i < document_url_paths.length; i++) {
        let doc = document_url_paths[i];
        let urlSliptArray = doc.split("/");
        let tempUrl = "";
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          tempUrl = `/${process.env.VUE_APP_APP_TYPE}${doc}`;
        } else {
          tempUrl = doc;
        }
        let url = this.basePdfdownloadUrl + tempUrl;
        await this.setPdfData(url, i, isNew);
      }
    },
    async setPdfData(url, id, isNew) {
      const self = this;
      let i = id;
      console.log("isNew", isNew);
      // if (!isNew) {
      let random = (Math.random() + 1).toString(36).substring(7);
      url += `?view=${random}`;
      // }
      await pdfjsLib.getDocument(url).then(setPDfData);
      async function setPDfData(pdfDoc) {
        self.allPdfData.push({
          pdfDoc: pdfDoc,
          pages: pdfDoc.numPages,
          order: i,
        });
        if (self.total_documents == i + 1) {
          self.allPdfData = self.allPdfData.sort((a, b) => a.order - b.order);
          await self.document_url_paths.forEach(async (doc, index) => {
            await self.renderPreviewPages(index);
          });
        }
      }
    },
    openPageNavigationLS() {
      this.isPageNavigationLSOpened = true;
      this.isOtherOptionsRSOpened = false;
      // this.closeRightSideBar();
    },
    closePageNavigationLS() {
      this.isPageNavigationLSOpened = false;
    },
    hideOtherOptionsRS() {
      this.isOtherOptionsRSOpened = false;
    },
    openCloseThreeDotsRightSideBar() {
      this.isOtherOptionsRSOpened = !this.isOtherOptionsRSOpened;
      this.isPageNavigationLSOpened = false;
    },
    openCloseRightSideBar() {
      if (this.getIsRSOpen) {
        this.closeRightSideBar();
      } else {
        this.openRightSideBar();
        this.isPageNavigationLSOpened = false;
      }
    },
    checkIsAllow(users) {
      if (users && users.length) {
        let currentUser = users.find(
          (e) =>
            e &&
            this.currentAuthUserEmail &&
            e.email &&
            e.email.toLowerCase() == this.currentAuthUserEmail.toLowerCase()
        );
        if (currentUser) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    },
    changeWorkflowDocument() {
      if (this.currentActiveWorkflow != this.employeeDocumentId) {
        this.$router.push({
          name: "employee-documents-custom-document",
          params: {
            employee_document_id: this.currentActiveWorkflow,
          },
          query: {
            workflow_id: this.workflow_data_id,
          },
        });
        setTimeout(() => {
          this.refreshDocument();
        }, 1000);
      }
    },
    getFormat() {
      let format = "";
      if (this.selectedWorkflowData) {
        format =
          this.selectedWorkflowData.completed_documents +
          "/" +
          this.selectedWorkflowData.total_documents;
      } else {
        format = "0/0";
      }
      return format;
    },
    async fetchWorkflowData() {
      let id = this.workflow_data_id;
      await this.$store.dispatch("templateWorkflow/fetchWorkflowDataById", id);
      if (this.getCreatedworkflowStatus) {
        this.selectedWorkflowData = this.getCreatedworkflowDataById;
        this.currentActiveWorkflow = this.employeeDocumentId;
        if (this.selectedWorkflowData.enforce_workflow_order) {
          if (
            this.selectedWorkflowData.current_active_workflow ==
            this.employeeDocumentId
          ) {
            this.is_workflow_document = true;
          } else {
            this.actionRequiredDocument =
              this.selectedWorkflowData.documents.find(
                (e) =>
                  e.document_id._id ==
                  this.selectedWorkflowData.current_active_workflow
              );
            if (
              this.actionRequiredDocument &&
              this.actionRequiredDocument.document_id &&
              this.actionRequiredDocument.document_id.title
            ) {
              this.actionRequiredDocumentName =
                this.actionRequiredDocument.document_id.title;
            }
            this.is_workflow_document = false;
          }
        } else {
          this.is_workflow_document = true;
        }
        this.activeTabName = "workflow";
        await this.getCurrentWorkflowStatus();
      }
    },
    gotoActionDocument() {
      if (
        this.actionRequiredDocument &&
        this.actionRequiredDocument.document_id &&
        this.actionRequiredDocument.document_id._id
      ) {
        this.$router.push({
          name: "employee-documents-custom-document",
          params: {
            employee_document_id: this.actionRequiredDocument.document_id._id,
          },
          query: {
            workflow_id: this.workflow_data_id,
          },
        });
        setTimeout(() => {
          this.refreshDocument();
        }, 1000);
      }
    },
    async getCurrentWorkflowStatus() {
      let params = {
        email: this.getAuthenticatedUser.email,
        workflow_id: this.workflow_data_id,
        document_id: this.$route.params.employee_document_id,
      };
      await this.$store.dispatch(
        "templateWorkflow/getCurrentUserStatus",
        params
      );
      if (this.getCurrentUserStatus) {
        this.nextWorkflowDocument = this.getCurrentUserStatus.next_document;
      }
    },
    async alertEditVoidDoc() {
      if (confirm) {
        this.$confirm(
          "Are you sure you want to clone the document?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning",
          }
        ).then(() => {
          this.EditVoidDocument();
        });
      }
    },
    async EditVoidDocument() {
      let document_id = this.employeeDocumentId;
      this.loading = true;
      try {
        await this.$store.dispatch("documents/EditVoidDocument", document_id);
        if (this.getCloneVoidDocStatus && this.getCloneVoidDocData) {
          //console.log("data status",this.getCloneVoidDocData)
          let new_id = this.getCloneVoidDocData.data._id;
          //console.log("_id in voiddocdata",new_id)
          successNotification("Document cloned successfully");
          this.$router.push({
            name: "employee-documents-custom-document-edit",
            params: {
              employee_document_id: new_id,
            },
          });
        } else {
          this.$notify({
            title: "Error",
            message: "Error in cloning document",
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    selectAllEmails() {
      if (this.selectAllContacts) {
        this.contactUsers.forEach((el) => {
          this.selectedUsers.push(el.email);
        });
      } else {
        this.selectAllContactTypes = false;
        this.selectedUsers = [];
        this.selectedContactTypes = [];
      }
    },
    selectAllContactsTypes() {
      if (this.selectAllContactTypes) {
        this.contactTypes.forEach((el) => {
          this.selectedContactTypes.push(el.name);
        });
        this.contactUsers.forEach((el) => {
          this.selectedUsers.push(el.email);
        });
        this.selectAllContacts = true;
      } else {
        this.selectAllContacts = false;
        this.selectedContactTypes = [];
        this.selectedUsers = [];
      }
    },
    goToAddContacts() {
      this.$router.push({ path: "/contacts/add" });
    },
    async fetchContactTypes() {
      let params = { get_all: true };
      await this.$store.dispatch("contactTypes/fetchContactTypes", params);
      if (this.getAllContactTypes) {
        this.contactTypes = this.getAllContactTypes.data;
      }
    },
    selectContactTypeContacts() {
      // this.selectedUsers = [this.selectedUsers, ...this.currentExistedUsers];
      this.contactUsers.forEach((element) => {
        if (
          this.selectedContactTypes.indexOf(element.contact_type.name) != -1
        ) {
          this.selectedUsers.push(element.email);
        }
      });
    },
    async shareTemplateToContacts() {
      if (!this.selectedUsers.length) {
        this.$message({
          message: "Please select atleast one recipient email!",
          type: "warning",
        });
      } else {
        if (this.selectedUsers && this.selectedUsers.length) {
          let newUsers = [];
          // let existed_users = this.selectedDocumentUsers.filter(user => user.name.split("-")[0] == 'NEW_RECEIVER').flatMap(user => user.email)
          this.selectedDocumentUsers = this.selectedDocumentUsers.filter(
            (user) => user.name.split("-")[0] != "NEW_RECEIVER"
          );
          this.contactUsers.forEach((user) => {
            if (
              user &&
              user.email &&
              this.selectedUsers.indexOf(user.email) != -1
            ) {
              newUsers.push({
                default: false,
                name:
                  "NEW_RECEIVER-" +
                  parseInt(
                    this.selectedDocumentUsers.length +
                      this.selectedUsers.indexOf(user.email) +
                      1
                  ),
                value:
                  "NEW_RECEIVER_" +
                  parseInt(
                    this.selectedDocumentUsers.length +
                      this.selectedUsers.indexOf(user.email) +
                      1
                  ),
                type: "RECEIVER",
                e_signature_fields: [],
                e_signature_date_fields: [],
                e_signature_order:
                  this.selectedDocumentUsers.length +
                  this.selectedUsers.indexOf(user.email) +
                  1,
                e_signature_required: false,
                has_approval_access: false,
                color: "#0652DD",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone: user.phone || "",
                address: user.address || "",
                company_name: user.company_name || "",
                user_type: "CC",
                sent_status: true,
                is_cc: true,
                fields_required: false,
                contact_type: user.contact_type,
                contact: user,
                contact_id: user._id,
                terms_and_conditions: true,
              });
            }
          });
          this.selectedDocumentUsers = [
            ...this.selectedDocumentUsers,
            ...newUsers,
          ];
          let params = {
            document_users: this.selectedDocumentUsers,
            document_id: this.selectedDocumentId,
          };
          await this.$store.dispatch("documents/shareDocumentUsers", params);
          if (this.getUpdateDocumentUsersStatus) {
            this.$notify.success({
              title: "Success",
              message: "Changes were successfully saved",
            });
            this.$emit("reloadDashboardStats", true);
            this.resetShareDocumentData();
            // this.fetchDocuments();
          }
          this.$notify.success({
            title: "Success",
            message: "Document Shared Successfully",
          });
          window.location.reload();
        } else {
          this.selectedDocumentUsers = this.selectedDocumentUsers.filter(
            (user) => user.name.split("-")[0] != "NEW_RECEIVER"
          );
          let params = {
            document_users: this.selectedDocumentUsers,
            document_id: this.selectedDocumentId,
          };
          await this.$store.dispatch("documents/shareDocumentUsers", params);
          if (this.getUpdateDocumentUsersStatus) {
            this.$notify.success({
              title: "Success",
              message: "Changes were successfully saved",
            });
            this.$emit("reloadDashboardStats", true);
            this.resetShareDocumentData();
            // this.fetchDocuments();
          }
        }
      }
    },
    generateCertificate() {
      this.$refs.doc2Cer.generatePdf();
    },
    async originalDownload(data) {
      let url =
        this.basePdfdownloadUrl +
        data.configurable_document_data.document_upload_url;
      axios.defaults.headers.common = {
        "Access-Control-Allow-Origin": window.location.origin,
      };

      axios.defaults.headers.common = {
        "Access-Control-Allow-Origin": window.location.origin,
      };
      await fetch(url, { method: "get", responseType: "blob" })
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          var fileURL = window.URL.createObjectURL(new Blob([blob]));
          var fileLink = document.createElement("a");
          let file_name = data.title.split(".")[0];
          fileLink.href = fileURL;
          fileLink.setAttribute("download", file_name + ".pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        });

    },
    searchContact() {
      if (this.activeName == "contacts") {
        if (this.searchedContact) {
          this.searchedContacts = this.contactUsers.filter((el) =>
            el.email.includes(`${this.searchedContact}`)
          );
        }
      } else {
        if (this.searchedContact) {
          this.searchedContactTypes = this.contactTypes.filter((el) =>
            el.name.includes(`${this.searchedContact}`)
          );
        }
      }
    },
    async saveAsTemplate() {
      try {
        // params.docSett = setttng
        let params = {
          configurable_document_id:
            this.getSingleDocumentData.data.configurable_document_id,
          company_document_id:
            this.getSingleDocumentData.data.company_document_id,
          employee_document_id: this.employeeDocumentId,
          name: this.getSingleDocumentData.data.name,
        };
        await this.$store.dispatch("documents/saveAsTemplate", params);
        if (this.getDocumentSaveAsTemplate) {
          this.$notify({
            title: "Success",
            message: this.getDocumentSaveAsTemplateData.message,
            type: "success",
          });
        } else {
          this.$notify({
            title: "Error",
            message: this.getDocumentSaveAsTemplateData.message,
            type: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async shareCompletedDocument() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users
      ) {
        this.configureLoading = true;
        this.selectedDocumentUsers =
          this.getSingleDocumentData.data.document_users;
        this.selectedDocumentId = this.employeeDocumentId;
        let documentUsers = this.getSingleDocumentData.data.document_users
          .filter(
            (user) =>
              user.type != "SENDER" && user.name.split("-")[0] != "NEW_RECEIVER"
          )
          .flatMap((user) => user.email);
        await this.$store.dispatch("contacts/fetchContactUser");
        if (this.getContactUser && this.getContactUser.data) {
          this.getContactUser.data.forEach((user) => {
            if (user && user.email && documentUsers.indexOf(user.email) == -1) {
              // console.log(user)
              this.contactUsers.push(user);
            }
          });
          if (this.contactUsers) {
            this.selectedUsers = this.selectedDocumentUsers
              .filter(
                (user) =>
                  user.type != "SENDER" &&
                  user.name.split("-")[0] == "NEW_RECEIVER"
              )
              .flatMap((user) => user.email);
            this.configureLoading = false;
            this.templateShareModal = true;
          }
        }
      }
    },
    resetShareDocumentData() {
      this.selectedDocumentUsers = [];
      this.selectedDocumentId = null;
      this.selectedUsers = [];
      this.contactUsers = [];
      this.templateShareModal = false;
    },
    async archiveDocument() {
      this.$confirm("Are you sure you want to delete the document?")
        .then(async () => {
          let document_id = this.employeeDocumentId;
          await this.$store.dispatch("documents/archiveDocument", {
            document_id,
          });
          if (this.getArchiveDocumentStatus) {
            this.$notify.success({
              title: "Success",
              message: "Document deleted successfully",
            });
            this.$emit("reloadDashboardStats", true);
            this.refreshDocument();
          } else {
            this.$notify.error({
              title: "Error",
              message: "Error in deleting document",
            });
          }
        })
        .catch(() => {});
    },
    async alertvoided() {
      if (confirm) {
        this.$confirm(
          "Are you sure you want to Void the document?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning",
          }
        ).then(() => {
          this.DocumentVoid();
        });
      }
    },
    getDocumentsusers() {
      let docusers = "";
      let last_user = this.documentUsers.length - 1;
      this.documentUsers.forEach((user, i) => {
        if (user.type === "RECEIVER") {
          let sep = ",";
          if (i == last_user) {
            sep = " ";
          }
          if (user.first_name && user.last_name) {
            docusers += user.first_name + " " + user.last_name + sep;
          }
        }
      });
      return docusers;
    },
    async alertCorrectedDoc() {
      if (confirm) {
        this.$confirm(
          "Are you sure you want to correct the document?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning",
          }
        ).then(() => {
          this.correctDocument();
        });
      }
    },
    async alertUndoDoc() {
      if (confirm) {
        this.$confirm(
          "Are you sure you want to undo the deleted document?",
          "Warning",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            type: "warning",
          }
        ).then(() => {
          this.archiveDocumentundo();
        });
      }
    },
    async archiveDocumentundo() {
      let document_id = this.employeeDocumentId;
      this.loading = true;
      await this.$store.dispatch("documents/undoDocument", {
        document_id,
      });
      this.loading = false;
      if (this.getArchiveDocumentStatus) {
        this.$notify.success({
          title: "Success",
          message: "Document Undo successfully",
        });
        this.$emit("reloadDashboardStats", true);
        this.refreshDocument();
      } else {
        this.$notify.error({
          title: "Error",
          message: "Error in Undo document",
        });
      }
    },
    async permanentDocument() {
      let document_id = this.employeeDocumentId;
      this.$confirm(
        "Are you sure you want to  'Permanently Delete' , Complete data of this document ?"
      )
        .then(async () => {
          this.loading = true;
          await this.$store.dispatch("documents/parmanentdelete", {
            document_id,
          });
          this.loading = false;
          if (this.getArchiveDocumentStatus) {
            successNotification("Document Deleted Permanently");
            this.$emit("reloadDashboardStats", true);
            // this.refreshDocument();
            this.gotoDashboard();
          } else {
            errorNotification("Error in Permanent document");
          }
        })
        .catch(() => {});
    },
    async DocumentVoid() {
      let document_id = this.employeeDocumentId;
      await this.$store.dispatch("documents/voidDocument", { document_id });
      if (this.getDocumentVoidStatus) {
        this.$notify.success({
          title: "Success",
          message: "Document voided successfully",
        });
        this.$emit("reloadDashboardStats", true);
        this.refreshDocument();
      } else {
        this.$notify.error({
          title: "Error",
          message: "Error in void document",
        });
      }
    },
    getTimeZone() {
      let date1 = new Date();
      var sign = date1.getTimezoneOffset() > 0 ? "-" : "+";
      var offset = Math.abs(date1.getTimezoneOffset());
      var hours =
        Math.floor(offset / 60) < 10
          ? "0" + Math.floor(offset / 60)
          : Math.floor(offset / 60);
      var minutes = offset % 60 < 10 ? "0" + (offset % 60) : offset % 60;
      let timezoneoffset = sign + hours + ":" + minutes;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timezone + ", UTC" + timezoneoffset;
    },
    generateReport() {
      this.detailsDownload = true;
      this.$refs.html2Pdf.generatePdf();
      this.detailsDownload = false;
    },
    handleScroll() {
      let scrollbarEl = this.$refs.scrollbar.wrap;
      scrollbarEl.onscroll = () => {
        let pageBreaks = [];
        let h = 0;
        let maxLength = document.getElementById("wrapper").childNodes.length;
        for (let i = 0; i < maxLength; i++) {
          h = h + document.getElementById("wrapper").childNodes[i].height;
          pageBreaks.push(h);
        }
        let pageNumber = pageBreaks.findIndex((page, index) => {
          if (scrollbarEl.scrollTop <= page + index * 4) {
            return page;
          }
        });
        if (document.getElementById(`preview_wrapper_${pageNumber + 1}`)) {
          document.getElementById(`preview_wrapper_${pageNumber + 1}`).focus();
          this.currentActivatePage = pageNumber + 1;
          console.log("scrollbarEl.scrollTop", pageNumber);
        }
      };
    },
    async updateChangeUserContact(id, data) {
      await this.$store.dispatch("contacts/updateContact", {
        contact_id: id,
        contact: data,
      });
      if (this.getUpdateContactStatus) {
        await this.$store.dispatch("contacts/fetchContact", id);
        this.selectedContactData = this.getContact;
        this.changeDocumentUserWithContact();
      } else {
        this.changeContactLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error while updating the contact",
        });
      }
    },
    async createContact() {
      let params = {
        first_name: this.selectedRecipientuser.first_name,
        last_name: this.selectedRecipientuser.last_name,
        email: this.selectedRecipientuser.email.toLowerCase(),
        contact_type: this.selectedDocumentUser.contact_type.name,
        address: "",
        company_name: this.selectedDocumentUser.company_name,
        title: "",
        phone_number: "",
      };
      if (
        this.selectedDocumentUser.entity_data_id &&
        this.selectedDocumentUser.entity_data_id._id
      ) {
        params.account_data_id = this.selectedDocumentUser.entity_data_id._id;
      }
      await this.$store.dispatch("contacts/createContact", params);
      if (this.getCreateContactStatus && this.getCreateContactData) {
        this.selectedContactData = this.getCreateContactData;
        this.changeDocumentUserWithContact();
      } else {
        this.changeContactLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error while creating the contact",
        });
      }
    },
    async changeDocumentUserWithContact() {
      let index = this.documentUsers.findIndex(
        (x) =>
          x.email.toLowerCase() == this.selectedDocumentUser.email.toLowerCase()
      );
      this.documentUsers[index]["first_name"] =
        this.selectedRecipientuser.first_name;
      this.documentUsers[index]["last_name"] =
        this.selectedRecipientuser.last_name;
      this.documentUsers[index]["email"] =
        this.selectedRecipientuser.email.toLowerCase();
      this.documentUsers[index]["contact"] = this.selectedContactData._id;
      this.documentUsers[index]["address"] = this.selectedContactData.address
        ? this.selectedContactData.address
        : "";
      this.documentUsers[index]["phone"] = this.selectedContactData.phone_number
        ? this.selectedContactData.phone_number
        : "";
      this.documentUsers[index]["title"] = this.selectedContactData.title
        ? this.selectedContactData.title
        : "";
      this.documentUsers[index]["terms_and_conditions"] = false;
      this.documentUsers[index]["company_name"] = this.selectedContactData
        .company_name
        ? this.selectedContactData.company_name
        : "";
      if (
        this.selectedContactData.account_data_id &&
        this.selectedContactData.account_data_id._id
      ) {
        this.documentUsers[index]["entity_data_id"] =
          this.selectedContactData.account_data_id._id;
        let params = {
          entity_data_ids: [this.selectedContactData.account_data_id._id],
        };
        await this.$store.dispatch(
          "templatesData/fetchUserTemplateData",
          params
        );
      }
      let allTemplatesData = {};
      this.documentUsers[index]["contact_id"] = this.selectedContactData._id;
      let valueUser = this.documentUsers[index]["value"];
      if (this.getTemplatesData && this.getTemplatesData.length) {
        const seletedUserTemplateData = this.getTemplatesData.filter(
          (e) =>
            this.selectedContactData.account_data_id &&
            e.entity_data_id == this.selectedContactData.account_data_id._id
        );
        seletedUserTemplateData.forEach((e) => {
          allTemplatesData[valueUser + "-" + e.template_id] = e.template_data;
        });
      }
      let document_id = this.$route.params.employee_document_id;
      this.elements.map((el) => {
        if (el && el.selected_user && el.selected_user == valueUser) {
          el.content = this.selectedContactData[el.selected_tag];
          if (el.selected_tag == "first_name") {
            el.content = this.selectedRecipientuser.first_name;
          }
          if (el.selected_tag == "last_name") {
            el.content = this.selectedRecipientuser.last_name;
          }
          if (el.selected_tag == "phone") {
            el.content = this.selectedContactData["phone_number"];
          }
          if (el.selected_tag == "full_name") {
            el.content = "";
          }
        }
        if (
          el.filled_by == valueUser &&
          (el.type == "SIGNATURE" || el.type == "INITIAL")
        ) {
          el.source = "";
        }
        if (
          el.template_id &&
          this.selectedDocumentUser.value == el.selected_user
        ) {
          let rawKey = el.key.split("-")[0] + "-" + el.template_id;
          if (allTemplatesData[rawKey] && el.key.split("-")) {
            let value = allTemplatesData[rawKey][el.key.split("-")[1]];
            if (value) {
              el.value = value;
            } else {
              el.value = "";
            }
          } else {
            el.value = "";
          }
        }
      });
      // this.documentFormData = this.documentFormData.toObject();
      let newDoc = Object.assign({}, this.documentFormData);
      newDoc.pages[0].fields = this.elements;
      let data = {};
      this.elements.forEach((element) => {
        if (element && element.value && element.type != "PRIMARY_FIELDS") {
          data[element.key] = element.value;
        } else if (element && element.source) {
          data[element.key] = element.source;
        } else if (element && element.files && element.files.length) {
          data[element.key] = element.files;
        } else if (element && element.content) {
          data[element.key] = element.content;
        } else {
          data[element.key] = "";
        }
      });
      let params = {
        document_users: this.documentUsers,
        document_id: document_id,
        document_data: data,
        configurable_document_data: newDoc,
      };
      // if (this.documentUsers[index]["sent_status"]) {
      //   params.current_active_user =
      //     this.selectedRecipientuser.email.toLowerCase();
      // }
      params.is_change_user = true;
      params.contact_id = this.selectedContactData._id;
      await this.$store.dispatch("documents/shareDocumentUsers", params);
      if (this.getUpdateDocumentUsersStatus) {
        if (this.documentUsers[index]["sent_status"]) {
          let params = {
            document_id: document_id,
            contact_id: this.selectedContactData._id,
            is_new_user: true,
          };
          if (this.workflow_data_id) {
            params.workflow_data_id = this.workflow_data_id;
          }
          this.esignLoading = true;
          await this.$store.dispatch(
            "documents/resendDocumentLinkToContact",
            params
          );
          this.esignLoading = false;
          if (this.getResendDocumentStatus) {
            this.$notify.success({
              title: "Success",
              message: "Document link sent successfully",
            });
          }
        }
        this.$notify.success({
          title: "Success",
          message: "User changed successfully",
        });
        this.changeContactLoading = false;
        this.refreshDocument();
      } else {
        let error_message = this.getUpdateDocumentUsersErrors
          ? this.getUpdateDocumentUsersErrors
          : "Error while changing the user";
        this.$notify.error({
          title: "Error",
          message: error_message,
        });
        this.changeContactLoading = false;
        this.refreshDocument();
        // this.$notify.error({
        //   title: "Error",
        //   message: "Error while changing the user",
        // });
      }
    },
    chechAndUpdateUser() {
      this.changeContactLoading = true;
      this.changeRecipientUserErrors.email = "";
      this.changeRecipientUserErrors.first_name = "";
      this.changeRecipientUserErrors.last_name = "";
      let firstNameRe = /[a-zA-Z]{1,}/ || /(?:[A-Za-z].*?\d|\d.*?[A-Za-z]){1,}/;
      let re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        re.test(this.selectedRecipientuser.email) &&
        firstNameRe.test(this.selectedRecipientuser.first_name) &&
        this.selectedRecipientuser.last_name.length &&
        this.allDocumentUsers.indexOf(this.selectedRecipientuser.email) == -1
      ) {
        let contactUser = this.getAllContacts.data.find(
          (el) =>
            el.email.toLowerCase() ==
            this.selectedRecipientuser.email.toLowerCase()
        );
        if (contactUser) {
          let isStandardContact =
            contactUser.contact_type &&
            contactUser.contact_type.type == "STANDARD" &&
            contactUser.contact_type.slug == "receiver"
              ? true
              : false;
          if (
            this.isStandardEntity ||
            (contactUser.contact_type &&
              this.selectedRecipientEntity._id ==
                contactUser.contact_type._id) ||
            isStandardContact
          ) {
            if (
              (this.selectedDocumentUser.entity_data_id &&
                contactUser.account_data_id &&
                this.selectedDocumentUser.entity_data_id._id ==
                  contactUser.account_data_id._id) ||
              this.isStandardEntity
            ) {
              this.selectedContactData = contactUser;
              this.changeDocumentUserWithContact();
            } else {
              let updateContactData = {
                contact_type: this.selectedDocumentUser.contact_type.name,
                company_name: this.selectedDocumentUser.company_name,
                contactType: this.selectedRecipientEntity.entity_type,
                email: this.selectedRecipientuser.email,
                contact_id: contactUser._id,
                first_name: this.selectedRecipientuser.first_name,
                last_name: this.selectedRecipientuser.last_name,
              };
              if (
                this.selectedDocumentUser.entity_data_id &&
                this.selectedDocumentUser.entity_data_id._id
              ) {
                updateContactData.account_data_id =
                  this.selectedDocumentUser.entity_data_id._id;
              }
              this.updateChangeUserContact(contactUser._id, updateContactData);
            }
          } else {
            if (this.selectedRecipientEntity.name) {
              this.changeRecipientUserErrors.email =
                "Selected contact not associated with " +
                this.selectedRecipientEntity.name;
            } else {
              this.changeRecipientUserErrors.email =
                "Selected contact not associated with contact type in document";
            }
            this.selectedRecipientuser.email = "";
          }
        } else {
          this.createContact();
        }
      } else {
        this.changeContactLoading = false;
        if (!re.test(this.selectedRecipientuser.email)) {
          this.changeRecipientUserErrors.email = "Please enter valid email";
        }
        if (!firstNameRe.test(this.selectedRecipientuser.first_name)) {
          this.changeRecipientUserErrors.first_name = "Please enter valid Name";
        }
        if (!this.selectedRecipientuser.last_name.length) {
          this.changeRecipientUserErrors.last_name = "Last name required";
        }
        if (
          this.allDocumentUsers.indexOf(this.selectedRecipientuser.email) != -1
        ) {
          this.changeRecipientUserErrors.email =
            "This email is already in document";
        }
      }
    },
    resetChangeDocumentuser() {
      this.selectedRecipientuser.email = "";
      this.selectedRecipientuser.first_name = "";
      this.selectedRecipientuser.last_name = "";
      this.changeRecipientUserErrors.email = "";
      this.changeRecipientUserErrors.first_name = "";
      this.changeRecipientUserErrors.last_name = "";
      this.availableContacts = [];
      this.viewDocumentRecipient = true;
      this.isBusinessEntity = false;
      this.isStandardEntity = false;
      this.isIndividualEntity = false;
      this.selectedRecipientEntity = null;
      this.changeContactLoading = false;
      this.selectedDocumentUser = null;
      this.changeRecipientUserModal = false;
    },
    async changeDocumentUser(contact) {
      await this.$store.dispatch("contacts/fetchAllContacts", {
        get_all: true,
      });
      this.selectedRecipientEntity = contact.contact_type;
      this.isStandardEntity =
        this.selectedRecipientEntity &&
        this.selectedRecipientEntity.type == "STANDARD" &&
        this.selectedRecipientEntity.slug == "receiver"
          ? true
          : false;
      this.isBusinessEntity =
        this.selectedRecipientEntity &&
        this.selectedRecipientEntity.entity_type == "BUSINESS"
          ? true
          : false;
      this.isIndividualEntity =
        this.selectedRecipientEntity &&
        this.selectedRecipientEntity.entity_type == "INDIVIDUAL"
          ? true
          : false;
      this.selectedDocumentUser = contact;
      this.selectedRecipientuser.email =
        this.selectedDocumentUser.email.toLowerCase();
      this.selectedRecipientuser.first_name =
        this.selectedDocumentUser.first_name;
      this.selectedRecipientuser.last_name =
        this.selectedDocumentUser.last_name;
      if (
        this.getAllContacts &&
        this.getAllContacts.data &&
        this.documentUsers
      ) {
        this.allDocumentUsers = this.documentUsers
          .filter(
            (user) =>
              user &&
              user.email.toLowerCase() !=
                this.selectedDocumentUser.email.toLowerCase()
          )
          .flatMap((el) => el.email);
        this.getAllContacts.data.forEach((user) => {
          if (
            user &&
            user.email &&
            this.allDocumentUsers.indexOf(user.email) == -1 &&
            (this.isStandardEntity ||
              (user.contact_type &&
                user.contact_type._id == this.selectedRecipientEntity._id))
          ) {
            this.availableContacts.push(user);
          }
        });
      }
      this.changeRecipientUserModal = true;
      this.viewDocumentRecipient = false;
    },
    historyLenghthCheck() {
      if (window.history.length && window.history.length > 1) {
        return true;
      } else {
        return false;
      }
    },
    copyLinkToShare(contact) {
      let document_id = this.$route.params.employee_document_id;
      let contact_id = contact.contact_id._id;
      let url = appConfig.APP_URL;
      // if (process.env.VUE_APP_STAGE == "DEV") {
      //   url = "https://dev.esigns.io";
      // } else if (process.env.VUE_APP_STAGE == "APP") {
      //   url = "https://app.esigns.io";
      // }
      url += `/emp-documents/preview/${document_id}/pp/vp/${contact_id}`;
      if (this.workflow_data_id) {
        console.log("worflsl", this.workflow_data_id);
        url += `?workflow_id=${this.workflow_data_id}`;
      }
      var inp = document.createElement("input");
      document.body.appendChild(inp);
      inp.value = url;
      inp.select();
      document.execCommand("copy", false);
      inp.remove();
      this.$message({
        message: "Link copied successfully!",
        type: "success",
      });
    },
    async openSampleAttachments(url, title) {
      this.downloadPdfFile(this.basePdfdownloadUrl + url, title);
    },
    async renderAttachments(url, canvasContainer) {
      //rendering pdf pages as canvases in a div
      console.log(canvasContainer);
      let scale = 1;
      let that = this;
      function renderPage(page) {
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvasContainer.appendChild(canvas);
        page.render(renderContext);
      }
      function renderPages(pdfDoc) {
        for (var num = 1; num <= pdfDoc.numPages; num++)
          pdfDoc.getPage(num).then(renderPage);
        that.previewAttachmentLoading = false;
      }

      pdfjsLib.disableWorker = true;
      let random = (Math.random() + 1).toString(36).substring(7);
      url += `?view=${random}`;
      pdfjsLib.getDocument(url).then(renderPages);
    },
    resetSampleAttachments() {
      this.previewAttachmentUrl = "";
      this.previewAttachments = false;
      this.previewAttachmentTitle = "";
    },
    testing_fields(index) {
      console.log(this.elements[index]);
    },
    finish_drawer() {
      if (
        parseInt(this.getCurrentUserFieldsCount()) ==
        parseInt(this.getCompletedFieldsCount())
      ) {
        return true;
      } else {
        return false;
      }
    },
    downloadAlldocuments() {
      let allDOcuments = this.getAllCompletedDocuments();

      if (allDOcuments && allDOcuments.length) {
        allDOcuments.forEach((e) => {
          this.downloadCompletedDocumentForUser(e);
        });
      }
      let allAttachments = this.attachmentsFiles();
      if (allAttachments && allAttachments.length) {
        allAttachments.forEach((el) => {
          let url = this.basePdfdownloadUrl + el.attachment_url;
          this.downloadPdfFile(url, el.title);
        });
      }
    },
    downloadAttachment(data) {
      console.log("-=-=-=-=-=", data);
      let url = this.basePdfdownloadUrl + data.attachment_url;
      this.downloadPdfFile(url, data.title);
    },
    async downloadPdfFile(url, name) {
      axios.defaults.headers.common = {
        "Access-Control-Allow-Origin": window.location.origin,
      };

      axios.defaults.headers.common = {
        "Access-Control-Allow-Origin": window.location.origin,
      };
      await fetch(url, { method: "get", responseType: "blob" })
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          var fileURL = window.URL.createObjectURL(new Blob([blob]));
          var fileLink = document.createElement("a");
          let file_name = name.split(".")[0];
          fileLink.href = fileURL;
          fileLink.setAttribute("download", file_name + ".pdf");
          document.body.appendChild(fileLink);

          fileLink.click();
        });

    },
    async gotoMainDocument() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_completed_url
      ) {
        let url = "";
        let urlSliptArray =
          this.getSingleDocumentData.data.document_completed_url.split("/");
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          url = `${this.basePdfdownloadUrl}/${process.env.VUE_APP_APP_TYPE}${this.getSingleDocumentData.data.document_completed_url}`;
        } else {
          url = `${this.basePdfdownloadUrl}${this.getSingleDocumentData.data.document_completed_url}`;
        }
        axios.defaults.headers.common = {
          "Access-Control-Allow-Origin": window.location.origin,
        };

        axios.defaults.headers.common = {
          "Access-Control-Allow-Origin": window.location.origin,
        };
        await fetch(url, { method: "get", responseType: "blob" })
          .then((res) => res.blob()) // Gets the response and returns it as a blob
          .then((blob) => {
            var fileURL = window.URL.createObjectURL(new Blob([blob]));
            var fileLink = document.createElement("a");
            let file_name = this.getSingleDocumentData.data.title.split(".")[0];
            fileLink.href = fileURL;
            fileLink.setAttribute("download", file_name + ".pdf");
            document.body.appendChild(fileLink);

            fileLink.click();
          });
      }
    },
    async gotoAttachment(file) {
      if (file && file.attachment_url) {
        let url = this.basePdfdownloadUrl + file.attachment_url;
        axios.defaults.headers.common = {
          "Access-Control-Allow-Origin": window.location.origin,
        };

        axios.defaults.headers.common = {
          "Access-Control-Allow-Origin": window.location.origin,
        };
        await fetch(url, { method: "get", responseType: "blob" })
          .then((res) => res.blob()) // Gets the response and returns it as a blob
          .then((blob) => {
            var fileURL = window.URL.createObjectURL(new Blob([blob]));
            var fileLink = document.createElement("a");
            let file_name = file.title.split(".")[0];
            fileLink.href = fileURL;
            fileLink.setAttribute("download", file_name + ".pdf");
            document.body.appendChild(fileLink);

            fileLink.click();
          });
      }
    },
    getAllCompletedDocuments() {
      let allUrlsData = [];
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "COMPLETED"
      ) {
        let allUrls =
          this.getSingleDocumentData.data.document_completed_urls &&
          this.getSingleDocumentData.data.document_completed_urls.length
            ? this.getSingleDocumentData.data.document_completed_urls
            : [this.getSingleDocumentData.data.document_completed_url];

        let names =
          this.getSingleDocumentData.data.document_names &&
          this.getSingleDocumentData.data.document_names.length
            ? this.getSingleDocumentData.data.document_names
            : [this.getSingleDocumentData.data.name || "document.pdf"];
        allUrls.forEach((el, i) => {
          if (names.length) {
            allUrlsData.push({
              name: names[i],
              url: el,
            });
          }
        });
        this.getSingleDocumentData.data.printed_doc_url.forEach((el, index) => {
          let obj = {
            name: "Signed on paper" + " " + index + 1 + ".pdf",
            url: el,
          };
          allUrlsData.push(obj);
        });
      }
      return allUrlsData;
    },
    attachmentsFiles() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.document_data &&
        this.getSingleDocumentData.data.configurable_document_data.pages &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
        this.getSingleDocumentData.data.configurable_document_data.pages[0]
          .fields
      ) {
        let result = [];
        let currentUser = this.getCurrentAuthUser();
        let attachments = [];
        if (currentUser && currentUser.type && currentUser.type == "SENDER") {
          attachments =
            this.getSingleDocumentData.data.configurable_document_data.pages[0].fields
              .filter((field) => field.type == "ATTACHMENT")
              .flatMap((el) => el.key);
        } else {
          attachments =
            this.getSingleDocumentData.data.configurable_document_data.pages[0].fields
              .filter(
                (field) =>
                  field.type == "ATTACHMENT" &&
                  currentUser &&
                  currentUser.value &&
                  (currentUser.value == field.filled_by ||
                    field.filled_by == "SENDER")
              )
              .flatMap((el) => el.key);
        }
        attachments.forEach((el) => {
          if (
            this.getSingleDocumentData.data.document_data[el] &&
            this.getSingleDocumentData.data.document_data[el].length
          ) {
            result = [
              ...result,
              ...this.getSingleDocumentData.data.document_data[el],
            ];
          }
        });
        return result;
      }
    },
    closeAttachmentDialog() {
      this.allAttachments = [];
      this.captureAttachment = false;
    },
    resetAttachments() {
      this.allAttachments = [];
      this.attachmentErrors = "";
      this.captureAttachment = false;
    },
    addAttachments() {
      if (this.selectedSignatureItem.required) {
        if (this.selectedSignatureItem.requiredFiles) {
          if (
            this.allAttachments.length >=
            this.selectedSignatureItem.requiredFiles
          ) {
            this.elements[this.selectedSignatureItemIndex].files = [];
            this.elements[this.selectedSignatureItemIndex].files = [
              ...this.elements[this.selectedSignatureItemIndex].files,
              ...this.allAttachments,
            ];
            this.allAttachments = [];
            this.captureAttachment = false;
          } else {
            let requiredFileCount =
              this.selectedSignatureItem.requiredFiles -
              this.allAttachments.length;
            this.attachmentErrors = `${requiredFileCount} more ${
              requiredFileCount == 1 ? "file is" : "files are"
            } required`;
          }
        } else {
          this.elements[this.selectedSignatureItemIndex].files = [];
          this.elements[this.selectedSignatureItemIndex].files = [
            ...this.elements[this.selectedSignatureItemIndex].files,
            ...this.allAttachments,
          ];
          this.allAttachments = [];
          this.captureAttachment = false;
        }
      } else {
        this.elements[this.selectedSignatureItemIndex].files = [];
        this.elements[this.selectedSignatureItemIndex].files = [
          ...this.elements[this.selectedSignatureItemIndex].files,
          ...this.allAttachments,
        ];
        this.allAttachments = [];
        this.captureAttachment = false;
      }
    },
    removeAttachment(i) {
      this.allAttachments.splice(i, 1);
    },
    async attachFiles(file) {
      try {
        this.attachmentLoading = true;
        var formData = new FormData();
        formData.append("uploadedFiles", file.raw);

        let companyId =
          this.getActiveWorkspace && this.getActiveWorkspace.company_id
            ? this.getActiveWorkspace.company_id
            : this.getAuthenticatedUser._id;
        let params = {
          data: formData,
          companyId: companyId,
        };
        console.log("formData", params);
        await this.$store.dispatch("fileUpload/uploadFilesToConvertv4", params);
        if (
          this.getUploadFileDataStatus &&
          this.getUploadFileDataStatus.length
        ) {
          let tempUrl = [];
          this.getUploadFileDataStatus.forEach((file) => {
            if (file.url.includes(appConfig.S3_BUCKET_URL)) {
              tempUrl.push(file.url.replace(appConfig.S3_BUCKET_URL, ""));
            } else {
              tempUrl.push(file.url);
            }
          });
          this.selectedAttachmentFile.attachment_url = tempUrl[0];
          this.selectedAttachmentFile.title = file.raw.name;
          let obj = {
            document_name: this.selectedAttachmentFile.document_name,
            attachment_url: this.selectedAttachmentFile.attachment_url,
            valid_from: this.selectedAttachmentFile.valid_from,
            document_number: this.selectedAttachmentFile.document_number,
            expires_on: this.selectedAttachmentFile.expires_on,
            title: this.selectedAttachmentFile.title,
            description: this.selectedAttachmentFile.description,
          };
          this.allAttachments.push(obj);
          this.attachmentErrors = "";
          this.attachmentLoading = false;
        } else {
          this.logoError = "Error in uploading file. Please try again..";
        }
      } catch (err) {
        console.log(err);
        this.attachmentLoading = false;
      }
      // this.resetSelectedAttachmentFile();
    },
    resetSelectedAttachmentFile() {
      this.selectedAttachmentFile.document_name = "";
      this.selectedAttachmentFile.attachment_url = "";
      this.selectedAttachmentFile.valid_from = "";
      this.selectedAttachmentFile.document_number = "";
      this.selectedAttachmentFile.expires_on = "";
      this.selectedAttachmentFile.title = "";
      this.selectedAttachmentFile.description = "";
    },
    uploadFile(file) {
      if (file.size < 10000000) {
        this.attachFiles(file);
      } else {
        this.$message.error("Large file.Maximum upload file size: 10 MB");
      }
    },

    checkToUploadDocument(file) {
      if (file.size < 10000000) {
        // this.printloading = true;
        // this.uploadSingleFile(file);
        this.files.push(file);
      } else {
        this.$message("Large file. Please select a file below 10mb.");
      }
    },
    checkForMergeOrUpload() {
      if (this.files && this.files.length == 1) {
        this.uploadSingleFile();
      } else {
        this.mergeAllDocs();
      }
    },
    async uploadSingleFile(file) {
      try {
        this.printloading = true;
        this.loadingText = "Uploading Document...";
        var formData = new FormData();
        formData.append("uploadedFiles", file.raw);
        this.files.forEach((file, index) => {
          if (index == 0) {
            this.fieldsFormUpload.selectedFile =
              file.raw !== undefined ? file.raw : file;
            this.fieldsFormUpload.selectedFileName =
              file.raw !== undefined ? file.raw.name : file.name;
            this.fieldsFormUpload.title =
              file.raw !== undefined ? file.raw.name : file.name;
          }
          formData.append(
            "uploadedFiles",
            file.raw !== undefined ? file.raw : file
          );
        });
        await this.$store.dispatch("fileUpload/uploadFilesToConvert", formData);
        if (this.getUploadFileDataStatus) {
          this.printed_doc_url = this.getUploadFileDataStatus.url;
          this.printloading = false;
        } else {
          this.logoError = "Error in uploading file. Please try again..";
        }
      } catch (err) {
        this.loading = false;
      }
    },
    async mergeAllDocs() {
      try {
        this.replaceDocumentLoading = true;
        var formData = new FormData();
        this.files.forEach((file, index) => {
          if (index == 0) {
            this.fieldsFormUpload.selectedFile =
              file.raw !== undefined ? file.raw : file;
            this.fieldsFormUpload.selectedFileName =
              file.raw !== undefined ? file.raw.name : file.name;
            this.fieldsFormUpload.title =
              file.raw !== undefined ? file.raw.name : file.name;
          }
          formData.append(
            "uploadedFiles",
            file.raw !== undefined ? file.raw : file
          );
        });
        let companyId =
          this.getActiveWorkspace && this.getActiveWorkspace.company_id
            ? this.getActiveWorkspace.company_id
            : this.getAuthenticatedUser._id;
        let params = {
          data: formData,
          companyId: companyId,
        };
        await this.$store.dispatch("fileUpload/uploadUserDocxFilev4", params);
        if (this.getUploadFileDataStatus) {
          let tempUrl = "";
          if (
            this.getUploadFileDataStatus.url.includes(appConfig.S3_BUCKET_URL)
          ) {
            tempUrl = this.getUploadFileDataStatus.url.replace(
              appConfig.S3_BUCKET_URL,
              ""
            );
          } else {
            tempUrl = this.getUploadFileDataStatus.url;
          }
          this.printed_doc_url = tempUrl;
          this.is_print = true;
          this.is_finish = true;
          if (this.checkApproveAccess) {
            this.userApproveDocument();
          } else {
            this.finishDocument();
          }
        } else {
          this.logoError = "Error in uploading file. Please try again..";
        }
      } catch (err) {
        this.replaceDocumentLoading = false;
      }
    },
    async ReturnDocument(file) {
      try {
        this.uploadDocOnLoading = true;
        var formData = new FormData();
        formData.append("uploadedFiles", file.raw);

        let tempUrl = this.document_url_path.split("/");
        formData.append("doc_company_id", tempUrl[2]);
        await this.$store.dispatch("fileUpload/uploadFilesToConvert", formData);
      } catch (err) {
        console.log(err);
        this.uploadDocOnLoading = false;
      }
    },
    captureAttachmentMethod(item, index) {
      if (this.checkFieldAllow(item)) {
        return;
      }
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.allAttachments = [];
      this.allAttachments = this.selectedSignatureItem.files;
      this.sampleAttachments = this.selectedSignatureItem.sample_files;
      this.captureAttachment = true;
    },
    resetTermsAndPrivacy() {
      this.isTermsConditionsActive = false;
      this.terms_and_conditions_dialog = false;
    },
    displayTermsAndConditions() {
      this.isTermsConditionsActive = true;
      this.terms_and_conditions_dialog = true;
    },
    displayPrivacyPolicy() {
      this.terms_and_conditions_dialog = true;
    },
    async updateUserTermsAndConditions() {
      this.acceptLoading = true;
      let employeeDocumentIds = [];
      if (
        this.selectedWorkflowData &&
        this.selectedWorkflowData.documents &&
        this.selectedWorkflowData.documents.length
      ) {
        this.selectedWorkflowData.documents.forEach((e) => {
          employeeDocumentIds.push(e.document_id._id);
        });
      } else {
        employeeDocumentIds.push(this.$route.params.employee_document_id);
      }
      let params = {
        employeeDocumentIds: employeeDocumentIds,
      };
      await this.$store.dispatch("documents/updateDocumentUserTerms", params);
      if (this.getDocumentUserTermsUpdate) {
        // this.getAllDocLogs();
        this.isCurrentUserHasAccepted = true;
        this.starting_drawer_visible = false;
        this.goToNextField();
        this.acceptLoading = false;
      } else {
        this.$notify.error({
          title: "Error",
          message: "Error while updating the terms and conditions",
        });
        this.acceptLoading = false;
      }
    },
    checkTermsAndConditions() {
      if (!this.isCurrentUserHasAccepted) {
        this.starting_drawer_visible = true;
      } else {
        this.starting_drawer_visible = false;
      }
    },
    isUserAcceptTerms() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        this.getSingleDocumentData.data.document_status != "COMPLETED" &&
        this.getSingleDocumentData.data.document_status != "VOIDED" &&
        this.getSingleDocumentData.data.document_status != "EXPIRED" &&
        this.getSingleDocumentData.data.document_status != "DECLINED" &&
        this.getSingleDocumentData.data.document_status != "DRAFT" &&
        this.getSingleDocumentData.data.document_users &&
        this.currentAuthUserEmail
      ) {
        let currentUser = this.getSingleDocumentData.data.document_users.find(
          (x) => x && x.email.toLowerCase() === this.currentAuthUserEmail
        );
        if (
          currentUser &&
          !currentUser.terms_and_conditions &&
          currentUser.user_type != "CC" &&
          currentUser.type == "RECEIVER"
        ) {
          this.starting_drawer_visible = true;
        }
      }
    },
    letTesting() {
      let maxLength = document.getElementById("wrapper").childNodes.length;
      console.log(maxLength);
      let pageBreaks = [];
      let h = 0;
      for (let i = 0; i < maxLength; i++) {
        h = h + document.getElementById("wrapper").childNodes[i].height;
        console.log(document.getElementById("wrapper").childNodes[i].height);
        pageBreaks.push(h);
      }
      console.log(pageBreaks);
    },
    resendCorrectedDoc() {
      let id =
        this.$route.params.employee_document_id || this.employeeDocumentId;
      this.$router.push({
        name: "employee-documents-custom-document-edit",
        params: {
          employee_document_id: id,
        },
      });
    },
    isLoginedUser() {
      return false;
    },
    gotoSignIn() {
      this.$router.push({
        path: "/signin",
      });
    },
    gotoDashboard() {
      this.$router.push({
        path: "/dashboard",
      });
    },
    async correctDocument() {
      try {
        let id =
          this.$route.params.employee_document_id || this.employeeDocumentId;
        await this.$store.dispatch("documents/correctDocument", id);
        if (this.getDocumentCorrectStatus) {
          successNotification("Document is corrected successfully");
          this.$router.push({
            name: "employee-documents-custom-document-edit",
            params: {
              employee_document_id: id,
            },
          });
        } else {
          let error_message = this.getDocumentCorrectErrors
            ? this.getDocumentCorrectErrors
            : "Error while correcting the document";
          this.$notify.error({
            title: "Error",
            message: error_message,
          });
          this.$emit("reloadDashboardStats", true);
          this.fetchDocuments();
        }
      } catch (err) {
        console.log(err);
      }
    },
    isCurrentUserIsApprovalOrNotForFinish() {
      let currentUser = this.documentUsers.find(
        (x) =>
          (x.user_id &&
            x.user_id.email.toLowerCase() === this.currentAuthUserEmail) ||
          (x.contact_id &&
            x.contact_id.email.toLowerCase() === this.currentAuthUserEmail)
      );
      if (this.getSingleDocumentData.data.document_status == "COMPLETED") {
        return false;
      } else {
        if (currentUser && currentUser.has_approval_access) {
          if (
            this.getSingleDocumentData.data.document_approval_status ==
            "APPROVED"
          ) {
            return true;
          }
        } else {
          if (
            this.getSingleDocumentData.data.document_status == "SENT" ||
            this.getSingleDocumentData.data.document_status == "APPROVED"
          ) {
            return true;
          }
        }
      }
    },
    async generateCompletedDocumentForUser(doc) {
      this.downloadButtonLoading = true;
      let url = "";
      let urlSliptArray = doc.url.split("/");
      if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
        url = `${this.basePdfdownloadUrl}/${process.env.VUE_APP_APP_TYPE}${doc.url}`;
      } else {
        url = `${this.basePdfdownloadUrl}${doc.url}`;
      }
      await fetch(url, {
        method: "GET",
        responseType: "blob",
      })
        .then((res) => res.blob())
        .then((response) => {
          var fileURL = window.URL.createObjectURL(response);
          var fileLink = document.createElement("a");
          let file_name = doc.name.split(".")[0];
          fileLink.href = fileURL;
          fileLink.setAttribute("download", file_name + ".pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
          this.downloadButtonLoading = false;
        });
    },
    async downloadBoth(docs) {
      this.downloadCompletedDocumentForUser(docs);
      this.generateCertificate();
    },
    async downloadCompletedDocumentForUser(doc) {
      console.log(doc);
      this.downloadButtonLoading = true;
      if (doc.url) {
        let url = "";
        let urlSliptArray = doc.url.split("/");
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          url = `${this.basePdfdownloadUrl}/${process.env.VUE_APP_APP_TYPE}${doc.url}`;
        } else {
          url = `${this.basePdfdownloadUrl}${doc.url}`;
        }
        await fetch(url, {
          method: "GET",
          responseType: "blob",
        })
          .then((res) => res.blob())
          .then((response) => {
            var fileURL = window.URL.createObjectURL(response);
            var fileLink = document.createElement("a");
            let file_name = doc.name.split(".")[0];
            fileLink.href = fileURL;
            fileLink.setAttribute("download", file_name + ".pdf");
            document.body.appendChild(fileLink);
            fileLink.click();
            this.downloadButtonLoading = false;
          });
      } else {
        this.isRedownloading = true;

        this.$message({
          message: "Generating your document...",
          type: "warning",
        });
        this.downloadCompletedDocument();
      }
    },
    async downloadDocumentForPrint(urls) {
      this.printloading = true;
      this.loadingText = "Document completion is in progress...";
      if (urls && urls.length) {
        urls.forEach(async (e, i) => {
          let name =
            this.getSingleDocumentData.data &&
            this.getSingleDocumentData.data.document_names &&
            this.getSingleDocumentData.data.document_names[i]
              ? this.getSingleDocumentData.data.document_names[i]
              : this.documentName;
          await this.generateCompletedDocumentForUser({ url: e, name: name });
        });
      }
      this.printloading = false;
      //copy
    },
    async downloadCompletedDocument() {
      try {
        this.printedDocuments = [];
        for (let i = 0; i < this.document_url_paths.length; i++) {
          let doc = this.document_url_paths[i];
          let urlSliptArray = doc.split("/");
          let tempUrl = "";
          if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
            tempUrl = `/${process.env.VUE_APP_APP_TYPE}${doc}`;
          } else {
            tempUrl = doc;
          }
          let url = this.basePdfdownloadUrl + tempUrl;
          let documentDiv = document.getElementById(`wrapper_${i}`);
          if (documentDiv) {
            let docElements = this.elements.filter((e) => {
              if (
                e &&
                e.y > documentDiv.offsetTop &&
                e.y < documentDiv.offsetHeight + documentDiv.offsetTop
              ) {
                return e;
              }
            });
            await this.getCompletedDocument(url, docElements, i);
            if (
              (i + 1 == this.document_url_paths.length &&
                this.completedDocuments.length) ||
              (i + 1 == this.document_url_paths.length &&
                this.printedDocuments.length)
            ) {
              if (this.is_completed || this.isRedownloading) {
                this.updateDocumentDownloadUrl(this.completedDocuments);
              } else {
                this.downloadDocumentForPrint(this.printedDocuments);
                this.documentDataLoading = false;
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    userApproveDocumentConfirm() {
      let isAllFieldsFilled = this.optionalFieldsCount();
      if (isAllFieldsFilled) {
        this.$confirm(
          "Optional fields need to be filled. Are you sure to approve the document?"
        )
          .then(() => {
            this.userApproveDocument();
          })
          .catch(() => {});
      } else {
        this.userApproveDocument();
      }
    },
    async userApproveDocument() {
      try {
        this.is_completed = true;
        this.approveBotton = true;
        let data = this.prepareDocumentData();
        if (
          this.documentSettings &&
          this.documentSettings.update_entity_data == 1
        ) {
          this.updateCurrentUserEntityData(this.documentUsers);
        }
        this.updateContactsWithDocumentData();
        let configurableDocumentData = this.prepareFields();
        await this.$store.dispatch("employeeDocuments/approveUserDocument", {
          document_id: this.$route.params.employee_document_id,
          params: {
            document_data: data,
            is_finish: this.is_finish,
            is_print: this.is_print,
            configurable_document_data: configurableDocumentData,
          },
        });

        if (this.getDocumentApprovalStatus) {
          this.successNotify("Document approved successfully");
          // this.refreshDocument();
          //  this.refreshDocument();
          if (
            this.getDocumentCompletedAfterApproval &&
            this.getDocumentCompletedAfterApproval.data &&
            this.getDocumentCompletedAfterApproval.data.document_completed
          ) {
            // let checkUpdateContacts = await this.checkUpdateContacts();
            // if (checkUpdateContacts) {
            //   await this.updateContactsWithDocumentData();
            // }
            if (
              this.documentSettings &&
              this.documentSettings.update_entity_data == 0
            ) {
              this.updateCurrentUserEntityData(this.documentUsers);
              // this.updateContactsWithDocumentData();
            }
            if (this.getDocumentCompletedAfterApproval.data.document_data) {
              this.setNewElementsData(
                this.getDocumentCompletedAfterApproval.data.document_data
              );
            }
            this.downloadCompletedDocument();
          } else {
            if (this.nextWorkflowDocument) {
              this.goToNextDocument();
            } else {
              this.refreshDocument();
            }
          }
        } else {
          if (
            this.getDocumentApprovalErrors &&
            this.getDocumentApprovalErrors.critical_error
          ) {
            let message = this.getDocumentApprovalErrors.critical_error;
            this.errorNotify(`${message}`);
          } else {
            this.errorNotify("Error in approving document");
          }
          window.location.reload();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getCompletedDocument(id, allData, docId) {
      this.documentDataLoading = true;
      let params = {};
      params.pdfContent = id;
      let allFieldsPages = JSON.parse(JSON.stringify(allData));
      //finding page numbers for fields
      let preDocHeight = 0;
      for (let i = 0; i < docId; i++) {
        let maxPreLength = document.getElementById(`wrapper_${i}`).childNodes
          .length;
        for (let j = 0; j < maxPreLength; j++) {
          preDocHeight =
            preDocHeight +
            document.getElementById(`wrapper_${i}`).childNodes[j].height;
          // pageBreaks.push(h);
        }
      }
      let maxLength = document.getElementById(`wrapper_${docId}`).childNodes
        .length;
      let pageBreaks = [];
      let h = 0;
      for (let i = 0; i < maxLength; i++) {
        if (i == 0) {
          h =
            h +
            preDocHeight +
            document.getElementById(`wrapper_${docId}`).childNodes[i].height;
        } else {
          h =
            h +
            document.getElementById(`wrapper_${docId}`).childNodes[i].height;
        }
        pageBreaks.push(h);
      }
      console.log("pageBreaks", docId, pageBreaks);
      pageBreaks.forEach((page, index) => {
        allFieldsPages.map((element) => {
          if (element.y <= page + index * 6 && !element.page) {
            element.page = index + 1;
            // if (index > 0) {
            //   element.y = element.y - pageBreaks[index - 1];
            // }
          } else if (element.y >= pageBreaks[pageBreaks.length - 1]) {
            element.page = pageBreaks.length;
          }
        });
      });
      let textFields = [];
      let allPdfImages = [];
      let pdfRecs = [];
      //preparing fields
      allFieldsPages.forEach((field) => {
        if (field.type == "PRIMARY_FIELDS") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          locations.x = locations.x + 5;
          const content = (({ content }) => ({ content }))(field);
          let data = {
            location: locations,
            content: content["content"],
            font: field.font,
            wraptext: field.selected_tag == 'address' ? true : false,
          };
          textFields.push({ ...data });
        } else if (field.type == "CURRENCY") {
          let val = document.getElementById(field.key);
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          locations.x = locations.x + 5;
          let data = {
            location: locations,
            content: val && val.value ? val.value : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "FORMULA") {
          let val = this.documentData[field.key];
          if (field.validations && field.validations.currency) {
            let formattedValue = document.getElementById(field.key);
            if (formattedValue && formattedValue.value) {
              val = formattedValue.value;
            }
          }
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          locations.x = locations.x + 5;
          let data = {
            location: locations,
            content: val ? val : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "PARAGRAPH") {
          // console.log('>>> getCompletedDocument() #2, field', field);
          const locations = (({ x, y, height, width, page }) => ({
            // const locations = (({ x, y, height, page }) => ({
            x,
            y,
            height: height + height / 2,
            width: width,
            page,
          }))(field);
          const content = (({ content }) => ({ content }))(field);
          let data = {
            wraptext: true,
            location: locations,
            content: content["content"],
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "HEADING") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          const content = (({ content }) => ({ content }))(field);

          let data = {
            location: locations,
            content: content["content"],
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "HORIZONTAL_LINE") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          locations.y = locations.y + 17;
          let data = {
            page: locations.page,
            x: locations.x,
            y: locations.y,
            width: locations.width,
            height: 0.1,
            lineWidth: 0,
            lineColor: "0,0,0",
            opacity: 0,
            colorFill: "0,0,0",
          };
          pdfRecs.push(data);
        } else if (field.type == "MY_INITIAL") {
          if (field.value) {
            const locations = (({ x, y, height, width, page }) => ({
              x,
              y,
              height,
              width,
              page,
            }))(field);
            locations.x = locations.x + 4;
            const source = (({ value }) => ({ value }))(field);
            let images = {
              location: locations,
              content: source["value"].substring(22),
            };
            allPdfImages.push(images);
          }
        } else if (field.type == "IMAGE" && field.value.length) {
          if (field.value) {
            const locations = (({ x, y, height, width, page }) => ({
              x,
              y,
              height,
              width,
              page,
            }))(field);
            locations.width = locations.width + 10;
            locations.height = locations.height + 10;
            locations.y = locations.y - 10;
            const source = (({ value }) => ({ value }))(field);
            let images = {
              location: locations,
              content: source["value"].split("base64,")[1],
            };
            allPdfImages.push(images);
          }
        } else if (field.type == "my-signature") {
          if (field.source) {
            const locations = (({ x, y, height, width, page }) => ({
              x,
              y,
              height,
              width,
              page,
            }))(field);
            locations.x = locations.x + 4;
            const source = (({ source }) => ({ source }))(field);
            let images = {
              location: locations,
              content: source["source"].split("base64,")[1],
            };
            allPdfImages.push(images);
          }
        } else if (field.type == "SIGNATURE" || field.type == "INITIAL") {
          if (field.source) {
            const locations = (({ x, y, height, width, page }) => ({
              x,
              y,
              height,
              width,
              page,
            }))(field);
            locations.x = locations.x + 4;
            const source = (({ source }) => ({ source }))(field);
            let images = {
              location: locations,
              content: source["source"].split("base64,")[1],
            };
            allPdfImages.push(images);
          }
        } else if (field.type == "DATE" && field.value) {
          const format = "MM-DD-YYYY";
          let date = moment(field.value).format(format);
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          let data = {
            location: locations,
            content: date,
            font: field.font,
          };
          data.font.size = data.font.size - 0.5;
          textFields.push({ ...data });
        } else if (field.type == "SELECT") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          let data = {
            location: locations,
            content:
              field && field.value && field.value.length && field.value.length
                ? field.value
                : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "MULTI_SELECT") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          let contentValue = field.value.join(",");
          let data = {
            location: locations,
            content: contentValue,
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "YES_OR_NO") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          let data = {
            location: locations,
            content:
              field && field.value && field.value.length && field.value.length
                ? field.value == "yes"
                  ? "Yes"
                  : "No"
                : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "NUMBER") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          // locations.y = locations.y + 10;
          // locations.x = locations.x + 5;
          let data = {
            location: locations,
            content:
              field && field.value && field.value.length && field.value.length
                ? field.value
                : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "DATE_SIGNED") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          const format = "MM-DD-YYYY";
          console.log("=-=-=-=-=fiels", field);
          let dt = moment(field.value).format(format);
          let data = {
            location: locations,
            content: field.value ? dt : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (
          field.type == "SINGLE_LINE_TEXT" ||
          field.type == "ENTITY" ||
          field.type == "REPEATABLE_PARENT"
        ) {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          let data = {
            location: locations,
            content:
              field &&
              field.value &&
              (field.value.length || typeof field.value == "number")
                ? field.value
                : "",
            font: field.font,
          };
          textFields.push({ ...data });
        } else if (field.type == "MULTI_LINE_TEXT") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height: height + height,
            width,
            // width: parseInt(width * (100 / 180)), // 100 -> 180
            page,
          }))(field);
          // const content = (({ content }) => ({ content }))(field);
          let data = {
            wraptext: true,
            location: locations,
            // content: content["content"],
            content:
              field && field.value && field.value.length ? field.value : "",
            font: field.font,
          };
          data.content =
            field && field.value && field.value.length ? field.value : "";
          textFields.push({ ...data });
        } else if (field.type == "CHECKBOX") {
          const locations = (({ x, y, height, width, page }) => ({
            x,
            y,
            height,
            width,
            page,
          }))(field);
          if (field.value) {
            let check_image =
              "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAb0lEQVRIie2SwQ2AIBAEpwo0tgjlGtFq9AEJiBBiOH43yf1gud0FFOUHK2BninvgBpy0+ALsUfwENhUfFreE0lrkhfrO2Q+uc3FIHMCQrF+8rYtlXntEvNAyiqFYWuROpnxFCNseccQ2LzFxFKXOA8KgLcHpsapLAAAAAElFTkSuQmCC";
            let data = {
              location: locations,
              content: check_image,
            };
            allPdfImages.push(data);
          }
        }
      });
      const current = new Date();
      const format = "MM-DD-YYYY";
      params.pdfSignatures = [
        {
          page: 1,
          llx: 75,
          lly: 1100,
          urx: 300,
          ury: 1530,
          signatureText: `Signed by eSigns.io, Inc on: ${moment(current).format(
            format
          )} `,
        },
      ];
      params.defaultScale = this.scale;
      //adjusting text fields based on font type and size
      console.log("allPdfImages", allPdfImages);
      allPdfImages.map((el) => {
        let heightOffset = document.getElementById(
          `${docId}_canvas_${el.location.page}`
        ).offsetTop;
        if (heightOffset) {
          el.location.y = el.location.y - heightOffset;
        }
        let offset = document.getElementById(
          `${docId}_canvas_${el.location.page}`
        ).offsetLeft;
        if (offset) {
          el.location.x = el.location.x - offset;
        }
      });

      let newTextFields = textFields.map((el) => {
        if (el.font) {
          el.font.size = el.font.size / this.scale;
        }
        let heightOffset = document.getElementById(
          `${docId}_canvas_${el.location.page}`
        ).offsetTop;
        if (heightOffset) {
          el.location.y = el.location.y - heightOffset;
        }
        let offset = document.getElementById(
          `${docId}_canvas_${el.location.page}`
        ).offsetLeft;
        if (offset) {
          el.location.x = el.location.x - offset;
        }
        return el;
      });
      params.pdfTexts = newTextFields;
      params.pdfImages = allPdfImages;
      params.pdfRecs = pdfRecs;
      params.keepFileID = false;
      params.stampByTsa = this.is_completed ? true : false;
      params.removeAllFormFields = false;
      let url = this.document_url_paths[docId].split("/");
      params["company_id"] = process.env.VUE_APP_APP_TYPE + "/" + url[2];
      console.log("params", params);
      await this.$store.dispatch("fileUpload/fileTheUploadv4", params);
      if (this.getUploadStatus.responseCode == 0) {
        let tempUrl = "";
        if (
          this.getUploadStatus.fileInfos[0].url.includes(
            appConfig.S3_BUCKET_URL
          )
        ) {
          tempUrl = this.getUploadStatus.fileInfos[0].url.replace(
            appConfig.S3_BUCKET_URL,
            ""
          );
        } else {
          tempUrl = this.getUploadStatus.fileInfos[0].url;
        }
        if (this.is_completed || this.isRedownloading) {
          this.completedDocuments.push(tempUrl);
        } else {
          this.printedDocuments.push(tempUrl);
        }
      } else {
        if (this.getUploadStatus && this.getUploadStatus.responseMessage) {
          this.$notify.error({
            title: "Error",
            message: `${this.getUploadStatus.responseMessage}`,
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: "Error in document generating",
          });
        }
        this.documentDataLoading = false;
      }
    },

    async updateDocumentDownloadUrl(urls) {
      let params = {
        document_completed_urls: urls,
        document_completed_url: urls[0],
        document_completed_status: true,
      };
      params.document_id = this.$route.params.employee_document_id;
      await this.$store.dispatch("documents/updateDocumentDataById", params);
      if (this.getSingleDocumentUpdateStatus) {
        this.$notify.success({
          title: "Success",
          message: "Document generated successfully",
        });
        if (this.nextWorkflowDocument && !this.isRedownloading) {
          this.goToNextDocument();
        } else {
          this.refreshDocument();
        }
      } else {
        this.$notify.error({
          title: "Error",
          message: "Error in document generation",
        });
        this.refreshDocument();
      }
    },
    async renderPreviewPages(id) {
      const self = this;
      let i = id;
      if (i == 0) {
        this.docPages = 0;
      }
      async function renderPage(page) {
        let scale = 1;
        if (self.isInitialRender) {
          var viewport = page.getViewport({ scale: scale });
          let width = viewport.width;
          if (self.docPages < width) {
            self.docPages = width;
          }
          self.rotations.push({
            page: page.pageNumber,
            rotate: page.rotate,
            document_id: i,
          });
          if (
            page.pageNumber == self.allPdfData[i].pages &&
            i + 1 == self.total_documents
          ) {
            self.isInitialRender = false;
          }
        }
        let previewView = page.getViewport({ scale: 0.2 });
        var canvas = document.getElementById(
          `${i}_canvas_page_${page.pageNumber}`
        );
        canvas.onclick = function () {
          let id = `${i}_canvas_${page.pageNumber}`;
          this.currentActivatePage = page.pageNumber;
          this.currentActivateDoc = i;
          document.getElementById(id).focus();
          // self.navigateToPageNo();
        };
        canvas.id = `${i}_canvas_page_${page.pageNumber}`;
        canvas.style.cssText =
          "margin-top: 20px; border: 1px solid #ccc; margin-left: 10px; margin-right: 10px; cursor: pointer;";
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var renderContext = {
          canvasContext: ctx,
          viewport: previewView,
        };
        canvas.height = previewView.height;
        canvas.width = previewView.width;
        // canvasContainer.append(canvas);
        await page.render(renderContext);
      }
      // function renderPages(pdfDoc) {
      if (
        this.allPdfData &&
        this.allPdfData.length &&
        this.allPdfData[i] &&
        this.allPdfData[i].pages
      ) {
        for (var num = 1; num <= this.allPdfData[i].pages; num++) {
          if (
            num == this.allPdfData[i].pages &&
            i + 1 == this.total_documents
          ) {
            await this.allPdfData[i].pdfDoc
              .getPage(num)
              .then(renderPage)
              .then(
                setTimeout(() => {
                  self.document_url_paths.forEach(async (doc, i) => {
                    await self.getWidthandHeight(i);
                  });
                }, 500)
              );
          } else {
            await this.allPdfData[i].pdfDoc.getPage(num).then(renderPage);
          }
        }
      }
      // }
      // pdfjsLib.disableWorker = true;
      // pdfjsLib.getDocument(url).then(this.getPages).then(renderPages);
    },
    navigateToPageNo() {
      console.log(">>> navigateToPageNo() called");
      let scrollbarEl = this.$refs.scrollbar.wrap;
      scrollbarEl.scrollTop = this.getSumOfPagesHeight(
        this.currentActivatePage,
        this.currentActivateDoc
      );
      console.log(
        ">>> navigateToPageNo(), scrollbarEl.scrollTop",
        scrollbarEl.scrollTop
      );
    },
    getSumOfPagesHeight(pageNo, docNo) {
      var sumOfHeights = 0;
      sumOfHeights = document.getElementById(
        `${docNo}_canvas_${pageNo}`
      ).offsetTop;
      // for (let i = 0; i < pageNo - 1; i++) {
      //   sumOfHeights += document.getElementById("wrapper").childNodes[i].height;
      //   sumOfHeights += 5;
      // }
      return sumOfHeights;
    },
    getPages(pdfDoc) {
      this.pdfPages = pdfDoc.numPages;
      this.pdfData = pdfDoc;
      return pdfDoc;
    },
    async getWidthandHeight(id) {
      const self = this;
      let scale = 1.6;
      let i = id;
      for (let i = 0.5; i <= 2; i += 0.1) {
        if (self.docPages && self.docPages * i <= 955) {
          scale = i;
        }
      }
      if (this.scale == 0) {
        this.scale = scale;
      } else {
        scale = this.scale;
      }
      async function renderPage(page) {
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.getElementById(`${i}_canvas_${page.pageNumber}`);
        canvas.style.cssText =
          "box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12);";
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render(renderContext);
        self.pageWidth = viewport.width;
        self.pageHeight += viewport.height;
      }
      for (var num = 1; num <= this.allPdfData[i].pages; num++) {
        if (num == this.allPdfData[i].pages) {
          await this.allPdfData[i].pdfDoc
            .getPage(num)
            .then(await renderPage)
            .then(
              setTimeout(() => {
                if (!this.getSingleDocumentData.data.document_completed_url) {
                  if (i + 1 == this.total_documents) {
                    this.fetchDocumentData();
                  }
                }
                this.documentDataLoading = false;
              }, 500)
            );
        } else {
          await this.allPdfData[i].pdfDoc.getPage(num).then(await renderPage);
        }
      }
    },
    checkDocumentGeneration() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "COMPLETED" &&
        !this.getSingleDocumentData.data.document_completed_url
      ) {
        this.downloadCompletedDocument();
      }
    },
    async getDocLogs() {
      await this.$store.dispatch("documents/fetchDocumentLogsById", {
        document_id: this.$route.params.employee_document_id,
      });
      if (this.getDocumentLogs && this.getDocumentLogs.data) {
        this.documentLogs = this.getDocumentLogs.data;
      }
    },
    async getAllDocLogs() {
      await this.$store.dispatch("documents/fetchDocumentLogsById", {
        document_id: this.$route.params.employee_document_id,
      });
      if (this.getDocumentLogs && this.getDocumentLogs.data) {
        this.documentLogs = [];
        this.documentLogs = this.getDocumentLogs.data;
      }
      this.viewDetailedHistoryModal = true;
    },
    logsStatus() {
      this.getDocumentLogs.data;
    },
    async employeeDocumentIsCompleted() {
      if (
        this.getSingleDocumentData.data.document_status != "COMPLETED" &&
        this.getSingleDocumentData.data.document_status != "VOIDED" &&
        this.getSingleDocumentData.data.document_status != "EXPIRED" &&
        this.getSingleDocumentData.data.document_status != "DECLINED"
      ) {
        let allDocumentsUsersSigned = false;
        let signedUsers = this.getSingleDocumentData.data.document_users.filter(
          (e) => e.e_signature_status
        );
        let signRequiredUsers =
          this.getSingleDocumentData.data.document_users.filter(
            (element) => element.e_signature_required
          );
        if (signedUsers.length == signRequiredUsers.length) {
          allDocumentsUsersSigned = true;
        }
        if (allDocumentsUsersSigned) {
          let params = {};
          params.document_id = this.$route.params.employee_document_id;
          await this.$store.dispatch("documents/completedDocument", params);
          if (this.getDocumentCompletedStatus) {
            this.$message({
              message: "Document signatures completed.",
              type: "success",
            });
          }
        }
      }
    },
    async DocumentDecline(noteData) {
      let params = {};
      params.document_id = this.$route.params.employee_document_id;
      params.note = noteData;
      await this.$store.dispatch("documents/declineDocument", params);
      if (this.getDocumentDeclineStatus) {
        this.$notify.success({
          title: "Success",
          message: "Document declined successfully",
        });
        this.declineDialogVisible = false;
        if (this.nextWorkflowDocument) {
          this.goToNextDocument(true);
        } else {
          this.refreshDocument();
        }
        // this.refreshDocument();
        // this.$router.push({
        //   name: "employee-documents-custom-document-pp-decline",
        //   params: {
        //     employee_document_id: this.$route.params.employee_document_id,
        //   },
        // });
      } else {
        this.$notify.error({
          title: "Error",
          message: "Error in declining the Document",
        });
      }
    },
    getCurrentAuthUser() {
      let currentUser = this.documentUsers.find(
        (x) => x && x.email.toLowerCase() === this.currentAuthUserEmail
      );
      return currentUser;
    },

    closeDocumentUserSettings({
      users,
      enforceSignatureOrder,
      signaturesConfig,
      submit,
    }) {
      if (users && users.length) {
        this.documentUsers = users;
      }
      if (signaturesConfig && signaturesConfig.length) {
        this.signaturesConfig = signaturesConfig;
      }
      this.submitEvent = false;
      this.showDocumentUserSettings = false;
      this.addDocumentRecipient = false;
      this.enforceSignatureOrder = enforceSignatureOrder;
      if (submit) {
        // this.saveUpdateData();
      }
    },
    getCurrentUser() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status == "SENT"
      ) {
        let user = this.getSingleDocumentData.data.document_users.find(
          (user) => {
            if (
              user.type == "SENDER" &&
              user.user_id &&
              user.user_id._id == this.userId
            ) {
              return true;
            } else if (
              user.email &&
              user.email.toLowerCase() == this.UserEmail.toLowerCase()
            ) {
              return true;
            }
          }
        );

        if (user) {
          if (user.type == "SENDER") {
            this.userDocumentData = user;
          } else {
            this.userDocumentData = user.contact_id;
            this.isCurrentUserIsContatct = true;
          }
        }
      }
    },

    editReceipentUser(row, index) {
      this.selectedUser = { ...row };
      this.selectedUserIndex = index;
    },
    updateReceipentUser() {
      this.documentRecipientsList = this.documentRecipientsList.map(
        (user, index) => {
          if (index == this.selectedUserIndex) {
            user.first_name = this.selectedUser.first_name;
            user.last_name = this.selectedUser.last_name;
            user.email = this.selectedUser.email.toLowerCase();
            user.e_signature_required = this.selectedUser.e_signature_required;
          }
          return user;
        }
      );
      this.selectedUserIndex = null;
      this.selectedUser = null;
    },
    addReceipentUser() {
      this.documentUsers.push({
        email: this.addNewRecipient.email,
        first_name: this.addNewRecipient.first_name,
        last_name: this.addNewRecipient.last_name,
        e_signature_required: this.addNewRecipient.e_signature_required,
        name: "RECEIVER-" + this.documentUsers.length,
        value: "RECEIVER" + this.documentUsers.length,
        e_signature_order: this.documentUsers.length + 1,
        type: "RECEIVER",
        default: false,
      });

      this.addNewRecipient = {
        email: "",
        first_name: "",
        last_name: "",
        e_signature_required: true,
        value: "RECEIVER",
        name: "RECEIVER",
        type: "RECEIVER",
        default: false,
        e_signature_order: 0,
      };
    },
    goBack() {
      if (window.history.length && window.history.length > 1) {
        this.$router.push({
          path: "/dashboard",
        });
      } else {
        window.close();
      }
    },

    async sendDocument() {
      try {
        this.documentDataLoading = true;
        let documentData = this.prepareDocumentData();
        let users = this.documentUsers.map((user, index) => {
          user.e_signature_order = index;
          return user;
        });
        let params = {
          employee_document_id: this.$route.params.employee_document_id,
          document_users: users,
          document_data: documentData,
          name: this.documentName,
          enforce_signature_order: this.enforceSignatureOrder,
        };
        await this.$store.dispatch("documents/sendDocument", params);
        this.documentDataLoading = false;
        if (this.getDocumentSendStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document sent successfully",
          });
          this.$router.push({
            path: "/documents/all",
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: "Error in sending Document",
          });
        }
      } catch (err) {
        this.documentDataLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error in sending Document",
        });
      }
    },
    // updating draft details and redirect to email preview page
    async updateDraftDocument() {
      try {
        this.documentDataLoading = true;
        let documentData = this.prepareDocumentData();
        let users = this.documentUsers.map((user, index) => {
          user.e_signature_order = index;
          return user;
        });
        let params = {
          employee_document_id: this.$route.params.employee_document_id,
          company_document_id: this.$route.params.employee_document_id,
          document_users: users,
          document_data: documentData,
          enforce_signature_order: this.enforceSignatureOrder,
        };
        if (this.files) {
          var formData = new FormData();
          this.files.forEach((file, index) => {
            if (index == 0) {
              this.fieldsFormUpload.selectedFile =
                file.raw !== undefined ? file.raw : file;
              this.fieldsFormUpload.selectedFileName =
                file.raw !== undefined ? file.raw.name : file.name;
              this.fieldsFormUpload.title =
                file.raw !== undefined ? file.raw.name : file.name;
            }
            formData.append(
              "uploadedFiles",
              file.raw !== undefined ? file.raw : file
            );
          });
          formData.append(
            "employee_document_id",
            this.$route.params.employee_document_id
          );
          formData.append(
            "company_document_id",
            this.$route.params.employee_document_id
          );
          formData.append("document_users", JSON.stringify(users));
          formData.append("document_data", JSON.stringify(documentData));
          formData.append(
            "enforce_signature_order",
            this.enforceSignatureOrder
          );
          params = formData;
        }
        await this.$store.dispatch("documents/updateDraftDocument", params);
        this.documentDataLoading = false;
        if (this.getDraftDocumentUpdateStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document updated successfully",
          });
          this.$router.push({
            name: "send-document-mail",
            params: {
              id: this.$route.params.employee_document_id,
            },
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: "Error in updating Document",
          });
        }
      } catch (err) {
        this.documentDataLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error in sending Document",
        });
      }
    },
    calculateRelativeLeft(x) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * x
        );
      }
      return x;
    },

    calculateRelativeTop(y) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * y
        );
      }
      return y;
    },
    calculateRelativeWidth(width) {
      if (
        this.storedFormBuilderWidth &&
        this.currentFormBuilderWidth &&
        this.currentFormBuilderWidth != this.storedFormBuilderWidth
      ) {
        return Math.round(
          (this.currentFormBuilderWidth / this.storedFormBuilderWidth) * width
        );
      }
      return width;
    },
    setData() {
      this.documentName = this.getSingleDocumentData.data.title;
      this.document_url_paths =
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data
          .document_upload_urls &&
        this.getSingleDocumentData.data.configurable_document_data
          .document_upload_urls.length
          ? this.getSingleDocumentData.data.configurable_document_data
              .document_upload_urls
          : [
              this.getSingleDocumentData.data.configurable_document_data
                .document_upload_url,
            ];
      this.total_documents = this.document_url_paths.length;
      let tempUrl =
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data
          .document_upload_url
          ? this.getSingleDocumentData.data.configurable_document_data
              .document_upload_url
          : this.getSingleDocumentData.data.company_document_data
              .document_upload_url;
      let urlSliptArray = tempUrl.split("/");
      if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
        this.document_url_path = `/${process.env.VUE_APP_APP_TYPE}${tempUrl}`;
      } else {
        this.document_url_path = tempUrl;
      }
      this.documentSettings = this.getSingleDocumentData.data.document_settings;
      // this.document_url_path =
      //   this.getSingleDocumentData.data.configurable_document_data.document_upload_url;
      this.isDraft = this.getSingleDocumentData.data.document_status == "DRAFT";
      this.configurableDocumentId =
        this.getSingleDocumentData.data.configurable_document_id;
      this.documentId = this.getSingleDocumentData.data.company_document_id;
      this.workflowName = this.$route.query.workflow_name || "Company Document";
      this.scale =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data.scale
          ? this.getSingleDocumentData.data.configurable_document_data.scale
          : 0;
      this.documentCompletedID =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_completed_url
          ? this.getSingleDocumentData.data.document_completed_url
              .split("download/")
              .pop()
              .split(".pdf")[0]
          : "";
    },

    async setEmployeDataToForm() {
      this.documentDataLoading = true;
      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        const documentValue = this.getValueFromSavedDocument(field.key);
        if (
          (this.elements[index].type == "SIGNATURE" ||
            this.elements[index].type == "INITIAL") &&
          documentValue
        ) {
          this.elements[index].source = documentValue;
          this.$set(this.elements[index], "source", documentValue);
        }
        if (this.elements[index].type == "ATTACHMENT" && documentValue) {
          this.$set(this.elements[index], "files", documentValue);
        }
        if (this.elements[index].type == "PRIMARY_FIELDS") {
          this.$set(
            this.elements[index],
            "content",
            documentValue ? documentValue : ""
          );
        }
        if (documentValue) {
          this.$set(this.elements[index], "value", documentValue);
        }
      }
      // await this.setEntityData(this.documentUsers);
      if (this.employeeDocumentId && this.getSingleDocumentData.data) {
        this.userDocumentFormData.e_signature_required =
          this.getSingleDocumentData.data.e_signature_required;
        this.userDocumentFormData.e_signature_status =
          this.getSingleDocumentData.data.e_signature_status;
        this.userDocumentFormData.expires_at =
          this.getSingleDocumentData.data.expires_at ||
          this.$moment().endOf("day").toString();
        // this.userDocumentFormData.valid_from = this.getSingleDocumentData.data.valid_from || this.$moment().startOf('day').toString();
        this.userDocumentFormData.e_signature_value = this.getSingleDocumentData
          .data.e_signature_required
          ? "YES"
          : "NO";

        this.elements = this.elements.map((element) => {
          if (
            element.type == "PRIMARY_FIELDS" &&
            element.selected_user != "SENDER"
          ) {
            element.content = this.getFieldUserVal(
              element.selected_user,
              element.selected_tag,
              element.key
            );
          }
          return element;
        });
      }
      this.setUsersEntityData(this.documentUsers);
      this.documentDataLoading = false;
    },
    async deleteItem(index) {
      this.files.splice(index, 1);
    },
    getFieldUserVal(userValue, fieldVal, key) {
      let value = "";
      this.documentUsers.forEach((user) => {
        if (user.value == userValue) {
          let userData = {};
          if (user.contact_id) {
            userData = user.contact_id;
            if (fieldVal == "full_name") {
              value =
                userData.first_name && userData.last_name
                  ? userData.first_name + " " + userData.last_name
                  : "";
            } else if (fieldVal == "phone") {
              value = userData.phone_number || userData.phone;
            } else {
              value = userData[fieldVal];
            }
          } else {
            value = this.getValueFromSavedDocument(key);
          }
        }
      });
      return value;
    },
    getFieldDataFromTemplate(templateId, templateFieldId) {
      let template = this.templatesUsed.find((x) => x._id == templateId);
      if (template) {
        let field = template.sections[0].fields.find(
          (x) => x._id == templateFieldId
        );
        if (field) {
          return field;
        }
        return {};
      }
      return {};
    },
    getValueFromTempaleFieldFromEmployeeData(field) {
      let key = field.key.split("#")[1];

      if (this.getTemplatesData && this.getTemplatesData.length) {
        let template = this.getTemplatesData.find(
          (x) => x.template_id == field.template_id
        );
        if (template) {
          return template.template_data[key] ? template.template_data[key] : "";
        }
        return "";
      }
      return "";
    },

    getValueFromSavedDocument(key) {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_data
      ) {
        return this.getSingleDocumentData.data.document_data[key];
      }
      return null;
    },
    async fetchEmployeeData() {
      this.empDataLoading = true;
      await this.$store.dispatch("employee/fetchEmployeeSingleEmployee", {
        id: this.employeeId,
      });
      this.empDataLoading = false;
    },
    async fetchEmployeDocumentData() {
      try {
        await this.$store.dispatch("documents/fetchDocumentDataById", {
          document_id: this.employeeDocumentId,
        });
        if (
          this.getAuthenticatedUser &&
          this.getAuthenticatedUser.email &&
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.document_users
        ) {
          const documentuser =
            this.getSingleDocumentData.data.document_users.find(
              (user) => user && user.email == this.getAuthenticatedUser.email
            );
          if (documentuser && documentuser.email) {
            this.is_forbidden_doc = false;
          } else {
            if (
              this.getActiveWorkspace &&
              this.getActiveWorkspace.company_id ==
                this.getSingleDocumentData.data.company_id
            ) {
              this.isCompanyDocument = true;
              this.is_forbidden_doc = false;
            } else {
              this.is_forbidden_doc = true;
            }
          }
        } else {
          if (
            this.getDocumentSendErrors &&
            this.getDocumentSendErrors.critical_error
          ) {
            this.is_forbidden_doc = true;
          }
        }
      } catch (error) {
        if (error) {
          this.is_forbidden_doc = true;
        }
      }
    },

    showDocumentUsers() {
      this.showDocumentUsersLog = true;
    },
    completeStatusClosed(status) {
      this.completedialogVisible = false;
      if (status) {
        this.mounted();
      }
    },

    clsdocSettingsVisible() {
      this.docSettingsVisible = false;
      this.$router.go();
    },
    async fetchDocumentData() {
      this.documentDataLoading = true;
      this.documentUsers = this.getSingleDocumentData.data.document_users;
      // await this.companyEntityDetails();
      // this.userDocumentFormData.valid_from = this.getSingleDocumentData.data.company_document_data.valid_from || this.$moment().startOf('day').toString();
      // this.userDocumentFormData.expires_at = this.getSingleDocumentData.data.company_document_data.valid_to || this.$moment().endOf('day').toString();
      this.userDocumentFormData.e_signature_required =
        this.getSingleDocumentData.data.company_document_data.e_signature_required;

      this.documentFormData =
        this.getSingleDocumentData.data.configurable_document_data;
      this.backgroundImage = this.documentFormData?.pages[0]?.background_image;
      this.backgroundImages =
        this.documentFormData?.pages[0]?.background_images;
      //   console.log(this.backgroundImages);
      this.storedFormBuilderWidth =
        this.documentFormData?.pages[0]?.page_base_width;
      this.templatesUsed = this.documentFormData?.pages[0]?.templates_used;
      this.enforceSignatureOrder =
        this.getSingleDocumentData.data.enforce_signature_order;
      this.expiraydate =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_settings &&
        this.getSingleDocumentData.data.document_settings.expiration_settings &&
        this.getSingleDocumentData.data.document_settings.expiration_settings
          .document_expired_date
          ? this.getSingleDocumentData.data.document_settings
              .expiration_settings.document_expired_date
          : null;
      this.secureEsign =
        this.getSingleDocumentData.data.document_settings &&
        this.getSingleDocumentData.data.document_settings.secure_e_sign
          ? this.getSingleDocumentData.data.document_settings.secure_e_sign
              .allow_document_e_sign
          : true;
      this.loadingElements = true;
      // setTimeout(() => {
      this.elements =
        this.documentFormData &&
        this.documentFormData.pages[0] &&
        this.documentFormData.pages[0].fields
          ? this.documentFormData.pages[0].fields
          : [];
      this.isTemplate = this.documentFormData.is_template || false;
      await this.elements.map((el) => {
        if (el.type == "PRIMARY_FIELDS" && el.selected_tag == "email") {
          el.initial_value = true;
        }
        let user = el.filled_by;
        el.userData = this.getFieldColor(user, this.documentUsers);
      });
      await this.setEmployeDataToForm();
      this.loadingElements = false;
      this.documentDataLoading = false;
    },
    getPagesBoundaries(y) {
      let pageBreaks = [];
      let h = 0;
      let maxLength = document.getElementById("wrapper").childNodes.length;
      for (let i = 0; i < maxLength; i++) {
        let innerChildLength =
          document.getElementById("wrapper").childNodes[i].childNodes.length;
        for (let j = 0; j < innerChildLength; j++) {
          h =
            h +
            document.getElementById("wrapper").childNodes[i].childNodes[j]
              .height +
            6;
          pageBreaks.push({
            docId: i,
            pageId: j,
            height: h,
          });
        }
      }
      let pageNumber = pageBreaks.find((page) => {
        if (y <= page.height + page.docId) {
          return page;
        }
      });
      let data = {
        pageOffset: document.getElementById(`wrapper_${pageNumber.docId}`)
          .childNodes[pageNumber.pageId].offsetLeft,
        pageWidth: document.getElementById(`wrapper_${pageNumber.docId}`)
          .childNodes[pageNumber.pageId].width,
        pageHeight: document.getElementById(`wrapper_${pageNumber.docId}`)
          .childNodes[pageNumber.pageId].height,
        data: pageNumber,
        pageNumber: pageNumber.docId,
      };
      return data;
    },
    setDocumentFields() {
      this.elements.forEach((element) => {
        if (element.page && element.docId > -1) {
          if (element.offsetLeft) {
            element.x = element.x + element.offsetLeft;
          }
          if (element.offsetTop) {
            // element.y = (element.y + element.offsetTop) + (element.page * (window.devicePixelRatio - 0.5));
            element.y = element.y + element.offsetTop;
          }
        }
      });
    },
    getFieldColor(user, users) {
      let data = {};
      let selectedUser = (users || []).find((e) => e.value == user);
      if (selectedUser) {
        if (selectedUser.first_name && selectedUser.last_name)
          data.user = selectedUser.first_name + " " + selectedUser.last_name;
      }
      return data;
    },
    getFieldVal(field, userType) {
      let fieldVal = "";
      this.documentUsers.map((user) => {
        if (user.value == userType) {
          fieldVal = user[field];
        }
      });
      return fieldVal;
    },
    setSizeAndPositionForElements() {
      return this.elements.map((field) => {
        field.x = this.calculateRelativeLeft(field.x);
        field.y = this.calculateRelativeTop(field.y);
        field.width = this.calculateRelativeWidth(field.width);
        field.height = this.calculateRelativeWidth(field.height);
        return field;
      });
    },
    getFormStyle(page) {
      if (page.background) {
        let style =
          page.style + page.background_image
            ? `background:url('${page.background_image}');}`
            : "";
        return style;
      } else {
        return page.style || "";
      }
    },
    getDateFieldStyles(item) {
      let style = `font-size:${item.font.size}px;font-style: ${
        item.font.style == 2 || item.font.style == 3 ? "italic" : "normal"
      };font-weight:${
        item.font.style == 1 || item.font.style == 3 ? "bold" : "normal"
      };color:${item.font.color};font-family:${
        item.font.name
      };position:absolute;left:${item.x}px;top:${item.y}px;height:${
        item.height
      }px;width:${item.width}px;`;
      if (
        item.filled_by &&
        !this.checkFieldAllow(item) &&
        item.type != "DATE_SIGNED"
      ) {
        if (
          (item.type == "DATE" && item.value) ||
          (item.value && item.value.length) ||
          item.source
        ) {
          style += `outline: 2px solid ${this.field_color.filled} !important;`;
        } else if (this.currentEnabledFieldKey == item.key) {
          style += `outline: 2px solid ${this.field_color.highlight} !important;`;
        } else {
          style += item.required
            ? `outline: 2px solid ${this.field_color.default} !important;`
            : `outline: 2px solid ${this.field_color.optional} !important;`;
        }
      }
      return style;
    },
    getFieldStylesForDate(item, additionalStyle = "") {
      let style = `font-size:${
        item && item.font && item.font.size ? item.font.size : "16"
      }px;font-style: ${
        (item && item.font && item.font.style == 2) ||
        (item && item.font && item.font.style == 3)
          ? "italic"
          : "normal"
      };font-weight:${
        (item && item.font && item.font.style == 1) ||
        (item && item.font && item.font.style == 3)
          ? "bold"
          : "normal"
      };color:${
        item && item.font && item.font.color ? item.font.color : "black"
      };font-family:${
        item && item.font && item.font.name ? item.font.name : "helvetica"
      }`;

      return style + ";" + additionalStyle;
    },
    getFieldStyles(item) {
      if (!item.font) {
        item.font = {
          name: "Helvetica",
          size: 16,
          style: 0,
          color: "#000000",
        };
        console.log("getFieldStyles", item);
      }
      let style = `font-size:${item.font.size}px;font-style: ${
        item.font.style == 2 || item.font.style == 3 ? "italic" : "normal"
      };font-weight:${
        item.font.style == 1 || item.font.style == 3 ? "bold" : "normal"
      };color:${item.font.color};font-family:${
        item.font.name
      };position:absolute;left:${
        item.type == "PRIMARY_FIELDS" ? item.x : item.x
      }px;top:${item.type == "SINGLE_LINE_TEXT" ? item.y : item.y}px;height:${
        item.height
      }px;width:${item.width}px !important;`;

      if (item.type == "FORMULA") {
        style += `outline: 2px solid ${this.field_color.filled} !important;`;
      } else if (item.filled_by && item.type == "HORIZONTAL_LINE") {
        style += `background: transparent !important; border: none !important;`;
      } else {
        if (
          (item.filled_by && !this.checkFieldAllow(item)) ||
          (item.selected_user && !this.checkPrimaryFieldAllow(item))
        ) {
          if (
            (item.type != "PRIMARY_FIELDS" &&
              (typeof item.value == "number" || item.value || item.source)) ||
            (item.type == "PRIMARY_FIELDS" && item.content)
          ) {
            style += `outline: 2px solid ${this.field_color.filled} !important;`;
          } else if (this.currentEnabledFieldKey == item.key) {
            style += `outline: 2px solid ${this.field_color.highlight} !important;`;
          } else {
            style +=
              item.required || item.type == "PRIMARY_FIELDS"
                ? `outline: 2px solid ${this.field_color.default} !important;`
                : `outline: 2px solid ${this.field_color.optional} !important;`;
          }
        }
      }
      return style;
    },
    getHeadingStyles(item) {
      return `font-family:${item.font.name};color:${item.font.color};`;
    },
    getStyle(item, isDecreasedHeight = false) {
      let bgColor = this.getColorByFilledBy(item);
      if (item.type == "SIGNATURE") {
        var style = "";
        if (isDecreasedHeight) {
          style = item.required
            ? `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;background:#c2d8de;width:${item.width}px;${bgColor}` +
              `;height:${item.height - 4}px;`
            : `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;width:${item.width}px;outline: 2px solid ${this.field_color.optional} !important;` +
              `;height:${item.height - 4}px;`;
        } else {
          style = item.required
            ? `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;background:#c2d8de;width:${item.width}px;${bgColor}` +
              `;height:${item.height}px;`
            : `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;width:${item.width}px;outline: 2px solid ${this.field_color.optional} !important;` +
              `;height:${item.height}px;`;
        }
        // let style =
        //   `position:absolute;left:${item.x}px;top:${item.y}px;cursor:pointer;background:#c2d8de;width:${item.width}px;${bgColor}` +
        //   (item.source ? `height:${item.height}px;` : ``);
        // if (item.filled_by && !this.checkFieldAllow(item)) {
        //   if (item.value.length || item.source.length) {
        //     style += "outline: 2px solid rgb(83, 216, 21) !important;";
        //   } else if (this.currentEnabledFieldKey == item.key) {
        //     style +=
        //       "outline: 2px solid rgb(21, 101, 216) !important; box-shadow: 0 4px 8px 0 rgb(21, 101, 216),0 6px 20px 0 rgba(0, 0, 0, 0.19);";
        //   } else {
        //     style += "outline: 2px solid #f754a2 !important;";
        //   }
        // }
        return style;
      } else if (item.type == "my-signature") {
        return `position:absolute;left:${item.x + 8}px;top:${item.y}px;height:${
          item.height
        }px;width:${item.width}px;cursor:pointer;${bgColor}`;
      } else if (item.type == "ATTACHMENT") {
        let style = `position:absolute;left:${item.x}px;top:${
          item.y
        }px;height:${item.height}px;width:${item.width + 3}px;${bgColor}`;
        if (item.filled_by && !this.checkFieldAllow(item)) {
          if (item.files.length >= item.requiredFiles) {
            style += `outline: 2px solid ${this.field_color.filled} !important;`;
          } else if (this.currentEnabledFieldKey == item.key) {
            style += `outline: 2px solid ${this.field_color.highlight} !important;`;
          } else {
            style += `outline: 2px solid ${this.field_color.default} !important;`;
          }
        }
        return style;
      } else if (item.type == "MULTI_LINE_TEXT") {
        let style = `position:absolute;left:${item.x}px;top:${item.y}px;height:auto;width:${item.width}px;${bgColor}`;
        if (item.filled_by && !this.checkFieldAllow(item)) {
          if (item.value || item.source) {
            style += `outline: 2px solid ${this.field_color.filled} !important;`;
          } else if (this.currentEnabledFieldKey == item.key) {
            style += `outline: 2px solid ${this.field_color.highlight} !important;`;
          } else {
            style += item.required
              ? `outline: 2px solid ${this.field_color.default} !important;`
              : `outline: 2px solid ${this.field_color.optional} !important;`;
          }
        }
        return style;
      } else if (item.type == "YES_OR_NO") {
        let style = item.required
          ? `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;${bgColor};`
          : `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;outline: 2px solid ${this.field_color.optional} !important;`;
        // if (item.filled_by && !this.checkFieldAllow(item)) {
        //   if (item.value || item.source) {
        //     style += "outline: 2px solid rgb(83, 216, 21) !important;";
        //   } else if (this.currentEnabledFieldKey == item.key) {
        //     style +=
        //       "outline: 2px solid rgb(21, 101, 216) !important; box-shadow: 0 4px 8px 0 rgb(21, 101, 216),0 6px 20px 0 rgba(0, 0, 0, 0.19);";
        //   } else {
        //     style += "outline: 2px solid #f754a2 !important;";
        //   }
        // }
        return style;
      } else if (item.type == "CHECKBOX") {
        let style = item.required
          ? `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;outline: 2px solid ${this.field_color.default};`
          : `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;outline: 2px solid ${this.field_color.optional} !important;`;
        return style;
      } else {
        let style = item.required
          ? `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;${bgColor}`
          : `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;outline: 2px solid ${this.field_color.optional} !important;`;
        if (item.filled_by && !this.checkFieldAllow(item)) {
          if (item.value || item.source) {
            style += `outline: 2px solid ${this.field_color.filled} !important;`;
          } else if (this.currentEnabledFieldKey == item.key) {
            style += `outline: 2px solid ${this.field_color.highlight} !important;`;
          } else {
            style += item.required
              ? `outline: 2px solid ${this.field_color.default} !important;`
              : `outline: 2px solid ${this.field_color.optional} !important;`;
          }
        }
        return style;
      }
    },
    checkPrimaryFieldAllow(item) {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        (this.getSingleDocumentData.data.document_status == "COMPLETED" ||
          this.getSingleDocumentData.data.document_status == "DECLINED" ||
          this.getSingleDocumentData.data.document_status == "VOIDED" ||
          this.getSingleDocumentData.data.document_status == "EXPIRED" ||
          this.getSingleDocumentData.data.document_status == "ARCHIVED")
      ) {
        return true;
      } else if (this.getCurrentUserIsFilled) {
        return true;
      } else {
        // if (this.isSenderOrnot) {
        //   return false;
        // } else {
        let user = this.getCurrentAuthUser();
        if (user && user.value && user.value == item.filled_by) {
          return false;
        } else {
          return true;
        }
        // }
      }
    },
    checkFieldAllow(item) {
      if (this.isDraft) {
        return (
          item.filled_by !== "SENDER" && item.filled_by !== "SENDER_OR_RECEIVER"
        );
      } else if (this.checkWorkflowDocument && !this.is_workflow_document) {
        return true;
      } else if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_status &&
        (this.getSingleDocumentData.data.document_status == "COMPLETED" ||
          this.getSingleDocumentData.data.document_status == "DECLINED" ||
          this.getSingleDocumentData.data.document_status == "VOIDED" ||
          this.getSingleDocumentData.data.document_status == "EXPIRED" ||
          this.getSingleDocumentData.data.document_status == "ARCHIVED")
      ) {
        return true;
      } else if (this.getCurrentUserIsFilled) {
        return true;
      } else {
        let user = this.getCurrentAuthUser();
        if (
          ((user && user.value && item.filled_by == user.value) ||
            item.filled_by == "SENDER_OR_RECEIVER") &&
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data
        ) {
          if (this.getSingleDocumentData.data.enforce_signature_order && user) {
            if (
              user.contact_id &&
              user.contact_id.email &&
              this.getSingleDocumentData.data.current_active_user.toLowerCase() ==
                user.contact_id.email.toLowerCase()
            ) {
              return false;
            } else if (
              user.user_id &&
              user.user_id.email &&
              this.getSingleDocumentData.data.current_active_user.toLowerCase() ==
                user.user_id.email.toLowerCase()
            ) {
              return false;
            } else if (
              this.getSingleDocumentData.data.is_anyone_can_approve &&
              user.sent_status
            ) {
              return false;
            } else {
              return true;
            }
          } else {
            if (
              (user.contact_id && user.contact_id.email) ||
              (user.contact && user.contact.email)
            ) {
              return false;
            } else if (user.user_id && user.user_id.email) {
              return false;
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
      }
    },
    getCurrentDocumentUser() {
      return this.documentUsers.find(
        (user) => user.user_id && user.user_id._id == this.userId
      );
    },
    goToEmployesPage() {
      this.$router.push({ path: "/employee-list" });
    },

    getData() {
      let data = {};

      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        let key = field.key;
        data[key] = this.elements[index].value || this.elements[index].source;
        if (field.type == "SIGNATURE") {
          this.signatureFields.push(field);
        }
      }
      // console.log('>>> getData(), this.elements', this.elements);
      return data;
    },

    goToDocuments() {
      this.$router.push({
        path: "/documents/all",
      });
    },

    refreshDocument() {
      this.$router.go();
    },
    setColor(selectedSignatureItem, color) {
      this.$set(selectedSignatureItem, "color", color);
    },
    captureSignature(item, index, pageIndex) {
      if (this.checkFieldAllow(item)) {
        return;
      }
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.pageIndex = pageIndex;
      this.captureSignatureDialog = true;
    },
    captureInitialFromPopup(item, index, pageIndex) {
      console.log(">>> captureInitialFromPopup() called");
      if (this.checkFieldAllow(item)) {
        return;
      }
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.pageIndex = pageIndex;

      // if (!this.setInitial()) {
      this.captureInitialDialog = true;
      // }
    },
    handleInitialClick(item, index, pageIndex) {
      this.clickCount++;
      if (this.clickCount === 1) {
        var self = this;
        this.singleClickTimer = setTimeout(function () {
          self.clickCount = 0;
          self.captureInitial(item, index, pageIndex);
        }, 400);
      } else if (this.clickCount === 2) {
        clearTimeout(this.singleClickTimer);
        this.clickCount = 0;
        this.captureInitialFromPopup(item, index, pageIndex);
      }
    },
    captureInitial(item, index, pageIndex) {
      // console.log('>>> captureInitial() called');
      if (this.checkFieldAllow(item)) {
        return;
      }
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.pageIndex = pageIndex;

      if (!this.setInitial()) {
        this.captureInitialDialog = true;
      }
    },
    setInitial(isFromPopup = false) {
      try {
        if (!isFromPopup) {
          if (this.currentAuthenticatedUserInitial != null) {
            this.selectedSignatureItem.source =
              this.currentAuthenticatedUserInitial;
            this.selectedSignatureItem.value =
              this.currentAuthenticatedUserInitial;
            this.elements[this.selectedSignatureItemIndex] =
              this.selectedSignatureItem;
            return true;
          }
        } else {
          if (
            this.$refs.myInitialPad &&
            this.$refs.myInitialPad.getInitialUrl &&
            this.$refs.myInitialPad.getInitialUrl == null
          ) {
            this.selectedSignatureItem.source =
              this.$refs.myInitialPad.getAuthenticatedUser.initial;
            this.selectedSignatureItem.value =
              this.$refs.myInitialPad.getAuthenticatedUser.initial;
            this.elements[this.selectedSignatureItemIndex] =
              this.selectedSignatureItem;
          } else {
            this.selectedSignatureItem.source =
              this.$refs.myInitialPad.getInitialUrl;
            this.selectedSignatureItem.value =
              this.$refs.myInitialPad.getInitialUrl;
            this.elements[this.selectedSignatureItemIndex] =
              this.selectedSignatureItem;
          }
          this.currentAuthenticatedUserInitial =
            this.selectedSignatureItem.source;
          return true;
        }
      } catch (err) {
        // console.log('>>> setInitial(), #10');
      }
      return false;
    },
    async saveInitial() {
      this.setInitial(true);
      this.captureInitialDialog = false;
    },

    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    backToEmployees() {
      this.$router.push({
        path: "employee-list",
      });
    },

    async updateEmployeeDocument() {
      try {
        let documentData = this.prepareDocumentData();
        let params = {
          id: this.employeeDocumentId,
          document_data: documentData,
          valid_from: this.userDocumentFormData.valid_from,
          expires_at: this.userDocumentFormData.expires_at,
          e_signature_required:
            this.userDocumentFormData.e_signature_value == "YES" ? true : false,
        };

        await this.$store.dispatch(
          "employeeDocuments/updateEmployeeDocument",
          params
        );

        if (this.getEmployeeDocumentUpdateStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document Data Saved Successfully",
          });
          this.goToDocuments();
        } else {
          this.$notify.error({
            title: "Error",
            message: "Erorr at updating document",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    prepareDocumentData() {
      let data = {};
      let user = this.getCurrentAuthUser();
      let date = new Date();
      this.elements.map((element) => {
        if (
          element.filled_by == user.value &&
          element.type == "DATE_SIGNED" &&
          !element.value
        ) {
          element.value = date;
        }
      });
      this.elements.forEach((element) => {
        if (element && (typeof element.value == 'number' || element.value) && element.type != "PRIMARY_FIELDS") {
          data[element.key] = element.value;
        } else if (element && element.source) {
          data[element.key] = element.source;
        } else if (element && element.files && element.files.length) {
          data[element.key] = element.files;
        } else if (element && element.content) {
          data[element.key] = element.content;
        } else if (data[element.key]) {
          data[element.key] = data[element.key];
        } else if (this.documentData[element.key]) {
          data[element.key] = this.documentData[element.key];
        } else {
          data[element.key] = "";
        }
      });
      return data;
    },

    onSignDocument() {
      this.eSignatureDialogVisible = true;
    },
    async updateDocumentSignature(eSignData) {
      try {
        this.eSignatureDialogVisible = false;
        this.eSignId = eSignData.e_signature_id;
        this.elements[this.selectedSignatureItemIndex].value =
          eSignData.signature;
        this.elements[this.selectedSignatureItemIndex].source =
          eSignData.signature;
        this.captureSignatureDialog = false;
        this.goToNextField();
      } catch (err) {
        console.log(err);
      }
    },
    async onESignView() {
      try {
        this.showSavedSignatureData = true;
        this.esignLoading = true;
        let user = this.getCurrentAuthUser();
        let params = {
          id: user.e_signature,
        };
        await this.$store.dispatch("employeeData/fetchESignData", params);
        this.esignLoading = false;
        this.esignData = this.getESignData;
      } catch (err) {
        console.log(err);
      }
    },
    //getVoided
    getDeclinedReason() {
      let reason = "";
      if (this.documentUsers) {
        let declinedUser = this.documentUsers.find((user) => {
          return user.declined_status == true;
        });

        if (declinedUser) {
          reason = declinedUser.declined_notes;
        }
      }
      return reason;
    },
    getCompletedFieldsCount() {
      this.completedFieldsCountLoading = true;
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            element.type != "FORMULA" &&
            (!this.checkFieldAllow(element) ||
              !this.checkPrimaryFieldAllow(element)) &&
            (element.required ||
              (element.type == "PRIMARY_FIELDS" && !element.initial_value))
          ) {
            if (element.type == "ATTACHMENT") {
              if (element && element.requiredFiles) {
                if (
                  element.files &&
                  element.files.length >= element.requiredFiles
                ) {
                  value = value + 1;
                }
              } else {
                if (element.files && element.files.length) {
                  value = value + 1;
                }
              }
            } else if (element.type == "MULTI_SELECT") {
              if (element.value && element.value.length > 0) {
                value = value + 1;
              }
            } else if (element.type == "CURRENCY") {
              if (typeof element.value == "number") {
                value = value + 1;
              }
            } else if (element.type == "PRIMARY_FIELDS") {
              if (element.content) {
                value = value + 1;
              }
            } else {
              if (element.value || element.source) {
                value = value + 1;
              }
            }
          }
        });
        this.completedFieldsCountLoading = false;
        return value;
      } else {
        this.completedFieldsCountLoading = false;
        return 0;
      }
    },

    getRemainingFieldsCount() {
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            !this.checkFieldAllow(element) &&
            // !element.value &&
            element.required
          ) {
            if (element.type == "ATTACHMENT") {
              if (element && element.requiredFiles) {
                if (
                  element.files &&
                  element.files.length <= element.requiredFiles
                ) {
                  value = value + 1;
                }
              } else {
                if (!element.files.length) {
                  value = value + 1;
                }
              }
            } else {
              if (!element.value) {
                value = value + 1;
              }
            }
            // value = value + 1;
          }
        });
        return value;
      } else {
        return 0;
      }
    },
    getIndexOfPrevField() {
      let index = this.currentFieldIndex > -1 ? this.currentFieldIndex - 1 : -1;
      if (index < 0) {
        this.currentFieldIndex = this.elements.length;
        // index = this.currentFieldIndex - 1;
        return this.getIndexOfPrevField();
      } else {
        let field = this.elements[index];
        if (
          field &&
          field.required &&
          ((!field.value && !field.source) || this.finish_drawer())
        ) {
          this.currentFieldIndex = this.currentFieldIndex - 1;
          if (this.checkFieldAllow(field)) {
            return this.getIndexOfPrevField();
          } else {
            return index;
          }
        } else if (
          field.type == "PRIMARY_FIELDS" &&
          !field.initial_value &&
          (!field.content || this.finish_drawer())
        ) {
          this.currentFieldIndex = this.currentFieldIndex - 1;
          if (this.checkPrimaryFieldAllow(field)) {
            return this.getIndexOfPrevField();
          } else {
            return index;
          }
        } else if (
          field.type == "ATTACHMENT" &&
          !this.checkFieldAllow(field) &&
          field.required
        ) {
          this.currentFieldIndex = this.currentFieldIndex - 1;
          if (field.requiredFiles) {
            if (field.files && field.files.length >= field.requiredFiles) {
              return this.getIndexOfPrevField();
            } else {
              return index;
            }
          } else {
            if (field.files && field.files.length) {
              return this.getIndexOfPrevField();
            } else {
              return index;
            }
          }
        } else if (field.type == "FORMULA") {
          return this.getIndexOfPrevField();
        } else {
          this.currentFieldIndex = this.currentFieldIndex - 1;
          console.log("index", !this.checkFieldAllow(field), field);
          if (
            (!this.checkFieldAllow(field) &&
              ((!this.isFieldFilled(field) &&
                !field.source &&
                field.required) ||
                this.finish_drawer())) ||
            (field.type == "PRIMARY_FIELDS" &&
              !this.checkPrimaryFieldAllow(field) &&
              (!field.content || this.finish_drawer()))
          ) {
            return index;
          } else {
            return this.getIndexOfPrevField();
          }
        }
      }
    },
    isFieldFilled(element) {
      if (element.type == "ATTACHMENT") {
        if (!element.files.length) {
          return false;
        }
      } else if (element.type == "MULTI_SELECT" && !element.value.length) {
        return false;
      } else {
        if (!element.value) {
          return false;
        }
      }
      return true;
    },
    goToPrevField() {
      let index = this.getIndexOfPrevField();
      if (
        this.elements &&
        this.elements.length &&
        this.elements[index] &&
        this.elements[index]["key"]
      ) {
        this.currentEnabledFieldKey = this.elements[index].key;
        this.currentEnabledField = this.elements[index];
        let key = this.removeHashesFromKey(this.elements[index].key);
        if (
          this.elements[index]["type"] == "SIGNATURE" &&
          !this.elements[index].source
        ) {
          this.captureSignature(this.elements[index], index);
        }
        // if (this.elements[index]["type"] == "ATTACHMENT") {
        //   this.captureAttachmentMethod(this.elements[index], index);
        // }
        if (this.$refs[key] && this.$refs[key][0]) {
          if (this.elements[index]["type"] == "CURRENCY") {
            this.$refs[key][0].$el.focus();
          }
          else if(this.elements[index]["type"] == "YES_OR_NO"){
            this.$refs[key][0].$el.focus();
          }
           else {
            this.$refs[key][0].focus();
            this.$refs[key][0].$el.focus();
          }
        }
      }
    },

    getIndexOfField() {
      let index = this.currentFieldIndex + 1;
      if (index >= this.elements.length) {
        this.currentFieldIndex = -1;
        // index = this.currentFieldIndex + 1;
        return this.getIndexOfField();
      } else {
        let field = this.elements[index];
        if (
          field &&
          field.required &&
          ((!field.value && !field.source) || this.finish_drawer())
        ) {
          this.currentFieldIndex = this.currentFieldIndex + 1;
          if (this.checkFieldAllow(field)) {
            return this.getIndexOfField();
          } else {
            return index;
          }
        } else if (
          field.type == "PRIMARY_FIELDS" &&
          !field.initial_value &&
          (!field.content || this.finish_drawer())
        ) {
          this.currentFieldIndex = this.currentFieldIndex + 1;
          if (this.checkPrimaryFieldAllow(field)) {
            return this.getIndexOfField();
          } else {
            return index;
          }
        } else if (
          field.type == "ATTACHMENT" &&
          !this.checkFieldAllow(field) &&
          field.required
        ) {
          this.currentFieldIndex = this.currentFieldIndex + 1;
          if (field.requiredFiles) {
            if (field.files && field.files.length >= field.requiredFiles) {
              return this.getIndexOfField();
            } else {
              return index;
            }
          } else {
            if (field.files && field.files.length) {
              return this.getIndexOfField();
            } else {
              return index;
            }
          }
        } else if (field.type == "FORMULA") {
          return this.getIndexOfField();
        } else {
          this.currentFieldIndex = this.currentFieldIndex + 1;
          if (
            (!this.checkFieldAllow(field) &&
              ((!this.isFieldFilled(field) &&
                !field.source &&
                field.required) ||
                this.finish_drawer())) ||
            (field.type == "PRIMARY_FIELDS" &&
              !this.checkPrimaryFieldAllow(field) &&
              (!field.content || this.finish_drawer()))
          ) {
            return index;
          } else {
            return this.getIndexOfField();
          }
        }
      }
    },

    goToNextField() {
      let index = this.getIndexOfField();
      console.log("indexindex",index);
      if (
        this.elements &&
        this.elements.length &&
        this.elements[index] &&
        this.elements[index]["key"]
      ) {
        this.disablePrevButton = false;
        let key = this.removeHashesFromKey(this.elements[index].key);
        this.currentEnabledFieldKey = this.elements[index].key;
        this.currentEnabledField = this.elements[index];
        if (
          this.elements[index]["type"] == "SIGNATURE" &&
          !this.elements[index].source
        ) {
          this.captureSignature(this.elements[index], index);
        }
        // if (this.elements[index]["type"] == "ATTACHMENT") {
        //   this.captureAttachmentMethod(this.elements[index], index);
        // }
        if (this.$refs[key] && this.$refs[key][0]) {
          if (this.elements[index]["type"] == "CURRENCY") {
            this.$refs[key][0].$el.focus();
          }
          else if(this.elements[index]["type"] == "YES_OR_NO"){
            this.$refs[key][0].$el.focus();
          }
           else {
            this.$refs[key][0].focus();
          }
        }
      }
    },
    getCurrentUserFieldsCount() {
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            element.type != "FORMULA" &&
            (!this.checkFieldAllow(element) ||
              !this.checkPrimaryFieldAllow(element)) &&
            (element.required ||
              (element.type == "PRIMARY_FIELDS" && !element.initial_value))
          ) {
            value = value + 1;
          }
        });
        return value;
      } else {
        return 0;
      }
    },
    getFieldsCountProgress() {
      let completedFieldsCnt = 0;
      let totalFieldsCnt = 0;
      if (this.getCurrentUserFieldsCount() && this.getCompletedFieldsCount()) {
        completedFieldsCnt = this.getCompletedFieldsCount();
        totalFieldsCnt = this.getCurrentUserFieldsCount();
        return parseInt((completedFieldsCnt / totalFieldsCnt) * 100);
      } else {
        return 0;
      }
    },

    getFieldsCountProgressBarMethod() {
      let total_fields = "";
      let completedFieldsCnt = this.getCompletedFieldsCount();
      let RemainingFieldsCnt = this.getCurrentUserFieldsCount();
      total_fields += completedFieldsCnt + " " + "/" + " " + RemainingFieldsCnt;
      return total_fields;
    },

    format(percentage) {
      let per = percentage === 100 ? "" : `` || percentage != 100 ? "" : ``;
      console.log(per);
      let doc = "";
      return doc;
    },
    removeHashesFromKey(str) {
      return str.replace(/#/g, "");
    },
    deleteRow(index) {
      this.documentUsers.splice(index, 1);
    },
    async updateDocument() {
      try {
        let documentData = this.prepareDocumentData();
        let params = {
          document_data: documentData,
          document_id: this.$route.params.employee_document_id,
          document_users: this.documentUsers,
          is_finish: true,
          is_print: true,
        };
        let requiredFields = this.getCurrentUserRequiredFields;
        if (!requiredFields.length) {
          await this.$store.dispatch(
            "documents/updateDocumentDataById",
            params
          );
          if (this.getSingleDocumentUpdateStatus) {
            this.$notify.success({
              title: "Success",
              message: "Document updated successfully",
            });
            this.refreshDocument();
          } else {
            if (
              this.getDocumentApprovalErrors &&
              this.getDocumentApprovalErrors.critical_error
            ) {
              let message = this.getDocumentApprovalErrors.critical_error;
              this.errorNotify(`${message}`);
            } else {
              this.errorNotify("Error in approving document");
            }
            window.location.reload();
          }
        } else {
          this.requiredAlert = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    optionalFieldsCount() {
      let value = 0;
      if (this.elements && this.elements.length) {
        this.elements.forEach((element) => {
          if (
            element &&
            element.type != "logo" &&
            element.type != "DATE_SIGNED" &&
            element.type != "PARAGRAPH" &&
            element.type != "HEADING" &&
            element.type != "PRIMARY_FIELDS" &&
            !this.checkFieldAllow(element) &&
            !element.required
          ) {
            if (element.type == "ATTACHMENT") {
              if (!element.files.length) {
                value = value + 1;
              }
            } else if (
              element.type == "MULTI_SELECT" &&
              !element.value.length
            ) {
              value = value + 1;
            } else {
              if (!element.value) {
                value = value + 1;
              }
            }
          }
        });
      }
      return value;
    },
    finishDocConfirm() {
      let isAllFieldsFilled = this.optionalFieldsCount();
      if (isAllFieldsFilled) {
        this.$confirm(
          "Optional fields need to be filled. Are you sure to finish the document?"
        )
          .then(() => {
            this.finishDocument();
          })
          .catch(() => {});
      } else {
        this.finishDocument();
      }
    },
    async finishLater() {
      this.is_finish = false;
      this.finishDocument();
    },
    async PrintAndSignDoc() {
      this.printloading = true;
      if (this.files.length) {
        await this.mergeAllDocs();
      } else {
        this.printloading = false;
        this.$message.warning("Please upload a file to finish document");
      }
    },
    checkUpdateContacts() {
      if (
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data
          .update_contacts
      ) {
        return true;
      }
      return false;
    },
    async updateContactsWithDocumentData() {
      let contactFields = this.elements.filter((el) => {
        if (
          el &&
          el.type == "PRIMARY_FIELDS" &&
          !el.initial_value &&
          el.selected_tag != "full_name"
        ) {
          return el;
        }
      });
      let allContacts = [];
      // let sender;
      this.documentUsers.forEach((user) => {
        // if (user.type != "SENDER") {
        let contactUpdateDetails = {};
        contactFields.forEach((field) => {
          if (
            user.value == field.selected_user &&
            field.content &&
            field.content.length
          ) {
            contactUpdateDetails[field.selected_tag] = field.content;
            if (user.user_id) {
              contactUpdateDetails["user_id"] =
                user.user_id && user.user_id._id
                  ? user.user_id._id
                  : user.user_id;
            }
            if (user.contact_id) {
              contactUpdateDetails["contact_id"] =
                user.contact_id && user.contact_id._id
                  ? user.contact_id._id
                  : user.contact_id;
            }
            if (user.entity_data_id) {
              contactUpdateDetails["entity_data_id"] = user.entity_data_id._id
                ? user.entity_data_id._id
                : user.entity_data_id;
              contactUpdateDetails["contact_type"] =
                user.contact_type && user.contact_type._id
                  ? user.contact_type._id
                  : user.contact_type;
            }
            contactUpdateDetails["email"] = user.email;
            // contactUpdateDetails["first_name"] =
            //   user && user.contact_id && user.contact_id.first_name
            //     ? user.contact_id.first_name
            //     : user.first_name;
            // contactUpdateDetails["last_name"] =
            //   user && user.contact_id && user.contact_id.last_name
            //     ? user.contact_id.last_name
            //     : user.last_name;
          }
        });
        if (contactUpdateDetails && contactUpdateDetails.email) {
          allContacts.push(contactUpdateDetails);
        }
        // } else {
        //   sender =
        //     user && user.user_id && user.user_id._id ? user.user_id._id : null;
        // }
      });
      allContacts.map(async (user) => {
        let re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (user && user.phone && re.test(user.phone)) {
          user["phone_number"] = user["phone"];
        }
      });
      // allContacts.forEach(async (user) => {
      //   await this.updateContact(user, sender);
      // });
      console.log(allContacts);
      await this.$store.dispatch("contacts/updateDocumentPrimaryDetails", {
        params: allContacts,
      });

      // console.log(contactFields);
    },
    async updateContact(data, sender) {
      try {
        let params = {};
        let contactId = data.contact_id;
        if (data.phone_number) {
          params.phone_number = data.phone_number;
        }
        if (data.email) {
          params.email = data.email;
        }
        if (data.first_name) {
          params.first_name = data.first_name;
        }
        if (data.last_name) {
          params.last_name = data.last_name;
        }
        if (data.contact_type) {
          params.contact_type = data.contact_type;
        }
        if (data.company_name) {
          params.company_name = data.company_name;
        }
        if (data.title) {
          params.title = data.title;
        }
        if (data.address) {
          params.address = data.address;
        }
        if (sender) {
          params.sender = sender;
        }
        console.log("params", contactId, params);
        await this.$store.dispatch("contacts/updateContact", {
          contact_id: contactId,
          contact: params,
        });
      } catch (err) {
        console.log(err);
      }
    },
    //this method is for download document for print & sign functionality
    DownloadDocFOrPrintAndSign() {
      this.is_completed = false;
      this.downloadCompletedDocument();
    },
    resetPrintAndSign() {
      this.printandsign = false;
      this.files = [];
      this.is_completed = true;
      this.activeStep = 0;
    },
    async finishDocument() {
      this.is_completed = true;
      this.documentDataLoading = true;
      try {
        let documentData = this.prepareDocumentData();
        if (
          this.documentSettings &&
          this.documentSettings.update_entity_data == 1
        ) {
          this.updateCurrentUserEntityData(this.documentUsers);
        }
        let configurableDocumentData = this.prepareFields();
        this.updateContactsWithDocumentData();
        let params = {
          document_data: documentData,
          document_id: this.$route.params.employee_document_id,
          document_users: this.documentUsers,
          fields_required: false,
          is_finish: this.is_finish,
          is_print: this.is_print,
          configurable_document_data: configurableDocumentData,
          // printed_doc_url: this.printed_doc_url
        };
        if (this.is_print) {
          params.printed_doc_url = this.printed_doc_url;
        }
        await this.$store.dispatch("documents/finishDocumentDataById", params);
        if (this.is_finish) {
          if (this.getSingleDocumentUpdateStatus) {
            this.$notify.success({
              title: "Success",
              message: "Document updated successfully",
            });
            if (this.getSingleDocumentCompletedStatus.data.document_completed) {
              // let checkUpdateContacts = await this.checkUpdateContacts();
              // if (checkUpdateContacts) {
              //   await this.updateContactsWithDocumentData();
              // }
              if (
                this.documentSettings &&
                this.documentSettings.update_entity_data == 0
              ) {
                this.updateCurrentUserEntityData(this.documentUsers);
                // this.updateContactsWithDocumentData();
              }
              if (this.getSingleDocumentCompletedStatus.data.document_data) {
                this.setNewElementsData(
                  this.getSingleDocumentCompletedStatus.data.document_data
                );
              }
              this.downloadCompletedDocument();
              // this.documentDataLoading = false;
            } else {
              if (this.nextWorkflowDocument) {
                this.goToNextDocument();
              } else {
                this.refreshDocument();
              }
            }
          } else {
            this.$notify.error({
              title: "Error",
              message: this.getSingleDocumentUpdateErrors.critical_error,
            });
            this.refreshDocument();
          }
        } else {
          this.$notify.success({
            title: "Success",
            message:
              "Document saved successfully. Don't forget to Finish Later",
          });
          this.$router.push({
            path: "/emp-documents/custom/finish",
            name: "finish-later",
          });
        }
      } catch (err) {
        this.documentDataLoading = false;
        console.log(err);
      }
    },
    prepareFields() {
      let users =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.configurable_document_data &&
        this.getSingleDocumentData.data.configurable_document_data
          .document_users
          ? this.getSingleDocumentData.data.configurable_document_data
              .document_users
          : this.documentUsers;
      let data = {
        name: this.documentName,
        type: "CUSTOM",
        configure_type: "DYNAMIC",
        company_document_id:
          this.getSingleDocumentData.data.company_document_id,
        background_images: this.backgroundImages,
        document_users: users,
        document_upload_url: this.document_url_path,
        document_upload_urls: this.document_url_paths,
        document_expiration_settings: this.documentSettings,
        is_template: this.isTemplate,
        template_title: this.documentName,
        scale: this.scale,
        pages: [
          {
            page_no: 1,
            background: this.hasBackground,
            background_image: this.backgroundImage,
            background_images: this.backgroundImages,
            style:
              "position: relative;width: 1240px;border: 1px solid #ccc;margin: 1em;max-height: 90vh;overflow: scroll;padding: 20px;",
            fields: this.elements,
            page_base_width: this.currentFormBuilderWidth,
            templates_used: Array.from(new Set(this.templatesUsed)),
            entities_used: [],
          },
        ],
      };
      return data;
    },
    goToNextDocument(isDeclined) {
      let nextDocumentName = this.selectedWorkflowData.documents.find(
        (e) => e.document_id._id == this.nextWorkflowDocument
      );
      this.nextDocumentAlertModal = true;
      if (isDeclined) {
        this.documentCompletedStatus = "declined";
      } else {
        this.documentCompletedStatus = "completed";
      }
      if (
        nextDocumentName &&
        nextDocumentName.document_id &&
        nextDocumentName.document_id.title
      ) {
        this.nextDocumentAlertText = `Next you have to fill ${nextDocumentName.document_id.title} document`;
      }
      this.$router.push({
        name: "employee-documents-custom-document",
        params: {
          employee_document_id: this.nextWorkflowDocument,
        },
        query: {
          workflow_id: this.workflow_data_id,
        },
      });
      setTimeout(() => {
        this.refreshDocument();
      }, 2000);
    },
    setNewElementsData(data) {
      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];
        const documentValue = data[field.key];
        if (
          (this.elements[index].type == "SIGNATURE" ||
            this.elements[index].type == "INITIAL") &&
          documentValue
        ) {
          this.elements[index].source = documentValue;
          this.$set(this.elements[index], "source", documentValue);
          // console.log('>>> setNewElementsData(), documentValue', documentValue);
        }
        if (
          this.elements[index].type == "PRIMARY_FIELDS" &&
          !this.elements[index].content
        ) {
          this.$set(this.elements[index], "content", documentValue);
        }
        if (documentValue) {
          this.$set(this.elements[index], "value", documentValue);
        }
      }
    },
    checkFillRequiredFields() {
      let user = this.documentUsers.find(
        (x) => x.user_id && x.user_id.email == this.currentAuthUserId
      );
      let cnt = 0;
      if (user) {
        cnt = this.elements.filter((element) => {
          if (
            element.filled_by == user.value &&
            element.required &&
            !element.value
          ) {
            return true;
          }
        }).length;
      }
      if (cnt) {
        return true;
      } else {
        return false;
      }
    },
    checkFillRequiredFieldsWithoutSign() {
      let user = this.getCurrentAuthUser();
      let cnt = 0;
      if (user) {
        cnt = this.elements.filter((element) => {
          if (
            element.type != "SIGNATURE" &&
            element.type != "PRIMARY_FIELDS" &&
            element.type != "CHECKBOX"
          ) {
            if (element.filled_by == user.value && element.required) {
              if (
                (element.type == "INITIAL" && !element.source) ||
                (!element.value && element.type != "INITIAL")
              ) {
                return true;
              }
            }
          }
        }).length;
      }
      if (cnt) {
        return false;
      } else {
        return true;
      }
    },
    checkFillRequiredFieldsWithoutSignInitial() {
      let user = this.getCurrentAuthUser();
      let cnt = 0;
      if (user) {
        cnt = this.elements.filter((element) => {
          if (
            element.type != "SIGNATURE" &&
            element.type != "PRIMARY_FIELDS" &&
            element.type != "INITIAL"
          ) {
            if (
              element.filled_by == user.value &&
              element.required &&
              !element.value
            ) {
              return true;
            }
          }
        }).length;
      }
      if (cnt) {
        return false;
      } else {
        return true;
      }
    },
    editEmployeeDocument() {
      this.$router.push({
        name: "employee-documents-custom-document-edit",
        params: this.$route.params,
      });
    },
    async resendDocLink(contact) {
      try {
        let params = {
          document_id: this.$route.params.employee_document_id,
          contact_id:
            contact && contact.contact._id
              ? contact.contact._id
              : contact.contact_id._id,
          is_new_user: false,
        };
        this.esignLoading = true;
        await this.$store.dispatch(
          "documents/resendDocumentLinkToContact",
          params
        );
        this.esignLoading = false;
        if (this.getResendDocumentStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document link sent successfully",
          });
        }
      } catch (err) {
        this.esignLoading = false;
        console.log(err);
      }
    },
    rejectDoc() {
      this.rejectUserDocumentModal = false;
      this.rejectUserDocument(this.reason_for_reject);
    },
    declineDoc() {
      if (this.declineDocumentNote) {
        this.DocumentDecline(this.declineDocumentNote);
      }
    },
    // checkPermissionForDocument(permission) {
    //   if (
    //     this.getActiveWorkspace &&
    //     this.getActiveWorkspace.plan_type == "INDIVIDUAL"
    //   ) {
    //     let isCreator =
    //       this.getSingleDocumentData &&
    //       this.getSingleDocumentData.data &&
    //       this.getSingleDocumentData.data.document_users
    //         ? this.getSingleDocumentData.data.created_by._id.toString() ==
    //           this.getAuthenticatedUser._id.toString()
    //         : false;
    //     if (isCreator) {
    //       return true;
    //     }
    //   } else {
    //     let hasUser =
    //       this.getSingleDocumentData &&
    //       this.getSingleDocumentData.data &&
    //       this.getSingleDocumentData.data.document_users
    //         ? this.getSingleDocumentData.data.document_users.findIndex(
    //             (cu) => cu.email == this.getAuthenticatedUser.email
    //           )
    //         : -1;
    //     let isCreator =
    //       this.getSingleDocumentData &&
    //       this.getSingleDocumentData.data &&
    //       this.getSingleDocumentData.data.document_users
    //         ? this.getSingleDocumentData.data.created_by._id.toString() ==
    //           this.getAuthenticatedUser._id.toString()
    //         : false;
    //     if (this.getUserType && this.getUserType.name == "OWNER") {
    //       return true;
    //     } else if (
    //       (hasUser != -1 || isCreator) &&
    //       this.getUserType &&
    //       this.getUserType.permissionSet
    //     ) {
    //       return this.getUserType.permissionSet.includes(permission)
    //         ? true
    //         : false;
    //     } else if (this.getUserType && this.getUserType.permissionSet) {
    //       return this.getUserType.permissionSet.includes(permission)
    //         ? true
    //         : false;
    //     } else {
    //       return false;
    //     }
    //   }
    // },
  },
  watch: {
    elements: {
      handler: function () {
        bus.$emit("formula-updated");
      },
      deep: true,
    },
  },
  beforeDestroy() {
    // bus.$off("entityData-updated");
    this.$store.commit("employeeData/setESignData", null, {
      root: true,
    });
    this.$store.commit("settings/setApplicationSettings", null, {
      root: true,
    });

    this.$store.commit("fileUpload/setUploadStatus", false, {
      root: true,
    });
    this.$store.commit("fileUpload/setUploadFileDataStatus", false, {
      root: true,
    });

    this.$store.commit("contacts/setAllContacts", null, {
      root: true,
    });
    this.$store.commit("contacts/setContactUser", null, {
      root: true,
    });

    this.$store.commit("contacts/setCreateContactStatus", false, {
      root: true,
    });
    this.$store.commit("contacts/setUpdateContactStatus", false, {
      root: true,
    });
    this.$store.commit("contacts/setCreateContactData", null, {
      root: true,
    });
    this.$store.commit("contacts/setContact", null, {
      root: true,
    });

    this.$store.commit("contactTypes/setAllContactTypes", false, {
      root: true,
    });

    this.$store.commit("employeeDocuments/setDocumentApprovalStatus", false, {
      root: true,
    });
    this.$store.commit(
      "employeeDocuments/setDocumentCompletedAfterApproval",
      null,
      {
        root: true,
      }
    );
    this.$store.commit(
      "employeeDocuments/setDocumentApprovalErrors",
      {},
      {
        root: true,
      }
    );

    this.$store.commit("documents/setSingleDocumentData", null, {
      root: true,
    });
    this.$store.commit("documents/setDocumentVoidStatus", false, {
      root: true,
    });

    this.$store.commit("documents/setDocumentSendStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setSingleDocumentUpdateStatus", false, {
      root: true,
    });

    this.$store.commit("documents/setArchiveDocumentStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setResendDocumentStatus", false, {
      root: true,
    });

    this.$store.commit("documents/setDraftDocumentUpdateStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setDocumentDeclineStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setDocumentCompletedStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setDocumentLogs", null, {
      root: true,
    });

    this.$store.commit("documents/setDocumentSaveAsTemplate", null, {
      root: true,
    });
    this.$store.commit("documents/setDocumentSaveAsTemplateData", null, {
      root: true,
    });
    this.$store.commit("documents/setSingleDocumentCompletedStatus", false, {
      root: true,
    });

    this.$store.commit("documents/setDocumentCorrectStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setDocumentCorrectErrors", null, {
      root: true,
    });

    this.$store.commit("documents/setCloneVoidDocStatus", false, {
      root: true,
    });
    this.$store.commit("documents/setCloneVoidDocData", false, {
      root: true,
    });
    this.$store.commit("documents/setSingleDocumentUpdateErrors", null, {
      root: true,
    });
    this.$store.commit("documents/setDocumentUserTermsUpdate", null, {
      root: true,
    });

    this.$store.commit("documents/setUpdateDocumentUsersStatus", false, {
      root: true,
    });

    this.$store.commit("documents/setUpdateDocumentUsersErrors", null, {
      root: true,
    });

    this.$store.commit("documents/setSendCompletedDocumentStatus", false, {
      root: true,
    });
    this.$store.commit("templateWorkflow/setCreatedworkflowDataById", null, {
      root: true,
    });
    this.$store.commit("templateWorkflow/setCreatedworkflowStatus", false, {
      root: true,
    });

    this.$store.commit("templateWorkflow/setCurrentUserStatus", false, {
      root: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.attach-save-cancel {
  background: transparent;
  border-radius: 2px;
  color: #4c4b4e;
}
.attach-save-btn {
  background: #409eff;
  border-radius: 2px;
  color: #ffffff;
}
.attachment-remove {
  right: 0;
  cursor: pointer;
}
.valid-date {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #4e575f;
  margin-top: 15px;
  margin-left: 5px;
}
.valid-from {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: #9a9a9a;
  margin-top: 18px;
  margin-left: 35px;
}
.attachment-number {
  font-size: 10px;
  position: relative;
  top: -18px;
  color: #9a9a9a;
}
.avatar-uploader {
  width: 100% !important;
  height: 70px !important;
  border: 1px dashed #409eff;
  background-color: #f7f9ff;
  text-align: center;
  .upload-attchment-box {
    display: flex;
    // padding: 25px;
    h4 {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #4b545c;
    }
  }
}
.details {
  font-family: inter;
  font-size: 14px;
  font-weight: 600;
}
.table {
  font-family: inter;
  font-size: 12px;
}
.finish-drawer {
  background-color: #fff0f7;
  text-align: center;
  padding-bottom: 10px;
  .finish-drawer-heading {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #303133;
  }
  .finish-drawer-details {
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: #303133;
  }
  .finish-drawer-stay {
    color: #4c4b4e;
    font-weight: 400;
    // height: 36px;
    text-align: center;
    min-width: 105px;
  }
  .finish-drawer-finish {
    border-radius: 2px;
    // height: 36px;
    text-align: center;
  }
}
.history-body {
  .single-stat {
    padding: 1em 1.5em;
  }
  // .stat-item:last-child {
  //   .stat-divider {
  //     display: none;
  //   }
  // }
}
.document-root {
  position: relative;
  width: 950px;
  border-radius: 10px;
  margin: 10px auto 0;
  @media (min-width: 1300px) {
    &.builder-default {
      width: 950px;
    }
  }
  @media (min-width: 320px) {
    max-width: 950px;
  }
  .form-field-options {
    position: sticky;
    bottom: 0px;
    margin: 10px auto 0;
    padding: 8px 10px;
    background-color: #ffffff;
    border: 1px solid #efefef;
    border-radius: 5px;
  }
  .each-stat {
    margin-right: 1em;
  }
  .field-stats-block {
    p {
      line-height: 30px;
      &.text {
        color: #333333;
        font-weight: 400;
      }
    }
    .count {
      margin-right: 0.5em;
      background-color: #ffffff;
      height: 30px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff !important;
      font-weight: 600;
      font-size: 1.1em;
      border-radius: 3px;
      &.completed {
        background-color: #027e02;
        color: #ffffff !important;
      }
      &.in-progress {
        background-color: #0101ca;
        color: #ffffff !important;
      }
    }
  }
}
.form-builder {
  width: 100%;
  max-height: 100%;
  background-color: #ffffff;
  border: 1px solid #efefef;
  -webkit-box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  .form-image-holder {
    margin-bottom: 8%;
    width: 100%;
    img {
      width: 100%;
    }
    div {
      width: 100%;
      height: 100%;
    }
  }

  .form-fields-holder {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .each-element img {
      width: 100%;
    }
  }
}
#drag-template-background {
  @media (min-width: 992px) {
    display: flex;
    justify-content: center;
  }
  .img-fluid {
    height: auto !important;
  }
  .inner-navbar {
    &.is-mobile {
      .inner-navbar-2nd-level-child {
        .inner-navbar-1th-level-child {
          width: 100vw;
          .go-back-btn {
            display: flex;
            align-items: center;
          }
          .document-title-wrapper {
            width: 70%;
            .document-title {
              margin-left: 10px;
              width: 100%;
            }
          }
          .right-icons-wrapper {
            width: 83px;
            display: flex;
            justify-content: space-around;
            .btn-for-info-tab {
              display: flex;
              img {
                width: 18px;
              }
            }
            .btn-for-other-options-tab {
              display: flex;
              img {
                width: 18px;
              }
            }
          }
        }
      }
    }
  }
  .inner-navbar {
    // max-height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #ffffff;
    border: 1px solid #efefef;
    margin-bottom: 0 !important;
    & > .d-flex {
      gap: 10px;
      .back-btn {
        height: inherit;
      }
    }
    .left-block {
      .el-input__inner {
        min-width: 250px;
        max-width: 300px;
        background: #fff;
        height: 47px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      padding: 7px 14px;
      font-weight: 600;
      font-size: 0.91em;
    }
    .expiry-date {
      border-radius: 20px;
      padding: 0px 10px;
      background: #f754a2;
      color: #ffffff;
      font-weight: 600;
      font-size: 0.91em;
      border-color: #f754a2;
    }

    .user-tag {
      border-radius: 20px;
      padding: 4px;
      line-height: 1;
      height: 30px;
      width: 30px;
      height: auto;
      margin-left: -0.2em;
    }
    .manage-recipients {
      padding: 7px 14px;
      border: none;
      .el-tag {
        border-radius: 20px;
        padding: 4px;
        line-height: 1;
        height: 30px;
        width: 30px;
        height: auto;
        margin-left: -0.2em;
      }
    }
  }

  .navbar-status {
    // padding-right: 10px;
    // padding-left: 10px;
    &.is-mobile {
      .el-icon-success {
        margin-top: 35px;
      }
    }
    position: fixed;
    border: 1px solid #dcdfe6;
    position: relative;
  }
  .document-preview-block {
    position: relative;
    @media (min-width: 992px) {
      position: fixed;
    }
    top: 64px;
    display: grid;
    &.singleColumn {
      justify-content: center;
    }

    &.twoColumn {
      grid-template-columns: 1fr 340px;
    }
    // justify-items: space-between;
    // justify-items: center;
    .activity-block {
      background-color: #ffffff;
      // border-left: 1px solid #efefef;
      // Tags
      .el-tabs {
        box-shadow: none;
        min-height: calc(100vh - 62px);
      }
    }
    td {
      padding-top: 0;
      vertical-align: top;
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 80%;
      }
    }
    .inputs-list {
      background: #fff;
      padding: 15px;
      box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.06),
        0 1px 0px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      .el-button {
        border: none;
        background: rgba(236, 245, 255, 0.7);
        &:hover {
          background: rgba(236, 245, 255, 1);
        }
      }
      li {
        &:not(:last-child) {
          margin-bottom: 15px;
        }
      }
    }
  }
  .form-image {
    max-width: 770px;
    min-height: 1000px;
    background-color: #e6dcdc;
  }
  .el-input__inner {
    display: inline !important;
  }

  .form-holder {
    width: 100%;
    position: relative;
    .el-input__inner,
    .el-textarea__inner {
      height: 100% !important;
      min-height: 30px !important;
      line-height: inherit !important;
    }
    input[type="checkbox"] {
      margin: 0 !important;
    }
  }

  .sample-form1 {
    position: relative;
    width: 100%;
    max-height: 91vh;
    overflow: scroll;
    border: 1px solid #ccc;
    margin-left: 20px;
    margin-bottom: 45px;

    ///
    .each-page {
      position: relative;
      width: 900px;
      display: block;
      height: 800px;
      overflow-y: auto;
      .form-image {
        height: 800px;
        position: absolute;
        width: 850px;
        top: 0;
        left: 0;
      }
      .form-fields {
        height: 800px;
        position: absolute;
        width: 850px;
        top: 0;
        left: 0;
        z-index: 100;
      }
      .page-image {
        width: 850px;
        margin: 0 auto;
      }
    }
  }

  .color-btn {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin: 10px;
    &.red {
      background-color: red;
    }
    &.black {
      background-color: black;
    }

    &.green {
      background-color: green;
    }
  }

  // Fields
  .right-side-bar {
    .form-fields-set {
      background-color: #ffffff;
      padding: 1.25em 1em;
      border-radius: 2px;
      -webkit-box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
      box-shadow: 0 0px 10px 1px rgba(0, 0, 0, 0.03);
      .el-form-item {
        margin-bottom: 0.5em;
      }
      height: calc(100vh - 157px) !important;
      &.is-mobile {
        height: calc(100vh - 191px) !important;
      }
    }
  }
}
</style>

<style lang="scss">
.el-date-editor {
  .el-input__prefix {
    display: none !important;
  }
}
.multiline {
  border-radius: 4px !important;
  background: transparent !important;
  border: 1px solid #dcdfe6;
}
.form-holder {
  .el-textarea {
    &.textare-background {
      textarea {
        background: transparent !important;
        padding: 0px !important;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        font-style: inherit;
      }
    }
    &.currency-input {
      width: 100% !important;
      height: 100% !important;
      border: none !important;
      border-color: transparent !important;
      background: transparent !important;
    }
    &.textarea-nowrap {
      textarea {
        white-space: nowrap !important;
      }
    }
  }
}
.form-fields-holder {
  .el-date-editor {
    &.date-picker {
      input.el-input__inner {
        text-align: center !important;
      }
      .el-input__prefix {
        display: none;
      }
      .el-input__suffix {
        .el-input__suffix-inner {
          .el-icon-circle-close {
            display: inherit;
            line-height: 1 !important;
          }
        }
      }
    }
  }
  .date-signed {
    .el-input__prefix {
      display: none;
    }
  }
  textarea {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
  .el-input {
    input {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  }
}
.dialog-initial {
  .el-dialog {
    min-width: 320px;
  }
}
.document-container {
  position: relative;
  .el-scrollbar {
    height: calc(100vh - 65px);
  }
  .el-scrollbar__thumb {
    width: 20px;
  }
  .el-input__inner {
    padding: 0 !important;
  }
}
.view-configure-document {
  padding-top: 0 !important;
  background-color: #f8f9fa;
  min-height: 100vh;
  .field-identifer {
    position: absolute;
    top: 0;
    left: 2px;
    p {
      color: #ffffff;
      position: relative;
      top: -30px;
      left: 10px;
    }
    img {
      border-radius: 3px;
    }
  }
  .field-identifer-mobile {
    position: absolute;
    top: 0;
    left: 2px;
    animation-name: floating;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    p {
      color: #ffffff;
      position: relative;
      top: -30px;
      left: 10px;
    }
    img {
      border-radius: 3px;
    }
  }
  @keyframes floating {
    from {
      transform: translate(0, 0px);
    }
    65% {
      transform: translate(0, 15px);
    }
    to {
      transform: translate(0, -0px);
    }
  }
  .document-title {
    line-height: 62px;
    font-size: 1.25em;
    font-weight: 400;
    margin-bottom: 0;
  }
  .form-title {
    .el-input {
      position: relative;
      input {
        padding: 0;
        line-height: 1;
        background-color: rgba(255, 255, 255, 0.35);
        border: none;
        font-size: 1.5em;
        height: 60px !important;
        font-weight: 400;
        letter-spacing: -0.5px;
        margin-bottom: 0;
        color: #222222;
        box-shadow: none;
      }
      &::before {
        position: absolute;
        content: "";
        top: 0;
        height: 20px;
        width: 10px;
        background-image: url(/img/hover-dots.ecfb2fa2.svg);
        background-size: 10px 20px;
        background-repeat: no-repeat;
        background-position: center;
        left: 0px;
        opacity: 0;
        z-index: 10;
        transition: 0.3s all ease-in-out;
        -webkit-transition: 0.3s all ease-in-out;
      }
    }
  }
  .form-builder {
    // .req-item {
    //   button {
    //     &:focus {
    //       outline: 2px solid rgb(21, 101, 216) !important;
    //     }
    //   }
    // }
    .el-input,
    .el-select {
      height: inherit;
      width: inherit;
      .el-input__inner {
        height: inherit;
        width: inherit;
      }
    }
    // .field-focused {
    //   outline: 2px solid rgb(21, 101, 216) !important;
    //   box-shadow: 0 4px 8px 0 rgb(21, 101, 216),
    //     0 6px 20px 0 rgba(0, 0, 0, 0.19);
    // }
    // .default {
    //   outline: 2px solid rgb(21, 101, 216) !important;
    // }
    // .completed {
    //   outline: 2px solid rgb(83, 216, 21) !important;
    // }
    // .active {
    //   outline: 2px solid rgb(21, 101, 216) !important;
    //   box-shadow: 0 4px 8px 0 rgb(21, 101, 216),
    //     0 6px 20px 0 rgba(0, 0, 0, 0.19);
    // }
  }
  .activity-block {
    .el-tabs__content {
      padding: 0;
    }
    .el-tabs--border-card {
      .el-tabs__header {
        .el-tabs__item {
          &.is-active {
            color: #f15178;
          }
        }
      }
    }
  }

  .right-block {
    height: inherit;
    display: flex;
    align-items: center;
  }
}
.req-item {
  .el-textarea {
    textarea {
      height: 100% !important;
    }
  }
}
.el-message-box {
  @media (max-width: 575.98px) {
    width: 95% !important;
  }
}
</style>

<style lang="scss" scoped>
.workflow-select {
  .el-select {
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    .el-input {
      width: 100% !important;
      height: 100% !important;
      border: none !important;

      font: inherit;
      .el-input__inner {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
      }
    }
    .el-input__suffix-inner {
      i {
        line-height: 100% !important;
        border: none !important;
      }
    }
  }
}
.pdf-page-preview {
  width: 100%;
  text-align: center;
  border-right: 1px solid #ccc;
  .add-page-bottom {
    background: transparent;
    border: none;
  }
  .add-page-top {
    border: none;
    position: relative;
    background: transparent;
    top: 30px;
    // width: 40px;
    // height: 40px;
  }
  .rotate-buttons {
    position: relative;
    top: 60px;
    .el-button {
      visibility: hidden;
      // visibility: visible;
    }
  }
  .canvas-holder {
    position: relative;
    top: -25px;
    &:hover {
      .rotate-buttons {
        .el-button {
          visibility: visible;
        }
        // background-color: honeydew;
        // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }
  }
}
// .attachment-dialog-main {
// }
.terms-conditions-dilalog-main {
  position: absolute;
  top: -70px;
}
.file-names {
  width: 100%;
  border: 1px solid #dfe3eb;
  // border-radius: 2px;
  // padding-top: 10px;
  // padding-bottom: 10px;
  // margin: auto;
  height: 50px;
  display: flex;
}
.file-attach-dilalog {
  max-height: 500px;
  overflow: auto;
}
.terms-conditions-dilalog {
  border: 1px solid #f0f0f0;
  height: 500px;
  overflow: auto;
}
.document-corrected-container {
  text-align: center;
  height: 630px;
  .corrected-heading {
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 39px;
    color: #212529;
  }
  .corrected-content {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 140%;
    color: #303133;
  }
}
.clr-red {
  color: red;
}
.clr-green {
  color: green;
}
.clr-black {
  color: black;
  font-size: 14px;
}
.authorize-signature-popup {
  max-width: 568px !important;
}
.date-picker-item {
  &.smaller-than {
    .el-input__prefix {
      display: none;
    }
    .el-input__inner {
      padding: 0 !important;
    }
  }
}
@media screen and (max-width: 992px) {
  .pdf-side-bar {
    display: none !important;
  }
}
.esigns_logo {
  background: #1b487e;
  height: 65px;
}
.forbiddenLines {
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: #a7a2a2;
  margin-left: 35%;
  line-height: 2em;
}
.forbiddenstyleThree {
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 400;
  margin-left: 27%;
  line-height: 1.5em;
  margin-bottom: 30px;
}
.forbiddenstyleTwo {
  font-family: Inter, sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 400;
  margin-left: 21%;
  // line-height: 1.5em
}
.forbiddenstyle {
  font-family: Inter, sans-serif;
  font-size: 22px;
  margin-left: 28%;
  font-weight: 600;
  color: #000000;
  // line-height: 1.5em
}
.btnclass {
  margin: auto;
  margin-left: 42%;
}
</style>
<style lang="scss">
.navbar-status {
  // background: #fff0f7;
  &.is-mobile {
    height: 100px;
    padding: 0px;
    .finish-drawer {
      margin-top: 0px !important;
      padding-top: 5px;
      padding: 5px 10px 5px 10px;
      height: 90px;
      .finish-drawer-heading {
        margin: 0px !important;
      }
      .finish-drawer-details {
        margin-top: 5px 0px !important;
        @media (max-width: 564px) {
          margin: 0px !important;
        }
      }
    }
    .progressbar-wrapper {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 10px;
      .el-progress-bar__outer {
        height: 13px !important;
        .el-progress-bar__inner {
          height: 13px !important;
        }
      }
      .el-progress-bar {
        padding-right: 10px;
      }
      & > span {
        min-width: 60px;
      }
    }
    .btn-wrapper {
      .prev-btn {
        height: 40px;
      }
      .next-btn {
        height: 40px;
        border: 1px solid rgb(247, 84, 162);
      }
    }
    .doc-completed {
      margin-top: 33px;
    }
  }
}
</style>
<style lang="scss">
.other-options-right-sidebar {
  position: absolute;
  /* border: 1px solid black; */
  right: 0px;
  height: calc(100vh - 30px);
  top: -166px;
  z-index: 1000;
  width: 230px;
  background: white;
  padding: 15px;
  .manage-recipients {
    .user-tag {
      border-radius: 20px !important;
    }
    padding: 0px;
  }
  .document-pages {
    width: 13px;
  }
  .section-title {
    margin-bottom: 10px;
  }
  .section-body {
    a {
      & > div {
        margin-bottom: 15px;
      }
      .el-tooltip {
        padding: 0 !important;
      }
      i {
        margin-right: 6px;
        font-size: 18px;
      }
    }
    div[disabled="disabled"] {
      color: #dcdfe6;
      margin-bottom: 15px;
      i {
        margin-right: 6px;
        font-size: 18px;
      }
    }
    .red {
      color: red;
      i {
        color: red;
      }
    }
  }
}
#drag-template-background {
  &.is-other-options-RS-opened {
  }
}
.tooltip {
  padding: 0 !important;
}
.overlay {
  width: 100vw;
  height: 100vh;
  // background: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 900;
  left: 0;
  top: 0;
}
.mobile {
  .pdf-side-bar {
    // display: block !important;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 200px;
    height: 100vh;
    background: white;
    .el-scrollbar {
      height: 100vh !important;
    }
    .title-bar {
      display: flex;
      justify-content: space-around;
      .title {
        line-height: 39px;
      }
      .remove-btn {
        height: 30px;
        width: 30px;
        padding: 0;
        /* line-height: 39px; */
        margin-top: 6px;
        background: #dcdfe6;
        border-radius: 20px;
      }
    }
  }
}
#drag-template-background {
  &.mobile {
    .document-container-wrapper {
      .document-container {
        .el-scrollbar {
          height: calc(100vh - 169px) !important;
        }
      }
    }
  }
}
.navbar-status {
  & > div {
    margin-top: 0px !important;
    & > div {
      padding-top: 5px;
    }
  }
}
.mobile {
  .back-btn {
    border: none;
  }
}
.btn-one {
  height: 38px;
  margin-right: 12px;
}
.document-container-wrapper-parent {
  @media (max-width: 1250px) {
    @media (min-width: 992px) {
      width: 99vw;
    }
  }
}
.el-select-dropdown {
  &.el-popper {
    @media (max-width: 1200px) {
      // min-width: 200px !important;
    }
    @media (max-width: 1000px) {
      // min-width: 200px !important;
    }
    @media (max-width: 800px) {
      min-width: 400px !important;
    }
    @media (max-width: 600px) {
      min-width: 300px !important;
    }
    @media (max-width: 400px) {
      min-width: 200px !important;
    }
  }
}
.signature-request-board-wrapper {
  max-height: 278px;
  @media (max-width: 991.98px) {
    max-height: 298px;
  }
  .el-drawer {
    height: 100% !important;
    border: 1px solid red;
  }
}
.signature-request-board {
  & > p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-divider--horizontal {
    margin-bottom: 10px;
  }
  .el-checkbox {
    margin-bottom: 10px;
    display: flex;
  }
}
.reason-for-decline {
  & > .el-dialog {
    width: 100%;
    @media (min-width: 400px) {
      max-width: 400px;
    }
  }
}
</style>
<style lang="scss" scoped>
.attachment-dialog-main {
  .bottom-buttons-wrapper {
    display: flex;
    justify-content: end;
    .attach-save-btn {
      margin-left: 10px;
    }
  }
}
.para-line {
  // overflow-wrap: break-word !important;
  background: transparent !important;
  border: none !important;
  resize: none !important;
  &:focus {
    outline: none !important;
  }
}
</style>
