// 设置cookie
export function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  var path = 'path=/'
  // console.info(cname + '=' + cvalue + '; ' + expires)
  document.cookie = cname + '=' + cvalue + ';' + path + ';' + expires + '; '
  // console.info(document.cookie)
}

// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

// 清除cookie
export function clearCookie () {
  this.setCookie('username', '', -1)
}
