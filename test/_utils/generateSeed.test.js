import test from 'ava'
import _ from 'lodash'

import { build, format, snippets as s } from 'bld.js'

import generateSeed from 'lib/_utils/generateSeed'
import sinon from 'sinon'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should return seed data for fake user', async (t) => {
  const clock = sinon.useFakeTimers();

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

  t.deepEqual(seed.name, '佐藤 蓮')
  t.deepEqual(seed.loggedInCount, 86856)
  t.deepEqual(seed.email, 'Monroe_Lowe45@yahoo.com')
  t.deepEqual(seed.avatar, 'https://s3.amazonaws.com/uifaces/faces/twitter/d_nny_m_cher/128.jpg')
  t.deepEqual(seed.locale, 'nb_NO')

  t.truthy(_.isDate(seed.lastSignInAt))
  t.deepEqual(seed.lastSignInAt.toISOString(), '1969-02-13T23:42:37.074Z')

  clock.restore();
})

test('should return seed data for fake book', async (t) => {
  const clock = sinon.useFakeTimers();

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

  t.deepEqual(seed.title, 'Oman')
  t.deepEqual(seed.authorId, 12495)
  t.deepEqual(seed.price, '91.00')
  t.deepEqual(seed.dateStr, '1970-11-20T02:31:46.870Z')

  clock.restore();
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

  t.deepEqual(seed.tag, ['Accountability'])
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
  t.deepEqual(seed.address.streetAddress, '34543 Hills Coves')
  t.deepEqual(seed.address.city, 'East Gabrielle')
  t.deepEqual(seed.address.state, 'Oklahoma')
  t.deepEqual(seed.countryCode, 'SN')
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

  t.deepEqual(seed.name, 'Gleichner, Hilll and Turner')
})
