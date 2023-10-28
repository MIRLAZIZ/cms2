import {
  getNews,
  deleteNews,
  getNewsDetailCategory,
  getNewsDetailBrand,
  getNewsDetailProduct,
  createNews,
  getNewsDetailProductId,
  updateNewsDetail,
  getCategories,
  updateStatusById,
  deleteSecondPhoto,
} from '@/api/news'

export default {
  FETCH_NEWS({
    commit
  }, params) {

    return getNews(params).then(res => {
      commit('SET_NEWS', res.data)
    })
  },

  DELETE_SECOND_PHOTO({
    commit
  }, params) {
    return deleteSecondPhoto(params).then(res => {
      commit('SET_SECOND_PHOTO', res.data)
    })
  },

  DELETE_NEWS(_, params) {
    return deleteNews(params)
  },

  // detail.vue Newss
  FETCH_NEWS_DETAIL_CATEGORY({
    commit
  }, params) {
    return getNewsDetailCategory(params)
      .then(res => {
        commit('SET_NEWS_DETAIL_CATEGORY', res.data)
      })
  },

  FETCH_NEWS_DETAIL_BRAND({
    commit
  }, params) {
    return getNewsDetailBrand(params)
      .then(res => {
        commit('SET_NEWS_DETAIL_BRAND', res.data)
      })
  },

  FETCH_NEWS_DETAIL_PRODUCT({
    commit
  }, params) {
    return getNewsDetailProduct(params)
      .then(res => {
        commit('SET_NEWS_DETAIL_PRODUCT', res.data)
      })
  },

  CREATE_NEWS(_, data) {
    return createNews(data)
  },

  FETCH_NEWS_DETAIL_PRODUCT_ID({
    commit
  }, id) {
    return getNewsDetailProductId(id)
      .then(res => {
        commit('SET_NEWS_DETAIL_PRODUCT_ID', res.data)
      })
  },

  UPDATE_NEWS({}, params) {
    return updateNewsDetail(params)
  },


  FETCH_CATEGORIES({
    commit
  }) {
    return getCategories().then(res => {
      commit('SET_CATEGORIES', res.data)
    })
  },

  FETCH_NEWS_BY_ID({
    commit
  }, id) {
    return getNewsDetailProductId(id)
      .then(res => {
        commit('SET_NEWS_DETAIL_PRODUCT_ID', res.data)
        return res.data
      })
  },

  CHANGE_STATUS_BY_ID({
    commit
  }, id) {
    return updateStatusById({
        status: 1
      }, id)
      .then(res => {
        commit('SET_NEWS_DETAIL_PRODUCT_ID', res.data)
      })
  }
}