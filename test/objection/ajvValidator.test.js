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
    
    export default validator

  `

  t.is(format(code), format(expected))
})