<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <app-breadcrumb class="flex-grow-1" />
      <div class="nav">
        <locale :locales="langs.locales" />
      </div>
    
      <dark-toggler class="d-none d-lg-block" />
    </div>

    <!-- <feather-icon
      v-if="chatIcon"
      :class="showChat ? 'text-secondary' : 'text-primary'"
      icon="MessageSquareIcon"
      size="20"
      style="cursor: pointer"
      @click="openChat"
    /> -->

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ getUserFullname }}
            </p>
            <span class="user-status">{{ getUserRole }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            badge
            class="badge-minimal"
            badge-variant="success"
          />
          <!-- :src="getUserPhoto" -->
        </template>

        <!-- <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="showProfile"
        >
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>{{ $t('general.profile') }}</span>
        </b-dropdown-item> -->

        <!-- <b-dropdown-divider /> -->

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>{{ $t('general.exit') }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
  import {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  } from 'bootstrap-vue'
  import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
  import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
  import Locale from '@core/layouts/components/app-navbar/components/Locale.vue'
  import localeLangs from '@/utils/locales'
  import useJwt from '@/auth/jwt/useJwt'
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
  import BP from '../../../axios.config'

  export default {
    components: {
      BLink,
      BNavbarNav,
      BNavItemDropdown,
      BDropdownItem,
      BDropdownDivider,
      BAvatar,
      AppBreadcrumb,

      DarkToggler,
      Locale,
    },
    props: {
      toggleVerticalMenuActive: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        langs: localeLangs,
      }
    },
    computed: {
      getUserFullname() {
        const userData = useJwt.getUserData()

        return userData.first_name
      },
      getUserRole() {
        const data = useJwt.getUserData()
        return data.type
      },
      getUserPhoto() {
        const { photo } = useJwt.getUserData()
        return BP.backendPath + photo || ''
      },
    },
    methods: {
      ...mapMutations('peal', ['SET_OPEN_CHAT']),
      logout() {
        useJwt.logout()
      },
      showProfile() {
        this.$router.push(`/users/edit/${useJwt.getUserData().id}`)
      },
      openChat() {
        this.SET_OPEN_CHAT()
      },
    },
  }
</script>

