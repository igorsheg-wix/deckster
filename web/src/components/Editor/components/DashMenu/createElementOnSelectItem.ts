import {
  getBlockAbove,
  insertText,
  isEndPoint,
  PlateEditor,
  removeNodes,
  select,
  setNodes,
  withoutMergingHistory,
  withoutNormalizing,
} from '@udecode/plate'
import { ELEMENT_DASHMENU_INPUT } from 'components/Editor/Editor.types'
import { Range } from 'slate'
import { MenuItem } from '../../Editor.types'

const createElementOnSelectItem = (
  ev: React.SyntheticEvent,
  editor: PlateEditor,
  item: MenuItem
) => {
  ev.preventDefault()
  ev.stopPropagation()
  const pathAbove = getBlockAbove(editor)?.[1]
  const isBlockEnd =
    editor.selection &&
    pathAbove &&
    isEndPoint(editor, editor.selection.anchor, pathAbove)

  withoutNormalizing(editor, () => {
    if (isBlockEnd) {
      insertText(editor, ' ')
    }

    editor.selection && select(editor, Range.start(editor.selection))

    withoutMergingHistory(editor, () =>
      removeNodes(editor, {
        match: (node) => node.type === ELEMENT_DASHMENU_INPUT,
      })
    )

    setNodes(editor, {
      type: item.key,
      children: [{ text: '' }],
    })
  })
}

export default createElementOnSelectItem
