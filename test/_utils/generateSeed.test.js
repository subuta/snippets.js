import test from 'ava'
import _ from 'lodash'

import { build, format, snippets as s } from 'bld.js'

import generateSeed from 'lib/_utils/generateSeed'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should return seed data for fake user', async (t) => {
  const seed = generateSeed({
    schema: {
      tableName: 'users',
      properties: {
        name: {
          type: 'string'
        },

        userName: {
          type: 'string'
        },

        loggedInCount: {
          type: 'number'
        },

        email: {
          type: 'string'
        },

        avatar: {
          type: 'string'
        },

        locale: {
          type: 'string'
        },

        lastSignInAt: {
          type: 'string',
          format: 'date'
        }
      }
    }
  }, 'ja')

  t.truthy(_.isString(seed.name))
  t.truthy(_.isString(seed.userName))
  t.truthy(_.isNumber(seed.loggedInCount))
  t.truthy(_.isString(seed.email))
  t.truthy(_.isString(seed.avatar))
  t.truthy(_.isString(seed.locale))
  t.truthy(_.isDate(seed.lastSignInAt))
})

test('should return seed data for fake book', async (t) => {
  const seed = generateSeed({
    schema: {
      tableName: 'books',
      properties: {
        title: {
          type: 'string'
        },

        authorId: {
          type: 'number'
        },

        price: {
          type: 'string'
        },

        dateStr: {
          type: 'string',
          format: 'date'
        }
      }
    }
  })

  t.truthy(_.isString(seed.title))
  t.truthy(_.isNumber(seed.authorId))
  t.truthy(_.isString(seed.price))
  t.truthy(_.isString(seed.dateStr))
})

test('should return data for array with items', async (t) => {
  const seed = generateSeed({
    schema: {
      tableName: 'article',
      properties: {
        tag: {
          type: 'array',
          items: { type: "string" }
        }
      }
    }
  })

  t.truthy(_.isString(seed.tag))
})

test('should return data for object with items', async (t) => {
  const seed = generateSeed({
    schema: {
      tableName: 'users',
      properties: {
        address: {
          type: 'object',
          properties: {
            "streetAddress": { "type": "string" },
            "city":           { "type": "string" },
            "state":          { "type": "string" }
          }
        },

        countryCode: {
          type: 'string'
        }
      }
    }
  })

  t.truthy(_.isObject(seed.address))
  t.truthy(_.isString(seed.address.streetAddress))
  t.truthy(_.isString(seed.address.city))
  t.truthy(_.isString(seed.address.state))
  t.truthy(_.isString(seed.countryCode))
})

test('should return data for company name', async (t) => {
  const seed = generateSeed({
    schema: {
      tableName: 'companies',
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  })

  t.truthy(_.isString(seed.name))
})
