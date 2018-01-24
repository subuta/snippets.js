import { build, format, snippets as s } from 'bld.js'
import pluralize from 'pluralize'
import _ from 'lodash'

export default (Routes = {}) => {
  const keys = _.map(_.keys(Routes), (r) => pluralize(r))
  const apis = _.zipObject(keys, keys)

  const imports = s.import(_.zip(_.map(keys, (k) => `./${k}`), keys))

  return build`
    ${imports}
    
    ${s.export(s.raw(apis))}
  `
}
