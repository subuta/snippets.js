import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/axios/api/Route'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Route', async (t) => {
  const channelRoute = RoutesConfig['channel']
  const channelModel = ModelsConfig['channel']

  const code = Route(channelRoute, channelModel)

  const expected = build`
    import _ from 'lodash'
    import request from 'src/utils/request'
    import {normalize} from 'normalizr'
    import {channel, channelList} from 'src/utils/schema'
    
    export const index = () => {
      return request.get(\`/channels\`).then((data) => normalize(data, channelList))
    }
    
    export const show = (id) => {
      return request.get(\`/channels/\${id}\`).then((data) => normalize(data, channel))
    }
    
    export const create = (params) => {
      return request
        .post(\`/channels\`, {
          channel: params
        })
        .then((data) => normalize(data, channel))
    }
    
    /* mat Custom action [start] */
    /* mat Custom action [end] */
    
    let actions = {
      index,
      show,
      create
    }
    
    /* mat Custom exports [start] */
    /* mat Custom exports [end] */
    
    export default actions
  `

  t.is(format(code), format(expected))
})