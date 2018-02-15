/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import request from 'lib/axios/request'

describe('axios/request', () => {
  it('should create axios Request', () => {
    expect(format(request())).toMatchSnapshot()
  })
})
