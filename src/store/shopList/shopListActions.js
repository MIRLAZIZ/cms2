import {
  getShopList,
  getOneShopList,
  getOneShopListPhotos,
  createShopList,
  editShopList,
  deleteShopList,
  deleteSecondPhoto,
  createSecondPhoto,
  getShopRegion,
  getOneShopRegion,
} from '../../api/shopList'

export default {
  async FETCH_SHOP_LIST({ commit }, params) {
    return new Promise((resolve, reject) => {
      getShopList(params)
        .then(res => {
          commit('SET_SHOP_LIST', res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  async FETCH_SHOP_REGION({ commit }, params) {
    return new Promise((resolve, reject) => {
      getShopRegion(params)
        .then(res => {
          commit('SET_SHOP_REGION', res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  async FETCH_ONE_SHOP_LIST({ commit }, id) {
    return new Promise((resolve, reject) => {
      getOneShopList(id)
        .then(res => {
          commit('SET_ONE_SHOP_LIST', res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  async FETCH_ONE_SHOP_REGION({ commit }, id) {
    return new Promise((resolve, reject) => {
      getOneShopRegion(id)
        .then(res => {
          commit('SET_ONE_SHOP_REGION', res.data)
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  async FETCH_ONE_SHOP_LIST_PHOTOS({ commit }, id) {
    return getOneShopListPhotos(id)
  },
  async ADD_SHOP_LIST({}, params) {
    return createShopList(params)
  },
  async EDIT_SHOP_LIST({}, params) {
    return editShopList(params)
  },
  async DELETE_SHOP_LIST({}, params) {
    return deleteShopList(params)
  },
  async DELETE_SECOND_PHOTO({ commit }, id) {
    return deleteSecondPhoto(id)
  },
  async ADD_SECOND_PHOTO({}, params) {
    return createSecondPhoto(params)
  },
}
