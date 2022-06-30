import React, { createRef, useState } from 'react'
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
  ELEMENT_H1,
  ELEMENT_HR,
  Plate,
} from '@udecode/plate'
import Menu from 'components/DashMenu/Menu'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createMentionPlugin } from '../DashMenu/createMentionPlugin'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { CONFIG } from './config/config'
import { createMyPlugins, MyValue } from './config/typescript'

import styled from 'styled-components'
import { withStyledPlaceHolders } from './config/components/withStyledPlaceHolders'

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

let components = {
  [ELEMENT_H1]: ({ attributes, children, nodeProps }) => (
    <h1 style={{ color: 'blue' }} {...attributes} {...nodeProps}>
      {children}
    </h1>
  ),
  [ELEMENT_HR]: HrElement,
  [ELEMENT_MENTION_INPUT]: ({ attributes, children, nodeProps }) => {
    console.log('attributes', attributes)
    console.log('nodeProps', nodeProps)

    return (
      <StyledDashMenu {...attributes} {...nodeProps}>
        / {children}
      </StyledDashMenu>
    )
  },
  // [ELEMENT_MENTION]: () => <div style={{ color: 'blue' }}>asdasd</div>,
}

const StyledDashMenu = styled.p`
  /* ::before {
    display: block;
    opacity: 1;
    content: attr(placeholder);
    pointer-events: none;
    height: 0px;
    color: rgb(177, 190, 204);
  } */
`

components = withStyledPlaceHolders(withStyledDraggables(components))

const DecksterEditor = () => {
  // const { editor, value } = usePlateSelectors()

  // const plateValue = usePlateSelectors().
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

  // useEffect(() => {
  //   console.log(dashmenu)
  // }, [dashmenu])

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
            <Menu />
          </Plate>
        </div>
      </DndProvider>
    </>
  )
}

export { DecksterEditor }
