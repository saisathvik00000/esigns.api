<template>
  <section
    class="configure-document"
    :class="{ mobile: getIsMobile, 'is-close-RS': !getIsRSOpen }"
    id="drag-template-background"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <!-- v-if="getCompanyDocumentDataById" -->
    <section v-if="is_forbidden_doc">
      <img style="margin-left: 45%; margin-top: 10%" src="@/assets/img/Access Denied.svg" />
      <div>
        <p class="forbiddenstyle">You are not allowed to access the given document.</p>
        <p
          class="forbiddenstyleTwo"
          v-if="this.getAuthenticatedUser && this.getAuthenticatedUser.email"
        >
          You are already logged in as an authenticated user with this email "{{
          this.getAuthenticatedUser.email
          }}".
        </p>
        <p
          class="forbiddenLines"
          v-if="!this.getAuthenticatedUser"
        >- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
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
    <section v-else>
      <div class="inner-navbar">
        <div class="inner-navbar-2nd-level-child">
          <div class="inner-navbar-1th-level-child flex-direction-row">
            <div style="display: flex; justify-content: space-between">
              <el-button
                @click="goBack"
                slot="reference"
                class="rounded-0 back-btn type-2"
                style="margin-top: 4px; height: 38px"
              >
                <i class="el-icon-back">Back</i>
              </el-button>
            </div>
            <div class="flex-fill left-block vue-form ml-2">
              <el-form class="form-title">
                <el-input
                  :readonly="canRename"
                  v-model="documentName"
                  placeholder="Enter Template Title"
                  class="input-type-one"
                ></el-input>
                <p
                  class="error"
                  v-if="
                    getConfigurableDocumentErrors &&
                    getConfigurableDocumentErrors.name
                  "
                >{{ getConfigurableDocumentErrors.name }}</p>
              </el-form>
            </div>
          </div>

          <div class="right-block flex-self-end pe-3 align-items-self">
            <!--<a
            @click="replaceDocumentMethod"
            slot="reference"
            type="primary"
            class="settings-btn"
          >
            <i class="el-icon-setting"></i>
            <span>Replace document</span>
            </a>-->
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                isEditMode
                  ? 'Turn Off Pdf Editing Mode'
                  : 'Turn On Pdf Editing Mode'
              "
              placement="top-start"
            >
              <el-switch v-model="isEditMode" @change="checkPdfChanges" class="mr-1"></el-switch>
            </el-tooltip>
            <div v-if="isEditMode">
              <el-button @click="editPdf" :loading="documentDataLoading">Save pdf</el-button>
            </div>
            <div v-else>
              <el-tooltip
                v-for="(user, index) in getDocUsers"
                :key="index"
                :content="user.first_name + ' ' + user.last_name"
              >
                <el-tag v-if="index < limit" :type="tagType[Math.floor(index % tagType.length)]">
                  <p style="margin-left: -3px">{{ user | getUserNameAvatar }}</p>
                </el-tag>
              </el-tooltip>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-tag
                    :value="getDocUsers.length"
                    v-if="getDocUsers.length > 2"
                  >+{{ getDocUsers.length - 2 }}</el-tag>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(user, index) in getDocUsers" :key="index">
                    <div class="d-flex">
                      <el-tag
                        class="settigns-font"
                        :type="tagType[Math.floor(index % tagType.length)]"
                      >{{ user | getUserNameAvatar }}</el-tag>
                      <p
                        style="font-weight: 600; margin-left: 4px"
                      >{{ user.first_name + " " + user.last_name }}</p>
                    </div>
                    <p style="margin-left: 38px">{{ user.email }}</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-link
                @click="addDocumentUsers = true"
                class="el-icon-circle-plus"
                style="cursor: pointer"
                :underline="false"
                type="danger"
              ></el-link>
              <!-- <el-badge
              :value="documentRecipientsList.length"
              class="item ml-2"
              type="danger"
            >
              <el-link
                @click="addDocumentUsers = true"
                class="el-icon-circle-plus"
                style="cursor: pointer;"
                :underline="false"
                type="danger"
              ></el-link>
              </el-badge>-->
              <el-divider direction="vertical"></el-divider>
              <el-button
                class="stbtn"
                style="
                  color: #f754a2;
                  background-color: #ffffff;
                  border-radius: 4px;
                  height: 44px;
                "
                color="#F754A2"
                @click="updateDraftDocument()"
              >{{ getIsMobile ? "Save" : "Save Draft" }}</el-button>
              <el-button
                type="danger"
                class="type-2 ml-2 settigns-font button-type-one send-btn"
                @click="sendWithSubmit()"
                :loading="documentDataLoading"
              >{{ getIsMobile ? "Send" : "Send Document" }}</el-button>
              <el-divider direction="vertical" v-if="!getIsMobile"></el-divider>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <a :underline="false" @click="visibleSettingsVisible">
                    <el-dropdown-item icon="el-icon-s-tools">Settings</el-dropdown-item>
                  </a>

                  <el-dropdown-item icon="el-icon-refresh">
                    <el-link :underline="false" @click="replaceDocumentMethod">Change Document</el-link>
                  </el-dropdown-item>
                  <!--<el-dropdown-item>
                     <img 
                      style="width:15px"
                      src="@/assets/img/icons/Templates.svg" />
                     <a @click="saveDocumentAsTemplateConfirm">Save as template</a>
                  </el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
              <div class="action-wrapper-type-two">
                <el-button
                  slot="reference"
                  class="rounded-0 btn-one type-2"
                  type="primary"
                  v-on:click="openRightSideBar()"
                  :disabled="getIsRSOpen"
                  v-if="!getIsRSOpen"
                >&lt;&lt;</el-button>
                <el-button
                  slot="reference"
                  class="rounded-0 btn-one close type-2"
                  type="primary"
                  v-on:click="closeRightSideBar()"
                  v-if="getIsRSOpen"
                >&gt;&gt;</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="blanckDocumentModal"
        title="Upload a Blank Document"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="resetBlankTemplate"
        class="upload-a-blank-document-popup"
      >
        <div v-loading="blanckDocumentData.loading">
          <span>Enter Document name</span>
          <el-input
            placeholder="Enter Document name"
            v-model="blanckDocumentData.name"
            class="mb-2 mt-1"
          ></el-input>
          <span>Select number of pages</span>
          <el-select
            placeholder="Select number of pages"
            v-model="blanckDocumentData.pages"
            style="width: 100%"
            class="mt-1"
          >
            <el-option v-for="(i, index) in [1, 2, 3]" :key="index" :label="i" :value="i"></el-option>
          </el-select>
          <div class="btn-wrapper">
            <el-button @click="resetBlankTemplate">Cancel</el-button>
            <el-button
              :disabled="!blanckDocumentData.name.trim()"
              type="primary"
              @click="replaceBlankDoc"
            >Continue</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="Warning" :visible.sync="dialogVisible" class="warning-popup">
        <span>
          <h5>It looks like you have been modifying something...</h5>
        </span>
        <span>If you leave before updating, your changes will be lost.</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="backToPrevious">Confirm</el-button>
        </span>
      </el-dialog>
      <div class="document-editor-container document-container-wrapper-grand-parent">
        <!-- <el-row type="flex" justify="center"> -->
        <!-- <el-col :span="18"> -->
        <div class="document-container-wrapper-parent">
          <div class="document-container-wrapper">
            <div class="document-container">
              <el-row>
                <el-col :span="4" :style="getIsMobile ? 'display: none' : ''" class="pdf-side-bar">
                  <el-scrollbar v-loading="documentDataLoading">
                    <div id="page-wrapper" class="pdf-page-preview mt-3">
                      <div v-for="(doc, j) in getAllPdfData" :key="j">
                        <div v-if="doc && doc.pages">
                          <div
                            v-for="i of doc.pages"
                            :key="i"
                            class="canvas-holder"
                            :id="`${j}_preview_wrapper_${i}`"
                          >
                            <el-tooltip
                              class="item"
                              effect="dark"
                              content="Add page"
                              placement="bottom"
                            >
                              <el-button
                                plain
                                icon="el-icon-plus"
                                class="add-page-top"
                                @click="addPage(i, j)"
                              ></el-button>
                            </el-tooltip>
                            <div class="rotate-buttons">
                              <el-tooltip
                                class="item"
                                effect="dark"
                                content="Rotate right"
                                placement="bottom"
                              >
                                <el-button
                                  size="mini"
                                  icon="el-icon-refresh-right"
                                  circle
                                  plain
                                  @click="rotateRight(i, j)"
                                ></el-button>
                              </el-tooltip>
                              <el-tooltip
                                class="item"
                                effect="dark"
                                content="Rotate left"
                                placement="bottom"
                              >
                                <el-button
                                  size="mini"
                                  icon="el-icon-refresh-left"
                                  circle
                                  plain
                                  @click="rotateLeft(i, j)"
                                ></el-button>
                              </el-tooltip>
                              <el-tooltip
                                class="item"
                                effect="dark"
                                content="Delete page"
                                placement="bottom"
                              >
                                <el-button
                                  size="mini"
                                  icon="el-icon-delete"
                                  circle
                                  plain
                                  @click="deletePage(i, j)"
                                  v-if="doc.pages > 1"
                                ></el-button>
                              </el-tooltip>
                            </div>
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
                      <el-tooltip class="item" effect="dark" content="Add page" placement="bottom">
                        <el-button
                          plain
                          icon="el-icon-plus"
                          class="add-page-bottom"
                          @click="addPageOnBottom()"
                        ></el-button>
                      </el-tooltip>
                    </div>
                  </el-scrollbar>
                </el-col>
                <el-col
                  :span="20"
                  :xl="{ span: 20 }"
                  :lg="{ span: 20 }"
                  :md="{ span: 20 }"
                  :sm="{ span: 24 }"
                  :xs="{ span: 24 }"
                  class="pdf-main-area"
                >
                  <div
                    v-if="
                      !isEditMode &&
                      activatedItem != null &&
                      (activatedItem.type == 'PRIMARY_FIELDS' ||
                        activatedItem.type == 'PARAGRAPH' ||
                        activatedItem.type == 'HEADING' ||
                        this.activatedItem.type == 'SINGLE_LINE_TEXT' ||
                        this.activatedItem.type == 'MULTI_LINE_TEXT' ||
                        this.activatedItem.type == 'DATE' ||
                        this.activatedItem.type == 'SELECT' ||
                        this.activatedItem.type == 'MULTI_SELECT' ||
                        this.activatedItem.type == 'NUMBER' ||
                        this.activatedItem.type == 'DATE_SIGNED' ||
                        this.activatedItem.type == 'YES_OR_NO' ||
                        this.activatedItem.type == 'CURRENCY' ||
                        this.activatedItem.type == 'FORMULA' ||
                        this.activatedItem.type == 'HORIZONTAL_LINE' ||
                        this.activatedItem.type == 'REPEATABLE_PARENT' ||
                        this.activatedItem.type == 'ENTITY')
                    "
                    class="form-field-item"
                  >
                    <el-col class="mt-1" :xl="10" :lg="10" :md="6" :sm="6" :xs="6">
                      <el-select
                        v-model="activatedItem.font.name"
                        placeholder="Select"
                        class="text-editot-slt"
                      >
                        <el-option v-for="item in fontTypes" :key="item" :value="item">
                          <p :style="getFontType(item)">{{ item }}</p>
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col class="mt-1" :xl="3" :lg="3" :md="4" :sm="4" :xs="4">
                      <el-button
                        type="plain"
                        @click="makeTextBold"
                        :disabled="activatedItem.type == 'HEADING'"
                        :class="
                          activatedItem.font.style == 1 ||
                          activatedItem.font.style == 3
                            ? 'text-bold text-editot-btn-active'
                            : 'text-bold text-editot-btn'
                        "
                      >
                        <b>B</b>
                      </el-button>
                    </el-col>
                    <el-col class="mt-1" :xl="3" :lg="3" :md="4" :sm="4" :xs="4">
                      <el-button
                        type="plain"
                        @click="makeTextItalic"
                        :disabled="activatedItem.type == 'HEADING'"
                        :class="
                          activatedItem.font.style == 2 ||
                          activatedItem.font.style == 3
                            ? 'text-italic text-editot-btn-active'
                            : 'text-italic text-editot-btn'
                        "
                      >
                        <i>It</i>
                      </el-button>
                    </el-col>
                    <el-col class="mt-1" :xl="4" :lg="4" :md="6" :sm="6" :xs="6">
                      <el-select
                        v-model="activatedItem.font.size"
                        placeholder="Size"
                        class="text-editot-slt-size"
                        @change="updateWidthAndHeight"
                        :disabled="activatedItem.type == 'HEADING'"
                      >
                        <el-option
                          v-for="item in fontSizes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col class="mt-1" :xl="4" :lg="4" :md="4" :sm="4" :xs="4">
                      <el-color-picker v-model="activatedItem.font.color" class="text-editor-color"></el-color-picker>
                    </el-col>
                  </div>
                  <div v-else-if="isEditMode" class="form-field-item">
                    <el-col class="mt-1" :xl="10" :lg="10" :md="6" :sm="6" :xs="6">
                      <el-select
                        v-model="selectedText.style.fontFamily"
                        placeholder="Select"
                        class="text-editot-slt"
                        v-if="
                          selectedText && selectedText.style && isEditingText
                        "
                      >
                        <el-option v-for="item in fontTypes" :key="item" :value="item">
                          <p :style="getFontType(item)">{{ item }}</p>
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col class="mt-1" :xl="3" :lg="3" :md="4" :sm="4" :xs="4">
                      <el-button
                        type="plain"
                        @click="makeSelectedTextBold"
                        :class="
                          selectedText.style.weight == 1 ||
                          selectedText.style.weight == 3
                            ? 'text-bold text-editot-btn-active'
                            : 'text-bold text-editot-btn'
                        "
                        v-if="
                          selectedText && selectedText.style && isEditingText
                        "
                      >
                        <b>B</b>
                      </el-button>
                    </el-col>
                    <el-col class="mt-1" :xl="3" :lg="3" :md="4" :sm="4" :xs="4">
                      <el-button
                        type="plain"
                        @click="makeSelectedTextItalic"
                        :class="
                          selectedText.style.weight == 2 ||
                          selectedText.style.weight == 3
                            ? 'text-italic text-editot-btn-active'
                            : 'text-italic text-editot-btn'
                        "
                        v-if="
                          selectedText && selectedText.style && isEditingText
                        "
                      >
                        <i>It</i>
                      </el-button>
                    </el-col>
                    <el-col class="mt-1" :xl="4" :lg="4" :md="6" :sm="6" :xs="6">
                      <el-select
                        v-model="selectedText.height"
                        placeholder="Size"
                        class="text-editot-slt-size"
                        v-if="
                          selectedText && selectedText.style && isEditingText
                        "
                      >
                        <el-option
                          v-for="item in fontSizes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <div
                      v-on:click="changeSelectedTextColor"
                      style="display: inline-block"
                      v-if="selectedText && selectedText.style && isEditingText"
                    >
                      <el-color-picker v-model="selectedText.style.color" style="top: 15px"></el-color-picker>
                    </div>
                    <el-button
                      type="plain"
                      v-if="!isEditingText"
                      @click="
                        isEarserMode = !isEarserMode;
                        isDrawLine = false;
                        isDrawingLine = false;
                        isEarserDraw = false;
                        isEarserSelect = false;
                      "
                      :class="
                        isEarserMode
                          ? 'text-bold text-editot-btn-active'
                          : 'text-bold text-editot-btn'
                      "
                      class="mt-1"
                    >
                      <img src="@/assets/img/eraser-icon.png" alt="icon" width="20px" />
                    </el-button>
                    <el-button
                      type="plain"
                      v-if="!isEditingText"
                      @click="
                        isDrawLine = !isDrawLine;
                        isEarserMode = false;
                        isDrawingLine = false;
                        isEarserDraw = false;
                        isEarserSelect = false;
                      "
                      :class="
                        isDrawLine
                          ? 'text-bold text-editot-btn-active'
                          : 'text-bold text-editot-btn'
                      "
                      class="mt-1"
                    >
                      <img src="@/assets/img/line-icon.png" alt="icon" width="20px" />
                    </el-button>
                    <div
                      v-on:click="isDrawLineColorChange = true"
                      style="display: inline-block"
                      v-if="isDrawLine && !isEditingText"
                    >
                      <el-color-picker
                        v-model="drawLineColor"
                        style="top: 15px"
                        @change="isDrawLineColorChange = false"
                      ></el-color-picker>
                    </div>
                  </div>
                  <div v-else class="form-field-item-emtpy"></div>
                  <el-scrollbar v-loading="documentDataLoading" ref="scrollbar" id="scrollbar">
                    <div class="form-builder" ref="formBuilder">
                      <div class="form-holder">
                        <div class="form-image-holder">
                          <!-- <img 
                    v-for="(image, index) of backgroundImages"
                    :key="index"
                    :src="getBackgroundImage(image)"
                    class="page-image"
                  
                          />-->
                          <div id="wrapper" style="text-align: center; margin-bottom: 50px">
                            <div v-for="(doc, j) in getAllPdfData" :key="j" :id="`wrapper_${j}`">
                              <canvas
                                v-for="i of doc.pages"
                                :key="i"
                                :id="`${j}_canvas_${i}`"
                                tabindex="0"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div class="form-fields-holder" v-loading="loadingElements">
                          <VueDraggableResizable
                            v-for="(item, index) in elements"
                            :key="item.type + '-' + item.key + '-' + index"
                            class-name-active="my-active-class"
                            :class="
                              'each-element ' +
                                item.filled_by +
                                ' ' +
                                contentFields.indexOf(item.type) !=
                              -1
                                ? 'content-fields'
                                : ''
                            "
                            @dragging="(x, y) => onDrag(x, y, item)"
                            @resizing="
                              (x, y, width, height) =>
                                onResize(x, y, width, height, item)
                            "
                            :onDrag="chechFieldPosition"
                            :onResize="chechFieldSizes"
                            :parent="true"
                            :h="item.height"
                            :w="item.width"
                            :x="item.x"
                            :y="item.y"
                            :min-height="15"
                            :style="getColorByFilledBy(item)"
                            @keyup.delete="$emit('onDelete')"
                            @keydown.native="handleVDRKeyDown"
                            tabindex="0"
                            @activated="onActivated(item, index)"
                            :handles="getHandleByType(item.type)"
                            @dblclick.native="openPopup(item, index)"
                            v-on:dblclick="openPopup(item, index)"
                            :data-color="getFilledUserColor(item)"
                            :has-value="
                              item.value && item.value != '' ? '1' : '0'
                            "
                            :has-content="
                              item.content && item.content != '' ? '1' : '0'
                            "
                            :has-background="
                              item.type == 'my-signature' ? '0' : '1'
                            "
                            :onDragStart="handleFieldDragStart"
                            @mouseup.native="hideAllAlignLines"
                            :data-text="item.label"
                            :lock-aspect-ratio="
                              isAspectRatio &&
                              (item.type == 'CHECKBOX' ||
                                item.type == 'my-signature' ||
                                item.type == 'MY_INITIAL' ||
                                item.type == 'SIGNATURE' ||
                                item.type == 'INITIAL')
                                ? true
                                : false
                            "
                          >
                            <!-- <a
                        @dblclick="openPopup(item, index)"
                        style="cursor: pointer"
                            >-->
                            <!-- Table Preview -->
                            <el-table
                              v-if="
                                item.section == 'table' &&
                                item.headers &&
                                item.headers.length &&
                                !tableElementLoading
                              "
                              :data="item.data"
                            >
                              <el-table-column type="index" width="30"></el-table-column>
                              <el-table-column v-for="(header, index) of item.headers" :key="index">
                                <template slot="header">{{ header }}</template>
                                <template slot-scope="scope">{{ item.data[scope.$index][header] }}</template>
                              </el-table-column>
                            </el-table>
                            <!-- Entity Preview -->
                            <div v-else-if="item.type == 'ENTITY'" :style="getFieldStyles(item)">
                              <ConfigureEntityField
                                :entityId="item.entity_id"
                                :itemEntityDataId="item.entity_data_id"
                                :form="item"
                                :isDisable="false"
                                :isFromTemplate="false"
                              ></ConfigureEntityField>
                            </div>
                            <!-- Repeatable Preview -->
                            <div
                              v-else-if="item.type == 'REPEATABLE_PARENT'"
                              :style="getFieldStyles(item)"
                            >
                              <ConfigureRepeatableField
                                :entityId="item.entity_id"
                                :form="item"
                                :isDisable="false"
                                :isFromTemplate="
                                  checkIsUserConfigured(item, documentUsers)
                                "
                              ></ConfigureRepeatableField>
                            </div>
                            <!-- Formula Preview -->
                            <div v-else-if="item.type == 'FORMULA'" :style="getFieldStyles(item)">
                              <FormulaExecute
                                :data="item"
                                :form="documentData"
                                :is-view="false"
                                :isFromDocument="true"
                                :workflowData="{}"
                                :allFields="elements"
                              ></FormulaExecute>
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
                              ></HorizontalLineExecute>
                            </div>
                            <!-- Heading Preview -->
                            <div v-else-if="item.type == 'HEADING' && item.content">
                              <!-- <h1
                          v-if="item.selected_tag == 'h1'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                        </h1>
                        <h2
                          v-if="item.selected_tag == 'h2'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                        </h2>
                        <h3
                          v-if="item.selected_tag == 'h3'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                        </h3>
                        <h4
                          v-if="item.selected_tag == 'h4'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                        </h4>
                        <h5
                          v-if="item.selected_tag == 'h5'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                        </h5>
                        <h5
                          v-if="item.selected_tag == 'h6'"
                          :style="getHeadingStyles(item)"
                        >
                          {{ item.content }}
                              </h5>-->
                              <el-input
                                type="textarea"
                                class="field-textarea"
                                v-model="item.content"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important;'
                                  )
                                "
                                @focus="handleTextAreaFocus"
                                @blur="handleTextAreaBlur"
                                :placeholder="item.content"
                              ></el-input>
                              <div
                                class="overlay"
                                :style="getTextColorByFilledBy(item)"
                              >{{ item.content == "" ? item.placeholder : "" }}</div>
                            </div>
                            <!-- Paragraph Preview -->
                            <!-- <p
                        v-else-if="item.type == 'PARAGRAPH' && item.content"
                        :id="item.type + '_' + item.content + '_' + item.index"
                        :style="getFieldStyles(item)"
                      >
                        {{ item.content }}
                            </p>-->
                            <!-- Logo Preview -->
                            <img
                              v-else-if="item.type == 'logo'"
                              :width="item.width"
                              :height="item.height"
                              :src="getLogoUrl"
                            />
                            <img
                              v-else-if="
                                item.type == 'my-signature' && item.source
                              "
                              :width="item.width"
                              :height="item.height"
                              :src="item.source"
                              class="my-signature"
                            />
                            <img
                              v-else-if="item.type == 'INITIAL' && item.value"
                              :src="item.value"
                              :width="item.width"
                              :height="item.height"
                            />
                            <img
                              v-else-if="
                                item.type == 'MY_INITIAL' && item.value
                              "
                              :src="item.value"
                              :width="item.width"
                              :height="item.height"
                              class="my-initial"
                            />
                            <img
                              v-else-if="item.type == 'IMAGE' && item.value"
                              :src="item.value"
                              :width="item.width"
                              :height="item.height"
                            />
                            <div
                              v-else-if="item.type == 'IMAGE' && !item.value"
                              :style="getTextColorByFilledBy(item)"
                              class="image-field"
                            >
                              {{ item.label }}
                              <i class="el-icon-edit"></i>
                            </div>
                            <!-- Primary fields preview -->
                            <div
                              v-else-if="item.type == 'PRIMARY_FIELDS'"
                              :id="
                                item.type +
                                '_' +
                                item.content +
                                '_' +
                                item.index
                              "
                              :style="
                                getFieldStyles(
                                  item,
                                  'width: 100% !important; height: 100% !important; display: table !important;'
                                )
                              "
                              class="primary-field"
                            >
                              <el-input
                                type="textarea"
                                :class="item.selected_tag == 'address' ? 'field-textarea textare-background' : 'field-textarea textarea-nowrap'" 
                                v-model="item.content"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important; display: table !important;'
                                  )
                                "
                                @focus="handleTextAreaFocus"
                                @blur="handleTextAreaBlur"
                                :placeholder="item.content"
                                @change="auto_grow(`ADDRESS_${item.index}`)" 
                              ></el-input>
                              <!-- :placeholder="item.content" -->
                              <div
                                class="overlay"
                                :style="getTextColorByFilledBy(item)"
                              >{{ item.content == "" ? item.placeholder : "" }}</div>
                            </div>
                            <div
                              v-else-if="item.type == 'CURRENCY'"
                              :style="
                                getFieldStyles(
                                  item,
                                  'width: 100% !important; height: 100% !important;'
                                )
                              "
                              class="primary-field"
                            >
                              <currency-input
                                v-if="refreshIndex !== index"
                                v-model="item.value"
                                @input="checkCurrency(item, index)"
                                :currency="
                                  item.validations && item.validations.currency
                                    ? item.validations.currency
                                    : 'USD'
                                "
                                class="field-textarea currency-input"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important; display: table !important;'
                                  )
                                "
                              />
                            </div>
                            <!-- yes/no -->
                            <div
                              v-else-if="item.type == 'YES_OR_NO'"
                              :style="getFieldStyles(item)"
                              class="yes-or-no"
                            >
                              <el-radio v-model="item.value" label="yes">Yes</el-radio>
                              <el-radio v-model="item.value" label="no">No</el-radio>
                            </div>
                            <!-- checkbox -->
                            <div v-else-if="item.type == 'CHECKBOX'" :style="getFieldStyles(item)">
                              <input
                                type="checkbox"
                                v-model="item.value"
                                :style="getFieldStyles(item)"
                              />
                            </div>
                            <!-- Date -->
                            <div v-else-if="item.type == 'DATE'" :style="getFieldStyles(item)">
                              <el-date-picker
                                placeholder="Select date"
                                v-model="item.value"
                                style="width: '100%'; display: table !important"
                                v-bind:class="{
                                  'date-picker-item': true,
                                  'smaller-than': true,
                                }"
                                :format="
                                  getDefaultDateFormat &&
                                  getDefaultDateFormat.includes('Do') == false
                                    ? getDefaultDateFormat
                                        .replace('YYYY', 'yyyy')
                                        .replace('DD', 'dd')
                                    : 'MM-dd-yyyy'
                                "
                              ></el-date-picker>
                            </div>
                            <!-- Select -->
                            <div
                              v-else-if="
                                item.type == 'SELECT' ||
                                item.type == 'MULTI_SELECT'
                              "
                              :style="getFieldStyles(item)"
                            >
                              <el-select
                                placeholder="Please select..."
                                :clearable="true"
                                :filterable="true"
                                collapse-tags
                                :multiple="
                                  item.type == 'MULTI_SELECT' ? true : false
                                "
                                :allow-create="true"
                                :default-first-option="true"
                                v-model="item.value"
                                style="display: table !important"
                                :disabled="
                                  (item.type == 'SELECT' ||
                                    item.type == 'MULTI_SELECT') &&
                                  !item.options.length
                                "
                              >
                                <el-option
                                  v-for="op in item.options"
                                  :key="op"
                                  :label="op"
                                  :value="op"
                                ></el-option>
                              </el-select>
                            </div>
                            <div v-else-if="item.type == 'PARAGRAPH'" :style="getFieldStyles(item)">
                              <el-input
                                type="textarea"
                                class="field-textarea textare-background"
                                v-model="item.content"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important; display: table !important;'
                                  )
                                "
                                @focus="handleTextAreaFocus"
                                @blur="handleTextAreaBlur"
                                @change="auto_grow(`MULTI_LINE_TEXT_${item.index}`)"
                                :id="`MULTI_LINE_TEXT_${item.index}`"
                              ></el-input>
                              <div class="overlay" :style="getTextColorByFilledBy(item)">
                                {{
                                item.content && item.content !== ""
                                ? ""
                                : item.placeholder
                                }}
                              </div>
                            </div>
                            <div
                              v-else-if="item.type == 'MULTI_LINE_TEXT'"
                              :style="getFieldStyles(item)"
                            >
                              <el-input
                                type="textarea"
                                class="field-textarea textare-background"
                                v-model="item.value"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important; display: table !important;'
                                  )
                                "
                                @focus="handleTextAreaFocus"
                                @blur="handleTextAreaBlur"
                                @change="auto_grow(`MULTI_LINE_TEXT_${item.index}`)"
                                :id="`MULTI_LINE_TEXT_${item.index}`"
                              ></el-input>
                              <div class="overlay" :style="getTextColorByFilledBy(item)">
                                {{
                                item.value && item.value !== ""
                                ? ""
                                : item.placeholder
                                }}
                              </div>
                            </div>
                            <!-- </a> -->
                            <div
                              v-else-if="
                                item.type != 'my-signature' &&
                                item.type != 'MY_INITIAL' &&
                                item.type != 'INITIAL' &&
                                item.type != 'ATTACHMENT' &&
                                item.type != 'SIGNATURE'
                              "
                              :style="getFieldStyles(item)"
                            >
                              <el-input
                                type="textarea"
                                class="field-textarea textarea-nowrap"
                                v-model="item.value"
                                :style="
                                  getFieldStyles(
                                    item,
                                    'width: 100% !important; height: 100% !important; display: table !important;'
                                  )
                                "
                                @focus="handleTextAreaFocus"
                                @blur="handleTextAreaBlur"
                              ></el-input>
                              <div class="overlay" :style="getTextColorByFilledBy(item)">
                                {{
                                item.value && item.value !== ""
                                ? ""
                                : item.placeholder
                                }}
                              </div>
                            </div>
                            <!-- Default Preview -->
                            <p v-else :style="getTextColorByFilledBy(item)">
                              {{
                              item.type != "CHECKBOX"
                              ? item.label ||
                              (item.field_type == "TEMPLATE_FIELD"
                              ? item.template_field_label
                              : item.entity_field_label) ||
                              item.type
                              : "+"
                              }}
                            </p>
                            <!-- </a> -->
                          </VueDraggableResizable>
                          <svg id="svg">
                            <line id="top_line" class="line" />
                            <line id="middle_horizontal_line" class="line" />
                            <line id="bottom_line" class="line" />
                            <line id="left_line" class="line" />
                            <line id="middle_vertical_line" class="line" />
                            <line id="right_line" class="line" />
                          </svg>
                          <div
                            class="text-highlight"
                            id="textHighlight"
                            v-click-outside="hideTextEdit"
                            v-if="isEditMode"
                          >
                            <el-link
                              class="el-icon-edit edit-icon"
                              style="cursor: pointer; color: white"
                              :underline="false"
                              @click="editSelectedText"
                              v-if="!isEditingText"
                            ></el-link>
                            <input
                              v-if="this.selectedText && isEditingText"
                              v-model="selectedTextInPdf"
                              :style="getSelectedTextStyle"
                            />
                            <!-- <div class="overlay"></div> -->
                            <!-- </el-input>  class="field-textarea textarea-nowrap" -->
                            <!-- <el-button type="danger" icon="el-icon-edit" size="mini" class="edit-icon" ></el-button> -->
                          </div>
                          <div
                            class="text-highlight"
                            id="whiteRectangle"
                            v-if="isEditMode && isEarserDraw"
                          >
                            <el-link
                              icon="el-icon-close"
                              class="edit-icon"
                              style="cursor: pointer; color: white"
                              :underline="false"
                              @click="deleteRectangle"
                            ></el-link>
                            <el-link
                              icon="el-icon-check"
                              class="save-icon"
                              style="cursor: pointer; color: white"
                              :underline="false"
                              @click="saveRectangle(false)"
                            ></el-link>
                            <el-link
                              icon="el-icon-edit"
                              class="text-icon"
                              style="cursor: pointer; color: white"
                              :underline="false"
                              v-if="!isAddingText"
                              @click="addTextRectangle"
                            ></el-link>
                            <textarea
                              v-if="isAddingText"
                              v-model="addedTextOnRectangle"
                              :style="getAddtextBoxStyle"
                              class="field-textarea currency-input"
                              id="earserTextBox"
                            ></textarea>
                          </div>
                          <div
                            class="text-added"
                            id="LineRectangle"
                            v-else-if="
                              isEditMode && isDrawLine && isDrawingLine
                            "
                          ></div>
                        </div>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-col>
              </el-row>
            </div>
            <!-- <el-col :span="16" style="width:640px;"> -->
            <!-- </el-col> -->
          </div>
          <!-- <el-col :span="6" class="position-relative"> -->
          <div class="right-side-bar">
            <div class="form-fields-set">
              <div class="scrollable-container">
                <el-scrollbar style="padding: 20px">
                  <div class="selectUser mt-0 mb-3">
                    <el-select
                      v-model="recipientSelection"
                      filterable
                      clearable
                      placeholder="Select a Recipient"
                      :loading="loading"
                      class="w-100"
                      @change="changeRecipientColor"
                    >
                      <el-option
                        v-for="item in documentUsers"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        :disabled="item.user_type == 'CC'"
                      >
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.email }}</span>
                      </el-option>
                      <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-select>
                  </div>
                  <el-collapse v-model="activeCollapse">
                    <el-collapse-item title="Essential Fields" name="1">
                      <div>
                        <div class="fieldSet__box">
                          <draggable
                            class="dragArea-field-element"
                            @end="addSignature()"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('signatureEle')"
                              @mouseout="changeout('signatureEle')"
                              class="field-element"
                              ref="signatureEle"
                              id="signatureEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/signatureEle.svg`)
                              "
                                alt="icon"
                              />
                              <div class="name">Signature</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addInitial()"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('initialEle')"
                              @mouseout="changeout('initialEle')"
                              class="field-element"
                              ref="initialEle"
                              id="initialEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/myInitialEle.svg`)
                              "
                                alt="icon"
                              />
                              <div class="name">Initial</div>
                            </button>
                          </draggable>

                          <draggable
                            class="dragArea-field-element"
                            @end="addPrimaryField('fullNameEle', 'full_name')"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('fullNameEle')"
                              @mouseout="changeout('fullNameEle')"
                              class="field-element"
                              ref="fullNameEle"
                              id="fullNameEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/lastNameEle.svg`)
                                "
                                alt="icon"
                              />
                              <div class="name">Full Name</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addDateSigned()"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('dateSingedEle')"
                              @mouseout="changeout('dateSingedEle')"
                              class="field-element"
                              ref="dateSingedEle"
                              id="dateSingedEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/dateSingedEle.svg`)
                              "
                                alt="icon"
                              />
                              <div class="name">Date Signed</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addPrimaryField('companyEle', 'company_name')"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('companyEle')"
                              @mouseout="changeout('companyEle')"
                              class="field-element"
                              ref="companyEle"
                              id="companyEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/companyEle.svg`)
                                "
                                alt="icon"
                              />
                              <div class="name">Company</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addPrimaryField('titleEle', 'title')"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('titleEle')"
                              @mouseout="changeout('titleEle')"
                              class="field-element"
                              ref="titleEle"
                              id="titleEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/titleEle.svg`)
                                "
                                alt="icon"
                              />
                              <div class="name">Title</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addSingleLineText()"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('singleLineTextEle')"
                              @mouseout="changeout('singleLineTextEle')"
                              class="field-element"
                              ref="singleLineTextEle"
                              id="singleLineTextEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/singleLineTextEle.svg`)
                              "
                                alt="icon"
                              />
                              <div class="name">Single Line Text</div>
                            </button>
                          </draggable>
                          <draggable
                            class="dragArea-field-element"
                            @end="addCheckbox()"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('checkboxEle')"
                              @mouseout="changeout('checkboxEle')"
                              class="field-element"
                              ref="checkboxEle"
                              id="checkboxEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/checkboxEle.svg`)
                              "
                                alt="icon"
                              />
                              <div class="name">CheckBox</div>
                            </button>
                          </draggable>

                          <draggable
                            class="dragArea-field-element"
                            @end="addPrimaryField('addressEle', 'address')"
                            @mouseup="mouseUp()"
                          >
                            <button
                              @mouseover="changeof('addressEle')"
                              @mouseout="changeout('addressEle')"
                              class="field-element"
                              ref="addressEle"
                              id="addressEle"
                              @mousedown="mouseDown()"
                            >
                              <img
                                :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/addressEle.svg`)
                                "
                                alt="icon"
                              />
                              <div class="name">Address</div>
                            </button>
                          </draggable>
                        </div>
                      </div>
                      <el-collapse
                        v-model="activeEntityCollapse"
                        v-if="
                          selectedUserEntity &&
                          selectedUserEntity.templates &&
                          selectedUserEntity.templates.length
                        "
                        @change="activeEntityCollapseMethod"
                        accordion
                      >
                        <el-collapse-item
                          v-for="(entity, i) in selectedUserEntity.templates"
                          :key="i"
                          :name="i"
                          :title="getTempTitle(entity.name)"
                        >
                          <div>
                            <div v-if="entity.is_repeatable" class="mb-1" style="width: 100%">
                              <el-select
                                placeholder="Select data"
                                v-model="selectedRepeatableIndex"
                                default-first-option
                              >
                                <el-option
                                  v-for="(temp, i) in getRepeatableData(entity)"
                                  :key="i"
                                  :label="temp.name"
                                  :value="temp.indexKey"
                                >{{ temp.name }}</el-option>
                                <!-- <el-option value="newData" label="Add New">
                                Add New
                                </el-option>-->
                              </el-select>
                            </div>
                            <div class="fieldSet__box">
                              <draggable
                                class="dragArea-field-element"
                                v-for="(field, index) in entity.fields"
                                :key="index"
                                @mouseup="mouseUp()"
                                @end="
                                  addEntityField(
                                    field,
                                    entity.is_repeatable,
                                    entity
                                  )
                                "
                                :options="{
                                  disabled:
                                    entity.is_repeatable &&
                                    !selectedRepeatableIndex,
                                }"
                              >
                                <el-tooltip
                                  :content="field.label"
                                  effect="dark"
                                  class="tooltip"
                                  placement="top-start"
                                >
                                  <button
                                    class="field-element"
                                    :ref="`${i}_entity_${index}`"
                                    :id="`${i}_entity_${index}`"
                                    :style="
                                      entity.is_repeatable &&
                                      !selectedRepeatableIndex
                                        ? 'cursor: no-drop;'
                                        : ''
                                    "
                                    @mouseover="
                                      changeof(`${i}_entity_${index}`)
                                    "
                                    @mouseout="
                                      changeout(`${i}_entity_${index}`)
                                    "
                                    @mousedown="mouseDown()"
                                    :disabled="
                                      entity.is_repeatable &&
                                      !selectedRepeatableIndex
                                    "
                                  >
                                    <img
                                      :src="
                                        require(`@/assets/img/fields_icons/${
                                          recipientSelectedColor &&
                                          defined_colors.indexOf(
                                            recipientSelectedColor
                                          ) != -1
                                            ? recipientSelectedColor
                                            : '#F754A2'
                                        }/entityEle.svg`)
                                      "
                                      alt="icon"
                                    />
                                    <div
                                      class="name"
                                      v-if="field.label"
                                    >{{ field.label | truncate(6, "...") }}</div>
                                    <div class="name" v-else>{{ field.inputType.toLowerCase() }}</div>
                                  </button>
                                </el-tooltip>
                              </draggable>
                            </div>
                          </div>
                        </el-collapse-item>
                      </el-collapse>
                    </el-collapse-item>
                    <el-collapse-item
                      title="Content Fields"
                      name="2"
                      v-if="this.recipientSelection == 'SENDER'"
                    >
                      <div class="fieldSet__box">
                        <draggable
                          class="dragArea-field-element"
                          @end="addMySignature()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('mySignatureEle')"
                            @mouseout="changeout('mySignatureEle')"
                            class="field-element"
                            ref="mySignatureEle"
                            id="mySignatureEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/mySignatureEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">My Signature</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addHeading()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('headingEle')"
                            @mouseout="changeout('headingEle')"
                            class="field-element"
                            ref="headingEle"
                            id="headingEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/headingEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Heading</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addParagraph()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('paragraphEle')"
                            @mouseout="changeout('paragraphEle')"
                            class="field-element"
                            ref="paragraphEle"
                            id="paragraphEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/paragraphEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Paragraph</div>
                          </button>
                        </draggable>
                        <!-- <button
                        class="field-element"
                        ref="tableEle"
                        @click="addTable()"
                      >
                        <img src="@/assets/img/fields/Signature.svg" alt="icon" />
                        <div class="name">Table</div>
                        </button>-->
                        <draggable
                          class="dragArea-field-element"
                          @end="addImage()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('tableEle')"
                            @mouseout="changeout('tableEle')"
                            class="field-element"
                            ref="tableEle"
                            id="tableEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/image.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Image</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addMyInitial()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('myInitialEle')"
                            @mouseout="changeout('myInitialEle')"
                            class="field-element"
                            ref="myInitialEle"
                            id="myInitialEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/myInitialEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">My Initial</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addHorizontalLine()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('horizontalLineEle')"
                            @mouseout="changeout('horizontalLineEle')"
                            class="field-element"
                            ref="horizontalLineEle"
                            id="horizontalLineEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="require(`@/assets/img/fields_icons/#F754A2/horizontalLineEle.svg`)
                            "
                              alt="icon"
                            />
                            <div class="name">Horizontal Line</div>
                          </button>
                        </draggable>
                      </div>
                    </el-collapse-item>

                    <el-collapse-item title="Fillable Fields For" name="3">
                      <div class="fieldSet__box">
                        <draggable
                          class="dragArea-field-element"
                          @end="addAttachment()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('requestEle')"
                            @mouseout="changeout('requestEle')"
                            class="field-element"
                            ref="requestEle"
                            id="requestEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/initialEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Request Document</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addDateElement()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('dateEle')"
                            @mouseout="changeout('dateEle')"
                            class="field-element"
                            ref="dateEle"
                            id="dateEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/dateEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Date</div>
                          </button>
                        </draggable>

                        <draggable
                          class="dragArea-field-element"
                          @end="addDropDown()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('dropdownEle')"
                            @mouseout="changeout('dropdownEle')"
                            class="field-element"
                            ref="dropdownEle"
                            id="dropdownEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/dropdownEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Select</div>
                          </button>
                        </draggable>

                        <draggable
                          class="dragArea-field-element"
                          @end="addNumber()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('numberEle')"
                            @mouseout="changeout('numberEle')"
                            class="field-element"
                            ref="numberEle"
                            id="numberEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/numberEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Number</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addYesOrNo()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('yesOrNoEle')"
                            @mouseout="changeout('yesOrNoEle')"
                            class="field-element"
                            ref="yesOrNoEle"
                            id="yesOrNoEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/yesOrNoEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Yes Or No</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addMultilineText()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('multiLineTextEle')"
                            @mouseout="changeout('multiLineTextEle')"
                            class="field-element"
                            ref="multiLineTextEle"
                            id="multiLineTextEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/multiLineTextEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Multi Line Text</div>
                          </button>
                        </draggable>

                        <draggable
                          class="dragArea-field-element"
                          @end="addMultiSelect()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('multiSlectedEle')"
                            @mouseout="changeout('multiSlectedEle')"
                            class="field-element"
                            ref="multiSlectedEle"
                            id="multiSlectedEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/multiSlectedEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Multiple Select</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addFormula()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('formulaEle')"
                            @mouseout="changeout('formulaEle')"
                            class="field-element"
                            ref="formulaEle"
                            id="formulaEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/formulaEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Formula</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addCurrency()"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('currencyEle')"
                            @mouseout="changeout('currencyEle')"
                            class="field-element"
                            ref="currencyEle"
                            id="currencyEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                require(`@/assets/img/fields_icons/${
                                  recipientSelectedColor &&
                                  defined_colors.indexOf(
                                    recipientSelectedColor
                                  ) != -1
                                    ? recipientSelectedColor
                                    : '#F754A2'
                                }/currencyEle.svg`)
                              "
                              alt="icon"
                            />
                            <div class="name">Currency</div>
                          </button>
                        </draggable>
                      </div>
                    </el-collapse-item>
                    <el-collapse-item title="Other Primary Fields" name="4">
                      <div class="fieldSet__box">
                        <draggable
                          class="dragArea-field-element"
                          @end="addPrimaryField('firstNameEle', 'first_name')"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('firstNameEle')"
                            @mouseout="changeout('firstNameEle')"
                            class="field-element"
                            ref="firstNameEle"
                            id="firstNameEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/firstNameEle.svg`)
                                "
                              alt="icon"
                            />
                            <div class="name">First Name</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addPrimaryField('lastNameEle', 'last_name')"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('lastNameEle')"
                            @mouseout="changeout('lastNameEle')"
                            class="field-element"
                            ref="lastNameEle"
                            id="lastNameEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/lastNameEle.svg`)
                                "
                              alt="icon"
                            />
                            <div class="name">Last Name</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addPrimaryField('phoneEle', 'phone')"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('phoneEle')"
                            @mouseout="changeout('phoneEle')"
                            class="field-element"
                            ref="phoneEle"
                            id="phoneEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/phoneEle.svg`)
                                "
                              alt="icon"
                            />
                            <div class="name">Phone No</div>
                          </button>
                        </draggable>
                        <draggable
                          class="dragArea-field-element"
                          @end="addPrimaryField('emailEle', 'email')"
                          @mouseup="mouseUp()"
                        >
                          <button
                            @mouseover="changeof('emailEle')"
                            @mouseout="changeout('emailEle')"
                            class="field-element"
                            ref="emailEle"
                            id="emailEle"
                            @mousedown="mouseDown()"
                          >
                            <img
                              :src="
                                  require(`@/assets/img/fields_icons/${
                                    recipientSelectedColor &&
                                    defined_colors.indexOf(
                                      recipientSelectedColor
                                    ) != -1
                                      ? recipientSelectedColor
                                      : '#F754A2'
                                  }/emailEle.svg`)
                                "
                              alt="icon"
                            />
                            <div class="name">Email Id</div>
                          </button>
                        </draggable>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-scrollbar>
              </div>

              <!-- <el-button type="text" @click="openDocumentUserSettings()"
              ><i class="el-icon-setting"></i> Show settings</el-button
              >-->
              <!-- <el-button
              type="text"
              v-if="configurableDocumentId"
              @click="openDocumentExpirationSettings()"
              ><i class="el-icon-setting"></i>Expiration Settings</el-button
              >-->
            </div>
          </div>
          <!-- </el-col> -->
          <!-- </el-row> -->
        </div>
      </div>

      <el-dialog
        :visible.sync="addItemDataDialogVisible"
        top="5vh"
        :width="
          getIsMobile
            ? '100%'
            : selectedItem && selectedItem.type == 'FORMULA'
            ? '55%'
            : '45%'
        "
        :before-close="resetImgData"
        title="Field Properties"
        class="fields-dialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <el-scrollbar wrap-style="max-height: 60vh;" ref="configureScroll">
          <Formula
            v-if="addItemDataDialogVisible && selectedItem.type == 'FORMULA'"
            :field="selectedItem"
            :selfTemplate="{}"
            :templatesData="elements"
            :selfTemplateId="{}"
            :isFromDocument="true"
          ></Formula>
          <ConfigureDOcumentField
            v-else-if="
              addItemDataDialogVisible && selectedItem.type != 'FORMULA'
            "
            :selectedItem="selectedItem"
            :elements="elements"
            :documentRecipientsList="documentUsers"
            :getActiveWorkspace="getActiveWorkspace"
            :getAuthenticatedUser="getAuthenticatedUser"
            :allUsersEntityData="allUsersEntityData"
            :getCompanyDetails="getCompanyDetails"
            :getEntityDataByQuery="getEntityDataByQuery"
            :getTemplatesData="
              getTemplatesData && getTemplatesData.length
                ? getTemplatesData
                : []
            "
            :allTemplatesData="allTemplatesData"
            :isDraft="true"
            v-on:fillImageData="fillImageData"
            :id="selectedItem.key"
            ref="configureField"
          ></ConfigureDOcumentField>
        </el-scrollbar>

        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteElement()">Delete Field</el-button>
          <el-button type="primary" :disabled="checkDisabled()" @click="save(true)">Save</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="previewVisible"
        top="5vh"
        width="67%"
        title="Preview"
        :destroy-on-close="false"
      >
        <div class="form-holder-preview" ref="page" v-if="previewVisible">
          <div class="form-image-holder-preview">
            <img v-if="this.backgroundImage" :src="this.backgroundImage" class="page-image" />
          </div>
          <div class="form-fields-holder-preview">
            <div v-for="(item, index) of this.elements" :key="index">
              <img v-if="item.type == 'logo'" :src="getLogoUrl" :style="getStyle(item)" />

              <img
                :height="item.height"
                :width="item.width"
                v-if="item.type == 'my-signature'"
                :src="item.source"
                :style="getStyle(item)"
              />

              <el-input
                :style="getStyle(item)"
                type="text"
                :placeholder="item.placeholder"
                v-if="item.type == 'SINGLE_LINE_TEXT'"
                v-model="item.value"
                :disabled="checkFieldAllow(item)"
              ></el-input>

              <el-input
                :style="getStyle(item)"
                type="text"
                :placeholder="item.placeholder"
                v-if="item.type == 'NUMBER'"
                v-model="item.value"
                :disabled="checkFieldAllow(item)"
              ></el-input>

              <el-date-picker
                :height="item.height"
                :width="item.width"
                :style="getStyle(item)"
                type="date"
                :placeholder="item.placeholder"
                v-if="item.type == 'date'"
                v-model="item.value"
                :disabled="checkFieldAllow(item)"
              ></el-date-picker>

              <el-select
                :height="item.height"
                :width="item.width"
                :style="getStyle(item)"
                v-if="item.type == 'SELECT'"
                v-model="item.value"
                :placeholder="item.placeholder"
                :disabled="checkFieldAllow(item)"
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
                v-if="item.type == 'CHECKBOX'"
                v-model="item.value"
                :disabled="checkFieldAllow(item)"
              />
              <el-input
                type="textarea"
                :rows="item.rows"
                :style="getStyle(item)"
                v-if="item.type == 'MULTI_LINE_TEXT'"
                v-model="item.value"
                :placeholder="item.placeholder"
                :disabled="checkFieldAllow(item)"
              />

              <div v-if="item.type == 'signature'" :style="getStyle(item)">
                <a
                  v-if="!item.source"
                  style="cursor: pointer"
                  @click="captureSignature(item, index)"
                  :disabled="checkFieldAllow(item)"
                >
                  {{ item.label }}
                  <i class="el-icon-edit"></i>
                </a>
                <img
                  v-if="item.source"
                  :src="item.source"
                  style="cursor: pointer"
                  @click="captureSignature(item, index)"
                  height="45"
                />
              </div>

              <span style="clear: both"></span>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="captureSignatureDialog" top="5vh" width="30%" title="Add signature">
        <template v-if="selectedSignatureItem.type == 'signature'">
          <VueSignaturePad
            height="300px"
            ref="signaturePad"
            :options="{
              penColor: selectedSignatureItem.color,
            }"
          />
          {{ selectedSignatureItem.color }}
          <el-button icon="el-icon-refresh-left" title="Undo" @click="undo"></el-button>
          <button type="button" class="color-btn red" @click="selectedSignatureItem.color = 'red'"></button>
          <button
            type="button"
            class="color-btn black"
            @click="selectedSignatureItem.color = 'black'"
          ></button>
          <button
            type="button"
            class="color-btn green"
            @click="selectedSignatureItem.color = 'green'"
          ></button>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="captureSignatureDialog = false">Cancel</el-button>
          <el-button type="primary" @click="saveCapturedSignature()">Add Signature</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="showErrorElementDialog"
        class="outersize-confirm-type-one"
        title="Alert"
      >
        <h3>{{ fieldErrorMessage }}</h3>
        <div v-if="errorElements.length">
          <ul>
            <li v-for="(errorField, index) of errorElements" :key="index">
              <div>
                <p>{{ typeNameMap[errorField.type] }}</p>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showErrorElementDialog = false">Close</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="showErrorElementDialog"
        class="outersize-confirm-type-one"
        title="Alert"
      >
        <h3>{{ fieldErrorMessage }}</h3>
        <div v-if="errorElements.length">
          <ul>
            <li v-for="(errorField, index) of errorElements" :key="index">
              <div>
                <p>{{ typeNameMap[errorField.type] }}</p>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showErrorElementDialog = false">Close</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="showSignErrorElementDialog"
        class="outersize-confirm-type-one"
        title="Alert Message!"
        :width="getIsMobile ? '100%' : '70%'"
        :before-close="closeAlertPopup"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <p style="font-family: inter, sans-serif">Please add fields for:</p>
        <div class="alertPopupStyle" v-for="(name, index) in this.names" :key="index">
          {{ index + 1 + " " + "-" + " " + name }}
          <br />
        </div>
        <div v-if="errorElements.length">
          <ul>
            <li v-for="(errorField, index) of errorElements" :key="index">
              <div>
                <p>{{ typeNameMap[errorField.type] }}</p>
              </div>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAlertPopup()">Close</el-button>
        </span>
      </el-dialog>

      <el-dialog :visible.sync="showServerErrorsDialog" top="5vh" width="30%" title="Errors">
        <ol v-if="getConfigurableDocumentErrors">
          <li
            v-for="(err, index) of Object.values(getConfigurableDocumentErrors)"
            :key="index"
          >{{ err }}</li>
        </ol>

        <span slot="footer" class="dialog-footer">
          <el-button @click="showServerErrorsDialog = false">Close</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="addMyInitialStatus" top="5vh" width="45%" title="Add My-initial">
        <div>
          <el-input
            type="text"
            v-model="myInitial.text"
            label="Initial"
            placeholder="Enter initial"
          ></el-input>
          <el-col>
            <button type="button" class="color-btn red" @click="myInitial.color = '#FF0000'"></button>
            <button type="button" class="color-btn black" @click="myInitial.color = '#000000'"></button>
            <button type="button" class="color-btn green" @click="myInitial.color = '#008000'"></button>
          </el-col>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addMyInitialStatus = false">Cancel</el-button>
          <el-button type="primary" @click="saveMyInitial()">Add Initial</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="addMySignatureStatus"
        top="5vh"
        width="45%"
        title="Add My-signature"
      >
        <template>
          <VueSignaturePad
            width="500px"
            height="300px"
            ref="signaturePad"
            :customStyle="{ border: 'black 1px solid' }"
            :options="{
              penColor: selectedSignatureItem.color,
            }"
          />
          {{ selectedSignatureItem.color }}
          <el-button icon="el-icon-refresh-left" title="Undo" @click="undo"></el-button>
          <button type="button" class="color-btn red" @click="selectedSignatureItem.color = 'red'"></button>
          <button
            type="button"
            class="color-btn black"
            @click="selectedSignatureItem.color = 'black'"
          ></button>
          <button
            type="button"
            class="color-btn green"
            @click="selectedSignatureItem.color = 'green'"
          ></button>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addMySignatureStatus = false">Cancel</el-button>
          <el-button type="primary" @click="saveCapturedSignature()">Add Signature</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="sentDocumentSuccess"
        width="100%"
        class="dialog-success outersize-confirm-type-three"
        title=" Document Sent"
        :before-close="handleCloseDialog"
      >
        <div style="text-align: center">
          <span>
            <img class="imgstyle" alt="Document Sent" src="@/assets/img/sentDocumentSuccess.gif" />
            <p class="sent-text">Document has been sent</p>
          </span>

          <p class="pstyle" style="text-align: center; width: 100%; margin-left: 0px">
            we will send you an email notification when any action is taken on
            the document:
          </p>
          <p
            class="subpstyle"
            style="text-align: center; width: 100%; margin-left: 0px"
          >if someone view,signs or declined etc...</p>

          <div class="dialog-footer">
            <el-button @click="saveDocumentAsTemplate" style="margin-bottom: 5px">Save as Template</el-button>
            <el-button
              id="doc"
              type="primary"
              @click="gotoViewDocument"
              style="margin-bottom: 5px"
            >View Document</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="senderEmptyfieldsModal"
        title="Warning"
        :width="getIsMobile ? '100%' : '40%'"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div>
          You have set auto finish mode on. please fill below fields to auto
          completed sender. Otherwise press send document for sender to complete
          the fields.
          <div style="max-height: 250px">
            <p
              v-for="(el, key) in senderEmptyfields"
              :key="key"
              class="m-1"
              style="font-weight: bold"
            >{{ el.label }}</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sendDocumentWithoutFinish">Send document</el-button>
          <el-button
            @click="
              senderEmptyfieldsModal = false;
              documentDataLoading = false;
            "
            type="primary"
          >Fill fields</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="replaceDocumentModel"
        title="Change Document"
        :before-close="resetReplaceFiles"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        class="change-document-dlg"
      >
        <div
          v-loading="replaceDocumentLoading"
          element-loading-text="Uploading..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <h4 class="mb-1">Upload a new file to change the existing document:</h4>
          <el-upload
            class="avatar-uploader"
            action
            :on-change="checkToUploadDocument"
            :show-file-list="false"
            :auto-upload="false"
            multiple
          >
            <div class="upload-attchment-box">
              <img src="@/assets/img/fields/attachment-filling.svg" alt="Upload File" height="20" />
              <h4 class="ml-1">Upload a file</h4>
            </div>
          </el-upload>
          <div class="upload-from-other-container" id="uploadcontainer">
            <p
              class="text-muted fs-9 opacity-60 upload-a-file-upload-from-text"
              id="parastyle"
            >Upload From</p>
            <div class="from-others">
              <div class="image">
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="bottom-start"
                  content="Blank Document"
                >
                  <img
                    src="@/assets/img/icons/Blank.svg"
                    alt="Nimble logo"
                    class="upload-icon"
                    @click="chooseBlankDocument"
                  />
                </el-tooltip>
              </div>
              <div
                class="image"
                v-on:click="
                  (e) =>
                    handleUploadFrom(e, ['googledrive', 'dropbox', 'onedrive'])
                "
              >
                <el-tooltip placeholder="top-start" content="Google Drive">
                  <img src="@/assets/img/google-drive.svg" alt="Nimble logo" class="upload-icon" />
                </el-tooltip>
              </div>
              <div
                class="image"
                v-on:click="
                  (e) =>
                    handleUploadFrom(e, ['dropbox', 'googledrive', 'onedrive'])
                "
              >
                <el-tooltip placeholder="top-start" content="Drop Box">
                  <img src="@/assets/img/dropbox.svg" alt="Nimble logo" class="upload-icon" />
                </el-tooltip>
              </div>
              <div
                class="image"
                v-on:click="
                  (e) =>
                    handleUploadFrom(e, ['onedrive', 'googledrive', 'dropbox'])
                "
              >
                <el-tooltip class="item" effect="dark" placement="bottom-start" content="One Drive">
                  <img src="@/assets/img/onedrive.svg" alt="Nimble logo" class="upload-icon" />
                </el-tooltip>
              </div>
            </div>
          </div>
          <span v-if="logoError">{{ logoError }}</span>
          <el-row type="flex" justify="center" class="name-types">
            <el-col :span="22">
              <draggable v-if="this.files.length" v-model="files">
                <transition-group tag="div" name="flip-list" id="field-group">
                  <div class="filename" v-for="(file, index) in files" :key="JSON.stringify(file)">
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
                        class="img-fluid"
                      />
                      <img
                        v-else-if="file.raw.type == 'image/png'"
                        :src="require('@/assets/img/icons/PNG.svg')"
                        alt="icon"
                        class="img-fluid"
                      />

                      <img
                        v-else
                        :src="require('@/assets/img/icons/pdf.svg')"
                        alt="icon"
                        class="img-fluid"
                      />
                      {{ file.raw.name }}
                    </a>
                    <div class="direction-buttons">
                      <el-button
                        type="text"
                        icon="el-icon-bottom"
                        class="directions"
                        @click="moveDown(index)"
                      ></el-button>
                      <el-button
                        type="text"
                        icon="el-icon-top"
                        class="directions"
                        @click="moveUp(index)"
                      ></el-button>
                      <a @click="deleteItem(index)">
                        <i class="el-icon-circle-close"></i>
                      </a>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" class="name-types" v-if="files && files.length > 1">
            <el-col :span="22">
              <el-checkbox v-model="isMergeDocument">Process it as a single document?</el-checkbox>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetReplaceFiles">Cancel</el-button>
          <el-button
            @click="checkForMergeOrUpload"
            type="primary"
            :disabled="!files.length"
            :loading="replaceDocumentLoading"
          >Continue</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Edit Horizontal Line"
        :visible.sync="dialogFormVisible"
        :show-close="true"
        :close-on-click-modal="false"
      >
        <HorizontalLine
          :field="selectedItem"
          :isFromDocument="true"
          :form="documentData"
          :is-view="false"
          :allFields="elements"
        ></HorizontalLine>
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
          ></ConfigureNewRepeatableDataAdd>
          <span slot="footer" class="dialog-footer float-right">
            <el-button @click="handleCloseRepeatable">Cancel</el-button>
            <el-button
              type="primary"
              @click="addNewRepeatableData(documentUsers)"
              :loading="repeatableDataLoading"
              :disabled="checkPrimaryFieldsFilled"
            >Add</el-button>
          </span>
        </div>
      </el-dialog>
      <!-- v-if="showDocumentUserSettings" -->
      <ConfigureDocumentUsers
        v-if="addDocumentUsers"
        :documentUsers="documentUsers"
        :enforceSignatureOrder="enforceSignatureOrder"
        :allElements="allElements"
        :isSubmit="submitEvent"
        :isTemplate="isTemplate"
        v-on:close="closeDocumentUserSettings"
        :isAnyoneCanApprove="isAnyoneCanApprove"
      ></ConfigureDocumentUsers>

      <ConfigureSettings
        v-if="docSettingsVisible"
        :configurableDocumentId="configurableDocumentId"
        :docSettingsVisible="docSettingsVisible"
        @close="docSettingsVisible = false"
        @updatedSettings="closeSettingsAndSend"
      ></ConfigureSettings>
    </section>
  </section>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import appConfig from "@/config/app";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import offerLetterBuildHelper from "@/mixins/offerLetterBuildHelper";
