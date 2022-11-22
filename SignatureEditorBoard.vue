<template>
  <div>
    <Editor :canvasWidth="canvasWidth" :canvasHeight="canvasHeight" ref="editor" :editorId="canvasId"></Editor>
    <div>
      <el-button @click="setTextProperty()">Text</el-button>
      <el-button @click="setDrawingProperty()">Drawing</el-button>
      <el-button @click="setDragProperty('selectMode')">Select to Drag</el-button>
      <el-button @click="onClear">Clear</el-button>
      <!-- <el-button @click="onUndo">Undo</el-button> -->
      <el-button @click="onRedo">Redo</el-button>
      <el-button @click="onSave">Save</el-button>
      <el-button
              class="float-right"
              icon="el-icon-refresh-left"
              size="medium"
              plain
              round
              type="danger"
              title="Undo"
              @click="onUndo"
            >Undo</el-button>
            <button type="button" class="color-btn red" @click="setColor('red')"></button>
            <button type="button" class="color-btn black" @click="setColor('black')"></button>
            <button type="button" class="color-btn green" @click="setColor('green')"></button>
    </div>
  </div>
</template>
<script>
import Editor from'vue-image-markup';
export default {
  name:"Global-SignatureEditorBoard",
  components: {
    Editor
  },
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 200,
      canvasId: "signatureBoardD",
      fill: 'black',
      currentSelection: 'text'
    }
  },
  mounted() {
    this.setTextProperty()
  },
  methods: {
    setTextProperty() {
      this.currentSelection = 'text';
      this.$nextTick(() => {
        this.$refs.editor.set('text', {fill: this.fill});
      })
    },
    setDrawingProperty() {
      this.currentSelection = 'freeDrawing';
      this.$nextTick(() => {
        this.$refs.editor.set('freeDrawing', {stroke: this.fill});
      })
    },
    setDragProperty(property) {
      this.currentSelection = property;
      this.$nextTick(() => {
        this.$refs.editor.set(property);
      })
    },
    onClear() {
      this.$nextTick(() => {
        this.$refs.editor.clear();
      })
    },
    onUndo() {
      this.$nextTick(() => {
        this.$refs.editor.undo();
      })
    },
    onRedo() {
      this.$nextTick(() => {
        this.$refs.editor.redo();
      })
    },
    setColor(value) {
      this.fill = value;
      if(this.currentSelection == 'text') {
        this.setTextProperty();
      }
      if(this.currentSelection == 'freeDrawing') {
        this.setDrawingProperty()
      }
    },
    onSave() {
      this.$nextTick(async () => {
        let imgData = await this.$refs.editor.saveImage();
        this.$emit('onSaveSignatureImage', imgData);
      })
    },
  }

}
</script>