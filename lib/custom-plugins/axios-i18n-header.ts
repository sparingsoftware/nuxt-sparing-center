import axios from 'axios'
import { Context } from '@nuxt/types'

export default function ({ app }: Context) {
  axios.interceptors.request.use(config => {
    config.headers.common['<%= options.headerName %>'] = app.i18n.locale
    return config
  })
}
