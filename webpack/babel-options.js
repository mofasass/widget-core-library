module.exports = function(environment) {
  if (
    environment !== 'test' &&
    environment !== 'development' &&
    environment !== 'production'
  ) {
    throw new Error('Invalid environment for presets')
  }

  return {
    presets: [
      [
        require('babel-preset-env'),
        {
          targets:
            environment === 'test'
              ? {
                  node: 'current',
                }
              : {
                  browsers: ['last 2 versions', 'ie >= 11'],
                },
          useBuiltIns: false, // polyfills are done manually in the core-library
          modules: 'commonjs',
        },
      ],
      require('babel-preset-react'),
    ],
    plugins: [
      require('babel-plugin-transform-custom-element-classes'),
      require('babel-plugin-transform-class-properties'),
      require('babel-plugin-transform-object-rest-spread'),
    ].concat(
      environment === 'production'
        ? [require('babel-plugin-transform-react-remove-prop-types').default]
        : []
    ),
    babelrc: false,
  }
}
