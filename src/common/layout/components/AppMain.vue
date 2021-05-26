<template>
  <section id="appmain" class="app-main1" ref="appmain">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route () {
      this.$refs.appmain.scrollTop = 0
    }
  }
}
</script>

<style scoped>
  #appmain {
    /*50 = navbar  */
    height: calc(100vh - 135px);
    overflow: auto;
    border: 16px solid rgb(242, 242, 246);
  }
</style>

<style lang="scss">
  // fix css style bug in open el-dialog
  .el-popup-parent--hidden {
    .fixed-header {
      padding-right: 15px;
    }
  }
</style>
