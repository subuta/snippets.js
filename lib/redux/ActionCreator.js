import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import createAction from './Action'
import ActionType from 'lib/redux/ActionType'

const set = ({ tableName }) => {
  // ensure naming convention.
  const model = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.set(model)
  const name = _.camelCase(ACTION_TYPE)
  const Action = createAction(ACTION_TYPE, tableName)

  return build`
    const ${name} = (${tableName}) => {
      return ${Action}
    }
  `
}

export default {
  set
}