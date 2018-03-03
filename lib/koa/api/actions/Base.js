import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default ({model, routeConfig, path = '/', method = 'get'}, children = []) => {
  const Model = _.upperFirst(pluralize.singular(model))
  model = _.toLower(pluralize.singular(model))

  return build`
    ${model}.${method}('${path}', auth, async (ctx) => {
      const {${Model}} = ctx.state.models
      ${children}
    })
  ` + s.EOL // append EOL to each line.
}
