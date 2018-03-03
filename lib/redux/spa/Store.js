import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default () => {
  const imports = s.import([
    ['redux', null, [
      ['createStore'],
      ['applyMiddleware'],
      ['compose'],
    ]],
    ['redux-thunk', 'thunk'],
    ['src/utils/history', 'history'],
    ['react-router-redux', null, [
      ['routerMiddleware']
    ]],
    ['./modules', 'makeRootReducer'],
  ])

  return build`
    ${imports}
    
    const middlewares = [thunk, routerMiddleware(history)]
    
    const store = createStore(
      makeRootReducer(),
      compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    )
    
    store.injectedReducers = {};
    
    if (module.hot) {
      module.hot.accept('./modules', () => {
        const makeRootReducer = require('./modules').default
        store.replaceReducer(makeRootReducer(store.injectedReducers))
      })
    }
    
    export default store

  `
}