import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useEditorState } from '@udecode/plate-core'
import {
  getRangeBoundingClientRect,
  usePopperPosition,
  virtualReference,
} from '@udecode/plate-ui-popper'
import { useCombobox } from 'downshift'
import React, { useCallback, useEffect } from 'react'
import useDecksterStore from 'stores'
import styled from 'styled-components'
import createElementOnSelectItem from './handlers/createElementOnSelectItem'
import blockMenuItems from './menuItems'
import filterExcessSeparators from './utils/filterExcessSeparators'

function Menu() {
  const dashmenu = useDecksterStore((s) => s.dashmenu)
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
    items: dashmenu.filteredItems,
    circularNavigation: true,
    inputValue: dashmenu.text,
    highlightedIndex: dashmenu.highlightedIndex,
  })

  const targetRange = editor.selection || null

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

  const filtered = blockMenuItems().filter((item) => {
    if (item.key === 'separator') {
      return true
    }

    const n = dashmenu.text.toLowerCase()

    return (
      (item.lable || '').toLowerCase().includes(n) ||
      (item.keywords || '').toLowerCase().includes(n)
    )
  })

  useEffect(() => {
    let filteredItems
    if (!dashmenu.text) {
      filteredItems = blockMenuItems()
    }
    filteredItems = filterExcessSeparators(filtered)

    dashmenu.setFilteredItems(filteredItems)
  }, [dashmenu.text])

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
      <List {...getMenuProps()} id="dashmenu-list">
        {dashmenu.filteredItems.map((item, index) => (
          <ListItem
            highlightedIndex
            key={`${item.key}${index}`}
            {...getItemProps({ item, index })}
            onPointerMove={() => dashmenu.highlightIndex(index)}
            onPointerDown={(ev) => createElementOnSelectItem(ev, editor, item)}
            disabled={item.key === 'separator'}
          >
            {item.key === 'separator' ? (
              <Hr />
            ) : (
              <ListItemButton
                disabled={item.key === 'separator'}
                isHighlighted={highlightedIndex === index}
              >
                <>
                  {item.icon && React.createElement(item.icon)}
                  {item.lable}
                </>
              </ListItemButton>
            )}
          </ListItem>
        ))}
        {dashmenu.filteredItems.length === 0 && (
          <ListItem>
            <Empty>No results</Empty>
          </ListItem>
        )}
      </List>
    </Wrapper>
  )
}

const Empty = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  font-weight: 500;
  font-size: 14px;
  height: 36px;
  padding: 0 16px;
`

export const Wrapper = styled.div<{
  active: boolean
}>`
  color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(33px);
  background-blend-mode: overlay;
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
  max-height: 224px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  * {
    box-sizing: border-box;
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
  background: transparent;
  cursor: pointer;
  border: medium none;
  opacity: 1;
  color: rgb(0, 0, 0);
  backdrop-filter: ${(p) =>
    p.isHighlighted ? 'brightness(90%)' : 'brightness(100%)'};
  padding: 0px 16px;
  outline: currentcolor none medium;

  svg {
    height: 18px;
    width: 18px;
    margin: 0 12px 0 0;
  }
`

const Hr = styled.hr`
  border-color: rgb(197, 204, 211) currentcolor currentcolor;
  border-style: solid none none;
  border-width: 1px 0px 0px;
  border-image: none 100% / 1 / 0 stretch;
  height: 0px;
  margin: 6px 0;
`

export default Menu
