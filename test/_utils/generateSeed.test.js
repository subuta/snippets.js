/* global expect, describe, it, beforeEach, afterEach */

import _ from 'lodash'

import { build, format, snippets as s } from 'bld.js'

import generateSeed, { generateSeeds } from 'lib/_utils/generateSeed'

describe('utils/generateSeed', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should return seed data for fake user', () => {
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
    }, 0, { locale: 'ja' })

    expect(seed).toMatchSnapshot()
  })

  it('should return seed data for fake user without locale', () => {
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
    })

    expect(seed).toMatchSnapshot()
  })

  it('should return seed data for fake user with today(1970/1/1)', () => {
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
    }, 0, { today: '1970/1/1' })

    expect(seed).toMatchSnapshot()
  })

  it('should return seed data for fake book', () => {
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

describe('utils/generateSeeds', () => {
  it('should return seed data for fake 3 user', () => {
    const seed = generateSeeds({
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
    }, 3, { locale: 'ja' })

    expect(seed).toMatchSnapshot()
  })
})
