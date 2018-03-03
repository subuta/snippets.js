import { build, format, snippets as s } from 'bld.js'

export default () => {
  return build`
    require('babel-register')
    module.exports = require('./src/api/utils/knex').config
  `
}
