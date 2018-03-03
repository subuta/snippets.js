import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default (srcDir = 'src') => {
  const imports = s.import([
    ['proxyquire', 'proxyquire'],
    ['../../../config', null, [
      ['absolutePath']
    ]]
  ])

  return build`
    ${imports}
    
    // knex injected modules.
    
    export const model = (knex) => {
      return proxyquire(absolutePath('${srcDir}/api/model'), {
        '${srcDir}/api/utils/knex': knex
      }).default
    }
    
    export const api = (knex) => {
      const middleware = proxyquire(absolutePath('${srcDir}/api/middlewares/models'), {
        '${srcDir}/api/model': model(knex)
      }).default
    
      return proxyquire(absolutePath('${srcDir}/api/routes'), {
        '${srcDir}/api/middleware/models': middleware
      }).default
    }

  `
}
