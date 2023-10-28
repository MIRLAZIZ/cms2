import {
  getPages,
  createPages,
  deleteMaterialInside,
  getPagesId,
  updatePages
} from '@/api/footerPages'

export default {
  CREATE_PAGES(_, data) {
    return createPages(data)
  },


  FETCH_PAGES({ commit }, params) {
    return getPages(params)
      .then(res => {
        commit('SET_PAGES', res.data)
      })
  },

  DELETE_PAGES(_, id) {
    return deleteMaterialInside(id)
  },

  FETCH_PAGES_ID({ commit }, id) {
    return getPagesId(id)
      .then(res => {
        commit('SET_PAGES_ID', res.data)
      })
  },

  UPDATE_PAGES(_, data) {
    return updatePages(data)
  },

}
