const getMinifiedIdent = require('./get-minified-ident')

const LETTER = /[A-Za-z]/

module.exports = (config, {
  dictionary = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ0123456789',
  enable = process.env.NODE_ENV === 'production',
  prefix = '',
  suffix = ''
}) => {
  if (!enable) {
    return config
  } else if (!LETTER.test(dictionary)) {
    throw new Error('"dictionary" option must have at least one letter')
  }

  return {
    ...config,

    webpack: (webpackConfig, ...rest) => {
      for (const { oneOf } of webpackConfig.module.rules) {
        if (!oneOf?.length) {
          continue
        }

        for (const { use } of oneOf) {
          if (!use) {
            continue
          }

          for (const { loader, options } of use) {
            if (!loader?.includes('/css-loader/') || !options?.modules) {
              continue
            }

            options.modules.getLocalIdent = (context, _, localName) => {
              const identParts = { path: context.resourcePath, localName }
              const minifiedIdent = getMinifiedIdent(identParts, dictionary)
              return `${prefix}${minifiedIdent}${suffix}`
            }
          }
        }
      }

      return typeof config.webpack === 'function'
        ? config.webpack(webpackConfig, ...rest)
        : webpackConfig
    }
  }
}
