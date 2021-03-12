const path = require('path')
const generateHttpService = require('@sparing-software/sparing-open-api')

module.exports = function sparingCenter (moduleOptions) {
  /*
  ** Options
  */
  const options = { ...this.options.sparingCenter, ...moduleOptions }

  function defaultValue (option, value) {
    return option === undefined ? value : option
  }

  options.openApiService = defaultValue(options.openApiService, true)
  options.trailingSlash = defaultValue(options.trailingSlash, null)
  options.axiosI18nHeader = defaultValue(options.axiosI18nHeader, false)
  options.styleResources = defaultValue(options.styleResources, true)
  options.sassUtilsCollection = defaultValue(options.sassUtilsCollection, true)
  options.boxSizing = defaultValue(options.boxSizing, true)
  options.fixBrowserStyles = defaultValue(options.fixBrowserStyles, 'reset')
  options.fixFontSmoothing = defaultValue(options.fixFontSmoothing, true)

  /*
  ** Sparing plugins
  */
  const SPARING_PLUGINS = {
    SSR: [],
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

  /*
  ** Custom plugins
  */
  const customPluginsDir = path.join(__dirname, 'custom-plugins')

  if (options.axiosI18nHeader) {
    const headerName = typeof options.axiosI18nHeader === 'boolean'
      ? 'Accept-Language'
      : options.axiosI18nHeader

    this.addPlugin({
      src: path.resolve(customPluginsDir, 'axios-i18n-header.ts'),
      options: {
        headerName
      }
    })
  }

  /*
  ** Modules
  */
  const CSS_DIR = '~/node_modules/@sparing-software/nuxt-sparing-center/lib/css/'
  this.options.styleResources = defaultValue(this.options.styleResources, { scss: [] })

  if (options.styleResources) {
    this.options.styleResources.scss.push('@/assets/sass/_vars.scss', '@/assets/sass/_mixins.scss')

    if (options.sassUtilsCollection) {
      this.options.styleResources.scss.unshift(CSS_DIR + 'sass-utils-collection.scss')
    }

    this.addModule('@nuxtjs/style-resources')
  }

  if (options.openApiService) {
    this.nuxt.hook('build:before', () => {
      return generateHttpService()
    })
  }

  /*
  ** Trailing slash
  */
  const middlewaresDir = path.join(__dirname, 'middlewares')
  if (options.trailingSlash !== null) {
    const { trailingSlash } = options
    const middleware = require(path.resolve(middlewaresDir, 'trailingSlash.js'))(trailingSlash)
    this.addServerMiddleware(middleware)

    const router = this.options.router || {}
    this.options.router = {
      ...router,
      trailingSlash
    }
  }

  /*
  ** CSS
  */
  if (options.boxSizing) {
    this.options.css.push(CSS_DIR + 'box-sizing.css')
  }

  if (options.fixBrowserStyles === 'reset') {
    this.options.css.unshift(CSS_DIR + 'reset.css')
  } else if (options.fixBrowserStyles === 'normalize') {
    this.options.css.unshift('normalize.css')
  }

  if (options.fixFontSmoothing) {
    this.options.css.push(CSS_DIR + 'font-smoothing.css')
  }
}
