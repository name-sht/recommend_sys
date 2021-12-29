import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/load_image',
    method: 'get',
    params
  })
}

export function postData(data) {
  return request({
    url: '/upload_image',
    method: 'post',
    data
  })
}
