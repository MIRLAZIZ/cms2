export default {
  SET_LIST_APPEAL(state, data) {
    state.listAppeal = data.results
    state.listAppealCount = data.count
  },
  SET_LIST_APPEAL_SIDEBAR(state, data) {
    state.listAppealSidebar = data
  },
  SET_LIST_APPEAL_PROBLEM_TYPE(state, data) {
    state.listAppealProblemType = data.results
  },
  SET_LIST_APPEAL_PRIORITY_FILTER(state, data) {
    state.listAppealPriorityFilter = data.results
  },
  SET_LIST_APPEAL_STATUS_FILTER(state, data) {
    state.listAppealStatusFilter = data
  },
  SET_CHAT_MESSAGE_DATA(state, data) {
    state.listAppealChatMessage = data
  },
  SET_CHAT(state, data) {
    state.chatData = data
  },
  SET_CHAT_UNFINISHED_LIST(state, data) {
    state.chatDataUnfinishedList = data.results
  },
  SET_OPEN_CHAT(state) {
    state.showChat = !state.showChat
  },
  SET_OPEN_CHAT_ICON(state) {
    state.chatIcon = !state.chatIcon
  }
}
