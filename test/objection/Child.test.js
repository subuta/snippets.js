import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Child from 'lib/objection/Child'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create objection Child', async (t) => {
  const Book = {
    tableName: 'books',
    required: [
      'title',
    ],

    properties: {
      id: {
        type: 'integer'
      },
      title: {
        'type': 'string'
      }
    },

    relations: {
      comments: {
        hasMany: 'comments',
        join: {
          from: 'books.id',
          to: 'comments.bookId'
        }
      },
    }
  }

  const code = Child({
    model: 'Book',
    config: {
      schema: Book
    }
  })

  const expected = build`
    import Model from './Model'
    import {setSchema} from 'src/utils/ajvValidator'
    
    export const register = (models) => {
      // setSchema to ajv.
      setSchema(Book.jsonSchema)
      // then define relationMappings.
      Book.relationMappings = {
        comments: {
          modelClass: models.Comment,
          relation: Model.HasManyRelation,
          join: {from: 'books.id', to: 'comments.bookId'}
        }
      }
    }
    
    export default class Book extends Model {
      static tableName = 'books'
    
      static jsonSchema = {
        title: 'Book',
        $id: 'http://sub-labo.com/schemas/book.json',
        type: 'object',
        required: ['title'],
        properties: {
          id: {type: 'integer'},
          title: {type: 'string'},
          comments: {type: ['array', 'null'], items: [{$ref: 'comment.json'}]}
        }
      }
    }

  `

  t.is(format(code), format(expected))
})