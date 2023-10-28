import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  canNavigate
} from '@/libs/acl/routeProtection'
import {
  isUserLoggedIn
} from '@/auth/utils'

import news from './news'
import products from './products'
import footerPages from './footerPages'
import reference from './reference'
import shopList from './shopList'
import clients from './clients'
import table from './users'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    }
  },
  routes: [
    ...products,
    ...footerPages,
    ...reference,
    ...shopList,
    ...news,
    ...clients,
    ...table,

    {
      path: '/',
      redirect: () => {
        return {
          name: 'news',
        }
      },
      name: 'products',
      component: () => import('@/views/News/index.vue'),
      
    },
    {
      path: '/login/',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'read',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      next('/login')
    } else {
      // If logged in => not authorized
      next({
        name: 'not-authorized'
      })
    }
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next('/')
    // next({ name: userData.profile.home_route ? userData.profile.home_route : 'inspected-objects' })
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router