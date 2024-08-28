module.exports = {
    webpack: {
      configure: {
        devtool: 'eval-cheap-module-source-map',
        ignoreWarnings: [
          function ignoreSourcemapsloaderWarnings(warning) {
            return (
              warning.module &&
              warning.module.resource.includes('node_modules') &&
              warning.details &&
              warning.details.includes('source-map-loader')
            )
          },
        ],
      },
    },
  }