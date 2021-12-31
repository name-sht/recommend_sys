import request from '@/utils/request'

export function postData(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
