import {
  isCollapsed,
  isElementEmpty,
  useEditorState,
  Value,
} from '@udecode/plate'
import classNames from 'classnames'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'
import { useFocused, useSelected } from 'slate-react'
import editorStyles from '../../Editor.module.scss'

interface ParagraphElementProps<V extends Value> extends ElementProps<V> {
  as?: 'p' | 'span'
}

export const ParagraphElement = <V extends Value>(
  props: ParagraphElementProps<V>
) => {
  const {
    attributes,
    children,
    nodeProps,
    as = 'p',
    element,
    placeholder = "Type '/' to insert, or start writing…",
  } = props

  const el = React.createElement(as, {}, ...children)

  const focused = useFocused()
  const selected = useSelected()
  const editor = useEditorState()

  const isEmptyBlock = isElementEmpty(editor, element)
  const hideOnBlur = true

  const enabled =
    isEmptyBlock &&
    (!hideOnBlur ||
      (isCollapsed(editor.selection) && hideOnBlur && focused && selected))

  const placeholderCss = classNames(
    enabled && editorStyles.emptyBlockPlaceHolder
  )
  return (
    <div
      {...attributes}
      {...nodeProps}
      data-deckster-node={as}
      className={placeholderCss}
      data-placeholder={placeholder}
    >
      {enabled && (
        <span contentEditable={false} className={placeholderCss}>
          {placeholder}
        </span>
      )}
      {el}
    </div>
  )
}
