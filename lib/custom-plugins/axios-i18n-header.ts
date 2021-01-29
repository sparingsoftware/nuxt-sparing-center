import axios from 'axios'

export default function ({ app }) {
  axios.interceptors.request.use(config => {
    config.headers.common['<%= options.headerName %>'] = app.i18n.locale
    return config
  })
}
