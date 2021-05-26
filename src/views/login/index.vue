<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" auto-complete="on" :model="loginForm" :rules="loginRules" label-position="left">
      <h3 class="title"><span style="opacity: 0">1</span></h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" class="input1" type="text" auto-complete="on" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          class="input2"
          :type="pwdType"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          <!--&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;-->企业登录
        </el-button>
      </el-form-item>
      <!--<div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: admin</span>
      </div>-->
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="tologin">
        <!--&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;-->管理员登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能小于1位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        templateId: '',
        templateName: '',
        industryType: '',
        templateCode: '',
        createUser: '',
        updateUser: '',
        createTime: '',
        updateTime: ''
      },
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  created () {
    // this.tologin()
  },
  methods: {
    tologin () {
      window.location.replace(process.env.VUE_APP_LOGIN_URL + '?toredirect=' + this.$route.path)
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const thiz = this
          this.loading = true
          axios.post('/metro-api/company/login?account=' + this.loginForm.username + '&&password=' + this.loginForm.password).then((response) => {
            if (response.data.flag) {
              // window.location.href = 'http://127.0.0.1:6080/home'
              this.$router.push({ path: 'home' })
              this.loading = false
            } else {
              thiz.$message(response.data.message)
              this.loading = false
            }
          })

          /* this.$store.dispatch('login/checkAccount', this.loginForm).then(() => {
            // this.$store.dispatch('Lnitsiderbar')
            this.loading = false
            this.$router.push({ path: '/' })
          }
          ).catch(() => {
            this.loading = false
          }) */
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #000;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    border-radius: 100px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 100px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color:#fff;
    //background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped></style>
