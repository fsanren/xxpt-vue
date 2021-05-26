<template>
  <div class="vm-panel">
    <div :id="this.id" class="panel-body" :style="{ width: width, height: height + 'px'}" />
  </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts'
import { EleResize } from '@/common/utils/esresize'

export default {
  name: 'VmChartPie',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    // 图表区域高度
    height: {
      type: Number,
      default: 412
    },
    // 图表形状颜色, ecahrts依次选择颜色渲染
    color: {
      type: Array,
      default: function () {
        return ['rgba(60, 144, 247, 1)', 'rgba(85, 191, 192, 1)', 'rgba(94, 190, 103, 1)', 'rgba(244, 205, 73, 1)', 'rgba(224, 86, 103, 1)']
      }
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: '#fff'
    },
    xData: {
      type: Array,
      required: true
    },
    yData: {
      type: Array,
      required: true
    },
    inputTotal: {
      type: Number,
      default: null
    },
    titleX: {
      type: String,
      default: '25%'
    },
    centerText: {
      type: String,
      default: '总超限车辆数'
    },
    unitText: {
      type: String,
      default: '数量/辆'
    },
    tooltipUnit: {
      type: String,
      default: '辆'
    }
  },
  data: function () {
    return {
      chart: null
    }
  },
  computed: {
    // 生成一个随机id, 实现图表组件的复用
    id: function () {
      return parseInt(Math.random() * 1000000)
    }
  },
  watch: {
    xData: function () {
      this.renderChart()
    },
    yData: function () {
      this.renderChart()
    }
  },
  mounted: function () {
    this.renderChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    formatNumber(num) {
      let reg = /(?=(\B)(\d{3})+$)/g
      return num.toString().replace(reg, ',')
    },
    renderChart: function () {
      /* if (this.chart) {
        this.chart.dispose()
      } */
      // 初始化echart
      let vm = this
      this.chart = echarts.init(document.getElementById(this.id))
      let resizeDiv = document.getElementById(this.id)
      let total = vm.inputTotal || vm.yData.reduce((a, b) => {
        return a + b.value * 1
      }, 0)
      // 自定义eChart样式 官方配置指南(http://echarts.baidu.com/option.html#yAxis.splitLine.lineStyle.color)
      this.chart.setOption({
        backgroundColor: 'rgba(255,255,255,1)',
        color: this.color,
        tooltip: {
          show: true,
          formatter: function (params) {
            return params.marker + params.name + '：' + vm.formatNumber(params.value) + vm.tooltipUnit
          }
        },
        legend: {
          data: this.xData,
          orient: 'vertical',
          left: '58%',
          y: 'center',
          icon: 'circle',
          itemHeight: 8, // 修改icon图形大小
          formatter: function(name) {
            let data = vm.yData
            let total = 0
            let target
            let arr = []
            for (let i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
            if (total === 0) {
              arr = ['{a|' + name + '  |  ' + '0.00%' + '}{b|' + vm.formatNumber(target) + '}']
            } else {
              arr = ['{a|' + name + '  |  ' + ((target / total) * 100).toFixed(2) + '%' + '}{b|' + vm.formatNumber(target) + '}']
              // '{a|' + name + '}{b|' + ((target / total) * 100).toFixed(2) + '%}{c|' + target + '}'
            }

            return arr.join('\n')
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                height: 40,
                width: 170
              },
              b: {
                fontSize: 14
              }
            }
          }
        },
        title: [{
          text: vm.unitText,
          textStyle: {
            color: 'rgba(80, 80, 80, 0.8)',
            fontSize: 12
          },
          padding: [20, 0, 0, 25]
        }],
        series: [{
          type: 'pie',
          clockwise: false,
          minAngle: 2,
          radius: ['40%', '60%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              formatter: '{name|' + vm.centerText + '}\n{val|' + vm.formatNumber(total) + '}',
              rich: {
                name: {
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: '#666666',
                  align: 'center',
                  verticalAlign: 'middle',
                  padding: [10, 0]
                },
                val: {
                  fontSize: 20,
                  fontWeight: 'bold',
                  align: 'center',
                  verticalAlign: 'middle',
                  color: '#333333'
                }
              }
            }
          },
          animationEasing: 'cubicInOut',
          animationDuration: 2000,
          data: this.yData
        }]
      })
      const listener = function () {
        vm.chart.resize()
      }
      EleResize.on(resizeDiv, listener)
    }
  }
}
</script>

