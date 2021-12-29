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
    url: '/stu_application',
    method: 'post',
    data
  })
}

export function putData(data) {
  return request({
    url: '/stu_application',
    method: 'put',
    data
  })
}
export function deleteData(data) {
  return request({
    url: '/stu_application',
    method: 'delete',
    data
  })
}
