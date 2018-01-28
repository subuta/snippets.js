import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default () => {
  const imports = s.import([
    ['react', 'React'],
    ['react-dom', 'ReactDOM'],
    ['react-redux', null, [
      ['Provider']
    ]],
    ['./store', 'store'],
    ['./components/Routes', 'Routes'],
    ['./style', 'withStyles'],
    ['recompose', null, [
      ['compose']
    ]]
  ])

  return build`
    ${imports}
    
    const enhance = compose(
      withStyles
    )
    
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
}