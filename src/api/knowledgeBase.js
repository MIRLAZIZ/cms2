import http from '@/libs/axios'

export function getCategories(params) {
  return http({
    url: `/knowledge_base/category/`,
    method: 'get',
    params,
  })
}


export function getBrands(params) {
  return http({
    url: `/knowledge_base/brands/`,
    method: 'get',
    params,
  })
}



export function getProductType(params) {
  return http({
    url: `/knowledge_base/product_type/`,
    method: 'get',
    params,
  })
}

export function getCharacters(params) {
  return http({
    url: `/knowledge_base/characters/`,
    method: 'get',
    params,
  })
}


export function getCharacterCategory(params) {
  return http({
    url: `/knowledge_base/character-category/`,
    method: 'get',
    params,
  })
}

export function getProvince(params) {
  return http({
    url: `/knowledge_base/province/`,
    method: 'get',
    params,
  })

}

export function getRegion(params) {
  return http({
    url: `/knowledge_base/region/`,
    method: 'get',
    params,
  })
}