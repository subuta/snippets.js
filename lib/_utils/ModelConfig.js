import check from 'lib/_utils/apiCheck'

const ModelConfigShape = check.shape({
  schema: check.shape({
    tableName: check.string,
    required: check.arrayOf(check.string).optional,
    properties: check.objectOf(check.shape({
      type: check.string,
    })),

    relations: check.objectOf(check.shape({
      belongsTo: check.string.optional,
      hasMany: check.string.optional,
      hasOne: check.string.optional,
      hasAndBelongsToMany: check.string.optional,
      morphAs: check.string.optional,
      join: check.shape({
        from: check.string,
        to: check.string
      })
    })).optional
  }),
  // mark as junction-table.
  isJunction: check.bool.optional
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
