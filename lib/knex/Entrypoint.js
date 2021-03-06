import { build, format, snippets as s } from 'bld.js'

export default () => {
  return build`
    const knex = require('knex')
    const env = require('src/api/utils/env')
    
    const {
      MIGRATION_DIR,
      FIXTURES_DIR
    } = require('../../../config')
    
    const host = env.POSTGRES_HOST || 'localhost'
    const database = env.POSTGRES_DB || 'blog-js-development'
    const username = env.POSTGRES_USER || 'postgres'
    const password = env.POSTGRES_PASSWORD || 'password' // for development
    
    let databaseUrl = env.DATABASE_URL || \`postgres://\${username}:\${password}@\${host}:5432/\${database}\`
    
    // development config as default.
    export let config = {
      client: 'pg',
      connection: databaseUrl,
      debug: true,
      migrations: {
        directory: MIGRATION_DIR
      },
    
      seeds: {
        directory: FIXTURES_DIR
      }
    }
    
    if (process.env.NODE_ENV === 'production') {
      config = {
        ...config,
        client: 'pg',
        connection: env.DATABASE_URL
      }
    }
    
    if (process.env.NODE_ENV === 'test') {
      config = {
        ...config,
        client: 'sqlite3',
        useNullAsDefault: true,
        debug: false,
        connection: {filename: ':memory:'}
      }
    }
    
    ${s.export('knex(config)')}
  `
}
