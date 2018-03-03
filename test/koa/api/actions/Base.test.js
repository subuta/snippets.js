/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Base from 'lib/koa/api/actions/Base'

describe('koa/api/actions/Base', () => {
  it('should create koa action', () => {
    expect(format(Base({
      model: 'user',
      routeConfig: {},
      path: '/',
      method: 'post',
      action: 'create'
    }))).toMatchSnapshot()
  })

  it('should skip auth for koa action with skipAuth: true', () => {
    expect(format(Base({
      model: 'user',
      routeConfig: {
        skipAuth: true
      },
      path: '/',
      method: 'post',
      action: 'create'
    }))).toMatchSnapshot()
  })

  it('should skip auth for koa action with skipAuth: [\'create\'] & action = \'create\'', () => {
    expect(format(Base({
      model: 'user',
      routeConfig: {
        skipAuth: [
          'create'
        ]
      },
      path: '/',
      method: 'post',
      action: 'create'
    }))).toMatchSnapshot()
  })

  it('should not skip auth for koa action with skipAuth: [\'show\'] & action = \'create\'', () => {
    expect(format(Base({
      model: 'user',
      routeConfig: {
        skipAuth: [
          'show'
        ]
      },
      path: '/',
      method: 'post',
      action: 'create'
    }))).toMatchSnapshot()
  })
})
