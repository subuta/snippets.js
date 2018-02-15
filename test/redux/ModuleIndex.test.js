/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import {
  Routes as RoutesConfig,
} from 'test/fixtures/config'
import ModuleIndex from 'lib/redux/ModuleIndex'

// https://github.com/erikras/ducks-modular-redux
describe('redux/ModuleIndex', () => {
  it('should create Ducks based module\'s index', () => {
    expect(format(ModuleIndex(RoutesConfig))).toMatchSnapshot()
  })
})
