<template>
  <div class="navbarclass">
    <el-menu class="navbar" mode="horizontal">
      <el-row style="width:100%;height:47px;">
        <el-col :span="1" style="height:64px;">
          <i v-if="showFlag" type="info" class="el-icon-s-unfold" style="cursor:pointer;padding:16px 13px 13px 16px ;font-size:32px;color:#00AAFF;position: relative;top: 1px;" @click="sendMsg" />
          <i v-if="!showFlag" type="info" class="el-icon-s-unfold" style="cursor:pointer;padding: 16px 13px 13px 16px;font-size:32px;color:#FFFFFF;position: relative;top: 1px;" @click="sendMsg" />
        </el-col>
        <el-col :span="5">
          <div class="titlediv">
            <!--<img :src="dmptglLogo" class="titleimg"  style="height: 48px; width: 48px;margin-top: 8px;" >-->
            <span class="titletext">{{title}}</span>
          </div>
        </el-col>
        <el-col  :xl="16" :sm="16" style="height:64px;">
          <div class="navsystemBar" style="border-right: 1px solid rgba(70, 77, 91, 1);">
            <el-menu class="nav-system-menu" default-active="0" background-color="#1e2a44"  text-color="#cbced3" active-text-color="#06A8F9"  mode="horizontal">
              <template v-for="(item,indexs) in menuList">
                <el-menu-item @click.native="goUrl(item.menuUrl)" :title="item.menuName" v-if="indexs<4" :key="indexs" class="menuclass" :index="indexs.toString()">
                  <span slot="title">{{ item.menuName }}</span>
                </el-menu-item>
              </template>
              <div v-if="menuList.length>4" class="system-more" >
                <!--<svg-icon icon-class="down" style="color: #cbced3;margin-top: 18px;width: 18px;height: 24px;" />-->
                <el-button type="text"  @click.stop="changeMoreMenu()" :icon="navMenuFlag ? 'nav-button-context el-icon-arrow-up' : 'nav-button-context el-icon-arrow-down'"></el-button>
              </div>
              <div v-if="isYjddzh" @mouseenter="leave(true)" @mouseleave="leave(false)" style="padding-top: 6px" class="system-more">
                <svg-icon icon-class="图标 1975" />
              </div>
            </el-menu>
            <el-menu v-show="navMenuFlag" style="float: right;width: 180px" background-color="#1e2a44" text-color="#cbced3" active-text-color="#409EFF" mode="vertical" @select="handleSelect">
              <template v-for="(item,indexs) in menuList">
                <el-menu-item  @click.native="goUrl(item.menuUrl)" v-if="indexs>3" :key="indexs" style="height:52px;" class="menuclass" :index="indexs.toString()">
                  <span slot="title">{{ item.menuName }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </el-col>
        <!--<el-col v-if="layouttype==='3'" :span="10" style="height:64px;">-->
        <!--<div class="navsystem">-->
        <!--<el-menu class="nav-system-menu" :default-active="activeIndex" active-text-color="#409EFF" text-color="#FFFFFF" mode="horizontal" @select="handleSelect">-->
        <!--<template v-for="navmenu in navmenus">-->
        <!--<el-menu-item class="menuclass" :index="navmenu.NAVLINK_ORDER">-->
        <!--<a style="font-size:16px;" :href="navmenu.NAVLINK_URL"><span>{{ navmenu.NAVLINK_CHINESE }}</span></a>-->
        <!--</el-menu-item>-->
        <!--</template>-->
        <!--</el-menu>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col v-if="layouttype==='2'" :span="8" style="height:64px;">-->
        <!--<div class="menudiv">-->
        <!--<navmenu class="navmenu-container" />-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col v-if="layouttype==='2'" :span="1" style="height:64px;" />-->
        <!--<el-col v-if="layouttype==='2'" :span="8" style="height:64px;">-->
        <!--<div class="nvatagdiv">-->
        <!--<navtags style="height:64px;" />-->
        <!--</div>-->
        <!--</el-col>-->
        <el-col  :span="2" style="height:64px;">
          <el-col :span="18" >
            <div style="border-right: 1px solid rgba(70, 77, 91, 1);">
              <span style="color:#FFFFFF;margin-right: 4px">{{username}}</span>
              <el-button type="text" style="color:#FFFFFF;"  @click.stop="openNavcontext($event)" :icon="navcontextvisible ? 'nav-button-context el-icon-arrow-up' : 'nav-button-context el-icon-arrow-down'"></el-button>
              <div id="navbar" class="navbarrighr" style="right: 40px;top:64px">
                <ul class="navcontextmenu" v-show="navcontextvisible" style="right: 16px">
                  <li @click="modifyPwd">密码修改</li>
                  <li @click="systemLogout">退出</li>
                </ul>
              </div>
            </div>
            <div v-if="appImg" style="border-radius:10px;box-shadow:2px 2px 5px #ced5df;background-color:#FFFFFF;width:130px;height:150px;line-height:20px;position: relative;right:90px;top: 8px;">
              <div style="padding-top: 15px">
                <img :src="src">
              </div>
              <div style="">扫码下载APP</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="font-size:28px;color: #FFFFFF;">
              <i class="el-icon-s-home" style="cursor: pointer;" @click="goUrl2(homeUrl)" />
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-dialog title="修改密码" :visible.sync="pwdDialogFormVisible" :append-to-body="true" class="dialog-box-basic" width="500px">
        <el-form ref="pwdForm" :model="pwdForm" :rules="rules">
          <el-form-item label="旧密码：" :label-width="formLabelWidth" class="form-item" prop="oldPassword">
            <el-input ref="oldPassword" v-model="pwdForm.oldPassword" type="password" auto-complete="off" style="width:300px;" />
          </el-form-item>
          <el-form-item label="新密码：" :label-width="formLabelWidth" class="form-item" prop="password">
            <el-input v-model="pwdForm.password" type="password" auto-complete="off" style="width:300px;" />
          </el-form-item>
          <el-form-item label="确认新密码：" :label-width="formLabelWidth" class="form-item" prop="checkPass">
            <el-input v-model="pwdForm.checkPass" type="password" auto-complete="off" style="width:300px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="pwdDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePwd">提 交</el-button>
        </div>
      </el-dialog>
    </el-menu>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Navmenu from './Navmenu'
import Navtags from './Navtags'
import TagsView from './TagsView'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
// import axios from 'axios'
import store from '@/store'
import { filterAsyncRouter } from '@/store/modules/permission'
import router from '../../../router/routers'
import Cookies from 'js-cookie'
// import { removeToken } from '@/common/utils/auth'
// import { setCookie } from '@/common/utils/cookie'
import { validatePassword } from '@/common/utils/validate.js'
import JSEncrypt from 'jsencrypt'
import { sysCode, parentSysCode, title, theme } from '@/settings'

export default {
  components: {
    Breadcrumb,
    Navmenu,
    TagsView,
    Navtags,
    Hamburger,
    LangSelect,
    ThemePicker
  },
  data () {
    return {
      activeIndex: '6',
      navmenus: null,
      title: title,
      defaultActive: '',
      // themeColor: '#FFFFFF',
      username: '',
      showFlag: false,
      navcontextvisible: false,
      navMenuFlag: false,
      systemName: '',
      right: 16,
      top: 64,
      menuList: [],
      src: 'static/app.png',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      moreMenuVisible: false,
      pwdDialogFormVisible: false,
      checkdialogVisible: false,
      formLabelWidth: '120px',
      appImg: false,
      isYjddzh: false,
      pwdForm: {
        oldPassword: '',
        password: '',
        checkPass: ''
      },
      homeUrl: process.env.NODE_ENV === 'production' ? STATIC_CONFIG_PROD.VUE_APP_HOME_URL : STATIC_CONFIG_DEV.VUE_APP_HOME_URL,
      // 表单规则
      rules: {
        oldPassword: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getMenu()
    // var layoutvalue = this.$store.getters.layouttype
    // this.$store.dispatch('ChangeLayout', layoutvalue)
    this.getUserName()
    // this.name = this.$store.state.user.name
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    layouttype () {
      return this.$store.state.user.layouttype
    }
  },
  watch: {
    navcontextvisible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeNavcontext)
      } else {
        document.body.removeEventListener('click', this.closeNavcontext)
      }
    },
    navMenuFlag (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMoreMenu)
      } else {
        document.body.removeEventListener('click', this.closeMoreMenu)
      }
    }
  },
  mounted() {
    this.isYjddzhSys()
    this.defaultActive = this.$store.state.router
  },
  methods: {
    isYjddzhSys() {
      if (sysCode === 'yjddzh') {
        this.isYjddzh = true
      }
    },
    goUrl2(url) {
      window.location.replace(url)
    },
    goUrl(url, index) {
      if (url === 'wlgzyzt') {
        var rotuetURl = router.resolve({ path: '/onePicture/show' })
        window.open(rotuetURl.href, '_blank')
        return
      }
      this.defaultActive = url
      this.$store.dispatch('delAllViews').then(
        this.$axios({
          url: '/glss-api/login/getRouteMenu',
          method: 'post',
          data: {
            menuCode: url
          }
        }).then((res) => {

          Cookies.set('router', url)
          const asyncRouter = filterAsyncRouter(res.result.routeMenuList)
          asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
          store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
            router.addRoutes(asyncRouter) // 动态添加可访问路由表
            if (asyncRouter[0].children[0].children !== null) {
              router.push('/' + asyncRouter[0].children[0].path + '/' + asyncRouter[0].children[0].children[0].path)
            } else {
              router.push('/' + asyncRouter[0].children[0].path + '/' + asyncRouter[0].children[0].path)
            }
          })
        })
      )
    },
    getMenu() {
      var menuCode = parentSysCode
      this.$axios({
        url: '/glss-api/login/findMenuTree',
        method: 'post',
        data: {
          menuCode: menuCode
        }
      }).then((res) => {
        store.dispatch('AddValidButton', res.result.buttonDtoList)
        this.menuList = this.changeArrayIndex(res.result.menuDtoList)
      })
    },
    leave(index){
      this.appImg = index
    },
    changeArrayIndex(array) {
      var newArray = []
      for (var i = 0; i < array.length; i++) {
        if (array[i]['menuCode'] === sysCode) {
          newArray.push(array[i])
          break
        }
      }
      for (var j = 0; j < array.length; j++) {
        if (array[j]['menuCode'] !== sysCode) {
          newArray.push(array[j])
        }
      }
      return newArray
    },
    sendMsg() {
      if (this.showFlag) {
        this.showFlag = false
      } else {
        this.showFlag = true
      }
      this.$emit('func', 1)
    },
    changeMoreMenu() {
      if (this.navMenuFlag) {
        this.navMenuFlag = false
      } else {
        this.navMenuFlag = true
      }
    },
    closeMoreMenu () {
      this.navMenuFlag = false
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    backHomeClic () {
      const backHome = document.getElementById('backHome')
      backHome.src = this.backHomeOn
      this.$router.push('/')
    },
    // 切换主题
    // onThemeChange: function (themeColor) {
    //   this.themeColor = themeColor
    // },
    systemSet () {
      console.log('设置！')
    },
    systemHelp () {
      console.log('帮助！')
    },
    systemLogout () {
      // axios.get('/metro-api/login/logout').then((response) => {
      //   if (response.status === 200) {
      //     removeToken()
      //     setCookie('DMPTGL_USERNAME', '', -1)
      //     setCookie('usedCasServer', '', -1)
      //     setCookie('userName', '', -1)
      //     store.dispatch('delAllViews')
      //     store.dispatch('delUserAll')
      //     // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      //     this.$router.push(`/login`)
      //   }
      // }, res => {
      // })
      store.dispatch('LogOut')
    },
    validatePass (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.pwdForm.checkPass !== '') {
          this.$refs.pwdForm.validateField('checkPass')
        }
        callback()
      }
    },
    validatePass2 (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pwdForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    modifyPwd () {
      this.pwdDialogFormVisible = true
    },
    savePwd () {
      this.$refs['pwdForm'].validate((valid) => {
        if (valid) {
          const oldPassword = this.encrypt(this.pwdForm.oldPassword).replace(/\+/g, ' ')
          const password = this.encrypt(this.pwdForm.password).replace(/\+/g, ' ')
          const form = { oldPwd: oldPassword, newPwd: password }
          this.$axios({
            method: 'post',
            url: '/glss-api/login/updatePsw',
            data: form
          }).then((res) => {
            console.log(res)
            if (res.code === 200) {
              this.pwdDialogFormVisible = false
              this.$alert('保存成功,，请重新登录！', '成功', {
                confirmButtonText: '确定',
                callback: this.systemLogout
              })
            } else {
              alert(res.result.message)
              this.$refs.oldPassword.focus()
            }
          })
          // axios.post('/zhzf-api/login/updatePsw', form).then((response) => {
          //   if (response.data.flag) {
          //     // this.$message('保存成功')
          //     this.pwdDialogFormVisible = false
          //     this.$alert('保存成功,，请重新登录！', '成功', {
          //       confirmButtonText: '确定',
          //       callback: this.systemLogout
          //     })
          //   } else {
          //     this.$message(response.data.message)
          //     this.$refs.oldPassword.focus()
          //   }
          // })
        }
      })
    },
    encrypt (password) {
      // new一个对象
      const encrypt = new JSEncrypt()
      const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrxjJMcVZrKAM9Xt5wmYFzFGVO2XHLtubxTvCQjWSUD27jV66zFmXNw8kbh2bg1ZZlx1GMsDmDFn86yPctDZSFaPuI/IZaDx2tDl/X5iqUA/ky/6I2DxBqUd4jff2TIQDZJN2CkXw9pNxpjwcdL0w1OzrkSVhly7sIcQS6+wAVjQIDAQAB'
      // 设置公钥
      encrypt.setPublicKey(publicKey)
      const data = encrypt.encrypt(password)
      return data
    },
    openNavcontext (e) {
      if (this.navcontextvisible) {
        this.navcontextvisible = false
      } else {
        this.navcontextvisible = true
      }
      this.top = (e.clientY - 50)
    },
    closeNavcontext () {
      this.navcontextvisible = false
    },
    getUserName () {
      this.$axios({
        method: 'get',
        url: '/glss-api/login/getLoginUsername'
      }).then((res) => {
        this.username = res.result.userName
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
  .navbar{
    .el-menu-item.is-disabled{
      opacity: 1;
      cursor: pointer;
      background: none !important;
    }
  }
</style>
