/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import parseRelations from 'lib/_utils/parseRelations'
import { Models as ModelsConfig } from 'test/fixtures/config'

describe('utils/parseRelations', () => {
  it('should return parsed relatedModel for comment', () => {
    expect(parseRelations(ModelsConfig['comment'])).toEqual({
      channel: 'channel',
      commentedBy: 'user',
      attachment: 'attachment'
    })
  })

  it('should return parsed relatedModel for channel', () => {
    expect(parseRelations(ModelsConfig['channel'])).toEqual({
      comments: 'comments'
    })
  })

  it('should return parsed relatedModel for channel', () => {
    const someModel = {
      schema: {
        tableName: 'book',
        relations: {
          shops: {
            hasAndBelongsToMany: 'shops'
          }
        }
      }
    }

    expect(parseRelations(someModel)).toEqual({
      shops: 'shops'
    })
  })
})
