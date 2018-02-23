import { build, format, snippets as s } from 'bld.js'

export default (sub = 'google-oauth2|dummy') => {
  return build`
    export const createPayload = (sub) => ({
      sub,
      iss: 'https://xxx.com/',
      aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
      scope: 'openid profile email'
    })
    
    export const currentUser = createPayload(${s.stringify(sub)})
  `
}
