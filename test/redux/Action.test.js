import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Action from 'lib/redux/Action'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create redux Action', async (t) => {
  const code = build`
    const action = ${Action('SET_BOOKS', {
      name: s.stringify('an awesome Book')
  })}
  `

  const expected = build`
    const action = {
      type: SET_BOOKS,
      payload: {
        name: 'an awesome Book'
      }
    }
  `

  t.is(format(code), format(expected))
})