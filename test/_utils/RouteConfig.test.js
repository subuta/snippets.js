/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import {
  validateRoutes,
  validateRoute,
} from 'lib/_utils/RouteConfig'

describe('utils/ModelConfig', () => {
  it('validateRoutes should validate correct routes', () => {
    validateRoutes({
      book: {
        except: ['index']
      }
    })
  })

  it('validateRoutes should throw error for invalid route', () => {
    expect(() => {
      validateRoutes({book: {except: ['invalid']}})
    }).toThrow()
  })

  it('validateRoute should validate correct route', () => {
    validateRoute({
      except: ['index']
    })
  })

  it('validateRoute should throw error for invalid route', () => {
    expect(() => {
      validateRoute({except: ['invalid']})
    }).toThrow()
  })
})
