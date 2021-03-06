export { parseTime, formatTime } from '@/common/utils'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

// 数字 格式化
export function nFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @param val
 * @param type 1:(列表)'--', 2:(详情)'无'
 * @returns val
 */
export function fillNull(val, type = 1) {
  if (type === 1) {
    return val || ''
  } else if (type === 2) {
    return val || ''
  } else {
    return val
  }
}

/**
 * @param index
 * @param page
 * @param limit
 * @param flag 序号是否按页计算
 * @returns {*}
 */
export function indexFmt(index, page, limit, flag = true) {
  if (flag) {
    return index + ((page - 1) * limit + 1)
  } else {
    return index + 1
  }
}

