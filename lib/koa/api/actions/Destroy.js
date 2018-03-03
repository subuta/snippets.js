import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, routeConfig} = props
  const {
    eager = ''
  } = routeConfig
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return Base(
    {
      ...props,
      path: '/:id',
      method: 'delete',
      action: 'destroy'
    },
    build`
      await ${Model}.query().delete().where({id: ctx.params.id})
      ctx.body = null
    `
  )
}
