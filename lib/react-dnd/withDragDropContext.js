import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['react-dnd', null, [
      ['DragDropContext']
    ]],
    ['react-dnd-html5-backend', 'HTML5Backend']
  ])

  return build`
    ${imports}
    
    ${s.export('DragDropContext(HTML5Backend)')}
  `
}
