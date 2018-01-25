import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ActionCreator from 'lib/redux/ActionCreator'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux ActionCreator for setter', async (t) => {
  const code = build`
    ${ActionCreator.set({schema: {tableName: 'books'}})}
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

test('should create redux ActionCreator for create Action', async (t) => {
  const code = build`
    ${ActionCreator.create({schema: {tableName: 'books'}})}
  `

  const expected = build`
    const createBook = (params) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.create(params).then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }

  `

  t.is(format(code), format(expected))
})

test('should create redux ActionCreator for show Action', async (t) => {
  const code = build`
    ${ActionCreator.show({schema: {tableName: 'books'}})}
  `

  const expected = build`
    const requestBook = (id) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.show(id).then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }

  `

  t.is(format(code), format(expected))
})

test('should create redux ActionCreator for all(index) Action', async (t) => {
  const code = build`
    ${ActionCreator.all({schema: {tableName: 'books'}})}
  `

  const expected = build`
    const requestBooks = () => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.index().then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }

  `

  t.is(format(code), format(expected))
})

test('should create redux ActionCreator for update Action', async (t) => {
  const code = build`
    ${ActionCreator.update({schema: {tableName: 'books'}})}
  `

  const expected = build`
    const updateBook = (params, id) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.update(params, id).then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }

  `

  t.is(format(code), format(expected))
})

test('should create redux ActionCreator for destroy Action', async (t) => {
  const code = build`
    ${ActionCreator.destroy({schema: {tableName: 'books'}})}
  `

  const expected = build`
    const deleteBook = (id) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.destroy(id).then(() => {
          dispatch(setBooks({}))
        })
      }
    }

  `

  t.is(format(code), format(expected))
})