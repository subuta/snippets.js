import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

const createModule = (Routes) => {
  const keys = _.map(_.keys(Routes), (k) => pluralize.singular(k))

  const imports = s.import([
    ['redux', null, [
      ['combineReducers']
    ]],
    ['react-router-redux', null, [
      ['routerReducer']
    ]],
    ['lodash', '_'],
    ..._.zip(_.map(keys, k => `./${k}`), keys)
  ])

  const reducers = _.zipObject(keys, keys)

  return build`
    ${imports}
    
    const reducers = ${s.raw({routing: 'routerReducer', ...reducers})}
    
    const makeRootReducer = (injectedReducers) => {
      return combineReducers({
        ...reducers,
        ...injectedReducers
      })
    }
    
    // extract entities from reducers.
    export const fetchEntities = (state) => {
      return _.transform(state, (result, s, key) => {
        if (!s.entities) return
        result[key] = _.get(s, 'entities', {})
      }, {})
    }
    
    // borrowed from https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
    export const injectReducer = (store, key, reducer) => {
      store.injectedReducers[key] = reducer
      store.replaceReducer(makeRootReducer(store.injectedReducers))
    }
    
    ${s.export('makeRootReducer')}
  `
}

export default createModule