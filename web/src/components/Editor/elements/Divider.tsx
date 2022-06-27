import React, { useEffect } from 'react'
import { Editor, Transforms } from 'slate'
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from 'slate-react'
import { EditorElementType, ParagraphElement } from '../types'

const Divider = (props: RenderElementProps) => {
  const { element, attributes, children } = props
  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()
  const path = ReactEditor.findPath(editor, element)

  const isFocused = selected && focused

  //   React.useEffect(() => {
  //     const handler = (event: KeyboardEvent) => {
  //       const block = Editor.after(editor, path, {
  //         distance: 1,
  //       })
  //       console.log('block', block)

  //       // don't re-create the paragraph block if it already exists
  //       if (!block) {
  //         const paragraph: ParagraphElement = {
  //           type: EditorElementType.p,
  //           children: [{ text: '' }],
  //         }
  //         // Transforms.move(editor, { distance: 3, unit: 'line' })
  //         // Editor.void(editor)
  //         // Editor.insertSoftBreak(editor)
  //         Transforms.insertNodes(editor, [paragraph])
  //         // Transforms.collapse(editor)
  //         //   Transforms.splitNodes(editor)
  //       }
  //     }

  //     if (isFocused) {
  //       document.addEventListener('keydown', handler)
  //     }

  //     return () => {
  //       document.removeEventListener('keydown', handler)
  //     }
  //   }, [isFocused])

  //   useEffect(() => {
  //     Editor.insertSoftBreak(editor)
  //   }, [isFocused])

  return (
    <div {...attributes}>
      <hr contentEditable={false} />
      {children}
    </div>
  )
}

export default Divider
