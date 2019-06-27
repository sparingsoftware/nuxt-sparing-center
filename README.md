# Nuxt sparing center

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/SparingSoftware/nuxt-sparing-center/blob/master/LICENSE)
[![Downloads number](https://img.shields.io/npm/dt/@sparing-software/nuxt-sparing-center.svg)](https://www.npmjs.com/package/@sparing-software/nuxt-sparing-center)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Nuxt plugin manager to quick project setup :rocket:

## Installation
Install package in your project 
```bash
npm i @sparing-software/nuxt-sparing-center
```

## Configuration
Add module in `nuxt.config.js`
```js
modules: [
  '@sparing-software/nuxt-sparing-center'
],

sparingCenter: {
  // ... options
}
```

## Options

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `plugins`                      | Import nuxt plugins without any installation or configuration. Available plugins: <br> ['[vue-on-resize](https://github.com/SparingSoftware/vue-on-resize)', '[nuxt-service-plugin](https://github.com/SparingSoftware/nuxt-service-plugin)', '[v-clamp](https://github.com/SparingSoftware/v-clamp)'] | `[]` |
| `baseImport`                   | Autoimport [base components](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) and make them global. | `false` |
| `axiosI18nHeader`              | Add `Accept-Language` header with current `i18n.locale` value to every axios request. Caveat: `@sparing-software/nuxt-sparing-center` must be set before `@nuxtjs/axios` module. | `false` |
| `styleResources`               | Import `@/assets/sass/_vars.scss` and `@/assets/sass/_mixins.scss` to every vue component. | `true` |
| `sassUtilsCollection`          | Import [sass-utils-collection](https://github.com/adrianklimek/sass-utils-collection) - `styleResources` must be enabled. | `true` |

## Example
```js
sparingCenter: {
  baseImport: true,
  axiosI18nHeader: true,
  plugins: [
    'vue-on-resize',
    'nuxt-service-plugin',
    'v-clamp'
  ]
}
```

## Contributing
Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
