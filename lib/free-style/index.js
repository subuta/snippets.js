import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['lodash', '_'],
    ['inline-style-prefixer/static', 'prefixAll'],
    ['react-free-style', null, [
      ['wrap', '_wrap'],
      ['FreeStyle']
    ]]
  ])

  return build`
    ${imports}
    
    const Style = FreeStyle.create()
    
    export const registerStyles = (styles) => {
      return _.reduce(styles, (result, style, key) => {
        result[key] = Style.registerStyle(prefixAll(style))
        return result
      }, {})
    }
    
    export const registerKeyFrames = (style) => {
      return Style.registerKeyframes(style);
    }
    
    export const registerRules = (styles) => {
      return _.each(styles, (style, key) => {
        Style.registerRule(key, prefixAll(style))
      })
    }
    
    export const wrap = (Component) => _wrap(Component, Style, true)
    
    export default Style
  `
}
