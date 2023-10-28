export default {
  SET_PRODUCTS(state, payload) {
    state.products = payload
  },
  SET_ONE_PRODUCT(state, payload) {
    state.product = payload
  },

  SET_TEMP_PRODUCT(state, payload) {
    state.temp_product = payload
  },

  SET_TEMP_DELIVERY_INFO(state, payload) {
    state.temp_delivery_info = payload
  },
}
