/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Action from 'lib/redux/Action'

describe('redux/Action', () => {
  it('should create redux Action', () => {
    const code = build`
      const action = ${Action('SET_BOOKS', {
        name: s.stringify('an awesome Book')
      })}
    `

    expect(format(code)).toMatchSnapshot()
  })
})
