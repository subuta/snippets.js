/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ApiIndex from 'lib/axios/api'

import { Routes as RoutesConfig } from 'test/fixtures/config'

describe('axios/api/index', () => {
  it('should create axios Api index', () => {
    expect(format(ApiIndex(RoutesConfig))).toMatchSnapshot()
  })
})
