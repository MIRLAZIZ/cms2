import http from '@/libs/axios'

export function getLots(params) {
  return http({
    url: `/lots/lots/`,
    method: 'get',
    params,
  })
}

export function deleteLot(id) {
  return http({
    url: `/lots/lots/${id}/`,
    method: 'delete',
  })
}

// detail.vue lots
export function getLotsDetailCategory(params) {
  return http({
    url: `/knowledge_base/categories/`,
    method: 'get',
    params,
  })
}

export function getLotsDetailBrand(params) {
  return http({
    url: `/knowledge_base/brands/`,
    method: 'get',
    params,
  })
}

export function getLotsDetailProduct(params) {
  return http({
    url: `/products/products/`,
    method: 'get',
    params,
  })
}

export function createLot(data) {
  return http({
    method: 'POST',
    url: '/lots/lots/',
    data,
  })
}

export function getLotsDetailProductId(id) {
  return http({
    url: `/lots/lots/${id}`,
    method: 'get',
  })
}

export function updateLotsDetail(data) {
  return http({
    url: `/lots/lots/${data.id}`,
    method: 'PATCH',
    data,
  })
}
