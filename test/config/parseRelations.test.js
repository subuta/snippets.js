import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import parseRelations from 'lib/config/parseRelations'
import { Models as ModelsConfig } from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should return parsed relatedModel for comment', async (t) => {
  t.deepEqual(parseRelations(ModelsConfig['comment']), {
    channel: 'channel',
    commentedBy: 'user',
    attachment: 'attachment'
  })
})

test('should return parsed relatedModel for channel', async (t) => {
  t.deepEqual(parseRelations(ModelsConfig['channel']), {
    comments: 'comments'
  })
})

test('should return parsed relatedModel for channel', async (t) => {
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

  t.deepEqual(parseRelations(someModel), {
    shops: 'shops'
  })
})