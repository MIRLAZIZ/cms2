export default {
  SET_NEWS(state, payload) {
    state.news = payload
  },
  // detail.vue news
  SET_NEWS_DETAIL_CATEGORY(state, data) {
    state.newsDetailCategory = data
  },
  SET_NEWS_DETAIL_BRAND(state, data) {
    state.newsDetailBrand = data
  },
  SET_NEWS_DETAIL_PRODUCT(state, data) {
    state.newsDetailProduct = data
  },
  SET_NEWS_DETAIL_PRODUCT_ID(state, data) {
    state.new_by_id = data
  },
  SET_NEWS_DETAIL_ID(state, data) {
    state.newsDetailId = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_NEWS_DETAIL_PRODUCT_ID(state, data) {
    state.status_by_id = data
  }
}