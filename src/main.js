import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'
import theme from './mixins/theme'
import notify from "@/mixins/notify";

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/vue-select'
import '@/libs/acl'


import '@core/scss/vue/libs/quill.scss'

import toasts from '@/mixins/toast'
import areYouSure from '@/mixins/areYouSure'
import getLang from '@/mixins/global'

// Mixins
Vue.mixin(getLang)
Vue.mixin(toasts)
Vue.mixin(areYouSure)
// Миксин тема
Vue.mixin(theme)

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// подключаю миксин уведомлений
Vue.mixin(notify);

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

require('@core/assets/fonts/feather/iconfont.css')
require('@/assets/scss/font.css')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
