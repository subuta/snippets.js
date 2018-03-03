import { build, snippets as s } from 'bld.js'
import _ from 'lodash'

export default () => {
  const imports = s.import([
    ['lodash', '_']
  ])

  return build`
    ${imports}
    
    export const inject = (ctx, key, value) => {
      if (!ctx) return
      if (!_.get(ctx, 'res.locals')) {
        _.set(ctx, 'res.locals', {})
      }
      // mutate ctx and set reference of value.
      ctx.res.locals[key] = value
    }
    
    export const extract = (ctx, key) => {
      if (!ctx || !ctx.res) return
      return _.get(ctx, ['res', 'locals', key])
    }
  `
}
