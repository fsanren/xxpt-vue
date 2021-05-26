<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      active-text-color="#409EFF"
      :class="isCollapse===true?'sidebarMenu':''"
    >
      <sidebar-item :routes="permission_routers" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { theme } from '@/settings'
export default {
  components: { SidebarItem },
  data () {
    return {
      colorType: 'black',
      backgroundColor: '#1e2a44',
      textColor: '#cbced3'
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  created () {
    this.changeColor()
  },
  methods: {
    changeColor () {
      if (theme !== 'white') {
        this.backgroundColor = '#1e2a44'
        this.textColor = '#cbced3'
      } else {
        this.backgroundColor = '#F6F7FB'
        this.textColor = '#404A54'
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.sidebarMenu {
  .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
