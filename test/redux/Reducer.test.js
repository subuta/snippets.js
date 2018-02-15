/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import * as Reducer from 'lib/redux/Reducer'

// https://github.com/erikras/ducks-modular-redux
describe('redux/Reducer', () => {
  it('should create redux entities Reducer', () => {
    expect(format(Reducer.entities({
      schema: {
        tableName: 'books'
      }
    }))).toMatchSnapshot()
  })

  it('should create redux entities Reducer with relations', () => {
    expect(format(Reducer.entities({
      schema: {
        tableName: 'books',
        relations: {
          users: {
            hasMany: 'users'
          },
          shops: {
            hasMany: 'shops'
          }
        }
      }
    }))).toMatchSnapshot()
  })

  it('should create redux ids Reducer', () => {
    expect(format(Reducer.ids({
      schema: {
        tableName: 'books'
      }
    }))).toMatchSnapshot()
  })

  it('should create redux requestProgress Reducer', () => {
    expect(format(Reducer.isRequestProgress({
      schema: {
        tableName: 'books'
      }
    }))).toMatchSnapshot()
  })
})
