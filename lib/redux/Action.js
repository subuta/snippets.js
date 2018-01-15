import { build, format, snippets as s } from 'bld.js'

import ActionType from './ActionType'

export default () => {
  // const imports = s.import([
  //   ['lodash', '_'],
  //   ['objection', null, [
  //     'Model'
  //   ]],
  //   ['src/utils/ajvValidator', 'ajvValidator']
  // ])

  return build`
    // action
    console.log('action')
  `
}
