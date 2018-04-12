/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ActionType, { ActionTypeDef } from 'lib/redux/ActionType'

describe('redux/ActionType', () => {
  it('should create redux ActionType with single argument', () => {
    const code = build`
      ${ActionType.raw('setBooks')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType with prefix and type', () => {
    const code = build`
      ${ActionType.raw('set', 'books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for setter', () => {
    const code = build`
      ${ActionType.set('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for ids setter', () => {
    const code = build`
      ${ActionType.setIds('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for request', () => {
    const code = build`
      ${ActionType.request('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for failure', () => {
    const code = build`
      ${ActionType.failure('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for create Action', () => {
    const code = build`
      ${ActionType.create('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for all(index) Action', () => {
    const code = build`
      ${ActionType.all('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for show Action', () => {
    const code = build`
      ${ActionType.show('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for update Action', () => {
    const code = build`
      ${ActionType.update('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType for destroy(delete) Action', () => {
    const code = build`
      ${ActionType.destroy('books')}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionType Def', () => {
    const code = build`
      ${ActionTypeDef('setBooks')}
    `

    expect(format(code)).toMatchSnapshot()
  })
})
