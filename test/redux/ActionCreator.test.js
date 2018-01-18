import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ActionCreator from 'lib/redux/ActionCreator'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux ActionCreator for setter', async (t) => {
  const code = build`
    ${ActionCreator.set({ tableName: 'books' })}
  `

  const expected = build`
    const setBooks = (books) => {
      return {
        type: SET_BOOKS,
        payload: books
      }
    }

  `

  t.is(format(code), format(expected))
})