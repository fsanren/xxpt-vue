<template>
  <div class="nav-tags-container">
    <!-- <el-button class="nav-tag-left-button" @click="handleScrollleft" icon="el-icon-arrow-left"></el-button> -->
    <scroll-pane ref="scrollPane" class="nav-tags-wrapper">
      <router-link
        v-for="tag in Array.from(navtagViews)"
        ref="tag"
        :key="tag.path"
        class="nav-tags-item"
        :class="isActive(tag)?'onactive':''"
        :to="tag.path"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
      <el-button type="text" class="nav-open-tags el-icon-arrow-down" @click="openTags($event)" />
    </scroll-pane>
    <!-- <el-button class="nav-tag-right-button" @click="handleScrollright" icon="el-icon-arrow-right"></el-button> -->
    <!-- <el-button @click="handleScrollright" style="background-color:#1E2A44;color:#FFFFFF;top:15px;left:1650px;position: absolute;border-width:0px;width:10px;padding-left:0xp;padding-right:0px;" icon="el-icon-arrow-right"></el-button> -->
    <ul v-show="visible" class="contextmenu" :style="{left:left+'px'}">
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
    <ul v-show="tagsvisible" class="alltagsview" :style="{left:tagsleft+'px'}">
      <li v-for="navtag in Array.from(visitedViews)" style="width:100%;height:100%">
        <router-link :key="navtag.path" style="display:inline-block;width: 104px;" :to="navtag.path">{{ navtag.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/common/utils/i18n'

export default {
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      tagsvisible: false,
      top: 64,
      left: 0,
      tagsleft: 0,
      selectedTag: {}
    }
  },
  computed: {
    navtagViews () {
      return this.$store.state.tagsView.navtagViews
    },
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    tagsvisible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeTags)
      } else {
        document.body.removeEventListener('click', this.closeTags)
      }
    }
  },
  mounted () {
    this.addViewTags()
  },
  methods: {
    generateTitle, // generateTitle by vue-i18n
    generateRoute () {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags () {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
      console.log('添加完成！')
    },
    handleScrollleft () {
      this.$refs.scrollPane.handleScrollleft()
    },
    handleScrollright () {
      this.$refs.scrollPane.handleScrollright()
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
          console.log(this.tagnum)
        }
      })
    },
    closeOthersTags () {
      this.$router.push(this.selectedTag.path)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        console.log(this.tagnum)
        this.moveToCurrentTag()
      })
    },
    closeAllTags () {
      this.$store.dispatch('delAllViews')
      console.log(this.tagnum)
      this.$router.push('/')
    },
    openMenu (tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = (e.clientY - 50)
    },
    openTags (e) {
      this.tagsvisible = true
      this.tagsleft = e.clientX
    },
    closeTags (e) {
      this.tagsvisible = false
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

