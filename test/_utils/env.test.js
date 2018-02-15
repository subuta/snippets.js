/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import env from 'lib/_utils/env'

describe('utils/env', () => {
  it('should create env file', () => {
    expect(format(env([
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_DB',
      'S3_BUCKET',
      'DATABASE_URL',
      'NODE_ENV',
      'AUTH0_API_IDENTIFIER',
      'AUTH0_AUDIENCE'
    ]))).toMatchSnapshot();
  });
});
