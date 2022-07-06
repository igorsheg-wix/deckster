import { Value } from '@udecode/plate'
import { ElementProps } from 'components/Editor/Editor.types'
import React from 'react'
import styles from './HorizontalLine.module.scss'

interface HorizontalLineElementProps<V extends Value> extends ElementProps<V> {}

export const HorizontalLineElement = <V extends Value>(
  props: HorizontalLineElementProps<V>
) => {
  const { attributes, children, nodeProps } = props

  return (
    <div
      {...attributes}
      {...nodeProps}
      className={styles.root}
      data-deckster-node="hr"
    >
      <hr contentEditable={false} />
      {children}
    </div>
  )
}
