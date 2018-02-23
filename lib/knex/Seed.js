import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import {
  generateSeedsWithRelation,
  generateJunctionSeeds
} from 'lib/_utils/generateSeed'

export default (props) => {
  let {model, modelsConfig} = props

  const modelConfig = modelsConfig[model]
  const {isJunction, schema} = modelConfig
  const tableName = s.tableName(schema.tableName)

  let seeds = []
  if (isJunction) {
    const maxCounts = _.reduce(_.toPairs(schema.relations), (acc, [relationModel, relation]) => {
      const relationModelConfig = modelsConfig[relationModel]
      return _.max([acc, relationModelConfig.seeds])
    }, 0)
    seeds = generateJunctionSeeds(model, modelsConfig, maxCounts)
  } else {
    seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)
  }

  return build`
    exports.seed = async (knex) => {
      // Deletes ALL and insert entries.
      await knex('${tableName}').del()
    
      // https://github.com/tgriesser/knex/issues/54
      await knex('${tableName}').insert(${s.stringify(seeds)})
    }
  `
}
