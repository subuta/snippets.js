import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default () => {
  const imports = s.import([
    ['react', 'React'],
    ['_', 'lodash'],
    ['react-router-redux', null, [
      'ConnectedRouter'
    ]],
    ['src/utils/history', 'history']
  ])

  return build`
    ${imports}
    
    /* mat Custom imports [start] */
    /* mat Custom imports [end] */
    
    let routes = null
    
    /* mat Custom routes [start] */
    /* mat Custom routes [end] */
    
    export default routes

  `
}