const path = require('path')
const babel = require('babel-core')

module.exports = function (wallaby) {
  return {
    files: [
      'lib/**/*.js',
      'test2/helper/**/*.js',
    ],

    tests: [
      'test2/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: `NODE_ENV=test;NODE_PATH=${path.join(wallaby.projectCacheDir, '../')}:${path.join(__dirname, '../node_modules')}`,
      },
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel,
        babelrc: true,
        plugins: [
          [
            'module-resolver',
            {
              root: ['./'],
              alias: {
                test: './test',
              }
            }
          ]
        ]
      })
    }
  }
}
