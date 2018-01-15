import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default (type) => _.toUpper(_.snakeCase(type))
