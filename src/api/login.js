import request from '@/common/utils/request'

export function login (username, password) {
  return request({
    url: '/glss-api/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
export function getInfo (token) {
  return request({
    url: '/glss-api/user/info',
    method: 'get',
    params: { token }
  })
}

export function getInfoCgzh (token) {
  return request({
    url: '/glss-api/user/infocgzh',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/glss-api/user/logout',
    method: 'post'
  })
}
