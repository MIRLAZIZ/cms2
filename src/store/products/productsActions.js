import {
  getProducts,
  deleteProduct,
  createProduct,
  getOneProduct,
  createTempProduct,
  updateTempProduct,
  getDeliveryInfo,
  createTempDeliverInfo,
  getTempDeliveryInfo,
  deleteTempDeliveryInfo,
  updateTempDeliveryInfo
} from '@/api/products'

export default {
  FETCH_PRODUCTS({ commit }, params) {
    return getProducts(params).then(res => {
      commit('SET_PRODUCTS', res.data)
    })
  },

  FETCH_ONE_PRODUCT({ commit }, id) {
    return getOneProduct(id).then(res => {
      commit('SET_ONE_PRODUCT', res.data)
    })
  },

  CREATE_PRODUCT(_, params) {
    return createProduct(params)
  },

  FETCH_DELIVERY_INFO({ commit }, params) {
    return getDeliveryInfo(params).then(res => {
      commit('SET_DELIVERY_INFO', res.data)
    })
  },

  DELETE_PRODUCT(_, params) {
    return deleteProduct(params)
  },

  //TEMP PRODUCT
  CREATE_TEMP_PRODUCT(_, params) {
    return createTempProduct(params)
  },

  UPDATE_TEMP_PRODUCT(_, params) {
    return updateTempProduct(params)
  },

  //TEMP DELIVERY
  FETCH_TEMP_DELIVERY_INFO({ commit }, params) {
    return getTempDeliveryInfo(params).then(res => {
      commit('SET_TEMP_DELIVERY_INFO', res.data)
    })
  },

  CREATE_TEMP_DELIVERY_INFO(_, params) {
    return createTempDeliverInfo(params)
  },

  DELETE_TEMP_DELIVERY_INFO(_, params) {
    return deleteTempDeliveryInfo(params)
  },

  UPDATE_TEMP_DELIVERY_INFO(_, id) {
    return updateTempDeliveryInfo(id)
  },
}
