import { build, format, snippets as s } from 'bld.js'
import pluralize from 'pluralize'
import _ from 'lodash'

export default (Models = {}) => {
  const keys = _.map(_.keys(Models), (r) => s.modelName(r))
  const modelImports = _.zip(_.map(keys, (k) => `./${k}`), keys)
  const models = _.zipObject(keys, keys)

  const imports = s.import([
    ['lodash', '_'],
    ['objection', null, [
      'Model'
    ]],
    ['src/api/utils/knex', 'knex'],
    ...modelImports
  ])

  return build`
    ${imports}
    
    // assign connection to knex.
    Model.knex(knex)
    
    // then require all without itself.
    const modules = ${s.raw(models)}
    
    // pick class definition from modules.
    const models = _.transform(modules, (result, module, key) => result[key] = module.default || module, {})
    
    // call register of each model.
    _.each(modules, (fn) => fn.register(models))
    
    ${s.export(build`
      models
    `)}
  `
}
