<template>
  <div>
    <script id="editor" type="text/plain" />
  </div>
</template>
<script>
export default {
  props: {
    value: ,
    config: {}
  },
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = window.UE.getEditor('editor', this.config)
    this.editor.addListener('ready', () => {
      this.editor.setContent(this.value)
    })
  },
  destroyed () {
    this.editor.destroy()
  },
  methods: {
    getUEContent () {
      return this.editor.getContent()
    },
    setUEContent (content) {
      this.editor.setContent(content)
    }
  }
}
</script>
