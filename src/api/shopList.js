import http from '@/libs/axios';

export function getShopList(params) {
  return http({
    url: '/market/market/',
    method: 'get',
    params,
  });
}
export function getOneShopList(id) {
  return http({
    url: `/market/market/${id}/`,
    method: 'get',
  });
}
export function getOneShopListPhotos(id) {
  return http({
    url: `/market/market/${id}/get_second_photo/`,
    method: 'get',
  });
}

export function createShopList(data) {
  return http({
    url: '/market/market/',
    method: 'post',
    data,
  });
}

export function editShopList(data) {
  return http({
    url: `/market/market/${data.get('id')}/`,
    method: 'patch',
    data,
  });
}

export function deleteShopList(data) {
  return http({
    url: `/market/market/${data.id}/`,
    method: 'delete',
    data,
  });
}

export function deleteSecondPhoto(id) {
  return http({
    url: `/market/image/${id}/`,
    method: 'delete',
  });
}
export function createSecondPhoto(data) {
  return http({
    url: '/market/image/',
    method: 'post',
    data,
  });
}

export function getShopRegion(params) {
  return http({
    url: '/market/region/',
    method: 'get',
    params,
  });
}

export function getOneShopRegion(id) {
  return http({
    url: `/market/region/${id}`,
    method: 'get',
  });
}
