/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Module from 'lib/redux/Module'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

// https://github.com/erikras/ducks-modular-redux
describe('redux/Module', () => {
  it('should create Ducks based module', () => {
    const RouteConfig = RoutesConfig['comment']
    const ModelConfig = ModelsConfig['comment']

    expect(format(Module(RouteConfig, ModelConfig))).toMatchSnapshot()
  })
})
