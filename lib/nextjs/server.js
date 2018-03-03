import { build, snippets as s } from 'bld.js'
import _ from 'lodash'

export default () => {
  const imports = s.import([
    ['next', 'next'],
    ['koa', 'Koa'],
    ['koa-router', 'Router'],
    ['@koa/cors', 'cors'],
    ['koa-logger', 'logger'],
    ['koa-static', 'serve'],
    ['uuid/v4', 'uuid'],
    ['src/api/middlewares/zone.js', 'withZone'],
    ['src/api/routes', 'routes'],
    ['./config', null, [
      ['PUBLIC_DIR']
    ]],
  ])

  return build`
    ${imports}
    
    const port = parseInt(process.env.PORT, 10) || 3000
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({
      dev,
      dir: 'src/views'
    })
    const handle = app.getRequestHandler()
    
    const startServer = () => {
      const server = new Koa()
      const router = new Router()
  
      // apply withZone to next.js routes.
      router.use(withZone)
  
      router.get('/p/:id', async ctx => {
        const actualPage = '/post'
        const queryParams = {id: ctx.params.id}
        await app.render(ctx.req, ctx.res, actualPage, queryParams)
        ctx.respond = false
      })
  
      router.get('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
      })
  
      // log requests
      server.use(logger())
  
      // cors
      server.use(cors())
  
      // handle /api requests
      server.use(routes.routes())
  
      server.use(routes.allowedMethods())
  
      // otherwise PUBLIC_DIR
      server.use(serve(PUBLIC_DIR))
  
      server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
      })
  
      server.use(router.routes())
  
      if (!module.parent) {
        return server.listen(port, (err) => {
          if (err) throw err
          console.log(\`> Ready on http://localhost:\${port}\`)
        })
      }
    
      return server
    }
    
    if (!module.parent) {
      app.prepare()
        .then(startServer)
        .catch((ex) => {
          console.error(ex.stack)
          process.exit(1)
        })
      }
      
    export default startServer
  `
}
