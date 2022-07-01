import { Value } from '@udecode/plate'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'

interface DashMenuElementProps<V extends Value> extends ElementProps<V> {}

export const DashMenuElement = <V extends Value>(
  props: DashMenuElementProps<V>
) => {
  const { attributes, children, nodeProps } = props

  return (
    <div {...attributes} {...nodeProps}>
      / {children}
    </div>
  )
}
