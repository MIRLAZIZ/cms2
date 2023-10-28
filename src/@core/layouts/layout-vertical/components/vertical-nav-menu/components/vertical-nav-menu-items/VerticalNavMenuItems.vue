<template>
  <ul>
    <template v-for="item in items">
        <!-- v-if="checkPerm(item)" -->
        
      <component
        :is="resolveNavItemComponent(item)"
        :key="item.header || item.title"
        :item="item"
      />
    </template>
  </ul>
</template>

<script>
  import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
  import { provide, ref } from '@vue/composition-api'
  import VerticalNavMenuHeader from '../vertical-nav-menu-header'
  import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
  import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'
  import { getUserData } from '@/auth/utils'
  export default {
    components: {
      VerticalNavMenuHeader,
      VerticalNavMenuLink,
      VerticalNavMenuGroup,
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    setup() {
      provide('openGroups', ref([]))

      return {
        resolveNavItemComponent,
      }
    },
    methods: {
      checkPerm(item = {}) {
        let useData = getUserData()
        if ((useData && useData.is_superuser) || !item.permission) {
          return true
        }
        for (let i = 0; i < item.permission.length; i++) {
          const element = item.permission[i]
          if (element === 'home_all' || useData.permission.includes(element)) {
            return true
          }
        }
        return false
      },
    },
  }

  // 0: "adminstrator"
  // 1: "operator"
  // 2: "executer"
  // 3: "manager"
</script>
