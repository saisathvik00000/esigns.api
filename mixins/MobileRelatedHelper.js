export default {
  methods: {
    handleResize() {
      // console.log('>>> window.innerHeight, this.getIsMobile', window.innerWidth, this.getIsMobile);
      const isMobile = (window.innerWidth < 992);
      const isRSOpen = (window.innerWidth >= 1200);
      this.$store.commit("navigationOpen/setIsMobile", isMobile, {
        root: true,
      });
      this.$store.commit("navigationOpen/setIsOpen", !isMobile, {
          root: true,
        });
      this.$store.commit("navigationOpen/setIsRSOpen", isRSOpen, {
          root: true,
        });
    },
    openRightSideBar() {
      this.$store.commit("navigationOpen/setIsRSOpen", true, {
          root: true,
        });
    },
    closeRightSideBar() {
      this.$store.commit("navigationOpen/setIsRSOpen", false, {
          root: true,
        });
    },
  }
}