import check from 'lib/_utils/apiCheck'

const ModelConfigShape = check.shape({
  schema: check.object
})

// eg:
// config = {
//   book: {
//     schema: {}
//   }
// }
export const validateModels = function (config) {
  return check.throw(check.objectOf(ModelConfigShape), config)
}

// eg:
// config = {
//   schema: {}
// }
export const validateModel = function (config) {
  return check.throw(ModelConfigShape, config)
}
