export default {
  tableName: 'users',
  required: [
    'auth0Id',
    'nickname'
  ],

  hidden: [
    'auth0Id'
  ],

  properties: {
    id: {
      type: 'integer'
    },
    auth0Id: {
      type: 'string'
    },
    locale: {
      'type': 'string'
    },
    nickname: {
      'type': 'string'
    },
    status: {
      'type': 'string'
    },
    isAdmin: {
      'type': 'boolean',
      'default': false
    },
    avatar: {
      'type': 'string'
    }
  },

  relations: {
    comments: {
      hasMany: 'comments',
      join: {
        from: 'users.id',
        to: 'comments.commentedById'
      }
    }
  }
}
