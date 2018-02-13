import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import env from 'lib/_utils/env'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create objection ajvValidator', async (t) => {
  const code = env([
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'S3_BUCKET',
    'DATABASE_URL',
    'NODE_ENV',
    'AUTH0_API_IDENTIFIER',
    'AUTH0_AUDIENCE'
  ])

  const expected = build`
    // load .env first.
    require('dotenv').config()
    
    const {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB,
      S3_BUCKET,
      DATABASE_URL,
      NODE_ENV,
      AUTH0_API_IDENTIFIER,
      AUTH0_AUDIENCE
    } = process.env
    
    export {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB,
      S3_BUCKET,
      DATABASE_URL,
      NODE_ENV,
      AUTH0_API_IDENTIFIER,
      AUTH0_AUDIENCE
    }
    
    export default {
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB,
      S3_BUCKET,
      DATABASE_URL,
      NODE_ENV,
      AUTH0_API_IDENTIFIER,
      AUTH0_AUDIENCE
    }

  `

  t.is(format(code), format(expected))
})
