<template>
  <div style="display: inline-block;display:flex;display:-webkit-flex;white-space:nowrap;">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :key="item.children[0].name" :to="item.path+'/'+item.children[0].path">
        <el-menu-item style="list-style: none;display:inline-block;;height:64px;line-height:64px;white-space:nowrap !important;" :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :key="item.name" style="display:inline-block;display:flex;display:-webkit-flex;height:64px;line-height:64px;white-space:nowrap !important; " :class="{'submenu-title-noDropdown':isNest}" :index="item.name||item.path">
        <div class="shangsj" />
        <template slot="title">
          <span v-if="item.meta&&item.meta.title" slot="title">{{ item.meta.title }}</span>
          <i :class="{'el-submenu__icon-arrow el-icon-arrow-right':isNest}" />
        </template>
        <template v-for="child in item.children" v-if="!child.hidden">
          <navmenu-item v-if="child.children&&child.children.length>0" :key="child.path" :is-nest="true" :routes="[child]" />
          <router-link v-else :key="child.name" :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.title" slot="title">{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/common/utils/i18n'
import { mapGetters } from 'vuex'

export default {
  name: 'NavmenuItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    hasOneShowingChildren (children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    generateTitle
  }
}
</script>

