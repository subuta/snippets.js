import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['objection', null, [
      'AjvValidator'
    ]]
  ])

  return build`
    ${imports}

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
    
    ${s.export('validator')}
  `
}