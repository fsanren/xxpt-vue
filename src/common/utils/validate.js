export function isvalidUsername (str) {
  const validmap = ['admin', 'editor']
  return validmap.indexOf(str.trim()) >= 0
}

export function isvalidCheck (str, str2, callback) {
  if (str !== str2) {
    callback(new Error('两次输入密码不一致,请重新确定'))
  } else {
    callback()
  }
}

/* 合法uri
*/
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母
*/
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母
*/
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
export function validateDigit (rule, str, callback) {
  const reg = /^[0-9/]+$/
  if (!reg.test(str)) {
    callback(new Error('只能输入数字与斜杠!'))
  } else {
    callback()
  }
  return reg.test(str)
}
export function numberValidator (rule, value, callback) {
  if (value < 0 || value > 100) {
    callback(new Error('请输入大于 0 小于 100 的数!'))
  } else {
    callback()
  }
}
/* 大小写字母
*/
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 手机号码
*/
export function isvalidateMobile (rule, value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (value && !reg.test(value)) {
    callback(new Error('请输入正确格式的手机号码!'))
  } else {
    callback()
  }
}

export function validateEmail (rule, value, callback) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value && !reg.test(value)) {
    callback(new Error('请输入有效的邮箱'))
  } else {
    callback()
  }
}

export function validatePassword (rule, value, callback) {
  // 大写字母 小写字母 数字 特殊字符，四种包括三种，长度8~30
  const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/
  if (value && !reg.test(value)) {
    callback(new Error('密码必须由大写、小写字母、数字、特殊字符中的三种符号组成，长度8~30'))
  } else {
    callback()
  }
}
/**
 * 验证经度输入范围在-180-180之间，且小数可5位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLon(rule, value, callback) {
  if (value) {
    value += ''
    if (value.match(/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,15})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/)) {
      callback()
    } else {
      callback(new Error('经度为-180~180,小数限15位!'))
    }
  } else {
    callback()
  }
}
/**
 * 验证纬度输入范围在-180-180之间，且小数可5位
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function checkLat(rule, value, callback) {
  if (value) {
    value += ''
    if (value.match(/^(\-|\+)?([0-8]?\d{1}\.\d{0,15}|90\.0{0,6}|[0-8]?\d{1}|90)$/)) {
      callback()
    } else {
      callback(new Error('纬度为-90~90,小数限15位'))
    }
  } else {
    callback()
  }
}

