import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/member_info',
    method: 'get',
    params
  })
}

export function postData(data) {
  return request({
    url: '/member_info',
    method: 'post',
    data
  })
}
