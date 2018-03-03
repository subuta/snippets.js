import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['src/api/model', 'models']
  ])

  return build`
    ${imports}
    
    ${s.export(build`
      (ctx, next) => {
        // expose Objection.js models to context.
        ctx.state.models = models
        return next()
      }
    `)}
  `
}
