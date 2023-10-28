import http from '../libs/axios'

export function getTable(data) {
    return http({
        url: '/news/news/',
        method: 'GET',
        data
    })
}