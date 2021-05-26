import axios from 'axios'
const msgHelp = {
  message: function (self, msg, type) {
    if (type === 'error') {
      this.$message.error(msg)
    } else {
      self.$message({
        type: type,
        message: msg
      })
    }
  },
  delete: function (self, url, successCallBack) {
    self.$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      self.$http.post(url).then(res => {
        if (res.status === 200 && res.data.flag === true) {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (successCallBack) {
            successCallBack()
          }
        } else if (res.status === 200 && res.data.flag === false) {
          self.$message.error('删除失败')
        }
      }, res => {
        console.log(res)
        self.$message.error('删除出错')
      })
    }).catch(() => {
    })
  },
  deleteByParams: function (thiz, url, params, successCallBack) {
    thiz.$confirm('确定删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      axios.get(url, {
        params: params
      })
        .then(function (response) {
          thiz.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (successCallBack) {
            successCallBack()
          }
        })
        .catch(function (error) {
          console.log(error)
          thiz.$message.error('删除出错')
        })
    }).catch(() => {
    })
  },
  confirm: function (self, msg, title, sureCallback) {
    self.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      if (sureCallback) {
        sureCallback()
      }
    })
  }
}
export default msgHelp

