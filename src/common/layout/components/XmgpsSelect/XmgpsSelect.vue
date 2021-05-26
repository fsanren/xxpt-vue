<template>
  <div class="">
    <el-select v-model="value" placeholder="请选择" @change="changevalue">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'XmgpsSelect',
  props: {
    code: { type: [String], default: '' },
    codevlaue: { type: [String], default: '' }
  },
  data () {
    return {
      options: null,
      value: ''
    }
  },
  created () {
    this.loadCode()
  },
  methods: {
    loadCode () {
      const thiz = this
      axios.get('/metro-api/sysCode/getBycode' + '?code=' + thiz.code).then((response) => {
        var data = response.data.data
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            thiz.options = [{ 'value': data[i].codeVlaue, 'label': data[i].codeName }]
          } else {
            thiz.options.push({ 'value': data[i].codeVlaue, 'label': data[i].codeName })
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    changevalue () {
      this.$emit('childByValue', this.value)
    }
  }
}
</script>
