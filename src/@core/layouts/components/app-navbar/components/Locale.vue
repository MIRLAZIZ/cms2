<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <b-img
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      />
      <span class="ml-50 text-body">{{ currentLocale.name }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="$i18n.locale = localeObj.locale"
    >
      <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      />
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
  import { BNavItemDropdown, BDropdownItem, BImg} from 'bootstrap-vue'
  import locales from '@/utils/locales'
  import { getUserData, setUserData } from '@/auth/utils'
  import { mapMutations } from 'vuex'
  import { localize } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'
  import uz from '@/assets/uz.json'
  // import uz from 'vee-validate/dist/locale/uz'

  export default {
    components: {
      BNavItemDropdown,
      BDropdownItem,
      BImg,
    },
    // ! Need to move this computed property to comp function once we get to Vue 3
    computed: {
      currentLocale() {
        let userData = getUserData()
        if (userData?.language) {
          this.$i18n.locale = userData.language
        }
        return locales.find(l => {
          return l.locale === this.$i18n.locale
        })
      },
    },
    methods: {
      ...mapMutations(['SET_RE_RENDER_COUNT']),
      async changeLocale(locale) {
        let userData = getUserData()

        locale = locale || userData?.language || 'ru'
        this.$i18n.locale = locale
        localize(locale, locale === 'uz' ? uz : ru)
        if (!userData) {
          return locale
        }
        let user = {
          id: userData?.id,
          language: locale,
        }

        // if(userData().language !== this.$i18n.locale) {
        const newUserData = await this.$store.dispatch(
          'users/UPDATE_USER_SETTINGS',
          user,
        )
        setUserData(newUserData)

        this.$nextTick(() => {
          this.SET_RE_RENDER_COUNT()
        })

        // this.$root.$children[0].reRenderApp()
        // } else this.$root.$children[0].reRenderApp()
      },
    },
    setup() {
      /* eslint-disable global-require */
      // const locales = [
      //   {
      //     locale: 'en',
      //     img: require('@/assets/images/flags/en.png'),
      //     name: 'English',
      //   },
      //   {
      //     locale: 'fr',
      //     img: require('@/assets/images/flags/fr.png'),
      //     name: 'French',
      //   },
      //   {
      //     locale: 'de',
      //     img: require('@/assets/images/flags/de.png'),
      //     name: 'German',
      //   },
      //   {
      //     locale: 'pt',
      //     img: require('@/assets/images/flags/pt.png'),
      //     name: 'Portuguese',
      //   },
      // ]
      /* eslint-disable global-require */

      return {
        locales,
      }
    },
  }
</script>

<style>
  #dropdown-grouped {
    list-style: none;
  }
</style>
