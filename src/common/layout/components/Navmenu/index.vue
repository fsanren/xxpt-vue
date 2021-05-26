<template>
  <div>
    <el-row>
      <el-col :span="2">
        <!-- <el-button @click="leftmove" style="float:left;height:64px;background-color:#1E2A44;border-width:0px;font-size:20px;"  icon="el-icon-caret-left"></el-button> -->
      </el-col>
      <el-col :span="20">
        <el-menu
          mode="horizontal"
          class="el-menu-demo"
          :show-timeout="200"
          :collapse="false"
          :default-active="$route.path"
          background-color="#1e2a44"
          text-color="#cbced3"
          active-text-color="#409EFF"
          @select="handleSelect"
        >
          <navmenu-item :routes="permission_routers" />
        </el-menu>
      </el-col>
      <el-col :span="2">
        <!-- <el-button @click="rightmove" style="float:left;height:64px;background-color:#1E2A44;border-width:0px;font-size:20px;"  icon="el-icon-caret-right"></el-button> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import NavmenuItem from './NavmenuItem'

export default {
  components: { NavmenuItem },
  data () {
    return {
      permission_routers: null,
      allrouters: null,
      onrouters: null,
      onmaxrouter: 0,
      startroute: 0
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'permission_routers'
  //   ])
  // },
  created () {
    this.loadData()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    loadData () {
      this.allrouters = this.$store.getters.permission_routers
      this.onrouters = []
      for (var i = 0; i < this.allrouters.length; i++) {
        if (!this.allrouters[i].hasOwnProperty('hidden')) {
          this.onrouters.push(this.allrouters[i])
        }
      }
      this.onmaxrouter = this.onrouters.length
      this.permission_routers = this.onrouters.slice(0, 5)
    },
    leftmove () {
      this.startroute = this.startroute - 1
      var startindex = this.startroute
      var endindex = startindex + 5
      if (startindex < 0) {
        startindex = 0
        endindex = 5
        if (endindex > this.onmaxrouter) {
          endindex = this.onmaxrouter
        }
      }
      this.startroute = startindex
      this.permission_routers = this.onrouters.slice(startindex, endindex)
    },
    rightmove () {
      this.startroute = this.startroute + 1
      var startindex = this.startroute
      var endindex = startindex + 5
      if (endindex > this.onmaxrouter) {
        endindex = this.onmaxrouter
        startindex = endindex - 5
        if (startindex < 0) {
          startindex = 0
        }
      }
      this.startroute = startindex
      this.permission_routers = this.onrouters.slice(startindex, endindex)
    }
  }
}
</script>
