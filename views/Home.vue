<template>
  <section class="dashboard-view" :class="{ 'mobile': getIsMobile, 'is-open': isCollapse }">
    <el-row>
      <el-col :span="24">
        <TopbarDefault @open:sidebar="sidebarOpen"></TopbarDefault>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xl="24" :lg="24" :md="24">
        <div :class="!getIsOpen ? 'canvas' : 'offCanvas'">
          <main class="main-dashboard-view">
            <router-view :layout.sync="layout" />
          </main>
        </div>
      </el-col>
    </el-row>
    <div class="bg-canvas" v-on:click="closeLeftSideBar()">
    </div>
    <SidebarDefault :open="sidebarStatus" class="left-side-bar" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TopbarDefault from "../layouts/TopbarDefault";
import SidebarDefault from "../layouts/SidebarDefault";
import MobileRelatedHelper from "@/mixins/MobileRelatedHelper";

export default {
  name: "home",
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    // this.$router.listen((newLocation) => {console.log(newLocation);})
    // console.log(this.$route);
    if (this.getIsMobile) {
      this.$store.commit("navigationOpen/setIsOpen", false, {
        root: true,
      });
    }
  },
  components: {
    TopbarDefault,
    SidebarDefault,
  },
  mixins: [MobileRelatedHelper],
  computed: {
    ...mapGetters("navigationOpen", ["getIsOpen", "getIsCollapse", "getIsMobile"]),
    isCollapse: {
      get() {
        return this.getIsOpen;
      },
      set(isCollapse) {
        this.$store.commit("navigationOpen/setIsOpen", isCollapse, {
          root: true,
        });
      },
    },
  },
  data() {
    return {
      layout: "div",
      offCanvas: true,
      sidebarStatus: false,
      windowWidth: 1500,
    };
  },
  methods: {
    sidebarOpen(status) {
      this.sidebarStatus = status;
    },
    closeLeftSideBar() {
      this.$store.commit("navigationOpen/setIsOpen", false, {
          root: true,
        });
    }
  },
};
</script>

<style lang="scss">
.dashboard-view {
  &.mobile {
    &.is-open {
      // padding-left: 100px;
      .bg-canvas {
        display: block;
      }
    }
    .main-dashboard-view {
      padding-left: 30px;
      // padding-right: 30px;
    }
    .left-side-bar {
      position: absolute;
      z-index: 11000;
    }
    .offCanvas {
      margin-left: 0px;
      // background: rgba(0, 0, 0, .025);
    }
    .bg-canvas {
      background: rgba(0, 0, 0, 0.5);
      z-index: 10000;
      width: 100vw;
      height: 100vh;
      position: absolute;
      border: 1px solid red;
      top: 0;
      left: 0;
      display: none;
    }
  }
}
.dashboard-view {
  background: #ffffff;
  min-height: 100vh;
  // min-height: calc(100vh - 68px);
  .main-dashboard-view {
    margin-top: 67px;
    padding-top: 30px;
    padding-left: 100px;
    padding-right: 30px;
  }
  .edit-new-template-view {
    padding-left: 0;
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
