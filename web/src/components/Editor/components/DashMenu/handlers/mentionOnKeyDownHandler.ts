import { PlateEditor, Value } from '@udecode/plate-core'
import isHotkey from 'is-hotkey'
import useDecksterStore from 'stores'
import blockMenuItems from '../menuItems'
import { findMentionInput } from '../queries'
import { removeMentionInput } from '../transforms'
import { KeyboardEventHandler } from './KeyboardEventHandler'
import {
  moveSelectionByOffset,
  MoveSelectionByOffsetOptions,
} from './moveSelectionByOffset'

export const mentionOnKeyDownHandler: <V extends Value>(
  options?: MoveSelectionByOffsetOptions<V>
) => (editor: PlateEditor<V>) => KeyboardEventHandler =
  (options) => (editor) => (event) => {
    const currentMentionInput = findMentionInput(editor)!
    const dashMenu = useDecksterStore.getState().dashmenu

    if (isHotkey('escape', event)) {
      event.preventDefault()
      if (currentMentionInput) {
        removeMentionInput(editor, currentMentionInput[1])
      }
      return true
    }

    if (isHotkey('down', event) && currentMentionInput) {
      event.preventDefault()
      dashMenu.moveDown()
    }

    if (isHotkey('up', event)) {
      event.preventDefault()
      dashMenu.moveUp()
    }

    if (isHotkey('enter', event) && currentMentionInput) {
      event.preventDefault()
      event.stopPropagation()

      const dashMenu = useDecksterStore.getState().dashmenu
      const menuItems = blockMenuItems()
      const ctxMenuItem = menuItems[dashMenu.highlightedIndex]

      dashMenu.onSelectItem(event, editor, ctxMenuItem)
      // return true
    }

    return moveSelectionByOffset(editor, options)(event)
  }