//import ConfigureDocumentUsers from "@/components/companyDocuments/configureDocuments/ConfigureDocumentUsers";
var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js";
import textToImage from "text-to-image";
import MobileRelatedHelper from "@/mixins/MobileRelatedHelper";
import DocumentsHelper from "@/mixins/CompanyDocumentsHelper";
//import CurrencyInput from "./vue-weblineindia-currency-input/src/component";
import ConfigureDocumentsHelper from "@/mixins/ConfigureDocumentHelper";
import { bus } from "../main";
const ConfigureSettings = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureSettingsNewTemp"
  );
const ConfigureEntityField = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureEntityField"
  );
import draggable from "vuedraggable";
// import { StandardFonts } from "pdf-lib";

// import MySignature from "@/components/signature/MySignature";
const ConfigureDOcumentField = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureDocumentField.vue"
  );
const ConfigureRepeatableField = () =>
  import(
    "@/components/companyDocuments/configureDocuments/ConfigureRepeatableField"
  );
// import vueAnkaCropper from "vue-anka-cropper";
import "vue-anka-cropper/dist/VueAnkaCropper.css";

import EntityHelper from "@/mixins/EntitiesHelper";
// import Formula from "@/components/templates/formComponents/Formula.vue";
// import FormulaExecute from "@/components/templates/formComponentsExecute/FormulaExecute";
// const Initial = () => import("@/components/account/Initial.vue");

