<template>
  <div class="loading-container">
    <img class="vm-loading" src="~@/common/layout/components/Loading/loading.gif">
  </div>
</template>

<script>
export default {
  name: 'VmLoading'
}
</script>

<style lang="scss" scoped>
  .loading-container {
    background-color: rgba(255, 255, 255, 0.85);
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2222;
    transition: opacity 0.3s;
  }
  .vm-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
