import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Auth from 'lib/koa/api/middlewares/Auth'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Auth', async (t) => {
  const code = Auth()

  const expected = build`
    import jwt from 'koa-jwt'
    import jwksRsa from 'jwks-rsa'
    import env from 'src/utils/env'
    
    // add getCurrentUser method.
    export const getCurrentUser = (ctx, next) => {
      const {User} = ctx.state.models
      ctx.state.getCurrentUser = () =>
        User.query().findFirst({auth0Id: ctx.state.user.sub})
      return next()
    }
    
    let jwksUri = \`https://\${env.AUTH0_API_IDENTIFIER}/.well-known/jwks.json\`
    let opts = {
      // Validate the audience and the issuer.
      audience: env.AUTH0_AUDIENCE,
      issuer: \`https://\${env.AUTH0_API_IDENTIFIER}/\`
    }
    
    if (env.NODE_ENV === 'test') {
      jwksUri = 'http://localhost/.well-known/jwks.json'
      opts = {debug: true}
    }
    
    // https://auth0.com/docs/quickstart/backend/nodejs
    // Middleware below this line is only reached if JWT token is valid
    export default jwt({
      secret: jwksRsa.koaJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri
      }),
      algorithms: ['RS256'],
      ...opts
    })
  `

  t.is(format(code), format(expected))
})