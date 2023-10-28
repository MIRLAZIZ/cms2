import {
  getCategories,
  getBrands,
  getProductType,
  getCharacters,
  getCharacterCategory,
  getProvince,
  getRegion
  
} from '@/api/knowledgeBase'

export default {
  FETCH_CATEGORIES({ commit }, params) {
    return getCategories(params).then(res => {
      commit('SET_CATEGORIES', res.data)
    })
  },

  FETCH_BRANDS({ commit }, params) {
    return getBrands(params).then(res => {
      commit('SET_BRANDS', res.data)
    })
  },

  FETCH_PRODUCT_TYPE({ commit }, params) {
    return getProductType(params).then(res => {
      commit('SET_PRODUCT_TYPE', res.data)
    })
  },

  FETCH_CHARACTERS({ commit }, params) {
    return getCharacters(params).then(res => {
      commit('SET_CHARACTERS', res.data)
    })
  },

  FETCH_CHARACTER_CATEGORY({ commit }, params) {
    return getCharacterCategory(params).then(res => {
      commit('SET_CHARACTER_CATEGORY', res.data)
    })
  },

  FETCH_PROVINCE({ commit }, params) {
    return getProvince(params).then(res => {
      commit('SET_PROVINCE', res.data)
    })
  },

  FETCH_REGION({ commit }, params) {
    return getRegion(params).then(res => {
      commit('SET_REGION', res.data)
    })
  },
}
