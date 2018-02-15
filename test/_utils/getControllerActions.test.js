/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import getControllerActions from 'lib/_utils/getControllerActions'

describe('utils/getControllerActions', () => {
  it('should return all Actions by default', () => {
    expect(getControllerActions()).toEqual([
      'index',
      'show',
      'create',
      'update',
      'destroy'
    ])
  })

  it('should return valid Actions with only', () => {
    expect(getControllerActions({only: ['index']})).toEqual([
      'index'
    ])
  })

  it('should return valid Actions with except', () => {
    expect(getControllerActions({except: ['index']})).toEqual([
      'show',
      'create',
      'update',
      'destroy'
    ])
  })
})
