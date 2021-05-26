// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle (title) {
  const hasKey = this.$te('ptglil8n.' + title)
  const translatedTitle = this.$t('ptglil8n.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}
