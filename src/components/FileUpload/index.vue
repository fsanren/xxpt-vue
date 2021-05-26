<template>
  <el-upload
    class="files-upload"
    action="#"
    :accept="filesFormat"
    :headers = "headers"
    :multiple="isMultiple"
    :show-file-list="isShowList"
    :on-success="uploadSuccess"
    :on-error="uploadError"
     :before-upload="handleBeforeUpload2"
  >
    <slot />
  </el-upload>
</template>

<script>
import { getToken } from '@/common/utils/auth'
import axios from 'axios'
export default {
  name: 'Upload',
  props: {
    url: {
      type: String,
      default: ''
    },
    filesFormat: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    isShowList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: {
        token: getToken() // 从cookie里获取token，并赋值  Authorization ，而不是token
      }
    }
  },
  methods: {
    // 导入
    handleBeforeUpload2(file) {
      this.fileTemp = file
      let fileName = file.name
      let fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      // 判断上传文件格式
      if (this.fileTemp) {
        if ((fileType != 'xlsx') && (fileType != 'xls')) {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请重新上传！'
          })
          return false
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
        return false
      }
      console.log('开始上传，上传的文件为：'+file)
      let formData = new FormData()
      formData.append('file', file)
      this.$axios({
        method: 'post',
        url: this.url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': getToken()
        }
      }).then((res) => {
        if ([200, 0].includes(res.code)) {
          const data = res.message
          this.$emit('on-success', data)
          this.$message.success(data)
        } else {
          const data = res.message
          this.$emit('on-error')
          this.$message.error(data)
        }
        console.log('文件上传返回：'+res)
      }).catch(error => {
        // console.log('文件上传异常:'+error)
        // this.$emit('on-error')
        // this.$message.error(error)
      })
    },
    uploadSuccess(res, file) {
      if ([200, 0].includes(res.code)) {
        const data = res.message
        this.$emit('on-success', data)
        this.$message.success(data)
      } else {
        const data = res.message
        this.$emit('on-error')
        this.$message.error(data)
      }
    },
    uploadError(res, file) {
      // this.$emit('on-error')
    }
  }
}
</script>

<style lang="scss">
  .files-upload{
    display: inline-block;
    vertical-align: top;
    margin: 0px 16px;
  }
</style>
