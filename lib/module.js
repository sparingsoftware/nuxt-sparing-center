const path = require('path')

module.exports = function sparingCenter (moduleOptions) {
  /*
  ** Options
  */
  const options = { ...this.options.sparingCenter, ...moduleOptions }

  function defaultValue (option, value) {
    return option === undefined ? value : option
  }

  options.baseImport = defaultValue(options.baseImport, false)
  options.axiosI18nHeader = defaultValue(options.axiosI18nHeader, false)
  options.axiosGenerateCache = defaultValue(options.axiosGenerateCache, false)
  options.styleResources = defaultValue(options.styleResources, true)
  options.sassUtilsCollection = defaultValue(options.sassUtilsCollection, true)
  options.boxSizing = defaultValue(options.boxSizing, true)
  options.fixBrowserStyles = defaultValue(options.fixBrowserStyles, 'reset')

  /*
  ** Sparign plugins
  */
  const SPARING_PLUGINS = {
    SSR: ['nuxt-service-plugin'],
    NO_SSR: ['v-clamp', 'vue-on-resize', '100vh']
  }

  const plugins = options.plugins || []
  const sparingPluginsDir = path.join(__dirname, 'sparing-plugins')

  plugins.forEach(plugin => {
    this.addPlugin({
      src: path.resolve(sparingPluginsDir, plugin + '.js'),
      ssr: SPARING_PLUGINS.SSR.includes(plugin)
    })
  })

  if (plugins.includes('nuxt-service-plugin')) {
    this.options.build.transpile.push('@sparing-software/nuxt-service-plugin')
  }

  /*
  ** Custom plugins
  */
  const customPluginsDir = path.join(__dirname, 'custom-plugins')

  if (options.baseImport) {
    this.addPlugin({
      src: path.resolve(customPluginsDir, 'base-import.js')
    })
  }

  if (options.axiosI18nHeader) {
    const headerName = typeof options.axiosI18nHeader === 'boolean'
      ? 'Accept-Language'
      : options.axiosI18nHeader

    this.addPlugin({
      src: path.resolve(customPluginsDir, 'axios-i18n-header.js'),
      options: {
        headerName
      }
    })
  }

  if (options.axiosGenerateCache) {
    this.addPlugin({
      src: path.resolve(customPluginsDir, 'axios-generate-cache.js')
    })
  }

  /*
  ** Modules
  */
  const CSS_DIR = '~/node_modules/@sparing-software/nuxt-sparing-center/lib/css/'

  if (options.styleResources) {
    this.options.styleResources = {
      scss: [
        '@/assets/sass/_vars.scss',
        '@/assets/sass/_mixins.scss'
      ]
    }

    if (options.sassUtilsCollection) {
      this.options.styleResources.scss.unshift(CSS_DIR + 'sass-utils-collection.scss')
    }

    this.addModule('@nuxtjs/style-resources')
  }

  /*
  ** CSS
  */
  if (options.boxSizing) {
    this.options.css.push(CSS_DIR + 'box-sizing.css')
  }

  if (options.fixBrowserStyles === 'reset') {
    this.options.css.push(CSS_DIR + 'reset.css')
  } else if (options.fixBrowserStyles === 'normalize') {
    this.options.css.push('normalize.css')
  }
}
