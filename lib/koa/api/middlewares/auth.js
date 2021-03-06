import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['koa-jwt', 'jwt'],
    ['jwks-rsa', 'jwksRsa'],
    ['src/api/utils/env', 'env']
  ])

  return build`
    ${imports}
    
    // add getCurrentUser method.
    export const getCurrentUser = (ctx, next) => {
      const {User} = ctx.state.models
      ctx.state.getCurrentUser = () => {
        // return null if user not loggedIn.
        if (!ctx.state.user) return Promise.resolve(null)
        return User.query().findFirst({auth0Id: ctx.state.user.sub})
      }
      return next()
    }
    
    export const authenticate = (ctx, next) => {
      ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
      return next()
    }
    
    let jwksUri = \`https://\$\{env.AUTH0_API_IDENTIFIER\}/.well-known/jwks.json\`
    let opts = {
      // Validate the audience and the issuer.
      audience: env.AUTH0_AUDIENCE,
      issuer: \`https://\$\{env.AUTH0_API_IDENTIFIER\}/\`,
      // passthrough if Authorization header not passed.
      // and throw 401 at routes Action(for better conditional skipping.)
      passthrough: true
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
}
