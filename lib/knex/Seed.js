import { build, format, snippets as s } from 'bld.js'

import { generateSeeds } from 'lib/_utils/generateSeed'

export default (props) => {
  let {model, routeConfig, modelConfig} = props
  const seeds = generateSeeds(modelConfig, modelConfig.seeds)

  const tableName = s.tableName(model)

  console.log(seeds);

  return build`
    exports.seed = async (knex) => {
      // Deletes ALL and insert entries.
      await knex('${tableName}').del()
    
      // https://github.com/tgriesser/knex/issues/54
      await knex('${tableName}').insert(${s.stringify(seeds)})
    }
  `
}
