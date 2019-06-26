import Vue from 'vue'

const requireComponent = require.context(
  '../components', // The relative path of the widget components folder
  true, // Look in subfolders

  // The regular expression used to match base component filenames
  // @/components/BaseName.vue
  // @/components/subfolder/BaseName.vue
  /.?.?Base[A-Z].*\.vue$/
)

requireComponent.keys().forEach(fileName => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )

  Vue.component(baseComponentName, baseComponentConfig)
})
