<template>

  <div id="mapC" :style="{width: width, height: height}" />
</template>

<script>
import pointIcon from '../Map/img/map_dw.png'

export default {
  props: {
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '250px'
    },
    markerPoint: {
      type: Object,
      default: { lon: '', lat: '' }
    },
    disableEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      markerPoint: this.marker_point
    }
  },
  mounted () {
    this.initMap()
    if (this.markerPoint.lon && this.markerPoint.lat) {
      this.mapClickEvent(this.markerPoint.lon, this.markerPoint.lat)
    }
  },
  methods: {
    initMap () {
      const _this = this
      const bozhouPoint = ['115.77469816373979', '33.841223974685576']// 默认亳州坐标
      /* eslint-disable */
        this.map = new WMap.Map('mapC', {
          minZoom: 8,
          zoom: 20,  // 设置地图显示的缩放级别
          city: 'bozhou', // 内网环境下需要设置城市，目前包括xiamen、bozhou、zhengzhou、quanzhou、guilin，默认是xiamen
          center: bozhouPoint, // 设置地图中心点坐标
          mapName: 'tiandi',  // 设置地图类型，tiandi表示天地图
          mapSource: 'offLine'  // onLine在线，offLine离线（虚拟桌面内网）
        })
        // 创建图层
        this.GPSLayer = new WMap.Layer()
        // 设置图层id
        this.GPSLayer.set('id', 'gpsLayer')
        // 添加图层
        this.map.addLayer(this.GPSLayer)
        this.map.on('click', function (data) {
          if (_this.disableEdit !== true) {
            _this.mapClickEvent(data.coordinate[0], data.coordinate[1])
          }
        })
      },
      addMarker1 (lon, lat) {
        let marker = new WMap.Marker({
          position: [lon, lat],//标注位置
          icon: pointIcon//标注图标，默认半径为5像素的蓝色圆圈
        })
        this.GPSLayer.addFeature(marker)
      },
      getCoordinateByAddress (address) {
        if (address) {
          let _this = this
          let geocoder = new WMap.Geocoder({
            city: 'bozhou',//城市名称，中文或英文全屏，默认全国
            radius: 1000//逆地理编码时，以给定坐标为中心点，单位：米，取值范围：0-3000，默认值1000
          })
          geocoder.getLocation('中国' + address, function (status, data) {
            _this.mapClickEvent(data.location.lng, data.location.lat)
          })
        }
      },
      mapClickEvent (lon, lat) {
        this.map.setCenter([lon, lat])
        this.markerPoint = {lon: lon, lat: lat}
        this.GPSLayer.clear()
        this.addMarker1(lon, lat)
        this.$emit('setPosition', this.markerPoint)
      }
    },
    watch: {}
  }

</script>

<style scoped>

</style>
