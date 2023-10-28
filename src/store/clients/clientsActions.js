import {
  getClientsList,
} from '../../api/clients'

export default {
  async FETCH_CLIENTS_LIST({commit}, params) {
    return new Promise((resolve,reject) => {
      getClientsList(params)
      .then(res => {
        commit('SET_CLIENTS_LIST', res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}