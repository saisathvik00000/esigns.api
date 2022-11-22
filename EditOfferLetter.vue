<template>
  <div class="offer-letter-generator">
    <div class="template-editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img src="@/assets/img/icons/bold.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img src="@/assets/img/icons/italic.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <img src="@/assets/img/icons/strike.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <img
              src="@/assets/img/icons/underline.svg"
              height="15"
              witdth="15"
            />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <img
              src="@/assets/img/icons/paragraph.svg"
              height="15"
              witdth="15"
            />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <img src="@/assets/img/icons/ul.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img src="@/assets/img/icons/ol.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <img src="@/assets/img/icons/quote.svg" height="15" witdth="15" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <img src="@/assets/img/icons/code.svg" height="15" witdth="15" />
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">
            <img src="@/assets/img/icons/hr.svg" height="15" witdth="15" />
          </button>

          <button class="menubar__button" @click="commands.undo">
            <img src="@/assets/img/icons/undo.svg" height="15" witdth="15" />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <img src="@/assets/img/icons/redo.svg" height="15" witdth="15" />
          </button>
        </div>
      </editor-menu-bar>
      <editor-content
        class="page"
        v-loading="loading"
        element-loading-text="Setup..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :editor="editor"
      />

      <div class="suggestion-list" v-show="showSuggestions" ref="suggestions">
        <template>
          <div
            v-for="(user, index) in filteredUsers"
            :key="user.id"
            class="suggestion-list__item"
            :class="{ 'is-selected': navigatedUserIndex === index }"
            @click="selectUser(user)"
          >
            {{ user.name }}
          </div>
        </template>
      </div>
    </div>
    <el-button @click="submitForm">Update</el-button>
  </div>
</template>

<script>
// import constants from "@/config/constants";

import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Mention,
} from "tiptap-extensions";

