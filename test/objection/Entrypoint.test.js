import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/objection/Entrypoint'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create objection Entrypoint', async (t) => {
  const code = Entrypoint({modelDir: 'src/model'})

  const expected = build`
    require('babel-register')

    import _ from 'lodash'
    import requireGlob from 'require-glob'
    import {Model} from 'objection'
    import {absolutePath} from '../../config'
    import knex from 'src/utils/knex'
    
    // assign connection to knex.
    Model.knex(knex)
    
    // then require all without itself.
    const modules = requireGlob.sync([
      absolutePath('src/model/*.js'),
      \`!\${absolutePath('src/model/index.js')}\`,
      \`!\${absolutePath('src/model/Model.js')}\`
    ])
    
    // pick class definition from modules.
    const models = _.transform(
      modules,
      (result, module, key) => (result[key] = module.default || module),
      {}
    )
    
    // call register of each model.
    _.each(modules, (fn) => fn.register(models))
    
    export default models

  `

  t.is(format(code), format(expected))
})