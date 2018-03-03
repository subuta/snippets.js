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
    ['./modules', 'makeRootReducer']
  ])

  return build`
    ${imports}
    
    const isBrowser = typeof window !== 'undefined'
    
    const middlewares = [thunk]
    
    let devtools = (f) => f
    if (isBrowser && window.devToolsExtension) {
      devtools = window.devToolsExtension()
    }
    
    // store.injectedReducers = {}
    
    // return createStore
    export default (initialState = {}) => {
      const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
          applyMiddleware(...middlewares),
          // enable redux dev-tools
          isBrowser ? devtools : (f) => f
        ),
      )
    
      if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
        if (module.hot) {
          module.hot.accept('./modules', () => {
            const makeRootReducer = require('./modules').default
            store.replaceReducer(makeRootReducer({}))
            // store.replaceReducer(makeRootReducer(store.injectedReducers))
          })
        }
      }
    
      return store
    }

  `
}
