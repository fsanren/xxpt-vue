import request from '@/common/utils/request'

export function getList (params) {
  return request({
    url: '/glss-api/table/list',
    method: 'get',
    params
  })
}
