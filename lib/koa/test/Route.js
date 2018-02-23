import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import IndexActionTest from './actions/All'
import ShowActionTest from './actions/Show'
import CreateActionTest from './actions/Create'
import UpdateActionTest from './actions/Update'
import DestroyActionTest from './actions/Destroy'

import getControllerActions from 'lib/_utils/getControllerActions'

export default (props) => {
  let {
    model,
    routeConfig = {}
  } = props

  const {
    imports = []
  } = routeConfig

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  const Import = s.import([
    ...imports,
    ['ava', 'test'],
    ['lodash', '_'],
    ['sinon', 'sinon'],
    ['supertest', 'request'],
    ['jwks-rsa/tests/mocks/jwks', null, [
      ['jwksEndpoint']
    ]],
    ['jwks-rsa/tests/mocks/keys', null, [
      ['publicKey'],
      ['privateKey']
    ]],
    ['jwks-rsa/tests/mocks/tokens', null, [
      ['createToken']
    ]],
    ['koa', 'Koa'],
    ['import-fresh', 'importFresh'],
    ['../../config', null, [
      ['absolutePath']
    ]],
    ['test/helper/user', null, [
      ['currentUser']
    ]],
    ['test/helper/fixtures', 'runSeed', [
      ['runMigration']
    ]],
    ['proxyquire', 'proxyquire']
  ])

  const renderActionTest = (action) => {
    switch (action) {
      case 'index':
        return IndexActionTest(props)
      case 'show':
        return ShowActionTest(props)
      case 'create':
        return CreateActionTest(props)
      case 'update':
        return UpdateActionTest(props)
      case 'destroy':
        return DestroyActionTest(props)
    }
  }

  const tests = _.map(getControllerActions(routeConfig), renderActionTest)

  return build`
    ${Import}
    
    const sandbox = sinon.sandbox.create()
    
    test.beforeEach(async (t) => {
      const knex = importFresh(absolutePath('src/utils/knex')).default
    
      await runMigration(knex)
      await runSeed(knex)
    
      const api = require('test/helper/mocked').api(knex)
      const models = require('test/helper/mocked').model(knex)
    
      const app = new Koa()
      // handle /api requests
      app.use(api.routes())
      app.use(api.allowedMethods())
    
      t.context = {
        ...models,
        request: request(app.listen(0))
      }
    })
    
    test.afterEach((t) => {
      sandbox.reset()
    })
    
    ${tests}
    
    /* mat Custom tests [start] */
    /* mat Custom tests [end] */
  `
}
