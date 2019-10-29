module.exports = function (addSlash) {
  return function redirectRoute (req, res, next) {
    const { pathname, search } = new URL(`http://domain.com${req.url}`)
    const hasTrailingSlash = pathname.substr(-1) === '/'

    /*
    ** If home page or request url same as slashing policy - pass through
    */
    const isHomePage = pathname.length <= 1
    const sameAsPolicy = hasTrailingSlash === addSlash
    if (isHomePage || sameAsPolicy) return next()

    /*
    ** Add or remove slash from pathname depending on the policy
    */
    const toPath = !hasTrailingSlash && addSlash
      ? `${pathname}/`
      : pathname.slice(0, pathname.length - 1)

    /*
    ** Generate correct link
    */
    const toURL = toPath + (search || '')

    try {
      res.setHeader('Location', toURL)
      res.statusCode = 301
      res.end()
    } catch (error) {
      next()
    }
  }
}
