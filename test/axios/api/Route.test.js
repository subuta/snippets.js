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

test('should create axios Route with channel', async (t) => {
  const channelRoute = RoutesConfig['channel']
  const channelModel = ModelsConfig['channel']

  const code = Route(channelRoute, channelModel)

  const expected = build`
    import _ from 'lodash'
    import request from 'src/utils/request'
    import {normalize} from 'normalizr'
    import {channel, channelList} from 'src/utils/schema'
    
    export const index = () => {
      return request.get(\`/channels\`)
    }
    
    export const show = (id) => {
      return request.get(\`/channels/\${id}\`)
    }
    
    export const create = (params) => {
      return request.post(\`/channels\`, {
        channel: params
      })
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

test('should create axios Route with comment', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = Route(channelRoute, channelModel)

  const expected = build`
    import _ from 'lodash'
    import request from 'src/utils/request'
    import {normalize} from 'normalizr'
    import {comment, commentList} from 'src/utils/schema'
    
    export const index = (params) => {
      const {channelId} = params
      return request.get(\`/channels/\$\{channelId\}/comments\`)
    }
    
    export const create = (params) => {
      return request.post(\`/channels/\$\{params.channelId\}/comments\`, {
        comment: params
      })
    }
    
    export const destroy = (id, params) => {
      return request.delete(\`/channels/\$\{params.channelId\}/comments/\$\{id\}\`)
    }
    
    /* mat Custom action [start] */
    /* mat Custom action [end] */
    
    let actions = {
      index,
      create,
      destroy
    }
    
    /* mat Custom exports [start] */
    /* mat Custom exports [end] */
    
    export default actions

  `

  t.is(format(code), format(expected))
})