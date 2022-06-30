import { Value } from '@udecode/plate'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'

interface HeadingElementProps<V extends Value> extends ElementProps<V> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const HeadingElement = <V extends Value>(
  props: HeadingElementProps<V>
) => {
  const { attributes, children, nodeProps, as } = props

  const el = React.createElement(as || 'p', {}, ...children)

  return (
    <div {...attributes} {...nodeProps}>
      {el}
    </div>
  )
}
