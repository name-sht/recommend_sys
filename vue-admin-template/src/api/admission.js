import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/stu_application',
    method: 'get',
    params: {
      username: params
    }
  })
}

export function postData(data) {
  return request({
    url: '/stu_confirm',
    method: 'post',
    data
  })
}