import tippy, { sticky } from "tippy.js";
import { mapGetters } from "vuex";
import offerLetterBuildHelper from "@/mixins/offerLetterBuildHelper";
export default {
  name: "Global-EditOfferLeter",
  components: {
    EditorMenuBar,
    EditorContent,
  },
  props: ["selectedOfferLetter"],
  mixins: [offerLetterBuildHelper],
  data() {
    return {
      editor: null,
      query: null,
      suggestionRange: null,
      filteredUsers: [],
      navigatedUserIndex: 0,
      insertMention: () => {},
      popup: null,
      html: "",
      content: "",
      loading: false,
      form: {
        template_body: "",
      },
      authorizedSignatures: [],
      mentionItems: [],
      showEditor: false,
    };
  },

  async mounted() {
    this.loading = true;
    this.$store.dispatch("offerLetter/resetOfferLetterError");

    await this.fetchAuthorizedSignatures();

    this.setMentionsForTemplate();

    if (this.isEdit) {
      this.setForm();
    } else {
      this.setEmptyForm();
    }

    this.loading = false;
  },
  beforeDestroy() {
    this.editor.destroy();
  },

  computed: {
    hasResults() {
      return this.filteredUsers.length;
    },
    showSuggestions() {
      return this.query || this.hasResults;
    },
    ...mapGetters("offerLetter", [
      "getOfferLetterTemplateAddStatus",
      "getOfferLetterTemplateUpdateStatus",
    ]),
    ...mapGetters("company", ["getAuthorizedSignatures"]),
  },
  methods: {
    setMentionsForTemplate() {
      this.showEditor = false;
      this.mentionItems = this.defaultMentionItems; // method from mixin
      let authorizedSignatureMentions = this.getAuthorizedSignaturesAsMentions(
        this.authorizedSignatures
      ); // method  from mixin
      this.mentionItems = [
        ...this.mentionItems,
        ...authorizedSignatureMentions,
      ];

      let options = {
        extensions: [
          new HardBreak(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Mention({
            // a list of all suggested items
            items: () => this.mentionItems,
            // is called when a suggestion starts
            onEnter: ({ items, query, range, command, virtualNode }) => {
              this.query = query;
              this.filteredUsers = items;
              this.suggestionRange = range;
              this.renderPopup(virtualNode);
              // we save the command for inserting a selected mention
              // this allows us to call it inside of our custom popup
              // via keyboard navigation and on click
              this.insertMention = command;
            },
            // is called when a suggestion has changed
            onChange: ({ items, query, range, virtualNode }) => {
              this.query = query;
              this.filteredUsers = items;
              this.suggestionRange = range;
              this.navigatedUserIndex = 0;
              this.renderPopup(virtualNode);
            },
            // is called when a suggestion is cancelled
            onExit: () => {
              // reset all saved values
              this.query = null;
              this.filteredUsers = [];
              this.suggestionRange = null;
              this.navigatedUserIndex = 0;
              this.destroyPopup();
            },
            // is called on every keyDown event while a suggestion is active
            onKeyDown: ({ event }) => {
              if (event.key === "ArrowUp") {
                this.upHandler();
                return true;
              }
              if (event.key === "ArrowDown") {
                this.downHandler();
                return true;
              }
              if (event.key === "Enter") {
                this.enterHandler();
                return true;
              }
              return false;
            },
            // is called when a suggestion has changed
            // this function is optional because there is basic filtering built-in
            // you can overwrite it if you prefer your own filtering
            // in this example we use fuse.js with support for fuzzy search
            onFilter: (items, query) => {
              if (!query) {
                return items;
              }
              query = query.split(/[^A-Za-z]/)[0];
              let regex = new RegExp(query, "gi");
              return items.filter((x) => x.name.match(regex));
            },
          }),
          new Code(),
          new Bold(),
          new Italic(),
        ],
        onUpdate: ({ getHTML }) => {
          this.form.template_body = getHTML();
          this.saveOfferLetterSource();
        },
      };

      // this.editor.setOptions(options);
      this.editor = new Editor(options);
      this.showEditor = true;
    },
    // navigate to the previous item
    // if it's the first item, navigate to the last one
    upHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + this.filteredUsers.length - 1) %
        this.filteredUsers.length;
    },
    // navigate to the next item
    // if it's the last item, navigate to the first one
    downHandler() {
      this.navigatedUserIndex =
        (this.navigatedUserIndex + 1) % this.filteredUsers.length;
    },
    enterHandler() {
      const user = this.filteredUsers[this.navigatedUserIndex];
      if (user) {
        this.selectUser(user);
      }
    },
    // we have to replace our suggestion text with a mention
    // so it's important to pass also the position of your suggestion text
    selectUser(user) {
      this.insertMention({
        range: this.suggestionRange,
        attrs: {
          id: user.id,
          label: user.name,
        },
      });
      this.editor.focus();
    },
    // renders a popup with suggestions
    // tiptap provides a virtualNode object for using popper.js (or tippy.js) for popups
    renderPopup(node) {
      if (this.popup) {
        return;
      }
      this.popup = tippy(".page", {
        getReferenceClientRect: node.getBoundingClientRect,
        appendTo: () => document.body,
        interactive: true,
        sticky: true, // make sure position of tippy is updated when content changes
        plugins: [sticky],
        content: this.$refs.suggestions,
        trigger: "mouseenter", // manual
        showOnCreate: true,
        theme: "dark",
        placement: "top-start",
        inertia: true,
        duration: [400, 200],
      });
    },

    destroyPopup() {
      if (this.popup) {
        this.popup = null;
      }
    },

    async saveOfferLetterSource() {
      await this.$store.dispatch("offerLetter/saveOfferLetterSource", {
        data: this.html,
      });
    },
    setForm() {
      this.setEmptyForm();
      this.form.name = this.selectedOfferLetterTemplate.name;
      this.form.description = this.selectedOfferLetterTemplate.description;
      this.form.template_body = this.selectedOfferLetterTemplate.template_body;
      this.editor.setContent(this.form.template_body);
    },
    setEmptyForm() {
      this.form.name = "";
      this.form.description = "";
      this.form.template_body = "";
      this.editor.setContent(this.form.template_body);
    },
    async fetchAuthorizedSignatures() {
      await this.$store.dispatch("company/getCompanyAuthorizationSignatures");
      this.authorizedSignatures = this.getAuthorizedSignatures;
    },
    async submitForm() {
      let params = {
        name: this.form.name,
        description: this.form.description,
        template_body: this.form.template_body,
        type: "OFFER_LETTER",
      };
      if (
        this.selectedOfferLetterTemplate &&
        this.selectedOfferLetterTemplate._id
      ) {
        params.id = this.selectedOfferLetterTemplate._id;
        await this.updateSelecteOfferLetterTemplate(params);
      } else {
        await this.addNewOfferLetterTemplate(params);
      }
    },
    async updateSelecteOfferLetterTemplate(params) {
      await this.$store.dispatch(
        "offerLetter/updateOfferLetterTemplate",
        params
      );

      if (this.getOfferLetterTemplateUpdateStatus) {
        this.$notify.success({
          title: "Success",
          message: "OfferLetter Template updated successfully",
        });
        this.$emit("template-updated");
      }
    },
    async addNewOfferLetterTemplate(params) {
      await this.$store.dispatch("offerLetter/addOfferLetterTemplate", params);
      if (this.getOfferLetterTemplateAddStatus) {
        this.$notify.success({
          title: "Success",
          message: "OfferLetter Template added successfully",
        });
        this.$emit("template-added");
      }
    },
  },
};
</script>

