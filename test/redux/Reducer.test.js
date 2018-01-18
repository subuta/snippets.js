import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import * as Reducer from 'lib/redux/Reducer'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux entities Reducer', async (t) => {
  const code = Reducer.entities({
    tableName: 'books'
  })

  const expected = build`
    const entities = (state = {}, action) => {
      if (action.type === SET_BOOKS) {
        return {...state, ...action.payload.entities.book}
      }
      return state
    }
  `

  t.is(format(code), format(expected))
})

test('should create redux entities Reducer with relations', async (t) => {
  const code = Reducer.entities({
    tableName: 'books',
    relations: {
      users: {},
      shops: {}
    }
  })

  const expected = build`
    const entities = (state = {}, action) => {
      if (
        action.type === SET_BOOKS ||
        action.type === SET_USERS ||
        action.type === SET_SHOPS
      ) {
        return {...state, ...action.payload.entities.book}
      }
      return state
    }
  `

  t.is(format(code), format(expected))
})

test('should create redux ids Reducer', async (t) => {
  const code = Reducer.ids({
    tableName: 'books'
  })

  const expected = build`
    const ids = (state = [], action) => {
      if (action.type === SET_BOOKS) {
        if (_.isArray(action.payload.result)) {
          return _.uniq([...state, ...action.payload.result])
        }
        return _.uniq([...state, action.payload.result])
      }
      return state
    }
  `

  t.is(format(code), format(expected))
})

test('should create redux requestProgress Reducer', async (t) => {
  const code = Reducer.requestProgress({
    tableName: 'books'
  })

  const expected = build`
    const isRequestProgress = (state = false, action) => {
      if (action.type === REQUEST_BOOKS) {
        return true
      } else if (
        action.type === SET_BOOKS ||
        action.type === REQUEST_BOOKS_FAILURE
      ) {
        return false
      }
      return state
    }
  `

  t.is(format(code), format(expected))
})