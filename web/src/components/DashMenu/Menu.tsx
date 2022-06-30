import { useCombobox } from 'downshift'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getRangeBoundingClientRect,
  usePopperPosition,
  virtualReference,
} from '@udecode/plate-ui-popper'
import {
  useEditorState,
  useEventEditorSelectors,
  getBlockAbove,
  withoutNormalizing,
  isEndPoint,
  insertText,
  withoutMergingHistory,
  deleteText,
  moveSelection,
  select,
  insertNodes,
  focusEditor,
  setNodes,
  removeNodes,
} from '@udecode/plate-core'
import { BaseRange } from 'slate'
import useDecksterStore from 'stores'
import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
} from '@udecode/plate-headless'
import { ELEMENT_MENTION_INPUT, getTextFromTrigger } from '@udecode/plate'
import { Range } from 'slate'

const items = [
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_HR,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ELEMENT_TD,
  ELEMENT_TODO_LI,
]

function Menu() {
  const dashmenu = useDecksterStore((s) => s.dashmenu)

  const [inputItems, setInputItems] = useState(items)
  const popperRef = React.useRef<any>(null)
  const editor = useEditorState()
  const { insertText: _insertText } = editor

  const { getLabelProps, getMenuProps, highlightedIndex, getItemProps } =
    useCombobox({
      items: inputItems,
    })

  let targetRange = editor.selection || null

  const getBoundingClientRect = useCallback(
    () => getRangeBoundingClientRect(editor, targetRange) ?? virtualReference,
    [editor, targetRange]
  )

  const { styles: popperStyles, attributes } = usePopperPosition({
    popperElement: popperRef.current,
    popperContainer: document.body,
    placement: 'bottom-start',
    getBoundingClientRect,
    offset: [0, 4],
  })

  useEffect(() => {
    setInputItems(
      items.filter((item) =>
        item.toLowerCase().startsWith(dashmenu.text.toLowerCase())
      )
    )
  }, [dashmenu.text])

  const onItemClick = (item) => {
    const pathAbove = getBlockAbove(editor)?.[1]
    const isBlockEnd =
      editor.selection &&
      pathAbove &&
      isEndPoint(editor, editor.selection.anchor, pathAbove)

    // const isCursorAfterTrigger = getTextFromTrigger(editor, {
    //   at: Range.start(editor.selection),
    //   trigger: '/',
    //   searchPattern: dashmenu.text,
    // })
    // if (!isCursorAfterTrigger) {
    //   return
    // }
    // const { range, textAfterTrigger } = isCursorAfterTrigger

    // const yay = select(editor, Range.start(editor.selection))
    // console.log(yay)
    withoutNormalizing(editor, () => {
      if (isBlockEnd) {
        insertText(editor, ' ')
      }

      select(editor, editor.selection)

      withoutMergingHistory(editor, () =>
        removeNodes(editor, {
          match: (node) => node.type === ELEMENT_MENTION_INPUT,
        })
      )

      insertNodes(editor, {
        type: item,
        children: [{ text: '' }],
      })
      // moveSelection(editor)
      focusEditor(editor)
      // deleteText(editor)
      // deleteText(editor, { unit: 'word' })
      // setNodes(editor, { type: item })
    })
    // select(editor, editor.selection)

    // withoutMergingHistory(editor, () =>
    //   removeNodes(editor, {
    //     match: (node) => node.type === item,
    //   })
    // )

    // withoutNormalizing(editor, () => {
    //   // select(editor, range)

    //   if (isBlockEnd) {
    //     insertText(editor, ' ')
    //   }

    //   insertNodes(editor, {
    //     type: item,
    //     children: [{ text: '' }],
    //   })
    // })
    // moveSelection(editor)
    // if (isBlockEnd) {
    //   deleteText(editor)
    // }

    // editor.deleteBackward('block')
  }

  return (
    <Wrapper
      active={dashmenu.isOpen}
      ref={popperRef}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <List {...getMenuProps()}>
        {inputItems.map((item, index) => (
          <ListItem
            style={
              highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
            }
            key={`${item}${index}`}
            {...getItemProps({ item, index })}
          >
            <ListItemButton onClick={() => onItemClick(item)}>
              {item}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

export const Wrapper = styled.div<{
  active: boolean
}>`
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 2px 4px;
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 150ms;
  line-height: 0;
  box-sizing: border-box;
  pointer-events: none;
  white-space: nowrap;
  width: 300px;
  min-height: 224px;
  max-height: 224px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  * {
    box-sizing: border-box;
  }
  hr {
    border: 0;
    height: 0;
  }
  ${({ active }) =>
    active &&
    `
    transform: translateY(${'-6px'}) scale(1);
    pointer-events: all;
    opacity: 1;
  `};
  @media print {
    display: none;
  }
`

const List = styled.ol`
  list-style: none;
  text-align: left;
  height: 100%;
  padding: 8px 0;
  margin: 0;
`

const ListItem = styled.li`
  padding: 0;
  margin: 0;
`

const ListItemButton = styled.button`
  display: flex;
  -moz-box-align: center;
  align-items: center;
  -moz-box-pack: start;
  justify-content: flex-start;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  width: 100%;
  height: 36px;
  cursor: pointer;
  border: medium none;
  opacity: 1;
  color: rgb(0, 0, 0);
  background: white;
  padding: 0px 16px;
  outline: currentcolor none medium;
`

export default Menu
