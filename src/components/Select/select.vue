<template>
  <el-select v-model="value1" :placeholder="placeholder" :clearable="true">
    <el-option
      v-for="item in optionList"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
</template>
<script>
import axios from 'axios'
// import $ from 'jquery'

export default {
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    dicType: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }

  },
  data () {
    return {
      optionList: [],
      value1: this.value
    }
  },
  watch: {
    value1: function (val) {
      this.select(val)
    }
  },
  mounted () {
    console.log(this.dicType)
    this.loadData(this.dicType)
  },
  methods: {
    loadData (dicType) { // 加载数据
      if (dicType !== '') {
        const thiz = this
        axios.get('/metro-api/dic/list', {
          params: {
            dicType: this.dicType
          }
        }).then((response) => {
          thiz.optionList = response.data.result
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    select (val) {
      this.$emit('input', val)// select事件触发后，自动触发
    }
  }
}

</script>
<style scoped>

</style>
