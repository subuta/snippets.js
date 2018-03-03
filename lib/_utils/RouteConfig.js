import check from 'lib/_utils/apiCheck'

import {CONTROLLER_ACTIONS} from 'lib/_utils/getControllerActions'

const RouteConfigShape = check.shape({
  except: check.arrayOf(check.oneOf(CONTROLLER_ACTIONS)).optional,
  only: check.arrayOf(check.oneOf(CONTROLLER_ACTIONS)).optional,
  skipAuth: check.oneOfType([
    check.bool,
    check.arrayOf(check.oneOf(CONTROLLER_ACTIONS))
  ]).optional,
  imports: check.array.optional,
  eager: check.string.optional,
  prefix: check.string.optional,
})

// eg:
// config = {
//   book: {
//     except: ['index']
//   }
// }
export const validateRoutes = function (config) {
  return check.throw(check.objectOf(RouteConfigShape), config)
}

// eg:
// config = {
//   except: ['index']
// }
export const validateRoute = function (config) {
  return check.throw(RouteConfigShape, config)
}
