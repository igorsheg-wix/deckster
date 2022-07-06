import { Value } from '@udecode/plate'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'

interface ParagraphElementProps<V extends Value> extends ElementProps<V> {
  as?: 'p' | 'span'
}

export const ParagraphElement = <V extends Value>(
  props: ParagraphElementProps<V>
) => {
  const { attributes, className, children, nodeProps, as = 'p' } = props

  const el = React.createElement(as, {}, ...children)

  return (
    <div {...attributes} {...nodeProps} data-deckster-node="p">
      {el}
    </div>
  )
}
