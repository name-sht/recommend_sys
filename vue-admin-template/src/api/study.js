import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/study_info',
    method: 'get',
    params
  })
}

export function postData(data) {
  return request({
    url: '/study_info',
    method: 'post',
    data
  })
}
export function getWork(params) {
  return request({
    url: '/experiences_info',
    method: 'get',
    params
  })
}

export function postWork(data) {
  return request({
    url: '/experiences_info',
    method: 'post',
    data
  })
}
