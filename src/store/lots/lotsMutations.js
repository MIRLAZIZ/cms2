export default {
  SET_LOTS(state, payload) {
    state.lots = payload
  },
  // detail.vue lots
  SET_LOTS_DETAIL_CATEGORY(state, data) {
    state.lotsDetailCategory = data
  },
  SET_LOTS_DETAIL_BRAND(state, data) {
    state.lotsDetailBrand = data
  },
  SET_LOTS_DETAIL_PRODUCT(state, data) {
    state.lotsDetailProduct = data
  },
  SET_LOTS_DETAIL_PRODUCT_ID(state,data){
    state.lotsDetailProductId = data
  }
}
