import React, { useState, KeyboardEvent, createRef } from 'react'
import styles from './Editor.module.scss'
// import Element from './elements'
import {
  createAutoformatPlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHorizontalRulePlugin,
  createParagraphPlugin,
  createResetNodePlugin,
  createSoftBreakPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_HR,
  Plate,
  ELEMENT_PARAGRAPH,
  createNodeIdPlugin,
  moveSelection,
  createTrailingBlockPlugin,
  usePlateSelectors,
  createSelectOnBackspacePlugin,
  createPluginFactory,
  HotkeyPlugin,
  onKeyDownToggleElement,
  KeyboardHandlerReturnType,
  withTReact,
  WithPlatePlugin,
  PlateEditor,
  Value,
  HandlerReturnType,
  onKeyDownCodeBlock,
  getNodeString,
} from '@udecode/plate-headless'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { CONFIG } from './config/config'
import { createMyPlugins, MyValue } from './config/typescript'
import BlockMenu from 'components/BlockMenu/BlockMenu'
import dictionary from 'components/BlockMenu/dictionary'
import Menu from 'components/BlockMenu/Menu'
import { withMention } from './withMention'
import isHotkey from 'is-hotkey'

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
  // [ELEMENT_MENTION]: () => <div style={{ color: 'blue' }}>asdasd</div>,
}

components = withStyledDraggables(components)

const DecksterEditor = () => {
  const { editor } = usePlateSelectors()
  const editorRef = createRef<HTMLDivElement>()
  const editableProps = {
    placeholder: 'Strat typing your story...',
  }

  // const createMentionPlugin = createPluginFactory({
  //   key: ELEMENT_MENTION,
  //   isElement: true,
  //   isInline: true,
  //   isVoid: true,
  //   handlers: {
  //     onKeyDown: (editor) => moveSelection(editor, { unit: 'offset' }),
  //   },
  //   withOverrides: withMention,
  //   options: {
  //     trigger: '@',
  //     createMentionNode: (item) => ({ value: item.text }),
  //   },
  //   plugins: [
  //     {
  //       key: ELEMENT_MENTION_INPUT,
  //       isElement: true,
  //       isInline: true,
  //     },
  //   ],
  //   then: (editor, { key }) => ({
  //     options: {
  //       id: key,
  //     },
  //   }),
  // })

  // TODO: move to core
  type KeyboardEventHandler = (event: KeyboardEvent) => HandlerReturnType

  const mentionOnKeyDownHandler: <V extends Value>() => (
    editor: PlateEditor<V>
  ) => KeyboardEventHandler = () => (editor) => (event) => {
    // return () => true
    // if (isHotkey('escape', event)) {
    //   event.preventDefault()
    //   const currentMentionInput = findMentionInput(editor)!
    //   if (currentMentionInput) {
    //     removeMentionInput(editor, currentMentionInput[1])
    //   }
    //   return true
    // }
    // return moveSelectionByOffset(editor, options)(event)
  }

  const editorDashMenu = <
    V extends Value = Value,
    E extends PlateEditor<V> = PlateEditor<V>
  >(
    editor: PlateEditor,
    { options: { trigger } }
  ) => {
    const {
      apply,
      insertBreak,
      insertText: _insertText,
      deleteBackward,
      insertFragment: _insertFragment,
      insertTextData,
    } = editor

    const stripNewLineAndTrim: (text: string) => string = (text) => {
      return text
        .split(/\r\n|\r|\n/)
        .map((line) => line.trim())
        .join('')
    }

    editor.insertText = (text) => {
      console.log(text)

      if (trigger === text) {
        setIs(true)
      }
      return _insertText(text)
    }

    editor.deleteBackward = (unit) => {
      setIs(false)

      deleteBackward(unit)
    }

    return editor
  }

  const [is, setIs] = useState(false)

  const createDashMenuPlugin = createPluginFactory({
    key: 'editor-dash-menu',
    isElement: true,
    isInline: true,
    isVoid: true,
    withOverrides: editorDashMenu,
    handlers: {
      onKeyDown: onKeyDownToggleElement,
    },
    options: {
      trigger: '/',
    },
  })

  const plugins = createMyPlugins(
    [
      // elements
      createDashMenuPlugin(),
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

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div id="deckster-editor" className={styles.root}>
          <Plate
            onChange={handleEditorChange}
            plugins={plugins}
            editableProps={editableProps}
          >
            {is && <Menu isOpen={is} />}
          </Plate>
        </div>
      </DndProvider>
      {/* {ReactDOM.createPortal(
        <Menu editor={editor} isOpen={is} />,
        document.body
      )} */}
    </>
  )
}

export { DecksterEditor }
