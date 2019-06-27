const path = require('path')

module.exports = function sparingCenter (moduleOptions) {
  const options = { ...this.options.sparingCenter, ...moduleOptions }

  /*
  ** Sparign plugins
  */
  const SPARING_PLUGINS = {
    SSR: ['nuxt-service-plugin'],
    NO_SSR: ['v-clamp', 'vue-on-resize']
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

  /*
  ** Modules
  */
  if (options.styleResources !== false) {
    this.options.styleResources = {
      scss: [
        '@/assets/sass/_vars.scss',
        '@/assets/sass/_mixins.scss'
      ]
    }
    this.addModule('@nuxtjs/style-resources')
  }
}
