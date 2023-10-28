import http from '@/libs/axios'

export function getPages(params) {
  return http({
    url: `/pages/pages/`,
    method: 'get',
    params,
  })
}

export function createPages(data) {
  return http({
    method: 'POST',
    url: '/pages/pages/',
    data,
  })
}

export function deleteMaterialInside(id) {
  return http({
    method: 'DELETE',
    url: `/pages/pages/${id}/`,
  })
}

export function getPagesId(id) {
  return http({
    url: `/pages/pages/${id}`,
    method: 'get',
  })
}

export function updatePages(data) {
  return http({
    url: `/pages/pages/${data.id}`,
    method: 'patch',
    data,
  })
}

