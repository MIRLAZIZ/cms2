export default {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },

  SET_BRANDS(state, payload) {
    state.brands = payload
  },
  SET_PRODUCT_TYPE(state, payload) {
    state.product_type = payload
  },

  SET_CHARACTERS(state, payload) {
    state.characters = payload
  },
  SET_CHARACTER_CATEGORY(state, payload) {
    state.character_category = payload
  },

  SET_REGION(state, payload) {
    state.region = payload
  },
  SET_PROVINCE(state, payload) {
    state.province = payload
  },
}
