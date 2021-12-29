import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/stu_basic_info',
    method: 'get',
    params
  })
}

export function postData(data) {
  return request({
    url: '/stu_basic_info',
    method: 'post',
    data
  })
}
