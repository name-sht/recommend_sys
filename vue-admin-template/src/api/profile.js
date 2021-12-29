import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/profile_info',
    method: 'get',
    params
  })
}

export function postData(data) {
  return request({
    url: '/profile_info',
    method: 'post',
    data
  })
}
