import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, routeConfig} = props
  const {
    eager = ''
  } = routeConfig
  const Model = _.upperFirst(pluralize.singular(model))

  return Base(
    {
      ...props,
      path: '/:id',
      action: 'show'
    },
    build`
      let params = {}
      
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await ${Model}
        .query()
        .applyFilter('default')
        .eager('${eager}')
        .findFirst({...params, id: ctx.params.id})
    `
  )
}
