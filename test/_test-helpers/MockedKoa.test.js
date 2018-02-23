/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import MockedKoa from 'lib/_test-helpers/MockedKoa'

describe('_test-helpers/MockedKoa', () => {
  it('should create mocked koa modules', () => {
    expect(format(MockedKoa())).toMatchSnapshot()
  })
})
