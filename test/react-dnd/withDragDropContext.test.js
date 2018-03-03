/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import withDragDropContext from 'lib/react-dnd/withDragDropContext'

describe('react-dnd/withDragDropContext', () => {
  it('should create withDragDropContext for react-dnd', () => {
    expect(format(withDragDropContext())).toMatchSnapshot()
  })
})
