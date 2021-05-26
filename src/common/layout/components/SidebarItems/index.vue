<template>
  <div class="sider-items" :style="{backgroundColor:backgroundColor}">
    <template v-for="(items,indexs) in list">
      <div v-if="items.length>0" :key="indexs" class="menu" :class="borderRight">
        <div style="cursor: pointer">
          <el-menu :background-color="backgroundColor" :text-color="textColor" :active-text-color="textColor" mode="vertical">
            <template v-for="(item,index) in items">
              <el-menu-item :key="index" @click.native="goUrl(item.menuUrl)" class="title"  :index="(index+1).toString()" @mouseover.native="addList(item.subMenuList,indexs)">
                <span>{{ item.menuName }}</span>
                <span style="float: right" v-show="indexs < 1"><i class="el-icon-arrow-right" /></span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { theme } from '@/settings'
export default {
  name: 'SidebarItems',
  data () {
    return {
      backgroundColor: '',
      textColor: '',
      borderRight: '',
      sencend: false,
      third: false,
      list: [],
      menuList: [
        {
          id: '1',
          menuName: '项目管理',
          childTree: [{
            menuName: '项目进度',
            childTree: [{
              menuName: '项目一',
              childTree: [{ menuName: '详细信息' }]
            }]
          }, {
            menuName: '任务安排'
          }]
        },
        {
          id: '2',
          menuName: '数据统计',
          childTree: [{
            menuName: '项目进度2',
            childTree: [{
              menuName: '项目一2',
              childTree: [{ menuName: '详细信息2' }]
            }]
          }, {
            menuName: '任务安排2'
          }]
        },
        {
          id: '3',
          menuName: '人员管理'
        }]
    }
  },
  mounted() {
  },
  created() {
    this.getMenu()
    this.changeColor()
  },
  methods: {
    getMenu() {
      this.$axios({
        url: '/glss-api/login/findMenuTree',
        method: 'post',
        data: {
          menuCode: ''
        }
      }).then((res) => {
        this.menuList = res.result.menuDtoList
        this.addList(this.menuList, -1)
      })
    },
    addList (data, index) {

      if (index > 0) {
        return
      }
      if (data === undefined || data === []) {
        this.list.splice(index + 1)
      } else {
        if (this.list.length > index + 1) {
          for (var i = this.list.length; i > index + 1; i--) {
            this.list.splice(i)
          }
        }
        const array = []
        data.forEach(function (item, index) {
          array.push(item)
        })
        this.list[index + 1] = array
        this.list.push([])
      }
    },
    changeColor() {
      if (theme !== 'white') {
        this.backgroundColor = '#1e2a44'
        this.textColor = '#cbced3'
        this.borderRight = 'broderBlack'
      } else {
        this.backgroundColor = '#F6F7FB'
        this.textColor = '#404A54'
        this.borderRight = 'broderWrite'
      }
    },
    goUrl(url) {
      window.open(url)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .sider-items{
    .menu{
      text-align: left;
      font-family:Noto Sans S Chinese;
      /*color: #FFFFFF;*/
      font-size: 18px;
      /*border-right: 2px solid #f2f2f6;*/
      min-width: 208px;
      height: 100%;
      float: left;
      /*box-shadow:2px 0px 9px 0px rgba(11,3,6,0.16);*/
    }
    .broderBlack{
      border-right: 2px solid #2a364b
    }
    .broderWrite{
      border-right: 2px solid #f2f2f6
    }
    .el-menu{
      border-right:solid 0px #e6e6e6
    }
    .title{
      font-size: 16px;
    }
    .icon{

    }
  }
</style>
