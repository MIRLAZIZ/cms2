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
      @click="changeLocale(localeObj.locale)"
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
  import { BNavItemDropdown, BDropdownItem, BImg, JumbotronPlugin} from 'bootstrap-vue'
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
    data() {
      return {
        locales,
       
      }
    },
    // ! Need to move this computed property to comp function once we get to Vue 3
    computed: {
      currentLocale() {
        return locales.find(l => l.locale === this.$i18n.locale)
      },
    },
    methods: {
      ...mapMutations(['SET_RE_RENDER_COUNT']),
      async changeLocale(locale) {
        this.$i18n.locale =locale
        localize(this.$i18n.locale, this.$i18n.locale === 'uz' ? uz : ru)

        // localize(locale, this.$i18n.locale)
        // let userData = getUserData()

        // locale = locale || userData?.language || 'ru'
        // this.$i18n.locale = locale
        // localize(locale, locale === 'uz' ? uz : ru)
        // if (!userData) {
        //   return locale
        // }
        // let user = {
        //   id: userData?.id,
        //   language: locale,
        // }

        // if(userData().language !== this.$i18n.locale) {
        // const newUserData = await this.$store.dispatch(
        //   'users/UPDATE_USER_SETTINGS',
        //   user,
        // )
        // setUserData(newUserData)

        // this.$nextTick(() => {
        //   this.SET_RE_RENDER_COUNT()
        // })

        // this.$root.$children[0].reRenderApp()
        // } else this.$root.$children[0].reRenderApp()
      },
    },
    mounted() {
      let langData =JSON.parse(localStorage.getItem('userDataTemplate'))
      this.$i18n.locale = langData.language
      localize(this.$i18n.locale, this.$i18n.locale === 'uz' ? uz : ru)
    },
    
  }
</script>

<style>
  #dropdown-grouped {
    list-style: none;
  }
</style>
