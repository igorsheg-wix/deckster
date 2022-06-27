import React, { useCallback, useEffect, useMemo } from 'react'
import { createEditor, Descendant, Editor, Path } from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react'
import useDecksterStore from 'stores'
import { DecksterEditorElementProps } from 'types'
import styles from './Editor.module.scss'
// import Element from './elements'
import { EditorElement } from './elements'
import { Leaf } from './Leaf'
import Shortcuts from './shortcuts'
import { EditorElementType } from './types'
import {
  Plate,
  createParagraphPlugin,
  createHeadingPlugin,
  createHorizontalRulePlugin,
  createAutoformatPlugin,
  ELEMENT_HR,
  AutoformatBlockRule,
  setNodes,
  ELEMENT_DEFAULT,
  insertNodes,
} from '@udecode/plate'

// const DecksterEditor = () => {
//   const setEditorRawContent = useDecksterStore((s) => s.set)

//   const initialValue: Descendant[] = [
//     {
//       type: EditorElementType.p,
//       children: [{ text: '' }],
//     },
//   ]

//   const editor = useMemo(
//     //@ts-ignore
//     () => Shortcuts(withHistory(withReact(createEditor()))),
//     []
//   )
//   const renderElement = useCallback(
//     (props: RenderElementProps) => <EditorElement {...props} />,
//     []
//   )

//   const renderLeaf = React.useCallback(
//     (props: RenderLeafProps) => <Leaf {...props} />,
//     []
//   )

//   const onChangeHanlder = (value: Descendant[]) => {
//     // const yay = ReactEditor.
//     // console.log('yay', yay)

//     const isAstChange = editor.operations.some(
//       (op) => 'set_selection' !== op.type
//     )
//     if (isAstChange) {
//       setEditorRawContent((s) => {
//         s.editorNodes = value
//       })
//     }
//   }

//   // const editor = useSlateStatic()

//   useEffect(() => {
//     let incides: number[] = []
//     editor.children.map((node) => {
//       if (node.type === 'divider') {
//         const path = ReactEditor.findPath(editor, node)
//         incides.push(...path)
//       }
//       console.log('path', incides)
//     })
//   }, [editor.children])

//   return (
//     <div className={styles.root}>
//       <Slate onChange={onChangeHanlder} editor={editor} value={initialValue}>
//         <Editable
//           renderLeaf={renderLeaf}
//           renderElement={renderElement}
//           placeholder="Start wiring your story"
//         />
//       </Slate>
//     </div>
//   )
// }

// export { DecksterEditor }

const DecksterEditor = () => {
  const editableProps = {
    placeholder: 'Type…',
    style: {
      padding: '15px',
    },
  }

  const plugins = [
    // elements
    createHorizontalRulePlugin(),
    createParagraphPlugin(), // paragraph element
    createHeadingPlugin(), // heading elements
    createAutoformatPlugin({
      options: {
        rules: [
          {
            mode: 'block',
            type: ELEMENT_HR,
            match: ['---', '—-', '___ '],
            format: (editor) => {
              setNodes(editor, { type: ELEMENT_HR })
              insertNodes(editor, {
                type: ELEMENT_DEFAULT,
                children: [{ text: '' }],
              })
            },
          },
        ],
      },
    }),
  ]

  return (
    <div className={styles.root}>
      <Plate plugins={plugins} editableProps={editableProps} />
    </div>
  )
}

export { DecksterEditor }
