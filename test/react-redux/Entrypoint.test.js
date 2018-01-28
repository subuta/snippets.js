import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/react-redux/Entrypoint'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create react-redux Entrypoint', async (t) => {
  const code = Entrypoint()

  const expected = build`
    import React from 'react'
    import ReactDOM from 'react-dom'
    import {Provider} from 'react-redux'
    import store from './store'
    import Routes from './components/Routes'
    import withStyles from './style'
    import {compose} from 'recompose'
    
    const enhance = compose(withStyles)
    
    let App = enhance(() => {
      return (
        <div>
          <Provider store={store}>{Routes}</Provider>
        </div>
      )
    })
    
    let render = () => {
      const appNode = document.getElementById('app')
      ReactDOM.render(<App />, appNode)
    }
    
    // Native
    // Check if the DOMContentLoaded has already been completed
    if (document.readyState === 'complete' || document.readyState !== 'loading') {
      render()
    } else {
      document.addEventListener('DOMContentLoaded', render)
    }
    
    // make browserify-hmr work.
    if (module.hot) {
      module.hot.accept()
    }


  `

  t.is(format(code), format(expected))
})