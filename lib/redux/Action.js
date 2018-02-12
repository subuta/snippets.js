import { build, format, snippets as s } from 'bld.js'

import ActionType from './ActionType'

const createAction = (model, payload) => {
  const ACTION_TYPE = ActionType.raw(model)
  return s.raw({
    type: ACTION_TYPE,
    payload: payload
  })
}

export default createAction