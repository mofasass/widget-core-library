const babelJest = require('babel-jest')
const babelOptions = require('../webpack/babel-options')

module.exports = babelJest.createTransformer(babelOptions('test'))
