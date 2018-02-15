/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Selector from 'lib/redux/Selector'

describe('redux/Selector', () => {
  it('should create redux entities Selector', () => {
    const code = build`
      export ${Selector.entities({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ids Selector', () => {
    const code = build`
      export ${Selector.ids({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux requestProgress Selector', () => {
    const code = build`
      export ${Selector.isRequestProgress({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux getAll Selector', () => {
    const code = build`
      export ${Selector.getAll({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })
})
