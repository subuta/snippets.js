/* global expect, describe, it, beforeEach, afterEach */

import _ from 'lodash'

import { build, format, snippets as s } from 'bld.js'

import generateSeed, {
  generateSeeds,
  generateJunctionSeed,
  generateJunctionSeeds,
  generateSeedWithRelation,
  generateSeedsWithRelation
} from 'lib/_utils/generateSeed'

import { Models as ModelsConfig } from 'test/fixtures/config'

describe('utils/generateSeed', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should return single seed data for fake user', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

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
    }, 0, {locale: 'ja'})

    expect(seed).toMatchSnapshot()
  })

  it('should return single seed data for fake user without locale', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

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

  it('should return single seed data for fake user with today(1970/1/1)', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

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
    }, 0, {today: '1970/1/1'})

    expect(seed).toMatchSnapshot()
  })

  it('should return single seed data for fake book', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'books',
        properties: {
          id: {
            type: 'integer'
          },

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

  it('should return signle data for array with items', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'article',
        properties: {
          id: {
            type: 'integer'
          },

          tag: {
            type: 'array',
            items: {type: 'string'}
          }
        }
      }
    })

    expect(seed).toMatchSnapshot()
  })

  it('should return single data for object with items', () => {
    const seed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

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

  it('should return single data for company name', () => {
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

  it('should generate same seed for same schema', () => {
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

    const anotherSeed = generateSeed({
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
      },
      seeds: 3
    })

    expect(seed).toEqual(anotherSeed)
  })

  it('should not generate same seed for different schema', () => {
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

    const anotherSeed = generateSeed({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

          address: {
            type: 'object',
            properties: {
              'streetAddress': {'type': 'string'},
              'city': {'type': 'string'},
              'state': {'type': 'string'}
            }
          },

          countryCode: {
            type: 'number'
          }
        }
      }
    })

    expect(seed).not.toEqual(anotherSeed)
  })
})

describe('utils/generateSeeds', () => {
  it('should return multiple seed data for fake 3 user', () => {
    const seed = generateSeeds({
      schema: {
        tableName: 'users',
        properties: {
          id: {
            type: 'integer'
          },

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
    }, 3, {locale: 'ja'})

    expect(seed).toMatchSnapshot()
  })
})

describe('utils/generateJunctionSeed', () => {
  it('should return single seed data for junction-table model', () => {
    const seed = generateJunctionSeed('articleTag', ModelsConfig)

    expect(seed).toMatchSnapshot()
  })
})

describe('utils/generateJunctionSeeds', () => {
  it('should return multiple seed data for junction-table model', () => {
    const seed = generateJunctionSeeds('articleTag', ModelsConfig, 3)

    expect(seed).toMatchSnapshot()
  })
})

describe('utils/generateSeedWithRelation', () => {
  it('should return single seed data with relation', () => {
    const commentSeed = generateSeedWithRelation('comment', ModelsConfig)
    const channelSeed = generateSeedWithRelation('channel', ModelsConfig)
    
    console.log(commentSeed)
    console.log(channelSeed)

    expect(commentSeed).toMatchSnapshot()
  })

  it('should return single seed data with relation as instance if asId = false', () => {
    const seed = generateSeedWithRelation('comment', ModelsConfig, 0, { asId: false })

    expect(seed).toMatchSnapshot()
  })
})

describe('utils/generateSeedsWithRelation', () => {
  it('should return multiple seed data with relation', () => {
    const seed = generateSeedsWithRelation('comment', ModelsConfig, 3)

    expect(seed).toMatchSnapshot()
  })
})
