import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'

const TEN_MINUTES = 1000 * 60 * 10
const defaultCache = new LRUCache({ maxAge: TEN_MINUTES })

export default ({ $axios }) => {
  if (process.static) {
    const defaults = $axios.defaults
    defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
      enabledByDefault: true,
      cacheFlag: 'useCache',
      defaultCache
    })
  }
}