export default {
  name: "Global-ConfigureEmployeeDocumentDraft",
  components: {
    // vueAnkaCropper,
    VueDraggableResizable,
    ConfigureDocumentUsers: () =>
      import(
        "@/components/companyDocuments/configureDocuments/ConfigureDocumentUsers"
      ),
    ConfigureSettings,
    draggable,
    // MySignature,
    // Initial,
    ConfigureDOcumentField,
    CurrencyInput: () =>
      import("./vue-weblineindia-currency-input/src/component"),
    ConfigureEntityField,
    Formula: () => import("@/components/templates/formComponents/Formula.vue"),
    FormulaExecute: () =>
      import("@/components/templates/formComponentsExecute/FormulaExecute"),
    ConfigureRepeatableField,
    ConfigureNewRepeatableDataAdd: () =>
      import(
        "./companyDocuments/configureDocuments/ConfigureNewRepeatableDataAdd.vue"
      ),
    HorizontalLine: () =>
      import("@/components/templates/formComponents/HorizontalLine.vue"),

    HorizontalLineExecute: () =>
      import(
        "@/components/templates/formComponentsExecute/HorizontalLineExecute.vue"
      )
  },
  mixins: [
    offerLetterBuildHelper,
    MobileRelatedHelper,
    DocumentsHelper,
    ConfigureDocumentsHelper,
    EntityHelper
  ],
  created() {
    let that = this;
    document.addEventListener("keyup", function(evt) {
      if (evt.keyCode === 46) {
        that.deleteActiveElement();
      }
      // if (evt.keyCode === 37) {
      //   that.changePositionOfElementToLeft();
      // }
      // if (evt.keyCode === 39) {
      //   that.changePositionOfElementToRight();
      // }
      // if (evt.keyCode === 38) {
      //   that.changePositionOfElementToUpward();
      // }
      // if (evt.keyCode === 40) {
      //   that.changePositionOfElementToDown();
      // }
    });
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (this.getIsMobile) {
      this.$store.commit("navigationOpen/setIsOpen", false, {
        root: true
      });
      this.$store.commit("navigationOpen/setIsRSOpen", false, {
        root: true
      });
    }
    bus.$on("entityData-updated", data => {
      if (data.field && data.field.key) {
        this.updateEntityVariablesData(
          data.entityDataId,
          data.field,
          data.data,
          data.value
        );
      }
    });
    bus.$on("open-repeatable-data", data => {
      if (data && data.template_data) {
        let primaryFields = data.template_data.primary_fields
          ? data.template_data.primary_fields
              .filter(e => e && e.key)
              .flatMap(e => e.key)
          : [];
        this.newRepeatableTemplateData = this.getTemplateFields(
          data.template_data
        );
        this.newRepeatableTemplateData = this.newRepeatableTemplateData.map(
          e => {
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
    bus.$on("repeatableData-updated", data => {
      if (data.field && data.field.key) {
        this.updateRepeatableVariablesData(
          data.repeatableDataId,
          data.field,
          data.data,
          data.value
        );
      }
    });
    bus.$on("scroll-down", () => {
      let scrollbarEl = this.$refs.configureScroll.wrap;
      scrollbarEl.scrollTop = scrollbarEl.scrollHeight;
    });
  },
  data() {
    return {
      blanckDocumentModal: false,
      blanckDocumentData: {
        name: "",
        pages: 1,
        loading: false
      },
      blankTemplatesUrl: [
        "/rest/esignature/files/3cc3b9ac-ff3d-4dfa-90a9-96644c719a15.pdf",
        "/rest/esignature/files/dfc42fc5-4696-4e88-81df-8daf1a7a63dd.pdf",
        "/rest/esignature/files/56647615-6ccc-49c6-9991-b72be2706148.pdf"
      ],
      uploadFromOthersFileName: "",
      uploadFromOthersBlobData: null,
      is_SaveDocument: false,
      isAspectRatio: true,
      dialogVisible: false,
      isFromFieldActivated: false,
      deltaXToMove: 0,
      deltaYToMove: 0,
      deltaXForNearestField: 4,
      deltaYForNearestField: 4,
      posStep: 1,
      posStepShift: 5,
      pageWidth: 0,
      deltaXOfPageWidth: 2,
      pageHeight: 0,
      currentUserSign: null,
      dialogFormVisible: false,
      currentUserInitial: null,
      isFieldEditting: false,
      recipientSelectedColor: "",
      defined_colors: ["#FF495C", "#3777FF", "#EE964B", "#03CEA4"],

      dragItemHeight: 40,
      limit: 2,
      deltaX: 0,
      deltaY: 0,
      mouseX: 0,
      mouseY: 0,
      isDragging: false,
      tableElementLoading: false,
      activeCollapse: ["1", "2", "3"],
      activeEntityCollapse: [],
      tableLoading: false,
      elements: [],
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      addItemDataDialogVisible: false,
      selectedItemIndex: null,
      selectedItem: {},
      refreshForm: false,
      selectedSignatureItem: {},
      selectedSignatureItemIndex: -1,
      captureSignatureDialog: false,
      hasBackground: false,
      documentId: null,
      configurableDocumentId: null,
      documentDataLoading: false,
      documentFormData: null,
      documentName: "",
      loading: false,
      backgroundImage: "",
      previewVisible: false,
      activatedItem: null,
      activatedItemIndex: -1,
      addMySignatureStatus: false,
      addMyInitialStatus: false,
      isAnyoneCanApprove: false,
      names: [],
      myInitial: {
        text: "",
        color: "",
        value: ""
      },
      fields: [],
      currentFormBuilderWidth: null,
      storedFormBuilderWidth: null,
      checkExistingData: false,
      backgroundImages: [
        "https://devnimblehrms.s3.ap-south-1.amazonaws.com/company-document-backgrounds/60468b2c0a7b7942d5781c36/60468b2c0a7b7942d5781c36-0.png"
      ],
      loadingElements: false,
      userInitial: "",
      selectedTemplateFields: [],
      selectedEntityFields: [],
      templatesUsed: [],
      entitiesUsed: [],
      showErrorElementDialog: false,
      showServerErrorsDialog: false,
      showDocumentUserSettings: false,
      errorElements: [],
      showDocumentExpirationDatesSettings: false,
      fieldErrorMessage: "",
      typeNameMap: {
        logo: "Company Logo",
        SINGLE_LINE_TEXT: "Single Line Input",
        NUMBER: "Number Input",
        MULTI_LINE_TEXT: "Multi line Text",
        SELECT: "DropDown",
        CHECKBOX: "CheckBox",
        DATE: "Date",
        SIGNATURE: "Signature",
        "my-signature": "My Signature"
      },
      documentUsers: [
        {
          email: "",
          first_name: "",
          last_name: "",
          e_signature_required: true,
          value: "SENDER",
          name: "SENDER",
          default: true,
          e_signature_order: 0
        }
      ],
      enforceSignatureOrder: true,
      signaturesFields: [],
      signatureDates: [],
      signaturesConfig: [],
      submitEvent: false,
      params: {},
      expirationSettings: {
        valid_from_date: {
          is_manual: false,
          manual_type: "",
          signature_user: "",
          signature_user_post_days: "",
          admin_approve_post_days: ""
        },
        valid_to_date: {
          is_manual: false,
          manual_type: "",
          signature_user: "",
          signature_user_post_days: "",
          admin_approve_post_days: ""
        }
      },
      filechanged: false,
      options: [],
      recipientSelection: "",
      list: [],
      addDocumentUsers: false,
      // for users edit
      selectedUser: null,
      selectedUserIndex: 0,
      contentFields: [
        "PARAGRAPH",
        "HEADING",
        "logo",
        "INITIAL",
        "my-signature",
        "TABLE"
      ],
      userFields: {
        first_name: "First Name",
        last_name: "Last Name",
        company_name: "Company",
        address: "Address",
        phone: "Phone",
        email: "Email",
        full_name: "Full Name",
        title: "Title"
      },
      saveAction: "",
      isTemplate: false,
      templateTitle: "",
      isTemplateToSave: false,
      isTemplateForm: {
        documentTitle: "",
        agreed: ""
      },

      isShowPreview: false,
      showSignErrorElementDialog: false,

      sendDoucumentRedirection: false,

      userDocumentFormData: {
        valid_from: this.$moment()
          .startOf("day")
          .toString(),
        expires_at: this.$moment()
          .endOf("day")
          .toString(),
        e_signature_required: "",
        e_signature_value: ""
      },
      docSettingsVisible: false,
      documentSendStatus: false,
      // table
      selectedHeader: "",
      selectedHeaderIndex: "",
      document_url_path: "",
      tagType: ["success", "info", "", "warning", "danger"],
      fontTypes: [],
      font_Size: 16,
      fontSizes: [
        {
          value: 8,
          label: 8
        },
        {
          value: 10,
          label: 10
        },
        {
          value: 12,
          label: 12
        },
        {
          value: 14,
          label: 14
        },
        {
          value: 16,
          label: 16
        },
        {
          value: 18,
          label: 18
        },
        {
          value: 20,
          label: 20
        },
        {
          value: 22,
          label: 22
        },
        {
          value: 24,
          label: 24
        },
        {
          value: 26,
          label: 26
        },
        {
          value: 28,
          label: 28
        },
        {
          value: 30,
          label: 30
        },
        {
          value: 32,
          label: 32
        },
        {
          value: 36,
          label: 36
        },
        {
          value: 48,
          label: 48
        },
        {
          value: 56,
          label: 56
        },
        {
          value: 72,
          label: 72
        },
        {
          value: 84,
          label: 84
        },
        {
          value: 96,
          label: 96
        }
      ],
      value: "",
      uploadImageLoading: false,
      imgData: null,
      imgDataWidth: 0,
      imgDataHeight: 0,
      sendDoucumentMailRedirection: false,
      sendDoucumentSettingsRedirection: false,
      docSettingsVisibleAndSend: false,
      mailCCSendTo: [],
      mailSendTo: [],
      setMaxDate: "",
      setMinDate: "",
      mailContent: "Requesting esign - ",
      mailSubject: "",
      sentDocumentSuccess: false,
      sender_auto_fill: false,
      unWantedFields: [
        "INITIAL",
        "SIGNATURE",
        // "ATTACHMENT",
        "IMAGE",
        "HEADING",
        "PARAGRAPH",
        "my-signature",
        "MY_INITIAL",
        "DATE_SIGNED",
        "CHECKBOX",
        "FORMULA"
      ],
      attachmentLoading: false,
      selectedAttachmentFile: {
        document_name: "",
        attachment_url: "",
        valid_from: "",
        document_number: "",
        expires_on: "",
        title: "",
        description: "",
        activeDetails: []
      },
      senderEmptyfields: [],
      senderEmptyfieldsModal: false,
      issenderFinishDocument: true,
      senderFilledAllFields: false,
      isUserHasSign: true,
      replaceDocumentModel: false,
      files: [],
      replaceDocumentLoading: false,
      logoError: "",
      fieldsFormUpload: {
        title: "",
        type: "CUSTOM",
        file_ref_id: "",
        selectedFile: "",
        selectedFileName: ""
      },
      isInitialRender: true,
      scale: 1,
      docPages: 0,
      pdfPages: 1,
      isRightRotate: false,
      isLeftRotate: false,
      rotations: [],
      allPdfData: [],
      document_url_paths: [],
      total_documents: 1,
      currentActivatePage: 0,
      currentActivateDoc: 0,
      deleted_pages: [],
      currentSelectedPageIndex: -1,
      currentSelectedDocIndex: -1,
      isEditingDocument: false,
      isAddingPage: false,
      isDeletingPage: false,
      affectedFields: [],
      isMergeDocument: false,
      reservedLabels: [
        "first name",
        "last name",
        "email",
        "title",
        "address",
        "phone",
        "company",
        "full name"
      ],
      canRename: false,
      allUsersEntityData: [],
      selectedUserEntity: {},
      allTemplatesData: {},
      selectedRepeatableIndex: "newData",
      is_forbidden_doc: false,
      textHighlightStyle: "",
      currentActiveText: {},
      textHighlightVisible: false,
      isEditingText: false,
      selectedText: {},
      selectedTextIndex: -1,
      selectedTextPageIndex: -1,
      selectedTextDocIndex: -1,
      selectedTextInPdf: "",
      selectedTextRation: 1,
      pdfEditingChanges: [],
      isPdfEditing: false,
      pdfDocData: null,
      isMakeBold: false,
      isMakeItalic: false,
      isChangeColor: false,
      isEditMode: false,
      allPdfText: {},
      allPdfTextStyle: {},
      pdfFontTypes: ["Helvetica", "TimesRoman"],
      isEarserMode: false,
      isEarserDraw: false,
      isEarserSelect: false,
      startingX: -1,
      startingY: -1,
      endingX: -1,
      endingY: -1,
      pdfRectangleChanges: [],
      documentData: {},
      pdfRectangleTextChanges: [],
      isAddingText: false,
      addedTextOnRectangle: "",
      isDrawLine: false,
      isDrawingLine: false,
      pdfLineChanges: [],
      drawLineColor: "#000000",
      isDrawLineColorChange: false,
      repeatableDataModal: false,
      repeatableDataLoading: false,
      newRepeatableTemplateData: [],
      repeatableSelectedField: {},
      newRepeatableData: {},
      repeatableIds: []
    };
  },
  computed: {
    ...mapGetters("configurableDocuments", [
      "getConfigurableDocumentUpdateStatus",
      "getConfigurableDocumentData",
      "getConfigurableDocumentErrors",
      "getConfigurableDocumentDataById",
      "getConfigurableDocumentExpirationSettigns"
    ]),
    ...mapGetters("auth", [
      "getAuthenticatedUser",
      "getInitialUrl",
      "getUserSignature",
      "getDefaultDateFormat",
      "getActiveWorkspace",
      "getUserType"
    ]),
    ...mapGetters("fileUpload", [
      "getFontTypes",
      "getUploadFileDataStatus",
      "getAddPageStatus",
      "getCopyDocumentUrl",
      "getFetchPreSignedUrlStatus"
    ]),
    ...mapGetters("documents", [
      "getSingleDocumentData",
      "getDraftDocumentUpdateStatus",
      "getDocumnetSentDocumnet",
      "getDocumentSendStatus",
      "getEmployeeDocumentUsers",
      "getDocumentSendErrors"
    ]),
    ...mapGetters("settings", ["getApplicationSettings"]),
    ...mapGetters("navigationOpen", ["getIsMobile", "getIsRSOpen"]),
    ...mapGetters("employeeData", ["getUserSignature"]),
    ...mapGetters("entities", [
      "getEntityDataByQuery",
      "getCompanyEntityDetails"
    ]),
    ...mapGetters("templatesData", [
      "getTemplatesData",
      "getAddNewRepeatableDataStatus",
      "getAddNewRepeatableData",
      "getAddNewRepeatableDataErrors"
    ]),
    ...mapGetters("company", ["getCompanyDetails"]),
    getTableHeaders() {
      return this.selectedItem.headers;
    },
    getDocUsers() {
      let users = [];
      this.documentUsers.forEach(user => {
        if (user.first_name) {
          users.push(user);
        }
      });
      return users;
    },
    getLogoUrl() {
      return appConfig.S3_BUCKET_URL + "/" + this.getCompanyProfileData.logo;
    },
    basePdfdownloadUrl() {
      // return appConfig.JAVA_BASE_URL;
      return appConfig.S3_BUCKET_URL;
    },
    getSelectedTextStyle() {
      let style = "overflow: hidden; ";
      if (this.selectedText && this.selectedText.style) {
        style += `font-size: ${
          this.selectedText.height
        } !important; font-family: ${
          this.selectedText.style.fontFamily
        }; font-style: ${
          this.selectedText.style.weight == 2 ||
          this.selectedText.style.weight == 3
            ? "italic"
            : "normal"
        };font-weight:${
          this.selectedText.style.weight == 1 ||
          this.selectedText.style.weight == 3
            ? "bold"
            : "normal"
        };color:${
          this.selectedText.style.color
            ? this.selectedText.style.color
            : "black"
        }; `;
      }
      return style;
    },
    getBackgroundImage() {
      return path => appConfig.S3_BUCKET_URL + "/" + path;
    },
    getPdfPages() {
      return this.pdfPages;
    },
    getAllPdfData() {
      return this.allPdfData;
    },
    getTotalPdfs() {
      return this.total_documents;
    },
    allElements() {
      return this.elements;
    },
    getDocumentIsEditable() {
      return false;
    },
    getColorByFilledBy() {
      return item => {
        let style = "";
        if (item.filled_by && item.type == "HORIZONTAL_LINE") {
          style = `background: #FFFFFF;border:1px solid transparent`;
        } else if (item.filled_by || item.selected_user) {
          this.documentUsers.map(user => {
            if (
              (user.value == item.filled_by ||
                user.value == item.selected_user) &&
              user.color
            ) {
              style = `background: ${user.color + "33"}; border: 1px solid ${
                user.color
              }; color: #000000`;
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
    getTextColorByFilledBy() {
      return item => {
        let style = "";
        if (item.filled_by || item.selected_user) {
          this.documentUsers.map(user => {
            if (
              (user.value == item.filled_by ||
                user.value == item.selected_user) &&
              user.color
            ) {
              style = `color: ${user.color}`;
            }
          });
          return style;
        } else {
          style = "color: #000000";
        }
        if (item.type != "logo") {
          return style;
        }
        return "";
      };
    },
    hasTemplateFields() {
      let fieldsnOIncludesInTemplate = [
        "SIGNATURE",
        "my-signature",
        "DATE_SIGNED"
      ];

      return fieldsnOIncludesInTemplate.indexOf(this.selectedItem.type) > -1
        ? false
        : true;
    },
    getSignaturesFields() {
      let signaturesFields = this.elements.filter(e => e.type == "SIGNATURE");
      let duplicateKeyCounter = {};

      return signaturesFields.map(element => {
        let newKey = this.generateKeyForField(element.label);
        if (duplicateKeyCounter[newKey]) {
          element.key = newKey + "_" + duplicateKeyCounter[newKey];
          duplicateKeyCounter[newKey]++;
        } else {
          duplicateKeyCounter[newKey] = 1;
          element.key = newKey;
        }
        return element;
      });
    }
  },
  async mounted() {
    this.documentSendStatus = false;
    this.currentFormBuilderWidth = this.$refs.formBuilder.clientWidth;
    this.employeeDocumentId = this.$route.params.employee_document_id;
    await Promise.all([
      this.fetchCompanyDetails(),
      this.fetchEmployeDocumentData(),
      this.getAllFontTypes(),
      this.$store.dispatch("auth/fetchInitialSignature"),
      this.$store.dispatch("auth/fetchUserSignature")
    ]);
    await this.fetchDocumentSettings({
      document_id: this.$route.params.employee_document_id
    });
    // await this.fetchDocumentData();
    // await this.getAllFontTypes();
    // await this.$store.dispatch("auth/fetchInitialSignature");
    // await this.$store.dispatch("auth/fetchUserSignature");
    // await this.fetchDocumentDetails();
    this.handleScroll();
    document.addEventListener("dragover", this.onDocumentDrag);
    document
      .querySelectorAll(".field-element")
      .forEach(element =>
        element.addEventListener("mousedown", this.onDraggableElementMouseDown)
      );
    //     if (Object.keys(StandardFonts)) {
    //   (Object.keys(StandardFonts) || []).forEach((e) => {
    //     this.pdfFontTypes.push(StandardFonts[e].replace("-", " "));
    //   });
    // }
    document.addEventListener("touchmove", this.onDocumentDragMobile);
    document
      .querySelectorAll(".field-element")
      .forEach(element =>
        element.addEventListener(
          "touchstart",
          this.onDraggableElementMouseDownMobile
        )
      );
    let that = this;
    that.setMaxDate = {
      disabledDate: time => {
        return (
          time.getTime() >
          new Date(that.selectedAttachmentFile.expires_on).getTime()
        );
      }
    };
    that.setMinDate = {
      disabledDate: time => {
        return (
          time.getTime() <
          new Date(that.selectedAttachmentFile.valid_from).getTime()
        );
      }
    };
    document.onmousemove = function(event) {
      that.mousePosition(event);
      that.mouseUpOnDocument(event, false);
    };
    document.onmouseup = function(event) {
      that.mouseUpOnDocument(event, true);
    };
    document.onmousedown = function(event) {
      that.mouseDownOnDocument(event);
    };
  },
  methods: {
    async editPdf() {
      this.documentDataLoading = true;
      this.document_url_paths.forEach(async (document, index) => {
        let docChanges = this.pdfEditingChanges.filter(
          change => change.docIndex == index
        );
        let docRectangles = this.pdfRectangleChanges.filter(
          e => e.docId == index
        );
        let pdfTexts = this.pdfRectangleTextChanges.filter(
          e => e.docId == index
        );
        let pdfLineChanges = this.pdfLineChanges.filter(e => e.docId == index);
        let urlSliptArray = document.split("/");
        let tempUrl = "";
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          tempUrl = `/${process.env.VUE_APP_APP_TYPE}${document}`;
        } else {
          tempUrl = document;
        }
        let url = this.basePdfdownloadUrl + tempUrl;
        if (
          (docChanges && docChanges.length) ||
          (docRectangles && docRectangles.length) ||
          (pdfLineChanges && pdfLineChanges.length) ||
          (pdfTexts && pdfTexts.length)
        ) {
          let params = {
            addDocId: false,
            addPageNumber: false,
            stampByTsa: false,
            pdfSignatures: [],
            defaultScale: this.scale,
            keepFileID: true,
            pdfTexts: [],
            pdfLines: [],
            pdfRecs: [],
            pdfImages: [],
            pdfContent: url
          };
          docChanges.forEach(el => {
            // let pageId = el.item && el.item.currentPage ? el.item.currentPage.toString() : '0_canvas_1';
            console.log("page id", el.item.currentPageHeight);
            // let selectedPage = document.getElementById(pageId);
            let x = el.item.transform[4] * this.scale;
            let y = (el.item.transform[5] + el.item.height) * this.scale;
            if (el.item.currentPageHeight) {
              y = el.item.currentPageHeight - y;
            }
            let color = [255, 255, 255];
            params.pdfTexts.push({
              content: el.text,
              location: {
                page: el.pageIndex,
                x: x,
                y: y,
                width: el.item.width * this.scale,
                height: el.item.height * this.scale
              },
              font: {
                name:
                  el.item && el.item.style && el.item.style.fontFamily
                    ? el.item.style.fontFamily
                    : "Times New Roman",
                size: el.item && el.item.height ? el.item.height : 12,
                color:
                  el.item && el.item.style && el.item.style.color
                    ? el.item.style.color
                    : "#000000",
                style:
                  el.item && el.item.style && el.item.style.weight
                    ? el.item.style.weight
                    : 0
              }
            });
            if (
              el.backgroundColor &&
              el.backgroundColor.indexOf("(") &&
              el.backgroundColor.indexOf(")") &&
              el.backgroundColor.slice(
                el.backgroundColor.indexOf("(") + 1,
                el.backgroundColor.indexOf(")")
              )
            ) {
              let codes = el.backgroundColor.slice(
                el.backgroundColor.indexOf("(") + 1,
                el.backgroundColor.indexOf(")")
              );
              if (codes) {
                let colors = codes.split(",").map(e => parseInt(e));
                if (colors && colors.length) {
                  color = colors;
                }
              }
            }
            console.log("color", color);
            params.pdfRecs.push({
              page: el.pageIndex,
              x: x,
              y: y,
              width: el.item.width * this.scale,
              height: (el.item.height + 2) * this.scale,
              lineWidth: 0,
              lineColor: color.join(","),
              opacity: 1,
              colorFill: color.join(",")
            });
          });
          docRectangles.forEach(el => {
            params.pdfRecs.push({
              page: el.pageIndex,
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
              lineWidth: 0,
              lineColor: el.color.join(","),
              opacity: 1,
              colorFill: el.color.join(",")
            });
          });
          pdfLineChanges.forEach(el => {
            params.pdfLines.push({
              page: el.pageIndex,
              x: el.x,
              y: el.y,
              urx: el.urx,
              ury: el.y,
              color: el.color.join(","),
              lineWidth: 2
            });
          });
          pdfTexts.forEach(el => {
            params.pdfTexts.push({
              content: el.text,
              wraptext: true,
              location: {
                page: el.pageIndex,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height
              },
              font: {
                name: "Times New Roman",
                size: 16 / this.scale,
                color: "#000000",
                style: 0
              }
            });
          });
          await this.$store.dispatch("fileUpload/fileTheUploadv4", params);
        }
        let lastDocument = false;
        if (index + 1 == this.document_url_paths.length) {
          lastDocument = true;
        }
        if (lastDocument) {
          this.documentDataLoading = false;
          this.$notify({
            title: "Success",
            message: "Document updated successfully",
            type: "success"
          });
          this.pdfEditingChanges = [];
          this.pdfRectangleChanges = [];
          this.isEditMode = false;
        }
      });
    },
    editSelectedText() {
      if (this.selectedText) {
        let exitedText = this.pdfEditingChanges.find(
          e =>
            e.index == this.selectedTextIndex &&
            e.pageIndex == this.selectedTextPageIndex &&
            e.docIndex == this.selectedTextDocIndex
        );
        let selectedText = this.selectedText;
        if (exitedText && exitedText.item) {
          exitedText.item = { ...exitedText.item, ...{ str: exitedText.text } };
          selectedText = JSON.parse(JSON.stringify(exitedText.item));
          this.selectedText = selectedText;
        }
        if (this.selectedText) {
          if (this.selectedText.str) {
            this.selectedTextRation =
              this.selectedText.width / this.selectedText.str.length;
          }
          if (!this.selectedText.style) {
            let style = {
              color: "#000000",
              weight: 0,
              fontFamily: "Times New Roman"
            };
            this.selectedText = { ...this.selectedText, ...{ style: style } };
          }
        }
        this.selectedTextInPdf = selectedText.str;
        this.isEditingText = true;
        this.isEarserMode = false;
      }
    },
    mousePosition(e) {
      if (this.$refs.formBuilder) {
        const domEle = this.$refs.formBuilder.getBoundingClientRect();
        let divX = domEle.x;
        let divY = domEle.y;
        let width = domEle.width;
        let height = domEle.height;
        if (
          divX <= e.pageX &&
          divY <= e.pageY &&
          e.pageX <= width + divX &&
          e.pageY <= height &&
          this.isEditMode &&
          !this.isEarserMode &&
          !this.isDrawLine
        ) {
          let pageBoundary = this.getPagesBoundaries(e.pageY - divY);
          let docId =
            pageBoundary &&
            pageBoundary.data &&
            Number.isInteger(pageBoundary.data.docId)
              ? pageBoundary.data.docId
              : 0;
          let pageId =
            pageBoundary &&
            pageBoundary.data &&
            Number.isInteger(pageBoundary.data.pageId)
              ? pageBoundary.data.pageId + 1
              : 1;
          let id = docId + "_canvas_" + pageId;
          let currentPage = document.getElementById(id.toString());
          if (currentPage) {
            let xOnPage = e.pageX - divX;
            let yOnPage = e.pageY - divY;

            if (
              xOnPage >= currentPage.offsetLeft &&
              xOnPage <= currentPage.offsetLeft + currentPage.width
            ) {
              this.isMakeItalic = false;
              this.isMakeBold = false;
              this.isChangeColor = false;
              let pageText = this.allPdfText[docId][pageId];
              let textStyle = this.allPdfTextStyle[docId][pageId];
              let textBox = document.getElementById("textHighlight");
              let styles = {};
              let k = -1;
              let selectedText = pageText.fields.find((u, i) => {
                let textX = u.transform[4] * this.scale;
                let textY =
                  currentPage.height -
                  u.transform[5] * this.scale +
                  currentPage.offsetTop;
                let cursorX = xOnPage - currentPage.offsetLeft;
                let cursorY = yOnPage;
                if (
                  cursorX >= textX - 5 &&
                  cursorX <= textX + u.width * this.scale + 5 &&
                  cursorY <= textY + 5 &&
                  cursorY >= textY - u.height * this.scale - 5
                ) {
                  k = i;
                  styles.x = textX;
                  styles.y = textY - u.height * this.scale;
                  styles.width = u.width * this.scale;
                  styles.height = u.height * this.scale;
                  return u;
                }
              });
              if (!this.isEditingText) {
                if (selectedText) {
                  let textFont =
                    textStyle[
                      selectedText.fontName ? selectedText.fontName : ""
                    ];
                  let font = {
                    color: "#000000",
                    weight: 0,
                    fontFamily: "Times New Roman"
                  };
                  if (textFont && textFont.fontFamily) {
                    if (textFont.fontFamily == "sans-serif") {
                      font.fontFamily = "Times New Roman";
                    } else if (
                      this.fontTypes.indexOf(textFont.fontFamily) != -1
                    ) {
                      font.fontFamily = textFont.fontFamily;
                    }
                  }
                  this.selectedTextIndex = k;
                  this.selectedTextPageIndex = pageId;
                  this.selectedTextDocIndex = docId;
                  this.selectedText = {
                    ...selectedText,
                    ...{
                      currentPage: id.toString(),
                      currentPageHeight: currentPage.height,
                      style: font
                    }
                  };
                  textBox.style.display = "block";
                  textBox.style.height = styles.height + 5 + "px";
                  textBox.style.width = styles.width + "px";
                  textBox.style.top = styles.y + "px";
                  textBox.style.left = styles.x + currentPage.offsetLeft + "px";
                  textBox.style.zIndex = "200";
                } else {
                  this.isEditingText = false;
                  this.selectedText = {};
                  this.selectedTextInPdf = "";
                  textBox.style.display = "none";
                }
              }
            }
          }
        }
      }
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    chooseBlankDocument() {
      this.blanckDocumentModal = true;
    },
    resetBlankTemplate() {
      this.blanckDocumentModal = false;
      this.blanckDocumentData.name = "";
      this.blanckDocumentData.pages = 1;
    },
    closeAlertPopup() {
      this.names = [];
      this.showSignErrorElementDialog = false;
    },
    async replaceBlankDoc() {
      this.loading = true;
      this.blanckDocumentData.loading = true;
      this.fieldsFormUpload.title = this.blanckDocumentData.name;
      let selectedFileUrl = this.blankTemplatesUrl[
        this.blanckDocumentData.pages - 1
      ];
      let url = selectedFileUrl.split("/");
      let document_url_path = "";
      if (url[1] != process.env.VUE_APP_APP_TYPE) {
        document_url_path = `/${process.env.VUE_APP_APP_TYPE}${selectedFileUrl}`;
      } else {
        document_url_path = selectedFileUrl;
      }
      let companyId =
        this.getActiveWorkspace && this.getActiveWorkspace.company_id
          ? this.getActiveWorkspace.company_id
          : this.getAuthenticatedUser._id;
      let params = {
        companyId: companyId,
        pdfContent: appConfig.S3_BUCKET_URL + document_url_path
      };
      await this.$store.dispatch(
        "fileUpload/duplicateUploadedDocumentv4",
        params
      );
      if (this.getCopyDocumentUrl) {
        let tempUrl = "";
        if (this.getCopyDocumentUrl.url.includes(appConfig.S3_BUCKET_URL)) {
          tempUrl = this.getCopyDocumentUrl.url.replace(
            appConfig.S3_BUCKET_URL,
            ""
          );
        } else {
          tempUrl = this.getCopyDocumentUrl.url;
        }
        let fileUploadUrls = [tempUrl];
        let names = [this.blanckDocumentData.name];
        this.updateConfigDocument(fileUploadUrls, names);
      } else {
        this.logoError = "Error in uploading file. Please try again..";
      }
      this.blanckDocumentModal = false;
      this.replaceDocumentModel = false;
    },
    activeEntityCollapseMethod() {
      this.selectedRepeatableIndex = "";
    },
    getTempTitle(title) {
      return title.slice(0, 24);
    },
    getRepeatableData(template) {
      let result = [];
      const selectedUser = this.documentUsers.find(
        e => e.value == this.recipientSelection
      );
      let selectedTemplateData =
        this.getTemplatesData && this.getTemplatesData.length
          ? this.getTemplatesData.find(
              t =>
                (selectedUser &&
                  selectedUser.entity_data_id &&
                  t.template_id == template.template_id &&
                  t.entity_data_id == selectedUser.entity_data_id._id) ||
                t.entity_data_id == selectedUser.entity_data_id
            )
          : null;
      if (template.max_value) {
        if (selectedTemplateData && selectedTemplateData.template_data) {
          selectedTemplateData.template_data = this.setRepeatableDataStucture(
            selectedTemplateData.template_data,
            "data"
          );
        }
        let primaryTempKey =
          template.primary_field && template.primary_field.key
            ? template.primary_field.key
            : template.fields && template.fields[0]
            ? template.fields[0].key
            : "";
        let key =
          selectedTemplateData &&
          selectedTemplateData.template_data &&
          Object.keys(selectedTemplateData.template_data) &&
          Object.keys(selectedTemplateData.template_data)[0]
            ? Object.keys(selectedTemplateData.template_data)[0]
            : template.name
                .toLowerCase()
                .split(" ")
                .join("_");
        const repeatableData =
          key &&
          selectedTemplateData &&
          selectedTemplateData.template_data &&
          selectedTemplateData.template_data[key]
            ? selectedTemplateData.template_data[key]
            : [];
        for (let i = 0; i < template.max_value; i++) {
          if (repeatableData && repeatableData.length && repeatableData[i]) {
            result.push({
              name: repeatableData[i][primaryTempKey]
                ? repeatableData[i][primaryTempKey + "/name"]
                  ? repeatableData[i][primaryTempKey + "/name"]
                  : repeatableData[i][primaryTempKey]
                : "Data",
              data: repeatableData[i],
              indexKey: repeatableData[i]["indexKey"]
            });
          } else {
            result.push({
              name: "New data " + (i + 1),
              data: {},
              indexKey: "newData:" + (i + 1)
            });
          }
        }
      }
      return result;
    },
    async fetchCompanyDetails() {
      let id =
        this.getActiveWorkspace &&
        this.getActiveWorkspace.company_id &&
        this.getActiveWorkspace.company_id._id
          ? this.getActiveWorkspace.company_id._id
          : this.getActiveWorkspace.company_id;
      await this.$store.dispatch("company/fetchCompany", id);
    },
    composeNewFileItem(file) {
      let fileItem = {};
      fileItem.name = file.name;
      fileItem.percentage = 0;
      fileItem.raw = file;
      fileItem.size = file.size;
      fileItem.status = "ready";
      fileItem.uid = file.uid;
      return fileItem;
    },
    toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        callback(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
    handleUploadDoneFromOthers(res) {
      if (
        res.filesUploaded.length > 0 &&
        res.filesUploaded[0].url !== undefined
      ) {
        this.uploadFromOthersBlobData = null;
        this.uploadFromOthersFileName = res.filesUploaded[0].filename;
        this.loading = true;
        var self = this;
        this.toDataUrl(res.filesUploaded[0].url, function(x) {
          self.uploadFromOthersBlobData = x;
          self.loading = false;

          self.files.push(
            new self.composeNewFileItem(
              new File(
                [self.uploadFromOthersBlobData],
                self.uploadFromOthersFileName
              )
            )
          );
        });
      }
    },
    handleUploadFrom(e, fromSources) {
      const client = require("filestack-js").init("AOI3ejHzTcuVrrWTbhHeaz");
      const options = {
        fromSources: fromSources,
        accept: [
          "*.doc",
          "*.pdf",
          "*.docx",
          "*.txt",
          "*.png",
          "*.jpg",
          "*.jpeg"
        ],
        allowManualRetry: true,
        transformations: {
          crop: false
        },
        customText: {
          "Select Files to Upload": "Select Image to Upload"
        },
        onUploadDone: res => this.handleUploadDoneFromOthers(res)
      };
      client.picker(options).open();
    },
    pageCount(i, j) {
      let prevPagesCount = 0;
      for (let index = 0; index < j; index++) {
        prevPagesCount = prevPagesCount + this.allPdfData[index].pages;
      }
      return prevPagesCount + i;
    },
    handleVDRMouseUp() {
      this.moveFieldByDelta(this.deltaXToMove, this.deltaYToMove);
      this.deltaXToMove = 0;
      this.deltaYToMove = 0;
    },
    autoGrow(oField) {
      // if (oField.scrollHeight > oField.clientHeight) {
      //   oField.style.height = oField.scrollHeight + "px";
      // }
      console.log(">>> autoGrow() called, oField", oField);
      console.log(
        ">>> autoGrow() called, oField.srcElement.attributes.style",
        oField.srcElement.attributes.style
      );
      console.log(
        ">>> autoGrow() called, oField.scrollWidth, oField.clientWidth, oField.style.width",
        oField.scrollWidth,
        oField.clientWidth,
        oField.style.width
      );
      // if (oField.scrollWidth > oField.clientWidth) {
      //   oField.srcElement.attributes.style = "width: 200px;";
      // }
      // oField.style.width = oField.style.width + 10
      oField.srcElement.attributes.style = 'style="width: 200px;"';
    },
    moveFieldByDelta(deltaX, deltaY) {
      if (this.activatedItem && this.activatedItem.x && this.activatedItem.y) {
        this.activatedItem.x += deltaX;
        this.activatedItem.y += deltaY;
      }
    },
    handleVDRKeyDown(event) {
      if (
        document.activeElement &&
        (document.activeElement.tagName == "TEXTAREA" ||
          (document.activeElement.tagName == "INPUT" &&
            document.activeElement.getAttribute("type") !== "radio" &&
            document.activeElement.getAttribute("type") !== "checkbox"))
      ) {
        return;
      }
      if (this.activatedItem.x < 0) {
        this.activatedItem.x = 0;
      }
      if (this.activatedItem.y < 0) {
        this.activatedItem.y = 0;
      }
      switch (event.keyCode) {
        case 37:
          // arrow left
          this.activatedItem.x -= event.shiftKey
            ? this.posStepShift
            : this.posStep;
          this.showAlignLines(
            this.activatedItem.x,
            this.activatedItem.y,
            false
          );
          setTimeout(() => {
            this.hideAllAlignLines(false);
          }, 3000);
          event.preventDefault();
          break;
        case 38:
          // arrow up
          this.activatedItem.y -= event.shiftKey
            ? this.posStepShift
            : this.posStep;
          this.showAlignLines(
            this.activatedItem.x,
            this.activatedItem.y,
            false
          );
          setTimeout(() => {
            this.hideAllAlignLines(false);
          }, 3000);
          event.preventDefault();
          break;
        case 39:
          // arrow right
          this.activatedItem.x += event.shiftKey
            ? this.posStepShift
            : this.posStep;
          this.showAlignLines(
            this.activatedItem.x,
            this.activatedItem.y,
            false
          );
          setTimeout(() => {
            this.hideAllAlignLines(false);
          }, 3000);
          event.preventDefault();
          break;
        case 40:
          // arrow down
          this.activatedItem.y += event.shiftKey
            ? this.posStepShift
            : this.posStep;
          this.showAlignLines(
            this.activatedItem.x,
            this.activatedItem.y,
            false
          );
          setTimeout(() => {
            this.hideAllAlignLines(false);
          }, 3000);
          event.preventDefault();
          break;
      }
    },
    navigateToPageNo() {
      if (this.$refs.scrollbar && this.$refs.scrollbar.wrap) {
        console.log(
          "i 1 k ",
          this.currentActivatePage,
          this.currentActivateDoc
        );
        let scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.scrollTop = this.getSumOfPagesHeight(
          this.currentActivatePage,
          this.currentActivateDoc
        );
      }
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
          if (scrollbarEl.scrollTop <= page + index * 6) {
            return page;
          }
        });
        if (document.getElementById(`canvas_page_${pageNumber + 1}`)) {
          // document.getElementById(`canvas_page_${pageNumber+1}`).focus();
          this.currentActivatePage = pageNumber + 1;
        }
      };
    },
    getNearestFieldByX(x, y, isUsingDelta = true) {
      var deltaXForNearestField = isUsingDelta ? this.deltaXForNearestField : 1;
      var deltaX = 0;

      let pageBoundary = this.getPagesBoundaries(y);
      let pageStartY = pageBoundary.pageNumber * pageBoundary.pageHeight;
      let pageEndY = (pageBoundary.pageNumber + 1) * pageBoundary.pageHeight;

      var nearestX = -1;
      var yForNearestX = -1;
      var diffVal = deltaXForNearestField + 1;
      for (var i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        if (
          el.x == this.activatedItem.x &&
          el.y == this.activatedItem.y &&
          el.width == this.activatedItem.width &&
          el.height == this.activatedItem.height
        ) {
          continue;
        }
        if (el.y >= pageStartY && el.y <= pageEndY) {
          if (Math.abs(el.x - x) <= deltaXForNearestField) {
            if (Math.abs(el.x - x) < diffVal) {
              nearestX = el.x;
              yForNearestX = y >= el.y ? el.y : el.y + el.height;
              diffVal = Math.abs(el.x - x);
            }
          } else if (
            Math.abs(el.x + el.width / 2 - x) <= deltaXForNearestField
          ) {
            if (Math.abs(el.x + el.width / 2 - x) < diffVal) {
              nearestX = el.x + el.width / 2;
              yForNearestX = y >= el.y ? el.y : el.y + el.height;
              diffVal = Math.abs(el.x + el.width / 2 - x);
            }
          } else if (Math.abs(el.x + el.width - x) <= deltaXForNearestField) {
            if (Math.abs(el.x + el.width - x) < diffVal) {
              nearestX = el.x + el.width;
              yForNearestX = y >= el.y ? el.y : el.y + el.height;
              diffVal = Math.abs(el.x + el.width - x);
            }
          }
        }
      }

      deltaX = nearestX - x;
      return {
        x: nearestX,
        y: yForNearestX,
        deltaX
      };
    },
    getNearestFieldByY(x, y, isUsingDelta = true) {
      var deltaYForNearestField = isUsingDelta ? this.deltaYForNearestField : 1;
      var deltaY = 0;
      let pageBoundary = this.getPagesBoundaries(y);
      let pageStartY = pageBoundary.pageNumber * pageBoundary.pageHeight;
      let pageEndY = (pageBoundary.pageNumber + 1) * pageBoundary.pageHeight;

      var nearestY = -1;
      var xForNearestY = -1;
      var diffVal = deltaYForNearestField + 1;
      for (var i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        if (
          el.x == this.activatedItem.x &&
          el.y == this.activatedItem.y &&
          el.width == this.activatedItem.width &&
          el.height == this.activatedItem.height
        ) {
          continue;
        }
        if (el.y >= pageStartY && el.y <= pageEndY) {
          if (Math.abs(el.y - y) <= deltaYForNearestField) {
            if (Math.abs(el.y - y) < diffVal) {
              nearestY = el.y;
              xForNearestY = x >= el.x ? el.x : el.x + el.width;
              diffVal = Math.abs(el.y - y);
            }
          } else if (
            Math.abs(el.y + el.height / 2 - y) <= deltaYForNearestField
          ) {
            if (Math.abs(el.y + el.height / 2 - y) < diffVal) {
              nearestY = el.y + el.height / 2;
              xForNearestY = x >= el.x ? el.x : el.x + el.width;
              diffVal = Math.abs(el.y + el.height / 2 - y);
            }
          } else if (Math.abs(el.y + el.height - y) <= deltaYForNearestField) {
            if (Math.abs(el.y + el.height - y) < diffVal) {
              nearestY = el.y + el.height;
              xForNearestY = x >= el.x ? el.x : el.x + el.width;
              diffVal = Math.abs(el.y + el.height - y);
            }
          }
        }
      }

      deltaY = nearestY - y;
      return {
        x: xForNearestY,
        y: nearestY,
        deltaY
      };
    },
    showAlignLines(x, y, isUsingDelta = true) {
      this.deltaXToMove = 0;
      this.deltaYToMove = 0;
      // var rtn = true;
      // top line
      let rtnPos = this.getNearestFieldByY(x, y, isUsingDelta);
      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaYToMove = rtnPos.deltaY;
        var line = document.getElementById("top_line");
        line.style.display = "block";
        var x1 =
          this.activatedItem.x >= rtnPos.x
            ? this.activatedItem.x + this.activatedItem.width
            : this.activatedItem.x;
        var y1 = rtnPos.y;
        var x2 = rtnPos.x;
        var y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        // rtn = false;
      } else {
        this.hideElementById("top_line");
      }

      // middle line
      rtnPos = this.getNearestFieldByY(
        x,
        y + this.activatedItem.height / 2,
        isUsingDelta
      );

      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaYToMove = rtnPos.deltaY;
        line = document.getElementById("middle_horizontal_line");
        line.style.display = "block";
        x1 =
          this.activatedItem.x >= rtnPos.x
            ? this.activatedItem.x + this.activatedItem.width
            : this.activatedItem.x;
        y1 = rtnPos.y;
        x2 = rtnPos.x;
        y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        this.hideElementById("middle_horizontal_line");
      }

      // bottom line
      rtnPos = this.getNearestFieldByY(
        x,
        y + this.activatedItem.height,
        isUsingDelta
      );

      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaYToMove = rtnPos.deltaY;
        line = document.getElementById("bottom_line");
        line.style.display = "block";
        x1 =
          this.activatedItem.x >= rtnPos.x
            ? this.activatedItem.x + this.activatedItem.width
            : this.activatedItem.x;
        y1 = rtnPos.y;
        x2 = rtnPos.x;
        y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        this.hideElementById("bottom_line");
      }

      // left line
      rtnPos = this.getNearestFieldByX(x, y, isUsingDelta);
      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaXToMove = rtnPos.deltaX;
        line = document.getElementById("left_line");
        line.style.display = "block";
        x1 = rtnPos.x;
        y1 =
          this.activatedItem.y >= rtnPos.y
            ? this.activatedItem.y + this.activatedItem.height
            : this.activatedItem.y;
        x2 = rtnPos.x;
        y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        this.hideElementById("left_line");
      }

      // middle vertical line
      rtnPos = this.getNearestFieldByX(
        x + this.activatedItem.width / 2,
        y,
        isUsingDelta
      );
      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaXToMove = rtnPos.deltaX;
        line = document.getElementById("middle_vertical_line");
        line.style.display = "block";
        x1 = rtnPos.x;
        y1 =
          this.activatedItem.y >= rtnPos.y
            ? this.activatedItem.y + this.activatedItem.height
            : this.activatedItem.y;
        x2 = rtnPos.x;
        y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        this.hideElementById("middle_vertical_line");
      }

      // right line
      rtnPos = this.getNearestFieldByX(
        x + this.activatedItem.width,
        y,
        isUsingDelta
      );
      if (rtnPos.x >= 0 && rtnPos.y >= 0) {
        this.deltaXToMove = rtnPos.deltaX;
        line = document.getElementById("right_line");
        line.style.display = "block";
        x1 = rtnPos.x;
        y1 =
          this.activatedItem.y >= rtnPos.y
            ? this.activatedItem.y + this.activatedItem.height
            : this.activatedItem.y;
        x2 = rtnPos.x;
        y2 = rtnPos.y;
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        this.hideElementById("right_line");
      }
      // return rtn;
      return true;
    },
    chechFieldPosition(x, y) {
      let pageBoundary = this.getPagesBoundaries(y);

      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + this.activatedItem.width >
            pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return false;
      }
      document.querySelectorAll(".el-date-picker").forEach(el => {
        el.style.visibility = "hidden";
      });

      return this.showAlignLines(x, y);
    },
    chechFieldSizes(handle, x, y, width) {
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + width > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return false;
      }
    },
    checkForMergeOrUpload() {
      this.filechanged = true;
      if (this.isMergeDocument && this.files && this.files.length > 1) {
        this.mergeAllDocs();
      } else {
        this.uploadSingleFile();
      }
    },
    async uploadSingleFile() {
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
          companyId: companyId
        };
        await this.$store.dispatch("fileUpload/uploadFilesToConvertv4", params);
        if (this.getUploadFileDataStatus) {
          let tempUrl = [];
          this.getUploadFileDataStatus.forEach(file => {
            if (file.url.includes(appConfig.S3_BUCKET_URL)) {
              tempUrl.push(file.url.replace(appConfig.S3_BUCKET_URL, ""));
            } else {
              tempUrl.push(file.url);
            }
          });
          let fileNames = this.files.flatMap(e => e.name);
          let fileUploadUrls = tempUrl;
          this.updateConfigDocument(fileUploadUrls, fileNames);
        } else {
          this.logoError = "Error in uploading file. Please try again..";
        }
      } catch (err) {
        this.replaceDocumentLoading = false;
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
          companyId: companyId
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
          let fileUploadUrls = [tempUrl];
          let fileNames = [this.fieldsFormUpload.selectedFileName];
          this.updateConfigDocument(fileUploadUrls, fileNames);
        } else {
          this.logoError = "Error in uploading file. Please try again..";
        }
      } catch (err) {
        this.replaceDocumentLoading = false;
      }
    },
    resetReplaceFiles() {
      this.files = [];
      this.replaceDocumentModel = false;
      this.fieldsFormUpload.selectedFileName = "";
      this.fieldsFormUpload.title = "";
      this.fieldsFormUpload.selectedFile = "";
    },
    replaceDocumentMethod() {
      this.replaceDocumentModel = true;
    },
    checkToUploadDocument(file) {
      if (
        file.raw.type != "audio/mpeg" &&
        file.raw.type != "video/mp4" &&
        file.raw.type != "image/gif" &&
        file.raw.type != "text/html" &&
        file.raw.type != "text/css" &&
        file.raw.type != "text/javascript" &&
        file.raw.type != "application/json" &&
        file.raw.type != "" &&
        file.raw.type != "application/x-msdownload"
      ) {
        if (file.size < 25000000) {
          this.files.push(file);
        } else {
          this.$message.error("Large file. Maximum upload file size: 25 MB");
        }
      } else {
        this.$message("File format is not supported");
      }
    },
    async updateConfigDocument(files, names) {
      try {
        this.replaceDocumentLoading = true;
        let configurableDocumentData = this.prepareFields();
        if (names && names.length) {
          this.fieldsFormUpload.selectedFileName = names[0];
        }

        this.$set(configurableDocumentData, "document_upload_url", files[0]);
        this.$set(configurableDocumentData, "document_upload_urls", files);
        this.$set(configurableDocumentData, "document_names", names);
        this.$set(configurableDocumentData, "scale", 0);

        this.$set(
          configurableDocumentData,
          "name",
          this.fieldsFormUpload.selectedFileName
        );
        let params = {
          employee_document_id: this.$route.params.employee_document_id,
          company_document_id: this.$route.params.employee_document_id,
          configurable_document_data: configurableDocumentData,
          //name: this.fieldsFormUpload.selectedFileName,
          name: this.fieldsFormUpload.selectedFileName,
          title: this.fieldsFormUpload.selectedFileName
        };
        await this.$store.dispatch("documents/updateDraftDocument", params);
        if (this.getDraftDocumentUpdateStatus) {
          this.$notify({
            title: "Success",
            message: "Document replaced successfully",
            type: "success"
          });
          this.replaceDocumentLoading = false;
          window.location.reload();
        } else {
          this.$notify({
            title: "Error",
            message: "Error in replacing document",
            type: "error"
          });
          this.replaceDocumentLoading = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    moveDown(index) {
      if (index == this.files.length - 1) {
        return;
      }

      let sortedUsers = this.swapSingatureUsers(index, index + 1, this.files);
      this.files = [];
      this.files = sortedUsers;
    },
    moveUp(index) {
      if (index == 0) {
        return;
      }

      let sortedUsers = this.swapSingatureUsers(index, index - 1, this.files);
      this.files = [];
      this.files = sortedUsers;
    },
    swapSingatureUsers(fromIndex, toIndex, signaturedUsers) {
      let fromUser = signaturedUsers[fromIndex];
      let toUser = signaturedUsers[toIndex];
      signaturedUsers[fromIndex] = toUser;
      signaturedUsers[toIndex] = fromUser;

      return signaturedUsers;
    },
    async deleteItem(index) {
      this.files.splice(index, 1);
    },
    removeAttachment(index) {
      this.selectedItem.files.splice(index, 1);
    },
    uploadFile(file) {
      if (
        file.raw.type != "audio/mpeg" &&
        file.raw.type != "video/mp4" &&
        file.raw.type != "image/gif" &&
        file.raw.type != "text/html" &&
        file.raw.type != "text/css" &&
        file.raw.type != "text/javascript" &&
        file.raw.type != "application/json" &&
        file.raw.type != ""
      ) {
        if (file.size < 25000000) {
          this.attachFiles(file);
        } else {
          this.$message.error("Large file.Maximum upload file size : 25 MB!");
        }
      } else {
        this.$message.warning("File format is not supported");
      }
    },

    async attachFiles(file) {
      try {
        this.attachmentLoading = true;
        var formData = new FormData();
        formData.append("uploadedFiles", file.raw);

        let tempUrl = this.document_url_path.split("/");
        formData.append("doc_company_id", tempUrl[2]);
        await this.$store.dispatch("fileUpload/uploadFilesToConvert", formData);
        if (this.getUploadFileDataStatus) {
          this.selectedAttachmentFile.attachment_url = this.getUploadFileDataStatus.url;
          // this.selectedItem.title = file.raw.name;
          if (this.selectedItem.filled_by == "SENDER") {
            this.selectedItem.files.push({
              document_name: this.selectedAttachmentFile.document_name,
              attachment_url: this.selectedAttachmentFile.attachment_url,
              valid_from: this.selectedAttachmentFile.valid_from,
              document_number: this.selectedAttachmentFile.document_number,
              expires_on: this.selectedAttachmentFile.expires_on,
              title: file.raw.name,
              description: this.selectedAttachmentFile.description
            });
          }
          // else {
          //   this.selectedItem.sample_files.push({
          //     document_name: this.selectedAttachmentFile.document_name,
          //     attachment_url: this.selectedAttachmentFile.attachment_url,
          //     valid_from: this.selectedAttachmentFile.valid_from,
          //     document_number: this.selectedAttachmentFile.document_number,
          //     expires_on: this.selectedAttachmentFile.expires_on,
          //     title: file.raw.name,
          //     description: this.selectedAttachmentFile.description,
          //   });
          // }
          this.attachmentLoading = false;
          await this.resetSelectedAttachmentFile();
        }
      } catch (err) {
        console.log(err);
        this.attachmentLoading = false;
      }
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
    async getCurrentUserInitial() {
      await this.$store.dispatch("auth/fetchInitialSignature");
      if (this.getInitialUrl) {
        this.currentUserInitial = this.getInitialUrl;
      }
    },
    handleFieldDragStart() {
      document.querySelectorAll(".el-date-picker").forEach(el => {
        el.style.visibility = "visible";
      });
      return !this.isFieldEditting;
    },
    hideAllAlignLinesWithDelay() {
      let self = this;
      setTimeout(() => {
        self.hideElementById("top_line");
        self.hideElementById("middle_horizontal_line");
        self.hideElementById("bottom_line");
        self.hideElementById("left_line");
        self.hideElementById("middle_vertical_line");
        self.hideElementById("right_line");
        this.isFromFieldActivated = false;
      }, 700);
    },
    hideAllAlignLines(isUsingDelta = true) {
      if (this.isFromFieldActivated) {
        return;
      }
      this.hideElementById("top_line");
      this.hideElementById("middle_horizontal_line");
      this.hideElementById("bottom_line");
      this.hideElementById("left_line");
      this.hideElementById("middle_vertical_line");
      this.hideElementById("right_line");

      if (isUsingDelta) {
        this.handleVDRMouseUp();
      }
    },
    hideElementById(elId) {
      var line = document.getElementById(elId);
      line.style.display = "none";
    },
    handleTextAreaFocus() {
      this.isFieldEditting = true;
    },
    handleTextAreaBlur() {
      this.isFieldEditting = false;
    },
    ...mapActions({
      fetchDocumentSettings: "documents/fetchDocumentSettings"
    }),
    checkRequiredFiles() {
      if (
        this.selectedItem.requiredFiles > this.selectedItem.file_names.length
      ) {
        this.selectedItem.requiredFiles =
          this.selectedItem.file_names.length > 0
            ? this.selectedItem.file_names.length
            : 1;
      }
    },
    changeof(index) {
      let user = this.documentUsers.find(
        user => user.value == this.recipientSelection
      );
      if (user && user.color) {
        this.recipientSelectedColor = user.color;
      }
      document.getElementById(index).style.backgroundColor =
        this.recipientSelectedColor + "33";
      document.getElementById(
        index
      ).style.borderColor = this.recipientSelectedColor;
      document.getElementById(index).style.color = this.recipientSelectedColor;
    },
    changeout(index) {
      document.getElementById(index).style.backgroundColor = "#f9f9f9";
      document.getElementById(index).style.borderColor = "#f9f9f9";
      document.getElementById(index).style.color = "#616366";
    },
    changeRecipientColor() {
      let user = this.documentUsers.find(
        user => user.value == this.recipientSelection
      );
      if (user && user.color) {
        this.recipientSelectedColor = user.color;
      }
    },
    gotoViewDocument() {
      // let draftId = this.getDraftDocumentCreateData.data._id;
      this.$router.push({
        name: "employee-documents-custom-document",
        params: {
          employee_document_id: this.getDocumnetSentDocumnet._id
        }
      });
    },
    async closeSettingsAndSend() {
      this.docSettingsVisible = false;
      if (this.docSettingsVisibleAndSend) {
        this.sendDocument();
      }
    },
    visibleSettingsVisible() {
      if (!this.checkPermissions("documentSettings")) {
        this.$notify({
          title: "Error",
          message:
            "Permission denied for document settings. Please contact owner",
          type: "error"
        });
        this.docSettingsVisible = false;
        this.docSettingsVisibleAndSend = false;
      } else {
        this.docSettingsVisible = true;
        this.docSettingsVisibleAndSend = false;
      }
    },
    async saveDocumentAsTemplate() {
      console.log(this.getDocumnetSentDocumnet);
      if (this.getDocumnetSentDocumnet.configurable_document_id) {
        let params = {
          configurable_document_id: this.getDocumnetSentDocumnet
            .configurable_document_id,
          company_document_id: this.getDocumnetSentDocumnet.company_document_id,
          employee_document_id: this.getDocumnetSentDocumnet._id
        };
        await this.$store.dispatch("documents/saveAsTemplate", params);
        if (this.getDocumentSaveAsTemplate) {
          this.$notify({
            title: "Success",
            message: "Document is saved as template",
            type: "success"
          });
          this.$router.push({
            name: "Dashboard"
          });
        }
      }
    },
    resetImgData() {
      this.imgData = null;
      if (
        this.elements[this.selectedItemIndex].type == "SELECT" ||
        this.elements[this.selectedItemIndex].type == "MULTI_SELECT"
      ) {
        if (
          this.elements[this.selectedItemIndex] &&
          this.elements[this.selectedItemIndex].options &&
          !this.elements[this.selectedItemIndex].options.length
        ) {
          this.deleteElement();
        }
      }
      if (
        this.elements[this.selectedItemIndex] &&
        this.elements[this.selectedItemIndex].type == "my-signature"
      ) {
        if (
          this.elements[this.selectedItemIndex] &&
          !this.elements[this.selectedItemIndex].source
        ) {
          this.deleteElement();
        }
      }
      if (
        this.elements[this.selectedItemIndex] &&
        this.elements[this.selectedItemIndex].type == "MY_INITIAL"
      ) {
        if (
          this.elements[this.selectedItemIndex] &&
          !this.elements[this.selectedItemIndex].value
        ) {
          this.deleteElement();
        }
      }
      this.selectedItem.key = "";
      this.selectedItem.label = "";
      this.selectedItem.filled_by = "";
      this.selectedItem.placeholder = "";
      this.addItemDataDialogVisible = false;
      this.resetSelectedAttachmentFile();
    },
    handleCloseDialog() {
      this.$router.push({
        name: "Dashboard"
      });
    },
    fileError() {
      this.$alert("File Supported:JPG,PNG,JPEG,Gif");
    },
    uploadImageFile(file) {
      var self = this;
      setTimeout(() => {
        const doc = document.querySelector(".ankaCropper__previewArea");
        this.imgData = doc.querySelector("img").src;
      }, 1000);
      self.imgDataWidth = 0;
      self.imgDataHeight = 0;
      this.imgData = file;
      var img = document.createElement("img");
      console.log("image data", img);
      img.src = file;
      img.onload = function() {
        var w = img.width;
        var h = img.height;
        console.log("NEW IMAGE width", w);
        console.log("NEW IMAGE height: ", h);

        self.imgDataWidth = w / 2;
        self.imgDataHeight = h / 2;
        img.remove();
      };
    },
    // uploadImageFile(file) {
    //   var self = this;

    //   if (file["size"] < 2111775) {
    //     if (
    //       file.raw.type == "image/jpeg" ||
    //       file.raw.type == "image/png" ||
    //       file.raw.type == "image/jpg"
    //     ) {
    //       console.log(">>> uploadImageFile(), file", file);
    //       self.imgDataWidth = 0;
    //       self.imgDataHeight = 0;
    //       this.getBase64(file.raw).then((res) => {
    //         this.imgData = res;
    //         // get width, height of image
    //         var img = document.createElement("img");
    //         img.src = res;
    //         img.onload = function () {
    //           var w = img.width;
    //           var h = img.height;
    //           console.log("NEW IMAGE width", w);
    //           console.log("NEW IMAGE height: ", h);
    //           self.imgDataWidth = w;
    //           self.imgDataHeight = h;
    //           img.remove();
    //         };
    //       });
    //     } else {
    //       this.$alert("Please upload a image file");
    //     }
    //   } else {
    //     this.$alert("File size must not exceed 2MB");
    //   }
    // },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    async sendWithSubmit() {
      if (this.elements.length == 0) {
        this.$message.error("Please add fields to send document");
      } else if (this.documentName.length == 0) {
        this.$message.error("Please add document title");
      } else {
        let checkSign = await this.checkSignUser();
        if (checkSign) {
          let isAllUsersConfigured = true;
          this.documentUsers.forEach(user => {
            if (user && !user.email) {
              isAllUsersConfigured = false;
            }
          });
          if (isAllUsersConfigured) {
            this.documentSend(true);
          } else {
            this.submitEvent = true;
            this.addDocumentUsers = true;
          }
        }
      }
    },
    async getAllFontTypes() {
      await this.$store.dispatch("fileUpload/fetchFontTypes");
      if (this.getFontTypes) {
        this.fontTypes = this.getFontTypes.fontNames;
      }
    },
    getFontType(item) {
      let style = `font-family:${item}`;
      return style;
    },
    makeTextItalic() {
      console.log(">>> makeTextItalic, #1", this.activatedItem.font.style);
      if (this.activatedItem) {
        if (this.activatedItem.font.style == 2) {
          this.activatedItem.font.style = 0;
        } else if (this.activatedItem.font.style == 3) {
          this.activatedItem.font.style = 1;
        } else if (this.activatedItem.font.style == 1) {
          this.activatedItem.font.style = 3;
        } else {
          this.activatedItem.font.style = 2;
        }
      }
      console.log(">>> makeTextItalic, #2", this.activatedItem.font.style);
    },
    makeTextBold() {
      if (this.activatedItem) {
        if (this.activatedItem.font.style == 1) {
          this.activatedItem.font.style = 0;
        } else if (this.activatedItem.font.style == 3) {
          this.activatedItem.font.style = 2;
        } else if (this.activatedItem.font.style == 2) {
          this.activatedItem.font.style = 3;
        } else {
          this.activatedItem.font.style = 1;
        }
      }
    },
    getFieldClass(item) {
      let className = "each-element ";
      className += item.filled_by;
      return className;
    },
    getFilledUserColor(field) {
      let color = "";
      if (field.filled_by) {
        this.documentUsers.map(user => {
          if (user.value == field.filled_by && user.color) {
            color = user.color;
          }
        });
      }
      return color;
    },
    editReceipentUser(row, index) {
      this.selectedUser = { ...row };
      this.selectedUserIndex = index;
    },
    updateReceipentUser() {
      this.documentUsers = this.documentUsers.map((user, index) => {
        if (index == this.selectedUserIndex) {
          user.first_name = this.selectedUser.first_name;
          user.last_name = this.selectedUser.last_name;
          user.email = this.selectedUser.email;
          user.e_signature_required = this.selectedUser.e_signature_required;
        }
        return user;
      });
      this.selectedUserIndex = null;
      this.selectedUser = null;
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    addTableHeader(header) {
      this.tableLoading = true;
      header = header.trim();
      this.selectedItem.headers.push(header);
      this.selectedItem.latestHeader = "";
      if (this.selectedItem.data && this.selectedItem.data.length) {
        let data = [];
        this.selectedItem.data.map(item => {
          let rowHeader = {};
          this.selectedItem.headers.map(header => {
            rowHeader[header] = item[header] || "";
          });
          data.push(rowHeader);
        });
        this.selectedItem.data = data;
      }
      this.tableLoading = false;
    },
    addTableRow() {
      this.tableLoading = true;
      let row = {};
      this.selectedItem.headers.forEach(header => {
        row[header] = "";
      });
      this.selectedItem.data.push(row);
      this.tableLoading = false;
    },
    deleteTableRow(index) {
      this.tableLoading = true;
      this.selectedItem.data.splice(index, 1);
      this.tableLoading = false;
    },
    deleteTableColumn(header) {
      this.tableLoading = true;
      this.selectedItem.headers = this.selectedItem.headers.filter(
        headerItem => headerItem != header
      );
      this.selectedItem.data = this.selectedItem.data.map(item => {
        if (item[header]) {
          delete item[header];
        }
        return item;
      });
      this.tableLoading = false;
    },
    editTableColumn(index) {
      this.selectedHeader = this.selectedItem.headers[index];
      this.selectedHeaderIndex = index;
    },
    async updateTableColumn() {
      this.tableLoading = true;
      let prevHeader = this.selectedItem.headers[this.selectedHeaderIndex];
      await this.$nextTick(() => {
        this.$set(
          this.selectedItem.headers,
          this.selectedHeaderIndex,
          this.selectedHeader
        );
        this.selectedItem.data.map(item => {
          item[this.selectedHeader] = item[prevHeader];
          delete item[prevHeader];
        });
      });
      this.selectedItem.headers = [...this.selectedItem.headers];
      this.selectedHeader = "";
      this.selectedHeaderIndex = "";
      this.tableLoading = false;
    },
    async closeDocumentExpireDateSettings({ expirationSettings }) {
      this.showDocumentExpirationDatesSettings = false;

      if (expirationSettings) {
        this.expirationSettings = expirationSettings;
        await this.saveConfigurableDocument();
      }
    },
    openDocumentExpirationSettings(submit = false) {
      this.showDocumentExpirationDatesSettings = true;
      this.prepareFields();
      this.submitEvent = submit;
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
    getPositionSizeInPercentages({ x, y, height, width }) {
      const formBuilderRef = this.$refs.formBuilder;
      const formBuilderWidth = formBuilderRef.clientWidth;
      const formBuilderHeight = formBuilderRef.clientHeight;
      x = (x / formBuilderWidth) * 100;
      y = (y / formBuilderHeight) * 100;

      height = (height / formBuilderHeight) * 100;
      width = (width / formBuilderWidth) * 100;

      return {
        x,
        y,
        height,
        width
      };
    },
    setPrevElements() {
      if (
        this.getConfigurableDocumentData &&
        this.getConfigurableDocumentData.length
      ) {
        this.elements = JSON.parse(
          JSON.stringify(this.getConfigurableDocumentData)
        );
      } else {
        this.elements = [];
      }
    },

    setSizeAndPositionForElements(elements) {
      return elements.map(field => {
        field.x = this.calculateRelativeLeft(field.x);
        field.y = this.calculateRelativeTop(field.y);
        field.width = this.calculateRelativeWidth(field.width);
        field.height = this.calculateRelativeWidth(field.height);
        return field;
      });
    },

    // Drag & drop
    mouseDown() {
      this.isDragging = true;
    },
    mouseUp() {
      this.isDragging = false;
    },
    onDocumentDrag(evt) {
      if (evt.clientX == 0 && evt.clientY == 0) {
        return;
      }
      this.mouseX = evt.clientX;
      this.mouseY = evt.clientY;
    },
    onDocumentDragMobile(evt) {
      let touch =
        (evt.touches && evt.touches[0]) ||
        (evt.pointerType && evt.pointerType === "touch" && evt);
      let clientX = (touch || evt).clientX;
      let clientY = (touch || evt).clientY;
      if (clientX == 0 && clientY == 0) {
        return;
      }
      this.mouseX = clientX;
      this.mouseY = clientY;
    },
    onDraggableElementMouseDown(e) {
      var parent = e.target.parentNode;
      var rect = parent.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top; //y position within the element.
      this.deltaX = x;
      this.deltaY = y;
    },
    onDraggableElementMouseDownMobile(evt) {
      let touch =
        (evt.touches && evt.touches[0]) ||
        (evt.pointerType && evt.pointerType === "touch" && evt);
      let clientX = (touch || evt).clientX;
      let clientY = (touch || evt).clientY;

      var parent = evt.target.parentNode;
      var rect = parent.getBoundingClientRect();
      var x = clientX - rect.left; //x position within the element.
      var y = clientY - rect.top; //y position within the element.
      this.deltaX = x;
      this.deltaY = y;
    },
    createNewElement() {
      let offset = this.getElementYOffet("logoEle");
      this.elements.push({
        type: "logo",
        section: "display",
        label: "logo",
        height: 100,
        width: 100,
        field_type: "CUSTOM_FIELD",
        url: this.getCompanyProfileData.logo ? this.getLogoUrl : "",
        x: 20,
        y: offset
      });
    },
    addMyInitial() {
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        50;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - 100;
      }
      let indx = this.getLastIndexOfElement("MY_INITIAL");
      indx = indx + 1;
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      // let offset = this.getElementYOffet("myInitialEle");
      // console.log(">>> addMyInitial(), getInitialUrl", this.getInitialUrl);
      if (this.getInitialUrl) {
        this.elements.push({
          type: "MY_INITIAL",
          section: "display",
          label: "My Initial",
          height: 50,
          width: 100,
          field_type: "CUSTOM_FIELD",
          value: this.getInitialUrl || "",
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            50,
          text: "",
          color: "#000",
          font: "",
          index: indx,
          filled_by: "SENDER"
        });
      } else {
        let index = this.elements.length;
        this.elements.push({
          type: "MY_INITIAL",
          section: "display",
          label: "My Initial",
          height: 50,
          width: 100,
          field_type: "CUSTOM_FIELD",
          value: "",
          x:
            this.mouseX +
            this.$refs.formBuilder.scrollLeft -
            this.$refs.formBuilder.getBoundingClientRect().x -
            this.deltaX,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            50,
          text: "",
          color: "#000",
          font: "",
          index: indx,
          filled_by: "SENDER"
        });
        const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
        this.selectedItem = { ...{}, ...choosenElement };
        this.selectedItemIndex = index;
        this.addItemDataDialogVisible = true;
      }
      // } else {
      //   this.selectedSignatureItem = {
      //     ...{
      //       type: "MY_INITIAL",
      //       section: "display",
      //       label: "My Initial",
      //       style: "background:#b78686;",
      //       height: 30,
      //       width: 200,
      //       color: "red",
      //       source: "",
      //       x:
      //         this.mouseX +
      //         this.$refs.formBuilder.scrollLeft -
      //         this.$refs.formBuilder.getBoundingClientRect().x -
      //         this.deltaX,
      //       y:
      //         this.mouseY +
      //         this.$refs.formBuilder.scrollTop -
      //         this.$refs.formBuilder.getBoundingClientRect().y -
      //         this.deltaY +
      //         this.dragItemHeight -
      //         30,
      //       field_type: "CUSTOM_FIELD",
      //       filled_by: "SENDER",
      //     },
      //   };
      //   this.selectedSignatureItemIndex = this.elements.length;
      //   this.addMyInitialStatus = true;
      // }
    },
    getPlaceHolder(type, field) {
      let rtnPlaceHolder = "";
      if (type === "PRIMARY_FIELDS") {
        switch (field) {
          case "first_name":
            rtnPlaceHolder = "Enter First Name";
            break;
          case "last_name":
            rtnPlaceHolder = "Enter Last Name";
            break;
          case "full_name":
            rtnPlaceHolder = "Enter Full Name";
            break;
          case "title":
            rtnPlaceHolder = "Enter Title";
            break;
          case "phone":
            rtnPlaceHolder = "Enter Phone";
            break;
          case "email":
            rtnPlaceHolder = "Enter Email";
            break;
          case "address":
            rtnPlaceHolder = "Enter Address";
            break;
          case "company_name":
            rtnPlaceHolder = "Enter Company";
            break;
        }
      }
      return rtnPlaceHolder;
    },
    getTheLastMySignatureSize() {
      if (this.elements.length) {
        let size = {};
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex(x => x["type"] === "my-signature");
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          let lastItem = this.elements[finalIndex];
          size.width = lastItem.width;
          size.height = lastItem.height;
        } else {
          return null;
        }
        return size;
      }
      return null;
    },
    getSumOfPagesHeight(pageNo, docNo) {
      var sumOfHeights = 0;
      sumOfHeights = document.getElementById(`${docNo}_canvas_${pageNo}`);
      console.log("sumOfHeights", sumOfHeights, `${docNo}_canvas_${pageNo}`);
      if (sumOfHeights) {
        return sumOfHeights.offsetTop;
      }
      return 0;
    },
    getPagesBoundaries(y) {
      let pageBreaks = [];
      let h = 0;
      let maxLength = document.getElementById("wrapper").childNodes.length;
      for (let i = 0; i < maxLength; i++) {
        let innerChildLength = document.getElementById("wrapper").childNodes[i]
          .childNodes.length;
        for (let j = 0; j < innerChildLength; j++) {
          h =
            h +
            document.getElementById("wrapper").childNodes[i].childNodes[j]
              .height +
            6;
          pageBreaks.push({
            docId: i,
            pageId: j,
            height: h
          });
        }
      }
      let pageNumber = pageBreaks.find(page => {
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
        pageNumber: pageNumber.docId
      };
      return data;
    },
    getFieldVal(field, userType) {
      let documentUser = this.documentUsers.find(
        user => user.value == userType
      );
      if (
        documentUser &&
        documentUser.contact_id &&
        documentUser.contact_id._id
      ) {
        documentUser = documentUser.contact_id;
        documentUser["phone"] = documentUser.phone_number
          ? documentUser.phone_number
          : "";
      } else if (
        documentUser &&
        documentUser.user_id &&
        documentUser.user_id._id
      ) {
        documentUser = documentUser.user_id;
      }
      let fieldVal = "";
      if (field == "full_name") {
        fieldVal =
          documentUser && documentUser.first_name && documentUser.last_name
            ? documentUser.first_name + " " + documentUser.last_name
            : "";
      } else if (field === "company_name") {
        this.documentUsers.map(user => {
          if (user.value == userType) {
            fieldVal = user[field];
            if (user.type == "SENDER") {
              fieldVal =
                this.getCompanyDetails && this.getCompanyDetails.legal_name
                  ? this.getCompanyDetails.legal_name
                  : this.getCompanyDetails && this.getCompanyDetails.name
                  ? this.getCompanyDetails.name
                  : this.getAuthenticatedUser.company_name;
            } else {
              if (
                user.entity_data_id &&
                user.entity_data_id.entity_prime_data &&
                Object.keys(user.entity_data_id.entity_prime_data)[0]
              ) {
                fieldVal =
                  user.entity_data_id.entity_prime_data[
                    Object.keys(user.entity_data_id.entity_prime_data)[0]
                  ];
              } else {
                this.elements.map(el => {
                  this.getConfigurableDocumentDataById &&
                    this.getConfigurableDocumentDataById.document_users &&
                    this.getConfigurableDocumentDataById.document_users ? this.getConfigurableDocumentDataById.document_users : this.documentUsers.map(
                      val => {
                        if (
                          (el.filled_by == val.value ||
                            el.selected_user == val.value) &&
                          el.selected_tag == "company_name" &&
                          val.type != "SENDER"
                        ) {
                          el.content = val.company_name;
                          fieldVal = val.company_name;
                        }
                      }
                    );
                });
                fieldVal = fieldVal ? fieldVal : "";
              }
            }
          }
        });
      } else {
        fieldVal = documentUser && documentUser[field];
      }
      if (!fieldVal) {
        // console.log('>>> getFieldVal(), field, userType #3', field, userType);
        if (field === "company_name") {
          this.documentUsers.map(user => {
            if (user.value == userType) {
              if (user.user_id && user.user_id.company_name) {
                fieldVal = user.company_name ? user.company_name : user.user_id.company_name;
              }
            }
          });
        }
      }
      return fieldVal;
    },
    getLastIndexOfElement(type, subType = "") {
      if (subType === "") {
        let typeEle = this.elements.filter(element => element.type == type);
        if (typeEle && typeEle.length) {
          return typeEle[typeEle.length - 1] &&
            typeEle[typeEle.length - 1].index
            ? typeEle[typeEle.length - 1].index
            : 0;
        }
      } else {
        let typeEle = this.elements.filter(
          element => element.type == type && element.selected_tag == subType
        );
        if (typeEle && typeEle.length) {
          return typeEle[typeEle.length - 1] &&
            typeEle[typeEle.length - 1].index
            ? typeEle[typeEle.length - 1].index
            : 0;
        }
      }
      return 0;
    },
    addEntityField(item, isRepeatable) {
      if (item.inputType == "FORMULA") {
        let isCurrency = item.selected_fields.find(
          e => e.input_type == "CURRENCY"
        );
        let isCurrencyType =
          item.validations && item.validations.currency ? true : false;
        if (item.result_type) {
          item.inputType = item.result_type;
        } else if (isCurrency || isCurrencyType) {
          item.inputType = "CURRENCY";
        } else if (item.date_result_type) {
          item.inputType = "DATE";
        } else {
          item.inputType = "NUMBER";
        }
      }
      if (item.inputType == "PHONE_COUNTRY_CODE") {
        item.inputType = "SINGLE_LINE_TEXT";
      }
      if (item.inputType == "FILE") {
        item.inputType = "ATTACHMENT";
      }
      let exKey = "";
      let fieldsKey = this.recipientSelection;
      if (this.selectedRepeatableIndex == "newData" && isRepeatable) {
        let exElement = this.elements.find(
          el =>
            el &&
            el.indexKey &&
            el.addNewField &&
            el.template_id == item.template_id &&
            el.selected_user == this.recipientSelection &&
            this.selectedUserEntity &&
            el.entity_id == this.selectedUserEntity.id
        );
        if (exElement && exElement.indexKey) {
          exKey = exElement.indexKey;
        } else {
          exKey = (Math.random() + 1).toString(36).substring(7);
        }
      } else {
        exKey = this.selectedRepeatableIndex;
      }
      if (isRepeatable) {
        fieldsKey = fieldsKey + "-" + exKey;
      }
      let entityId =
        item.inputType == "ENTITY"
          ? item.entity_id
          : this.selectedUserEntity && this.selectedUserEntity.id
          ? this.selectedUserEntity.id
          : "";
      fieldsKey = fieldsKey + "-" + item.key + "#" + item.template_id;
      let indx = this.getLastIndexOfElement(item.inputType);
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000"
      };
      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }
      let fieldWidth = 150;
      let fieldHeight = font.size * 1.5;
      let sizeOfLast = this.getTheLastSize();
      if (sizeOfLast !== null) {
        fieldWidth = sizeOfLast.width;
      }
      if (item.inputType == "CHECKBOX") {
        fieldWidth = 30;
        fieldHeight = 30;
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex(x => x["type"] === "CHECKBOX");
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          fieldWidth = this.elements[finalIndex].width;
          fieldHeight = this.elements[finalIndex].height;
        }
      }
      if (item.inputType == "MULTI_LINE_TEXT") {
        fieldWidth = (300 * font.size) / 16;
        fieldHeight = 3 * font.size;
      }
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      let templateValue = this.setEntityDataToField(
        fieldsKey,
        item.template_id,
        isRepeatable ? this.selectedRepeatableIndex : null
      );
      let fieldObj = {
        type: item.inputType,
        section: "input",
        style: "background:#cbe2d8;",
        addNewField: this.selectedRepeatableIndex == "newData" ? true : false,
        height: item.inputType == "IMAGE" ? item.height : fieldHeight,
        width: item.inputType == "IMAGE" ? item.width : fieldWidth,
        value: templateValue
          ? item.input_type == "ENTITY" &&
            templateValue.includes("-") &&
            templateValue.split("-")[1]
            ? templateValue.split("-")[1]
            : templateValue
          : item.image_url
          ? item.image_url
          : item.content,
        template_field_id: item._id,
        template_id: item.template_id,
        indexKey: isRepeatable ? exKey : null,
        entity_id: entityId,
        options: item.options || [],
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        font: item.styles && item.styles.font ? item.styles.font : font,
        index: indx,
        key: fieldsKey,
        label: item.label ? item.label : item.inputType.toLowerCase() + indx,
        validations: item.validations,
        placeholder: item.placeholder || item.label,
        required:
          item.validations && item.validations.required
            ? item.validations.required
            : false,
        field_type: "ENTITY_FIELD",
        filled_by: this.recipientSelection || "SENDER_OR_RECEIVER",
        selected_user: this.recipientSelection || "SENDER_OR_RECEIVER"
      };
      if (item.input_type == "ENTITY_VARIABLE") {
        fieldObj.parent_entity_field_key =
          this.recipientSelection +
          "-" +
          item.relationship_key +
          "#" +
          item.template_id;
        fieldObj.parent_template_field = item.global_variable_entity_field;
      }
      if (item.input_type == "ENTITY" && templateValue) {
        fieldObj.entity_data_id = templateValue
          ? templateValue.includes("-") && templateValue.split("-")[0]
            ? templateValue.split("-")[0]
            : templateValue
          : "";
      }
      if (item.inputType == "ATTACHMENT") {
        fieldObj = {
          ...fieldObj,
          ...{
            files: [],
            sample_files: [],
            requiredFiles: 1,
            file_names: []
          }
        };
      }
      this.elements.push(fieldObj);
    },
    async addMySignature() {
      var fieldHeight = 36;
      var fieldWidth = 225;
      var lastElSize = this.getTheLastMySignatureSize();
      if (lastElSize) {
        // fieldWidth = lastElSize.width;
        fieldHeight = (fieldWidth * lastElSize.height) / lastElSize.width;
        console.log(">>> addMySignature(), lastElSize", lastElSize);
      } else if (this.getAuthenticatedUser.signature) {
        var dimensions = await this.getImageDimensions(
          this.getAuthenticatedUser.signature
        );
        fieldHeight = (fieldWidth * dimensions.h) / dimensions.w;
      }
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + 200 > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      let indx = this.getLastIndexOfElement("my-signature");
      indx = indx + 1;

      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      // let offset = this.getElementYOffet("mySignatureEle");
      if (this.getUserSignature && this.getUserSignature.signature) {
        this.elements.push({
          type: "my-signature",
          section: "display",
          label: "My signature",
          style: "background:#b78686;",
          height: fieldHeight,
          width: fieldWidth,
          color: "red",
          source: this.getUserSignature.signature,
          x: x,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight,
          field_type: "CUSTOM_FIELD",
          index: indx,
          filled_by: "SENDER"
        });
      } else if (
        this.getAuthenticatedUser &&
        this.getAuthenticatedUser.signature
      ) {
        console.log(
          ">>> addMySignature(), this.getAuthenticatedUser.signature",
          this.getAuthenticatedUser.signature
        );
        this.elements.push({
          type: "my-signature",
          section: "display",
          label: "My signature",
          style: "background:#b78686;",
          height: fieldHeight,
          width: fieldWidth,
          color: "red",
          source: this.getAuthenticatedUser.signature,
          x:
            this.mouseX +
            this.$refs.formBuilder.scrollLeft -
            this.$refs.formBuilder.getBoundingClientRect().x -
            this.deltaX,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight,
          field_type: "CUSTOM_FIELD",
          index: indx,
          filled_by: "SENDER"
        });
      } else {
        let index = this.elements.length;
        this.elements.push({
          type: "my-signature",
          section: "display",
          label: "My signature",
          style: "background:#b78686;",
          height: fieldHeight,
          width: fieldWidth,
          color: "red",
          source: "",
          x:
            this.mouseX +
            this.$refs.formBuilder.scrollLeft -
            this.$refs.formBuilder.getBoundingClientRect().x -
            this.deltaX,
          y:
            this.mouseY +
            this.$refs.formBuilder.scrollTop -
            this.$refs.formBuilder.getBoundingClientRect().y -
            this.deltaY +
            this.dragItemHeight -
            fieldHeight,
          field_type: "CUSTOM_FIELD",
          index: indx,
          filled_by: "SENDER"
        });
        const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
        this.selectedItem = { ...{}, ...choosenElement };
        this.selectedItemIndex = index;
        this.addItemDataDialogVisible = true;
      }
    },
    addHeading() {
      let indx = this.getLastIndexOfElement("HEADING");
      indx = indx + 1;
      // let offset = this.getElementYOffet("headingEle");
      let font = {
        name: "Helvetica",
        size: 32,
        style: 1,
        color: "#000000"
      };
      //calculating previous heading field
      if (this.elements.length) {
        const citrus = this.elements
          .slice()
          .reverse()
          .findIndex(x => x["type"] === "HEADING");
        let count = this.elements.length - 1;
        let finalIndex = citrus >= 0 ? count - citrus : citrus;
        if (finalIndex > -1) {
          let lastItem = this.elements[finalIndex];
          font.name = lastItem.font.name;
          font.color = lastItem.font.color;
        }
      }
      let fieldWidth = 175;
      let fieldHeight = 50;

      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }
      this.elements.push({
        type: "HEADING",
        section: "text",
        style: "background:#cbe2d8;",
        label: "Heading " + indx,
        placeholder: "Heading " + indx,
        height: fieldHeight,
        field_type: "CUSTOM_FIELD",
        selected_tag: "h1",
        content: "",
        font: font,
        width: fieldWidth,
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        index: indx
      });
    },
    addImage() {
      let indx = this.getLastIndexOfElement("IMAGE");
      indx = indx + 1;
      // let offset = this.getElementYOffet("mySignatureEle");
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        30;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + 100 > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - 100;
      }
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      this.elements.push({
        type: "IMAGE",
        section: "text",
        style: "background:#cbe2d8;",
        label: "Image " + indx,
        height: 30,
        field_type: "CUSTOM_FIELD",
        width: 100,
        required: true,
        value: "",
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          30,
        index: indx
      });
    },
    addParagraph() {
      let indx = this.getLastIndexOfElement("PARAGRAPH");
      indx = indx + 1;
      // let offset = this.getElementYOffet("paragraphEle");
      let font = {
        name: "Helvetica",
        size: 16,
        style: 0,
        color: "#000000"
      };

      let fontOfLast = this.getTheLastFont();
      if (fontOfLast !== null) {
        font = fontOfLast;
      }

      let fieldWidth = (120 * font.size) / 16;
      let fieldHeight = 1.5 * font.size;
      // if (this.elements.length) {
      //   const citrus = this.elements
      //     .slice()
      //     .reverse()
      //     .findIndex((x) => x["type"] === "PARAGRAPH");
      //   let count = this.elements.length - 1;
      //   let finalIndex = citrus >= 0 ? count - citrus : citrus;
      //   if (finalIndex > -1) {
      //     let lastItem = this.elements[finalIndex];
      //     font.name = lastItem.font.name;
      //     font.size = lastItem.font.size;
      //     font.style = lastItem.font.style;
      //     font.color = lastItem.font.color;
      //   }
      // }
      var x =
        this.mouseX +
        this.$refs.formBuilder.scrollLeft -
        this.$refs.formBuilder.getBoundingClientRect().x -
        this.deltaX;
      const y =
        this.mouseY +
        this.$refs.formBuilder.scrollTop -
        this.$refs.formBuilder.getBoundingClientRect().y -
        this.deltaY +
        this.dragItemHeight -
        fieldHeight;
      let pageBoundary = this.getPagesBoundaries(y);
      if (
        pageBoundary &&
        // pageBoundary.pageOffset &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          // x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
          x >= pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        return;
      }
      if (
        pageBoundary &&
        pageBoundary.pageWidth &&
        (x < pageBoundary.pageOffset ||
          x + fieldWidth > pageBoundary.pageOffset + pageBoundary.pageWidth)
      ) {
        x = pageBoundary.pageOffset + pageBoundary.pageWidth - fieldWidth;
      }
      // if (x > this.pageWidth - this.deltaXOfPageWidth) {
      //   return;
      // }

      this.elements.push({
        type: "PARAGRAPH",
        section: "text",
        style: "background:#cbe2d8;",
        label: "Paragraph " + indx,
        placeholder: "Paragraph " + indx,
        height: fieldHeight,
        font: font,
        field_type: "CUSTOM_FIELD",
        selected_tag: "p",
        content: "",
        width: fieldWidth,
        x: x,
        y:
          this.mouseY +
          this.$refs.formBuilder.scrollTop -
          this.$refs.formBuilder.getBoundingClientRect().y -
          this.deltaY +
          this.dragItemHeight -
          fieldHeight,
        index: indx
      });
    },

    addTable() {
      let indx = this.getLastIndexOfElement("TABLE");
      indx = indx + 1;
      let offset = this.getElementYOffet("tableEle");
      this.elements.push({
        type: "TABLE",
        section: "table",
        style: "background:#cbe2d8;",
        label: "Table " + indx,
        placeholder: "Table " + indx,
        height: 30,
        field_type: "CUSTOM_FIELD",
        width: 100,
        x: 20,
        y: offset,
        headers: [],
        data: [],
        index: indx
      });
    },

    setTemplateFields(templateId) {
      let selectedTemplate = this.getAllCompanyTemplatesData.data.find(
        template => template._id == templateId
      );

      this.selectedTemplateFields = selectedTemplate.sections[0].fields.filter(
        field => field.input_type == this.selectedItem.type
      );
    },

    setEntityFields(entityId) {
      let selectedEntity = this.getAllCompanyEntitiesData.data.find(
        entity => entity._id == entityId
      );
      this.selectedEntityFields = [];
      selectedEntity.sections.map(section => {
        if (section.fields && section.fields.length) {
          this.selectedEntityFields = [
            ...this.selectedEntityFields,
            ...section.fields
          ];
        }
        return;
      });
      this.selectedEntityFieldId = "";
    },

    setSeletedTemplateField(fieldId) {
      let seletedField = this.selectedTemplateFields.find(
        field => field._id == fieldId
      );

      this.$set(this.selectedItem, "template_field_label", seletedField.label);
      this.$set(this.selectedItem, "template_field_id", fieldId);
      this.$set(
        this.selectedItem,
        "template_field_filled_by",
        seletedField.filled_by
      );

      this.$set(this.selectedItem, "entity_id", "");
      this.$set(this.selectedItem, "entity_field_label", "");
      this.$set(this.selectedItem, "entity_field_id", "");
      this.$set(this.selectedItem, "entity_field_filled_by", "");
    },

    setSeletedEntityField(fieldId) {
      let seletedField = this.selectedEntityFields.find(
        field => field._id == fieldId
      );

      this.$set(this.selectedItem, "entity_field_label", seletedField.label);
      this.$set(this.selectedItem, "entity_field_id", fieldId);
      this.$set(
        this.selectedItem,
        "entity_field_filled_by",
        seletedField.filled_by
      );
      this.$set(this.selectedItem, "template_id", "");
      this.$set(this.selectedItem, "template_field_label", "");
      this.$set(this.selectedItem, "template_field_id", "");
      this.$set(this.selectedItem, "template_field_filled_by", "");
    },

    async fetchAllCompanyTemplates() {
      let params = {
        get_all: true
      };
      await this.$store.dispatch(
        "companyTemplates/getAllCompanyTemplates",
        params
      );
    },

    async fetchAllCompanyEntities() {
      let params = {
        get_all: true
      };
      await this.$store.dispatch(
        "companyEntities/getAllCompanyEntities",
        params
      );
    },

    onResize(x, y, width, height, item) {
      item.width = width;
      item.height = height;
      item.x = x;
      item.y = y;
      item.changed = true;
      // if (item.type == "PRIMARY_FIELDS") {
      //   if (item.content.length) {
      //     document.getElementById(
      //       item.type + "_" + item.content + "_" + item.index
      //     ).style.fontSize = item.height * 0.5333 + "px";
      //     item.font.size = item.height * 0.5333;
      //   }
      // }
    },
    onDrag(x, y, item) {
      item.x = x;
      item.y = y;
      item.changed = true;
    },

    onDelete(event) {
      console.log(">>> onDelete() called", event);
    },

    getElementYOffet(elementRef) {
      let elementOffsetY = 0;
      let pageOffsetPageY = 0;
      if (
        this.$refs[elementRef] &&
        this.$refs[elementRef].getBoundingClientRect()
      ) {
        elementOffsetY = this.$refs[elementRef].getBoundingClientRect().y;
        pageOffsetPageY = this.$refs.formBuilder.getBoundingClientRect().y;
      }
      let offset = elementOffsetY - pageOffsetPageY;

      return offset + this.$refs.formBuilder.scrollTop;
    },

    onActivated(item, index) {
      this.activatedItem = item;
      this.activatedItemIndex = index;
      this.showAlignLines(this.activatedItem.x, this.activatedItem.y, false);
      this.isFromFieldActivated = true;
      this.hideAllAlignLinesWithDelay();
    },
    onDeactivated() {
      this.activatedItem = {};
      this.activatedItemIndex = -1;
    },
    changePositionOfElementToDown() {
      if (this.activatedItem && this.activatedItemIndex > -1) {
        if (this.elements[this.activatedItemIndex].y < 1935) {
          this.elements[this.activatedItemIndex].y =
            this.elements[this.activatedItemIndex].y + 10;
        }
      }
    },
    changePositionOfElementToUpward() {
      if (this.activatedItem && this.activatedItemIndex > -1) {
        if (this.elements[this.activatedItemIndex].y > 10) {
          this.elements[this.activatedItemIndex].y =
            this.elements[this.activatedItemIndex].y - 10;
        }
      }
    },
    changePositionOfElementToRight() {
      if (this.activatedItem && this.activatedItemIndex > -1) {
        if (this.elements[this.activatedItemIndex].x < 695) {
          this.elements[this.activatedItemIndex].x =
            this.elements[this.activatedItemIndex].x + 10;
        }
      }
    },
    changePositionOfElementToLeft() {
      if (this.activatedItem && this.activatedItemIndex > -1) {
        if (this.elements[this.activatedItemIndex].x > 5) {
          this.elements[this.activatedItemIndex].x =
            this.elements[this.activatedItemIndex].x - 10;
        }
      }
    },

    // async fetchCompanyDetails() {
    //   await this.$store.dispatch("company/getCompany");
    // },
    async fetchCompanyDocument() {
      this.loading = true;
      this.documentId = this.$route.params.document_id;
      this.configurableDocumentId = this.$route.params.configurable_document_id;
      let params = {
        id: this.documentId,
        name: this.documentName,
        title: this.documentName
      };
      await this.$store.dispatch(
        "companyDocuments/fetchCompanyDocumentById",
        params
      );
      await this.$store.dispatch("configurableDocuments/clearErrors");
      if (this.configurableDocumentId) {
        await this.fetchDocumentData();
      } else {
        this.documentName = this.getCompanyDocumentDataById.title;
        this.backgroundImage = this.getBackgroundImage(
          this.getCompanyDocumentDataById.document_background ||
            this.getCompanyDocumentDataById.document_backgrounds[0]
        );

        this.backgroundImages = this.getCompanyDocumentDataById.document_backgrounds.map(
          e => {
            return this.getBackgroundImage(e);
          }
        );
      }
      this.loading = false;
    },
    setFormElements() {
      this.elements = this.setSizeAndPositionForElements(
        // JSON.parse(JSON.stringify(this.documentFormData.pages[0].fields))
        JSON.parse(JSON.stringify(this.pages[0].fields))
      );
    },

    checkElementIsBefore(type, user_type) {
      return this.elements.filter(element => {
        if (element.type == type && element.filled_by == user_type) {
          return true;
        }
      }).length
        ? true
        : false;
    },
    goBack() {
      if (this.is_SaveDocument == true) {
        this.$router.go(-1);
      } else {
        if (
          this.documentFormData &&
          this.documentFormData.pages &&
          this.documentFormData.pages.length &&
          this.documentFormData.pages[0].fields &&
          this.documentFormData.pages[0].fields.length != this.elements.length
        ) {
          this.dialogVisible = true;
        } else if (this.getSingleDocumentData.data.title != this.documentName) {
          this.dialogVisible = true;
          console.log("replace modified", this.filechanged);
        }
        // else if(!){
        //   this.dialogVisible = true;
        // }
        else {
          let diffrField = false;
          if (
            this.documentFormData &&
            this.documentFormData.pages &&
            this.documentFormData.pages.length &&
            this.documentFormData.pages[0].fields &&
            this.documentFormData.pages[0].fields
          ) {
            this.documentFormData.pages[0].fields.forEach(el => {
              this.elements.forEach(e => {
                if (
                  el &&
                  el.key &&
                  e &&
                  e.key &&
                  e.key == el.key &&
                  (e.chaned ||
                    el.changed ||
                    e.label != el.label ||
                    e.placeholder != el.placeholder ||
                    (e.content && el.content && e.content != el.content) ||
                    (e.value && el.vale && e.value != el.value) ||
                    (e.source && el.source && e.source != el.source) ||
                    (e.filled_by &&
                      el.filled_by &&
                      e.filled_by != el.filled_by) ||
                    (e.selectedUser &&
                      el.selectedUser &&
                      e.selectedUser != el.selectedUser))
                ) {
                  diffrField = true;
                }
              });
            });
          }
          if (diffrField) {
            this.dialogVisible = true;
          } else {
            this.dialogVisible = false;
            this.$router.go(-1);
          }
        }
      }
    },
    backToPrevious() {
      this.dialogVisible = false;
      this.$router.go(-1);
    },
    getHeadingStyles(item) {
      return `color:${item.font.color};font-family:${item.font.name}`;
    },
    getImageStyle(item) {
      let style = `width:${item.width}px;;height:${item.height}px;`;
      return style;
    },
    getFieldStyles(item, additionalStyle = "") {
      // console.log('>>> item', item);
      if (item.type == "SIGNATURE" || item.type == "CHECKBOX") {
        return;
      }
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
    getStyle(item) {
      let style = `position:absolute;left:${item.x}px;top:${item.y}px;height:${item.height}px;width:${item.width}px;`;
      return style;
    },
    openPopup(item, index) {
      if (item && item.type && item.type == "HORIZONTAL_LINE") {
        this.dialogFormVisible = true;
      } else {
        this.activatedItem = {};
        this.activatedItemIndex = -1;
        this.addItemDataDialogVisible = true;
        const choosenElement = JSON.parse(JSON.stringify(this.elements[index]));
        this.selectedItem = { ...{}, ...choosenElement };
        this.selectedItemIndex = index;
      }
    },
    deleteActiveElement() {
      // if (this.activatedItem && this.activatedItemIndex > -1) {
      //   this.elements.splice(this.activatedItemIndex, 1);
      // }
      if (this.activatedItem && this.activatedItemIndex > -1) {
        if (
          ((this.elements[this.activatedItemIndex] &&
            this.elements[this.activatedItemIndex]["type"] == "SIGNATURE") ||
            this.elements[this.activatedItemIndex]["type"] == "my-signature") &&
          this.elements[this.activatedItemIndex]["filled_by"] == "SENDER"
        ) {
          let selectedUserSignatures = this.elements.filter(
            el =>
              (el.type == "SIGNATURE" || el.type == "my-signature") &&
              el.filled_by == "SENDER"
          );
          if (selectedUserSignatures && selectedUserSignatures.length == 1) {
            // let dateSignedIndex = this.elements.findIndex(el => el.type == 'DATE_SIGNED' && el.filled_by == 'SENDER');
            // this.elements.splice(dateSignedIndex, 1);
            let dateSignedIndexs = [];
            this.elements.forEach((el, index) => {
              if (el.type == "DATE_SIGNED" && el.filled_by == "SENDER") {
                dateSignedIndexs.push(index);
              }
            });
            if (dateSignedIndexs.length) {
              dateSignedIndexs.forEach(el => this.elements.splice(el, 1));
            }
          }
        }
        if (
          this.elements[this.activatedItemIndex]["type"] == "SIGNATURE" &&
          this.elements[this.activatedItemIndex]["filled_by"] != "SENDER"
        ) {
          let selectedUserSignatures = this.elements.filter(
            el =>
              el.type == "SIGNATURE" &&
              el.filled_by ==
                this.elements[this.activatedItemIndex]["filled_by"]
          );
          if (selectedUserSignatures && selectedUserSignatures.length == 1) {
            // let dateSignedIndex = this.elements.filter(el => el.type == 'DATE_SIGNED' && el.filled_by == this.elements[this.selectedItemIndex]['filled_by']);
            let dateSignedIndexs = [];
            this.elements.forEach((el, index) => {
              if (
                el.type == "DATE_SIGNED" &&
                el.filled_by ==
                  this.elements[this.activatedItemIndex]["filled_by"]
              ) {
                dateSignedIndexs.push(index);
              }
            });
            if (dateSignedIndexs.length) {
              dateSignedIndexs.forEach(el => this.elements.splice(el, 1));
            }
          }
        }
        if (
          this.elements[this.activatedItemIndex] &&
          this.elements[this.activatedItemIndex]["type"] == "ENTITY" &&
          this.checkForChildrenWithActiveParent
        ) {
          this.$message({
            message:
              "Some fields are associated to this entity field. Can't delete.",
            type: "warning"
          });
          return;
        }
        if (
          this.elements[this.activatedItemIndex] &&
          this.elements[this.activatedItemIndex]["type"] ==
            "REPEATABLE_PARENT" &&
          this.checkForRepeatableChild
        ) {
          this.$message({
            message:
              "Some fields are associated to this repeatable field. Can't delete.",
            type: "warning"
          });
          return;
        }
        this.elements.splice(this.activatedItemIndex, 1);
      }
    },
    updateSignatureFilledBy() {
      this.selectedItem.filled_by = this.selectedItem.signature_field.filled_by;
      this.selectedItem.signature_field_key = this.selectedItem.signature_field.key;
    },

    checkFieldAllow(item) {
      return item.filled_by === "RECEIVER";
    },

    onPreview() {
      this.previewVisible = true;
    },

    async saveCapturedSignature() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        await this.$store.dispatch("auth/updateUserSignature", {
          signature: data
        });
        await this.$store.dispatch("auth/fetchUserSignature");
        this.selectedSignatureItem.source = data;

        this.elements[
          this.selectedSignatureItemIndex
        ] = this.selectedSignatureItem;
      }
      this.$refs.signaturePad.clearSignature();
      this.selectedSignatureItem = {};
      this.selectedSignatureItemIndex = -1;
      this.captureSignatureDialog = false;
      this.addMySignatureStatus = false;
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },

    captureSignature(item, index) {
      this.selectedSignatureItem = item;
      this.selectedSignatureItemIndex = index;
      this.captureSignatureDialog = true;
    },
    generateTextImage(text, color) {
      let url = "";
      textToImage
        .generate(text, {
          textColor: color,
          fontSize: 25,
          lineHeight: 35,
          fontFamily: "Dancing Script",
          maxWidth: 100
        })
        .then(dataUri => {
          this.selectedItem.value = dataUri;
        });
      return url;
    },
    getImageDimensions(file) {
      return new Promise(function(resolved) {
        var i = new Image();
        i.onload = function() {
          resolved({ w: i.width, h: i.height });
        };
        i.src = file;
      });
    },
    reloadForm() {
      this.refreshForm = true;
      setTimeout(() => {
        this.refreshForm = false;
      });
      this.$store.dispatch(
        "configurableDocuments/saveCurrentDocumentFields",
        this.elements
      );
    },
    validateForm() {
      this.errorElements = [];
      if (this.elements.length > 0) {
        this.errorElements = this.elements.filter(e => {
          return (
            !e.template_field_id &&
            !e.entity_field_id &&
            e.type !== "logo" &&
            e.type !== "FORMULA" &&
            e.type !== "my-signature" &&
            e.type !== "HEADING" &&
            e.type !== "PARAGRAPH" &&
            e.section !== "table" &&
            e.type != "MY_INITIAL" &&
            e.type != "PRIMARY_FIELDS" &&
            e.type != "IMAGE" &&
            (!e.label || e.label.length == 0 || !e.filled_by)
          );
        });

        if (this.errorElements.length) {
          this.fieldErrorMessage = "Please config below Fields";
          return false;
        } else {
          return true;
        }
      } else {
        this.fieldErrorMessage =
          "There was No fields. Please place some fields";
        return false;
      }
    },
    async updateForm(params) {
      try {
        await this.$store.dispatch(
          "configurableDocuments/updateConfigurableDocument",
          params
        );
        if (this.getConfigurableDocumentUpdateStatus) {
          this.$notify.success({
            title: "Success",
            message: "Form saved successfully"
          });

          // await this.fetchDocumentDetails();
          if (this.isShowPreview) {
            this.$router.push({
              name: "edit-configure-template-image-preview",
              params: this.$route.params
            });
          }

          if (this.sendDoucumentRedirection) {
            let checkSign = await this.checkSignUser();
            if (checkSign) {
              this.$router.push({
                name: "send-template-mail",
                params: { id: this.$route.params.configurable_document_id }
              });
            }
          }
        } else {
          this.sendDoucumentRedirection = false;
          this.isShowPreview = false;
          if (this.getConfigurableDocumentErrors) {
            this.showServerErrorsDialog = true;
          } else {
            this.$notify.error({
              title: "Error",
              message: "Error at saving form"
            });
          }
        }
      } catch (err) {
        this.isShowPreview = false;
        console.log(err);
      }
    },

    prepareFields() {
      let signUsers = this.elements
        .filter(element => element.type == "SIGNATURE")
        .flatMap(element => element.filled_by);
      let requiredUsers = this.elements.flatMap(el => el.filled_by);
      let users = this.documentUsers.map((user, index) => {
        user.e_signature_order = index;
        if (signUsers.indexOf(user.value) != -1) {
          user.e_signature_required = true;
        } else {
          user.is_cc = true;
          user.e_signature_required = false;
        }

        if (user.contact_type && user.contact_type._id) {
          user.contact_type = user.contact_type._id;
        }
        return user;
      });
      users.map(user => {
        if (requiredUsers.indexOf(user.value) != -1) {
          user.fields_required = true;
        } else {
          user.fields_required = false;
        }
      });
      // this.mapDocumentFields();
      let inOrderFields = this.getFieldsFromElements();
      inOrderFields.sort((a, b) => {
        return a.y - b.y;
      });
      let data = {
        name: this.documentName,
        type: "CUSTOM",
        configure_type: "DYNAMIC",
        company_document_id: this.getSingleDocumentData.data
          .company_document_id,
        background_images: this.backgroundImages,
        document_users: users,
        document_upload_url: this.document_url_path,
        document_upload_urls: this.document_url_paths,
        document_expiration_settings: this
          .getConfigurableDocumentExpirationSettigns,
        // document_expiration_settings: this.expirationSettings,
        // enforce_signature_order: this.enforceSignatureOrder || false,
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
            fields: inOrderFields,
            page_base_width: this.currentFormBuilderWidth,
            templates_used: Array.from(new Set(this.templatesUsed)),
            entities_used: Array.from(new Set(this.entitiesUsed))
          }
        ]
      };

      if (
        this.getConfigurableDocumentDataById &&
        this.getConfigurableDocumentDataById.description &&
        this.getConfigurableDocumentDataById.description.length
      ) {
        data.description = this.getConfigurableDocumentDataById.description;
      }

      return data;
    },
    getKeyForTemplateField(templateId, fieldId) {
      let selectedTemplate = this.getAllCompanyTemplatesData.data.find(
        template => template._id == templateId
      );

      let selectedTemplateField = selectedTemplate.sections[0].fields.find(
        field => field._id == fieldId
      );
      return (
        selectedTemplate.name.split(" ").join("") +
        "#" +
        selectedTemplateField.key
      );
    },
    getKeyForEntityField(entityId, fieldId) {
      let selectedEntity = this.getAllCompanyEntitiesData.data.find(
        entity => entity._id == entityId
      );

      let selectedEntityField = {};
      let fields = [];
      if (
        selectedEntity &&
        selectedEntity.sections &&
        selectedEntity.sections.length
      ) {
        selectedEntity.sections.map(section => {
          if (section.fields && section.fields.length) {
            fields = section.fields;
            for (let index = 0; index < fields.length; index++) {
              if (fields[index]._id == fieldId) {
                selectedEntityField = fields[index];
              }
            }
            return;
          }
        });
        return (
          selectedEntity.name.split(" ").join("") +
          "#" +
          selectedEntityField.key
        );
      } else {
        return "";
      }
    },
    openDocumentUserSettings() {
      this.saveUpdateData();
    },
    async closeDocumentUserSettings({ submit, elements }) {
      this.documentDataLoading = true;
      await this.$store.dispatch("documents/fetchDocumentUsers", {
        document_id: this.$route.params.employee_document_id
      });
      if (
        this.getEmployeeDocumentUsers &&
        this.getEmployeeDocumentUsers.document_users.length
      ) {
        this.documentUsers = [];
        this.documentUsers = [...this.getEmployeeDocumentUsers.document_users];
        // const entityData = this.documentUsers.filter(e => e.type != 'SENDER').flatMap(e => e.entity_data_id);
        this.documentUsers.forEach(user => {
          if (this.elements && this.elements.length) {
            this.elements.map(el => {
              if (
                el.type == "PRIMARY_FIELDS" &&
                el.selected_user &&
                user.value == el.selected_user
              ) {
                el.content = this.getFieldVal(
                  el.selected_tag,
                  el.selected_user
                );
              }
            });
          }
        });
      }
      // if (signaturesConfig && signaturesConfig.length) {
      //   this.signaturesConfig = signaturesConfig;
      // }
      if (elements) {
        this.elements = elements;
      }
      this.submitEvent = false;
      this.showDocumentUserSettings = false;
      this.addDocumentUsers = false;
      this.isAnyoneCanApprove = this.getEmployeeDocumentUsers.is_anyone_can_approve;
      this.enforceSignatureOrder = this.getEmployeeDocumentUsers.enforce_signature_order;
      if (this.saveAction == "previewTemplate") {
        this.isTemplateToSave = true;
        this.saveAction = "";
      }
      await Promise.all([
        await this.companyEntityDetails(),
        this.getEntityFields()
      ]);
      await this.setEntityData();
      if (submit) {
        this.documentSend(true);
      }
      this.documentDataLoading = false;
    },
    async setEntityData() {
      this.allTemplatesData = {};
      let params = {
        entity_data_ids: []
      };
      this.documentUsers.forEach(e => {
        if (e.entity_data_id) {
          if (e.entity_data_id._id) {
            params.entity_data_ids.push(e.entity_data_id._id);
          } else {
            params.entity_data_ids.push(e.entity_data_id);
          }
        }
      });
      await this.$store.commit("templatesData/setTemplatesData", [], {
        root: true
      });
      if (params.entity_data_ids && params.entity_data_ids.length) {
        await this.$store.dispatch(
          "templatesData/fetchUserTemplateData",
          params
        );
        await this.$store.dispatch("entities/fetchEntityDataByQuery", params);
      }
      this.setUsersEntityData();
    },
    setUsersEntityData() {
      this.documentUsers.forEach(user => {
        if (this.getTemplatesData && this.getTemplatesData.length) {
          const seletedUserTemplateData = this.getTemplatesData.filter(
            e =>
              (user.entity_data_id &&
                user.entity_data_id._id &&
                e.entity_data_id == user.entity_data_id._id) ||
              e.entity_data_id == user.entity_data_id
          );
          seletedUserTemplateData.forEach(e => {
            this.allTemplatesData[user.value + "-" + e.template_id] =
              e.template_data;
          });
        }
        this.elements.map(el => {
          if (
            el.template_id &&
            el.field_type == "ENTITY_FIELD" &&
            el.selected_user == user.value &&
            this.allTemplatesData
          ) {
            if (el.type == "REPEATABLE_PARENT") {
              let value = this.setRepeatableUserDataToField(
                el.selected_user,
                el.template_id
              );
              if (value) {
                el.repeatable_data = value;
              } else {
                el.repeatable_data = [];
              }
              bus.$emit("repeatable-data-selected", {
                key: el.key,
                repeatableData: value
              });
            } else {
              let isNonConfigureField =
                el.indexKey && el.indexKey.includes(":") ? true : false;
              if (el && el.template_id && el.indexKey && isNonConfigureField) {
                let tempData = this.allTemplatesData[
                  el.selected_user + "-" + el.template_id
                ];
                if (
                  tempData &&
                  Object.keys(tempData) &&
                  Object.keys(tempData)[0]
                ) {
                  const repeatable = tempData[Object.keys(tempData)[0]];
                  if (repeatable && repeatable.length) {
                    let i = el.indexKey.split(":")[1]
                      ? el.indexKey.split(":")[1] - 1
                      : 0;
                    el.indexKey =
                      repeatable[i] && repeatable[i].indexKey
                        ? repeatable[i].indexKey
                        : el.indexKey;
                    let flKey = el.key.split("-")[2];
                    el.key =
                      repeatable[i] && repeatable[i].indexKey
                        ? el.selected_user +
                          "-" +
                          repeatable[i].indexKey +
                          "-" +
                          flKey
                        : el.key;
                  }
                }
              }
              let value = this.setEntityDataToField(
                el.key,
                el.template_id,
                el.indexKey
              );
              if (value) {
                if (el.type == "ENTITY") {
                  this.$set(
                    el,
                    "entity_data_id",
                    value
                      ? typeof value == "string" &&
                        value.includes("-") &&
                        value.split("-")[0]
                        ? value.split("-")[0]
                        : value
                      : ""
                  );
                  bus.$emit("entityDataId-selected", {
                    entityDataId: value
                      ? typeof value == "string" &&
                        el.type == "ENTITY" &&
                        value.includes("-") &&
                        value.split("-")[0]
                        ? value.split("-")[0]
                        : value
                      : "",
                    form: el
                  });
                }
                console.log("value -->", value);
                el.value = value
                  ? el.type == "ENTITY" &&
                    value.includes("-") &&
                    value.split("-")[1]
                    ? value.split("-")[1]
                    : value
                  : "";
              } else {
                if (el.type == "ENTITY") {
                  this.$set(el, "entity_data_id", "");
                  bus.$emit("entityDataId-selected", {
                    entityDataId: "",
                    form: el,
                    reset: true
                  });
                }
                el.value = "";
              }
            }
            if (!el.font) {
              el.font = {
                name: "Helvetica",
                size: 16,
                style: 0,
                color: "#000000"
              };
            }
          }
        });
      });
      this.getRecipientSelection();
      this.updateUserEntityFieldsRelations(this.documentUsers);
    },
    setEntityDataToField(rawKey, template_id, indexKey) {
      let dataValues = this.allTemplatesData[
        rawKey.split("-")[0] + "-" + template_id
      ];
      if (dataValues) {
        if (indexKey && Object.keys(dataValues)[0]) {
          dataValues = this.setRepeatableDataStucture(dataValues, "data");
          let key = rawKey.split("-")[2];
          if (key.includes("#")) {
            key = key.split("#")[0];
          }
          let innerData = dataValues[Object.keys(dataValues)[0]];
          if (innerData && innerData.length) {
            let selectedInnerData = innerData.find(
              e => e && e.indexKey == indexKey
            );
            if (selectedInnerData && selectedInnerData[key]) {
              return (
                selectedInnerData[key] +
                "" +
                (selectedInnerData[key + "/name"]
                  ? "-" + selectedInnerData[key + "/name"]
                  : "")
              );
            } else {
              return "";
            }
          }
          return "";
        } else {
          let key = rawKey.split("-")[1];
          if (key.includes("#")) {
            key = key.split("#")[0];
          }
          return dataValues[key];
        }
      } else {
        return "";
      }
    },
    checkSignUser() {
      let userCount = 0;
      let signUsers = [];
      // let senderSign = [];
      let senderAttachments = true;
      this.elements.forEach(e => {
        if (
          e.type == "ATTACHMENT" &&
          e.filled_by == "SENDER" &&
          e.required &&
          e.files &&
          e.files.length < e.requiredFiles
        ) {
          senderAttachments = false;
        }
      });
      signUsers = this.elements
        // .filter((element) => element.type == "SIGNATURE")
        .flatMap(element => element.filled_by);
      // senderSign = this.elements.filter(
      //   (element) => element.type == "my-signature"
      // );
      userCount = this.documentUsers
        .filter(user => {
          if (
            user.user_type == "SIGNER" &&
            user.type != "SENDER" &&
            signUsers.indexOf(user.value) == -1
          ) {
            return user;
          }
          // else if (user.type == "SENDER" && user.user_type == "SIGNER") {
          //   if (!senderSign.length) {
          //     if (signUsers.indexOf(user.value) == -1) {
          //       return user;
          //     }
          //   }
          // }
        })
        .flatMap(e => this.names.push(e.first_name + "-" + e.name));
      if (userCount.length) {
        this.fieldErrorMessage = `${userCount.join(",")} `;
        this.showSignErrorElementDialog = true;
        return false;
      } else if (!senderAttachments) {
        this.fieldErrorMessage =
          "Please upload required documents for attachments";
        this.showErrorElementDialog = true;
        return false;
      }
      return userCount.length ? false : true;
    },
    prepareDocumentData() {
      let data = {};
      this.elements.forEach(element => {
        if (element.content) {
          data[element.key] = element.content;
        } else if (element.value) {
          data[element.key] = element.value;
        } else if (element.source) {
          data[element.key] = element.source;
        } else if (element.files && element.files.length) {
          data[element.key] = element.files;
        } else {
          data[element.key] = "";
        }
      });
      return data;
    },
    deleteRow(index) {
      this.documentUsers.splice(index, 1);
    },
    // docuement methods
    async fetchEmployeDocumentData() {
      this.loading = true;
      await this.$store.dispatch("documents/fetchDocumentDataById", {
        document_id: this.employeeDocumentId
      });
      if (this.getSingleDocumentData && this.getSingleDocumentData.data) {
        if (
          this.getAuthenticatedUser &&
          this.getAuthenticatedUser.email &&
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.document_users
        ) {
          const documentuser = this.getSingleDocumentData.data.document_users.find(
            user => user && user.email == this.getAuthenticatedUser.email
          );
          if (documentuser && documentuser.email) {
            if (documentuser.type == "SENDER") {
              this.is_forbidden_doc = false;
            } else {
              this.loading = false;
              this.is_forbidden_doc = true;
              return;
            }
          } else {
            if (
              this.getActiveWorkspace &&
              this.getActiveWorkspace.company_id ==
                this.getSingleDocumentData.data.company_id
            ) {
              this.is_forbidden_doc = false;
            } else {
              this.loading = false;
              this.is_forbidden_doc = true;
              return;
            }
          }
        } else {
          if (
            this.getDocumentSendErrors &&
            this.getDocumentSendErrors.critical_error
          ) {
            this.loading = false;
            this.is_forbidden_doc = true;
            return;
          }
        }
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
                  .document_upload_url
              ];
        this.total_documents = this.document_url_paths.length;
        let tempUrl =
          this.getSingleDocumentData.data.configurable_document_data
            .document_upload_url ||
          this.getConfigurableDocumentDataById.document_upload_url ||
          this.getSingleDocumentData.data.company_document_data
            .document_upload_url;
        this.scale =
          this.getSingleDocumentData &&
          this.getSingleDocumentData.data &&
          this.getSingleDocumentData.data.configurable_document_data &&
          this.getSingleDocumentData.data.configurable_document_data.scale
            ? this.getSingleDocumentData.data.configurable_document_data.scale
            : 0;
        let urlSliptArray = tempUrl.split("/");
        if (urlSliptArray[1] != process.env.VUE_APP_APP_TYPE) {
          this.document_url_path = `/${process.env.VUE_APP_APP_TYPE}${tempUrl}`;
        } else {
          this.document_url_path = tempUrl;
        }

        await this.renderAllDocuments(true);
        await this.setData();
        this.canRename = !this.checkPermissions("renameDocument");
      } else {
        this.loading = false;
        this.is_forbidden_doc = true;
      }
    },
    async getEntityFields() {
      try {
        const selectedContactTypes = this.documentUsers
          .filter(e => e.type != "SENDER")
          .flatMap(e => e.contact_type);
        if (
          this.getCompanyEntityDetails &&
          this.getCompanyEntityDetails.entity_details &&
          this.getCompanyEntityDetails.entity_details[0] &&
          this.getCompanyEntityDetails.entity_details[0]._id
        ) {
          selectedContactTypes.push(
            this.getCompanyEntityDetails.entity_details[0]._id
          );
        }
        if (selectedContactTypes) {
          let params = {
            ids: selectedContactTypes
          };
          await this.$store.dispatch("entities/fetchEntitiesByQuery", params);
          if (this.getEntityDataByQuery) {
            this.allUsersEntityData = [];
            const enitityData = this.getEntityDataByQuery;
            for (let i = 0; i < enitityData.length; i++) {
              let data = {};
              data.name = enitityData[i].name;
              data.id = enitityData[i]._id;
              data.templates = [];
              enitityData[i].templates.forEach(temp => {
                if (
                  temp.template_id &&
                  temp.template_id.type != "STANDARD" &&
                  temp.template_id.slug != "contactdetails"
                ) {
                  let fields = this.getTemplateFields(temp.template_id);
                  fields = fields.filter(e => e.inputType !== "QUESTION");
                  data.templates.push({
                    name: temp.template_id.name,
                    fields: fields,
                    is_repeatable: temp.is_repeatable,
                    template_id: temp.template_id._id,
                    max_value: temp.max_records,
                    primary_field: temp.template_id.primary_fields[0]
                      ? temp.template_id.primary_fields[0]
                      : null
                  });
                }
              });
              this.allUsersEntityData.push(data);
            }
            let value = this.recipientSelection
              ? this.recipientSelection
              : "SENDER";
            if (value == "SENDER") {
              if (this.getCompanyDetails && this.getCompanyDetails._id) {
                this.selectedUserEntity = this.allUsersEntityData.find(
                  e => e.name == this.getCompanyDetails._id
                );
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    //render all documents
    async renderAllDocuments(isNew) {
      // this.documentDataLoading = true;
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
        await this.setPdfData(url, i, isNew);
      }
      // this.document_url_paths.forEach(async (doc, i) => {
      //   // await this.getWidthandHeight(url, document.getElementById("wrapper"));
      // });
    },
    async setPdfData(url, id, flag) {
      const self = this;
      let i = id;
      let isNew = flag;
      let random = (Math.random() + 1).toString(36).substring(7);
      url += `?view=${random}`;
      const res = await fetch(url);
      let existingPdfBytes = await res.arrayBuffer();
      const base64String = await atob(this.base64ArrayBuffer(existingPdfBytes));
      // try {
      //   const pdfDocData = await PDFDocument.load(existingPdfBytes, {
      //     ignoreEncryption: true,
      //   });
      //   pdfjsLib.getDocument({ data: base64String }).then(setFieldsData);
      //   const pdfBytes = await pdfDocData.save();
      //   const modifiedBase64String = await atob(
      //     this.base64ArrayBuffer(pdfBytes)
      //   );
      //   await pdfjsLib
      //     .getDocument({ data: modifiedBase64String })
      //     .then(setPDfData);
      // } catch (e) {
      await pdfjsLib
        .getDocument({ data: base64String })
        .then(setFieldsData)
        .then(setPDfData);
      // }

      function setFieldsData(pdfDoc) {
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          pdfDoc.getPage(i).then(getPageInfo);
        }
        return pdfDoc;
      }
      async function getPageInfo(page) {
        const tokenizedText = await page.getTextContent();
        // self.allPdfTextStyle[page.pageNumber] = tokenizedText.styles;
        let textStyles = {};
        textStyles[page.pageNumber] = tokenizedText.styles;
        self.allPdfTextStyle[i] = {
          ...self.allPdfTextStyle[i],
          ...textStyles
        };
        let textBox = {};
        textBox[page.pageNumber] = {
          docId: i,
          pageId: page.pageNumber,
          fields: tokenizedText.items.filter(
            u =>
              u.str &&
              u.str.trim() &&
              u.str.trim().length &&
              typeof u.str == "string"
          )
        };
        self.allPdfText[i] = {
          ...self.allPdfText[i],
          ...textBox
        };
        // const pageText = tokenizedText.items.map(token => token.str).join("");
        console.log("tokenizedText", tokenizedText);
      }
      async function setPDfData(pdfDoc) {
        self.allPdfData.push({
          pdfDoc: pdfDoc,
          pages: pdfDoc.numPages,
          order: i
        });
        if (self.total_documents == i + 1) {
          self.allPdfData = self.allPdfData.sort((a, b) => a.order - b.order);
          await self.document_url_paths.forEach(async (doc, index) => {
            await self.renderPreviewPages(index, isNew);
          });
        }
      }
    },
    base64ArrayBuffer(arrayBuffer) {
      var base64 = "";
      var encodings =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

      var bytes = new Uint8Array(arrayBuffer);
      var byteLength = bytes.byteLength;
      var byteRemainder = byteLength % 3;
      var mainLength = byteLength - byteRemainder;

      var a, b, c, d;
      var chunk;

      // Main loop deals with bytes in chunks of 3
      for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
        d = chunk & 63; // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
      }

      // Deal with the remaining bytes and padding
      if (byteRemainder == 1) {
        chunk = bytes[mainLength];

        a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4; // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + "==";
      } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

        a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2; // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + "=";
      }

      return base64;
    },
    //updating fields positions when deleting the page
    updateFieldPositionsDelete() {
      let i = this.currentSelectedPageIndex;
      let j = this.currentSelectedDocIndex;
      let removePage = document.getElementById(`${j}_canvas_${i}`);
      let removePageHeight = removePage.height;
      let newElements = this.elements.filter(el => {
        let pageBoundary = this.getPagesBoundaries(el.y);
        if (pageBoundary.pageNumber != j) {
          return el;
        } else if (
          pageBoundary.pageNumber == j &&
          pageBoundary.data.pageId + 1 != i
        ) {
          return el;
        }
      });
      this.elements = [];
      newElements.forEach(el => this.elements.push(el));
      this.elements.map(el => {
        let pageBoundary = this.getPagesBoundaries(el.y);
        if (pageBoundary.pageNumber > j) {
          el.y = el.y - (removePageHeight + 8);
        } else if (
          pageBoundary.pageNumber == j &&
          pageBoundary.data.pageId + 1 > i
        ) {
          el.y = el.y - (removePageHeight + 8);
        }
      });
      this.resetEditFlags();
    },
    //deleting page
    async deletePage(i, j) {
      this.$confirm("Are you sure to delete this page ? ", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async () => {
        // this.updateFieldPositionsDelete(i);
        this.deleted_pages.push(i);
        let params = {};
        params.keepFileID = true;
        params.pdfSignatures = [];
        params.defaultScale = 1;
        params.pdfTexts = [];
        params.pdfImages = [];
        params.pdfDeletePages = this.deleted_pages;
        params.pdfRotatePages = [];
        params.pdfRecs = [];
        params.addDocId = false;
        params.addPageNumber = false;
        this.documentDataLoading = true;
        this.currentSelectedPageIndex = i;
        this.currentSelectedDocIndex = j;
        this.updateFieldPositionsDelete();
        // params.pdfContent = this.document_url_path
        //   .slice(23, this.document_url_path.length)
        //   .split(".pdf")[0];

        let tempUrl = this.document_url_paths[j].split("/");
        // let id = tempUrl[tempUrl.length - 1].split(".")[0];
        params.pdfContent =
          this.basePdfdownloadUrl + this.document_url_paths[j];
        params["company_id"] = process.env.VUE_APP_APP_TYPE + "/" + tempUrl[2];
        await this.$store.dispatch("fileUpload/fileTheUploadv4", params);
        this.currentSelectedPageIndex = i;
        this.currentSelectedDocIndex = j;
        this.isEditingDocument = true;
        this.isDeletingPage = true;
        this.deleted_pages = [];
        this.rotations = [];
        this.allPdfData = [];
        // let url = this.basePdfdownloadUrl + this.document_url_path;
        // await this.renderPreviewPages(
        //   url,
        //   document.getElementById("page-wrapper")
        // );
        this.isInitialRender = true;
        await this.renderAllDocuments(false);
      });
    },
    //getting affected fields
    getAffectedFieldsAdd() {
      let i = this.currentSelectedPageIndex;
      let j = this.currentSelectedDocIndex;
      this.affectedFields = [];
      this.elements.forEach((el, index) => {
        let pageBoundary = this.getPagesBoundaries(el.y);
        if (pageBoundary.pageNumber > j) {
          this.affectedFields.push(index);
        } else if (
          pageBoundary.pageNumber == j &&
          pageBoundary.data.pageId + 1 >= i
        ) {
          this.affectedFields.push(index);
        }
      });
    },
    //updating positions after page add
    updateFieldPositions() {
      let i = this.currentSelectedPageIndex;
      let j = this.currentSelectedDocIndex;
      if (
        this.currentSelectedPageIndex > -1 &&
        this.currentSelectedDocIndex > -1
      ) {
        this.currentActivatePage = i;
        this.currentActivateDoc = j;
        this.navigateToPageNo();
      } else {
        this.currentActivateDoc = this.getAllPdfData.length - 1;
        this.currentActivatePage = this.getAllPdfData[
          this.getAllPdfData.length - 1
        ]["pages"];
        this.navigateToPageNo();
      }
      let fields = [];
      this.elements.forEach(e => fields.push(e));
      this.elements = [];
      setTimeout(() => {
        this.elements = fields.map((el, index) => {
          if (this.affectedFields.indexOf(index) != -1) {
            let height = document.getElementById(`${j}_canvas_${i}`).height;
            el.y = el.y + height + 6;
          }
          return el;
        });
      }, 500);
      this.documentDataLoading = false;
      this.resetEditFlags();
    },
    //saving edited pdf
    async editAndSaveDocument() {
      let params = {};
      let newRotations = [];
      this.rotations.forEach(el => {
        const data = (({ page, rotate }) => ({ page, rotate }))(el);
        newRotations.push(data);
      });
      params.keepFileID = true;
      params.pdfSignatures = [];
      params.defaultScale = 1;
      params.pdfTexts = [];
      params.pdfImages = [];
      params.pdfDeletePages = [];
      params.pdfRotatePages = newRotations;
      // params.pdfContent = this.document_url_path
      //   .slice(23, this.document_url_path.length)
      //   .split(".pdf")[0];
      let tempUrl = this.document_url_path.split("/");
      let id = tempUrl[tempUrl.length - 1].split(".")[0];
      params.pdfContent = id;
      params["doc_company_id"] = tempUrl[2];
      await this.$store.dispatch("fileUpload/fileTheUpload", params);
      params.pdfDeletePages = this.deleted_pages;
      params.pdfRotatePages = [];
      await this.$store.dispatch("fileUpload/fileTheUpload", params);
      this.rotations = [];
      this.deleted_pages = [];
      let url = this.basePdfdownloadUrl + this.document_url_path;
      await this.renderPreviewPages(
        url,
        document.getElementById("page-wrapper")
      );
      this.isInitialRender = true;
      // if (this.getUploadStatus.responseCode == 0) {
      //   await this.saveTemplate();
      // }
    },
    //focus page
    focusDocPage(i) {
      let id = `canvas_${i}`;
      document.getElementById(id).focus();
      console.log(">>> focusDocPage(), id", id);
    },
    async rotateLeft(i, j) {
      // let id = `${j}_canvas_${i}`;
      // document.getElementById(id).focus();
      this.currentSelectedPageIndex = i;
      this.currentSelectedDocIndex = j;
      this.documentDataLoading = true;
      this.isLeftRotate = true;
      this.isEditingDocument = true;
      let rotations = this.rotations.filter(e => e.document_id == j);
      rotations = rotations.sort((a, b) => a.page - b.page);
      if (this.rotations[i - 1].rotate == 0) {
        rotations[i - 1].rotate = 270;
      } else {
        rotations[i - 1].rotate = rotations[i - 1].rotate - 90;
      }
      this.updateFieldPositionsRotations();
      this.saveRotations(rotations);
    },
    async rotateRight(i, j) {
      // let id = `${j}_canvas_${i}`;
      // document.getElementById(id).focus();
      this.currentSelectedPageIndex = i;
      this.currentSelectedDocIndex = j;
      this.documentDataLoading = true;
      this.isRightRotate = true;
      this.isEditingDocument = true;
      let rotations = this.rotations.filter(e => e.document_id == j);
      rotations = rotations.sort((a, b) => a.page - b.page);
      if (rotations[i - 1].rotate == 360) {
        rotations[i - 1].rotate = 90;
      } else {
        rotations[i - 1].rotate = rotations[i - 1].rotate + 90;
      }
      this.updateFieldPositionsRotations();
      this.saveRotations(rotations);
      // this.pdfData.getPage(i).then(this.rotateRenderPage);
    },
    //save rotations
    async saveRotations(rotations) {
      let params = {};
      let newRotations = [];
      rotations.forEach(el => {
        const data = (({ page, rotate }) => ({ page, rotate }))(el);
        newRotations.push(data);
      });
      params.keepFileID = true;
      params.stampByTsa = false;
      params.pdfSignatures = [];
      params.defaultScale = 1;
      params.pdfTexts = [];
      params.pdfImages = [];
      params.pdfDeletePages = [];
      params.pdfRecs = [];
      params.pdfRotatePages = newRotations;
      params.addDocId = false;
      params.addPageNumber = false;
      // params.pdfContent = this.document_url_path
      //   .slice(23, this.document_url_path.length)
      //   .split(".pdf")[0];

      let tempUrl = this.document_url_paths[this.currentSelectedDocIndex].split(
        "/"
      );
      // let id = tempUrl[tempUrl.length - 1].split(".")[0];
      params.pdfContent =
        this.basePdfdownloadUrl +
        this.document_url_paths[this.currentSelectedDocIndex];
      params["company_id"] = process.env.VUE_APP_APP_TYPE + "/" + tempUrl[2];
      await this.$store.dispatch("fileUpload/fileTheUploadv4", params);
      this.rotations = [];
      this.isInitialRender = true;
      this.deleted_pages = [];
      this.rotations = [];
      this.allPdfData = [];
      this.scale = 0;
      await this.renderAllDocuments(false);
      // let url = this.basePdfdownloadUrl + this.document_url_path;
      // await this.renderPreviewPages(url);
    },
    updateFieldPositionsRotations() {
      let idNum = this.currentSelectedPageIndex;
      let id =
        this.currentSelectedDocIndex +
        "_canvas_" +
        this.currentSelectedPageIndex;
      let pageBreaks = [];
      let h = 0;
      let maxLength = document.getElementById("wrapper").childNodes.length;
      for (let i = 0; i < maxLength; i++) {
        h = h + document.getElementById("wrapper").childNodes[i].height;
        pageBreaks.push(h);
      }
      let newPageY = document.getElementById(id).width;
      let oldPageX = document.getElementById(id).height;
      let newFields = [];
      this.elements.forEach(element => {
        if (element.y >= pageBreaks[idNum - 1] + idNum * 6) {
          if (oldPageX > newPageY) {
            element.y = element.y - (oldPageX - newPageY);
          } else {
            element.y = element.y + (newPageY - oldPageX);
          }
        }
        newFields.push(element);
      });
      this.elements = [];
      newFields.forEach(e => {
        this.elements.push(e);
      });
    },
    //reset editing flags
    resetEditFlags() {
      this.currentSelectedPageIndex = -1;
      this.isEditingDocument = false;
      this.currentSelectedDocIndex = -1;
      this.isAddingPage = false;
      this.isDeletingPage = false;
      this.isRightRotate = false;
      this.isLeftRotate = false;
    },
    //addPageOnBottom
    addPageOnBottom() {
      this.$confirm("Are you sure to add page? ", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async () => {
        this.documentDataLoading = true;
        // let url = this.document_url_path.split("/");
        // let id = url[url.length - 1].split(".")[0];
        let params = {};
        params.pdfContent =
          this.basePdfdownloadUrl +
          this.document_url_paths[this.document_url_paths.length - 1];
        params.page = this.allPdfData[this.total_documents - 1].pages;
        this.isEditingDocument = true;
        this.isAddingPage = true;
        this.isInitialRender = true;
        this.deleted_pages = [];
        this.rotations = [];
        let companyId =
          this.getActiveWorkspace && this.getActiveWorkspace.company_id
            ? this.getActiveWorkspace.company_id
            : this.getAuthenticatedUser._id;
        params.company_id = `${process.env.VUE_APP_APP_TYPE}/${companyId}`;
        console.log("params", params);
        await this.$store.dispatch("fileUpload/addPageToDocumentv4", params);
        if (this.getAddPageStatus) {
          this.allPdfData = [];
          // let url = this.basePdfdownloadUrl + this.document_url_path;
          // await this.renderPreviewPages(url);
          await this.renderAllDocuments(false);
        } else {
          this.$message.error("Oops, something went wrong!");
          this.documentDataLoading = false;
        }
      });
    },
    //adding page at top
    async addPage(i, j) {
      try {
        // await this.editAndSaveDocument();
        this.$confirm("Are you sure to add page? ", "Warning", {
          confirmButtonText: "Yes",
          cancelButtonText: "No"
        }).then(async () => {
          this.documentDataLoading = true;
          // let url = this.document_url_path.split("/");
          // let id = url[url.length - 1].split(".")[0];
          let params = {};
          params.pdfContent =
            appConfig.S3_BUCKET_URL + this.document_url_paths[j];
          params.page = i - 1;
          let companyId =
            this.getActiveWorkspace && this.getActiveWorkspace.company_id
              ? this.getActiveWorkspace.company_id
              : this.getAuthenticatedUser._id;
          params.company_id = `${process.env.VUE_APP_APP_TYPE}/${companyId}`;
          await this.$store.dispatch("fileUpload/addPageToDocumentv4", params);
          if (this.getAddPageStatus) {
            this.currentSelectedPageIndex = i;
            this.currentSelectedDocIndex = j;
            this.getAffectedFieldsAdd();
            this.isEditingDocument = true;
            this.isAddingPage = true;
            this.isInitialRender = true;
            this.deleted_pages = [];
            this.allPdfData = [];
            this.rotations = [];
            this.scale = 0;
            // let url = this.basePdfdownloadUrl + this.document_url_path;
            // await this.renderPreviewPages(url);
            await this.renderAllDocuments(false);
          } else {
            this.$message.error("Oops, something went wrong!");
            this.documentDataLoading = false;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async renderPreviewPages(id, flag) {
      const self = this;
      let i = id;
      let isNew = flag;
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
            document_id: i
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
        canvas.onclick = function() {
          this.currentActivatePage = page.pageNumber;
          this.currentActivateDoc = i;
          self.navigateToPageNo();
        };
        canvas.id = `${i}_canvas_page_${page.pageNumber}`;
        canvas.style.cssText =
          "margin-top: 20px; border: 1px solid #ccc; margin-left: 10px; margin-right: 10px; cursor: pointer;";
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var renderContext = {
          canvasContext: ctx,
          viewport: previewView
        };
        canvas.height = previewView.height;
        canvas.width = previewView.width;
        await page.render(renderContext);
      }
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
                    await self.getWidthandHeight(i, isNew);
                  });
                }, 500)
              );
          } else {
            await this.allPdfData[i].pdfDoc.getPage(num).then(renderPage);
          }
        }
      }
    },
    getPages(pdfDoc) {
      this.pdfData = null;
      this.pdfPages = 1;
      this.pdfPages = pdfDoc.numPages;
      this.pdfData = pdfDoc;
      return pdfDoc;
    },
    async updateConfigDocumentScale() {
      try {
        let configurableDocumentData = this.prepareFields();
        this.$set(configurableDocumentData, "scale", this.scale);
        let params = {
          employee_document_id: this.$route.params.employee_document_id,
          company_document_id: this.$route.params.employee_document_id,
          configurable_document_data: configurableDocumentData
        };
        if (
          this.getSingleDocumentData.data.configurable_document_data &&
          this.getSingleDocumentData.data.configurable_document_data.pages[0] &&
          this.getSingleDocumentData.data.configurable_document_data.pages[0]
            .fields &&
          this.getSingleDocumentData.data.configurable_document_data.pages[0]
            .fields.length
        ) {
          params.configurable_document_data.pages[0].fields = this.getSingleDocumentData.data.configurable_document_data.pages[0].fields;
        }
        await this.$store.dispatch("documents/updateDraftDocument", params);
      } catch (err) {
        console.log(err);
      }
    },
    async getWidthandHeight(id, flag) {
      const self = this;
      let scale = 1.6;
      let i = id;
      let isNew = flag;
      for (let i = 0.5; i <= 2; i += 0.1) {
        if (self.docPages && self.docPages * i <= 955) {
          scale = i;
        }
      }
      if (this.scale == 0) {
        this.scale = scale;
        this.updateConfigDocumentScale();
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
          viewport: viewport
        };
        canvas.height = viewport.height;
        canvas.width = viewport.width - 2;
        await page.render(renderContext);
        self.pageWidth = viewport.width;
        self.pageHeight += viewport.height;
      }
      for (var num = 1; num <= this.allPdfData[i].pages; num++) {
        if (num == this.allPdfData[i].pages) {
          await this.allPdfData[i].pdfDoc
            .getPage(num)
            .then(renderPage)
            .then(
              setTimeout(() => {
                if (this.isAddingPage && this.isEditingDocument) {
                  this.updateFieldPositions();
                } else if (this.isDeletingPage && this.isEditingDocument) {
                  this.documentDataLoading = false;
                } else if (
                  (this.isRightRotate || this.isLeftRotate) &&
                  this.isEditingDocument
                ) {
                  this.documentDataLoading = false;
                } else if (this.isPdfEditing) {
                  this.documentDataLoading = false;
                  this.isPdfEditing = false;
                } else {
                  if (i + 1 == this.total_documents && isNew) {
                    this.fetchDocumentData(isNew);
                  }
                }
                this.documentDataLoading = false;
              }, 500)
            );
        } else {
          await this.allPdfData[i].pdfDoc.getPage(num).then(renderPage);
        }
      }
    },
    setData() {
      console.log(this.getAuthenticatedUser.initial, this.getAuthenticatedUser);
      this.documentName = this.getSingleDocumentData.data.title
        ? this.getSingleDocumentData.data.title
        : this.getSingleDocumentData.data.name;
      this.isDraft = this.getSingleDocumentData.data.document_status == "DRAFT";
      this.configurableDocumentId = this.getSingleDocumentData.data.configurable_document_id;
      this.documentId = this.getSingleDocumentData.data.company_document_id;
      this.workflowName = this.$route.query.workflow_name || "Company Document";
      this.elements.map(el => {
        if (
          el &&
          el.key &&
          el.key == "my_initial" &&
          (el.value == "undefined" || el.value == "")
        ) {
          this.getConfigurableDocumentDataById &&
            this.getConfigurableDocumentDataById.pages &&
            this.getConfigurableDocumentDataById.pages[0] &&
            this.getConfigurableDocumentDataById.pages[0].fields.find(ele => {
              if (ele && ele.key && ele.key == "my_initial") {
                this.userInitial = ele.value;
                el.value = ele.value;
              }
            });
          console.log(el);
        }
      });
    },

    async setEmployeDataToForm() {
      this.documentDataLoading = true;
      for (let index = 0; index < this.elements.length; index++) {
        let field = this.elements[index];

        const documentValue = this.getValueFromSavedDocument(field.key);
        if (
          this.elements[index].type == "SIGNATURE" ||
          this.elements[index].type == "INITIAL"
        ) {
          this.elements[index].source = "";
          this.$set(this.elements[index], "source", "");
          this.elements[index].value = "";
          this.$set(this.elements[index], "value", "");
        } else if (documentValue) {
          this.$set(this.elements[index], "value", documentValue);
        }
      }

      if (this.employeeDocumentId && this.getSingleDocumentData.data) {
        this.userDocumentFormData.e_signature_required = this.getSingleDocumentData.data.e_signature_required;
        this.userDocumentFormData.e_signature_status = this.getSingleDocumentData.data.e_signature_status;
        this.userDocumentFormData.expires_at =
          this.getSingleDocumentData.data.expires_at ||
          this.$moment()
            .endOf("day")
            .toString();
        // this.userDocumentFormData.valid_from = this.getSingleDocumentData.data.valid_from || this.$moment().startOf('day').toString();
        this.userDocumentFormData.e_signature_value = this.getSingleDocumentData
          .data.e_signature_required
          ? "YES"
          : "NO";

        this.documentUsers = this.getSingleDocumentData.data.document_users;
        await Promise.all([
          await this.companyEntityDetails(),
          this.getEntityFields()
        ]);
        await this.setEntityData();
        console.log("getAuthenticatedUser", this.getSingleDocumentData);
        this.elements = this.elements.map(element => {
          if (
            element.type == "PRIMARY_FIELDS" &&
            this.getSingleDocumentData &&
            this.getSingleDocumentData.data &&
            (this.getSingleDocumentData.data.document_cloned_status ||
              this.getSingleDocumentData.data.document_corrected_status)
          ) {
            element.content = this.getFieldVal(
              element.selected_tag,
              element.selected_user
            )
              ? this.getFieldVal(element.selected_tag, element.selected_user)
              : element.content
              ? element.content
              : "";
            if (element.selected_user == "SENDER") {
              if (element.selected_tag == "first_name") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.first_name;
              } else if (element.selected_tag == "last_name") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.last_name;
              } else if (element.selected_tag == "full_name") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.first_name + " " + element.content
                  ? element.content
                  : this.getAuthenticatedUser.last_name;
              } else if (element.selected_tag == "phone") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.phone;
              } else if (element.selected_tag == "email") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.email;
              } else if (element.selected_tag == "address") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.address;
              } else if (element.selected_tag == "title") {
                element.content = element.content
                  ? element.content
                  : this.getAuthenticatedUser.title;
              }
            }
          } else {
            if (element.type == "my-signature") {
              element.source = this.getAuthenticatedUser.signature;
              element.value = this.getAuthenticatedUser.signature;
            } else if (element.type == "MY_INITIAL") {
              this.getAuthenticatedUser.initial = this.userInitial;
              element.value = this.getAuthenticatedUser.initial
                ? this.getAuthenticatedUser.initial
                : this.getInitialUrl;
            }
          }
          return element;
        });
      }
      this.documentDataLoading = false;
    },
    async companyEntityDetails() {
      try {
        await this.$store.dispatch("entities/fetchCompanyEntityDetails");
        if (
          this.getCompanyEntityDetails &&
          this.getCompanyEntityDetails.entity_data_details &&
          this.getCompanyEntityDetails.entity_data_details[0] &&
          this.documentUsers.length
        ) {
          this.documentUsers.forEach(e => {
            if (e.type == "SENDER") {
              this.$set(
                e,
                "entity_data_id",
                this.getCompanyEntityDetails.entity_data_details[0]._id
              );
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchDocumentData(isNew) {
      this.documentDataLoading = true;
      this.documentFormData = this.getSingleDocumentData.data.configurable_document_data;
      this.templatesUsed =
        this.documentFormData &&
        this.documentFormData.pages[0] &&
        this.documentFormData.pages[0].templates_used
          ? this.documentFormData.pages[0].templates_used
          : [];
      this.enforceSignatureOrder = this.getSingleDocumentData.data.enforce_signature_order;
      this.isAnyoneCanApprove =
        this.getSingleDocumentData.data.is_anyone_can_approve || false;
      this.loadingElements = true;
      this.isTemplate = this.documentFormData.is_template || false;
      this.documentName = this.documentFormData.name;
      //written by sekhar
      if (isNew) {
        setTimeout(() => {
          if (
            this.documentFormData &&
            this.documentFormData.pages[0] &&
            this.documentFormData.pages[0].fields
          ) {
            let fields = [];
            this.documentFormData.pages[0].fields.forEach(el => {
              if (el.y <= this.pageHeight) {
                fields.push(el);
              }
            });
            this.elements = [...this.elements, ...fields];
          }
          this.setUsersEntityData();
          this.setEmployeDataToForm();
          this.loading = false;
          this.loadingElements = false;
        }, 5000);
      }
      this.documentDataLoading = false;
    },
    setDocumentFields() {
      this.elements = this.elements.map(element => {
        if (element.docId > -1 && element.page) {
          let selectedPage = document.getElementById(
            `${element.docId}_canvas_${element.page}`
          );
          if (selectedPage.offsetTop) {
            element.y = element.y + selectedPage.offsetTop;
          }
          if (selectedPage.offsetLeft) {
            element.x = element.x + selectedPage.offsetLeft;
          }
        }
        return element;
      });
    },
    async checkSendDocumentRedirection() {
      try {
        await this.$store.dispatch("settings/fetchApplicationSettings");
        if (this.getApplicationSettings && this.getApplicationSettings.data) {
          if (this.getApplicationSettings.data.document_signature) {
            this.sendDoucumentMailRedirection = this.getApplicationSettings.data.document_signature.show_mail_box_when_sent;
            this.sendDoucumentSettingsRedirection = this.getApplicationSettings.data.document_signature.show_document_settings_when_sent;
            this.sender_auto_fill = this.getApplicationSettings.data.document_signature.allow_sender_auto_fill;
          }
        }
      } catch (err) {
        console.log(err);
      }
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
    sendDocumentWithoutFinish() {
      this.senderEmptyfieldsModal = false;
      this.issenderFinishDocument = false;
      this.documentSend(true);
    },
    setSenderFieldsData() {
      this.issenderFinishDocument = false;
      this.senderFilledAllFields = true;
      if (this.enforceSignatureOrder) {
        this.documentUsers.find(el => {
          if (
            el &&
            el.type === "SENDER" &&
            el.e_signature_order &&
            (el.e_signature_order > 0 || el.e_signature_order != 0) &&
            el.e_signature_required
          ) {
            this.senderFilledAllFields = false;
          }
        });
      }
      this.elements.map(el => {
        if (
          (el && el.filled_by == "SENDER" && el.type === "DATE_SIGNED") ||
          el.type === "SIGNATURE" ||
          el.type == "MY_INITIAL" ||
          el.type == "INITIAL"
        ) {
          el.source = "";
          el.value = "";
        }
      });
      this.documentSend(true);
    },
    async documentSendDetailLogic() {
      try {
        await this.checkSendDocumentRedirection();
        let notCCRecipients = this.documentUsers.find(
          user => user.type != "SENDER" && user.user_type != "CC"
        );
        // if (this.documentSendStatus) {
        if (
          this.sender_auto_fill &&
          notCCRecipients &&
          this.issenderFinishDocument
        ) {
          this.loading = false;
          let senderEmptyfields = this.elements.filter(el => {
            if (this.unWantedFields.indexOf(el.type) == -1) {
              if (
                el.filled_by == "SENDER" &&
                el.type == "MULTI_SELECT" &&
                el.value &&
                !el.value.length
              ) {
                return el;
              } else if (el.filled_by == "SENDER" && el.type == "ATTACHMENT") {
                if (el.requiredFiles) {
                  if (el.files && el.files.length < el.requiredFiles) {
                    return el;
                  }
                } else {
                  if (el.files && !el.files.length) {
                    return el;
                  }
                }
              } else if (
                el.filled_by == "SENDER" &&
                el.type == "PRIMARY_FIELDS"
              ) {
                if (!el.content) {
                  return el;
                }
              } else if (
                el.filled_by == "SENDER" &&
                el.type == "ENTITY" &&
                !el.entity_data_id
              ) {
                return el;
              } else if (
                el.filled_by == "SENDER" &&
                el.type != "ENTITY" &&
                !el.value
              ) {
                return el;
              }
            }
          });
          if (senderEmptyfields && senderEmptyfields.length) {
            this.senderEmptyfields = senderEmptyfields;
            this.senderEmptyfieldsModal = true;
            this.documentDataLoading = false;
          } else {
            this.checkRedirectingDocument();
          }
        } else {
          this.checkRedirectingDocument();
        }
      } catch (err) {
        this.documentDataLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error in sending Document"
        });
      }
    },
    checkRedirectingDocument() {
      if (this.sendDoucumentMailRedirection) {
        this.$router.push({
          name: "send-document-mail",
          params: {
            id: this.$route.params.employee_document_id
          }
        });
      } else if (
        this.sendDoucumentSettingsRedirection &&
        !this.sendDoucumentMailRedirection
      ) {
        this.docSettingsVisibleAndSend = true;
        this.docSettingsVisible = true;
      } else {
        this.sendDocument();
      }
    },
    async documentSend(isSubmit = false) {
      try {
        let checkSign = await this.checkSignUser();
        if (checkSign) {
          this.documentSendStatus = true;
          await this.updateDraftDocument(isSubmit);
          await this.documentSendDetailLogic();
        }
      } catch (err) {
        console.log(err);
      }
    },
    generateTextImageForMyIntial(text, color) {
      let url = "";
      textToImage
        .generate(text, {
          textColor: color,
          fontSize: 25,
          lineHeight: 35,
          fontFamily: "Dancing Script",
          maxWidth: 100
        })
        .then(dataUri => {
          this.myInitial.value = dataUri;
        });
      return url;
    },
    async saveMyInitial() {
      await this.generateTextImageForMyIntial(
        this.myInitial.text,
        this.myInitial.color
      );
      this.$store.dispatch("auth/addInitialSignature", {
        initial: this.myInitial.value
      });
      await this.$store.dispatch("auth/fetchInitialSignature");
      this.selectedSignatureItem.value = this.myInitial.value;
      this.elements[
        this.selectedSignatureItemIndex
      ] = this.selectedSignatureItem;
      this.selectedSignatureItem = {};
      this.addMyInitialStatus = false;
    },
    async updateContactsWithDocumentData() {
      let contactFields = this.elements.filter(el => {
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
      this.documentUsers.forEach(user => {
        // if (user.type != "SENDER") {
        let contactUpdateDetails = {};
        contactFields.forEach(field => {
          if (
            user.value == field.selected_user &&
            field.content &&
            field.content.length &&
            user.email
          ) {
            contactUpdateDetails[field.selected_tag] = field.content;
            if (user.user_id) {
              contactUpdateDetails["user_id"] =
                user.user_id && user.user_id._id
                  ? user.user_id._id
                  : user.user_id;
            }
            if (user.contact) {
              contactUpdateDetails["contact_id"] =
                user.contact && user.contact._id
                  ? user.contact._id
                  : user.contact;
            }
            if (user.entity_data_id) {
              contactUpdateDetails["entity_data_id"] = user.entity_data_id._id
                ? user.entity_data_id._id
                : user.entity_data_id;
            }
            contactUpdateDetails["email"] = user.email;
            // contactUpdateDetails["first_name"] =
            //   user && user.contact && user.contact.first_name
            //     ? user.contact.first_name
            //     : user.first_name;
            // contactUpdateDetails["last_name"] =
            //   user && user.contact && user.contact.last_name
            //     ? user.contact.last_name
            //     : user.last_name;
            contactUpdateDetails["contact_type"] =
              user.contact_type && user.contact_type._id
                ? user.contact_type._id
                : user.contact_type;
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
      allContacts.map(async user => {
        let re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/;
        if (user && user.phone && re.test(user.phone)) {
          user["phone_number"] = user["phone"];
        }
      });
      // allContacts.forEach(async (user) => {
      //   await this.updateContact(user, sender);
      // });
      await this.$store.dispatch("contacts/updateDocumentPrimaryDetails", {
        params: allContacts
      });

      // console.log(contactFields);
    },
    async updateDraftDocument(isSubmit = false) {
      try {
        if (!this.checkPermissions("editDraft")) {
          this.$notify.error({
            title: "Error",
            message:
              "Permission denied for edit draft document.Please contact owner."
          });
        } else {
          this.documentDataLoading = true;
          await this.updateCurrentUserEntityData(this.documentUsers);
          await Promise.all([this.getEntityFields()]);
          await this.setEntityData();
          await this.updateContactsWithDocumentData();
          let documentData = this.prepareDocumentData();
          let configurableDocumentData = this.prepareFields();
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
            is_anyone_can_approve: this.isAnyoneCanApprove,
            configurable_document_data: configurableDocumentData,
            name: this.documentName,
            title: this.documentName
          };
          await this.$store.dispatch("documents/updateDraftDocument", params);
          if (this.getDraftDocumentUpdateStatus) {
            this.$notify.success({
              title: "Success",
              message: "Document updated successfully"
            });
            if (!isSubmit) {
              this.documentDataLoading = false;
            }
          } else {
            this.$notify.error({
              title: "Error",
              message: "Error in updating Document"
            });
            this.documentDataLoading = false;
          }
        }
      } catch (err) {
        this.documentDataLoading = false;
        this.$notify.error({
          title: "Error",
          message: "Error in sending Document"
        });
      }
      this.is_SaveDocument = true;
    },
    mapDocumentFields() {
      this.elements = this.elements.map(element => {
        let pageBoundary = this.getPagesBoundaries(element.y);
        if (
          pageBoundary &&
          pageBoundary.data &&
          pageBoundary.data.pageId > -1 &&
          pageBoundary.data.docId > -1
        ) {
          element.page = pageBoundary.data.pageId + 1;
          element.docId = pageBoundary.data.docId;
          let selectedPage = document.getElementById(
            `${pageBoundary.data.docId}_canvas_${pageBoundary.data.pageId + 1}`
          );
          if (selectedPage.offsetTop) {
            element.y = element.y - selectedPage.offsetTop;
            element.offsetTop = selectedPage.offsetTop;
          }
          if (selectedPage.offsetLeft) {
            element.x = element.x - selectedPage.offsetLeft;
            element.offsetLeft = selectedPage.offsetLeft;
          }
        }
        return element;
      });
    },
    prepareEmailData() {
      let emailData = {};
      this.documentUsers.map(user => {
        if (user.user_type == "CC") {
          this.mailCCSendTo.push(user.email);
        } else {
          this.mailSendTo.push(user.email);
        }
        return user;
      });
      let users = [...this.documentUsers];
      let usersEmail = users.map(user => user.email);
      emailData["signers"] = this.mailSendTo.map(user => {
        let data = {};
        let userIndex = usersEmail.indexOf(user);
        if (userIndex != -1) {
          data["email"] = user;
          data["user_id"] = users[userIndex]._id;
        } else {
          data["email"] = user;
          data["user_id"] = "";
        }

        return data;
      });

      emailData["to_cc"] = this.mailCCSendTo.map(user => {
        let data = {};
        let userIndex = usersEmail.indexOf(user);
        if (userIndex != -1) {
          data["email"] = user;
          data["user_id"] = users[userIndex]._id;
        } else {
          data["email"] = user;
          data["user_id"] = "";
        }

        return data;
      });
      emailData["data"] = this.mailContent;
      emailData["subject"] = this.mailSubject;
      return emailData;
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
    async sendDocument() {
      try {
        this.loading = true;
        this.docSettingsVisible = false;
        let documentData = this.prepareDocumentData();
        let emailData = this.prepareEmailData();
        let timeZone = this.getTimeZone();
        let params = {
          employee_document_id: this.$route.params.employee_document_id,
          document_users: this.documentUsers,
          document_data: documentData,
          is_anyone_can_approve: this.isAnyoneCanApprove,
          enforce_signature_order: this.enforceSignatureOrder || false,
          email_data: emailData,
          sender_time_zone: timeZone,
          senderFilledAllFields: this.isUserHasSign
            ? this.senderFilledAllFields
            : false,
          name: this.documentName,
          title: this.documentName
        };
        await this.$store.dispatch("documents/sendDocument", params);
        this.loading = false;
        if (this.getDocumentSendStatus) {
          this.$notify.success({
            title: "Success",
            message: "Document sent successfully"
          });
          this.docSettingsVisible = false;
          this.sentDocumentSuccess = true;
        } else {
          this.$notify.error({
            title: "Error",
            message: "Document sent successfully"
          });
        }
      } catch (err) {
        this.loading = false;
        this.$notify.error({
          title: "Error",
          message: "Error Document"
        });
      }
    },
    checkPermissions(permission) {
      let hasUser =
        this.getSingleDocumentData &&
        this.getSingleDocumentData.data &&
        this.getSingleDocumentData.data.document_users.findIndex(
          cu => cu.email == this.getAuthenticatedUser.email
        );
      let isCreator =
        this.getSingleDocumentData.data.created_by._id.toString() ==
        this.getAuthenticatedUser._id.toString();
      // console.log(hasUser, isCreator);
      if (hasUser != -1 || isCreator) {
        return true;
      } else if (this.getUserType && this.getUserType.permissionSet) {
        return this.getUserType.permissionSet.includes(permission)
          ? true
          : false;
      } else {
        return true;
      }
    },
    getRecipientSelection() {
      const selectedUser = this.documentUsers.find(
        e => e.value == this.recipientSelection
      );
      this.selectedUserEntity = {};
      if (selectedUser) {
        if (selectedUser.contact_type) {
          this.selectedUserEntity = this.allUsersEntityData.find(
            e =>
              (selectedUser.contact_type &&
                selectedUser.contact_type._id == e.id) ||
              e.id == selectedUser.contact_type
          );
        } else if (this.getCompanyDetails && this.getCompanyDetails._id) {
          this.selectedUserEntity = this.allUsersEntityData.find(
            e => e.name == this.getCompanyDetails._id
          );
        } else if (
          selectedUser.entity_data_id &&
          selectedUser.entity_data_id.company
        ) {
          this.selectedUserEntity = this.allUsersEntityData.find(
            e => e.name == selectedUser.entity_data_id.company
          );
        }
      }
    }
  },

  watch: {
    documentUsers() {
      if (this.documentUsers) {
        if (this.documentUsers.length && this.documentUsers.length == 1) {
          this.recipientSelection = this.documentUsers[0].value;
        } else {
          let nonCCUser = this.documentUsers.find(user => {
            return user.user_type != "CC";
          });
          this.recipientSelection =
            nonCCUser && nonCCUser.value ? nonCCUser.value : null;
        }
        this.getRecipientSelection();
      }
    },
    recipientSelection() {
      this.getRecipientSelection();
    },
    elements: {
      handler: function() {
        bus.$emit("formula-updated");
      },
      deep: true
    },
    async "$route.params.configurable_document_id"() {
      window.location.reload();
    },
    async "$route.name"() {
      window.location.reload();
    }
  },
  beforeDestroy() {
    // bus.$off("entityData-updated");
    this.$store.commit(
      "configurableDocuments/setConfigurableDocumentUpdateStatus",
      false,
      {
        root: true
      }
    );
    this.$store.commit(
      "configurableDocuments/setConfigurableDocumentData",
      null,
      {
        root: true
      }
    );
    this.$store.commit(
      "configurableDocuments/setConfigurableDocumentErrors",
      null,
      {
        root: true
      }
    );
    // this.$store.commit(
    //   "configurableDocuments/setConfigurableDocumentDataById",
    //   null,
    //   {
    //     root: true,
    //   }
    // );
    this.$store.commit(
      "configurableDocuments/setConfigurableDocumentExpirationSettigns",
      null,
      {
        root: true
      }
    );
    this.$store.commit("fileUpload/setFontTypes", null, {
      root: true
    });
    this.$store.commit("fileUpload/setUploadFileDataStatus", null, {
      root: true
    });
    this.$store.commit("fileUpload/setAddPageStatus", null, {
      root: true
    });

    this.$store.commit("documents/setSingleDocumentData", null, {
      root: true
    });
    this.$store.commit("documents/setDraftDocumentUpdateStatus", null, {
      root: true
    });
    this.$store.commit("documents/setDocumnetSentDocumnet", null, {
      root: true
    });
    this.$store.commit("documents/setDocumentSendStatus", null, {
      root: true
    });
    this.$store.commit("documents/setEmployeeDocumentUsers", null, {
      root: true
    });
    this.$store.commit("settings/setApplicationSettings", null, {
      root: true
    });
    this.$store.commit("entities/setEntityDataByQuery", null, {
      root: true
    });
    this.$store.commit("entities/setCompanyEntityDetails", null, {
      root: true
    });
  }
};
</script>

<style lang="scss" scoped>
.ankaCropper__navigation a:nth-child(4n + 4) {
  display: none !important;
}
.ankaCropper__navigation a:nth-child(5n + 5) {
  display: none !important;
}
.text-added {
  position: absolute !important;
}
.text-highlight {
  border: red solid 1px;
  position: absolute !important;
  // background: transparent !important;
  top: 0;
  input {
    white-space: nowrap !important;
    vertical-align: baseline !important;
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    // background: transparent !important;
    resize: none !important;
    overflow: hidden;
    color: inherit;
  }
  .field-textarea {
    &.el-input-nowrap {
      el-input {
        white-space: nowrap !important;
      }
    }
    height: 100% !important;
    &.el-input {
      vertical-align: baseline !important;
      display: table !important;
    }
  }
  &:hover:before {
    visibility: visible;
    opacity: 1;
  }
  el-input .el-input__inner {
    padding: 0px 5px;
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    background: transparent !important;
    resize: none !important;
    overflow: hidden;
    color: inherit;
  }
  .overlay {
    position: absolute;
    left: 5px !important;
    top: 0px !important;
    width: 100%;
    height: 100%;
    z-index: 5;
    padding: 0px !important;
  }
  .overlay {
    overflow: hidden;
    white-space: nowrap;
    width: 82% !important;
  }
  .edit-icon {
    background: #f754a2;
    position: absolute !important;
    // widows: 5px;
    // height: 5px;
  }
  .save-icon {
    background: #55ff00;
    position: absolute !important;
    left: 20px;
  }
  .text-icon {
    background: #006aff;
    position: absolute !important;
    left: 40px;
  }
}
.name-types {
  margin-top: 2%;
  .filename {
    height: 56px;
    margin-top: 1%;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #dfe3eb;
    box-sizing: border-box;
    border-radius: 2px;
    .el-upload-list__item-name {
      margin-top: 1em;
      .img-active {
        visibility: hidden;
        width: 6px !important;
        margin-right: 10px;
        margin-left: 10px;
        position: relative;
        top: 3px;
      }
      .img-fluid {
        position: relative;
        top: 5px;
        width: 18.43px !important;
      }
    }
    // .delete-doc {
    //   visibility: hidden;
    // }
    .direction-buttons {
      display: flex;
      visibility: hidden;
      position: relative;
      top: -35%;
      left: 97%;
      .directions {
        position: relative;
        right: 10%;
        top: -10px !important;
      }
    }
    &:hover {
      .img-active {
        visibility: visible;
        width: 6px !important;
        margin-right: 10px;
        margin-left: 10px;
        position: relative;
        top: 3px;
      }
      .direction-buttons {
        display: flex;
        visibility: visible;
        position: relative;
        top: -35%;
        left: 97%;
        .directions {
          position: relative;
          right: 10%;
          top: -10px !important;
        }
      }
      // .delete-doc {
      //   visibility: visible;
      //   position: relative;
      //   top: -60%;
      //   left: 97%;
      // }
    }
  }
}
.send-btn {
  @media (max-width: 767.98px) {
    margin-left: 4px !important;
  }
}
.stbtn {
  border-radius: 0;
  border: none !important;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 767.98px) {
    padding: 2px;
  }
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
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #4b545c;
    }
  }
}
.el-tag {
  border-radius: 20px;
  padding: 4px;
  line-height: 1;
  height: 30px;
  width: 30px;
  height: auto;
}
element.style {
  transform: translate(73px, 155.5px);
  // z-index: auto;
  user-select: auto;
  background: unset !important;
  color: rgb(0, 0, 0);
  width: 877px;
  height: 165px;
}
.form-builder {
  width: 950px;
  margin: 1.5em auto;
  height: 100%;
  border-radius: 4px;
  background-color: #ffffff;
  border: none;
  // -webkit-box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
  // box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
  .vdr {
    border: 1px solid rgba(#f36371, 0.5);
    padding: 2px 5px;
  }
  .form-image-holder {
    width: 100%;
    height: 100%;
    // div {
    //   -webkit-box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
    //   box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
    //   width: 100%;
    //   height: 100%;
    //   background: #eee;
    //   canvas {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
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
  // .img-fluid {
  //   height: auto !important;
  // }

  .inner-navbar {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
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
  }
  .form-fields-set {
    z-index: 99;
    height: calc(100vh - 85px);
    overflow-y: scroll;
    background-color: #ffffff;
    padding: 1.25em 1em;
    border-radius: 0px;
  }
  .document-editor-container {
    .form-field-item {
      display: inline-block;
      margin-top: -15px;
    }
    .form-field-item-emtpy {
      display: inline-block;
      height: 40px;
    }
    .fields-navigators {
      // float: right;
      // margin-top: 2%;
      position: absolute;
      top: 0px;
    }
    .text-editot-btn-active {
      border: 1px solid #a5a3a3cc;
      background: #dad9d9;
    }
    .text-editor-color {
      position: relative;
      //top: 15px;
      margin-left: 5px;
    }
    .text-editot-btn {
      border: none;
      background: transparent;
    }
    .text-editot-slt-size {
      width: 65px;
      background-color: transparent;
    }
    .text-editot-slt input {
      border: none;
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
    display: table !important;
  }

  .form-holder {
    width: 100%;
    position: relative;
    .el-input__inner,
    .el-textarea__inner {
      // height: 100% !important;
      // min-height: 30px !important;
      // line-height: inherit !important;
    }
    input[type="checkbox"] {
      margin: 0 !important;
    }

    // .draggable.resizable {
    //   position: absolute;
    //   z-index: 100;
    // }
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

    // .draggable.resizable {
    //   position: absolute;
    //   z-index: 100;
    // }
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
  .scrollable-container {
    .fieldSet__box {
      margin-bottom: 1em;
      // padding-bottom: 1em;
      // border-bottom: 1px solid #efefef;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      .draggable {
        cursor: move; /* fallback: no `url()` support or images disabled */
        cursor: -webkit-grab; /* Chrome 1-21, Safari 4+ */
        cursor: -moz-grab; /* Firefox 1.5-26 */
        cursor: grab; /* W3C standards syntax, should come least */
      }

      .draggable:active {
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
      }
      .field-element {
        position: relative;
        padding: 0.5em 1em;
        // width: 94%;
        display: grid;
        grid-template-columns: 35px 1fr;
        align-items: center;
        font-size: 0.5em;
        white-space: normal;
        line-height: 1;
        background-color: #f9f9f9;
        border: 1px solid #f1f1f1;
        height: 40px;
        color: #606266;
        border-radius: 3px;
        &:focus {
          color: #f36371;
          border-color: #fdcfd4;
          background-color: #ffe9ec;
        }
        img {
          max-height: 25px;
          padding-right: 10px;
        }
        .name {
          padding-left: 10px;
          line-height: 1.3;
          font-size: 0.8rem;
          text-align: left;
          font-weight: 500;
          i {
            width: 100%;
            font-size: 1em;
            padding-bottom: 0.5em;
          }
        }
      }
    }
  }
  // .draggable {
  //   height: auto !important;
  //   background: rgba(236, 245, 255, 0.48);
  // }
}
</style>

<style lang="scss">
.ankaCropper__navigation a:nth-child(4n + 4) {
  display: none !important;
}
.ankaCropper__navigation a:nth-child(5n + 5) {
  display: none !important;
}
.change-document-dlg {
  .el-dialog__body {
    scrollbar-width: none !important;
  }
}
.form-fields-holder {
  .draggable {
    z-index: 100 !important;
  }
  #svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .line {
    stroke-width: 1px;
    stroke: rgb(9, 60, 230);
    z-index: 200 !important;
  }
}

#drag-template-background {
  .document-editor-container {
    .content-fields {
      textarea.el-textarea__inner {
        min-height: 10px !important;
        // line-height: 15px !important;
        display: table !important;
      }
    }
  }
}
textarea {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
}
.content-fields {
  min-width: 15px !important;
  min-height: 15px !important;
  .field-textarea {
    &.currency-input {
      width: 100% !important;
      height: 100% !important;
      border: none !important;
      border-color: transparent !important;
      background: transparent !important;
    }
    &.currency-input:focus {
      border: none !important;
      outline: none !important;
    }
    &.textarea-nowrap {
      textarea {
        white-space: nowrap !important;
      }
    }
    &.textare-background {
      textarea {
        padding: 0 !important;
      }
    }
    height: 100% !important;
    &.el-textarea {
      vertical-align: baseline !important;
    }
  }
  .overlay {
    overflow: hidden;
    white-space: nowrap;
    width: 82% !important;
  }
  // position:relative; // for tooltip
  &[data-text*="DATE "] {
    background: none !important;
  }
  &:before {
    content: attr(data-text);
    position: absolute;
    top: -25px;
    -webkit-transform: translateY(-50%);
    left: -17px;
    margin-left: 15px;
    width: 142px;
    height: 10px;
    padding: 10px;
    border-radius: 9px;
    background: #555;
    color: white;
    text-align: center;
    line-height: 10px;
    visibility: hidden;
    opacity: 0; /* define initial transition property */
    transition: opacity 1s;
  }
  &:after {
    content: "";
    position: absolute;
    top: -10px;
    left: 47px;
    margin-left: -11px;
    border-width: 9px 9px 10px 0px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
    visibility: hidden;
    opacity: 0; /* define initial transition property */
    transition: opacity 1s;
  }
  &:hover:before {
    visibility: visible;
    opacity: 1;
  }
  &:hover:after {
    visibility: visible;
    opacity: 1;
  }
  &:focus-visible {
    outline: none !important;
  }
  &.el-textarea {
    width: 100% !important;
    height: 100% !important;
  }
  padding: 0 !important;
  &.my-active-class {
    border-width: 2px !important;
    background: transparent !important;
    .overlay {
      display: none;
    }
  }
  &[has-value="1"] {
    background: transparent !important;
  }
  &[has-content="1"] {
    background: transparent !important;
  }
  &[has-background="0"] {
    background: transparent !important;
  }
  &[is-border-none="1"] {
    border: none !important;
  }
  & > p {
    &:last-child {
      margin: 12px 7px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  & > div {
    &:last-child {
      width: 100% !important;
      height: 100% !important;
      background: none;
      textarea.el-textarea__inner {
        padding: 0px 5px;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        background: transparent !important;
        resize: none !important;
        overflow: hidden;
        color: inherit;
      }
      .overlay {
        position: absolute;
        left: 5px !important;
        top: 0px !important;
        width: 100%;
        height: 100%;
        z-index: 5;
        padding: 0px !important;
      }
      .el-select {
        width: 100% !important;
        height: 100% !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        font-style: inherit !important;
        color: inherit !important;
        padding: 0px !important;
        .el-input {
          width: 100% !important;
          height: 100% !important;
          font: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          font-style: inherit !important;
          color: inherit !important;
          padding: 0px !important;
          .el-input__inner {
            width: 100% !important;
            height: 100% !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            font-style: inherit !important;
            color: inherit !important;
            padding: 0px !important;
          }
        }
        .el-input__suffix-inner {
          i {
            line-height: 100% !important;
          }
        }
        .el-tag {
          height: 100%;
          font: inherit;
          // .el-select__tags-text {
          //   font: inherit;
          // }
        }
      }
      .el-date-editor {
        width: 100% !important;
        height: 100% !important;
        display: flex;
        flex-direction: row-reverse;
        font: inherit;
        background: none;
        .el-input__inner {
          width: 100%;
          height: 100%;
          font: inherit;
          border: none;
        }
        .el-input__prefix {
          position: relative;
          i {
            line-height: 100%;
            display: inline !important;
          }
        }
      }
      min-width: 17px;
      min-height: 17px;
      input[type="checkbox"] {
        width: 100%;
        height: 100%;
        min-width: 15px;
        min-height: 15px;
      }
      &.yes-or-no {
        // padding-left: 5px;
        .el-radio {
          font: inherit !important;
          .el-radio__label {
            font: inherit !important;
          }
          &:first-child {
            margin-right: 10px !important;
          }
          &:last-child {
          }
        }
      }
      .primary-field {
        text-area.el-textarea__inner {
          background: transparent !important;
        }
      }
      &.image-field {
        // padding: 3px 12px;
        color: inherit;
        position: absolute;
        left: 5px !important;
        top: 5px !important;
        padding: 0px !important;
        width: 80% !important;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  & > img {
    &.my-signature {
      background: transparent !important;
      width: 100%;
      height: auto;
      visibility: visible !important;
    }
    &.my-initial {
      background: transparent !important;
      width: 100%;
      // height: 100%;
      height: auto;
    }
  }
}
.document-editor-container {
  position: relative;
  height: calc(100vh - 62px);
  overflow: hidden;
  .el-scrollbar {
    height: calc(100vh - 145px);
  }
}
.configure-document {
  .el-collapse-item__header {
    &.is-active {
      background-color: #ffffff;
    }
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
  padding-top: 0 !important;
  background-color: #f8f9fa;
  .handle {
    width: 8px;
    height: 8px;
    background: inherit;
    border: 1px solid inherit;
  }
  .each-element.my-active-class {
    border: 1px dashed #f36371 !important;
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
        font-weight: 500;
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

  .right-block {
    height: inherit;
    display: flex;
    align-items: center;
  }
}
.fields-dialog {
  .el-select {
    width: 100%;
  }
  .el-dialog__body {
    padding-right: 5px !important;
    scrollbar-width: none;
    .el-scrollbar__bar {
      &.is-horizontal {
        height: 0px !important;
      }
    }
    .el-form {
      padding: 0px 13px 5px 0px !important;
    }
  }
}
.form-fields-holder {
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
}
@media screen and (max-width: 1455px) {
  .pdf-side-bar {
    display: none !important;
  }
  .document-container-wrapper {
    .document-container {
      .el-row {
        display: flex;
        justify-content: center;
      }
    }
  }
}
.settigns-font {
  font-size: 14px;
}
.from-others {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .image {
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    .upload-icon {
      width: 25px;
      height: 25px;
    }
    @media (max-width: 991.98px) {
      margin-bottom: 16px;
    }
  }
}
.tooltip {
  padding: 0 !important;
}
#uploadcontainer {
  margin-top: 10px;
  border-top: 1px dashed #409eff;
}
#parastyle {
  text-align: center;
  margin-top: 8px;
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
</style>
