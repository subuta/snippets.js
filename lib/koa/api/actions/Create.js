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
      path: '/',
      method: 'post',
      action: 'create'
    },
    build`
      const {${model}} = ctx.request.body

      let params = {}
      
      /* mat Before create [start] */
      /* mat Before create [end] */
      
      let response = await ${Model}
        .query()
        .insert({
          ...${model},
          ...params
        })
        .eager('${eager}')
        
      /* mat After create [start] */
      /* mat After create [end] */
    
      ctx.body = response
    `
  )
}
