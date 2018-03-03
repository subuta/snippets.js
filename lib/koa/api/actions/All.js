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
      path: '/',
      action: 'index'
    },
    build`
      let params = {}
      
      /* mat Before index [start] */
      /* mat Before index [end] */
    
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .where(params)
    `
  )
}
