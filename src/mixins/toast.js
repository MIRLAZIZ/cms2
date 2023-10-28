import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  methods: {
    $_successToast(text = 'Успешно!') {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: text,
          icon: 'CheckSquareIcon',
          variant: 'success',
        },
      })
    },
    $_errorToast(text = 'Ошибка!') {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: text,
          icon: 'AlertCircleIcon',
          variant: 'danger',
        },
      })
    },
  },
}
