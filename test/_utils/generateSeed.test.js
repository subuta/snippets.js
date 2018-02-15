/* global expect, describe, it */

import _ from 'lodash'

import { build, format, snippets as s } from 'bld.js'

import generateSeed from 'lib/_utils/generateSeed'
import sinon from 'sinon'

describe('utils/generateSeed', () => {
  it('should return seed data for fake user', () => {
    const clock = sinon.useFakeTimers()

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

    expect(seed).toMatchSnapshot()

    clock.restore()
  })

  it('should return seed data for fake book', () => {
    const clock = sinon.useFakeTimers()

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

    expect(seed).toMatchSnapshot()

    clock.restore()
  })

  it('should return data for array with items', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'article',
        properties: {
          tag: {
            type: 'array',
            items: {type: 'string'}
          }
        }
      }
    })

    expect(seed).toMatchSnapshot()
  })

  it('should return data for object with items', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          address: {
            type: 'object',
            properties: {
              'streetAddress': {'type': 'string'},
              'city': {'type': 'string'},
              'state': {'type': 'string'}
            }
          },

          countryCode: {
            type: 'string'
          }
        }
      }
    })

    expect(seed).toMatchSnapshot()
  })

  it('should return data for company name', () => {
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

    expect(seed).toMatchSnapshot()
  })
})
