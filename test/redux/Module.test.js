import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Module from 'lib/redux/Module'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

// https://github.com/erikras/ducks-modular-redux
test('should create Ducks based module', async (t) => {
  const RouteConfig = RoutesConfig['comment']
  const ModelConfig = ModelsConfig['comment']

  const code = Module(RouteConfig, ModelConfig)

  const expected = build`
    import _ from 'lodash'
    import {combineReducers} from 'redux'
    import {createSelector} from 'reselect'
    import {denormalize} from 'src/utils/schema'
    import api from 'src/utils/api'
    
    import {SET_CHANNELS} from './channel'
    import {SET_USERS} from './user'
    import {SET_ATTACHMENTS} from './attachment'
    
    // -------------
    // Constants
    // -------------
    export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
    export const REQUEST_COMMENTS_FAILURE = 'REQUEST_COMMENTS_FAILURE'
    export const SET_COMMENTS = 'SET_COMMENTS'
    
    /* mat Custom constants [start] */
    /* mat Custom constants [end] */
    
    // -------------
    // ActionCreators
    // -------------
    export const setComments = (comments) => {
      return {
        type: SET_COMMENTS,
        payload: comments
      }
    }
    
    export const requestComments = () => {
      return (dispatch) => {
        dispatch({type: REQUEST_COMMENTS})
        return api.comment.index().then((data) => {
          dispatch(setComments(data))
          return data
        })
      }
    }
    
    export const createComment = (params) => {
      return (dispatch) => {
        dispatch({type: REQUEST_COMMENTS})
        return api.comment.create(params).then((data) => {
          dispatch(setComments(data))
          return data
        })
      }
    }
    
    export const deleteComment = (id) => {
      return (dispatch) => {
        dispatch({type: REQUEST_COMMENTS})
        return api.comment.destroy(id).then(() => {
          dispatch(setComments({}))
        })
      }
    }
    
    /* mat Custom actionCreators [start] */
    /* mat Custom actionCreators [end] */
    
    // -------------
    // Reducers
    // -------------
    export const entities = (state = {}, action) => {
      if (_.get(action, ['payload', 'entities', 'comment'])) {
        return {...state, ...action.payload.entities.comment}
      }
      return state
    }
    
    export const ids = (state = [], action) => {
      if (action.type === SET_COMMENTS) {
        if (_.isArray(action.payload.result)) {
          return _.uniq([...state, ...action.payload.result])
        }
        return _.uniq([...state, action.payload.result])
      }
      return state
    }
    
    export const isRequestProgress = (state = false, action) => {
      if (action.type === REQUEST_COMMENTS) {
        return true
      } else if (
        action.type === SET_COMMENTS ||
        action.type === REQUEST_COMMENTS_FAILURE
      ) {
        return false
      }
      return state
    }
    
    let reducers = {
      entities,
      ids,
      isRequestProgress
    }
    
    /* mat Custom reducers [start] */
    /* mat Custom reducers [end] */
    
    export default combineReducers(reducers)
    
    // -------------
    // Selectors
    // -------------
    export const getEntities = (state) => state.comment.entities
    export const getIds = (state) => state.comment.ids
    export const getIsRequestProgress = (state) => state.comment.isRequestProgress
    export const getAll = createSelector(
      getEntities,
      getIds,
      _.identity,
      (entities, ids, state) =>
        ids.map((id) => {
          return denormalize(entities[id], 'comment', state)
        })
    )
    
    /* mat Custom selectors [start] */
    /* mat Custom selectors [end] */
  `

  t.is(format(code), format(expected))
})