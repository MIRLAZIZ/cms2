import {
  getLots,
  deleteLot,
  getLotsDetailCategory,
  getLotsDetailBrand,
  getLotsDetailProduct,
  createLot,
  getLotsDetailProductId,
  updateLotsDetail
} from '@/api/lots'

export default {
  FETCH_LOTS({ commit }, params) {
    return getLots(params).then(res => {
      commit('SET_LOTS', res.data)
    })
  },

  DELETE_LOT(_, params) {
    return deleteLot(params)
  },

  // detail.vue lots
  FETCH_LOTS_DETAIL_CATEGORY({ commit }, params) {
    return getLotsDetailCategory(params)
      .then(res => {
        commit('SET_LOTS_DETAIL_CATEGORY', res.data)
      })
  },

  FETCH_LOTS_DETAIL_BRAND({ commit }, params) {
    return getLotsDetailBrand(params)
      .then(res => {
        commit('SET_LOTS_DETAIL_BRAND', res.data)
      })
  },

  FETCH_LOTS_DETAIL_PRODUCT({ commit }, params) {
    return getLotsDetailProduct(params)
      .then(res => {
        commit('SET_LOTS_DETAIL_PRODUCT', res.data)
      })
  },

  CREATE_LOT(_, data) {
    return createLot(data)
  },

  FETCH_LOTS_DETAIL_PRODUCT_ID({ commit }, id) {
    return getLotsDetailProductId(id)
      .then(res => {
        commit('SET_LOTS_DETAIL_PRODUCT_ID', res.data)
      })
  },

  UPDATE_NEWS_DRAFT(_, data) {
    return updateNewsDetail(data)
  },

  UPDATE_LOTS_DETAIL_PRODUCT_ID(_, data) {
    return updateNewsDetail(data)
  },
}
