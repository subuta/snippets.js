import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ajvValidator from 'lib/objection/ajvValidator'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create objection ajvValidator', async (t) => {
  const code = ajvValidator()

  const expected = build`
    import {AjvValidator} from 'objection'

    const validator = new AjvValidator({
      onCreateAjv: (ajv) => {},
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        removeAdditional: true,
        useDefaults: true
      }
    })
    
    // force override ajv schema.
    export const setSchema = (schema = {}) => {
      const $id = schema.$id || schema.id
      if (!$id) return
      // remove pre-added schemas first.
      validator.ajv.removeSchema($id)
      // then add passed schema
      validator.ajv.addSchema(schema)
    }
    
    export default validator

  `

  t.is(format(code), format(expected))
})