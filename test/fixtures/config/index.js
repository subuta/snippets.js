import _ from 'lodash'
import Attachment from './model/Attachment'
import Channel from './model/Channel'
import Comment from './model/Comment'
import User from './model/User'

export const Routes = {
  channel: {
    except: [
      'update',
      'destroy'
    ],
    eager: '[comments.[attachment, commentedBy]]'
  },
  comment: {
    // pass custom route prefix.
    prefix: '/channels/:channelId/comments',

    except: [
      'update',
      'show'
    ],
    eager: '[attachment, commentedBy]'
  },
  attachment: {
    imports: [
      ['uuid/v4', 'uuid'],
      ['path', 'path'],
      ['src/utils/s3', null, [
        'getSignedUrl'
      ]],
    ],
    only: [
      'create'
    ],
    eager: ''
  },
  user: {
    eager: ''
  }
}

export const Models = {
  attachment: {
    schema: Attachment,
    seeds: 3
  },
  channel: {
    schema: Channel,
    seeds: 3
  },
  comment: {
    schema: Comment,
    seeds: 3
  },
  user: {
    schema: User,
    seeds: 3
  }
}
