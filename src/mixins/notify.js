import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
  data() {
    return {
      _initTimeout: null,
    };
  },

  // уведомления
  methods: {
    async $_okToast(res) {
      let message = res?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Успешно",
            icon: "CheckIcon",
            text: message || "",
            variant: "success",
          },
        },
        {
          position: "top-right",
        }
      );
    },
    async $_errorToast(err) {
      let message = err?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Ошибка",
            icon: "AlertCircleIcon",
            text: message || "",
            variant: "danger",
          },
        },
        {
          position: "top-right",
        }
      );
    },

    async $_UploadToast(res) {
      let message = res?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Сохранение изменений",
            icon: "LoaderIcon",
            variant: "warning"
          },
        },
        {
          id: "upload-toast",
          text: message || "",
          timeout: 3000,
          position: "top-right",
        }
      );
    },

    async $_CancelToast(res) {
      let message = res?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: "Отмена сохранения",
            icon: "TrashIcon",
            variant: "warning"
          },
        },
        {
          id: "upload-toast",
          text: message || "",
          timeout: 3000,
          position: "top-right",
        }
      );
    },

    async $_DeleteToast(res) {
      let message = res?.message;
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            id: "delete-toast",
            title: "Удалено",
            icon: "TrashIcon",
            text: message || "",
            variant: "danger"
          },
        },
        {
          position: "top-right",
        }
      );
    },

    setTimeoutFunc(callBack, arg, timeOut = 400) {
      return new Promise((resolve, reject) => {
        clearTimeout(this._initTimeout);
        this._initTimeout = setTimeout(() => {
          callBack(arg).then(resolve).catch(reject);
        }, timeOut);
      });
    },
  },

  // !уведомления
};
