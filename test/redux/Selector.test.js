import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Selector from 'lib/redux/Selector'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux entities Selector', async (t) => {
  const code = build`
    export ${Selector.entities({tableName: 'books'})}
  `

  const expected = build`
    export const getEntities = state.book.entities
  `

  t.is(format(code), format(expected))
})

test('should create redux ids Selector', async (t) => {
  const code = build`
    export ${Selector.ids({tableName: 'books'})}
  `

  const expected = build`
    export const getIds = state.book.ids
  `

  t.is(format(code), format(expected))
})

test('should create redux requestProgress Selector', async (t) => {
  const code = build`
    export ${Selector.requestProgress({tableName: 'books'})}
  `

  const expected = build`
    export const getRequestProgress = state.book.requestProgress
  `

  t.is(format(code), format(expected))
})

test('should create redux getAll Selector', async (t) => {
  const code = build`
    export ${Selector.getAll({tableName: 'books'})}
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