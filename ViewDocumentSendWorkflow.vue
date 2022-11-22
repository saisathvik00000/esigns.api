<template>
  <section>
    <div class="flow-top-bar">
      <el-row>
        <el-col :span="1">
          <div class="close-icon mt-1">
            <img
              src="@/assets/img/icons/flow-close-icon.svg"
              @click="gotoUpload"
            />
          </div>
        </el-col>
        <el-col
          :xs="{ offset: 0 }"
          :sm="{ offset: 2 }"
          :md="{ offset: 4 }"
          :lg="{ offset: 7 }"
          :xl="{ offset: 9 }"
        >
          <div>
            <el-steps
              finish-status="success"
              :space="200"
              align-center
              class="document-flow"
            >
              <el-step title="Upload" @click.native="gotoUpload"></el-step>
              <el-step
                title="Recipients"
                @click.native="gotoaddReceipentS"
              ></el-step>
              <el-step title="Prepare" @click.native="gotoPrepare"></el-step>
            </el-steps>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  name:"Global-ViewDocumentSendWorkflow",
  methods: {
    gotoUpload() {
      console.log("upload");
    },
    gotoaddReceipentS() {
      console.log("sdfghj");
    },
    gotoPrepare() {
      console.log("sdfghj");
    },
  },
};
</script>

<style lang="scss" scoped>
.flow-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 1000;
  background: #1b487e;
  color: #ffffff;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
  padding: 5px 10px;
  text-align: center;
}
.close-icon {
  cursor: pointer;
}
</style>