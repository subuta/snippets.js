import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/koa/Entrypoint'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Entrypoint', async (t) => {
  const code = Entrypoint()

  const expected = build`
    import Koa from 'koa'
    import {PUBLIC_DIR} from '../config'
    import api from './api'
    import cors from '@koa/cors'
    import logger from 'koa-logger'
    import serve from 'koa-static'
    
    const app = new Koa()
    const PORT = process.env.PORT || 3000
    
    // log requests
    app.use(logger())
    
    // cors
    app.use(cors())
    
    // handle /api requests
    app.use(api.routes())
    
    app.use(api.allowedMethods())
    
    // otherwise PUBLIC_DIR
    app.use(serve(PUBLIC_DIR))
    
    if (!module.parent) {
      app.listen(PORT)
    }
    
    export default app

  `

  t.is(format(code), format(expected))
})