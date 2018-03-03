import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['axios', 'axios'],
    ['axios/lib/adapters/http', 'httpAdapter'],
    ['lodash', '_'],
    ['file-saver', null, [
      'saveAs'
    ]],
    ['src/views/utils/auth0', 'auth0']
  ])

  return build`
    ${imports}
    
    const isBrowser = typeof window !== 'undefined'

    const origin = isBrowser ? window.location.origin : 'http://localhost:3000'
    
    // switch baseURL
    let baseURL = \`\${origin}/api\`
    
    if (process.env.NODE_ENV === 'development') {
      baseURL = 'http://localhost:3000/api'
    } else if (!isBrowser || process.env.NODE_ENV === 'test') {
      // set httpAdapter while testing.
      baseURL = 'http://localhost:3000/api'
      axios.defaults.adapter = httpAdapter
    }
    
    const request = axios.create({
      baseURL
    })
    
    // Add a request interceptor
    request.interceptors.request.use(
      function(config) {
        const {accessToken} = auth0.getSession()
        // add jwt to header
        config.headers = {
          ...config.headers,
          Authorization: \`Bearer \${accessToken}\`
        }
        return config
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )
    
    // Add a response interceptor
    request.interceptors.response.use(
      function(response) {
        const {config, data, headers} = response
    
        if (config.responseType === 'blob') {
          const contentDisposition = headers['content-disposition']
          const isAttachment = _.startsWith(
            contentDisposition.toLowerCase(),
            'attachment'
          )
          if (!isAttachment) return response.data
    
          // for file-download
          const fileName =
            _.trim(contentDisposition.split('filename=')[1], '"') || null
          saveAs(data, fileName)
        }
    
        return response.data
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error.response)
      }
    )

    ${s.export('request')}
  `
}
