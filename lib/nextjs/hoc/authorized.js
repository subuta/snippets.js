import { build, snippets as s } from 'bld.js'
import _ from 'lodash'

export default () => {
  const imports = s.import([
    ['react', 'React'],
    ['lodash', '_'],
    ['src/views/utils/auth0', 'auth0']
  ])

  return build`
    ${imports}
    
    export default function (Component) {
      let render = (props) => {
        return (
          <Component {...props} />
        )
      }
    
      render.getInitialProps = async (ctx) => {
        const fn = Component.getInitialProps || _.noop
    
        const isAuthenticated = auth0.isAuthenticated(ctx)
    
        // decorate ctx.
        if (!!ctx.res) {
          const locals = _.get(ctx, 'res.locals', {})
          _.set(ctx, 'res.locals', {
            ...locals,
            isAuthenticated
          })
        }
    
        const props = await fn(ctx)
    
        // return final props.
        return {
          ...props,
          isAuthenticated
        }
      }
    
      return render
    }

  `
}
