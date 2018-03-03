import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

export default (fixturesDir = 'test/api/fixtures') => {
  const imports = s.import([
    ['lodash', '_'],
    ['bluebird', 'Promise'],
    ['require-glob', 'requireGlob'],
    ['path', 'path'],
    ['../../../config', null, [
      ['ROOT_DIR']
    ]]
  ])

  return build`
    ${imports}
    
    export const runMigration = async (knex) => {
      return knex.migrate.latest()
    }
    
    export default async function runSeed (knex) {
      const FIXTURES_DIR = path.join(ROOT_DIR, ${s.stringify(fixturesDir)})
      const fixtures = await requireGlob([path.join(FIXTURES_DIR, '**/*.js')])
    
      return Promise.map(_.values(fixtures), async fn => {
        if (fn.seed) {
          fn = fn.seed
        }
        return fn(knex)
      })
    }

  `
}
