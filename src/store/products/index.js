import state from './productsState'
import actions from './productsActions'
import getters from './productsGetters'
import mutations from './productsMutations'

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
