const webpack = require('webpack')
const path = require('path')

let useRealReact = Object.assign(
  { development: true, production: false },
  require(path.resolve(process.cwd(), 'package.json')).useRealReact || {}
)

if (process.env.NODE_ENV === 'production') {
  useRealReact = useRealReact.production
} else {
  useRealReact = useRealReact.development
}

module.exports = {
  resolve: Object.assign(
    {},
    useRealReact
      ? {}
      : {
          alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat',
          },
        }
  ),
}
