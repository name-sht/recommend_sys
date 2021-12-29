import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/tea_application',
    method: 'get',
    params: {
      university: params.university,
      major: params.major
    }
  })
}
export function postData(data) {
  return request({
    url: '/tea_admit',
    method: 'post',
    data
  })
}
