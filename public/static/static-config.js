var STATIC_CONFIG_DEV = {
  VUE_APP_LOGIN_URL: 'http://10.50.1.123:8090/cas-server/login?service=http://127.0.0.1:8081/glss-api/login/checkAccount',
  VUE_APP_LOGOUT_URL: 'http://10.50.1.123:8090/cas-server/logout?service=http://127.0.0.1:8081/glss-api/login/logout',
  VUE_APP_HOME_URL: 'http://10.50.1.123:9501/navigation-web'
}

var STATIC_CONFIG_PROD = {
  VUE_APP_LOGIN_URL : 'http://10.50.1.123:8090/cas-server/login?service=http://10.50.1.123:9501/glss-api/login/checkAccount',
  VUE_APP_LOGOUT_URL: 'http://10.50.1.123:8090/cas-server/logout?service=http://10.50.1.123:9501/glss-api/login/logout',
  VUE_APP_HOME_URL: 'http://10.50.1.123:9501/navigation-web'
}
