import { validateModel } from 'lib/_utils/ModelConfig'
import _ from 'lodash'
import faker from 'faker'
import fakerEn from 'faker/locale/en_US'
import { snippets as s } from 'bld.js'
import check from 'lib/_utils/apiCheck'

import hash from 'string-hash'

const optsShape = check.shape({
  locale: check.string.optional,
  today: check.string.optional,
  asId: check.bool.optional
})

// generate multiple seed data for junction-table model
export const generateJunctionSeeds = (model, modelsConfig, count = 1, opts = {}) => {
  return _.times(count, (i) => generateJunctionSeed(model, modelsConfig, i, opts))
}

// generate single seed data for junction-table model
export const generateJunctionSeed = (model, modelsConfig, offset = 0, opts = {}) => {
  const modelConfig = modelsConfig[model]

  validateModel(modelConfig)

  const {
    locale = 'en', // locale will used for generating data.
    today = '2000-01-01T01:00:00.000Z' // base date for faker.js
  } = opts

  const {
    // pass-through seed by default.
    transformSeed = (seed) => seed
  } = modelConfig

  const {schema} = modelConfig

  const relations = _.transform(_.toPairs(schema.relations), (result, [relationModel, relation]) => {
    const relationModelConfig = modelsConfig[relationModel]
    // CAUTION: generateSeeds internally updates faker.seed at here.
    const relationSeeds = generateSeeds(relationModelConfig, relationModelConfig.seeds)
    result[s.camelCase(`${relationModel}_id`)] = _.map(relationSeeds, 'id')
  }, {})

  // use hash of schema as a randomness (ensure unique seedValue is used)
  const seedValue = hash(JSON.stringify(modelConfig.schema)) + offset

  // set seed before each invocation.
  faker.seed(seedValue)

  // set locale.
  faker.locale = locale

  const {tableName, properties} = schema

  return transformSeed(_.transform(properties, (result, prop, key) => {
    // custom relation id generator
    result[key] = (function generator (prop, key) {
      const {type} = prop

      key = s.camelCase(key)
      const _key = _.snakeCase(key)

      if (relations[key]) {
        return _.get(relations, [key, offset], _.first(relations[key]))
      }

      if ((_key === 'id' || _.endsWith(_key, 'id')) && type === 'integer') {
        return faker.random.number()
      }

      return seedDataGenerator(seedValue, tableName, prop, key, opts)
    })(prop, key)
  }, {}), offset + 1)
}

// generate multiple seed data for junction-table
export const generateSeeds = (modelConfig, count = 1, opts = {}) => {
  return _.times(count, (i) => generateSeed(modelConfig, i, opts))
}

// generate single seed data for model
export const generateSeed = (modelConfig, offset = 0, opts = {}) => {
  validateModel(modelConfig)

  const {
    locale = 'en', // locale will used for generating data.
    today = '2000-01-01T01:00:00.000Z' // base date for faker.js
  } = opts

  const {
    // pass-through seed by default.
    transformSeed = (seed) => seed
  } = modelConfig

  // use hash of schema as a randomness
  const seedValue = hash(JSON.stringify(modelConfig.schema)) + offset

  // set locale.
  faker.locale = locale

  let {tableName, properties} = modelConfig.schema
  tableName = s.tableName(tableName)

  return transformSeed(_.transform(properties, (result, prop, key) => {
    result[key] = seedDataGenerator(seedValue, tableName, prop, key, opts)
  }, {}), offset + 1)
}

// generate multiple seed data with relation for junction-table
export const generateSeedsWithRelation = (model, modelsConfig, count = 1, opts = {}) => {
  return _.times(count, (i) => generateSeedWithRelation(model, modelsConfig, i, opts))
}

// generate single seed data with relation for model
export const generateSeedWithRelation = (model, modelsConfig, offset = 0, opts = {}) => {
  const modelConfig = modelsConfig[model]

  validateModel(modelConfig)

  const {
    asId = true // set relation as id
  } = opts

  const {schema} = modelConfig
  const tableName = s.tableName(schema.tableName)

  const properties = generateSeed(modelConfig, offset, opts)

  const relations = _.transform(schema.relations, (result, relation, key) => {
    const relatedModel = _.find(relation, (value, key) => {
      // includes only one-to-one relation currently.
      if (_.includes(['belongsTo', 'hasOne'], key)) return value
    })

    if (!relatedModel) return

    const relatedModelConfig = modelsConfig[s.singular(relatedModel)]
    const seed = generateSeed(relatedModelConfig, offset, opts)

    if (asId) {
      let column = _.find(relation.join, (value, key) => _.startsWith(value, tableName))
      column = _.last(column.split('.'))

      // ignore relation of table.id.
      if (column === 'id') return

      result[column] = seed.id
    } else {
      result[key] = seed
    }
  }, {})

  return {
    ...properties,
    ...relations
  }
}

