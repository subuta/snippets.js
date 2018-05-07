import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './Base'

export default (props) => {
  let {model, routeConfig, modelConfig} = props
  const {
    eager = '',
    joinRelation = ''
  } = routeConfig

  const Model = _.upperFirst(pluralize.singular(model))

  const chain = _.compact([
    '.query()',
    '.applyFilter(\'default\')',
    eager ? `.eager('${eager}')` : '',
    joinRelation ? `.leftOuterJoinRelation('${joinRelation}')` : '',
    '.where(params)'
  ])

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
    
      let response = await ${Model}
        ${chain.join('\n')}
        
      /* mat After index [start] */
      /* mat After index [end] */
      
      ctx.body = response
    `
  )
}
