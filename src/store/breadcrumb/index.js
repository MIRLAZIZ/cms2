export default {
  namespaced: true,
  state: {
    breadcrumb: [],
    breadcrumb_state: false,
  },
  getters: {
    GET_BREADCRUMB: state => state.breadcrumb,
    GET_BREADCRUMB_STATE: state => state.breadcrumb_state,
  },
  mutations: {
    UPDATE_BREADCRUMB(state, val) {
      state.breadcrumb = val
    },
  },
  actions: {},
}
