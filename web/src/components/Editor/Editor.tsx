import React, { createRef, useEffect, useState } from 'react'
import styles from './Editor.module.scss'
// import Element from './elements'
import {
  createAutoformatPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHorizontalRulePlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createTrailingBlockPlugin,
  ELEMENT_HR,
  Plate,
  usePlateSelectors,
} from '@udecode/plate-headless'
import Menu from 'components/BlockMenu/Menu'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { CONFIG } from './config/config'
import { createMyPlugins, MyValue } from './config/typescript'
import { createMentionPlugin } from '../DashMenu/createMentionPlugin'

import ReactDOM from 'react-dom'

const HrElement = (props: any) => {
  const { attributes, children, nodeProps } = props

  return (
    <div {...attributes} className={styles['slate-hr']} {...nodeProps}>
      <hr contentEditable={false} {...nodeProps} />
      {children}
    </div>
  )
}
const ELEMENT_MENTION_INPUT = 'mention_input'
const ELEMENT_MENTION = 'mention'

let components = {
  // [ELEMENT_CODE_BLOCK]: StyledElement,
  [ELEMENT_HR]: HrElement,
  [ELEMENT_MENTION_INPUT]: ({ attributes, children, nodeProps }) => (
    <span style={{ color: 'red' }} {...attributes} {...nodeProps}>
      {children}
    </span>
  ),
  // [ELEMENT_MENTION]: () => <div style={{ color: 'blue' }}>asdasd</div>,
}

components = withStyledDraggables(components)

const DecksterEditor = () => {
  const { editor } = usePlateSelectors()
  const editorContainerRef = createRef<HTMLDivElement>()
  const editableProps = {
    placeholder: 'Strat typing your story...',
  }

  const plugins = createMyPlugins(
    [
      // elements
      createMentionPlugin(),
      createHorizontalRulePlugin(),
      createNodeIdPlugin(),
      // createDndPlugin(),
      createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createParagraphPlugin(), // paragraph element
      createHeadingPlugin(), // heading elements
      createResetNodePlugin(),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
      //@ts-ignore
      createAutoformatPlugin(CONFIG.autoformat),
    ],
    { components }
  )

  const handleEditorChange = (value: MyValue) => {
    console.log(value)
    // if (isHotkey('mod+s', value)) {
    // }
  }

  useEffect(() => {
    console.log(editor)
  }, [editor.selection])

  const [is, setIs] = useState(false)

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div
          ref={editorContainerRef}
          id="deckster-editor"
          className={styles.root}
        >
          <Plate
            onChange={handleEditorChange}
            plugins={plugins}
            editableProps={editableProps}
          >
            {/* {is && <Menu isOpen={is} />} */}

            {is &&
              ReactDOM.createPortal(
                <Menu isOpen={is} />,
                document.getElementById('deckster-editor')
              )}
          </Plate>
        </div>
      </DndProvider>
    </>
  )
}

export { DecksterEditor }