// generate seed data via faker.js
const seedDataGenerator = (seedValue, tableName, prop, key, opts) => {
  const {type} = prop
  const _key = _.snakeCase(key)

  // validate opts.
  check.throw(optsShape, opts)

  const {
    locale = 'en', // locale will used for generating data.
    today = '2000-01-01T01:00:00.000Z' // base date for faker.js
  } = opts

  // set seed before each invocation.
  // Will generate random value based on (schema + key)
  faker.seed(seedValue + hash(key))

  // set locale.
  faker.locale = locale

  // generate data for well-known column.
  if (_key === 'zip_code') {
    return faker.address.zipCode()
  }

  if (type === 'string' && _.includes(_key, 'address')) {
    return faker.address.streetAddress()
  }

  if (_.includes(_key, 'city')) {
    return faker.address.city()
  }

  if (_.endsWith(_key, 'price')) {
    return faker.commerce.price()
  }

  if (_.includes(_key, 'state')) {
    return faker.address.state()
  }

  if (_.includes(_key, 'country_code')) {
    return faker.address.countryCode()
  }

  if (_.includes(_key, 'country')) {
    return faker.address.country()
  }

  if (_key === 'last_name') {
    return faker.name.lastName()
  }

  if (_key === 'slug') {
    return faker.lorem.slug()
  }

  if (_.includes(_key, 'color')) {
    return faker.commerce.color()
  }

  if (_key === 'first_name') {
    return faker.name.firstName()
  }

  if (_.includes(_key, 'phone') || _.startsWith(_key, 'tel')) {
    return faker.phone.phoneNumber()
  }

  if (_.includes(_key, 'mail')) {
    return fakerEn.internet.email()
  }

  if (_.includes(_key, 'tag') || _.includes(s.singular(_key), 'category')) {
    return [faker.random.word()]
  }

  if (_.includes(_key, 'label') || _.includes(s.singular(_key), 'tag')) {
    return faker.lorem.slug()
  }

  if (_.startsWith(_key, 'last') && _.endsWith(_key, 'at')) {
    return faker.date.past(1, today)
  }

  if (key.match(/starts?_at/)) {
    return faker.date.past(1, today)
  }

  if (key.match(/ends?_at/)) {
    return faker.date.future(1, today)
  }

  if (_.endsWith(_key, 'at') || _.endsWith(_key, 'date')) {
    return faker.date.future(1, today)
  }

  if (((_key === 'id' || _.endsWith(_key, 'id')) && type === 'string') || _key === 'uuid') {
    return faker.random.uuid()
  }

  if ((_key === 'id' || _.endsWith(_key, 'id')) && type === 'integer') {
    return faker.random.number()
  }

  if (_.endsWith(_key, 'count') || _.endsWith(_key, 'counts')) {
    return faker.random.number()
  }

  if (_key === 'locale') {
    return faker.random.locale()
  }

  if (_.includes(_key, 'avatar')) {
    return faker.internet.avatar()
  }

  if (_.includes(_key, 'image')) {
    return faker.image.image()
  }

  if (_.includes(tableName, 'attachment') && (_key === 'image_url')) {
    return faker.image.cats()
  }

  if (_.includes(tableName, 'channels') && (_key === 'name')) {
    return _.snakeCase(faker.random.words(1))
  }

  if (_.includes(tableName, 'companies') && (_key === 'name' || _key === 'label')) {
    return faker.company.companyName()
  }

  if (_.includes(tableName, 'user') && (_key === 'name')) {
    if (locale === 'ja') return `${faker.name.lastName()} ${faker.name.firstName()}`

    return faker.name.findName()
  }

  if ((_.includes(tableName, 'product') || _.includes(tableName, 'item')) && _key === 'name') {
    return faker.commerce.productName()
  }

  if (_key === 'user_name' || _key === 'username' || _key === 'nickname') {
    return fakerEn.internet.userName()
  }

  // comment
  if (_key === 'comment' || (_.includes(tableName, 'comment') && _key === 'text')) {
    return fakerEn.lorem.paragraph()
  }

  if (_key === 'content' || _key === 'body') {
    return fakerEn.lorem.paragraph()
  }

  // url
  if (_.endsWith(_key, 'url')) {
    return faker.internet.url()
  }

  // string specific conditions
  if (type === 'string' && prop.format) {
    switch (prop.format) {
      case 'date':
      case 'date-time':
        return faker.date.future(1, today).toISOString()
      case 'uri':
        return faker.internet.url()
      case 'email':
        return fakerEn.internet.email()
      case 'ipv4':
        return faker.internet.ip()
      case 'ipv6':
        return faker.internet.ipv6()
    }
  }

  // then try to generate by column-type.
  switch (type) {
    case 'array':
      return [seedDataGenerator(seedValue, tableName, prop.items, key, opts)]
    case 'object':
      return _.transform(prop.properties || {}, (result, p, k) => {
        result[k] = seedDataGenerator(seedValue, tableName, p, k, opts)
      }, {})
    case 'number':
    case 'integer':
      return faker.random.number()
    case 'boolean':
      return faker.random.boolean()
    default:
      return faker.random.words()
  }
}

export default generateSeed
