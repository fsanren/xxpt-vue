
import { parseTime } from '@/common/utils/index'
export function handleDownload (thiz, config) {
  const dt = parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
  thiz.downloadLoading = true
  import('@/vendor/Export2Excel').then(excel => {
    const data = formatJson(config.filterVal, config.list)
    excel.export_json_to_excel({
      header: config.tHeader,
      data,
      filename: config.fileName + dt,
      autoWidth: config.autoWidth
    })
    thiz.downloadLoading = false
  })
}

function formatJson (filterVal, jsonData) {
  var index = 1
  return jsonData.map(v => filterVal.map(j => {
    if (j === 'index') {
      v[j] = index
      index++
      return v[j]
    }
    return v[j]
  }))
}

