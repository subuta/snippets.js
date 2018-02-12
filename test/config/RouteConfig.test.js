import test from "ava";
import {build, format, snippets as s} from 'bld.js'

import {
  validateRoutes,
  validateRoute,
} from "lib/config/RouteConfig";

test.beforeEach(async (t) => {
})

test.afterEach((t) => {
})

test('validateRoutes should validate correct routes', async (t) => {
  validateRoutes({
    book: {
      except: ['index']
    }
  })
})

test('validateRoutes should throw error for invalid route', async (t) => {
  t.throws(() => validateRoutes({book: {except: ['invalid']}}))
})

test('validateRoute should validate correct route', async (t) => {
  validateRoute({
    except: ['index']
  })
})

test('validateRoute should throw error for invalid route', async (t) => {
  t.throws(() => validateRoute({except: ['invalid']}))
})
