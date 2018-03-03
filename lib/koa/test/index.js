import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default (Routes = {}, Models = {}) => {
  let model = _.first(_.keys(Routes))
  const routeConfig = Routes[model]
  const modelConfig = Models[model]

  model = s.singular(model)
  const models = s.plural(model)

  const imports = s.import([
    ['ava', 'test'],
    ['lodash', '_'],
    ['sinon', 'sinon'],
    ['supertest', 'request'],
    ['jwks-rsa/tests/mocks/jwks', null, [
      'jwksEndpoint'
    ]],
    ['jwks-rsa/tests/mocks/keys', null, [
      'publicKey',
      'privateKey'
    ]],
    ['jwks-rsa/tests/mocks/tokens', null, [
      'createToken',
    ]],
    ['koa', 'Koa'],
    ['import-fresh', 'importFresh'],
    ['../../config', null, [
      'absolutePath'
    ]],
    ['test/api/helper/user', null, [
      'currentUser'
    ]],
    ['test/api/helper/fixtures', 'runSeed', [
      'runMigration'
    ]],
  ])

  return build`
    ${imports}
    
    const sandbox = sinon.sandbox.create()
    
    const proxyquire = require('proxyquire')
    
    test.beforeEach(async (t) => {
      const knex = importFresh(absolutePath('src/api/utils/knex')).default
    
      await runMigration(knex)
      await runSeed(knex)
    
      const api = require('test/api/helper/mocked').api(knex)
      const models = require('test/api/helper/mocked').model(knex)
    
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
    
    test('should return 401 with No Authorization header', async (t) => {
      const {request} = t.context
    
      const response = await request
        .get('/api/${models}')
    
      t.is(response.status, 401)
      t.deepEqual(response.body, {})
    })
    
    test('should return response with Authorization header', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/${models}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.length, ${modelConfig.seeds})
    })

  `
}
