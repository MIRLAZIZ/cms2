<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout" :key="this.$store.getters.GET_RE_RENDER_COUNT || 0">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
  // This will be populated in `beforeCreate` hook
  // import '@/assets/scss/fonts.css'
  import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
  import { provideToast } from 'vue-toastification/composition'
  import { watch } from '@vue/composition-api'
  import useAppConfig from '@core/app-config/useAppConfig'
  import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'
  import { localize } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'
  import uz from '@/assets/uz.json'
  // import uz from 'vee-validate/dist/locale/uz'
  import { useWindowSize, useCssVar } from '@vueuse/core'
  import store from '@/store'
  // import { getUserData } from './auth/utils'

  const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
  const LayoutHorizontal = () =>
    import('@/layouts/horizontal/LayoutHorizontal.vue')
  const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

  export default {
    components: {
      // Layouts
      LayoutHorizontal,
      LayoutVertical,
      LayoutFull,
      ScrollToTop,
    },
    // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
    // Currently, router.currentRoute is not reactive and doesn't trigger any change
    computed: {
      layout() {
        if (this.$route.meta.layout === 'full') return 'layout-full'
        return `layout-${this.contentLayoutType}`
      },
      contentLayoutType() {
        return this.$store.state.appConfig.layout.type
      },
    },
    beforeCreate() {
      // Set colors in theme
      const colors = [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'danger',
        'light',
        'dark',
      ]

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = colors.length; i < len; i++) {
        $themeColors[colors[i]] = useCssVar(
          `--${colors[i]}`,
          document.documentElement,
        ).value.trim()
      }

      // Set Theme Breakpoints
      const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = breakpoints.length; i < len; i++) {
        $themeBreakpoints[breakpoints[i]] = Number(
          useCssVar(
            `--breakpoint-${breakpoints[i]}`,
            document.documentElement,
          ).value.slice(0, -2),
        )
      }

      // Set RTL
      const { isRTL } = $themeConfig.layout
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
      localize(this.$i18n.locale, this.$i18n.locale === 'uz' ? uz : ru)
    },
    setup() {
      const { skin, skinClasses } = useAppConfig()
      const { enableScrollToTop } = $themeConfig.layout

      // If skin is dark when initialized => Add class to body
      if (skin.value === 'dark') document.body.classList.add('dark-layout')

      // Provide toast for Composition API usage
      // This for those apps/components which uses composition API
      // Demos will still use Options API for ease
      provideToast({
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        icon: false,
        timeout: 3000,
        transition: 'Vue-Toastification__fade',
      })

      // Set Window Width in store
      store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
      const { width: windowWidth } = useWindowSize()
      watch(windowWidth, val => {
        store.commit('app/UPDATE_WINDOW_WIDTH', val)
      })

      return {
        skinClasses,
        enableScrollToTop,
      }
    },
    //   methods: {
    //       ...mapActions('users', ['UPDATE_USER'])
    //   },
    //   watch: {
    //       '$i18n.locale': {
    //           handler(newValue) {
    //             this.UPDATE_USER({
    //                 id: getUserData().id,
    //                 data: {language: newValue}
    //             })
    //           }
    //       }
    //   }
  }
</script>
<style>

  .dark_layout_datepicker {
    background: #283046 !important;
  }
  .light_layout_datepicker {
    background: #fff !important;
  }
</style>
