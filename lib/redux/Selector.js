import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Reducer from './Reducer'

const selectorFor = ({ tableName }, name) => {
  // ensure naming convention
  name = _.camelCase(name)

  const model = _.camelCase(pluralize.singular(tableName))
  const get = _.camelCase('get' + _.upperFirst(name))

  return `const ${get} = state.${model}.${name}`
}

const getAll = ({ tableName }) => {
  // ensure naming convention
  tableName = _.camelCase(pluralize.singular(tableName))

  return build`
  const getAll = createSelector(
    getEntities,
    getIds,
    _.identity,
    (entities, ids, state) => ids.map(id => {
      return denormalize(entities[id], '${tableName}', state)
    })
  )
`
}

// Generate selector for reducers based on named exports.
let selectors = _.transform(_.keys(Reducer), (result, nameOfReducer) => {
  result[nameOfReducer] = (model) => selectorFor(model, nameOfReducer)
}, {})

selectors.getAll = getAll

export default selectors