<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <navbar style="position: relative" @func="changeSidebarFlag" />
    <sidebar v-if="layouttype !=='2'" id="sidebar" class="sidebar-container" />
    <SidebarItems v-show="sidebarFlag" class="sidebar-container1" style="z-index: 2001" />
    <el-button v-if="!isCollapse&&layouttype !=='2'" type="text" class="sidebarbutton el-icon-arrow-left" :style="{background:siderbackground}" @click="toggleSideBar" />
    <el-button v-if="isCollapse&&layouttype !=='2'" type="text" class="leftsidebarbutton el-icon-arrow-right" :style="{background:siderbackground}" @click="toggleSideBar" />
    <div v-if="layouttype==='2'" class="main-container2">
      <tags-view v-if="layouttype!=='2'" />
      <app-main />
    </div>
    <div v-else class="main-container">
      <tags-view />
      <app-main />
    </div>
    <!--<el-dialog id="pwdform" title="修改初始密码" :visible.sync="pswdialogFormVisible" class="dialog-box-basic" width="500px">-->
    <!--<el-form ref="ruleForm" :model="pswform" :rules="rules">-->
    <!--<el-form-item>-->
    <!--<el-alert title="警告：您使用的是初始密码登录，请及时修改" type="warning" show-icon :closable="false" />-->
    <!--</el-form-item>-->
    <!--<el-form-item label="新密码：" :label-width="formLabelWidth" prop="USER_PSW" style="padding-top:10px">-->
    <!--<el-input v-model="pswform.USER_PSW" type="password" auto-complete="off" style="width:300px;" />-->
    <!--</el-form-item>-->
    <!--<el-form-item label="密码确认：" :label-width="formLabelWidth" prop="USER_PSWCHECK" style="padding-top:10px">-->
    <!--<el-input v-model="pswform.USER_PSWCHECK" type="password" auto-complete="off" style="width:300px;" />-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="pswdialogFormVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="savepsw">保 存</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
    <div class="footerbar">
      <div style="float: left;">
        <span>用户名称：{{ userInfo.name }}&nbsp;&nbsp;&nbsp;登录时间：{{ userInfo.lastLogin }}</span>
      </div>
      <div style="float: right;">
        <span>技术支持：厦门卫星定位应用股份有限公司</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import SidebarItems from '@/common/layout/components/SidebarItems/index'
import { validatePassword } from '@/common/utils/validate.js'
import { theme, sysCode } from '@/settings'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    SidebarItems
  },
  data () {
    return {
      siderbackground: '#5e687b',
      pswform: {
        USER_PSW: '',
        USER_PSWCHECK: ''
      },
      sidebarFlag: false,
      interval: null,
      innerDrawer1: false,
      innerDrawer2: false,
      pswdialogFormVisible: false,
      formLabelWidth: '100px',
      rules: {
        USER_PSW: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        USER_PSWCHECK: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.validatePass2, trigger: 'blur' }
        ]
      },
      userInfo: {}
    }
  },
  // mixins: [ResizeMixin],
  computed: {
    layouttype () {
      return this.$store.state.user.layouttype
    },
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created () {
    this.getUserInfo()
    this.theme()
    if (sysCode === 'ylxtzh') {
      this.getNotifications()
      this.interval = setInterval(() => {
        this.getNotifications()
      }, 60000)
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    theme() {
      if (theme !== 'white') {
        this.siderbackground = '#D5D8DF'
      } else {
        this.siderbackground = '#5e687b'
      }
    },
    changeSidebarFlag (data) {
      if (this.sidebarFlag === false) {
        this.sidebarFlag = true
      } else {
        this.sidebarFlag = false
      }
    },
    getNotifications () {
      this.$axios({
        method: 'get',
        url: '/glss-api/schedulingTasks/findPollingList'
      }).then((res) => {
        if (res.result.list != null && res.result.list.length > 0) {
          this.$notify.closeAll()
          const h = this.$createElement
          this.$notify({
            title: '提示',
            message: h('a', { on: {
              click: () => {
                this.$router.push('/receiveDispatch/receiveDispatch')
              }
            }}, '收到一条调度信息'),
            duration: 0
          })
        }
      })
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pswform.USER_PSWCHECK !== '') {
          this.$refs.ruleForm.validateField('USER_PSWCHECK')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pswform.USER_PSW) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    getUserInfo () {
      const vm = this
      this.$axios({
        method: 'post',
        url: '/glss-api/login/getCurrentUser'
      }).then((res) => {
        console.log(res)
        vm.userInfo = res.result
        // vm.pswdialogFormVisible = vm.userInfo.isFirstLogin === '1'
      })
    },
    savepsw () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          axios.post('/zhzf-api/sysUser/updatePsw', this.$qs.stringify(this.pswform)).then((response) => {
            if (response.data.flag) {
              this.pswdialogFormVisible = false
              // this.$message('保存成功')
              this.$alert('保存成功,，请重新登录！', '成功', {
                confirmButtonText: '确定',
                callback: this.logout
              })
            } else {
              this.$message(response.data.message)
            }
          })
        }
      })
    },
    async logout () {
      await this.$store.dispatch('user/LogOut')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleClickOutside () {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    init () {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/common/styles/mixin.scss";
  .el-scrollbar__wrap {
    overflow: scroll;
    height: calc(100% - 32px);
  }
  .footerbar{
    padding: 8px;
    transition: width 0.28s;
    height: 32px !important;  //页脚栏高度
    width: 100%;              //页脚栏宽度
    min-width: 1366px;        //页脚栏最小宽度
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2002;            //页脚栏层级
    background: rgba(20,31,57,1);
    color: #FFF;
    font-size: 14px;
  }
</style>

<style>

</style>
