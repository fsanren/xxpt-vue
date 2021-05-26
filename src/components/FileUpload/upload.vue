
<template>

  <div class="upload-container selfUpload">
    <el-dialog :visible.sync="dialogVisibleImg" :title="ImgName" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-upload
      v-if="!hideUpload"
      v-model="returnList"
      class="upload-demo"
      :action="UploadUrl()"
      multiple
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview"
      :on-progress="handleProgress"
      :before-upload="beforeAvatarUpload"
      :file-list="fileList"
      :show-file-list="false"
      :data="{relId:relId}"
      :on-change="handleChange"
    >
      <el-button :size="size" :type="type" icon="el-icon-upload" :plain="plain" style="text-align: left">
        {{ btnMSg }}
      </el-button>
      <!--<el-button size="small" type="primary" >点击上传</el-button>-->
      <div v-if="!hideUpload" slot="tip" class="el-upload__tip">只能上传{{ accept }}文件，且不超过{{ maxSize }}M</div>
    </el-upload>
    <div v-for="(item,index) in returnList" class="grid-content" style="line-height: 34px;">
      <div class="info-content" :title="item.fileName">{{ item.fileName }}</div>
      <div v-if="!isHideDel" class="selfBtnDiv"><i class="el-icon-delete" @click="handleRemove(index,item)" /></div>
      <div class="selfBtnDiv"><el-button type="text" @click="downloadFile(item)">下载</el-button></div>
      <div class="selfBtnDiv"><el-button type="text" @click="viewPDF(item)">预览</el-button></div>
      <div style="clear: left" />
    </div>

  </div>
</template>