<style scoped lang="scss">
$color-black: #000000;
$color-white: #ffffff;
$color-grey: #dddddd;
.mention {
  background: rgba($color-black, 0.1);
  color: rgba($color-black, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
}
.mention-suggestion {
  color: rgba($color-black, 0.6);
}
.suggestion-list {
  padding: 0.2rem;
  border: 2px solid rgba($color-black, 0.1);
  font-size: 0.8rem;
  font-weight: bold;
  &__no-results {
    padding: 0.2rem 0.5rem;
  }
  &__item {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    &.is-selected,
    &:hover {
      background-color: rgba($color-white, 0.2);
    }
    &.is-empty {
      opacity: 0.5;
    }
  }
}
.tippy-box[data-theme~="dark"] {
  background-color: $color-black;
  padding: 0;
  font-size: 1rem;
  text-align: inherit;
  color: $color-white;
  border-radius: 5px;
}

.menubar {
  background: #e8eaea;
  padding: 10px;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  &.is-hidden {
    visibility: hidden;
    opacity: 0;
  }

  &.is-focused {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &__button {
    font-weight: bold;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000000, 0.05);
    }

    &.is-active {
      background-color: rgba(#000000, 0.1);
    }
  }

  span#{&}__button {
    font-size: 13.3333px;
  }
}

.basic-form {
  margin-top: 10px;
  padding: 10px;
}
.template-editor {
  border: solid 1px #000000;
  border-radius: 4px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
.page {
  min-height: 300px !important;
  .ProseMirror {
    border: none !important;
    outline: none !important;
    min-height: 600px !important;
  }
}
.offer-letter-generator {
  max-width: 90%;
}

.editor {
  position: relative;
  max-width: 200rem;
  margin: 0 auto 5rem auto;

  &__content {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;

    * {
      caret-color: currentColor;
    }

    pre {
      padding: 0.7rem 1rem;
      border-radius: 5px;
      background: $color-black;
      color: $color-white;
      font-size: 0.8rem;
      overflow-x: auto;

      code {
        display: block;
      }
    }

    p code {
      padding: 0.2rem 0.4rem;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      background: rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
    }

    ul,
    ol {
      padding-left: 1rem;
    }

    li > p,
    li > ol,
    li > ul {
      margin: 0;
    }

    a {
      color: inherit;
    }

    blockquote {
      border-left: 3px solid rgba($color-black, 0.1);
      color: rgba($color-black, 0.8);
      padding-left: 0.8rem;
      font-style: italic;

      p {
        margin: 0;
      }
    }

    img {
      max-width: 100%;
      border-radius: 3px;
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid $color-grey;
        padding: 3px 5px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;
        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: 0;
        width: 4px;
        z-index: 20;
        background-color: #adf;
        pointer-events: none;
      }
    }

    .tableWrapper {
      margin: 1em 0;
      overflow-x: auto;
    }

    .resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }
}
</style>