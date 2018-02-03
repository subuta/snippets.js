import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Schema from 'lib/normalizr/Schema'

import { Models as ModelsConfig } from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create normalizr Schema', async (t) => {
  const code = Schema(ModelsConfig)

  const expected = build`
    import _ from 'lodash'
    import pluralize from 'pluralize'
    import { fetchEntities } from 'src/modules'
    import * as normalizr from 'normalizr'
    
    const { schema } = normalizr
    
    export const attachment = new schema.Entity('attachment')
    export const attachmentList = new schema.Array(attachment)
    
    export const channel = new schema.Entity('channel')
    export const channelList = new schema.Array(channel)
    
    export const comment = new schema.Entity('comment')
    export const commentList = new schema.Array(comment)
    
    export const user = new schema.Entity('user')
    export const userList = new schema.Array(user)
    
    attachment.define({
      comments: [comment]
    })
    
    channel.define({
      comments: [comment]
    })
    
    comment.define({
      channel,
      commentedBy: user,
      attachment
    })
    
    user.define({
      comments: [comment]
    })
    
    const models = {
      attachment,
      attachmentList,
      channel,
      channelList,
      comment,
      commentList,
      user,
      userList
    }
    
    // denormalize data using schema.
    export const denormalize = (data, modelName, state) => {
      const schema = models[pluralize.singular(modelName)]
      return normalizr.denormalize(data, schema, fetchEntities(state))
    }
    
    export default models

  `

  t.is(format(code), format(expected))
})