<script>
// <!--accept=".png,.jpg,.xlsx, .xls"-->
// import pdf from 'vue-pdf'
import axios from 'axios'
export default {
  name: 'UploadFile',
  components: {
    // pdf
  },
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    disabledInput: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: []
    },
    accept: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: 'primary'
    },
    btnMSg: {
      type: String,
      default: '点击上传'
    },
    plain: {
      type: Boolean,
      default: false
    },
    fileType: {
      type: String,
      default: ''
    },
    limit: {
      type: String,
      default: 1
    },
    maxSize: {
      type: String,
      default: 10
    },
    isSuccessHide: {
      type: String,
      default: 'true'
    },
    isHideDel: {
      type: Boolean,
      default: true
    },
    isAdd: {
      type: Boolean,
      default: true
    },
    relId: {
      type: String,
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogVisibleImg: false,
      ImgName: '',
      dialogImageUrl: '',
      // accept: this.accept,
      // maxSize: this.maxSize,
      returnList: [],
      hideUpload: false,
      limitCount: this.limit,
      dialogVisible: false,
      // isSuccessHide: this.isSuccessHide,
      // isHideDel: this.isHideDel,
      // relId: this.relId,
      myFileList: this.fileList
      // fileTitle: this.fileType
    }
  },
  computed: {
  },
  watch: {
    isAdd: function (val, oldVal) {

      if (this.isAdd) {
        this.hideUpload = false
        this.hideUpload = false
        this.relId = ''
        // this.checkProjectFileList.fileList = []
        // this.checkStandardFileList.fileList = []
        // this.checkProjectFileList.returnList = []
        // this.checkStandardFileList.returnList = []
        this.fileList = []
        this.returnList = []
      }
    }
  },
  created () {
    console.info(this.multiple)
    console.info(this.isHideDel)
    this.hideUpload = this.fileList.length >= this.limitCount
    if (this.isDetail) {
      this.hideUpload = true
    }
  },
  mounted: function () {

    if (this.isAdd) {
      this.hideUpload = false
      this.hideUpload = false
      // this.checkProjectFileList.fileList = []
      // this.checkStandardFileList.fileList = []
      // this.checkProjectFileList.returnList = []
      // this.checkStandardFileList.returnList = []
      this.myFileList = []
      this.returnList = []
    } else {
    }
  },
  methods: {
    // 上传路径
    /**
       * @return {string}
       */
    UploadUrl: function () {
      // return "http://192.168.199.178:740/base/fus/uploadFile";
      console.info(this.relId)
      if (this.relId !== '') {
        return `/metro-api/file/singleUpload?fileTitle=` + this.fileType
      } else {
        return `/metro-api/file/singleUpload?fileTitle=` + this.fileType
      }
    },
    handleSuccess (res, file, fileList) {

      console.info(this.fileType)
      this.returnList = []
      fileList.forEach(item => {
        const file = item.response.data
        this.$set(file, 'isUpdate', '1')
        this.returnList.push(file)
      })
      console.info(this.returnList)
      // this.$refs.xxx.clearValidate()
      if (this.isSuccessHide === 'true') {
        this.hideUpload = this.fileList.length >= this.limitCount
      }
      this.$emit('update:fileList', fileList)
    },
    handleRemove (index, file) {

      console.info(index)
      console.info(this.fileList)
      // this.returnList = []
      //   fileList.forEach(item => {
      //     let file = item.response.data
      //     this.returnList.push(file)
      // })
      //   console.info(this.returnList)
      if (file.id != null) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/metro-api/file/deleteFile?annexId=' + file.id).then((response) => {
            if (response.data.flag) {
              const thiz = this
              thiz.returnList.splice(index, 1)
              thiz.fileList.splice(index, 1)
              if (thiz.isSuccessHide === 'true') {
                thiz.hideUpload = thiz.fileList.length >= thiz.limitCount
              }
              thiz.$message('删除成功')
            } else {
              const thiz = this
              var msg = response.data.message
              thiz.$message(msg)
            }
          })
        })
      } else {
        this.returnList.splice(index, 1)
        this.fileList.splice(index, 1)
        if (this.isSuccessHide === 'true') {
          this.hideUpload = this.fileList.length >= this.limitCount
        }
      }
      // this.$emit('update:fileList', fileList)
    },
    handlePictureCardPreview (file) {
      let contentType = ''
      if (file.contentType) {
        contentType = file.contentType.split('/')[0]
      } else {
        contentType = file.response.body.contentType.split('/')[0]
      }

      if (contentType === 'image') {
        this.dialogImageUrl = file.url
        this.dialogVisibleImg = true
        this.ImgName = file.name
      } else {
        window.open(file.url)
      }
    },
    handleProgress (event, file, fileList) {

      console.info(fileList)
    },
    beforeAvatarUpload (file) {

      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      //   const extension = testmsg === 'doc'
      //   const extension2 = testmsg === 'docx'
      const isLt2M = file.size / 1024 / 1024 < this.maxSize
      const extension = this.accept.indexOf(testmsg) >= 0
      if (!extension) {
        this.$message({
          message: '上传文件只能是 ' + this.accept + '!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 ' + this.maxSize + 'MB!',
          type: 'warning'
        })
      }
      return extension && isLt2M
    },
    handleChange (file, fileList) {
      if (this.isSuccessHide === 'true') {
        this.hideUpload = fileList.length >= this.limitCount
      }
      this.$emit('update:fileList', fileList)
    },
    viewPDF (item) {
      //  this.$router.push({name: 'showPDF', params: {url: 'test'}})
      const routeData = this.$router.resolve({
        path: '/showPDF',
        // query: 'test',
        query: {
          url: item.path,
          id: item.id,
          fileName: item.fileName
        }
      })
      window.open(routeData.href, '_blank')
      //  window.open('/showPDF')
    },
    downloadFile (item) {
      let searchTemp = 1
      let annexId = ''
      let fileName = ''
      if (item.id != null) {
        searchTemp = 0
        annexId = item.id
      } else {
        fileName = item.fileName
      }
      window.location.href = '/metro-api/file/getFile?urlPath=' + encodeURIComponent(item.path) + '&searchTemp=' + searchTemp + '&annexId=' + annexId + '&download=1&downShowName=' + fileName
    },
    upload (fileObj) {
      const formData = new FormData()
      formData.append('file', fileObj.file)
      formData.append('type', fileObj.file.type)
      return axios.request({
        url: '/glss-api/file/singleUpload',
        method: 'post',
        data: formData,
        onUploadProgress: progressEvent => {
          const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          fileObj.onProgress({ percent: complete })
        }
      }).then(this.handleUpload, this.handleUploadError)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /*@import "~@/styles/mixin.scss";*/
  .selfUpload {
    text-align: left !important;
    .el-upload {
      text-align: left !important;
      width: 75px;
      float: left !important;
    }
    .el-upload--text {
      float: left !important;
      margin-right: 16px;
      text-align: left !important;
    }
    .hide .el-upload--text {
      float: left;
      display: none !important;
      text-align: left !important;
    }
    .hide .el-upload__tip {
      display: none !important;
      float: left !important;
    }
    .el-upload__tip {
      margin-top: 1px !important;
      float: left !important;
      margin-left: 5px !important;
    }
    .info-content{
      overflow: hidden;     /*设置超出的部分进行影藏*/
      text-overflow: ellipsis;     /*设置超出部分使用省略号*/
      white-space:nowrap ;    /*设置为单行*/
      float: left;
      height: 100%;
      /*position: absolute;*/
      width: 300px;
    }
    .selfBtnDiv{
      float: left;
      padding: 0 10px;
    }
  }

</style>
