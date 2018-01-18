import { build, format, snippets as s } from 'bld.js'
import R from 'ramda'

import ActionType from './ActionType'

const createAction = R.curry((model, payload) => {
  const ACTION_TYPE = ActionType.raw(model)
  return s.raw({
    type: ACTION_TYPE,
    payload: payload
  })
})

export default createAction