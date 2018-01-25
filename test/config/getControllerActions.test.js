import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import getControllerActions from 'lib/config/getControllerActions'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should return all Actions by default', async (t) => {
  t.deepEqual(getControllerActions(), [
    'index',
    'show',
    'create',
    'update',
    'destroy'
  ])
})

test('should return valid Actions with only', async (t) => {
  t.deepEqual(getControllerActions({only: ['index']}), ['index'])
})

test('should return valid Actions with except', async (t) => {
  t.deepEqual(getControllerActions({except: ['index']}), [
    'show',
    'create',
    'update',
    'destroy'
  ])
})