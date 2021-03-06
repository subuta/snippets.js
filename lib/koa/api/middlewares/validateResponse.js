import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['lodash', '_'],
    ['objection', null, [
      'ValidationError',
      'NotFoundError'
    ]],

    ['objection-db-errors', null, [
      'DBError',
      'ConstraintViolationError',
      'UniqueViolationError',
      'NotNullViolationError',
      'ForeignKeyViolationError',
      'CheckViolationError',
      'DataError'
    ]]
  ])

  return build`
    ${imports}

    // FROM: https://vincit.github.io/objection.js/#error-handling
    const errorHandler = (err, ctx) => {
      if (err instanceof ValidationError) {
        switch (err.type) {
          case 'ModelValidation':
            ctx.throw(422, {
              message: err.message,
              type: 'ModelValidation',
              data: err.data
            })
            break
          case 'RelationExpression':
            ctx.throw(422, {
              message: err.message,
              type: 'InvalidRelationExpression',
              data: {}
            })
            break
          case 'UnallowedRelation':
            ctx.throw(422, {
              message: err.message,
              type: 'UnallowedRelation',
              data: {}
            })
            break
          case 'InvalidGraph':
            ctx.throw(422, {
              message: err.message,
              type: 'InvalidGraph',
              data: {}
            })
            break
          default:
            ctx.throw(422, {
              message: err.message,
              type: 'UnknownValidationError',
              data: {}
            })
            break
        }
      } else if (err instanceof NotFoundError) {
        ctx.throw(404, {
          message: err.message,
          type: 'NotFound',
          data: {}
        })
      } else if (err instanceof UniqueViolationError) {
        ctx.throw(409, {
          message: err.message,
          type: 'UniqueViolation',
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint
          }
        })
      } else if (err instanceof NotNullViolationError) {
        ctx.throw(422, {
          message: err.message,
          type: 'NotNullViolation',
          data: {
            column: err.column,
            table: err.table
          }
        })
      } else if (err instanceof ForeignKeyViolationError) {
        ctx.throw(409, {
          message: err.message,
          type: 'ForeignKeyViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          }
        })
      } else if (err instanceof CheckViolationError) {
        ctx.throw(422, {
          message: err.message,
          type: 'CheckViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          }
        })
      } else if (err instanceof DataError) {
        ctx.throw(422, {
          message: err.message,
          type: 'InvalidData',
          data: {}
        })
      } else if (err instanceof DBError) {
        ctx.throw(500, {
          message: err.message,
          type: 'UnknownDatabaseError',
          data: {}
        })
      } else {
        // Pass-through other error if status code is already defined.
        if (_.get(ctx, 'response.status')) throw err
        // If status code is not undefined.
        ctx.throw(500, {
          message: err.message,
          type: 'UnknownError',
          data: {}
        })
      }
    }
    
    export default async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        errorHandler(err, ctx)
        return
      }
      const method = _.toUpper(_.get(ctx, 'request.method'))
      const status = _.get(ctx, 'response.status')
    
      // ignore non 2XX status.
      if (status >= 300) return
    
      // throw 404 if response body of GET request is 'undefined'.
      if (method === 'GET' && !ctx.body) {
        return ctx.throw(404, {
          message: 'Resource Not Found'
        })
      }
    }
  `
}
