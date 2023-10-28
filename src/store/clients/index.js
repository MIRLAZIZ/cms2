import state from './clientsState'
import getters from './clientsGetters'
import actions from './clientsActions'
import mutations from './clientsMutations'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}