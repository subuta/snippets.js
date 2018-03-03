import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import {
  generateSeedsWithRelation,
  generateSeedWithRelation
} from 'lib/_utils/generateSeed'

// route for user.
export default (props) => {
  let {model, routesConfig, modelsConfig} = props

  const routeConfig = routesConfig[model]
  const modelConfig = modelsConfig[model]

  const {
    eager = ''
  } = routeConfig

  const seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)

  // get next seed
  const oldSeed = _.first(seeds)
  let seed = generateSeedWithRelation(model, modelsConfig, seeds.length)

  // simulate update model
  const seedForUpdate = {
    ...seed,
    id: oldSeed.id,
    auth0Id: oldSeed.auth0Id,
  }

  // Ensure naming convention.
  model = pluralize.singular(model)

  const Import = s.import([
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
    ['../../../config', null, [
      ['absolutePath']
    ]],
    ['test/api/helper/user', null, [
      ['currentUser'],
      ['createPayload']
    ]],
    ['test/api/helper/fixtures', 'runSeed', [
      ['runMigration']
    ]],
    ['proxyquire', 'proxyquire']
  ])

  return build`
    ${Import}
    
    const sandbox = sinon.sandbox.create()
    
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
    
    test('get me should return user', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/users/me')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      
      ${_.map(oldSeed, (value, key) => {
        return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
      })}
    })
    
    test('put me should update user if exists', async (t) => {
      const {request, User} = t.context
    
      const user = await User.query().findOne({auth0Id: ${s.stringify(oldSeed.auth0Id)}})
      t.not(user, undefined)
    
      // mock jwks
      const token = createToken(privateKey, '123', createPayload(user.auth0Id))
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .put('/api/users/me')
        .set('Authorization', \`Bearer \$\{token\}\`)
        .send({
          user: ${s.stringify(seedForUpdate)}
        })
    
      t.is(response.status, 200)
      
      ${_.map(seedForUpdate, (value, key) => {
        return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
      })}
    })
    
    test('put me should create user if not exists', async (t) => {
      const {request, User} = t.context
    
      const user = await User.query().findOne({auth0Id: ${s.stringify(seed.auth0Id)}})
      t.is(user, undefined)
    
      // mock jwks
      const token = createToken(privateKey, '123', createPayload(${s.stringify(seed.auth0Id)}))
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .put('/api/users/me')
        .set('Authorization', \`Bearer \$\{token\}\`)
        .send({
          user: ${s.stringify(seed)}
        })
    
      t.is(response.status, 200)
      
      // should ignore invalid id param
      t.not(response.body.id, ${s.stringify(seed.id)})
      
      // other props should persisted.
      ${_.map(_.omit(seed, 'id'), (value, key) => {
        return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
      })}
    })
  `
}
