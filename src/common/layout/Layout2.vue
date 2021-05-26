<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <navbar />
    <sidebar v-if="layouttype !=='2'" id="sidebar" class="sidebar-container" />
    <el-button v-if="!isCollapse&&layouttype !=='2'" type="text" class="sidebarbutton el-icon-arrow-left" @click="toggleSideBar" />
    <el-button v-if="isCollapse&&layouttype !=='2'" type="text" class="leftsidebarbutton el-icon-arrow-right" @click="toggleSideBar" />
    <div v-if="layouttype==='2'" class="main-container2">
      <tags-view v-if="layouttype!=='2'" />
      <app-main />
    </div>
    <div v-else class="main-container">
      <tags-view />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
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
  mounted () {
    this.init()
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    /* eslint-disable */
    init () {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/common/styles/mixin.scss";
</style>
