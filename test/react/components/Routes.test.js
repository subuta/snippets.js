import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/react/components/Routes'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create react Routes', async (t) => {
  const code = Routes()

  const expected = build`
    import React from 'react'
    import _ from 'lodash'
    import {ConnectedRouter} from 'react-router-redux'
    import history from 'src/utils/history'
    
    /* mat Custom imports [start] */
    /* mat Custom imports [end] */
    
    let routes = null
    
    /* mat Custom routes [start] */
    /* mat Custom routes [end] */
    
    export default routes

  `

  t.is(format(code), format(expected))
})