import _ from 'lodash'

export default (config = {}) => {
  const {
    only, // the routes will generated.
    except  // the routes will ignored.
  } = config

  const routes = [
    'index',
    'show',
    'create',
    'update',
    'destroy'
  ]

  if (only) {
    return _.intersection(routes, only)
  } else if (except) {
    return _.difference(routes, except)
  }

  return routes
}
