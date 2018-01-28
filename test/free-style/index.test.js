import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import freeStyle from 'lib/free-style'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create free-style index', async (t) => {
  const code = freeStyle()

  const expected = build`
    import _ from 'lodash'
    import prefixAll from 'inline-style-prefixer/static'
    import {styled, FreeStyle} from 'react-free-style'
    
    export default function createWithStyles(styles = {}, options = {}) {
      styles = _.transform(
        styles,
        (result, style, key) => (result[key] = prefixAll(style)),
        {}
      )
    
      if (!_.isEmpty(options.rules)) {
        options.rules = _.transform(
          options.rules,
          (result, rule) => result.push([rule[0], prefixAll(rule[1])]),
          []
        )
      }
    
      if (!_.isEmpty(options.css)) {
        options.css = _.transform(
          options.css,
          (result, style, key) => (result[key] = prefixAll(style)),
          {}
        )
      }
    
      return styled(styles, options)
    }
  `

  t.is(format(code), format(expected))
})