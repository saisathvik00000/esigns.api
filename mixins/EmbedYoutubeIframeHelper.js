export default {
  data() {
      return {
      }
  },
  computed: {},
  methods: {
    getYoutubeIframe(url) {
      let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      let match = url.match(regExp);
      if (match && match[2].length == 11) {
        return '//www.youtube.com/embed/'+match[2]+'';
      } else {
          return '';
      }
    }
  }
}