import http from '@/libs/axios'

export function getNews(params) {
    return http({
        url: `/news/news/`,
        method: 'get',
        params
    })
}

export function deleteSecondPhoto(params) {
    return http({
        url: `/news/news/${params}`,
        method: 'patch',
        params
    })
}

export function updateNewsDetail(params) {
    return http({
        url: `/news/news/${params.id}`,
        method: 'patch',
        data: params.data
    })
}

export function deleteNews(id) {
    return http({
        url: `/news/news/${id}/`,
        method: 'delete',
    })
}

export function updateNews(id, data) {
    return http({
        url: `/news/news/${id}/`,
        method: 'put',
        data
    })
}

// detail.vue news
export function getNewsDetailCategory(params) {
    return http({
        url: `/news/news/`,
        method: 'get',
        params,
    })
}

export function getNewsDetailBrand(params) {
    return http({
        url: `/knowledge_base/brands/`,
        method: 'get',
        params,
    })
}

export function getNewsDetailProduct(params) {
    return http({
        url: `/products/products/`,
        method: 'get',
        params,
    })
}

export function createNews(data) {
    return http({
        url: `/news/news/`,
        method: 'post',
        data
    })
}

export function updatenewsDetail(data, id) {
    return http({
        url: `/news/news/${id}`,
        method: 'put',
        data,
    })
}

export function getCategories() {
    return http({
        url: `/knowledge_base/category/`,
        method: 'get',
    })
}

export function getNewsDetailProductId(id) {
    return http({
        url: `/news/news/${id}`,
        method: 'get',
    })
}

export function updateStatusById(id, data) {
    return http({
        url: `/news/news/${data.id}/`,
        method: 'patch',
        data,
    })
}