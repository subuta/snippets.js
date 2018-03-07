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
    eager ? `.eager('${eager}')` : '',
    joinRelation ? `.joinRelation('${joinRelation}')` : '',
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
    
      ctx.body = await ${Model}
        ${chain.join('\n')}
    `
  )
}
