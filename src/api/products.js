import http from '@/libs/axios'

export function getProducts(params) {
  return http({
    url: `/products/products/`,
    method: 'get',
    params,
  })
}

export function getOneProduct(id) {
  return http({
    url: `/products/products/${id}/`,
    method: 'get',
  })
}

export function createProduct(params) {
  return http({
    url: `/products/products/`,
    method: 'post',
    data: params,
  })
}

export function updateProduct({ id, data }) {
  return http({
    url: `/products/products/${id}`,
    method: 'patch',
    data: data,
  })
}

export function deleteProduct(id) {
  return http({
    url: `/products/products/${id}/`,
    method: 'delete',
  })
}

export function createDeliverInfo(params) {
  return http({
    url: `/products/delivery_info/`,
    method: 'post',
    data: params,
  })
}

//TEMP PRODUCT
export function createTempProduct(params) {
  return http({
    url: `/products/temp_products/`,
    method: 'post',
    data: params,
  })
}

export function updateTempProduct({ id, data }) {
  return http({
    url: `/products/temp_products/${id}`,
    method: 'patch',
    data: data,
  })
}


//TEMP DELIVERY

export function getTempDeliveryInfo(params) {
  return http({
    url: `/products/temp_delivery_info/`,
    method: 'get',
    params,
  })
}

export function createTempDeliverInfo(params) {
  return http({
    url: `/products/temp_delivery_info/`,
    method: 'post',
    data: params,
  })
}

export function updateTempDeliveryInfo(data) {
  return http({
    url: `/products/temp_delivery_info/${data.id}/`,
    method: 'patch',
    data: data,
  })
}

export function deleteTempDeliveryInfo(id) {
  return http({
    url: `/products/temp_delivery_info/${id}/`,
    method: 'delete',
  })
}
