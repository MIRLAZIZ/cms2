import http from '@/libs/axios'

export function getListAppeal(params) {
  return http({
    url: `/sla/feedback/`,
    method: 'get',
    params,
  })
}

export function getListAppealSidebar(id) {
  return http({
    url: `/sla/feedback/${id}/`,
    method: 'get',
  })
}

export function getListAppealProbleType(params) {
  return http({
    url: `/sla/problem_type/short_list/`,
    method: 'get',
    params,
  })
}

export function getListAppealPriorityFilter(params) {
  return http({
    url: `/sla/feedback_priority/short_list/`,
    method: 'get',
    params,
  })
}

export function getListAppealStatusFilter(params) {
  return http({
    url: `/sla/status/`,
    method: 'get',
    params,
  })
}

export function createChatMessage(data) {
  return http({
    url: '/sla/feedback',
    method: 'post',
    data,
  })
}

export function getChatMessageData(params) {
  return http({
    url: `/sla/feedback/`,
    method: 'get',
    params,
  })
}

export function UpdateChatDataMessage(data) {
  return http({
    url: `/sla/feedback/${data.get('id')}/`,
    method: 'patch',
    data,
  })
}

export function getChat(params) {
  return http({
    url: `/sla/feedback/get_last_feedback/`,
    method: 'get',
    params,
  })
}

export function getChatUnfinishedList(params) {
  return http({
    url: `/sla/feedback/unfinished_feedbacks/`,
    method: 'get',
    params,
  })
}

export function updateUserStatus(data) {
  return http({
    url: `/users/profile/`,
    method: 'patch',
    data,
  })
}
