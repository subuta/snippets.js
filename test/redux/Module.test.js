import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Module from 'lib/redux/Module'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

// https://github.com/erikras/ducks-modular-redux
test('should create Ducks based module', async (t) => {
  const RouteConfig = {
    except: [
      'update',
      'show'
    ],
    eager: '[attachment, commentedBy]'
  }

  const ModelConfig = {
    schema: {
      tableName: 'books',
      relations: {
        users: {},
        shops: {}
      }
    }
  }

  const code = Module(RouteConfig, ModelConfig)

  const expected = build`
    import _ from 'lodash'
    import { combineReducers } from 'redux'
    import { createSelector } from 'reselect'
    import { denormalize } from 'src/utils/schema'
    import api from 'src/utils/api'
    
    import {SET_USERS} from './user'
    import {SET_SHOPS} from './shop'
    
    // -------------
    // Constants
    // -------------
    export const REQUEST_BOOKS = 'REQUEST_BOOKS'
    export const REQUEST_BOOKS_FAILURE = 'REQUEST_BOOKS_FAILURE'
    export const SET_BOOKS = 'SET_BOOKS'
    
    // -------------
    // ActionCreators
    // -------------
    export const setBooks = (books) => {
      return {
        type: SET_BOOKS,
        payload: books
      }
    }
    
    export const requestBooks = () => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.index().then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }
    
    export const createBook = (params) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.create(params).then((data) => {
          dispatch(setBooks(data))
          return data
        })
      }
    }
    
    export const deleteBook = (id) => {
      return (dispatch) => {
        dispatch({type: REQUEST_BOOKS})
        return api.book.destroy(id).then(() => {
          dispatch(setBooks({}))
        })
      }
    }

    // -------------
    // Reducers
    // -------------
    export const entities = (state = {}, action) => {
      if (
        action.type === SET_BOOKS ||
        action.type === SET_USERS ||
        action.type === SET_SHOPS
      ) {
        return {...state, ...action.payload.entities.book}
      }
      return state
    }
    
    export const ids = (state = [], action) => {
      if (action.type === SET_BOOKS) {
        if (_.isArray(action.payload.result)) {
          return _.uniq([...state, ...action.payload.result])
        }
        return _.uniq([...state, action.payload.result])
      }
      return state
    }
    
    export const isRequestProgress = (state = false, action) => {
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
    
    export default combineReducers({
      entities,
      ids,
      isRequestProgress
    })
    
    // -------------
    // Selectors
    // -------------
    export const getEntities = (state) => state.book.entities
    export const getIds = (state) => state.book.ids
    export const getIsRequestProgress = (state) => state.book.isRequestProgress
    export const getAll = createSelector(
      getEntities,
      getIds,
      _.identity,
      (entities, ids, state) =>
        ids.map((id) => {
          return denormalize(entities[id], 'book', state)
        })
    )
  `

  t.is(format(code), format(expected))
})