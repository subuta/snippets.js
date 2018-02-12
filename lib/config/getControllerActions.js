import _ from 'lodash'

export const CONTROLLER_ACTIONS = [
  'index',
  'show',
  'create',
  'update',
  'destroy'
]

export default (config = {}) => {
  const {
    only, // the routes will generated.
    except  // the routes will ignored.
  } = config

  const routes = CONTROLLER_ACTIONS

  if (only) {
    return _.intersection(routes, only)
  } else if (except) {
    return _.difference(routes, except)
  }

  return routes
}
