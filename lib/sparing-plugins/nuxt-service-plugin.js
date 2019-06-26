import createService from '@sparing-software/nuxt-service-plugin'

export default function (ctx, inject) {
  const httpClient = ctx.$axios
  const service = createService(httpClient)

  ctx.$service = service
  inject('service', service)
}
