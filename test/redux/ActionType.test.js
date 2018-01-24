import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ActionType, { ActionTypeDef } from 'lib/redux/ActionType'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux ActionType with single argument', async (t) => {
  const code = build`
    ${ActionType.raw('setBooks')}
  `

  const expected = build`
    SET_BOOKS
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType with prefix and type', async (t) => {
  const code = build`
    ${ActionType.raw('set', 'books')}
  `

  const expected = build`
    SET_BOOKS
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for setter', async (t) => {
  const code = build`
    ${ActionType.set('books')}
  `

  const expected = build`
    SET_BOOKS
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for request', async (t) => {
  const code = build`
    ${ActionType.request('books')}
  `

  const expected = build`
    REQUEST_BOOKS
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for failure', async (t) => {
  const code = build`
    ${ActionType.failure('books')}
  `

  const expected = build`
    REQUEST_BOOKS_FAILURE
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for create Action', async (t) => {
  const code = build`
    ${ActionType.create('books')}
  `

  const expected = build`
    CREATE_BOOK
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for all(index) Action', async (t) => {
  const code = build`
    ${ActionType.all('books')}
  `

  const expected = build`
    INDEX_BOOKS
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for show Action', async (t) => {
  const code = build`
    ${ActionType.show('books')}
  `

  const expected = build`
    SHOW_BOOK
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for update Action', async (t) => {
  const code = build`
    ${ActionType.update('books')}
  `

  const expected = build`
    UPDATE_BOOK
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType for destroy(delete) Action', async (t) => {
  const code = build`
    ${ActionType.destroy('books')}
  `

  const expected = build`
    DELETE_BOOK
  `

  t.is(format(code), format(expected))
})

test('should create redux ActionType Def', async (t) => {
  const code = build`
    ${ActionTypeDef('setBooks')}
  `

  const expected = build`
    const SET_BOOKS = 'SET_BOOKS'
  `

  t.is(format(code), format(expected))
})