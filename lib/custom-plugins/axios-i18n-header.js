export default function ({ $axios, app }) {
  $axios.onRequest(config => {
    config.headers.common['<%= options.headerName %>'] = app.i18n.locale
  })
}
