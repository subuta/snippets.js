/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ActionCreator from 'lib/redux/ActionCreator'

describe('redux/ActionCreator', () => {
  it('should create redux ActionCreator for setter', () => {
    const code = build`
      ${ActionCreator.set({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionCreator for create Action', () => {
    const code = build`
      ${ActionCreator.create({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionCreator for show Action', () => {
    const code = build`
      ${ActionCreator.show({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionCreator for all(index) Action', () => {
    const code = build`
      ${ActionCreator.all({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionCreator for update Action', () => {
    const code = build`
      ${ActionCreator.update({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })

  it('should create redux ActionCreator for destroy Action', () => {
    const code = build`
      ${ActionCreator.destroy({schema: {tableName: 'books'}})}
    `

    expect(format(code)).toMatchSnapshot()
  })
})
