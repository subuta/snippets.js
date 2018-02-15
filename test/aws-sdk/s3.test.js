/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import s3 from 'lib/aws-sdk/s3'

describe('aws-sdk/s3', () => {
  it('should create aws-sdk s3 util', () => {
    expect(format(s3())).toMatchSnapshot()
  })
})
