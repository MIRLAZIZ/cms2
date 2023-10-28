export default {
  methods: {
    $_showAreYouSureModal() {
      return this.$bvModal.msgBoxConfirm(this.$t('client.delete'), {
        title: this.$t('client.please_confirm'),
        okVariant: 'danger',
        okTitle: this.$t('general.yes'),
        cancelTitle: this.$t('general.no'),
        hideHeaderClose: false,
        centered: true,
      })
    },
  },
}
