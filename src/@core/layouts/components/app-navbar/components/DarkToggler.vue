<template>
  <b-nav-item @click="skin = isDark ? 'light' : 'dark'">
    <feather-icon
      size="21"
      :icon="`${isDark ? 'Sun' : 'Moon'}Icon`"
    />
  </b-nav-item>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import { computed } from '@vue/composition-api'
import { BNavItem } from 'bootstrap-vue'
import { getUserData , setUserData } from '@/auth/utils'

export default {
  components: {
    BNavItem,
  },
  // setup(props, { root }) {
  //   const { skin } = useAppConfig()
  //   const userData = getUserData()
  //   skin.value = userData?.theme || 'light'
  //   const isDark = computed(() => {
  //     const theme = skin.value === 'dark'
  //       if (!userData) return theme

  //       const user = {
  //         id: userData.id,
  //         theme: skin.value,
  //       }
  //       if (userData.theme !== skin.value) {
  //         root.$store
  //           .dispatch('users/UPDATE_USER_SETTINGS', user)
  //           .then(newUserData => {
  //             setUserData(newUserData)
  //           })
  //       }
  //       return theme
  //   })

  //   return { skin, isDark }
  // },
  setup() {
    const { skin } = useAppConfig()

    const isDark = computed(() => skin.value === 'dark')

    return { skin, isDark }
  },
}
</script>
