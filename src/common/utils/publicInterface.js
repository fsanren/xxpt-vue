export function changeWebappName (val) {
  var name = ''
  switch (val) {
    case '01': name = '元数据'
      break
    case '02': name = '数据质量'
      break
    case '03': name = '数据监测'
      break
    case '04': name = '任务调度'
      break
    case '05': name = '共享交换'
      break
    case '06': name = '查询分析'
      break
    case '07': name = '综合可视化'
      break
    default: name = '其它'
  }
  return name
}
export const webappNameOptions = [
  { id: '01', name: '元数据' },
  { id: '02', name: '数据质量' },
  { id: '03', name: '数据监测' },
  { id: '04', name: '任务调度' },
  { id: '05', name: '共享交换' },
  { id: '06', name: '查询分析' },
  { id: '07', name: '综合可视化' }
]
export const operateType = [
  { 'id': '1', 'product_inf': '登录' },
  { 'id': '2', 'product_inf': '注销' },
  { 'id': '3', 'product_inf': '添加' },
  { 'id': '4', 'product_inf': '删除' },
  { 'id': '5', 'product_inf': '修改' },
  { 'id': '6', 'product_inf': '查询' }
]

