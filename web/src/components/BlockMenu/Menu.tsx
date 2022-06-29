import { useCombobox } from 'downshift'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getRangeBoundingClientRect,
  usePopperPosition,
  virtualReference,
} from '@udecode/plate-ui-popper'
import { useEditorState, useEventEditorSelectors } from '@udecode/plate-core'
import { BaseRange } from 'slate'

const items = [
  'Neptunium',
  'Plutonium',
  'Americium',
  'Curium',
  'Berkelium',
  'Californium',
  'Einsteinium',
  'Fermium',
]

function Menu({ isOpen }) {
  const [inputItems, setInputItems] = useState(items)
  const popperRef = React.useRef<any>(null)
  const editor = useEditorState()
  const { insertText: _insertText } = editor

  const {
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
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
  let txt = ''

  useEffect(() => {
    editor.insertNode = (node) => {
      console.log('nod', node)
    }
    editor.insertText = (text) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith((txt += text.toLowerCase()))
        )
      )
      return _insertText(text)
    }
  }, [editor.selection])

  return (
    <div ref={popperRef} style={popperStyles.popper} {...attributes.popper}>
      <label {...getLabelProps()}>Choose an element:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={'toggle menu'}
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

const ComboBox = styled.div`
  position: absolute;
  z-index: 991;
  top: 0;
  left: 0;
`
export default Menu
