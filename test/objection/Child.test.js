/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Child from 'lib/objection/Child'

describe('objection/Child', () => {
  it('should create objection Child', () => {
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

    expect(format(Child({
      model: 'Book',
      config: {
        schema: Book
      }
    }))).toMatchSnapshot()
  })

  it('should create objection Child with Boolean property', () => {
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
        },
        isOutOfPrint: {
          'type': 'boolean'
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

    expect(format(Child({
      model: 'Book',
      config: {
        schema: Book
      }
    }))).toMatchSnapshot()
  })
})
