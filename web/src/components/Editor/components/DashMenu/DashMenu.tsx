import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useEditorState } from '@udecode/plate-core'
import {
  getRangeBoundingClientRect,
  usePopperPosition,
  virtualReference,
} from '@udecode/plate-ui-popper'
import { useCombobox } from 'downshift'
import React, { useCallback, useEffect, useState } from 'react'
import useDecksterStore from 'stores'
import styled from 'styled-components'
import createElementOnSelectItem from './createElementOnSelectItem'
import blockMenuItems from './menuItems'
import { filter } from 'lodash-es'
function Menu() {
  const dashmenu = useDecksterStore((s) => s.dashmenu)
  const [inputItems, setInputItems] = useState(blockMenuItems())
  const popperRef = React.useRef<any>(null)
  const editor = useEditorState()
  const { insertText: _insertText } = editor

  const {
    getInputProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getComboboxProps,
  } = useCombobox({
    items: inputItems,
    inputValue: dashmenu.text,
    highlightedIndex: dashmenu.highlightedIndex,
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
    if (!dashmenu.text.length) {
      console.log(dashmenu.text)

      setInputItems(blockMenuItems())
    }
    setInputItems(
      filter(inputItems, (item) => [
        item.keywords?.includes(dashmenu.text.toLowerCase()),
        item.key === 'seperator',
      ])
      // inputItems.filter((item) =>
      //   item.keywords?.includes(dashmenu.text.toLowerCase())
      // )
    )
  }, [dashmenu])

  return (
    <Wrapper
      active={dashmenu.isOpen}
      ref={popperRef}
      style={popperStyles.popper}
      {...attributes.popper}
    >
      <div {...getComboboxProps()}>
        <VisuallyHidden.Root>
          <input {...getInputProps()} />
        </VisuallyHidden.Root>
      </div>
      <List {...getMenuProps()}>
        {inputItems.map((item, index) => (
          <ListItem
            disabled
            highlightedIndex
            key={`${item.key}${index}`}
            {...getItemProps({ item, index })}
          >
            <ListItemButton
              isHighlighted={highlightedIndex === index}
              onClick={(ev) => createElementOnSelectItem(ev, editor, item)}
            >
              {item.lable}
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

const ListItemButton = styled.button<{ isHighlighted: boolean }>`
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
  background: ${(p) => (p.isHighlighted ? 'red' : 'white')};
  padding: 0px 16px;
  outline: currentcolor none medium;
`

export default Menu
