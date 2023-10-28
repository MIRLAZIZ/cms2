import {
  getListAppeal,
  getListAppealSidebar,
  getListAppealProbleType,
  getListAppealPriorityFilter,
  getListAppealStatusFilter,
  createChatMessage,
  getChatMessageData,
  UpdateChatDataMessage,
  getChat,
  getChatUnfinishedList,
  updateUserStatus
} from '@/api/listAppeal'

export default {
  FETCH_LIST_APPEAL({ commit }, params) {
    return new Promise((resolve, reject) => {
      getListAppeal(params)
        .then(response => {
          commit('SET_LIST_APPEAL', response.data)
          resolve(response.data)
        })
        .catch(reject)
    })
  },
  FETCH_LIST_APPEAL_SIDEBAR({ commit }, params) {
    return new Promise((resolve, reject) => {
      getListAppealSidebar(params)
        .then(response => {
          commit('SET_LIST_APPEAL_SIDEBAR', response.data)
          resolve(response.data)
        })
        .catch(reject)
    })
  },
  FETCH_LIST_APPEAL_PROBLEM_TYPE({ commit }, params) {
    return new Promise((resolve, reject) => {
      getListAppealProbleType(params)
        .then(response => {
          commit('SET_LIST_APPEAL_PROBLEM_TYPE', response.data)
          resolve(response.data)
        })
        .catch(reject)
    })
  },
  FETCH_LIST_APPEAL_PRIORITY_FILTER({ commit }, params) {
    return new Promise((resolve, reject) => {
      getListAppealPriorityFilter(params)
        .then(response => {
          commit('SET_LIST_APPEAL_PRIORITY_FILTER', response.data)
          resolve(response.data)
        })
        .catch(reject)
    })
  },
  FETCH_LIST_APPEAL_STATUS_FILTER({ commit }, params) {
    return new Promise((resolve, reject) => {
      getListAppealStatusFilter(params)
        .then(response => {
          commit('SET_LIST_APPEAL_STATUS_FILTER', response.data)
          resolve(response.data)
        })
        .catch(reject)
    })
  },
  CREATE_CHAT_MESSAGE({ commit }, data) {
    return new Promise((resolve, reject) => {
      createChatMessage(data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  FETCH_CHAT_MESSAGE_DATA({ commit }, params) {
    return new Promise((resolve, reject) => {
      getChatMessageData(params)
        .then(response => {
          commit('SET_CHAT_MESSAGE_DATA', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  UPDATE_CHAT_MESSAGE_DATA({ commit }, data) {
    return new Promise((resolve, reject) => {
      UpdateChatDataMessage(data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  FETCH_CHAT({ commit }, params) {
    return new Promise((resolve, reject) => {
      getChat(params)
        .then(response => {
          commit('SET_CHAT', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  FETCH_CHAT_UNFINISHED_LIST({ commit }, params) {
    return new Promise((resolve, reject) => {
      getChatUnfinishedList(params)
        .then(response => {
          commit('SET_CHAT_UNFINISHED_LIST', response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  UPDATE_USER_STATUS({ commit }, params) {
    return new Promise((resolve, reject) => {
      updateUserStatus(params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
