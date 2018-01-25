import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Selector from 'lib/redux/Selector'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux entities Selector', async (t) => {
  const code = build`
    export ${Selector.entities({schema: {tableName: 'books'}})}
  `

  const expected = build`
    export const getEntities = (state) => state.book.entities
  `

  t.is(format(code), format(expected))
})

test('should create redux ids Selector', async (t) => {
  const code = build`
    export ${Selector.ids({schema: {tableName: 'books'}})}
  `

  const expected = build`
    export const getIds = (state) => state.book.ids
  `

  t.is(format(code), format(expected))
})

test('should create redux requestProgress Selector', async (t) => {
  const code = build`
    export ${Selector.isRequestProgress({schema: {tableName: 'books'}})}
  `

  const expected = build`
    export const getIsRequestProgress = (state) => state.book.isRequestProgress
  `

  t.is(format(code), format(expected))
})

test('should create redux getAll Selector', async (t) => {
  const code = build`
    export ${Selector.getAll({schema: {tableName: 'books'}})}
  `

  const expected = build`
    export const getAll = createSelector(
      getEntities,
      getIds,
      _.identity,
      (entities, ids, state) =>
        ids.map((id) => {
          return denormalize(entities[id], 'book', state)
        })
    )
  `

  t.is(format(code), format(expected))
})