import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/agreement',
    method: 'get',
    params: {
      username: params
    }
  })
}

export function postData(data) {
  return request({
    url: '/agreement',
    method: 'post',
    data
  })
}
