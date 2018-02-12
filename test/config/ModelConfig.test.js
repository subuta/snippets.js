import test from "ava";
import {build, format, snippets as s} from 'bld.js'

import {
  validateModels,
  validateModel,
} from "lib/config/ModelConfig";

test.beforeEach(async (t) => {
})

test.afterEach((t) => {
})

test('validateRoutes should validate correct routes', async (t) => {
  validateModels({
    book: {
      schema: {}
    }
  })
})

test('validateRoutes should throw error for invalid route', async (t) => {
  t.throws(() => validateModels({book: {schema: 'invalid'}}))
})

test('validateRoute should validate correct route', async (t) => {
  validateModel({
    schema: {}
  })
})

test('validateRoute should throw error for invalid route', async (t) => {
  t.throws(() => validateModel({schema: 'invalid'}))
})
