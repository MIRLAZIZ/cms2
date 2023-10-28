export default {
  computed: {
    $_theme_layout() {
      return this.$store.state.appConfig.layout.skin      
    },
  },
}
