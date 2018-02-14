import {validateModel} from 'lib/_utils/ModelConfig'
import _ from 'lodash'
import faker from 'faker'
import fakerEn from 'faker/locale/en_US'
import { snippets as s } from 'bld.js'

import hash from 'string-hash'

export default (modelConfig, locale = 'en') => {
  validateModel(modelConfig)

  // use hash of json as a randomness
  faker.seed(hash(JSON.stringify(modelConfig)));

  // set locale.
  faker.locale = locale

  let {tableName, properties} = modelConfig.schema
  tableName = s.tableName(tableName)

  return _.transform(properties, (result, prop, key) => {
    result[key] = (function generator (prop, key) {
      const {type} = prop
      const _key = _.snakeCase(key)

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

      if (_.startsWith(_key, 'last') && _.endsWith(_key, 'at')) {
        return faker.date.past()
      }

      if (key.match(/starts?_at/)) {
        return faker.date.past()
      }

      if (key.match(/ends?_at/)) {
        return faker.date.future()
      }

      if (_.endsWith(_key, 'at') || _.endsWith(_key, 'date')) {
        return faker.date.future()
      }

      if (_key === 'uuid') {
        return faker.random.uuid()
      }

      if (_.endsWith(_key, 'url')) {
        return faker.internet.url()
      }

      if (_key === 'id' || _.endsWith(_key, 'id')) {
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

      if (_.includes(tableName, 'attachment') && (_key === 'url' || _key === 'image')) {
        return faker.image.cats()
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

      if (_key === 'user_name' || _key === 'username') {
        return fakerEn.internet.userName()
      }

      // comment
      if (_key === 'comment' || (_.includes(tableName, 'comment') && _key === 'text')) {
        return fakerEn.lorem.paragraph()
      }

      if (_key === 'content' || _key === 'body') {
        return fakerEn.lorem.paragraph()
      }

      // string specific conditions
      if (type === 'string' && prop.format) {
        switch (prop.format) {
          case 'date':
          case 'date-time':
            return faker.date.future().toISOString()
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
          return [generator(prop.items, key)]
        case 'object':
          return _.transform(prop.properties || {}, (result, p, k) => {
            result[k] = generator(p, k)
          }, {})
        case 'number':
        case 'integer':
          return faker.random.number()
        case 'boolean':
          return faker.random.boolean()
        default:
          return faker.random.words()
      }
    })(prop, key)
  }, {})
}
