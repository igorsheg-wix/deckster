import {
  ELEMENT_H1,
  ELEMENT_HR,
  Plate,
  PlatePluginComponent,
  Value,
} from '@udecode/plate'
import DashMenu from './components/DashMenu/DashMenu'
import React, { createRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { HeadingElement } from './components/Heading/Heading'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { withStyledPlaceHolders } from './config/components/withStyledPlaceHolders'
import { PLUGINS } from './config/plugins'
import styles from './Editor.module.scss'

// const HrElement = (props: any) => {
//   const { attributes, children, nodeProps } = props

//   return (
//     <div {...attributes} className={styles['slate-hr']} {...nodeProps}>
//       <hr contentEditable={false} {...nodeProps} />
//       {children}
//     </div>
//   )
// }
// const ELEMENT_MENTION_INPUT = 'mention_input'

// let components: Record<string, PlatePluginComponent<any>> = {
//   [ELEMENT_H1]: (props) => HeadingElement({ as: 'h1', ...props }),
//   [ELEMENT_HR]: HrElement,
//   [ELEMENT_MENTION_INPUT]: ({ attributes, children, nodeProps }) => {
//     console.log('attributes', attributes)
//     console.log('nodeProps', nodeProps)

//     return (
//       <StyledDashMenu {...attributes} {...nodeProps}>
//         / {children}
//       </StyledDashMenu>
//     )
//   },
//   // [ELEMENT_MENTION]: () => <div style={{ color: 'blue' }}>asdasd</div>,
// }

// const StyledDashMenu = styled.p`
//   /* ::before {
//     display: block;
//     opacity: 1;
//     content: attr(placeholder);
//     pointer-events: none;
//     height: 0px;
//     color: rgb(177, 190, 204);
//   } */
// `

// components = withStyledPlaceHolders(withStyledDraggables(components))

const DecksterEditor = () => {
  // const { editor, value } = usePlateSelectors()

  // const plateValue = usePlateSelectors().
  const editableProps = {
    placeholder: 'Strat typing your story...',
  }

  // const plugins = createMyPlugins(
  //   [
  //     // elements
  //     createMentionPlugin(),
  //     createHorizontalRulePlugin(),
  //     createNodeIdPlugin(),
  //     // createDndPlugin(),
  //     createSoftBreakPlugin(CONFIG.softBreak),
  //     createExitBreakPlugin(CONFIG.exitBreak),
  //     createParagraphPlugin(), // paragraph element
  //     createHeadingPlugin(), // heading elements
  //     createResetNodePlugin(),
  //     createTrailingBlockPlugin(CONFIG.trailingBlock),
  //     createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  //     //@ts-ignore
  //     createAutoformatPlugin(CONFIG.autoformat),
  //   ],
  //   { components }
  // )

  const handleEditorChange = (value: Value) => {
    console.log(value)
    // if (isHotkey('mod+s', value)) {
    // }
  }

  // useEffect(() => {
  //   console.log(dashmenu)
  // }, [dashmenu])

  // const [is, setIs] = useState(false)

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div id="deckster-editor" className={styles.root}>
          <Plate
            onChange={handleEditorChange}
            plugins={[
              ...PLUGINS.basicElements,
              ...PLUGINS.basicMarks,
              ...PLUGINS.logic,
            ]}
            editableProps={editableProps}
          >
            <DashMenu />
          </Plate>
        </div>
      </DndProvider>
    </>
  )
}

export { DecksterEditor }
