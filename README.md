<div align="center">
  <h1 align="center">Nuxt Sparing Center</h1>

  <p align="center">
    <img src="https://user-images.githubusercontent.com/22821575/97916617-8709f580-1d53-11eb-9c88-ad89968170ba.png" alt="Nuxt Sparing Center Logo">
  </p>

  <p align="center">
    <a href="https://github.com/SparingSoftware/nuxt-sparing-center/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="MIT license">
    </a> 
    <a href="https://www.npmjs.com/package/@sparing-software/nuxt-sparing-center">
      <img src="https://img.shields.io/npm/dt/@sparing-software/nuxt-sparing-center.svg" alt="Downloads number">
    </a>
    <a href="https://standardjs.com">
      <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide">
    </a>
  </p>
  
  <p align="center">
    Nuxt plugin manager for quick project setup :rocket:
  </p>
</div>

## Installation
Install package in your project 
```bash
npm i @sparing-software/nuxt-sparing-center
```

## Configuration
Add module in `nuxt.config.js`
```js
modules: [
  ['@sparing-software/nuxt-sparing-center', {
    // ... options
  }]
]
```

## Options

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `plugins`                      | Import nuxt plugins without any installation or configuration. Available plugins: <br> ['[vue-on-resize](https://github.com/SparingSoftware/vue-on-resize)', '[v-clamp](https://github.com/SparingSoftware/v-clamp)', '[100vh](https://github.com/SparingSoftware/100vh)'],  | `[]` |
| `serviceModule`                | Import [nuxt-service-module](https://github.com/SparingSoftware/nuxt-service-module).<br> Available options: `true`, `false`, {[...options](https://github.com/SparingSoftware/nuxt-service-module#options)} <br> Caveat: `@sparing-software/nuxt-sparing-center` must be set before `@nuxtjs/axios` module. | `false` |
| `baseImport`                   | Autoimport [base components](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) and make them global. | `false` |
| `trailingSlash`                | Forcing/force removing trailing slash at the end of the urls. Available options: `true`, `false`, `null`. Caveat: required `nuxtjs` version is `2.10.1+` | `null` |
| `axiosI18nHeader`              | Add `Accept-Language` header with current `i18n.locale` value to every axios request. Caveat: `@sparing-software/nuxt-sparing-center` must be set before `@nuxtjs/axios` module. | `false` |
| `axiosGenerateCache`           | Enable axios cache in site generation to prevent HTTP flood. | `false` |
| `styleResources`               | Import `@/assets/sass/_vars.scss` and `@/assets/sass/_mixins.scss` to every vue component. | `true` |
| `sassUtilsCollection`          | Import [sass-utils-collection](https://github.com/adrianklimek/sass-utils-collection) - `styleResources` must be enabled. | `true` |
| `boxSizing`                    | Set global `box-sizing: border-box` | `true` |
| `fixBrowserStyles`             | Overwrite user agent styles: `'reset'`, `'normalize'`, `false` | `'reset'` |
| `fixFontSmoothing`             | Fix default font-smoothing: `true`, `false` | `true` |

## Example
```js
['@sparing-software/nuxt-sparing-center', {
  baseImport: true,
  trailingSlash: true,
  serviceModule: {
    httpClient: 'path/to/httpClient'
  },
  axiosI18nHeader: true,
  axiosGenerateCache: true,
  plugins: [
    'v-clamp',
    'vue-on-resize'
  ]
}]
```

## Contributing
Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
