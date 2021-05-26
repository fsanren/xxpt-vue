/* eslint-disable */

String.prototype.startWith = function (str) {
  let reg = new RegExp('^' + str)
  return reg.test(this)
}

String.prototype.endWith = function (str) {
  let reg = new RegExp(str + '$')
  return reg.test(this)
}
