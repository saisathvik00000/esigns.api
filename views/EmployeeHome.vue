<template>
  <section class="employee-dashboard-view">
    <el-row>
      <el-col :span="24">
        <EmployeeTopbarDefault @open:sidebar="sidebarOpen"></EmployeeTopbarDefault>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xl="24" :lg="24" :md="24">
        <div :class="!sidebarStatus ? 'canvas' : 'offCanvas'">
          <main class="main-dashboard-view">
            <router-view :layout.sync="layout" />
          </main>
        </div>
      </el-col>
    </el-row>
    <SidebarDefault :open="sidebarStatus"/>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import EmployeeTopbarDefault from "../layouts/EmployeeTopbarDefault";
import SidebarDefault from "../layouts/SidebarDefault";

export default {
  name: "EmployeeHome",
  created() {},
  components: {
    EmployeeTopbarDefault,
    SidebarDefault
  },
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse"])
  },
  data() {
    return {
      layout: "div",
      offCanvas: true,
      sidebarStatus: false,
    };
  },
  methods: {
    sidebarOpen(status) {
      this.sidebarStatus = status
    }
  }
};
</script>

<style lang="scss">
.employee-dashboard-view {
  background: #F8F9FA;
  min-height: 100vh;
  // min-height: calc(100vh - 68px);
  .main-dashboard-view {
    margin-top: 67px;
    padding-top: 30px;
    padding-left: 100px;
    padding-right: 30px;
  }
  .edit-new-template-view {
    // padding-left: 0px;
  }
  .canvas {
    transition: all 0.2s ease-in-out;
  }
  .offCanvas {
    margin-left: 150px;
    transition: all 0.2s ease-in-out;
  }
}
</style>
