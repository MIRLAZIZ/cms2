export default {
  computed: {
    $_getLang() {
      return this.$i18n.locale || 'uz'
    },
  },
}
