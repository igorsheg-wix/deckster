import { getPluginType, PlateEditor, TNode, Value } from '@udecode/plate-core'
import { ELEMENT_DASHMENU_INPUT } from 'components/Editor/Editor.types'
import { TMentionInputElement } from '../types'

export const isNodeMentionInput = <V extends Value>(
  editor: PlateEditor<V>,
  node: TNode
): node is TMentionInputElement => {
  return node.type === getPluginType(editor, ELEMENT_DASHMENU_INPUT)
}
