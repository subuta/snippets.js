import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import {
  Routes as RoutesConfig,
} from 'test/fixtures/config'
import ModuleIndex from 'lib/redux/ModuleIndex'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

// https://github.com/erikras/ducks-modular-redux
test('should create Ducks based module', async (t) => {
  const code = ModuleIndex(RoutesConfig)

  const expected = build`
    import {combineReducers} from 'redux'
    import {routerReducer} from 'react-router-redux'
    import _ from 'lodash'
    import channel from './channel'
    import comment from './comment'
    import attachment from './attachment'
    import user from './user'
    
    const reducers = {
      routing: routerReducer,
      channel,
      comment,
      attachment,
      user
    }
    
    const makeRootReducer = (injectedReducers) => {
      return combineReducers({
        ...reducers,
        ...injectedReducers
      })
    }
    
    // extract entities from reducers.
    export const fetchEntities = (state) => {
      return _.transform(
        state,
        (result, s, key) => {
          if (_.isEmpty(_.get(s, 'entities', {}))) return
          result[key] = _.get(s, 'entities', {})
        },
        {}
      )
    }
    
    // borrowed from https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
    export const injectReducer = (store, key, reducer) => {
      store.injectedReducers[key] = reducer
      store.replaceReducer(makeRootReducer(store.injectedReducers))
    }
    
    export default makeRootReducer
  `

  t.is(format(code), format(expected))
})