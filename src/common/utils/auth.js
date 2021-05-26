import Cookies from 'js-cookie'
import axios from 'axios'

const TokenKey = 'Admin-Token'
/* eslint-disable */
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function changeToken() {
  axios({
    url: process.env.VUE_APP_BASE_CODE + '/login/loginAccount',
    method: 'get'
  }).then((res) => {
    if (res.data.code === 200) {
      setToken(res.data.result.token)
      resolve()
    }
  })
}
