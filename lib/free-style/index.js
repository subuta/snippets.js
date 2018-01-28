import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['lodash', '_'],
    ['inline-style-prefixer/static', 'prefixAll'],
    ['react-free-style', null, [
      ['styled'],
      ['FreeStyle']
    ]]
  ])

  return build`
    ${imports}
    
    export default function createWithStyles (styles = {}, options = {}) {
      styles = _.transform(
        styles,
        (result, style, key) => result[key] = prefixAll(style),
        {}
      )
    
      if (!_.isEmpty(options.rules)) {
        options.rules = _.transform(
          options.rules,
          (result, rule) => result.push([rule[0], prefixAll(rule[1])]),
          []
        )
      }
    
      if (!_.isEmpty(options.css)) {
        options.css = _.transform(
          options.css,
          (result, style, key) => result[key] = prefixAll(style),
          {}
        )
      }
    
      return styled(styles, options)
    }

  `
}
