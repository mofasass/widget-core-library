const chalk = require('chalk'),
  exec = require('./exec'),
  path = require('path')

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
/**
 * Deletes distribution folder recursively
 * @returns {Promise}
 */
const test = ({
  options
}) => {
  const coreLibraryPath = path.resolve(__dirname, '../')
  const subjectPath = process.cwd()
  const config = {
    /*
      this object is serialized into a CLI command
      that is why we have to use so many backslashes in the regular expressions
      */
    moduleDirectories: [
      'node_modules',
      path.resolve(coreLibraryPath, 'node_modules'),
    ],
    moduleNameMapper: {
      ['\\.(s?css|less|html)$']: 'identity-obj-proxy',
    },
    rootDir: subjectPath,
    testRegex: '(./tests/.*|(\\.|/)(test|spec))\\.jsx?$',
    transform: {
      '\\.jsx?$': path.resolve(coreLibraryPath, './jest/transform.js'),
      '\\.(jpe?g|png|svg|gif)$': path.resolve(
        coreLibraryPath,
        './jest/fileTransform.js'
      ),
    },
    setupTestFrameworkScriptFile: path.resolve(
      coreLibraryPath,
      './jest/setupTests.js'
    ),
    transformIgnorePatterns: [
      '/node_modules/(?!(kambi-widget-core-library|kamb-wc-widget-components)/)', // transforms core-library and widget-components as well but ignores the rest of /node_modules/
    ],
    testURL: 'https://localhost/'
  }

  const nodeParams = []
  const jestParams = options.jestopts.split(' ')

  const debug = jestParams.indexOf('--debug') !== -1

  if (debug) {
    // Breakpoints are currently not working (tested on nodejs 7.6)
    // see https://github.com/facebook/jest/issues/1652
    jestParams.push('--runInBand') // makes the tests run serially instead of in parallel
    nodeParams.push('--inspect')
    nodeParams.push('--debug-brk')
    jestParams.splice(jestParams.indexOf('--debug'), 1)
  }

  jestParams.push('--colors')
  jestParams.push(`--config=${JSON.stringify(config)}`)

  // opts =  [ 'run', 'jest', '--', '--colors', '--watch' ]
  // opts.push(`--config=${JSON.stringify(config)}`)
  // return exec('npm',)

  const params =
    process.platform === 'win32' ?
    nodeParams
    .concat(['./node_modules/jest/bin/jest.js'])
    .concat(jestParams) :
    nodeParams.concat(['./node_modules/.bin/jest']).concat(jestParams)

  return exec('node', params, {
    cwd: subjectPath
  })
}

test.config = {
  name: 'test',
  description: 'Runs test suite. All options except --debug are passed to directly to jest. Jest options can be found here: https://facebook.github.io/jest/docs/cli.html',
  options: [
    [
      '',
      'debug',
      'Runs the tests in debug mode. Requires Nodejs version 6.3 or higher. It is better to run this in conjuction with the watch mode. As of Nodejs version 7.6 breakpoints and debugger statements are ignored. This is a bug in Nodejs',
    ],
  ],
}

module.exports = [test]