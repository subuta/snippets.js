import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Model from 'lib/objection/Model'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create objection Child', async (t) => {
  const code = Model()

  const expected = build`
    import _ from 'lodash'
    import {Model} from 'objection'
    import ajvValidator from 'src/utils/ajvValidator'
    
    // Based on https://github.com/Vincit/objection.js/blob/master/examples/plugin/index.js
    // Base Model class
    
    class CustomQueryBuilder extends Model.QueryBuilder {
      async findFirst(params) {
        return _.first(await this.where(params))
      }
    
      async findOrCreate(params) {
        const {where, defaults} = params
        const found = await this.findFirst(where)
        if (found) return found
        return await this.insert(defaults)
      }
    }
    
    export default class extends Model {
      static QueryBuilder = CustomQueryBuilder
    
      static createValidator() {
        // https://github.com/Vincit/objection.js/issues/549
        // NOTE: createValidator() is inherited in all models extending \`BaseModel\`
        // and returns the same instance of \`validator\`
        return ajvValidator
      }
    
      $beforeInsert() {
        this.created_at = new Date().toISOString()
      }
    
      $beforeUpdate() {
        this.updated_at = new Date().toISOString()
      }
    }

  `

  t.is(format(code), format(expected))
})