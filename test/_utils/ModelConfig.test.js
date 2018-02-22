/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import {
  validateModels,
  validateModel,
} from 'lib/_utils/ModelConfig'

describe('utils/ModelConfig', () => {
  it('validateModels should validate correct models', () => {
    validateModels({
      book: {
        isJunction: false,
        schema: {
          tableName: 'books',
          properties: {}
        }
      }
    })
  })

  it('validateModels should throw error for invalid models', () => {
    expect(() => {
      validateModels({book: {schema: 'invalid'}})
    }).toThrow()
  })

  it('validateModel should validate correct model', () => {
    validateModel({
      schema: {
        tableName: 'books',
        properties: {}
      }
    })
  })

  it('validateModel should throw error for invalid model', () => {
    expect(() => {
      validateModel({schema: 'invalid'})
    }).toThrow()
  })
})
