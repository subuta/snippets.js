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
      method: 'put',
      action: 'update'
    },
    build`
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user
    
      // update specified ${model}.
      const params = {}
      
      /* mat Before update [start] */
      /* mat Before update [end] */
      
      let response = await ${Model}
        .query()
        .patchAndFetchById(ctx.params.id, {
          ...${model},
          ...params
        })
        .eager('${eager}')
        
      /* mat After update [start] */
      /* mat After update [end] */
      
      ctx.body = response
    `
  )
}
