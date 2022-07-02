import { PlateEditor, Value, focusEditor } from '@udecode/plate-core'
import isHotkey from 'is-hotkey'
import useDecksterStore from 'stores'
import blockMenuItems from '../menuItems'
import { findMentionInput } from '../queries'
import { removeMentionInput } from '../transforms'
import { getNextWrappingIndex } from '../utils'
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
    const dashMenuDomElement = document.getElementById('dashmenu-list')

    if (isHotkey('down', event) && currentMentionInput) {
      event.preventDefault()

      const newIndex = getNextWrappingIndex(
        1,
        dashMenu.highlightedIndex,
        dashMenu.filteredItems.length,
        (index: number) => dashMenuDomElement?.childNodes[index],
        true
      )
      dashMenu.highlightIndex(newIndex)
      return
    }

    if (isHotkey('up', event) && currentMentionInput) {
      event.preventDefault()

      const newIndex = getNextWrappingIndex(
        -1,
        dashMenu.highlightedIndex,
        dashMenu.filteredItems.length,
        (index: number) => dashMenuDomElement?.childNodes[index],
        true
      )
      dashMenu.highlightIndex(newIndex)
    }

    if (event.key === 'Escape' && currentMentionInput) {
      event.preventDefault()
      dashMenu.reset()
      removeMentionInput(editor, currentMentionInput[1])
      return true
    }

    if (['Tab', 'Enter'].includes(event.key) && currentMentionInput) {
      event.preventDefault()
      event.stopPropagation()

      dashMenu.onSelectItem(
        event,
        //@ts-ignore
        editor,
        dashMenu.filteredItems[dashMenu.highlightedIndex]
      )
    }

    return moveSelectionByOffset(editor, options)(event)
  }
