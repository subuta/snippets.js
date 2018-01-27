import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Store from 'lib/redux/Store'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux Store', async (t) => {
  const code = Store()

  const expected = build`
    import { createStore, applyMiddleware, compose } from 'redux'
    import thunk from 'redux-thunk'
    import history from 'src/utils/history'
    import { routerMiddleware } from 'react-router-redux'
    import makeRootReducer from './modules'
    
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

  t.is(format(code), format(expected))
})