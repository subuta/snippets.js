import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default (imports = []) => {
  const vars = _.zipObject(imports, imports)

  return build`
    // load .env first.
    require('dotenv').config()
    
    const ${s.raw(vars)} = process.env
    
    export ${s.raw(vars)}
    
    export default ${s.raw(vars)}
  `
}
