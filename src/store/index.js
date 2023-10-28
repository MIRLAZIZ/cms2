import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import breadcrumb from './breadcrumb'
import listAppeal from './listAppeal'

import products from './products'
import knowledgeBase from './knowledgeBase'
import lots from './lots'
import news from './news'
import footerPages from './footerPages'
import reference from './reference'
import shopList from './shopList'
import clients from './clients'
import table from './table1'
import users from './users'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reRenderCounter: 0,
  },
  mutations: {
    SET_RE_RENDER_COUNT(state) {
      state.reRenderCounter++
    },
  },
  getters: {
    GET_RE_RENDER_COUNT(state) {
      return state.reRenderCounter
    },
  },
  modules: {
    app,
    appConfig,
    verticalMenu,
    breadcrumb,
    listAppeal,
    products,
    knowledgeBase,
    lots,
    news,
    footerPages,
    reference,
    shopList,
    clients,
    table,
    // yangi
    users

  },
  strict: process.env.DEV,
})
